"use client";

/**
 * TextInput Component (Molecule)
 *
 * A complete text input with label, input field, and helper/error text.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <TextInput label="Email" type="email" isRequired />
 * <TextInput label="Password" type="password" error="Required field" />
 * <TextInput label="Name" helper="Enter your full name" />
 */

import { useState, useId, forwardRef } from "react";
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

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

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
    // sm → 32px height
    sm: {
      height: 32,
      padding: "0 var(--spacing-3)",
      fontSize: "var(--text-body-md)",
      lineHeight: "var(--line-height-body-md)",
    },
    // md → 40px height
    md: {
      height: 40,
      padding: "0 var(--spacing-3)",
      fontSize: "var(--text-body-lg)",
      lineHeight: "var(--line-height-body-lg)",
    },
    // lg → 48px height
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

  helper: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-md)",
  },

  helperVariants: {
    default: {
      color: "var(--color-content-secondary)",
    },
    error: {
      color: "var(--color-content-negative)",
    },
    success: {
      color: "var(--color-content-positive)",
    },
  },
};

// ─────────────────────────────────────────────
// LABEL COMPONENT
// ─────────────────────────────────────────────

/**
 * Label
 *
 */
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

// ─────────────────────────────────────────────
// HELPER TEXT COMPONENT
// ─────────────────────────────────────────────

/**
 * HelperText
 *
 */
export const HelperText = ({
  variant = HELPER_VARIANTS.default,
  style,
  children,
  ...props
}) => {
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

// ─────────────────────────────────────────────
// INPUT COMPONENT
// ─────────────────────────────────────────────

/**
 * Input
 *
 */
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
      ...props
    },
    ref
  ) => {
    injectPlaceholderStyles();

    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isInputDisabled = isDisabled || disabled;
    const isInputReadOnly = isReadOnly || readOnly;

    // Compose input styles
    const inputStyle = {
      ...styles.input,
      ...styles.inputSizes[size] || styles.inputSizes.md,
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

    if (iconLeading) {
      return (
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <span style={{
            position: "absolute",
            left: 10,
            display: "flex",
            alignItems: "center",
            color: "var(--color-content-tertiary)",
            pointerEvents: "none",
          }}>
            {iconLeading}
          </span>
          <input
            ref={ref}
            type={type}
            className="eureka-text-input"
            style={{ ...inputStyle, width: "100%" }}
            disabled={isInputDisabled}
            readOnly={isInputReadOnly}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
        </div>
      );
    }

    return (
      <input
        ref={ref}
        type={type}
        className="eureka-text-input"
        style={inputStyle}
        disabled={isInputDisabled}
        readOnly={isInputReadOnly}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
Input.types = INPUT_TYPES;
Input.states = INPUT_STATES;
Input.sizes = INPUT_SIZES;
// ─────────────────────────────────────────────

/**
 * TextInput
 *
 * A complete text input field with label and helper text.
 *
 */
export const TextInput = forwardRef(
  (
    {
      type = INPUT_TYPES.text,
      size = INPUT_SIZES.md,
      label,
      placeholder,
      value,
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
      style,
      multiline: _multiline,
      rows: _rows,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    // Support legacy props
    const fieldDisabled = isDisabled || disabled;
    const fieldRequired = isRequired || required;
    const fieldReadOnly = isReadOnly || readOnly;

    // Determine state
    const hasError = !!error;
    const hasSuccess = !!success && !hasError;
    const inputState = hasError
      ? INPUT_STATES.error
      : hasSuccess
      ? INPUT_STATES.success
      : INPUT_STATES.default;

    // Determine helper text and variant
    const helperMessage = error || success || helper;
    const helperVariant = hasError
      ? HELPER_VARIANTS.error
      : hasSuccess
      ? HELPER_VARIANTS.success
      : HELPER_VARIANTS.default;

    const fieldStyle = {
      ...styles.field,
      ...style,
    };

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
);

TextInput.displayName = "TextInput";
TextInput.types = INPUT_TYPES;
TextInput.states = INPUT_STATES;
TextInput.sizes = INPUT_SIZES;
TextInput.Label = Label;
TextInput.Input = Input;
TextInput.HelperText = HelperText;

export default TextInput;
