/**
 * AvatarGroup Component (Molecule)
 *
 * A stacked group of avatars with overflow indicator.
 * Uses Tailwind CSS with design tokens.
 */

import React from "react";
import { cx } from "../utils/cx.js";
import { AVATAR_SIZES } from "../utils/props.js";
import { Avatar } from "../atoms/avatar.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

/** Re-export avatar sizes for group */
export { AVATAR_SIZES };

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  group: "inline-flex items-start justify-start [&_.avatar]:ml-[-0.25rem] [&_.avatar:first-child]:ml-0",

  overflow: [
    "inline-flex items-center justify-start gap-1",
    "bg-background-neutral-lighter rounded-full",
    "outline outline-1 -outline-offset-1 outline-outline-neutral",
    "font-primary font-normal text-content-secondary whitespace-nowrap",
  ].join(" "),

  overflowSizes: {
    xl: "p-1.5 text-body-lg",
    lg: "p-1 text-body-md",
    md: "py-0.5 px-1 text-body-md",
    sm: "px-1 text-body-caption",
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
 * @param {string} size - sm | md | lg | xl (default: md)
 * @param {array} avatars - Array of avatar objects: [{ initials?, name?, src?, alt? }]
 * @param {number} max - Maximum avatars to show before overflow (default: 4)
 * @param {boolean} showOverflow - Show overflow badge when exceeding max (default: true)
 * @param {function} onOverflowClick - Called when overflow badge is clicked
 * @param {ReactNode} children - Alternative to avatars prop (Avatar components)
 * @param {string} className - Additional CSS classes
 *
 * @example
 * // With avatars prop
 * <AvatarGroup
 *   size="lg"
 *   avatars={[
 *     { name: "John Doe" },
 *     { initials: "AB" },
 *     { src: "/avatar.jpg", alt: "Jane" },
 *     { name: "Bob Smith" },
 *     { name: "Alice Brown" },
 *   ]}
 *   max={4}
 * />
 *
 * // With children
 * <AvatarGroup size="md">
 *   <Avatar name="John Doe" />
 *   <Avatar initials="AB" />
 *   <Avatar src="/avatar.jpg" />
 * </AvatarGroup>
 */
export const AvatarGroup = ({
  size = AVATAR_SIZES.md,
  avatars = [],
  max = 4,
  showOverflow = true,
  onOverflowClick,
  className,
  children,
  ...props
}) => {
  const classes = cx(styles.group, className);
  const overflowClasses = cx(styles.overflow, styles.overflowSizes[size]);

  const renderOverflow = (count) => {
    if (!showOverflow || count <= 0) return null;

    return (
      <span
        className={overflowClasses}
        onClick={onOverflowClick}
        style={onOverflowClick ? { cursor: "pointer" } : undefined}
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
      <div className={classes} {...props}>
        {visibleChildren.map((child, index) =>
          React.cloneElement(child, {
            key: index,
            size,
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
    <div className={classes} {...props}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          size={size}
          initials={avatar.initials}
          name={avatar.name}
          src={avatar.src}
          alt={avatar.alt}
        />
      ))}
      {renderOverflow(overflowCount)}
    </div>
  );
};

AvatarGroup.displayName = "AvatarGroup";
AvatarGroup.sizes = AVATAR_SIZES;

export default AvatarGroup;
