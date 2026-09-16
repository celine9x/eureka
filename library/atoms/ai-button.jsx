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

import { forwardRef, useMemo, useState, isValidElement, cloneElement, createElement } from "react";
import { Icon } from "./icon.jsx";

const BLOB_KEYFRAMES = `
@keyframes ai-blob-float-a {
  0% { transform: translate(0px, 0px) scale(1); }
  20% { transform: translate(14px, -10px) scale(1.12); }
  45% { transform: translate(-10px, 16px) scale(0.9); }
  70% { transform: translate(-16px, -8px) scale(1.08); }
  100% { transform: translate(0px, 0px) scale(1); }
}
@keyframes ai-blob-float-b {
  0% { transform: translate(0px, 0px) scale(1); }
  25% { transform: translate(-18px, 10px) scale(1.16); }
  60% { transform: translate(12px, -16px) scale(0.86); }
  85% { transform: translate(8px, 6px) scale(1.05); }
  100% { transform: translate(0px, 0px) scale(1); }
}
@keyframes ai-blob-float-c {
  0% { transform: rotate(78deg) translate(0px, 0px) scale(1); }
  30% { transform: rotate(88deg) translate(14px, -12px) scale(1.14); }
  65% { transform: rotate(68deg) translate(-16px, 10px) scale(0.84); }
  85% { transform: rotate(82deg) translate(8px, 6px) scale(1.06); }
  100% { transform: rotate(78deg) translate(0px, 0px) scale(1); }
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

const OrganicBlobLayer = ({ opacity = "var(--opacity-ai-blob-primary)", isSecondary = false }) => {
  const animationConfig = useMemo(
    () => ({
      durA: `${5 + Math.random() * 2.5}s`,
      durB: `${5.7 + Math.random() * 2.8}s`,
      durC: `${6.2 + Math.random() * 3.1}s`,
      delayA: `${-Math.random() * 2.5}s`,
      delayB: `${-Math.random() * 3.2}s`,
      delayC: `${-Math.random() * 3.8}s`,
    }),
    []
  );

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
      }}
    >
    <span
      style={{
        position: "absolute",
        width: "42%",
        height: "125%",
        left: "-14%",
        top: "28%",
        borderRadius: "9999px",
        background: "var(--color-ai-blob-blue)",
        filter: isSecondary ? "blur(10px)" : "blur(16px)",
        animationName: "ai-blob-float-a",
        animationDuration: animationConfig.durA,
        animationDelay: animationConfig.delayA,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
      }}
    />
    <span
      style={{
        position: "absolute",
        width: "24%",
        height: "112%",
        right: "1%",
        top: "-24%",
        borderRadius: "9999px",
        background: "var(--color-ai-blob-green)",
        filter: isSecondary ? "blur(10px)" : "blur(16px)",
        animationName: "ai-blob-float-b",
        animationDuration: animationConfig.durB,
        animationDelay: animationConfig.delayB,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
      }}
    />
    <span
      style={{
        position: "absolute",
        width: "56%",
        height: "118%",
        right: "-26%",
        top: "-110%",
        borderRadius: "9999px",
        background: "var(--color-ai-blob-cyan)",
        filter: isSecondary ? "blur(12px)" : "blur(20px)",
        transformOrigin: "top left",
        animationName: "ai-blob-float-c",
        animationDuration: animationConfig.durC,
        animationDelay: animationConfig.delayC,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
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

    // ── Outline (filled only) ──
    const getOutlineStyle = () => {
      if (isTertiary || isSecondary) return {};
      if (isPrimary) {
        if (isButtonDisabled) return {};
        if (isActive || isHovered) {
          return {
            outline: `1px solid var(--color-ai-outline-hover)`,
            outlineOffset: "-1px",
          };
        }
        return {};
      }
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
        return isActive
          ? "var(--shadow-button-hover)"
          : "var(--shadow-button-enabled)";
      }
      // secondary
      return isActive
        ? "var(--shadow-button-hover)"
        : "var(--shadow-button-light)";
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
          />
        )}
        {isSecondary && !isButtonDisabled && <GradientBorderRing />}
        {renderIcon(effectiveLeading, "leading")}
        {!iconOnly && children && <span style={textStyle}>{children}</span>}
        {renderIcon(effectiveTrailing, "trailing")}
      </>
    );

    const commonProps = {
      ref,
      style: buttonStyle,
      onClick: isButtonDisabled ? undefined : onClick,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => {
        setIsHovered(false);
        setIsActive(false);
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
