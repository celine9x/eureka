/**
 * Infofield Component
 *
 * A read-only field displaying a label with various value types:
 * text, badges, or chips. Supports header actions and overflow indicators.
 * Uses Tailwind CSS with design tokens.
 */

import React from "react";
import { cx } from "../utils/cx.js";
import { Badge } from "../atoms/badge.jsx";
import { Chip } from "../atoms/chip.jsx";
import { Icon } from "../atoms/icon.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

/** Infofield variants */
export const INFOFIELD_VARIANTS = {
  text: "text",
  badges: "badges",
  chips: "chips",
};

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  base: "flex flex-col gap-1 font-primary",

  header: "flex items-center gap-2",
  label: "flex-1 text-body-lg font-normal text-content-secondary",
  actions: "flex items-center gap-2",

  value: "flex items-center gap-1 text-body-md font-normal text-content-primary",
  valueIcon: "flex-shrink-0 flex items-center justify-center text-content-secondary",

  items: "flex flex-wrap items-start gap-2",

  overflow: [
    "inline-flex items-center justify-center py-0.5 px-1",
    "bg-background-neutral-lighter rounded-sm",
    "outline outline-1 -outline-offset-1 outline-outline-neutral",
    "text-body-md font-normal text-content-secondary cursor-default",
  ].join(" "),

  empty: "text-content-tertiary italic",
};

// ─────────────────────────────────────────────
// INFOFIELD COMPONENT
// ─────────────────────────────────────────────

/**
 * Infofield
 *
 * @param {string} label - The field label (required)
 * @param {string} value - Text value for text variant
 * @param {Array} values - Array of values for badges/chips variant
 * @param {string} variant - text | badges | chips (default: auto-detected)
 * @param {ReactNode} icon - Icon to display before text value
 * @param {string} iconName - Icon name for the value icon
 * @param {ReactNode} headerAction - Action element(s) to display in header row
 * @param {number} maxItems - Maximum items to show before overflow indicator
 * @param {string} emptyText - Text to show when value is empty
 * @param {function} onItemClick - Callback when a badge/chip item is clicked
 * @param {function} onOverflowClick - Callback when overflow indicator is clicked
 * @param {object} badgeProps - Props to pass to Badge components
 * @param {object} chipProps - Props to pass to Chip components
 * @param {string} className - Additional CSS classes
 *
 * @example
 * // Text variant
 * <Infofield label="Name" value="John Doe" />
 * <Infofield label="Status" value="Active" iconName="CheckCircle" />
 *
 * // Badge variant
 * <Infofield
 *   label="Tags"
 *   variant="badges"
 *   values={['Tag 1', 'Tag 2', 'Tag 3']}
 *   maxItems={5}
 * />
 *
 * // Chip variant
 * <Infofield
 *   label="Categories"
 *   variant="chips"
 *   values={[
 *     { label: 'Neurology', color: '#4649FF' },
 *     { label: 'Cardiology', color: '#02C39A' }
 *   ]}
 * />
 */
