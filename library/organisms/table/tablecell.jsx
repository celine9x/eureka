/**
 * TableCell Component (Organism)
 *
 * A table cell with various layout variants.
 * Uses design tokens from tokens.css.
 */

import React from "react";
import { createStyleInjector, cx } from "../../utils/styles.js";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

/** TableCell variants */
export const TABLECELL_VARIANTS = {
  "short-text": "short-text",
  "long-text": "long-text",
  button: "button",
  "two-level": "two-level",
  "two-level-objects": "two-level-objects",
  tags: "tags",
  "tags-2": "tags-2",
  "tag-1line": "tag-1line",
  "tag-2lines": "tag-2lines",
  badge: "badge",
  checkbox: "checkbox",
  input: "input",
  "linked-value": "linked-value",
  "linked-object": "linked-object",
};

// ─────────────────────────────────────────────
// STYLE CONFIGURATION
// ─────────────────────────────────────────────

export const styleClasses = {
  common: {
    root: "table-cell",
    icon: "table-cell-icon",
    content: "table-cell-content",
  },
  variants: {
    "short-text": "table-cell-short-text",
    "long-text": "table-cell-long-text",
    button: "table-cell-button",
    "two-level": "table-cell-two-level",
    "two-level-objects": "table-cell-two-level-objects",
    tags: "table-cell-tags",
    "tags-2": "table-cell-tags-2",
    "tag-1line": "table-cell-tag-1line",
    "tag-2lines": "table-cell-tag-2lines",
    badge: "table-cell-badge",
    checkbox: "table-cell-checkbox",
    input: "table-cell-input",
    "linked-value": "table-cell-linked-value",
    "linked-object": "table-cell-linked-object",
  },
};

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  base: `
  /* ===========================================
     BASE STYLES
     =========================================== */
  .table-cell {
    flex: 1 1 0;
    min-width: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-left: var(--spacing-4);
    padding-right: var(--spacing-4);
    background: transparent;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: var(--spacing-2);
    overflow: hidden;
  }

  .table-cell-icon {
    flex-shrink: 0;
    width: var(--size-icon-sm);
    height: var(--size-icon-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-content-secondary);
  }
  .table-cell-icon svg {
    width: 100%;
    height: 100%;
  }
  .table-cell-icon.md {
    width: var(--size-icon-md);
    height: var(--size-icon-md);
  }

  .table-cell-content {
    flex: 1 1 0;
    min-width: 0;
    font-family: var(--font-family-primary);
    color: var(--color-content-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ===========================================
     VARIANT: short-text
     =========================================== */
  .table-cell-short-text {
    padding-top: var(--spacing-3-5);
    padding-bottom: var(--spacing-3-5);
  }
  .table-cell-short-text .table-cell-content {
    font-size: var(--text-body-lg);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-body-lg);
  }

  /* ===========================================
     VARIANT: long-text
     =========================================== */
  .table-cell-long-text {
    padding-top: var(--spacing-2);
    padding-bottom: var(--spacing-2);
    align-items: flex-start;
  }
  .table-cell-long-text .table-cell-icon {
    margin-top: 0.125rem;
  }
  .table-cell-long-text .table-cell-content {
    white-space: normal;
    font-size: var(--text-body-md);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-body-md);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  /* ===========================================
     VARIANT: button
     =========================================== */
  .table-cell-button {
    padding-top: var(--spacing-3);
    padding-bottom: var(--spacing-3);
  }

  /* ===========================================
     VARIANT: two-level
     =========================================== */
  .table-cell-two-level {
    padding-top: var(--spacing-1);
    padding-bottom: var(--spacing-1);
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }

  /* ===========================================
     VARIANT: two-level-objects
     Two rows of link-like items (LG + MD)
     =========================================== */
  .table-cell-two-level-objects {
    padding-top: var(--spacing-1);
    padding-bottom: var(--spacing-1);
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 0;
  }
  .table-cell-two-level-objects .table-cell-link-row {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-1);
    padding: 0 var(--spacing-1);
    border-radius: var(--radius-md);
  }
  .table-cell-two-level-objects .table-cell-link-row.lg {
    height: 1.75rem;
  }
  .table-cell-two-level-objects .table-cell-link-row.lg .table-cell-link-icon {
    width: var(--size-icon-md);
    height: var(--size-icon-md);
  }
  .table-cell-two-level-objects .table-cell-link-row.lg .table-cell-link-text {
    font-size: var(--text-body-lg);
    line-height: var(--line-height-body-lg);
  }
  .table-cell-two-level-objects .table-cell-link-row.md {
    height: 1.5rem;
  }
  .table-cell-two-level-objects .table-cell-link-row.md .table-cell-link-icon {
    width: var(--size-icon-sm);
    height: var(--size-icon-sm);
  }
  .table-cell-two-level-objects .table-cell-link-row.md .table-cell-link-text {
    font-size: var(--text-body-md);
    line-height: var(--line-height-body-md);
  }
  .table-cell-two-level-objects .table-cell-link-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-content-brand);
    overflow: hidden;
  }
  .table-cell-two-level-objects .table-cell-link-icon svg {
    width: 100%;
    height: 100%;
  }
  .table-cell-two-level-objects .table-cell-link-text {
    font-family: var(--font-family-primary);
    font-weight: var(--font-weight-regular);
    color: var(--color-content-brand);
  }

  /* ===========================================
     VARIANT: tags
     =========================================== */
  .table-cell-tags {
    padding-top: var(--spacing-3);
    padding-bottom: var(--spacing-3);
    flex-wrap: nowrap;
  }

  /* ===========================================
     VARIANT: tags-2 (wrapping)
     =========================================== */
  .table-cell-tags-2 {
    padding-top: var(--spacing-2);
    padding-bottom: var(--spacing-2);
    flex-wrap: wrap;
    align-content: flex-start;
    gap: var(--spacing-1);
  }

  /* ===========================================
     VARIANT: tag-1line
     Tags in single line with overflow count
     =========================================== */
  .table-cell-tag-1line {
    padding-top: var(--spacing-3);
    padding-bottom: var(--spacing-3);
    flex-wrap: wrap;
    align-content: center;
    gap: var(--spacing-2);
    overflow: hidden;
    max-height: 48px;
  }

  /* ===========================================
     VARIANT: badge
     Cell containing a badge component
     =========================================== */
  .table-cell-badge {
    padding-top: var(--spacing-3);
    padding-bottom: var(--spacing-3);
    justify-content: flex-start;
    align-items: center;
  }

  /* ===========================================
     VARIANT: checkbox
     Cell with only a checkbox
     =========================================== */
  .table-cell-checkbox {
    padding: var(--spacing-4);
    justify-content: flex-start;
    align-items: center;
    flex: 0 0 auto;
    width: auto;
  }

  /* ===========================================
     VARIANT: input
     Cell with input/dropdown field
     =========================================== */
  .table-cell-input {
    padding-top: var(--spacing-3);
    padding-bottom: var(--spacing-3);
    justify-content: flex-start;
    align-items: center;
  }
  .table-cell-input .table-cell-input-wrapper {
    flex: 1 1 0;
    min-width: 0;
  }

  /* ===========================================
     VARIANT: linked-value
     Icon + name + badge
     =========================================== */
  .table-cell-linked-value {
    padding-top: var(--spacing-3-5);
    padding-bottom: var(--spacing-3-5);
    justify-content: flex-start;
    align-items: center;
    gap: var(--spacing-2);
  }
  .table-cell-linked-value .table-cell-icon {
    width: var(--size-icon-md);
    height: var(--size-icon-md);
    color: var(--color-content-secondary);
  }
  .table-cell-linked-value .table-cell-linked-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .table-cell-linked-value .table-cell-linked-row {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    gap: var(--spacing-2);
  }
  .table-cell-linked-value .table-cell-linked-name {
    font-family: var(--font-family-primary);
    font-size: var(--text-body-lg);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-body-lg);
    color: var(--color-content-primary);
  }

  /* ===========================================
     VARIANT: linked-object
     Link (with icons) + Badge
     =========================================== */
  .table-cell-linked-object {
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
    justify-content: flex-start;
    align-items: center;
    gap: var(--spacing-2);
  }

  /* ===========================================
     VARIANT: tag-2lines
     Tags wrapping to 2 lines with overflow count
     =========================================== */
  .table-cell-tag-2lines {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    flex-wrap: wrap;
    align-content: center;
    gap: var(--spacing-2);
    overflow: hidden;
    max-height: 60px;
  }
`,
};

