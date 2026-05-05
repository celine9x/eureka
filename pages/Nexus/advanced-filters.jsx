import React, { useState, useRef, useLayoutEffect } from "react";
import { Tabs, Tab } from "../../library/molecules/tabs.jsx";
import TextInput from "../../library/molecules/text-input.jsx";
import ChipInput from "../../library/molecules/chip-input.jsx";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSection,
  DropdownMenuItem,
  DropdownMenuDivider,
} from "../../library/molecules/dropdown-menu.jsx";
import { Button } from "../../library/atoms/button.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { Chip } from "../../library/atoms/chip.jsx";
import { Tooltip } from "../../library/atoms/tooltip.jsx";
import MiniInfobox from "../../library/molecules/miniinfobox.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const SEARCH_FIELDS = [
  { id: "therapeutic-area", label: "Therapeutic area", icon: "Squares2X2" },
  { id: "drug-type", label: "Drug type", icon: "BeakerIcon" },
  { id: "target", label: "Target", icon: "AdjustmentsHorizontal" },
  { id: "mechanism", label: "Mechanism", icon: "Cog6Tooth" },
  { id: "clinical-indication", label: "Clinical indication", icon: "Heart" },
  { id: "development-phase", label: "Development phase", icon: "PencilSquare" },
  { id: "territories", label: "Territories", icon: "GlobeAlt" },
];

const CONDITION_SECTIONS = [
  [
    { id: "is-exactly", label: "is exactly" },
    { id: "is-exactly-not", label: "is exactly not" },
  ],
  [
    { id: "contains", label: "contains" },
    { id: "starts-with", label: "starts with" },
    { id: "ends-with", label: "ends with" },
  ],
  [
    { id: "has-any-of", label: "has any of" },
    { id: "has-all-of", label: "has all of" },
    { id: "has-none-of", label: "has none of" },
  ],
  [
    { id: "is-empty", label: "is empty" },
    { id: "is-not-empty", label: "is not empty" },
  ],
];

const ALL_CONDITIONS = CONDITION_SECTIONS.flat();

// Text-only fields (value is free text): only text-condition-type logic applies for all fields
const TEXT_FIELDS = [];

