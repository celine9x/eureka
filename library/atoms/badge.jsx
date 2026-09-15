/**
 * Badge Component
 *
 * A compact label element with multiple variants, sizes, and shapes.
 * Uses CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <Badge color="brand" size="md">Label</Badge>
 * <Badge color="neutral" size="lg" shape="pill" icon>Label</Badge>
 * <Badge color="ai" size="md" icon variant="ai">AI Generated</Badge>
 */

import React, { cloneElement, createElement, isValidElement } from "react";
import { ShieldCheckIcon, SparklesIcon } from "@heroicons/react/16/solid";
import { XMarkIcon } from "@heroicons/react/20/solid";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const BADGE_COLORS = {
  neutral: "neutral",
  brand: "brand",
  disabled: "disabled",
  ai: "ai",
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

export const BADGE_TYPES = {
  pillColor: "pill-color",
  badgeColor: "badge-color",
  badgeModern: "badge-modern",
};

const BADGE_TOKEN_MAP = {
  aiIconGradient: "var(--gradient-ai-main)",
};

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "var(--spacing-xs)",
    boxSizing: "border-box",
    whiteSpace: "nowrap",
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-regular)",
  },

  shapes: {
    rounded: { borderRadius: "var(--radius-xs)" },
    pill: { borderRadius: "var(--radius-full)" },
  },

  sizes: {
    lg: {
      badge: { padding: "var(--spacing-sm)" },
      text: {
        fontSize: "var(--text-body-lg)",
        lineHeight: "var(--line-height-body-lg)",
      },
      icon: {
        width: "var(--size-icon-md)",
        height: "var(--size-icon-md)",
      },
    },
    md: {
      badge: { padding: "var(--spacing-xs)" },
      text: {
        fontSize: "var(--text-body-md)",
        lineHeight: "var(--line-height-body-md)",
      },
      icon: {
        width: "var(--size-icon-sm)",
        height: "var(--size-icon-sm)",
      },
    },
    sm: {
      badge: {
        paddingLeft: "var(--spacing-xs)",
        paddingRight: "var(--spacing-xs)",
        paddingTop: "var(--spacing-xxs)",
        paddingBottom: "var(--spacing-xxs)",
      },
      text: {
        fontSize: "var(--text-body-md)",
        lineHeight: "var(--line-height-body-md)",
      },
      icon: null,
    },
    xs: {
      badge: {
        paddingLeft: "var(--spacing-xs)",
        paddingRight: "var(--spacing-xs)",
        paddingTop: 0,
        paddingBottom: 0,
      },
      text: {
        fontSize: "var(--text-body-caption)",
        lineHeight: "var(--line-height-body-caption)",
      },
      icon: null,
    },
  },

  colors: {
    neutral: {
      badge: {
        background: "var(--color-general-neutral-lighter)",
        outline: "1px solid var(--color-action-outline-secondary-enabled)",
        outlineOffset: "-1px",
      },
      text: { color: "var(--color-content-secondary)" },
      icon: { color: "var(--color-content-secondary)" },
    },
    brand: {
      badge: {
        background: "var(--color-action-fill-primary-enabled)",
      },
      text: { color: "var(--color-content-inverted)" },
      icon: { color: "var(--color-content-inverted)" },
    },
    disabled: {
      badge: {
        background: "var(--color-general-neutral-lighter)",
        outline: "1px solid var(--color-action-outline-secondary-enabled)",
        outlineOffset: "-1px",
      },
      text: { color: "var(--color-content-tertiary)" },
      icon: { color: "var(--color-content-tertiary)" },
    },
    ai: {
      badge: {
        background: "var(--color-general-neutral-lighter)",
        outline: "1px solid var(--color-ai-gradient-start)",
        outlineOffset: "-1px",
      },
      text: {
        background: "var(--gradient-ai-main)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      },
      icon: { color: "var(--color-ai-content-brand)" },
    },
    positive: {
      badge: {
        background: "var(--color-general-positive)",
        outline: "1px solid var(--color-accent-green)",
        outlineOffset: "-1px",
      },
      text: { color: "var(--color-content-positive)" },
      icon: { color: "var(--color-content-positive)" },
    },
    negative: {
      badge: {
        background: "var(--color-general-negative)",
        outline: "1px solid var(--color-accent-red)",
        outlineOffset: "-1px",
      },
      text: { color: "var(--color-content-negative)" },
      icon: { color: "var(--color-content-negative)" },
    },
    warning: {
      badge: {
        background: "var(--color-general-warning)",
        outline: "1px solid var(--color-accent-orange)",
        outlineOffset: "-1px",
      },
      text: { color: "var(--color-content-warning)" },
      icon: { color: "var(--color-content-warning)" },
    },
    informative: {
      badge: {
        background: "var(--color-general-informative)",
        outline: "1px solid var(--color-accent-purple)",
        outlineOffset: "-1px",
      },
      text: { color: "var(--color-content-informative)" },
      icon: { color: "var(--color-content-informative)" },
    },
  },
};

