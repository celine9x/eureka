/**
 * Infobox Component
 *
 * A contextual message box with variants for success, warning, error, info, and neutral states.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <Infobox variant="success" title="Operation complete" />
 * <Infobox variant="warning" title="Warning" description="Please review your changes" />
 * <Infobox variant="error" title="Error" actionLabel="Retry" onAction={() => {}} />
 */

import React from "react";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

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
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
    padding: "var(--spacing-md)",
    borderRadius: "var(--radius-md)",
    width: "100%",
    boxSizing: "border-box",
  },

  variants: {
    success: {
      background: "var(--color-general-positive)",
    },
    warning: {
      background: "var(--color-general-warning)",
    },
    error: {
      background: "var(--color-general-negative)",
    },
    info: {
      background: "var(--color-general-informative)",
    },
    neutral: {
      background: "var(--color-general-neutral-light)",
    },
  },

  iconVariants: {
    success: {
      color: "var(--color-content-positive)",
    },
    warning: {
      color: "var(--color-content-warning)",
    },
    error: {
      color: "var(--color-content-negative)",
    },
    info: {
      color: "var(--color-action-fill-primary-enabled)",
    },
    neutral: {
      color: "var(--color-content-secondary)",
    },
  },

  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
  },

  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  title: {
    flex: 1,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-primary)",
  },

  description: {
    paddingLeft: 28,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-secondary)",
  },
};

// ─────────────────────────────────────────────
// INFOBOX COMPONENT
// ─────────────────────────────────────────────

/**
 * Infobox
 *
 */
export const Infobox = ({
  variant = INFOBOX_VARIANTS.info,
  title,
  description,
  actionLabel,
  onAction,
  icon,
  style,
  ...props
}) => {
  const iconName = VARIANT_ICONS[variant] || VARIANT_ICONS.info;

  // Compose box styles
  const boxStyle = {
    ...styles.base,
    ...styles.variants[variant],
    ...style,
  };

  // Icon styles
  const iconStyle = {
    ...styles.icon,
    ...styles.iconVariants[variant],
  };

  return (
    <div style={boxStyle} role="status" {...props}>
      <div style={styles.content}>
        <div style={styles.header}>
          <span style={iconStyle}>
            {icon || <Icon name={iconName} variant="solid" size="md" />}
          </span>
          <span style={styles.title}>{title}</span>
        </div>
        {description && <div style={styles.description}>{description}</div>}
      </div>
      {actionLabel && (
        <Button variant="secondary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

Infobox.displayName = "Infobox";
Infobox.variants = INFOBOX_VARIANTS;

export default Infobox;
