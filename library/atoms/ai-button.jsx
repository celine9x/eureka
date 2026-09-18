"use client";

/**
 * AiButton Component (Atom)
 *
 * An AI-branded button with gradient-driven styling.
 * Uses the same size rhythm and interaction model as Button,
 * but applies AI gradient treatment.
 *
 * Props:
 * - variant: "primary" | "secondary" | "tertiary"
 * - size: "lg" (40px) | "md" (32px) | "sm" (24px)
 * - isDisabled / disabled
 * - iconLeading, iconTrailing
 * - iconOnly
 * - onClick, href, type
 *
 * @example
 * <AiButton variant="primary" size="lg" iconLeading={<Icon name="Sparkles" />}>
 *   Ask AI
 * </AiButton>
 * <AiButton variant="secondary" size="md">Generate</AiButton>
 */

import { forwardRef, useState, useEffect, useRef, isValidElement, cloneElement, createElement } from "react";
import { Icon } from "./icon.jsx";

const BLOB_KEYFRAMES = `
@keyframes ai-blob-blue {
  0%, 100% {
    transform: translate3d(-15%, 12%, 0) rotate(-6deg) scale(1);
  }
  50% {
    transform: translate3d(50%, -8%, 0) rotate(5deg) scale(1.08);
  }
}
@keyframes ai-blob-cyan {
  0%, 100% {
    transform: translate3d(20%, -10%, 0) rotate(8deg) scale(1);
  }
  50% {
    transform: translate3d(-45%, 10%, 0) rotate(-5deg) scale(1.1);
  }
}
@keyframes ai-blob-mint {
  0%, 100% {
    transform: translate3d(-10%, 15%, 0) scale(0.98);
  }
  50% {
    transform: translate3d(35%, -12%, 0) scale(1.06);
  }
}
@keyframes ai-sheen {
  from { transform: translateX(-72%) rotate(8deg); }
  to { transform: translateX(72%) rotate(8deg); }
}
@media (prefers-reduced-motion: reduce) {
  .ai-button-blob {
    animation: none !important;
  }
  .ai-button-sheen {
    animation: none !important;
    opacity: 0 !important;
  }
}
`;

let aiBlobStylesInjected = false;

const injectAiBlobStyles = () => {
  if (aiBlobStylesInjected || typeof document === "undefined") return;
  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-eureka", "ai-button-blobs");
  styleEl.textContent = BLOB_KEYFRAMES;
  document.head.appendChild(styleEl);
  aiBlobStylesInjected = true;
};

// Shared gradient paint server so secondary/tertiary AI button icons can match
// the same brand gradient used by the label text (see --gradient-ai-icon).
const AI_ICON_GRADIENT_ID = "ai-icon-gradient";
const AI_ICON_GRADIENT_PAINT = `url(#${AI_ICON_GRADIENT_ID})`;

let aiIconGradientInjected = false;

const injectAiIconGradientDef = () => {
  if (aiIconGradientInjected || typeof document === "undefined") return;
  const svgNS = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "0");
  svg.setAttribute("height", "0");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("data-eureka", "ai-icon-gradient-defs");
  svg.style.position = "absolute";

  const gradient = document.createElementNS(svgNS, "linearGradient");
  gradient.setAttribute("id", AI_ICON_GRADIENT_ID);
  gradient.setAttribute("x1", "0");
  gradient.setAttribute("y1", "0");
  gradient.setAttribute("x2", "1");
  gradient.setAttribute("y2", "0");

  const stopStart = document.createElementNS(svgNS, "stop");
  stopStart.setAttribute("offset", "0%");
  stopStart.setAttribute("stop-color", "var(--color-ai-gradient-start)");

  const stopEnd = document.createElementNS(svgNS, "stop");
  stopEnd.setAttribute("offset", "100%");
  stopEnd.setAttribute("stop-color", "var(--color-ai-gradient-end)");

  gradient.appendChild(stopStart);
  gradient.appendChild(stopEnd);

  const defs = document.createElementNS(svgNS, "defs");
  defs.appendChild(gradient);
  svg.appendChild(defs);
  document.body.appendChild(svg);

  aiIconGradientInjected = true;
};

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const AI_BUTTON_VARIANTS = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
};

