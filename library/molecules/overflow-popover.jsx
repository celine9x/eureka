"use client";

/**
 * OverflowPopover Component
 *
 * A popover for displaying overflow items (chips, links, text) in a vertical list.
 * Used by table cells to show hidden items when clicking the +N badge.
 */

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Chip } from "../atoms/chip.jsx";
import { Icon } from "../atoms/icon.jsx";
import { Link } from "../atoms/link.jsx";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

export const OVERFLOW_POPOVER_TYPES = {
  chip: "chip",
  link: "link",
  text: "text",
};

// ─────────────────────────────────────────────────────────────────────────────
// CSS Injection
// ─────────────────────────────────────────────────────────────────────────────

let _stylesInjected = false;

function injectStyles() {
  if (_stylesInjected || typeof document === "undefined") return;
  _stylesInjected = true;

  const style = document.createElement("style");
  style.setAttribute("data-eureka", "overflow-popover");
  style.textContent = `
    .overflow-popover-overlay {
      position: fixed;
      inset: 0;
      z-index: 100;
    }

    .overflow-popover {
      position: fixed;
      z-index: 101;
      background: var(--color-general-white);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-action-outline-secondary-enabled);
      box-shadow: var(--shadow-medium-down);
      min-width: 180px;
      max-width: 320px;
      overflow: hidden;
    }

    .overflow-popover-content {
      max-height: 300px;
      overflow-y: auto;
      overflow-x: hidden;
      padding: var(--spacing-sm);
    }

    /* Chip layout - vertical with fit-content chips */
    .overflow-popover-content--chip {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-xs);
    }

    /* Link layout */
    .overflow-popover-content--link {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-xs);
    }

    /* Text layout */
    .overflow-popover-content--text {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: var(--spacing-xs);
    }

    .overflow-popover-text-item {
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      color: var(--color-content-primary);
      line-height: var(--line-height-body-md);
      padding: var(--spacing-xs) 0;
    }

    .overflow-popover-text-item:not(:last-child) {
      border-bottom: 1px solid var(--color-outline-neutral);
    }
  `;
  document.head.appendChild(style);
}

// ─────────────────────────────────────────────────────────────────────────────
// OverflowPopover
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @param {Object} props
 * @param {boolean} props.open - Whether the popover is visible
 * @param {Function} props.onClose - Called when clicking outside
 * @param {{ top: number, left: number }} props.position - Fixed position
 * @param {Array} props.items - Array of items to display
 * @param {"chip" | "link" | "text"} props.type - Type of items to render
 * @param {Function} props.onItemClick - Optional click handler for items
 *
 * @example
 * // Chip type
 * <OverflowPopover
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   position={{ top: 100, left: 200 }}
 *   type="chip"
 *   items={[
 *     { id: "1", label: "Tag 1" },
 *     { id: "2", label: "Tag 2" },
 *   ]}
 * />
 *
 * @example
 * // Link type
 * <OverflowPopover
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   position={{ top: 100, left: 200 }}
 *   type="link"
 *   items={[
 *     { id: "1", label: "Link 1", href: "/path1", icon: <Icon name="DocumentIcon" /> },
 *     { id: "2", label: "Link 2", href: "/path2" },
 *   ]}
 * />
 */
export function OverflowPopover({
  open,
  onClose,
  position,
  items = [],
  type = OVERFLOW_POPOVER_TYPES.chip,
  onItemClick,
}) {
  useEffect(() => injectStyles(), []);

  if (!open || !position || !items.length) return null;

  const handleOverlayClick = (e) => {
    e.stopPropagation();
    onClose?.();
  };

  const handlePopoverClick = (e) => {
    e.stopPropagation();
  };

  const handleItemClick = (item, e) => {
    if (type === OVERFLOW_POPOVER_TYPES.link) {
      if (!item.href || item.href === "#") {
        e.preventDefault();
      }
    }
    onItemClick?.(item);
  };

  const renderContent = () => {
    switch (type) {
      case OVERFLOW_POPOVER_TYPES.chip:
        return (
          <div className="overflow-popover-content overflow-popover-content--chip">
            {items.map((item) => (
              <Chip
                key={item.id}
                variant={item.variant ?? "neutral"}
                size="md"
                onClick={() => onItemClick?.(item)}
              >
                {item.label}
              </Chip>
            ))}
          </div>
        );

      case OVERFLOW_POPOVER_TYPES.link:
        return (
          <div className="overflow-popover-content overflow-popover-content--link">
            {items.map((item) => (
              <Link
                key={item.id}
                size="md"
                href={item.href ?? "#"}
                iconLeading={
                  <Icon
                    name={item.iconName ?? "LinkIcon"}
                    size={12}
                    style={{ color: "var(--color-content-secondary)" }}
                  />
                }
                onClick={(e) => handleItemClick(item, e)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        );

      case OVERFLOW_POPOVER_TYPES.text:
        return (
          <div className="overflow-popover-content overflow-popover-content--text">
            {items.map((item) => (
              <div
                key={item.id}
                className="overflow-popover-text-item"
                onClick={() => onItemClick?.(item)}
              >
                {item.label}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return createPortal(
    <>
      <div className="overflow-popover-overlay" onClick={handleOverlayClick} />
      <div
        className="overflow-popover"
        style={{ top: position.top, left: position.left }}
        onClick={handlePopoverClick}
      >
        {renderContent()}
      </div>
    </>,
    document.body
  );
}

OverflowPopover.types = OVERFLOW_POPOVER_TYPES;
OverflowPopover.displayName = "OverflowPopover";

export default OverflowPopover;
