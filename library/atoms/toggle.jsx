/**
 * Toggle Component
 *
 * A switch/toggle control with multiple sizes and states.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <Toggle label="Enable notifications" />
 * <Toggle size="sm" isSelected={isEnabled} onChange={setIsEnabled} />
 * <Toggle label="Dark mode" labelPosition="left" />
 */

import { useState } from "react";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const TOGGLE_SIZES = {
  sm: "sm",
  md: "md",
};

export const TOGGLE_LABEL_POSITIONS = {
  left: "left",
  right: "right",
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  wrapper: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    userSelect: "none",
  },

  wrapperDisabled: {
    cursor: "not-allowed",
  },

  track: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    borderRadius: "var(--radius-full)",
    boxShadow: "var(--shadow-light-down)",
    flexShrink: 0,
    transition: "all var(--transition-fast)",
    boxSizing: "border-box",
  },

  trackOff: {
    background: "var(--color-content-tertiary)",
    justifyContent: "flex-start",
  },

  trackOffHover: {
    background: "var(--color-content-secondary)",
  },

  trackOn: {
    background: "var(--color-action-fill-primary-enabled)",
    justifyContent: "flex-end",
  },

  trackOnHover: {
    background: "var(--color-action-fill-primary-hover)",
  },

  trackDisabled: {
    background: "var(--color-content-tertiary)",
    opacity: 0.5,
  },

  knob: {
    borderRadius: "var(--radius-full)",
    flexShrink: 0,
    transition: "all var(--transition-fast)",
    background: "var(--color-general-white)",
    boxShadow: "0px 1px 2px rgba(83, 113, 172, 0.15), 0px 2px 4px rgba(83, 113, 172, 0.20)",
  },

  knobDisabled: {
    background: "var(--color-general-neutral-light)",
  },

  label: {
    fontFamily: "var(--font-family-primary)",
    fontWeight: 400,
    transition: "color var(--transition-fast)",
    color: "var(--color-content-primary)",
  },

  labelDisabled: {
    color: "var(--color-content-secondary)",
  },

  sizes: {
    sm: {
      track: { width: 28, height: 16, padding: 2 },
      knob: { width: 12, height: 12 },
      label: {
        fontSize: "var(--text-body-md)",
        lineHeight: "var(--line-height-body-md)",
      },
    },
    md: {
      track: { width: 36, height: 20, padding: 2.5 },
      knob: { width: 15, height: 15 },
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

/**
 * Toggle
 *
 * @param {string} size - sm | md (default: md)
 * @param {boolean} isSelected - Whether the toggle is on
 * @param {boolean} defaultSelected - Initial selected state (uncontrolled)
 * @param {boolean} isDisabled - Disables the toggle
 * @param {string} label - Label text displayed next to toggle
 * @param {string} labelPosition - left | right (default: right)
 * @param {string} name - Input name for forms
 * @param {string} value - Input value for forms
 * @param {function} onChange - Called when toggle state changes
 * @param {object} style - Additional inline styles
 */
export const Toggle = ({
  size = TOGGLE_SIZES.md,
  isSelected,
  defaultSelected = false,
  isDisabled = false,
  disabled,
  checked,
  defaultChecked,
  label,
  labelPosition = TOGGLE_LABEL_POSITIONS.right,
  name,
  value,
  onChange,
  style,
  "aria-label": ariaLabel,
  ...props
}) => {
  // Support legacy props
  const selectedValue = isSelected ?? checked;
  const defaultSelectedValue = defaultSelected ?? defaultChecked ?? false;

  const [internalSelected, setInternalSelected] = useState(defaultSelectedValue);
  const [isHovered, setIsHovered] = useState(false);

  const isControlled = selectedValue !== undefined;
  const selected = isControlled ? selectedValue : internalSelected;
  const isToggleDisabled = isDisabled || disabled;

  const sizeStyles = styles.sizes[size];

  const handleClick = () => {
    if (isToggleDisabled) return;

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
    ...(isToggleDisabled && styles.wrapperDisabled),
    ...style,
  };

  // Compose track styles
  const trackStyle = {
    ...styles.track,
    ...sizeStyles.track,
    ...(selected ? styles.trackOn : styles.trackOff),
    ...(isHovered && !isToggleDisabled && (selected ? styles.trackOnHover : styles.trackOffHover)),
    ...(isToggleDisabled && styles.trackDisabled),
  };

  // Compose knob styles
  const knobStyle = {
    ...styles.knob,
    ...sizeStyles.knob,
    ...(isToggleDisabled && styles.knobDisabled),
  };

  // Compose label styles
  const labelStyle = {
    ...styles.label,
    ...sizeStyles.label,
    ...(isToggleDisabled && styles.labelDisabled),
  };

  const renderLabel = () => {
    if (!label) return null;
    return <span style={labelStyle}>{label}</span>;
  };

  return (
    <label
      style={wrapperStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={ariaLabel || label}
      {...props}
    >
      <input
        type="checkbox"
        role="switch"
        checked={selected}
        disabled={isToggleDisabled}
        name={name}
        value={value}
        onChange={handleClick}
        onKeyDown={handleKeyDown}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
        aria-checked={selected}
      />
      {labelPosition === "left" && renderLabel()}
      <span style={trackStyle} aria-hidden="true">
        <span style={knobStyle} />
      </span>
      {labelPosition === "right" && renderLabel()}
    </label>
  );
};

Toggle.displayName = "Toggle";
Toggle.sizes = TOGGLE_SIZES;
Toggle.labelPositions = TOGGLE_LABEL_POSITIONS;

export default Toggle;
