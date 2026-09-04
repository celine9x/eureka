"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";

import { Badge, BADGE_COLORS } from "../../atoms/badge.jsx";
import { Button } from "../../atoms/button.jsx";
import { Chip } from "../../atoms/chip.jsx";
import { Icon } from "../../atoms/icon.jsx";
import { Link } from "../../atoms/link.jsx";
import {
  DropdownList,
  DropdownSection,
  DropdownListItem,
} from "../../molecules/dropdown-list.jsx";
import { OverflowPopover } from "../../molecules/overflow-popover.jsx";

// ─────────────────────────────────────────────────────────────────────────────
// CSS Injection
// ─────────────────────────────────────────────────────────────────────────────

let _cellStylesInjected = false;

export function injectCellStyles() {
  if (typeof document === "undefined") return;
  const existing = document.querySelector('style[data-eureka="table-cell-inline-edit"]');
  if (existing) existing.remove();
  _cellStylesInjected = false;
  _cellStylesInjected = true;

  const style = document.createElement("style");
  style.setAttribute("data-eureka", "table-cell-inline-edit");
  style.textContent = `
    /* Base cell wrapper */
    .eureka-cie {
      cursor: pointer;
      border-radius: var(--radius-sm);
      border: 1px solid transparent;
      padding: var(--spacing-sm);
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      flex: 0 0 auto;
      height: 64px;
      min-width: 0;
      overflow: hidden;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      background: transparent;
      transition: background 150ms ease, border-color 150ms ease;
    }

    /* Hover state */
    .eureka-cie:not(.eureka-cie--readonly):not(.eureka-cie--active):hover {
    }

    /* Active/editing state */
    .eureka-cie--active {
      background: var(--color-interaction-fill-active);
      border-color: var(--color-interaction-outline-active);
    }

    /* Error state */
    .eureka-cie--error {
      border-color: var(--color-interaction-outline-negative) !important;
    }

    /* Readonly state */
    .eureka-cie--readonly {
      cursor: default;
      pointer-events: none;
    }

    /* Wrap mode for chips */
    .eureka-cie--wrap {
      align-items: center;
      align-content: center;
      flex-wrap: wrap;
    }

    /* Tooltip */
    .eureka-cie-tooltip {
      position: fixed;
      z-index: 500;
      background: var(--color-general-tooltip);
      color: var(--color-content-inverted);
      padding: 4px 8px;
      border-radius: var(--radius-xs);
      font-size: var(--text-body-md);
      font-family: var(--font-family-primary);
      line-height: var(--line-height-body-md);
      max-width: 280px;
      word-break: break-word;
      pointer-events: none;
      box-shadow: var(--shadow-medium-down);
      white-space: normal;
    }

    /* Cell container */
    .eureka-cie-cell {
      position: relative;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    /* Placeholder text */
    .eureka-cie-placeholder {
      color: var(--color-content-tertiary);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      user-select: none;
    }

    /* Value text - single line */
    .eureka-cie-value {
      color: var(--color-content-primary);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }

    /* Value text - multiline (long text) */
    .eureka-cie-value--long {
      color: var(--color-content-primary);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      line-height: var(--line-height-body-md);
      width: 100%;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      min-width: 0;
      word-break: break-word;
    }

    /* Error text */
    .eureka-cie-error {
      color: var(--color-content-negative);
      font-size: var(--text-body-md);
      font-family: var(--font-family-primary);
      margin-top: 2px;
    }

    /* Floating error (positioned below cell) */
    .eureka-cie-error--floating {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 2px;
      padding: 0 var(--spacing-sm);
      color: var(--color-content-negative);
      font-size: var(--text-body-sm);
      font-family: var(--font-family-primary);
      background: var(--color-general-white);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      z-index: 5;
      pointer-events: none;
    }

    /* Icon slot */
    .eureka-cie-icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      color: var(--color-content-secondary);
    }

    /* Chips container */
    .eureka-cie-chips {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-xs);
      align-items: flex-start;
      flex: 1;
    }

    /* Link row */
    .eureka-cie-link-row {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      flex: 1;
      min-width: 0;
    }

    /* Popover overlay */
    .eureka-cie-overlay {
      position: fixed;
      inset: 0;
      z-index: 100;
    }

    /* Popover dropdown */
    .eureka-cie-popover {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      z-index: 101;
      border: none;
      background: none;
      box-shadow: none;
      min-width: 200px;
    }

    /* Input field */
    .eureka-cie-input {
      width: 100%;
      border: 1px solid var(--color-interaction-outline-active);
      border-radius: var(--radius-sm);
      padding: var(--spacing-xs) var(--spacing-sm);
      font-size: var(--text-body-md);
      font-family: var(--font-family-primary);
      color: var(--color-content-primary);
      background: var(--color-interaction-fill-active);
      outline: none;
      box-sizing: border-box;
      height: 32px;
    }

    /* Inline input (no border) */
    .eureka-cie-input--inline {
      border: none;
      background: transparent;
      height: auto;
      flex: 1;
      padding: 0;
    }

    /* Dropdown footer */
    .eureka-cie-dropdown-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-sm) var(--spacing-3);
      border-top: 1px solid var(--color-action-outline-secondary-enabled);
      gap: var(--spacing-xs);
    }
  `;
  document.head.appendChild(style);
}

