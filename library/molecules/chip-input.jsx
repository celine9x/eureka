/**
 * ChipInput Component
 *
 * A tag/chip input field with label, search functionality, and chip management.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <ChipInput
 *   label="Tags"
 *   required
 *   placeholder="Search for tags"
 *   chips={[{ id: '1', label: 'React' }, { id: '2', label: 'TypeScript' }]}
 *   onChange={setChips}
 * />
 */

import React, { useState, useRef, forwardRef } from "react";
import { Chip } from "../atoms/chip.jsx";
import { Icon } from "../atoms/icon.jsx";
import { XCircleIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const CHIP_COLORS = {
  skyblue: "var(--SkyBlue70, #7DBEFF)",
  green: "var(--Green70, #73E5AC)",
  yellow: "var(--Yellow80, #EFEB9C)",
  peach: "var(--Peach70, #FFAE70)",
  red: "var(--Red70, #FF7373)",
  blue: "var(--Blue70, #8587FF)",
  purple: "var(--Purple70, #B794F6)",
  pink: "var(--Pink70, #FF8DC7)",
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  wrapper: {
    display: "inline-flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
  },

  label: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
  },

  labelText: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-caption)",
    fontWeight: 400,
    color: "var(--color-content-primary)",
  },

  labelRequired: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-caption)",
    fontWeight: 400,
    color: "var(--color-content-negative)",
  },

  container: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "4px 8px",
    minHeight: 32,
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-md)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    boxShadow: "var(--shadow-light-down)",
    transition: "all var(--transition-fast)",
    boxSizing: "border-box",
  },

  containerHover: {
    outlineColor: "var(--color-general-neutral-dark)",
    boxShadow: "var(--shadow-light-up)",
  },

  containerFocus: {
    outlineColor: "var(--color-interaction-outline-active)",
    boxShadow: "var(--shadow-focus)",
  },

  containerDisabled: {
    background: "var(--color-general-neutral-light)",
    cursor: "not-allowed",
  },

  containerError: {
    outlineColor: "var(--color-content-negative)",
  },

  containerEmpty: {
    padding: "6px 8px",
  },

  content: {
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    gap: 8,
  },

  chips: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    gap: 8,
  },

  input: {
    flex: 1,
    minWidth: 80,
    border: "none",
    outline: "none",
    background: "transparent",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: 400,
    color: "var(--color-content-primary)",
    padding: 0,
  },

  inputDisabled: {
    cursor: "not-allowed",
    color: "var(--color-content-tertiary)",
  },

  actions: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
  },

  action: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 16,
    height: 16,
    padding: 0,
    border: "none",
    background: "transparent",
    color: "var(--color-content-secondary)",
    cursor: "pointer",
    transition: "color var(--transition-fast)",
  },

  actionHover: {
    color: "var(--color-content-primary)",
  },

  actionDisabled: {
    color: "var(--color-content-tertiary)",
    cursor: "not-allowed",
  },

  chevronOpen: {
    transform: "rotate(180deg)",
  },

  helper: {
    display: "flex",
    alignItems: "flex-start",
    gap: 4,
  },

  helperIcon: {
    flexShrink: 0,
    width: 16,
    height: 16,
    color: "var(--color-content-negative)",
  },

  helperText: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-caption)",
    color: "var(--color-content-secondary)",
  },

  helperTextError: {
    color: "var(--color-content-negative)",
  },
};

// ─────────────────────────────────────────────
// CHIP INPUT LABEL
// ─────────────────────────────────────────────

export const ChipInputLabel = ({ children, required = false, style }) => {
  return (
    <div style={{ ...styles.label, ...style }}>
      <span style={styles.labelText}>{children}</span>
      {required && <span style={styles.labelRequired}>*</span>}
    </div>
  );
};

ChipInputLabel.displayName = "ChipInputLabel";

// ─────────────────────────────────────────────
// ACTION BUTTON
// ─────────────────────────────────────────────

