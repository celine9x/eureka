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
    gap: 4,
  },

  label: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: 400,
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
    padding: "8px 12px",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    fontWeight: 400,
    lineHeight: "var(--line-height-body-lg)",
    color: "var(--color-content-primary)",
    background: "var(--color-interaction-fill-enabled)",
    border: "none",
    borderRadius: "var(--radius-md)",
    outline: "1px solid var(--color-interaction-outline-enabled)",
    outlineOffset: "-1px",
    boxSizing: "border-box",
    transition: "all var(--transition-fast)",
  },

  inputHover: {
    outlineColor: "var(--color-interaction-outline-hover)",
  },

  inputFocus: {
    outlineColor: "var(--color-interaction-outline-active)",
    boxShadow: "var(--shadow-focus)",
  },

  inputError: {
    outlineColor: "var(--color-interaction-outline-negative)",
  },

  inputErrorFocus: {
    outlineColor: "var(--color-interaction-outline-negative)",
    boxShadow: "0 0 0.25rem 0 rgba(255, 115, 115, 0.4)",
  },

  inputSuccess: {
    outlineColor: "var(--color-content-positive)",
  },

  inputSuccessFocus: {
    outlineColor: "var(--color-content-positive)",
    boxShadow: "0 0 0.25rem 0 rgba(115, 229, 172, 0.4)",
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
    fontWeight: 400,
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
 * @param {string} htmlFor - Input id to link
 * @param {boolean} required - Shows * indicator
 * @param {ReactNode} children - Label text
 * @param {object} style - Additional inline styles
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
 * @param {string} variant - default | error | success (default: default)
 * @param {ReactNode} children - Helper text
 * @param {object} style - Additional inline styles
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
 * @param {string} type - text | email | password | number | tel | url (default: text)
 * @param {string} state - default | error | success (default: default)
 * @param {boolean} isDisabled - Disables the input
 * @param {boolean} isReadOnly - Makes input read-only
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {object} style - Additional inline styles
 */
export const Input = forwardRef(
  (
    {
      type = INPUT_TYPES.text,
      state = INPUT_STATES.default,
      isDisabled = false,
      disabled,
      isReadOnly = false,
      readOnly,
      style,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isInputDisabled = isDisabled || disabled;
    const isInputReadOnly = isReadOnly || readOnly;

    // Compose input styles
    const inputStyle = {
      ...styles.input,
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

    return (
      <input
        ref={ref}
        type={type}
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

// ─────────────────────────────────────────────
// TEXT INPUT COMPONENT (MOLECULE)
// ─────────────────────────────────────────────

/**
 * TextInput
 *
 * A complete text input field with label and helper text.
 *
 * @param {string} type - text | email | password | number | tel | url (default: text)
 * @param {string} label - Label text above input
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Input value
 * @param {string} helper - Helper text below input
 * @param {string} error - Error message (triggers error state)
 * @param {string} success - Success message (triggers success state)
 * @param {boolean} isDisabled - Disables the input
 * @param {boolean} isRequired - Shows required indicator
 * @param {boolean} isReadOnly - Makes input read-only
 * @param {string} name - Input name for forms
 * @param {string} id - Input id
 * @param {function} onChange - Change handler
 * @param {function} onFocus - Focus handler
 * @param {function} onBlur - Blur handler
 * @param {object} style - Additional inline styles
 */
export const TextInput = forwardRef(
  (
    {
      type = INPUT_TYPES.text,
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
      style,
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
          name={name}
          placeholder={placeholder}
          value={value}
          state={inputState}
          isDisabled={fieldDisabled}
          isReadOnly={fieldReadOnly}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        {helperMessage && (
          <HelperText variant={helperVariant}>{helperMessage}</HelperText>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
TextInput.types = INPUT_TYPES;
TextInput.states = INPUT_STATES;

export default TextInput;
