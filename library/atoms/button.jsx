"use client";

/**
 * Button Component (Atom)
 *
 * A flexible button with variants, sizes, and loading states.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * Token Mapping:
 * - Heights: --size-button-xs/sm/md/lg/xl
 * - Typography: --text-button-md/lg, --line-height-button-md/lg, --font-weight-button-md/lg
 * - Icons: --size-icon-sm/md
 * - Spacing: --spacing-1/2/3 for padding and gaps
 * - Radius: --radius-sm/md
 * - Colors: --color-action-fill-*, --color-action-content-*, --color-action-outline-*
 * - Shadows: --shadow-button-enabled/hover/focus/light
 *
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 * <Button variant="secondary" iconLeading={<Icon name="Plus" />}>Add</Button>
 * <Button variant="negative" loading>Deleting...</Button>
 */

import { useState, forwardRef, cloneElement, isValidElement, createElement } from "react";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const BUTTON_VARIANTS = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  negative: "negative",
  positive: "positive",
  link: "link",
};

export const BUTTON_COLORS = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  "link-color": "link-color",
  "link-gray": "link-gray",
  "primary-destructive": "primary-destructive",
  "secondary-destructive": "secondary-destructive",
  "tertiary-destructive": "tertiary-destructive",
  "link-destructive": "link-destructive",
};

