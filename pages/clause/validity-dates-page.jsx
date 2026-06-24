"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { CalendarIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { MiniInfobox } from "../../library/molecules/miniinfobox.jsx";
import { Checkbox } from "../../library/atoms/checkbox.jsx";
import { Button } from "../../library/atoms/button.jsx";
import { Badge } from "../../library/atoms/badge.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { Modal } from "../../library/organisms/modal.jsx";
import { RadioButton, RadioGroup } from "../../library/atoms/radio-button.jsx";
import { Toggle } from "../../library/atoms/toggle.jsx";
import { Label } from "../../library/molecules/text-input.jsx";

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// MOCK DATA
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const AGREEMENT = {
  effectiveDate: new Date(2026, 0, 1), // Jan 1, 2026
  expirationDate: new Date(2036, 11, 1), // Dec 1, 2036
};

const MILESTONE_OPTIONS = [
  {
    id: "agreement-signature",
    label: "Agreement signature",
    date: new Date(2030, 0, 1),
    status: "On Track",
    statusVariant: "positive",
  },
  {
    id: "phase-2",
    label: "Phase 2 clinical trials",
    date: new Date(2027, 5, 1),
    status: "On Track",
    statusVariant: "positive",
  },
  {
    id: "nda-approval",
    label: "NDA approval",
    date: new Date(2028, 3, 1),
    status: "Off Track",
    statusVariant: "negative",
  },
];

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// UTILITY
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const fmt = (date) => {
  if (!date) return null;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const addDays = (date, days) => {
  if (!date) return null;
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const addWeeks = (date, weeks) => addDays(date, weeks * 7);

const addMonths = (date, months) => {
  if (!date) return null;
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
};

const computeEffectiveFromMilestone = (milestoneDate, delay, unit) => {
  if (!milestoneDate || delay === "" || delay === null) return null;
  const n = parseInt(delay, 10);
  if (isNaN(n) || n < 0) return null;
  if (unit === "Days") return addDays(milestoneDate, n);
  if (unit === "Weeks") return addWeeks(milestoneDate, n);
  if (unit === "Months") return addMonths(milestoneDate, n);
  return null;
};

const computeClauseStatus = (effectiveDate, expirationDate, today = new Date()) => {
  if (!effectiveDate) return "Pending";
  if (expirationDate && today >= expirationDate) return "Expired";
  if (today >= effectiveDate) return "Active";
  return "Pending";
};

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// DESIGN TOKENS (inline)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const t = {
  card: {
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--color-action-outline-secondary-enabled)",
    padding: "var(--spacing-6)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-4)",
    fontFamily: "var(--font-family-primary)",
  },
  label: {
    fontSize: "var(--text-body-sm)",
    fontWeight: "var(--font-weight-medium)",
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
  },
  sublabel: {
    fontSize: "var(--text-body-sm)",
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
  },
  caption: {
    fontSize: "var(--text-body-caption)",
    color: "var(--color-content-tertiary)",
    fontFamily: "var(--font-family-primary)",
  },
  row: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-2)",
  },
  divider: {
    height: 1,
    background: "var(--color-action-outline-secondary-enabled)",
    margin: "0 calc(-1 * var(--spacing-6))",
  },
};

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// DATE TRIGGER (compact date input button)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function DateTrigger({ value, placeholder = "Select date", isDisabled, isError, onClear, onClick }) {
  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--spacing-sm)",
        padding: "5px var(--spacing-sm)",
        borderRadius: "var(--radius-sm)",
        border: isError
          ? "1px solid var(--color-content-negative)"
          : "1px solid var(--color-action-outline-secondary-enabled)",
        background: isDisabled
          ? "var(--color-general-neutral-lighter)"
          : "var(--color-general-white)",
        color: value
          ? "var(--color-content-primary)"
          : "var(--color-content-tertiary)",
        fontFamily: "var(--font-family-primary)",
        fontSize: "var(--text-body-sm)",
        cursor: isDisabled ? "not-allowed" : "pointer",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <CalendarIcon style={{ width: 14, height: 14, flexShrink: 0, color: value ? "var(--color-action-fill-primary-enabled)" : "var(--color-content-tertiary)" }} />
      <span style={{ flex: 1, textAlign: "left" }}>{value ? fmt(value) : placeholder}</span>
      {value && !isDisabled && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClear?.(); }}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            display: "inline-flex",
            color: "var(--color-content-tertiary)",
          }}
        >
          <XMarkIcon style={{ width: 12, height: 12 }} />
        </button>
      )}
    </button>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// INLINE DATE PICKER POPOVER (simple)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function InlineDatePicker({ value, onChange, minDate, maxDate, isOpen, onOpen, isError }) {
  const open = isOpen;
  const setOpen = (val) => onOpen(val);
  const [viewYear, setViewYear] = useState((value || new Date()).getFullYear());
  const [viewMonth, setViewMonth] = useState((value || new Date()).getMonth());
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    // Jump to minDate month if current view is entirely before minDate
    if (minDate) {
      const viewEnd = new Date(viewYear, viewMonth + 1, 0);
      if (viewEnd < minDate) {
        setViewYear(minDate.getFullYear());
        setViewMonth(minDate.getMonth());
      }
    }
    // Jump to maxDate month if current view is entirely after maxDate
    if (maxDate) {
      const viewStart = new Date(viewYear, viewMonth, 1);
      if (viewStart > maxDate) {
        setViewYear(maxDate.getFullYear());
        setViewMonth(maxDate.getMonth());
      }
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const FULL_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const getDays = () => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const prevDays = new Date(viewYear, viewMonth, 0).getDate();
    const cells = [];
    for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: prevDays - i, outside: true });
    for (let i = 1; i <= daysInMonth; i++) cells.push({ day: i, outside: false });
    while (cells.length % 7 !== 0) { cells.push({ day: cells.length - daysInMonth - firstDay + 2, outside: true }); }
    return cells;
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isSelected = (day) => {
    if (!value || day.outside) return false;
    return value.getFullYear() === viewYear && value.getMonth() === viewMonth && value.getDate() === day.day;
  };

  const isDisabled = (day) => {
    if (day.outside) return false;
    const d = new Date(viewYear, viewMonth, day.day);
    if (minDate && d < minDate) return true;
    if (maxDate && d > maxDate) return true;
    return false;
  };

  return (
    <div style={{ position: "relative", display: "block" }} ref={containerRef}>
      <DateTrigger
        value={value}
        isError={isError}
        onClear={() => onChange(null)}
        onClick={() => setOpen(o => !o)}
      />
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            zIndex: 100,
            background: "var(--color-general-white)",
            border: "1px solid var(--color-action-outline-secondary-enabled)",
            borderRadius: "var(--radius-md)",
            padding: 12,
            boxShadow: "var(--shadow-light-down)",
            width: "fit-content",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <button type="button" onClick={prevMonth} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <Icon name="ChevronLeft" size="sm" />
            </button>
            <span style={{ fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", fontFamily: "var(--font-family-primary)" }}>
              {FULL_MONTHS[viewMonth]} {viewYear}
            </span>
            <button type="button" onClick={nextMonth} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <Icon name="ChevronRight" size="sm" />
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 28px)", gap: 2 }}>
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
              <div key={d} style={{ textAlign: "center", fontSize: "var(--text-body-caption)", color: "var(--color-content-tertiary)", padding: "2px 0" }}>{d}</div>
            ))}
            {getDays().map((cell, i) => {
              const disabled = isDisabled(cell);
              const selected = isSelected(cell);
              return (
                <button
                  key={i}
                  type="button"
                  disabled={disabled || cell.outside}
                  onClick={() => {
                    if (!cell.outside && !disabled) {
                      onChange(new Date(viewYear, viewMonth, cell.day));
                      setOpen(false);
                    }
                  }}
                  style={{
                    width: 28, height: 28, borderRadius: "var(--radius-full)",
                    border: "none", cursor: disabled || cell.outside ? "not-allowed" : "pointer",
                    background: selected ? "var(--color-action-fill-primary-enabled)" : "transparent",
                    color: selected ? "white" : cell.outside || disabled ? "var(--color-content-tertiary)" : "var(--color-content-primary)",
                    fontSize: "var(--text-body-sm)",
                    fontFamily: "var(--font-family-primary)",
                  }}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// ALIGNMENT TOGGLE ROW
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function AlignmentToggle({ isOn, agreementDate, onChange, type }) {
  const label = agreementDate
    ? `Align with agreement ${type} date: ${fmt(agreementDate)}`
    : `Align with agreement ${type} date when it is defined`;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
      <Toggle size="sm" isSelected={isOn} onChange={onChange} />
      <span style={t.caption}>{label}</span>
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// STATUS IMPLICATION
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function StatusImplication({ effectiveDate, expirationDate, isMilestoneMode }) {
  const today = new Date();
  let msg = null;
  let color = "var(--color-content-secondary)";

  if (isMilestoneMode) {
    msg = "This clause status and effective date are controlled by the linked milestone.";
  } else if (!effectiveDate && !expirationDate) {
    msg = "This clause will always remain Pending and can never become Active.";
  } else if (effectiveDate && !expirationDate) {
    if (today >= effectiveDate) msg = "This clause is immediately Active.";
    else msg = `This clause will become Active on ${fmt(effectiveDate)} and will never expire.`;
    color = "var(--color-status-positive)";
  } else if (!effectiveDate && expirationDate) {
    msg = `This clause will always remain Pending. It expires on ${fmt(expirationDate)}.`;
  } else if (effectiveDate && expirationDate) {
    if (today >= expirationDate) {
      msg = "This clause is already Expired.";
      color = "var(--color-content-negative)";
    } else if (today >= effectiveDate) {
      msg = `This clause is currently Active and will expire on ${fmt(expirationDate)}.`;
      color = "var(--color-status-positive)";
    } else {
      msg = `This clause will become Active on ${fmt(effectiveDate)} and expire on ${fmt(expirationDate)}.`;
    }
  }

  if (!msg) return null;
  return (
    <div style={{ padding: "var(--spacing-sm) var(--spacing-3)", background: "var(--color-general-informative)", borderRadius: "var(--radius-sm)", display: "flex", gap: "var(--spacing-sm)", alignItems: "flex-start" }}>
      <Icon name="InformationCircle" size="sm" style={{ color: "var(--color-action-fill-primary-enabled)", flexShrink: 0, marginTop: 1 }} />
      <span style={{ fontSize: "var(--text-body-sm)", color, fontFamily: "var(--font-family-primary)", lineHeight: 1.4 }}>{msg}</span>
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// STATUS BADGE
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function StatusBadge({ effectiveDate, expirationDate }) {
  const today = new Date();
  let status = "Pending";
  let variant = "warning";

  if (effectiveDate && expirationDate && today >= expirationDate) {
    status = "Expired"; variant = "neutral";
  } else if (effectiveDate && today >= effectiveDate) {
    status = "Active"; variant = "positive";
  }

  return <Badge variant={variant}>{status}</Badge>;
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// MILESTONE PICKER (existing)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function MilestonePicker({ selected, onSelect }) {
  const [open, setOpen] = useState(false);

  const statusColor = (s) =>
    s === "On Track" ? "var(--color-status-positive)" :
    s === "Off Track" ? "var(--color-content-negative)" :
    s === "Successful" ? "var(--color-status-positive)" :
    s === "Failed" ? "var(--color-content-negative)" :
    "var(--color-content-tertiary)";

  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", padding: "6px var(--spacing-sm)",
          border: "1px solid var(--color-action-outline-secondary-enabled)",
          borderRadius: "var(--radius-sm)",
          background: "var(--color-general-white)",
          cursor: "pointer",
          fontFamily: "var(--font-family-primary)",
          fontSize: "var(--text-body-sm)",
        }}
      >
        {selected ? (
          <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)", flex: 1, minWidth: 0 }}>
            <Icon name="FlagMini" size="sm" style={{ color: "var(--color-action-fill-primary-enabled)", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "var(--color-content-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{selected.label}</div>
              <div style={{ fontSize: "var(--text-body-caption)", color: "var(--color-content-secondary)" }}>
                {fmt(selected.date)} Â· <span style={{ color: statusColor(selected.status) }}>â— {selected.status}</span>
              </div>
            </div>
          </div>
        ) : (
          <span style={{ color: "var(--color-content-tertiary)" }}>Select milestone</span>
        )}
        <Icon name="ChevronDown" size="sm" style={{ color: "var(--color-content-secondary)", flexShrink: 0 }} />
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 100,
          background: "var(--color-general-white)",
          border: "1px solid var(--color-action-outline-secondary-enabled)",
          borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-light-down)",
          overflow: "hidden",
        }}>
          {MILESTONE_OPTIONS.map(m => (
            <button
              key={m.id}
              type="button"
              onClick={() => { onSelect(m); setOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: "var(--spacing-sm)", width: "100%",
                padding: "var(--spacing-sm) var(--spacing-3)",
                background: selected?.id === m.id ? "var(--color-general-informative)" : "transparent",
                border: "none", cursor: "pointer", textAlign: "left",
                fontFamily: "var(--font-family-primary)",
              }}
            >
              <Icon name="FlagMini" size="sm" style={{ color: "var(--color-action-fill-primary-enabled)", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: "var(--text-body-sm)", color: "var(--color-content-primary)" }}>{m.label}</div>
                <div style={{ fontSize: "var(--text-body-caption)", color: "var(--color-content-secondary)" }}>
                  {fmt(m.date)} Â· <span style={{ color: statusColor(m.status) }}>â— {m.status}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// DELAY INPUT
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function DelayInput({ delay, unit, onDelayChange, onUnitChange }) {
  const UNITS = ["Days", "Weeks", "Months"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
      <input
        type="number"
        min={0}
        value={delay}
        onChange={e => onDelayChange(e.target.value)}
        style={{
          width: 52, padding: "5px var(--spacing-sm)",
          border: "1px solid var(--color-action-outline-secondary-enabled)",
          borderRadius: "var(--radius-sm)", fontFamily: "var(--font-family-primary)",
          fontSize: "var(--text-body-sm)", textAlign: "center",
        }}
      />
      <select
        value={unit}
        onChange={e => onUnitChange(e.target.value)}
        style={{
          padding: "5px var(--spacing-sm)",
          border: "1px solid var(--color-action-outline-secondary-enabled)",
          borderRadius: "var(--radius-sm)", fontFamily: "var(--font-family-primary)",
          fontSize: "var(--text-body-sm)", cursor: "pointer",
          background: "var(--color-general-white)", color: "var(--color-content-primary)",
        }}
      >
        {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
      </select>
      <span style={t.sublabel}>after the milestone is successful</span>
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// RICH TEXT STUB
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function RichTextStub({ placeholder }) {
  const [value, setValue] = useState("");
  return (
    <div style={{
      border: "1px solid var(--color-action-outline-secondary-enabled)",
      borderRadius: "var(--radius-sm)", background: "var(--color-general-white)", overflow: "hidden",
    }}>
      <div style={{ display: "flex", gap: 4, padding: "4px var(--spacing-sm)", borderBottom: "1px solid var(--color-action-outline-secondary-enabled)" }}>
        {["B", "I", "U"].map(f => (
          <button key={f} type="button" style={{ width: 24, height: 24, background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-sm)", borderRadius: "var(--radius-xs)" }}>{f}</button>
        ))}
      </div>
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={placeholder}
        rows={3}
        style={{
          width: "100%", padding: "var(--spacing-sm)", border: "none", outline: "none",
          fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-sm)",
          color: "var(--color-content-primary)", resize: "vertical", boxSizing: "border-box",
          background: "transparent",
        }}
      />
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// CONFLICT WARNING
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ConflictWarning({ effectiveDate, expirationDate, milestoneEffective }) {
  const effective = milestoneEffective || effectiveDate;
  if (!effective || !expirationDate) return null;
  if (effective <= expirationDate) return null;
  return (
    <div style={{
      display: "flex", gap: "var(--spacing-sm)", alignItems: "flex-start",
      padding: "var(--spacing-sm) var(--spacing-3)",
      background: "var(--color-general-negative-lighter, #fff3f3)",
      border: "1px solid var(--color-content-negative)",
      borderRadius: "var(--radius-sm)",
    }}>
      <Icon name="ExclamationTriangle" size="sm" style={{ color: "var(--color-content-negative)", flexShrink: 0, marginTop: 1 }} />
      <span style={{ fontSize: "var(--text-body-sm)", color: "var(--color-content-negative)", fontFamily: "var(--font-family-primary)", lineHeight: 1.4 }}>
        The effective date ({fmt(effective)}) is after the expiration date ({fmt(expirationDate)}). The clause will never become Active.
      </span>
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// MILESTONE MODE PANEL
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function MilestonePanel({ state, onChange }) {
  const {
    milestoneTab,
    existingMilestone,
    newMilestoneTitle,
    newMilestoneDate,
    newMilestoneDesc,
    delay,
    delayUnit,
  } = state;

  const milestoneForecastedDate =
    milestoneTab === "existing" ? existingMilestone?.date :
    milestoneTab === "new" ? newMilestoneDate : null;

  const computedEffective = computeEffectiveFromMilestone(milestoneForecastedDate, delay, delayUnit);

  const set = (key) => (val) => onChange({ ...state, [key]: val });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-3)" }}>
      {/* Tab switcher */}
      <div style={{
        display: "flex", gap: 0, border: "1px solid var(--color-action-outline-secondary-enabled)",
        borderRadius: "var(--radius-sm)", overflow: "hidden", width: "fit-content",
      }}>
        {[{ id: "existing", label: "Existing milestone" }, { id: "new", label: "New milestone" }].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => set("milestoneTab")(tab.id)}
            style={{
              padding: "5px var(--spacing-3)", border: "none", cursor: "pointer",
              fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-sm)",
              background: milestoneTab === tab.id ? "var(--color-action-fill-primary-enabled)" : "var(--color-general-white)",
              color: milestoneTab === tab.id ? "white" : "var(--color-content-secondary)",
              fontWeight: milestoneTab === tab.id ? "var(--font-weight-medium)" : "var(--font-weight-regular)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {milestoneTab === "existing" && (
        <>
          <div style={t.row}>
            <Label>Milestone title</Label>
            <MilestonePicker selected={existingMilestone} onSelect={set("existingMilestone")} />
          </div>

          {existingMilestone && (
            <>
              <div style={t.row}>
                <Label>Contractual clause active</Label>
                <DelayInput delay={delay} unit={delayUnit} onDelayChange={set("delay")} onUnitChange={set("delayUnit")} />
              </div>
                <MiniInfobox variant="info">
                  The contractual clause owner will also be assigned as the milestone owner
                </MiniInfobox>
            </>
          )}
        </>
      )}

      {milestoneTab === "new" && (
        <>
          <div style={t.row}>
            <Label required>Milestone title</Label>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
              <Icon name="FlagMini" size="sm" style={{ color: "var(--color-action-fill-primary-enabled)" }} />
              <input
                type="text"
                value={newMilestoneTitle}
                onChange={e => set("newMilestoneTitle")(e.target.value)}
                placeholder="Milestone title"
                style={{
                  flex: 1, padding: "5px var(--spacing-sm)",
                  border: "1px solid var(--color-action-outline-secondary-enabled)",
                  borderRadius: "var(--radius-sm)", fontFamily: "var(--font-family-primary)",
                  fontSize: "var(--text-body-sm)", outline: "none",
                }}
              />
            </div>
          </div>

          <div style={t.row}>
            <Label required>Forecasted date</Label>
            <InlineDatePicker value={newMilestoneDate} onChange={set("newMilestoneDate")} {...makePicker("new-milestone-date")} />
          </div>

          <div style={t.row}>
            <Label>Milestone description <span style={t.caption}>(optional)</span></Label>
            <RichTextStub placeholder="Add a milestone description" />
          </div>

          <div style={t.row}>
            <Label>Contractual clause active</Label>
            <DelayInput delay={delay} unit={delayUnit} onDelayChange={set("delay")} onUnitChange={set("delayUnit")} />
          </div>
        </>
      )}

      {/* Computed effective date (read-only) */}
      <div style={t.row}>
        <Label>Effective date</Label>
        {computedEffective ? (
          <DateTrigger value={computedEffective} isDisabled />
        ) : (
          <DateTrigger placeholder="Defined by the milestone date" isDisabled />
        )}
      </div>

      {/* Return computed effective for parent use */}
      <input type="hidden" value={computedEffective?.toISOString() ?? ""} onChange={() => {}} />
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// VALIDITY DATES FORM (controlled)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ValidityDatesForm({ state, onChange, onCreate, onCancel }) {
  const {
    effectiveDate, effectiveAligned,
    expirationDate, expirationAligned,
    milestoneMode, milestoneState,
    terminateWithAgreement,
  } = state;

  const [openPicker, setOpenPicker] = useState(null);
  const makePicker = (id) => ({
    isOpen: openPicker === id,
    onOpen: (val) => setOpenPicker(val ? id : null),
  });

  const set = (key) => (val) => onChange({ ...state, [key]: val });

  const setEffectiveDate = (date) => {
    onChange({ ...state, effectiveDate: date, effectiveAligned: false });
  };
  const setExpirationDate = (date) => {
    onChange({ ...state, expirationDate: date, expirationAligned: false });
  };
  const handleEffectiveAlignToggle = (val) => {
    onChange({ ...state, effectiveAligned: val, effectiveDate: val ? AGREEMENT.effectiveDate : null });
  };
  const handleExpirationAlignToggle = (val) => {
    onChange({ ...state, expirationAligned: val, expirationDate: val ? AGREEMENT.expirationDate : null });
  };

  const getMilestoneEffective = () => {
    const { milestoneTab, existingMilestone, newMilestoneDate, delay, delayUnit } = milestoneState;
    const forecastedDate = milestoneTab === "existing" ? existingMilestone?.date : newMilestoneDate;
    return computeEffectiveFromMilestone(forecastedDate, delay, delayUnit);
  };

  const displayEffective = milestoneMode ? getMilestoneEffective() : effectiveDate;

  return (
    <div style={{ ...t.card, width: 480 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ ...t.label, fontSize: "var(--text-body-md)", fontWeight: "var(--font-weight-semibold)" }}>
          Validity dates
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
          <Toggle size="sm" isSelected={milestoneMode} onChange={set("milestoneMode")} />
          <span style={t.sublabel}>Milestone</span>
        </div>
      </div>

      <div style={t.divider} />

      {milestoneMode ? (
        <div style={{
          border: "1px solid var(--color-action-outline-secondary-enabled)",
          borderRadius: "var(--radius-md)",
          padding: "var(--spacing-4)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-4)",
        }}>
          <div>
            <span style={{ ...t.label, fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-semibold)" }}>
              Milestone and obligations
            </span>
            <p style={{ ...t.caption, marginTop: 4, lineHeight: 1.4 }}>
              The contractual clause status and dates will be linked to the milestone automatically
            </p>
          </div>
          <MilestonePanel state={milestoneState} onChange={set("milestoneState")} />

          <div style={{ height: 1, background: "var(--color-action-outline-secondary-enabled)" }} />
          {(() => {
            const milestoneMinDate = displayEffective ? new Date(displayEffective.getTime() + 86400000) : undefined;
            const milestoneExpError = !expirationAligned && milestoneMinDate && expirationDate && expirationDate < milestoneMinDate;
            return (
              <div style={t.row}>
                <Label>Expiration date</Label>
                {expirationAligned ? (
                  <DateTrigger value={expirationDate} isDisabled />
                ) : (
                  <InlineDatePicker
                    value={expirationDate}
                    onChange={setExpirationDate}
                    minDate={milestoneMinDate}
                    isError={milestoneExpError}
                    {...makePicker("milestone-expiration")}
                  />
                )}
                {milestoneExpError && (
                  <MiniInfobox variant="error" message="Expiration date must be after the effective date" />
                )}
                <AlignmentToggle isOn={expirationAligned} agreementDate={AGREEMENT.expirationDate} onChange={handleExpirationAlignToggle} type="expiration" />
              </div>
            );
          })()}
        </div>
      ) : (
        <>
          <div style={t.row}>
            <Label>Effective date</Label>
            {effectiveAligned ? (
              <DateTrigger value={effectiveDate} isDisabled />
            ) : (
              <InlineDatePicker value={effectiveDate} onChange={setEffectiveDate} {...makePicker("effective")} />
            )}
            <AlignmentToggle isOn={effectiveAligned} agreementDate={AGREEMENT.effectiveDate} onChange={handleEffectiveAlignToggle} type="effective" />
          </div>

          {(() => {
            const expMinDate = effectiveDate ? new Date(effectiveDate.getTime() + 86400000) : undefined;
            const expError = !expirationAligned && expMinDate && expirationDate && expirationDate < expMinDate;
            return (
              <div style={t.row}>
                <Label>Expiration date</Label>
                {expirationAligned ? (
                  <DateTrigger value={expirationDate} isDisabled />
                ) : (
                  <InlineDatePicker
                    value={expirationDate}
                    onChange={setExpirationDate}
                    minDate={expMinDate}
                    isError={expError}
                    {...makePicker("expiration")}
                  />
                )}
                {expError && (
                  <MiniInfobox variant="error" message="Expiration date must be after the effective date" />
                )}
                <AlignmentToggle isOn={expirationAligned} agreementDate={AGREEMENT.expirationDate} onChange={handleExpirationAlignToggle} type="expiration" />
              </div>
            );
          })()}
        </>
      )}

      <div style={t.row}>
        <span style={{ ...t.label, color: "var(--color-content-secondary)", fontSize: "var(--text-body-overline)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Termination
        </span>
        <Checkbox isSelected={terminateWithAgreement} onChange={set("terminateWithAgreement")} size="sm">
          Terminate clause when agreement is terminated
        </Checkbox>
      </div>

      <div style={t.divider} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button variant="tertiary" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" onClick={onCreate}>Create</Button>
      </div>
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// AGREEMENT TERMINATION SECTION
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function AgreementTerminationSection({ terminateWithAgreement, onTerminateChange, activePeriod, onActivePeriodChange, activeDuration, onActiveDurationChange, activeDurationUnit, onActiveDurationUnitChange }) {
  return (
    <div style={t.row}>
      <span style={{ ...t.label, color: "var(--color-content-secondary)", fontSize: "var(--text-body-overline)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
        Agreement termination
      </span>
      <Checkbox isSelected={terminateWithAgreement} onChange={onTerminateChange} size="sm">
        Terminate clause when agreement is terminated
      </Checkbox>
      {terminateWithAgreement && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-2)", marginTop: "var(--spacing-sm)" }}>
          <span style={t.sublabel}>Active period</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
            <RadioGroup name="active-period" value={activePeriod} onChange={onActivePeriodChange}>
              <RadioButton value="indefinite" size="sm">Indefinite</RadioButton>
              <RadioButton value="fixed" size="sm">Fixed duration</RadioButton>
            </RadioGroup>
            {activePeriod === "fixed" && (
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)", marginTop: 4 }}>
                <span style={t.sublabel}>Active for</span>
                <input
                  type="number"
                  min={1}
                  value={activeDuration}
                  onChange={e => onActiveDurationChange(e.target.value)}
                  style={{
                    width: 52, padding: "5px var(--spacing-sm)",
                    border: "1px solid var(--color-action-outline-secondary-enabled)",
                    borderRadius: "var(--radius-sm)", fontFamily: "var(--font-family-primary)",
                    fontSize: "var(--text-body-sm)", textAlign: "center",
                  }}
                />
                <select
                  value={activeDurationUnit}
                  onChange={e => onActiveDurationUnitChange(e.target.value)}
                  style={{
                    padding: "5px var(--spacing-sm)",
                    border: "1px solid var(--color-action-outline-secondary-enabled)",
                    borderRadius: "var(--radius-sm)", fontFamily: "var(--font-family-primary)",
                    fontSize: "var(--text-body-sm)", cursor: "pointer",
                    background: "var(--color-general-white)", color: "var(--color-content-primary)",
                  }}
                >
                  {["Days", "Weeks", "Months", "Years"].map(u => <option key={u} value={u}>{u}</option>)}
                </select>
                <span style={t.sublabel}>after agreement termination</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// EDIT VALIDITY DATES MODAL (inline, draft of source state)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function EditValidityDatesModal({ sourceState, onSave }) {
  const [draft, setDraft] = useState(sourceState);

  // Keep draft in sync when source changes (creation form updated)
  useEffect(() => { setDraft(sourceState); }, [sourceState]);

  const [openPicker, setOpenPicker] = useState(null);
  const makePicker = (id) => ({
    isOpen: openPicker === id,
    onOpen: (val) => setOpenPicker(val ? id : null),
  });

  const setEffectiveDate = (date) => setDraft(d => ({ ...d, effectiveDate: date, effectiveAligned: false }));
  const setExpirationDate = (date) => setDraft(d => ({ ...d, expirationDate: date, expirationAligned: false }));
  const handleEffectiveAlignToggle = (val) => setDraft(d => ({ ...d, effectiveAligned: val, effectiveDate: val ? AGREEMENT.effectiveDate : null }));
  const handleExpirationAlignToggle = (val) => setDraft(d => ({ ...d, expirationAligned: val, expirationDate: val ? AGREEMENT.expirationDate : null }));

  const handleConfirm = () => onSave(draft);
  const handleCancel = () => setDraft(sourceState);

  // Compute milestone effective for display
  const getMilestoneForecastedDate = () => {
    const { milestoneTab, existingMilestone, newMilestoneDate } = draft.milestoneState;
    return milestoneTab === "existing" ? existingMilestone?.date : newMilestoneDate;
  };
  const milestoneEffective = draft.milestoneMode
    ? computeEffectiveFromMilestone(getMilestoneForecastedDate(), draft.milestoneState.delay, draft.milestoneState.delayUnit)
    : null;
  const displayEffective = draft.milestoneMode ? milestoneEffective : draft.effectiveDate;

  return (
    <div style={{ ...t.card, width: 480 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ ...t.label, fontSize: "var(--text-body-md)", fontWeight: "var(--font-weight-semibold)" }}>
          Edit validity dates
        </span>
      </div>

      <div style={t.divider} />

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
        {draft.milestoneMode ? (
          <>
            <div style={t.row}>
              <Label>Effective date</Label>
              <DateTrigger value={milestoneEffective} placeholder="Defined by the milestone date" isDisabled />
            </div>
            {(() => {
              const milestoneMinDate = milestoneEffective ? new Date(milestoneEffective.getTime() + 86400000) : undefined;
              const milestoneExpError = !draft.expirationAligned && milestoneMinDate && draft.expirationDate && draft.expirationDate < milestoneMinDate;
              return (
                <div style={t.row}>
                  <Label>Expiration date</Label>
                  {draft.expirationAligned ? (
                    <DateTrigger value={draft.expirationDate} isDisabled />
                  ) : (
                    <InlineDatePicker
                      value={draft.expirationDate}
                      onChange={setExpirationDate}
                      minDate={milestoneMinDate}
                      isError={milestoneExpError}
                      {...makePicker("modal-milestone-expiration")}
                    />
                  )}
                  {milestoneExpError && (
                    <MiniInfobox variant="error" message="Expiration date must be after the effective date" />
                  )}
                  <AlignmentToggle isOn={draft.expirationAligned} agreementDate={AGREEMENT.expirationDate} onChange={handleExpirationAlignToggle} type="expiration" />
                </div>
              );
            })()}
          </>
        ) : (
          <>
            <div style={t.row}>
              <Label>Effective date</Label>
              {draft.effectiveAligned ? (
                <DateTrigger value={draft.effectiveDate} isDisabled />
              ) : (
                <InlineDatePicker value={draft.effectiveDate} onChange={setEffectiveDate} {...makePicker("modal-effective")} />
              )}
              <AlignmentToggle isOn={draft.effectiveAligned} agreementDate={AGREEMENT.effectiveDate} onChange={handleEffectiveAlignToggle} type="effective" />
            </div>

            {(() => {
              const modalMinDate = displayEffective ? new Date(displayEffective.getTime() + 86400000) : undefined;
              const modalExpError = !draft.expirationAligned && modalMinDate && draft.expirationDate && draft.expirationDate < modalMinDate;
              return (
                <div style={t.row}>
                  <Label>Expiration date</Label>
                  {draft.expirationAligned ? (
                    <DateTrigger value={draft.expirationDate} isDisabled />
                  ) : (
                    <InlineDatePicker
                      value={draft.expirationDate}
                      onChange={setExpirationDate}
                      minDate={modalMinDate}
                      isError={modalExpError}
                      {...makePicker("modal-expiration")}
                    />
                  )}
                  {modalExpError && (
                    <MiniInfobox variant="error" message="Expiration date must be after the effective date" />
                  )}
                  <AlignmentToggle isOn={draft.expirationAligned} agreementDate={AGREEMENT.expirationDate} onChange={handleExpirationAlignToggle} type="expiration" />
                </div>
              );
            })()}
          </>
        )}

        <div style={t.divider} />

        <AgreementTerminationSection
          terminateWithAgreement={draft.terminateWithAgreement}
          onTerminateChange={(val) => setDraft(d => ({ ...d, terminateWithAgreement: val }))}
          activePeriod={draft.activePeriod}
          onActivePeriodChange={(val) => setDraft(d => ({ ...d, activePeriod: val }))}
          activeDuration={draft.activeDuration}
          onActiveDurationChange={(val) => setDraft(d => ({ ...d, activeDuration: val }))}
          activeDurationUnit={draft.activeDurationUnit}
          onActiveDurationUnitChange={(val) => setDraft(d => ({ ...d, activeDurationUnit: val }))}
        />
      </div>

      <div style={t.divider} />

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--spacing-sm)" }}>
        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
      </div>
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// PAGE
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const INITIAL_STATE = {
  effectiveDate: null,
  effectiveAligned: false,
  expirationDate: null,
  expirationAligned: false,
  milestoneMode: false,
  milestoneState: {
    milestoneTab: "existing",
    existingMilestone: null,
    newMilestoneTitle: "",
    newMilestoneDate: null,
    newMilestoneDesc: "",
    delay: 0,
    delayUnit: "Days",
  },
  terminateWithAgreement: true,
  activePeriod: "indefinite",
  activeDuration: 5,
  activeDurationUnit: "Years",
};

export default function ValidityDatesPage() {
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [savedState, setSavedState] = useState(null);

  const handleCreate = () => setSavedState(formState);
  const handleCancel = () => setFormState(INITIAL_STATE);

  // Compute display effective for status badge
  const getDisplayEffective = (state) => {
    if (!state) return null;
    if (!state.milestoneMode) return state.effectiveDate;
    const { milestoneTab, existingMilestone, newMilestoneDate, delay, delayUnit } = state.milestoneState;
    const forecastedDate = milestoneTab === "existing" ? existingMilestone?.date : newMilestoneDate;
    return computeEffectiveFromMilestone(forecastedDate, delay, delayUnit);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--color-general-neutral-lighter)",
      fontFamily: "var(--font-family-primary)",
      padding: 32,
      display: "flex",
      justifyContent: "center",
    }}>
      <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
        <div>
          <p style={{ ...t.caption, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>Creation form</p>
          <ValidityDatesForm
            state={formState}
            onChange={setFormState}
            onCreate={handleCreate}
            onCancel={handleCancel}
          />
        </div>

        <div>
          <p style={{ ...t.caption, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>Edit modal</p>
          {savedState ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)", marginBottom: 8 }}>
                <span style={t.sublabel}>Status</span>
                <StatusBadge effectiveDate={getDisplayEffective(savedState)} expirationDate={savedState.expirationDate} />
              </div>
              <EditValidityDatesModal sourceState={savedState} onSave={setSavedState} />
            </>
          ) : (
            <div style={{ ...t.card, width: 480, alignItems: "center", justifyContent: "center", padding: 48 }}>
              <span style={{ ...t.caption, textAlign: "center" }}>Click "Create" to populate the edit modal</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