const FIELD_OPTIONS = {
  "therapeutic-area": [
    { id: "anticancer", label: "Anticancer" },
    { id: "cancer", label: "Cancer" },
    { id: "oncology", label: "Oncology" },
    { id: "immunology", label: "Immunology" },
    { id: "neurology", label: "Neurology" },
    { id: "cardiovascular", label: "Cardiovascular" },
    { id: "infectious-disease", label: "Infectious disease" },
    { id: "rare-disease", label: "Rare disease" },
    { id: "metabolic", label: "Metabolic" },
    { id: "respiratory", label: "Respiratory" },
    { id: "hematology", label: "Hematology" },
    { id: "dermatology", label: "Dermatology" },
    { id: "ophthalmology", label: "Ophthalmology" },
    { id: "gastroenterology", label: "Gastroenterology" },
    { id: "rheumatology", label: "Rheumatology" },
  ],
  "drug-type": [
    { id: "small-molecule", label: "Small molecule" },
    { id: "biologic", label: "Biologic" },
    { id: "monoclonal-antibody", label: "Monoclonal antibody" },
    { id: "bispecific-antibody", label: "Bispecific antibody" },
    { id: "adc", label: "Antibody-drug conjugate (ADC)" },
    { id: "gene-therapy", label: "Gene therapy" },
    { id: "cell-therapy", label: "Cell therapy" },
    { id: "rna-therapy", label: "RNA therapy" },
    { id: "peptide", label: "Peptide" },
    { id: "vaccine", label: "Vaccine" },
    { id: "radiopharmaceutical", label: "Radiopharmaceutical" },
  ],
  target: [
    { id: "pd-1", label: "PD-1" },
    { id: "pd-l1", label: "PD-L1" },
    { id: "ctla-4", label: "CTLA-4" },
    { id: "her2", label: "HER2" },
    { id: "vegf", label: "VEGF" },
    { id: "vegfr", label: "VEGFR" },
    { id: "egfr", label: "EGFR" },
    { id: "cd19", label: "CD19" },
    { id: "cd20", label: "CD20" },
    { id: "cd38", label: "CD38" },
    { id: "bcma", label: "BCMA" },
    { id: "kras", label: "KRAS" },
    { id: "braf", label: "BRAF" },
    { id: "mek", label: "MEK" },
    { id: "alk", label: "ALK" },
    { id: "ros1", label: "ROS1" },
    { id: "lag-3", label: "LAG-3" },
    { id: "tim-3", label: "TIM-3" },
    { id: "tigit", label: "TIGIT" },
  ],
  mechanism: [
    { id: "checkpoint-inhibitor", label: "Checkpoint inhibitor" },
    { id: "monoclonal-antibody", label: "Monoclonal antibody" },
    { id: "kinase-inhibitor", label: "Kinase inhibitor" },
    { id: "car-t", label: "CAR-T cell therapy" },
    { id: "proteasome-inhibitor", label: "Proteasome inhibitor" },
    { id: "parp-inhibitor", label: "PARP inhibitor" },
    { id: "cdk-inhibitor", label: "CDK inhibitor" },
    { id: "btk-inhibitor", label: "BTK inhibitor" },
    { id: "pi3k-inhibitor", label: "PI3K inhibitor" },
    { id: "hdac-inhibitor", label: "HDAC inhibitor" },
    { id: "bcl2-inhibitor", label: "BCL-2 inhibitor" },
    { id: "angiogenesis-inhibitor", label: "Angiogenesis inhibitor" },
    { id: "immunomodulator", label: "Immunomodulator" },
    { id: "hormone-therapy", label: "Hormone therapy" },
  ],
  "development-phase": [
    { id: "discovery", label: "Discovery" },
    { id: "preclinical", label: "Preclinical" },
    { id: "ind-filed", label: "IND Filed" },
    { id: "phase-1", label: "Phase 1 Clinical" },
    { id: "phase-1-2", label: "Phase 1/2 Clinical" },
    { id: "phase-2", label: "Phase 2 Clinical" },
    { id: "phase-2-3", label: "Phase 2/3 Clinical" },
    { id: "phase-3", label: "Phase 3 Clinical" },
    { id: "nda-bla-filed", label: "NDA/BLA Filed" },
    { id: "approved", label: "Approved" },
    { id: "post-market", label: "Post-market" },
  ],
  territories: [
    { id: "us", label: "United States" },
    { id: "eu", label: "European Union" },
    { id: "uk", label: "United Kingdom" },
    { id: "jp", label: "Japan" },
    { id: "cn", label: "China" },
    { id: "ca", label: "Canada" },
    { id: "au", label: "Australia" },
    { id: "kr", label: "South Korea" },
    { id: "br", label: "Brazil" },
    { id: "in", label: "India" },
    { id: "global", label: "Global" },
    { id: "row", label: "Rest of World" },
  ],
};

// ─────────────────────────────────────────────
// SHARED INPUT-STYLE TRIGGER
// ─────────────────────────────────────────────

const inputTriggerBase = {
  display: "inline-flex",
  alignItems: "center",
  height: 32,
  padding: "0 var(--spacing-sm)",
  background: "var(--color-general-white)",
  borderRadius: "var(--radius-md)",
  border: "none",
  outline: "1px solid var(--color-interaction-outline-enabled)",
  outlineOffset: "-1px",
  fontFamily: "var(--font-family-primary)",
  fontSize: "var(--text-body-md)",
  color: "var(--color-content-primary)",
  cursor: "pointer",
  justifyContent: "space-between",
  transition: "all var(--transition-fast)",
  boxSizing: "border-box",
};

