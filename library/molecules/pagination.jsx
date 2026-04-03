/**
 * Pagination Component
 *
 * A pagination control with page numbers, navigation buttons, and per-page selector.
 * Uses Tailwind CSS with design tokens.
 */

import React from "react";
import { cx } from "../utils/cx.js";
import { Icon } from "../atoms/icon.jsx";

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  pagination: "inline-flex items-center gap-4",
  paginationDisabled: "opacity-50 pointer-events-none",

  perPage: "flex items-center gap-2",

  perPageSelect: "relative inline-flex",

  perPageBtn: [
    "flex items-center justify-between w-16 h-8 px-2",
    "bg-background-white border-none rounded-md",
    "outline outline-1 -outline-offset-1 outline-outline-neutral",
    "shadow-light-down cursor-pointer",
    "font-primary text-body-caption font-normal text-content-secondary",
    "transition-all duration-fast",
    "hover:not-disabled:outline-neutral-300",
    "focus:outline-outline-focus focus:shadow-focus",
    "disabled:bg-background-neutral-light disabled:cursor-not-allowed",
  ].join(" "),

  perPageLabel: "font-primary text-body-caption font-normal text-content-secondary",

  navBtn: [
    "flex items-center justify-center size-8 p-0",
    "bg-background-white border-none rounded-md",
    "outline outline-1 -outline-offset-1 outline-outline-neutral",
    "shadow-light-down cursor-pointer text-content-secondary",
    "transition-all duration-fast",
    "hover:not-disabled:outline-neutral-300 hover:not-disabled:text-content-primary",
    "focus:outline-outline-focus focus:shadow-focus",
    "disabled:bg-background-neutral-light disabled:text-content-tertiary disabled:cursor-not-allowed",
  ].join(" "),

  pages: "flex items-center gap-2",

  pageBtn: [
    "flex items-center justify-center min-w-8 h-8 px-2",
    "bg-background-white border-none rounded-md",
    "outline outline-1 -outline-offset-1 outline-outline-neutral",
    "shadow-light-down cursor-pointer",
    "font-primary text-body-caption font-normal text-content-secondary",
    "transition-all duration-fast",
    "hover:not-disabled:not-[data-active]:outline-neutral-300 hover:not-disabled:not-[data-active]:text-content-primary",
    "focus:outline-outline-focus focus:shadow-focus",
    "disabled:bg-background-neutral-light disabled:text-content-tertiary disabled:cursor-not-allowed",
  ].join(" "),

  pageBtnActive: [
    "bg-action-fill-primary text-action-content-primary outline-action-fill-primary",
    "hover:bg-action-fill-primary-hover hover:outline-action-fill-primary-hover",
  ].join(" "),

  ellipsis: "flex items-center justify-center size-8 text-content-secondary",

  divider: "w-px h-8 bg-outline-neutral",

  info: "font-primary text-body-caption font-normal text-content-secondary",
};

// ─────────────────────────────────────────────
// HELPER ICONS
// ─────────────────────────────────────────────

const EllipsisIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="size-4">
    <rect x="3" y="7" width="10" height="2" rx="1" />
  </svg>
);

const DoubleChevronLeftIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="size-4">
    <path d="M8 3l-5 5 5 5V3zm5 0l-5 5 5 5V3z" />
  </svg>
);

const DoubleChevronRightIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="size-4">
    <path d="M3 3l5 5-5 5V3zm5 0l5 5-5 5V3z" />
  </svg>
);

// ─────────────────────────────────────────────
// PAGINATION HELPERS
// ─────────────────────────────────────────────

/**
 * Generate page numbers to display with ellipsis
 */
