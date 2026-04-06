"use client";

/**
 * AiChatInput Molecule
 *
 * A reusable chat composer with optional leading action and send action.
 * Uses Button atom actions and design tokens for consistent styling.
 */

import { forwardRef, useState } from "react";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";
import { Attachment, ATTACHMENT_VARIANTS } from "./attachment.jsx";

const SCROLLBAR_HIDDEN_CLASS = "ai-chat-input__attachments-strip";
const SCROLLBAR_HIDDEN_STYLES = `
.${SCROLLBAR_HIDDEN_CLASS} {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.${SCROLLBAR_HIDDEN_CLASS}::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}
`;

let scrollbarStylesInjected = false;

const injectScrollbarHiddenStyles = () => {
  if (scrollbarStylesInjected || typeof document === "undefined") return;

  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-eureka", "ai-chat-input-scrollbar-hidden");
  styleEl.textContent = SCROLLBAR_HIDDEN_STYLES;
  document.head.appendChild(styleEl);
  scrollbarStylesInjected = true;
};

export const AI_CHAT_INPUT_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

const styles = {
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-2)",
  },
  label: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-secondary)",
  },
  shell: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-2)",
    background: "var(--color-general-white)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-light-down)",
    boxSizing: "border-box",
    transition: "all var(--transition-fast)",
  },
  shellFocused: {
    outlineColor: "var(--color-interaction-outline-active)",
    boxShadow: "var(--shadow-focus)",
  },
  shellDisabled: {
    background: "var(--color-general-neutral-lighter)",
    opacity: 0.75,
  },
  attachmentsStrip: {
    width: "100%",
    display: "flex",
    gap: "var(--spacing-2)",
    overflowX: "auto",
    overflowY: "hidden",
    paddingBottom: "var(--spacing-1)",
    WebkitOverflowScrolling: "touch",
  },
  attachmentItem: {
    flex: "0 0 auto",
  },
  textarea: {
    width: "100%",
    border: "none",
    background: "transparent",
    resize: "none",
    outline: "none",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-primary)",
    boxSizing: "border-box",
  },
  footer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-2)",
  },
  footerLeft: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-2)",
    minWidth: 0,
  },
  footerRight: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-2)",
    flexShrink: 0,
  },
  helper: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-caption)",
    lineHeight: "var(--line-height-body-caption)",
    color: "var(--color-content-secondary)",
  },
  count: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-caption)",
    lineHeight: "var(--line-height-body-caption)",
    color: "var(--color-content-secondary)",
  },
  sizes: {
    sm: {
      shell: {
        padding: "var(--spacing-sm)",
      },
      textarea: {
        minHeight: 56,
      },
    },
    md: {
      shell: {
        padding: "var(--spacing-3)",
      },
      textarea: {
        minHeight: 80,
      },
    },
    lg: {
      shell: {
        padding: "var(--spacing-4)",
      },
      textarea: {
        minHeight: 104,
      },
    },
  },
};

export const AiChatInput = forwardRef(
  (
    {
      value,
      defaultValue = "",
      onChange,
      onSubmit,
      onAttach,
      attachments = [],
      onRemoveAttachment,
      onAttachmentsChange,
      placeholder = "Ask AI anything...",
      label,
      helperText,
      submitLabel = "Send",
      submitIconName = "ArrowRight",
      leadingButtonLabel = "Attach",
      leadingButtonIconName = "Plus",
      showLeadingButton = true,
      showSubmitButton = true,
      isDisabled = false,
      disabled,
      isSubmitting = false,
      maxLength,
      size = AI_CHAT_INPUT_SIZES.md,
      style,
      textareaStyle,
      id,
      name,
      rows,
      ...props
    },
    ref
  ) => {
    injectScrollbarHiddenStyles();

    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isFocused, setIsFocused] = useState(false);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const isInputDisabled = Boolean(isDisabled || disabled || isSubmitting);

    const sizeStyles = styles.sizes[size] || styles.sizes.md;

    const handleChange = (event) => {
      const nextValue = event.target.value;
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onChange?.(nextValue, event);
    };

    const handleSubmit = () => {
      const trimmed = String(currentValue || "").trim();
      if (!trimmed || isInputDisabled) return;
      onSubmit?.(trimmed);
    };

    const handleKeyDown = (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSubmit();
      }
    };

    const canSubmit = String(currentValue || "").trim().length > 0 && !isInputDisabled;

    const handleRemoveAttachment = (attachment, index) => {
      onRemoveAttachment?.(attachment, index);

      if (typeof onAttachmentsChange === "function") {
        const next = attachments.filter((_, itemIndex) => itemIndex !== index);
        onAttachmentsChange(next, { removed: attachment, index });
      }
    };

    return (
      <div style={{ ...styles.root, ...style }}>
        {label ? <p style={styles.label}>{label}</p> : null}

        <div
          style={{
            ...styles.shell,
            ...sizeStyles.shell,
            ...(isFocused ? styles.shellFocused : null),
            ...(isInputDisabled ? styles.shellDisabled : null),
          }}
        >
          {attachments.length > 0 ? (
            <div className={SCROLLBAR_HIDDEN_CLASS} style={styles.attachmentsStrip}>
              {attachments.map((attachment, index) => {
                const key =
                  attachment?.id || attachment?.key || attachment?.fileName || attachment?.name || index;
                const fileName =
                  attachment?.fileName || attachment?.name || `Attachment ${index + 1}`;
                const fileIconName = attachment?.fileIconName || attachment?.iconName || "DocumentText";

                return (
                  <div key={key} style={styles.attachmentItem}>
                    <Attachment
                      variant={ATTACHMENT_VARIANTS.card}
                      fileName={fileName}
                      fileIconName={fileIconName}
                      showMeta={false}
                      actions={[
                        <Button
                          variant="tertiary"
                          size="sm"
                          iconOnly
                          ariaLabel={`Remove ${fileName}`}
                          iconLeading={<Icon name="XMark" size="sm" />}
                          onClick={() => handleRemoveAttachment(attachment, index)}
                        />,
                      ]}
                    />
                  </div>
                );
              })}
            </div>
          ) : null}

          <textarea
            ref={ref}
            id={id}
            name={name}
            value={currentValue}
            rows={rows}
            maxLength={maxLength}
            disabled={isInputDisabled}
            placeholder={placeholder}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            style={{ ...styles.textarea, ...sizeStyles.textarea, ...textareaStyle }}
            {...props}
          />

          <div style={styles.footer}>
            <div style={styles.footerLeft}>
              {showLeadingButton ? (
                <Button
                  variant="secondary"
                  size="sm"
                  iconLeading={<Icon name={leadingButtonIconName} size="sm" />}
                  onClick={onAttach}
                  isDisabled={isInputDisabled}
                >
                  {leadingButtonLabel}
                </Button>
              ) : null}

              {helperText ? <p style={styles.helper}>{helperText}</p> : null}
            </div>

            <div style={styles.footerRight}>
              {typeof maxLength === "number" ? (
                <p style={styles.count}>
                  {String(currentValue || "").length}/{maxLength}
                </p>
              ) : null}

              {showSubmitButton ? (
                <Button
                  variant="primary"
                  size="sm"
                  iconTrailing={<Icon name={submitIconName} size="sm" />}
                  onClick={handleSubmit}
                  isDisabled={!canSubmit}
                  isLoading={isSubmitting}
                >
                  {submitLabel}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

AiChatInput.displayName = "AiChatInput";

export default AiChatInput;
