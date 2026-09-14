"use client";

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

import React, { useRef, useState, createContext, useContext } from "react";
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
    padding: "var(--spacing-4) var(--spacing-6)",
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--color-interaction-outline-enabled)",
    boxSizing: "border-box",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
    userSelect: "none",
  },

  cardHover: {
    background: "var(--color-general-neutral-lighter)",
    borderColor: "var(--color-interaction-outline-hover)",
  },

  cardChecked: {
    background: "var(--color-general-informative)",
    borderColor: "var(--color-action-fill-primary-enabled)",
  },

  cardDisabled: {
    background: "var(--color-general-neutral-light)",
    cursor: "not-allowed",
  },

  cardDisabledUnchecked: {
    borderColor: "var(--color-interaction-outline-disabled)",
  },

  cardDisabledChecked: {
    borderColor: "var(--color-action-fill-primary-disabled)",
  },

  cardFocus: {
    borderColor: "var(--color-content-brand)",
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
    fontWeight: "var(--font-weight-regular)",
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
    fontWeight: "var(--font-weight-regular)",
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
 *
 * @example
 * <RadioCard name="plan" value="pro" label="Pro Plan" info="Annual,USD,Cancel anytime" />
 */
export const RadioCard = ({
  name: nameProp,
  value,
  checked: checkedProp,
  hideControl = false,
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
  const [isFocusVisible, setIsFocusVisible] = useState(false);
  const hadKeyboardEventRef = useRef(false);

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
    hadKeyboardEventRef.current = true;

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
    ...(isFocusVisible && styles.cardFocus),
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
      onMouseDown={() => {
        hadKeyboardEventRef.current = false;
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocusVisible(hadKeyboardEventRef.current)}
      onBlur={() => setIsFocusVisible(false)}
      {...props}
    >
      {!hideControl && (
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
      )}
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
RadioCard.Group = RadioCardGroup;
RadioCard.Radio = RadioButton;

RadioCardGroup.Card = RadioCard;

export default RadioCard;