const getPageNumbers = (currentPage, totalPages, maxVisible = 5) => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = [];
  const sidePages = Math.floor((maxVisible - 3) / 2); // Pages on each side of current

  // Always show first page
  pages.push(1);

  // Calculate range around current page
  let startPage = Math.max(2, currentPage - sidePages);
  let endPage = Math.min(totalPages - 1, currentPage + sidePages);

  // Adjust if at the beginning
  if (currentPage <= sidePages + 2) {
    endPage = Math.min(totalPages - 1, maxVisible - 2);
  }

  // Adjust if at the end
  if (currentPage >= totalPages - sidePages - 1) {
    startPage = Math.max(2, totalPages - maxVisible + 3);
  }

  // Add ellipsis before if needed
  if (startPage > 2) {
    pages.push("ellipsis-start");
  }

  // Add middle pages
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Add ellipsis after if needed
  if (endPage < totalPages - 1) {
    pages.push("ellipsis-end");
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};

// ─────────────────────────────────────────────
// PAGINATION SUB-COMPONENTS
// ─────────────────────────────────────────────

export const PaginationPerPage = ({
  value = 10,
  options = [10, 20, 50, 100],
  onChange,
  isDisabled = false,
  disabled, // Support legacy prop
  label = "per page",
}) => {
  const isSelectDisabled = isDisabled || disabled;

  const handleChange = (e) => {
    onChange?.(Number(e.target.value));
  };

  return (
    <div className={styles.perPage}>
      <div className={styles.perPageSelect}>
        <button type="button" className={styles.perPageBtn} disabled={isSelectDisabled}>
          <span>{value}</span>
          <Icon name="ChevronDown" size="sm" />
        </button>
        {/* Native select overlay for accessibility */}
        <select
          value={value}
          onChange={handleChange}
          disabled={isSelectDisabled}
          className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
          aria-label="Items per page"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      {label && <span className={styles.perPageLabel}>{label}</span>}
    </div>
  );
};

PaginationPerPage.displayName = "PaginationPerPage";

export const PaginationInfo = ({ currentPage, totalPages, totalItems, perPage }) => {
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  return (
    <span className={styles.info}>
      {startItem}-{endItem} of {totalItems}
    </span>
  );
};

PaginationInfo.displayName = "PaginationInfo";

// ─────────────────────────────────────────────
// PAGINATION COMPONENT
// ─────────────────────────────────────────────

/**
 * Pagination
 *
 * @param {number} currentPage - Current active page (1-indexed)
 * @param {number} totalPages - Total number of pages
 * @param {function} onPageChange - Called when page changes
 * @param {number} perPage - Items per page
 * @param {function} onPerPageChange - Called when per page changes
 * @param {array} perPageOptions - Options for per page selector
 * @param {number} totalItems - Total number of items (for info display)
 * @param {boolean} isDisabled - Disables all controls
 * @param {boolean} showPerPage - Show per page selector
 * @param {boolean} showFirstLast - Show first/last page buttons
 * @param {boolean} showInfo - Show items info text
 * @param {number} maxVisiblePages - Max page buttons to show
 * @param {string} size - Button size: sm | md
 *
 * @example
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={(page) => setPage(page)}
 *   perPage={10}
 *   onPerPageChange={(size) => setPerPage(size)}
 *   totalItems={100}
 *   showPerPage
 *   showInfo
 * />
 */