const InputTrigger = React.forwardRef(({ children, style, ...props }, ref) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      ref={ref}
      style={{
        ...inputTriggerBase,
        ...(hovered && {
          outline: "1px solid var(--color-interaction-outline-hover)",
          outlineOffset: "-1px",
        }),
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
});

// ─────────────────────────────────────────────
// LOGIC OPERATOR TOGGLE (Where / And / Or)
// ─────────────────────────────────────────────

const LOGIC_OPTIONS = ["Where", "And", "Or"];

const LogicDropdown = ({ value, onChange, disabled }) => {
  const [open, setOpen] = useState(false);

  if (value === "Where") {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 64,
          height: 32,
          padding: "0 var(--spacing-sm)",
          background: "var(--color-general-neutral-light)",
          borderRadius: "var(--radius-md)",
          fontFamily: "var(--font-family-primary)",
          fontSize: "var(--text-body-md)",
          fontWeight: "var(--font-weight-regular)",
          color: "var(--color-content-secondary)",
        }}
      >
        Where
      </div>
    );
  }

  if (disabled) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "flex-start",
          minWidth: 64,
          height: 32,
          padding: "0 var(--spacing-sm)",
          background: "var(--color-general-neutral-light)",
          borderRadius: "var(--radius-md)",
          fontFamily: "var(--font-family-primary)",
          fontSize: "var(--text-body-md)",
          fontWeight: "var(--font-weight-regular)",
          color: "var(--color-content-secondary)",
        }}
      >
        {value}
      </div>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <InputTrigger style={{ minWidth: 64, gap: "var(--spacing-xs)" }}>
          {value}
          <Icon name="ChevronDown" size={12} />
        </InputTrigger>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="left" position="bottom" width={100}>
        <DropdownMenuSection>
          {LOGIC_OPTIONS.filter((o) => o !== "Where").map((op) => (
            <DropdownMenuItem
              key={op}
              label={op}
              active={op === value}
              onClick={() => {
                onChange(op);
                setOpen(false);
              }}
            />
          ))}
        </DropdownMenuSection>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ─────────────────────────────────────────────
// FIELD SELECTOR DROPDOWN
// ─────────────────────────────────────────────

