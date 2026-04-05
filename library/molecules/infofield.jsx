/**
 * Infofield Component
 *
 * A read-only field displaying a label with various value types:
 * text, badges, or chips. Supports header actions and overflow indicators.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <Infofield label="Name" value="John Doe" />
 * <Infofield label="Tags" variant="badges" values={['Tag 1', 'Tag 2']} />
 */

import React from "react";
import { Badge } from "../atoms/badge.jsx";
import { Chip } from "../atoms/chip.jsx";
import { Icon } from "../atoms/icon.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const INFOFIELD_VARIANTS = {
  text: "text",
  badges: "badges",
  chips: "chips",
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
    fontFamily: "var(--font-family-primary)",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
  },

  label: {
    flex: 1,
    fontSize: "var(--text-body-lg)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-secondary)",
  },

  actions: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
  },

  value: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-primary)",
  },

  valueIcon: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-secondary)",
  },

  items: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap: "var(--spacing-sm)",
  },

  overflow: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px 4px",
    background: "var(--color-general-neutral-lighter)",
    borderRadius: "var(--radius-sm)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-secondary)",
    cursor: "default",
  },

  empty: {
    color: "var(--color-content-tertiary)",
    fontStyle: "italic",
  },
};

// ─────────────────────────────────────────────
// INFOFIELD COMPONENT
// ─────────────────────────────────────────────

/**
 * Infofield
 *
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
  style,
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

  // Determine visible items and overflow count
  const hasOverflow = maxItems && values.length > maxItems;
  const visibleValues = hasOverflow ? values.slice(0, maxItems) : values;
  const overflowCount = hasOverflow ? values.length - maxItems : 0;

  const baseStyle = {
    ...styles.base,
    ...style,
  };

  const overflowStyle = {
    ...styles.overflow,
    ...(onOverflowClick && { cursor: "pointer" }),
  };

  const renderValue = () => {
    // Text variant
    if (detectedVariant === "text") {
      if (!value && value !== 0) {
        return <span style={{ ...styles.value, ...styles.empty }}>{emptyText}</span>;
      }

      return (
        <div style={styles.value}>
          {(icon || iconName) && (
            <span style={styles.valueIcon}>
              {icon || <Icon name={iconName} size="md" />}
            </span>
          )}
          <span>{value}</span>
        </div>
      );
    }

    // Empty state for array variants
    if (values.length === 0) {
      return <span style={{ ...styles.value, ...styles.empty }}>{emptyText}</span>;
    }

    // Badges variant
    if (detectedVariant === "badges") {
      return (
        <div style={styles.items}>
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
              style={overflowStyle}
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
        <div style={styles.items}>
          {visibleValues.map((item, index) => {
            const chipLabel = typeof item === "string" ? item : item.label;
            const chipColor = typeof item === "object" ? item.color : undefined;
            const chipIcon = typeof item === "object" ? item.icon : undefined;
            const chipIconName = typeof item === "object" ? item.iconName : undefined;
            const itemProps = typeof item === "object" ? item : {};

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
              style={overflowStyle}
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
    <div style={baseStyle} {...props}>
      <div style={styles.header}>
        <span style={styles.label}>{label}</span>
        {headerAction && <div style={styles.actions}>{headerAction}</div>}
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
 */
export const InfofieldGroup = ({
  direction = "column",
  gap = "var(--spacing-lg)",
  style,
  children,
  ...props
}) => {
  const groupStyle = {
    display: "flex",
    flexDirection: direction === "column" ? "column" : "row",
    gap,
    ...style,
  };

  return (
    <div style={groupStyle} {...props}>
      {children}
    </div>
  );
};

InfofieldGroup.displayName = "InfofieldGroup";

export default Infofield;
