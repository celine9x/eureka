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
  TableCellTags,
  TableCellTwoLevel,
} from "./tablecell.jsx";
import { TableCell } from "./tablecell.jsx";
import { Button } from "../../atoms/button.jsx";
import { Icon } from "../../atoms/icon.jsx";

/* ===========================================
   STYLE CONFIGURATION
   =========================================== */

const styles = {
  table: `
    .table {
      width: 100%;
      box-sizing: border-box;
      background: transparent;
    }
    .table.bordered {
      box-shadow: none;
    }
    .table-scroll-container {
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      position: relative;
      -webkit-overflow-scrolling: touch;
    }
    .table-inner {
      display: table;
      min-width: 100%;
      width: max-content;
      table-layout: fixed;
      border-collapse: collapse;
    }
    .table-header-wrapper {
      margin-bottom: var(--spacing-2);
    }
    .table-header-wrapper .table-row-header {
      background: transparent;
    }
    .table-header-wrapper .table-row-header > * {
      border: none !important;
      border-bottom: none !important;
    }
    .table-header-wrapper .table-scroll-container {
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
    }
    .table-body-wrapper {
      border: 1px solid var(--color-action-outline-secondary-enabled);
      border-radius: 8px;
      overflow: hidden;
      background: var(--color-general-white);
    }
    .table-body-wrapper .table-scroll-container {
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 2px;
    }
    .table-body-wrapper .table-inner {
      display: table;
      min-width: 100%;
      width: max-content;
      table-layout: fixed;
      border-collapse: collapse;
    }
  `,

  row: `
    .table-row {
      display: table-row;
      width: 100%;
      box-sizing: border-box;
    }
    .table-row-header {
      background: transparent;
    }
    .table-row-header > * {
      border: none;
      background: transparent;
      padding-bottom: var(--spacing-1);
      border-bottom: none;
    }
    .table-row-body {
      cursor: pointer;
      transition: background var(--transition-fast);
    }
    .table-row-body:nth-child(odd) {
      background: var(--color-general-neutral-lighter);
    }
    .table-row-body:nth-child(even) {
      background: var(--color-general-white);
    }
    .table-row-body > * {
      border-left: none;
      border-right: none;
      border-top: none;
    }
    .table-row-body:not(:last-child) > * {
      border-bottom: 1px solid var(--color-action-outline-secondary-enabled);
    }
    .table-row-body:not(.disabled):not(.selected):hover {
      background: var(--color-general-neutral-light);
    }
    .table-row-body.selected {
      background: var(--color-general-informative);
    }
    .table-row-body.selected:hover {
      background: var(--color-general-informative);
    }
    .table-row-body.disabled {
      background: var(--color-general-neutral-light);
      cursor: not-allowed;
    }
  `,

  stickyColumn: `
    .table-cell-sticky {
      position: sticky;
      right: 0;
      background: inherit;
      z-index: 1;
      box-shadow: -2px 0 4px rgba(0, 0, 0, 0.05);
    }
    .table-row-header .table-cell-sticky {
      background: transparent;
      box-shadow: none;
    }
    .table-row-body .table-cell-sticky {
      background: var(--color-general-white);
    }
    .table-row-body:hover .table-cell-sticky {
      background: var(--color-general-neutral-lighter);
    }
    .table-row-body.selected .table-cell-sticky {
      background: var(--color-general-informative);
    }
  `,

  header: `
    .table-cell-header {
      display: table-cell;
      vertical-align: middle;
      overflow: hidden;
      width: auto;
    }
    .table-cell-header-inner {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: var(--spacing-1);
      padding-left: var(--spacing-4);
      padding-right: var(--spacing-4);
      padding-top: var(--spacing-3);
      padding-bottom: var(--spacing-2);
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
      overflow: hidden;
    }
    .table-cell-title-inner {
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
      gap: var(--spacing-1);
      padding-left: var(--spacing-4);
      padding-right: var(--spacing-4);
      padding-top: var(--spacing-3);
      padding-bottom: var(--spacing-2);
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
    .table-cell-title-text > * {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
    }
  `,
};

/* ===========================================
   STYLE INJECTION (SSR-safe)
   =========================================== */

let stylesInjected = false;

