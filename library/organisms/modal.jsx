/**
 * Modal Component
 *
 * A full-featured modal dialog with header, content area, and footer actions.
 * Use for forms, complex content, and multi-step workflows.
 */

import React, { useEffect, useRef } from "react";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";

/* ===========================================
   STYLE CONFIGURATION
   =========================================== */

const styles = {
  base: `
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(21, 21, 76, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: var(--spacing-6);
      animation: modal-overlay-fade-in 0.15s ease-out;
    }
    @keyframes modal-overlay-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .modal {
      width: 100%;
      max-height: calc(100vh - 48px);
      background: var(--color-background-white);
      box-shadow: 0px 1px 2px rgba(83, 113, 172, 0.15), 0px 2px 4px rgba(83, 113, 172, 0.20);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-outline-neutral);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: modal-scale-in 0.15s ease-out;
    }
    @keyframes modal-scale-in {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    .modal--sm {
      max-width: 400px;
    }
    .modal--md {
      max-width: 560px;
    }
    .modal--lg {
      max-width: 720px;
    }
    .modal--xl {
      max-width: 960px;
    }
    .modal--full {
      max-width: calc(100vw - 48px);
      max-height: calc(100vh - 48px);
    }

    /* Header */
    .modal__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-4) var(--spacing-6);
      border-bottom: 1px solid var(--color-outline-neutral);
      flex-shrink: 0;
    }
    .modal__title {
      font-family: var(--font-family-primary);
      font-size: var(--text-heading-h4);
      font-weight: var(--font-weight-bold);
      color: var(--color-content-primary);
      line-height: 1.5;
      margin: 0;
    }
    .modal__close {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      color: var(--color-content-secondary);
      transition: background 0.15s ease, color 0.15s ease;
      flex-shrink: 0;
      margin-left: var(--spacing-4);
    }
    .modal__close:hover {
      background: var(--color-background-neutral-light);
      color: var(--color-content-primary);
    }
    .modal__close:focus-visible {
      outline: 2px solid var(--color-outline-focus);
      outline-offset: 2px;
    }

    /* Content */
    .modal__content {
      flex: 1;
      overflow-y: auto;
      padding: var(--spacing-6);
    }
    .modal__content--no-padding {
      padding: 0;
    }

    /* Footer */
    .modal__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-4) var(--spacing-6);
      background: var(--color-background-neutral-lighter);
      border-top: 1px solid var(--color-outline-neutral);
      flex-shrink: 0;
      gap: var(--spacing-4);
    }
    .modal__footer--no-tertiary {
      justify-content: flex-end;
    }
    .modal__footer-left {
      display: flex;
      align-items: center;
      gap: var(--spacing-4);
    }
    .modal__footer-right {
      display: flex;
      align-items: center;
      gap: var(--spacing-6);
    }
  `,
};

/* ===========================================
   STYLE INJECTION (SSR-safe)
   =========================================== */

let stylesInjected = false;

const injectStyles = () => {
  if (stylesInjected || typeof document === "undefined") return;

  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-eureka", "modal");
  styleEl.textContent = styles.base;
  document.head.appendChild(styleEl);
  stylesInjected = true;
};

/* ===========================================
   MODAL COMPONENT
   =========================================== */

/**
 * Modal
 *
 * A full-featured modal with header, scrollable content, and footer actions.
 *
 * @param {boolean} open - Whether the modal is open
 * @param {function} onClose - Called when the modal should close
 * @param {string} title - Modal header title
 * @param {ReactNode} children - Modal content
 * @param {string} size - Modal size: sm | md | lg | xl | full (default: md)
 * @param {boolean} showFooter - Whether to show the footer (default: true)
 * @param {boolean} showClose - Whether to show close button (default: true)
 * @param {string} primaryLabel - Primary button label
 * @param {string} secondaryLabel - Secondary button label
 * @param {string} tertiaryLabel - Tertiary button label (left side)
 * @param {function} onPrimaryClick - Primary button click handler
 * @param {function} onSecondaryClick - Secondary button click handler
 * @param {function} onTertiaryClick - Tertiary button click handler
 * @param {boolean} primaryDisabled - Disable primary button
 * @param {boolean} primaryLoading - Show loading state on primary button
 * @param {string} primaryVariant - Primary button variant (default: "primary")
 * @param {ReactNode} footer - Custom footer content (overrides default buttons)
 * @param {boolean} closeOnOverlayClick - Close when clicking overlay (default: true)
 * @param {boolean} closeOnEscape - Close when pressing Escape (default: true)
 * @param {boolean} contentPadding - Add padding to content area (default: true)
 * @param {string} className - Additional CSS classes for modal
 * @param {string} contentClassName - Additional CSS classes for content area
 *
 * @example
 * // Simple modal with form
 * <Modal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Edit Profile"
 *   primaryLabel="Save"
 *   secondaryLabel="Cancel"
 *   onPrimaryClick={handleSave}
 *   onSecondaryClick={() => setIsOpen(false)}
 * >
 *   <TextInput label="Name" value={name} onChange={setName} />
 *   <TextInput label="Email" value={email} onChange={setEmail} />
 * </Modal>
 *
 * @example
 * // Modal with tertiary action
 * <Modal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirm Changes"
 *   primaryLabel="Save"
 *   secondaryLabel="Cancel"
 *   tertiaryLabel="Reset"
 *   onTertiaryClick={handleReset}
 * >
 *   Are you sure you want to save these changes?
 * </Modal>
 */
