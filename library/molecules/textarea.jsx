/**
 * Textarea Component (Molecule)
 *
 * A complete textarea with label, textarea field, and helper/error text.
 * Uses Tailwind CSS with design tokens and react-aria-components for accessibility.
 */

import React, { useId, forwardRef } from "react";
import {
  TextField,
  Label as AriaLabel,
  TextArea as AriaTextArea,
  Text,
} from "react-aria-components";
import { cx } from "../utils/cx.js";
import { INPUT_STATES } from "../utils/props.js";
import { Icon } from "../atoms/icon.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

/** Re-export input states */
export { INPUT_STATES };

/** Helper text variants */
export const TEXTAREA_HELPER_VARIANTS = {
  default: "default",
  error: "error",
};

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  container: "flex flex-col gap-2 w-full",

  inputGroup: "flex flex-col gap-1",

  label: [
    "flex items-center gap-0",
    "font-primary text-body-md font-normal text-content-primary cursor-pointer",
  ].join(" "),

  required: "text-content-negative",

  fieldWrapper: "relative w-full",

  textarea: [
    "w-full min-h-16 py-1.5 px-1.5",
    "font-primary text-body-lg font-normal text-content-primary",
    "bg-interaction-fill border border-interaction-outline rounded-md",
    "outline-none transition-all duration-fast box-border resize-y",
    "shadow-light-down",
    "placeholder:text-content-tertiary",
    "hover:not-disabled:not-[data-error]:border-interaction-outline-hover hover:not-disabled:not-[data-error]:shadow-medium-down",
    "focus:not-[data-error]:border-interaction-outline-active focus:not-[data-error]:shadow-focus",
    "disabled:bg-interaction-fill-disabled disabled:border-interaction-outline-disabled",
    "disabled:text-content-tertiary disabled:cursor-not-allowed disabled:resize-none",
    "read-only:bg-background-neutral-lighter",
  ].join(" "),

  textareaError: [
    "border-interaction-outline-negative",
    "focus:border-interaction-outline-negative focus:shadow-[0_0_0.25rem_0_rgba(255,115,115,0.4)]",
  ].join(" "),

  resizeHandle: [
    "absolute right-1.5 bottom-1.5 w-1.5 h-1.5",
    "pointer-events-none text-content-tertiary",
  ].join(" "),

  helper: "flex items-start gap-1 font-primary text-body-md font-normal",

  helperVariants: {
    default: "text-content-secondary [&_.helper-icon]:text-content-informative",
    error: "text-content-secondary [&_.helper-icon]:text-content-negative",
  },

  helperIcon: "helper-icon flex-shrink-0 flex items-center justify-center",
};

// ─────────────────────────────────────────────
// TEXTAREA LABEL COMPONENT
// ─────────────────────────────────────────────

/**
 * TextareaLabel
 *
 * @param {string} htmlFor - Textarea id to link
 * @param {boolean} required - Shows * indicator
 * @param {ReactNode} children - Label text
 * @param {string} className - Additional CSS classes
 */
export const TextareaLabel = ({ htmlFor, required = false, className, children, ...props }) => {
  return (
    <label htmlFor={htmlFor} className={cx(styles.label, className)} {...props}>
      {children}
      {required && <span className={styles.required}>*</span>}
    </label>
  );
};

TextareaLabel.displayName = "TextareaLabel";

// ─────────────────────────────────────────────
// TEXTAREA HELPER TEXT COMPONENT
// ─────────────────────────────────────────────

/**
 * TextareaHelperText
 *
 * @param {string} variant - default | error (default: default)
 * @param {boolean} showIcon - Show helper icon (default: true)
 * @param {ReactNode} children - Helper text
 * @param {string} className - Additional CSS classes
 */
