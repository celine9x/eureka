/**
 * AvatarGroup Component (Molecule)
 *
 * A stacked group of avatars with overflow indicator.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <AvatarGroup
 *   size="lg"
 *   avatars={[
 *     { name: "John Doe" },
 *     { initials: "AB" },
 *     { src: "/avatar.jpg", alt: "Jane" },
 *   ]}
 *   max={4}
 * />
 */

import React from "react";
import { Avatar, AVATAR_SIZES } from "../atoms/avatar.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export { AVATAR_SIZES };

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  group: {
    display: "inline-flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  avatar: {
    marginLeft: -4,
  },

  avatarFirst: {
    marginLeft: 0,
  },

  overflow: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 4,
    background: "var(--color-general-neutral-lighter)",
    borderRadius: "var(--radius-full)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-secondary)",
    whiteSpace: "nowrap",
    marginLeft: -4,
  },

  overflowSizes: {
    xl: {
      padding: 6,
      fontSize: "var(--text-body-lg)",
      lineHeight: "var(--line-height-body-lg)",
    },
    lg: {
      padding: 4,
      fontSize: "var(--text-body-md)",
      lineHeight: "var(--line-height-body-md)",
    },
    md: {
      padding: "2px 4px",
      fontSize: "var(--text-body-md)",
      lineHeight: "var(--line-height-body-md)",
    },
    sm: {
      padding: "0 4px",
      fontSize: "var(--text-body-caption)",
      lineHeight: "var(--line-height-body-caption)",
    },
  },
};

// ─────────────────────────────────────────────
// AVATAR GROUP COMPONENT
// ─────────────────────────────────────────────

/**
 * AvatarGroup
 *
 * A stacked group of avatars with optional overflow indicator.
 *
 */
export const AvatarGroup = ({
  size = AVATAR_SIZES.md,
  avatars = [],
  max = 4,
  showOverflow = true,
  onOverflowClick,
  style,
  children,
  ...props
}) => {
  const groupStyle = {
    ...styles.group,
    ...style,
  };

  const renderOverflow = (count) => {
    if (!showOverflow || count <= 0) return null;

    const overflowStyle = {
      ...styles.overflow,
      ...styles.overflowSizes[size],
      ...(onOverflowClick && { cursor: "pointer" }),
    };

    return (
      <span
        style={overflowStyle}
        onClick={onOverflowClick}
        role={onOverflowClick ? "button" : undefined}
        tabIndex={onOverflowClick ? 0 : undefined}
      >
        + {count}
      </span>
    );
  };

  // If using children, render them directly
  if (children) {
    const childArray = React.Children.toArray(children);
    const visibleChildren = childArray.slice(0, max);
    const overflowCount = childArray.length - max;

    return (
      <div style={groupStyle} {...props}>
        {visibleChildren.map((child, index) =>
          React.cloneElement(child, {
            key: index,
            size,
            style: {
              ...child.props.style,
              ...(index === 0 ? styles.avatarFirst : styles.avatar),
            },
          })
        )}
        {renderOverflow(overflowCount)}
      </div>
    );
  }

  // Using avatars prop
  const visibleAvatars = avatars.slice(0, max);
  const overflowCount = avatars.length - max;

  return (
    <div style={groupStyle} {...props}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          size={size}
          initials={avatar.initials}
          name={avatar.name}
          src={avatar.src}
          alt={avatar.alt}
          style={index === 0 ? styles.avatarFirst : styles.avatar}
        />
      ))}
      {renderOverflow(overflowCount)}
    </div>
  );
};

AvatarGroup.displayName = "AvatarGroup";
AvatarGroup.sizes = AVATAR_SIZES;

export default AvatarGroup;
