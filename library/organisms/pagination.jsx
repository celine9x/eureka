/**
 * Pagination Component (Organism)
 *
 * A complete pagination control with page size selector, page navigation,
 * and optional action button.
 * Uses design tokens from tokens.css and Button atom.
 */

import React, { useState } from "react";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";

/* ===========================================
   STYLE CONFIGURATION
   =========================================== */

const styles = {
  base: `
    .pagination {
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
      gap: var(--spacing-4);
      width: 100%;
    }
  `,

  perPage: `
    .pagination__per-page {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: var(--spacing-2);
    }
    .pagination__per-page-label {
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-body-md);
      color: var(--color-neutral-500);
    }
  `,

  pages: `
    .pagination__pages {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      gap: var(--spacing-2);
    }
  `,

  divider: `
    .pagination__divider {
      width: 1px;
      height: 32px;
      background: var(--color-neutral-200);
    }
  `,

  info: `
    .pagination__info {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-body-md);
      color: var(--color-neutral-500);
    }
  `,
};

/* ===========================================
   STYLE INJECTION (SSR-safe)
   =========================================== */

let stylesInjected = false;

const injectStyles = () => {
  if (stylesInjected || typeof document === "undefined") return;

  const css = [
    styles.base,
    styles.perPage,
    styles.pages,
    styles.divider,
    styles.info,
  ].join("\n");

  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-eureka", "pagination");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
  stylesInjected = true;
};

/* ===========================================
   PAGINATION COMPONENT
   =========================================== */

/**
 * Pagination
 *
 * A full pagination control with page size, navigation, and optional actions.
 *
 * @example
 * <Pagination
 *   currentPage={4}
 *   totalPages={8}
 *   pageSize={10}
 *   onPageChange={(page) => setPage(page)}
 *   onPageSizeChange={(size) => setPageSize(size)}
 * />
 */
export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  pageSize = 10,
  pageSizeOptions = [10, 25, 50, 100],
  onPageChange,
  onPageSizeChange,
  showPerPage = true,
  showPageNumbers = true,
  showInfo = false,
  actionButton,
  className = "",
  ...props
}) => {
  injectStyles();

  const [showPageSizeDropdown, setShowPageSizeDropdown] = useState(false);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange?.(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange?.(page);
    }
  };

  const handlePageSizeClick = (size) => {
    onPageSizeChange?.(size);
    setShowPageSizeDropdown(false);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    // Always show first page
    pages.push(1);

    // Show ellipsis or page 2
    if (showEllipsisStart) {
      pages.push("ellipsis-start");
    } else if (totalPages > 1) {
      pages.push(2);
    }

    // Show current page area (current-1, current, current+1)
    if (currentPage > 2 && currentPage < totalPages - 1) {
      if (currentPage > 3) {
        pages.push(currentPage);
      }
    } else if (totalPages > 2 && !showEllipsisStart) {
      if (totalPages > 3) pages.push(3);
    }

    // Show ellipsis or second to last page
    if (showEllipsisEnd) {
      pages.push("ellipsis-end");
    } else if (totalPages > 3) {
      pages.push(totalPages - 1);
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    // Remove duplicates while preserving order
    const uniquePages = [];
    const seen = new Set();
    for (const page of pages) {
      const key = typeof page === "string" ? page : page.toString();
      if (!seen.has(key)) {
        seen.add(key);
        uniquePages.push(page);
      }
    }

    return uniquePages;
  };

  const pageNumbers = getPageNumbers();

  const classes = ["pagination", className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...props}>
      {/* Per Page Selector */}
      {showPerPage && (
        <div className="pagination__per-page">
          <div style={{ position: "relative" }}>
            <Button
              variant="secondary"
              size="md"
              iconTrailing={<Icon name="ChevronDown" size="sm" />}
              onClick={() => setShowPageSizeDropdown(!showPageSizeDropdown)}
              style={{ minWidth: 64, justifyContent: "space-between" }}
            >
              {pageSize}
            </Button>
            {showPageSizeDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  marginTop: 4,
                  background: "var(--color-neutral-0)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "var(--shadow-md)",
                  border: "1px solid var(--color-neutral-200)",
                  zIndex: 10,
                  minWidth: 64,
                }}
              >
                {pageSizeOptions.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handlePageSizeClick(size)}
                    style={{
                      width: "100%",
                      border: "none",
                      background: size === pageSize ? "var(--color-general-informative)" : "transparent",
                      padding: "var(--spacing-2) var(--spacing-3)",
                      cursor: "pointer",
                      fontSize: "var(--text-body-md)",
                      lineHeight: "var(--line-height-body-md)",
                      fontFamily: "var(--font-family-primary)",
                      textAlign: "left",
                      color: size === pageSize ? "var(--color-content-primary)" : "var(--color-content-secondary)",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="pagination__per-page-label">per page</span>
        </div>
      )}

      {/* Previous Button */}
      <Button
        variant="secondary"
        size="md"
        iconLeading={<Icon name="ChevronLeft" size="sm" />}
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        style={{ width: 32, padding: 0, justifyContent: "center" }}
      />

      {/* Page Numbers */}
      {showPageNumbers && (
        <div className="pagination__pages">
          {pageNumbers.map((page) => {
            if (page === "ellipsis-start" || page === "ellipsis-end") {
              return (
                <Button
                  key={page}
                  variant="secondary"
                  size="md"
                  iconLeading={<Icon name="Minus" size="sm" />}
                  disabled
                  style={{ width: 32, padding: 0, justifyContent: "center" }}
                />
              );
            }

            const isActive = page === currentPage;
            return (
              <Button
                key={page}
                variant={isActive ? "primary" : "secondary"}
                size="md"
                onClick={() => handlePageClick(page)}
                style={{ width: 32, padding: 0, justifyContent: "center" }}
              >
                {page}
              </Button>
            );
          })}
        </div>
      )}

      {/* Info Text */}
      {showInfo && (
        <div className="pagination__info">
          <span>{currentPage}</span>
          <span>of</span>
          <span>{totalPages}</span>
        </div>
      )}

      {/* Next Button */}
      <Button
        variant="secondary"
        size="md"
        iconLeading={<Icon name="ChevronRight" size="sm" />}
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        style={{ width: 32, padding: 0, justifyContent: "center" }}
      />

      {/* Optional Divider + Action Button */}
      {actionButton && (
        <>
          <div className="pagination__divider" />
          {actionButton}
        </>
      )}
    </div>
  );
};

Pagination.displayName = "Pagination";

export default Pagination;
