"use client";

/**
 * Pagination Component
 *
 * A pagination control with page numbers, navigation buttons, and per-page selector.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={(page) => setPage(page)}
 *   perPage={10}
 *   showPerPage
 *   showInfo
 * />
 */

import React, { useState } from "react";
import { Icon } from "../atoms/icon.jsx";
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  pagination: {
    display: "inline-flex",
    alignItems: "center",
    gap: 16,
  },

  paginationDisabled: {
    opacity: 0.5,
    pointerEvents: "none",
  },

  perPage: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  perPageSelect: {
    position: "relative",
    display: "inline-flex",
  },

  perPageBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "calc(var(--spacing-8) * 2)",
    height: "var(--size-button-md)",
    padding: "0 var(--spacing-2)",
    background: "var(--color-general-white)",
    border: "none",
    borderRadius: "var(--radius-md)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    boxShadow: "var(--shadow-light-down)",
    cursor: "pointer",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-caption)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-secondary)",
    transition: "all var(--transition-fast)",
  },

  perPageBtnHover: {
    outlineColor: "var(--color-general-neutral-dark)",
  },

  perPageLabel: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-caption)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-secondary)",
  },

  nativeSelect: {
    position: "absolute",
    inset: 0,
    opacity: 0,
    cursor: "pointer",
  },

  navBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "var(--size-button-md)",
    height: "var(--size-button-md)",
    padding: 0,
    background: "var(--color-general-white)",
    border: "none",
    borderRadius: "var(--radius-md)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    boxShadow: "var(--shadow-light-down)",
    cursor: "pointer",
    color: "var(--color-content-secondary)",
    transition: "all var(--transition-fast)",
  },

  navBtnHover: {
    outlineColor: "var(--color-general-neutral-dark)",
    color: "var(--color-content-primary)",
  },

  navBtnDisabled: {
    background: "var(--color-general-neutral-light)",
    color: "var(--color-content-tertiary)",
    cursor: "not-allowed",
  },

  pages: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-2)",
  },

  pageBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "var(--size-button-md)",
    height: "var(--size-button-md)",
    padding: "0 var(--spacing-2)",
    background: "var(--color-general-white)",
    border: "none",
    borderRadius: "var(--radius-md)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    boxShadow: "var(--shadow-light-down)",
    cursor: "pointer",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-caption)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-secondary)",
    transition: "all var(--transition-fast)",
  },

  pageBtnHover: {
    outlineColor: "var(--color-general-neutral-dark)",
    color: "var(--color-content-primary)",
  },

  pageBtnActive: {
    background: "var(--color-action-fill-primary-enabled)",
    color: "var(--color-general-white)",
    outlineColor: "var(--color-action-fill-primary-enabled)",
  },

  pageBtnActiveHover: {
    background: "var(--color-action-fill-primary-hover)",
    outlineColor: "var(--color-action-fill-primary-hover)",
  },

  ellipsis: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    color: "var(--color-content-secondary)",
  },

  divider: {
    width: 1,
    height: 32,
    background: "var(--color-action-outline-secondary-enabled)",
  },

  info: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-caption)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-secondary)",
  },
};

// ─────────────────────────────────────────────
// HELPER ICONS
// ─────────────────────────────────────────────

const EllipsisIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 16, height: 16 }}>
    <rect x="3" y="7" width="10" height="2" rx="1" />
  </svg>
);

const DoubleChevronLeftIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 16, height: 16 }}>
    <path d="M8 3l-5 5 5 5V3zm5 0l-5 5 5 5V3z" />
  </svg>
);

const DoubleChevronRightIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: 16, height: 16 }}>
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
  const sidePages = Math.floor((maxVisible - 3) / 2);

  pages.push(1);

  let startPage = Math.max(2, currentPage - sidePages);
  let endPage = Math.min(totalPages - 1, currentPage + sidePages);

  if (currentPage <= sidePages + 2) {
    endPage = Math.min(totalPages - 1, maxVisible - 2);
  }

  if (currentPage >= totalPages - sidePages - 1) {
    startPage = Math.max(2, totalPages - maxVisible + 3);
  }

  if (startPage > 2) {
    pages.push("ellipsis-start");
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages - 1) {
    pages.push("ellipsis-end");
  }

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
  disabled,
  label = "per page",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isSelectDisabled = isDisabled || disabled;

  const handleChange = (e) => {
    onChange?.(Number(e.target.value));
  };

  const btnStyle = {
    ...styles.perPageBtn,
    ...(isHovered && !isSelectDisabled && styles.perPageBtnHover),
  };

  return (
    <div style={styles.perPage}>
      <div style={styles.perPageSelect}>
        <button
          type="button"
          style={btnStyle}
          disabled={isSelectDisabled}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span>{value}</span>
          <ChevronDownIcon style={{ width: 16, height: 16 }} />
        </button>
        <select
          value={value}
          onChange={handleChange}
          disabled={isSelectDisabled}
          style={{ ...styles.nativeSelect, cursor: isSelectDisabled ? "not-allowed" : "pointer" }}
          aria-label="Items per page"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      {label && <span style={styles.perPageLabel}>{label}</span>}
    </div>
  );
};

