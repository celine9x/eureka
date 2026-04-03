/**
 * Textarea Component (Molecule)
 *
 * A complete textarea with label, textarea field, and helper/error text.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <Textarea label="Description" isRequired />
 * <Textarea label="Notes" helper="Additional information" />
 * <Textarea label="Comments" error="This field is required" />
 */

import { useState, useId, forwardRef } from "react";
import { Icon } from "../atoms/icon.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const TEXTAREA_STATES = {
  default: "default",
  error: "error",
  success: "success",
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
    width: "100%",
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

  fieldWrapper: {
    position: "relative",
    width: "100%",
  },

  textarea: {
    width: "100%",
    minHeight: 64,
    padding: "6px 6px",
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
    boxShadow: "var(--shadow-light-down)",
    transition: "all var(--transition-fast)",
    resize: "vertical",
  },

  textareaHover: {
    outlineColor: "var(--color-interaction-outline-hover)",
    boxShadow: "var(--shadow-medium-down)",
  },

  textareaFocus: {
    outlineColor: "var(--color-interaction-outline-active)",
    boxShadow: "var(--shadow-focus)",
  },

  textareaError: {
    outlineColor: "var(--color-interaction-outline-negative)",
  },

  textareaErrorFocus: {
    outlineColor: "var(--color-interaction-outline-negative)",
    boxShadow: "0 0 0.25rem 0 rgba(255, 115, 115, 0.4)",
  },

  textareaSuccess: {
    outlineColor: "var(--color-content-positive)",
  },

  textareaSuccessFocus: {
    outlineColor: "var(--color-content-positive)",
    boxShadow: "0 0 0.25rem 0 rgba(115, 229, 172, 0.4)",
  },

  textareaDisabled: {
    background: "var(--color-interaction-fill-disabled)",
    outlineColor: "var(--color-interaction-outline-disabled)",
    color: "var(--color-content-tertiary)",
    cursor: "not-allowed",
    resize: "none",
  },

  textareaReadOnly: {
    background: "var(--color-general-neutral-lighter)",
  },

  resizeHandle: {
    position: "absolute",
    right: 6,
    bottom: 6,
    width: 6,
    height: 6,
    pointerEvents: "none",
    color: "var(--color-content-tertiary)",
  },

  helper: {
    display: "flex",
    alignItems: "flex-start",
    gap: 4,
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
      color: "var(--color-content-secondary)",
    },
    success: {
      color: "var(--color-content-secondary)",
    },
  },

  helperIconVariants: {
    default: {
      color: "var(--color-content-informative)",
    },
    error: {
      color: "var(--color-content-negative)",
    },
    success: {
      color: "var(--color-content-positive)",
    },
  },

  helperIcon: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
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
 * @param {object} style - Additional inline styles
 */
