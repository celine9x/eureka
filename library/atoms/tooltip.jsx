"use client";

import { cloneElement, isValidElement, useId, useState, useRef, useLayoutEffect } from "react";

export const TOOLTIP_PLACEMENTS = {
  "top-left": "top-left",
  "top-center": "top-center",
  "top-right": "top-right",
  "bottom-left": "bottom-left",
  "bottom-center": "bottom-center",
  "bottom-right": "bottom-right",
  left: "left",
  right: "right",
};

const TOOLTIP_OFFSET = 4;

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
    position: "fixed",
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
  },
};

const getFixedPosition = (placement, triggerRect, tooltipRect) => {
  const gap = TOOLTIP_OFFSET;

  switch (placement) {
    case TOOLTIP_PLACEMENTS["top-left"]:
      return {
        top: triggerRect.top - tooltipRect.height - gap,
        left: triggerRect.left,
      };
    case TOOLTIP_PLACEMENTS["top-center"]:
      return {
        top: triggerRect.top - tooltipRect.height - gap,
        left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
      };
    case TOOLTIP_PLACEMENTS["top-right"]:
      return {
        top: triggerRect.top - tooltipRect.height - gap,
        left: triggerRect.right - tooltipRect.width,
      };
    case TOOLTIP_PLACEMENTS["bottom-left"]:
      return {
        top: triggerRect.bottom + gap,
        left: triggerRect.left,
      };
    case TOOLTIP_PLACEMENTS["bottom-center"]:
      return {
        top: triggerRect.bottom + gap,
        left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2,
      };
    case TOOLTIP_PLACEMENTS["bottom-right"]:
      return {
        top: triggerRect.bottom + gap,
        left: triggerRect.right - tooltipRect.width,
      };
    case TOOLTIP_PLACEMENTS.left:
      return {
        top: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
        left: triggerRect.left - tooltipRect.width - gap,
      };
    case TOOLTIP_PLACEMENTS.right:
    default:
      return {
        top: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
        left: triggerRect.right + gap,
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
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipId = useId();
  const wrapperRef = useRef(null);
  const bubbleRef = useRef(null);

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

  useLayoutEffect(() => {
    if (isVisible && wrapperRef.current && bubbleRef.current) {
      const triggerRect = wrapperRef.current.getBoundingClientRect();
      const tooltipRect = bubbleRef.current.getBoundingClientRect();
      const pos = getFixedPosition(placement, triggerRect, tooltipRect);
      setPosition(pos);
    }
  }, [isVisible, placement, content]);

  const wrapperStyle = {
    ...styles.wrapper,
    ...style,
  };

  const bubbleStyle = {
    ...styles.bubble,
    top: position.top,
    left: position.left,
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
      ref={wrapperRef}
      style={wrapperStyle}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      {...props}
    >
      {trigger}
      {isVisible && content && (
        <span ref={bubbleRef} id={tooltipId} role="tooltip" style={bubbleStyle}>
          {content}
        </span>
      )}
    </span>
  );
};

Tooltip.displayName = "Tooltip";
Tooltip.placements = TOOLTIP_PLACEMENTS;

export default Tooltip;