export const AI_BUTTON_SIZES = {
  lg: "lg",
  md: "md",
  sm: "sm",
};

// ─────────────────────────────────────────────
// SIZE CONFIG
// ─────────────────────────────────────────────

const SIZE_CONFIG = {
  lg: {
    height: "var(--size-button-lg)",        // 40px
    padding: "0 var(--spacing-sm)",          // 0 8px
    gap: "var(--spacing-sm)",                // 8px
    fontSize: "var(--text-button-lg)",       // 14px
    lineHeight: "var(--line-height-button-lg)", // 20px
    iconSize: "var(--size-icon-md)",         // 20px
    borderRadius: "var(--radius-sm)",        // 8px
  },
  md: {
    height: "var(--size-button-sm)",         // 32px
    padding: "0 var(--spacing-sm)",          // 0 8px
    gap: "var(--spacing-sm)",                // 8px
    fontSize: "var(--text-button-md)",       // 12px
    lineHeight: "var(--line-height-button-md)", // 16px
    iconSize: "var(--size-icon-sm)",         // 16px
    borderRadius: "var(--radius-sm)",        // 8px
  },
  sm: {
    height: "var(--size-button-xs)",         // 24px
    padding: "0 var(--spacing-xs)",          // 0 4px
    gap: "var(--spacing-xs)",                // 4px
    fontSize: "var(--text-button-md)",       // 12px
    lineHeight: "var(--line-height-button-md)", // 16px
    iconSize: "var(--size-icon-sm)",         // 16px
    borderRadius: "var(--radius-xs)",        // 4px
  },
};