// ─────────────────────────────────────────────
// ICON HELPERS
// ─────────────────────────────────────────────

const getAddonIconStyle = (size, color) => {
  const sizeStyles = styles.sizes[size] || styles.sizes.md;
  const colorStyles = styles.colors[color] || styles.colors.neutral;

  return {
    width: sizeStyles.icon?.width || "var(--size-icon-sm)",
    height: sizeStyles.icon?.height || "var(--size-icon-sm)",
    color: colorStyles.icon.color,
    flexShrink: 0,
  };
};

const renderIconNode = (icon, iconStyle) => {
  if (!icon) return null;

  if (isValidElement(icon)) {
    return cloneElement(icon, {
      style: {
        ...(icon.props?.style || {}),
        ...iconStyle,
      },
    });
  }

  if (typeof icon === "function") {
    return createElement(icon, { style: iconStyle });
  }

  return null;
};

// ─────────────────────────────────────────────
// DEFAULT STATUS ICON
// ─────────────────────────────────────────────

const DefaultBadgeStatusIcon = ({ size, color }) => {
  const sizeStyles = styles.sizes[size];
  if (!sizeStyles?.icon) return null;

  const { width, height } = sizeStyles.icon;
  const isAI = color === BADGE_COLORS.ai;

  if (isAI) {
    return (
      <span
        aria-hidden="true"
        style={{
          width,
          height,
          display: "inline-block",
          flexShrink: 0,
          background: BADGE_TOKEN_MAP.aiIconGradient,
          WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568l.258 1.022c.118.415.443.74.858.858l1.022.258a.75.75 0 0 1 0 1.456l-1.022.258a1.25 1.25 0 0 0-.858.858l-.258 1.022a.75.75 0 0 1-1.456 0l-.258-1.022a1.25 1.25 0 0 0-.858-.858l-1.022-.258a.75.75 0 0 1 0-1.456l1.022-.258a1.25 1.25 0 0 0 .858-.858l.258-1.022A.75.75 0 0 1 10 11Z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
          WebkitMaskSize: "contain",
          WebkitMaskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor'%3E%3Cpath fill-rule='evenodd' d='M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568l.258 1.022c.118.415.443.74.858.858l1.022.258a.75.75 0 0 1 0 1.456l-1.022.258a1.25 1.25 0 0 0-.858.858l-.258 1.022a.75.75 0 0 1-1.456 0l-.258-1.022a1.25 1.25 0 0 0-.858-.858l-1.022-.258a.75.75 0 0 1 0-1.456l1.022-.258a1.25 1.25 0 0 0 .858-.858l.258-1.022A.75.75 0 0 1 10 11Z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
          maskSize: "contain",
          maskPosition: "center",
          maskRepeat: "no-repeat",
        }}
      />
    );
  }

  return (
    <ShieldCheckIcon
      aria-hidden="true"
      style={{
        width,
        height,
        color: styles.colors[color]?.icon?.color || styles.colors.neutral.icon.color,
        flexShrink: 0,
      }}
    />
  );
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export const Badge = ({
  type = BADGE_TYPES.badgeColor,
  color = BADGE_COLORS.neutral,
  size = BADGE_SIZES.md,
  shape = BADGE_SHAPES.rounded,
  icon = false,
  leadingIcon,
  trailingIcon,
  variant = "default",
  style,
  children,
  ...props
}) => {
  const isAIVariant = variant === "ai";
  const effectiveColor = isAIVariant ? BADGE_COLORS.ai : color;

  const sizeStyles = styles.sizes[size] || styles.sizes.md;
  const colorStyles = styles.colors[effectiveColor] || styles.colors.neutral;
  const resolvedShape =
    type === BADGE_TYPES.pillColor ? BADGE_SHAPES.pill : shape;

  const showIcon = icon && (size === BADGE_SIZES.md || size === BADGE_SIZES.lg);

  const variantStyles = isAIVariant
    ? {
        border: "1px solid var(--color-ai-gradient-start)",
        outline: "none",
      }
    : {};

  const badgeStyle = {
    ...styles.base,
    ...sizeStyles.badge,
    ...colorStyles.badge,
    ...styles.shapes[resolvedShape],
    ...(type === BADGE_TYPES.badgeModern && {
      boxShadow: "var(--shadow-light-down)",
    }),
    ...variantStyles,
    ...style,
  };

  const textStyle = {
    ...sizeStyles.text,
    ...colorStyles.text,
    wordWrap: "break-word",
  };

  const addonIconStyle = getAddonIconStyle(size, effectiveColor);

  return (
    <div style={badgeStyle} {...props}>
      {leadingIcon && renderIconNode(leadingIcon, addonIconStyle)}
      <div style={textStyle}>{children}</div>
      {showIcon && <DefaultBadgeStatusIcon size={size} color={effectiveColor} />}
      {trailingIcon && renderIconNode(trailingIcon, addonIconStyle)}
    </div>
  );
};

// ─────────────────────────────────────────────
// ADDITIONAL VARIANTS
// ─────────────────────────────────────────────

export const BadgeWithDot = ({
  type = BADGE_TYPES.pillColor,
  color = BADGE_COLORS.neutral,
  size = BADGE_SIZES.md,
  children,
  style,
  ...props
}) => {
  const colorStyles = styles.colors[color] || styles.colors.neutral;
  const dotSize = size === BADGE_SIZES.lg ? "var(--spacing-sm)" : "var(--spacing-xs)";

  return (
    <Badge type={type} color={color} size={size} style={style} {...props}>
      <span
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: "var(--radius-full)",
          background: colorStyles.text.color,
          flexShrink: 0,
        }}
      />
      <span>{children}</span>
    </Badge>
  );
};

