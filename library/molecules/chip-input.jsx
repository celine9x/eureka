/**
 * ChipInput Component
 *
 * A tag/chip input field with label, search functionality, and chip management.
 * Uses Tailwind CSS with design tokens.
 */

import React, { useState, useRef, forwardRef } from "react";
import { cx } from "../utils/cx.js";
import { Chip } from "../atoms/chip.jsx";
import { Icon } from "../atoms/icon.jsx";

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
// STYLES
// ─────────────────────────────────────────────

const styles = {
  wrapper: "inline-flex flex-col gap-2 w-full",

  label: "inline-flex items-center gap-1",
  labelText: "font-primary text-body-caption font-normal text-content-primary",
  labelRequired: "font-primary text-body-caption font-normal text-content-negative",

  container: [
    "flex items-center gap-2 py-1 px-2 min-h-8",
    "bg-background-white rounded-md",
    "outline outline-1 -outline-offset-1 outline-outline-neutral",
    "shadow-light-down transition-all duration-fast",
  ].join(" "),

  containerHover: "hover:not-disabled:not-[data-error]:outline-neutral-300 hover:not-disabled:not-[data-error]:shadow-light-up",
  containerFocus: "focus-within:not-disabled:not-[data-error]:outline-outline-focus focus-within:not-disabled:not-[data-error]:shadow-focus",
  containerDisabled: "bg-background-neutral-light cursor-not-allowed",
  containerError: "outline-content-negative",
  containerEmpty: "py-1.5 px-2",

  content: "flex-1 flex flex-wrap items-center content-center gap-2",
  chips: "flex flex-wrap items-center content-center gap-2",

  input: [
    "flex-1 min-w-20 border-none outline-none bg-transparent",
    "font-primary text-body-md font-normal text-content-primary p-0",
    "placeholder:text-content-tertiary",
    "disabled:cursor-not-allowed disabled:text-content-tertiary",
  ].join(" "),

  actions: "flex items-center gap-2 flex-shrink-0",

  action: [
    "flex items-center justify-center size-4 p-0",
    "border-none bg-transparent text-content-secondary cursor-pointer",
    "transition-colors duration-fast",
    "hover:not-disabled:text-content-primary",
    "disabled:text-content-tertiary disabled:cursor-not-allowed",
  ].join(" "),

  chevron: "transition-transform duration-fast",
  chevronOpen: "rotate-180",

  helper: "flex items-start gap-1",
  helperIcon: "flex-shrink-0 size-4 text-content-negative",
  helperText: "font-primary text-body-caption text-content-secondary",
  helperTextError: "text-content-negative",
};

// ─────────────────────────────────────────────
// CHIP INPUT LABEL
// ─────────────────────────────────────────────

export const ChipInputLabel = ({ children, required = false, className }) => {
  return (
    <div className={cx(styles.label, className)}>
      <span className={styles.labelText}>{children}</span>
      {required && <span className={styles.labelRequired}>*</span>}
    </div>
  );
};

ChipInputLabel.displayName = "ChipInputLabel";

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
 *
 * @example
 * <ChipInput
 *   label="Tags"
 *   required
 *   placeholder="Search for tags"
 *   chips={[
 *     { id: '1', label: 'React', color: CHIP_COLORS.blue },
 *     { id: '2', label: 'TypeScript', color: CHIP_COLORS.skyblue },
 *   ]}
 *   onChange={setChips}
 * />
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
      disabled, // Support legacy prop
      error = false,
      helperText,
      showClear = true,
      showDropdown = true,
      isOpen = false,
      onClear,
      onDropdownClick,
      onChipRemove,
      onKeyDown,
      className,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef(null);
    const [internalInputValue, setInternalInputValue] = useState("");

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
      // Remove last chip on backspace if input is empty
      if (e.key === "Backspace" && currentInputValue === "" && chips.length > 0) {
        const lastChip = chips[chips.length - 1];
        handleChipRemove(lastChip.id);
      }

      onKeyDown?.(e);
    };

    const containerClasses = cx(
      styles.container,
      styles.containerHover,
      styles.containerFocus,
      isInputDisabled && styles.containerDisabled,
      error && styles.containerError,
      !hasChips && styles.containerEmpty
    );

    const chevronClasses = cx(styles.chevron, isOpen && styles.chevronOpen);

    return (
      <div className={cx(styles.wrapper, className)} ref={ref} {...props}>
        {label && <ChipInputLabel required={required}>{label}</ChipInputLabel>}

        <div
          className={containerClasses}
          onClick={handleContainerClick}
          data-error={error || undefined}
        >
          <div className={styles.content}>
            {hasChips && (
              <div className={styles.chips}>
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
                className={styles.input}
                placeholder={!hasChips ? placeholder : ""}
                value={currentInputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                disabled={isInputDisabled}
                aria-invalid={error || undefined}
              />
            )}
          </div>

          <div className={styles.actions}>
            {showClear && hasChips && !isInputDisabled && (
              <button
                type="button"
                className={styles.action}
                onClick={handleClear}
                disabled={isInputDisabled}
                aria-label="Clear all"
              >
                <Icon name="XCircle" variant="solid" size="sm" />
              </button>
            )}

            {showDropdown && (
              <button
                type="button"
                className={cx(styles.action, chevronClasses)}
                onClick={handleDropdownClick}
                disabled={isInputDisabled}
                aria-label={isOpen ? "Close dropdown" : "Open dropdown"}
              >
                <Icon name="ChevronDown" size="sm" />
              </button>
            )}
          </div>
        </div>

        {helperText && (
          <div className={styles.helper}>
            {error && (
              <span className={styles.helperIcon}>
                <Icon name="ExclamationCircle" variant="solid" size="sm" />
              </span>
            )}
            <span className={cx(styles.helperText, error && styles.helperTextError)}>
              {helperText}
            </span>
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
 * Handles filtering, selection, and chip creation from suggestions.
 *
 * @param {string} label - Label text above the input
 * @param {boolean} required - Shows required asterisk
 * @param {string} placeholder - Placeholder text when empty
 * @param {array} chips - Array of chip objects: { id, label, color? }
 * @param {function} onChange - Called when chips array changes
 * @param {array} suggestions - Array of suggestion objects: { id, label, color? }
 * @param {boolean} isDisabled - Disables the input
 * @param {boolean} error - Shows error state
 * @param {string} helperText - Helper text below the input
 * @param {boolean} allowCreate - Allow creating new chips from input
 * @param {string} createLabel - Label for create action
 * @param {string} className - Additional CSS classes
 */
export const ChipInputWithSuggestions = ({
  label,
  required = false,
  placeholder = "Search for tags",
  chips = [],
  onChange,
  suggestions = [],
  isDisabled = false,
  disabled, // Support legacy prop
  error = false,
  helperText,
  allowCreate = false,
  createLabel = "Create",
  className,
  ...props
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const isInputDisabled = isDisabled || disabled;

  // Filter suggestions based on input and already selected chips
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

      // Check if there's a matching suggestion
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
    <div className={className}>
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

      {/* Dropdown would go here - can be implemented with DropdownList molecule */}
    </div>
  );
};

ChipInputWithSuggestions.displayName = "ChipInputWithSuggestions";

export default ChipInput;
