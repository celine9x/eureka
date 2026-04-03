/**
 * RichTextInput Component
 *
 * A rich text editor with formatting toolbar, content area, and submit footer.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 */

import { useState, useRef } from "react";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";

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
    gap: 4,
    padding: "4px 16px",
    background: "var(--color-general-neutral-light)",
    borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
  },

  toolbarGroup: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },

  divider: {
    width: 1,
    height: 24,
    background: "var(--color-action-outline-secondary-enabled)",
    margin: "0 4px",
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
    padding: 16,
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
    gap: 8,
    padding: "0 16px 16px",
  },

  helper: {
    display: "flex",
    alignItems: "flex-start",
    gap: 4,
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
// TOOLBAR ICONS
// ─────────────────────────────────────────────

const BoldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M4 2h5a3 3 0 012.24 5A3 3 0 019.5 14H4V2zm2 5h3a1 1 0 000-2H6v2zm0 2v3h3.5a1.5 1.5 0 000-3H6z" />
  </svg>
);

const ItalicIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M6 2h6v2h-2l-2 8h2v2H4v-2h2l2-8H6V2z" />
  </svg>
);

const UnderlineIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M3 14v-1h10v1H3zm2-3V2h2v9a1 1 0 102 0V2h2v9a3 3 0 01-6 0z" />
  </svg>
);

const BulletListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2 4a1 1 0 112 0 1 1 0 01-2 0zm4-1h8v2H6V3zm-4 5a1 1 0 112 0 1 1 0 01-2 0zm4-1h8v2H6V7zm-4 5a1 1 0 112 0 1 1 0 01-2 0zm4-1h8v2H6v-2z" />
  </svg>
);

const NumberListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2 2h2v4H3V3H2V2zm4 1h8v2H6V3zM2 8h2l-1.5 2H4v1H2v-1l1.5-2H2V8zm4 0h8v2H6V8zM3 14v-1H2v-1h2v3H2v-1h1zm3-1h8v2H6v-2z" />
  </svg>
);

const AlignLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1 2h14v2H1V2zm0 4h10v2H1V6zm0 4h14v2H1v-2zm0 4h10v2H1v-2z" />
  </svg>
);

const AlignCenterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1 2h14v2H1V2zm2 4h10v2H3V6zM1 10h14v2H1v-2zm2 4h10v2H3v-2z" />
  </svg>
);

const AlignRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1 2h14v2H1V2zm4 4h10v2H5V6zM1 10h14v2H1v-2zm4 4h10v2H5v-2z" />
  </svg>
);

const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M6.5 9.5a1 1 0 010-1.41l3-3a3 3 0 114.24 4.24l-1 1a1 1 0 01-1.42-1.42l1-1a1 1 0 10-1.41-1.41l-3 3a1 1 0 01-1.41 0zm3-3a1 1 0 010 1.41l-3 3a3 3 0 11-4.24-4.24l1-1a1 1 0 011.42 1.42l-1 1a1 1 0 001.41 1.41l3-3a1 1 0 011.41 0z" />
  </svg>
);

const UndoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M3.41 6H10a4 4 0 110 8H8v-2h2a2 2 0 000-4H3.41l1.3 1.29-1.42 1.42L0 7.41l3.29-3.29 1.42 1.42L3.41 6z" />
  </svg>
);

const RedoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M12.59 6H6a4 4 0 100 8h2v-2H6a2 2 0 010-4h6.59l-1.3 1.29 1.42 1.42L16 7.41l-3.29-3.29-1.42 1.42L12.59 6z" />
  </svg>
);

// ─────────────────────────────────────────────
// TOOLBAR BUTTON COMPONENT
// ─────────────────────────────────────────────

