import { useState } from "react";
import { Toggle } from "../../library/atoms/toggle.jsx";
import { Button } from "../../library/atoms/button.jsx";
import { DatePicker } from "../../library/molecules/datepicker.jsx";
import { FormSectionTitle } from "../../library/organisms/section/form-section-title.jsx";
import { Infobox } from "../../library/molecules/infobox.jsx";
import { RadioButton, RadioGroup } from "../../library/atoms/radio-button.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { CalendarIcon } from "@heroicons/react/16/solid";

// ─────────────────────────────────────────────
// DATE FIELD
// ─────────────────────────────────────────────

const formatDate = (date) => {
  if (!date) return "";
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const DateField = ({ label, value, onChange, disabled, minDate, maxDate, error }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
      <label style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-content-secondary)" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen((v) => !v)}
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 8, width: "100%", padding: "8px 12px",
            background: disabled ? "var(--color-general-neutral-lighter)" : "var(--color-general-white)",
            border: `1px solid ${error ? "var(--color-status-error)" : "var(--color-action-outline-secondary-enabled)"}`,
            borderRadius: "var(--radius-md)", cursor: disabled ? "not-allowed" : "pointer",
            fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)",
            color: value ? "var(--color-content-primary)" : "var(--color-content-tertiary)",
          }}
        >
          <span>{value ? formatDate(value) : "Pick a date"}</span>
          <CalendarIcon style={{ width: 16, height: 16, color: "var(--color-content-tertiary)", flexShrink: 0 }} />
        </button>
        {open && (
          <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 100 }}>
            <DatePicker
              value={value}
              onChange={(d) => { onChange(d); setOpen(false); }}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
        )}
      </div>
      {error && (
        <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-caption)", color: "var(--color-status-error)" }}>
          {error}
        </span>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// MILESTONE FIELDS
// ─────────────────────────────────────────────

const EXISTING_MILESTONES = [
  "Phase 2 clinical trials",
  "IND submission",
  "NDA approval",
  "Phase 3 enrollment complete",
  "Commercial launch",
];

const MilestoneSection = ({ milestoneType, setMilestoneType, milestoneValue, setMilestoneValue, milestoneDelay, setMilestoneDelay, milestoneDelayUnit, setMilestoneDelayUnit }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <RadioGroup value={milestoneType} onChange={setMilestoneType} style={{ display: "flex", gap: 16 }}>
        <RadioButton value="existing" label="Existing milestone" />
        <RadioButton value="new" label="New milestone" />
      </RadioGroup>

      {milestoneType === "existing" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-content-secondary)" }}>
            Milestone
          </label>
          <select
            value={milestoneValue}
            onChange={(e) => setMilestoneValue(e.target.value)}
            style={{ padding: "8px 12px", border: "1px solid var(--color-action-outline-secondary-enabled)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: milestoneValue ? "var(--color-content-primary)" : "var(--color-content-tertiary)", background: "var(--color-general-white)" }}
          >
            <option value="">Select a milestone</option>
            {EXISTING_MILESTONES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      )}

      {milestoneType === "new" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 12, background: "var(--color-general-neutral-lighter)", borderRadius: "var(--radius-md)" }}>
          <label style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-content-secondary)" }}>
            Milestone name
          </label>
          <input
            type="text"
            value={milestoneValue}
            onChange={(e) => setMilestoneValue(e.target.value)}
            placeholder="e.g. First patient enrolled"
            style={{ padding: "8px 12px", border: "1px solid var(--color-action-outline-secondary-enabled)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", background: "var(--color-general-white)" }}
          />
        </div>
      )}

      {milestoneType && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-sm)", fontWeight: "var(--font-weight-medium)", color: "var(--color-content-secondary)" }}>
            Delay after milestone
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="number"
              min={0}
              value={milestoneDelay}
              onChange={(e) => setMilestoneDelay(e.target.value)}
              placeholder="0"
              style={{ padding: "8px 12px", border: "1px solid var(--color-action-outline-secondary-enabled)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", width: 80, background: "var(--color-general-white)" }}
            />
            <select
              value={milestoneDelayUnit}
              onChange={(e) => setMilestoneDelayUnit(e.target.value)}
              style={{ padding: "8px 12px", border: "1px solid var(--color-action-outline-secondary-enabled)", borderRadius: "var(--radius-md)", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", background: "var(--color-general-white)" }}
            >
              <option value="Day(s)">Day(s)</option>
              <option value="Week(s)">Week(s)</option>
              <option value="Month(s)">Month(s)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export const ValidityDatesPage = () => {
  const [effectiveEnabled, setEffectiveEnabled] = useState(false);
  const [expirationEnabled, setExpirationEnabled] = useState(false);
  const [milestoneEnabled, setMilestoneEnabled] = useState(false);

  const [effectiveDate, setEffectiveDate] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);

  const [milestoneType, setMilestoneType] = useState("");
  const [milestoneValue, setMilestoneValue] = useState("");
  const [milestoneDelay, setMilestoneDelay] = useState("");
  const [milestoneDelayUnit, setMilestoneDelayUnit] = useState("Day(s)");

  // Validation
  const effectiveAfterExpiration = effectiveDate && expirationDate && effectiveDate >= expirationDate;

  const handleEffectiveChange = (d) => {
    setEffectiveDate(d);
    if (expirationDate && d >= expirationDate) setExpirationDate(null);
  };

  const handleExpirationChange = (d) => {
    setExpirationDate(d);
    if (effectiveDate && d <= effectiveDate) setEffectiveDate(null);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-general-neutral-lighter)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 24px" }}>
      <div style={{ width: "100%", maxWidth: 560, display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Header */}
        <div>
          <h1 style={{ margin: 0, fontFamily: "var(--font-family-primary)", fontSize: "var(--text-heading-h3)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-content-primary)" }}>
            Validity Dates
          </h1>
          <p style={{ margin: "4px 0 0", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)" }}>
            Define when this clause becomes effective and when it expires.
          </p>
        </div>

        {/* Effective Date */}
        <div style={{ background: "var(--color-general-white)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-action-outline-secondary-enabled)", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <FormSectionTitle>Effective date</FormSectionTitle>
            <Toggle isSelected={effectiveEnabled} onChange={setEffectiveEnabled} />
          </div>
          {effectiveEnabled && (
            <DateField
              label="Start date"
              value={effectiveDate}
              onChange={handleEffectiveChange}
              maxDate={expirationDate || undefined}
              error={effectiveAfterExpiration ? "Effective date must be before expiration date" : null}
            />
          )}
        </div>

        {/* Expiration Date */}
        <div style={{ background: "var(--color-general-white)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-action-outline-secondary-enabled)", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <FormSectionTitle>Expiration date</FormSectionTitle>
            <Toggle isSelected={expirationEnabled} onChange={setExpirationEnabled} />
          </div>
          {expirationEnabled && (
            <DateField
              label="End date"
              value={expirationDate}
              onChange={handleExpirationChange}
              minDate={effectiveDate || undefined}
            />
          )}
        </div>

        {/* Milestone */}
        <div style={{ background: "var(--color-general-white)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-action-outline-secondary-enabled)", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <FormSectionTitle>Milestone-based</FormSectionTitle>
              <p style={{ margin: "2px 0 0", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-sm)", color: "var(--color-content-tertiary)" }}>
                Tie the effective date to a contract milestone
              </p>
            </div>
            <Toggle isSelected={milestoneEnabled} onChange={(v) => { setMilestoneEnabled(v); if (!v) { setMilestoneType(""); setMilestoneValue(""); setMilestoneDelay(""); } }} />
          </div>
          {milestoneEnabled && (
            <MilestoneSection
              milestoneType={milestoneType}
              setMilestoneType={setMilestoneType}
              milestoneValue={milestoneValue}
              setMilestoneValue={setMilestoneValue}
              milestoneDelay={milestoneDelay}
              setMilestoneDelay={setMilestoneDelay}
              milestoneDelayUnit={milestoneDelayUnit}
              setMilestoneDelayUnit={setMilestoneDelayUnit}
            />
          )}
        </div>

        {/* Info: both toggles on, no agreement dates */}
        {effectiveEnabled && expirationEnabled && !effectiveDate && !expirationDate && (
          <Infobox variant="info" title="No agreement dates defined" description="Both toggles are on but no dates have been set. The clause validity will remain undefined until dates are picked." />
        )}

        {/* Actions */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <Button variant="secondary" onClick={() => {}}>Cancel</Button>
          <Button variant="primary" onClick={() => {}}>Save</Button>
        </div>

      </div>
    </div>
  );
};

export default ValidityDatesPage;