const OrganicBlobLayer = ({
  opacity = "var(--opacity-ai-blob-primary)",
  isSecondary = false,
  isHovered = false,
  buttonWidth = 150,
  mousePos = { x: 0.5, y: 0.5 },
}) => {
  const blur = isSecondary ? "10px" : "12px";

  // When hovered: magnetic cursor-following (all blobs cluster tightly at cursor)
  // When not hovered: CSS keyframe animation plays
  const cursorX = (mousePos.x - 0.5) * buttonWidth;
  const cursorY = (mousePos.y - 0.5) * 40;

  const getBlueTransform = () => {
    if (!isHovered) return undefined;
    // Small offset from cursor center
    return `translate3d(${cursorX - 8}px, ${cursorY - 4}px, 0) scale(1.05)`;
  };

  const getCyanTransform = () => {
    if (!isHovered) return undefined;
    // Small offset from cursor center
    return `translate3d(${cursorX + 6}px, ${cursorY + 3}px, 0) scale(1.08)`;
  };

  const getMintTransform = () => {
    if (!isHovered) return undefined;
    // Small offset from cursor center
    return `translate3d(${cursorX}px, ${cursorY - 2}px, 0) scale(1.1)`;
  };

  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        borderRadius: "inherit",
        pointerEvents: "none",
        opacity,
        zIndex: 0,
        filter: isHovered ? "saturate(1.15) brightness(1.04)" : "saturate(1) brightness(1)",
        transition: "filter 180ms ease",
      }}
    >
      {/* Blue: ambient animation when idle, magnetic when hovered */}
      <span
        className="ai-button-blob"
        style={{
          position: "absolute",
          width: isHovered ? "36%" : "18%",
          height: "70%",
          // When hovered, center the blob then let transform position it at cursor
          left: isHovered ? "41%" : "15%",
          top: isHovered ? "15%" : "15%",
          borderRadius: "50%",
          background: "var(--color-ai-blob-blue)",
          filter: `blur(${blur})`,
          opacity: isHovered ? 0.85 : 0.7,
          willChange: "transform, opacity, left, top",
          // Delay animation restart so transition can complete first
          animation: isHovered ? "none" : "ai-blob-blue 4s ease-in-out infinite",
          animationDelay: isHovered ? "0s" : "0.5s",
          transform: getBlueTransform(),
          transition: isHovered
            ? "transform 120ms ease-out, opacity 180ms ease, left 120ms ease-out, top 120ms ease-out, width 120ms ease-out"
            : "transform 500ms ease-out, opacity 400ms ease, left 500ms ease-out, top 500ms ease-out, width 500ms ease-out",
        }}
      />

      {/* Cyan: ambient animation when idle, magnetic when hovered */}
      <span
        className="ai-button-blob"
        style={{
          position: "absolute",
          width: isHovered ? "40%" : "20%",
          height: "75%",
          // When hovered, center the blob then let transform position it at cursor
          left: isHovered ? "40%" : undefined,
          right: isHovered ? undefined : "12%",
          top: isHovered ? "12%" : "12%",
          borderRadius: "50%",
          background: "var(--color-ai-blob-cyan)",
          filter: `blur(${blur})`,
          opacity: isHovered ? 0.8 : 0.65,
          willChange: "transform, opacity, left, right, top",
          animation: isHovered ? "none" : "ai-blob-cyan 5s ease-in-out infinite",
          animationDelay: isHovered ? "0s" : "0.6s",
          transform: getCyanTransform(),
          transition: isHovered
            ? "transform 150ms ease-out, opacity 180ms ease, left 150ms ease-out, top 150ms ease-out, width 150ms ease-out"
            : "transform 550ms ease-out, opacity 400ms ease, right 550ms ease-out, top 550ms ease-out, width 550ms ease-out",
        }}
      />

      {/* Mint: ambient animation when idle, magnetic when hovered */}
      <span
        className="ai-button-blob"
        style={{
          position: "absolute",
          width: isHovered ? "32%" : "16%",
          height: "65%",
          left: isHovered ? "42%" : "42%",
          top: isHovered ? "18%" : "18%",
          borderRadius: "50%",
          background: "var(--color-ai-blob-green)",
          filter: isSecondary ? "blur(10px)" : "blur(12px)",
          opacity: isHovered ? 0.75 : 0.55,
          willChange: "transform, opacity, left, top",
          animation: isHovered ? "none" : "ai-blob-mint 4.5s ease-in-out infinite",
          animationDelay: isHovered ? "0s" : "0.55s",
          transform: getMintTransform(),
          transition: isHovered
            ? "transform 180ms ease-out, opacity 180ms ease, left 180ms ease-out, top 180ms ease-out, width 180ms ease-out"
            : "transform 520ms ease-out, opacity 400ms ease, left 520ms ease-out, top 520ms ease-out, width 520ms ease-out",
        }}
      />
    </span>
  );
};

const GradientBorderRing = () => (
  <span
    aria-hidden="true"
    style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      borderRadius: "inherit",
      zIndex: 1,
      background: "var(--gradient-ai-outline-bg)",
      // Carve out the center so only a 1px gradient ring remains.
      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      padding: "1px",
    }}
  />
);

// Hover-only sheen sweep effect
const SheenLayer = ({ isActive = false }) => (
  <span
    className="ai-button-sheen"
    aria-hidden="true"
    style={{
      position: "absolute",
      inset: "-40%",
      zIndex: 1,
      pointerEvents: "none",
      background: "linear-gradient(110deg, transparent 42%, rgba(255, 255, 255, 0.18) 50%, transparent 58%)",
      transform: isActive ? "translateX(72%) rotate(8deg)" : "translateX(-72%) rotate(8deg)",
      opacity: isActive ? 1 : 0,
      transition: isActive ? "none" : "opacity 0.3s ease-out",
      animationName: isActive ? "ai-sheen" : "none",
      animationDuration: "700ms",
      animationTimingFunction: "ease-out",
      animationFillMode: "both",
    }}
  />
);

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

