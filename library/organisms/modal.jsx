"use client";

/**
 * Modal Component (Organism)
 *
 * A full-featured modal dialog with header, content area, and footer actions.
 * Use for forms, complex content, and multi-step workflows.
 */

import { useEffect, useRef } from "react";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";

/* ===========================================
   STYLE CONFIGURATION
   =========================================== */

const styles = {
  base: `
    /* Overlay with Blue20 tint */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: var(--color-general-lightbox);
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

    /* Modal container - Grey100 background, Grey90 outline */
    .modal {
      width: 100%;
      max-height: calc(100vh - 48px);
      background: var(--color-general-white);
      box-shadow: var(--shadow-button-hover);
      border-radius: var(--radius-md);
      outline: 1px solid var(--color-action-outline-secondary-enabled);
      outline-offset: -1px;
      display: inline-flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
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

    /* Modal sizes */
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

    /* Header - Grey90 border bottom */
    .modal__header {
      align-self: stretch;
      padding-left: var(--spacing-6);
      padding-right: var(--spacing-6);
      display: inline-flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .modal__header-inner {
      flex: 1 1 0;
      padding-top: var(--spacing-4);
      padding-bottom: var(--spacing-4);
      border-bottom: 1px solid var(--color-action-outline-secondary-enabled);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* Title - Blue20 color, 16px bold */
    .modal__title {
      font-family: var(--font-family-primary);
      font-size: var(--text-heading-h3);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-heading-h3);
      color: var(--color-content-primary);
      margin: 0;
      word-wrap: break-word;
    }

    /* Close button - Grey50 icon */
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
      transition: background var(--transition-fast), color var(--transition-fast);
      flex-shrink: 0;
      overflow: hidden;
    }
    .modal__close:hover {
      background: var(--color-general-neutral-lighter);
      color: var(--color-content-primary);
    }
    .modal__close:focus-visible {
      outline: 2px solid var(--color-content-brand);
      outline-offset: 2px;
    }

    /* Content area - 24px padding, children stretch full width */
    .modal__content {
      align-self: stretch;
      flex: 1;
      overflow-y: auto;
      padding: var(--spacing-6);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
    }
    .modal__content > * {
      width: 100%;
    }
    .modal__content--no-padding {
      padding: 0;
    }

    /* Footer - Grey98 background, Grey90 border top */
    .modal__footer {
      align-self: stretch;
      padding-left: var(--spacing-6);
      padding-right: var(--spacing-6);
      padding-top: var(--spacing-4);
      padding-bottom: var(--spacing-4);
      background: var(--color-general-neutral-lighter);
      border-top: 1px solid var(--color-action-outline-secondary-enabled);
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
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
      justify-content: flex-start;
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
            <div className="modal__header-inner">
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
                  <Icon name="XMark" size="md" />
                </button>
              )}
            </div>
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
                      size="lg"
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
                      size="lg"
                      onClick={onSecondaryClick || onClose}
                    >
                      {secondaryLabel}
                    </Button>
                  )}
                  {primaryLabel && (
                    <Button
                      variant={primaryVariant}
                      size="lg"
                      onClick={onPrimaryClick}
                      isDisabled={primaryDisabled}
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
      <div className="modal__header-inner">
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
                <Icon name="XMark" size="md" />
              </button>
            )}
          </>
        )}
      </div>
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
 */
export const ModalFooter = ({
  children,
  left,
  right,
  className = "",
  ...props
}) => {
  injectStyles();

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

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;
Modal.Button = Button;
Modal.Icon = Icon;

export default Modal;
