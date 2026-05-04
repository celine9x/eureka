import React, { useState, useRef, useEffect } from "react";
import { Modal } from "../library/organisms/modal.jsx";
import { TextInput } from "../library/molecules/text-input.jsx";
import { ButtonGroup, ButtonGroupItem } from "../library/molecules/button-group.jsx";
import { DropdownList, DropdownSection, DropdownListItem } from "../library/molecules/dropdown-list.jsx";
import { RadioButton, RadioGroup } from "../library/atoms/radio-button.jsx";
import { Icon } from "../library/atoms/icon.jsx";
import { Badge } from "../library/atoms/badge.jsx";
import { Button } from "../library/atoms/button.jsx";
import { Tooltip } from "../library/atoms/tooltip.jsx";
import { Avatar } from "../library/atoms/avatar.jsx";
import { DatePicker } from "../library/molecules/datepicker.jsx";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSection } from "../library/molecules/dropdown-menu.jsx";
import { DropdownMenuItem } from "../library/molecules/dropdown-menu-item.jsx";

// ─────────────────────────────────────────────
// INLINE STYLES
// ─────────────────────────────────────────────

const fieldStyles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
    width: "100%",
  },
  label: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-md)",
    color: "var(--color-content-primary)",
  },
  required: {
    color: "var(--color-content-negative)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-caption)",
  },
  trigger: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "var(--spacing-sm) var(--spacing-3)",
    minHeight: "var(--size-input-sm)",
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-md)",
    outline: "1px solid var(--color-interaction-outline-enabled)",
    outlineOffset: -1,
    cursor: "pointer",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    color: "var(--color-content-primary)",
    border: "none",
    gap: "var(--spacing-xs)",
    boxSizing: "border-box",
  },
  triggerPlaceholder: {
    color: "var(--color-content-tertiary)",
  },
  triggerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
  },
};

// ─────────────────────────────────────────────
// SELECT FIELD (inline dropdown)
// ─────────────────────────────────────────────