/** AiButton */
export const AiButton = forwardRef(
  (
    {
      variant = AI_BUTTON_VARIANTS.primary,
      size = AI_BUTTON_SIZES.lg,
      isDisabled = false,
      disabled,
      type = "button",
      href,
      iconLeading,
      iconTrailing,
      iconOnly = false,
      onClick,
      style,
      children,
      ...props
    },
    ref
  ) => {
    injectAiBlobStyles();
    injectAiIconGradientDef();

    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [buttonWidth, setButtonWidth] = useState(150);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 }); // Normalized 0-1
    const buttonRef = useRef(null);

    // Measure button width for dynamic blob animations
    useEffect(() => {
      const measureWidth = () => {
        if (buttonRef.current) {
          setButtonWidth(buttonRef.current.offsetWidth);
        }
      };

      measureWidth();

      const resizeObserver = new ResizeObserver(measureWidth);
      if (buttonRef.current) {
        resizeObserver.observe(buttonRef.current);
      }

      return () => resizeObserver.disconnect();
    }, []);

    // Track mouse position for blob following
    const handleMouseMove = (e) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
    };

    const isButtonDisabled = isDisabled || disabled;

    // Backward compatibility: map legacy variant names to new API.
    const normalizedVariant = {
      filled: AI_BUTTON_VARIANTS.primary,
      outlined: AI_BUTTON_VARIANTS.secondary,
      ghost: AI_BUTTON_VARIANTS.tertiary,
    }[variant] || variant;

    const isPrimary = normalizedVariant === AI_BUTTON_VARIANTS.primary;
    const isSecondary = normalizedVariant === AI_BUTTON_VARIANTS.secondary;
    const isTertiary = normalizedVariant === AI_BUTTON_VARIANTS.tertiary;

    const sizeConfig = SIZE_CONFIG[size];

    // ── Content color ──
    const getContentColor = () => {
      if (isPrimary) {
        return isButtonDisabled
          ? "var(--color-ai-content-disabled)"
          : "var(--color-content-inverted)";
      }
      // secondary / tertiary
      return isButtonDisabled
        ? "var(--color-ai-content-disabled)"
        : "var(--color-ai-content-brand)";
    };

    // ── Outline (disabled) ──
    const getOutlineStyle = () => {
      return {};
    };

    // ── Border (outlined uses AI gradient border) ──
    const getBorderStyle = () => {
      if (isTertiary) return { border: "none" };

      if (isSecondary) {
        if (isButtonDisabled) {
          return {
            border: "1px solid var(--color-ai-outline-disabled)",
            background: "transparent",
            borderImage: "none",
          };
        }

        return {
          border: "1px solid transparent",
          background: "transparent",
        };
      }

      return { border: "none" };
    };

    // ── Background ──
    const getBackground = () => {
      if (isPrimary) return "var(--color-ai-primary-bg)";
      if (isSecondary) {
        return "transparent";
      }
      // tertiary
      return "transparent";
    };

    // ── Shadow ──
    const getShadow = () => {
      if (isTertiary || isButtonDisabled) return "none";
      if (isPrimary) {
        if (isHovered || isActive) return "var(--shadow-md)";
        return "var(--shadow-button-enabled)";
      }
      // secondary
      if (isHovered || isActive) return "var(--shadow-md)";
      return "var(--shadow-button-light)";
    };

    const buttonStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      border: "none",
      cursor: isButtonDisabled ? "not-allowed" : "pointer",
      fontFamily: "var(--font-family-primary)",
      fontWeight: "var(--font-weight-regular)",
      whiteSpace: "nowrap",
      boxSizing: "border-box",
      isolation: "isolate",
      transition: "box-shadow var(--transition-fast), outline-color var(--transition-fast)",
      height: sizeConfig.height,
      padding: iconOnly ? sizeConfig.padding : sizeConfig.padding,
      gap: sizeConfig.gap,
      fontSize: sizeConfig.fontSize,
      lineHeight: sizeConfig.lineHeight,
      borderRadius: sizeConfig.borderRadius,
      color: getContentColor(),
      background: getBackground(),
      boxShadow: getShadow(),
      pointerEvents: isButtonDisabled ? "none" : undefined,
      ...getOutlineStyle(),
      ...getBorderStyle(),
      ...style,
    };

    const iconStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: 0,
      flexShrink: 0,
      width: sizeConfig.iconSize,
      height: sizeConfig.iconSize,
      position: "relative",
      zIndex: 2,
    };

    const isSecondaryGradient = !isPrimary && !isButtonDisabled;

    const textStyle = {
      paddingLeft: "var(--spacing-xs)",
      paddingRight: "var(--spacing-xs)",
      position: "relative",
      zIndex: 2,
      ...(isSecondaryGradient && {
        backgroundImage: "var(--gradient-ai-secondary-text)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }),
    };

    // Only show iconLeading or iconTrailing if explicitly provided, matching Button API
    const effectiveLeading = iconLeading || null;
    const effectiveTrailing = iconTrailing || null;

    const renderIcon = (icon, slot) => {
      if (!icon) return null;

      const iconColor = isPrimary
        ? (isButtonDisabled ? "var(--color-ai-content-disabled)" : "var(--color-content-inverted)")
        : (isButtonDisabled ? "var(--color-ai-content-disabled)" : "var(--color-ai-content-brand)");

      // Secondary/tertiary labels render with the AI brand gradient (see textStyle
      // above); paint the icon with the same gradient so it matches the label exactly.
      const getGradientPaintStyle = (iconVariant) => {
        if (!isSecondaryGradient) return {};
        return iconVariant === "solid" || iconVariant === "mini" || iconVariant === "fill"
          ? { fill: AI_ICON_GRADIENT_PAINT }
          : { stroke: AI_ICON_GRADIENT_PAINT };
      };

      if (isValidElement(icon)) {
        const existingStyle = icon.props?.style || {};
        return cloneElement(icon, {
          style: {
            ...iconStyle,
            color: iconColor,
            ...getGradientPaintStyle(icon.props?.variant),
            ...existingStyle,
          },
          "data-icon": slot,
        });
      }
      if (typeof icon === "function") {
        return createElement(icon, {
          style: { ...iconStyle, color: iconColor, ...getGradientPaintStyle() },
          "data-icon": slot,
        });
      }
      if (typeof icon === "string") {
        return (
          <Icon
            name={icon}
            size={size === "lg" ? "md" : "sm"}
            style={{ ...iconStyle, color: iconColor, ...getGradientPaintStyle() }}
          />
        );
      }
      return <span style={{ ...iconStyle, color: iconColor }}>{icon}</span>;
    };

    const content = (
      <>
        {(isPrimary || isSecondary) && (
          <OrganicBlobLayer
            opacity={isPrimary ? "var(--opacity-ai-blob-primary)" : "var(--opacity-ai-blob-secondary)"}
            isSecondary={isSecondary}
            isHovered={isHovered && !isButtonDisabled}
            buttonWidth={buttonWidth}
            mousePos={mousePos}
          />
        )}
        {isPrimary && !isButtonDisabled && <SheenLayer isActive={isHovered} />}
        {isSecondary && !isButtonDisabled && <GradientBorderRing />}
        {renderIcon(effectiveLeading, "leading")}
        {!iconOnly && children && <span style={textStyle}>{children}</span>}
        {renderIcon(effectiveTrailing, "trailing")}
      </>
    );

    // Combine forwarded ref with internal buttonRef
    const setRefs = (node) => {
      buttonRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const commonProps = {
      ref: setRefs,
      style: buttonStyle,
      onClick: isButtonDisabled ? undefined : onClick,
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => {
        setIsHovered(false);
        setIsActive(false);
        setMousePos({ x: 0.5, y: 0.5 }); // Reset to center
      },
      onMouseDown: () => setIsActive(true),
      onMouseUp: () => setIsActive(false),
      ...props,
    };

    if (href) {
      return (
        <a
          href={isButtonDisabled ? undefined : href}
          aria-disabled={isButtonDisabled || undefined}
          {...commonProps}
        >
          {content}
        </a>
      );
    }

    return (
      <button type={type} disabled={isButtonDisabled} {...commonProps}>
        {content}
      </button>
    );
  }
);

AiButton.displayName = "AiButton";
AiButton.variants = AI_BUTTON_VARIANTS;
AiButton.sizes = AI_BUTTON_SIZES;

export default AiButton;
