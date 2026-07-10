"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { createPortal } from "react-dom";
import { Badge, BADGE_COLORS } from "../../atoms/badge.jsx";
import { Chip } from "../../atoms/chip.jsx";
import { Link } from "../../atoms/link.jsx";
import { Icon } from "../../atoms/icon.jsx";
import { Button } from "../../atoms/button.jsx";
import {
  DropdownList,
  DropdownSection,
  DropdownListItem,
} from "../../molecules/dropdown-list.jsx";

// ─────────────────────────────────────────────
// CSS INJECTION — hover / active via :hover
// ─────────────────────────────────────────────

let _cellStylesInjected = false;

function injectCellStyles() {
  if (_cellStylesInjected || typeof document === "undefined") return;
  _cellStylesInjected = true;
  const el = document.createElement("style");
  el.setAttribute("data-eureka", "table-cell-inline-edit");
  el.textContent = `
    .eureka-cie {
      cursor: pointer;
      border-radius: var(--radius-sm);
      border: 1px solid transparent;
      padding: var(--spacing-sm) var(--spacing-3);
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      min-height: 40px;
      min-width: 0;
      overflow: hidden;
      width: 100%;
      box-sizing: border-box;
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      background: transparent;
      transition: background 150ms ease, border-color 150ms ease;
    }
    .eureka-cie:not(.eureka-cie--readonly):not(.eureka-cie--active):hover {
      background: var(--color-general-white);
      border-color: var(--color-outline-neutral);
    }
    .eureka-cie.eureka-cie--active {
      background: var(--color-interaction-fill-active);
      border-color: var(--color-interaction-outline-active);
    }
    .eureka-cie.eureka-cie--error {
      border-color: var(--color-interaction-outline-negative) !important;
    }
    .eureka-cie.eureka-cie--readonly {
      cursor: default;
      pointer-events: none;
    }
    .eureka-cie.eureka-cie--wrap {
      align-items: flex-start;
      flex-wrap: wrap;
    }
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
  `;
  document.head.appendChild(el);
}

function cie(...modifiers) {
  return ["eureka-cie", ...modifiers.filter(Boolean).map((m) => `eureka-cie--${m}`)].join(" ");
}

// ─────────────────────────────────────────────
// SHARED INLINE STYLES
// ─────────────────────────────────────────────

const s = {
  cell: {
    position: "relative",
    width: "100%",
    boxSizing: "border-box",
    minWidth: 0,
  },

  placeholder: {
    color: "var(--color-content-tertiary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    userSelect: "none",
  },

  value: {
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minWidth: 0,
  },

  longValue: {
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    width: "100%",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    minWidth: 0,
    wordBreak: "break-word",
  },

  errorText: {
    color: "var(--color-content-negative)",
    fontSize: "var(--text-body-md)",
    fontFamily: "var(--font-family-primary)",
    marginTop: 2,
  },

  iconSlot: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    color: "var(--color-content-secondary)",
  },

  input: {
    width: "100%",
    border: "1px solid var(--color-interaction-outline-active)",
    borderRadius: "var(--radius-sm)",
    padding: "var(--spacing-xs) var(--spacing-sm)",
    fontSize: "var(--text-body-md)",
    fontFamily: "var(--font-family-primary)",
    color: "var(--color-content-primary)",
    background: "var(--color-interaction-fill-active)",
    outline: "none",
    boxSizing: "border-box",
    height: 32,
  },

  popoverOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 100,
  },

  popover: {
    position: "absolute",
    top: "calc(100% + 4px)",
    left: 0,
    zIndex: 101,
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--color-action-outline-secondary-enabled)",
    boxShadow: "var(--shadow-medium-down)",
    minWidth: 200,
  },

  chipsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--spacing-xs)",
    alignItems: "flex-start",
    flex: 1,
  },

  linkRow: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
    flex: 1,
    minWidth: 0,
  },

  dropdownFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "var(--spacing-sm) var(--spacing-3)",
    borderTop: "1px solid var(--color-action-outline-secondary-enabled)",
    gap: "var(--spacing-xs)",
  },
};