const SelectField = ({ label, required, placeholder, value, options = [], onChange, prefix }) => {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div style={fieldStyles.wrapper}>
      {label && (
        <span style={fieldStyles.label}>
          {label}
          {required && <span style={fieldStyles.required}>*</span>}
        </span>
      )}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            style={fieldStyles.trigger}
            onClick={() => setOpen((v) => !v)}
          >
            <span style={fieldStyles.triggerLeft}>
              {prefix && prefix}
              <span style={!selected ? fieldStyles.triggerPlaceholder : {}}>
                {selected ? selected.label : placeholder || "Select an option"}
              </span>
            </span>
            <Icon name="ChevronDown" size="sm" color="var(--color-content-secondary)" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent style={{ minWidth: "100%", maxWidth: "none" }}>
          <DropdownMenuSection contentStyle={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
            {options.map((opt) => (
              <DropdownMenuItem
                key={opt.value}
                label={opt.label}
                active={opt.value === value}
                onClick={() => {
                  onChange?.(opt.value);
                  setOpen(false);
                }}
              />
            ))}
          </DropdownMenuSection>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

// ─────────────────────────────────────────────
// DATE PICKER FIELD
// ─────────────────────────────────────────────

const DatePickerField = ({ label, required, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const formatted = value
    ? value.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

  return (
    <div style={fieldStyles.wrapper}>
      {label && (
        <span style={fieldStyles.label}>
          {label}
          {required && <span style={fieldStyles.required}>*</span>}
        </span>
      )}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            style={fieldStyles.trigger}
            onClick={() => setOpen((v) => !v)}
          >
            <span style={fieldStyles.triggerLeft}>
              <Icon name="CalendarDays" size="sm" color="var(--color-content-secondary)" />
              <span style={!formatted ? fieldStyles.triggerPlaceholder : {}}>
                {formatted || placeholder || "Select date"}
              </span>
            </span>
            <Icon name="ChevronDown" size="sm" color="var(--color-content-secondary)" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div style={{ padding: 8 }}>
            <DatePicker
              value={value}
              onChange={(date) => {
                onChange?.(date);
                setOpen(false);
              }}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

// ─────────────────────────────────────────────
// SECTION HEADING
// ─────────────────────────────────────────────

const SectionHeading = ({ children, info }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "var(--spacing-xs)",
      fontFamily: "var(--font-family-primary)",
      fontSize: "var(--text-body-lg)",
      fontWeight: "var(--font-weight-semibold)",
      lineHeight: "var(--line-height-body-lg)",
      color: "var(--color-content-primary)",
      paddingTop: "var(--spacing-2)",
    }}
  >
    {children}
    {info && (
      <Tooltip
        content={typeof info === "string" ? info : "Default access control is set by your admin based on agreement type"}
        placement="bottom-left"
        width={400}
      >
        <span style={{ display: "inline-flex", alignItems: "center", cursor: "default" }}>
          <Icon name="InformationCircle" variant="fill" size="sm" color="var(--color-content-tertiary)" />
        </span>
      </Tooltip>
    )}
  </div>
);

// ─────────────────────────────────────────────
// ADD AGREEMENT MODAL
// ─────────────────────────────────────────────

const TYPE_OPTIONS = [
  { value: "cda", label: "CDA" },
  { value: "licensing", label: "Licensing" },
  { value: "academic", label: "Academic collaboration" },
  { value: "research", label: "Research collaboration" },
  { value: "mta", label: "MTA" },
  { value: "supply", label: "Supply" },
];

// Drives default access control + groups when type is selected
const TYPE_ACCESS_DEFAULTS = {
  cda:      { control: "public",  groups: [] },
  licensing:{ control: "private", groups: [{ id: "bd", label: "BD", type: "group" }] },
  academic: { control: "private", groups: [{ id: "academic", label: "Academic", type: "group" }] },
  research: { control: "public",  groups: [] },
  mta:      { control: "private", groups: [] },
  supply:   { control: "private", groups: [
    { id: "bd", label: "BD", type: "group" },
    { id: "commercial", label: "Commercial", type: "group" },
    { id: "regulatory", label: "Regulatory", type: "group" },
  ]},
};

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "draft", label: "Draft" },
  { value: "expired", label: "Expired" },
];

const DURATION_OPTIONS = [
  { value: "1y", label: "1 year" },
  { value: "2y", label: "2 years" },
  { value: "3y", label: "3 years" },
  { value: "5y", label: "5 years" },
  { value: "10y", label: "10 years" },
];

const PARTNER_OPTIONS = [
  { value: "acme", label: "Acme Corp" },
  { value: "globex", label: "Globex" },
  { value: "initech", label: "Initech" },
];

const OPPORTUNITY_OPTIONS = [
  { value: "op1", label: "Private opportunity" },
  { value: "op2", label: "Product Launch" },
  { value: "op3", label: "R&D Collaboration" },
];

const ALLIANCE_OPTIONS = [
  { value: "al1", label: "Strategic Alliance A" },
  { value: "al2", label: "Research Consortium" },
];

const ACCESS_GROUPS = [
  { id: "academic", label: "Academic" },
  { id: "bd", label: "BD" },
  { id: "commercial", label: "Commercial" },
  { id: "mta", label: "MTA" },
  { id: "regulatory", label: "Regulatory" },
  { id: "research", label: "Research collaboration" },
  { id: "supply", label: "Supply" },
];

const ACCESS_USERS = [
  { id: "alexandra", label: "Alexandra Johnson", initials: "AJ" },
  { id: "alice", label: "Alice Johnson", initials: "AJ" },
  { id: "saha", label: "Saha Relly", initials: "SR" },
];

// ─────────────────────────────────────────────
// ACCESS FIELD COMPONENT
// ─────────────────────────────────────────────

const AccessField = ({ selected, onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = (id, label, type) => {
    const exists = selected.find((s) => s.id === id);
    if (exists) {
      onChange(selected.filter((s) => s.id !== id));
    } else {
      onChange([...selected, { id, label, type }]);
    }
  };

  const remove = (id) => onChange(selected.filter((s) => s.id !== id));

  const filteredGroups = ACCESS_GROUPS.filter((g) =>
    g.label.toLowerCase().includes(search.toLowerCase())
  );
  const filteredUsers = ACCESS_USERS.filter((u) =>
    u.label.toLowerCase().includes(search.toLowerCase())
  );

  const isChecked = (id) => selected.some((s) => s.id === id);

  return (
    <div style={fieldStyles.wrapper}>
      <span style={fieldStyles.label}>Access</span>
      <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
        {/* Trigger container with chips */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-sm)",
            padding: "var(--spacing-xs) var(--spacing-sm)",
            minHeight: 36,
            background: "var(--color-general-white)",
            borderRadius: "var(--radius-md)",
            outline: open
              ? "2px solid var(--color-interaction-outline-active)"
              : "1px solid var(--color-interaction-outline-enabled)",
            outlineOffset: -1,
            cursor: "pointer",
            boxSizing: "border-box",
            flexWrap: "wrap",
          }}
          onClick={() => setOpen((v) => !v)}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-xs)", flex: 1, alignItems: "center" }}>
            {selected.map((s) => (
              <div
                key={s.id}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "2px 6px",
                  background: "var(--color-general-neutral-lighter)",
                  borderRadius: "var(--radius-sm)",
                  outline: "1px solid var(--color-action-outline-secondary-enabled)",
                  outlineOffset: -1,
                  fontFamily: "var(--font-family-primary)",
                  fontSize: "var(--text-body-md)",
                  color: "var(--color-content-primary)",
                }}
              >
                {s.type === "user" ? (
                  <Avatar name={s.label} size="xs" />
                ) : (
                  <Icon name="UserGroup" size="sm" color="var(--color-content-secondary)" />
                )}
                {s.label}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); remove(s.id); }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    color: "var(--color-content-secondary)",
                  }}
                >
                  <Icon name="XCircle" variant="fill" size="sm" />
                </button>
              </div>
            ))}
            {selected.length === 0 && (
              <span style={{ color: "var(--color-content-tertiary)", fontSize: "var(--text-body-md)", fontFamily: "var(--font-family-primary)" }}>
                Search groups or users...
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
            {selected.length > 0 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onChange([]); }}
                style={{ background: "transparent", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", padding: 0, color: "var(--color-content-secondary)" }}
              >
                <Icon name="XCircle" variant="fill" size="sm" />
              </button>
            )}
            <Icon name={open ? "ChevronUp" : "ChevronDown"} size="sm" color="var(--color-content-secondary)" />
          </div>
        </div>

        {/* Dropdown */}
        {open && (
          <div style={{ position: "absolute", bottom: "calc(100% + 4px)", left: 0, right: 0, zIndex: 1000 }}>
            <DropdownList
              searchPlaceholder="Search"
              noAdd
              onSearch={setSearch}
            >
              <DropdownSection title="Access Groups">
                {filteredGroups.map((g) => (
                  <DropdownListItem
                    key={g.id}
                    value={g.id}
                    checked={isChecked(g.id)}
                    icon={<Icon name="UserGroup" size="sm" color="var(--color-content-secondary)" />}
                    onChange={() => toggle(g.id, g.label, "group")}
                  >
                    {g.label}
                  </DropdownListItem>
                ))}
              </DropdownSection>
              <DropdownSection title="Users">
                {filteredUsers.map((u) => (
                  <DropdownListItem
                    key={u.id}
                    value={u.id}
                    checked={isChecked(u.id)}
                    icon={<Avatar name={u.label} size="xs" />}
                    onChange={() => toggle(u.id, u.label, "user")}
                  >
                    {u.label}
                  </DropdownListItem>
                ))}
              </DropdownSection>
            </DropdownList>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// PARTNER FIELD (chip input for partners)
// ─────────────────────────────────────────────

const PartnerField = ({ label, required, selected = [], onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isChecked = (id) => selected.some((s) => s.id === id);
  const toggle = (id, lbl) => {
    if (isChecked(id)) onChange(selected.filter((s) => s.id !== id));
    else onChange([...selected, { id, label: lbl }]);
  };
  const remove = (id) => onChange(selected.filter((s) => s.id !== id));

  const filtered = PARTNER_OPTIONS.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={fieldStyles.wrapper}>
      {label && (
        <span style={fieldStyles.label}>
          {label}
          {required && <span style={fieldStyles.required}>*</span>}
        </span>
      )}
      <div ref={ref} style={{ position: "relative" }}>
        <div
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 4,
            minHeight: 36,
            padding: "4px var(--spacing-sm)",
            background: "var(--color-general-white)",
            borderRadius: "var(--radius-md)",
            outline: open
              ? "2px solid var(--color-action-fill-primary-enabled)"
              : "1px solid var(--color-interaction-outline-enabled)",
            outlineOffset: -1,
            cursor: "pointer",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, flex: 1, alignItems: "center" }}>
            {selected.map((s) => (
              <div
                key={s.id}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "2px 6px",
                  background: "var(--color-general-neutral-lighter)",
                  borderRadius: "var(--radius-sm)",
                  outline: "1px solid var(--color-action-outline-secondary-enabled)",
                  outlineOffset: -1,
                  fontFamily: "var(--font-family-primary)",
                  fontSize: "var(--text-body-md)",
                  color: "var(--color-content-primary)",
                }}
              >
                <Icon name="BuildingOffice2" size="sm" color="var(--color-content-secondary)" />
                {s.label}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); remove(s.id); }}
                  style={{ display: "inline-flex", alignItems: "center", background: "transparent", border: "none", cursor: "pointer", padding: 0, color: "var(--color-content-secondary)" }}
                >
                  <Icon name="XCircle" variant="fill" size="sm" />
                </button>
              </div>
            ))}
            {selected.length === 0 && (
              <span style={{ color: "var(--color-content-tertiary)", fontSize: "var(--text-body-md)", fontFamily: "var(--font-family-primary)" }}>
                Select partners...
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
            {selected.length > 0 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onChange([]); }}
                style={{ background: "transparent", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", padding: 0, color: "var(--color-content-secondary)" }}
              >
                <Icon name="XCircle" variant="fill" size="sm" />
              </button>
            )}
            <Icon name="ChevronDown" size="sm" color="var(--color-content-secondary)" />
          </div>
        </div>

        {open && (
          <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 1000 }}>
            <DropdownList searchPlaceholder="Search" noAdd onSearch={setSearch}>
              <DropdownSection title="Companies">
                {filtered.map((o) => (
                  <DropdownListItem
                    key={o.value}
                    value={o.value}
                    checked={isChecked(o.value)}
                    icon={<Icon name="BuildingOffice2" size="sm" color="var(--color-content-secondary)" />}
                    onChange={() => toggle(o.value, o.label)}
                  >
                    {o.label}
                  </DropdownListItem>
                ))}
              </DropdownSection>
            </DropdownList>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// OPPORTUNITY FIELD (chip input for opportunities)
// ─────────────────────────────────────────────

const OpportunityField = ({ label, required, selected = [], onChange, error = false }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isChecked = (id) => selected.some((s) => s.id === id);
  const toggle = (id, label) => {
    if (isChecked(id)) onChange(selected.filter((s) => s.id !== id));
    else onChange([...selected, { id, label }]);
  };
  const remove = (id) => onChange(selected.filter((s) => s.id !== id));

  const filtered = OPPORTUNITY_OPTIONS.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={fieldStyles.wrapper}>
      {label && (
        <span style={fieldStyles.label}>
          {label}
          {required && <span style={fieldStyles.required}>*</span>}
        </span>
      )}
      <div ref={ref} style={{ position: "relative" }}>
        <div
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 4,
            minHeight: 36,
            padding: "4px var(--spacing-sm)",
            background: "var(--color-general-white)",
            borderRadius: "var(--radius-md)",
            outline: open
              ? "2px solid var(--color-action-fill-primary-enabled)"
              : error
              ? "1px solid var(--color-content-negative)"
              : "1px solid var(--color-interaction-outline-enabled)",
            outlineOffset: -1,
            cursor: "pointer",
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, flex: 1, alignItems: "center" }}>
            {selected.map((s) => (
              <div
                key={s.id}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "2px 6px",
                  background: "var(--color-general-neutral-lighter)",
                  borderRadius: "var(--radius-sm)",
                  outline: "1px solid var(--color-action-outline-secondary-enabled)",
                  outlineOffset: -1,
                  fontFamily: "var(--font-family-primary)",
                  fontSize: "var(--text-body-md)",
                  color: "var(--color-content-primary)",
                }}
              >
                <Icon name="DocumentText" size="sm" color="var(--color-content-secondary)" />
                {s.label}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); remove(s.id); }}
                  style={{ display: "inline-flex", alignItems: "center", background: "transparent", border: "none", cursor: "pointer", padding: 0, color: "var(--color-content-secondary)" }}
                >
                  <Icon name="XCircle" variant="fill" size="sm" />
                </button>
              </div>
            ))}
            {selected.length === 0 && (
              <span style={{ color: "var(--color-content-tertiary)", fontSize: "var(--text-body-md)", fontFamily: "var(--font-family-primary)" }}>
                Select options...
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
            {selected.length > 0 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onChange([]); }}
                style={{ background: "transparent", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", padding: 0, color: "var(--color-content-secondary)" }}
              >
                <Icon name="XCircle" variant="fill" size="sm" />
              </button>
            )}
            <Icon name="ChevronDown" size="sm" color="var(--color-content-secondary)" />
          </div>
        </div>

        {open && (
          <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 1000 }}>
            <DropdownList searchPlaceholder="Search" noAdd onSearch={setSearch}>
              <DropdownSection title="Opportunities">
                {filtered.map((o) => (
                  <DropdownListItem
                    key={o.value}
                    value={o.value}
                    checked={isChecked(o.value)}
                    icon={<Icon name="DocumentText" size="sm" color="var(--color-content-secondary)" />}
                    onChange={() => toggle(o.value, o.label)}
                  >
                    {o.label}
                  </DropdownListItem>
                ))}
              </DropdownSection>
            </DropdownList>
          </div>
        )}
      </div>
    </div>
  );
};

