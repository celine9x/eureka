"use client";

/**
 * TableInlineEdit Component (Organism)
 *
 * A config-driven table built from the inline-edit cell primitives
 * (TextCellInlineEdit, ChipCellInlineEdit, LinkCellInlineEdit) plus a
 * couple of small read/edit cells (status, owner, two-level) commonly
 * needed on hub/list pages.
 *
 * Pass `columns` describing each cell's `type`, and `rows` of data keyed
 * by each column's `key`. Edits are reported via `onRowChange(id, patch)`.
 */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Avatar } from "../../atoms/avatar.jsx";
import { Button } from "../../atoms/button.jsx";
import { Icon } from "../../atoms/icon.jsx";
import {
  DropdownList,
  DropdownSection,
  DropdownListItem,
} from "../../molecules/dropdown-list.jsx";
import {
  TextCellInlineEdit,
  ChipCellInlineEdit,
  LinkCellInlineEdit,
  LongTextCellInlineEdit,
  cie,
  injectCellStyles,
} from "./table-cell-inline-edit.jsx";

export const TABLE_INLINE_EDIT_CELL_TYPES = {
  text: "text",
  longText: "longText",
  link: "link",
  chip: "chip",
  status: "status",
  owner: "owner",
  twoLevel: "twoLevel",
};

// ─────────────────────────────────────────────
// ROW/CELL CHROME (flex-based — table-cell display can't do `gap`)
// ─────────────────────────────────────────────

let _rowStylesInjected = false;

function injectRowStyles() {
  if (_rowStylesInjected || typeof document === "undefined") return;
  _rowStylesInjected = true;
  const el = document.createElement("style");
  el.setAttribute("data-eureka", "table-inline-edit-row");
  el.textContent = `
    .table-scroll-container {
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
    }
    .table-body-wrapper {
      border: 1px solid var(--color-outline-neutral);
      border-radius: 8px;
      overflow: hidden;
      background: var(--color-general-white);
      box-sizing: border-box;
    }
    .tie-row {
      display: flex;
      align-items: stretch;
      gap: var(--spacing-xs);
      padding-left: var(--spacing-xs);
      box-sizing: border-box;
    }
    .tie-row--body {
      cursor: pointer;
      padding-top: var(--spacing-xs);
      padding-bottom: var(--spacing-xs);
      transition: background 150ms ease;
    }
    .tie-row--body:nth-child(odd) {
      background: var(--color-general-neutral-lighter);
    }
    .tie-row--body:nth-child(even) {
      background: var(--color-general-white);
    }
    .tie-row--body:not(:last-child) {
      border-bottom: 1px solid var(--color-action-outline-secondary-enabled);
    }
    .tie-row--body:hover {
      background: var(--color-general-neutral-light);
    }
    .tie-cell {
      flex-shrink: 0;
      min-width: 0;
      display: flex;
      align-items: center;
    }
    .tie-header-cell {
      flex-shrink: 0;
      min-width: 0;
      font-family: var(--font-family-primary);
      font-size: var(--text-body-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--color-content-secondary);
      white-space: nowrap;
      padding: var(--spacing-sm) 0;
      box-sizing: border-box;
    }
    .tie-open-btn {
      opacity: 0;
      flex-shrink: 0;
      transition: opacity 120ms ease;
    }
    .eureka-cie:hover .tie-open-btn {
      opacity: 1;
    }
    .eureka-cie.eureka-cie--active .tie-open-btn {
      opacity: 0;
    }
  `;
  document.head.appendChild(el);
}

const s = {
  popoverOverlay: { position: "fixed", inset: 0, zIndex: 100 },
  popover: {
    position: "fixed",
    zIndex: 101,
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--color-action-outline-secondary-enabled)",
    boxShadow: "var(--shadow-medium-down)",
    minWidth: 200,
  },
  cell: { position: "relative", width: "100%" },
  ownerName: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    color: "var(--color-content-primary)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  placeholder: {
    color: "var(--color-content-tertiary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
  },
  twoLevel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 0,
    width: "100%",
  },
  twoLevelPrimary: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    color: "var(--color-content-primary)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  twoLevelSecondary: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-sm)",
    color: "var(--color-content-secondary)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};

