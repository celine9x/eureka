
"use client";

import { useState } from "react";
import { Link } from "../atoms/link.jsx";
import { Icon } from "../atoms/icon.jsx";

export const EXPANDABLE_TEXT_VARIANTS = {
  md: "md",
  lg: "lg",
};

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
    width: "100%",
  },
  contentBase: {
    margin: 0,
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  contentVariants: {
    md: {
      fontSize: "var(--text-body-md)",
      lineHeight: "var(--line-height-body-md)",
    },
    lg: {
      fontSize: "var(--text-body-lg)",
      lineHeight: "var(--line-height-body-lg)",
    },
  },
  clamp: {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
  },
};

export const ExpandableText = ({
  content,
  variant = EXPANDABLE_TEXT_VARIANTS.md,
  maxLines = 8,
  showMoreLabel = "Show more",
  showLessLabel = "Show less",
  onToggle,
  linkProps,
  linkStyle,
  style,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const resolvedContent = content ?? "";
  const isPlainText = typeof resolvedContent === "string" || typeof resolvedContent === "number";
  const resolvedVariant = variant === EXPANDABLE_TEXT_VARIANTS.lg ? EXPANDABLE_TEXT_VARIANTS.lg : EXPANDABLE_TEXT_VARIANTS.md;
  const variantStyles = styles.contentVariants[resolvedVariant];

  const shouldClamp = !isExpanded;
  const mergedTextStyle = {
    ...styles.contentBase,
    ...variantStyles,
    ...(isPlainText ? { whiteSpace: "pre-wrap" } : null),
    ...(shouldClamp ? { ...styles.clamp, WebkitLineClamp: String(maxLines) } : null),
  };

  return (
    <div style={{ ...styles.root, ...style }} {...props}>
      <div style={mergedTextStyle}>
        {resolvedContent}
      </div>

      <Link
        href="#"
        size={resolvedVariant === EXPANDABLE_TEXT_VARIANTS.lg ? "lg" : "md"}
        onClick={(event) => {
          event.preventDefault();
          setIsExpanded((previous) => {
            const next = !previous;
            onToggle?.(next);
            return next;
          });
        }}
        iconTrailing={<Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={resolvedVariant === EXPANDABLE_TEXT_VARIANTS.lg ? "md" : "sm"} />}
        style={{ alignSelf: "flex-start", ...linkStyle }}
        {...linkProps}
      >
        {isExpanded ? showLessLabel : showMoreLabel}
      </Link>
    </div>
  );
};

ExpandableText.displayName = "ExpandableText";
ExpandableText.variants = EXPANDABLE_TEXT_VARIANTS;

export default ExpandableText;
