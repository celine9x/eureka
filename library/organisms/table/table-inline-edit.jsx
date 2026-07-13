"use client";

/**
 * TableInlineEdit Component (Organism)
 *
 * A config-driven table built from inline-edit cell primitives.
 * Pass `columns` describing each cell's `type`, and `rows` of data keyed
 * by each column's `key`. Edits are reported via `onRowChange(id, patch)`.
 */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Avatar } from "../../atoms/avatar.jsx";
import { Button } from "../../atoms/button.jsx";
import { Checkbox } from "../../atoms/checkbox.jsx";
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

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

export const TABLE_INLINE_EDIT_CELL_TYPES = {
  text: "text",
  longText: "longText",
  link: "link",
  chip: "chip",
  status: "status",
  owner: "owner",
  twoLevel: "twoLevel",
};

// ─────────────────────────────────────────────────────────────────────────────
// CSS Injection
// ─────────────────────────────────────────────────────────────────────────────

let _rowStylesInjected = false;

function injectRowStyles() {
  if (typeof document === "undefined") return;
  const existing = document.querySelector('style[data-eureka="table-inline-edit-row"]');
  if (existing) existing.remove();

  const style = document.createElement("style");
  style.setAttribute("data-eureka", "table-inline-edit-row");
  style.textContent = `
    /* Scroll container */
    .tie-scroll-container {
      width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
    }

    /* Body wrapper with border */
    .tie-body-wrapper {
      border: 1px solid var(--color-outline-neutral);
      border-radius: 8px;
      overflow: hidden;
      background: var(--color-general-white);
      box-sizing: border-box;
    }

    /* Row base */
    .tie-row {
      display: flex;
      align-items: stretch;
      gap: var(--spacing-xs);
      padding-left: var(--spacing-xs);
      box-sizing: border-box;
    }

    /* Body row */
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

    /* Cell base */
    .tie-cell {
      flex-shrink: 0;
      min-width: 0;
      display: flex;
      align-items: center;
    }

    /* Header cell */
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

    /* Open button (shows on hover) */
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

    /* Cell container */
    .tie-cell-container {
      position: relative;
      width: 100%;
    }

    /* Owner name */
    .tie-owner-name {
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      color: var(--color-content-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Placeholder */
    .tie-placeholder {
      color: var(--color-content-tertiary);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
    }

    /* Two-level cell */
    .tie-two-level {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 0;
      width: 100%;
    }

    .tie-two-level-primary {
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      color: var(--color-content-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tie-two-level-secondary {
      font-family: var(--font-family-primary);
      font-size: var(--text-body-sm);
      color: var(--color-content-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Popover */
    .tie-overlay {
      position: fixed;
      inset: 0;
      z-index: 100;
    }

    .tie-popover {
      position: fixed;
      z-index: 101;
      border: none;
      background: none;
      box-shadow: none;
      min-width: 200px;
    }
  `;
  document.head.appendChild(style);
}

// ─────────────────────────────────────────────────────────────────────────────
// StatusCellInlineEdit
// ─────────────────────────────────────────────────────────────────────────────

