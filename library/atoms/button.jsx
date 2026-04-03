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

import { useState, forwardRef } from "react";

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

export const BUTTON_SIZES = {
  xs: "xs",
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
    outline: "none",
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

  // Size configurations using tokens
  // xs=24px, sm=32px, md=32px, lg=40px, xl=48px
  // Radius: xs=4px, sm=8px, md=10px (from Figma)
  sizes: {
    xs: {
      padding: "0 var(--spacing-xs)",           // 0 4px
      fontSize: "var(--text-button-md)",        // 12px
      lineHeight: "var(--line-height-button-md)", // 16px
      height: "var(--size-button-xs)",          // 24px
      gap: "var(--spacing-xs)",                 // 4px
      iconSize: "var(--size-icon-sm)",          // 16px
      borderRadius: "var(--radius-xs)",         // 4px
    },
    sm: {
      padding: "0 var(--spacing-sm)",           // 0 8px
      fontSize: "var(--text-button-md)",        // 12px
      lineHeight: "var(--line-height-button-md)", // 16px
      height: "var(--size-button-sm)",          // 32px
      gap: "var(--spacing-sm)",                 // 8px
      iconSize: "var(--size-icon-sm)",          // 16px
      borderRadius: "var(--radius-sm)",         // 8px
    },
    md: {
      padding: "0 var(--spacing-sm)",           // 0 8px
      fontSize: "var(--text-button-md)",        // 12px
      lineHeight: "var(--line-height-button-md)", // 16px
      height: "var(--size-button-md)",          // 32px
      gap: "var(--spacing-sm)",                 // 8px
      iconSize: "var(--size-icon-sm)",          // 16px
      borderRadius: "var(--radius-sm)",         // 8px
    },
    lg: {
      padding: "0 var(--spacing-sm)",           // 0 8px
      fontSize: "var(--text-button-lg)",        // 14px
      lineHeight: "var(--line-height-button-lg)", // 20px
      height: "var(--size-button-lg)",          // 40px
      gap: "var(--spacing-sm)",                 // 8px
      iconSize: "var(--size-icon-md)",          // 20px
      borderRadius: "var(--radius-sm)",         // 8px
    },
    xl: {
      padding: "0 var(--spacing-3)",            // 0 12px
      fontSize: "var(--text-button-lg)",        // 14px
      lineHeight: "var(--line-height-button-lg)", // 20px
      height: "var(--size-button-xl)",          // 48px
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
        outline: "1px solid var(--color-action-outline-secondary-enabled)",
        outlineOffset: "-1px",
        boxShadow: "var(--shadow-button-light)",
      },
      hover: {
        background: "var(--color-action-fill-secondary-hover)",
        color: "var(--color-action-content-secondary-hover)",
        outline: "1px solid var(--color-action-outline-secondary-hover)",
        outlineOffset: "-1px",
        boxShadow: "var(--shadow-button-enabled)",
      },
      active: {
        background: "var(--color-action-fill-secondary-active)",
        color: "var(--color-action-content-secondary-active)",
        outline: "1px solid var(--color-action-outline-secondary-active)",
        outlineOffset: "-1px",
        boxShadow: "var(--shadow-button-focus)",
      },
      disabled: {
        background: "var(--color-action-fill-secondary-disabled)",
        color: "var(--color-action-content-secondary-disabled)",
        outline: "1px solid var(--color-action-outline-secondary-disabled)",
        outlineOffset: "-1px",
        boxShadow: "none",
      },
    },
    tertiary: {
      enabled: {
        background: "var(--color-action-fill-tertiary-enabled)",
        color: "var(--color-action-content-tertiary-enabled)",
        boxShadow: "none",
      },
      hover: {
        background: "var(--color-action-fill-tertiary-hover)",
        color: "var(--color-action-content-tertiary-hover)",
        outline: "1px solid var(--color-action-outline-secondary-enabled)",
        outlineOffset: "-1px",
      },
      active: {
        background: "var(--color-action-fill-tertiary-active)",
        color: "var(--color-action-content-tertiary-active)",
        outline: "1px solid var(--color-action-outline-secondary-enabled)",
        outlineOffset: "-1px",
      },
      disabled: {
        background: "var(--color-action-fill-tertiary-disabled)",
        color: "var(--color-action-content-tertiary-disabled)",
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

/**
 * Button
 *
 * @param {string} variant - primary | secondary | tertiary | negative | positive | link
 * @param {string} size - xs | sm | md | lg | xl (ignored for link variant)
 * @param {boolean} isDisabled - Disables the button
 * @param {boolean} loading - Shows loading spinner and disables button
 * @param {boolean} block - Full width button
 * @param {string} type - button | submit | reset
 * @param {ReactNode} iconLeading - Icon before text
 * @param {ReactNode} iconTrailing - Icon after text
 * @param {function} onClick - Click handler
 * @param {object} style - Additional inline styles
 */
export const Button = forwardRef(
  (
    {
      variant = BUTTON_VARIANTS.primary,
      size = BUTTON_SIZES.md,
      isDisabled = false,
      disabled,
      loading = false,
      block = false,
      type = "button",
      iconLeading,
      iconTrailing,
      onClick,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const isButtonDisabled = isDisabled || disabled || loading;
    const isLink = variant === BUTTON_VARIANTS.link;

    // Get size styles
    const sizeStyles = styles.sizes[size];

    // Get variant styles based on state
    const variantStyles = styles.variants[variant];
    const getStateStyles = () => {
      if (isButtonDisabled) return variantStyles.disabled;
      if (isActive) return variantStyles.active;
      if (isHovered) return variantStyles.hover;
      return variantStyles.enabled;
    };

    const stateStyles = getStateStyles();

    // Compose button styles
    const buttonStyle = {
      ...styles.base,
      ...(!isLink && {
        padding: sizeStyles.padding,
        fontSize: sizeStyles.fontSize,
        lineHeight: sizeStyles.lineHeight,
        height: sizeStyles.height,
        gap: sizeStyles.gap,
        borderRadius: sizeStyles.borderRadius,
      }),
      ...stateStyles,
      ...(block && styles.block),
      ...(loading && styles.loading),
      ...(isButtonDisabled && styles.disabled),
      ...style,
    };

    // Content styles
    const contentStyle = {
      ...styles.content,
      gap: sizeStyles.gap,
      ...(loading && styles.contentHidden),
    };

    // Icon styles
    const iconStyle = {
      ...styles.icon,
      width: sizeStyles.iconSize,
      height: sizeStyles.iconSize,
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={isButtonDisabled}
        style={buttonStyle}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsActive(false);
        }}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        {...props}
      >
        {loading && <Spinner size={sizeStyles.iconSize} />}
        <span style={contentStyle}>
          {iconLeading && <span style={iconStyle}>{iconLeading}</span>}
          {children}
          {iconTrailing && <span style={iconStyle}>{iconTrailing}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";
Button.sizes = BUTTON_SIZES;
Button.variants = BUTTON_VARIANTS;

export default Button;
