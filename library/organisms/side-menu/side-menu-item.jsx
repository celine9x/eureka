"use client";

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
import { Badge } from "../../atoms/badge.jsx";
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
    gap: "var(--spacing-2)",
    paddingTop: "var(--spacing-2)",
    paddingBottom: "var(--spacing-2)",
    paddingLeft: "var(--spacing-8)",
    paddingRight: "var(--spacing-2)",
    borderTop: "none",
    borderRight: "none",
    borderBottom: "none",
    borderLeft: "none",
    background: "transparent",
    cursor: "pointer",
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-regular)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    textAlign: "left",
    boxSizing: "border-box",
    transition: "all var(--transition-fast)",
    outline: "none",
    textDecoration: "none",
  },

  // Collapsed state (icon only)
  collapsed: {
    paddingLeft: "var(--spacing-8)",
    paddingRight: "var(--spacing-2)",
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
        borderTopRightRadius: "var(--radius-sm)",
        borderBottomRightRadius: "var(--radius-sm)",
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
        borderTopRightRadius: "var(--radius-sm)",
        borderBottomRightRadius: "var(--radius-sm)",
        borderLeft: "2px solid var(--color-action-fill-primary-enabled)",
        paddingLeft: "calc(var(--spacing-8) - var(--spacing-xxs))",
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
    gap: "var(--spacing-2)",
  },

  // Icon styles
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: "var(--size-icon-sm)",
    height: "var(--size-icon-sm)",
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

  // Custom icon element (colored square for initiatives)
  customIcon: {
    width: "var(--size-icon-sm)",
    height: "var(--size-icon-sm)",
    borderRadius: "var(--radius-xs)",
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
    fontSize: "var(--text-body-caption)",
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-bold)",
    textTransform: "uppercase",
    lineHeight: "var(--line-height-body-caption)",
    wordWrap: "break-word",
  },
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

/**
 * SideMenuItem
 *
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

  // Force filled icon for active items; otherwise allow override or fallback to outline.
  const effectiveIconVariant =
    effectiveState === SIDE_MENU_ITEM_STATES.active ? "fill" : iconVariant || "outline";

  // Compose item styles
  const itemStyle = {
    ...styles.base,
    ...(!showLabel && styles.collapsed),
    ...stateStyles.item,
    ...style,
  };

  // Icon styles with state color
  const isInactiveFilledIcon =
    effectiveState !== SIDE_MENU_ITEM_STATES.active && effectiveIconVariant === "fill";

  const iconStyle = {
    ...styles.icon,
    color: isInactiveFilledIcon
      ? "var(--color-action-fill-primary-enabled)"
      : stateStyles.icon.color,
  };

  // Label styles with state color
  const labelStyle = {
    ...styles.label,
    color: stateStyles.label.color,
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
      <Badge
        size="xs"
        shape="rounded"
        color={state === "active" ? "brand" : "neutral"}
      >
        {badgeLabel}
      </Badge>
    );
  };

  return (
    <button
      type="button"
      style={itemStyle}
      aria-current={state === SIDE_MENU_ITEM_STATES.active ? "page" : undefined}
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
