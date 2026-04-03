/**
 * Badge Component
 *
 * A compact label element with multiple variants, sizes, and shapes.
 * Uses CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <Badge color="brand" size="md">Label</Badge>
 * <Badge color="neutral" size="lg" shape="pill" icon>Label</Badge>
 * <Badge color="ai" size="md" icon>AI Generated</Badge>
 */

import React from "react";
import { ShieldCheckIcon, SparklesIcon } from "@heroicons/react/16/solid";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const BADGE_COLORS = {
  neutral: "neutral",
  brand: "brand",
  disabled: "disabled",
  ai: "ai",
  // Semantic colors
  positive: "positive",
  negative: "negative",
  warning: "warning",
  informative: "informative",
};

export const BADGE_SIZES = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
};

export const BADGE_SHAPES = {
  rounded: "rounded",
  pill: "pill",
};

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  base: {
    display: "inline-flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 4,
    fontFamily: "var(--font-family-primary)",
    fontWeight: 400,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
  },

  shapes: {
    rounded: { borderRadius: "var(--radius-sm)" },
    pill: { borderRadius: "var(--radius-full)" },
  },

  sizes: {
    lg: {
      badge: { padding: 6 },
      text: { fontSize: "var(--text-body-lg)", lineHeight: "var(--line-height-body-lg)" },
      icon: { width: 20, height: 20 },
    },
    md: {
      badge: { padding: 4 },
      text: { fontSize: "var(--text-body-md)", lineHeight: "var(--line-height-body-md)" },
      icon: { width: 16, height: 16 },
    },
    sm: {
      badge: { paddingLeft: 4, paddingRight: 4, paddingTop: 2, paddingBottom: 2 },
      text: { fontSize: "var(--text-body-md)", lineHeight: "var(--line-height-body-md)" },
      icon: null, // No icon for sm
    },
    xs: {
      badge: { paddingLeft: 4, paddingRight: 4, paddingTop: 0, paddingBottom: 0 },
      text: { fontSize: "var(--text-body-caption)", lineHeight: "var(--line-height-body-caption)" },
      icon: null, // No icon for xs
    },
  },

  colors: {
    neutral: {
      badge: {
        background: "var(--color-general-neutral-lighter)",
        outline: "1px var(--color-action-outline-secondary-enabled) solid",
        outlineOffset: "-1px",
      },
      text: { color: "var(--color-content-secondary)" },
      icon: { background: "var(--color-content-secondary)" },
    },
    brand: {
      badge: {
        background: "var(--color-action-fill-primary-enabled)",
      },
      text: { color: "var(--color-content-inverted)" },
      icon: { background: "var(--color-content-inverted)" },
    },
    disabled: {
      badge: {
        background: "var(--color-general-neutral-lighter)",
        outline: "1px var(--color-action-outline-secondary-enabled) solid",
        outlineOffset: "-1px",
      },
      text: { color: "var(--color-content-tertiary)" },
      icon: { background: "var(--color-content-tertiary)" },
    },
    ai: {
      badge: {
        background: "var(--color-general-neutral-lighter)",
        outline: "1px var(--color-content-brand) solid",
        outlineOffset: "-1px",
      },
      text: { color: "var(--color-content-brand)" },
      icon: { background: "linear-gradient(90deg, #4649FF 0%, #0EDDA5 100%)" },
    },
    positive: {
      badge: {
        background: "var(--color-general-positive)",
        outline: "1px var(--color-accent-green) solid",
        outlineOffset: "-1px",
      },
      text: { color: "var(--color-content-positive)" },
      icon: { background: "var(--color-content-positive)" },
    },
    negative: {
      badge: {
        background: "var(--color-general-negative)",
        outline: "1px var(--color-accent-red) solid",
        outlineOffset: "-1px",
      },
      text: { color: "var(--color-content-negative)" },
      icon: { background: "var(--color-content-negative)" },
    },
    warning: {
      badge: {
        background: "var(--color-general-warning)",
        outline: "1px var(--color-accent-orange) solid",
        outlineOffset: "-1px",
      },
      text: { color: "var(--color-content-warning)" },
      icon: { background: "var(--color-content-warning)" },
    },
    informative: {
      badge: {
        background: "var(--color-general-informative)",
        outline: "1px var(--color-accent-purple) solid",
        outlineOffset: "-1px",
      },
      text: { color: "var(--color-content-informative)" },
      icon: { background: "var(--color-content-informative)" },
    },
  },
};