const ActionButton = ({ onClick, disabled, ariaLabel, isOpen, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  const btnStyle = {
    ...styles.action,
    ...(isHovered && !disabled && styles.actionHover),
    ...(disabled && styles.actionDisabled),
    ...(isOpen && styles.chevronOpen),
    transition: "all var(--transition-fast)",
  };

  return (
    <button
      type="button"
      style={btnStyle}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  );
};

// ─────────────────────────────────────────────
// CHIP INPUT COMPONENT
// ─────────────────────────────────────────────

/**
 * ChipInput
 *
 * @param {string} label - Label text above the input
 * @param {boolean} required - Shows required asterisk
 * @param {string} placeholder - Placeholder text when empty
 * @param {array} chips - Array of chip objects: { id, label, color? }
 * @param {function} onChange - Called when chips array changes
 * @param {function} onInputChange - Called when search input changes
 * @param {string} inputValue - Controlled input value
 * @param {boolean} isDisabled - Disables the input
 * @param {boolean} error - Shows error state
 * @param {string} helperText - Helper text below the input
 * @param {boolean} showClear - Shows clear all button
 * @param {boolean} showDropdown - Shows dropdown chevron
 * @param {boolean} isOpen - Dropdown open state (for chevron rotation)
 * @param {function} onClear - Called when clear button clicked
 * @param {function} onDropdownClick - Called when dropdown chevron clicked
 * @param {function} onChipRemove - Called when a chip is removed (receives chip id)
 * @param {function} onKeyDown - Called on input keydown (for Enter handling)
 * @param {object} style - Additional inline styles
 */
export const ChipInput = forwardRef(
  (
    {
      label,
      required = false,
      placeholder = "Search for tags",
      chips = [],
      onChange,
      onInputChange,
      inputValue,
      isDisabled = false,
      disabled,
      error = false,
      helperText,
      showClear = true,
      showDropdown = true,
      isOpen = false,
      onClear,
      onDropdownClick,
      onChipRemove,
      onKeyDown,
      style,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef(null);
    const [internalInputValue, setInternalInputValue] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isInputDisabled = isDisabled || disabled;
    const controlledInput = inputValue !== undefined;
    const currentInputValue = controlledInput ? inputValue : internalInputValue;
    const hasChips = chips.length > 0;

    const handleInputChange = (e) => {
      const value = e.target.value;
      if (!controlledInput) {
        setInternalInputValue(value);
      }
      onInputChange?.(value);
    };

    const handleChipRemove = (chipId) => {
      if (isInputDisabled) return;

      if (onChipRemove) {
        onChipRemove(chipId);
      } else if (onChange) {
        const newChips = chips.filter((chip) => chip.id !== chipId);
        onChange(newChips);
      }
    };

    const handleClear = () => {
      if (isInputDisabled) return;

      if (onClear) {
        onClear();
      } else if (onChange) {
        onChange([]);
      }

      if (!controlledInput) {
        setInternalInputValue("");
      }
    };

    const handleDropdownClick = () => {
      if (isInputDisabled) return;
      onDropdownClick?.();
    };

    const handleContainerClick = () => {
      if (!isInputDisabled && inputRef.current) {
        inputRef.current.focus();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Backspace" && currentInputValue === "" && chips.length > 0) {
        const lastChip = chips[chips.length - 1];
        handleChipRemove(lastChip.id);
      }
      onKeyDown?.(e);
    };

    // Compose container styles
    const containerStyle = {
      ...styles.container,
      ...(isHovered && !isInputDisabled && !isFocused && styles.containerHover),
      ...(isFocused && !isInputDisabled && !error && styles.containerFocus),
      ...(isInputDisabled && styles.containerDisabled),
      ...(error && styles.containerError),
      ...(!hasChips && styles.containerEmpty),
    };

    // Input styles
    const inputStyle = {
      ...styles.input,
      ...(isInputDisabled && styles.inputDisabled),
    };

    // Helper text styles
    const helperTextStyle = {
      ...styles.helperText,
      ...(error && styles.helperTextError),
    };

    const wrapperStyle = {
      ...styles.wrapper,
      ...style,
    };

    return (
      <div style={wrapperStyle} ref={ref} {...props}>
        {label && <ChipInputLabel required={required}>{label}</ChipInputLabel>}

        <div
          style={containerStyle}
          onClick={handleContainerClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div style={styles.content}>
            {hasChips && (
              <div style={styles.chips}>
                {chips.map((chip) => (
                  <Chip
                    key={chip.id}
                    color={chip.color}
                    removable={!isInputDisabled}
                    isDisabled={isInputDisabled}
                    onRemove={() => handleChipRemove(chip.id)}
                  >
                    {chip.label}
                  </Chip>
                ))}
              </div>
            )}

            {!isInputDisabled && (
              <input
                ref={inputRef}
                type="text"
                style={inputStyle}
                placeholder={!hasChips ? placeholder : ""}
                value={currentInputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={isInputDisabled}
                aria-invalid={error || undefined}
              />
            )}
          </div>

          <div style={styles.actions}>
            {showClear && hasChips && !isInputDisabled && (
              <ActionButton
                onClick={handleClear}
                disabled={isInputDisabled}
                ariaLabel="Clear all"
              >
                <XCircleIcon style={{ width: 16, height: 16 }} />
              </ActionButton>
            )}

            {showDropdown && (
              <ActionButton
                onClick={handleDropdownClick}
                disabled={isInputDisabled}
                ariaLabel={isOpen ? "Close dropdown" : "Open dropdown"}
                isOpen={isOpen}
              >
                <ChevronDownIcon style={{ width: 16, height: 16 }} />
              </ActionButton>
            )}
          </div>
        </div>

        {helperText && (
          <div style={styles.helper}>
            {error && (
              <span style={styles.helperIcon}>
                <Icon name="ExclamationCircle" variant="solid" size="sm" />
              </span>
            )}
            <span style={helperTextStyle}>{helperText}</span>
          </div>
        )}
      </div>
    );
  }
);

ChipInput.displayName = "ChipInput";

// ─────────────────────────────────────────────
// CHIP INPUT WITH SUGGESTIONS
// ─────────────────────────────────────────────

/**
 * ChipInputWithSuggestions
 *
 * Extended ChipInput with built-in dropdown suggestions functionality.
 */
export const ChipInputWithSuggestions = ({
  label,
  required = false,
  placeholder = "Search for tags",
  chips = [],
  onChange,
  suggestions = [],
  isDisabled = false,
  disabled,
  error = false,
  helperText,
  allowCreate = false,
  createLabel = "Create",
  style,
  ...props
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const isInputDisabled = isDisabled || disabled;

  const filteredSuggestions = suggestions.filter((suggestion) => {
    const isAlreadySelected = chips.some((chip) => chip.id === suggestion.id);
    const matchesSearch = suggestion.label.toLowerCase().includes(inputValue.toLowerCase());
    return !isAlreadySelected && matchesSearch;
  });

  const handleInputChange = (value) => {
    setInputValue(value);
    if (value && !isOpen) {
      setIsOpen(true);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    const newChips = [...chips, suggestion];
    onChange?.(newChips);
    setInputValue("");
    setIsOpen(false);
  };

  const handleCreateChip = () => {
    if (!inputValue.trim()) return;

    const newChip = {
      id: `created-${Date.now()}`,
      label: inputValue.trim(),
    };

    const newChips = [...chips, newChip];
    onChange?.(newChips);
    setInputValue("");
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();

      const matchingSuggestion = filteredSuggestions.find(
        (s) => s.label.toLowerCase() === inputValue.toLowerCase()
      );

      if (matchingSuggestion) {
        handleSelectSuggestion(matchingSuggestion);
      } else if (allowCreate) {
        handleCreateChip();
      }
    }

    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={style}>
      <ChipInput
        label={label}
        required={required}
        placeholder={placeholder}
        chips={chips}
        onChange={onChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        isDisabled={isInputDisabled}
        error={error}
        helperText={helperText}
        isOpen={isOpen}
        onDropdownClick={handleDropdownClick}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </div>
  );
};

ChipInputWithSuggestions.displayName = "ChipInputWithSuggestions";

export default ChipInput;
