"use client";

import { cloneElement, isValidElement, useId, useState } from "react";

export const TOOLTIP_PLACEMENTS = {
  "top-left": "top-left",
  "top-right": "top-right",
  "bottom-left": "bottom-left",
  "bottom-right": "bottom-right",
  left: "left",
  right: "right",
};

const styles = {
  wrapper: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    maxWidth: "100%",
  },
bubble: {
  position: "absolute",
  zIndex: 2147483647,
  paddingLeft: "var(--spacing-4)",
  paddingRight: "var(--spacing-4)",
  paddingTop: "var(--spacing-2)",
  paddingBottom: "var(--spacing-2)",
  borderRadius: "var(--radius-sm)",
  background: "var(--color-general-tooltip)",
  boxShadow: "var(--shadow-dark-down)",
  color: "var(--color-content-inverted)",
  fontFamily: "var(--font-family-primary)",
  fontSize: "var(--text-body-md)",
  lineHeight: "var(--line-height-body-md)",
  fontWeight: "var(--font-weight-regular)",
  whiteSpace: "normal",
  wordWrap: "break-word",
  overflowWrap: "break-word",
  pointerEvents: "none",
  display: "inline-block",
  width: "max-content",
  maxWidth: 300,
}
};

const TOOLTIP_OFFSET = "var(--spacing-xs)";

const getPlacementStyle = (placement) => {
  const gap = TOOLTIP_OFFSET;

  switch (placement) {
    case TOOLTIP_PLACEMENTS["top-left"]:
      return { bottom: `calc(100% + ${gap})`, left: 0 };
    case TOOLTIP_PLACEMENTS["top-right"]:
      return { bottom: `calc(100% + ${gap})`, right: 0 };
    case TOOLTIP_PLACEMENTS["bottom-left"]:
      return { top: `calc(100% + ${gap})`, left: 0 };
    case TOOLTIP_PLACEMENTS["bottom-right"]:
      return { top: `calc(100% + ${gap})`, right: 0 };
    case TOOLTIP_PLACEMENTS.left:
      return {
        right: `calc(100% + ${gap})`,
        top: "50%",
        transform: "translateY(-50%)",
      };
    case TOOLTIP_PLACEMENTS.right:
    default:
      return {
        left: `calc(100% + ${gap})`,
        top: "50%",
        transform: "translateY(-50%)",
      };
  }
};

export const Tooltip = ({
  content,
  placement = TOOLTIP_PLACEMENTS["top-right"],
  maxWidth = 200,
  width,
  isDisabled = false,
  open,
  defaultOpen = false,
  onOpenChange,
  style,
  children,
  ...props
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const tooltipId = useId();

  const isControlled = open !== undefined;
  const isVisible = isControlled ? open : internalOpen;

  const setVisible = (next) => {
    if (!isControlled) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  };

  const show = () => {
    if (!isDisabled) {
      setVisible(true);
    }
  };

  const hide = () => {
    if (!isDisabled) {
      setVisible(false);
    }
  };

  const wrapperStyle = {
    ...styles.wrapper,
    ...style,
  };

  const bubbleStyle = {
    ...styles.bubble,
    ...getPlacementStyle(placement),
    ...(maxWidth !== 200 && { maxWidth }),
    ...(width && { width, maxWidth: width }),
  };

  const trigger = isValidElement(children)
    ? cloneElement(children, {
        "aria-describedby": isVisible ? tooltipId : undefined,
      })
    : children;

  return (
    <span
      style={wrapperStyle}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      {...props}
    >
      {trigger}
      {isVisible && content && (
        <span id={tooltipId} role="tooltip" style={bubbleStyle}>
          {content}
        </span>
      )}
    </span>
  );
};

Tooltip.displayName = "Tooltip";
Tooltip.placements = TOOLTIP_PLACEMENTS;

export default Tooltip;