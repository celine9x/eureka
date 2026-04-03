/**
 * RichTextInput Component
 *
 * A rich text editor with formatting toolbar, content area, and submit footer.
 * Uses design tokens from tokens.css and Button atom.
 */

import React from "react";
import { createStyleInjector, cx } from "../utils/styles.js";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  base: `
    .rich-text-input {
      display: flex;
      flex-direction: column;
      background: var(--color-bg-primary);
      border-radius: var(--radius-md);
      outline: 1px solid var(--color-outline-primary);
      outline-offset: -1px;
      overflow: hidden;
      max-height: 500px;
      transition: outline-color var(--transition-fast);
    }
    .rich-text-input:hover:not(.rich-text-input--disabled):not(.rich-text-input--error) {
      outline-color: var(--color-outline-secondary);
    }
    .rich-text-input:focus-within:not(.rich-text-input--disabled):not(.rich-text-input--error) {
      outline-color: var(--color-outline-focus);
    }
    .rich-text-input--disabled {
      background: var(--color-bg-secondary);
      outline-color: var(--color-outline-primary);
    }
    .rich-text-input--error {
      outline-color: var(--color-feedback-error);
    }
  `,

  toolbar: `
    .rich-text-toolbar {
      display: flex;
      align-items: center;
      gap: var(--spacing-1);
      padding: var(--spacing-1) var(--spacing-4);
      background: var(--color-bg-secondary);
      border-bottom: 1px solid var(--color-outline-primary);
    }
    .rich-text-toolbar-group {
      display: flex;
      align-items: center;
      gap: var(--spacing-1);
    }
    .rich-text-divider {
      width: 1px;
      height: 24px;
      background: var(--color-outline-primary);
      margin: 0 var(--spacing-1);
    }
    .rich-text-toolbar-btn {
      width: 32px;
      height: 32px;
      padding: var(--spacing-2);
      background: transparent;
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-text-secondary);
      transition: all var(--transition-fast);
    }
    .rich-text-toolbar-btn:hover:not(:disabled) {
      background: var(--color-action-fill-tertiary-hover);
      color: var(--color-action-content-tertiary-hover);
    }
    .rich-text-toolbar-btn:active:not(:disabled) {
      background: var(--color-action-fill-tertiary-active);
    }
    .rich-text-toolbar-btn:disabled {
      color: var(--color-text-disabled);
      cursor: not-allowed;
    }
    .rich-text-toolbar-btn--active {
      background: var(--color-action-fill-tertiary-active);
      color: var(--color-action-content-tertiary-active);
    }
    .rich-text-toolbar-btn svg {
      width: 16px;
      height: 16px;
    }
  `,

  content: `
    .rich-text-content {
      flex: 1;
      padding: var(--spacing-4);
      min-height: 80px;
      overflow-y: auto;
    }
    .rich-text-editor {
      width: 100%;
      min-height: 100%;
      border: none;
      outline: none;
      resize: none;
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      line-height: var(--line-height-body-md);
      color: var(--color-text-primary);
      background: transparent;
    }
    .rich-text-editor::placeholder {
      color: var(--color-text-placeholder);
    }
    .rich-text-editor:disabled {
      color: var(--color-text-disabled);
      cursor: not-allowed;
    }
    .rich-text-editor[contenteditable="true"] {
      outline: none;
    }
    .rich-text-editor[contenteditable="true"]:empty::before {
      content: attr(data-placeholder);
      color: var(--color-text-placeholder);
    }
  `,

  footer: `
    .rich-text-footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: var(--spacing-2);
      padding: 0 var(--spacing-4) var(--spacing-4);
    }
  `,

  helperText: `
    .rich-text-helper {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-1);
      padding: var(--spacing-2) 0 0;
    }
    .rich-text-helper-icon {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      color: var(--color-feedback-error);
    }
    .rich-text-helper-text {
      font-family: var(--font-family-primary);
      font-size: var(--text-body-caption);
      line-height: var(--line-height-body-caption);
      color: var(--color-text-secondary);
    }
    .rich-text-helper-text--error {
      color: var(--color-feedback-error);
    }
  `,
};

const injectStyles = createStyleInjector("rich-text-input");
const css = Object.values(styles).join("\n");

// ─────────────────────────────────────────────
// TOOLBAR ICONS
// ─────────────────────────────────────────────

const BoldIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M4 2h5a3 3 0 012.24 5A3 3 0 019.5 14H4V2zm2 5h3a1 1 0 000-2H6v2zm0 2v3h3.5a1.5 1.5 0 000-3H6z" />
  </svg>
);

const ItalicIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M6 2h6v2h-2l-2 8h2v2H4v-2h2l2-8H6V2z" />
  </svg>
);

const UnderlineIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M3 14v-1h10v1H3zm2-3V2h2v9a1 1 0 102 0V2h2v9a3 3 0 01-6 0z" />
  </svg>
);

const BulletListIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M2 4a1 1 0 112 0 1 1 0 01-2 0zm4-1h8v2H6V3zm-4 5a1 1 0 112 0 1 1 0 01-2 0zm4-1h8v2H6V7zm-4 5a1 1 0 112 0 1 1 0 01-2 0zm4-1h8v2H6v-2z" />
  </svg>
);

const NumberListIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M2 2h2v4H3V3H2V2zm4 1h8v2H6V3zM2 8h2l-1.5 2H4v1H2v-1l1.5-2H2V8zm4 0h8v2H6V8zM3 14v-1H2v-1h2v3H2v-1h1zm3-1h8v2H6v-2z" />
  </svg>
);

const AlignLeftIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M1 2h14v2H1V2zm0 4h10v2H1V6zm0 4h14v2H1v-2zm0 4h10v2H1v-2z" />
  </svg>
);

const AlignCenterIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M1 2h14v2H1V2zm2 4h10v2H3V6zM1 10h14v2H1v-2zm2 4h10v2H3v-2z" />
  </svg>
);

const AlignRightIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M1 2h14v2H1V2zm4 4h10v2H5V6zM1 10h14v2H1v-2zm4 4h10v2H5v-2z" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M6.5 9.5a1 1 0 010-1.41l3-3a3 3 0 114.24 4.24l-1 1a1 1 0 01-1.42-1.42l1-1a1 1 0 10-1.41-1.41l-3 3a1 1 0 01-1.41 0zm3-3a1 1 0 010 1.41l-3 3a3 3 0 11-4.24-4.24l1-1a1 1 0 011.42 1.42l-1 1a1 1 0 001.41 1.41l3-3a1 1 0 011.41 0z" />
  </svg>
);

const UndoIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M3.41 6H10a4 4 0 110 8H8v-2h2a2 2 0 000-4H3.41l1.3 1.29-1.42 1.42L0 7.41l3.29-3.29 1.42 1.42L3.41 6z" />
  </svg>
);

const RedoIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M12.59 6H6a4 4 0 100 8h2v-2H6a2 2 0 010-4h6.59l-1.3 1.29 1.42 1.42L16 7.41l-3.29-3.29-1.42 1.42L12.59 6z" />
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1a7 7 0 100 14A7 7 0 008 1zM7 4h2v5H7V4zm0 6h2v2H7v-2z" />
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
  const classes = cx(
    "rich-text-toolbar-btn",
    active && "rich-text-toolbar-btn--active"
  );

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      onClick={onClick}
      title={title}
      aria-pressed={active}
      {...props}
    >
      <IconComponent />
    </button>
  );
};

// ─────────────────────────────────────────────
// DIVIDER COMPONENT
// ─────────────────────────────────────────────