function StatusCellInlineEdit({ value, onChange, options = [], readOnly = false }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [popPos, setPopPos] = useState(null);

  const handleClick = () => {
    if (!open) {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        setPopPos({ top: rect.bottom + 4, left: rect.left });
      }
    }
    setOpen((prev) => !prev);
  };

  const handleSelect = (opt) => {
    onChange?.(opt);
    setOpen(false);
  };

  return (
    <div ref={ref} className="tie-cell-container" style={{ justifyContent: "center" }}>
      <Button
        variant={value?.variant ?? "secondary"}
        size="md"
        iconTrailing={!readOnly ? <Icon name="ChevronDown" size="sm" /> : undefined}
        isDisabled={readOnly}
        style={{ flexShrink: 0, alignSelf: "flex-start" }}
        onClick={handleClick}
      >
        {value?.label ?? "Select"}
      </Button>

      {open &&
        popPos &&
        createPortal(
          <>
            <div className="tie-overlay" onClick={() => setOpen(false)} />
            <div
              className="tie-popover"
              style={{ top: popPos.top, left: popPos.left }}
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownList>
                <DropdownSection>
                  {options.map((opt) => (
                    <DropdownListItem
                      key={opt.id}
                      checked={value?.id === opt.id}
                      noCheckbox
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
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OwnerCellInlineEdit
// ─────────────────────────────────────────────────────────────────────────────

function OwnerCellInlineEdit({ value, onChange, options = [], readOnly = false }) {
  useEffect(() => injectCellStyles(), []);

  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [popPos, setPopPos] = useState(null);

  const handleClick = () => {
    if (readOnly) return;
    if (!open) {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        setPopPos({ top: rect.bottom + 4, left: rect.left });
      }
    }
    setOpen((prev) => !prev);
  };

  const handleSelect = (opt) => {
    onChange?.(opt);
    setOpen(false);
  };

  return (
    <div ref={ref} className="tie-cell-container">
      <div
        className={cie(open && "active", readOnly && "readonly")}
        onClick={handleClick}
      >
        {value ? (
          <>
            <Avatar size="xs" initials={value.initials} />
            <span className="tie-owner-name">{value.name}</span>
          </>
        ) : (
          <span className="tie-placeholder">Add owner</span>
        )}
      </div>

      {open &&
        popPos &&
        createPortal(
          <>
            <div className="tie-overlay" onClick={() => setOpen(false)} />
            <div
              className="tie-popover"
              style={{ top: popPos.top, left: popPos.left }}
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownList>
                <DropdownSection>
                  {options.map((opt) => (
                    <DropdownListItem
                      key={opt.id}
                      checked={value?.id === opt.id}
                      noCheckbox
                      icon={<Avatar size="xs" initials={opt.initials} />}
                      onClick={() => handleSelect(opt)}
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

// ─────────────────────────────────────────────────────────────────────────────
// Cell Renderer
// ─────────────────────────────────────────────────────────────────────────────

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
            onClick={(e) => {
              e.stopPropagation();
              onOpenRow?.(row);
            }}
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
        <div className="tie-two-level">
          <span className="tie-two-level-primary">{value?.primary}</span>
          {value?.secondary && (
            <span className="tie-two-level-secondary">{value.secondary}</span>
          )}
        </div>
      );

    default:
      return value ?? null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TableInlineEdit
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @example
 * <TableInlineEdit
 *   columns={[
 *     { key: "title", header: "Title", width: 220, type: "text" },
 *     { key: "status", header: "Status", width: 160, type: "status", options: STATUS_OPTIONS },
 *   ]}
 *   rows={rows}
 *   onRowChange={(id, patch) => updateRow(id, patch)}
 *   trailingColumn={{ width: 48, render: (row) => <RowMenu row={row} /> }}
 *   selectable
 *   selectedRows={selectedIds}
 *   onSelectionChange={setSelectedIds}
 * />
 */
export function TableInlineEdit({
  columns = [],
  rows = [],
  onRowChange,
  trailingColumn,
  onOpenRow,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
}) {
  injectRowStyles();

  const allSelected = rows.length > 0 && selectedRows.length === rows.length;
  const someSelected = selectedRows.length > 0 && selectedRows.length < rows.length;

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectionChange?.([]);
    } else {
      onSelectionChange?.(rows.map((r) => r.id));
    }
  };

  const handleSelectRow = (rowId) => {
    if (selectedRows.includes(rowId)) {
      onSelectionChange?.(selectedRows.filter((id) => id !== rowId));
    } else {
      onSelectionChange?.([...selectedRows, rowId]);
    }
  };

  return (
    <div
      className="tie-wrapper"
      style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xxs)" }}
    >
      <div className="tie-scroll-container">
        <div style={{ width: "max-content", minWidth: "100%" }}>
          {/* Header */}
          <div className="tie-header-wrapper" style={{ marginBottom: 0 }}>
            <div className="tie-row">
              {selectable && (
                <div
                  className="tie-header-cell"
                  style={{ width: 48, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <Checkbox
                    size="sm"
                    isSelected={allSelected}
                    isIndeterminate={someSelected}
                    onChange={handleSelectAll}
                  />
                </div>
              )}

              {columns.map((column) => (
                <div
                  key={column.key}
                  className="tie-header-cell"
                  style={{
                    width: column.width,
                    fontWeight:
                      column.headerBold === false
                        ? "var(--font-weight-regular)"
                        : undefined,
                  }}
                >
                  {column.header}
                </div>
              ))}

              {trailingColumn && (
                <div
                  className="tie-header-cell"
                  style={{ width: trailingColumn.width ?? 48 }}
                />
              )}
            </div>
          </div>

          {/* Body */}
          <div className="tie-body-wrapper">
            {rows.map((row) => (
              <div
                key={row.id}
                className="tie-row tie-row--body"
                onClick={() => onOpenRow?.(row)}
              >
                {selectable && (
                  <div
                    className="tie-cell"
                    style={{ width: 48, display: "flex", alignItems: "center", justifyContent: "center" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      size="sm"
                      isSelected={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </div>
                )}

                {columns.map((column) => (
                  <div
                    key={column.key}
                    className="tie-cell"
                    style={{ width: column.width }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {renderCell(column, row, onRowChange, onOpenRow)}
                  </div>
                ))}

                {trailingColumn && (
                  <div
                    className="tie-cell"
                    style={{ width: trailingColumn.width ?? 48 }}
                    onClick={(e) => e.stopPropagation()}
                  >
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