export const TextareaLabel = ({ htmlFor, required = false, style, children, ...props }) => {
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

TextareaLabel.displayName = "TextareaLabel";

// ─────────────────────────────────────────────
// TEXTAREA HELPER TEXT COMPONENT
// ─────────────────────────────────────────────

/**
 * TextareaHelperText
 *
 * @param {string} variant - default | error | success (default: default)
 * @param {boolean} showIcon - Show helper icon (default: true)
 * @param {ReactNode} children - Helper text
 * @param {object} style - Additional inline styles
 */
export const TextareaHelperText = ({
  variant = HELPER_VARIANTS.default,
  showIcon = true,
  style,
  children,
  ...props
}) => {
  const helperStyle = {
    ...styles.helper,
    ...styles.helperVariants[variant],
    ...style,
  };

  const iconStyle = {
    ...styles.helperIcon,
    ...styles.helperIconVariants[variant],
  };

  const iconName = variant === "error" ? "ExclamationTriangle" : "InformationCircle";

  return (
    <span style={helperStyle} {...props}>
      {showIcon && (
        <span style={iconStyle}>
          <Icon name={iconName} variant="solid" size="sm" />
        </span>
      )}
      <span>{children}</span>
    </span>
  );
};

TextareaHelperText.displayName = "TextareaHelperText";
TextareaHelperText.variants = HELPER_VARIANTS;

// ─────────────────────────────────────────────
// TEXTAREA FIELD COMPONENT
// ─────────────────────────────────────────────

/**
 * TextareaField
 *
 * @param {string} state - default | error | success (default: default)
 * @param {string} value - Textarea value
 * @param {number} rows - Number of visible text lines (default: 3)
 * @param {boolean} resizable - Allow resize (default: true)
 * @param {boolean} isDisabled - Disables the textarea
 * @param {boolean} isReadOnly - Makes textarea read-only
 * @param {function} onChange - Change handler
 * @param {object} style - Additional inline styles
 */
export const TextareaField = forwardRef(
  (
    {
      state = TEXTAREA_STATES.default,
      rows = 3,
      resizable = true,
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

    const isTextareaDisabled = isDisabled || disabled;
    const isTextareaReadOnly = isReadOnly || readOnly;

    // Compose textarea styles
    const textareaStyle = {
      ...styles.textarea,
      ...(isHovered && !isTextareaDisabled && !isFocused && styles.textareaHover),
      ...(isFocused && !isTextareaDisabled && state === TEXTAREA_STATES.default && styles.textareaFocus),
      ...(state === TEXTAREA_STATES.error && !isFocused && styles.textareaError),
      ...(state === TEXTAREA_STATES.error && isFocused && styles.textareaErrorFocus),
      ...(state === TEXTAREA_STATES.success && !isFocused && styles.textareaSuccess),
      ...(state === TEXTAREA_STATES.success && isFocused && styles.textareaSuccessFocus),
      ...(isTextareaDisabled && styles.textareaDisabled),
      ...(isTextareaReadOnly && styles.textareaReadOnly),
      resize: resizable && !isTextareaDisabled ? "vertical" : "none",
      ...style,
    };

    return (
      <div style={styles.fieldWrapper}>
        <textarea
          ref={ref}
          rows={rows}
          style={textareaStyle}
          disabled={isTextareaDisabled}
          readOnly={isTextareaReadOnly}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {resizable && !isTextareaDisabled && (
          <span style={styles.resizeHandle}>
            <svg viewBox="0 0 6 6" fill="currentColor" style={{ width: "100%", height: "100%", transform: "rotate(90deg)" }}>
              <path d="M6 6L0 6L6 0L6 6Z" />
            </svg>
          </span>
        )}
      </div>
    );
  }
);

TextareaField.displayName = "TextareaField";
TextareaField.states = TEXTAREA_STATES;

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
 * @param {string} success - Success message (triggers success state)
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
 * @param {object} style - Additional inline styles
 */
export const Textarea = forwardRef(
  (
    {
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
      resizable = true,
      rows = 3,
      name,
      id,
      maxLength,
      onChange,
      onFocus,
      onBlur,
      style,
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

    // Determine state
    const hasError = !!error;
    const hasSuccess = !!success && !hasError;
    const textareaState = hasError
      ? TEXTAREA_STATES.error
      : hasSuccess
      ? TEXTAREA_STATES.success
      : TEXTAREA_STATES.default;

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
          <TextareaLabel htmlFor={textareaId} required={fieldRequired}>
            {label}
          </TextareaLabel>
        )}

        <TextareaField
          ref={ref}
          id={textareaId}
          name={name}
          placeholder={placeholder}
          value={value}
          state={textareaState}
          rows={rows}
          maxLength={maxLength}
          resizable={resizable}
          isDisabled={fieldDisabled}
          isReadOnly={fieldReadOnly}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        {helperMessage && (
          <TextareaHelperText variant={helperVariant}>{helperMessage}</TextareaHelperText>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
Textarea.states = TEXTAREA_STATES;
Textarea.helperVariants = HELPER_VARIANTS;

export default Textarea;
