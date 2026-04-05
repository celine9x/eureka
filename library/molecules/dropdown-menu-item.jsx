"use client";

/**
 * DropdownMenuItem Component
 *
 * A menu item for dropdown menus with optional icon, badge, and various states.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <DropdownMenuItem label="Edit" iconName="PencilSquare" />
 * <DropdownMenuItem label="Delete" variant="destructive" iconName="Trash" />
 * <DropdownMenuItem label="Settings" badge="New" active />
 */

import { useState } from "react";
import { Icon } from "../atoms/icon.jsx";
import { Badge } from "../atoms/badge.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const DROPDOWN_MENU_ITEM_VARIANTS = {
  default: "default",
  destructive: "destructive",
};

export const DROPDOWN_MENU_ITEM_SIZES = {
  sm: "sm",
  md: "md",
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
    width: "100%",
    padding: "var(--spacing-sm)",
    background: "transparent",
    border: "none",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-regular)",
    boxSizing: "border-box",
    transition: "all var(--transition-fast)",
    outline: "none",
    textDecoration: "none",
  },

  sizes: {
    sm: {
      padding: "var(--spacing-1-5)",
      gap: "var(--spacing-1-5)",
    },
    md: {
      padding: "var(--spacing-sm)",
      gap: "var(--spacing-sm)",
    },
  },

  variants: {
    default: {
      enabled: {
        item: {
          color: "var(--color-content-secondary)",
        },
        icon: {
          color: "var(--color-content-secondary)",
        },
      },
      hover: {
        item: {
          background: "var(--color-general-neutral-light)",
          color: "var(--color-content-primary)",
        },
        icon: {
          color: "var(--color-content-primary)",
        },
      },
      active: {
        item: {
          background: "var(--color-general-informative)",
          color: "var(--color-content-primary)",
        },
        icon: {
          color: "var(--color-action-fill-primary-enabled)",
        },
      },
      disabled: {
        item: {
          color: "var(--color-content-tertiary)",
          cursor: "not-allowed",
          pointerEvents: "none",
        },
        icon: {
          color: "var(--color-content-tertiary)",
        },
      },
    },
    destructive: {
      enabled: {
        item: {
          color: "var(--color-content-negative)",
        },
        icon: {
          color: "var(--color-content-negative)",
        },
      },
      hover: {
        item: {
          background: "var(--color-general-negative)",
          color: "var(--color-action-fill-negative-hover)",
        },
        icon: {
          color: "var(--color-action-fill-negative-hover)",
        },
      },
      active: {
        item: {
          background: "var(--color-general-negative)",
          color: "var(--color-action-fill-negative-hover)",
        },
        icon: {
          color: "var(--color-action-fill-negative-hover)",
        },
      },
      disabled: {
        item: {
          color: "var(--color-content-tertiary)",
          cursor: "not-allowed",
          pointerEvents: "none",
        },
        icon: {
          color: "var(--color-content-tertiary)",
        },
      },
    },
  },

  content: {
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    minWidth: 0,
  },

  icon: {
    flexShrink: 0,
    width: 16,
    height: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minWidth: 0,
  },

  labelRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
  },

  label: {
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    fontWeight: "var(--font-weight-regular)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  description: {
    fontSize: "var(--text-body-caption)",
    lineHeight: "var(--line-height-body-caption)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-tertiary)",
  },

  shortcut: {
    flexShrink: 0,
    fontSize: "var(--text-body-caption)",
    lineHeight: "var(--line-height-body-caption)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-tertiary)",
  },

  trailingIcon: {
    flexShrink: 0,
    width: 16,
    height: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-tertiary)",
  },

  divider: {
    height: 1,
    background: "var(--color-action-outline-secondary-enabled)",
    margin: "8px 0",
  },

  sectionLabel: {
    padding: "8px 8px 4px",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-caption)",
    fontWeight: "var(--font-weight-semibold)",
    lineHeight: "var(--line-height-body-caption)",
    color: "var(--color-content-tertiary)",
    textTransform: "uppercase",
    letterSpacing: "0.02em",
  },
};

// ─────────────────────────────────────────────
// DROPDOWN MENU ITEM COMPONENT
// ─────────────────────────────────────────────

/**
 * DropdownMenuItem
 *
 */
