/**
 * RadioCard Component (Molecule)
 *
 * A selectable card with a radio button, label, and optional info items.
 * Uses design tokens from tokens.css.
 */

import React, { createContext, useContext } from "react";
import { createStyleInjector, cx } from "../utils/styles.js";
import { RadioButton } from "../atoms/radio-button.jsx";

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  base: `
    .radio-card-group {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-3);
    }
    .radio-card {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-4);
      width: 100%;
      padding: var(--spacing-4) var(--spacing-6);
      background: var(--color-background-white);
      border-radius: var(--radius-md);
      outline: 1px solid var(--color-interaction-outline-enabled);
      outline-offset: -1px;
      box-shadow: var(--shadow-light-down);
      box-sizing: border-box;
      cursor: pointer;
      transition:
        background var(--transition-fast),
        outline-color var(--transition-fast),
        box-shadow var(--transition-fast);
      user-select: none;
    }
    .radio-card:hover:not(.radio-card--disabled):not(.radio-card--checked) {
      background: var(--color-background-neutral-lighter);
      outline-color: var(--color-interaction-outline-hover);
    }
    .radio-card--checked {
      background: var(--color-general-informative);
      outline-color: var(--color-action-fill-primary-hover);
      box-shadow: var(--shadow-dark-down);
    }
    .radio-card--disabled {
      background: var(--color-background-neutral-light);
      cursor: not-allowed;
    }
    .radio-card--disabled:not(.radio-card--checked) {
      outline-color: var(--color-interaction-outline-disabled);
      box-shadow: var(--shadow-light-down);
    }
    .radio-card--disabled.radio-card--checked {
      outline-color: var(--color-action-fill-primary-hover);
      box-shadow: var(--shadow-dark-down);
    }
    .radio-card:focus-visible {
      outline: 2px solid var(--color-content-brand);
      outline-offset: 2px;
    }
    .radio-card-control {
      flex-shrink: 0;
      pointer-events: none;
    }
    .radio-card-content {
      flex: 1 1 0;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-1);
      min-width: 0;
    }
    .radio-card-label-row {
      display: inline-flex;
      align-items: flex-start;
      gap: var(--spacing-2);
      align-self: stretch;
    }
    .radio-card-icon {
      width: var(--size-icon-md);
      height: var(--size-icon-md);
      flex-shrink: 0;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-content-secondary);
    }
    .radio-card-icon svg {
      width: 100%;
      height: 100%;
    }
    .radio-card-label {
      font-family: var(--font-family-primary);
      font-size: var(--text-body-lg);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-body-lg);
      color: var(--color-content-primary);
    }
    .radio-card-info-row {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-2);
      align-self: stretch;
      min-height: 1.5rem;
    }
    .radio-card-info-item {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-1);
    }
    .radio-card-info-text {
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-body-md);
      color: var(--color-content-secondary);
    }
    .radio-card-info-dot {
      width: 2px;
      height: 2px;
      border-radius: var(--radius-full);
      background: var(--color-content-secondary);
      flex-shrink: 0;
    }
    .radio-card-action {
      flex-shrink: 0;
    }
  `,
};

const injectStyles = createStyleInjector("radio-card");
const css = Object.values(styles).join("\n");

// ─────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────

const RadioCardGroupContext = createContext(null);

/**
 * RadioCardGroup
 *
 * Manages state for a group of RadioCard components.
 *
 * @param {string} name - Group name for radio buttons
 * @param {string} value - Currently selected value
 * @param {function} onChange - Called with new value when selection changes
 * @param {ReactNode} children - RadioCard components
 */
export const RadioCardGroup = ({ name, value, onChange, children, className, ...props }) => {
  return (
    <RadioCardGroupContext.Provider value={{ name, value, onChange }}>
      <div className={cx("radio-card-group", className)} role="radiogroup" {...props}>
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
 * @param {boolean} disabled - Disables interactions
 * @param {string} label - Main label text
 * @param {string} info - Comma-separated info items (up to 3)
 * @param {ReactNode} icon - Icon element before label
 * @param {ReactNode} action - Action element on the right (e.g., button)
 * @param {function} onChange - Called when selected
 *
 * @example
 * <RadioCard name="plan" value="pro" label="Pro Plan" info="Annual,USD,Cancel anytime">
 *   <Icon name="Star" slot="icon" />
 *   <Button slot="action">Select</Button>
 * </RadioCard>
 */
export const RadioCard = ({
  name: nameProp,
  value,
  checked: checkedProp,
  disabled = false,
  label,
  info,
  icon,
  action,
  onChange,
  className,
  ...props
}) => {
  injectStyles(css);

  const group = useContext(RadioCardGroupContext);
  const name = nameProp || group?.name;
  const isChecked = group ? group.value === value : checkedProp;

  const handleClick = () => {
    if (disabled || isChecked) return;
    if (group?.onChange) {
      group.onChange(value);
    } else {
      onChange?.({ value, name, checked: true });
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === " " || e.key === "Enter") && !disabled && !isChecked) {
      e.preventDefault();
      handleClick();
    }
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
      <div className="radio-card-info-row">
        {items.map((item, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="radio-card-info-dot" />}
            <span className="radio-card-info-item">
              <span className="radio-card-info-text">{item}</span>
            </span>
          </React.Fragment>
        ))}
      </div>
    );
  };

  const classes = cx(
    "radio-card",
    isChecked && "radio-card--checked",
    disabled && "radio-card--disabled",
    className
  );

  return (
    <div
      className={classes}
      tabIndex={disabled ? -1 : 0}
      role="radio"
      aria-checked={isChecked}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div className="radio-card-control">
        <RadioButton
          name={name}
          value={value}
          checked={isChecked}
          disabled={disabled}
          size="md"
          onChange={() => {}}
        />
      </div>
      <div className="radio-card-content">
        <div className="radio-card-label-row">
          {icon && <span className="radio-card-icon">{icon}</span>}
          <span className="radio-card-label">{label}</span>
        </div>
        {renderInfoItems()}
      </div>
      {action && <div className="radio-card-action">{action}</div>}
    </div>
  );
};

RadioCard.displayName = "RadioCard";

export default RadioCard;
