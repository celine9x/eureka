/**
 * Table Components (Organism)
 *
 * A complete table system with header, body rows, and various cell types.
 * Uses design tokens from tokens.css.
 */

// Re-export TableCell and helpers for convenience
export {
  TableCell,
  TableCellLinkRow,
  TableCellLinkedName,
} from "./tablecell.jsx";

/* ===========================================
   STYLE CONFIGURATION
   =========================================== */

const styles = {
  table: `
    .eureka-table {
      display: flex;
      flex-direction: column;
      width: 100%;
      box-sizing: border-box;
      background: var(--color-background-white);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-interaction-outline-enabled);
      box-shadow: var(--shadow-light-down);
      overflow: hidden;
    }
  `,

  row: `
    .table-row {
      display: flex;
      align-items: stretch;
      width: 100%;
      box-sizing: border-box;
    }
    .table-row-header {
      background: var(--color-background-neutral-lighter);
      border-bottom: 1px solid var(--color-interaction-outline-enabled);
    }
    .table-row-body {
      background: var(--color-background-white);
      border-bottom: 1px solid var(--color-interaction-outline-enabled);
      cursor: pointer;
      transition: background var(--transition-fast);
    }
    .table-row-body:nth-child(even) {
      background: var(--color-background-neutral-lighter);
    }
    .table-row-body:last-child {
      border-bottom: none;
    }
    .table-row-body:not(.disabled):not(.selected):hover {
      background: var(--color-background-neutral-lighter);
    }
    .table-row-body.selected {
      background: var(--color-general-informative);
    }
    .table-row-body.selected:hover {
      background: var(--color-general-informative);
    }
    .table-row-body.disabled {
      background: var(--color-background-neutral-light);
      cursor: not-allowed;
    }
  `,

  header: `
    .table-cell-header {
      flex: 1 1 0;
      min-width: 0;
    }
    .table-cell-header-inner {
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      gap: var(--spacing-1);
      padding-left: var(--spacing-4);
      padding-right: var(--spacing-4);
      padding-top: var(--spacing-3);
      padding-bottom: var(--spacing-3);
      width: 100%;
      box-sizing: border-box;
      user-select: none;
    }
    .table-cell-header-inner.sortable {
      cursor: pointer;
    }
    .table-cell-header-inner.sortable:hover .table-cell-header-text {
      color: var(--color-content-primary);
    }
    .table-cell-header-inner.sortable:hover .sort-icon:not(.active) {
      opacity: 0.7;
    }
    .table-cell-header-text {
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-body-md);
      color: var(--color-content-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1 1 0;
      min-width: 0;
      transition: color var(--transition-fast);
    }
    .sort-icon {
      flex-shrink: 0;
      color: var(--color-content-secondary);
      transition: opacity var(--transition-fast);
    }
    .sort-icon.active {
      color: var(--color-content-brand);
    }
  `,

  title: `
    .table-cell-title {
      flex: 1 1 0;
      min-width: 0;
    }
    .table-cell-title-inner {
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      gap: var(--spacing-1);
      padding-left: var(--spacing-4);
      padding-right: var(--spacing-4);
      padding-top: var(--spacing-3);
      padding-bottom: var(--spacing-3);
      width: 100%;
      box-sizing: border-box;
    }
    .table-cell-title-text {
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-body-md);
      color: var(--color-content-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `,
};

/* ===========================================
   STYLE INJECTION (SSR-safe)
   =========================================== */

let stylesInjected = false;

const injectStyles = () => {
  if (stylesInjected || typeof document === "undefined") return;

  const css = [styles.table, styles.row, styles.header, styles.title].join("\n");

  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-eureka", "table");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
  stylesInjected = true;
};

/* ===========================================
   TABLE CELL TITLE COMPONENT
   =========================================== */

/**
 * TableCellTitle
 *
 * A static column header label.
 *
 * @param {string} sort - '' | 'asc' | 'desc' - Sort indicator
 * @param {ReactNode} children - Header text
 */
