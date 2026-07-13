"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableCellHeader,
  TableCard,
} from "../../library/organisms/table/table.jsx";
import { Button } from "../../library/atoms/button.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { Chip, CHIP_VARIANTS } from "../../library/atoms/chip.jsx";
import { Badge, BADGE_COLORS } from "../../library/atoms/badge.jsx";
import { Avatar } from "../../library/atoms/avatar.jsx";
import { TextInput } from "../../library/molecules/text-input.jsx";
import { Textarea } from "../../library/molecules/textarea.jsx";
import { DatePicker } from "../../library/molecules/datepicker.jsx";
import {
  DropdownList,
  DropdownSection,
  DropdownListItem,
} from "../../library/molecules/dropdown-list.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const MAX_LONG_TEXT = 1000;

const STATUS_OPTIONS = [
  { id: "active", label: "Active", color: BADGE_COLORS.positive },
  { id: "pending", label: "Pending", color: BADGE_COLORS.warning },
  { id: "review", label: "In review", color: BADGE_COLORS.informative },
  { id: "closed", label: "Closed", color: BADGE_COLORS.neutral },
];

const CHIP_OPTIONS = [
  { id: "research", label: "Research collaboration", variant: CHIP_VARIANTS.primary },
  { id: "licensing", label: "Licensing", variant: CHIP_VARIANTS.cyan },
  { id: "partnership", label: "Partnership", variant: CHIP_VARIANTS.pink },
  { id: "supply", label: "Supply chain", variant: CHIP_VARIANTS.brown },
  { id: "joint", label: "Joint venture", variant: CHIP_VARIANTS.warning },
];

const MILESTONE_OPTIONS = [
  { id: "m1", name: "Q1 kick-off", icon: "FlagIcon" },
  { id: "m2", name: "Phase 2 review", icon: "FlagIcon" },
  { id: "m3", name: "Final sign-off", icon: "FlagIcon" },
];

const ASSIGNEE_OPTIONS = [
  { id: "jd", name: "John Doe", initials: "JD" },
  { id: "aj", name: "Alice Johnson", initials: "AJ" },
  { id: "mb", name: "Marc Bernard", initials: "MB" },
];

// ─────────────────────────────────────────────
// SEED DATA
// ─────────────────────────────────────────────