// ─────────────────────────────────────────────
// TEXT CELL INLINE EDIT
// ─────────────────────────────────────────────

// Shared tooltip hook
function useTruncationTooltip(valueRef, value) {
  const [isTruncated, setIsTruncated] = useState(false);
  const [tooltip, setTooltip] = useState(null); // { x, y } when visible

  useLayoutEffect(() => {
    const el = valueRef.current;
    if (!el) { setIsTruncated(false); return; }
    setIsTruncated(el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 2);
  }, [value, valueRef]);

  const showTooltip = (e) => {
    if (!isTruncated) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({ x: rect.left, y: rect.bottom + 4 });
  };
  const hideTooltip = () => setTooltip(null);

  const tooltipPortal = tooltip && isTruncated && value
    ? createPortal(
        <div className="eureka-cie-tooltip" style={{ top: tooltip.y, left: tooltip.x }}>
          {value}
        </div>,
        document.body
      )
    : null;

  return { showTooltip, hideTooltip, tooltipPortal };
}

export function TextCellInlineEdit({
  value = "",
  onChange,
  placeholder = "Add text",
  iconLeading,
  iconTrailing,
  error,
  readOnly = false,
}) {
  useEffect(() => { injectCellStyles(); }, []);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const valueRef = useRef(null);
  const { showTooltip, hideTooltip, tooltipPortal } = useTruncationTooltip(valueRef, value);

  const discard = () => { setDraft(value); setEditing(false); };
  const commit = () => {
    if (draft.length > 100) { discard(); return; }
    onChange?.(draft); setEditing(false);
  };

  useEffect(() => { if (!editing) setDraft(value); }, [value, editing]);

  const charError = draft.length > 100 ? `${draft.length}/100 characters` : null;

  if (editing && !readOnly) {
    return (
      <div style={s.cell}>
        <div
          className={cie("active", charError && "error")}
          style={{ position: "relative" }}
        >
          {iconLeading && (
            <span style={{ ...s.iconSlot, position: "absolute", left: 12, zIndex: 1 }}>
              {iconLeading}
            </span>
          )}
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") { e.preventDefault(); commit(); }
              if (e.key === "Escape") discard();
            }}
            style={{
              ...s.input,
              border: "none",
              borderRadius: 0,
              background: "transparent",
              height: "auto",
              flex: 1,
              width: "100%",
              paddingLeft: iconLeading ? 28 : 0,
              paddingRight: iconTrailing ? 28 : 0,
              padding: 0,
              paddingLeft: iconLeading ? 28 : 0,
            }}
          />
          {iconTrailing && (
            <span style={{ ...s.iconSlot, position: "absolute", right: 12 }}>
              {iconTrailing}
            </span>
          )}
        </div>
        {charError && <div style={s.errorText}>{charError}</div>}
      </div>
    );
  }

  return (
    <div style={s.cell}>
      <div
        className={cie(error && "error", readOnly && "readonly")}
        onClick={() => { if (!readOnly) { setDraft(value); setEditing(true); } }}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {iconLeading && <span style={s.iconSlot}>{iconLeading}</span>}
        {value ? (
          <span ref={valueRef} style={{ ...s.value, color: error ? "var(--color-content-negative)" : "var(--color-content-primary)" }}>
            {value}
          </span>
        ) : (
          <span style={s.placeholder}>{placeholder}</span>
        )}
        {iconTrailing && <span style={{ ...s.iconSlot, marginLeft: "auto" }}>{iconTrailing}</span>}
        {readOnly && (
          <span style={{ ...s.iconSlot, marginLeft: "auto" }}>
            <Icon name="LockClosedIcon" size={12} />
          </span>
        )}
      </div>
      {tooltipPortal}
      {(error || value.length > 100) && <div style={s.errorText}>{error ?? `${value.length}/100 characters`}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────
// BUTTON CELL INLINE EDIT
// ─────────────────────────────────────────────

export function ButtonCellInlineEdit({
  value = null,
  onChange,
  options = [],
  error,
  readOnly = false,
}) {
  useEffect(() => { injectCellStyles(); }, []);

  const [open, setOpen] = useState(false);
  const [popPos, setPopPos] = useState(null);
  const ref = useRef(null);

  return (
    <div ref={ref} style={s.cell}>
      <div
        className={cie(open && "active", error && "error", readOnly && "readonly")}
        onClick={() => {
          if (!readOnly) {
            if (!open) {
              const rect = ref.current?.getBoundingClientRect();
              if (rect) setPopPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
            }
            setOpen((o) => !o);
          }
        }}
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
          <span style={s.placeholder}>—</span>
        )}
        {readOnly && (
          <span style={{ ...s.iconSlot, marginLeft: "auto" }}>
            <Icon name="LockClosedIcon" size={12} />
          </span>
        )}
      </div>

      {open && popPos && createPortal(
        <>
          <div style={s.popoverOverlay} onClick={() => setOpen(false)} />
          <div style={{ ...s.popover, position: "fixed", top: popPos.top, left: popPos.left, minWidth: popPos.width }} onClick={(e) => e.stopPropagation()}>
            <DropdownList>
              <DropdownSection>
                {options.map((opt) => (
                  <DropdownListItem
                    key={opt.id}
                    checked={value?.id === opt.id}
                    noCheckbox
                    icon={opt.icon}
                    onClick={() => { onChange?.(opt); setOpen(false); }}
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
      {error && <div style={s.errorText}>{error}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────
// LINK CELL INLINE EDIT
// ─────────────────────────────────────────────

export function LinkCellInlineEdit({
  value = null,
  onChange,
  options = [],
  multiple = false,
  placeholder = "Add link",
  error,
  readOnly = false,
  iconLeading,
}) {
  useEffect(() => { injectCellStyles(); }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [overflowOpen, setOverflowOpen] = useState(false);
  const [draft, setDraft] = useState([]);
  const [popPos, setPopPos] = useState(null);
  const ref = useRef(null);
  const badgeRef = useRef(null);

  const selectedItems = multiple
    ? Array.isArray(value) ? value : []
    : value ? [value] : [];

  const isFilled = selectedItems.length > 0;
  const firstItem = selectedItems[0];
  const overflowCount = selectedItems.length - 1;
  const hasOverflow = multiple && overflowCount > 0;

  const openDropdown = () => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) setPopPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    setDraft(Array.isArray(value) ? [...value] : []);
    setDropdownOpen(true);
  };
  const handleSave = () => { onChange?.(draft); setDropdownOpen(false); };
  const handleCancel = () => setDropdownOpen(false);

  const toggle = (opt) => {
    if (multiple) {
      const exists = draft.find((i) => i.id === opt.id);
      setDraft(exists ? draft.filter((i) => i.id !== opt.id) : [...draft, opt]);
    } else {
      onChange?.(opt);
      setDropdownOpen(false);
    }
  };

  const isSelected = (opt) => multiple ? draft.some((i) => i.id === opt.id) : selectedItems.some((i) => i.id === opt.id);

  const handleCellClick = (e) => {
    if (readOnly) return;
    if (badgeRef.current && badgeRef.current.contains(e.target)) return;
    if (dropdownOpen) { handleCancel(); } else { openDropdown(); }
  };

  const handleBadgeClick = (e) => {
    e.stopPropagation();
    if (readOnly) return;
    setOverflowOpen((o) => !o);
  };

  return (
    <div ref={ref} style={s.cell}>
      <div
        className={cie(dropdownOpen && "active", error && "error", readOnly && "readonly")}
        onClick={handleCellClick}
      >
        {iconLeading && <span style={s.iconSlot}>{iconLeading}</span>}

        {isFilled ? (
          <div style={s.linkRow}>
            <Link
              size="md"
              href={firstItem.href ?? "#"}
              iconLeading={multiple ? (firstItem.icon ?? <Icon name="LinkIcon" size={12} />) : undefined}
              onClick={(e) => { if (!firstItem.href || firstItem.href === "#") e.preventDefault(); e.stopPropagation(); }}
            >
              {firstItem.label}
            </Link>

            {hasOverflow && (
              <span ref={badgeRef} style={{ position: "relative", flexShrink: 0 }}>
                <span onClick={handleBadgeClick} style={{ cursor: "pointer" }}>
                  <Badge color={BADGE_COLORS.neutral} size="sm">+{overflowCount}</Badge>
                </span>
                {overflowOpen && (
                  <>
                    <div style={s.popoverOverlay} onClick={(e) => { e.stopPropagation(); setOverflowOpen(false); }} />
                    <div style={{ ...s.popover, minWidth: 180 }} onClick={(e) => e.stopPropagation()}>
                      <div style={{ padding: "var(--spacing-sm)", display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
                        {selectedItems.slice(1).map((item) => (
                          <Link
                            key={item.id}
                            size="md"
                            href={item.href ?? "#"}
                            iconLeading={item.icon ?? <Icon name="LinkIcon" size={12} />}
                            onClick={(e) => { if (!item.href || item.href === "#") e.preventDefault(); }}
                            style={{ display: "block" }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </span>
            )}
          </div>
        ) : (
          <span style={s.placeholder}>{placeholder}</span>
        )}

        {readOnly && (
          <span style={{ ...s.iconSlot, marginLeft: "auto" }}>
            <Icon name="LockClosedIcon" size={12} />
          </span>
        )}
      </div>

      {dropdownOpen && popPos && createPortal(
        <>
          <div style={s.popoverOverlay} onClick={handleCancel} />
          <div style={{ ...s.popover, position: "fixed", top: popPos.top, left: popPos.left, minWidth: popPos.width }} onClick={(e) => e.stopPropagation()}>
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
      {error && <div style={s.errorText}>{error}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────
// CHIP CELL INLINE EDIT
// ─────────────────────────────────────────────

export function ChipCellInlineEdit({
  value = [],
  onChange,
  options = [],
  multiple = true,
  placeholder = "Add tags",
  error,
  readOnly = false,
}) {
  useEffect(() => { injectCellStyles(); }, []);

  const [open, setOpen] = useState(false);
  const [overflowOpen, setOverflowOpen] = useState(false);
  const [popPos, setPopPos] = useState(null);
  const ref = useRef(null);
  const badgeRef = useRef(null);
  const chipContainerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(null); // null = all visible

  // Measure which chips fit within 2 rows after render
  useLayoutEffect(() => {
    const container = chipContainerRef.current;
    if (!container || !value.length) { setVisibleCount(null); return; }
    const chips = Array.from(container.children);
    if (!chips.length) { setVisibleCount(null); return; }

    let lastRowY = -1;
    let rowCount = 0;
    let cutoff = chips.length;

    for (let i = 0; i < chips.length; i++) {
      const y = chips[i].offsetTop;
      if (y !== lastRowY) { rowCount++; lastRowY = y; }
      if (rowCount > 2) { cutoff = i; break; }
    }

    setVisibleCount(cutoff < chips.length ? cutoff : null);
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

  const handleBadgeClick = (e) => {
    e.stopPropagation();
    if (readOnly) return;
    setOverflowOpen((o) => !o);
  };

  const handleCellClick = (e) => {
    if (readOnly) return;
    if (badgeRef.current && badgeRef.current.contains(e.target)) return;
    if (!open) {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) setPopPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    }
    setOpen((o) => !o);
  };

  // Hidden measurement container (renders all chips off-screen to measure)
  const measureStyle = {
    position: "absolute",
    visibility: "hidden",
    pointerEvents: "none",
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--spacing-xs)",
    width: "100%",
    top: 0,
    left: 0,
  };

  return (
    <div ref={ref} style={s.cell}>
      {/* Hidden measurement layer */}
      <div ref={chipContainerRef} style={measureStyle} aria-hidden="true">
        {value.map((chip) => (
          <Chip key={chip.id} variant="neutral" size="md">{chip.label}</Chip>
        ))}
      </div>

      <div
        className={cie("wrap", open && "active", error && "error", readOnly && "readonly")}
        onClick={handleCellClick}
      >
        <div style={s.chipsWrap}>
          {!value.length && <span style={s.placeholder}>{placeholder}</span>}

          {displayedChips.map((chip) => (
            <Chip
              key={chip.id}
              variant="neutral"
              size="md"
            >
              {chip.label}
            </Chip>
          ))}

          {overflowCount > 0 && (
            <span ref={badgeRef} style={{ position: "relative", flexShrink: 0, alignSelf: "center" }}>
              <span onClick={handleBadgeClick} style={{ cursor: "pointer" }}>
                <Badge color={BADGE_COLORS.neutral} size="sm">+{overflowCount}</Badge>
              </span>
              {overflowOpen && (
                <>
                  <div style={s.popoverOverlay} onClick={(e) => { e.stopPropagation(); setOverflowOpen(false); }} />
                  <div style={{ ...s.popover, minWidth: 180 }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ padding: "var(--spacing-sm)", display: "flex", flexWrap: "wrap", gap: "var(--spacing-xs)" }}>
                      {hiddenChips.map((chip) => (
                        <Chip
                          key={chip.id}
                          variant="neutral"
                          size="md"
                        >
                          {chip.label}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </span>
          )}
        </div>

        {readOnly && (
          <span style={{ ...s.iconSlot, marginLeft: "auto", alignSelf: "center", flexShrink: 0 }}>
            <Icon name="LockClosedIcon" size={12} />
          </span>
        )}
      </div>

      {open && popPos && createPortal(
        <>
          <div style={s.popoverOverlay} onClick={() => setOpen(false)} />
          <div style={{ ...s.popover, position: "fixed", top: popPos.top, left: popPos.left, minWidth: popPos.width }} onClick={(e) => e.stopPropagation()}>
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
      {error && <div style={s.errorText}>{error}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────
// TEXT MULTIPLE CELL INLINE EDIT
// ─────────────────────────────────────────────

export function TextMultipleCellInlineEdit({
  value = [],
  onChange,
  placeholder = "Add text",
  iconLeading,
  readOnly = false,
  error,
}) {
  useEffect(() => { injectCellStyles(); }, []);

  const [listOpen, setListOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [editingSingle, setEditingSingle] = useState(false);
  const [editingListItemId, setEditingListItemId] = useState(null);
  const [draft, setDraft] = useState("");
  const [listItemDraft, setListItemDraft] = useState("");
  const [listPos, setListPos] = useState(null);
  const [addPos, setAddPos] = useState(null);
  const ref = useRef(null);
  const badgeRef = useRef(null);

  const hasValues = value.length > 0;
  const isSingle = value.length === 1;
  const firstItem = value[0];
  const overflowCount = value.length - 1;

  const commitAdd = () => {
    const trimmed = draft.trim();
    if (trimmed) onChange?.([...value, { id: `tm${Date.now()}`, label: trimmed }]);
    setDraft("");
    setAdding(false);
  };

  const commitEditSingle = () => {
    const trimmed = draft.trim();
    if (!trimmed) { onChange?.([]); } else { onChange?.([{ ...firstItem, label: trimmed }]); }
    setDraft("");
    setEditingSingle(false);
  };

  const handleRemove = (id) => onChange?.(value.filter((i) => i.id !== id));

  const openList = (e) => {
    e.stopPropagation();
    if (readOnly) return;
    const rect = ref.current?.getBoundingClientRect();
    if (rect) setListPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    setListOpen((o) => !o);
  };

  const openAdd = (e) => {
    e.stopPropagation();
    if (readOnly) return;
    const rect = ref.current?.getBoundingClientRect();
    if (rect) setAddPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    setAdding(true);
  };

  const openEditSingle = (e) => {
    if (readOnly) return;
    setDraft(firstItem.label);
    setEditingSingle(true);
  };

  // Empty state or single-value: inline editing inside the cell
  if ((!hasValues && adding) || (isSingle && editingSingle)) {
    const commit = editingSingle ? commitEditSingle : commitAdd;
    const cancel = editingSingle
      ? () => { setDraft(""); setEditingSingle(false); }
      : () => { setDraft(""); setAdding(false); };
    return (
      <div ref={ref} style={s.cell}>
        <div className={cie("active", error && "error")}>
          {iconLeading && <span style={s.iconSlot}>{iconLeading}</span>}
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") { e.preventDefault(); commit(); }
              if (e.key === "Escape") { e.preventDefault(); cancel(); }
            }}
            placeholder={placeholder}
            style={{
              ...s.input,
              border: "none",
              background: "transparent",
              height: "auto",
              flex: 1,
              padding: 0,
            }}
          />
        </div>
        {error && <div style={s.errorText}>{error}</div>}
      </div>
    );
  }

  return (
    <div ref={ref} style={s.cell}>
      <div
        className={cie(listOpen && "active", error && "error", readOnly && "readonly")}
        onClick={!hasValues && !readOnly ? openAdd : isSingle && !readOnly ? openEditSingle : undefined}
        style={{ pointerEvents: readOnly ? "none" : undefined }}
      >
        {iconLeading && <span style={s.iconSlot}>{iconLeading}</span>}
        {firstItem ? (
          <span style={s.value}>{firstItem.label}</span>
        ) : (
          <span style={s.placeholder}>{placeholder}</span>
        )}
        {overflowCount > 0 && (
          <span ref={badgeRef} style={{ flexShrink: 0, cursor: "pointer" }} onClick={openList}>
            <Badge color={BADGE_COLORS.neutral} size="sm">+{overflowCount}</Badge>
          </span>
        )}
        {hasValues && !readOnly && (
          <span style={{ flexShrink: 0, marginLeft: "auto" }} onClick={openAdd}>
            <Button variant="secondary" size="sm" iconLeading={<Icon name="PlusIcon" size={14} />} tabIndex={-1} style={{ aspectRatio: "1 / 1", padding: 0 }} />
          </span>
        )}
      </div>

      {/* List popover — click +N */}
      {listOpen && listPos && createPortal(
        <>
          <div style={s.popoverOverlay} onClick={() => { setListOpen(false); setEditingListItemId(null); }} />
          <div style={{ ...s.popover, position: "fixed", top: listPos.top, left: listPos.left, width: listPos.width }} onClick={(e) => e.stopPropagation()}>
            {value.map((item) => (
              <div
                key={item.id}
                style={{ display: "flex", alignItems: "center", gap: "var(--spacing-xs)", padding: editingListItemId === item.id ? "var(--spacing-xs) var(--spacing-sm)" : "var(--spacing-xs) var(--spacing-sm)" }}
              >
                {iconLeading && <span style={{ ...s.iconSlot, flexShrink: 0 }}>{iconLeading}</span>}
                {editingListItemId === item.id ? (
                  <input
                    autoFocus
                    value={listItemDraft}
                    onChange={(e) => setListItemDraft(e.target.value)}
                    onBlur={() => {
                      const trimmed = listItemDraft.trim();
                      if (!trimmed) { onChange?.(value.filter((i) => i.id !== item.id)); }
                      else { onChange?.(value.map((i) => i.id === item.id ? { ...i, label: trimmed } : i)); }
                      setEditingListItemId(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") { e.preventDefault(); e.target.blur(); }
                      if (e.key === "Escape") { e.preventDefault(); setEditingListItemId(null); }
                    }}
                    style={{ ...s.input, border: "none", background: "transparent", height: "auto", flex: 1, padding: 0 }}
                  />
                ) : (
                  <span
                    style={{ ...s.value, flex: 1, whiteSpace: "normal", cursor: readOnly ? "default" : "text" }}
                    onClick={() => { if (!readOnly) { setListItemDraft(item.label); setEditingListItemId(item.id); } }}
                  >
                    {item.label}
                  </span>
                )}
                {!readOnly && (
                  <span
                    style={{ ...s.iconSlot, flexShrink: 0, cursor: "pointer", opacity: 0.6 }}
                    onClick={() => { handleRemove(item.id); if (value.length <= 1) setListOpen(false); }}
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

      {/* Add input — appears below cell when has values */}
      {adding && addPos && createPortal(
        <>
          <div style={s.popoverOverlay} onClick={() => { commitAdd(); }} />
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
              padding: "var(--spacing-sm) var(--spacing-3)",
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-xs)",
              boxSizing: "border-box",
              boxShadow: "var(--shadow-medium-down)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {iconLeading && <span style={{ ...s.iconSlot, flexShrink: 0 }}>{iconLeading}</span>}
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") { e.preventDefault(); commitAdd(); }
                if (e.key === "Escape") { setDraft(""); setAdding(false); }
              }}
              placeholder={placeholder}
              style={{
                ...s.input,
                border: "none",
                background: "transparent",
                height: "auto",
                flex: 1,
                padding: 0,
              }}
            />
          </div>
        </>,
        document.body
      )}

      {error && <div style={s.errorText}>{error}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────
// NUMBER CELL INLINE EDIT
// ─────────────────────────────────────────────

const CURRENCY_CONFIG = {
  USD: { symbol: "$",   decimals: 2 },
  EUR: { symbol: "€",   decimals: 2 },
  GBP: { symbol: "£",   decimals: 2 },
  CHF: { symbol: "CHF", decimals: 2 },
  CAD: { symbol: "CA$", decimals: 2 },
  AUD: { symbol: "A$",  decimals: 2 },
  JPY: { symbol: "¥",   decimals: 0 },
  KRW: { symbol: "₩",   decimals: 0 },
  VND: { symbol: "₫",   decimals: 0 },
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
  error,
  readOnly = false,
}) {
  useEffect(() => { injectCellStyles(); }, []);

  const { symbol, decimals } = CURRENCY_CONFIG[currency] ?? { symbol: "$", decimals: 2 };
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value !== null ? String(value) : "");
  const [inputError, setInputError] = useState(null);

  useEffect(() => {
    if (!editing) setDraft(value !== null ? String(value) : "");
  }, [value, editing]);

  const numericPattern = decimals > 0 ? /^-?\d*\.?\d*$/ : /^-?\d*$/;

  const handleChange = (e) => {
    const raw = e.target.value;
    if (raw === "" || raw === "-" || numericPattern.test(raw)) {
      setDraft(raw);
      setInputError(null);
    } else {
      setInputError("Numbers only");
    }
  };

  const commit = () => {
    if (inputError) { discard(); return; }
    if (draft === "" || draft === "-") {
      onChange?.(null);
    } else {
      const num = parseFloat(draft);
      if (isNaN(num)) { discard(); return; }
      onChange?.(parseFloat(num.toFixed(decimals)));
    }
    setEditing(false);
  };

  const discard = () => {
    setDraft(value !== null ? String(value) : "");
    setInputError(null);
    setEditing(false);
  };

  const displayError = error || inputError;
  const hasValue = value !== null && value !== undefined && value !== "";

  if (editing && !readOnly) {
    return (
      <div style={s.cell}>
        <div
          className={cie("active", displayError && "error")}
          style={{ position: "relative" }}
        >
          <span style={{ ...s.iconSlot, flexShrink: 0, paddingRight: 4, color: "var(--color-content-secondary)", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)" }}>
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
              if (e.key === "Enter") { e.preventDefault(); commit(); }
              if (e.key === "Escape") discard();
            }}
            style={{
              ...s.input,
              border: "none",
              borderRadius: 0,
              background: "transparent",
              height: "auto",
              flex: 1,
              width: "100%",
              padding: 0,
            }}
          />
        </div>
        {displayError && <div style={s.errorText}>{typeof displayError === "string" ? displayError : inputError}</div>}
      </div>
    );
  }

  return (
    <div style={s.cell}>
      <div
        className={cie(displayError && "error", readOnly && "readonly")}
        onClick={() => { if (!readOnly) { setDraft(value !== null ? String(value) : ""); setInputError(null); setEditing(true); } }}
      >
        <span style={{ ...s.iconSlot, flexShrink: 0, paddingRight: 4, color: "var(--color-content-secondary)", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)" }}>
          {symbol}
        </span>
        {hasValue ? (
          <span style={s.value}>{formatNumber(value, decimals)}</span>
        ) : (
          <span style={s.placeholder}>{placeholder}</span>
        )}
        {readOnly && (
          <span style={{ ...s.iconSlot, marginLeft: "auto" }}>
            <Icon name="LockClosedIcon" size={12} />
          </span>
        )}
      </div>
      {displayError && typeof displayError === "string" && <div style={s.errorText}>{displayError}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────
// LONG TEXT CELL INLINE EDIT
// ─────────────────────────────────────────────

export function LongTextCellInlineEdit({
  value = "",
  onChange,
  placeholder = "Add text",
  error,
  readOnly = false,
}) {
  useEffect(() => { injectCellStyles(); }, []);

  const cellRef = useRef(null);
  const valueRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [cellRect, setCellRect] = useState(null);
  const { showTooltip, hideTooltip, tooltipPortal } = useTruncationTooltip(valueRef, value);

  const discard = () => { setDraft(value); setEditing(false); };
  const commit = () => {
    if (draft.length > 500) { discard(); return; }
    onChange?.(draft); setEditing(false);
  };

  useEffect(() => { if (!editing) setDraft(value); }, [value, editing]);

  const startEdit = () => {
    if (readOnly || !cellRef.current) return;
    setCellRect(cellRef.current.getBoundingClientRect());
    setDraft(value);
    setEditing(true);
  };

  const autoResize = (el) => {
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <div ref={cellRef} style={s.cell}>
      <div
        className={cie(editing && "active", (error || value.length > 500) && "error", readOnly && "readonly")}
        style={{ alignItems: "flex-start" }}
        onClick={startEdit}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {value ? (
          <span ref={valueRef} style={{ ...s.longValue, color: error ? "var(--color-content-negative)" : "var(--color-content-primary)" }}>
            {value}
          </span>
        ) : (
          <span style={s.placeholder}>{placeholder}</span>
        )}
        {readOnly && (
          <span style={{ ...s.iconSlot, marginLeft: "auto", alignSelf: "flex-start", paddingTop: 2 }}>
            <Icon name="LockClosedIcon" size={12} />
          </span>
        )}
      </div>
      {tooltipPortal}
      {(error || value.length > 500) && <div style={s.errorText}>{error ?? `${value.length}/500 characters`}</div>}

      {editing && cellRect && createPortal(
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
              border: "1px solid var(--color-interaction-outline-active)",
              borderRadius: "var(--radius-sm)",
              boxShadow: "var(--shadow-dark-down)",
              display: "flex",
              flexDirection: "column",
              boxSizing: "border-box",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <textarea
              ref={(el) => { if (el) autoResize(el); }}
              autoFocus
              value={draft}
              onChange={(e) => { setDraft(e.target.value); autoResize(e.target); }}
              onKeyDown={(e) => {
                if (e.key === "Escape") { e.preventDefault(); discard(); }
                if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); commit(); }
              }}
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                resize: "none",
                overflow: "hidden",
                padding: "var(--spacing-sm) var(--spacing-3)",
                fontFamily: "var(--font-family-primary)",
                fontSize: "var(--text-body-md)",
                lineHeight: "var(--line-height-body-md)",
                color: "var(--color-content-primary)",
                background: "transparent",
                boxSizing: "border-box",
                minHeight: cellRect.height,
              }}
            />
            {draft.length > 500 && (
              <div style={{ ...s.errorText, padding: "0 var(--spacing-3) var(--spacing-xs)", marginTop: 0 }}>
                {draft.length}/500 characters
              </div>
            )}
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
