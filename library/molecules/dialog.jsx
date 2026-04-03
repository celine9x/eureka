/**
 * Dialog Component
 *
 * A modal dialog component for confirmations, alerts, and user interactions.
 * Uses Tailwind CSS with design tokens and react-aria-components for accessibility.
 */

import React, { useEffect, useRef } from "react";
import {
  DialogTrigger,
  Modal,
  ModalOverlay,
  Dialog as AriaDialog,
  Heading,
} from "react-aria-components";
import { cx } from "../utils/cx.js";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

/** Dialog variants */
export const DIALOG_VARIANTS = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
};

/** Dialog sizes */
export const DIALOG_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

/** Actions alignment */
export const DIALOG_ACTIONS_ALIGN = {
  spread: "spread",
  center: "center",
  end: "end",
};

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  overlay: [
    "fixed inset-0 bg-[rgba(21,21,76,0.4)] z-[1000]",
    "flex items-center justify-center",
    "entering:animate-[dialog-overlay-fade-in_0.15s_ease-out]",
    "exiting:animate-[dialog-overlay-fade-out_0.15s_ease-in]",
  ].join(" "),

  modal: [
    "w-[500px] max-w-[calc(100vw-32px)] p-6 relative",
    "bg-background-white shadow-medium-down rounded-lg border border-outline-neutral",
    "flex flex-col items-center gap-6",
    "entering:animate-[dialog-scale-in_0.15s_ease-out]",
    "exiting:animate-[dialog-scale-out_0.15s_ease-in]",
    "outline-none",
  ].join(" "),

  sizes: {
    sm: "w-[400px]",
    md: "w-[500px]",
    lg: "w-[600px]",
  },

  close: [
    "absolute top-4 right-4 size-6 flex items-center justify-center",
    "bg-transparent border-none rounded-sm cursor-pointer",
    "text-content-secondary transition-all duration-fast",
    "hover:bg-background-neutral-light hover:text-content-primary",
    "focus-visible:outline-2 focus-visible:outline-[var(--color-outline-focus)] focus-visible:outline-offset-2",
  ].join(" "),

  content: "flex flex-col items-center gap-2 self-stretch",

  icon: "size-10 rounded-full flex items-center justify-center",

  iconVariants: {
    info: "bg-primary-100 text-primary-600",
    success: "bg-success-100 text-success-600",
    warning: "bg-warning-100 text-warning-600",
    error: "bg-error-100 text-error-600",
  },

  title: "font-primary text-heading-h4 font-semibold text-content-primary text-center m-0",

  message: "font-primary text-body-md font-normal text-content-primary text-center leading-relaxed m-0",

  actions: "flex items-center self-stretch gap-4",

  actionsAlign: {
    spread: "justify-between",
    center: "justify-center",
    end: "justify-end",
  },

  actionsLeft: "flex items-center gap-4",
  actionsRight: "flex items-center gap-3",
};

/** Icon mapping for variants */
const VARIANT_ICONS = {
  info: "InformationCircle",
  success: "CheckCircle",
  warning: "ExclamationTriangle",
  error: "ExclamationCircle",
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
 * @param {string} className - Additional CSS classes
 *
 * @example
 * // Simple confirmation
 * <Dialog
 *   isOpen={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Confirm Action"
 *   primaryLabel="Confirm"
 *   secondaryLabel="Cancel"
 *   onPrimaryPress={handleConfirm}
 *   onSecondaryPress={() => setIsOpen(false)}
 * >
 *   Are you sure you want to proceed?
 * </Dialog>
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
  className = "",
  ...props
}) => {
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

  const modalClasses = cx(
    styles.modal,
    size !== DIALOG_SIZES.md && styles.sizes[size],
    className
  );

  const actionsClasses = cx(
    styles.actions,
    styles.actionsAlign[actionsAlign]
  );

  return (
    <ModalOverlay
      isOpen={resolvedIsOpen}
      onOpenChange={resolvedOnOpenChange}
      isDismissable={resolvedIsDismissable}
      className={styles.overlay}
    >
      <Modal className={modalClasses} {...props}>
        <AriaDialog className="outline-none w-full flex flex-col items-center gap-6">
          {/* Close Button */}
          {showClose && (
            <button
              className={styles.close}
              onClick={handleClose}
              aria-label="Close dialog"
              type="button"
            >
              <Icon name="XMark" size="sm" />
            </button>
          )}

          {/* Content */}
          <div className={styles.content}>
            {/* Icon */}
            {showIcon && (
              <div className={cx(styles.icon, styles.iconVariants[variant])}>
                {icon || <Icon name={resolvedIconName} size="md" />}
              </div>
            )}

            {/* Title */}
            {title && (
              <Heading slot="title" className={styles.title}>
                {title}
              </Heading>
            )}

            {/* Message */}
            {children && (
              <p className={styles.message}>{children}</p>
            )}
          </div>

          {/* Actions */}
          {(actions || hasLeftActions || hasPrimaryAction) && (
            <div className={actionsClasses}>
              {actions || (
                <>
                  {/* Left Actions */}
                  {hasLeftActions && (
                    <div className={styles.actionsLeft}>
                      {tertiaryLabel && (
                        <Button
                          variant="tertiary"
                          size="md"
                          onPress={resolvedOnTertiaryPress || handleClose}
                        >
                          {tertiaryLabel}
                        </Button>
                      )}
                      {secondaryLabel && (
                        <Button
                          variant="secondary"
                          size="md"
                          onPress={resolvedOnSecondaryPress || handleClose}
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
                    <div className={styles.actionsRight}>
                      <Button
                        variant={resolvedPrimaryVariant}
                        size="lg"
                        onPress={resolvedOnPrimaryPress}
                      >
                        {primaryLabel}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </AriaDialog>
      </Modal>
    </ModalOverlay>
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
