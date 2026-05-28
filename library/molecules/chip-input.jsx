"use client";

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

import React, { useState, useRef, useEffect, useLayoutEffect, forwardRef } from "react";
import { Chip } from "../atoms/chip.jsx";
import { Icon } from "../atoms/icon.jsx";
import { XCircleIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import { DropdownList, DropdownSection, DropdownListItem } from "./dropdown-list.jsx";
import MiniInfobox from "./miniinfobox.jsx";
import { Portal } from "../utils/portal.jsx";

let placeholderStylesInjected = false;

const injectPlaceholderStyles = () => {
  if (placeholderStylesInjected || typeof document === "undefined") return;

  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-eureka", "chip-input-placeholder");
  styleEl.textContent = `
    .eureka-chip-input::placeholder {
      color: var(--color-content-tertiary);
      opacity: 1;
    }
  `;
  document.head.appendChild(styleEl);
  placeholderStylesInjected = true;
};

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const CHIP_COLORS = {
  skyblue: "var(--skyblue-70)",
  green: "var(--green-70)",
  yellow: "var(--yellow-80)",
  peach: "var(--peach-70)",
  red: "var(--red-70)",
  blue: "var(--blue-70)",
  purple: "var(--purple-70)",
  pink: "var(--pink-70)",
};

export const CHIP_INPUT_SIZES = {
  md: "md",
  lg: "lg",
};

export const CHIP_INPUT_MINIINFOBOX_TYPES = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
  neutral: "neutral",
  ai: "ai",
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  wrapper: {
    display: "inline-flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
    width: "100%",
  },

  label: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
  },

  labelText: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-primary)",
  },

  labelRequired: {
    color: "var(--color-content-negative)",
  },

  containerSizes: {
    md: {
      minHeight: 40,
      padding: "var(--spacing-xs) var(--spacing-3)",
    },
    lg: {
      minHeight: 48,
      padding: "var(--spacing-xs) var(--spacing-3)",
    },
  },

  containerEmptySizes: {
    md: {
      padding: "0 var(--spacing-3)",
    },
    lg: {
      padding: "0 var(--spacing-3)",
    },
  },

  container: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
    padding: "var(--spacing-xs) var(--spacing-sm)",
    minHeight: 32,
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-md)",
    outline: "1px solid var(--color-interaction-outline-enabled)",
    outlineColor: "var(--color-interaction-outline-enabled)",
    outlineOffset: "-1px",
    boxShadow: "var(--shadow-light-down)",
    transition: "all var(--transition-fast)",
    boxSizing: "border-box",
  },

  containerHover: {
    outlineColor: "var(--color-interaction-outline-hover)",
    boxShadow: "var(--shadow-light-up)",
  },

  containerFocus: {
    outlineColor: "var(--color-interaction-outline-active)",
    boxShadow: "var(--shadow-focus)",
  },

  containerDisabled: {
    background: "var(--color-general-neutral-light)",
    outlineColor: "var(--color-interaction-outline-disabled)",
    cursor: "not-allowed",
  },

  containerError: {
    outlineColor: "var(--color-interaction-outline-negative)",
  },

  containerEmpty: {
    padding: "var(--spacing-1-5) var(--spacing-2)",
  },

  content: {
    flex: 1,
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    gap: "var(--spacing-sm)",
  },

  chips: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
    gap: "var(--spacing-sm)",
  },

  input: {
    flex: 1,
    minWidth: 80,
    border: "none",
    outline: "none",
    background: "transparent",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-primary)",
    padding: 0,
  },

  inputSizes: {
    md: {
      fontSize: "var(--text-body-lg)",
      lineHeight: "var(--line-height-body-lg)",
    },
    lg: {
      fontSize: "var(--text-body-lg)",
      lineHeight: "var(--line-height-body-lg)",
    },
  },

  inputDisabled: {
    cursor: "not-allowed",
    color: "var(--color-content-tertiary)",
  },

  actions: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
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
    gap: "var(--spacing-xs)",
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
 */