const injectStyles = createStyleInjector("table-cell");
const css = Object.values(styles).join("\n");

// ─────────────────────────────────────────────
// TABLE CELL COMPONENT
// ─────────────────────────────────────────────

/**
 * TableCell
 *
 * @param {keyof typeof styles.variants} variant - Cell layout variant
 * @param {ReactNode} icon - Icon element for applicable variants
 * @param {ReactNode} children - Cell content
 *
 * @example
 * // Short text (default)
 * <TableCell>Short text</TableCell>
 * <TableCell variant="short-text" icon={<Icon name="Tag" />}>With icon</TableCell>
 *
 * // Long text
 * <TableCell variant="long-text">Long text content</TableCell>
 *
 * // Button
 * <TableCell variant="button"><Button>Action</Button></TableCell>
 *
 * // Two level objects (links)
 * <TableCell variant="two-level-objects">
 *   <Link size="lg" iconLeading={<Icon name="Smile" />}>Primary Link</Link>
 *   <Link size="md" iconLeading={<Icon name="Smile" />}>Secondary Link</Link>
 * </TableCell>
 *
 * // Badge
 * <TableCell variant="badge">
 *   <Badge iconName="ChevronDown">Label</Badge>
 * </TableCell>
 *
 * // Checkbox
 * <TableCell variant="checkbox">
 *   <Checkbox size="sm" />
 * </TableCell>
 *
 * // Input
 * <TableCell variant="input">
 *   <DropdownList placeholder="Select..." />
 * </TableCell>
 *
 * // Tags in one line
 * <TableCell variant="tag-1line">
 *   <Chip color="var(--color-accent-blue)">Tag 1</Chip>
 *   <Chip color="var(--color-accent-cyan)">Tag 2</Chip>
 *   <Badge>+2</Badge>
 * </TableCell>
 *
 * // Linked value
 * <TableCell variant="linked-value" icon={<Icon name="User" />}>
 *   <span className="table-cell-linked-name">John Doe</span>
 *   <Badge>+1</Badge>
 * </TableCell>
 *
 * // Linked object (Link with icons + Badge)
 * <TableCell variant="linked-object">
 *   <Link size="lg" iconLeading={<Icon name="Smile" />} iconTrailing={<Icon name="Smile" />}>Link</Link>
 *   <Badge>+1</Badge>
 * </TableCell>
 *
 * // Tags in 2 lines
 * <TableCell variant="tag-2lines">
 *   <Chip color="var(--color-accent-blue)">Label</Chip>
 *   <Chip color="var(--color-accent-cyan)">Label</Chip>
 *   <Chip color="var(--color-accent-yellow)">Label</Chip>
 *   <Badge>+1</Badge>
 * </TableCell>
 */