const FieldDropdown = ({ value, onChange, usedFields = [] }) => {
  const [open, setOpen] = useState(false);
  const selected = SEARCH_FIELDS.find((f) => f.id === value);
  const availableFields = SEARCH_FIELDS.filter((f) => f.id === value || !usedFields.includes(f.id));

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <InputTrigger style={{ minWidth: 180, gap: "var(--spacing-sm)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-xs)", flex: 1 }}>
            {selected && <Icon name={selected.icon} size={14} />}
            <span>{selected ? selected.label : "Select field"}</span>
          </span>
          <Icon name="ChevronDown" size={12} />
        </InputTrigger>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="left" position="bottom" width={220}>
        <DropdownMenuSection>
          {availableFields.map((field) => (
            <DropdownMenuItem
              key={field.id}
              label={field.label}
              iconName={field.icon}
              active={field.id === value}
              onClick={() => {
                onChange(field.id);
                setOpen(false);
              }}
            />
          ))}
        </DropdownMenuSection>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ─────────────────────────────────────────────
// CONDITION SELECTOR DROPDOWN
// ─────────────────────────────────────────────

const ConditionDropdown = ({ value, fieldId, onChange }) => {
  const [open, setOpen] = useState(false);
  const selected = ALL_CONDITIONS.find((o) => o.id === value) || ALL_CONDITIONS.find((o) => o.id === "has-any-of");

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <InputTrigger style={{ minWidth: 120, gap: "var(--spacing-xs)" }}>
          {selected.label}
          <Icon name="ChevronDown" size={12} />
        </InputTrigger>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="left" position="bottom" width={200}>
        {CONDITION_SECTIONS.map((section, si) => (
          <React.Fragment key={si}>
            {si > 0 && <DropdownMenuDivider />}
            <DropdownMenuSection style={{ padding: 0 }}>
              {section.map((opt) => (
                <DropdownMenuItem
                  key={opt.id}
                  label={opt.label}
                  active={opt.id === selected.id}
                  onClick={() => {
                    onChange(opt.id);
                    setOpen(false);
                  }}
                />
              ))}
            </DropdownMenuSection>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ─────────────────────────────────────────────
// VALUE INPUT (text or chip select)
// ─────────────────────────────────────────────

const ValueInput = ({ fieldId, conditionId, value, onChange }) => {
  const noValueConditions = ["is-empty", "is-not-empty"];
  if (noValueConditions.includes(conditionId)) return null;

  const textConditions = ["contains", "starts-with", "ends-with"];
  const isTextField = TEXT_FIELDS.includes(fieldId) || textConditions.includes(conditionId);

  if (isTextField) {
    return (
      <TextInput
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter value"
        size="sm"
        style={{ width: "100%" }}
      />
    );
  }

  return <ChipSelectInput fieldId={fieldId} value={value} onChange={onChange} />;
};

const ChipSelectInput = ({ fieldId, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [hovered, setHovered] = useState(false);
  const [overflowTooltipVisible, setOverflowTooltipVisible] = useState(false);
  const wrapperRef = useRef(null);
  const chipRowRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(null);
  const options = FIELD_OPTIONS[fieldId] || [];
  const selected = value || [];

  const filtered = options.filter(
    (o) => !selected.includes(o.id) && o.label.toLowerCase().includes(search.toLowerCase())
  );

  const removeChip = (id) => onChange(selected.filter((s) => s !== id));
  const addChip = (id) => {
    onChange([...selected, id]);
    setSearch("");
  };
  // free-text entry (when no predefined options match)
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && search.trim() && options.length === 0) {
      const newId = search.trim().toLowerCase().replace(/\s+/g, "-");
      if (!selected.includes(newId)) onChange([...selected, newId]);
      setSearch("");
    }
  };

  // Close on outside click
  React.useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const chips = selected.map((id) => {
    const opt = options.find((o) => o.id === id);
    return { id, label: opt ? opt.label : id };
  });

  // Compute how many chips fit in one row
  useLayoutEffect(() => {
    if (!chipRowRef.current || chips.length === 0) {
      setVisibleCount(null);
      return;
    }
    const container = chipRowRef.current;
    const containerWidth = container.offsetWidth;
    const children = Array.from(container.querySelectorAll("[data-chip]"));
    if (children.length === 0) { setVisibleCount(null); return; }
    let usedWidth = 0;
    let count = 0;
    // Reserve space for the badge if not all chips fit
    const BADGE_WIDTH = 40;
    for (let i = 0; i < children.length; i++) {
      const w = children[i].offsetWidth + 4; // 4px gap
      const remaining = children.length - i - 1;
      const needsBadge = remaining > 0 && (usedWidth + w + (remaining > 0 ? BADGE_WIDTH : 0)) > containerWidth;
      if (usedWidth + w > containerWidth || needsBadge) {
        break;
      }
      usedWidth += w;
      count++;
    }
    setVisibleCount(count < chips.length ? count : null);
  }, [chips.length, open]);

  const displayChips = visibleCount !== null ? chips.slice(0, visibleCount) : chips;
  const hiddenChips = visibleCount !== null ? chips.slice(visibleCount) : [];

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
      {/* Trigger / chip display */}
      <div
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-xs)",
          height: 32,
          padding: "0 var(--spacing-sm)",
          background: "var(--color-general-white)",
          borderRadius: "var(--radius-md)",
          outline: hovered && !open
            ? "1px solid var(--color-interaction-outline-hover)"
            : open
            ? "1px solid var(--color-interaction-outline-active)"
            : "1px solid var(--color-interaction-outline-enabled)",
          outlineOffset: "-1px",
          cursor: "pointer",
          boxSizing: "border-box",
          width: "100%",
          transition: "all var(--transition-fast)",
          overflow: "hidden",
        }}
      >
        {chips.length === 0 && (
          <span
            style={{
              flex: 1,
              fontFamily: "var(--font-family-primary)",
              fontSize: "var(--text-body-md)",
              color: "var(--color-content-tertiary)",
            }}
          >
            Select options
          </span>
        )}
        {chips.length > 0 && (
          <div
            ref={chipRowRef}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 4,
              overflow: "hidden",
              minWidth: 0,
            }}
          >
            {displayChips.map((chip) => (
              <span key={chip.id} data-chip style={{ flexShrink: 0, borderRadius: "var(--radius-xs)", overflow: "hidden" }}>
                <Chip
                  size="md"
                  removable
                  onRemove={(e) => { e && e.stopPropagation(); removeChip(chip.id); }}
                  style={{ borderRadius: "var(--radius-xs)" }}
                >
                  {chip.label}
                </Chip>
              </span>
            ))}
            {hiddenChips.length > 0 && (
              <Tooltip
                content={
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {hiddenChips.map((c) => <div key={c.id}>{c.label}</div>)}
                  </div>
                }
                placement="bottom-left"
              >
                <span
                  style={{
                    flexShrink: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "var(--spacing-xs)",
                    background: "var(--color-general-neutral-lighter)",
                    borderRadius: "var(--radius-xs)",
                    outline: "1px solid var(--color-action-outline-secondary-enabled)",
                    outlineOffset: "-1px",
                    boxShadow: "var(--shadow-light-down)",
                    fontFamily: "var(--font-family-primary)",
                    fontSize: "var(--text-body-md)",
                    lineHeight: "var(--line-height-body-md)",
                    color: "var(--color-content-secondary)",
                    whiteSpace: "nowrap",
                    cursor: "default",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  +{hiddenChips.length}
                </span>
              </Tooltip>
            )}
          </div>
        )}
        <span style={{ marginLeft: "auto", flexShrink: 0, color: "var(--color-content-secondary)" }}>
          <Icon name="ChevronDown" size={12} style={{ transform: open ? "rotate(180deg)" : undefined }} />
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 1000,
            background: "var(--color-general-white)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-action-outline-secondary-enabled)",
            boxShadow: "var(--shadow-medium-down)",
            overflow: "hidden",
            maxHeight: 260,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Search */}
          <div style={{ padding: "var(--spacing-sm)", borderBottom: "1px solid var(--color-action-outline-secondary-enabled)" }}>
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder={options.length === 0 ? "Type and press Enter to add..." : "Search..."}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                border: "1px solid var(--color-interaction-outline-enabled)",
                borderRadius: "var(--radius-sm)",
                padding: "4px 8px",
                fontFamily: "var(--font-family-primary)",
                fontSize: "var(--text-body-md)",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          {/* Options list */}
          <div style={{ overflowY: "auto", padding: "var(--spacing-xs) 0" }}>
            {options.length > 0 && filtered.length === 0 && (
              <div style={{
                padding: "var(--spacing-sm) var(--spacing-md)",
                fontFamily: "var(--font-family-primary)",
                fontSize: "var(--text-body-sm)",
                color: "var(--color-content-tertiary)",
              }}>
                No options found
              </div>
            )}
            {filtered.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={(e) => { e.stopPropagation(); addChip(opt.id); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  padding: "var(--spacing-sm) var(--spacing-md)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-family-primary)",
                  fontSize: "var(--text-body-md)",
                  color: "var(--color-content-primary)",
                  textAlign: "left",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-general-neutral-lighter)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "none"}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// ROW ACTIONS DROPDOWN (3-dot menu)
// ─────────────────────────────────────────────

const RowActionsMenu = ({ onConvertToGroup, onDelete, isGrouped }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="tertiary"
          size="sm"
          iconLeading={<Icon name="EllipsisVertical" size={16} />}
          style={{ flexShrink: 0 }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="right" position="bottom" width={180}>
        <DropdownMenuSection>
          {!isGrouped && (
            <DropdownMenuItem
              label="Convert into group"
              iconName="Squares2X2"
              onClick={() => {
                onConvertToGroup?.();
                setOpen(false);
              }}
            />
          )}
          <DropdownMenuItem
            label="Delete"
            iconName="Trash"
            variant="destructive"
            onClick={() => {
              onDelete?.();
              setOpen(false);
            }}
          />
        </DropdownMenuSection>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ─────────────────────────────────────────────
// CRITERION ROW
// ─────────────────────────────────────────────

let nextId = 1;
const genId = () => `row-${nextId++}`;

const CriterionRow = ({ row, index, isFirst, isLogicDisabled, isGrouped, onChange, onDelete, onConvertToGroup, usedFields = [] }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--spacing-sm)",
        flexWrap: "nowrap",
      }}
    >
      <LogicDropdown
        value={isFirst ? "Where" : row.logic}
        onChange={(logic) => onChange({ ...row, logic })}
        disabled={!isFirst && isLogicDisabled}
      />

      <FieldDropdown
        value={row.fieldId}
        onChange={(fieldId) => onChange({ ...row, fieldId, value: null })}
        usedFields={usedFields}
      />

      <ConditionDropdown
        value={row.conditionId}
        fieldId={row.fieldId}
        onChange={(conditionId) => {
          const textConditions = ["contains", "starts-with", "ends-with"];
          const noValueConditions = ["is-empty", "is-not-empty"];
          const isChip = (cid) => !textConditions.includes(cid) && !noValueConditions.includes(cid) && !TEXT_FIELDS.includes(row.fieldId);
          const isText = (cid) => textConditions.includes(cid) || TEXT_FIELDS.includes(row.fieldId);
          const keepValue = (isChip(row.conditionId) && isChip(conditionId)) || (isText(row.conditionId) && isText(conditionId));
          onChange({ ...row, conditionId, value: keepValue ? row.value : null });
        }}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <ValueInput
          fieldId={row.fieldId}
          conditionId={row.conditionId}
          value={row.value}
          onChange={(value) => onChange({ ...row, value })}
        />
      </div>

      {isGrouped ? (
        <Button
          variant="tertiary"
          size="sm"
          iconLeading={<Icon name="Trash" size={16} />}
          style={{ flexShrink: 0 }}
          onClick={onDelete}
        />
      ) : (
        <RowActionsMenu onDelete={onDelete} onConvertToGroup={onConvertToGroup} isGrouped={isGrouped} />
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// GROUP
// ─────────────────────────────────────────────

const CriteriaGroup = ({ group, groupIndex, onChange, onDeleteGroup }) => {
  const usedFields = group.rows.map((r) => r.fieldId).filter(Boolean);

  const groupLogic = group.rows[1]?.logic || "And";

  const addRow = () => {
    const nextField = SEARCH_FIELDS.find((f) => !usedFields.includes(f.id));
    onChange({
      ...group,
      rows: [...group.rows, { id: genId(), logic: groupLogic, fieldId: nextField?.id || "therapeutic-area", conditionId: "has-any-of", value: null }],
    });
  };

  const updateRow = (rowIndex, updated) => {
    let rows = [...group.rows];
    // If logic changed on row 1, sync all non-first rows
    if (rowIndex === 1 && updated.logic !== rows[rowIndex].logic) {
      rows = rows.map((r, i) => i === 0 ? r : { ...r, logic: updated.logic });
    } else {
      rows[rowIndex] = updated;
    }
    onChange({ ...group, rows });
  };

  const deleteRow = (rowIndex) => {
    const rows = group.rows.filter((_, i) => i !== rowIndex);
    onChange({ ...group, rows });
  };

  const groupHasIncomplete = group.rows.some(isRowIncomplete);

  return (
    <div
      style={{
        background: "var(--color-general-neutral-light)",
        borderRadius: "var(--radius-md)",
        padding: "var(--spacing-md)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-sm)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-body-sm)",
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--color-content-secondary)",
          }}
        >
          Group {groupIndex + 1}
        </div>
        <Button variant="tertiary" size="sm" onClick={onDeleteGroup}>
          Delete group
        </Button>
      </div>

      {group.rows.map((row, i) => (
        <CriterionRow
          key={row.id}
          row={row}
          index={i}
          isFirst={i === 0}
          isLogicDisabled={i > 1}
          isGrouped
          onChange={(updated) => updateRow(i, updated)}
          onDelete={() => deleteRow(i)}
          usedFields={usedFields}
        />
      ))}

      <Tooltip
        content="You have an incomplete search criteria"
        placement="bottom-left"
        isDisabled={!groupHasIncomplete}
      >
        <div style={{ display: "inline-flex" }}>
          <Button
            variant="tertiary"
            size="md"
            iconLeading={<Icon name="Plus" size={14} />}
            onClick={groupHasIncomplete ? undefined : addRow}
            style={{
              cursor: groupHasIncomplete ? "not-allowed" : "pointer",
              opacity: groupHasIncomplete ? 0.5 : 1,
              pointerEvents: "auto",
            }}
          >
            Add search criteria
          </Button>
        </div>
      </Tooltip>


    </div>
  );
};

// ─────────────────────────────────────────────
// VALIDATION
// ─────────────────────────────────────────────

const isRowIncomplete = (row) => {
  const noValueConditions = ["is-empty", "is-not-empty"];
  if (!row.fieldId || !row.conditionId) return true;
  if (!noValueConditions.includes(row.conditionId)) {
    const isTextField = TEXT_FIELDS.includes(row.fieldId);
    if (isTextField && !row.value) return true;
    if (!isTextField && (!row.value || row.value.length === 0)) return true;
  }
  return false;
};

// ─────────────────────────────────────────────
// ADVANCED SEARCH TAB
// ─────────────────────────────────────────────

const AdvancedSearchTab = () => {
  const [items, setItems] = useState([
    { type: "row", id: genId(), logic: "Where", fieldId: "therapeutic-area", conditionId: "has-any-of", value: null },
  ]);
  const [searchName, setSearchName] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const rows = items.filter((it) => it.type === "row");
  const groups = items.filter((it) => it.type === "group");

  const topLevelLogic = items[1]?.logic || "Or";

  const addRow = () => {
    const usedFields = rows.map((r) => r.fieldId).filter(Boolean);
    const nextField = SEARCH_FIELDS.find((f) => !usedFields.includes(f.id));
    setItems((prev) => [
      ...prev,
      { type: "row", id: genId(), logic: topLevelLogic, fieldId: nextField?.id || "therapeutic-area", conditionId: "has-any-of", value: null },
    ]);
  };

  const updateItem = (id, updated) => {
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.id === id);
      // If logic changed on item at index 1, sync all non-first items
      if (idx === 1 && updated.logic !== undefined && updated.logic !== prev[idx].logic) {
        return prev.map((it, i) => i === 0 ? it : { ...it, logic: updated.logic });
      }
      return prev.map((it) => (it.id === id ? { ...it, ...updated } : it));
    });
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const convertRowToGroup = (id) => {
    setItems((prev) => prev.map((it) => {
      if (it.id !== id) return it;
      return { type: "group", id: it.id, logic: it.logic, rows: [{ ...it, type: "row", logic: "Where" }] };
    }));
  };

  const hasIncomplete = rows.some(isRowIncomplete) || groups.some((g) => g.rows.some(isRowIncomplete));
  const isEmpty = items.length === 0;
  const hasAtLeastOneComplete = rows.some((r) => !isRowIncomplete(r)) || groups.some((g) => g.rows.some((r) => !isRowIncomplete(r)));
  const canGenerate = hasAtLeastOneComplete && searchName.trim();

  const handleGenerate = () => {
    setShowValidation(true);
    if (canGenerate) {
      alert(`Generating results for: ${searchName}`);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
      {/* Criteria rows */}
      <div
        style={{
          background: "var(--color-general-neutral-lighter)",
          border: "1px solid var(--color-action-outline-secondary-enabled)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--spacing-md)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-sm)",
        }}
      >
        {items.map((item, i) => {
          const isFirst = i === 0;
          if (item.type === "row") {
            const usedFields = rows.map((r) => r.fieldId).filter(Boolean);
            return (
              <CriterionRow
                key={item.id}
                row={item}
                index={i}
                isFirst={isFirst}
                isLogicDisabled={i > 1}
                onChange={(updated) => updateItem(item.id, updated)}
                onDelete={() => deleteItem(item.id)}
                onConvertToGroup={() => convertRowToGroup(item.id)}
                usedFields={usedFields}
              />
            );
          }
          // group
          return (
            <div key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: "var(--spacing-sm)" }}>
              {!isFirst && (
                <div style={{ flexShrink: 0, paddingTop: 4 }}>
                  <LogicDropdown
                    value={item.logic || "Or"}
                    onChange={(logic) => updateItem(item.id, { logic })}
                    disabled={i > 1}
                  />
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <CriteriaGroup
                  group={item}
                  groupIndex={groups.indexOf(item)}
                  onChange={(updated) => updateItem(item.id, updated)}
                  onDeleteGroup={() => deleteItem(item.id)}
                />
              </div>
            </div>
          );
        })}

        {showValidation && hasIncomplete && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--spacing-xs)",
              background: "var(--color-content-primary)",
              color: "var(--color-general-white)",
              borderRadius: "var(--radius-md)",
              padding: "var(--spacing-xs) var(--spacing-sm)",
              fontFamily: "var(--font-family-primary)",
              fontSize: "var(--text-body-sm)",
              alignSelf: "flex-start",
            }}
          >
            You have an incomplete search criteria
          </div>
        )}

        <Tooltip
          content="You have an incomplete search criteria"
          placement="bottom-left"
          isDisabled={!hasIncomplete}
        >
          <div style={{ display: "inline-flex", alignSelf: "flex-start" }}>
            <Button
              variant="tertiary"
              size="md"
              iconLeading={<Icon name="Plus" size={14} />}
              onClick={hasIncomplete ? undefined : addRow}
              style={{
                cursor: hasIncomplete ? "not-allowed" : "pointer",
                opacity: hasIncomplete ? 0.5 : 1,
                pointerEvents: "auto",
              }}
            >
              Add search criteria
            </Button>
          </div>
        </Tooltip>
      </div>

      {/* Name input + generate */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-md)" }}>
          <div style={{ flex: 1 }}>
            <TextInput
              label="Name this search"
              isRequired
              size="sm"
              placeholder="Input the name of this search"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div style={{ flexShrink: 0, marginTop: 20 }}>
            <Button variant="primary" iconLeading={<Icon name="SparklesSolid" size={16} />} disabled={!canGenerate} onClick={handleGenerate}>
              Generate results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// BASIC SEARCH TAB
