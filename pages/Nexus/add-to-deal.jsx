import { useState, useRef, useEffect } from "react";
import { Button } from "../../library/atoms/button.jsx";
import { Infobox } from "../../library/molecules/infobox.jsx";
import { TextInput } from "../../library/molecules/text-input.jsx";
import { DropdownList, DropdownListItem } from "../../library/molecules/dropdown-list.jsx";
import { Icon } from "../../library/atoms/icon.jsx";

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// MOCK DATA
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const DATA_SOURCES = [
  { value: "clarivate", label: "Clarivate" },
  { value: "cortellis", label: "Cortellis" },
  { value: "evaluate", label: "Evaluate Pharma" },
];

const ASSETS_BY_SOURCE = {
  clarivate: [
    { value: "tipifarnib", label: "Tipifarnib" },
    { value: "selumetinib", label: "Selumetinib" },
  ],
  cortellis: [
    { value: "inavolisib", label: "Inavolisib" },
    { value: "adagrasib", label: "Adagrasib" },
  ],
  evaluate: [
    { value: "sotorasib", label: "Sotorasib" },
    { value: "osimertinib", label: "Osimertinib" },
  ],
};

const COMPANIES_SINGLE = [
  { value: "chameleon", label: "Chameleon Development Lic", subinfo: "2 opportunities Â· United States" },
];

const COMPANIES_MULTIPLE = [
  { value: "chameleon", label: "Chameleon Development Lic", subinfo: "2 opportunities Â· United States" },
  { value: "expression", label: "Expression Therapeutics", subinfo: "2 opportunities Â· UK" },
  { value: "novartis", label: "Novartis", subinfo: "1 opportunity Â· Switzerland" },
];

const COMPANIES_BY_SOURCE = {
  clarivate: COMPANIES_SINGLE,
  cortellis: COMPANIES_MULTIPLE,
  evaluate: COMPANIES_MULTIPLE,
};

const INITIATIVES = [
  { value: "oncology-2025", label: "Oncology 2025" },
  { value: "rare-disease", label: "Rare Disease" },
  { value: "neurology", label: "Neurology" },
];

