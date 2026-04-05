/**
 * UserButton Component
 *
 * A user profile button displaying avatar, name, email, and chevron.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <UserButton name="Emma Dupont" email="emma.dupont@inpart.io" avatarSrc="/avatar.jpg" />
 * <UserButton name="John Doe" showEmail={false} />
 * <UserButton name="Jane Smith" collapsed avatarSrc="/avatar.jpg" />
 */

import { useState } from "react";
import { Avatar } from "../../atoms/avatar.jsx";
import { ChevronRightIcon } from "@heroicons/react/16/solid";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const USER_BUTTON_STATES = {
  default: "default",
  hover: "hover",
  focus: "focus",
  active: "active",
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  base: {
    alignSelf: "stretch",
    padding: "var(--spacing-2)",
    background: "var(--color-general-white)",
    boxShadow: "var(--shadow-light-down)",
    borderRadius: "var(--radius-sm)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    display: "inline-flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "var(--spacing-2)",
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-family-primary)",
    boxSizing: "border-box",
    transition: "all var(--transition-fast)",
  },

  hover: {
    outlineColor: "var(--color-action-outline-secondary-hover)",
    boxShadow: "var(--shadow-dark-down)",
  },

  focus: {
    outlineColor: "var(--color-action-fill-primary-enabled)",
    boxShadow: "var(--shadow-focus)",
  },

  collapsed: {
    justifyContent: "center",
    padding: "var(--spacing-2)",
  },

  // Content wrapper
  content: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "var(--spacing-2)",
  },

  contentCollapsed: {
    flex: "none",
    justifyContent: "center",
  },

  // Avatar wrapper
  avatarWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    display: "inline-flex",
  },

  avatar: {
    alignSelf: "stretch",
    flex: 1,
    borderRadius: "var(--radius-full)",
    border: "1px solid var(--color-general-white)",
  },

  // Info section
  info: {
    flex: 1,
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  name: {
    alignSelf: "stretch",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    color: "var(--color-content-secondary)",
    fontSize: "var(--text-body-md)",
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-md)",
    wordWrap: "break-word",
  },

  email: {
    alignSelf: "stretch",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    color: "var(--color-content-tertiary)",
    fontSize: "var(--text-body-caption)",
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-caption)",
    wordWrap: "break-word",
  },

  // Chevron
  chevron: {
    width: 16,
    height: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    color: "var(--color-content-secondary)",
    flexShrink: 0,
  },
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

/**
 * UserButton
 *
 */
export const UserButton = ({
  state = USER_BUTTON_STATES.default,
  name,
  email,
  avatarSrc,
  avatarInitials,
  showEmail = true,
  showChevron = true,
  collapsed = false,
  onClick,
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Determine effective state
  const getEffectiveState = () => {
    if (state === "active") return "active";
    if (isFocused) return "focus";
    if (isHovered) return "hover";
    return state;
  };

  const effectiveState = getEffectiveState();

  // Compose button styles
  const buttonStyle = {
    ...styles.base,
    ...(collapsed && styles.collapsed),
    ...(effectiveState === "hover" && styles.hover),
    ...(effectiveState === "focus" && styles.focus),
    ...(effectiveState === "active" && styles.focus),
    ...style,
  };

  // Content styles
  const contentStyle = {
    ...styles.content,
    ...(collapsed && styles.contentCollapsed),
  };

  // Avatar size based on collapsed state
  const avatarSize = "sm";

  return (
    <button
      type="button"
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    >
      <span style={contentStyle}>
        {/* Avatar */}
        <div
          style={{
            ...styles.avatarWrapper,
            width: "var(--size-avatar-sm)",
            height: "var(--size-avatar-sm)",
          }}
        >
          <Avatar
            size={avatarSize}
            src={avatarSrc}
            initials={avatarInitials}
            name={name}
            alt={name}
          />
        </div>

        {/* User Info */}
        {!collapsed && (
          <span style={styles.info}>
            <span style={styles.name}>{name}</span>
            {showEmail && email && (
              <span style={styles.email}>{email}</span>
            )}
          </span>
        )}
      </span>

      {/* Chevron */}
      {!collapsed && showChevron && (
        <span style={styles.chevron}>
          <ChevronRightIcon style={{ width: 16, height: 16 }} />
        </span>
      )}
    </button>
  );
};

UserButton.displayName = "UserButton";
UserButton.states = USER_BUTTON_STATES;

export default UserButton;
