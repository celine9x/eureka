"use client";

/**
 * RadioButton Component
 *
 * A reusable radio button with sizes and states.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <RadioGroup name="option" value={selected} onChange={setSelected}>
 *   <RadioButton value="1">Option 1</RadioButton>
 *   <RadioButton value="2">Option 2</RadioButton>
 * </RadioGroup>
 */

import { useState, createContext, useContext } from "react";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const RADIO_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

// ─────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────

const RadioGroupContext = createContext(null);

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  group: {
    display: "flex",
    flexDirection: "column",
  },

  radio: {
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
    fontFamily: "var(--font-family-primary)",
    color: "var(--color-content-primary)",
  },

  radioDisabled: {
    cursor: "not-allowed",
    color: "var(--color-content-tertiary)",
  },

  control: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    borderRadius: "var(--radius-full)",
    border: "1.5px solid var(--color-interaction-outline-enabled)",
    background: "var(--color-interaction-fill-enabled)",
    transition: "all var(--transition-fast)",
    boxSizing: "border-box",
  },

  controlHover: {
    borderColor: "var(--color-interaction-outline-hover)",
  },

  controlSelected: {
    borderColor: "var(--color-action-fill-primary-enabled)",
    background: "var(--color-action-fill-primary-enabled)",
  },

  controlSelectedHover: {
    borderColor: "var(--color-action-fill-primary-hover)",
    background: "var(--color-action-fill-primary-hover)",
  },

  controlDisabled: {
    borderColor: "var(--color-interaction-outline-disabled)",
    background: "var(--color-interaction-fill-disabled)",
  },

  controlDisabledSelected: {
    borderColor: "var(--color-action-fill-primary-disabled)",
    background: "var(--color-action-fill-primary-disabled)",
  },

  dot: {
    borderRadius: "var(--radius-full)",
    background: "transparent",
    transform: "scale(0)",
    transition: "all var(--transition-fast)",
  },

  dotSelected: {
    background: "var(--color-content-inverted)",
    transform: "scale(1)",
  },

  dotDisabledSelected: {
    background: "var(--color-action-content-primary-disabled)",
  },

  label: {
    fontWeight: "var(--font-weight-regular)",
  },

  labelDisabled: {
    color: "var(--color-content-tertiary)",
  },

  sizes: {
    sm: {
      radio: { gap: 8 },
      control: { width: 16, height: 16 },
      dot: { width: 7, height: 7 },
      label: {
        fontSize: "var(--text-body-md)",
        lineHeight: "var(--line-height-body-md)",
      },
    },
    md: {
      radio: { gap: 8 },
      control: { width: 18, height: 18 },
      dot: { width: 8, height: 8 },
      label: {
        fontSize: "var(--text-body-md)",
        lineHeight: "var(--line-height-body-md)",
      },
    },
    lg: {
      radio: { gap: 12 },
      control: { width: 20, height: 20 },
      dot: { width: 10, height: 10 },
      label: {
        fontSize: "var(--text-body-lg)",
        lineHeight: "var(--line-height-body-lg)",
      },
    },
  },
};

// ─────────────────────────────────────────────
// RADIO GROUP COMPONENT
// ─────────────────────────────────────────────

/** RadioGroup */
export const RadioGroup = ({
  name,
  value,
  defaultValue,
  onChange,
  isDisabled = false,
  disabled,
  style,
  children,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const isGroupDisabled = isDisabled || disabled;

  const handleChange = (newValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const groupStyle = {
    ...styles.group,
    ...style,
  };

  return (
    <RadioGroupContext.Provider
      value={{
        name,
        value: currentValue,
        onChange: handleChange,
        isDisabled: isGroupDisabled,
      }}
    >
      <div role="radiogroup" style={groupStyle} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

RadioGroup.displayName = "RadioGroup";

// ─────────────────────────────────────────────
// RADIO BUTTON COMPONENT
// ─────────────────────────────────────────────

/** RadioButton */
export const RadioButton = ({
  size = RADIO_SIZES.md,
  value,
  isDisabled = false,
  disabled,
  style,
  children,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const context = useContext(RadioGroupContext);

  const isSelected = context?.value === value;
  const isRadioDisabled = isDisabled || disabled || context?.isDisabled;
  const sizeStyles = styles.sizes[size];

  const handleClick = () => {
    if (isRadioDisabled) return;
    context?.onChange(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };

  // Compose radio styles
  const radioStyle = {
    ...styles.radio,
    ...sizeStyles.radio,
    ...(isRadioDisabled && styles.radioDisabled),
    ...style,
  };

  // Compose control styles
  const controlStyle = {
    ...styles.control,
    ...sizeStyles.control,
    ...(isHovered && !isRadioDisabled && !isSelected && styles.controlHover),
    ...(isSelected && !isRadioDisabled && styles.controlSelected),
    ...(isSelected && isHovered && !isRadioDisabled && styles.controlSelectedHover),
    ...(isRadioDisabled && !isSelected && styles.controlDisabled),
    ...(isRadioDisabled && isSelected && styles.controlDisabledSelected),
  };

  // Compose dot styles
  const dotStyle = {
    ...styles.dot,
    ...sizeStyles.dot,
    ...(isSelected && styles.dotSelected),
    ...(isRadioDisabled && isSelected && styles.dotDisabledSelected),
  };

  // Compose label styles
  const labelStyle = {
    ...styles.label,
    ...sizeStyles.label,
    ...(isRadioDisabled && styles.labelDisabled),
  };

  return (
    <label
      style={radioStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <input
        type="radio"
        name={context?.name}
        value={value}
        checked={isSelected}
        disabled={isRadioDisabled}
        onChange={handleClick}
        onKeyDown={handleKeyDown}
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          margin: -1,
          padding: 0,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
          border: 0,
          outline: "none",
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          background: "transparent",
        }}
      />
      <span style={controlStyle}>
        <span style={dotStyle} />
      </span>
      {children && <span style={labelStyle}>{children}</span>}
    </label>
  );
};

RadioButton.displayName = "RadioButton";
RadioButton.sizes = RADIO_SIZES;

export default RadioButton;