let lastUsedInitiative = INITIATIVES[0];

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// FIELD LABEL
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function FieldLabel({ children, isRequired }) {
  return (
    <label style={{
      fontFamily: "var(--font-family-primary)",
      fontSize: "var(--text-body-sm)",
      color: "var(--color-content-secondary)",
    }}>
      {children}
      {isRequired && <span style={{ color: "var(--color-content-negative)", marginLeft: 2 }}>*</span>}
    </label>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// GENERIC DROPDOWN FIELD (source, asset, initiative)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function DropdownField({ label, isRequired, placeholder, value, icon, open, onToggle, onClose, children, disabled }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)", position: "relative" }} ref={ref}>
      {label && <FieldLabel isRequired={isRequired}>{label}</FieldLabel>}
      <button
        type="button"
        disabled={disabled}
        onClick={onToggle}
        style={{
          display: "flex", alignItems: "center", gap: "var(--spacing-sm)",
          padding: "var(--spacing-sm) var(--spacing-md)",
          background: "var(--color-general-white)",
          border: `1px solid ${open ? "var(--color-content-brand)" : "var(--color-action-outline-secondary-enabled)"}`,
          borderRadius: "var(--radius-md)",
          cursor: disabled ? "not-allowed" : "pointer",
          fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)",
          color: value ? "var(--color-content-primary)" : "var(--color-content-tertiary)",
          width: "100%", textAlign: "left", boxSizing: "border-box", minHeight: 40,
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {icon && <span style={{ display: "flex", alignItems: "center", flexShrink: 0, color: "var(--color-content-secondary)" }}>{icon}</span>}
        <span style={{ flex: 1 }}>{value || placeholder}</span>
        <span style={{ display: "flex", alignItems: "center", color: "var(--color-content-secondary)" }}>
          <Icon name="ChevronDown" size="sm" />
        </span>
      </button>
      {open && (
        <div style={{
          position: "absolute", zIndex: 100, top: "100%", left: 0, right: 0, marginTop: 4,
          background: "var(--color-general-white)",
          border: "1px solid var(--color-action-outline-secondary-enabled)",
          borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-button-hover)", overflow: "hidden",
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// COMPANY FIELD
// single: chevron trigger + search inside popover
// multiple: search-input trigger + list in popover
// "Create new company" always visible; clicking it pre-fills "New company"
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function CompanyField({ label, isRequired, companies, value, onSelect, onCreate, disabled }) {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [creatingMode, setCreatingMode] = useState(false); // true after "Create new company" clicked

  const isSingle = companies.length === 1;

  const filtered = search.trim()
    ? companies.filter((c) => c.label.toLowerCase().includes(search.trim().toLowerCase()))
    : companies;

  const createLabel = creatingMode && search.trim()
    ? `Create new company "${search.trim()}"`
    : "Create new company";

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
        setCreatingMode(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleSelect = (c) => {
    onSelect(c);
    setSearch("");
    setCreatingMode(false);
    setOpen(false);
  };

  const handleCreateClick = () => {
    if (creatingMode && search.trim()) {
      // Confirm creation
      onCreate(search.trim());
      setSearch("");
      setCreatingMode(false);
      setOpen(false);
    } else {
      // Enter creation mode: clear selection, clear input, focus with placeholder
      onSelect(null);
      setCreatingMode(true);
      setSearch("");
      setTimeout(() => {
        const el = inputRef.current;
        if (el) { el.focus(); }
      }, 0);
    }
  };

  // Shared popover list + create button
  const popoverContent = (
    <>
      {/* For single-company: show search input inside popover */}
      {isSingle && (
        <div style={{ padding: "var(--spacing-sm)", borderBottom: "1px solid var(--color-action-outline-secondary-enabled)" }}>
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={creatingMode ? "Enter new company name" : "Search or type new company name"}
            style={{
              width: "100%", boxSizing: "border-box",
              border: "1px solid var(--color-action-outline-secondary-enabled)",
              borderRadius: "var(--radius-md)",
              padding: "var(--spacing-xs) var(--spacing-sm)",
              fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)",
              color: "var(--color-content-primary)", outline: "none",
            }}
          />
        </div>
      )}
      <DropdownList noSearch addLabel={createLabel} onAdd={handleCreateClick}>
        <DropdownList.Section>
          {filtered.map((c) => (
            <DropdownListItem
              key={c.value} value={c.value} noCheckbox
              active={value?.value === c.value} subinfo={c.subinfo}
              onChange={() => handleSelect(c)}
            >
              {c.label}
            </DropdownListItem>
          ))}
        </DropdownList.Section>
      </DropdownList>
    </>
  );

  const popover = (
    <div style={{
      position: "absolute", zIndex: 100, top: "100%", left: 0, right: 0, marginTop: 4,
      background: "var(--color-general-white)",
      border: "1px solid var(--color-action-outline-secondary-enabled)",
      borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-button-hover)", overflow: "hidden",
    }}>
      {popoverContent}
    </div>
  );

  // â”€â”€ Single: standard chevron trigger â”€â”€
  if (isSingle) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)", position: "relative" }} ref={ref}>
        {label && <FieldLabel isRequired={isRequired}>{label}</FieldLabel>}
        <button
          type="button" disabled={disabled}
          onClick={() => {
            const next = !open;
            setOpen(next);
            if (next) setTimeout(() => inputRef.current?.focus(), 0);
          }}
          style={{
            display: "flex", alignItems: "center", gap: "var(--spacing-sm)",
            padding: "var(--spacing-sm) var(--spacing-md)",
            background: "var(--color-general-white)",
            border: `1px solid ${open ? "var(--color-content-brand)" : "var(--color-action-outline-secondary-enabled)"}`,
            borderRadius: "var(--radius-md)", cursor: disabled ? "not-allowed" : "pointer",
            fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)",
            color: "var(--color-content-primary)",
            width: "100%", textAlign: "left", boxSizing: "border-box", minHeight: 40,
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <span style={{ flex: 1 }}>{value?.label || companies[0]?.label}</span>
          <span style={{ display: "flex", alignItems: "center", color: "var(--color-content-secondary)" }}>
            <Icon name="ChevronDown" size="sm" />
          </span>
        </button>
        {open && popover}
      </div>
    );
  }

  // â”€â”€ Multiple: search-input trigger â”€â”€
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)", position: "relative" }} ref={ref}>
      {label && <FieldLabel isRequired={isRequired}>{label}</FieldLabel>}
      <div
        style={{
          display: "flex", alignItems: "center", gap: "var(--spacing-sm)",
          padding: "var(--spacing-sm) var(--spacing-md)",
          background: "var(--color-general-white)",
          border: `1px solid ${open ? "var(--color-content-brand)" : "var(--color-action-outline-secondary-enabled)"}`,
          borderRadius: "var(--radius-md)", boxSizing: "border-box", minHeight: 40,
          opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? "none" : "auto", cursor: "text",
        }}
        onClick={() => { setOpen(true); inputRef.current?.focus(); }}
      >
        <span style={{ display: "flex", alignItems: "center", flexShrink: 0, color: "var(--color-content-secondary)" }}>
          <Icon name="MagnifyingGlass" size="sm" />
        </span>
        {open ? (
          <input
            ref={inputRef}
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={creatingMode ? "Enter new company name" : (value ? value.label : "Select or create company")}
            style={{
              flex: 1, border: "none", outline: "none",
              fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)",
              color: "var(--color-content-primary)", background: "transparent",
            }}
          />
        ) : (
          <span style={{ flex: 1, fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: value ? "var(--color-content-primary)" : "var(--color-content-tertiary)" }}>
            {value ? value.label : creatingMode ? "Enter new company name" : "Select or create company"}
          </span>
        )}
        <span style={{ display: "flex", alignItems: "center", color: "var(--color-content-secondary)" }}>
          <Icon name="ChevronDown" size="sm" />
        </span>
      </div>
      {open && popover}
    </div>
  );
}

