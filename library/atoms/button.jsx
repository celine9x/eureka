/**
 * Button Component
 *
 * A flexible button with variants, sizes, and loading states.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
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
    border: "1px solid transparent",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    fontFamily: "var(--font-family-primary)",
    fontWeight: 400,
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

  sizes: {
    xs: {
      padding: "4px 8px",
      fontSize: "var(--text-body-caption)",
      lineHeight: "var(--line-height-body-caption)",
      minHeight: 24,
      gap: 4,
      iconSize: 12,
    },
    sm: {
      padding: "4px 12px",
      fontSize: "var(--text-button-md)",
      lineHeight: "var(--line-height-button-md)",
      minHeight: 28,
      gap: 4,
      iconSize: 14,
    },
    md: {
      padding: "8px 16px",
      fontSize: "var(--text-button-md)",
      lineHeight: "var(--line-height-button-md)",
      minHeight: 32,
      gap: 4,
      iconSize: 16,
    },
    lg: {
      padding: "12px 20px",
      fontSize: "var(--text-button-lg)",
      lineHeight: "var(--line-height-button-lg)",
      minHeight: 40,
      gap: 6,
      iconSize: 20,
    },
    xl: {
      padding: "14px 24px",
      fontSize: "var(--text-button-lg)",
      lineHeight: "var(--line-height-button-lg)",
      minHeight: 48,
      gap: 6,
      iconSize: 20,
    },
  },

  variants: {
    primary: {
      enabled: {
        background: "var(--color-action-fill-primary-enabled)",
        color: "var(--color-action-content-primary-enabled)",
        borderColor: "var(--color-action-fill-primary-enabled)",
      },
      hover: {
        background: "var(--color-action-fill-primary-hover)",
        borderColor: "var(--color-action-fill-primary-hover)",
      },
      active: {
        background: "var(--color-action-fill-primary-active)",
        borderColor: "var(--color-action-fill-primary-active)",
      },
      disabled: {
        background: "var(--color-action-fill-primary-disabled)",
        color: "var(--color-action-content-primary-disabled)",
        borderColor: "var(--color-action-fill-primary-disabled)",
      },
    },
    secondary: {
      enabled: {
        background: "var(--color-action-fill-secondary-enabled)",
        color: "var(--color-action-content-secondary-enabled)",
        borderColor: "var(--color-action-outline-secondary-enabled)",
      },
      hover: {
        background: "var(--color-action-fill-secondary-hover)",
        color: "var(--color-action-content-secondary-hover)",
        borderColor: "var(--color-action-outline-secondary-hover)",
      },
      active: {
        background: "var(--color-action-fill-secondary-active)",
        color: "var(--color-action-content-secondary-active)",
        borderColor: "var(--color-action-outline-secondary-active)",
      },
      disabled: {
        background: "var(--color-action-fill-secondary-disabled)",
        color: "var(--color-action-content-secondary-disabled)",
        borderColor: "var(--color-action-outline-secondary-disabled)",
      },
    },
    tertiary: {
      enabled: {
        background: "transparent",
        color: "var(--color-action-content-tertiary-enabled)",
        borderColor: "transparent",
      },
      hover: {
        background: "var(--color-action-fill-tertiary-hover)",
        color: "var(--color-action-content-tertiary-hover)",
      },
      active: {
        background: "var(--color-action-fill-tertiary-active)",
        color: "var(--color-action-content-tertiary-active)",
      },
      disabled: {
        background: "transparent",
        color: "var(--color-action-content-tertiary-disabled)",
        borderColor: "transparent",
      },
    },
    negative: {
      enabled: {
        background: "var(--color-action-fill-negative-enabled)",
        color: "var(--color-action-content-negative-enabled)",
        borderColor: "var(--color-action-fill-negative-enabled)",
      },
      hover: {
        background: "var(--color-action-fill-negative-hover)",
        borderColor: "var(--color-action-fill-negative-hover)",
      },
      active: {
        background: "var(--color-action-fill-negative-active)",
        borderColor: "var(--color-action-fill-negative-active)",
      },
      disabled: {
        background: "var(--color-action-fill-negative-disabled)",
        color: "var(--color-action-content-negative-disabled)",
        borderColor: "var(--color-action-fill-negative-disabled)",
      },
    },
    positive: {
      enabled: {
        background: "var(--color-action-fill-positive-enabled)",
        color: "var(--color-action-content-positive-enabled)",
        borderColor: "var(--color-action-fill-positive-enabled)",
      },
      hover: {
        background: "var(--color-action-fill-positive-hover)",
        borderColor: "var(--color-action-fill-positive-hover)",
      },
      active: {
        background: "var(--color-action-fill-positive-active)",
        borderColor: "var(--color-action-fill-positive-active)",
      },
      disabled: {
        background: "var(--color-action-fill-positive-disabled)",
        color: "var(--color-action-content-positive-disabled)",
        borderColor: "var(--color-action-fill-positive-disabled)",
      },
    },
    link: {
      enabled: {
        background: "transparent",
        color: "var(--color-content-brand)",
        borderColor: "transparent",
        padding: 0,
        minHeight: "auto",
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
  },

  spinner: {
    position: "absolute",
    animation: "spin 1s linear infinite",
  },
};

// ─────────────────────────────────────────────
// SPINNER COMPONENT
// ─────────────────────────────────────────────

const Spinner = ({ size = 16 }) => (
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
        minHeight: sizeStyles.minHeight,
        gap: sizeStyles.gap,
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