export const Infofield = ({
  label,
  value,
  values = [],
  variant,
  icon,
  iconName,
  headerAction,
  maxItems,
  emptyText = "—",
  onItemClick,
  onOverflowClick,
  badgeProps = {},
  chipProps = {},
  className,
  ...props
}) => {
  // Auto-detect variant if not specified
  const detectedVariant =
    variant ||
    (values.length > 0
      ? typeof values[0] === "object" && values[0].color
        ? INFOFIELD_VARIANTS.chips
        : INFOFIELD_VARIANTS.badges
      : INFOFIELD_VARIANTS.text);

  const classes = cx(styles.base, className);

  // Determine visible items and overflow count
  const hasOverflow = maxItems && values.length > maxItems;
  const visibleValues = hasOverflow ? values.slice(0, maxItems) : values;
  const overflowCount = hasOverflow ? values.length - maxItems : 0;

  const renderValue = () => {
    // Text variant
    if (detectedVariant === "text") {
      if (!value && value !== 0) {
        return <span className={cx(styles.value, styles.empty)}>{emptyText}</span>;
      }

      return (
        <div className={styles.value}>
          {(icon || iconName) && (
            <span className={styles.valueIcon}>
              {icon || <Icon name={iconName} size="md" />}
            </span>
          )}
          <span>{value}</span>
        </div>
      );
    }

    // Empty state for array variants
    if (values.length === 0) {
      return <span className={cx(styles.value, styles.empty)}>{emptyText}</span>;
    }

    // Badges variant
    if (detectedVariant === "badges") {
      return (
        <div className={styles.items}>
          {visibleValues.map((item, index) => {
            const badgeLabel = typeof item === "string" ? item : item.label;
            const itemProps = typeof item === "object" ? item : {};

            return (
              <Badge
                key={index}
                size="md"
                shape="square"
                onClick={onItemClick ? () => onItemClick(item, index) : undefined}
                {...badgeProps}
                {...itemProps}
              >
                {badgeLabel}
              </Badge>
            );
          })}
          {hasOverflow && (
            <span
              className={styles.overflow}
              onClick={onOverflowClick}
              role={onOverflowClick ? "button" : undefined}
              tabIndex={onOverflowClick ? 0 : undefined}
            >
              +{overflowCount}
            </span>
          )}
        </div>
      );
    }

    // Chips variant
    if (detectedVariant === "chips") {
      return (
        <div className={styles.items}>
          {visibleValues.map((item, index) => {
            const chipLabel = typeof item === "string" ? item : item.label;
            const chipColor = typeof item === "object" ? item.color : undefined;
            const chipIcon = typeof item === "object" ? item.icon : undefined;
            const chipIconName = typeof item === "object" ? item.iconName : undefined;
            const itemProps = typeof item === "object" ? item : {};

            // Remove label/color/icon from props to avoid conflicts
            const {
              label: _,
              color: __,
              icon: ___,
              iconName: ____,
              ...restItemProps
            } = itemProps;

            return (
              <Chip
                key={index}
                color={chipColor}
                icon={chipIcon || (chipIconName && <Icon name={chipIconName} size="sm" />)}
                onClick={onItemClick ? () => onItemClick(item, index) : undefined}
                {...chipProps}
                {...restItemProps}
              >
                {chipLabel}
              </Chip>
            );
          })}
          {hasOverflow && (
            <span
              className={styles.overflow}
              onClick={onOverflowClick}
              role={onOverflowClick ? "button" : undefined}
              tabIndex={onOverflowClick ? 0 : undefined}
            >
              +{overflowCount}
            </span>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className={classes} {...props}>
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {headerAction && <div className={styles.actions}>{headerAction}</div>}
      </div>
      {renderValue()}
    </div>
  );
};

Infofield.displayName = "Infofield";
Infofield.variants = INFOFIELD_VARIANTS;

// ─────────────────────────────────────────────
// INFOFIELD GROUP
// ─────────────────────────────────────────────

/**
 * InfofieldGroup
 *
 * A container for multiple Infofield components with consistent spacing.
 *
 * @param {string} direction - row | column (default: column)
 * @param {string} gap - Spacing between fields (default: 4)
 * @param {string} className - Additional CSS classes
 * @param {ReactNode} children - Infofield components
 *
 * @example
 * <InfofieldGroup>
 *   <Infofield label="Name" value="John Doe" />
 *   <Infofield label="Email" value="john@example.com" />
 * </InfofieldGroup>
 */
export const InfofieldGroup = ({
  direction = "column",
  gap = 4,
  className,
  children,
  ...props
}) => {
  const classes = cx(
    "flex",
    direction === "column" ? "flex-col" : "flex-row",
    `gap-${gap}`,
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

InfofieldGroup.displayName = "InfofieldGroup";

export default Infofield;
