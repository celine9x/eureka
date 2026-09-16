"use client";

/**
 * ColorStatus Component (Atom)
 *
 * A pill-shaped status indicator with a leading icon, label, and optional
 * trailing icon. Uses inline styles with CSS variables from tokens.css for
 * consistent styling.
 *
 * Supports two variant types:
 * - Default color variants ("grey" | "green" | "blue" | "yellow" | "orange" | "red"):
 *   fully customizable leading/trailing icons.
 * - "risk-impact": a fixed-appearance variant driven by a required `level`
 *   prop ("very-high" | "high" | "medium" | "low"). Colors and the leading
 *   icon (ExclamationTriangleIcon) are fixed per level and cannot be
 *   overridden; `leadingIcon`/`trailingIcon` are ignored.
 *
 * @example
 * // Default variant — customizable icons
 * <ColorStatus variant="green" leadingIcon={<Icon name="Check" />}>Active</ColorStatus>
 * <ColorStatus variant="red" leadingIcon={<Icon name="XCircle" />} trailingIcon={<Icon name="ChevronDown" />}>Blocked</ColorStatus>
 *
 * @example
 * // Risk-impact variant — fixed icon/colors per level, no trailing icon
 * <ColorStatus variant="risk-impact" level="very-high">Very High</ColorStatus>
 * <ColorStatus variant="risk-impact" level="medium">Medium</ColorStatus>
 */

/**
 * This project has no TypeScript build or `@types/react`, so these JSDoc
 * typedefs give editors best-effort discriminated-union hinting only —
 * they are not enforced at compile time. The real discriminant is `level`
 * being required whenever `variant="risk-impact"` (see the runtime warning
 * in the component below).
 *
 * @typedef {Object} ColorStatusDefaultProps
 * @property {"grey"|"green"|"blue"|"yellow"|"orange"|"red"} [variant] - Status color. Defaults to "grey".
 * @property {*} [leadingIcon] - Icon element rendered before the label.
 * @property {*} [trailingIcon] - Icon element rendered after the label.
 *
 * @typedef {Object} ColorStatusRiskImpactProps
 * @property {"risk-impact"} variant
 * @property {"very-high"|"high"|"medium"|"low"} level - Required. Selects the fixed risk color/icon.
 *
 * @typedef {(ColorStatusDefaultProps|ColorStatusRiskImpactProps) & {onClick?: Function, style?: Object, children?: *}} ColorStatusProps
 */

import { useState, cloneElement, isValidElement, createElement } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const COLOR_STATUS_VARIANTS = {
  grey: "grey",
  green: "green",
  blue: "blue",
  yellow: "yellow",
  orange: "orange",
  red: "red",
  riskImpact: "risk-impact",
};

export const RISK_LEVELS = {
  veryHigh: "very-high",
  high: "high",
  medium: "medium",
  low: "low",
};

