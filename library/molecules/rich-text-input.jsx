"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs, 4px)",
  },

  container: {
    width: "100%",
    minHeight: 40,
    borderRadius: "var(--radius-sm, 8px)",
    boxSizing: "border-box",
    transition: "border-color 120ms, background 120ms",
    border: "1px solid transparent",
  },

  containerHover: {
    background: "var(--Grey98, #F8F9FC)",
    border: "1px solid var(--Grey90, #D9E0ED)",
  },

  containerActive: {
    background: "var(--Grey100, white)",
    border: "1px solid var(--Blue50, #383ACC)",
  },

  inner: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "var(--spacing-md, 16px)",
    display: "flex",
    overflowX: "hidden",
    overflowY: "hidden",
    borderRadius: "calc(var(--radius-sm, 8px) - 1px)",
  },

  innerActive: {
    justifyContent: "flex-start",
    maxHeight: 598,
    overflowY: "auto",
  },

  textRow: {
    alignSelf: "stretch",
    padding: "var(--spacing-sm, 8px)",
    overflow: "hidden",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "var(--spacing-sm, 8px)",
    display: "inline-flex",
  },

  textRowActive: {
    padding: "var(--spacing-sm, 8px)",
  },

  placeholder: {
    flex: "1 1 0",
    color: "var(--Grey70, #93A6CB)",
    fontSize: "var(--text-body-md, 14px)",
    fontFamily: "var(--font-family-primary, Sora, sans-serif)",
    fontWeight: "var(--font-weight-regular, 400)",
    lineHeight: "var(--line-height-body-md, 20px)",
    wordWrap: "break-word",
    pointerEvents: "none",
    userSelect: "none",
  },

  filledText: {
    flex: "1 1 0",
    color: "var(--Blue20, #15154C)",
    fontSize: "var(--text-body-md, 14px)",
    fontFamily: "var(--font-family-primary, Sora, sans-serif)",
    fontWeight: "var(--font-weight-regular, 400)",
    lineHeight: "var(--line-height-body-md, 20px)",
    wordWrap: "break-word",
  },

  toolbar: {
    alignSelf: "stretch",
    paddingLeft: "var(--spacing-sm, 8px)",
    paddingRight: "var(--spacing-sm, 8px)",
    paddingTop: "var(--spacing-xs, 4px)",
    paddingBottom: "var(--spacing-xs, 4px)",
    background: "var(--Grey98, #F8F9FC)",
    borderBottom: "1px solid var(--Grey90, #D9E0ED)",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "var(--spacing-xs, 4px)",
    display: "flex",
    position: "sticky",
    top: 0,
    zIndex: 1,
    flexShrink: 0,
  },

  toolbarRow: {
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 0,
    display: "inline-flex",
  },

  divider: {
    width: 1,
    height: 24,
    background: "var(--Grey90, #D9E0ED)",
    flexShrink: 0,
    margin: "0 var(--spacing-xs, 4px)",
  },

  editor: {
    flex: "1 1 0",
    color: "var(--Blue20, #15154C)",
    fontSize: "var(--text-body-md, 14px)",
    fontFamily: "var(--font-family-primary, Sora, sans-serif)",
    fontWeight: "var(--font-weight-regular, 400)",
    lineHeight: "var(--line-height-body-md, 20px)",
    wordWrap: "break-word",
    width: "100%",
    border: "none",
    outline: "none",
    resize: "none",
    background: "transparent",
    minHeight: 60,
    padding: 0,
  },

  footer: {
    alignSelf: "stretch",
    paddingBottom: "var(--spacing-sm, 8px)",
    paddingLeft: "var(--spacing-sm, 8px)",
    paddingRight: "var(--spacing-sm, 8px)",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    gap: "var(--spacing-md, 16px)",
    display: "inline-flex",
  },

  helperText: {
    fontSize: "var(--text-body-caption, 12px)",
    fontFamily: "var(--font-family-primary, Sora, sans-serif)",
    color: "var(--Grey50, #5371AC)",
    lineHeight: "var(--line-height-body-caption, 16px)",
  },

  containerDisabled: {
    cursor: "not-allowed",
    background: "var(--color-general-neutral-light, #F8F9FC)",
    border: "1px solid transparent",
  },

  textDisabled: {
    color: "var(--color-content-tertiary, #93A6CB)",
    pointerEvents: "none",
  },
};

