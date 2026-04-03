/**
 * SideMenuItem Component
 *
 * A navigation menu item with icon, label, and optional badge.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <SideMenuItem label="Home" iconName="Home" state="active" />
 * <SideMenuItem label="Dashboard" iconName="ChartBar" />
 * <SideMenuItem label="Notifications" iconName="Bell" showBadge badgeLabel="5" />
 */

import { useState } from "react";
import { Icon } from "../../atoms/icon.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const SIDE_MENU_ITEM_STATES = {
  enabled: "enabled",
  hover: "hover",
  active: "active",
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  base: {
    display: "inline-flex",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 32,
    paddingRight: 8,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontFamily: "var(--font-family-primary)",
    fontWeight: 400,
    fontSize: 12,
    lineHeight: "16px",
    textAlign: "left",
    boxSizing: "border-box",
    transition: "all var(--transition-fast)",
    outline: "none",
    textDecoration: "none",
  },

  // Collapsed state (icon only)
  collapsed: {
    paddingLeft: 32,
    paddingRight: 8,
  },

  // State-specific styles
  states: {
    enabled: {
      item: {
        background: "transparent",
      },
      icon: {
        color: "var(--color-content-secondary)",
      },
      label: {
        color: "var(--color-content-secondary)",
      },
    },
    hover: {
      item: {
        background: "var(--color-general-neutral-lighter)",
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      },
      icon: {
        color: "var(--color-content-secondary)",
      },
      label: {
        color: "var(--color-general-neutral-dark)",
      },
    },
    active: {
      item: {
        background: "var(--color-general-informative)",
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderLeft: "2px solid var(--color-action-fill-primary-enabled)",
        paddingLeft: 30, // 32 - 2 for border
      },
      icon: {
        color: "var(--color-action-fill-primary-enabled)",
      },
      label: {
        color: "var(--color-content-primary)",
      },
    },
  },

  // Content wrapper
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
  },

  // Icon styles
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 16,
    height: 16,
    position: "relative",
    overflow: "hidden",
  },

  // Label styles
  label: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  },

  // Badge styles (inline, not using Badge atom for exact Figma match)
  badge: {
    base: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 4,
      paddingLeft: 4,
      paddingRight: 4,
      borderRadius: 4,
      fontFamily: "var(--font-family-primary)",
      fontSize: 9,
      fontWeight: 400,
      lineHeight: "12px",
      wordWrap: "break-word",
    },
    enabled: {
      background: "var(--color-general-neutral-lighter)",
      outline: "1px solid var(--color-action-outline-secondary-enabled)",
      outlineOffset: "-1px",
      color: "var(--color-content-secondary)",
    },
    active: {
      background: "var(--color-action-fill-primary-enabled)",
      color: "var(--color-general-white)",
    },
  },

  // Custom icon element (colored square for initiatives)
  customIcon: {
    width: 16,
    height: 16,
    borderRadius: 4,
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },

  customIconLabel: {
    alignSelf: "stretch",
    textAlign: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    color: "var(--color-general-white)",
    fontSize: 8,
    fontFamily: "var(--font-family-primary)",
    fontWeight: 700,
    textTransform: "uppercase",
    lineHeight: "12px",
    wordWrap: "break-word",
  },
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

/**
 * SideMenuItem
 *
 * @param {string} state - enabled | hover | active (default: enabled)
 * @param {boolean} showIcon - Show icon (default: true)
 * @param {boolean} showLabel - Show label (default: true)
 * @param {boolean} showBadge - Show badge (default: false)
 * @param {ReactNode} icon - Custom icon element
 * @param {string} iconName - Icon name for heroicons
 * @param {string} iconVariant - Icon variant: "outline" | "solid" (default: based on state)
 * @param {string} iconColor - Custom icon background color (for initiative items)
 * @param {string} iconLetter - Single letter to display in custom colored icon
 * @param {string} label - Menu item label text
 * @param {string} badgeLabel - Badge label text
 * @param {function} onClick - Click handler
 * @param {object} style - Additional inline styles
 */
export const SideMenuItem = ({
  state = SIDE_MENU_ITEM_STATES.enabled,
  showIcon = true,
  showLabel = true,
  showBadge = false,
  icon,
  iconName,
  iconVariant,
  iconColor,
  iconLetter,
  label,
  badgeLabel,
  onClick,
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine effective state
  const effectiveState = isHovered && state !== "active" ? "hover" : state;
  const stateStyles = styles.states[effectiveState];

  // Icon variant based on state (solid for active, outline for others)
  const effectiveIconVariant = iconVariant || (state === "active" ? "solid" : "outline");

  // Compose item styles
  const itemStyle = {
    ...styles.base,
    ...(!showLabel && styles.collapsed),
    ...stateStyles.item,
    ...style,
  };

  // Icon styles with state color
  const iconStyle = {
    ...styles.icon,
    color: stateStyles.icon.color,
  };

  // Label styles with state color
  const labelStyle = {
    ...styles.label,
    color: stateStyles.label.color,
  };

  // Badge styles based on state
  const badgeStyle = {
    ...styles.badge.base,
    ...(state === "active" ? styles.badge.active : styles.badge.enabled),
  };

  // Render custom colored icon (for initiatives)
  const renderCustomIcon = () => {
    if (!iconColor || !iconLetter) return null;

    return (
      <div style={{ ...styles.customIcon, background: iconColor }}>
        <div style={styles.customIconLabel}>{iconLetter}</div>
      </div>
    );
  };

  // Render icon
  const renderIcon = () => {
    if (!showIcon) return null;

    // Custom colored icon (initiatives)
    if (iconColor && iconLetter) {
      return renderCustomIcon();
    }

    // Custom icon element
    if (icon) {
      return <span style={iconStyle}>{icon}</span>;
    }

    // Heroicons icon
    if (iconName) {
      return (
        <span style={iconStyle}>
          <Icon
            name={iconName}
            variant={effectiveIconVariant}
            size="sm"
            style={{ color: "inherit", width: 16, height: 16 }}
          />
        </span>
      );
    }

    return null;
  };

  // Render badge
  const renderBadge = () => {
    if (!showBadge || !badgeLabel) return null;

    return (
      <div style={badgeStyle}>
        <div>{badgeLabel}</div>
      </div>
    );
  };

  return (
    <button
      type="button"
      style={itemStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span style={styles.content}>
        {renderIcon()}
        {showLabel && <span style={labelStyle}>{label}</span>}
        {renderBadge()}
      </span>
    </button>
  );
};

SideMenuItem.displayName = "SideMenuItem";
SideMenuItem.states = SIDE_MENU_ITEM_STATES;

export default SideMenuItem;
