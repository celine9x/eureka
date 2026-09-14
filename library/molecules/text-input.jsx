"use client";

/**
 * TextInput Component (Molecule)
 *
 * A complete text input with label, input field, and helper/error text.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 */

import { useState, useEffect, useId, useRef, forwardRef } from "react";
import { DropdownList, DropdownSection, DropdownListItem } from "./dropdown-list.jsx";
import { Icon } from "../atoms/icon.jsx";
import MiniInfobox from "./miniinfobox.jsx";

let placeholderStylesInjected = false;

const injectPlaceholderStyles = () => {
  if (placeholderStylesInjected || typeof document === "undefined") return;

  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-eureka", "text-input-placeholder");
  styleEl.textContent = `
    .eureka-text-input::placeholder {
      color: var(--color-content-tertiary);
      opacity: 1;
    }
  `;
  document.head.appendChild(styleEl);
  placeholderStylesInjected = true;
};

export const INPUT_STATES = {
  default: "default",
  error: "error",
  success: "success",
};

export const INPUT_TYPES = {
  text: "text",
  email: "email",
  password: "password",
  number: "number",
  tel: "tel",
  url: "url",
};

export const INPUT_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

export const HELPER_VARIANTS = {
  default: "default",
  error: "error",
  success: "success",
};

const styles = {
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-md)",
    color: "var(--color-content-primary)",
    cursor: "pointer",
  },
  required: {
    color: "var(--color-content-negative)",
  },
  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "100%",
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-primary)",
    background: "var(--color-interaction-fill-enabled)",
    border: "none",
    borderRadius: "var(--radius-md)",
    outlineStyle: "solid",
    outlineWidth: "1px",
    outlineColor: "var(--color-interaction-outline-enabled)",
    outlineOffset: "-1px",
    boxSizing: "border-box",
    transition: "all var(--transition-fast)",
  },
  inputSizes: {
    sm: {
      height: 32,
      padding: "0 var(--spacing-3)",
      fontSize: "var(--text-body-md)",
      lineHeight: "var(--line-height-body-md)",
    },
    md: {
      height: 40,
      padding: "0 var(--spacing-3)",
      fontSize: "var(--text-body-lg)",
      lineHeight: "var(--line-height-body-lg)",
    },
    lg: {
      height: 48,
      padding: "0 var(--spacing-3)",
      fontSize: "var(--text-body-lg)",
      lineHeight: "var(--line-height-body-lg)",
    },
  },
  inputHover: {
    outlineColor: "var(--color-interaction-outline-hover)",
  },
  inputFocus: {},
  inputError: {
    outlineColor: "var(--color-interaction-outline-negative)",
  },
  inputErrorFocus: {
    outlineColor: "var(--color-interaction-outline-negative)",
  },
  inputSuccess: {
    outlineColor: "var(--color-content-positive)",
  },
  inputSuccessFocus: {
    outlineColor: "var(--color-content-positive)",
  },
  inputDisabled: {
    background: "var(--color-interaction-fill-disabled)",
    outlineColor: "var(--color-interaction-outline-disabled)",
    color: "var(--color-content-tertiary)",
    cursor: "not-allowed",
  },
  inputReadOnly: {
    background: "var(--color-general-neutral-lighter)",
  },
  dropdownTrigger: {
    position: "relative",
    width: "100%",
  },
  dropdownTriggerInput: {
    cursor: "pointer",
    paddingRight: "var(--spacing-8)",
  },
  dropdownTriggerChevron: {
    position: "absolute",
    right: "var(--spacing-3)",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-secondary)",
    pointerEvents: "none",
  },
  dropdownPanel: {
    position: "absolute",
    top: "calc(100% + var(--spacing-1))",
    left: 0,
    width: "100%",
    zIndex: 1000,
  },
  helper: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-md)",
  },
  helperVariants: {
    default: { color: "var(--color-content-secondary)" },
    error: { color: "var(--color-content-negative)" },
    success: { color: "var(--color-content-positive)" },
  },
};

export const Label = ({ htmlFor, required = false, style, children, ...props }) => {
  const labelStyle = {
    ...styles.label,
    ...style,
  };

  return (
    <label htmlFor={htmlFor} style={labelStyle} {...props}>
      {children}
      {required && <span style={styles.required}>*</span>}
    </label>
  );
};