export const DropdownMenuItem = ({
  label,
  icon,
  iconName,
  badge,
  description,
  shortcut,
  trailingIcon,
  trailingIconName,
  variant = DROPDOWN_MENU_ITEM_VARIANTS.default,
  size = DROPDOWN_MENU_ITEM_SIZES.md,
  active = false,
  isDisabled = false,
  disabled,
  onClick,
  href,
  style,
  children,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isItemDisabled = isDisabled || disabled;

  // Get variant styles based on state
  const variantStyles = styles.variants[variant];
  const getStateStyles = () => {
    if (isItemDisabled) return variantStyles.disabled;
    if (active) return variantStyles.active;
    if (isHovered) return variantStyles.hover;
    return variantStyles.enabled;
  };

  const stateStyles = getStateStyles();
  const sizeStyles = styles.sizes[size];

  // Compose item styles
  const itemStyle = {
    ...styles.base,
    ...sizeStyles,
    ...stateStyles.item,
    ...style,
  };

  // Icon styles
  const iconStyle = {
    ...styles.icon,
    ...stateStyles.icon,
  };

  // Render icon element
  const renderIcon = () => {
    if (icon) {
      return <span style={iconStyle}>{icon}</span>;
    }
    if (iconName) {
      return (
        <span style={iconStyle}>
          <Icon name={iconName} size={16} style={{ color: "inherit" }} />
        </span>
      );
    }
    return null;
  };

  // Render trailing icon
  const renderTrailingIcon = () => {
    if (trailingIcon) {
      return <span style={styles.trailingIcon}>{trailingIcon}</span>;
    }
    if (trailingIconName) {
      return (
        <span style={styles.trailingIcon}>
          <Icon name={trailingIconName} size={16} style={{ color: "inherit" }} />
        </span>
      );
    }
    return null;
  };

  // Render badge using Badge component
  const renderBadge = () => {
    if (!badge) return null;

    const badgeColor = active ? "brand" : "neutral";
    return (
      <Badge color={badgeColor} size="xs">
        {badge}
      </Badge>
    );
  };

  // Content layout
  const content = (
    <div style={styles.content}>
      {renderIcon()}

      <div style={styles.text}>
        <div style={styles.labelRow}>
          <span style={styles.label}>{label || children}</span>
          {renderBadge()}
        </div>
        {description && <span style={styles.description}>{description}</span>}
      </div>

      {shortcut && <span style={styles.shortcut}>{shortcut}</span>}
      {renderTrailingIcon()}
    </div>
  );

  // Event handlers
  const handleMouseEnter = () => !isItemDisabled && setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleFocus = () => !isItemDisabled && setIsHovered(true);
  const handleBlur = () => setIsHovered(false);

  // Common props
  const commonProps = {
    style: itemStyle,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onClick: isItemDisabled ? undefined : onClick,
    "aria-disabled": isItemDisabled || undefined,
    role: "menuitem",
    ...props,
  };

  // Render as anchor if href provided
  if (href && !isItemDisabled) {
    return (
      <a href={href} {...commonProps}>
        {content}
      </a>
    );
  }

  // Render as button
  return (
    <button type="button" disabled={isItemDisabled} {...commonProps}>
      {content}
    </button>
  );
};

DropdownMenuItem.displayName = "DropdownMenuItem";
DropdownMenuItem.variants = DROPDOWN_MENU_ITEM_VARIANTS;
DropdownMenuItem.sizes = DROPDOWN_MENU_ITEM_SIZES;

// ─────────────────────────────────────────────
// DROPDOWN MENU DIVIDER
// ─────────────────────────────────────────────

/**
 * DropdownMenuDivider
 *
 * A horizontal divider line between menu items.
 *
 */
export const DropdownMenuDivider = ({ style, ...props }) => {
  const dividerStyle = {
    ...styles.divider,
    ...style,
  };

  return <div style={dividerStyle} role="separator" {...props} />;
};

DropdownMenuDivider.displayName = "DropdownMenuDivider";

// ─────────────────────────────────────────────
// DROPDOWN MENU LABEL (Section header)
// ─────────────────────────────────────────────

/**
 * DropdownMenuLabel
 *
 * A section label/header for grouping menu items.
 *
 */
export const DropdownMenuLabel = ({ children, style, ...props }) => {
  const labelStyle = {
    ...styles.sectionLabel,
    ...style,
  };

  return (
    <div style={labelStyle} {...props}>
      {children}
    </div>
  );
};

DropdownMenuLabel.displayName = "DropdownMenuLabel";

export default DropdownMenuItem;
