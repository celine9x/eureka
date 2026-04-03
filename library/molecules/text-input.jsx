/**
 * TextInput Component (Molecule)
 *
 * A complete text input with label, input field, and helper/error text.
 * Uses Tailwind CSS with design tokens and react-aria-components for accessibility.
 */

import React, { useId, forwardRef } from "react";
import {
  TextField,
  Label as AriaLabel,
  Input as AriaInput,
  Text,
} from "react-aria-components";
import { cx } from "../utils/cx.js";
import { INPUT_STATES } from "../utils/props.js";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

/** Re-export input states */
export { INPUT_STATES };

/** Input types */
export const INPUT_TYPES = {
  text: "text",
  email: "email",
  password: "password",
  number: "number",
  tel: "tel",
  url: "url",
};

/** Helper text variants */
export const HELPER_VARIANTS = {
  default: "default",
  error: "error",
  success: "success",
};

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  field: "flex flex-col gap-1",

  label: [
    "flex items-center gap-1",
    "font-primary text-body-md font-normal text-content-primary cursor-pointer",
  ].join(" "),

  required: "text-content-negative",

  input: [
    "w-full py-2 px-3 font-primary text-body-lg font-normal text-content-primary",
    "bg-interaction-fill border border-interaction-outline rounded-md",
    "outline-none transition-all duration-fast box-border",
    "placeholder:text-content-tertiary",
    "hover:border-interaction-outline-hover",
    "focus:border-interaction-outline-active focus:shadow-focus",
    "disabled:bg-interaction-fill-disabled disabled:border-interaction-outline-disabled",
    "disabled:text-content-tertiary disabled:cursor-not-allowed",
    "read-only:bg-background-neutral-lighter",
  ].join(" "),

  inputError: [
    "border-interaction-outline-negative",
    "focus:border-interaction-outline-negative focus:shadow-[0_0_0.25rem_0_rgba(255,115,115,0.4)]",
  ].join(" "),

  inputSuccess: [
    "border-[var(--color-interaction-outline-positive)]",
    "focus:border-[var(--color-interaction-outline-positive)] focus:shadow-[0_0_0.25rem_0_rgba(115,229,172,0.4)]",
  ].join(" "),

  helper: "font-primary text-body-md font-normal",

  helperVariants: {
    default: "text-content-secondary",
    error: "text-content-negative",
    success: "text-content-positive",
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
 * @param {string} className - Additional CSS classes
 */
export const Label = ({ htmlFor, required = false, className, children, ...props }) => {
  return (
    <label htmlFor={htmlFor} className={cx(styles.label, className)} {...props}>
      {children}
      {required && <span className={styles.required}>*</span>}
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
 * @param {string} className - Additional CSS classes
 */
export const HelperText = ({
  variant = HELPER_VARIANTS.default,
  className,
  children,
  ...props
}) => {
  const classes = cx(styles.helper, styles.helperVariants[variant], className);

  return (
    <span className={classes} {...props}>
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
 * @param {boolean} error - Triggers error styling (deprecated, use state)
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} className - Additional CSS classes
 */
export const Input = forwardRef(
  ({ type = INPUT_TYPES.text, state, error = false, className, ...props }, ref) => {
    // Support both state prop and legacy error boolean
    const inputState = state || (error ? INPUT_STATES.error : INPUT_STATES.default);

    const classes = cx(
      styles.input,
      inputState === INPUT_STATES.error && styles.inputError,
      inputState === INPUT_STATES.success && styles.inputSuccess,
      className
    );

    return <input ref={ref} type={type} className={classes} {...props} />;
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
 * @param {string} className - Additional CSS classes
 *
 * @example
 * <TextInput label="Email" type="email" isRequired />
 * <TextInput label="Password" type="password" error="Required field" />
 * <TextInput label="Name" helper="Enter your full name" />
 * <TextInput label="Username" success="Username is available" />
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
      disabled, // Support legacy prop
      isRequired = false,
      required, // Support legacy prop
      isReadOnly = false,
      readOnly, // Support legacy prop
      name,
      id,
      onChange,
      onFocus,
      onBlur,
      className,
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

    return (
      <TextField
        isDisabled={fieldDisabled}
        isRequired={fieldRequired}
        isReadOnly={fieldReadOnly}
        isInvalid={hasError}
        className={cx(styles.field, className)}
        {...props}
      >
        {label && (
          <AriaLabel className={styles.label}>
            {label}
            {fieldRequired && <span className={styles.required}>*</span>}
          </AriaLabel>
        )}
        <AriaInput
          ref={ref}
          id={inputId}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={cx(
            styles.input,
            inputState === INPUT_STATES.error && styles.inputError,
            inputState === INPUT_STATES.success && styles.inputSuccess
          )}
        />
        {helperMessage && (
          <Text
            slot={hasError ? "errorMessage" : "description"}
            className={cx(styles.helper, styles.helperVariants[helperVariant])}
          >
            {helperMessage}
          </Text>
        )}
      </TextField>
    );
  }
);

TextInput.displayName = "TextInput";
TextInput.types = INPUT_TYPES;
TextInput.states = INPUT_STATES;

export default TextInput;