export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  perPage = 10,
  onPerPageChange,
  perPageOptions = [10, 20, 50, 100],
  totalItems,
  isDisabled = false,
  disabled, // Support legacy prop
  showPerPage = true,
  showFirstLast = false,
  showInfo = false,
  maxVisiblePages = 5,
  className,
  ...props
}) => {
  const isPaginationDisabled = isDisabled || disabled;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page) => {
    if (isPaginationDisabled || page < 1 || page > totalPages || page === currentPage) return;
    onPageChange?.(page);
  };

  const handlePrevious = () => handlePageChange(currentPage - 1);
  const handleNext = () => handlePageChange(currentPage + 1);
  const handleFirst = () => handlePageChange(1);
  const handleLast = () => handlePageChange(totalPages);

  const pageNumbers = getPageNumbers(currentPage, totalPages, maxVisiblePages);

  const classes = cx(
    styles.pagination,
    isPaginationDisabled && styles.paginationDisabled,
    className
  );

  return (
    <div className={classes} {...props}>
      {/* Per Page Selector */}
      {showPerPage && (
        <PaginationPerPage
          value={perPage}
          options={perPageOptions}
          onChange={onPerPageChange}
          isDisabled={isPaginationDisabled}
        />
      )}

      {/* First Page Button */}
      {showFirstLast && (
        <button
          type="button"
          className={styles.navBtn}
          onClick={handleFirst}
          disabled={isPaginationDisabled || isFirstPage}
          aria-label="First page"
        >
          <DoubleChevronLeftIcon />
        </button>
      )}

      {/* Previous Button */}
      <button
        type="button"
        className={styles.navBtn}
        onClick={handlePrevious}
        disabled={isPaginationDisabled || isFirstPage}
        aria-label="Previous page"
      >
        <Icon name="ChevronLeft" size="sm" />
      </button>

      {/* Page Numbers */}
      <div className={styles.pages}>
        {pageNumbers.map((page) => {
          if (typeof page === "string" && page.startsWith("ellipsis")) {
            return (
              <span key={page} className={styles.ellipsis}>
                <EllipsisIcon />
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              className={cx(styles.pageBtn, isActive && styles.pageBtnActive)}
              onClick={() => handlePageChange(page)}
              disabled={isPaginationDisabled}
              aria-label={`Page ${page}`}
              aria-current={isActive ? "page" : undefined}
              data-active={isActive || undefined}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        className={styles.navBtn}
        onClick={handleNext}
        disabled={isPaginationDisabled || isLastPage}
        aria-label="Next page"
      >
        <Icon name="ChevronRight" size="sm" />
      </button>

      {/* Last Page Button */}
      {showFirstLast && (
        <button
          type="button"
          className={styles.navBtn}
          onClick={handleLast}
          disabled={isPaginationDisabled || isLastPage}
          aria-label="Last page"
        >
          <DoubleChevronRightIcon />
        </button>
      )}

      {/* Divider & Info */}
      {showInfo && totalItems !== undefined && (
        <>
          <div className={styles.divider} />
          <PaginationInfo
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            perPage={perPage}
          />
        </>
      )}
    </div>
  );
};

Pagination.displayName = "Pagination";

// ─────────────────────────────────────────────
// SIMPLE PAGINATION (Previous/Next only)
// ─────────────────────────────────────────────

/**
 * SimplePagination
 *
 * A minimal pagination with just previous/next buttons.
 *
 * @param {number} currentPage - Current active page (1-indexed)
 * @param {number} totalPages - Total number of pages
 * @param {function} onPageChange - Called when page changes
 * @param {boolean} isDisabled - Disables all controls
 * @param {boolean} showPageInfo - Show page info text (default: true)
 * @param {string} className - Additional CSS classes
 */
export const SimplePagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  isDisabled = false,
  disabled, // Support legacy prop
  showPageInfo = true,
  className,
  ...props
}) => {
  const isPaginationDisabled = isDisabled || disabled;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevious = () => {
    if (!isPaginationDisabled && !isFirstPage) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isPaginationDisabled && !isLastPage) {
      onPageChange?.(currentPage + 1);
    }
  };

  const classes = cx(
    styles.pagination,
    isPaginationDisabled && styles.paginationDisabled,
    className
  );

  return (
    <div className={classes} {...props}>
      <button
        type="button"
        className={styles.navBtn}
        onClick={handlePrevious}
        disabled={isPaginationDisabled || isFirstPage}
        aria-label="Previous page"
      >
        <Icon name="ChevronLeft" size="sm" />
      </button>

      {showPageInfo && (
        <span className={styles.info}>
          Page {currentPage} of {totalPages}
        </span>
      )}

      <button
        type="button"
        className={styles.navBtn}
        onClick={handleNext}
        disabled={isPaginationDisabled || isLastPage}
        aria-label="Next page"
      >
        <Icon name="ChevronRight" size="sm" />
      </button>
    </div>
  );
};

SimplePagination.displayName = "SimplePagination";

export default Pagination;
