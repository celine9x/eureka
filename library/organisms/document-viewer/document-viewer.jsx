"use client";

import React, {
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as pdfjsLib from "pdfjs-dist";
import { Button } from "../../atoms/button.jsx";
import { Icon } from "../../atoms/icon.jsx";
import { createStyleInjector, joinStyles } from "../../utils/styles.js";

// Set up PDF.js worker - set globally before any PDF operations
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

const styles = {
  base: `
    .document-viewer {
      --document-viewer-height: calc(var(--spacing-12) * 12.5);
      --document-viewer-scrollbar-size: var(--spacing-1);
      --document-viewer-outline-width: calc(var(--spacing-1) / 4);
      --document-viewer-page-outline-color: var(--color-action-outline-secondary-enabled);
      --document-viewer-page-text-font-size: var(--text-body-md);
      --document-viewer-page-text-line-height: var(--line-height-body-lg);
      --document-viewer-counter-size: var(--size-button-xs);
      --document-viewer-print-spacing: var(--spacing-6);
      --document-viewer-spinner-size: var(--size-icon-sm);
      --document-viewer-spinner-border-width: calc(var(--spacing-1) / 2);
      --document-viewer-spinner-animation: var(--transition-slow);
      width: 100%;
      height: var(--document-viewer-height);
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--color-general-neutral-light);
      border-radius: var(--radius-sm);
      outline: var(--document-viewer-outline-width) solid var(--color-action-outline-secondary-enabled);
      outline-offset: calc(var(--document-viewer-outline-width) * -1);
    }

    .document-viewer__viewport {
      position: relative;
      flex: 1 1 auto;
      overflow-y: auto;
      overflow-x: hidden;
      padding: var(--spacing-4);
      scroll-behavior: smooth;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-md);
      background: var(--color-general-neutral-light);
      outline: var(--document-viewer-outline-width) solid var(--color-action-outline-secondary-enabled);
      outline-offset: calc(var(--document-viewer-outline-width) * -1);
    }

    .document-viewer__viewport::-webkit-scrollbar {
      width: var(--document-viewer-scrollbar-size);
    }

    .document-viewer__viewport::-webkit-scrollbar-track {
      background: var(--color-action-fill-tertiary-enabled);
    }

    .document-viewer__viewport::-webkit-scrollbar-thumb {
      background: var(--color-content-tertiary);
      border-radius: var(--radius-full);
    }

    .document-viewer__page-shell {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex: 0 0 auto;
    }

    .document-viewer__page {
      background: var(--color-general-white);
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-button-light);
      outline: var(--document-viewer-outline-width) solid var(--document-viewer-page-outline-color);
      outline-offset: calc(var(--document-viewer-outline-width) * -1);
      overflow: hidden;
    }

    .document-viewer__page-canvas {
      display: block;
      max-width: 100%;
      height: auto;
    }

    .document-viewer__page-text {
      width: 100%;
      height: 100%;
      white-space: pre-wrap;
      word-break: break-word;
      padding: var(--spacing-6);
      font-family: var(--font-family-primary);
      font-size: var(--document-viewer-page-text-font-size);
      line-height: var(--document-viewer-page-text-line-height);
      color: var(--color-content-primary);
      box-sizing: border-box;
    }

    .document-viewer__empty {
      color: var(--color-content-secondary);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-lg);
      line-height: var(--line-height-body-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: var(--spacing-6);
    }

    .document-viewer__toolbar {
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-4);
      padding: var(--spacing-2) var(--spacing-1);
      background: var(--color-general-neutral-light);
      border-top: var(--document-viewer-outline-width) solid var(--color-action-outline-secondary-enabled);
    }

    .document-viewer__toolbar-group {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-2);
    }

    .document-viewer__toolbar-divider {
      width: var(--document-viewer-outline-width);
      align-self: stretch;
      background: var(--color-content-tertiary);
      opacity: 0.6;
    }

    .document-viewer__counter {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-2);
      color: var(--color-content-secondary);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-lg);
      line-height: var(--line-height-body-lg);
    }

    .document-viewer__counter-current {
      min-width: var(--document-viewer-counter-size);
      height: var(--document-viewer-counter-size);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 var(--spacing-1);
      background: var(--color-general-white);
      border-radius: var(--radius-xs);
      outline: var(--document-viewer-outline-width) solid var(--color-action-outline-secondary-enabled);
      outline-offset: calc(var(--document-viewer-outline-width) * -1);
      box-shadow: var(--shadow-button-light);
      color: var(--color-content-secondary);
      font-size: var(--text-body-md);
      line-height: var(--line-height-body-md);
    }

    .document-viewer__loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-2);
      color: var(--color-content-secondary);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-lg);
      line-height: var(--line-height-body-lg);
    }
  `,
};

const injectStyles = createStyleInjector("document-viewer");

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const normalizePageRecord = (page, index) => {
  if (page && typeof page === "object" && !isValidElement(page)) {
    return {
      id: page.id ?? `page-${index + 1}`,
      title: page.title,
      content: page.content ?? "",
    };
  }

  return {
    id: `page-${index + 1}`,
    content: page ?? "",
  };
};

const splitLongParagraph = (paragraph, maxCharactersPerPage) => {
  const words = String(paragraph).split(/\s+/).filter(Boolean);
  const chunks = [];
  let currentChunk = "";

  words.forEach((word) => {
    const candidate = currentChunk ? `${currentChunk} ${word}` : word;
    if (candidate.length <= maxCharactersPerPage || !currentChunk) {
      currentChunk = candidate;
      return;
    }

    chunks.push(currentChunk);
    currentChunk = word;
  });

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
};

export const paginateTextToPages = ({
  text = "",
  maxCharactersPerPage = 1800,
  pageSeparator = "\f",
}) => {
  const normalizedText = String(text ?? "").trim();

  if (!normalizedText) {
    return [{ id: "page-1", content: "" }];
  }

  if (normalizedText.includes(pageSeparator)) {
    return normalizedText
      .split(pageSeparator)
      .map((page) => page.trim())
      .filter((page) => page.length > 0)
      .map((page, index) => ({ id: `page-${index + 1}`, content: page }));
  }

  const paragraphs = normalizedText
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .flatMap((paragraph) =>
      paragraph.length > maxCharactersPerPage
        ? splitLongParagraph(paragraph, maxCharactersPerPage)
        : [paragraph]
    );

  const pages = [];
  let currentPage = "";

  paragraphs.forEach((paragraph) => {
    const candidate = currentPage ? `${currentPage}\n\n${paragraph}` : paragraph;
    if (candidate.length <= maxCharactersPerPage || !currentPage) {
      currentPage = candidate;
      return;
    }

    pages.push({ id: `page-${pages.length + 1}`, content: currentPage });
    currentPage = paragraph;
  });

  if (currentPage) {
    pages.push({ id: `page-${pages.length + 1}`, content: currentPage });
  }

  return pages.length > 0 ? pages : [{ id: "page-1", content: normalizedText }];
};

export const DocumentViewer = ({
  pdfFile,
  pages,
  text = "",
  pageSeparator = "\f",
  maxCharactersPerPage = 1800,
  defaultPage = 1,
  defaultZoom = 1,
  minZoom = 0.75,
  maxZoom = 1.5,
  zoomStep = 0.1,
  pageWidth = 598,
  pageHeight = 789,
  pagePadding = 40,
  showToolbar = true,
  showExportButton = true,
  exportFileName = "document-preview",
  renderPage,
  emptyState = "No document content available.",
  onPageChange,
  onZoomChange,
  onError,
  className = "",
  style,
  ...props
}) => {
  injectStyles(joinStyles(styles));

  const [pdfDoc, setPdfDoc] = useState(null);
  const [loading, setLoading] = useState(!!pdfFile);
  const [error, setError] = useState(null);

  const normalizedPages = useMemo(() => {
    if (Array.isArray(pages) && pages.length > 0) {
      return pages.map(normalizePageRecord);
    }

    return paginateTextToPages({
      text,
      maxCharactersPerPage,
      pageSeparator,
    });
  }, [maxCharactersPerPage, pageSeparator, pages, text]);

  const totalPages = pdfDoc ? pdfDoc.numPages : normalizedPages.length || 1;
  const [currentPage, setCurrentPage] = useState(clamp(defaultPage, 1, totalPages));
  const [zoom, setZoom] = useState(clamp(defaultZoom, minZoom, maxZoom));

  const viewportRef = useRef(null);
  const pageRefs = useRef([]);
  const isProgrammaticScrollRef = useRef(false);

  // Load PDF if provided
  useEffect(() => {
    if (!pdfFile) return;

    const loadPdf = async () => {
      try {
        setLoading(true);
        setError(null);

        let url = pdfFile;
        if (pdfFile instanceof File || pdfFile instanceof Blob) {
          url = URL.createObjectURL(pdfFile);
        }

        const doc = await pdfjsLib.getDocument(url).promise;
        setPdfDoc(doc);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Failed to load PDF";
        setError(errorMsg);
        onError?.(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    loadPdf();
  }, [pdfFile, onError]);

  useEffect(() => {
    pageRefs.current = pageRefs.current.slice(0, totalPages);
    setCurrentPage((page) => clamp(page, 1, totalPages));
  }, [totalPages]);

  useEffect(() => {
    onPageChange?.(currentPage);
  }, [currentPage, onPageChange]);

  useEffect(() => {
    onZoomChange?.(zoom);
  }, [onZoomChange, zoom]);

  const scrollToPage = (pageNumber) => {
    const nextPage = clamp(pageNumber, 1, totalPages);
    const pageNode = pageRefs.current[nextPage - 1];

    if (!pageNode) return;

    isProgrammaticScrollRef.current = true;
    pageNode.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrentPage(nextPage);

    window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 300);
  };

  const handleScroll = () => {
    if (isProgrammaticScrollRef.current) return;

    const viewport = viewportRef.current;
    if (!viewport || pageRefs.current.length === 0) return;

    const viewportCenter = viewport.scrollTop + viewport.clientHeight / 2;
    let nearestPage = 1;
    let nearestDistance = Number.POSITIVE_INFINITY;

    pageRefs.current.forEach((pageNode, index) => {
      if (!pageNode) return;

      const pageCenter = pageNode.offsetTop + pageNode.offsetHeight / 2;
      const distance = Math.abs(pageCenter - viewportCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestPage = index + 1;
      }
    });

    if (nearestPage !== currentPage) {
      setCurrentPage(nearestPage);
    }
  };

  const updateZoom = (direction) => {
    setZoom((currentZoom) => {
      const nextZoom = clamp(
        Number((currentZoom + direction * zoomStep).toFixed(2)),
        minZoom,
        maxZoom
      );
      return nextZoom;
    });
  };

  const handleExportPdf = () => {
    if (typeof document === "undefined" || typeof window === "undefined") return;

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";

    document.body.appendChild(iframe);

    const printWindow = iframe.contentWindow;
    const printDocument = printWindow?.document;

    if (!printWindow || !printDocument) {
      document.body.removeChild(iframe);
      return;
    }

    printDocument.open();
    printDocument.write(`<!doctype html><html><head><title>${exportFileName}</title></head><body></body></html>`);
    printDocument.close();

    const printStyle = printDocument.createElement("style");
    printStyle.textContent = `
      @page {
        margin: 0;
        size: auto;
      }
      body {
        margin: 0;
        padding: var(--spacing-6);
        background: #d9e0ed;
      }
      .document-viewer__page-shell {
        margin: 0 auto var(--spacing-6);
        break-after: page;
      }
      .document-viewer__page-shell:last-child {
        break-after: auto;
      }
    `;
    printDocument.head.appendChild(printStyle);

    pageRefs.current.forEach((pageNode) => {
      if (!pageNode) return;
      printDocument.body.appendChild(pageNode.cloneNode(true));
    });

    printWindow.focus();
    printWindow.print();

    window.setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };

  const renderPageBody = (page, index) => {
    if (renderPage) {
      return renderPage(page, index);
    }

    const content = page?.content ?? "";

    if (isValidElement(content)) {
      return content;
    }

    const textContent = String(content ?? "").trim();

    if (!textContent) {
      return <div className="document-viewer__empty">{emptyState}</div>;
    }

    return <div className="document-viewer__page-text">{textContent}</div>;
  };

  const renderPdfPage = (pageNumber) => {
    return (
      <PdfPageRenderer
        key={`pdf-page-${pageNumber}`}
        pdfDoc={pdfDoc}
        pageNumber={pageNumber}
        zoom={zoom}
        pageWidth={pageWidth}
        pageHeight={pageHeight}
      />
    );
  };

  const classes = ["document-viewer", className].filter(Boolean).join(" ");

  if (error) {
    return (
      <div className={classes} style={style}>
        <div
          className="document-viewer__empty"
          style={{
            flex: 1,
            color: "var(--color-content-negative)",
          }}
        >
          Error: {error}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={classes} style={style}>
        <div className="document-viewer__loading">
          <div
            style={{
              width: "var(--document-viewer-spinner-size)",
              height: "var(--document-viewer-spinner-size)",
              borderRadius: "var(--radius-full)",
              border: "var(--document-viewer-spinner-border-width) solid var(--color-content-tertiary)",
              borderTopColor: "var(--color-content-secondary)",
              animation: "spin var(--document-viewer-spinner-animation) infinite",
            }}
          />
          <span>Loading PDF...</span>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  const pagesToRender = pdfDoc
    ? Array.from({ length: totalPages }, (_, i) => i + 1)
    : normalizedPages;

  return (
    <div className={classes} style={style} {...props}>
      <div
        ref={viewportRef}
        className="document-viewer__viewport"
        onScroll={handleScroll}
      >
        {pdfDoc
          ? pagesToRender.map((pageNumber) => {
              return (
                <div
                  key={`page-${pageNumber}`}
                  ref={(node) => {
                    pageRefs.current[pageNumber - 1] = node;
                  }}
                  className="document-viewer__page-shell"
                >
                  <div className="document-viewer__page">
                    {renderPdfPage(pageNumber)}
                  </div>
                </div>
              );
            })
          : normalizedPages.map((page, index) => {
              const scaledHeight = pageHeight * zoom;

              return (
                <div
                  key={page.id ?? `page-${index + 1}`}
                  ref={(node) => {
                    pageRefs.current[index] = node;
                  }}
                  className="document-viewer__page-shell"
                  style={{ height: scaledHeight }}
                >
                  <div
                    className="document-viewer__page"
                    style={{
                      width: pageWidth,
                      height: pageHeight,
                      transform: `scale(${zoom})`,
                      transformOrigin: "top center",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        padding: pagePadding,
                        boxSizing: "border-box",
                      }}
                    >
                      {renderPageBody(page, index)}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

      {showToolbar && (
        <div className="document-viewer__toolbar">
          <div className="document-viewer__toolbar-group">
            <Button
              variant="secondary"
              size="xs"
              iconLeading={<Icon name="ChevronLeft" size="sm" />}
              onClick={() => scrollToPage(currentPage - 1)}
              disabled={currentPage <= 1}
              aria-label="Go to previous page"
              style={{ width: 24, padding: 0, justifyContent: "center" }}
            />
            <div className="document-viewer__counter" aria-live="polite">
              <span className="document-viewer__counter-current">{currentPage}</span>
              <span>/</span>
              <span>{totalPages}</span>
            </div>
            <Button
              variant="secondary"
              size="xs"
              iconLeading={<Icon name="ChevronRight" size="sm" />}
              onClick={() => scrollToPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              aria-label="Go to next page"
              style={{ width: 24, padding: 0, justifyContent: "center" }}
            />
          </div>

          <div className="document-viewer__toolbar-divider" />

          <div className="document-viewer__toolbar-group">
            <Button
              variant="secondary"
              size="xs"
              iconLeading={<Icon name="Minus" size="sm" />}
              onClick={() => updateZoom(-1)}
              disabled={zoom <= minZoom}
              aria-label="Zoom out"
              style={{ width: 24, padding: 0, justifyContent: "center" }}
            />
            <Button
              variant="secondary"
              size="xs"
              iconLeading={<Icon name="Plus" size="sm" />}
              onClick={() => updateZoom(1)}
              disabled={zoom >= maxZoom}
              aria-label="Zoom in"
              style={{ width: 24, padding: 0, justifyContent: "center" }}
            />
            {showExportButton && (
              <Button
                variant="secondary"
                size="xs"
                iconLeading={<Icon name="ArrowDownTray" size="sm" />}
                onClick={handleExportPdf}
                aria-label="Export to PDF"
                style={{ width: 24, padding: 0, justifyContent: "center" }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

DocumentViewer.displayName = "DocumentViewer";
DocumentViewer.paginateTextToPages = paginateTextToPages;

// PDF Page Renderer Component
const PdfPageRenderer = React.memo(({ pdfDoc, pageNumber, zoom, pageWidth, pageHeight }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let renderTask = null;
    let cancelled = false;

    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(pageNumber);
        if (cancelled) return;

        const viewport = page.getViewport({ scale: zoom });

        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        renderTask = page.render({
          canvasContext: context,
          viewport,
        });

        await renderTask.promise;
      } catch (err) {
        if (!cancelled) {
          console.error(`Error rendering PDF page ${pageNumber}:`, err);
        }
      }
    };

    renderPage();

    return () => {
      cancelled = true;
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [pdfDoc, pageNumber, zoom]);

  return <canvas ref={canvasRef} className="document-viewer__page-canvas" />;
});

PdfPageRenderer.displayName = "PdfPageRenderer";

export default DocumentViewer;