PaginationPerPage.displayName = "PaginationPerPage";

export const PaginationInfo = ({ currentPage, totalPages, totalItems, perPage }) => {
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  return (
    <span style={styles.info}>
      {startItem}-{endItem} of {totalItems}
    </span>
  );
};

PaginationInfo.displayName = "PaginationInfo";

// ─────────────────────────────────────────────
// NAV BUTTON COMPONENT
// ─────────────────────────────────────────────

const NavButton = ({ onClick, disabled, ariaLabel, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const btnStyle = {
    ...styles.navBtn,
    ...(isHovered && !disabled && styles.navBtnHover),
    ...(disabled && styles.navBtnDisabled),
  };

  return (
    <button
      type="button"
      style={btnStyle}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

// ─────────────────────────────────────────────
// PAGE BUTTON COMPONENT
// ─────────────────────────────────────────────

const PageButton = ({ page, isActive, disabled, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const btnStyle = {
    ...styles.pageBtn,
    ...(isHovered && !disabled && !isActive && styles.pageBtnHover),
    ...(isActive && styles.pageBtnActive),
    ...(isActive && isHovered && styles.pageBtnActiveHover),
  };

  return (
    <button
      type="button"
      style={btnStyle}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Page ${page}`}
      aria-current={isActive ? "page" : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {page}
    </button>
  );
};

// ─────────────────────────────────────────────
// PAGINATION COMPONENT
// ─────────────────────────────────────────────

/**
 * Pagination
 *
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
  disabled,
  showPerPage = true,
  showFirstLast = false,
  showInfo = false,
  maxVisiblePages = 5,
  style,
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

  const paginationStyle = {
    ...styles.pagination,
    ...(isPaginationDisabled && styles.paginationDisabled),
    ...style,
  };

  return (
    <div style={paginationStyle} {...props}>
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
        <NavButton
          onClick={handleFirst}
          disabled={isPaginationDisabled || isFirstPage}
          ariaLabel="First page"
        >
          <DoubleChevronLeftIcon />
        </NavButton>
      )}

      {/* Previous Button */}
      <NavButton
        onClick={handlePrevious}
        disabled={isPaginationDisabled || isFirstPage}
        ariaLabel="Previous page"
      >
        <ChevronLeftIcon style={{ width: 16, height: 16 }} />
      </NavButton>

      {/* Page Numbers */}
      <div style={styles.pages}>
        {pageNumbers.map((page) => {
          if (typeof page === "string" && page.startsWith("ellipsis")) {
            return (
              <span key={page} style={styles.ellipsis}>
                <EllipsisIcon />
              </span>
            );
          }

          return (
            <PageButton
              key={page}
              page={page}
              isActive={page === currentPage}
              disabled={isPaginationDisabled}
              onClick={() => handlePageChange(page)}
            />
          );
        })}
      </div>

      {/* Next Button */}
      <NavButton
        onClick={handleNext}
        disabled={isPaginationDisabled || isLastPage}
        ariaLabel="Next page"
      >
        <ChevronRightIcon style={{ width: 16, height: 16 }} />
      </NavButton>

      {/* Last Page Button */}
      {showFirstLast && (
        <NavButton
          onClick={handleLast}
          disabled={isPaginationDisabled || isLastPage}
          ariaLabel="Last page"
        >
          <DoubleChevronRightIcon />
        </NavButton>
      )}

      {/* Divider & Info */}
      {showInfo && totalItems !== undefined && (
        <>
          <div style={styles.divider} />
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
 */
export const SimplePagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  isDisabled = false,
  disabled,
  showPageInfo = true,
  style,
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

  const paginationStyle = {
    ...styles.pagination,
    ...(isPaginationDisabled && styles.paginationDisabled),
    ...style,
  };

  return (
    <div style={paginationStyle} {...props}>
      <NavButton
        onClick={handlePrevious}
        disabled={isPaginationDisabled || isFirstPage}
        ariaLabel="Previous page"
      >
        <ChevronLeftIcon style={{ width: 16, height: 16 }} />
      </NavButton>

      {showPageInfo && (
        <span style={styles.info}>
          Page {currentPage} of {totalPages}
        </span>
      )}

      <NavButton
        onClick={handleNext}
        disabled={isPaginationDisabled || isLastPage}
        ariaLabel="Next page"
      >
        <ChevronRightIcon style={{ width: 16, height: 16 }} />
      </NavButton>
    </div>
  );
};

SimplePagination.displayName = "SimplePagination";

Pagination.PerPage = PaginationPerPage;
Pagination.Info = PaginationInfo;
Pagination.Simple = SimplePagination;

export default Pagination;
