"use client";

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

import { useEffect, useLayoutEffect, useRef, useState, useId, forwardRef } from "react";
import { Icon } from "../atoms/icon.jsx";
import { Badge } from "../atoms/badge.jsx";
import { Button } from "../atoms/button.jsx";
import { Tooltip } from "../atoms/tooltip.jsx";

let placeholderStylesInjected = false;

const injectPlaceholderStyles = () => {
  if (placeholderStylesInjected || typeof document === "undefined") return;

  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-eureka", "textarea-placeholder");
  styleEl.textContent = `
    .eureka-textarea::placeholder {
      color: var(--color-content-tertiary);
      opacity: 1;
    }

    .eureka-textarea {
      scrollbar-width: none;
    }

    .eureka-textarea::-webkit-scrollbar {
      display: none;
    }

    .eureka-textarea-redline-preview ins {
      color: var(--color-content-redline-add);
      text-decoration: none;
    }

    .eureka-textarea-redline-preview del {
      color: var(--color-content-redline-delete);
      text-decoration: line-through;
    }
  `;
  document.head.appendChild(styleEl);
  placeholderStylesInjected = true;
};

// Splits into whitespace runs, word runs (letters/digits, with internal
// apostrophes kept so "Party's" stays one token), and individual punctuation
// characters. Punctuation is NOT glued to the adjacent word — otherwise
// adding a comma after "Efforts" makes the whole "Efforts,"/"Efforts" pair
// fail to match as tokens, and the diff shows the entire word as deleted
// and re-added right next to itself instead of just inserting the comma.
const tokenizeForRedline = (value = "") =>
  String(value).match(/\s+|[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*|[^\sA-Za-z0-9]/g) ?? [];

const renderRedlinePreview = (originalValue = "", proposedValue = "") => {
  const originalTokens = tokenizeForRedline(originalValue);
  const proposedTokens = tokenizeForRedline(proposedValue);
  let prefixLength = 0;
  let suffixLength = 0;

  while (prefixLength < originalTokens.length && prefixLength < proposedTokens.length && originalTokens[prefixLength] === proposedTokens[prefixLength]) {
    prefixLength += 1;
  }
  while (suffixLength < originalTokens.length - prefixLength && suffixLength < proposedTokens.length - prefixLength && originalTokens[originalTokens.length - 1 - suffixLength] === proposedTokens[proposedTokens.length - 1 - suffixLength]) {
    suffixLength += 1;
  }

  return [
    <span key="start">{originalTokens.slice(0, prefixLength).join("")}</span>,
    originalTokens.length - prefixLength - suffixLength > 0 && <del key="delete">{originalTokens.slice(prefixLength, originalTokens.length - suffixLength).join("")}</del>,
    proposedTokens.length - prefixLength - suffixLength > 0 && <ins key="add">{proposedTokens.slice(prefixLength, proposedTokens.length - suffixLength).join("")}</ins>,
    <span key="end">{suffixLength ? originalTokens.slice(originalTokens.length - suffixLength).join("") : ""}</span>,
  ];
};

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const TEXTAREA_STATES = {
  default: "default",
  error: "error",
  success: "success",
};

export const TEXTAREA_VARIANTS = {
  default: "default",
  ai: "ai",
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
    width: "100%",
  },

  label: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-md)",
    color: "var(--color-content-secondary)",
    cursor: "pointer",
  },

  required: {
    color: "var(--color-content-negative)",
  },

  fieldWrapper: {
    position: "relative",
    width: "100%",
  },

  aiContent: {
    position: "absolute",
    top: "var(--spacing-2)",
    right: "var(--spacing-2)",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "var(--spacing-2)",
    display: "inline-flex",
  },

  textarea: {
    width: "100%",
    minHeight: 64,
    padding: "var(--spacing-xs) var(--spacing-3)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-md)",
    color: "var(--color-content-primary)",
    background: "var(--color-interaction-fill-enabled)",
    border: "none",
    borderRadius: "var(--radius-md)",
    outlineStyle: "solid",
    outlineWidth: "1px",
    outlineColor: "var(--color-interaction-outline-enabled)",
    outlineOffset: "-1px",
    boxSizing: "border-box",
    boxShadow: "var(--shadow-light-down)",
    transition: "all var(--transition-fast)",
    resize: "vertical",
  },

  textareaAi: {
    paddingRight: "calc(var(--spacing-2) + var(--size-button-xs) + var(--spacing-lg))",
  },

  redlinePreview: {
    width: "100%",
    minHeight: 0,
    padding: "var(--spacing-xs) var(--spacing-3)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-md)",
    color: "var(--color-content-primary)",
    background: "var(--color-interaction-fill-enabled)",
    border: "none",
    borderRadius: "var(--radius-md)",
    outline: "1px solid var(--color-interaction-outline-enabled)",
    outlineOffset: "-1px",
    boxSizing: "border-box",
    boxShadow: "var(--shadow-light-down)",
    cursor: "text",
    whiteSpace: "pre-wrap",
  },
  redlinePreviewWrapper: {
    position: "relative",
    width: "100%",
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
    boxShadow: "var(--shadow-focus)",
  },

  textareaSuccess: {
    outlineColor: "var(--color-content-positive)",
  },

  textareaSuccessFocus: {
    outlineColor: "var(--color-content-positive)",
    boxShadow: "var(--shadow-focus)",
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

  helper: {
    display: "flex",
    alignItems: "flex-start",
    gap: "var(--spacing-xs)",
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
      variant = TEXTAREA_VARIANTS.default,
      aiValue = "",
      isAiEdited = false,
      onRevert,
      autoResize = false,
      style,
      className,
      ...props
    },
    ref
  ) => {
    injectPlaceholderStyles();

    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const internalRef = useRef(null);

    const setRefs = (node) => {
      internalRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    const isTextareaDisabled = isDisabled || disabled;
    const isTextareaReadOnly = isReadOnly || readOnly;

    useLayoutEffect(() => {
      if (!autoResize || !internalRef.current) return;
      const el = internalRef.current;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }, [autoResize, props.value]);

    // Compose textarea styles
    const textareaStyle = {
      ...styles.textarea,
      ...(variant === TEXTAREA_VARIANTS.ai && styles.textareaAi),
      ...(isHovered && !isTextareaDisabled && !isFocused && styles.textareaHover),
      ...(isFocused && !isTextareaDisabled && state === TEXTAREA_STATES.default && styles.textareaFocus),
      ...(state === TEXTAREA_STATES.error && !isFocused && styles.textareaError),
      ...(state === TEXTAREA_STATES.error && isFocused && styles.textareaErrorFocus),
      ...(state === TEXTAREA_STATES.success && !isFocused && styles.textareaSuccess),
      ...(state === TEXTAREA_STATES.success && isFocused && styles.textareaSuccessFocus),
      ...(isTextareaDisabled && styles.textareaDisabled),
      ...(isTextareaReadOnly && styles.textareaReadOnly),
      resize: autoResize ? "none" : resizable && !isTextareaDisabled ? "vertical" : "none",
      ...(autoResize && { overflow: "hidden" }),
      ...style,
    };

    return (
      <div style={styles.fieldWrapper}>
        <textarea
          ref={setRefs}
          rows={rows}
          className={className ? `eureka-textarea ${className}` : "eureka-textarea"}
          style={textareaStyle}
          disabled={isTextareaDisabled}
          readOnly={isTextareaReadOnly}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {variant === TEXTAREA_VARIANTS.ai && !(isAiEdited && isTextareaReadOnly) && (
          <div style={styles.aiContent}>
            {isAiEdited ? (
              <Tooltip content="Revert to AI">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  iconOnly
                  aria-label="Revert to AI"
                  onClick={() => onRevert?.(aiValue)}
                  iconLeading={<Icon name="ArrowPath" size="sm" />}
                />
              </Tooltip>
            ) : (
              <Badge color="ai" size="md">AI</Badge>
            )}
          </div>
        )}
      </div>
    );
  }
);

