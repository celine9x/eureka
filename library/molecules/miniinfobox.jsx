/**
 * MiniInfobox Component
 *
 * A compact inline message with an icon and text.
 * Supports success, warning, error, info, neutral, and AI variants.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 */

import { useEffect, useRef, useState } from "react";
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
    gap: "var(--spacing-xs)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
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
      icon: { color: "var(--color-content-informative)" },
    },
    neutral: {
      icon: { color: "var(--color-content-secondary)" },
    },
    ai: {
      text: { color: "var(--color-content-brand)" },
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
    lineHeight: 1.4,
    minWidth: 0,
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
        <stop offset="0%" stopColor="var(--blue-60)" />
        <stop offset="100%" stopColor="var(--green-50)" />
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
  const messageRef = useRef(null);
  const [isMultiline, setIsMultiline] = useState(false);

  const variantStyles = styles.variants[variant] || styles.variants.info;
  const defaultIconName = VARIANT_ICONS[variant] || VARIANT_ICONS.info;
  const finalIconName = iconName || defaultIconName;

  const displayMessage = message || children;

  useEffect(() => {
    const el = messageRef.current;
    if (!el) return;

    const checkIfMultiline = () => {
      const computedStyle = window.getComputedStyle(el);
      let lineHeight = parseFloat(computedStyle.lineHeight);

      if (Number.isNaN(lineHeight)) {
        const fontSize = parseFloat(computedStyle.fontSize);
        lineHeight = fontSize * 1.4;
      }

      const height = el.getBoundingClientRect().height;
      const multiline = height > lineHeight * 1.5;

      setIsMultiline(multiline);
    };

    checkIfMultiline();

    const resizeObserver = new ResizeObserver(() => {
      checkIfMultiline();
    });

    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
    };
  }, [displayMessage]);

  const baseStyle = {
    ...styles.base,
    alignItems: isMultiline ? "flex-start" : "center",
    ...style,
  };

  const iconStyle = {
    ...styles.icon,
    ...(isMultiline ? { marginTop: 2 } : {}),
    ...(variantStyles.icon || {}),
  };

  const messageStyle = {
    ...styles.message,
    ...(variantStyles.text || {}),
  };

  const renderIcon = () => {
    if (icon) {
      return <span style={iconStyle}>{icon}</span>;
    }

    if (variant === "ai") {
      return (
        <span style={iconStyle}>
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
      <span ref={messageRef} style={messageStyle}>
        {displayMessage}
      </span>
    </div>
  );
};

MiniInfobox.displayName = "MiniInfobox";
MiniInfobox.variants = MINIINFOBOX_VARIANTS;

export default MiniInfobox;