export const BUTTON_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-regular)",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "all var(--transition-fast)",
    position: "relative",
    outlineWidth: "0",
    outlineStyle: "none",
    outlineColor: "transparent",
    boxSizing: "border-box",
  },

  block: {
    width: "100%",
  },

  loading: {
    pointerEvents: "none",
  },

  disabled: {
    cursor: "not-allowed",
    pointerEvents: "none",
  },

  textPadding: {
    paddingLeft: "var(--spacing-xs)",
    paddingRight: "var(--spacing-xs)",
  },

  // Size configurations using tokens
  // sm=24px, md=32px, lg=40px, xl=48px
  // Radius: sm=4px, md=8px (from Figma)
  sizes: {
    sm: {
      padding: "0 var(--spacing-xs)",           // 0 4px
      fontSize: "var(--text-button-md)",        // 12px
      lineHeight: "var(--line-height-button-md)", // 16px
      height: "var(--size-button-xs)",          // 24px
      minWidth: "var(--size-button-xs)",        // 24px
      gap: "var(--spacing-xs)",                 // 4px
      iconSize: "var(--size-icon-sm)",          // 16px
      borderRadius: "var(--radius-xs)",         // 4px
    },
    md: {
      padding: "0 var(--spacing-sm)",           // 0 8px
      fontSize: "var(--text-button-md)",        // 12px
      lineHeight: "var(--line-height-button-md)", // 16px
      height: "var(--size-button-md)",          // 32px
      minWidth: "var(--size-button-md)",        // 32px
      gap: "var(--spacing-sm)",                 // 8px
      iconSize: "var(--size-icon-sm)",          // 16px
      borderRadius: "var(--radius-sm)",         // 8px
    },
    lg: {
      padding: "0 var(--spacing-sm)",           // 0 8px
      fontSize: "var(--text-button-lg)",        // 14px
      lineHeight: "var(--line-height-button-lg)", // 20px
      height: "var(--size-button-lg)",          // 40px
      minWidth: "var(--size-button-lg)",        // 40px
      gap: "var(--spacing-sm)",                 // 8px
      iconSize: "var(--size-icon-md)",          // 20px
      borderRadius: "var(--radius-sm)",         // 8px
    },
    xl: {
      padding: "0 var(--spacing-3)",            // 0 12px
      fontSize: "var(--text-button-lg)",        // 14px
      lineHeight: "var(--line-height-button-lg)", // 20px
      height: "var(--size-button-xl)",          // 48px
      minWidth: "var(--size-button-xl)",        // 48px
      gap: "var(--spacing-sm)",                 // 8px
      iconSize: "var(--size-icon-md)",          // 20px
      borderRadius: "var(--radius-sm)",         // 8px
    },
  },

  variants: {
    primary: {
      enabled: {
        background: "var(--color-action-fill-primary-enabled)",
        color: "var(--color-action-content-primary-enabled)",
        boxShadow: "var(--shadow-button-enabled)",
      },
      hover: {
        background: "var(--color-action-fill-primary-hover)",
        color: "var(--color-action-content-primary-enabled)",
        boxShadow: "var(--shadow-button-hover)",
      },
      active: {
        background: "var(--color-action-fill-primary-active)",
        color: "var(--color-action-content-primary-enabled)",
        boxShadow: "var(--shadow-button-focus)",
      },
      disabled: {
        background: "var(--color-action-fill-primary-disabled)",
        color: "var(--color-action-content-primary-disabled)",
        boxShadow: "none",
      },
    },
    secondary: {
      enabled: {
        background: "var(--color-action-fill-secondary-enabled)",
        color: "var(--color-action-content-secondary-enabled)",
        outlineWidth: "1px",
        outlineStyle: "solid",
        outlineColor: "var(--color-action-outline-secondary-enabled)",
        outlineOffset: "-1px",
        boxShadow: "var(--shadow-button-light)",
      },
      hover: {
        background: "var(--color-action-fill-secondary-hover)",
        color: "var(--color-action-content-secondary-hover)",
        outlineWidth: "1px",
        outlineStyle: "solid",
        outlineColor: "var(--color-action-outline-secondary-hover)",
        outlineOffset: "-1px",
        boxShadow: "var(--shadow-button-enabled)",
      },
      active: {
        background: "var(--color-action-fill-secondary-active)",
        color: "var(--color-action-content-secondary-active)",
        outlineWidth: "1px",
        outlineStyle: "solid",
        outlineColor: "var(--color-action-outline-secondary-active)",
        outlineOffset: "-1px",
        boxShadow: "var(--shadow-button-focus)",
      },
      disabled: {
        background: "var(--color-action-fill-secondary-disabled)",
        color: "var(--color-action-content-secondary-disabled)",
        outlineWidth: "1px",
        outlineStyle: "solid",
        outlineColor: "var(--color-action-outline-secondary-disabled)",
        outlineOffset: "-1px",
        boxShadow: "none",
      },
    },
    tertiary: {
      enabled: {
        background: "var(--color-action-fill-tertiary-enabled)",
        color: "var(--color-action-content-tertiary-enabled)",
        outlineWidth: "0",
        outlineStyle: "none",
        outlineColor: "transparent",
        boxShadow: "none",
      },
      hover: {
        background: "var(--color-action-fill-tertiary-hover)",
        color: "var(--color-action-content-tertiary-hover)",
        outlineWidth: "1px",
        outlineStyle: "solid",
        outlineColor: "var(--color-action-outline-secondary-enabled)",
        outlineOffset: "-1px",
        boxShadow: "none",
      },
      active: {
        background: "var(--color-action-fill-tertiary-active)",
        color: "var(--color-action-content-tertiary-active)",
        outlineWidth: "1px",
        outlineStyle: "solid",
        outlineColor: "var(--color-action-outline-secondary-enabled)",
        outlineOffset: "-0.5px",
        boxShadow: "none",
      },
      disabled: {
        background: "var(--color-action-fill-tertiary-disabled)",
        color: "var(--color-action-content-tertiary-disabled)",
        outlineWidth: "0",
        outlineStyle: "none",
        outlineColor: "transparent",
        boxShadow: "none",
      },
    },
    negative: {
      enabled: {
        background: "var(--color-action-fill-negative-enabled)",
        color: "var(--color-action-content-negative-enabled)",
        boxShadow: "var(--shadow-button-enabled)",
      },
      hover: {
        background: "var(--color-action-fill-negative-hover)",
        color: "var(--color-action-content-negative-enabled)",
        boxShadow: "var(--shadow-button-hover)",
      },
      active: {
        background: "var(--color-action-fill-negative-active)",
        color: "var(--color-action-content-negative-enabled)",
        boxShadow: "var(--shadow-button-focus)",
      },
      disabled: {
        background: "var(--color-action-fill-negative-disabled)",
        color: "var(--color-action-content-negative-disabled)",
        boxShadow: "none",
      },
    },
    positive: {
      enabled: {
        background: "var(--color-action-fill-positive-enabled)",
        color: "var(--color-action-content-positive-enabled)",
        boxShadow: "var(--shadow-button-enabled)",
      },
      hover: {
        background: "var(--color-action-fill-positive-hover)",
        color: "var(--color-action-content-positive-enabled)",
        boxShadow: "var(--shadow-button-hover)",
      },
      active: {
        background: "var(--color-action-fill-positive-active)",
        color: "var(--color-action-content-positive-enabled)",
        boxShadow: "var(--shadow-button-focus)",
      },
      disabled: {
        background: "var(--color-action-fill-positive-disabled)",
        color: "var(--color-action-content-positive-disabled)",
        boxShadow: "none",
      },
    },
    link: {
      enabled: {
        background: "transparent",
        color: "var(--color-content-brand)",
        padding: 0,
        height: "auto",
        boxShadow: "none",
      },
      hover: {
        color: "var(--color-content-brand-bold)",
        textDecoration: "underline",
      },
      active: {
        color: "var(--color-content-brand-bold)",
      },
      disabled: {
        color: "var(--color-content-tertiary)",
      },
    },
  },

  content: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },

  contentHidden: {
    visibility: "hidden",
  },

  icon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 0,
    flexShrink: 0,
  },

  spinner: {
    position: "absolute",
    animation: "button-spin 1s linear infinite",
  },

  destructiveSecondary: {
    enabled: {
      background: "var(--color-action-fill-negative-secondary-enabled)",
      color: "var(--color-action-content-negative-secondary-enabled)",
      outlineWidth: "1px",
      outlineStyle: "solid",
      outlineColor: "var(--color-action-outline-negative-secondary-enabled)",
      outlineOffset: "-1px",
      boxShadow: "var(--shadow-button-light)",
    },
    hover: {
      background: "var(--color-action-fill-negative-secondary-hover)",
      color: "var(--color-action-content-negative-secondary-hover)",
      outlineWidth: "1px",
      outlineStyle: "solid",
      outlineColor: "var(--color-action-outline-negative-secondary-hover)",
      outlineOffset: "-1px",
      boxShadow: "var(--shadow-button-enabled)",
    },
    active: {
      background: "var(--color-action-fill-negative-secondary-active)",
      color: "var(--color-action-content-negative-secondary-active)",
      outlineWidth: "1px",
      outlineStyle: "solid",
      outlineColor: "var(--color-action-outline-negative-secondary-active)",
      outlineOffset: "-1px",
      boxShadow: "var(--shadow-button-focus)",
    },
    disabled: {},
  },

  destructiveTertiary: {
    color: "var(--color-action-content-negative-enabled)",
  },

  destructiveLink: {
    color: "var(--color-action-content-negative-enabled)",
  },
};