const ToolbarButton = ({
  icon: IconComponent,
  active = false,
  disabled = false,
  onClick,
  title,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const btnStyle = {
    ...styles.toolbarBtn,
    ...(isHovered && !disabled && !active && styles.toolbarBtnHover),
    ...(active && styles.toolbarBtnActive),
    ...(disabled && styles.toolbarBtnDisabled),
  };

  return (
    <button
      type="button"
      style={btnStyle}
      disabled={disabled}
      onClick={onClick}
      title={title}
      aria-pressed={active}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <IconComponent />
    </button>
  );
};

// ─────────────────────────────────────────────
// DIVIDER COMPONENT
// ─────────────────────────────────────────────

const ToolbarDivider = () => <div style={styles.divider} />;

// ─────────────────────────────────────────────
// RICH TEXT INPUT COMPONENT
// ─────────────────────────────────────────────

/**
 * RichTextInput
 *
 * @param {string} placeholder - Placeholder text for empty editor
 * @param {string} value - Controlled value
 * @param {function} onChange - Callback when content changes
 * @param {boolean} disabled - Disables the editor
 * @param {boolean} error - Shows error state
 * @param {string} helperText - Helper text below the editor
 * @param {string} submitLabel - Label for submit button
 * @param {function} onSubmit - Callback when submit button is clicked
 * @param {boolean} showToolbar - Show/hide toolbar
 * @param {boolean} showFooter - Show/hide footer with submit button
 * @param {object} activeFormats - Currently active formatting (bold, italic, etc.)
 * @param {function} onFormat - Callback when formatting button is clicked
 * @param {object} style - Additional inline styles
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

  // Default toolbar configuration
  const defaultToolbarGroups = [
    {
      id: "text-style",
      buttons: [
        { format: "bold", icon: BoldIcon, title: "Bold" },
        { format: "italic", icon: ItalicIcon, title: "Italic" },
        { format: "underline", icon: UnderlineIcon, title: "Underline" },
      ],
    },
    {
      id: "lists",
      buttons: [
        { format: "bulletList", icon: BulletListIcon, title: "Bullet list" },
        { format: "numberList", icon: NumberListIcon, title: "Numbered list" },
      ],
    },
    {
      id: "alignment",
      buttons: [
        { format: "alignLeft", icon: AlignLeftIcon, title: "Align left" },
        { format: "alignCenter", icon: AlignCenterIcon, title: "Align center" },
        { format: "alignRight", icon: AlignRightIcon, title: "Align right" },
      ],
    },
    {
      id: "link",
      buttons: [{ format: "link", icon: LinkIcon, title: "Insert link" }],
    },
    {
      id: "history",
      buttons: [
        { format: "undo", icon: UndoIcon, title: "Undo" },
        { format: "redo", icon: RedoIcon, title: "Redo" },
      ],
    },
  ];

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
          <div style={styles.toolbar}>
            {defaultToolbarGroups.map((group, groupIndex) => (
              <div key={group.id} style={{ display: "contents" }}>
                {groupIndex > 0 && <ToolbarDivider />}
                <div style={styles.toolbarGroup}>
                  {group.buttons.map((btn) => (
                    <ToolbarButton
                      key={btn.format}
                      icon={btn.icon}
                      title={btn.title}
                      active={activeFormats[btn.format]}
                      disabled={disabled}
                      onClick={() => handleFormat(btn.format)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
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

  const defaultToolbarGroups = [
    {
      id: "text-style",
      buttons: [
        { format: "bold", icon: BoldIcon, title: "Bold" },
        { format: "italic", icon: ItalicIcon, title: "Italic" },
        { format: "underline", icon: UnderlineIcon, title: "Underline" },
      ],
    },
    {
      id: "lists",
      buttons: [
        { format: "bulletList", icon: BulletListIcon, title: "Bullet list" },
        { format: "numberList", icon: NumberListIcon, title: "Numbered list" },
      ],
    },
    {
      id: "alignment",
      buttons: [
        { format: "alignLeft", icon: AlignLeftIcon, title: "Align left" },
        { format: "alignCenter", icon: AlignCenterIcon, title: "Align center" },
        { format: "alignRight", icon: AlignRightIcon, title: "Align right" },
      ],
    },
    {
      id: "link",
      buttons: [{ format: "link", icon: LinkIcon, title: "Insert link" }],
    },
    {
      id: "history",
      buttons: [
        { format: "undo", icon: UndoIcon, title: "Undo" },
        { format: "redo", icon: RedoIcon, title: "Redo" },
      ],
    },
  ];

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
          <div style={styles.toolbar}>
            {defaultToolbarGroups.map((group, groupIndex) => (
              <div key={group.id} style={{ display: "contents" }}>
                {groupIndex > 0 && <ToolbarDivider />}
                <div style={styles.toolbarGroup}>
                  {group.buttons.map((btn) => (
                    <ToolbarButton
                      key={btn.format}
                      icon={btn.icon}
                      title={btn.title}
                      active={activeFormats[btn.format]}
                      disabled={disabled}
                      onClick={() => handleFormat(btn.format)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
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

export default RichTextInput;