export const TableCellTitle = ({ sort, className = "", children, ...props }) => {
  injectStyles();

  const renderSortIcon = () => {
    if (!sort) return null;

    if (sort === "asc") {
      return (
        <svg className="sort-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 2L10 8H2L6 2Z" fill="currentColor" />
        </svg>
      );
    }

    return (
      <svg className="sort-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 10L2 4H10L6 10Z" fill="currentColor" />
      </svg>
    );
  };

  return (
    <div className={`table-cell-title ${className}`.trim()} {...props}>
      <div className="table-cell-title-inner">
        <span className="table-cell-title-text">{children}</span>
        {renderSortIcon()}
      </div>
    </div>
  );
};

/* ===========================================
   TABLE CELL HEADER COMPONENT
   =========================================== */

/**
 * TableCellHeader
 *
 * An interactive sortable column header.
 *
 * @param {boolean} sortable - Enables sort cycling on click
 * @param {string} sort - '' | 'asc' | 'desc' - Current sort direction
 * @param {function} onSort - Called with { direction: 'asc' | 'desc' | 'none' }
 * @param {ReactNode} children - Header text
 */
export const TableCellHeader = ({
  sortable = false,
  sort = "",
  onSort,
  className = "",
  children,
  ...props
}) => {
  injectStyles();

  const cycleSort = () => {
    if (!sortable) return;
    const next = sort === "" ? "asc" : sort === "asc" ? "desc" : "";
    onSort?.({ direction: next || "none" });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      cycleSort();
    }
  };

  const renderSortIcon = () => {
    if (!sortable) return null;

    if (sort === "asc") {
      return (
        <svg className="sort-icon active" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 2L10 8H2L6 2Z" fill="currentColor" />
        </svg>
      );
    }

    if (sort === "desc") {
      return (
        <svg className="sort-icon active" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 10L2 4H10L6 10Z" fill="currentColor" />
        </svg>
      );
    }

    return (
      <svg className="sort-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 1.5L9.5 6H2.5L6 1.5Z" fill="currentColor" opacity="0.4" />
        <path d="M6 10.5L2.5 6H9.5L6 10.5Z" fill="currentColor" opacity="0.4" />
      </svg>
    );
  };

  const innerClasses = ["table-cell-header-inner", sortable && "sortable"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`table-cell-header ${className}`.trim()} {...props}>
      <div
        className={innerClasses}
        tabIndex={sortable ? 0 : undefined}
        role={sortable ? "columnheader" : undefined}
        aria-sort={sort === "asc" ? "ascending" : sort === "desc" ? "descending" : "none"}
        onClick={cycleSort}
        onKeyDown={handleKeyDown}
      >
        <span className="table-cell-header-text">{children}</span>
        {renderSortIcon()}
      </div>
    </div>
  );
};

/* ===========================================
   TABLE ROW COMPONENT
   =========================================== */

/**
 * TableRow
 *
 * A table row container.
 *
 * @param {string} variant - 'header' | 'body' (default: 'body')
 * @param {boolean} selected - Selected state for body rows
 * @param {boolean} disabled - Disabled state for body rows
 * @param {function} onClick - Called when body row is clicked
 * @param {ReactNode} children - TableCell components
 */
export const TableRow = ({
  variant = "body",
  selected = false,
  disabled = false,
  onClick,
  className = "",
  children,
  ...props
}) => {
  injectStyles();

  const handleClick = () => {
    if (variant === "body" && !disabled) {
      onClick?.({ selected });
    }
  };

  const classes = [
    "table-row",
    variant === "header" ? "table-row-header" : "table-row-body",
    selected && "selected",
    disabled && "disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} onClick={handleClick} {...props}>
      {children}
    </div>
  );
};

/* ===========================================
   TABLE COMPONENT
   =========================================== */

/**
 * Table
 *
 * A table container.
 *
 * @param {ReactNode} children - TableRow components
 *
 * @example
 * <Table>
 *   <TableRow variant="header">
 *     <TableCellHeader sortable>Company</TableCellHeader>
 *     <TableCellHeader sortable>Revenue</TableCellHeader>
 *   </TableRow>
 *   <TableRow>
 *     <TableCell>Acme Corp</TableCell>
 *     <TableCell>$1M</TableCell>
 *   </TableRow>
 * </Table>
 */
export const Table = ({ className = "", children, ...props }) => {
  injectStyles();

  return (
    <div className={`eureka-table ${className}`.trim()} role="table" {...props}>
      {children}
    </div>
  );
};

export default Table;