// ─────────────────────────────────────────────
// BADGE ICON (Using Heroicons)
// ─────────────────────────────────────────────

const BadgeIcon = ({ size, color }) => {
  const sizeStyles = styles.sizes[size];
  const colorStyles = styles.colors[color];

  if (!sizeStyles.icon) return null;

  const { width, height } = sizeStyles.icon;
  const isAI = color === "ai";

  // Use SparklesIcon for AI variant, ShieldCheckIcon for others
  const IconComponent = isAI ? SparklesIcon : ShieldCheckIcon;

  // For AI variant, apply gradient using CSS mask
  if (isAI) {
    return (
      <div
        style={{
          width,
          height,
          background: "linear-gradient(90deg, #4649FF 0%, #0EDDA5 100%)",
          WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568l.258 1.022c.118.415.443.74.858.858l1.022.258a.75.75 0 0 1 0 1.456l-1.022.258a1.25 1.25 0 0 0-.858.858l-.258 1.022a.75.75 0 0 1-1.456 0l-.258-1.022a1.25 1.25 0 0 0-.858-.858l-1.022-.258a.75.75 0 0 1 0-1.456l1.022-.258a1.25 1.25 0 0 0 .858-.858l.258-1.022A.75.75 0 0 1 10 11Z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
          WebkitMaskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568l.258 1.022c.118.415.443.74.858.858l1.022.258a.75.75 0 0 1 0 1.456l-1.022.258a1.25 1.25 0 0 0-.858.858l-.258 1.022a.75.75 0 0 1-1.456 0l-.258-1.022a1.25 1.25 0 0 0-.858-.858l-1.022-.258a.75.75 0 0 1 0-1.456l1.022-.258a1.25 1.25 0 0 0 .858-.858l.258-1.022A.75.75 0 0 1 10 11Z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
          maskSize: "contain",
          maskRepeat: "no-repeat",
          flexShrink: 0,
        }}
      />
    );
  }

  // Extract color from the background property (handles solid colors)
  const iconColor = colorStyles.icon.background;

  return (
    <IconComponent
      style={{
        width,
        height,
        color: iconColor,
        flexShrink: 0,
      }}
    />
  );
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

/**
 * Badge
 *
 * @param {string} color - neutral | brand | disabled | ai | positive | negative | warning | informative (default: neutral)
 * @param {string} size - xs | sm | md | lg (default: md)
 * @param {string} shape - rounded | pill (default: rounded)
 * @param {boolean} icon - Show icon (only for md and lg sizes)
 * @param {React.CSSProperties} style - Additional inline styles
 * @param {ReactNode} children - Label text
 */
export const Badge = ({
  color = BADGE_COLORS.neutral,
  size = BADGE_SIZES.md,
  shape = BADGE_SHAPES.rounded,
  icon = false,
  style,
  children,
  ...props
}) => {
  const sizeStyles = styles.sizes[size];
  const colorStyles = styles.colors[color];
  const shapeStyles = styles.shapes[shape];

  // Only show icon for md and lg sizes
  const showIcon = icon && (size === "md" || size === "lg");

  const badgeStyle = {
    ...styles.base,
    ...sizeStyles.badge,
    ...colorStyles.badge,
    ...shapeStyles,
    ...style,
  };

  const textStyle = {
    ...sizeStyles.text,
    ...colorStyles.text,
    wordWrap: "break-word",
  };

  return (
    <div style={badgeStyle} {...props}>
      <div style={textStyle}>{children}</div>
      {showIcon && <BadgeIcon size={size} color={color} />}
    </div>
  );
};

Badge.displayName = "Badge";
Badge.colors = BADGE_COLORS;
Badge.sizes = BADGE_SIZES;
Badge.shapes = BADGE_SHAPES;

export default Badge;
