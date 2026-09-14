"use client";

/**
 * RichTextInput Component
 *
 * A rich text editor with formatting toolbar, content area, and submit footer.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 */

import { useState, useRef } from "react";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";
import { RichTextEditToolbars } from "./rich-text-edit-toolbars.jsx";

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  base: {
    display: "flex",
    flexDirection: "column",
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-md)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: -1,
    overflow: "hidden",
    maxHeight: 500,
    transition: "outline-color var(--transition-fast)",
  },

  baseHover: {
    outlineColor: "var(--color-general-neutral-dark)",
  },

  baseFocus: {
    outlineColor: "var(--color-interaction-outline-active)",
  },

  baseDisabled: {
    background: "var(--color-general-neutral-light)",
    outlineColor: "var(--color-action-outline-secondary-enabled)",
  },

  baseError: {
    outlineColor: "var(--color-content-negative)",
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-1)",
    padding: "var(--spacing-1) var(--spacing-4)",
    background: "var(--color-general-neutral-light)",
    borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
  },

  toolbarGroup: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-1)",
  },

  divider: {
    width: 1,
    height: 24,
    background: "var(--color-action-outline-secondary-enabled)",
    margin: "0 var(--spacing-1)",
  },

  toolbarBtn: {
    width: 32,
    height: 32,
    padding: 8,
    background: "transparent",
    border: "none",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-secondary)",
    transition: "all var(--transition-fast)",
  },

  toolbarBtnHover: {
    background: "var(--color-action-fill-tertiary-hover)",
    color: "var(--color-action-content-tertiary-hover)",
  },

  toolbarBtnActive: {
    background: "var(--color-action-fill-tertiary-active)",
    color: "var(--color-action-content-tertiary-active)",
  },

  toolbarBtnDisabled: {
    color: "var(--color-content-tertiary)",
    cursor: "not-allowed",
  },

  content: {
    flex: 1,
    padding: "var(--spacing-4)",
    minHeight: 80,
    overflowY: "auto",
  },

  editor: {
    width: "100%",
    minHeight: "100%",
    border: "none",
    outline: "none",
    resize: "none",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    color: "var(--color-content-primary)",
    background: "transparent",
  },

  editorDisabled: {
    color: "var(--color-content-tertiary)",
    cursor: "not-allowed",
  },

  footer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "var(--spacing-2)",
    padding: "0 var(--spacing-4) var(--spacing-4)",
  },

  helper: {
    display: "flex",
    alignItems: "flex-start",
    gap: "var(--spacing-1)",
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
    lineHeight: "var(--line-height-body-caption)",
    color: "var(--color-content-secondary)",
  },

  helperTextError: {
    color: "var(--color-content-negative)",
  },
};

// ─────────────────────────────────────────────
// RICH TEXT INPUT COMPONENT
// ─────────────────────────────────────────────

/**
 * RichTextInput
 *
 *
 * @example
 * <RichTextInput
 *   placeholder="Write a comment"
 *   onSubmit={(value) => console.log(value)}
 * />
 */
