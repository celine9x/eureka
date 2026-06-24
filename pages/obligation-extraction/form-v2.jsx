"use client";

/**
 * Obligation Form — V2
 *
 * AI-populated fields show an inline "AI" badge inside the field.
 * - Hover the field wrapper → a "Verify" button appears next to it
 * - Click "Verify"          → brief check flash, then badge disappears
 * - Edit the field          → badge disappears immediately (user took ownership)
 */

import { useState, useRef, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { SparklesIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon, CalendarIcon } from "@heroicons/react/16/solid";
import { Button } from "../../library/atoms/button.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { Toggle } from "../../library/atoms/toggle.jsx";
import { Checkbox } from "../../library/atoms/checkbox.jsx";
import { Infobox } from "../../library/molecules/infobox.jsx";
import { FormSectionTitle } from "../../library/organisms/section/form-section-title.jsx";
import { Label } from "../../library/molecules/text-input.jsx";
import { Badge } from "../../library/atoms/badge.jsx";
import {MiniInfobox} from "../../library/molecules/miniinfobox.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const AI_FIELDS = ["title", "type", "estimatedAmount", "description", "responsibility", "fromTo"];

const TYPE_OPTIONS = [
  "Recurring payment",
  "One-time payment",
  "Regulatory milestone",
  "Clinical milestone",
  "Commercial milestone",
  "Reporting obligation",
];

const OWNER_OPTIONS = ["Joe Mark", "Alice Chen", "Bob Smith", "Sarah Johnson", "David Lee"];
const FROM_TO_OPTIONS = ["LICENSEE", "LICENSOR", "BOTH PARTIES", "THIRD PARTY"];
const DAYS_OPTIONS = ["Days", "Weeks", "Months"];
const PAGE_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

// ─────────────────────────────────────────────
// AI BADGE (inline, inside field)
// ─────────────────────────────────────────────

/**
 * Three states:
 *   "ai"       — purple AI badge (default for populated fields)
 *   "checking" — brief green check flash
 *   "hidden"   — nothing (after validate or user edit)
 */
function AiBadge({ state, onValidate }) {
  const [hovered, setHovered] = useState(false);

  if (state === "hidden") return null;

  if (state === "checking") {
    return (
      <span style={{ flexShrink: 0, pointerEvents: "none" }}>
        <Badge color="positive" size="sm">✓</Badge>
      </span>
    );
  }

  // state === "ai"
  return (
    <button
      type="button"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onValidate}
      style={{
        flexShrink: 0,
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        transition: "opacity var(--transition-fast)",
      }}
    >
      <Badge color="neutral" size="sm">
        {hovered ? "Validate" : "AI"}
      </Badge>
    </button>
  );
}

// ─────────────────────────────────────────────
// SHARED SUB-COMPONENTS
// ─────────────────────────────────────────────