const ToolbarDivider = () => <div className="rich-text-divider" />;

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
 * @param {array} toolbarButtons - Custom toolbar button configuration
 * @param {object} activeFormats - Currently active formatting (bold, italic, etc.)
 * @param {function} onFormat - Callback when formatting button is clicked
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
  className = "",
  ...props
}) => {
  injectStyles(css);

  const containerClasses = cx(
    "rich-text-input",
    disabled && "rich-text-input--disabled",
    error && "rich-text-input--error",
    className
  );

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
      id: 'text-style',
      buttons: [
        { format: 'bold', icon: BoldIcon, title: 'Bold' },
        { format: 'italic', icon: ItalicIcon, title: 'Italic' },
        { format: 'underline', icon: UnderlineIcon, title: 'Underline' },
      ],
    },
    {
      id: 'lists',
      buttons: [
        { format: 'bulletList', icon: BulletListIcon, title: 'Bullet list' },
        { format: 'numberList', icon: NumberListIcon, title: 'Numbered list' },
      ],
    },
    {
      id: 'alignment',
      buttons: [
        { format: 'alignLeft', icon: AlignLeftIcon, title: 'Align left' },
        { format: 'alignCenter', icon: AlignCenterIcon, title: 'Align center' },
        { format: 'alignRight', icon: AlignRightIcon, title: 'Align right' },
      ],
    },
    {
      id: 'link',
      buttons: [
        { format: 'link', icon: LinkIcon, title: 'Insert link' },
      ],
    },
    {
      id: 'history',
      buttons: [
        { format: 'undo', icon: UndoIcon, title: 'Undo' },
        { format: 'redo', icon: RedoIcon, title: 'Redo' },
      ],
    },
  ];

  return (
    <div className="rich-text-wrapper">
      <div className={containerClasses} {...props}>
        {showToolbar && (
          <div className="rich-text-toolbar">
            {defaultToolbarGroups.map((group, groupIndex) => (
              <div key={group.id} style={{ display: "contents" }}>
                {groupIndex > 0 && <ToolbarDivider />}
                <div className="rich-text-toolbar-group">
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

        <div className="rich-text-content">
          <textarea
            className="rich-text-editor"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            disabled={disabled}
            aria-invalid={error || undefined}
          />
        </div>

        {showFooter && (
          <div className="rich-text-footer">
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
        <div className="rich-text-helper">
          {error && (
            <span className="rich-text-helper-icon">
              <ErrorIcon />
            </span>
          )}
          <span className={helperClasses}>
            {helperText}
          </span>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// CONTENTEDITABLE VARIANT
// ─────────────────────────────────────────────

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
  className = "",
  ...props
}) => {
  injectStyles(css);

  const containerClasses = cx(
    "rich-text-input",
    disabled && "rich-text-input--disabled",
    error && "rich-text-input--error",
    className
  );

  const helperClasses = cx(
    "rich-text-helper-text",
    error && "rich-text-helper-text--error"
  );

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
      id: 'text-style',
      buttons: [
        { format: 'bold', icon: BoldIcon, title: 'Bold' },
        { format: 'italic', icon: ItalicIcon, title: 'Italic' },
        { format: 'underline', icon: UnderlineIcon, title: 'Underline' },
      ],
    },
    {
      id: 'lists',
      buttons: [
        { format: 'bulletList', icon: BulletListIcon, title: 'Bullet list' },
        { format: 'numberList', icon: NumberListIcon, title: 'Numbered list' },
      ],
    },
    {
      id: 'alignment',
      buttons: [
        { format: 'alignLeft', icon: AlignLeftIcon, title: 'Align left' },
        { format: 'alignCenter', icon: AlignCenterIcon, title: 'Align center' },
        { format: 'alignRight', icon: AlignRightIcon, title: 'Align right' },
      ],
    },
    {
      id: 'link',
      buttons: [
        { format: 'link', icon: LinkIcon, title: 'Insert link' },
      ],
    },
    {
      id: 'history',
      buttons: [
        { format: 'undo', icon: UndoIcon, title: 'Undo' },
        { format: 'redo', icon: RedoIcon, title: 'Redo' },
      ],
    },
  ];

  return (
    <div className="rich-text-wrapper">
      <div className={containerClasses} {...props}>
        {showToolbar && (
          <div className="rich-text-toolbar">
            {defaultToolbarGroups.map((group, groupIndex) => (
              <div key={group.id} style={{ display: "contents" }}>
                {groupIndex > 0 && <ToolbarDivider />}
                <div className="rich-text-toolbar-group">
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

        <div className="rich-text-content">
          <div
            className="rich-text-editor"
            contentEditable={!disabled}
            data-placeholder={placeholder}
            onInput={handleInput}
            dangerouslySetInnerHTML={value ? { __html: value } : undefined}
            aria-invalid={error || undefined}
            role="textbox"
            aria-multiline="true"
          />
        </div>

        {showFooter && (
          <div className="rich-text-footer">
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
        <div className="rich-text-helper">
          {error && (
            <span className="rich-text-helper-icon">
              <ErrorIcon />
            </span>
          )}
          <span className={helperClasses}>
            {helperText}
          </span>
        </div>
      )}
    </div>
  );
};

RichTextInput.displayName = "RichTextInput";
RichTextInputEditable.displayName = "RichTextInputEditable";

export default RichTextInput;