// ─────────────────────────────────────────────
// SHOW MORE BUTTON
// ─────────────────────────────────────────────

const LINE_HEIGHT = 20; // px, matches --line-height-body-md
const MAX_LINES = 8;
const MAX_HEIGHT = LINE_HEIGHT * MAX_LINES; // 160px

const ShowMoreButton = ({ expanded, onClick }) => (
  <Button
    variant="secondary"
    size="xs"
    iconTrailing={<Icon name={expanded ? "ChevronUp" : "ChevronDown"} size="sm" />}
    onClick={onClick}
  >
    {expanded ? "Show less" : "Show more"}
  </Button>
);

// ─────────────────────────────────────────────
// CUSTOM TEXT FORMAT ICONS (not in heroicons)
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

// ─────────────────────────────────────────────
// TOOLBAR BUTTON
// ─────────────────────────────────────────────

const ToolbarButton = ({ icon, active = false, onClick, title }) => (
  <Button
    variant="tertiary"
    size="sm"
    iconLeading={icon}
    onClick={onClick}
    title={title}
    aria-pressed={active}
    onMouseDown={(e) => e.preventDefault()}
    style={active ? { background: "var(--color-action-fill-tertiary-active)" } : undefined}
  />
);

// ─────────────────────────────────────────────
// TOOLBAR GROUPS
// ─────────────────────────────────────────────

// Groups: text-style | lists | media | history
// Icons: bold/italic/underline use custom SVG; rest use heroicons via Icon atom
const TOOLBAR_GROUPS = [
  {
    id: "text-style",
    buttons: [
      { format: "bold",      icon: <BoldIcon />,                                     title: "Bold" },
      { format: "italic",    icon: <ItalicIcon />,                                   title: "Italic" },
      { format: "underline", icon: <UnderlineIcon />,                                title: "Underline" },
    ],
  },
  {
    id: "lists",
    buttons: [
      { format: "numberList", icon: <Icon name="ListBullet" size="sm" />,            title: "Numbered list" },
      { format: "bulletList", icon: <Icon name="Bars3BottomLeft" size="sm" />,       title: "Bullet list" },
    ],
  },
  {
    id: "media",
    buttons: [
      { format: "table",      icon: <Icon name="TableCells" size="sm" />,            title: "Insert table" },
      { format: "image",      icon: <Icon name="Photo" size="sm" />,                 title: "Insert image" },
      { format: "attachment", icon: <Icon name="PaperClip" size="sm" />,             title: "Attach file" },
      { format: "mention",    icon: <Icon name="AtSymbol" size="sm" />,              title: "Mention" },
    ],
  },
  {
    id: "history",
    buttons: [
      { format: "undo", icon: <Icon name="ArrowUturnLeft" size="sm" />,              title: "Undo" },
      { format: "redo", icon: <Icon name="ArrowUturnRight" size="sm" />,             title: "Redo" },
    ],
  },
];