/** Functional dropdown with optional AI badge inside */
function SelectFieldV2({ fieldKey, value, onChange, options, placeholder, badgeState, onValidate, onUserChange, error }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (opt) => {
    onChange(opt);
    onUserChange?.();
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          height: 40,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 var(--spacing-3)",
          background: "var(--color-interaction-fill-enabled)",
          border: "none",
          borderRadius: "var(--radius-md)",
          outlineStyle: "solid",
          outlineWidth: 1,
          outlineOffset: -1,
          outlineColor: error
            ? "var(--color-interaction-outline-negative)"
            : open
            ? "var(--color-interaction-outline-active)"
            : "var(--color-interaction-outline-enabled)",
          fontFamily: "var(--font-family-primary)",
          fontSize: "var(--text-body-lg)",
          color: value ? "var(--color-content-primary)" : "var(--color-content-tertiary)",
          cursor: "pointer",
          boxSizing: "border-box",
          textAlign: "left",
          transition: "outline-color var(--transition-fast)",
        }}
      >
        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value || placeholder}
        </span>
        {badgeState && badgeState !== "hidden" && (
          <AiBadge state={badgeState} onValidate={(e) => { e && e.stopPropagation(); onValidate?.(); }} />
        )}
        <ChevronDownIcon
          width={16}
          height={16}
          style={{
            flexShrink: 0,
            color: "var(--color-content-secondary)",
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform var(--transition-fast)",
          }}
        />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            background: "var(--color-general-white)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-medium-down)",
            outline: "1px solid var(--color-action-outline-secondary-enabled)",
            outlineOffset: -1,
            zIndex: 100,
            overflow: "hidden",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => handleSelect(opt)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                padding: "var(--spacing-sm) var(--spacing-3)",
                background: value === opt ? "var(--color-general-informative)" : "transparent",
                border: "none",
                fontFamily: "var(--font-family-primary)",
                fontSize: "var(--text-body-lg)",
                color: "var(--color-content-primary)",
                cursor: "pointer",
                textAlign: "left",
                transition: "background var(--transition-fast)",
              }}
              onMouseEnter={(e) => { if (value !== opt) e.currentTarget.style.background = "var(--color-general-neutral-light)"; }}
              onMouseLeave={(e) => { if (value !== opt) e.currentTarget.style.background = "transparent"; }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Text input with optional AI badge inside */
function TextInputV2({ value, onChange, onUserChange, placeholder, badgeState, onValidate, error }) {
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    onChange(e.target.value);
    onUserChange?.();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        height: 40,
        padding: "0 var(--spacing-3)",
        background: "var(--color-interaction-fill-enabled)",
        borderRadius: "var(--radius-md)",
        outlineStyle: "solid",
        outlineWidth: 1,
        outlineOffset: -1,
        outlineColor: error
          ? "var(--color-interaction-outline-negative)"
          : focused
          ? "var(--color-interaction-outline-active)"
          : "var(--color-interaction-outline-enabled)",
        boxSizing: "border-box",
        transition: "outline-color var(--transition-fast)",
      }}
    >
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          background: "transparent",
          fontFamily: "var(--font-family-primary)",
          fontSize: "var(--text-body-lg)",
          color: "var(--color-content-primary)",
          minWidth: 0,
        }}
      />
      {badgeState && badgeState !== "hidden" && (
        <AiBadge state={badgeState} onValidate={onValidate} />
      )}
    </div>
  );
}

/** Error helper text */
function FieldError({ message }) {
  if (!message) return null;
  return (
    <p style={{ margin: "4px 0 0", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-negative)" }}>
      {message}
    </p>
  );
}

/** Divider */
function Divider() {
  return <hr style={{ border: "none", borderTop: "1px solid var(--color-action-outline-secondary-enabled)", margin: 0 }} />;
}

/** Section */
function Section({ children, style }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "20px 24px", ...style }}>
      {children}
    </div>
  );
}

/** Responsibility Tab */
function ResponsibilityTab({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "6px 16px",
        borderRadius: "var(--radius-sm)",
        border: active ? "1.5px solid var(--color-action-fill-primary-enabled)" : "1px solid var(--color-interaction-outline-enabled)",
        background: active ? "var(--color-general-white)" : "transparent",
        fontFamily: "var(--font-family-primary)",
        fontSize: "var(--text-body-lg)",
        fontWeight: active ? "var(--font-weight-semibold)" : "var(--font-weight-regular)",
        color: active ? "var(--color-action-fill-primary-enabled)" : "var(--color-content-secondary)",
        cursor: "pointer",
        transition: "all var(--transition-fast)",
      }}
    >
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────
// BADGE STATE HOOK
// ─────────────────────────────────────────────

/**
 * Manages badge state per field.
 * "ai" → hover/click → "checking" (300ms) → "hidden"
 * If user edits field → immediately "hidden"
 */