export const TableCell = ({
  variant = TABLECELL_VARIANTS["short-text"],
  icon,
  className,
  children,
  ...props
}) => {
  injectStyles(css);

  // Variants that just wrap children directly
  const simpleVariants = [
    "button",
    "two-level",
    "tags",
    "tags-2",
    "tag-1line",
    "tag-2lines",
    "badge",
    "checkbox",
    "input",
    "linked-object",
  ];

  // Two-level-objects variant - wraps children in link rows
  if (variant === "two-level-objects") {
    return (
      <div
        className={cx(styleClasses.common.root, styleClasses.variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }

  // Linked-value variant - icon + content with name and optional badge
  if (variant === "linked-value") {
    return (
      <div
        className={cx(styleClasses.common.root, styleClasses.variants[variant], className)}
        {...props}
      >
        {icon && <div className={cx(styleClasses.common.icon, "md")}>{icon}</div>}
        <div className="table-cell-linked-content">
          <div className="table-cell-linked-row">
            {children}
          </div>
        </div>
      </div>
    );
  }

  // Simple variants that just wrap children
  if (simpleVariants.includes(variant)) {
    return (
      <div
        className={cx(styleClasses.common.root, styleClasses.variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }

  // Text variants (short-text, long-text) with icon/content structure
  return (
    <div
      className={cx(styleClasses.common.root, styleClasses.variants[variant], className)}
      {...props}
    >
      {icon && <div className={styleClasses.common.icon}>{icon}</div>}
      <div className={styleClasses.common.content}>{children}</div>
    </div>
  );
};

TableCell.displayName = "TableCell";
TableCell.variants = TABLECELL_VARIANTS;

// ─────────────────────────────────────────────
// HELPER COMPONENTS FOR COMPLEX VARIANTS
// ─────────────────────────────────────────────

/**
 * TableCellLinkRow - For use within two-level-objects variant
 *
 * @param {string} size - lg | md
 * @param {ReactNode} icon - Leading icon
 * @param {string} href - Link URL
 * @param {ReactNode} children - Link text
 */
export const TableCellLinkRow = ({
  size = "lg",
  icon,
  href,
  onClick,
  className,
  children,
  ...props
}) => {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cx("table-cell-link-row", size, className)}
      {...props}
    >
      {icon && <span className="table-cell-link-icon">{icon}</span>}
      <span className="table-cell-link-text">{children}</span>
    </a>
  );
};

/**
 * TableCellLinkedName - For use within linked-value variant
 * Renders the primary name text
 */
export const TableCellLinkedName = ({ className, children, ...props }) => {
  return (
    <span className={cx("table-cell-linked-name", className)} {...props}>
      {children}
    </span>
  );
};

export default TableCell;
