/**
 * Table Components (Organism)
 *
 * A complete table system with header, body rows, and various cell types.
 * Uses design tokens from tokens.css.
 */

import { Children, cloneElement, createContext, isValidElement, useContext } from "react";

// Re-export TableCell and helpers for convenience
export {
  TableCell,
  TableCellLinkRow,
  TableCellLinkedName,
  TableCellTags,
  TableCellTwoLevel,
  TABLECELL_VARIANTS,
} from "./tablecell.jsx";
import { TableCell } from "./tablecell.jsx";
import { Button } from "../../atoms/button.jsx";
import { Badge } from "../../atoms/badge.jsx";
import { Chip } from "../../atoms/chip.jsx";
import { Checkbox } from "../../atoms/checkbox.jsx";
import { Icon } from "../../atoms/icon.jsx";
import { Link } from "../../atoms/link.jsx";
import { TextInput } from "../../molecules/text-input.jsx";

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
      background: inherit;
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

  tableCard: `
    .table-card-root {
      border: 1px solid var(--color-action-outline-secondary-enabled);
      border-radius: 8px;
      background: var(--color-general-white);
      overflow: hidden;
      width: 100%;
    }
    .table-card-header {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-4);
      padding: var(--spacing-4) var(--spacing-6);
      border-bottom: 1px solid var(--color-action-outline-secondary-enabled);
      background: var(--color-general-white);
    }
    .table-card-title-wrap {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-2);
      min-width: 0;
    }
    .table-card-title {
      font-family: var(--font-family-primary);
      font-size: var(--text-heading-h5);
      line-height: var(--line-height-heading-h5);
      font-weight: var(--font-weight-semibold);
      color: var(--color-content-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .table-card-badge {
      font-family: var(--font-family-primary);
      font-size: var(--text-body-sm);
      line-height: var(--line-height-body-sm);
      color: var(--color-content-secondary);
      white-space: nowrap;
    }
    .table-card-trailing {
      display: inline-flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--spacing-2);
      flex-shrink: 0;
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
    styles.table,
    styles.row,
    styles.stickyColumn,
    styles.header,
    styles.title,
    styles.tableCard,
  ].join("\n");

  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-eureka", "table");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
  stylesInjected = true;
};

/* ===========================================
   TABLE CARD COMPONENTS
   =========================================== */

const TableCardRoot = ({ className = "", children, ...props }) => {
  injectStyles();

  const classes = ["table-card-root", className].filter(Boolean).join(" ");
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

TableCardRoot.displayName = "TableCardRoot";

const TableCardHeader = ({
  title,
  badge,
  contentTrailing,
  className = "",
  children,
  ...props
}) => {
  injectStyles();

  const classes = ["table-card-header", className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...props}>
      <div className="table-card-title-wrap">
        {title ? <h3 className="table-card-title">{title}</h3> : null}
        {badge ? <span className="table-card-badge">{badge}</span> : null}
      </div>
      {contentTrailing ? <div className="table-card-trailing">{contentTrailing}</div> : null}
      {children}
    </div>
  );
};

TableCardHeader.displayName = "TableCardHeader";

export const TableCard = {
  Root: TableCardRoot,
  Header: TableCardHeader,
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
   COMPOUND TABLE API
   =========================================== */

const TableContext = createContext({
  sortDescriptor: null,
  onSortChange: undefined,
});

export const TABLE_COLUMN_TYPES = {
  text: "text",
  shortText: "short-text",
  longText: "long-text",
  button: "button",
  badge: "badge",
  badges: "badges",
  chip: "chip",
  chips: "chips",
  checkbox: "checkbox",
  link: "link",
  textIcon: "text-icon",
  textInput: "text-input",
  "short-text": "short-text",
  "long-text": "long-text",
  "text-icon": "text-icon",
  "text-input": "text-input",
};

const normalizeColumnType = (type) => {
  if (!type) return "short-text";

  const normalized = String(type)
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-");

  if (normalized === "shorttext") return "short-text";
  if (normalized === "longtext") return "long-text";
  if (normalized === "text") return "short-text";
  if (normalized === "badge") return "badge";
  if (normalized === "badges") return "badges";
  if (normalized === "chip") return "chip";
  if (normalized === "chips") return "chips";
  if (normalized === "checkbox") return "checkbox";
  if (normalized === "link") return "link";
  if (normalized === "texticon") return "text-icon";
  if (normalized === "text-input") return "text-input";
  if (normalized === "textinput") return "text-input";

  return normalized;
};

const getOverflowList = (items, maxVisible = 4) => {
  if (!Array.isArray(items)) {
    return { visibleItems: [], overflowCount: 0 };
  }

  const visibleItems = items.slice(0, Math.max(0, maxVisible));
  const overflowCount = Math.max(0, items.length - visibleItems.length);
  return { visibleItems, overflowCount };
};

const toCamelCase = (value) => {
  if (!value) return "";

  const segments = String(value)
    .trim()
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean);

  if (segments.length === 0) return "";

  return segments
    .map((segment, index) => {
      const lower = segment.toLowerCase();
      if (index === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
};

const resolveColumnValue = (row, column, columnIndex) => {
  if (typeof column?.accessor === "function") {
    return column.accessor(row, columnIndex, column);
  }

  if (Array.isArray(row)) {
    return row[columnIndex];
  }

  if (!row || typeof row !== "object") {
    return undefined;
  }

  const candidates = [];

  if (column?.key) candidates.push(column.key);
  if (column?.dataKey) candidates.push(column.dataKey);

  const label = column?.label ?? column?.header;
  if (typeof label === "string" && label.trim()) {
    const trimmed = label.trim();
    candidates.push(trimmed);
    candidates.push(trimmed.toLowerCase());
    candidates.push(trimmed.replace(/\s+/g, "-"));
    candidates.push(trimmed.replace(/\s+/g, "_"));
    candidates.push(toCamelCase(trimmed));
  }

  const columnType = normalizeColumnType(column?.type || column?.variant);
  if (columnType === TABLE_COLUMN_TYPES.button) {
    candidates.push("action", "actions");
  }

  const uniqueCandidates = Array.from(new Set(candidates.filter(Boolean)));

  for (const candidate of uniqueCandidates) {
    if (Object.prototype.hasOwnProperty.call(row, candidate)) {
      return row[candidate];
    }
  }

  const objectValues = Object.entries(row)
    .filter(([entryKey]) => entryKey !== "id" && entryKey !== "key")
    .map(([, entryValue]) => entryValue);

  return objectValues[columnIndex];
};

const toLegacySortDirection = (direction) => {
  if (direction === "ascending") return "asc";
  if (direction === "descending") return "desc";
  return "";
};

const toSortDescriptorDirection = (direction) => {
  if (direction === "asc") return "ascending";
  if (direction === "desc") return "descending";
  return "none";
};

const TableHeaderSection = ({ children }) => {
  return <TableRow variant="header">{children}</TableRow>;
};

TableHeaderSection.displayName = "TableHeaderSection";

const TableHead = ({
  id,
  label,
  allowsSorting = false,
  sortable,
  sort,
  onSort,
  children,
  ...props
}) => {
  const { sortDescriptor, onSortChange } = useContext(TableContext);

  const isSortable = sortable ?? allowsSorting;
  const contextSort =
    sortDescriptor?.column === id ? toLegacySortDirection(sortDescriptor.direction) : "";
  const activeSort = sort ?? contextSort;

  const handleSort = ({ direction }) => {
    onSort?.({ direction });

    if (onSortChange && id) {
      onSortChange({
        column: id,
        direction: toSortDescriptorDirection(direction),
      });
    }
  };

  return (
    <TableCellHeader sortable={Boolean(isSortable)} sort={activeSort} onSort={handleSort} {...props}>
      {label ?? children}
    </TableCellHeader>
  );
};

TableHead.displayName = "TableHead";

const TableBodySection = ({ items, children, emptyState = null }) => {
  const isCollectionMode = Array.isArray(items) && typeof children === "function";

  if (!isCollectionMode) {
    return <>{children}</>;
  }

  if (items.length === 0 && emptyState) {
    return (
      <TableRow>
        <TableCell variant="short-text" width="100%">
          {emptyState}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {items.map((item, index) => {
        const rowElement = children(item, index);

        if (!isValidElement(rowElement)) {
          return rowElement;
        }

        if (rowElement.key != null) {
          return rowElement;
        }

        const fallbackKey = item?.id ?? item?.key ?? index;
        return cloneElement(rowElement, { key: fallbackKey });
      })}
    </>
  );
};

TableBodySection.displayName = "TableBodySection";

const TableColumnsSection = ({ children }) => {
  return <>{children}</>;
};

TableColumnsSection.displayName = "TableColumnsSection";

const TableColumn = () => null;

TableColumn.displayName = "TableColumn";

const isSlot = (node, displayName) => {
  if (!isValidElement(node)) return false;
  return node.type?.displayName === displayName;
};

const getSlotNode = (children, displayName) => {
  const match = Children.toArray(children).find((child) => isSlot(child, displayName));
  return isValidElement(match) ? match : null;
};

const getColumnsFromChildren = (children) => {
  const columnsSlot = getSlotNode(children, "TableColumnsSection");
  if (!columnsSlot) return [];

  return Children.toArray(columnsSlot.props?.children)
    .filter((child) => isSlot(child, "TableColumn"))
    .map((child) => child.props || {});
};

const getColumnVariant = (column = {}) => {
  return normalizeColumnType(column.type || column.variant || "short-text");
};

const getColumnAtomProps = (column, specificKey) => {
  const shared = column?.atomProps && typeof column.atomProps === "object" ? column.atomProps : {};
  const specific =
    specificKey && column?.[specificKey] && typeof column[specificKey] === "object"
      ? column[specificKey]
      : {};

  return {
    ...shared,
    ...specific,
  };
};

const getDefaultCellVariant = (columnVariant) => {
  switch (columnVariant) {
    case "long-text":
      return "long-text";
    case "button":
      return "button";
    case "badge":
      return "badge";
    case "checkbox":
      return "checkbox";
    case "text-input":
      return "input";
    case "text-icon":
      return "linked-value";
    case "link":
      return "linked-object";
    case "chips":
      return "tag-2lines";
    case "badges":
      return "tag-2lines";
    case "chip":
      return "tags";
    case "short-text":
    default:
      return "short-text";
  }
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
  sortDescriptor,
  onSortChange,
  columns,
  rows = [],
  rowKey = "id",
  emptyState,
  buttonCellProps,
  ...props
}) => {
  injectStyles();

  const tableClasses = ["table", bordered && "bordered", className].filter(Boolean).join(" ");
  const columnsFromChildren = getColumnsFromChildren(children);
  const resolvedColumns = Array.isArray(columns) && columns.length > 0 ? columns : columnsFromChildren;

  const renderDefaultButtonCell = (value, row, rowIndex, column) => {
    const isObjectValue = value && typeof value === "object" && !Array.isArray(value);
    const contextualButtonProps =
      typeof buttonCellProps === "function"
        ? buttonCellProps({ value, row, rowIndex, column })
        : buttonCellProps;
    const columnButtonProps = getColumnAtomProps(column, "buttonProps");
    const valueButtonProps =
      isObjectValue && value.buttonProps && typeof value.buttonProps === "object"
        ? value.buttonProps
        : undefined;

    const resolvedButtonProps = {
      ...(contextualButtonProps || {}),
      ...(columnButtonProps || {}),
      ...(valueButtonProps || {}),
    };

    const {
      variant: buttonPropsVariant,
      size: buttonPropsSize,
      iconLeading: buttonPropsIconLeading,
      onClick: buttonPropsOnClick,
      isDisabled: buttonPropsIsDisabled,
      children: buttonPropsChildren,
      iconOnly: buttonPropsIconOnly,
      ariaLabel: buttonPropsAriaLabel,
      "aria-label": buttonPropsAriaLabelAttr,
      ...restButtonProps
    } = resolvedButtonProps;

    const label = isObjectValue
      ? value.label
      : typeof value === "string" || typeof value === "number"
      ? String(value)
      : "";

    const iconName = isObjectValue ? value.iconName : undefined;
    const buttonVariant =
      (isObjectValue ? value.buttonVariant : undefined) || buttonPropsVariant || "secondary";
    const buttonSize =
      (isObjectValue ? value.buttonSize : undefined) || buttonPropsSize || "sm";
    const onClick =
      (isObjectValue ? value.onClick : undefined) || buttonPropsOnClick;
    const isDisabled =
      (isObjectValue ? value.isDisabled : undefined) ?? buttonPropsIsDisabled ?? false;
    const resolvedLabel = buttonPropsChildren ?? label;
    const hasResolvedLabel = typeof resolvedLabel === "string" ? resolvedLabel.trim().length > 0 : Boolean(resolvedLabel);
    const iconOnly =
      (isObjectValue ? value.iconOnly : undefined) ??
      buttonPropsIconOnly ??
      !hasResolvedLabel;
    const resolvedAriaLabel =
      (isObjectValue ? value.ariaLabel : undefined) ??
      buttonPropsAriaLabelAttr ??
      buttonPropsAriaLabel ??
      (iconOnly ? "More actions" : undefined);

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
        iconLeading={buttonPropsIconLeading || iconSlot}
        onClick={onClick}
        isDisabled={isDisabled}
        iconOnly={iconOnly}
        aria-label={resolvedAriaLabel}
        {...restButtonProps}
      >
        {iconOnly ? null : resolvedLabel}
      </Button>
    );
  };

  const hasColumnConfig = Array.isArray(resolvedColumns) && resolvedColumns.length > 0;

  const hasCompoundApi =
    !hasColumnConfig &&
    Children.toArray(children).some(
      (child) =>
        isSlot(child, "TableHeaderSection") ||
        isSlot(child, "TableBodySection")
    );

  const renderColumnCellContent = (column, row, rowIndex) => {
    const value = resolveColumnValue(row, column, rowIndex);
    const columnVariant = getColumnVariant(column);

    if (typeof column.renderCell === "function") {
      return column.renderCell(value, row, rowIndex);
    }

    if (value && typeof value === "object" && value.isRaw) {
      return value.content;
    }

    if (columnVariant === TABLE_COLUMN_TYPES.button) {
      return renderDefaultButtonCell(value, row, rowIndex, column);
    }

    if (columnVariant === TABLE_COLUMN_TYPES.badge) {
      const columnBadgeProps = getColumnAtomProps(column, "badgeProps");

      if (value && typeof value === "object" && !Array.isArray(value) && !value.$$typeof) {
        const { label, children, badgeProps, ...restBadgeProps } = value;
        return (
          <Badge {...columnBadgeProps} {...restBadgeProps} {...(badgeProps || {})}>
            {children ?? label ?? ""}
          </Badge>
        );
      }

      return <Badge {...columnBadgeProps}>{value ?? ""}</Badge>;
    }

    if (columnVariant === TABLE_COLUMN_TYPES.badges) {
      const columnBadgeProps = getColumnAtomProps(column, "badgeProps");
      const itemList = Array.isArray(value)
        ? value
        : value?.items && Array.isArray(value.items)
        ? value.items
        : [];
      const maxVisible = value?.maxVisible ?? column.maxVisible ?? 4;
      const { visibleItems, overflowCount } = getOverflowList(itemList, maxVisible);

      return (
        <div style={{ display: "flex", gap: "var(--spacing-xs)", flexWrap: "wrap", alignItems: "center" }}>
          {visibleItems.map((item, index) => {
            if (item && typeof item === "object" && !item.$$typeof) {
              const { label, children, badgeProps, ...restBadgeProps } = item;
              return (
                <Badge key={`badge-${index}`} {...columnBadgeProps} {...restBadgeProps} {...(badgeProps || {})}>
                  {children ?? label ?? ""}
                </Badge>
              );
            }

            return <Badge key={`badge-${index}`} {...columnBadgeProps}>{item ?? ""}</Badge>;
          })}
          {overflowCount > 0 && <Badge {...columnBadgeProps}>+{overflowCount}</Badge>}
        </div>
      );
    }

    if (columnVariant === TABLE_COLUMN_TYPES.chip) {
      const columnChipProps = getColumnAtomProps(column, "chipProps");

      if (value && typeof value === "object" && !Array.isArray(value) && !value.$$typeof) {
        const {
          label,
          children,
          chipProps,
          variant,
          color,
          chevron = true,
          removable = true,
          ...restChipProps
        } = value;

        const resolvedChevron =
          chipProps?.chevron ?? restChipProps?.chevron ?? columnChipProps?.chevron ?? chevron;
        const resolvedRemovable =
          chipProps?.removable ?? restChipProps?.removable ?? columnChipProps?.removable ?? removable;

        return (
          <Chip
            chevron={resolvedChevron}
            removable={resolvedRemovable}
            {...columnChipProps}
            {...restChipProps}
            {...(chipProps || {})}
          >
            {children ?? label ?? ""}
          </Chip>
        );
      }

      return (
        <Chip
          chevron={columnChipProps?.chevron ?? true}
          removable={columnChipProps?.removable ?? true}
          {...columnChipProps}
        >
          {value ?? ""}
        </Chip>
      );
    }

    if (columnVariant === TABLE_COLUMN_TYPES.chips) {
      const columnChipProps = getColumnAtomProps(column, "chipProps");
      const itemList = Array.isArray(value)
        ? value
        : value?.items && Array.isArray(value.items)
        ? value.items
        : [];
      const maxVisible = value?.maxVisible ?? column.maxVisible ?? 4;
      const { visibleItems, overflowCount } = getOverflowList(itemList, maxVisible);

      return (
        <div style={{ display: "flex", gap: "var(--spacing-xs)", flexWrap: "wrap", alignItems: "center" }}>
          {visibleItems.map((item, index) => {
            if (item && typeof item === "object" && !item.$$typeof) {
              const {
                label,
                children,
                chipProps,
                variant,
                color,
                chevron = true,
                removable = true,
                ...restChipProps
              } = item;

              const resolvedChevron =
                chipProps?.chevron ?? restChipProps?.chevron ?? columnChipProps?.chevron ?? chevron;
              const resolvedRemovable =
                chipProps?.removable ?? restChipProps?.removable ?? columnChipProps?.removable ?? removable;

              return (
                <Chip
                  key={`chip-${index}`}
                  chevron={resolvedChevron}
                  removable={resolvedRemovable}
                  {...columnChipProps}
                  {...restChipProps}
                  {...(chipProps || {})}
                >
                  {children ?? label ?? ""}
                </Chip>
              );
            }

            return (
              <Chip
                key={`chip-${index}`}
                chevron={columnChipProps?.chevron ?? true}
                removable={columnChipProps?.removable ?? true}
                {...columnChipProps}
              >
                {item ?? ""}
              </Chip>
            );
          })}
          {overflowCount > 0 && <Badge>+{overflowCount}</Badge>}
        </div>
      );
    }

    if (columnVariant === TABLE_COLUMN_TYPES.checkbox) {
      const columnCheckboxProps = getColumnAtomProps(column, "checkboxProps");

      if (typeof value === "boolean") {
        return <Checkbox isSelected={value} {...columnCheckboxProps} />;
      }

      if (value && typeof value === "object" && !value.$$typeof) {
        const { isSelected, checked, checkboxProps, ...restCheckboxProps } = value;
        return (
          <Checkbox
            isSelected={isSelected ?? checked}
            {...columnCheckboxProps}
            {...restCheckboxProps}
            {...(checkboxProps || {})}
          />
        );
      }

      return <Checkbox {...columnCheckboxProps} />;
    }

    if (columnVariant === TABLE_COLUMN_TYPES.link) {
      const columnLinkProps = getColumnAtomProps(column, "linkProps");

      if (value && typeof value === "object" && !value.$$typeof) {
        const {
          label,
          children,
          href,
          iconLeading,
          iconTrailing,
          iconLeadingName,
          iconTrailingName,
          iconSize = "sm",
          linkProps,
          ...restLinkProps
        } = value;

        return (
          <Link
            href={href}
            iconLeading={iconLeading || (iconLeadingName ? <Icon name={iconLeadingName} size={iconSize} /> : undefined)}
            iconTrailing={iconTrailing || (iconTrailingName ? <Icon name={iconTrailingName} size={iconSize} /> : undefined)}
            {...columnLinkProps}
            {...restLinkProps}
            {...(linkProps || {})}
          >
            {children ?? label ?? ""}
          </Link>
        );
      }

      return <Link {...columnLinkProps}>{value ?? ""}</Link>;
    }

    if (columnVariant === TABLE_COLUMN_TYPES.textIcon) {
      const columnTextIconProps = getColumnAtomProps(column, "textIconProps");
      const columnGap = columnTextIconProps.gap || "var(--spacing-xs)";

      if (value && typeof value === "object" && !value.$$typeof) {
        const {
          text,
          label,
          children,
          icon,
          iconName,
          iconSize = "sm",
          iconProps,
          containerProps,
        } = value;

        return (
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: columnGap }}
            {...columnTextIconProps}
            {...(containerProps || {})}
          >
            {icon || (iconName ? <Icon name={iconName} size={iconSize} {...(iconProps || {})} /> : null)}
            <span>{children ?? text ?? label ?? ""}</span>
          </span>
        );
      }

      return <span {...columnTextIconProps}>{value ?? ""}</span>;
    }

    if (columnVariant === TABLE_COLUMN_TYPES.textInput) {
      const columnTextInputProps = getColumnAtomProps(column, "textInputProps");

      if (value && typeof value === "object" && !value.$$typeof) {
        const {
          textInputProps,
          inputProps,
          placeholder,
          defaultValue,
          value: inputValue,
          onChange,
          ...restInputProps
        } = value;

        return (
          <TextInput
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={inputValue}
            onChange={onChange}
            {...columnTextInputProps}
            {...restInputProps}
            {...(textInputProps || inputProps || {})}
          />
        );
      }

      return (
        <TextInput
          defaultValue={typeof value === "string" ? value : undefined}
          {...columnTextInputProps}
        />
      );
    }

    return value;
  };

  const renderColumnMode = () => {
    const headerRow = (
      <div className="table-header-wrapper">
        <div className="table-scroll-container">
          <div className="table-inner" role="table">
            <TableRow variant="header">
              {resolvedColumns.map((column, columnIndex) => {
                const columnVariant = getColumnVariant(column);
                const isActionColumn =
                  columnVariant === TABLE_COLUMN_TYPES.button &&
                  (column.key === "action" ||
                    column.key === "actions" ||
                    column.header === "action" ||
                    column.header === "actions" ||
                    column.header === "Action" ||
                    column.header === "Actions");

                const sticky = column.sticky ?? isActionColumn;
                const width = column.width ?? (isActionColumn ? "56px" : undefined);
                const headerContainerProps = column.headerContainerProps || {};

                return (
                  <TableCellHeader
                    key={column.key || `column-${columnIndex}`}
                    sortable={Boolean(column.sortable)}
                    sort={column.sort || ""}
                    onSort={column.onSort}
                    sticky={sticky}
                    width={width}
                    {...headerContainerProps}
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
          {resolvedColumns.map((column, columnIndex) => {
            const columnVariant = getColumnVariant(column);
            const isActionColumn =
              columnVariant === TABLE_COLUMN_TYPES.button &&
              (column.key === "action" ||
                column.key === "actions" ||
                column.header === "action" ||
                column.header === "actions" ||
                column.header === "Action" ||
                column.header === "Actions");

            const sticky = column.sticky ?? isActionColumn;
            const width = column.width ?? (isActionColumn ? "56px" : undefined);
            const value = resolveColumnValue(row, column, rowIndex);
            const cellContainerProps =
              typeof column.cellContainerProps === "function"
                ? column.cellContainerProps({ value, row, rowIndex, column, columnIndex })
                : column.cellContainerProps || {};

            return (
              <TableCell
                key={(column.key || `column-${columnIndex}`) + `-${rowIndex}`}
                variant={column.cellVariant || getDefaultCellVariant(columnVariant)}
                sticky={sticky}
                width={width}
                {...cellContainerProps}
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
    <TableContext.Provider value={{ sortDescriptor, onSortChange }}>
      <div className={tableClasses} {...props}>
        {hasColumnConfig ? (
          renderColumnMode()
        ) : hasCompoundApi ? (
          <>
            <div className="table-header-wrapper">
              <div className="table-scroll-container">
                <div className="table-inner" role="table">
                  {getSlotNode(children, "TableHeaderSection")}
                </div>
              </div>
            </div>
            <div className="table-body-wrapper">
              <div className="table-scroll-container">
                <div className="table-inner" role="table">
                  {getSlotNode(children, "TableBodySection")}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="table-scroll-container">
            <div className="table-inner" role="table">
              {children}
            </div>
          </div>
        )}
      </div>
    </TableContext.Provider>
  );
};

Table.Header = TableHeaderSection;
Table.Head = TableHead;
Table.Body = TableBodySection;
Table.Columns = TableColumnsSection;
Table.Column = TableColumn;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Button = Button;
Table.Icon = Icon;
Table.ColumnTypes = TABLE_COLUMN_TYPES;

export const TableHeader = TableHeaderSection;
export const TableBody = TableBodySection;
export const TableColumns = TableColumnsSection;
export { TableColumn };
export { TableHead };

// Re-export commonly used child components for convenience
export { Button } from "../../atoms/button.jsx";
export { Badge } from "../../atoms/badge.jsx";
export { Chip } from "../../atoms/chip.jsx";
export { Checkbox } from "../../atoms/checkbox.jsx";
export { Icon } from "../../atoms/icon.jsx";
export { Link } from "../../atoms/link.jsx";
export { TextInput } from "../../molecules/text-input.jsx";

export default Table;
