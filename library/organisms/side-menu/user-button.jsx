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
    padding: 8,
    background: "var(--color-general-white)",
    boxShadow: "0px 0px 1px rgba(83, 113, 172, 0.08), 0px 1px 2px rgba(83, 113, 172, 0.08)",
    borderRadius: 8,
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    display: "inline-flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-family-primary)",
    boxSizing: "border-box",
    transition: "all var(--transition-fast)",
  },

  hover: {
    outlineColor: "var(--color-action-outline-secondary-hover)",
    boxShadow: "0px 0px 2px rgba(83, 113, 172, 0.12), 0px 2px 4px rgba(83, 113, 172, 0.12)",
  },

  focus: {
    outlineColor: "var(--color-action-fill-primary-enabled)",
    boxShadow: "var(--shadow-focus)",
  },

  collapsed: {
    justifyContent: "center",
    padding: 8,
  },

  // Content wrapper
  content: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
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
    borderRadius: 100,
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
    fontSize: 12,
    fontFamily: "var(--font-family-primary)",
    fontWeight: 400,
    lineHeight: "16px",
    wordWrap: "break-word",
  },

  email: {
    alignSelf: "stretch",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    color: "var(--color-content-tertiary)",
    fontSize: 9,
    fontFamily: "var(--font-family-primary)",
    fontWeight: 400,
    lineHeight: "12px",
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
 * @param {string} state - default | hover | focus | active (default: default)
 * @param {string} name - User's display name
 * @param {string} email - User's email address
 * @param {string} avatarSrc - Avatar image URL
 * @param {string} avatarInitials - Avatar initials (fallback if no src)
 * @param {boolean} showEmail - Show email address (default: true)
 * @param {boolean} showChevron - Show chevron icon (default: true)
 * @param {boolean} collapsed - Collapsed mode showing only avatar (default: false)
 * @param {function} onClick - Click handler
 * @param {object} style - Additional inline styles
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
  const avatarSize = collapsed ? "lg" : "xl";

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
        <div style={{ ...styles.avatarWrapper, width: collapsed ? 32 : 32, height: collapsed ? 32 : 32 }}>
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt={name}
              style={styles.avatar}
            />
          ) : (
            <Avatar
              size={avatarSize}
              initials={avatarInitials}
              name={name}
              alt={name}
            />
          )}
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
