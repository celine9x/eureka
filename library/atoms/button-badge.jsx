/**
 * ButtonBadge Component
 *
 * A button element with an optional icon, label, and integrated Badge component.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <ButtonBadge badgeLabel="5">Notifications</ButtonBadge>
 * <ButtonBadge variant="without-badge">No Badge</ButtonBadge>
 * <ButtonBadge size="lg" iconName="Bell" badgeLabel="New">Updates</ButtonBadge>
 */

import { useState } from "react";
import { Icon } from "./icon.jsx";
import { Badge } from "./badge.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const BUTTON_BADGE_SIZES = {
  md: "md",
  lg: "lg",
};

export const BUTTON_BADGE_STATES = {
  enabled: "enabled",
  active: "active",
  disabled: "disabled",
};

/** State to badge color mapping */
const STATE_TO_BADGE_COLOR = {
  enabled: "neutral",
  active: "brand",
  disabled: "disabled",
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    border: "none",
    borderRadius: "var(--radius-md)",
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-regular)",
    whiteSpace: "nowrap",
    cursor: "pointer",
    userSelect: "none",
    boxSizing: "border-box",
    transition: "all var(--transition-fast)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
  },

  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  label: {
    flexShrink: 0,
  },

  sizes: {
    lg: {
      base: {
        padding: 8,
        fontSize: "var(--text-body-lg)",
        lineHeight: "var(--line-height-body-lg)",
      },
      icon: { width: 16, height: 16 },
    },
    md: {
      base: {
        padding: "4px 8px",
        fontSize: "var(--text-body-md)",
        lineHeight: "var(--line-height-body-md)",
        minHeight: 32,
      },
      icon: { width: 14, height: 14 },
    },
  },

  states: {
    enabled: {
      background: "var(--color-general-white)",
      color: "var(--color-content-secondary)",
      boxShadow: "var(--shadow-light-down)",
    },
    enabledHover: {
      background: "var(--color-general-neutral-lighter)",
      color: "var(--color-general-neutral-dark)",
      boxShadow: "var(--shadow-medium-down)",
    },
    active: {
      background: "var(--color-general-informative)",
      color: "var(--color-content-primary)",
      outlineColor: "var(--color-action-fill-primary-enabled)",
      boxShadow: "var(--shadow-focus)",
    },
    disabled: {
      background: "var(--color-general-neutral-light)",
      color: "var(--color-content-tertiary)",
      boxShadow: "none",
      cursor: "not-allowed",
    },
  },
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

/** ButtonBadge */
export const ButtonBadge = ({
  variant = "with-badge",
  size = BUTTON_BADGE_SIZES.md,
  state = BUTTON_BADGE_STATES.enabled,
  isDisabled = false,
  disabled,
  icon,
  iconName,
  iconRight,
  iconRightName,
  badgeLabel,
  badgeIcon,
  badgeIconName,
  badgeColor,
  onClick,
  style,
  children,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const isButtonDisabled = isDisabled || disabled;
  const effectiveState = isButtonDisabled ? BUTTON_BADGE_STATES.disabled : state;
  const effectiveBadgeColor = badgeColor || STATE_TO_BADGE_COLOR[effectiveState];
  const badgeSize = size === "lg" ? "md" : "sm";

  const sizeStyles = styles.sizes[size];

  // Compose button styles
  const buttonStyle = {
    ...styles.base,
    ...sizeStyles.base,
    ...styles.states[effectiveState],
    ...(isHovered && effectiveState === "enabled" && styles.states.enabledHover),
    ...style,
  };

  // Icon styles
  const iconStyle = {
    ...styles.icon,
    ...sizeStyles.icon,
  };

  const iconSize = size === "lg" ? "md" : "sm";

  const renderIcon = () => {
    if (icon) {
      return <span style={iconStyle}>{icon}</span>;
    }
    if (iconName) {
      return (
        <span style={iconStyle}>
          <Icon name={iconName} size={iconSize} />
        </span>
      );
    }
    return null;
  };

  const renderIconRight = () => {
    if (iconRight) {
      return <span style={iconStyle}>{iconRight}</span>;
    }
    if (iconRightName) {
      return (
        <span style={iconStyle}>
          <Icon name={iconRightName} size={iconSize} />
        </span>
      );
    }
    return null;
  };

  const renderBadge = () => {
    if (variant === "without-badge") return null;
    if (!badgeLabel && !badgeIcon && !badgeIconName) return null;

    return (
      <Badge color={effectiveBadgeColor} size={badgeSize}>
        {badgeLabel}
      </Badge>
    );
  };

  return (
    <button
      type="button"
      style={buttonStyle}
      disabled={isButtonDisabled}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {renderIcon()}
      {children && <span style={styles.label}>{children}</span>}
      {renderIconRight()}
      {renderBadge()}
    </button>
  );
};

ButtonBadge.displayName = "ButtonBadge";
ButtonBadge.sizes = BUTTON_BADGE_SIZES;
ButtonBadge.states = BUTTON_BADGE_STATES;

export default ButtonBadge;
