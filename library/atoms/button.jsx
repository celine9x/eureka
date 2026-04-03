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

// Shadow tokens matching Figma design (uses CSS variables from tokens.css)
const SHADOWS = {
  enabled: "var(--shadow-button-enabled)",
  hover: "var(--shadow-button-hover)",
  focus: "var(--shadow-button-focus)",
  light: "var(--shadow-button-light)",
};

const styles = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
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

  // Size configurations matching Figma (xs=24px, sm=32px, md=32px, lg=40px, xl=48px)
  sizes: {
    xs: {
      padding: "0 4px",
      fontSize: 12,
      lineHeight: "16px",
      height: 24,
      gap: 4,
      iconSize: 16,
      borderRadius: "var(--radius-sm)", // 4px for xs
    },
    sm: {
      padding: "0 8px",
      fontSize: 12,
      lineHeight: "16px",
      height: 32,
      gap: 8,
      iconSize: 16,
      borderRadius: "var(--radius-md)", // 8px
    },
    md: {
      padding: "0 8px",
      fontSize: 12,
      lineHeight: "16px",
      height: 32,
      gap: 8,
      iconSize: 16,
      borderRadius: "var(--radius-md)", // 8px
    },
    lg: {
      padding: "0 8px",
      fontSize: 14,
      lineHeight: "20px",
      height: 40,
      gap: 8,
      iconSize: 20,
      borderRadius: "var(--radius-md)", // 8px
    },
    xl: {
      padding: "0 12px",
      fontSize: 14,
      lineHeight: "20px",
      height: 48,
      gap: 8,
      iconSize: 20,
      borderRadius: "var(--radius-md)", // 8px
    },
  },

  variants: {
    primary: {
      enabled: {
        background: "var(--color-action-fill-primary-enabled)", // #4649FF
        color: "var(--color-action-content-primary-enabled)", // white
        boxShadow: SHADOWS.enabled,
      },
      hover: {
        background: "var(--color-action-fill-primary-hover)", // #383ACC
        color: "var(--color-action-content-primary-enabled)", // white - maintain text color
        boxShadow: SHADOWS.hover,
      },
      active: {
        background: "var(--color-action-fill-primary-active)", // #4649FF
        color: "var(--color-action-content-primary-enabled)", // white - maintain text color
        boxShadow: SHADOWS.focus,
      },
      disabled: {
        background: "var(--color-action-fill-primary-disabled)", // #ECEDFF
        color: "var(--color-action-content-primary-disabled)", // #4649FF
        boxShadow: "none",
      },
    },
    secondary: {
      enabled: {
        background: "var(--color-action-fill-secondary-enabled)", // white
        color: "var(--color-action-content-secondary-enabled)", // #5371AC
        outline: "1px solid var(--color-action-outline-secondary-enabled)", // #D9E0ED
        outlineOffset: "-1px",
        boxShadow: SHADOWS.light,
      },
      hover: {
        background: "var(--color-action-fill-secondary-hover)", // #F8F9FC
        color: "var(--color-action-content-secondary-hover)", // #324467
        outline: "1px solid var(--color-action-outline-secondary-hover)", // #93A6CB
        boxShadow: SHADOWS.enabled,
      },
      active: {
        background: "var(--color-action-fill-secondary-active)", // #ECEDFF
        color: "var(--color-action-content-secondary-active)", // #15154C
        outline: "1px solid var(--color-action-outline-secondary-active)", // #383ACC
        boxShadow: SHADOWS.focus,
      },
      disabled: {
        background: "var(--color-action-fill-secondary-disabled)", // #EFF2F9
        color: "var(--color-action-content-secondary-disabled)", // #93A6CB
        outline: "1px solid var(--color-action-outline-secondary-disabled)", // #D9E0ED
        boxShadow: "none",
      },
    },
    tertiary: {
      enabled: {
        background: "transparent",
        color: "var(--color-action-content-tertiary-enabled)", // #5371AC
        boxShadow: "none",
      },
      hover: {
        background: "var(--color-action-fill-tertiary-hover)", // white
        color: "var(--color-action-content-tertiary-hover)", // #324467
        outline: "1px solid var(--color-action-outline-secondary-enabled)", // #D9E0ED
        outlineOffset: "-1px",
      },
      active: {
        background: "var(--color-action-fill-tertiary-active)", // #F8F9FC
        color: "var(--color-action-content-tertiary-active)", // #15154C
        outline: "1px solid var(--color-action-outline-secondary-enabled)", // #D9E0ED
        outlineOffset: "-1px",
      },
      disabled: {
        background: "transparent",
        color: "var(--color-action-content-tertiary-disabled)", // #93A6CB
        boxShadow: "none",
      },
    },
    negative: {
      enabled: {
        background: "var(--color-action-fill-negative-enabled)", // #FF7373
        color: "var(--color-action-content-negative-enabled)", // white
        boxShadow: SHADOWS.enabled,
      },
      hover: {
        background: "var(--color-action-fill-negative-hover)", // #E45353
        color: "var(--color-action-content-negative-enabled)", // white - maintain text color
        boxShadow: SHADOWS.hover,
      },
      active: {
        background: "var(--color-action-fill-negative-active)", // #FF7373
        color: "var(--color-action-content-negative-enabled)", // white - maintain text color
        boxShadow: SHADOWS.focus,
      },
      disabled: {
        background: "var(--color-action-fill-negative-disabled)", // #FFF5F5
        color: "var(--color-action-content-negative-disabled)", // #FF7373
        boxShadow: "none",
      },
    },
    positive: {
      enabled: {
        background: "var(--color-action-fill-positive-enabled)", // #02C39A
        color: "var(--color-action-content-positive-enabled)", // white
        boxShadow: SHADOWS.enabled,
      },
      hover: {
        background: "var(--color-action-fill-positive-hover)", // #029778
        color: "var(--color-action-content-positive-enabled)", // white - maintain text color
        boxShadow: SHADOWS.hover,
      },
      active: {
        background: "var(--color-action-fill-positive-active)", // #02C39A
        color: "var(--color-action-content-positive-enabled)", // white - maintain text color
        boxShadow: SHADOWS.focus,
      },
      disabled: {
        background: "var(--color-action-fill-positive-disabled)", // #E6FFF9
        color: "var(--color-action-content-positive-disabled)", // #029778
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