export const BadgeWithIcon = ({
  type = BADGE_TYPES.pillColor,
  color = BADGE_COLORS.neutral,
  size = BADGE_SIZES.md,
  iconLeading,
  iconTrailing,
  children,
  style,
  ...props
}) => {
  const iconStyle = getAddonIconStyle(size, color);

  return (
    <Badge type={type} color={color} size={size} style={style} {...props}>
      {renderIconNode(iconLeading, iconStyle)}
      <span>{children}</span>
      {renderIconNode(iconTrailing, iconStyle)}
    </Badge>
  );
};

export const BadgeWithButton = ({
  type = BADGE_TYPES.pillColor,
  color = BADGE_COLORS.neutral,
  size = BADGE_SIZES.md,
  icon,
  buttonLabel = "Remove badge",
  onButtonClick,
  children,
  style,
  ...props
}) => {
  const IconComponent = icon || XMarkIcon;
  const iconStyle = getAddonIconStyle(size, color);

  return (
    <Badge type={type} color={color} size={size} style={style} {...props}>
      <span>{children}</span>
      <button
        type="button"
        aria-label={buttonLabel}
        onClick={onButtonClick}
        style={{
          border: "none",
          background: "transparent",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--spacing-xxs)",
          cursor: "pointer",
          borderRadius:
            type === BADGE_TYPES.pillColor
              ? "var(--radius-full)"
              : "var(--radius-xs)",
          color: "inherit",
        }}
      >
        <IconComponent style={iconStyle} />
      </button>
    </Badge>
  );
};

export const BadgeIcon = ({
  type = BADGE_TYPES.pillColor,
  color = BADGE_COLORS.neutral,
  size = BADGE_SIZES.md,
  icon,
  style,
  ...props
}) => {
  const iconStyle = getAddonIconStyle(size, color);
  const iconNode = renderIconNode(icon, iconStyle);

  return (
    <Badge
      type={type}
      color={color}
      size={size}
      style={{
        paddingLeft: "var(--spacing-xs)",
        paddingRight: "var(--spacing-xs)",
        ...style,
      }}
      {...props}
    >
      {iconNode}
    </Badge>
  );
};

Badge.displayName = "Badge";
Badge.colors = BADGE_COLORS;
Badge.sizes = BADGE_SIZES;
Badge.shapes = BADGE_SHAPES;
Badge.types = BADGE_TYPES;
Badge.WithDot = BadgeWithDot;
Badge.WithIcon = BadgeWithIcon;
Badge.WithButton = BadgeWithButton;
Badge.Icon = BadgeIcon;

export default Badge;