export const ChipInput = forwardRef(
  (
    {
      size = CHIP_INPUT_SIZES.md,
      label,
      required = false,
      placeholder = "Search for tags",
      chips = [],
      onChange,
      onInputChange,
      inputValue,
      isDisabled = false,
      disabled,
      showMiniInfobox = false,
      miniInfoboxType = CHIP_INPUT_MINIINFOBOX_TYPES.info,
      miniInfoboxMessage,
      error = false,
      success = false,
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
    injectPlaceholderStyles();

    const inputRef = useRef(null);
    const [internalInputValue, setInternalInputValue] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isInputDisabled = isDisabled || disabled;
    const controlledInput = inputValue !== undefined;
    const currentInputValue = controlledInput ? inputValue : internalInputValue;
    const hasChips = chips.length > 0;
    const normalizedSize = styles.containerSizes[size] ? size : CHIP_INPUT_SIZES.md;

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
      ...styles.containerSizes[normalizedSize],
      ...(isHovered && !isInputDisabled && !isFocused && styles.containerHover),
      ...(isFocused && !isInputDisabled && !error && styles.containerFocus),
      ...(isInputDisabled && styles.containerDisabled),
      ...(error && styles.containerError),
      ...(!hasChips && styles.containerEmpty),
      ...(!hasChips && styles.containerEmptySizes[normalizedSize]),
    };

    // Input styles
    const inputStyle = {
      ...styles.input,
      ...styles.inputSizes[normalizedSize],
      ...(isInputDisabled && styles.inputDisabled),
    };

    const hasError = !!error;
    const hasSuccess = !!success && !hasError;
    const normalizedMiniInfoboxType =
      CHIP_INPUT_MINIINFOBOX_TYPES[miniInfoboxType]
        ? miniInfoboxType
        : CHIP_INPUT_MINIINFOBOX_TYPES.info;
    const legacyMiniInfoboxType = hasError
      ? CHIP_INPUT_MINIINFOBOX_TYPES.error
      : hasSuccess
      ? CHIP_INPUT_MINIINFOBOX_TYPES.success
      : CHIP_INPUT_MINIINFOBOX_TYPES.info;
    const shouldShowMiniInfobox = showMiniInfobox || !!helperText;
    const resolvedMiniInfoboxType = showMiniInfobox
      ? normalizedMiniInfoboxType
      : legacyMiniInfoboxType;
    const resolvedMiniInfoboxMessage = miniInfoboxMessage || helperText;

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
                    icon={chip.icon}
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
                className="eureka-chip-input"
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

        {shouldShowMiniInfobox && resolvedMiniInfoboxMessage && (
          <MiniInfobox variant={resolvedMiniInfoboxType} message={resolvedMiniInfoboxMessage} />
        )}
      </div>
    );
  }
);

ChipInput.displayName = "ChipInput";
ChipInput.sizes = CHIP_INPUT_SIZES;

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
  onSelectSuggestion,
  suggestions = [],
  isDisabled = false,
  disabled,
  showMiniInfobox = false,
  miniInfoboxType = CHIP_INPUT_MINIINFOBOX_TYPES.info,
  miniInfoboxMessage,
  error = false,
  success = false,
  helperText,
  allowCreate = false,
  createLabel = "Create",
  style,
  ...props
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [rect, setRect] = useState(null);
  const wrapperRef = useRef(null);
  const dropdownRef = useRef(null);

  const isInputDisabled = isDisabled || disabled;

  const filteredSuggestions = suggestions.filter((suggestion) => {
    const isAlreadySelected = chips.some((chip) => chip.id === suggestion.id);
    const matchesSearch = suggestion.label.toLowerCase().includes(inputValue.toLowerCase());
    return !isAlreadySelected && matchesSearch;
  });

  const handleInputChange = (value) => {
    setInputValue(value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    if (onSelectSuggestion) {
      onSelectSuggestion(suggestion);
    } else {
      const newChips = [...chips, suggestion];
      onChange?.(newChips);
    }
    setInputValue("");
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

  useLayoutEffect(() => {
    if (!isOpen || !wrapperRef.current) return;
    setRect(wrapperRef.current.getBoundingClientRect());
  }, [isOpen, inputValue, chips]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      const inWrapper = wrapperRef.current?.contains(e.target);
      const inDropdown = dropdownRef.current?.contains(e.target);
      if (!inWrapper && !inDropdown) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const showSuggestions = isOpen && filteredSuggestions.length > 0 && rect;

  return (
    <div ref={wrapperRef} style={{ ...style, position: "relative" }}>
      <ChipInput
        label={label}
        required={required}
        placeholder={placeholder}
        chips={chips}
        onChange={onChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        isDisabled={isInputDisabled}
        showMiniInfobox={showMiniInfobox}
        miniInfoboxType={miniInfoboxType}
        miniInfoboxMessage={miniInfoboxMessage}
        error={error}
        success={success}
        helperText={helperText}
        isOpen={isOpen}
        onDropdownClick={handleDropdownClick}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        showDropdown={!isInputDisabled}
        {...props}
      />

      {showSuggestions && (
        <Portal>
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: rect.bottom + 4,
              left: rect.left,
              width: rect.width,
              zIndex: 9999,
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              boxShadow: "var(--shadow-medium-down)",
            }}
          >
            <DropdownList noSearch noAdd style={{ outline: "none", boxShadow: "none" }}>
              <DropdownSection style={{ padding: "var(--spacing-2) 0" }}>
                {filteredSuggestions.map((suggestion) => (
                  <DropdownListItem
                    key={suggestion.id}
                    value={suggestion.id}
                    noCheckbox
                    subinfo={suggestion.subinfo}
                    icon={suggestion.icon}
                    onMouseDown={(e) => e.preventDefault()}
                    onChange={() => handleSelectSuggestion(suggestion)}
                  >
                    {suggestion.label}
                  </DropdownListItem>
                ))}
              </DropdownSection>
            </DropdownList>
          </div>
        </Portal>
      )}
    </div>
  );
};

ChipInputWithSuggestions.displayName = "ChipInputWithSuggestions";

ChipInput.Label = ChipInputLabel;
ChipInput.WithSuggestions = ChipInputWithSuggestions;
ChipInput.Chip = Chip;
ChipInput.Icon = Icon;

export default ChipInput;
