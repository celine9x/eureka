import { useLayoutEffect, useState } from "react";
import {
  SAMPLE_DOCUMENT_TEXT,
  CONTRACT_TABLE_DEVELOPMENT_MARKER,
  CONTRACT_TABLE_DEVELOPMENT_HEADERS,
  CONTRACT_TABLE_DEVELOPMENT_ROWS,
  CONTRACT_TABLE_REGULATORY_MARKER,
  CONTRACT_TABLE_REGULATORY_HEADERS,
  CONTRACT_TABLE_REGULATORY_ROWS,
  CONTRACT_TABLE_SALES_MARKER,
  CONTRACT_TABLE_SALES_HEADERS,
  CONTRACT_TABLE_SALES_ROWS,
  CONTRACT_TABLE_PATENTS_MARKER,
  CONTRACT_TABLE_PATENTS_HEADERS,
  CONTRACT_TABLE_PATENTS_ROWS,
  CONTRACT_TABLE_INDSUBMISSIONS_MARKER,
  CONTRACT_TABLE_INDSUBMISSIONS_HEADERS,
  CONTRACT_TABLE_INDSUBMISSIONS_ROWS,
  CONTRACT_TITLE_TEXT,
  CONTRACT_DISCLAIMER_TEXT,
  CONTRACT_HEADING1_TEXTS,
  CONTRACT_HEADING2_TEXTS,
} from "./contract-content.js";

// Shared read-only rendering of the sample contract used by review.jsx, for
// the guidance and loading pages — same document text, table layout and
// pagination as the interactive review page, minus the finding-highlight and
// applied-redline behavior those pages don't have.

export { SAMPLE_DOCUMENT_TEXT };

// Same title/heading/disclaimer treatment as review.jsx (see DocumentViewer's
// paragraphStyles prop).
export const DOCUMENT_PARAGRAPH_STYLES = [
  { text: CONTRACT_TITLE_TEXT, className: "document-viewer__paragraph--title" },
  { text: CONTRACT_DISCLAIMER_TEXT, className: "document-viewer__paragraph--italic" },
  ...CONTRACT_HEADING1_TEXTS.map((text) => ({ text, className: "document-viewer__paragraph--heading1" })),
  ...CONTRACT_HEADING2_TEXTS.map((text) => ({ text, className: "document-viewer__paragraph--heading2" })),
];

const buildStaticRows = (rows) => rows.map((cells, index) => ({ id: `row-${index}`, cells }));

const TABLE_PAGE_CONFIGS = [
  { marker: CONTRACT_TABLE_DEVELOPMENT_MARKER, headers: CONTRACT_TABLE_DEVELOPMENT_HEADERS, rows: buildStaticRows(CONTRACT_TABLE_DEVELOPMENT_ROWS) },
  { marker: CONTRACT_TABLE_REGULATORY_MARKER, headers: CONTRACT_TABLE_REGULATORY_HEADERS, rows: buildStaticRows(CONTRACT_TABLE_REGULATORY_ROWS) },
  { marker: CONTRACT_TABLE_SALES_MARKER, headers: CONTRACT_TABLE_SALES_HEADERS, rows: buildStaticRows(CONTRACT_TABLE_SALES_ROWS) },
  { marker: CONTRACT_TABLE_PATENTS_MARKER, headers: CONTRACT_TABLE_PATENTS_HEADERS, rows: buildStaticRows(CONTRACT_TABLE_PATENTS_ROWS) },
  { marker: CONTRACT_TABLE_INDSUBMISSIONS_MARKER, headers: CONTRACT_TABLE_INDSUBMISSIONS_HEADERS, rows: buildStaticRows(CONTRACT_TABLE_INDSUBMISSIONS_ROWS) },
];

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const CONTRACT_TABLE_STYLE = 'width:100%;border-collapse:collapse;font-family:"Times New Roman",Times,serif;font-size:var(--text-body-md);color:var(--color-content-primary);';
const CONTRACT_TABLE_HEADER_CELL_STYLE = "border:1px solid var(--color-content-primary);padding:var(--spacing-xs) var(--spacing-sm);text-align:left;font-weight:var(--font-weight-bold);";
const CONTRACT_TABLE_CELL_STYLE = "border:1px solid var(--color-content-primary);padding:var(--spacing-xs) var(--spacing-sm);vertical-align:top;";

