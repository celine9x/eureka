/**
 * MiniInfobox Component
 *
 * A compact inline message with an icon and text.
 * Supports success, warning, error, info, neutral, and AI variants.
 * Uses Tailwind CSS with design tokens.
 */

import React from "react";
import { cx } from "../utils/cx.js";
import { Icon } from "../atoms/icon.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

/** MiniInfobox variants */
export const MINIINFOBOX_VARIANTS = {
  success: "success",
  warning: "warning",
  error: "error",
  info: "info",
  neutral: "neutral",
  ai: "ai",
};

/** Icon mapping for variants */
const VARIANT_ICONS = {
  success: "CheckCircle",
  warning: "ExclamationTriangle",
  error: "XCircle",
  info: "InformationCircle",
  neutral: "InformationCircle",
  ai: "Sparkles",
};

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  base: "inline-flex items-center gap-1 font-primary text-body-md font-normal text-content-secondary",

  variants: {
    success: "[&_.miniinfobox-icon]:text-success-500",
    warning: "[&_.miniinfobox-icon]:text-warning-400",
    error: "[&_.miniinfobox-icon]:text-error-400",
    info: "[&_.miniinfobox-icon]:text-primary-400",
    neutral: "[&_.miniinfobox-icon]:text-neutral-500",
    ai: "text-content-brand [&_.miniinfobox-icon]:bg-gradient-to-r [&_.miniinfobox-icon]:from-[#4649FF] [&_.miniinfobox-icon]:to-[#0EDDA5] [&_.miniinfobox-icon]:bg-clip-text [&_.miniinfobox-icon]:text-transparent",
  },

  icon: "miniinfobox-icon flex-shrink-0 flex items-center justify-center size-icon-sm",
  message: "flex-1",
};

// ─────────────────────────────────────────────
// AI GRADIENT SVG DEFINITION
// ─────────────────────────────────────────────

const AIGradientDef = () => (
  <svg width="0" height="0" style={{ position: "absolute" }}>
    <defs>
      <linearGradient id="miniinfobox-ai-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4649FF" />
        <stop offset="100%" stopColor="#0EDDA5" />
      </linearGradient>
    </defs>
  </svg>
);

// ─────────────────────────────────────────────
// MINIINFOBOX COMPONENT
// ─────────────────────────────────────────────

/**
 * MiniInfobox
 *
 * @param {string} variant - success | warning | error | info | neutral | ai (default: "info")
 * @param {string} message - The message text to display (required)
 * @param {ReactNode} icon - Custom icon to override the default variant icon
 * @param {string} iconName - Custom icon name to use instead of variant default
 * @param {string} className - Additional CSS classes
 *
 * @example
 * <MiniInfobox variant="success" message="Operation completed successfully" />
 * <MiniInfobox variant="warning" message="Please review your changes" />
 * <MiniInfobox variant="error" message="An error occurred" />
 * <MiniInfobox variant="ai" message="AI-generated content" />
 */
export const MiniInfobox = ({
  variant = MINIINFOBOX_VARIANTS.info,
  message,
  icon,
  iconName,
  className,
  children,
  ...props
}) => {
  const classes = cx(styles.base, styles.variants[variant], className);

  const defaultIconName = VARIANT_ICONS[variant] || VARIANT_ICONS.info;
  const finalIconName = iconName || defaultIconName;

  // Use children as message if message prop not provided
  const displayMessage = message || children;

  return (
    <div className={classes} role="status" {...props}>
      {variant === "ai" && <AIGradientDef />}
      <span className={styles.icon}>
        {icon || <Icon name={finalIconName} variant="solid" size="sm" />}
      </span>
      <span className={styles.message}>{displayMessage}</span>
    </div>
  );
};

MiniInfobox.displayName = "MiniInfobox";
MiniInfobox.variants = MINIINFOBOX_VARIANTS;

export default MiniInfobox;