function useBadgeStates(initialFields) {
  // initialFields: array of field keys that start as "ai"
  const [states, setStates] = useState(() => {
    const s = {};
    initialFields.forEach((f) => (s[f] = "ai"));
    return s;
  });

  const validate = (fieldKey) => {
    setStates((prev) => ({ ...prev, [fieldKey]: "checking" }));
    setTimeout(() => {
      setStates((prev) => ({ ...prev, [fieldKey]: "hidden" }));
    }, 400);
  };

  const userEdited = (fieldKey) => {
    setStates((prev) => {
      if (prev[fieldKey] === "ai") return { ...prev, [fieldKey]: "hidden" };
      return prev;
    });
  };

  const validateAll = () => {
    const next = { ...states };
    Object.keys(next).forEach((k) => { if (next[k] === "ai") next[k] = "checking"; });
    setStates(next);
    setTimeout(() => {
      setStates((prev) => {
        const after = { ...prev };
        Object.keys(after).forEach((k) => { if (after[k] === "checking") after[k] = "hidden"; });
        return after;
      });
    }, 400);
  };

  const allHidden = Object.values(states).every((s) => s === "hidden");

  return { states, validate, userEdited, validateAll, allHidden };
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

export default function ObligationFormV2() {
  const [title, setTitle] = useState("Subsequent Shares Issuance (Series B Financing)");
  const [type, setType] = useState("Recurring payment");
  const [isMilestone, setIsMilestone] = useState(false);
  const [forecastedDate, setForecastedDate] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [estimatedAmount, setEstimatedAmount] = useState("$2,500,000");
  const [owner, setOwner] = useState("");
  const [description, setDescription] = useState(
    "Issue additional shares or pay $2,500,000 depending on corporate events."
  );
  const [responsibility, setResponsibility] = useState("Internal");
  const [fromTo, setFromTo] = useState("LICENSEE");
  const [pageNumber, setPageNumber] = useState("");
  const [sendNotifications, setSendNotifications] = useState(true);
  const [notificationDays, setNotificationDays] = useState("7");
  const [notificationUnit, setNotificationUnit] = useState("Days");
  const [terminateWithAgreement, setTerminateWithAgreement] = useState(true);

  const { states: badge, validate, userEdited, validateAll, allHidden } = useBadgeStates(AI_FIELDS);

  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const unverifiedCount = AI_FIELDS.filter((f) => badge[f] !== "hidden").length;

  const handleCreate = () => {
    const newErrors = {};
    let hasErrors = false;

    if (!forecastedDate) { newErrors.forecastedDate = "Forecasted date is required"; hasErrors = true; }
    if (!owner) { newErrors.owner = "Owner is required"; hasErrors = true; }

    AI_FIELDS.forEach((f) => {
      if (badge[f] !== "hidden") { newErrors[f] = true; hasErrors = true; }
    });

    setErrors(newErrors);
    setSubmitAttempted(true);

    if (!hasErrors) alert("Obligation created successfully!");
  };

  const unverifiedErrorFields = AI_FIELDS.filter((f) => submitAttempted && badge[f] !== "hidden");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "var(--color-general-white)",
        fontFamily: "var(--font-family-primary)",
        outline: "1px solid var(--color-action-outline-secondary-enabled)",
        outlineOffset: -1,
        overflow: "hidden",
      }}
    >
      {/* ── HEADER ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 24px",
          borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-family-primary)", fontSize: "var(--text-heading-h2)", fontWeight: "var(--font-weight-bold)", color: "var(--color-content-primary)" }}>
            Create obligation
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Button variant="secondary" size="sm" iconLeading={<Icon name="Plus" size="sm" />}>Add</Button>
          <Button variant="tertiary" size="sm" iconLeading={<Icon name="InformationCircle" size="sm" />} />
          <Button variant="tertiary" size="sm" iconLeading={<Icon name="Flag" size="sm" />} />
        </div>
      </div>

      {/* ── AI INACCURACY NOTICE ── */}
      <div style={{ padding: "8px 24px 0", flexShrink: 0 }}>
    <MiniInfobox variant="info" message="Inaccuracies may occur with AI. Please review carefully." /> </div>

      {/* ── NAV BAR ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 24px",
          borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
          flexShrink: 0,
        }}
      >
        <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", padding: 0, color: "var(--color-content-secondary)" }}>
          <Icon name="ChevronLeft" size="sm" />
        </button>
        <span style={{ flex: 1, fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-lg)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-content-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          Subsequent Shares Issuance (Seri...
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 2, color: "var(--color-content-secondary)" }}><Icon name="ChevronUp" size="sm" /></button>
          <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)" }}>1 of 20</span>
          <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 2, color: "var(--color-content-secondary)" }}><Icon name="ChevronDown" size="sm" /></button>
        </div>
      </div>

      {/* ── SOURCE SECTION ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 24px",
          borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
          flexShrink: 0,
        }}
      >
        <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)" }}>Source section</span>
        <Badge color="teal" label="5.11" />
      </div>

      {/* ── SCROLLABLE BODY ── */}
      <div style={{ flex: 1, overflowY: "auto" }}>

        {/* ── VERIFY ALL CARD ── */}
        <Section>
          <Infobox
            variant={
              submitAttempted && unverifiedErrorFields.length > 0
                ? "error"
                : allHidden
                ? "success"
                : "info"
            }
            title={
              submitAttempted && unverifiedErrorFields.length > 0
                ? `${unverifiedErrorFields.length} field${
                    unverifiedErrorFields.length > 1 ? "s" : ""
                  } still need validation before creating`
                : allHidden
                ? "All fields validated"
                : "Verify data fields"
            }
            description={
              allHidden
                ? undefined
                : "Verify data fields extracted by AI at once or individually."
            }
            actionLabel={allHidden ? undefined : "Validate all"}
            onAction={validateAll}
          />
        </Section>

        <Divider />

        {/* ── TITLE ── */}
        <Section>
          <Label htmlFor="title-v2" required>Title</Label>
          <TextInputV2
            value={title}
            onChange={setTitle}
            onUserChange={() => userEdited("title")}
            placeholder="Enter title"
            badgeState={badge.title}
            onValidate={() => validate("title")}
            error={errors.title}
          />
          {errors.title && <FieldError message="Please validate this AI-extracted field" />}
        </Section>

        <Divider />

        {/* ── TYPE ── */}
        <Section>
          <Label required>Type</Label>
          <SelectFieldV2
            value={type}
            onChange={setType}
            onUserChange={() => userEdited("type")}
            options={TYPE_OPTIONS}
            placeholder="Select type"
            badgeState={badge.type}
            onValidate={() => validate("type")}
            error={errors.type}
          />
          {errors.type && <FieldError message="Please validate this AI-extracted field" />}
        </Section>

        <Divider />

        {/* ── FORECASTED DATE ── */}
        <Section>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <FormSectionTitle>Forecasted date</FormSectionTitle>
            <Toggle isSelected={isMilestone} onChange={setIsMilestone} label="Milestone" labelPosition="right" size="md" />
          </div>
          <div>
            <Label htmlFor="forecasted-date-v2" required>Forecasted date</Label>
            <div
              style={{
                height: 40,
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "0 var(--spacing-3)",
                background: "var(--color-interaction-fill-enabled)",
                borderRadius: "var(--radius-md)",
                outlineStyle: "solid",
                outlineWidth: 1,
                outlineOffset: -1,
                outlineColor: errors.forecastedDate ? "var(--color-interaction-outline-negative)" : "var(--color-interaction-outline-enabled)",
                boxSizing: "border-box",
                cursor: "pointer",
              }}
            >
              <CalendarIcon width={16} height={16} style={{ color: "var(--color-content-secondary)", flexShrink: 0 }} />
              <input
                id="forecasted-date-v2"
                type="date"
                value={forecastedDate}
                onChange={(e) => setForecastedDate(e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontFamily: "var(--font-family-primary)",
                  fontSize: "var(--text-body-lg)",
                  color: forecastedDate ? "var(--color-content-primary)" : "var(--color-content-tertiary)",
                  cursor: "pointer",
                }}
              />
              <ChevronDownIcon width={16} height={16} style={{ color: "var(--color-content-secondary)", flexShrink: 0 }} />
            </div>
            {errors.forecastedDate && <FieldError message={errors.forecastedDate} />}
          </div>
          <Toggle isSelected={isRecurring} onChange={setIsRecurring} label="Recurring Pattern" labelPosition="right" size="md" />
        </Section>

        <Divider />

        {/* ── FINANCIAL DETAILS ── */}
        <Section>
          <FormSectionTitle>Financial details</FormSectionTitle>
          <Label required>Estimated amount</Label>
          <TextInputV2
            value={estimatedAmount}
            onChange={setEstimatedAmount}
            onUserChange={() => userEdited("estimatedAmount")}
            placeholder="Enter amount"
            badgeState={badge.estimatedAmount}
            onValidate={() => validate("estimatedAmount")}
            error={errors.estimatedAmount}
          />
          {errors.estimatedAmount && <FieldError message="Please validate this AI-extracted field" />}
        </Section>

        <Divider />

        {/* ── DETAILS ── */}
        <Section>
          <FormSectionTitle>Details</FormSectionTitle>

          {/* Owner — empty, no badge */}
          <div>
            <Label required>Owner</Label>
            <SelectFieldV2
              value={owner}
              onChange={setOwner}
              options={OWNER_OPTIONS}
              placeholder="Select owner"
              error={errors.owner}
            />
            {errors.owner && <FieldError message={errors.owner} />}
          </div>

          {/* Description — AI badge inside textarea */}
          <div>
            <Label required>
              Obligation description
            </Label>
            <div
              style={{
                borderRadius: "var(--radius-md)",
                outline: errors.description
                  ? "1px solid var(--color-interaction-outline-negative)"
                  : "1px solid var(--color-action-outline-secondary-enabled)",
                outlineOffset: -1,
                overflow: "hidden",
              }}
            >
              {/* Toolbar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  padding: "4px 8px",
                  background: "var(--color-general-neutral-light)",
                  borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
                }}
              >
                <div style={{ display: "flex", gap: 2 }}>
                  {["B", "I", "U"].map((f) => (
                    <button
                      key={f}
                      type="button"
                      style={{
                        width: 28, height: 28,
                        background: "none", border: "none",
                        borderRadius: "var(--radius-sm)",
                        cursor: "pointer",
                        fontFamily: "var(--font-family-primary)",
                        fontSize: "var(--text-body-md)",
                        fontWeight: f === "B" ? "bold" : "normal",
                        fontStyle: f === "I" ? "italic" : "normal",
                        textDecoration: f === "U" ? "underline" : "none",
                        color: "var(--color-content-secondary)",
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                {/* AI badge in toolbar corner */}
                {badge.description !== "hidden" && (
                  <AiBadge state={badge.description} onValidate={() => validate("description")} />
                )}
              </div>
              <textarea
                value={description}
                onChange={(e) => { setDescription(e.target.value); userEdited("description"); }}
                rows={4}
                style={{
                  width: "100%",
                  display: "block",
                  border: "none",
                  outline: "none",
                  resize: "vertical",
                  padding: "var(--spacing-3)",
                  fontFamily: "var(--font-family-primary)",
                  fontSize: "var(--text-body-md)",
                  lineHeight: "var(--line-height-body-md)",
                  color: "var(--color-content-primary)",
                  background: "var(--color-general-white)",
                  boxSizing: "border-box",
                }}
              />
            </div>
            {errors.description && <FieldError message="Please validate this AI-extracted field" />}
          </div>
        </Section>

        <Divider />

        {/* ── RESPONSIBILITY ── */}
        <Section>
          <div
            style={{
              borderRadius: "var(--radius-md)",
              outline: "1px solid var(--color-action-outline-secondary-enabled)",
              outlineOffset: -1,
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <FormSectionTitle>Responsibility</FormSectionTitle>
              </div>

              {/* Tabs row with AI badge inline */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", gap: 4 }}>
                  <ResponsibilityTab
                    label="Internal"
                    active={responsibility === "Internal"}
                    onClick={() => { setResponsibility("Internal"); userEdited("responsibility"); }}
                  />
                  <ResponsibilityTab
                    label="External"
                    active={responsibility === "External"}
                    onClick={() => { setResponsibility("External"); userEdited("responsibility"); }}
                  />
                </div>
                {badge.responsibility !== "hidden" && (
                  <AiBadge state={badge.responsibility} onValidate={() => validate("responsibility")} />
                )}
              </div>

              {errors.responsibility && <FieldError message="Please validate this AI-extracted field" />}

              {responsibility === "Internal" && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                  <Icon name="InformationCircle" variant="solid" size="sm" style={{ color: "var(--color-action-fill-primary-enabled)", flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)" }}>
                    <strong style={{ color: "var(--color-content-primary)" }}>Your company</strong> must fulfill and is responsible to manage or perform this obligation
                  </span>
                </div>
              )}
              {responsibility === "External" && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                  <Icon name="InformationCircle" variant="solid" size="sm" style={{ color: "var(--color-action-fill-primary-enabled)", flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)" }}>
                    The <strong style={{ color: "var(--color-content-primary)" }}>counterparty</strong> must fulfill and is responsible to manage or perform this obligation
                  </span>
                </div>
              )}

              {/* From / To with badge */}
              <div>
                <Label>From / To</Label>
                <SelectFieldV2
                  value={fromTo}
                  onChange={setFromTo}
                  onUserChange={() => userEdited("fromTo")}
                  options={FROM_TO_OPTIONS}
                  placeholder="Select party"
                  badgeState={badge.fromTo}
                  onValidate={() => validate("fromTo")}
                  error={errors.fromTo}
                />
                {errors.fromTo && <FieldError message="Please validate this AI-extracted field" />}
              </div>
            </div>
          </div>
        </Section>

        <Divider />

        {/* ── PAGE NUMBER ── */}
        <Section>
          <Label>Page number</Label>
          <SelectFieldV2
            value={pageNumber}
            onChange={setPageNumber}
            options={PAGE_OPTIONS}
            placeholder="Select page"
          />
        </Section>

        <Divider />

        {/* ── NOTIFICATIONS ── */}
        <Section>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <FormSectionTitle>Notifications</FormSectionTitle>
            <Toggle isSelected={sendNotifications} onChange={setSendNotifications} label="Send email notifications" labelPosition="right" size="md" />
          </div>
          {sendNotifications && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 64, height: 40,
                    borderRadius: "var(--radius-md)",
                    outline: "1px solid var(--color-interaction-outline-enabled)",
                    outlineOffset: -1,
                    background: "var(--color-interaction-fill-enabled)",
                    display: "flex",
                  }}
                >
                  <input
                    type="number"
                    value={notificationDays}
                    onChange={(e) => setNotificationDays(e.target.value)}
                    style={{ flex: 1, border: "none", outline: "none", background: "transparent", textAlign: "center", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-lg)", color: "var(--color-content-primary)", padding: "0 8px" }}
                  />
                </div>
                <div style={{ width: 100 }}>
                  <SelectFieldV2 value={notificationUnit} onChange={setNotificationUnit} options={DAYS_OPTIONS} placeholder="Unit" />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                <Icon name="InformationCircle" variant="solid" size="sm" style={{ color: "var(--color-action-fill-primary-enabled)", flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)" }}>
                  The owner of the agreement will receive the alert notification before the obligation forecasted date
                </span>
              </div>
            </>
          )}
        </Section>

        <Divider />

        {/* ── TERMINATION ── */}
        <Section style={{ paddingBottom: 32 }}>
          <FormSectionTitle>Termination</FormSectionTitle>
          <Checkbox isSelected={terminateWithAgreement} onChange={setTerminateWithAgreement} size="sm">
            Terminate obligation when agreement is terminated
          </Checkbox>
        </Section>
      </div>

      {/* ── FOOTER ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 24px",
          borderTop: "1px solid var(--color-action-outline-secondary-enabled)",
          background: "var(--color-general-white)",
          flexShrink: 0,
        }}
      >
        <Button variant="secondary" size="md">Discard</Button>
        <Button variant="secondary" size="md" onClick={handleCreate}>Create</Button>
      </div>
    </div>
  );
}