// Inject keyframes for spinner animation
if (typeof document !== "undefined") {
  const styleId = "eureka-button-keyframes";
  if (!document.getElementById(styleId)) {
    const styleEl = document.createElement("style");
    styleEl.id = styleId;
    styleEl.textContent = `
      @keyframes button-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleEl);
  }
}

// ─────────────────────────────────────────────
// SPINNER COMPONENT
// ─────────────────────────────────────────────

const Spinner = ({ size = "var(--size-icon-sm)" }) => (
  <svg
    style={{ ...styles.spinner, width: size, height: size }}
    viewBox="0 0 20 20"
    fill="none"
  >
    <circle
      stroke="currentColor"
      opacity="0.3"
      cx="10"
      cy="10"
      r="8"
      strokeWidth="2"
    />
    <circle
      stroke="currentColor"
      cx="10"
      cy="10"
      r="8"
      strokeWidth="2"
      strokeDasharray="12.5 50"
      strokeLinecap="round"
    />
  </svg>
);

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

/** Button */
export const Button = forwardRef(
  (
    {
      variant = BUTTON_VARIANTS.primary,
      color,
      size = BUTTON_SIZES.md,
      isDisabled = false,
      disabled,
      isLoading,
      loading = false,
      block = false,
      type = "button",
      href,
      iconLeading,
      iconTrailing,
      iconOnly = false,
      noTextPadding = false,
      showTextWhileLoading = false,
      onClick,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const effectiveLoading = Boolean(isLoading ?? loading);
    const colorToVariant = {
      primary: BUTTON_VARIANTS.primary,
      secondary: BUTTON_VARIANTS.secondary,
      tertiary: BUTTON_VARIANTS.tertiary,
      "link-color": BUTTON_VARIANTS.link,
      "link-gray": BUTTON_VARIANTS.link,
      "primary-destructive": BUTTON_VARIANTS.negative,
      "secondary-destructive": BUTTON_VARIANTS.secondary,
      "tertiary-destructive": BUTTON_VARIANTS.tertiary,
      "link-destructive": BUTTON_VARIANTS.link,
    };

    const effectiveColor = color || variant;
    const effectiveVariant = colorToVariant[effectiveColor] || variant;
    const isLink = effectiveVariant === BUTTON_VARIANTS.link;
    const isLinkTypeColor = ["link-color", "link-gray", "link-destructive"].includes(effectiveColor);
    const isButtonDisabled = isDisabled || disabled || effectiveLoading;

    // Get size styles
    const sizeStyles = styles.sizes[size];

    // Get variant styles based on state
    const variantStyles = styles.variants[effectiveVariant];
    const getStateStyles = () => {
      if (isButtonDisabled) return variantStyles.disabled;
      if (isActive) return variantStyles.active;
      if (isHovered) return variantStyles.hover;
      return variantStyles.enabled;
    };

    const stateStyles = getStateStyles();
    const interactionState = isButtonDisabled
      ? "disabled"
      : isActive
      ? "active"
      : isHovered
      ? "hover"
      : "enabled";

    // Compose button styles
    const buttonStyle = {
      ...styles.base,
      ...(!isLink && {
        padding: sizeStyles.padding,
        fontSize: sizeStyles.fontSize,
        lineHeight: sizeStyles.lineHeight,
        height: sizeStyles.height,
        minWidth: sizeStyles.minWidth,
        gap: sizeStyles.gap,
        borderRadius: sizeStyles.borderRadius,
      }),
      ...stateStyles,
      ...(effectiveColor === "secondary-destructive" && styles.destructiveSecondary[interactionState]),
      ...(effectiveColor === "tertiary-destructive" && styles.destructiveTertiary),
      ...(effectiveColor === "link-destructive" && styles.destructiveLink),
      ...(block && styles.block),
      ...(effectiveLoading && styles.loading),
      ...(isButtonDisabled && styles.disabled),
      // iconOnly: make button square (width = height, no padding)
      ...(iconOnly && {
        width: sizeStyles.height,
        padding: 0,
        aspectRatio: "1 / 1",
      }),
      ...style,
    };

    // Content styles
    const contentStyle = {
      ...styles.content,
      gap: sizeStyles.gap,
      ...(effectiveLoading && !showTextWhileLoading && styles.contentHidden),
    };

    // Icon styles
    const iconStyle = {
      ...styles.icon,
      width: sizeStyles.iconSize,
      height: sizeStyles.iconSize,
    };

    const renderIcon = (icon, slot) => {
      if (!icon) return null;
      if (isValidElement(icon)) {
        const existingStyle = icon.props?.style || {};
        const hasDataIcon = icon.props?.["data-icon"];
        return cloneElement(icon, {
          style: { ...iconStyle, ...existingStyle },
          "data-icon": hasDataIcon || slot,
        });
      }
      if (typeof icon === "function") {
        return createElement(icon, { style: iconStyle, "data-icon": slot });
      }
      return <span style={iconStyle}>{icon}</span>;
    };

    const textStyle = {
      ...(isLinkTypeColor || noTextPadding ? {} : {
        paddingLeft: iconLeading ? undefined : styles.textPadding.paddingLeft,
        paddingRight: iconTrailing ? undefined : styles.textPadding.paddingRight,
      }),
    };

    const commonProps = {
      ref,
      style: buttonStyle,
      onClick,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => {
        setIsHovered(false);
        setIsActive(false);
      },
      onPointerLeave: () => {
        setIsHovered(false);
        setIsActive(false);
      },
      onPointerCancel: () => {
        setIsHovered(false);
        setIsActive(false);
      },
      onMouseDown: () => setIsActive(true),
      onMouseUp: () => setIsActive(false),
      onBlur: () => {
        setIsHovered(false);
        setIsActive(false);
      },
      ...props,
    };

    const content = (
      <>
        {effectiveLoading && <Spinner size={sizeStyles.iconSize} />}
        <span style={contentStyle}>
          {renderIcon(iconLeading, "leading")}
          {children && <span style={textStyle}>{children}</span>}
          {renderIcon(iconTrailing, "trailing")}
        </span>
      </>
    );

    if (href) {
      return (
        <a
          href={isButtonDisabled ? undefined : href}
          aria-disabled={isButtonDisabled ? true : undefined}
          {...commonProps}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        type={type}
        disabled={isButtonDisabled}
        {...commonProps}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
Button.sizes = BUTTON_SIZES;
Button.variants = BUTTON_VARIANTS;
Button.colors = BUTTON_COLORS;

export default Button;
