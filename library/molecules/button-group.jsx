/**
 * ButtonGroup Component (Molecule)
 *
 * A horizontal group of connected buttons using ButtonBadge atoms.
 * Supports single selection with active state management.
 * Uses Tailwind CSS with design tokens.
 */

import React, { Children, cloneElement, isValidElement } from "react";
import { cx } from "../utils/cx.js";
import { ButtonBadge } from "../atoms/button-badge.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

/** Button group sizes */
export const BUTTON_GROUP_SIZES = {
  md: "md",
  lg: "lg",
};

/** Button group orientations */
export const BUTTON_GROUP_ORIENTATIONS = {
  horizontal: "horizontal",
  vertical: "vertical",
};

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  group: "inline-flex items-center",
  groupVertical: "flex-col",

  // Horizontal button styling
  horizontalFirst: "[&>*:first-child]:rounded-l-md [&>*:first-child]:rounded-r-none [&>*:first-child]:border-l",
  horizontalLast: "[&>*:last-child]:rounded-r-md [&>*:last-child]:rounded-l-none",
  horizontalMiddle: "[&>*:not(:first-child):not(:last-child)]:rounded-none",

  // Vertical button styling
  verticalFirst: "[&>*:first-child]:rounded-t-md [&>*:first-child]:rounded-b-none [&>*:first-child]:border-b-0",
  verticalLast: "[&>*:last-child]:rounded-b-md [&>*:last-child]:rounded-t-none",
  verticalMiddle: "[&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:not(:first-child):not(:last-child)]:border-b-0",
};

// ─────────────────────────────────────────────
// BUTTON GROUP ITEM COMPONENT
// ─────────────────────────────────────────────

/**
 * ButtonGroupItem
 *
 * A wrapper that uses ButtonBadge internally for consistent styling.
 * Use this within ButtonGroup for items without badges.
 *
 * @param {string|number} value - Value for this item (required for selection)
 * @param {string} size - md | lg (inherited from ButtonGroup)
 * @param {boolean} active - Whether this item is active (managed by ButtonGroup)
 * @param {boolean} isDisabled - Disables the button
 * @param {ReactNode} icon - Icon element to display
 * @param {string} iconName - Icon name to use with Icon component
 * @param {ReactNode} iconRight - Icon element on the right
 * @param {string} iconRightName - Right icon name
 * @param {function} onPress - Press handler (managed by ButtonGroup)
 * @param {string} className - Additional CSS classes
 * @param {ReactNode} children - Button label
 *
 * @example
 * <ButtonGroupItem value="list" iconName="QueueList">List</ButtonGroupItem>
 * <ButtonGroupItem value="grid" iconName="Squares2x2">Grid</ButtonGroupItem>
 */
export const ButtonGroupItem = ({
  value,
  size = BUTTON_GROUP_SIZES.md,
  active = false,
  isDisabled = false,
  disabled, // Support legacy prop
  icon,
  iconName,
  iconRight,
  iconRightName,
  onPress,
  onClick, // Support legacy prop
  className,
  children,
  ...props
}) => {
  const isButtonDisabled = isDisabled || disabled;

  return (
    <ButtonBadge
      size={size}
      state={active ? "active" : "enabled"}
      isDisabled={isButtonDisabled}
      icon={icon}
      iconName={iconName}
      iconRight={iconRight}
      iconRightName={iconRightName}
      onPress={onPress || onClick}
      className={cx(
        "rounded-none border border-outline-neutral border-l-0 outline-none shadow-none",
        active && "border-primary-600 z-10 relative",
        className
      )}
      {...props}
    >
      {children}
    </ButtonBadge>
  );
};

ButtonGroupItem.displayName = "ButtonGroupItem";

// ─────────────────────────────────────────────
// BUTTON GROUP COMPONENT
// ─────────────────────────────────────────────

/**
 * ButtonGroup
 *
 * A group of connected buttons for single selection.
 *
 * @param {string} size - md | lg (default: md)
 * @param {string} orientation - horizontal | vertical (default: horizontal)
 * @param {string|number} value - Currently active value
 * @param {function} onChange - Called with new value when selection changes
 * @param {string} className - Additional CSS classes
 * @param {ReactNode} children - ButtonGroupItem or ButtonBadge components
 *
 * @example
 * // With ButtonGroupItem (simple buttons)
 * <ButtonGroup value={view} onChange={setView}>
 *   <ButtonGroupItem value="list" iconName="QueueList" />
 *   <ButtonGroupItem value="grid" iconName="Squares2x2" />
 * </ButtonGroup>
 *
 * // With ButtonBadge (buttons with badges)
 * <ButtonGroup value={filter} onChange={setFilter}>
 *   <ButtonBadge value="all" badgeLabel="10">All</ButtonBadge>
 *   <ButtonBadge value="active" badgeLabel="5">Active</ButtonBadge>
 *   <ButtonBadge value="done" badgeLabel="5">Done</ButtonBadge>
 * </ButtonGroup>
 *
 * // Vertical orientation
 * <ButtonGroup orientation="vertical" value={selected} onChange={setSelected}>
 *   <ButtonGroupItem value="option1">Option 1</ButtonGroupItem>
 *   <ButtonGroupItem value="option2">Option 2</ButtonGroupItem>
 * </ButtonGroup>
 */
export const ButtonGroup = ({
  size = BUTTON_GROUP_SIZES.md,
  orientation = BUTTON_GROUP_ORIENTATIONS.horizontal,
  value,
  onChange,
  className,
  children,
  ...props
}) => {
  const handleClick = (itemValue) => {
    if (onChange && itemValue !== value) {
      onChange(itemValue);
    }
  };

  const isHorizontal = orientation === "horizontal";

  const classes = cx(
    styles.group,
    !isHorizontal && styles.groupVertical,
    isHorizontal && styles.horizontalFirst,
    isHorizontal && styles.horizontalLast,
    isHorizontal && styles.horizontalMiddle,
    !isHorizontal && styles.verticalFirst,
    !isHorizontal && styles.verticalLast,
    !isHorizontal && styles.verticalMiddle,
    className
  );

  const renderChildren = () => {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) return null;

      const itemValue = child.props.value;
      const isActive = itemValue === value;

      // Clone with active state and click handler
      return cloneElement(child, {
        size: child.props.size || size,
        state: isActive ? "active" : child.props.state || "enabled",
        active: isActive,
        onPress: () => handleClick(itemValue),
        "aria-pressed": isActive,
      });
    });
  };

  return (
    <div className={classes} role="group" {...props}>
      {renderChildren()}
    </div>
  );
};

ButtonGroup.displayName = "ButtonGroup";
ButtonGroup.sizes = BUTTON_GROUP_SIZES;
ButtonGroup.orientations = BUTTON_GROUP_ORIENTATIONS;

export default ButtonGroup;