Label.displayName = "Label";

export const HelperText = ({ variant = HELPER_VARIANTS.default, style, children, ...props }) => {
  const helperStyle = {
    ...styles.helper,
    ...styles.helperVariants[variant],
    ...style,
  };

  return (
    <span style={helperStyle} {...props}>
      {children}
    </span>
  );
};

HelperText.displayName = "HelperText";
HelperText.variants = HELPER_VARIANTS;

export const Input = forwardRef(
  (
    {
      type = INPUT_TYPES.text,
      size = INPUT_SIZES.md,
      state = INPUT_STATES.default,
      isDisabled = false,
      disabled,
      isReadOnly = false,
      readOnly,
      iconLeading,
      style,
      onFocus,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      onKeyDown,
      onClick,
      ...props
    },
    ref
  ) => {
    injectPlaceholderStyles();

    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isInputDisabled = isDisabled || disabled;
    const isInputReadOnly = isReadOnly || readOnly;

    const inputStyle = {
      ...styles.input,
      ...(styles.inputSizes[size] || styles.inputSizes.md),
      ...(iconLeading && { paddingLeft: 36 }),
      ...(isHovered && !isInputDisabled && !isFocused && styles.inputHover),
      ...(isFocused && !isInputDisabled && state === INPUT_STATES.default && styles.inputFocus),
      ...(state === INPUT_STATES.error && !isFocused && styles.inputError),
      ...(state === INPUT_STATES.error && isFocused && styles.inputErrorFocus),
      ...(state === INPUT_STATES.success && !isFocused && styles.inputSuccess),
      ...(state === INPUT_STATES.success && isFocused && styles.inputSuccessFocus),
      ...(isInputDisabled && styles.inputDisabled),
      ...(isInputReadOnly && styles.inputReadOnly),
      ...style,
    };

    const handleMouseEnter = (event) => {
      setIsHovered(true);
      onMouseEnter?.(event);
    };

    const handleMouseLeave = (event) => {
      setIsHovered(false);
      onMouseLeave?.(event);
    };

    const handleFocus = (event) => {
      setIsFocused(true);
      onFocus?.(event);
    };

    const handleBlur = (event) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    const inputElement = (
      <input
        ref={ref}
        type={type}
        className="eureka-text-input"
        style={inputStyle}
        disabled={isInputDisabled}
        readOnly={isInputReadOnly}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
        onClick={onClick}
        {...props}
      />
    );

    if (iconLeading) {
      return (
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <span
            style={{
              position: "absolute",
              left: 10,
              display: "flex",
              alignItems: "center",
              color: "var(--color-content-tertiary)",
              pointerEvents: "none",
            }}
          >
            {iconLeading}
          </span>
          {inputElement}
        </div>
      );
    }

    return inputElement;
  }
);

Input.displayName = "Input";
Input.types = INPUT_TYPES;
Input.states = INPUT_STATES;
Input.sizes = INPUT_SIZES;

