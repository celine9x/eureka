/**
 * RadioCard Component (Molecule)
 *
 * A selectable card with a radio button, label, and optional info items.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <RadioCardGroup value={selected} onChange={setSelected}>
 *   <RadioCard value="pro" label="Pro Plan" info="Annual,USD,Cancel anytime" />
 *   <RadioCard value="basic" label="Basic Plan" info="Monthly,USD" />
 * </RadioCardGroup>
 */

import React, { useState, createContext, useContext } from "react";
import { RadioButton } from "../atoms/radio-button.jsx";

// ─────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────

const RadioCardGroupContext = createContext(null);

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  group: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  card: {
    display: "inline-flex",
    alignItems: "center",
    gap: 16,
    width: "100%",
    padding: "16px 24px",
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-md)",
    outline: "1px solid var(--color-interaction-outline-enabled)",
    outlineOffset: "-1px",
    boxShadow: "var(--shadow-light-down)",
    boxSizing: "border-box",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
    userSelect: "none",
    border: "none",
  },

  cardHover: {
    background: "var(--color-general-neutral-lighter)",
    outlineColor: "var(--color-interaction-outline-hover)",
  },

  cardChecked: {
    background: "var(--color-general-informative)",
    outlineColor: "var(--color-action-fill-primary-hover)",
    boxShadow: "var(--shadow-dark-down)",
  },

  cardDisabled: {
    background: "var(--color-general-neutral-light)",
    cursor: "not-allowed",
  },

  cardDisabledUnchecked: {
    outlineColor: "var(--color-interaction-outline-disabled)",
    boxShadow: "var(--shadow-light-down)",
  },

  cardDisabledChecked: {
    outlineColor: "var(--color-action-fill-primary-hover)",
    boxShadow: "var(--shadow-dark-down)",
  },

  cardFocus: {
    outline: "2px solid var(--color-content-brand)",
    outlineOffset: 2,
  },

  control: {
    flexShrink: 0,
    pointerEvents: "none",
  },

  content: {
    flex: "1 1 0",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    minWidth: 0,
  },

  labelRow: {
    display: "inline-flex",
    alignItems: "flex-start",
    gap: 8,
    alignSelf: "stretch",
  },

  icon: {
    width: 20,
    height: 20,
    flexShrink: 0,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-secondary)",
  },

  label: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    fontWeight: 400,
    lineHeight: "var(--line-height-body-lg)",
    color: "var(--color-content-primary)",
  },

  infoRow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    alignSelf: "stretch",
    minHeight: 24,
  },

  infoItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
  },

  infoText: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: 400,
    lineHeight: "var(--line-height-body-md)",
    color: "var(--color-content-secondary)",
  },

  infoDot: {
    width: 2,
    height: 2,
    borderRadius: "var(--radius-full)",
    background: "var(--color-content-secondary)",
    flexShrink: 0,
  },

  action: {
    flexShrink: 0,
  },
};

// ─────────────────────────────────────────────
// RADIO CARD GROUP COMPONENT
// ─────────────────────────────────────────────

/**
 * RadioCardGroup
 *
 * Manages state for a group of RadioCard components.
 *
 * @param {string} name - Group name for radio buttons
 * @param {string} value - Currently selected value
 * @param {function} onChange - Called with new value when selection changes
 * @param {ReactNode} children - RadioCard components
 * @param {object} style - Additional inline styles
 */
export const RadioCardGroup = ({ name, value, onChange, style, children, ...props }) => {
  const groupStyle = {
    ...styles.group,
    ...style,
  };

  return (
    <RadioCardGroupContext.Provider value={{ name, value, onChange }}>
      <div style={groupStyle} role="radiogroup" {...props}>
        {children}
      </div>
    </RadioCardGroupContext.Provider>
  );
};

RadioCardGroup.displayName = "RadioCardGroup";

// ─────────────────────────────────────────────
// RADIO CARD COMPONENT
// ─────────────────────────────────────────────

/**
 * RadioCard
 *
 * A selectable card with radio button behavior.
 *
 * @param {string} name - Radio group name (required if not in RadioCardGroup)
 * @param {string} value - Radio value
 * @param {boolean} checked - Selected state (controlled)
 * @param {boolean} isDisabled - Disables interactions
 * @param {string} label - Main label text
 * @param {string} info - Comma-separated info items (up to 3)
 * @param {ReactNode} icon - Icon element before label
 * @param {ReactNode} action - Action element on the right (e.g., button)
 * @param {function} onChange - Called when selected
 * @param {object} style - Additional inline styles
 *
 * @example
 * <RadioCard name="plan" value="pro" label="Pro Plan" info="Annual,USD,Cancel anytime" />
 */
export const RadioCard = ({
  name: nameProp,
  value,
  checked: checkedProp,
  isDisabled = false,
  disabled,
  label,
  info,
  icon,
  action,
  onChange,
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const group = useContext(RadioCardGroupContext);
  const name = nameProp || group?.name;
  const isChecked = group ? group.value === value : checkedProp;
  const isCardDisabled = isDisabled || disabled;

  const handleClick = () => {
    if (isCardDisabled || isChecked) return;
    if (group?.onChange) {
      group.onChange(value);
    } else {
      onChange?.({ value, name, checked: true });
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === " " || e.key === "Enter") && !isCardDisabled && !isChecked) {
      e.preventDefault();
      handleClick();
    }
  };

  // Compose card styles
  const cardStyle = {
    ...styles.card,
    ...(isHovered && !isCardDisabled && !isChecked && styles.cardHover),
    ...(isChecked && styles.cardChecked),
    ...(isCardDisabled && styles.cardDisabled),
    ...(isCardDisabled && !isChecked && styles.cardDisabledUnchecked),
    ...(isCardDisabled && isChecked && styles.cardDisabledChecked),
    ...(isFocused && styles.cardFocus),
    ...style,
  };

  const renderInfoItems = () => {
    if (!info) return null;
    const items = info
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 3);
    if (!items.length) return null;

    return (
      <div style={styles.infoRow}>
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span style={styles.infoDot} />}
            <span style={styles.infoItem}>
              <span style={styles.infoText}>{item}</span>
            </span>
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div
      style={cardStyle}
      tabIndex={isCardDisabled ? -1 : 0}
      role="radio"
      aria-checked={isChecked}
      aria-disabled={isCardDisabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    >
      <div style={styles.control}>
        <RadioButton
          name={name}
          value={value}
          checked={isChecked}
          disabled={isCardDisabled}
          size="md"
          onChange={() => {}}
        />
      </div>
      <div style={styles.content}>
        <div style={styles.labelRow}>
          {icon && <span style={styles.icon}>{icon}</span>}
          <span style={styles.label}>{label}</span>
        </div>
        {renderInfoItems()}
      </div>
      {action && <div style={styles.action}>{action}</div>}
    </div>
  );
};

RadioCard.displayName = "RadioCard";

export default RadioCard;
