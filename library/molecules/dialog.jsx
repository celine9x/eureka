/**
 * Dialog Component
 *
 * A modal dialog component for confirmations, alerts, and user interactions.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <Dialog
 *   isOpen={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Confirm Action"
 *   primaryLabel="Confirm"
 *   secondaryLabel="Cancel"
 * >
 *   Are you sure you want to proceed?
 * </Dialog>
 */

import { useEffect, useRef, useState } from "react";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const DIALOG_VARIANTS = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
};

export const DIALOG_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

export const DIALOG_ACTIONS_ALIGN = {
  spread: "spread",
  center: "center",
  end: "end",
};

/** Icon mapping for variants */
const VARIANT_ICONS = {
  info: "InformationCircle",
  success: "CheckCircle",
  warning: "ExclamationTriangle",
  error: "ExclamationCircle",
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(21, 21, 76, 0.4)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  modal: {
    width: 500,
    maxWidth: "calc(100vw - 32px)",
    padding: 24,
    position: "relative",
    background: "var(--color-general-white)",
    boxShadow: "var(--shadow-medium-down)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--color-action-outline-secondary-enabled)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 24,
    outline: "none",
  },

  sizes: {
    sm: { width: 400 },
    md: { width: 500 },
    lg: { width: 600 },
  },

  close: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
    border: "none",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    color: "var(--color-content-secondary)",
    transition: "all var(--transition-fast)",
  },

  closeHover: {
    background: "var(--color-general-neutral-light)",
    color: "var(--color-content-primary)",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    alignSelf: "stretch",
  },

  icon: {
    width: 40,
    height: 40,
    borderRadius: "var(--radius-full)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  iconVariants: {
    info: {
      background: "var(--color-general-informative)",
      color: "var(--color-action-fill-primary-enabled)",
    },
    success: {
      background: "rgba(115, 229, 172, 0.2)",
      color: "var(--color-content-positive)",
    },
    warning: {
      background: "rgba(255, 199, 0, 0.2)",
      color: "var(--color-content-warning)",
    },
    error: {
      background: "rgba(255, 115, 115, 0.2)",
      color: "var(--color-content-negative)",
    },
  },

  title: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-heading-h4)",
    fontWeight: 600,
    color: "var(--color-content-primary)",
    textAlign: "center",
    margin: 0,
  },

  message: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: 400,
    color: "var(--color-content-primary)",
    textAlign: "center",
    lineHeight: 1.6,
    margin: 0,
  },

  actions: {
    display: "flex",
    alignItems: "center",
    alignSelf: "stretch",
    gap: 16,
  },

  actionsAlign: {
    spread: { justifyContent: "space-between" },
    center: { justifyContent: "center" },
    end: { justifyContent: "flex-end" },
  },

  actionsLeft: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },

  actionsRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
};

// ─────────────────────────────────────────────
// DIALOG COMPONENT
// ─────────────────────────────────────────────

/**
 * Dialog
 *
 * A modal dialog for confirmations, alerts, and user interactions.
 *
 * @param {boolean} isOpen - Whether the dialog is open
 * @param {function} onOpenChange - Called when dialog open state changes
 * @param {string} variant - Visual variant: info | success | warning | error (default: info)
 * @param {string} size - Dialog size: sm | md | lg (default: md)
 * @param {string} title - Optional dialog title
 * @param {ReactNode} children - Dialog message/content
 * @param {ReactNode} icon - Custom icon element (overrides variant icon)
 * @param {string} iconName - Custom icon name (overrides variant icon)
 * @param {boolean} showIcon - Whether to show the icon (default: true)
 * @param {boolean} showClose - Whether to show close button (default: true)
 * @param {ReactNode} actions - Custom actions (overrides default buttons)
 * @param {string} primaryLabel - Primary button label (default: "Confirm")
 * @param {string} secondaryLabel - Secondary button label
 * @param {string} tertiaryLabel - Tertiary button label
 * @param {function} onPrimaryPress - Primary button press handler
 * @param {function} onSecondaryPress - Secondary button press handler
 * @param {function} onTertiaryPress - Tertiary button press handler
 * @param {string} primaryVariant - Primary button variant (default: "primary", or "negative" for error)
 * @param {boolean} isDismissable - Allow closing by clicking overlay (default: true)
 * @param {string} actionsAlign - Actions alignment: spread | center | end (default: spread)
 * @param {object} style - Additional inline styles
 */