export const TextInput = forwardRef(
  (
    {
      type = INPUT_TYPES.text,
      size = INPUT_SIZES.md,
      label,
      placeholder,
      value,
      defaultValue = "",
      helper,
      error,
      success,
      isDisabled = false,
      disabled,
      isRequired = false,
      required,
      isReadOnly = false,
      readOnly,
      name,
      id,
      onChange,
      onFocus,
      onBlur,
      iconLeading,
      menuItems = [],
      menuSections = [],
      onSelect,
      onOpenChange,
      style,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const fieldDisabled = isDisabled || disabled;
    const fieldRequired = isRequired || required;
    const hasDropdown = menuItems.length > 0 || menuSections.length > 0;
    const fieldReadOnly = isReadOnly || readOnly;

    const hasError = !!error;
    const hasSuccess = !!success && !hasError;
    const inputState = hasError
      ? INPUT_STATES.error
      : hasSuccess
      ? INPUT_STATES.success
      : INPUT_STATES.default;

    const helperMessage = error || success || helper;

    const [dropdownValue, setDropdownValue] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    const displayValue = hasDropdown ? "" : (value !== undefined ? value : dropdownValue);

    const fieldStyle = {
      ...styles.field,
      ...style,
    };

    useEffect(() => {
      if (!hasDropdown || !isOpen) return;

      const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          setIsOpen(false);
          onOpenChange?.(false);
        }
      };

      const handleEscape = (event) => {
        if (event.key === "Escape") {
          setIsOpen(false);
          onOpenChange?.(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }, [hasDropdown, isOpen, onOpenChange]);

    const handleSelect = (item) => {
      const nextValue = item?.label ?? item?.value ?? "";

      if (value === undefined) {
        setDropdownValue(nextValue);
      }

      onSelect?.(item);
      setIsOpen(false);
      onOpenChange?.(false);
    };

    const toggleOpen = () => {
      const nextOpen = !isOpen;
      setIsOpen(nextOpen);
      onOpenChange?.(nextOpen);
    };

    const renderMenuItem = (item, index) => (
      <DropdownListItem
        key={item.id || item.value || item.label || index}
        noCheckbox
        active={item.active || displayValue === (item.label ?? item.value)}
        isDisabled={item.disabled}
        onChange={() => handleSelect(item)}
      >
        {item.label}
      </DropdownListItem>
    );

    const renderDropdownContent = () => (
      <div style={styles.dropdownPanel}>
        <DropdownList noAdd style={{ width: "100%" }}>
          {menuSections.length > 0
            ? menuSections.map((section, sectionIndex) => (
                <DropdownSection
                  key={section.id || section.title || sectionIndex}
                  title={section.title}
                  collapsible={section.collapsible}
                  defaultExpanded={section.defaultExpanded}
                >
                  {(section.items || []).map(renderMenuItem)}
                </DropdownSection>
              ))
            : (
              <DropdownSection>
                {menuItems.map(renderMenuItem)}
              </DropdownSection>
            )}
        </DropdownList>
      </div>
    );

    if (!hasDropdown) {
      return (
        <div style={fieldStyle} {...props}>
          {label && (
            <Label htmlFor={inputId} required={fieldRequired}>
              {label}
            </Label>
          )}

          <Input
            ref={ref}
            id={inputId}
            type={type}
            size={size}
            name={name}
            placeholder={placeholder}
            value={value}
            state={inputState}
            isDisabled={fieldDisabled}
            isReadOnly={fieldReadOnly}
            iconLeading={iconLeading}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />

          {helperMessage && (
            hasError
              ? <MiniInfobox variant="error" message={helperMessage} />
              : hasSuccess
              ? <MiniInfobox variant="success" message={helperMessage} />
              : <MiniInfobox variant="info" message={helperMessage} />
          )}
        </div>
      );
    }

    return (
      <div ref={wrapperRef} style={fieldStyle} {...props}>
        {label && (
          <Label htmlFor={inputId} required={fieldRequired}>
            {label}
          </Label>
        )}

        <div style={{ ...styles.inputWrapper, ...styles.dropdownTrigger }}>
          <Input
            ref={ref}
            id={inputId}
            type={type}
            size={size}
            name={name}
            placeholder={placeholder}
            value={displayValue}
            state={inputState}
            isDisabled={fieldDisabled}
            isReadOnly={fieldReadOnly}
            iconLeading={iconLeading}
            tabIndex={-1}
            onClick={fieldDisabled ? undefined : toggleOpen}
            onKeyDown={(event) => {
              if (fieldDisabled) return;
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleOpen();
              }
            }}
            style={{ ...styles.dropdownTriggerInput, cursor: fieldDisabled ? "not-allowed" : "pointer" }}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <span style={styles.dropdownTriggerChevron}>
            <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size="sm" />
          </span>

          {isOpen && renderDropdownContent()}
        </div>

        {helperMessage && (
          hasError
            ? <MiniInfobox variant="error" message={helperMessage} />
            : hasSuccess
            ? <MiniInfobox variant="success" message={helperMessage} />
            : <MiniInfobox variant="info" message={helperMessage} />
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
TextInput.types = INPUT_TYPES;
TextInput.states = INPUT_STATES;
TextInput.sizes = INPUT_SIZES;
TextInput.Label = Label;
TextInput.Input = Input;
TextInput.HelperText = HelperText;

export default TextInput;