const Toolbar = ({ activeFormats = {}, onFormat }) => (
  <div style={styles.toolbar}>
    <div style={styles.toolbarRow}>
      {TOOLBAR_GROUPS.map((group, i) => (
        <div key={group.id} style={{ display: "contents" }}>
          {i > 0 && <div style={styles.divider} />}
          {group.buttons.map((btn) => (
            <ToolbarButton
              key={btn.format}
              icon={btn.icon}
              title={btn.title}
              active={!!activeFormats[btn.format]}
              onClick={() => onFormat && onFormat(btn.format)}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────
// RICH TEXT INPUT (textarea-based)
// ─────────────────────────────────────────────

/**
 * RichTextInput
 *
 * Inline rich text input. Click to expand — shows toolbar and Save button when focused.
 *
 * @example
 * <RichTextInput
 *   placeholder="Write description..."
 *   onSubmit={(value) => console.log(value)}
 * />
 */
export const RichTextInput = ({
  placeholder = "Write description...",
  value = "",
  onChange,
  onSubmit,
  disabled = false,
  readOnly = false,
  helperText,
  submitLabel = "Save",
  activeFormats = {},
  onFormat,
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const textareaRef = useRef(null);
  const contentRef = useRef(null);

  const hasValue = value && value.length > 0;
  const isActive = isFocused && !disabled && !readOnly;
  const isInteractive = !disabled && !readOnly;

  // Detect when filled content exceeds MAX_LINES
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const check = () => setOverflows(el.scrollHeight > MAX_HEIGHT);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [value, isActive]);

  const containerStyle = {
    ...styles.container,
    ...(isHovered && !isActive && !disabled && styles.containerHover),
    ...(isActive && styles.containerActive),
    ...(disabled && styles.containerDisabled),
    ...style,
  };

  const innerStyle = {
    ...styles.inner,
    ...(isActive && styles.innerActive),
  };

  const textRowStyle = {
    ...styles.textRow,
    ...(isActive && styles.textRowActive),
  };

  const handleSubmit = () => {
    onSubmit && onSubmit(value);
    setIsHovered(false);
    textareaRef.current?.blur();
  };

  return (
    <div style={styles.wrapper}>
      <div
        style={containerStyle}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => !disabled && setIsHovered(false)}
        {...props}
      >
        <div style={innerStyle}>
          {isActive && (
            <Toolbar activeFormats={activeFormats} onFormat={onFormat} />
          )}

          <div style={textRowStyle}>
            {isActive ? (
              <textarea
                ref={textareaRef}
                style={styles.editor}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={disabled}
                autoFocus
              />
            ) : (
              <div
                ref={contentRef}
                style={{
                  ...(hasValue ? styles.filledText : styles.placeholder),
                  ...(disabled && styles.textDisabled),
                  ...(!expanded && overflows && {
                    maxHeight: MAX_HEIGHT,
                    overflow: "hidden",
                  }),
                }}
                onClick={() => isInteractive && setIsFocused(true)}
              >
                {hasValue ? value : placeholder}
              </div>
            )}
          </div>

          {isActive && (
            <div style={styles.footer}>
              <Button variant="primary" size="sm" onClick={handleSubmit}>
                {submitLabel}
              </Button>
            </div>
          )}
        </div>
      </div>

      {!isActive && overflows && (
        <div style={{ paddingLeft: "var(--spacing-sm, 8px)" }}>
          <ShowMoreButton expanded={expanded} onClick={() => setExpanded((e) => !e)} />
        </div>
      )}

      {helperText && <span style={styles.helperText}>{helperText}</span>}
    </div>
  );
};

// ─────────────────────────────────────────────
// RICH TEXT INPUT EDITABLE (contentEditable-based)
// ─────────────────────────────────────────────

const injectPlaceholderStyles = () => {
  if (typeof document === "undefined") return;
  const id = "rte-placeholder-styles";
  if (document.getElementById(id)) return;
  const el = document.createElement("style");
  el.id = id;
  el.textContent = `
    .rte-editor:empty::before {
      content: attr(data-placeholder);
      color: var(--Grey70, #93A6CB);
      pointer-events: none;
    }
  `;
  document.head.appendChild(el);
};

/**
 * RichTextInputEditable
 *
 * ContentEditable variant for true rich text formatting.
 * Toolbar buttons execute real browser formatting commands.
 *
 * @example
 * <RichTextInputEditable
 *   placeholder="Write description..."
 *   onSubmit={(html) => console.log(html)}
 * />
 */
export const RichTextInputEditable = ({
  placeholder = "Write description...",
  value = "",
  onChange,
  onSubmit,
  disabled = false,
  readOnly = false,
  helperText,
  submitLabel = "Save",
  activeFormats = {},
  onFormat,
  style,
  ...props
}) => {
  injectPlaceholderStyles();

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const editorRef = useRef(null);
  const contentRef = useRef(null);

  const hasValue = value && value.length > 0;
  const isActive = isFocused && !disabled && !readOnly;
  const isInteractive = !disabled && !readOnly;
  const seedRef = useRef(false);

  // Seed innerHTML on first mount into active editor (avoid dangerouslySetInnerHTML conflict)
  useEffect(() => {
    if (isActive && editorRef.current && !seedRef.current) {
      editorRef.current.innerHTML = value || "";
      seedRef.current = true;
      // Move cursor to end
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    if (!isActive) {
      seedRef.current = false;
    }
  }, [isActive]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const check = () => setOverflows(el.scrollHeight > MAX_HEIGHT);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [value, isActive]);

  const containerStyle = {
    ...styles.container,
    ...(isHovered && !isActive && !disabled && styles.containerHover),
    ...(isActive && styles.containerActive),
    ...(disabled && styles.containerDisabled),
    ...style,
  };

  const innerStyle = {
    ...styles.inner,
    ...(isActive && styles.innerActive),
  };

  const textRowStyle = {
    ...styles.textRow,
    ...(isActive && styles.textRowActive),
  };

  const handleFormat = (format) => {
    const commands = {
      bold: () => document.execCommand("bold", false),
      italic: () => document.execCommand("italic", false),
      underline: () => document.execCommand("underline", false),
      bulletList: () => document.execCommand("insertUnorderedList", false),
      numberList: () => document.execCommand("insertOrderedList", false),
      undo: () => document.execCommand("undo", false),
      redo: () => document.execCommand("redo", false),
    };
    commands[format]?.();
    onFormat && onFormat(format);
  };

  const handleSubmit = () => {
    const html = editorRef.current?.innerHTML ?? "";
    onSubmit && onSubmit(html);
    setIsHovered(false);
    editorRef.current?.blur();
  };

  return (
    <div style={styles.wrapper}>
      <div
        style={containerStyle}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => !disabled && setIsHovered(false)}
        {...props}
      >
        <div style={innerStyle}>
          {isActive && (
            <Toolbar activeFormats={activeFormats} onFormat={handleFormat} />
          )}

          <div style={textRowStyle}>
            {isActive ? (
              <div
                ref={editorRef}
                className="rte-editor"
                style={styles.editor}
                contentEditable={!disabled}
                data-placeholder={placeholder}
                onInput={(e) => onChange && onChange(e.currentTarget.innerHTML)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                role="textbox"
                aria-multiline="true"
                suppressContentEditableWarning
              />
            ) : (
              <div
                ref={contentRef}
                style={{
                  ...(hasValue ? styles.filledText : styles.placeholder),
                  ...(disabled && styles.textDisabled),
                  ...(!expanded && overflows && {
                    maxHeight: MAX_HEIGHT,
                    overflow: "hidden",
                  }),
                }}
                onClick={() => isInteractive && setIsFocused(true)}
              >
                {hasValue ? (
                  <span dangerouslySetInnerHTML={{ __html: value }} />
                ) : (
                  placeholder
                )}
              </div>
            )}
          </div>

          {isActive && (
            <div style={styles.footer}>
              <Button variant="primary" size="sm" onClick={handleSubmit}>
                {submitLabel}
              </Button>
            </div>
          )}
        </div>
      </div>

      {!isActive && overflows && (
        <div style={{ paddingLeft: "var(--spacing-sm, 8px)" }}>
          <ShowMoreButton expanded={expanded} onClick={() => setExpanded((e) => !e)} />
        </div>
      )}

      {helperText && <span style={styles.helperText}>{helperText}</span>}
    </div>
  );
};

RichTextInput.displayName = "RichTextInput";
RichTextInputEditable.displayName = "RichTextInputEditable";
RichTextInput.Editable = RichTextInputEditable;

export default RichTextInput;
