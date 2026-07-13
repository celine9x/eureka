"use client";

/**
 * BulkActionBar Component
 *
 * A floating action bar that appears at the bottom when items are selected.
 * Provides bulk actions like status change, assignee assignment, etc.
 */

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";
import { Toggle } from "../atoms/toggle.jsx";
import {
  DropdownList,
  DropdownSection,
  DropdownListItem,
} from "./dropdown-list.jsx";
import { TextInput } from "./text-input.jsx";

// ─────────────────────────────────────────────────────────────────────────────
// CSS Injection
// ─────────────────────────────────────────────────────────────────────────────

let _stylesInjected = false;

function injectStyles() {
  if (typeof document === "undefined") return;
  const existing = document.querySelector('style[data-eureka="bulk-action-bar"]');
  if (existing) existing.remove();
  _stylesInjected = false;

  const style = document.createElement("style");
  style.setAttribute("data-eureka", "bulk-action-bar");
  style.textContent = `
    .bulk-action-bar {
      position: fixed;
      bottom: var(--spacing-6, 24px);
      left: 50%;
      transform: translateX(-50%);
      z-index: 200;
      display: flex;
      align-items: center;
      gap: var(--spacing-sm, 8px);
      padding: var(--spacing-sm, 8px);
      background: var(--color-general-white, #ffffff);
      border-radius: var(--radius-md, 8px);
      box-shadow: 0px 1px 2px rgba(83, 113, 172, 0.15), 0px 2px 4px rgba(83, 113, 172, 0.20);
      border: 1px solid var(--color-outline-neutral, #D9E0ED);
    }

    .bulk-action-bar--sticky {
      position: sticky;
      bottom: var(--spacing-4, 16px);
      left: auto;
      transform: none;
      align-self: center;
      margin: 0 auto;
    }

    .bulk-action-bar-selection {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 4px);
      padding: var(--spacing-xs, 4px);
      background: var(--color-general-neutral-lightest, #F8F9FC);
      border-radius: var(--radius-xs, 4px);
      border: 1px solid var(--color-outline-neutral, #D9E0ED);
      color: var(--color-content-secondary, #5371AC);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-sm, 12px);
      font-weight: var(--font-weight-regular, 400);
      white-space: nowrap;
    }

    .bulk-action-bar-clear {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--color-content-secondary, #5371AC);
      transition: opacity 150ms ease;
    }

    .bulk-action-bar-clear:hover {
      opacity: 0.7;
    }

    .bulk-action-bar-divider {
      width: 1px;
      height: 29px;
      background: var(--color-outline-neutral, #D9E0ED);
      flex-shrink: 0;
    }

    .bulk-action-bar-actions {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs, 4px);
    }

    .bulk-action-bar-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-sm, 8px);
      height: 32px;
      padding: 0 var(--spacing-sm, 8px);
      background: transparent;
      border: none;
      border-radius: var(--radius-md, 8px);
      color: var(--color-content-secondary, #5371AC);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-sm, 12px);
      cursor: pointer;
      white-space: nowrap;
      transition: background 150ms ease;
    }

    .bulk-action-bar-btn:hover {
      background: var(--color-general-neutral-lightest, #F8F9FC);
    }

    .bulk-action-bar-btn--icon-only {
      padding: 0 var(--spacing-sm, 8px);
    }

    .bulk-action-bar-btn--destructive {
      color: var(--color-content-negative, #FF7373);
    }

    .bulk-action-bar-btn--destructive:hover {
      background: var(--color-general-neutral-lightest, #F8F9FC);
    }

    .bulk-action-bar-popover-overlay {
      position: fixed;
      inset: 0;
      z-index: 250;
    }

    .bulk-action-bar-popover {
      position: fixed;
      z-index: 251;
      border: none;
      background: none;
      box-shadow: none;
      min-width: 280px;
      max-width: 360px;
      max-height: 400px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .bulk-action-bar-popover-search {
      padding: var(--spacing-sm);
      border-bottom: 1px solid var(--color-outline-neutral);
    }

    .bulk-action-bar-popover-content {
      flex: 1;
      overflow-y: auto;
    }

    .bulk-action-bar-popover-footer {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm);
      border-top: 1px solid var(--color-outline-neutral);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      color: var(--color-content-primary);
    }
  `;
  document.head.appendChild(style);
}

// ─────────────────────────────────────────────────────────────────────────────
// ActionButton
// ─────────────────────────────────────────────────────────────────────────────

