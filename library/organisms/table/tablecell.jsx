"use client";

/**
 * TableCell Component (Organism)
 *
 * A table cell with various layout variants.
 * Uses design tokens from tokens.css.
 */

import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
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
    display: table-cell;
    vertical-align: middle;
    box-sizing: border-box;
    width: auto;
    padding-left: var(--spacing-4);
    padding-right: var(--spacing-4);
    background: transparent;
    overflow: hidden;
  }
  .table-cell-inner {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: var(--spacing-2);
    width: 100%;
    min-width: 0;
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
  .table-cell-icon--empty {
    visibility: hidden;
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
  .table-cell-content > * {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }

  /* ===========================================
     VARIANT: short-text
     =========================================== */
  .table-cell-short-text {
    padding-top: var(--spacing-3-5);
    padding-bottom: var(--spacing-3-5);
  }
  .table-cell-short-text .table-cell-content {
    font-size: var(--text-body-md);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-body-md);
  }

  /* ===========================================
     VARIANT: long-text
     =========================================== */
  .table-cell-long-text {
    padding-top: var(--spacing-2);
    padding-bottom: var(--spacing-2);
  }
  .table-cell-long-text .table-cell-inner {
    align-items: flex-start;
  }
  .table-cell-long-text .table-cell-icon {
    margin-top: 0.125rem;
  }
  .table-cell-long-text .table-cell-content {
    white-space: nowrap;
    font-size: var(--text-body-md);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-body-md);
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
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
    padding-top: var(--spacing-2);
    padding-bottom: var(--spacing-2);
  }
  .table-cell-two-level .table-cell-inner {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 0;
  }
  .table-cell-two-level .table-cell-content,
  .table-cell-two-level .table-cell-two-level-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
  }
  .table-cell-two-level .table-cell-two-level-primary {
    font-family: var(--font-family-primary);
    font-size: var(--text-body-md);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-body-md);
    color: var(--color-content-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .table-cell-two-level .table-cell-two-level-secondary {
    font-family: var(--font-family-primary);
    font-size: var(--text-body-sm);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-body-sm);
    color: var(--color-content-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ===========================================
     VARIANT: two-level-objects
     Two rows of link-like items (LG + MD)
     =========================================== */
  .table-cell-two-level-objects {
    padding-top: var(--spacing-1);
    padding-bottom: var(--spacing-1);
  }
  .table-cell-two-level-objects .table-cell-inner {
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
    width: 100%;
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
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
    flex: 1 1 0;
    min-width: 0;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }

  /* ===========================================
     VARIANT: tags
     =========================================== */
  .table-cell-tags {
    padding-top: var(--spacing-3);
    padding-bottom: var(--spacing-3);
  }
  .table-cell-tags .table-cell-inner {
    flex-wrap: nowrap;
  }

  /* ===========================================
     VARIANT: tags-2 (wrapping)
     =========================================== */
  .table-cell-tags-2 {
    padding-top: var(--spacing-2);
    padding-bottom: var(--spacing-2);
  }
  .table-cell-tags-2 .table-cell-inner {
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
  }
  .table-cell-tag-1line .table-cell-inner {
    flex-wrap: nowrap;
    align-content: center;
    gap: var(--spacing-2);
  }

  /* ===========================================
     VARIANT: badge
     Cell containing a badge component
     =========================================== */
  .table-cell-badge {
    padding-top: var(--spacing-3);
    padding-bottom: var(--spacing-3);
  }

  /* ===========================================
     VARIANT: checkbox
     Cell with only a checkbox
     =========================================== */
  .table-cell-checkbox {
    padding: var(--spacing-4);
    width: 48px;
  }

  /* ===========================================
     VARIANT: input
     Cell with input/dropdown field
     =========================================== */
  .table-cell-input {
    padding-top: var(--spacing-3);
    padding-bottom: var(--spacing-3);
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
  }
  .table-cell-linked-value .table-cell-inner {
    gap: var(--spacing-2);
  }
  .table-cell-linked-value .table-cell-icon {
    width: var(--size-icon-md);
    height: var(--size-icon-md);
    color: var(--color-content-secondary);
  }
  .table-cell-linked-value .table-cell-linked-content {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    overflow: hidden;
  }
  .table-cell-linked-value .table-cell-linked-content > * {
    min-width: 0;
    max-width: 100%;
  }
  .table-cell-linked-value .table-cell-linked-name {
    font-family: var(--font-family-primary);
    font-size: var(--text-body-md);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-body-md);
    color: var(--color-content-brand);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .table-cell-linked-value .table-cell-linked-name > * {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }

  /* ===========================================
     VARIANT: linked-object
     Link (with icons) + Badge
     =========================================== */
  .table-cell-linked-object {
    padding-top: 0.625rem;
    padding-bottom: 0.625rem;
  }
  .table-cell-linked-object .table-cell-inner {
    gap: var(--spacing-2);
  }

  /* ===========================================
     VARIANT: tag-2lines
     Tags wrapping to 2 lines with overflow count
     =========================================== */
  .table-cell-tag-2lines {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
  }
  .table-cell-tag-2lines .table-cell-inner {
    flex-wrap: wrap;
    align-content: center;
    gap: var(--spacing-2);
    max-height: 60px;
  }

  /* ===========================================
     TAGS OVERFLOW CONTAINER
     =========================================== */
  .table-cell-tags-container {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    width: 100%;
    min-width: 0;
    overflow: hidden;
  }
  .table-cell-tags-visible {
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    flex-shrink: 1;
    min-width: 0;
    overflow: hidden;
  }
  .table-cell-tags-overflow {
    position: relative;
    flex-shrink: 0;
  }
  .table-cell-tags-overflow-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 var(--spacing-2);
    height: 1.5rem;
    font-family: var(--font-family-primary);
    font-size: var(--text-body-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-content-secondary);
    background: var(--color-general-neutral-light);
    border-radius: var(--radius-full);
    cursor: pointer;
    white-space: nowrap;
  }
  .table-cell-tags-overflow-badge:hover {
    background: var(--color-general-neutral);
  }
  .table-cell-tags-tooltip {
    position: absolute;
    bottom: calc(100% + 4px);
    left: 50%;
    transform: translateX(-50%);
    padding: var(--spacing-2) var(--spacing-3);
    background: var(--color-general-neutral-darker);
    color: var(--color-general-white);
    border-radius: var(--radius-md);
    font-family: var(--font-family-primary);
    font-size: var(--text-body-sm);
    line-height: var(--line-height-body-sm);
    white-space: nowrap;
    z-index: 1000;
    box-shadow: var(--shadow-medium);
    max-width: 300px;
    white-space: normal;
  }
  .table-cell-tags-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: var(--color-general-neutral-darker);
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
  sticky = false,
  width,
  className,
  children,
  style: propStyle,
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

  const cellClassName = cx(
    styleClasses.common.root,
    styleClasses.variants[variant],
    sticky && "table-cell-sticky",
    className
  );

  const style = width
    ? { width, minWidth: width, maxWidth: width, ...propStyle }
    : propStyle;

  // Two-level-objects variant - wraps children in link rows
  if (variant === "two-level-objects") {
    return (
      <div
        className={cellClassName}
        style={style}
        {...props}
      >
        <div className="table-cell-inner">
          {children}
        </div>
      </div>
    );
  }

  // Linked-value variant - icon + content with name and optional badge
  if (variant === "linked-value") {
    return (
      <div
        className={cellClassName}
        style={style}
        {...props}
      >
        <div className="table-cell-inner">
          <div className={cx(styleClasses.common.icon, "md", !icon && "table-cell-icon--empty")}>
            {icon}
          </div>
          <div className="table-cell-linked-content">
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
        className={cellClassName}
        style={style}
        {...props}
      >
        <div className="table-cell-inner">
          {children}
        </div>
      </div>
    );
  }

  // Text variants (short-text, long-text) with icon/content structure
  return (
    <div
      className={cellClassName}
      style={style}
      {...props}
    >
      <div className="table-cell-inner">
        <div className={cx(styleClasses.common.icon, !icon && "table-cell-icon--empty")}>
          {icon}
        </div>
        <div className={styleClasses.common.content}>{children}</div>
      </div>
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

/**
 * TableCellTwoLevel - For use with two-level variant
 * Renders primary and secondary text with proper truncation
 */
export const TableCellTwoLevel = ({ primary, secondary, className, ...props }) => {
  return (
    <div className={cx("table-cell-two-level-wrapper", className)} {...props}>
      <span className="table-cell-two-level-primary">{primary}</span>
      {secondary && <span className="table-cell-two-level-secondary">{secondary}</span>}
    </div>
  );
};

/**
 * TableCellTags - For displaying tags with overflow handling
 *
 * Automatically calculates visible tags based on available width.
 * Shows "+N" badge for hidden tags with tooltip on hover.
 *
 * @example
 * <TableCellTags
 *   tags={[
 *     { label: "Tag 1", color: "blue" },
 *     { label: "Tag 2", color: "cyan" },
 *     { label: "Tag 3", color: "pink" },
 *   ]}
 *   renderTag={(tag) => <Chip color={tag.color}>{tag.label}</Chip>}
 * />
 */
export const TableCellTags = ({
  tags = [],
  renderTag,
  maxVisible,
  className,
  ...props
}) => {
  const containerRef = useRef(null);
  const visibleRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(tags.length);
  const [showTooltip, setShowTooltip] = useState(false);

  // Use layout effect to measure before paint
  useLayoutEffect(() => {
    if (maxVisible !== undefined) {
      setVisibleCount(Math.min(maxVisible, tags.length));
      return;
    }

    const calculateVisible = () => {
      if (!containerRef.current || !visibleRef.current) return;

      const container = containerRef.current;
      const containerWidth = container.offsetWidth;
      const children = visibleRef.current.children;

      if (!children.length) return;

      // Reserve space for the overflow badge (approximately 40px)
      const badgeWidth = 40;
      let totalWidth = 0;
      let count = 0;

      for (let i = 0; i < children.length; i++) {
        const childWidth = children[i].offsetWidth + 8; // 8px gap
        if (totalWidth + childWidth + (i < tags.length - 1 ? badgeWidth : 0) <= containerWidth) {
          totalWidth += childWidth;
          count++;
        } else {
          break;
        }
      }

      // If all tags fit, show all
      if (count === tags.length) {
        setVisibleCount(tags.length);
      } else {
        // Otherwise show count - 1 to make room for badge
        setVisibleCount(Math.max(1, count));
      }
    };

    // Initial calculation
    calculateVisible();

    // Recalculate on resize
    const resizeObserver = new ResizeObserver(calculateVisible);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [tags.length, maxVisible]);

  const visibleTags = tags.slice(0, visibleCount);
  const hiddenTags = tags.slice(visibleCount);
  const hiddenCount = hiddenTags.length;

  const getTagLabel = (tag) => {
    if (typeof tag === "string") return tag;
    return tag.label || tag.name || tag.text || String(tag);
  };

  return (
    <div
      ref={containerRef}
      className={cx("table-cell-tags-container", className)}
      {...props}
    >
      <div ref={visibleRef} className="table-cell-tags-visible">
        {visibleTags.map((tag, index) =>
          renderTag ? renderTag(tag, index) : <span key={index}>{getTagLabel(tag)}</span>
        )}
      </div>
      {hiddenCount > 0 && (
        <div
          className="table-cell-tags-overflow"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <span className="table-cell-tags-overflow-badge">+{hiddenCount}</span>
          {showTooltip && (
            <div className="table-cell-tags-tooltip">
              {hiddenTags.map((tag, index) => (
                <span key={index}>
                  {getTagLabel(tag)}
                  {index < hiddenTags.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TableCell;