const INITIAL_ROWS = [
  {
    id: "r1",
    title: "",
    longText: "",
    chips: [],
    status: null,
    date: null,
    obligationName: "Obligation name",
    milestone: MILESTONE_OPTIONS[0],
    link: "Link",
    shortTitle: "",
    assignee: null,
  },
  {
    id: "r2",
    title: "",
    longText: "",
    chips: [],
    status: null,
    date: null,
    obligationName: "Obligation name",
    milestone: MILESTONE_OPTIONS[0],
    link: "Link",
    shortTitle: "",
    assignee: null,
  },
  {
    id: "r3",
    title: "This is a title that have 150 characters, crafted careful",
    longText: "This is a title that has exactly one hundred and fifty characters, crafted carefully to meet the length requirement perfectly without any extra or missing characters.",
    chips: [CHIP_OPTIONS[0], CHIP_OPTIONS[1], CHIP_OPTIONS[2]],
    status: STATUS_OPTIONS[0],
    date: new Date(2025, 3, 12),
    obligationName: "Obligation name",
    milestone: MILESTONE_OPTIONS[0],
    link: "Link",
    shortTitle: "Placeholder",
    assignee: ASSIGNEE_OPTIONS[0],
  },
  {
    id: "r4",
    title: "This is a title that have 150 characters, crafted careful",
    longText: "This is a title that has exactly one hundred and fifty characters, crafted carefully to meet the length requirement perfectly without any extra or missing characters.",
    chips: [CHIP_OPTIONS[0], CHIP_OPTIONS[1], CHIP_OPTIONS[2], CHIP_OPTIONS[3]],
    status: STATUS_OPTIONS[0],
    date: new Date(2025, 5, 30),
    obligationName: "Obligation name",
    milestone: MILESTONE_OPTIONS[1],
    link: "Link",
    shortTitle: "Placeholder",
    assignee: ASSIGNEE_OPTIONS[1],
  },
  {
    id: "r5",
    title: "This is a title that has exactly one hundred and fifty characters, crafted carefully to meet the length requirement perfectly without any extra or missing characters",
    longText: "This is a title that has exactly one hundred and fifty characters, crafted carefully to meet the length requirement perfectly without any extra or missing characters. This is a title that has exactly one hundred and fifty characters, crafted carefully to meet the length requirement perfectly without any extra or missing characters.",
    chips: [CHIP_OPTIONS[0], CHIP_OPTIONS[1], CHIP_OPTIONS[2], CHIP_OPTIONS[3]],
    status: STATUS_OPTIONS[1],
    date: null,
    obligationName: "Obligation name",
    milestone: MILESTONE_OPTIONS[2],
    link: "Link",
    shortTitle: "This is a title that have 150 characters, crafted careful",
    assignee: ASSIGNEE_OPTIONS[2],
  },
  {
    id: "r6",
    title: "This is a title that has exactly one hundred and fifty characters, crafted carefully to meet the length requirement perfectly without any extra or missing characters",
    longText: "A".repeat(1050),
    chips: [CHIP_OPTIONS[0], CHIP_OPTIONS[1], CHIP_OPTIONS[2]],
    status: STATUS_OPTIONS[2],
    date: new Date(2025, 11, 1),
    obligationName: "Obligation name",
    milestone: MILESTONE_OPTIONS[0],
    link: "Link",
    shortTitle: "This is a title that have 150 characters, crafted careful",
    assignee: ASSIGNEE_OPTIONS[0],
  },
];

// ─────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────

const fmtDate = (d) =>
  d
    ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const s = {
  page: {
    minHeight: "100vh",
    background: "var(--color-general-background)",
    padding: "var(--spacing-8)",
    fontFamily: "var(--font-family-primary)",
  },
  placeholder: {
    color: "var(--color-content-tertiary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
  },
  textValue: {
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "block",
  },
  textValueOverflow: {
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  errorText: {
    color: "var(--color-content-negative)",
    fontSize: "var(--text-body-sm)",
    fontFamily: "var(--font-family-primary)",
    marginTop: 2,
  },
  cellHoverArea: {
    width: "100%",
    cursor: "text",
    minHeight: 24,
    display: "flex",
    alignItems: "center",
  },
  twoLevelPrimary: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    color: "var(--color-content-brand)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "block",
  },
  twoLevelSecondary: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-sm)",
    color: "var(--color-content-secondary)",
    display: "flex",
    alignItems: "center",
    gap: 4,
    marginTop: 1,
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
    minWidth: 220,
  },
  chipsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--spacing-xs)",
    alignItems: "center",
  },
  assigneeRow: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
  },
  assigneeName: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    color: "var(--color-content-primary)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};

// ─────────────────────────────────────────────
// CELL EDITORS
// ─────────────────────────────────────────────

