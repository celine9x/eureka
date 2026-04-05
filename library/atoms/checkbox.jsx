"use client";

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

import { useEffect, useMemo, useRef, useState } from "react";
import { CheckIcon } from "@heroicons/react/16/solid";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const CHECKBOX_SIZES = {
  sm: "sm",
  md: "md",
};

export const CHECKBOX_STATES = {
  enabled: "enabled",
  disabled: "disabled",
};

export const CHECKBOX_TYPES = {
  unchecked: "unchecked",
  checked: "checked",
  intermediate: "intermediate",
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  wrapper: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
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
    borderRadius: "var(--radius-xs)",
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
    boxShadow: "none",
  },

  controlDisabledSelected: {
    background: "var(--color-interaction-fill-disabled)",
    borderColor: "var(--color-interaction-outline-disabled)",
    boxShadow: "none",
  },

  markIcon: {
    color: "var(--color-content-inverted)",
    transition: "color var(--transition-fast)",
  },

  markIconDisabled: {
    color: "var(--color-general-neutral-dark)",
  },

  intermediateBar: {
    borderRadius: "var(--radius-full)",
    background: "var(--color-content-inverted)",
  },

  intermediateBarDisabled: {
    background: "var(--color-general-neutral-dark)",
  },

  label: {
    color: "var(--color-content-primary)",
    fontWeight: "var(--font-weight-regular)",
  },

  labelDisabled: {
    color: "var(--color-content-secondary)",
  },

  sizes: {
    sm: {
      control: {
        width: 16,
        height: 16,
        borderRadius: "var(--radius-xs)",
        boxShadow: "var(--shadow-light-down)",
      },
      icon: { width: 11, height: 10 },
      intermediate: { width: 10.33, height: 1 },
      label: {
        fontSize: "var(--text-body-md)",
        lineHeight: "var(--line-height-body-md)",
      },
    },
    md: {
      control: {
        width: 24,
        height: 24,
        borderRadius: "var(--radius-sm)",
        boxShadow: "var(--shadow-medium-down)",
      },
      icon: { width: 16.5, height: 15 },
      intermediate: { width: 15.5, height: 1.5 },
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
  type,
  state = CHECKBOX_STATES.enabled,
  isSelected,
  isIndeterminate,
  defaultSelected = false,
  defaultIndeterminate = false,
  isDisabled = false,
  disabled,
  value,
  name,
  onChange,
  style,
  children,
  ...props
}) => {
  const [internalType, setInternalType] = useState(
    defaultIndeterminate
      ? CHECKBOX_TYPES.intermediate
      : defaultSelected
      ? CHECKBOX_TYPES.checked
      : CHECKBOX_TYPES.unchecked
  );
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null);

  const isControlled = type !== undefined || isSelected !== undefined || isIndeterminate !== undefined;
  const isCheckboxDisabled =
    state === CHECKBOX_STATES.disabled || isDisabled || disabled;

  const resolvedType = useMemo(() => {
    if (type && Object.values(CHECKBOX_TYPES).includes(type)) return type;
    if (isIndeterminate) return CHECKBOX_TYPES.intermediate;
    if (isSelected) return CHECKBOX_TYPES.checked;
    if (isControlled) return CHECKBOX_TYPES.unchecked;
    return internalType;
  }, [type, isIndeterminate, isSelected, isControlled, internalType]);

  const isChecked = resolvedType === CHECKBOX_TYPES.checked;
  const isIntermediate = resolvedType === CHECKBOX_TYPES.intermediate;

  const sizeStyles = styles.sizes[size];

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.indeterminate = isIntermediate;
  }, [isIntermediate]);

  const handleClick = () => {
    if (isCheckboxDisabled) return;

    const nextType =
      resolvedType === CHECKBOX_TYPES.unchecked
        ? CHECKBOX_TYPES.checked
        : CHECKBOX_TYPES.unchecked;

    if (!isControlled) {
      setInternalType(nextType);
    }
    onChange?.(nextType === CHECKBOX_TYPES.checked, {
      type: nextType,
      isIntermediate: false,
    });
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
    ...(isCheckboxDisabled && styles.wrapperDisabled),
    ...style,
  };

  // Compose control styles
  const controlStyle = {
    ...styles.control,
    ...sizeStyles.control,
    ...(isHovered && !isCheckboxDisabled && resolvedType === CHECKBOX_TYPES.unchecked && styles.controlHover),
    ...((isChecked || isIntermediate) && !isCheckboxDisabled ? styles.controlSelected : null),
    ...((isChecked || isIntermediate) && isHovered && !isCheckboxDisabled ? styles.controlSelectedHover : null),
    ...(isCheckboxDisabled && resolvedType === CHECKBOX_TYPES.unchecked ? styles.controlDisabled : null),
    ...(isCheckboxDisabled && (isChecked || isIntermediate) ? styles.controlDisabledSelected : null),
  };

  // Compose icon styles
  const iconStyle = {
    ...styles.markIcon,
    ...sizeStyles.icon,
    ...(isCheckboxDisabled && styles.markIconDisabled),
  };

  const intermediateStyle = {
    ...styles.intermediateBar,
    ...sizeStyles.intermediate,
    ...(isCheckboxDisabled && styles.intermediateBarDisabled),
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
        ref={inputRef}
        checked={isChecked}
        disabled={isCheckboxDisabled}
        value={value}
        name={name}
        onChange={handleClick}
        onKeyDown={handleKeyDown}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        aria-checked={isIntermediate ? "mixed" : isChecked}
      />
      <span style={controlStyle}>
        {isChecked && <CheckIcon style={iconStyle} />}
        {isIntermediate && <span style={intermediateStyle} />}
      </span>
      {children && <span style={labelStyle}>{children}</span>}
    </label>
  );
};

Checkbox.displayName = "Checkbox";
Checkbox.sizes = CHECKBOX_SIZES;
Checkbox.states = CHECKBOX_STATES;
Checkbox.types = CHECKBOX_TYPES;

export default Checkbox;