export const TextareaHelperText = ({
  variant = TEXTAREA_HELPER_VARIANTS.default,
  showIcon = true,
  className,
  children,
  ...props
}) => {
  const classes = cx(styles.helper, styles.helperVariants[variant], className);
  const iconName = variant === "error" ? "ExclamationTriangle" : "InformationCircle";

  return (
    <span className={classes} {...props}>
      {showIcon && (
        <span className={styles.helperIcon}>
          <Icon name={iconName} variant="solid" size="sm" />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};

TextareaHelperText.displayName = "TextareaHelperText";
TextareaHelperText.variants = TEXTAREA_HELPER_VARIANTS;

// ─────────────────────────────────────────────
// TEXTAREA FIELD COMPONENT
// ─────────────────────────────────────────────

/**
 * TextareaField
 *
 * @param {boolean} error - Triggers error styling
 * @param {string} value - Textarea value
 * @param {number} rows - Number of visible text lines (default: 3)
 * @param {boolean} resizable - Allow resize (default: true)
 * @param {function} onChange - Change handler
 * @param {string} className - Additional CSS classes
 */
export const TextareaField = forwardRef(
  ({ error = false, rows = 3, resizable = true, disabled = false, className, style, ...props }, ref) => {
    const classes = cx(styles.textarea, error && styles.textareaError, className);

    const combinedStyle = {
      resize: resizable && !disabled ? "vertical" : "none",
      ...style,
    };

    return (
      <div className={styles.fieldWrapper}>
        <textarea
          ref={ref}
          rows={rows}
          className={classes}
          style={combinedStyle}
          disabled={disabled}
          data-error={error || undefined}
          {...props}
        />
        {resizable && !disabled && (
          <span className={styles.resizeHandle}>
            <svg viewBox="0 0 6 6" fill="currentColor" className="w-full h-full rotate-90">
              <path d="M6 6L0 6L6 0L6 6Z" />
            </svg>
          </span>
        )}
      </div>
    );
  }
);

TextareaField.displayName = "TextareaField";

// ─────────────────────────────────────────────
// TEXTAREA COMPONENT (MOLECULE)
// ─────────────────────────────────────────────

/**
 * Textarea
 *
 * A complete textarea field with label and helper text.
 *
 * @param {string} label - Label text above textarea
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Textarea value
 * @param {string} helper - Helper text below textarea
 * @param {string} error - Error message (triggers error state)
 * @param {boolean} isDisabled - Disables the textarea
 * @param {boolean} isRequired - Shows required indicator
 * @param {boolean} isReadOnly - Makes textarea read-only
 * @param {boolean} resizable - Allow resize (default: true)
 * @param {number} rows - Number of visible text lines (default: 3)
 * @param {string} name - Textarea name for forms
 * @param {number} maxLength - Maximum character length
 * @param {function} onChange - Change handler
 * @param {function} onFocus - Focus handler
 * @param {function} onBlur - Blur handler
 *
 * @example
 * <Textarea label="Description" isRequired />
 * <Textarea label="Notes" helper="Additional information" />
 * <Textarea label="Comments" error="This field is required" />
 * <Textarea label="Bio" rows={5} maxLength={500} />
 */
export const Textarea = forwardRef(
  (
    {
      label,
      placeholder,
      value,
      helper,
      error,
      isDisabled = false,
      disabled, // Support legacy prop
      isRequired = false,
      required, // Support legacy prop
      isReadOnly = false,
      readOnly, // Support legacy prop
      resizable = true,
      rows = 3,
      name,
      id,
      maxLength,
      onChange,
      onFocus,
      onBlur,
      className,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;

    // Support legacy props
    const fieldDisabled = isDisabled || disabled;
    const fieldRequired = isRequired || required;
    const fieldReadOnly = isReadOnly || readOnly;

    const hasError = !!error;

    return (
      <TextField
        isDisabled={fieldDisabled}
        isRequired={fieldRequired}
        isReadOnly={fieldReadOnly}
        isInvalid={hasError}
        className={cx(styles.container, className)}
        {...props}
      >
        {label && (
          <AriaLabel className={styles.label}>
            {label}
            {fieldRequired && <span className={styles.required}>*</span>}
          </AriaLabel>
        )}
        <div className={styles.inputGroup}>
          <div className={styles.fieldWrapper}>
            <AriaTextArea
              ref={ref}
              id={textareaId}
              name={name}
              placeholder={placeholder}
              value={value}
              rows={rows}
              maxLength={maxLength}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              className={cx(styles.textarea, hasError && styles.textareaError)}
              style={{ resize: resizable && !fieldDisabled ? "vertical" : "none" }}
            />
            {resizable && !fieldDisabled && (
              <span className={styles.resizeHandle}>
                <svg viewBox="0 0 6 6" fill="currentColor" className="w-full h-full rotate-90">
                  <path d="M6 6L0 6L6 0L6 6Z" />
                </svg>
              </span>
            )}
          </div>
          {(error || helper) && (
            <Text
              slot={hasError ? "errorMessage" : "description"}
              className={cx(styles.helper, styles.helperVariants[hasError ? "error" : "default"])}
            >
              <span className={styles.helperIcon}>
                <Icon
                  name={hasError ? "ExclamationTriangle" : "InformationCircle"}
                  variant="solid"
                  size="sm"
                />
              </span>
              <span>{error || helper}</span>
            </Text>
          )}
        </div>
      </TextField>
    );
  }
);

Textarea.displayName = "Textarea";
Textarea.helperVariants = TEXTAREA_HELPER_VARIANTS;

export default Textarea;