// ---------------------------------------------
// INLINE MODAL CARD (no fixed overlay)
// ---------------------------------------------

function ModalCard({ title, children, primaryLabel, primaryDisabled, onPrimary, onSecondary }) {
  return (
    <div style={{
      background: "var(--color-general-white)",
      borderRadius: "var(--radius-md)",
      outline: "1px solid var(--color-action-outline-secondary-enabled)",
      outlineOffset: -1,
      boxShadow: "var(--shadow-button-hover)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      width: "100%",
    }}>
      <div style={{ padding: "0 var(--spacing-6)", borderBottom: "1px solid var(--color-action-outline-secondary-enabled)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "var(--spacing-4) 0" }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-family-primary)", fontSize: "var(--text-heading-h3)", fontWeight: "var(--font-weight-bold)", color: "var(--color-content-primary)" }}>
            {title}
          </h2>
          <button type="button" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, background: "transparent", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer", color: "var(--color-content-secondary)" }}>
            <Icon name="XMark" size="md" />
          </button>
        </div>
      </div>
      <div style={{ padding: "var(--spacing-6)", display: "flex", flexDirection: "column", gap: "var(--spacing-4)", flex: 1, overflowY: "auto" }}>
        {children}
      </div>
      <div style={{ padding: "var(--spacing-4) var(--spacing-6)", borderTop: "1px solid var(--color-action-outline-secondary-enabled)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div />
        <div style={{ display: "flex", gap: "var(--spacing-sm)" }}>
          <Button variant="secondary" size="lg" onPress={onSecondary}>Cancel</Button>
          <Button variant="primary" size="lg" isDisabled={primaryDisabled} onPress={onPrimary}>{primaryLabel}</Button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------
// ADD TO DEAL FORM
// ---------------------------------------------

function AddToDealModal({ forcedCompanies }) {
  const [dataSource, setDataSource] = useState(null);
  const [asset, setAsset] = useState(null);
  const [company, setCompany] = useState(null);
  const [opportunityName, setOpportunityName] = useState("");
  const [initiative, setInitiative] = useState(lastUsedInitiative);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => setOpenDropdown((p) => (p === name ? null : name));
  const closeDropdown = () => setOpenDropdown(null);

  const availableAssets = dataSource ? ASSETS_BY_SOURCE[dataSource.value] ?? [] : [];
  const availableCompanies = forcedCompanies ?? (dataSource ? COMPANIES_BY_SOURCE[dataSource.value] ?? [] : []);

  const handleSelectSource = (src) => {
    const assets = ASSETS_BY_SOURCE[src.value] ?? [];
    const companies = forcedCompanies ?? COMPANIES_BY_SOURCE[src.value] ?? [];
    const firstAsset = assets[0] ?? null;
    const firstCompany = companies.length === 1 ? companies[0] : null;
    setDataSource(src);
    setAsset(firstAsset);
    setOpportunityName(firstAsset?.label ?? "");
    setCompany(firstCompany);
    closeDropdown();
  };

  const handleSelectAsset = (a) => { setAsset(a); setOpportunityName(a.label); closeDropdown(); };
  const handleCreateCompany = (name) => { setCompany({ value: `custom-${Date.now()}`, label: name, subinfo: "New company" }); };
  const handleSelectInitiative = (ini) => { lastUsedInitiative = ini; setInitiative(ini); closeDropdown(); };

  const canSubmit = dataSource && asset && company && opportunityName.trim() && initiative;

  return (
    <ModalCard
      title="Add asset to Deal"
      primaryLabel="Create"
      primaryDisabled={!canSubmit}
      onPrimary={() => console.log("Submit", { dataSource, asset, company, opportunityName, initiative })}
      onSecondary={() => {}}
    >
      <Infobox variant="info" title="This will create new opportunity in Deal" actionLabel="x" onAction={() => {}} />

      <div style={{ position: "relative" }}>
        <DropdownField
          label="Data source" isRequired placeholder="Select data source"
          value={dataSource?.label} open={openDropdown === "source"}
          onToggle={() => toggleDropdown("source")} onClose={closeDropdown}
          icon={<Icon name="MagnifyingGlass" size="sm" />}
        >
          <DropdownList noAdd>
            <DropdownList.Section>
              {DATA_SOURCES.map((src) => (
                <DropdownListItem key={src.value} value={src.value} noCheckbox active={dataSource?.value === src.value} onChange={() => handleSelectSource(src)}>
                  {src.label}
                </DropdownListItem>
              ))}
            </DropdownList.Section>
          </DropdownList>
        </DropdownField>
        {!dataSource && (
          <p style={{ display: "flex", alignItems: "center", gap: "var(--spacing-xs)", margin: "var(--spacing-xs) 0 0", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-sm)", color: "var(--color-content-secondary)" }}>
            <Icon name="InformationCircle" size="sm" /> Select data source to populate other fields
          </p>
        )}
      </div>

      <div style={{ position: "relative" }}>
        <DropdownField
          label="Asset name" isRequired placeholder="Select or create asset"
          value={asset?.label} open={openDropdown === "asset"}
          onToggle={() => toggleDropdown("asset")} onClose={closeDropdown}
          disabled={!dataSource} icon={<Icon name="MagnifyingGlass" size="sm" />}
        >
          <DropdownList addLabel="Create asset" onAdd={() => closeDropdown()}>
            <DropdownList.Section>
              {availableAssets.map((a) => (
                <DropdownListItem key={a.value} value={a.value} noCheckbox active={asset?.value === a.value} onChange={() => handleSelectAsset(a)}>
                  {a.label}
                </DropdownListItem>
              ))}
            </DropdownList.Section>
          </DropdownList>
        </DropdownField>
      </div>

      <CompanyField
        label="Select company" isRequired
        companies={availableCompanies} value={company}
        onSelect={setCompany} onCreate={handleCreateCompany} disabled={!dataSource}
      />

      <TextInput
        label="Opportunity name" isRequired placeholder="Name your opportunity"
        value={opportunityName} onChange={(e) => setOpportunityName(e.target.value)}
      />

      <div style={{ position: "relative" }}>
        <DropdownField
          label="Initiative" isRequired placeholder="Select initiative"
          value={initiative?.label} open={openDropdown === "initiative"}
          onToggle={() => toggleDropdown("initiative")} onClose={closeDropdown}
        >
          <DropdownList noAdd>
            <DropdownList.Section>
              {INITIATIVES.map((ini) => (
                <DropdownListItem key={ini.value} value={ini.value} noCheckbox active={initiative?.value === ini.value} onChange={() => handleSelectInitiative(ini)}>
                  {ini.label}
                </DropdownListItem>
              ))}
            </DropdownList.Section>
          </DropdownList>
        </DropdownField>
      </div>
    </ModalCard>
  );
}

// ---------------------------------------------
// PAGE — both cases side by side
// ---------------------------------------------

export default function AddToDealPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--color-general-neutral-lighter)",
      padding: "var(--spacing-8)",
      display: "flex",
      gap: "var(--spacing-8)",
      alignItems: "flex-start",
      justifyContent: "center",
    }}>
      <div style={{ flex: "0 1 560px", display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
        <p style={{ margin: 0, fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-sm)", fontWeight: 600, color: "var(--color-content-secondary)" }}>
          Only 1 active company
        </p>
        <AddToDealModal forcedCompanies={COMPANIES_SINGLE} />
      </div>
      <div style={{ flex: "0 1 560px", display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
        <p style={{ margin: 0, fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-sm)", fontWeight: 600, color: "var(--color-content-secondary)" }}>
          Multiple active companies
        </p>
        <AddToDealModal forcedCompanies={COMPANIES_MULTIPLE} />
      </div>
    </div>
  );
}