/** Status pill cell — a library Button (md) that opens a popover picker. The Button is the real interactive element, so it owns its own hover/active states rather than a wrapping cie box. */
function StatusCellInlineEdit({ value, onChange, options = [], readOnly = false }) {
  const [open, setOpen] = useState(false);
  const [popPos, setPopPos] = useState(null);
  const ref = useRef(null);

  return (
    <div ref={ref} style={{ ...s.cell, justifyContent: "center" }}>
      <Button
        variant={value?.variant ?? "secondary"}
        size="md"
        iconTrailing={!readOnly ? <Icon name="ChevronDown" size="sm" /> : undefined}
        isDisabled={readOnly}
        style={{ flexShrink: 0, alignSelf: "flex-start" }}
        onClick={() => {
          if (!open) {
            const rect = ref.current?.getBoundingClientRect();
            if (rect) setPopPos({ top: rect.bottom + 4, left: rect.left });
          }
          setOpen((o) => !o);
        }}
      >
        {value?.label ?? "Select"}
      </Button>

      {open && popPos && createPortal(
        <>
          <div style={s.popoverOverlay} onClick={() => setOpen(false)} />
          <div style={{ ...s.popover, top: popPos.top, left: popPos.left }} onClick={(e) => e.stopPropagation()}>
            <DropdownList>
              <DropdownSection>
                {options.map((opt) => (
                  <DropdownListItem
                    key={opt.id}
                    checked={value?.id === opt.id}
                    noCheckbox
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
    </div>
  );
}

/** Avatar + name cell (e.g. Owner) — click opens a popover picker. Shares the same hover/active box as Text/Link/Chip cells. */
function OwnerCellInlineEdit({ value, onChange, options = [], readOnly = false }) {
  useEffect(() => { injectCellStyles(); }, []);

  const [open, setOpen] = useState(false);
  const [popPos, setPopPos] = useState(null);
  const ref = useRef(null);

  return (
    <div ref={ref} style={s.cell}>
      <div
        className={cie(open && "active", readOnly && "readonly")}
        onClick={() => {
          if (readOnly) return;
          if (!open) {
            const rect = ref.current?.getBoundingClientRect();
            if (rect) setPopPos({ top: rect.bottom + 4, left: rect.left });
          }
          setOpen((o) => !o);
        }}
      >
        {value ? (
          <>
            <Avatar size="xs" initials={value.initials} />
            <span style={s.ownerName}>{value.name}</span>
          </>
        ) : (
          <span style={s.placeholder}>Add owner</span>
        )}
      </div>

      {open && popPos && createPortal(
        <>
          <div style={s.popoverOverlay} onClick={() => setOpen(false)} />
          <div style={{ ...s.popover, top: popPos.top, left: popPos.left }} onClick={(e) => e.stopPropagation()}>
            <DropdownList>
              <DropdownSection>
                {options.map((opt) => (
                  <DropdownListItem
                    key={opt.id}
                    checked={value?.id === opt.id}
                    noCheckbox
                    icon={<Avatar size="xs" initials={opt.initials} />}
                    onClick={() => { onChange?.(opt); setOpen(false); }}
                  >
                    {opt.name}
                  </DropdownListItem>
                ))}
              </DropdownSection>
            </DropdownList>
          </div>
        </>,
        document.body
      )}
    </div>
  );
}

function renderCell(column, row, onRowChange, onOpenRow) {
  const value = row[column.key];
  const setValue = (v) => onRowChange(row.id, { [column.key]: v });

  switch (column.type) {
    case TABLE_INLINE_EDIT_CELL_TYPES.text: {
      const openButton = column.openable ? (
        <span className="tie-open-btn">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => { e.stopPropagation(); onOpenRow?.(row); }}
          >
            Open
          </Button>
        </span>
      ) : undefined;

      return (
        <TextCellInlineEdit
          value={value ?? ""}
          onChange={setValue}
          placeholder={column.placeholder ?? "Add text"}
          iconLeading={column.icon}
          iconTrailing={openButton}
        />
      );
    }

    case TABLE_INLINE_EDIT_CELL_TYPES.longText:
      return (
        <LongTextCellInlineEdit
          value={value ?? ""}
          onChange={setValue}
          placeholder={column.placeholder ?? "Add description"}
        />
      );

    case TABLE_INLINE_EDIT_CELL_TYPES.link:
      return (
        <LinkCellInlineEdit
          value={value ?? (column.multiple ? [] : null)}
          onChange={setValue}
          options={column.options ?? []}
          multiple={column.multiple}
          placeholder={column.placeholder ?? "Add link"}
          iconLeading={column.icon}
          hideIconWhenEmpty={column.hideIconWhenEmpty}
        />
      );

    case TABLE_INLINE_EDIT_CELL_TYPES.chip:
      return (
        <ChipCellInlineEdit
          value={value ?? []}
          onChange={setValue}
          options={column.options ?? []}
          placeholder={column.placeholder ?? "Add tags"}
        />
      );

    case TABLE_INLINE_EDIT_CELL_TYPES.status:
      return (
        <StatusCellInlineEdit
          value={value ?? null}
          onChange={setValue}
          options={column.options ?? []}
        />
      );

    case TABLE_INLINE_EDIT_CELL_TYPES.owner:
      return (
        <OwnerCellInlineEdit
          value={value ?? null}
          onChange={setValue}
          options={column.options ?? []}
        />
      );

    case TABLE_INLINE_EDIT_CELL_TYPES.twoLevel:
      return (
        <div style={s.twoLevel}>
          <span style={s.twoLevelPrimary}>{value?.primary}</span>
          {value?.secondary && <span style={s.twoLevelSecondary}>{value.secondary}</span>}
        </div>
      );

    default:
      return value ?? null;
  }
}

/**
 * TableInlineEdit
 *
 * @example
 * <TableInlineEdit
 *   columns={[
 *     { key: "title", header: "Title", width: 220, type: "text" },
 *     { key: "status", header: "Status", width: 160, type: "status", options: STATUS_OPTIONS },
 *   ]}
 *   rows={rows}
 *   onRowChange={(id, patch) => updateRow(id, patch)}
 *   trailingColumn={{ width: 48, render: (row) => <RowMenu row={row} /> }}
 * />
 */
export function TableInlineEdit({ columns = [], rows = [], onRowChange, trailingColumn, onOpenRow }) {
  injectRowStyles();

  return (
    <div className="table-wrapper" style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xxs)" }}>
      {/* Single scroll container — header and body scroll together, one scrollbar at the bottom. */}
      <div className="table-scroll-container">
        <div style={{ width: "max-content", minWidth: "100%" }}>
          {/* Header sits directly on the page — no card background behind it. */}
          <div className="table-header-wrapper" style={{ marginBottom: 0 }}>
            <div className="tie-row">
              {columns.map((column) => (
                <div
                  key={column.key}
                  className="tie-header-cell"
                  style={{ width: column.width, fontWeight: column.headerBold === false ? "var(--font-weight-regular)" : undefined }}
                >
                  {column.header}
                </div>
              ))}
              {trailingColumn && <div className="tie-header-cell" style={{ width: trailingColumn.width ?? 48 }} />}
            </div>
          </div>

          {/* Only the data rows get the white, outlined, rounded card treatment. */}
          <div className="table-body-wrapper">
            {rows.map((row, index) => (
              <div
                key={row.id}
                className="tie-row tie-row--body"
                onClick={() => onOpenRow?.(row)}
              >
                {columns.map((column) => (
                  <div key={column.key} className="tie-cell" style={{ width: column.width }} onClick={(e) => e.stopPropagation()}>
                    {renderCell(column, row, onRowChange, onOpenRow)}
                  </div>
                ))}
                {trailingColumn && (
                  <div className="tie-cell" style={{ width: trailingColumn.width ?? 48 }} onClick={(e) => e.stopPropagation()}>
                    {trailingColumn.render(row)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

TableInlineEdit.displayName = "TableInlineEdit";

export default TableInlineEdit;
