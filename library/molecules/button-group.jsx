/**
 * ButtonGroup Component (Molecule)
 *
 * A horizontal group of connected buttons using ButtonBadge atoms.
 * Supports single selection with active state management.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <ButtonGroup value={view} onChange={setView}>
 *   <ButtonGroupItem value="list" iconName="QueueList">List</ButtonGroupItem>
 *   <ButtonGroupItem value="grid" iconName="Squares2x2">Grid</ButtonGroupItem>
 * </ButtonGroup>
 */

import React, { Children, cloneElement, isValidElement } from "react";
import { ButtonBadge } from "../atoms/button-badge.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const BUTTON_GROUP_SIZES = {
  md: "md",
  lg: "lg",
};

export const BUTTON_GROUP_ORIENTATIONS = {
  horizontal: "horizontal",
  vertical: "vertical",
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  group: {
    display: "inline-flex",
    alignItems: "center",
  },

  groupVertical: {
    flexDirection: "column",
  },

  item: {
    borderRadius: 0,
    border: "1px solid var(--color-action-outline-secondary-enabled)",
    borderLeft: "none",
    outline: "none",
    boxShadow: "none",
  },

  itemFirst: {
    borderRadius: "var(--radius-md) 0 0 var(--radius-md)",
    borderLeft: "1px solid var(--color-action-outline-secondary-enabled)",
  },

  itemLast: {
    borderRadius: "0 var(--radius-md) var(--radius-md) 0",
  },

  itemOnly: {
    borderRadius: "var(--radius-md)",
    borderLeft: "1px solid var(--color-action-outline-secondary-enabled)",
  },

  itemActive: {
    borderColor: "var(--color-action-fill-primary-enabled)",
    zIndex: 10,
    position: "relative",
  },

  // Vertical styles
  itemVerticalFirst: {
    borderRadius: "var(--radius-md) var(--radius-md) 0 0",
    borderLeft: "1px solid var(--color-action-outline-secondary-enabled)",
    borderTop: "1px solid var(--color-action-outline-secondary-enabled)",
    borderBottom: "none",
  },

  itemVerticalLast: {
    borderRadius: "0 0 var(--radius-md) var(--radius-md)",
    borderLeft: "1px solid var(--color-action-outline-secondary-enabled)",
    borderTop: "none",
    borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
  },

  itemVerticalMiddle: {
    borderRadius: 0,
    borderLeft: "1px solid var(--color-action-outline-secondary-enabled)",
    borderTop: "none",
    borderBottom: "none",
  },
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
 * @param {object} style - Additional inline styles
 * @param {ReactNode} children - Button label
 */
export const ButtonGroupItem = ({
  value,
  size = BUTTON_GROUP_SIZES.md,
  active = false,
  isDisabled = false,
  disabled,
  icon,
  iconName,
  iconRight,
  iconRightName,
  onPress,
  onClick,
  style,
  _position, // Internal: first, middle, last, only
  _orientation, // Internal: horizontal, vertical
  children,
  ...props
}) => {
  const isButtonDisabled = isDisabled || disabled;
  const isHorizontal = _orientation !== "vertical";

  // Compose position styles
  let positionStyle = {};
  if (isHorizontal) {
    if (_position === "first") positionStyle = styles.itemFirst;
    else if (_position === "last") positionStyle = styles.itemLast;
    else if (_position === "only") positionStyle = styles.itemOnly;
  } else {
    if (_position === "first") positionStyle = styles.itemVerticalFirst;
    else if (_position === "last") positionStyle = styles.itemVerticalLast;
    else if (_position === "middle") positionStyle = styles.itemVerticalMiddle;
    else if (_position === "only") positionStyle = styles.itemOnly;
  }

  const itemStyle = {
    ...styles.item,
    ...positionStyle,
    ...(active && styles.itemActive),
    ...style,
  };

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
      style={itemStyle}
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
 * @param {object} style - Additional inline styles
 * @param {ReactNode} children - ButtonGroupItem or ButtonBadge components
 */
export const ButtonGroup = ({
  size = BUTTON_GROUP_SIZES.md,
  orientation = BUTTON_GROUP_ORIENTATIONS.horizontal,
  value,
  onChange,
  style,
  children,
  ...props
}) => {
  const handleClick = (itemValue) => {
    if (onChange && itemValue !== value) {
      onChange(itemValue);
    }
  };

  const isHorizontal = orientation === "horizontal";

  const groupStyle = {
    ...styles.group,
    ...(!isHorizontal && styles.groupVertical),
    ...style,
  };

  const childArray = Children.toArray(children).filter(isValidElement);
  const childCount = childArray.length;

  const renderChildren = () => {
    return childArray.map((child, index) => {
      const itemValue = child.props.value;
      const isActive = itemValue === value;

      // Determine position
      let position = "middle";
      if (childCount === 1) position = "only";
      else if (index === 0) position = "first";
      else if (index === childCount - 1) position = "last";

      return cloneElement(child, {
        size: child.props.size || size,
        state: isActive ? "active" : child.props.state || "enabled",
        active: isActive,
        onPress: () => handleClick(itemValue),
        "aria-pressed": isActive,
        _position: position,
        _orientation: orientation,
      });
    });
  };

  return (
    <div style={groupStyle} role="group" {...props}>
      {renderChildren()}
    </div>
  );
};

ButtonGroup.displayName = "ButtonGroup";
ButtonGroup.sizes = BUTTON_GROUP_SIZES;
ButtonGroup.orientations = BUTTON_GROUP_ORIENTATIONS;

export default ButtonGroup;