TextareaField.displayName = "TextareaField";
TextareaField.states = TEXTAREA_STATES;
TextareaField.variants = TEXTAREA_VARIANTS;

// ─────────────────────────────────────────────
// TEXTAREA COMPONENT (MOLECULE)
// ─────────────────────────────────────────────

/**
 * Textarea
 *
 * A complete textarea field with label and helper text.
 *
 */
export const Textarea = forwardRef(
  (
    {
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
      resizable = true,
      rows = 3,
      name,
      id,
      maxLength,
      onChange,
      onFocus,
      onBlur,
      variant = TEXTAREA_VARIANTS.default,
      aiValue,
      originalValue,
      showRedlinePreview = false,
      onRevert,
      style,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;
    const initialAiValue = aiValue ?? value ?? defaultValue;
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const [aiBaseline, setAiBaseline] = useState(initialAiValue);
    const [isRedlineEditing, setIsRedlineEditing] = useState(false);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : uncontrolledValue;

    useEffect(() => {
      if (aiValue !== undefined) {
        setAiBaseline(aiValue);
      }
    }, [aiValue]);

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

    const handleChange = (event) => {
      if (!isControlled) {
        setUncontrolledValue(event.target.value);
      }
      onChange?.(event);
    };

    const handleRevert = (nextValue) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onRevert?.(nextValue);
      setIsRedlineEditing(false);
    };

    const showPreview = showRedlinePreview && variant === TEXTAREA_VARIANTS.ai && !isRedlineEditing && currentValue === aiBaseline;

    return (
      <div style={fieldStyle} {...props}>
        {label && (
          <TextareaLabel htmlFor={textareaId} required={fieldRequired}>
            {label}
          </TextareaLabel>
        )}

        {showPreview ? (
          <div style={styles.redlinePreviewWrapper}>
            <div
              role="button"
              tabIndex={fieldDisabled || fieldReadOnly ? -1 : 0}
              aria-label="Edit AI suggestion"
              className="eureka-textarea-redline-preview"
              style={{ ...styles.redlinePreview, ...styles.textareaAi }}
              onClick={() => {
                if (fieldDisabled || fieldReadOnly) return;
                setIsRedlineEditing(true);
              }}
              onKeyDown={(event) => {
                if (fieldDisabled || fieldReadOnly) return;
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setIsRedlineEditing(true);
                }
              }}
            >
              {renderRedlinePreview(originalValue, currentValue)}
            </div>
            <div style={styles.aiContent}>
              <Badge color="ai" size="md">AI</Badge>
            </div>
          </div>
        ) : (
          <TextareaField
            ref={ref}
            id={textareaId}
            name={name}
            placeholder={placeholder}
            value={currentValue}
            state={textareaState}
            rows={rows}
            maxLength={maxLength}
            resizable={resizable}
            isDisabled={fieldDisabled}
            isReadOnly={fieldReadOnly}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            variant={variant}
            aiValue={aiBaseline}
            isAiEdited={variant === TEXTAREA_VARIANTS.ai && (currentValue !== aiBaseline || (showRedlinePreview && isRedlineEditing))}
            onRevert={handleRevert}
            autoResize={showRedlinePreview && variant === TEXTAREA_VARIANTS.ai}
            style={showRedlinePreview ? { minHeight: "auto" } : undefined}
          />
        )}

        {helperMessage && (
          <TextareaHelperText variant={helperVariant}>{helperMessage}</TextareaHelperText>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
Textarea.states = TEXTAREA_STATES;
Textarea.variants = TEXTAREA_VARIANTS;
Textarea.helperVariants = HELPER_VARIANTS;
Textarea.Label = TextareaLabel;
Textarea.Field = TextareaField;
Textarea.HelperText = TextareaHelperText;
Textarea.Icon = Icon;

export default Textarea;