/** Inline text edit — single line */
function TitleCell({ value, onChange, placeholder = "Placeholder" }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  const commit = useCallback(() => {
    onChange(draft);
    setEditing(false);
  }, [draft, onChange]);

  const discard = useCallback(() => {
    setDraft(value);
    setEditing(false);
  }, [value]);

  if (editing) {
    return (
      <div style={{ width: "100%" }} onClick={(e) => e.stopPropagation()}>
        <TextInput
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={placeholder}
          size="sm"
          autoFocus
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") { e.preventDefault(); commit(); }
            if (e.key === "Escape") discard();
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={s.cellHoverArea}
      onClick={() => { setDraft(value); setEditing(true); }}
    >
      {value ? (
        <span style={s.textValue}>{value}</span>
      ) : (
        <span style={s.placeholder}><Icon name="DocumentTextIcon" size={14} style={{ marginRight: 4 }} /> {placeholder}</span>
      )}
    </div>
  );
}

/** Long text inline edit with 1000 char limit */
function LongTextCell({ value, onChange, placeholder = "Placeholder" }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const isError = value.length > MAX_LONG_TEXT;

  const commit = useCallback((val) => {
    onChange(val);
    setEditing(false);
  }, [onChange]);

  const discard = useCallback(() => {
    setDraft(value);
    setEditing(false);
  }, [value]);

  if (editing) {
    const draftError = draft.length > MAX_LONG_TEXT;
    return (
      <div style={{ width: "100%" }} onClick={(e) => e.stopPropagation()}>
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder=""
          autoFocus
          onBlur={() => commit(draft)}
          onKeyDown={(e) => {
            if (e.key === "Escape") discard();
          }}
          status={draftError ? "error" : undefined}
          statusMessage={draftError ? `Title exceeds ${MAX_LONG_TEXT} characters.` : undefined}
        />
      </div>
    );
  }

  return (
    <div
      style={{ cursor: "text", width: "100%" }}
      onClick={() => { setDraft(value); setEditing(true); }}
    >
      {value ? (
        <>
          <span style={s.textValueOverflow}>{value}</span>
          {isError && (
            <span style={s.errorText}>
              <Icon name="ExclamationCircleIcon" size={12} style={{ marginRight: 2 }} />
              Title exceeds {MAX_LONG_TEXT} characters.
            </span>
          )}
        </>
      ) : (
        <span style={s.placeholder}>{placeholder}</span>
      )}
    </div>
  );
}

/** Chip multi-select with popover */
function ChipCell({ value = [], onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const toggle = (option) => {
    const exists = value.find((c) => c.id === option.id);
    if (exists) {
      onChange(value.filter((c) => c.id !== option.id));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div ref={ref} style={{ position: "relative", width: "100%" }}>
      <div
        style={{ ...s.chipsWrap, cursor: "pointer", minHeight: 24 }}
        onClick={() => setOpen((o) => !o)}
      >
        {value.length === 0 && <span style={s.placeholder}>Add tags</span>}
        {value.map((chip) => (
          <Chip
            key={chip.id}
            variant={chip.variant}
            size="sm"
            removable
            onRemove={(e) => { e?.stopPropagation(); onChange(value.filter((c) => c.id !== chip.id)); }}
          >
            {chip.label}
          </Chip>
        ))}
      </div>
      {open && (
        <>
          <div style={s.popoverOverlay} onClick={() => setOpen(false)} />
          <div style={s.popover} onClick={(e) => e.stopPropagation()}>
            <DropdownList>
              <DropdownSection>
                {CHIP_OPTIONS.map((opt) => (
                  <DropdownListItem
                    key={opt.id}
                    isSelected={!!value.find((c) => c.id === opt.id)}
                    onClick={() => toggle(opt)}
                  >
                    {opt.label}
                  </DropdownListItem>
                ))}
              </DropdownSection>
            </DropdownList>
          </div>
        </>
      )}
    </div>
  );
}

/** Status + Date cell */
function StatusDateCell({ status, date, onStatusChange, onDateChange }) {
  const [statusOpen, setStatusOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [draftDate, setDraftDate] = useState(date);
  const ref = useRef(null);

  const handleDateSave = () => {
    onDateChange(draftDate);
    setDateOpen(false);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-2)", width: "100%" }}>
      {/* Status badge */}
      <div ref={ref} style={{ position: "relative" }}>
        <div onClick={() => setStatusOpen((o) => !o)} style={{ cursor: "pointer" }}>
          {status ? (
            <Badge color={status.color} size="md" shape="pill">
              {status.label}
            </Badge>
          ) : (
            <Badge color={BADGE_COLORS.neutral} size="md" shape="pill">Active</Badge>
          )}
        </div>
        {statusOpen && (
          <>
            <div style={s.popoverOverlay} onClick={() => setStatusOpen(false)} />
            <div style={s.popover} onClick={(e) => e.stopPropagation()}>
              <DropdownList>
                <DropdownSection>
                  {STATUS_OPTIONS.map((opt) => (
                    <DropdownListItem
                      key={opt.id}
                      isSelected={status?.id === opt.id}
                      onClick={() => { onStatusChange(opt); setStatusOpen(false); }}
                    >
                      {opt.label}
                    </DropdownListItem>
                  ))}
                </DropdownSection>
              </DropdownList>
            </div>
          </>
        )}
      </div>

      {/* Date */}
      <div style={{ position: "relative", flex: 1 }}>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => { setDraftDate(date); setDateOpen((o) => !o); }}
        >
          {date ? (
            <span style={{ ...s.textValue, fontSize: "var(--text-body-sm)", color: "var(--color-content-secondary)" }}>
              {fmtDate(date)}
            </span>
          ) : (
            <span style={{ ...s.placeholder, fontSize: "var(--text-body-sm)" }}>/</span>
          )}
        </div>
        {dateOpen && (
          <>
            <div style={s.popoverOverlay} onClick={() => setDateOpen(false)} />
            <div style={{ ...s.popover, minWidth: 280 }} onClick={(e) => e.stopPropagation()}>
              <div style={{ padding: "var(--spacing-3)" }}>
                <DatePicker value={draftDate} onChange={setDraftDate} />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "var(--spacing-2)", gap: "var(--spacing-2)" }}>
                  <Button variant="secondary" size="sm" onClick={() => setDateOpen(false)}>Cancel</Button>
                  <Button variant="primary" size="sm" onClick={handleDateSave}>Save</Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/** Two-level cell: obligation name + milestone link */
function TwoLevelCell({ obligationName, milestone }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", minWidth: 0 }}>
      <span style={s.twoLevelPrimary}>{obligationName}</span>
      <span style={s.twoLevelSecondary}>
        <Icon name="FlagIcon" size={12} style={{ flexShrink: 0, color: "var(--color-content-secondary)" }} />
        <span style={{ ...s.twoLevelPrimary, fontSize: "var(--text-body-sm)", color: "var(--color-content-secondary)" }}>
          {milestone?.name ?? "Milestone name"}
        </span>
      </span>
    </div>
  );
}

/** Assignee cell with avatar + +N overflow */
function AssigneeCell({ assignee, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        style={{ ...s.assigneeRow, cursor: "pointer", minHeight: 24 }}
        onClick={() => setOpen((o) => !o)}
      >
        {assignee ? (
          <>
            <Avatar size="xs" initials={assignee.initials} />
            <span style={s.assigneeName}>{assignee.name}</span>
            <span style={{ ...s.assigneeName, color: "var(--color-content-secondary)", fontSize: "var(--text-body-sm)", marginLeft: 2 }}>+1</span>
          </>
        ) : (
          <span style={s.placeholder}>Add assignee</span>
        )}
      </div>
      {open && (
        <>
          <div style={s.popoverOverlay} onClick={() => setOpen(false)} />
          <div style={s.popover} onClick={(e) => e.stopPropagation()}>
            <DropdownList>
              <DropdownSection>
                {ASSIGNEE_OPTIONS.map((opt) => (
                  <DropdownListItem
                    key={opt.id}
                    isSelected={assignee?.id === opt.id}
                    onClick={() => { onChange(opt); setOpen(false); }}
                    iconLeading={<Avatar size="xs" initials={opt.initials} />}
                  >
                    {opt.name}
                  </DropdownListItem>
                ))}
              </DropdownSection>
            </DropdownList>
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// INLINE EDIT TABLE (reusable, no page wrapper)
// ─────────────────────────────────────────────

export function InlineEditTable() {
  const [rows, setRows] = useState(INITIAL_ROWS);

  const updateRow = (id, patch) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  return (
    <TableCard.Root>
        <TableCard.Header
          title="Table"
          badge={`${rows.length} rows`}
          contentTrailing={
            <Button
              variant="primary"
              size="sm"
              iconLeading={<Icon name="PlusIcon" size={16} />}
              onClick={() =>
                setRows((prev) => [
                  ...prev,
                  {
                    id: `r${Date.now()}`,
                    title: "",
                    longText: "",
                    chips: [],
                    status: null,
                    date: null,
                    obligationName: "Obligation name",
                    milestone: MILESTONE_OPTIONS[0],
                    link: "Link",
                    shortTitle: "",
                    assignee: null,
                  },
                ])
              }
            >
              Add row
            </Button>
          }
        />

        {/* HEADER WRAPPER */}
        <div className="table-header-wrapper">
          <div className="table-scroll-container">
            <div className="table-inner">
              <TableRow variant="header">
                <TableCellHeader width={220}>Title</TableCellHeader>
                <TableCellHeader width={260}>Long/short text</TableCellHeader>
                <TableCellHeader width={240}>Chip</TableCellHeader>
                <TableCellHeader width={200}>Button · Status / Date</TableCellHeader>
                <TableCellHeader width={200}>Title</TableCellHeader>
                <TableCellHeader width={120}>Title</TableCellHeader>
                <TableCellHeader width={180}>Title</TableCellHeader>
                <TableCellHeader width={180}>Title</TableCellHeader>
              </TableRow>
            </div>
          </div>
        </div>

        {/* BODY WRAPPER */}
        <div className="table-body-wrapper">
          <div className="table-scroll-container">
            <div className="table-inner">
              {rows.map((row) => {
                const longTextError = row.longText.length > MAX_LONG_TEXT;
                return (
                  <TableRow key={row.id} variant="body">
                    {/* Title */}
                    <TableCell variant="short-text" width={220}>
                      <TitleCell
                        value={row.title}
                        onChange={(v) => updateRow(row.id, { title: v })}
                      />
                    </TableCell>

                    {/* Long text */}
                    <TableCell variant={longTextError ? "long-text" : "long-text"} width={260}>
                      <LongTextCell
                        value={row.longText}
                        onChange={(v) => updateRow(row.id, { longText: v })}
                      />
                    </TableCell>

                    {/* Chip */}
                    <TableCell variant="tags-2" width={240}>
                      <ChipCell
                        value={row.chips}
                        onChange={(v) => updateRow(row.id, { chips: v })}
                      />
                    </TableCell>

                    {/* Status / Date */}
                    <TableCell variant="button" width={200}>
                      <StatusDateCell
                        status={row.status}
                        date={row.date}
                        onStatusChange={(v) => updateRow(row.id, { status: v })}
                        onDateChange={(v) => updateRow(row.id, { date: v })}
                      />
                    </TableCell>

                    {/* Two-level: Obligation + Milestone */}
                    <TableCell variant="two-level" width={200}>
                      <TwoLevelCell
                        obligationName={row.obligationName}
                        milestone={row.milestone}
                      />
                    </TableCell>

                    {/* Link */}
                    <TableCell variant="linked-object" width={120}>
                      <div style={s.cellHoverArea}>
                        <span style={{ ...s.twoLevelPrimary, fontSize: "var(--text-body-md)" }}>
                          {row.link}
                        </span>
                      </div>
                    </TableCell>

                    {/* Short title */}
                    <TableCell variant="short-text" width={180}>
                      <TitleCell
                        value={row.shortTitle}
                        onChange={(v) => updateRow(row.id, { shortTitle: v })}
                      />
                    </TableCell>

                    {/* Assignee */}
                    <TableCell variant="short-text" width={180}>
                      <AssigneeCell
                        assignee={row.assignee}
                        onChange={(v) => updateRow(row.id, { assignee: v })}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </div>
          </div>
        </div>
      </TableCard.Root>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export default function InlineEditTablePage() {
  return (
    <div style={s.page}>
      <InlineEditTable />
    </div>
  );
}