export const Dialog = ({
  isOpen = false,
  onOpenChange,
  open, // Support legacy prop
  onClose, // Support legacy prop
  variant = DIALOG_VARIANTS.info,
  size = DIALOG_SIZES.md,
  title,
  children,
  icon,
  iconName,
  showIcon = true,
  showClose = true,
  actions,
  primaryLabel = "Confirm",
  secondaryLabel,
  tertiaryLabel,
  onPrimaryPress,
  onSecondaryPress,
  onTertiaryPress,
  onPrimaryClick, // Support legacy prop
  onSecondaryClick, // Support legacy prop
  onTertiaryClick, // Support legacy prop
  primaryVariant,
  isDismissable = true,
  closeOnOverlayClick, // Support legacy prop
  actionsAlign = DIALOG_ACTIONS_ALIGN.spread,
  style,
  ...props
}) => {
  const [closeHovered, setCloseHovered] = useState(false);
  const modalRef = useRef(null);

  // Support legacy props
  const resolvedIsOpen = isOpen ?? open ?? false;
  const resolvedOnOpenChange = onOpenChange ?? ((open) => !open && onClose?.());
  const resolvedIsDismissable = isDismissable ?? closeOnOverlayClick ?? true;
  const resolvedOnPrimaryPress = onPrimaryPress ?? onPrimaryClick;
  const resolvedOnSecondaryPress = onSecondaryPress ?? onSecondaryClick;
  const resolvedOnTertiaryPress = onTertiaryPress ?? onTertiaryClick;

  const resolvedIconName = iconName || VARIANT_ICONS[variant];
  const resolvedPrimaryVariant = primaryVariant || (variant === DIALOG_VARIANTS.error ? "negative" : "primary");

  const hasLeftActions = tertiaryLabel || secondaryLabel;
  const hasPrimaryAction = primaryLabel || resolvedOnPrimaryPress;

  const handleClose = () => resolvedOnOpenChange(false);

  const handleOverlayClick = (e) => {
    if (resolvedIsDismissable && e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && resolvedIsOpen) {
        handleClose();
      }
    };

    if (resolvedIsOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [resolvedIsOpen]);

  // Focus trap
  useEffect(() => {
    if (resolvedIsOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [resolvedIsOpen]);

  if (!resolvedIsOpen) return null;

  // Compose modal styles
  const modalStyle = {
    ...styles.modal,
    ...styles.sizes[size],
    ...style,
  };

  // Icon styles
  const iconStyle = {
    ...styles.icon,
    ...styles.iconVariants[variant],
  };

  // Actions styles
  const actionsStyle = {
    ...styles.actions,
    ...styles.actionsAlign[actionsAlign],
  };

  // Close button styles
  const closeStyle = {
    ...styles.close,
    ...(closeHovered && styles.closeHover),
  };

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div
        ref={modalRef}
        style={modalStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "dialog-title" : undefined}
        tabIndex={-1}
        {...props}
      >
        {/* Close Button */}
        {showClose && (
          <button
            type="button"
            style={closeStyle}
            onClick={handleClose}
            onMouseEnter={() => setCloseHovered(true)}
            onMouseLeave={() => setCloseHovered(false)}
            aria-label="Close dialog"
          >
            <Icon name="XMark" size="sm" />
          </button>
        )}

        {/* Content */}
        <div style={styles.content}>
          {/* Icon */}
          {showIcon && (
            <div style={iconStyle}>
              {icon || <Icon name={resolvedIconName} size="md" />}
            </div>
          )}

          {/* Title */}
          {title && (
            <h2 id="dialog-title" style={styles.title}>
              {title}
            </h2>
          )}

          {/* Message */}
          {children && <p style={styles.message}>{children}</p>}
        </div>

        {/* Actions */}
        {(actions || hasLeftActions || hasPrimaryAction) && (
          <div style={actionsStyle}>
            {actions || (
              <>
                {/* Left Actions */}
                {hasLeftActions && (
                  <div style={styles.actionsLeft}>
                    {tertiaryLabel && (
                      <Button
                        variant="tertiary"
                        size="md"
                        onClick={resolvedOnTertiaryPress || handleClose}
                      >
                        {tertiaryLabel}
                      </Button>
                    )}
                    {secondaryLabel && (
                      <Button
                        variant="secondary"
                        size="md"
                        onClick={resolvedOnSecondaryPress || handleClose}
                      >
                        {secondaryLabel}
                      </Button>
                    )}
                  </div>
                )}

                {/* Spacer when no left actions but spread alignment */}
                {!hasLeftActions && actionsAlign === "spread" && <div />}

                {/* Primary Action */}
                {hasPrimaryAction && (
                  <div style={styles.actionsRight}>
                    <Button
                      variant={resolvedPrimaryVariant}
                      size="lg"
                      onClick={resolvedOnPrimaryPress}
                    >
                      {primaryLabel}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Dialog.displayName = "Dialog";
Dialog.variants = DIALOG_VARIANTS;
Dialog.sizes = DIALOG_SIZES;
Dialog.actionsAlign = DIALOG_ACTIONS_ALIGN;

// ─────────────────────────────────────────────
// CONFIRM DIALOG (convenience wrapper)
// ─────────────────────────────────────────────

/**
 * ConfirmDialog
 *
 * A convenience wrapper for common confirmation dialogs.
 */
export const ConfirmDialog = ({
  isOpen,
  onOpenChange,
  onConfirm,
  onCancel,
  title,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "info",
  destructive = false,
  ...props
}) => {
  const resolvedVariant = destructive ? DIALOG_VARIANTS.error : variant;
  const handleClose = () => onOpenChange?.(false);

  return (
    <Dialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      variant={resolvedVariant}
      title={title}
      primaryLabel={confirmLabel}
      secondaryLabel={cancelLabel}
      onPrimaryPress={onConfirm}
      onSecondaryPress={onCancel || handleClose}
      {...props}
    >
      {children}
    </Dialog>
  );
};

ConfirmDialog.displayName = "ConfirmDialog";

// ─────────────────────────────────────────────
// ALERT DIALOG (single action)
// ─────────────────────────────────────────────

/**
 * AlertDialog
 *
 * A simple alert dialog with a single acknowledge button.
 */
export const AlertDialog = ({
  isOpen,
  onOpenChange,
  title,
  children,
  buttonLabel = "OK",
  variant = "info",
  ...props
}) => {
  const handleClose = () => onOpenChange?.(false);

  return (
    <Dialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      variant={variant}
      title={title}
      primaryLabel={buttonLabel}
      onPrimaryPress={handleClose}
      actionsAlign="center"
      showClose={false}
      {...props}
    >
      {children}
    </Dialog>
  );
};

AlertDialog.displayName = "AlertDialog";

export default Dialog;
