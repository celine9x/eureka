"use client";

/**
 * Chip Component
 *
 * A compact label element with optional color accent, icons, chevron, and remove button.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <Chip>Label</Chip>
 * <Chip variant="negative">Error</Chip>
 * <Chip color="var(--color-content-brand)" icon={<Icon name="Star" />} chevron removable>Neurology</Chip>
 */

import { useState } from "react";
import { ChevronDownIcon, XCircleIcon } from "@heroicons/react/16/solid";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const CHIP_VARIANTS = {
  neutral: "neutral",
  primary: "primary",
  positive: "positive",
  negative: "negative",
  warning: "warning",
  blue: "blue",
  cyan: "cyan",
  pink: "pink",
  brown: "brown",
};

export const CHIP_SIZES = {
  sm: "sm",
  md: "md",
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    minWidth: 0,
    maxWidth: "100%",
    background: "var(--color-general-neutral-lighter)",
    borderRadius: "var(--radius-sm)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    boxShadow: "var(--shadow-light-down)",
    cursor: "default",
    userSelect: "none",
    fontFamily: "var(--font-family-primary)",
    boxSizing: "border-box",
  },

  disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },

  colorRect: {
    flexShrink: 0,
    width: 3,
    borderRadius: "var(--radius-sm)",
  },

  icon: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  label: {
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: "var(--font-weight-regular)",
    whiteSpace: "nowrap",
  },

  chevron: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "none",
    background: "transparent",
    borderRadius: "var(--radius-sm)",
    transition: "opacity var(--transition-fast)",
    padding: 0,
  },

  chevronHover: {
    opacity: 0.7,
  },

  remove: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-tertiary)",
    cursor: "pointer",
    borderRadius: "var(--radius-sm)",
    transition: "color var(--transition-fast)",
    background: "transparent",
    border: "none",
    padding: 0,
  },

  removeHover: {
    color: "var(--color-content-secondary)",
  },

  variants: {
    neutral: {
      icon: { color: "var(--color-content-secondary)" },
      label: { color: "var(--color-content-secondary)" },
      chevron: { color: "var(--color-content-secondary)" },
    },
    primary: {
      icon: { color: "var(--color-content-brand)" },
      label: { color: "var(--color-content-brand)" },
      chevron: { color: "var(--color-content-brand)" },
    },
    positive: {
      icon: { color: "var(--color-content-positive)" },
      label: { color: "var(--color-content-positive)" },
      chevron: { color: "var(--color-content-positive)" },
    },
    negative: {
      icon: { color: "var(--color-content-negative)" },
      label: { color: "var(--color-content-negative)" },
      chevron: { color: "var(--color-content-negative)" },
    },
    warning: {
      icon: { color: "var(--color-content-warning)" },
      label: { color: "var(--color-content-warning)" },
      chevron: { color: "var(--color-content-warning)" },
    },
    blue: {
      icon: { color: "var(--color-accent-blue)" },
      label: { color: "var(--color-accent-blue)" },
      chevron: { color: "var(--color-accent-blue)" },
    },
    cyan: {
      icon: { color: "var(--color-accent-cyan)" },
      label: { color: "var(--color-accent-cyan)" },
      chevron: { color: "var(--color-accent-cyan)" },
    },
    pink: {
      icon: { color: "var(--color-accent-pink)" },
      label: { color: "var(--color-accent-pink)" },
      chevron: { color: "var(--color-accent-pink)" },
    },
    brown: {
      icon: { color: "var(--color-accent-brown)" },
      label: { color: "var(--color-accent-brown)" },
      chevron: { color: "var(--color-accent-brown)" },
    },
  },

  sizes: {
    sm: {
      base: { padding: "var(--spacing-xxs)", gap: "var(--spacing-xxs)" },
      label: {
        fontSize: "var(--text-body-caption)",
        lineHeight: "var(--line-height-body-caption)",
      },
      icon: { width: 12, height: 12 },
      colorRect: { height: 10 },
    },
    md: {
      base: { padding: "var(--spacing-xs)", gap: "var(--spacing-xs)" },
      label: {
        fontSize: "var(--text-body-md)",
        lineHeight: "var(--line-height-body-md)",
      },
      icon: { width: 14, height: 14 },
      colorRect: { height: 12 },
    },
  },
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

/** Chip */
export const Chip = ({
  variant = CHIP_VARIANTS.neutral,
  size = CHIP_SIZES.md,
  color,
  icon,
  chevron = false,
  removable = false,
  isDisabled = false,
  disabled,
  onRemove,
  onChevronClick,
  style,
  children,
  ...props
}) => {
  const [chevronHovered, setChevronHovered] = useState(false);
  const [removeHovered, setRemoveHovered] = useState(false);

  const isChipDisabled = isDisabled || disabled;
  const sizeStyles = styles.sizes[size];
  const variantStyles = styles.variants[variant];

  // Compose chip styles
  const chipStyle = {
    ...styles.base,
    ...sizeStyles.base,
    ...(isChipDisabled && styles.disabled),
    ...style,
  };

  // Color rect styles
  const colorRectStyle = {
    ...styles.colorRect,
    height: sizeStyles.colorRect.height,
    background: color,
  };

  // Icon styles
  const iconStyle = {
    ...styles.icon,
    ...sizeStyles.icon,
    ...variantStyles.icon,
  };

  // Label styles
  const labelStyle = {
    ...styles.label,
    ...sizeStyles.label,
    ...variantStyles.label,
  };

  // Chevron styles
  const chevronStyle = {
    ...styles.chevron,
    ...sizeStyles.icon,
    ...variantStyles.chevron,
    ...(chevronHovered && !isChipDisabled && styles.chevronHover),
  };

  // Remove button styles
  const removeStyle = {
    ...styles.remove,
    ...sizeStyles.icon,
    ...(removeHovered && !isChipDisabled && styles.removeHover),
  };

  return (
    <div style={chipStyle} {...props}>
      {color && <div style={colorRectStyle} />}

      {icon && <span style={iconStyle}>{icon}</span>}

      <span style={labelStyle}>{children}</span>

      {chevron && (
        <button
          type="button"
          style={chevronStyle}
          onClick={isChipDisabled ? undefined : onChevronClick}
          onMouseEnter={() => setChevronHovered(true)}
          onMouseLeave={() => setChevronHovered(false)}
          disabled={isChipDisabled}
          aria-label="Expand"
        >
          <ChevronDownIcon style={{ width: 10, height: 10 }} />
        </button>
      )}

      {removable && (
        <button
          type="button"
          style={removeStyle}
          onClick={isChipDisabled ? undefined : onRemove}
          onMouseEnter={() => setRemoveHovered(true)}
          onMouseLeave={() => setRemoveHovered(false)}
          disabled={isChipDisabled}
          aria-label="Remove"
        >
          <XCircleIcon style={{ width: 12, height: 12 }} />
        </button>
      )}
    </div>
  );
};

Chip.displayName = "Chip";
Chip.sizes = CHIP_SIZES;
Chip.variants = CHIP_VARIANTS;

export default Chip;
