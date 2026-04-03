/**
 * MiniInfobox Component
 *
 * A compact inline message with an icon and text.
 * Supports success, warning, error, info, neutral, and AI variants.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 */

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
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: 400,
    color: "var(--color-content-secondary)",
  },

  variants: {
    success: {
      icon: { color: "var(--color-content-positive)" },
    },
    warning: {
      icon: { color: "var(--color-content-warning)" },
    },
    error: {
      icon: { color: "var(--color-content-negative)" },
    },
    info: {
      icon: { color: "var(--color-action-fill-primary-enabled)" },
    },
    neutral: {
      icon: { color: "var(--color-content-secondary)" },
    },
    ai: {
      text: { color: "var(--color-content-brand)" },
      // AI gradient is handled via SVG fill
    },
  },

  icon: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 16,
    height: 16,
  },

  message: {
    flex: 1,
  },
};

// ─────────────────────────────────────────────
// AI GRADIENT ICON
// ─────────────────────────────────────────────

const AIGradientIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="miniinfobox-ai-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4649FF" />
        <stop offset="100%" stopColor="#0EDDA5" />
      </linearGradient>
    </defs>
    <path
      d="M8.05 1.067a.6.6 0 0 0-1.1 0L5.983 3.4a.6.6 0 0 1-.283.283L3.367 4.65a.6.6 0 0 0 0 1.1l2.333.967a.6.6 0 0 1 .283.283l.967 2.333a.6.6 0 0 0 1.1 0l.967-2.333a.6.6 0 0 1 .283-.283l2.333-.967a.6.6 0 0 0 0-1.1L9.3 3.683a.6.6 0 0 1-.283-.283L8.05 1.067Z"
      fill="url(#miniinfobox-ai-gradient)"
    />
    <path
      d="M12.05 8.067a.6.6 0 0 0-1.1 0l-.617 1.483a.6.6 0 0 1-.283.283l-1.483.617a.6.6 0 0 0 0 1.1l1.483.617a.6.6 0 0 1 .283.283l.617 1.483a.6.6 0 0 0 1.1 0l.617-1.483a.6.6 0 0 1 .283-.283l1.483-.617a.6.6 0 0 0 0-1.1l-1.483-.617a.6.6 0 0 1-.283-.283l-.617-1.483Z"
      fill="url(#miniinfobox-ai-gradient)"
    />
    <path
      d="M4.55 9.567a.6.6 0 0 0-1.1 0l-.367.883a.6.6 0 0 1-.283.283l-.883.367a.6.6 0 0 0 0 1.1l.883.367a.6.6 0 0 1 .283.283l.367.883a.6.6 0 0 0 1.1 0l.367-.883a.6.6 0 0 1 .283-.283l.883-.367a.6.6 0 0 0 0-1.1l-.883-.367a.6.6 0 0 1-.283-.283l-.367-.883Z"
      fill="url(#miniinfobox-ai-gradient)"
    />
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
 * @param {object} style - Additional inline styles
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
  style,
  children,
  ...props
}) => {
  const variantStyles = styles.variants[variant] || styles.variants.info;
  const defaultIconName = VARIANT_ICONS[variant] || VARIANT_ICONS.info;
  const finalIconName = iconName || defaultIconName;

  // Use children as message if message prop not provided
  const displayMessage = message || children;

  // Compose base styles
  const baseStyle = {
    ...styles.base,
    ...style,
  };

  // Icon styles
  const iconStyle = {
    ...styles.icon,
    ...(variantStyles.icon || {}),
  };

  // Message styles (for AI variant)
  const messageStyle = {
    ...styles.message,
    ...(variantStyles.text || {}),
  };

  // Render icon based on variant
  const renderIcon = () => {
    if (icon) {
      return <span style={iconStyle}>{icon}</span>;
    }

    if (variant === "ai") {
      return (
        <span style={styles.icon}>
          <AIGradientIcon />
        </span>
      );
    }

    return (
      <span style={iconStyle}>
        <Icon name={finalIconName} variant="solid" size="sm" />
      </span>
    );
  };

  return (
    <div style={baseStyle} role="status" {...props}>
      {renderIcon()}
      <span style={messageStyle}>{displayMessage}</span>
    </div>
  );
};

MiniInfobox.displayName = "MiniInfobox";
MiniInfobox.variants = MINIINFOBOX_VARIANTS;

export default MiniInfobox;
