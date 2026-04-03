/**
 * Infobox Component
 *
 * A contextual message box with variants for success, warning, error, info, and neutral states.
 * Uses Tailwind CSS with design tokens.
 */

import React from "react";
import { cx } from "../utils/cx.js";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

/** Infobox variants */
export const INFOBOX_VARIANTS = {
  success: "success",
  warning: "warning",
  error: "error",
  info: "info",
  neutral: "neutral",
};

/** Icon mapping for variants */
const VARIANT_ICONS = {
  success: "CheckCircle",
  warning: "ExclamationTriangle",
  error: "XCircle",
  info: "InformationCircle",
  neutral: "InformationCircle",
};

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  base: "flex items-center gap-2 p-4 rounded-md w-full box-border",

  variants: {
    success: "bg-success-50 [&_.infobox-icon]:text-success-500",
    warning: "bg-warning-100 [&_.infobox-icon]:text-warning-400",
    error: "bg-error-200 [&_.infobox-icon]:text-error-400",
    info: "bg-primary-50 [&_.infobox-icon]:text-primary-400",
    neutral: "bg-neutral-100 [&_.infobox-icon]:text-neutral-500",
  },

  content: "flex-1 flex flex-col gap-1",
  header: "flex items-center gap-2",
  icon: "infobox-icon flex items-center justify-center flex-shrink-0",
  title: "flex-1 font-primary text-body-md font-normal text-content-primary",
  description: "pl-7 font-primary text-body-md font-normal text-content-secondary",
};

// ─────────────────────────────────────────────
// INFOBOX COMPONENT
// ─────────────────────────────────────────────

/**
 * Infobox
 *
 * @param {string} variant - success | warning | error | info | neutral (default: "info")
 * @param {string} title - The title text displayed in the infobox (required)
 * @param {string} description - Optional description text below the title
 * @param {string} actionLabel - Label for the action button (optional)
 * @param {function} onAction - Callback function when action button is clicked
 * @param {ReactNode} icon - Custom icon to override the default variant icon
 * @param {string} className - Additional CSS classes
 *
 * @example
 * <Infobox variant="success" title="Operation complete" />
 * <Infobox variant="warning" title="Warning" description="Please review your changes" />
 * <Infobox variant="error" title="Error" description="Something went wrong" actionLabel="Retry" onAction={() => {}} />
 */
export const Infobox = ({
  variant = INFOBOX_VARIANTS.info,
  title,
  description,
  actionLabel,
  onAction,
  icon,
  className,
  ...props
}) => {
  const classes = cx(styles.base, styles.variants[variant], className);
  const iconName = VARIANT_ICONS[variant] || VARIANT_ICONS.info;

  return (
    <div className={classes} role="status" {...props}>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.icon}>
            {icon || <Icon name={iconName} variant="solid" size="md" />}
          </span>
          <span className={styles.title}>{title}</span>
        </div>
        {description && <div className={styles.description}>{description}</div>}
      </div>
      {actionLabel && (
        <Button variant="secondary" size="md" onPress={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

Infobox.displayName = "Infobox";
Infobox.variants = INFOBOX_VARIANTS;

export default Infobox;