export function cie(...modifiers) {
  return ["eureka-cie", ...modifiers.filter(Boolean).map((m) => `eureka-cie--${m}`)].join(" ");
}

// ─────────────────────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────────────────────

function useTruncationTooltip(valueRef, value) {
  const [isTruncated, setIsTruncated] = useState(false);
  const [tooltip, setTooltip] = useState(null);

  useLayoutEffect(() => {
    const el = valueRef.current;
    if (!el) {
      setIsTruncated(false);
      return;
    }
    setIsTruncated(
      el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 2
    );
  }, [value, valueRef]);

  const showTooltip = (e) => {
    if (!isTruncated) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({ x: rect.left, y: rect.bottom + 4 });
  };

  const hideTooltip = () => setTooltip(null);

  const tooltipPortal =
    tooltip && isTruncated && value
      ? createPortal(
          <div className="eureka-cie-tooltip" style={{ top: tooltip.y, left: tooltip.x }}>
            {value}
          </div>,
          document.body
        )
      : null;

  return { showTooltip, hideTooltip, tooltipPortal };
}

// ─────────────────────────────────────────────────────────────────────────────
// TextCellInlineEdit
// ─────────────────────────────────────────────────────────────────────────────

export function TextCellInlineEdit({
  value = "",
  onChange,
  placeholder = "Add text",
  iconLeading,
  iconTrailing,
  error,
  readOnly = false,
}) {
  useEffect(() => injectCellStyles(), []);

  const cellRef = useRef(null);
  const valueRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [cellRect, setCellRect] = useState(null);
  const { showTooltip, hideTooltip, tooltipPortal } = useTruncationTooltip(valueRef, value);

  const MAX_LENGTH = 100;
  const charError = draft.length > MAX_LENGTH ? `${draft.length}/${MAX_LENGTH} characters` : null;

  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  const discard = () => {
    setDraft(value);
    setEditing(false);
  };

  const commit = () => {
    if (draft.length > MAX_LENGTH) {
      discard();
      return;
    }
    onChange?.(draft);
    setEditing(false);
  };

  const startEdit = () => {
    if (readOnly || !cellRef.current) return;
    setCellRect(cellRef.current.getBoundingClientRect());
    setDraft(value);
    setEditing(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commit();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      discard();
    }
  };

  return (
    <div ref={cellRef} className="eureka-cie-cell">
      <div
        className={cie(error && "error", readOnly && "readonly")}
        onClick={startEdit}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {iconLeading && <span className="eureka-cie-icon">{iconLeading}</span>}

        {value ? (
          <span
            ref={valueRef}
            className="eureka-cie-value"
            style={{ color: error ? "var(--color-content-negative)" : undefined }}
          >
            {value}
          </span>
        ) : (
          <span className="eureka-cie-placeholder">{placeholder}</span>
        )}

        {iconTrailing && (
          <span className="eureka-cie-icon" style={{ marginLeft: "auto" }}>
            {iconTrailing}
          </span>
        )}

        {readOnly && (
          <span className="eureka-cie-icon" style={{ marginLeft: "auto" }}>
            <Icon name="LockClosedIcon" size={12} />
          </span>
        )}
      </div>

      {tooltipPortal}

      {(error || value.length > MAX_LENGTH) && (
        <div className="eureka-cie-error--floating">
          {error ?? `${value.length}/${MAX_LENGTH} characters`}
        </div>
      )}

      {editing &&
        !readOnly &&
        cellRect &&
        createPortal(
          <>
            <div
              style={{ position: "fixed", inset: 0, zIndex: 298 }}
              onClick={commit}
            />
            <div
              style={{
                position: "fixed",
                top: cellRect.top,
                left: cellRect.left,
                width: cellRect.width,
                minHeight: cellRect.height,
                zIndex: 299,
                background: "var(--color-interaction-fill-active)",
                border: `1px solid ${charError ? "var(--color-interaction-outline-negative)" : "var(--color-interaction-outline-active)"}`,
                borderRadius: "var(--radius-sm)",
                boxShadow: "var(--shadow-dark-down)",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-xs p-sm flex-1">
                {iconLeading && <span className="eureka-cie-icon">{iconLeading}</span>}
                <input
                  autoFocus
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="eureka-cie-input--inline"
                  style={{
                    fontFamily: "var(--font-family-primary)",
                    fontSize: "var(--text-body-md)",
                    color: "var(--color-content-primary)",
                    outline: "none",
                    border: "none",
                    background: "transparent",
                    flex: 1,
                    minWidth: 0,
                    padding: 0,
                  }}
                />
              </div>
              {charError && (
                <div
                  className="eureka-cie-error"
                  style={{ padding: "0 var(--spacing-sm) var(--spacing-xs)", marginTop: 0 }}
                >
                  {charError}
                </div>
              )}
            </div>
          </>,
          document.body
        )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ButtonCellInlineEdit
// ─────────────────────────────────────────────────────────────────────────────

export function ButtonCellInlineEdit({
  value = null,
  onChange,
  options = [],
  error,
  readOnly = false,
}) {
  useEffect(() => injectCellStyles(), []);

  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [popPos, setPopPos] = useState(null);

  const handleClick = () => {
    if (readOnly) return;
    if (!open) {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        setPopPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
      }
    }
    setOpen((prev) => !prev);
  };

  const handleSelect = (opt) => {
    onChange?.(opt);
    setOpen(false);
  };

  return (
    <div ref={ref} className="eureka-cie-cell">
      <div
        className={cie(open && "active", error && "error", readOnly && "readonly")}
        onClick={handleClick}
      >
        {value ? (
          <Button
            variant="secondary"
            size="xs"
            style={{ pointerEvents: "none", flexShrink: 0 }}
            tabIndex={-1}
          >
            {value.label}
          </Button>
        ) : (
          <span className="eureka-cie-placeholder">—</span>
        )}

        {readOnly && (
          <span className="eureka-cie-icon" style={{ marginLeft: "auto" }}>
            <Icon name="LockClosedIcon" size={12} />
          </span>
        )}
      </div>

      {open &&
        popPos &&
        createPortal(
          <>
            <div className="eureka-cie-overlay" onClick={() => setOpen(false)} />
            <div
              className="eureka-cie-popover"
              style={{
                position: "fixed",
                top: popPos.top,
                left: popPos.left,
                minWidth: popPos.width,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownList>
                <DropdownSection>
                  {options.map((opt) => (
                    <DropdownListItem
                      key={opt.id}
                      checked={value?.id === opt.id}
                      noCheckbox
                      icon={opt.icon}
                      onClick={() => handleSelect(opt)}
                    >
                      {opt.label}
                    </DropdownListItem>
                  ))}
                </DropdownSection>
              </DropdownList>
            </div>
          </>,
          document.body
        )}

      {error && <div className="eureka-cie-error">{error}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LinkCellInlineEdit
// ─────────────────────────────────────────────────────────────────────────────

export function LinkCellInlineEdit({
  value = null,
  onChange,
  options = [],
  multiple = false,
  placeholder = "Add link",
  error,
  readOnly = false,
}) {
  useEffect(() => injectCellStyles(), []);

  const ref = useRef(null);
  const badgeRef = useRef(null);
  const linkContainerRef = useRef(null);
  const visibleContainerRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [overflowOpen, setOverflowOpen] = useState(false);
  const [overflowPos, setOverflowPos] = useState(null);
  const [popPos, setPopPos] = useState(null);
  const [visibleCount, setVisibleCount] = useState(null);

  const selectedItems = multiple
    ? Array.isArray(value)
      ? value
      : []
    : value
      ? [value]
      : [];

  const isFilled = selectedItems.length > 0;
  const firstItem = selectedItems[0];

  // Measure which links fit within 2 rows, reserving space for the +N badge
  useLayoutEffect(() => {
    if (!multiple) {
      setVisibleCount(null);
      return;
    }

    const container = linkContainerRef.current;
    const visibleContainer = visibleContainerRef.current;
    if (!container || !visibleContainer || !selectedItems.length) {
      setVisibleCount(null);
      return;
    }

    // Get the actual width of the visible container
    const containerWidth = visibleContainer.offsetWidth;
    container.style.width = `${containerWidth}px`;

    const links = Array.from(container.children);
    if (!links.length) {
      setVisibleCount(null);
      return;
    }

    // Calculate based on offsetTop changes (row breaks)
    let lastRowY = -1;
    let rowCount = 0;
    let cutoff = links.length;
    let secondRowStartIndex = -1;

    for (let i = 0; i < links.length; i++) {
      const y = links[i].offsetTop;
      if (y !== lastRowY) {
        rowCount++;
        lastRowY = y;
        if (rowCount === 2) {
          secondRowStartIndex = i;
        }
      }
      if (rowCount > 2) {
        cutoff = i;
        break;
      }
    }

    // If all links fit in 2 rows, no overflow needed
    if (cutoff === links.length) {
      setVisibleCount(null);
      return;
    }

    // We have overflow - need to reserve space for the badge on row 2
    const BADGE_WIDTH = 40;
    const gap = 4;

    let adjustedCutoff = cutoff;

    // Check links on the second row to see if we need to remove one to fit the badge
    if (secondRowStartIndex >= 0 && cutoff > secondRowStartIndex) {
      const lastVisibleLink = links[cutoff - 1];
      const linkRight = lastVisibleLink.offsetLeft + lastVisibleLink.offsetWidth;
      const availableSpace = containerWidth - linkRight - gap;

      if (availableSpace < BADGE_WIDTH) {
        adjustedCutoff = cutoff - 1;
      }
    }

    setVisibleCount(adjustedCutoff > 0 ? adjustedCutoff : 1);
  }, [selectedItems, multiple]);

  const displayedLinks = visibleCount !== null ? selectedItems.slice(0, visibleCount) : selectedItems;
  const hiddenLinks = visibleCount !== null ? selectedItems.slice(visibleCount) : [];
  const overflowCount = hiddenLinks.length;

  const openDropdown = () => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setPopPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    }
    setDropdownOpen(true);
  };

  const closeDropdown = () => setDropdownOpen(false);

  const toggle = (opt) => {
    if (multiple) {
      const exists = selectedItems.find((i) => i.id === opt.id);
      onChange?.(exists ? selectedItems.filter((i) => i.id !== opt.id) : [...selectedItems, opt]);
    } else {
      onChange?.(opt);
      setDropdownOpen(false);
    }
  };

  const isSelected = (opt) => selectedItems.some((i) => i.id === opt.id);

  const handleCellClick = (e) => {
    if (readOnly) return;
    if (badgeRef.current?.contains(e.target)) return;
    dropdownOpen ? closeDropdown() : openDropdown();
  };

  const handleBadgeClick = (e) => {
    e.stopPropagation();
    if (readOnly) return;
    const rect = badgeRef.current?.getBoundingClientRect();
    if (rect) {
      setOverflowPos({ top: rect.bottom + 4, left: rect.left });
    }
    setOverflowOpen((prev) => !prev);
  };

  const handleLinkClick = (e, item) => {
    if (!item.href || item.href === "#") e.preventDefault();
    e.stopPropagation();
  };

  // Hidden measurement container style
  const measureStyle = {
    position: "absolute",
    visibility: "hidden",
    pointerEvents: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 0,
    top: 0,
    left: 0,
  };

  return (
    <div ref={ref} className="eureka-cie-cell">
      {/* Hidden measurement layer for multiple links */}
      {multiple && (
        <div ref={linkContainerRef} style={measureStyle} aria-hidden="true">
          {selectedItems.map((item) => (
            <Link
              key={item.id}
              size="md"
              href="#"
              iconLeading={
                <Icon
                  name={item.iconName ?? "LinkIcon"}
                  size={12}
                  style={{ color: "var(--color-content-secondary)" }}
                />
              }
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      <div
        className={cie(dropdownOpen && "active", error && "error", readOnly && "readonly")}
        style={multiple && isFilled ? { alignItems: "flex-start" } : undefined}
        onClick={handleCellClick}
      >
        {isFilled ? (
          multiple ? (
            <div
              ref={visibleContainerRef}
              style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%", minWidth: 0 }}
            >
              {displayedLinks.map((item, index) => {
                const isLastVisible = index === displayedLinks.length - 1;
                const showBadgeInline = isLastVisible && overflowCount > 0;

                if (showBadgeInline) {
                  return (
                    <div
                      key={item.id}
                      style={{ display: "flex", alignItems: "center", gap: "var(--spacing-xs)" }}
                    >
                      <Link
                        size="md"
                        href={item.href ?? "#"}
                        iconLeading={
                          <Icon
                            name={item.iconName ?? "LinkIcon"}
                            size={12}
                            style={{ color: "var(--color-content-secondary)" }}
                          />
                        }
                        onClick={(e) => handleLinkClick(e, item)}
                      >
                        {item.label}
                      </Link>
                      <span
                        ref={badgeRef}
                        style={{ flexShrink: 0, cursor: "pointer" }}
                        onClick={handleBadgeClick}
                      >
                        <Badge color={BADGE_COLORS.neutral} size="sm">
                          +{overflowCount}
                        </Badge>
                      </span>
                    </div>
                  );
                }

                return (
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
                    onClick={(e) => handleLinkClick(e, item)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="eureka-cie-link-row">
              <Link
                size="md"
                href={firstItem.href ?? "#"}
                iconLeading={
                  <Icon
                    name={firstItem.iconName ?? "LinkIcon"}
                    size={12}
                    style={{ color: "var(--color-content-secondary)" }}
                  />
                }
                onClick={(e) => handleLinkClick(e, firstItem)}
              >
                {firstItem.label}
              </Link>
            </div>
          )
        ) : (
          <span className="eureka-cie-placeholder">{placeholder}</span>
        )}

        {readOnly && (
          <span className="eureka-cie-icon" style={{ marginLeft: "auto" }}>
            <Icon name="LockClosedIcon" size={12} />
          </span>
        )}
      </div>

      {/* Overflow popover - shows hidden links */}
      <OverflowPopover
        open={overflowOpen}
        onClose={() => setOverflowOpen(false)}
        position={overflowPos}
        type="link"
        items={hiddenLinks}
      />

      {/* Options dropdown */}
      {dropdownOpen &&
        popPos &&
        createPortal(
          <>
            <div className="eureka-cie-overlay" onClick={closeDropdown} />
            <div
              className="eureka-cie-popover"
              style={{
                position: "fixed",
                top: popPos.top,
                left: popPos.left,
                minWidth: popPos.width,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownList>
                <DropdownSection>
                  {options.map((opt) => (
                    <DropdownListItem
                      key={opt.id}
                      checked={isSelected(opt)}
                      noCheckbox={!multiple}
                      icon={opt.icon}
                      onClick={() => toggle(opt)}
                    >
                      {opt.label}
                    </DropdownListItem>
                  ))}
                </DropdownSection>
              </DropdownList>
            </div>
          </>,
          document.body
        )}

      {error && <div className="eureka-cie-error">{error}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ChipCellInlineEdit
// ─────────────────────────────────────────────────────────────────────────────

export function ChipCellInlineEdit({
  value = [],
  onChange,
  options = [],
  multiple = true,
  placeholder = "Add tags",
  error,
  readOnly = false,
}) {
  useEffect(() => injectCellStyles(), []);

  const ref = useRef(null);
  const badgeRef = useRef(null);
  const chipContainerRef = useRef(null);
  const visibleContainerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [overflowOpen, setOverflowOpen] = useState(false);
  const [overflowPos, setOverflowPos] = useState(null);
  const [popPos, setPopPos] = useState(null);
  const [visibleCount, setVisibleCount] = useState(null);

  // Measure which chips fit within 2 rows, reserving space for the +N badge
  useLayoutEffect(() => {
    const container = chipContainerRef.current;
    const visibleContainer = visibleContainerRef.current;
    if (!container || !visibleContainer || !value.length) {
      setVisibleCount(null);
      return;
    }

    // Get the actual width of the visible container
    const containerWidth = visibleContainer.offsetWidth;
    container.style.width = `${containerWidth}px`;

    const chips = Array.from(container.children);
    if (!chips.length) {
      setVisibleCount(null);
      return;
    }

    // Calculate based on offsetTop changes (row breaks)
    let lastRowY = -1;
    let rowCount = 0;
    let cutoff = chips.length;
    let secondRowStartIndex = -1;

    for (let i = 0; i < chips.length; i++) {
      const y = chips[i].offsetTop;
      if (y !== lastRowY) {
        rowCount++;
        lastRowY = y;
        if (rowCount === 2) {
          secondRowStartIndex = i;
        }
      }
      if (rowCount > 2) {
        cutoff = i;
        break;
      }
    }

    // If all chips fit in 2 rows, no overflow needed
    if (cutoff === chips.length) {
      setVisibleCount(null);
      return;
    }

    // We have overflow - need to reserve space for the badge on row 2
    // Badge is approximately 32px wide (including gap)
    const BADGE_WIDTH = 40;
    const gap = 4; // var(--spacing-xs)

    // Find the last chip that fits on row 2 while leaving room for badge
    let adjustedCutoff = cutoff;

    // Check chips on the second row to see if we need to remove one to fit the badge
    if (secondRowStartIndex >= 0 && cutoff > secondRowStartIndex) {
      // Get the right edge of the last visible chip
      const lastVisibleChip = chips[cutoff - 1];
      const chipRight = lastVisibleChip.offsetLeft + lastVisibleChip.offsetWidth;
      const availableSpace = containerWidth - chipRight - gap;

      // If not enough space for badge, remove one chip
      if (availableSpace < BADGE_WIDTH) {
        adjustedCutoff = cutoff - 1;
      }
    }

    setVisibleCount(adjustedCutoff > 0 ? adjustedCutoff : 1);
  }, [value]);

  const displayedChips = visibleCount !== null ? value.slice(0, visibleCount) : value;
  const hiddenChips = visibleCount !== null ? value.slice(visibleCount) : [];
  const overflowCount = hiddenChips.length;

  const toggle = (opt) => {
    if (multiple) {
      const exists = value.find((c) => c.id === opt.id);
      onChange?.(exists ? value.filter((c) => c.id !== opt.id) : [...value, opt]);
    } else {
      const exists = value.find((c) => c.id === opt.id);
      onChange?.(exists ? [] : [opt]);
      setOpen(false);
    }
  };

  const handleCellClick = (e) => {
    if (readOnly) return;
    if (badgeRef.current?.contains(e.target)) return;

    if (!open) {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        setPopPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
      }
    }
    setOpen((prev) => !prev);
  };

  const handleBadgeClick = (e) => {
    e.stopPropagation();
    if (readOnly) return;

    const rect = badgeRef.current?.getBoundingClientRect();
    if (rect) {
      setOverflowPos({ top: rect.bottom + 4, left: rect.left });
    }
    setOverflowOpen((prev) => !prev);
  };

  // Hidden measurement container style
  const measureStyle = {
    position: "absolute",
    visibility: "hidden",
    pointerEvents: "none",
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--spacing-xs)",
    top: 0,
    left: 0,
  };

  return (
    <div ref={ref} className="eureka-cie-cell">
      {/* Hidden measurement layer - uses same size as visible chips */}
      <div ref={chipContainerRef} style={measureStyle} aria-hidden="true">
        {value.map((chip) => (
          <Chip key={chip.id} variant="neutral" size="md">
            {chip.label}
          </Chip>
        ))}
      </div>

      <div
        className={cie("wrap", open && "active", error && "error", readOnly && "readonly")}
        onClick={handleCellClick}
      >
        <div ref={visibleContainerRef} className="eureka-cie-chips">
          {!value.length && <span className="eureka-cie-placeholder">{placeholder}</span>}

          {displayedChips.map((chip) => (
            <Chip key={chip.id} variant="neutral" size="md">
              {chip.label}
            </Chip>
          ))}

          {overflowCount > 0 && (
            <span
              ref={badgeRef}
              style={{ flexShrink: 0, alignSelf: "center", cursor: "pointer" }}
              onClick={handleBadgeClick}
            >
              <Badge color={BADGE_COLORS.neutral} size="sm">
                +{overflowCount}
              </Badge>
            </span>
          )}
        </div>

        {readOnly && (
          <span
            className="eureka-cie-icon"
            style={{ marginLeft: "auto", alignSelf: "center", flexShrink: 0 }}
          >
            <Icon name="LockClosedIcon" size={12} />
          </span>
        )}
      </div>

      {/* Overflow popover - shows hidden chips */}
      <OverflowPopover
        open={overflowOpen}
        onClose={() => setOverflowOpen(false)}
        position={overflowPos}
        type="chip"
        items={hiddenChips}
      />

      {/* Options dropdown */}
      {open &&
        popPos &&
        createPortal(
          <>
            <div className="eureka-cie-overlay" onClick={() => setOpen(false)} />
            <div
              className="eureka-cie-popover"
              style={{
                position: "fixed",
                top: popPos.top,
                left: popPos.left,
                minWidth: popPos.width,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownList>
                <DropdownSection>
                  {options.map((opt) => (
                    <DropdownListItem
                      key={opt.id}
                      checked={!!value.find((c) => c.id === opt.id)}
                      noCheckbox={!multiple}
                      onClick={() => toggle(opt)}
                    >
                      {opt.label}
                    </DropdownListItem>
                  ))}
                </DropdownSection>
              </DropdownList>
            </div>
          </>,
          document.body
        )}

      {error && <div className="eureka-cie-error">{error}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TextMultipleCellInlineEdit
// ─────────────────────────────────────────────────────────────────────────────

export function TextMultipleCellInlineEdit({
  value = [],
  onChange,
  placeholder = "Add text",
  iconLeading,
  readOnly = false,
  error,
}) {
  useEffect(() => injectCellStyles(), []);

  const ref = useRef(null);
  const badgeRef = useRef(null);
  const [listOpen, setListOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [editingSingle, setEditingSingle] = useState(false);
  const [editingListItemId, setEditingListItemId] = useState(null);
  const [draft, setDraft] = useState("");
  const [listItemDraft, setListItemDraft] = useState("");
  const [listPos, setListPos] = useState(null);
  const [addPos, setAddPos] = useState(null);

  const hasValues = value.length > 0;
  const isSingle = value.length === 1;
  const firstItem = value[0];
  const overflowCount = value.length - 1;

  const commitAdd = () => {
    const trimmed = draft.trim();
    if (trimmed) {
      onChange?.([...value, { id: `tm${Date.now()}`, label: trimmed }]);
    }
    setDraft("");
    setAdding(false);
  };

  const commitEditSingle = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      onChange?.([]);
    } else {
      onChange?.([{ ...firstItem, label: trimmed }]);
    }
    setDraft("");
    setEditingSingle(false);
  };

  const handleRemove = (id) => onChange?.(value.filter((i) => i.id !== id));

  const openList = (e) => {
    e.stopPropagation();
    if (readOnly) return;
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setListPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    }
    setListOpen((prev) => !prev);
  };

  const openAdd = (e) => {
    e.stopPropagation();
    if (readOnly) return;
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setAddPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    }
    setAdding(true);
  };

  const openEditSingle = () => {
    if (readOnly) return;
    setDraft(firstItem.label);
    setEditingSingle(true);
  };

  // Inline editing mode (empty + adding, or single + editing)
  if ((!hasValues && adding) || (isSingle && editingSingle)) {
    const commit = editingSingle ? commitEditSingle : commitAdd;
    const cancel = editingSingle
      ? () => {
          setDraft("");
          setEditingSingle(false);
        }
      : () => {
          setDraft("");
          setAdding(false);
        };

    return (
      <div ref={ref} className="eureka-cie-cell">
        <div className={cie("active", error && "error")}>
          {iconLeading && <span className="eureka-cie-icon">{iconLeading}</span>}
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commit();
              }
              if (e.key === "Escape") {
                e.preventDefault();
                cancel();
              }
            }}
            placeholder={placeholder}
            className="eureka-cie-input--inline"
            style={{
              fontFamily: "var(--font-family-primary)",
              fontSize: "var(--text-body-md)",
              color: "var(--color-content-primary)",
              outline: "none",
              border: "none",
              background: "transparent",
              flex: 1,
              padding: 0,
            }}
          />
        </div>
        {error && <div className="eureka-cie-error">{error}</div>}
      </div>
    );
  }

  return (
    <div ref={ref} className="eureka-cie-cell">
      <div
        className={cie(listOpen && "active", error && "error", readOnly && "readonly")}
        onClick={!hasValues && !readOnly ? openAdd : isSingle && !readOnly ? openEditSingle : undefined}
        style={{ pointerEvents: readOnly ? "none" : undefined }}
      >
        {iconLeading && <span className="eureka-cie-icon">{iconLeading}</span>}

        {firstItem ? (
          <span className="eureka-cie-value">{firstItem.label}</span>
        ) : (
          <span className="eureka-cie-placeholder">{placeholder}</span>
        )}

        {overflowCount > 0 && (
          <span
            ref={badgeRef}
            style={{ flexShrink: 0, cursor: "pointer" }}
            onClick={openList}
          >
            <Badge color={BADGE_COLORS.neutral} size="sm">
              +{overflowCount}
            </Badge>
          </span>
        )}

        {hasValues && !readOnly && (
          <span style={{ flexShrink: 0, marginLeft: "auto" }} onClick={openAdd}>
            <Button
              variant="secondary"
              size="sm"
              iconLeading={<Icon name="PlusIcon" size={14} />}
              tabIndex={-1}
              style={{ aspectRatio: "1 / 1", padding: 0 }}
            />
          </span>
        )}
      </div>

      {/* List popover */}
      {listOpen &&
        listPos &&
        createPortal(
          <>
            <div
              className="eureka-cie-overlay"
              onClick={() => {
                setListOpen(false);
                setEditingListItemId(null);
              }}
            />
            <div
              className="eureka-cie-popover"
              style={{
                position: "fixed",
                top: listPos.top,
                left: listPos.left,
                width: listPos.width,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {value.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--spacing-xs)",
                    padding: "var(--spacing-xs) var(--spacing-sm)",
                  }}
                >
                  {iconLeading && (
                    <span className="eureka-cie-icon" style={{ flexShrink: 0 }}>
                      {iconLeading}
                    </span>
                  )}

                  {editingListItemId === item.id ? (
                    <input
                      autoFocus
                      value={listItemDraft}
                      onChange={(e) => setListItemDraft(e.target.value)}
                      onBlur={() => {
                        const trimmed = listItemDraft.trim();
                        if (!trimmed) {
                          onChange?.(value.filter((i) => i.id !== item.id));
                        } else {
                          onChange?.(
                            value.map((i) =>
                              i.id === item.id ? { ...i, label: trimmed } : i
                            )
                          );
                        }
                        setEditingListItemId(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          e.target.blur();
                        }
                        if (e.key === "Escape") {
                          e.preventDefault();
                          setEditingListItemId(null);
                        }
                      }}
                      className="eureka-cie-input--inline"
                      style={{
                        fontFamily: "var(--font-family-primary)",
                        fontSize: "var(--text-body-md)",
                        color: "var(--color-content-primary)",
                        outline: "none",
                        border: "none",
                        background: "transparent",
                        flex: 1,
                        padding: 0,
                      }}
                    />
                  ) : (
                    <span
                      className="eureka-cie-value"
                      style={{
                        flex: 1,
                        whiteSpace: "normal",
                        cursor: readOnly ? "default" : "text",
                      }}
                      onClick={() => {
                        if (!readOnly) {
                          setListItemDraft(item.label);
                          setEditingListItemId(item.id);
                        }
                      }}
                    >
                      {item.label}
                    </span>
                  )}

                  {!readOnly && (
                    <span
                      className="eureka-cie-icon"
                      style={{ flexShrink: 0, cursor: "pointer", opacity: 0.6 }}
                      onClick={() => {
                        handleRemove(item.id);
                        if (value.length <= 1) setListOpen(false);
                      }}
                    >
                      <Icon name="XMarkIcon" size={12} />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </>,
          document.body
        )}

      {/* Add input popover */}
      {adding &&
        addPos &&
        createPortal(
          <>
            <div className="eureka-cie-overlay" onClick={commitAdd} />
            <div
              style={{
                position: "fixed",
                top: addPos.top,
                left: addPos.left,
                width: addPos.width,
                zIndex: 101,
                background: "var(--color-interaction-fill-active)",
                border: "1px solid var(--color-interaction-outline-active)",
                borderRadius: "var(--radius-sm)",
                padding: "var(--spacing-sm) 0",
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-xs)",
                boxSizing: "border-box",
                boxShadow: "var(--shadow-medium-down)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {iconLeading && (
                <span className="eureka-cie-icon" style={{ flexShrink: 0 }}>
                  {iconLeading}
                </span>
              )}
              <input
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    commitAdd();
                  }
                  if (e.key === "Escape") {
                    setDraft("");
                    setAdding(false);
                  }
                }}
                placeholder={placeholder}
                className="eureka-cie-input--inline"
                style={{
                  fontFamily: "var(--font-family-primary)",
                  fontSize: "var(--text-body-md)",
                  color: "var(--color-content-primary)",
                  outline: "none",
                  border: "none",
                  background: "transparent",
                  flex: 1,
                  padding: 0,
                }}
              />
            </div>
          </>,
          document.body
        )}

      {error && <div className="eureka-cie-error">{error}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NumberCellInlineEdit
// ─────────────────────────────────────────────────────────────────────────────

const CURRENCY_CONFIG = {
  USD: { symbol: "$", decimals: 2 },
  EUR: { symbol: "€", decimals: 2 },
  GBP: { symbol: "£", decimals: 2 },
  CHF: { symbol: "CHF", decimals: 2 },
  CAD: { symbol: "CA$", decimals: 2 },
  AUD: { symbol: "A$", decimals: 2 },
  JPY: { symbol: "¥", decimals: 0 },
  KRW: { symbol: "₩", decimals: 0 },
  VND: { symbol: "₫", decimals: 0 },
  CLP: { symbol: "CLP", decimals: 0 },
};

function formatNumber(num, decimals) {
  if (num === null || num === undefined || num === "") return "";
  return Number(num).toFixed(decimals);
}

export function NumberCellInlineEdit({
  value = null,
  onChange,
  currency = "USD",
  placeholder = "—",
  readOnly = false,
}) {
  useEffect(() => injectCellStyles(), []);

  const { symbol, decimals } = CURRENCY_CONFIG[currency] ?? { symbol: "$", decimals: 2 };
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value !== null ? String(value) : "");

  useEffect(() => {
    if (!editing) {
      setDraft(value !== null ? String(value) : "");
    }
  }, [value, editing]);

  const numericPattern = decimals > 0 ? /^-?\d*\.?\d*$/ : /^-?\d*$/;

  const handleChange = (e) => {
    const raw = e.target.value;
    if (raw === "" || raw === "-" || numericPattern.test(raw)) {
      setDraft(raw);
    }
  };

  const commit = () => {
    if (draft === "" || draft === "-") {
      onChange?.(null);
    } else {
      const num = parseFloat(draft);
      if (isNaN(num)) {
        discard();
        return;
      }
      onChange?.(parseFloat(num.toFixed(decimals)));
    }
    setEditing(false);
  };

  const discard = () => {
    setDraft(value !== null ? String(value) : "");
    setEditing(false);
  };

  const hasValue = value !== null && value !== undefined && value !== "";

  const symbolStyle = {
    flexShrink: 0,
    paddingRight: 4,
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
  };

  if (editing && !readOnly) {
    return (
      <div className="eureka-cie-cell">
        <div className={cie("active")} style={{ position: "relative" }}>
          <span className="eureka-cie-icon" style={symbolStyle}>
            {symbol}
          </span>
          <input
            autoFocus
            type="text"
            inputMode="decimal"
            value={draft}
            onChange={handleChange}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commit();
              }
              if (e.key === "Escape") discard();
            }}
            className="eureka-cie-input--inline"
            style={{
              fontFamily: "var(--font-family-primary)",
              fontSize: "var(--text-body-md)",
              color: "var(--color-content-primary)",
              outline: "none",
              border: "none",
              background: "transparent",
              flex: 1,
              width: "100%",
              padding: 0,
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="eureka-cie-cell">
      <div
        className={cie(readOnly && "readonly")}
        onClick={() => {
          if (!readOnly) {
            setDraft(value !== null ? String(value) : "");
            setEditing(true);
          }
        }}
      >
        <span className="eureka-cie-icon" style={symbolStyle}>
          {symbol}
        </span>

        {hasValue ? (
          <span className="eureka-cie-value">{formatNumber(value, decimals)}</span>
        ) : (
          <span className="eureka-cie-placeholder">{placeholder}</span>
        )}

        {readOnly && (
          <span className="eureka-cie-icon" style={{ marginLeft: "auto" }}>
            <Icon name="LockClosedIcon" size={12} />
          </span>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LongTextCellInlineEdit
// ─────────────────────────────────────────────────────────────────────────────

const LONG_TEXT_MAX_LENGTH = 500;
const LONG_TEXT_MAX_HEIGHT = 360;

export function LongTextCellInlineEdit({
  value = "",
  onChange,
  placeholder = "Add text",
  error,
  readOnly = false,
}) {
  useEffect(() => injectCellStyles(), []);

  const cellRef = useRef(null);
  const valueRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [cellRect, setCellRect] = useState(null);
  const { showTooltip, hideTooltip, tooltipPortal } = useTruncationTooltip(valueRef, value);

  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  const discard = () => {
    setDraft(value);
    setEditing(false);
  };

  const commit = () => {
    if (draft.length > LONG_TEXT_MAX_LENGTH) {
      discard();
      return;
    }
    onChange?.(draft);
    setEditing(false);
  };

  const startEdit = () => {
    if (readOnly || !cellRef.current) return;
    setCellRect(cellRef.current.getBoundingClientRect());
    setDraft(value);
    setEditing(true);
  };

  const autoResize = (el) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, LONG_TEXT_MAX_HEIGHT)}px`;
  };

  const hasError = error || value.length > LONG_TEXT_MAX_LENGTH;

  return (
    <div ref={cellRef} className="eureka-cie-cell">
      <div
        className={cie(editing && "active", hasError && "error", readOnly && "readonly")}
        style={{ flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}
        onClick={startEdit}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        <div style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
          {value ? (
            <span
              ref={valueRef}
              className="eureka-cie-value--long"
              style={{ color: error ? "var(--color-content-negative)" : undefined }}
            >
              {value}
            </span>
          ) : (
            <span className="eureka-cie-placeholder">{placeholder}</span>
          )}

          {readOnly && (
            <span className="eureka-cie-icon" style={{ marginLeft: "auto", flexShrink: 0 }}>
              <Icon name="LockClosedIcon" size={12} />
            </span>
          )}
        </div>

        {hasError && (
          <div className="eureka-cie-error" style={{ marginTop: "var(--spacing-xs)" }}>
            {error ?? `${value.length}/${LONG_TEXT_MAX_LENGTH} characters`}
          </div>
        )}
      </div>

      {tooltipPortal}

      {editing &&
        cellRect &&
        createPortal(
          <>
            <div style={{ position: "fixed", inset: 0, zIndex: 298 }} onClick={commit} />
            <div
              style={{
                position: "fixed",
                top: cellRect.top,
                left: cellRect.left,
                width: cellRect.width,
                minHeight: cellRect.height,
                zIndex: 299,
                background: "var(--color-interaction-fill-active)",
                border: `1px solid ${draft.length > LONG_TEXT_MAX_LENGTH ? "var(--color-interaction-outline-negative)" : "var(--color-interaction-outline-active)"}`,
                borderRadius: "var(--radius-sm)",
                boxShadow: "var(--shadow-dark-down)",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <textarea
                ref={(el) => {
                  if (el) autoResize(el);
                }}
                autoFocus
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value);
                  autoResize(e.target);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    e.preventDefault();
                    discard();
                  }
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    commit();
                  }
                }}
                style={{
                  width: "100%",
                  border: "none",
                  outline: "none",
                  resize: "none",
                  overflowY: "auto",
                  overflowX: "hidden",
                  maxHeight: LONG_TEXT_MAX_HEIGHT,
                  padding: "var(--spacing-sm)",
                  boxSizing: "border-box",
                  fontFamily: "var(--font-family-primary)",
                  fontSize: "var(--text-body-md)",
                  lineHeight: "var(--line-height-body-md)",
                  color: "var(--color-content-primary)",
                  background: "transparent",
                  minHeight: cellRect.height,
                }}
              />
              {draft.length > LONG_TEXT_MAX_LENGTH && (
                <div
                  className="eureka-cie-error"
                  style={{ padding: "0 0 var(--spacing-xs)", marginTop: 0 }}
                >
                  {draft.length}/{LONG_TEXT_MAX_LENGTH} characters
                </div>
              )}
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