// Fixed color tokens per risk level — not overridable via the `variant`
// color config, per the risk-impact variant's spec.
const RISK_IMPACT_CONFIG = {
  [RISK_LEVELS.veryHigh]: {
    outline: "1px solid var(--color-status-red)",
    background: "var(--color-status-background-red)",
    leadingIconColor: "var(--color-status-red)",
  },
  [RISK_LEVELS.high]: {
    outline: "1px solid var(--color-status-orange)",
    background: "var(--color-status-background-orange)",
    leadingIconColor: "var(--color-status-orange)",
  },
  [RISK_LEVELS.medium]: {
    outline: "1px solid var(--color-status-yellow)",
    background: "var(--color-status-background-yellow)",
    leadingIconColor: "var(--color-status-yellow)",
  },
  [RISK_LEVELS.low]: {
    outline: "1px solid var(--color-status-green)",
    background: "var(--color-status-background-green)",
    leadingIconColor: "var(--color-status-green)",
  },
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 24,
    padding: "var(--spacing-xs)",
    gap: "var(--spacing-xs)",
    borderRadius: "var(--radius-full)",
    outlineOffset: "-1px",
    border: "none",
    boxSizing: "border-box",
    cursor: "pointer",
    fontFamily: "var(--font-family-primary)",
    transition: "all var(--transition-fast)",
  },

  hover: {
    background: "var(--color-general-white)",
    boxShadow: "var(--shadow-medium-down)",
  },

  active: {
    background: "var(--color-general-white)",
    boxShadow: "var(--shadow-focus)",
  },

  icon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: "var(--size-icon-sm)",
    height: "var(--size-icon-sm)",
  },

  label: {
    color: "var(--color-content-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    fontWeight: "var(--font-weight-regular)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  variants: {
    grey: {
      outline: "1px solid var(--color-status-grey)",
      background: "var(--color-general-neutral)",
      leadingIconColor: "var(--color-status-background-grey)",
    },
    green: {
      outline: "1px solid var(--color-status-green)",
      background: "var(--color-status-background-green)",
      leadingIconColor: "var(--color-status-green)",
    },
    blue: {
      outline: "1px solid var(--color-status-blue)",
      background: "var(--color-status-background-blue)",
      leadingIconColor: "var(--color-status-blue)",
    },
    yellow: {
      outline: "1px solid var(--color-status-yellow)",
      background: "var(--color-status-background-yellow)",
      leadingIconColor: "var(--color-status-yellow)",
    },
    orange: {
      outline: "1px solid var(--color-status-orange)",
      background: "var(--color-status-background-orange)",
      leadingIconColor: "var(--color-status-orange)",
    },
    red: {
      outline: "1px solid var(--color-status-red)",
      background: "var(--color-status-background-red)",
      leadingIconColor: "var(--color-status-red)",
    },
  },
};

// ─────────────────────────────────────────────
// ICON HELPER
// ─────────────────────────────────────────────

const renderIconNode = (icon, iconColor) => {
  if (!icon) return null;

  const iconStyle = { ...styles.icon, color: iconColor };

  if (isValidElement(icon)) {
    return cloneElement(icon, {
      style: { ...iconStyle, ...(icon.props?.style || {}) },
    });
  }

  if (typeof icon === "function") {
    return createElement(icon, { style: iconStyle });
  }

  return null;
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

/**
 * ColorStatus
 *
 * @param {ColorStatusProps} props
 */
export const ColorStatus = ({
  variant = COLOR_STATUS_VARIANTS.grey,
  level,
  leadingIcon,
  trailingIcon,
  onClick,
  style,
  children,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const isRiskImpact = variant === COLOR_STATUS_VARIANTS.riskImpact;
  const riskConfig = isRiskImpact ? RISK_IMPACT_CONFIG[level] : null;

  if (isRiskImpact && !riskConfig && typeof console !== "undefined") {
    console.warn(
      `ColorStatus: variant="risk-impact" requires a valid "level" prop (one of ${Object.values(RISK_LEVELS).join(", ")}). Received: ${level}`
    );
  }

  // Risk-impact colors are fixed per level and take priority over the
  // default variant color config; leading icon is likewise fixed and
  // trailing icon is not supported for this variant.
  const variantStyles = riskConfig || styles.variants[variant] || styles.variants.grey;
  const resolvedLeadingIcon = isRiskImpact ? <ExclamationTriangleIcon /> : leadingIcon;
  const resolvedTrailingIcon = isRiskImpact ? null : trailingIcon;

  // Compose container styles
  const containerStyle = {
    ...styles.base,
    outline: variantStyles.outline,
    background: variantStyles.background,
    ...(isHovered && styles.hover),
    ...(isActive && styles.active),
    ...style,
  };

  return (
    <button
      type="button"
      style={containerStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onBlur={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      {...props}
    >
      {renderIconNode(resolvedLeadingIcon, variantStyles.leadingIconColor)}
      {children && <span style={styles.label}>{children}</span>}
      {renderIconNode(resolvedTrailingIcon, "var(--color-content-primary)")}
    </button>
  );
};

ColorStatus.displayName = "ColorStatus";
ColorStatus.variants = COLOR_STATUS_VARIANTS;
ColorStatus.riskLevels = RISK_LEVELS;

export default ColorStatus;