export const AddAgreementModal = ({ open, onClose, hideAlliance = false, opportunityUnderPartners = false, defaultOpportunities = [], defaultAccessControl = "public", defaultAccessSelected = [], lockAccess = false, accessTooltip }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState(null);
  const [definitionStatus, setDefinitionStatus] = useState("active");
  const [partner, setPartner] = useState([]);
  const [opportunities, setOpportunities] = useState(defaultOpportunities);
  const [opportunitiesTouched, setOpportunitiesTouched] = useState(false);
  const [alliances, setAlliances] = useState([]);
  const [accessControl, setAccessControl] = useState(defaultAccessControl);
  const [accessSelected, setAccessSelected] = useState(defaultAccessSelected);

  const handleTypeChange = (value) => {
    setType(value);
    const shouldLock = lockAccess && opportunities.length > 0;
    if (!shouldLock) {
      const defaults = TYPE_ACCESS_DEFAULTS[value];
      if (defaults) {
        setAccessControl(defaults.control);
        setAccessSelected(defaults.groups);
      }
    }
  };

  useEffect(() => {
    if (lockAccess && opportunities.length === 0 && type) {
      const defaults = TYPE_ACCESS_DEFAULTS[type];
      if (defaults) {
        setAccessControl(defaults.control);
        setAccessSelected(defaults.groups);
      }
    }
  }, [opportunities]);
  const [validityStatus, setValidityStatus] = useState("active");
  const [effectiveDate, setEffectiveDate] = useState(null);
  const [duration, setDuration] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [documentFormat, setDocumentFormat] = useState("none");

  const handleConfirm = () => {
    onClose?.();
  };

  const StatusPrefix = ({ status }) => (
    <Badge color={status === "active" ? "positive" : status === "draft" ? "neutral" : "disabled"} size="sm" icon>
      {status === "active" ? "Active" : status === "draft" ? "Draft" : "Inactive"}
    </Badge>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add agreement"
      size="lg"
      style={{ maxWidth: 600 }}
      primaryLabel="Confirm"
      tertiaryLabel="Cancel"
      onPrimaryClick={handleConfirm}
      onTertiaryClick={onClose}
    >
      {/* Definition */}
      <SectionHeading>Definition</SectionHeading>

      <TextInput
        label="Name"
        isRequired
        size="sm"
        placeholder="Enter name"
        value={name}
        autoComplete="off"
        onChange={(e) => setName(e.target.value)}
      />

      <PartnerField
        label="Partners"
        required
        selected={partner}
        onChange={setPartner}
      />

      {opportunityUnderPartners && (
        <OpportunityField
          label="Opportunities"
          required
          selected={opportunities}
          onChange={(v) => { setOpportunities(v); setOpportunitiesTouched(true); }}
          error={opportunitiesTouched && opportunities.length === 0}
        />
      )}

      {(!opportunityUnderPartners || !hideAlliance) && (
        <div style={{ display: "flex", gap: "var(--spacing-4)" }}>
          {!opportunityUnderPartners && (
            <OpportunityField
              label="Opportunities"
              selected={opportunities}
              onChange={(v) => { setOpportunities(v); setOpportunitiesTouched(true); }}
            />
          )}
          {!hideAlliance && (
            <SelectField
              label="Alliances"
              placeholder="Select options"
              value={alliances[0] || null}
              options={ALLIANCE_OPTIONS}
              onChange={(v) => setAlliances([v])}
            />
          )}
        </div>
      )}

      <SelectField
        label="Type"
        required
        value={type}
        options={TYPE_OPTIONS}
        onChange={handleTypeChange}
      />

      {/* Access Control */}
      <SectionHeading info={accessTooltip || "Default access control is set by your admin based on agreement type"}>Access control</SectionHeading>

      <ButtonGroup value={accessControl} onChange={setAccessControl}>
        <ButtonGroupItem value="public">Public</ButtonGroupItem>
        <ButtonGroupItem value="private" iconName="LockClosed">Private</ButtonGroupItem>
      </ButtonGroup>

      {accessControl === "private" && (
        <AccessField selected={accessSelected} onChange={setAccessSelected} />
      )}

      {accessControl === "public" && (
        <div style={fieldStyles.wrapper}>
          <span style={fieldStyles.label}>Access</span>
          <div style={{ display: "inline-flex" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "2px 8px",
              background: "var(--color-general-neutral-lighter)",
              borderRadius: "var(--radius-sm)",
              outline: "1px solid var(--color-action-outline-secondary-enabled)",
              outlineOffset: -1,
              fontFamily: "var(--font-family-primary)",
              fontSize: "var(--text-body-md)",
              color: "var(--color-content-primary)",
            }}>
              All users
            </div>
          </div>
        </div>
      )}

      {/* Validity */}
      <SectionHeading>Validity</SectionHeading>

      <SelectField
        label="Status"
        required
        value={validityStatus}
        options={STATUS_OPTIONS}
        onChange={setValidityStatus}
      />

      <div style={{ display: "flex", gap: "var(--spacing-4)" }}>
        <DatePickerField
          label="Effective date"
          required
          value={effectiveDate}
          onChange={setEffectiveDate}
        />
        <SelectField
          label="Duration"
          value={duration}
          options={DURATION_OPTIONS}
          onChange={setDuration}
        />
        <DatePickerField
          label="Expiration date"
          placeholder="Select date"
          value={expirationDate}
          onChange={setExpirationDate}
        />
      </div>

      {/* Document */}
      <SectionHeading>Document</SectionHeading>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
        <span style={fieldStyles.label}>Format</span>
        <RadioGroup
          name="document-format"
          value={documentFormat}
          onChange={setDocumentFormat}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
            <RadioButton value="none">None</RadioButton>
            <RadioButton value="file">File</RadioButton>
            <RadioButton value="link">Link</RadioButton>
          </div>
        </RadioGroup>
      </div>
    </Modal>
  );
};

// ─────────────────────────────────────────────
// PAGE WRAPPER (for demo/preview)
// ─────────────────────────────────────────────

export default function AddAgreementModalPage({ hideAlliance = false, opportunityUnderPartners = false, defaultOpportunities = [], defaultAccessControl = "public", defaultAccessSelected = [], lockAccess = false, accessTooltip }) {
  const [open, setOpen] = useState(true);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-general-neutral-lighter)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open Add Agreement
      </Button>
      <AddAgreementModal open={open} onClose={() => setOpen(false)} hideAlliance={hideAlliance} opportunityUnderPartners={opportunityUnderPartners} defaultOpportunities={defaultOpportunities} defaultAccessControl={defaultAccessControl} defaultAccessSelected={defaultAccessSelected} lockAccess={lockAccess} accessTooltip={accessTooltip} />
    </div>
  );
}
