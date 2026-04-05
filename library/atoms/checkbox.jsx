/**
 * Checkbox Component
 *
 * A reusable checkbox with sizes and states.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <Checkbox>Option 1</Checkbox>
 * <Checkbox isSelected onChange={handleChange}>Selected</Checkbox>
 * <Checkbox size="md" isDisabled>Disabled</Checkbox>
 */

import { useState } from "react";
import { CheckIcon } from "@heroicons/react/16/solid";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const CHECKBOX_SIZES = {
  sm: "sm",
  md: "md",
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  wrapper: {
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
    fontFamily: "var(--font-family-primary)",
  },

  wrapperDisabled: {
    cursor: "not-allowed",
    color: "var(--color-content-tertiary)",
  },

  control: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--color-interaction-outline-enabled)",
    background: "var(--color-interaction-fill-enabled)",
    boxShadow: "var(--shadow-light-down)",
    transition: "all var(--transition-fast)",
    boxSizing: "border-box",
  },

  controlHover: {
    borderColor: "var(--color-interaction-outline-hover)",
  },

  controlSelected: {
    background: "var(--color-action-fill-primary-enabled)",
    borderColor: "var(--color-action-fill-primary-enabled)",
  },

  controlSelectedHover: {
    background: "var(--color-action-fill-primary-hover)",
    borderColor: "var(--color-action-fill-primary-hover)",
  },

  controlDisabled: {
    borderColor: "var(--color-interaction-outline-disabled)",
    background: "var(--color-interaction-fill-disabled)",
  },

  controlDisabledSelected: {
    background: "var(--color-action-fill-primary-disabled)",
    borderColor: "var(--color-action-fill-primary-disabled)",
  },

  checkIcon: {
    opacity: 0,
    color: "var(--color-content-inverted)",
    transition: "opacity var(--transition-fast)",
  },

  checkIconVisible: {
    opacity: 1,
  },

  checkIconDisabled: {
    color: "var(--color-action-content-primary-disabled)",
  },

  label: {
    color: "var(--color-content-primary)",
  },

  labelDisabled: {
    color: "var(--color-content-tertiary)",
  },

  sizes: {
    sm: {
      wrapper: { gap: "var(--spacing-sm)" },
      control: { width: 16, height: 16 },
      icon: { width: 10, height: 10 },
      label: {
        fontSize: "var(--text-body-lg)",
        lineHeight: "var(--line-height-body-lg)",
      },
    },
    md: {
      wrapper: { gap: "var(--spacing-3)" },
      control: { width: 20, height: 20 },
      icon: { width: 12, height: 12 },
      label: {
        fontSize: "var(--text-body-lg)",
        lineHeight: "var(--line-height-body-lg)",
      },
    },
  },
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

/** Checkbox */
export const Checkbox = ({
  size = CHECKBOX_SIZES.sm,
  isSelected,
  defaultSelected = false,
  isDisabled = false,
  disabled,
  value,
  name,
  onChange,
  style,
  children,
  ...props
}) => {
  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const [isHovered, setIsHovered] = useState(false);

  const isControlled = isSelected !== undefined;
  const selected = isControlled ? isSelected : internalSelected;
  const isCheckboxDisabled = isDisabled || disabled;

  const sizeStyles = styles.sizes[size];

  const handleClick = () => {
    if (isCheckboxDisabled) return;

    const newValue = !selected;
    if (!isControlled) {
      setInternalSelected(newValue);
    }
    onChange?.(newValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  // Compose wrapper styles
  const wrapperStyle = {
    ...styles.wrapper,
    ...sizeStyles.wrapper,
    ...(isCheckboxDisabled && styles.wrapperDisabled),
    ...style,
  };

  // Compose control styles
  const controlStyle = {
    ...styles.control,
    ...sizeStyles.control,
    ...(isHovered && !isCheckboxDisabled && !selected && styles.controlHover),
    ...(selected && !isCheckboxDisabled && styles.controlSelected),
    ...(selected && isHovered && !isCheckboxDisabled && styles.controlSelectedHover),
    ...(isCheckboxDisabled && !selected && styles.controlDisabled),
    ...(isCheckboxDisabled && selected && styles.controlDisabledSelected),
  };

  // Compose icon styles
  const iconStyle = {
    ...styles.checkIcon,
    ...sizeStyles.icon,
    ...(selected && styles.checkIconVisible),
    ...(isCheckboxDisabled && styles.checkIconDisabled),
  };

  // Compose label styles
  const labelStyle = {
    ...styles.label,
    ...sizeStyles.label,
    ...(isCheckboxDisabled && styles.labelDisabled),
  };

  return (
    <label
      style={wrapperStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <input
        type="checkbox"
        checked={selected}
        disabled={isCheckboxDisabled}
        value={value}
        name={name}
        onChange={handleClick}
        onKeyDown={handleKeyDown}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        aria-checked={selected}
      />
      <span style={controlStyle}>
        <CheckIcon style={iconStyle} />
      </span>
      {children && <span style={labelStyle}>{children}</span>}
    </label>
  );
};

Checkbox.displayName = "Checkbox";
Checkbox.sizes = CHECKBOX_SIZES;

export default Checkbox;