// Builds one of the contract's tables as an HTML string in the document's own
// Times New Roman styling — same markup as review.jsx's renderContractTableHtml,
// minus finding-highlight support, which these read-only previews don't need.
const renderContractTableHtml = ({ headers, rows }) => {
  const headerCellsHtml = headers
    .map((header) => `<th style="${CONTRACT_TABLE_HEADER_CELL_STYLE}">${escapeHtml(header)}</th>`)
    .join("");
  const rowsHtml = rows
    .map((row) => `<tr>${row.cells.map((cell) => `<td style="${CONTRACT_TABLE_CELL_STYLE}">${escapeHtml(cell)}</td>`).join("")}</tr>`)
    .join("");
  return `<table style="${CONTRACT_TABLE_STYLE}"><thead><tr>${headerCellsHtml}</tr></thead><tbody>${rowsHtml}</tbody></table>`;
};

const tableHtmlByMarker = Object.fromEntries(
  TABLE_PAGE_CONFIGS.map((config) => [config.marker, renderContractTableHtml(config)])
);

export const DOCUMENT_BLOCK_HTML_OVERRIDES = TABLE_PAGE_CONFIGS.map((config) => ({
  text: config.marker,
  html: tableHtmlByMarker[config.marker],
}));

// Matches DocumentViewer's default pageWidth/pageHeight/pagePadding (595 x
// 842 = A4 at 72dpi, 40px padding) — see review.jsx's identical measurer.
const PAGE_CONTENT_WIDTH = 595 - 40 * 2;
const PAGE_CONTENT_HEIGHT = 842 - 40 * 2;

const createPageMeasurer = () => {
  const element = document.createElement("div");
  element.style.position = "absolute";
  element.style.visibility = "hidden";
  element.style.pointerEvents = "none";
  element.style.top = "-99999px";
  element.style.left = "-99999px";
  element.style.width = `${PAGE_CONTENT_WIDTH}px`;
  element.style.whiteSpace = "pre-wrap";
  element.style.wordBreak = "break-word";
  element.style.boxSizing = "border-box";
  element.style.fontFamily = '"Times New Roman", Times, serif';
  element.style.fontSize = "var(--text-body-md)";
  element.style.lineHeight = "var(--line-height-body-lg)";
  document.body.appendChild(element);
  return element;
};

const buildMeasurementHtml = (paragraphs) =>
  paragraphs.map((paragraph) => tableHtmlByMarker[paragraph] ?? escapeHtml(paragraph)).join("<br><br>");

const measuredParagraphsFitOnPage = (measurer, paragraphs) => {
  measurer.innerHTML = buildMeasurementHtml(paragraphs);
  return measurer.scrollHeight <= PAGE_CONTENT_HEIGHT;
};

// Greedily packs paragraphs (prose or table markers) onto pages by real
// rendered height rather than a character count, same approach as review.jsx's
// paginateDocumentByMeasurement, so a table shares a page with surrounding
// prose exactly when there's room instead of always burning a whole page.
const paginateDocumentByMeasurement = (documentParagraphs, measurer) => {
  const pages = [];
  let current = [];

  const startFreshPage = (paragraph) => {
    if (measuredParagraphsFitOnPage(measurer, [paragraph])) {
      current = [paragraph];
      return;
    }
    if (tableHtmlByMarker[paragraph]) {
      // A table alone taller than a full page isn't expected in this
      // document — keep it whole rather than attempting to split table rows.
      current = [paragraph];
      return;
    }
    const words = paragraph.split(/\s+/).filter(Boolean);
    let chunk = "";
    words.forEach((word) => {
      const candidate = chunk ? `${chunk} ${word}` : word;
      if (!chunk || measuredParagraphsFitOnPage(measurer, [candidate])) {
        chunk = candidate;
        return;
      }
      pages.push([chunk]);
      chunk = word;
    });
    current = [chunk];
  };

  documentParagraphs.forEach((paragraph) => {
    if (current.length === 0) {
      startFreshPage(paragraph);
      return;
    }
    const candidate = [...current, paragraph];
    if (measuredParagraphsFitOnPage(measurer, candidate)) {
      current = candidate;
      return;
    }
    pages.push(current);
    current = [];
    startFreshPage(paragraph);
  });

  if (current.length > 0) pages.push(current);
  return pages.length > 0 ? pages.map((page) => page.join("\n\n")) : [documentParagraphs.join("\n\n")];
};

// Paginates the sample contract the same way review.jsx does — packing each
// A4 page (including ones containing a table) to capacity instead of always
// giving a table a page of its own — so these read-only previews match the
// interactive review page's layout exactly.
export const useContractDocumentPages = (documentText) => {
  const [pages, setPages] = useState(null);

  useLayoutEffect(() => {
    const measurer = createPageMeasurer();
    try {
      const paragraphs = documentText.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
      setPages(paginateDocumentByMeasurement(paragraphs, measurer));
    } finally {
      measurer.remove();
    }
  }, [documentText]);

  return (pages ?? [documentText]).map((pageText) => ({ content: pageText }));
};