// ─────────────────────────────────────────────

const BASIC_FIELDS = [
  { id: "therapeutic-area", label: "Therapeutic area", placeholder: "Select therapeutic area" },
  { id: "drug-type", label: "Drug type", placeholder: "Select drug type" },
  { id: "target", label: "Target", placeholder: "Select target" },
  { id: "mechanism", label: "Mechanism", placeholder: "Select mechanisms" },
  { id: "indication", label: "Indication", placeholder: "Select indications" },
  { id: "development-phase", label: "Development phase", placeholder: "Select development phases" },
  { id: "territories", label: "Territories", placeholder: "Select territories" },
];

const BasicSearchTab = () => {
  const [values, setValues] = useState({});
  const [searchName, setSearchName] = useState("");

  const setField = (fieldId, chips) => {
    setValues((prev) => ({ ...prev, [fieldId]: chips }));
  };

  const hasAnyCriteria = Object.values(values).some((v) => v && v.length > 0);
  const canGenerate = hasAnyCriteria && searchName.trim();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "var(--spacing-md)",
        }}
      >
        {BASIC_FIELDS.map((field) => (
          <ChipInput
            key={field.id}
            label={field.label}
            placeholder={field.placeholder}
            chips={values[field.id] || []}
            onChange={(chips) => setField(field.id, chips)}
            options={FIELD_OPTIONS[field.id] || []}
          />
        ))}
      </div>

      {/* Name input + generate */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-md)" }}>
        <div style={{ flex: 1 }}>
          <TextInput
            label="Name this search"
            isRequired
            size="sm"
            placeholder="Input the name of this search"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div style={{ flexShrink: 0, marginTop: 20 }}>
          <Button
            variant="primary"
            iconLeading={<Icon name="SparklesSolid" size={16} />}
            disabled={!canGenerate}
            onClick={() => canGenerate && alert(`Generating results for: ${searchName}`)}
          >
            Generate results
          </Button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export const AdvancedFiltersPage = () => {
  const [tab, setTab] = useState("advanced");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-general-neutral-light)",
        boxSizing: "border-box",
        fontFamily: "var(--font-family-primary)",
        paddingTop: 48, 
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-md)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-heading-h2)",
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--color-content-primary)",
          }}
        >
          Define search criteria
        </div>

        {/* Hint */}
        <MiniInfobox >
           To generate results, please enter a search name and select at least one criteria
        </MiniInfobox>
    

        <Tabs selectedKey={tab} onSelectionChange={setTab}>
          <Tab id="basic">Basic search</Tab>
          <Tab id="advanced">Advanced search</Tab>
        </Tabs>

        {tab === "basic" && <BasicSearchTab />}
        {tab === "advanced" && <AdvancedSearchTab />}
      </div>
    </div>
  );
};

export default AdvancedFiltersPage;