function ActionButton({ icon, label, onClick, iconOnly = false, destructive = false }) {
  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClick?.(e);
  };

  const handleMouseDown = (e) => {
    e.stopPropagation();
  };

  return (
    <button
      type="button"
      className={`bulk-action-bar-btn ${iconOnly ? "bulk-action-bar-btn--icon-only" : ""} ${destructive ? "bulk-action-bar-btn--destructive" : ""}`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      {icon && <Icon name={icon} size={16} />}
      {!iconOnly && label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ActionPopover
// ─────────────────────────────────────────────────────────────────────────────

function ActionPopover({
  open,
  onClose,
  anchorRef,
  title,
  options = [],
  groupBy,
  selectedValue,
  onSelect,
  showSearch = true,
  showNotificationToggle = false,
  notificationEnabled = true,
  onNotificationChange,
}) {
  const [popPos, setPopPos] = useState(null);

  useEffect(() => {
    if (open && anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPopPos({
        bottom: window.innerHeight - rect.top + 8,
        left: rect.left,
      });
    }
  }, [open, anchorRef]);

  if (!open || !popPos) return null;

  // Group options if groupBy is provided
  const groupedOptions = groupBy
    ? options.reduce((acc, opt) => {
        const group = opt[groupBy] || "Other";
        if (!acc[group]) acc[group] = [];
        acc[group].push(opt);
        return acc;
      }, {})
    : { all: options };

  const handleOverlayClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClose();
  };

  return createPortal(
    <>
      <div
        className="bulk-action-bar-popover-overlay"
        onClick={handleOverlayClick}
        onMouseDown={(e) => e.stopPropagation()}
      />
      <div
        className="bulk-action-bar-popover"
        style={{ bottom: popPos.bottom, left: popPos.left }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="bulk-action-bar-popover-content">
          <DropdownList noSearch={!showSearch}>
            {Object.entries(groupedOptions).map(([group, items]) => (
              <DropdownSection
                key={group}
                title={groupBy && group !== "all" ? group : undefined}
              >
                {items.map((opt) => (
                  <DropdownListItem
                    key={opt.id}
                    checked={selectedValue === opt.id}
                    noCheckbox
                    icon={opt.icon}
                    onClick={() => {
                      onSelect?.(opt);
                      onClose();
                    }}
                  >
                    {opt.label}
                  </DropdownListItem>
                ))}
              </DropdownSection>
            ))}
          </DropdownList>
        </div>
        {showNotificationToggle && (
          <div className="bulk-action-bar-popover-footer">
            <Toggle
              size="sm"
              isSelected={notificationEnabled}
              onChange={onNotificationChange}
            />
            <span>Send notifications</span>
          </div>
        )}
      </div>
    </>,
    document.body
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BulkActionBar
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @param {Object} props
 * @param {number} props.selectedCount - Number of selected items
 * @param {Function} props.onClear - Called when clearing selection
 * @param {Array} props.actions - Array of action configurations
 * @param {Function} props.onAction - Called when an action is triggered
 *
 * @example
 * <BulkActionBar
 *   selectedCount={2}
 *   onClear={() => setSelectedRows([])}
 *   actions={[
 *     { id: "status", label: "Status", icon: "CircleStack", options: STATUS_OPTIONS },
 *     { id: "assignee", label: "Assignees", icon: "User", options: OWNER_OPTIONS },
 *     { id: "delete", label: "Delete", icon: "Trash", iconOnly: true, destructive: true },
 *   ]}
 *   onAction={(actionId, value) => handleBulkAction(actionId, value)}
 * />
 */
export function BulkActionBar({
  selectedCount = 0,
  itemLabel = "Tasks",
  onClear,
  actions = [],
  onAction,
  position = "fixed", // "fixed" | "sticky"
}) {
  const [mounted, setMounted] = useState(false);
  const [openAction, setOpenAction] = useState(null);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const actionRefs = useRef({});

  useEffect(() => {
    setMounted(true);
    injectStyles();
  }, []);

  if (!mounted || selectedCount === 0) return null;

  const handleActionClick = (action) => {
    if (action.options) {
      setOpenAction(openAction === action.id ? null : action.id);
    } else {
      onAction?.(action.id, null);
    }
  };

  const handleSelect = (actionId, value) => {
    onAction?.(actionId, value);
    setOpenAction(null);
  };

  const handleBarClick = (e) => {
    e.stopPropagation();
  };

  const handleClear = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onClear?.();
  };

  const barClassName = `bulk-action-bar${position === "sticky" ? " bulk-action-bar--sticky" : ""}`;

  const barContent = (
    <div
      className={barClassName}
      onClick={handleBarClick}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Selection count */}
      <div className="bulk-action-bar-selection">
        <span>{selectedCount} selected</span>
        <span className="bulk-action-bar-clear" onClick={handleClear}>
          <Icon name="XMarkIcon" size={16} />
        </span>
      </div>

      {/* Actions */}
      <div className="bulk-action-bar-actions">
        {actions.map((action, index) => (
          <React.Fragment key={action.id}>
            {action.destructive && <div className="bulk-action-bar-divider" />}
            <div ref={(el) => (actionRefs.current[action.id] = el)}>
              <ActionButton
                icon={action.icon}
                label={action.label}
                iconOnly={action.iconOnly}
                destructive={action.destructive}
                onClick={() => handleActionClick(action)}
              />

              {action.options && (
                <ActionPopover
                  open={openAction === action.id}
                  onClose={() => setOpenAction(null)}
                  anchorRef={{ current: actionRefs.current[action.id] }}
                  title={action.label}
                  options={action.options}
                  groupBy={action.groupBy}
                  selectedValue={action.selectedValue}
                  onSelect={(value) => handleSelect(action.id, value)}
                  showSearch={action.showSearch !== false}
                  showNotificationToggle={action.showNotificationToggle}
                  notificationEnabled={notificationEnabled}
                  onNotificationChange={setNotificationEnabled}
                />
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  // For sticky position, render inline; for fixed, use portal
  if (position === "sticky") {
    return barContent;
  }

  return createPortal(barContent, document.body);
}

BulkActionBar.displayName = "BulkActionBar";

export default BulkActionBar;
