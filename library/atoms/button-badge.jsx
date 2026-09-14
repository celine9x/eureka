"use client";

/**
 * ButtonBadge Component
 *
 * A button element with an optional icon, label, and integrated Badge component.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 * 
 * By default, clicking the button toggles between enabled and active states.
 * You can control the state explicitly by passing the `state` prop.
 *
 * @example
 * // Uncontrolled - toggles on click
 * <ButtonBadge badgeLabel="5">Notifications</ButtonBadge>
 * 
 * // Controlled - manage state externally
 * <ButtonBadge state="active" badgeLabel="5">Active</ButtonBadge>
 * 
 * @example
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
    outlineWidth: "1px",
    outlineStyle: "solid",
    outlineColor: "var(--color-action-outline-secondary-enabled)",
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
        padding: "var(--spacing-2)",
        fontSize: "var(--text-body-lg)",
        lineHeight: "var(--line-height-body-lg)",
      },
      icon: { width: 16, height: 16 },
    },
    md: {
      base: {
        padding: "var(--spacing-1) var(--spacing-2)",
        fontSize: "var(--text-body-md)",
        lineHeight: "var(--line-height-body-md)",
        minHeight: "var(--size-button-md)",
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
  state,
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
  const [internalActive, setInternalActive] = useState(false);

  const isButtonDisabled = isDisabled || disabled;
  // If state is explicitly provided, use it (controlled mode)
  // Otherwise, use internal state (uncontrolled mode with auto-toggle)
  const isControlled = state !== undefined;


  // Compute effective state before using it
  const effectiveState = isButtonDisabled
    ? BUTTON_BADGE_STATES.disabled
    : isControlled
      ? state
      : (internalActive ? BUTTON_BADGE_STATES.active : BUTTON_BADGE_STATES.enabled);

  const sizeStyles = styles.sizes[size];
  const effectiveBadgeColor = badgeColor || STATE_TO_BADGE_COLOR[effectiveState];
  const effectiveBadgeSize = badgeIcon || badgeIconName ? "md" : "sm";

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
    if (badgeLabel == null && !badgeIcon && !badgeIconName) return null;

    const badgeProps = {
      color: effectiveBadgeColor,
      size: effectiveBadgeSize,
    };

    if (badgeIcon) {
      badgeProps.leadingIcon = badgeIcon;
    } else if (badgeIconName) {
      badgeProps.leadingIcon = <Icon name={badgeIconName} size="sm" />;
    }

    return (
      <Badge {...badgeProps}>
        {badgeLabel}
      </Badge>
    );
  };

  const handleClick = (e) => {
    // Toggle internal state when in uncontrolled mode
    if (!isControlled && !isButtonDisabled) {
      setInternalActive(!internalActive);
    }
    
    // Call user's onClick handler if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type="button"
      style={buttonStyle}
      disabled={isButtonDisabled}
      onClick={handleClick}
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