export const Modal = ({
  open = false,
  onClose,
  title,
  children,
  size = "md",
  showFooter = true,
  showClose = true,
  primaryLabel,
  secondaryLabel,
  tertiaryLabel,
  onPrimaryClick,
  onSecondaryClick,
  onTertiaryClick,
  primaryDisabled = false,
  primaryLoading = false,
  primaryVariant = "primary",
  footer,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  contentPadding = true,
  className = "",
  contentClassName = "",
  ...props
}) => {
  injectStyles();

  const modalRef = useRef(null);

  // Handle Escape key
  useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEscape, onClose]);

  // Focus trap and body scroll lock
  useEffect(() => {
    if (!open) return;

    const previousActiveElement = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus the modal
    modalRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      previousActiveElement?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  const modalClasses = [
    "modal",
    `modal--${size}`,
    className,
  ].filter(Boolean).join(" ");

  const contentClasses = [
    "modal__content",
    !contentPadding && "modal__content--no-padding",
    contentClassName,
  ].filter(Boolean).join(" ");

  const footerClasses = [
    "modal__footer",
    !tertiaryLabel && "modal__footer--no-tertiary",
  ].filter(Boolean).join(" ");

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const hasFooterActions = primaryLabel || secondaryLabel || tertiaryLabel || footer;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        ref={modalRef}
        className={modalClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        tabIndex={-1}
        {...props}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="modal__header">
            {title && (
              <h2 id="modal-title" className="modal__title">
                {title}
              </h2>
            )}
            {showClose && (
              <button
                className="modal__close"
                onClick={onClose}
                aria-label="Close modal"
                type="button"
              >
                <Icon name="XMark" size="sm" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className={contentClasses}>
          {children}
        </div>

        {/* Footer */}
        {showFooter && hasFooterActions && (
          <div className={footerClasses}>
            {footer || (
              <>
                {/* Left side - Tertiary action */}
                <div className="modal__footer-left">
                  {tertiaryLabel && (
                    <Button
                      variant="tertiary"
                      size="md"
                      onClick={onTertiaryClick}
                    >
                      {tertiaryLabel}
                    </Button>
                  )}
                </div>

                {/* Right side - Secondary and Primary */}
                <div className="modal__footer-right">
                  {secondaryLabel && (
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={onSecondaryClick || onClose}
                    >
                      {secondaryLabel}
                    </Button>
                  )}
                  {primaryLabel && (
                    <Button
                      variant={primaryVariant}
                      size="md"
                      onClick={onPrimaryClick}
                      disabled={primaryDisabled}
                      loading={primaryLoading}
                    >
                      {primaryLabel}
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.displayName = "Modal";

/* ===========================================
   MODAL HEADER (for composition)
   =========================================== */

/**
 * ModalHeader
 *
 * Header component for custom modal composition.
 *
 * @param {string} title - Header title
 * @param {function} onClose - Close button handler
 * @param {boolean} showClose - Show close button (default: true)
 * @param {ReactNode} children - Custom header content
 */
export const ModalHeader = ({
  title,
  onClose,
  showClose = true,
  children,
  className = "",
  ...props
}) => {
  injectStyles();

  return (
    <div className={`modal__header ${className}`} {...props}>
      {children || (
        <>
          {title && <h2 className="modal__title">{title}</h2>}
          {showClose && (
            <button
              className="modal__close"
              onClick={onClose}
              aria-label="Close modal"
              type="button"
            >
              <Icon name="XMark" size="sm" />
            </button>
          )}
        </>
      )}
    </div>
  );
};

ModalHeader.displayName = "ModalHeader";

/* ===========================================
   MODAL CONTENT (for composition)
   =========================================== */

/**
 * ModalContent
 *
 * Content area component for custom modal composition.
 *
 * @param {ReactNode} children - Content
 * @param {boolean} padding - Add padding (default: true)
 */
export const ModalContent = ({
  children,
  padding = true,
  className = "",
  ...props
}) => {
  injectStyles();

  const classes = [
    "modal__content",
    !padding && "modal__content--no-padding",
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

ModalContent.displayName = "ModalContent";

/* ===========================================
   MODAL FOOTER (for composition)
   =========================================== */

/**
 * ModalFooter
 *
 * Footer component for custom modal composition.
 *
 * @param {ReactNode} children - Footer content (buttons, etc.)
 * @param {ReactNode} left - Left side content
 * @param {ReactNode} right - Right side content
 */
export const ModalFooter = ({
  children,
  left,
  right,
  className = "",
  ...props
}) => {
  injectStyles();

  const hasLeftRight = left || right;

  return (
    <div className={`modal__footer ${className}`} {...props}>
      {children || (
        <>
          <div className="modal__footer-left">{left}</div>
          <div className="modal__footer-right">{right}</div>
        </>
      )}
    </div>
  );
};

ModalFooter.displayName = "ModalFooter";

export default Modal;