export const RichTextInput = ({
  placeholder = "Write a comment",
  value,
  onChange,
  disabled = false,
  error = false,
  helperText,
  submitLabel = "Submit",
  onSubmit,
  showToolbar = true,
  showFooter = true,
  activeFormats = {},
  onFormat,
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  const handleFormat = (format) => {
    if (onFormat) {
      onFormat(format);
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(value);
    }
  };

  // Compose container styles
  const containerStyle = {
    ...styles.base,
    ...(isHovered && !disabled && !isFocused && !error && styles.baseHover),
    ...(isFocused && !disabled && !error && styles.baseFocus),
    ...(disabled && styles.baseDisabled),
    ...(error && styles.baseError),
    ...style,
  };

  // Editor styles
  const editorStyle = {
    ...styles.editor,
    ...(disabled && styles.editorDisabled),
  };

  // Helper text styles
  const helperTextStyle = {
    ...styles.helperText,
    ...(error && styles.helperTextError),
  };

  return (
    <div style={styles.wrapper}>
      <div
        style={containerStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {showToolbar && (
          <RichTextEditToolbars
            activeFormats={activeFormats}
            disabled={disabled}
            onAction={handleFormat}
          />
        )}

        <div style={styles.content}>
          <textarea
            ref={textareaRef}
            style={editorStyle}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            aria-invalid={error || undefined}
          />
        </div>

        {showFooter && (
          <div style={styles.footer}>
            <Button
              variant="primary"
              size="md"
              disabled={disabled}
              onClick={handleSubmit}
            >
              {submitLabel}
            </Button>
          </div>
        )}
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
};

// ─────────────────────────────────────────────
// CONTENTEDITABLE VARIANT
// ─────────────────────────────────────────────

// Inject placeholder styles for contentEditable
const injectContentEditableStyles = () => {
  if (typeof document === "undefined") return;
  const styleId = "rich-text-contenteditable-styles";
  if (document.getElementById(styleId)) return;

  const styleEl = document.createElement("style");
  styleEl.id = styleId;
  styleEl.textContent = `
    .rich-text-editor-contenteditable:empty::before {
      content: attr(data-placeholder);
      color: var(--color-content-tertiary);
      pointer-events: none;
    }
  `;
  document.head.appendChild(styleEl);
};

/**
 * RichTextInputEditable
 *
 * Alternative version using contentEditable for actual rich text editing.
 * Use this when you need true rich text formatting.
 */
export const RichTextInputEditable = ({
  placeholder = "Write a comment",
  value,
  onChange,
  disabled = false,
  error = false,
  helperText,
  submitLabel = "Submit",
  onSubmit,
  showToolbar = true,
  showFooter = true,
  activeFormats = {},
  onFormat,
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Inject styles for placeholder
  injectContentEditableStyles();

  const handleFormat = (format) => {
    // Execute document commands for contentEditable
    const commands = {
      bold: () => document.execCommand("bold", false),
      italic: () => document.execCommand("italic", false),
      underline: () => document.execCommand("underline", false),
      bulletList: () => document.execCommand("insertUnorderedList", false),
      numberList: () => document.execCommand("insertOrderedList", false),
      alignLeft: () => document.execCommand("justifyLeft", false),
      alignCenter: () => document.execCommand("justifyCenter", false),
      alignRight: () => document.execCommand("justifyRight", false),
      undo: () => document.execCommand("undo", false),
      redo: () => document.execCommand("redo", false),
    };

    if (commands[format]) {
      commands[format]();
    }

    if (onFormat) {
      onFormat(format);
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(value);
    }
  };

  const handleInput = (e) => {
    if (onChange) {
      onChange(e.currentTarget.innerHTML);
    }
  };

  // Compose container styles
  const containerStyle = {
    ...styles.base,
    ...(isHovered && !disabled && !isFocused && !error && styles.baseHover),
    ...(isFocused && !disabled && !error && styles.baseFocus),
    ...(disabled && styles.baseDisabled),
    ...(error && styles.baseError),
    ...style,
  };

  // Editor styles for contentEditable
  const editorStyle = {
    ...styles.editor,
    minHeight: "100%",
    ...(disabled && styles.editorDisabled),
  };

  // Helper text styles
  const helperTextStyle = {
    ...styles.helperText,
    ...(error && styles.helperTextError),
  };

  return (
    <div style={styles.wrapper}>
      <div
        style={containerStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {showToolbar && (
          <RichTextEditToolbars
            activeFormats={activeFormats}
            disabled={disabled}
            onAction={handleFormat}
          />
        )}

        <div style={styles.content}>
          <div
            className="rich-text-editor-contenteditable"
            style={editorStyle}
            contentEditable={!disabled}
            data-placeholder={placeholder}
            onInput={handleInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            dangerouslySetInnerHTML={value ? { __html: value } : undefined}
            aria-invalid={error || undefined}
            role="textbox"
            aria-multiline="true"
          />
        </div>

        {showFooter && (
          <div style={styles.footer}>
            <Button
              variant="primary"
              size="md"
              disabled={disabled}
              onClick={handleSubmit}
            >
              {submitLabel}
            </Button>
          </div>
        )}
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
};

RichTextInput.displayName = "RichTextInput";
RichTextInputEditable.displayName = "RichTextInputEditable";
RichTextInput.Editable = RichTextInputEditable;
RichTextInput.Button = Button;
RichTextInput.Icon = Icon;

export default RichTextInput;
