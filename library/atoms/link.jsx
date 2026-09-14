"use client";

/**
 * Link Component
 *
 * A styled anchor link with optional leading/trailing icons.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <Link href="/page">Go to page</Link>
 * <Link href="/page" size="md">Medium link</Link>
 * <Link href="/page" iconLeading={<Icon name="ArrowLeft" />}>Back</Link>
 */

import { useState } from "react";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const LINK_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--spacing-xs)",
   
    borderRadius: "var(--radius-sm)",
    textDecoration: "none",
    cursor: "pointer",
    fontFamily: "var(--font-family-primary)",
    color: "var(--color-content-brand)",
    transition: "all var(--transition-fast)",
    outline: "none",
    border: "none",
    background: "transparent",
  },

  hover: {
    color: "var(--color-content-brand-bold)",
    textDecoration: "underline",
  },

  active: {
    background: "var(--color-action-fill-tertiary-active)",
    color: "var(--color-content-brand-bold)",
    textDecoration: "underline",
  },

  disabled: {
    cursor: "not-allowed",
    color: "var(--color-content-tertiary)",
    pointerEvents: "none",
  },

  icon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    overflow: "hidden",
    color: "var(--color-content-secondary)",
  },

  sizes: {
    sm: {
      base: {
        height: 20,
        fontSize: "var(--text-body-caption)",
        lineHeight: "var(--line-height-body-caption)",
        fontWeight: "var(--font-weight-regular)",
      },
      icon: { width: 12, height: 12 },
    },
    md: {
      base: {
        height: 24,
        fontSize: "var(--text-body-md)",
        lineHeight: "var(--line-height-body-md)",
        fontWeight: "var(--font-weight-regular)",
      },
      icon: { width: 14, height: 14 },
    },
    lg: {
      base: {
        height: 28,
        fontSize: "var(--text-body-lg)",
        lineHeight: "var(--line-height-body-lg)",
        fontWeight: "var(--font-weight-regular)",
      },
      icon: { width: 16, height: 16 },
    },
  },
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

/** Link */
export const Link = ({
  href,
  target,
  size = LINK_SIZES.lg,
  isDisabled = false,
  disabled,
  iconLeading,
  iconTrailing,
  onClick,
  style,
  children,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const isLinkDisabled = isDisabled || disabled;
  const sizeStyles = styles.sizes[size];

  // Compose link styles
  const linkStyle = {
    ...styles.base,
    ...sizeStyles.base,
    ...(isHovered && !isLinkDisabled && styles.hover),
    ...(isActive && !isLinkDisabled && styles.active),
    ...(isLinkDisabled && styles.disabled),
    ...style,
  };

  // Icon styles
  const iconStyle = {
    ...styles.icon,
    ...sizeStyles.icon,
  };

  const handleClick = (e) => {
    if (isLinkDisabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <a
      href={isLinkDisabled ? undefined : href}
      target={target}
      style={linkStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      aria-disabled={isLinkDisabled || undefined}
      {...props}
    >
      {iconLeading && <span style={iconStyle}>{iconLeading}</span>}
      {children}
      {iconTrailing && <span style={iconStyle}>{iconTrailing}</span>}
    </a>
  );
};

Link.displayName = "Link";
Link.sizes = LINK_SIZES;

export default Link;