const injectStyles = () => {
  if (stylesInjected || typeof document === "undefined") return;

  const css = [styles.table, styles.row, styles.stickyColumn, styles.header, styles.title].join(
    "\n"
  );

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
 */
export const TableCellHeader = ({
  sortable = false,
  sort = "",
  onSort,
  sticky = false,
  width,
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

  const cellClasses = ["table-cell-header", sticky && "table-cell-sticky", className]
    .filter(Boolean)
    .join(" ");

  const style = width ? { width, minWidth: width, maxWidth: width } : undefined;

  return (
    <div className={cellClasses} style={style} {...props}>
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
 * A table container with optional horizontal scrolling and sticky columns.
 * @example
 * <Table scrollable>
 *   <TableRow variant="header">
 *     <TableCellHeader sortable>Company</TableCellHeader>
 *     <TableCellHeader sortable>Revenue</TableCellHeader>
 *     <TableCellHeader sticky>Actions</TableCellHeader>
 *   </TableRow>
 *   <TableRow>
 *     <TableCell>Acme Corp</TableCell>
 *     <TableCell>$1M</TableCell>
 *     <TableCell sticky><Button iconOnly><Icon name="EllipsisVertical" /></Button></TableCell>
 *   </TableRow>
 * </Table>
 */
export const Table = ({
  bordered = true,
  scrollable = false,
  className = "",
  children,
  columns,
  rows = [],
  rowKey = "id",
  emptyState,
  ...props
}) => {
  injectStyles();

  const tableClasses = ["table", bordered && "bordered", className].filter(Boolean).join(" ");

  const renderDefaultButtonCell = (value) => {
    const isObjectValue = value && typeof value === "object" && !Array.isArray(value);

    const label = isObjectValue
      ? value.label
      : typeof value === "string" || typeof value === "number"
      ? String(value)
      : "";

    const iconName = isObjectValue ? value.iconName : undefined;
    const buttonVariant = isObjectValue ? value.buttonVariant || "secondary" : "secondary";
    const buttonSize = isObjectValue ? value.buttonSize || "sm" : "sm";
    const onClick = isObjectValue ? value.onClick : undefined;
    const isDisabled = isObjectValue ? value.isDisabled : false;

    const iconSlot = (
      <span
        style={{
          width: "var(--size-icon-sm)",
          height: "var(--size-icon-sm)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          visibility: iconName ? "visible" : "hidden",
        }}
      >
        {iconName ? <Icon name={iconName} size="sm" /> : null}
      </span>
    );

    return (
      <Button
        variant={buttonVariant}
        size={buttonSize}
        iconLeading={iconSlot}
        onClick={onClick}
        isDisabled={isDisabled}
      >
        {label}
      </Button>
    );
  };

  const hasColumnConfig = Array.isArray(columns) && columns.length > 0;

  const renderColumnCellContent = (column, row, rowIndex) => {
    const value = column.key ? row?.[column.key] : undefined;

    if (typeof column.renderCell === "function") {
      return column.renderCell(value, row, rowIndex);
    }

    if (column.variant === "button") {
      return renderDefaultButtonCell(value);
    }

    return value;
  };

  const renderColumnMode = () => {
    const headerRow = (
      <div className="table-header-wrapper">
        <div className="table-scroll-container">
          <div className="table-inner" role="table">
            <TableRow variant="header">
              {columns.map((column, columnIndex) => {
                const isActionColumn =
                  column.variant === "button" &&
                  (column.key === "action" ||
                    column.key === "actions" ||
                    column.header === "action" ||
                    column.header === "actions" ||
                    column.header === "Action" ||
                    column.header === "Actions");

                const sticky = column.sticky ?? isActionColumn;
                const width = column.width ?? (isActionColumn ? "56px" : undefined);

                return (
                  <TableCellHeader
                    key={column.key || `column-${columnIndex}`}
                    sortable={Boolean(column.sortable)}
                    sort={column.sort || ""}
                    onSort={column.onSort}
                    sticky={sticky}
                    width={width}
                  >
                    {column.header || column.label || ""}
                  </TableCellHeader>
                );
              })}
            </TableRow>
          </div>
        </div>
      </div>
    );

    const bodyRows = rows.map((row, rowIndex) => {
      const keyFromFunction = typeof rowKey === "function" ? rowKey(row, rowIndex) : undefined;
      const keyFromField = typeof rowKey === "string" ? row?.[rowKey] : undefined;
      const rowIdentity = keyFromFunction ?? keyFromField ?? rowIndex;

      return (
        <TableRow key={rowIdentity}>
          {columns.map((column, columnIndex) => {
            const isActionColumn =
              column.variant === "button" &&
              (column.key === "action" ||
                column.key === "actions" ||
                column.header === "action" ||
                column.header === "actions" ||
                column.header === "Action" ||
                column.header === "Actions");

            const sticky = column.sticky ?? isActionColumn;
            const width = column.width ?? (isActionColumn ? "56px" : undefined);

            return (
              <TableCell
                key={(column.key || `column-${columnIndex}`) + `-${rowIndex}`}
                variant={column.variant || "short-text"}
                sticky={sticky}
                width={width}
              >
                {renderColumnCellContent(column, row, rowIndex)}
              </TableCell>
            );
          })}
        </TableRow>
      );
    });

    const emptyRow =
      rows.length === 0 && emptyState ? (
        <TableRow>
          <TableCell variant="short-text" width="100%">
            {emptyState}
          </TableCell>
        </TableRow>
      ) : null;

    return (
      <>
        {headerRow}
        <div className="table-body-wrapper">
          <div className="table-scroll-container">
            <div className="table-inner" role="table">
              {bodyRows}
              {emptyRow}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={tableClasses} {...props}>
      {hasColumnConfig ? renderColumnMode() : children}
    </div>
  );
};

export default Table;
