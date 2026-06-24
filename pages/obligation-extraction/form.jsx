"use client";

import { useState, useRef, useEffect } from "react";
import { CheckCircleIcon as CheckCircleOutline } from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolid, SparklesIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon, CalendarIcon, TrashIcon, PlusIcon } from "@heroicons/react/16/solid";
import { RadioButton, RadioGroup } from "../../library/atoms/radio-button.jsx";
import { Button } from "../../library/atoms/button.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { Toggle } from "../../library/atoms/toggle.jsx";
import { Checkbox } from "../../library/atoms/checkbox.jsx";
import { Infobox } from "../../library/molecules/infobox.jsx";
import { FormSectionTitle } from "../../library/organisms/section/form-section-title.jsx";
import { Label } from "../../library/molecules/text-input.jsx";
import { Badge } from "../../library/atoms/badge.jsx";
import {MiniInfobox} from "../../library/molecules/miniinfobox.jsx";

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// CONSTANTS
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// All fields that are AI-populated and need verification
const AI_FIELDS = ["forecastedDate", "estimatedAmount"];

const TYPE_OPTIONS = [
  "Recurring payment",
  "One-time payment",
  "Milestone payment",
  "Royalty",
  "Meeting",
  "Regulatory milestone",
  "Clinical milestone",
  "Commercial milestone",
  "Reporting obligation",
];

const TYPES_WITH_FINANCIAL_DETAILS = [
  "Recurring payment",
  "One-time payment",
  "Milestone payment",
  "Royalty",
  "Regulatory milestone",
  "Clinical milestone",
  "Commercial milestone",
];

const MILESTONE_OPTIONS = [
  "Phase 2 clinical trials",
  "IND submission",
  "NDA approval",
  "Phase 3 enrollment complete",
  "Commercial launch",
];

const ROYALTY_UNIT_OPTIONS = ["Euro", "USD", "GBP", "JPY"];
const DUE_WITHIN_UNIT_OPTIONS = ["Day(s)", "Week(s)", "Month(s)"];
const RECURRING_UNIT_OPTIONS = ["Month(s)", "Week(s)", "Day(s)", "Year(s)"];
const THRESHOLD_DIR_OPTIONS = ["Above", "Below", "Up to"];

const OWNER_OPTIONS = [
  "Joe Mark",
  "Alice Chen",
  "Bob Smith",
  "Sarah Johnson",
  "David Lee",
];

const FROM_TO_OPTIONS = ["LICENSEE", "LICENSOR", "BOTH PARTIES", "THIRD PARTY"];

const DAYS_OPTIONS = ["Days", "Weeks", "Months"];

const PAGE_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// SUB-COMPONENTS
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/** Verify icon button next to AI-populated fields */
function VerifyButton({ isVerified, onVerify, hasError }) {
  return (
    <button
      onClick={onVerify}
      title={isVerified ? "Verified" : "Click to verify"}
      style={{
        flexShrink: 0,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-full)",
        color: isVerified
          ? "var(--color-content-positive)"
          : hasError
          ? "var(--color-content-negative)"
          : "var(--color-content-tertiary)",
        transition: "color var(--transition-fast)",
      }}
    >
      {isVerified ? (
        <CheckCircleSolid width={20} height={20} />
      ) : (
        <CheckCircleOutline width={20} height={20} />
      )}
    </button>
  );
}

/** Field row: wraps an input + verify button side by side */
function VerifiableField({ fieldKey, verified, errors, onVerify, children }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      <div style={{ paddingTop: 26 }}>
        <VerifyButton
          isVerified={verified[fieldKey]}
          hasError={errors[fieldKey]}
          onVerify={() => onVerify(fieldKey)}
        />
      </div>
    </div>
  );
}

/** Custom functional dropdown select */
function SelectField({ value, onChange, options, placeholder, prefix, error }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
        {prefix && (
          <span style={{ flexShrink: 0, color: "var(--color-content-secondary)", display: "flex" }}>
            {prefix}
          </span>
        )}
        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value || placeholder}
        </span>
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
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
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
              onMouseEnter={(e) => {
                if (value !== opt) e.currentTarget.style.background = "var(--color-general-neutral-light)";
              }}
              onMouseLeave={(e) => {
                if (value !== opt) e.currentTarget.style.background = "transparent";
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Simple text input */
function SimpleInput({ value, onChange, placeholder, prefix, error, type = "text" }) {
  const [focused, setFocused] = useState(false);
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
      {prefix && (
        <span style={{ flexShrink: 0, color: "var(--color-content-secondary)", display: "flex" }}>
          {prefix}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
    </div>
  );
}

/** Error helper text */
function FieldError({ message }) {
  if (!message) return null;
  return (
    <p
      style={{
        margin: "4px 0 0",
        fontFamily: "var(--font-family-primary)",
        fontSize: "var(--text-body-md)",
        color: "var(--color-content-negative)",
      }}
    >
      {message}
    </p>
  );
}

/** Divider */
function Divider() {
  return (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid var(--color-action-outline-secondary-enabled)",
        margin: 0,
      }}
    />
  );
}

/** Section wrapper with padding */
function Section({ children, style }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "20px 24px", ...style }}>
      {children}
    </div>
  );
}

/** Responsibility tab button */
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

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// MAIN FORM
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function ObligationForm() {
  // Form field values
  const [title, setTitle] = useState("Subsequent Shares Issuance (Series B Financing)");
  const [type, setType] = useState("Recurring payment");
  const [isMilestone, setIsMilestone] = useState(false);
  const [forecastedDate, setForecastedDate] = useState("2026-06-09");
  const [isRecurring, setIsRecurring] = useState(false);
  const [estimatedAmount, setEstimatedAmount] = useState("$2,500,000");
  const [owner, setOwner] = useState("Joe Mark");
  const [description, setDescription] = useState(
    "Issue additional shares or pay $2,500,000 depending on corporate events."
  );
  const [responsibility, setResponsibility] = useState("Joint");
  const [fromTo, setFromTo] = useState("LICENSEE");
  const [pageNumber, setPageNumber] = useState("1");
  const [sendNotifications, setSendNotifications] = useState(true);
  const [notificationDays, setNotificationDays] = useState("7");
  const [notificationUnit, setNotificationUnit] = useState("Days");
  const [terminateWithAgreement, setTerminateWithAgreement] = useState(true);

  // Recurring pattern state
  const [recurringEvery, setRecurringEvery] = useState(2);
  const [recurringUnit, setRecurringUnit] = useState("Month(s)");
  const [recurringEndDate, setRecurringEndDate] = useState("2028-09-30");

  // Milestone details state
  const [milestoneMode, setMilestoneMode] = useState("existing"); // "existing" | "new"
  const [existingMilestoneTitle, setExistingMilestoneTitle] = useState("Phase 2 clinical trials");
  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");
  const [newMilestoneForecastedDate, setNewMilestoneForecastedDate] = useState("");
  const [newMilestoneDescription, setNewMilestoneDescription] = useState("");
  const [obDueWithin, setObDueWithin] = useState(30);
  const [obDueWithinUnit, setObDueWithinUnit] = useState("Day(s)");

  // Royalty state
  const [royaltyType, setRoyaltyType] = useState("flat"); // "flat" | "tiered"
  const [royaltyBaseUnit, setRoyaltyBaseUnit] = useState("Euro");
  const [royaltyRate, setRoyaltyRate] = useState(2.5);
  const [royaltyThresholdDir, setRoyaltyThresholdDir] = useState("Above");
  const [royaltyThreshold, setRoyaltyThreshold] = useState("30 000 000");
  const [royaltyReduction, setRoyaltyReduction] = useState(true);
  const [royaltyReductionDetails, setRoyaltyReductionDetails] = useState(
    "Minimum Guarantee: A minimum guarantee of $10,000 will be established for the first year."
  );
  const [royaltyStacking, setRoyaltyStacking] = useState(true);
  const [royaltyStackingDetails, setRoyaltyStackingDetails] = useState(
    "This can lead to a cumulative royalty rate that may exceed standard rates, impacting profitability."
  );
  const [estimatedRoyaltyAmount, setEstimatedRoyaltyAmount] = useState("750 000");
  const [royaltyTiers, setRoyaltyTiers] = useState([
    { id: 1, rate: 2.5, dir: "Up to", threshold: "15 000 000" },
    { id: 2, rate: 3.5, dir: "Up to", threshold: "30 000 000" },
  ]);

  // Territories state (for Meeting type)
  const [territories, setTerritories] = useState([{ id: "fr", label: "France" }]);
  const [territoryInput, setTerritoryInput] = useState("");

  // Verification state per AI-populated field
  const [verified, setVerified] = useState({
    title: false,
    type: false,
    forecastedDate: false,
    estimatedAmount: false,
    description: false,
    responsibility: false,
    fromTo: false,
  });

  // Error state (shown after Create attempt)
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Verify a single field
  const verifyField = (fieldKey) => {
    setVerified((prev) => ({ ...prev, [fieldKey]: true }));
    if (submitAttempted) {
      setErrors((prev) => ({ ...prev, [fieldKey]: false }));
    }
  };

  // Verify all AI fields at once
  const verifyAll = () => {
    const allVerified = {};
    AI_FIELDS.forEach((f) => (allVerified[f] = true));
    setVerified(allVerified);
    setErrors({});
  };

  // Count how many are still unverified
  const unverifiedCount = AI_FIELDS.filter((f) => !verified[f]).length;
  const allVerified = unverifiedCount === 0;

  // Royalty tier helpers
  const addTier = () => setRoyaltyTiers((t) => [...t, { id: Date.now(), rate: 0, dir: "Up to", threshold: "" }]);
  const removeTier = (id) => setRoyaltyTiers((t) => t.filter((tier) => tier.id !== id));
  const updateTier = (id, key, val) => setRoyaltyTiers((t) => t.map((tier) => tier.id === id ? { ...tier, [key]: val } : tier));

  // Territory helpers
  const addTerritory = (label) => {
    if (!label.trim()) return;
    setTerritories((prev) => [...prev, { id: Date.now().toString(), label: label.trim() }]);
    setTerritoryInput("");
  };
  const removeTerritory = (id) => setTerritories((prev) => prev.filter((t) => t.id !== id));

  // Handle Create
  const handleCreate = () => {
    const newErrors = {};
    let hasErrors = false;

    // Check unverified AI fields
    AI_FIELDS.forEach((f) => {
      if (!verified[f]) {
        newErrors[f] = true;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    setSubmitAttempted(true);

    if (!hasErrors) {
      alert("Obligation created successfully!");
    }
  };

  const unverifiedErrorFields = AI_FIELDS.filter((f) => submitAttempted && !verified[f]);

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
      {/* â”€â”€ HEADER â”€â”€ */}
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
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-heading-h2)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--color-content-primary)",
          }}
        >
          Create obligation
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Button variant="secondary" size="sm" iconLeading={<Icon name="Plus" size="sm" />}>
            Add
          </Button>
          <Button variant="tertiary" size="sm" iconLeading={<Icon name="InformationCircle" size="sm" />} />
          <Button variant="tertiary" size="sm" iconLeading={<Icon name="Flag" size="sm" />} />
        </div>
      </div>

 <div style={{ padding: "8px 24px 0", flexShrink: 0 }}>
    <MiniInfobox variant="info" message="Inaccuracies may occur with AI. Please review carefully." /> </div>

      {/* â”€â”€ NAVIGATION BAR â”€â”€ */}
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
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: 0,
            color: "var(--color-content-secondary)",
          }}
        >
          <Icon name="ChevronLeft" size="sm" />
        </button>
        <span
          style={{
            flex: 1,
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-body-lg)",
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--color-content-primary)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          Subsequent Shares Issuance (Seri...
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              padding: 2,
              color: "var(--color-content-secondary)",
            }}
          >
            <Icon name="ChevronUp" size="sm" />
          </button>
          <span
            style={{
              fontFamily: "var(--font-family-primary)",
              fontSize: "var(--text-body-md)",
              color: "var(--color-content-secondary)",
            }}
          >
            1 of 20
          </span>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              padding: 2,
              color: "var(--color-content-secondary)",
            }}
          >
            <Icon name="ChevronDown" size="sm" />
          </button>
        </div>
      </div>

      {/* â”€â”€ SOURCE SECTION â”€â”€ */}
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
        <span
          style={{
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-body-md)",
            color: "var(--color-content-secondary)",
          }}
        >
          Source section
        </span>
        <Badge color="teal" label="5.11" />
      </div>

      {/* â”€â”€ SCROLLABLE BODY â”€â”€ */}
      <div style={{ flex: 1, overflowY: "auto" }}>

       

        <Divider />

        {/* â”€â”€ TITLE â”€â”€ */}
        <Section>
          <div>
            <Label htmlFor="title" required>
              Title
            </Label>
            <SimpleInput
              value={title}
              onChange={(v) => setTitle(v)}
              placeholder="Enter title"
              prefix={<SparklesIcon width={16} height={16} />}
            />
          </div>
        </Section>

        <Divider />

        {/* â”€â”€ TYPE â”€â”€ */}
        <Section>
          <div>
            <Label htmlFor="type" required>
              Type
            </Label>
            <SelectField
              value={type}
              onChange={(v) => setType(v)}
              options={TYPE_OPTIONS}
              placeholder="Select type"
              prefix={<Icon name="ArrowsRightLeft" size="sm" />}
            />
          </div>
        </Section>

        <Divider />

        {/* â”€â”€ ROYALTY DETAILS (only for Royalty type) â”€â”€ */}
        {type === "Royalty" && (
          <>
            <Section>
              <FormSectionTitle>Royalty details</FormSectionTitle>

              {/* Royalty type radio */}
              <div>
                <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)" }}>Royalty type:</span>
                <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                  <RadioGroup name="royaltyType" value={royaltyType} onChange={setRoyaltyType} style={{ flexDirection: "row", gap: 24 }}>
                    <RadioButton value="flat">Flat structure</RadioButton>
                    <RadioButton value="tiered">Tiered structure</RadioButton>
                  </RadioGroup>
                </div>
              </div>

              {/* Royalty base unit */}
              <div>
                <Label required>Royalty base unit</Label>
                <SelectField
                  value={royaltyBaseUnit}
                  onChange={setRoyaltyBaseUnit}
                  options={ROYALTY_UNIT_OPTIONS}
                  placeholder="Select unit"
                />
              </div>

              {royaltyType === "flat" && (
                <>
                  {/* Rate row */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)", whiteSpace: "nowrap" }}>Royalty rate of</span>
                    <div style={{ width: 72 }}>
                      <SimpleInput value={String(royaltyRate)} onChange={(v) => setRoyaltyRate(v)} type="number" />
                    </div>
                    <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)" }}>%</span>
                    <div style={{ width: 100 }}>
                      <SelectField value={royaltyThresholdDir} onChange={setRoyaltyThresholdDir} options={THRESHOLD_DIR_OPTIONS} />
                    </div>
                    <VerifyButton isVerified={false} onVerify={() => {}} />
                  </div>
                  {/* Threshold row */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      <SimpleInput value={royaltyThreshold} onChange={setRoyaltyThreshold} placeholder="Threshold amount" />
                    </div>
                    <span style={{
                      padding: "0 12px",
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "var(--radius-md)",
                      background: "var(--color-general-neutral-light)",
                      outline: "1px solid var(--color-action-outline-secondary-enabled)",
                      outlineOffset: -1,
                      fontFamily: "var(--font-family-primary)",
                      fontSize: "var(--text-body-md)",
                      color: "var(--color-content-secondary)",
                    }}>
                      {royaltyBaseUnit}
                    </span>
                  </div>

                  {/* Royalty reduction toggle */}
                  <Toggle isSelected={royaltyReduction} onChange={setRoyaltyReduction} label="Royalty reduction" labelPosition="right" size="md" />
                  {royaltyReduction && (
                    <div>
                      <Label>Royalty reduction details</Label>
                      <textarea
                        value={royaltyReductionDetails}
                        onChange={(e) => setRoyaltyReductionDetails(e.target.value)}
                        rows={3}
                        style={{
                          width: "100%",
                          border: "none",
                          outline: "1px solid var(--color-action-outline-secondary-enabled)",
                          outlineOffset: -1,
                          borderRadius: "var(--radius-md)",
                          resize: "vertical",
                          padding: "var(--spacing-3)",
                          fontFamily: "var(--font-family-primary)",
                          fontSize: "var(--text-body-md)",
                          color: "var(--color-content-primary)",
                          background: "var(--color-general-neutral-light)",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  )}

                  {/* Royalty stacking toggle */}
                  <Toggle isSelected={royaltyStacking} onChange={setRoyaltyStacking} label="Royalty stacking" labelPosition="right" size="md" />
                  {royaltyStacking && (
                    <div>
                      <Label>Royalty stacking details</Label>
                      <textarea
                        value={royaltyStackingDetails}
                        onChange={(e) => setRoyaltyStackingDetails(e.target.value)}
                        rows={3}
                        style={{
                          width: "100%",
                          border: "none",
                          outline: "1px solid var(--color-action-outline-secondary-enabled)",
                          outlineOffset: -1,
                          borderRadius: "var(--radius-md)",
                          resize: "vertical",
                          padding: "var(--spacing-3)",
                          fontFamily: "var(--font-family-primary)",
                          fontSize: "var(--text-body-md)",
                          color: "var(--color-content-primary)",
                          background: "var(--color-general-neutral-light)",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  )}

                  {/* Estimated royalty amount */}
                  <div>
                    <Label>Estimated royalty amount</Label>
                    <SimpleInput value={estimatedRoyaltyAmount} onChange={setEstimatedRoyaltyAmount} placeholder="Amount" />
                  </div>
                </>
              )}

              {royaltyType === "tiered" && (
                <>
                  {royaltyTiers.map((tier, idx) => (
                    <div
                      key={tier.id}
                      style={{
                        borderRadius: "var(--radius-md)",
                        outline: "1px solid var(--color-action-outline-secondary-enabled)",
                        outlineOffset: -1,
                        padding: "12px 16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                      }}
                    >
                      {/* Tier header */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-content-primary)" }}>Tier {idx + 1}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <button type="button" onClick={() => removeTier(tier.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 2, color: "var(--color-content-secondary)" }}>
                            <TrashIcon width={16} height={16} />
                          </button>
                          <VerifyButton isVerified={false} onVerify={() => {}} />
                        </div>
                      </div>
                      {/* Rate row */}
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)", whiteSpace: "nowrap" }}>Royalty rate of</span>
                        <div style={{ width: 72 }}>
                          <SimpleInput value={String(tier.rate)} onChange={(v) => updateTier(tier.id, "rate", v)} type="number" />
                        </div>
                        <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)" }}>%</span>
                        <div style={{ flex: 1 }}>
                          <SelectField value={tier.dir} onChange={(v) => updateTier(tier.id, "dir", v)} options={THRESHOLD_DIR_OPTIONS} />
                        </div>
                      </div>
                      {/* Threshold row */}
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ flex: 1 }}>
                          <SimpleInput value={tier.threshold} onChange={(v) => updateTier(tier.id, "threshold", v)} placeholder="Threshold" />
                        </div>
                        <span style={{
                          padding: "0 12px",
                          height: 40,
                          display: "flex",
                          alignItems: "center",
                          borderRadius: "var(--radius-md)",
                          background: "var(--color-general-neutral-light)",
                          outline: "1px solid var(--color-action-outline-secondary-enabled)",
                          outlineOffset: -1,
                          fontFamily: "var(--font-family-primary)",
                          fontSize: "var(--text-body-md)",
                          color: "var(--color-content-secondary)",
                        }}>
                          {royaltyBaseUnit}
                        </span>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addTier}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "var(--font-family-primary)",
                      fontSize: "var(--text-body-md)",
                      color: "var(--color-action-fill-primary-enabled)",
                      padding: 0,
                    }}
                  >
                    <PlusIcon width={16} height={16} />
                    Add tier
                  </button>
                </>
              )}
            </Section>
            <Divider />
          </>
        )}

        {/* â”€â”€ FORECASTED DATE â”€â”€ */}
        <Section>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <FormSectionTitle>Forecasted date</FormSectionTitle>
            <Toggle
              isSelected={isMilestone}
              onChange={setIsMilestone}
              label="Milestone"
              labelPosition="right"
              size="md"
            />
          </div>

          <div>
            <Label htmlFor="forecasted-date" required>
              Forecasted date
            </Label>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <div
                style={{
                  flex: 1,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "0 var(--spacing-3)",
                  background: isMilestone ? "var(--color-interaction-fill-disabled)" : "var(--color-interaction-fill-enabled)",
                  borderRadius: "var(--radius-md)",
                  outlineStyle: "solid",
                  outlineWidth: 1,
                  outlineOffset: -1,
                  outlineColor: errors.forecastedDate
                    ? "var(--color-interaction-outline-negative)"
                    : "var(--color-interaction-outline-enabled)",
                  boxSizing: "border-box",
                  cursor: isMilestone ? "not-allowed" : "pointer",
                  opacity: isMilestone ? 0.6 : 1,
                }}
              >
                <CalendarIcon
                  width={16}
                  height={16}
                  style={{ color: "var(--color-content-secondary)", flexShrink: 0 }}
                />
                <input
                  id="forecasted-date"
                  type="date"
                  value={forecastedDate}
                  onChange={(e) => { setForecastedDate(e.target.value); setVerified((p) => ({ ...p, forecastedDate: false })); }}
                  disabled={isMilestone}
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontFamily: "var(--font-family-primary)",
                    fontSize: "var(--text-body-lg)",
                    color: forecastedDate ? "var(--color-content-primary)" : "var(--color-content-tertiary)",
                    cursor: isMilestone ? "not-allowed" : "pointer",
                  }}
                  placeholder="Select date"
                />
                <ChevronDownIcon width={16} height={16} style={{ color: "var(--color-content-secondary)", flexShrink: 0 }} />
              </div>
              {!isMilestone && (
                <div style={{ paddingTop: 0, display: "flex", alignItems: "center", height: 40 }}>
                  <VerifyButton
                    isVerified={verified.forecastedDate}
                    hasError={errors.forecastedDate}
                    onVerify={() => verifyField("forecastedDate")}
                  />
                </div>
              )}
            </div>
            {errors.forecastedDate && <FieldError message="Please verify this AI-extracted field" />}
          </div>

          <Toggle
            isSelected={isRecurring}
            onChange={setIsRecurring}
            label="Recurring Pattern"
            labelPosition="right"
            size="md"
          />

          {/* Recurring pattern card */}
          {isRecurring && !isMilestone && (
            <div
              style={{
                borderRadius: "var(--radius-md)",
                outline: "1px solid var(--color-action-outline-secondary-enabled)",
                outlineOffset: -1,
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-lg)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-content-primary)" }}>
                  Recurring pattern
                </span>
                <VerifyButton isVerified={false} onVerify={() => {}} />
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                <Icon name="InformationCircle" variant="solid" size="sm" style={{ color: "var(--color-action-fill-primary-enabled)", flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)" }}>
                  Each instance will share the same details but have a unique date and obligation ID
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)", whiteSpace: "nowrap" }}>Every</span>
                <div style={{ width: 80 }}>
                  <SimpleInput value={String(recurringEvery)} onChange={(v) => setRecurringEvery(v)} type="number" />
                </div>
                <div style={{ flex: 1 }}>
                  <SelectField
                    value={recurringUnit}
                    onChange={setRecurringUnit}
                    options={RECURRING_UNIT_OPTIONS}
                    placeholder="Unit"
                  />
                </div>
                <span style={{ color: "var(--color-content-negative)", fontSize: "var(--text-body-md)" }}>*</span>
              </div>
              <div>
                <Label required>Forecasted end date</Label>
                <div
                  style={{
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "0 var(--spacing-3)",
                    background: "var(--color-interaction-fill-enabled)",
                    borderRadius: "var(--radius-md)",
                    outline: "1px solid var(--color-interaction-outline-enabled)",
                    outlineOffset: -1,
                    boxSizing: "border-box",
                    cursor: "pointer",
                  }}
                >
                  <CalendarIcon width={16} height={16} style={{ color: "var(--color-content-secondary)", flexShrink: 0 }} />
                  <input
                    type="date"
                    value={recurringEndDate}
                    onChange={(e) => setRecurringEndDate(e.target.value)}
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontFamily: "var(--font-family-primary)",
                      fontSize: "var(--text-body-lg)",
                      color: recurringEndDate ? "var(--color-content-primary)" : "var(--color-content-tertiary)",
                      cursor: "pointer",
                    }}
                  />
                  <ChevronDownIcon width={16} height={16} style={{ color: "var(--color-content-secondary)", flexShrink: 0 }} />
                </div>
              </div>
            </div>
          )}

          {/* Milestone details card */}
          {isMilestone && (
            <div
              style={{
                borderRadius: "var(--radius-md)",
                outline: "1px solid var(--color-action-outline-secondary-enabled)",
                outlineOffset: -1,
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-lg)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-content-primary)" }}>
                Milestone details
              </span>
              <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)" }}>
                This event's success will trigger all the obligations linked to it
              </span>
              {/* Tabs */}
              <div style={{ display: "flex", gap: 4 }}>
                <ResponsibilityTab label="Existing milestone" active={milestoneMode === "existing"} onClick={() => setMilestoneMode("existing")} />
                <ResponsibilityTab label="New milestone" active={milestoneMode === "new"} onClick={() => setMilestoneMode("new")} />
              </div>

              {milestoneMode === "existing" && (
                <>
                  <div>
                    <Label required>Milestone title</Label>
                    <SelectField
                      value={existingMilestoneTitle}
                      onChange={setExistingMilestoneTitle}
                      options={MILESTONE_OPTIONS}
                      placeholder="Select milestone"
                    />
                  </div>
                  {existingMilestoneTitle && (
                    <div
                      style={{
                        borderRadius: "var(--radius-md)",
                        borderLeft: "3px solid var(--color-action-fill-primary-enabled)",
                        background: "var(--color-general-neutral-light)",
                        padding: "12px 16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-content-primary)" }}>
                        {existingMilestoneTitle}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <CalendarIcon width={14} height={14} style={{ color: "var(--color-content-secondary)" }} />
                          <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-sm)", color: "var(--color-content-secondary)" }}>June 30, 2026</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--color-content-positive)", display: "inline-block" }} />
                          <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-sm)", color: "var(--color-content-secondary)" }}>On track</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {milestoneMode === "new" && (
                <>
                  <div>
                    <Label required>Milestone title</Label>
                    <SimpleInput value={newMilestoneTitle} onChange={setNewMilestoneTitle} placeholder="Enter milestone title" />
                  </div>
                  <div>
                    <Label required>Forecasted date</Label>
                    <div
                      style={{
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "0 var(--spacing-3)",
                        background: "var(--color-interaction-fill-enabled)",
                        borderRadius: "var(--radius-md)",
                        outline: "1px solid var(--color-interaction-outline-enabled)",
                        outlineOffset: -1,
                        boxSizing: "border-box",
                      }}
                    >
                      <CalendarIcon width={16} height={16} style={{ color: "var(--color-content-secondary)", flexShrink: 0 }} />
                      <input
                        type="date"
                        value={newMilestoneForecastedDate}
                        onChange={(e) => setNewMilestoneForecastedDate(e.target.value)}
                        style={{
                          flex: 1,
                          border: "none",
                          outline: "none",
                          background: "transparent",
                          fontFamily: "var(--font-family-primary)",
                          fontSize: "var(--text-body-lg)",
                          color: newMilestoneForecastedDate ? "var(--color-content-primary)" : "var(--color-content-tertiary)",
                        }}
                      />
                      <ChevronDownIcon width={16} height={16} style={{ color: "var(--color-content-secondary)", flexShrink: 0 }} />
                    </div>
                  </div>
                  <div>
                    <Label>
                      Milestone description
                      <SparklesIcon width={14} height={14} style={{ marginLeft: 4, color: "var(--color-content-secondary)" }} />
                    </Label>
                    <textarea
                      value={newMilestoneDescription}
                      onChange={(e) => setNewMilestoneDescription(e.target.value)}
                      rows={3}
                      style={{
                        width: "100%",
                        border: "none",
                        outline: "1px solid var(--color-action-outline-secondary-enabled)",
                        outlineOffset: -1,
                        borderRadius: "var(--radius-md)",
                        resize: "vertical",
                        padding: "var(--spacing-3)",
                        fontFamily: "var(--font-family-primary)",
                        fontSize: "var(--text-body-md)",
                        color: "var(--color-content-primary)",
                        background: "var(--color-general-neutral-light)",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </>
              )}

              {/* Obligation due within */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)", whiteSpace: "nowrap" }}>Obligation due within</span>
                <div style={{ width: 72 }}>
                  <SimpleInput value={String(obDueWithin)} onChange={(v) => setObDueWithin(v)} type="number" />
                </div>
                <div style={{ width: 110 }}>
                  <SelectField value={obDueWithinUnit} onChange={setObDueWithinUnit} options={DUE_WITHIN_UNIT_OPTIONS} />
                </div>
                <span style={{ color: "var(--color-content-negative)", fontSize: "var(--text-body-md)" }}>*</span>
              </div>
              <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)" }}>
                after the milestone is successful
              </span>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                <Icon name="InformationCircle" variant="solid" size="sm" style={{ color: "var(--color-action-fill-primary-enabled)", flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-action-fill-primary-enabled)" }}>
                  The agreement owner will also be assigned as the milestone owner
                </span>
              </div>
            </div>
          )}
        </Section>

        <Divider />

        {/* â”€â”€ FINANCIAL DETAILS (hidden for Meeting and Royalty types) â”€â”€ */}
        {TYPES_WITH_FINANCIAL_DETAILS.includes(type) && type !== "Royalty" && (
          <Section>
            <FormSectionTitle>Financial details</FormSectionTitle>
            <VerifiableField fieldKey="estimatedAmount" verified={verified} errors={errors} onVerify={verifyField}>
              <Label htmlFor="estimated-amount" required>
                Estimated amount
              </Label>
              <SimpleInput
                value={estimatedAmount}
                onChange={(v) => { setEstimatedAmount(v); setVerified((p) => ({ ...p, estimatedAmount: false })); }}
                placeholder="Enter amount"
                prefix={<SparklesIcon width={16} height={16} />}
                error={errors.estimatedAmount}
              />
              {errors.estimatedAmount && <FieldError message="Please verify this AI-extracted field" />}
            </VerifiableField>
          </Section>
        )}

        <Divider />
        <Section>
          <FormSectionTitle>Details</FormSectionTitle>

          {/* Owner â€” empty (AI couldn't fill) */}
          <div>
            <Label htmlFor="owner" required>
              Owner
            </Label>
            <SelectField
              value={owner}
              onChange={setOwner}
              options={OWNER_OPTIONS}
              placeholder="Select owner"
            />
          </div>

          {/* Obligation description */}
          <div>
            <Label>
              Obligation description
              <SparklesIcon
                width={14}
                height={14}
                style={{ marginLeft: 4, color: "var(--color-content-secondary)" }}
              />
            </Label>
            <div
              style={{
                borderRadius: "var(--radius-md)",
                outline: "1px solid var(--color-action-outline-secondary-enabled)",
                outlineOffset: -1,
                overflow: "hidden",
              }}
            >
              {/* Toolbar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  padding: "4px 8px",
                  background: "var(--color-general-neutral-light)",
                  borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
                }}
              >
                {["B", "I", "U"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    style={{
                      width: 28,
                      height: 28,
                      background: "none",
                      border: "none",
                      borderRadius: "var(--radius-sm)",
                      cursor: "pointer",
                      fontFamily: "var(--font-family-primary)",
                      fontSize: "var(--text-body-md)",
                      fontWeight: f === "B" ? "bold" : f === "I" ? "normal" : "normal",
                      fontStyle: f === "I" ? "italic" : "normal",
                      textDecoration: f === "U" ? "underline" : "none",
                      color: "var(--color-content-secondary)",
                    }}
                  >
                    {f}
                  </button>
                ))}
                <div style={{ width: 1, height: 20, background: "var(--color-action-outline-secondary-enabled)", margin: "0 4px" }} />
                {["â‰¡", "â‰”"].map((f, i) => (
                  <button
                    key={i}
                    type="button"
                    style={{
                      width: 28,
                      height: 28,
                      background: "none",
                      border: "none",
                      borderRadius: "var(--radius-sm)",
                      cursor: "pointer",
                      color: "var(--color-content-secondary)",
                      fontSize: 14,
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
              {/* Editor */}
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
          </div>
        </Section>

        <Divider />

        {/* â”€â”€ RESPONSIBILITY â”€â”€ */}
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
              {/* Section header */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <FormSectionTitle>Responsibility</FormSectionTitle>
                <Badge color="purple" label="AI" />
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: 4 }}>
                <ResponsibilityTab
                  label="Joint"
                  active={responsibility === "Joint"}
                  onClick={() => setResponsibility("Joint")}
                />
                <ResponsibilityTab
                  label="Internal"
                  active={responsibility === "Internal"}
                  onClick={() => setResponsibility("Internal")}
                />
                <ResponsibilityTab
                  label="External"
                  active={responsibility === "External"}
                  onClick={() => setResponsibility("External")}
                />
              </div>

              {/* Info line */}
              {responsibility === "Joint" && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                  <Icon name="InformationCircle" variant="solid" size="sm" style={{ color: "var(--color-action-fill-primary-enabled)", flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)" }}>
                    <strong style={{ color: "var(--color-content-primary)" }}>Both parties</strong> must contribute or complete this obligation together
                  </span>
                </div>
              )}
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

              {/* From / To */}
              <div>
                <Label>From / To</Label>
                <SelectField
                  value={fromTo}
                  onChange={(v) => setFromTo(v)}
                  options={FROM_TO_OPTIONS}
                  placeholder="Select party"
                />
              </div>
            </div>
          </div>
        </Section>

        <Divider />

        {/* â”€â”€ PAGE NUMBER â”€â”€ */}
        <Section>
          <div>
            <Label htmlFor="page-number">Page number</Label>
            <SelectField
              value={pageNumber}
              onChange={setPageNumber}
              options={PAGE_OPTIONS}
              placeholder="Select page"
            />
          </div>
        </Section>

        <Divider />

        {/* â”€â”€ TERRITORIES (Meeting type only) â”€â”€ */}
        {type === "Meeting" && (
          <>
            <Section>
              <div>
                <Label>Territories</Label>
                <div
                  style={{
                    minHeight: 40,
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 6,
                    padding: "6px var(--spacing-3)",
                    background: "var(--color-interaction-fill-enabled)",
                    borderRadius: "var(--radius-md)",
                    outline: "1px solid var(--color-interaction-outline-enabled)",
                    outlineOffset: -1,
                    boxSizing: "border-box",
                  }}
                >
                  {territories.map((t) => (
                    <span
                      key={t.id}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "2px 8px",
                        borderRadius: "var(--radius-full)",
                        background: "var(--color-general-neutral-medium)",
                        fontFamily: "var(--font-family-primary)",
                        fontSize: "var(--text-body-md)",
                        color: "var(--color-content-primary)",
                      }}
                    >
                      {t.label}
                      <button
                        type="button"
                        onClick={() => removeTerritory(t.id)}
                        style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 0, color: "var(--color-content-secondary)" }}
                      >
                        <ChevronDownIcon width={14} height={14} />
                      </button>
                    </span>
                  ))}
                  <input
                    value={territoryInput}
                    onChange={(e) => setTerritoryInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTerritory(territoryInput); } }}
                    placeholder={territories.length === 0 ? "Type and press Enter" : ""}
                    style={{
                      flex: 1,
                      minWidth: 80,
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontFamily: "var(--font-family-primary)",
                      fontSize: "var(--text-body-md)",
                      color: "var(--color-content-primary)",
                    }}
                  />
                  <ChevronDownIcon width={16} height={16} style={{ color: "var(--color-content-secondary)", flexShrink: 0 }} />
                </div>
              </div>
            </Section>
            <Divider />
          </>
        )}

        {/* â”€â”€ NOTIFICATIONS â”€â”€ */}
        <Section>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <FormSectionTitle>Notifications</FormSectionTitle>
            <Toggle
              isSelected={sendNotifications}
              onChange={setSendNotifications}
              label="Send email notifications"
              labelPosition="right"
              size="md"
            />
          </div>

          {sendNotifications && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* Number input */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: 64,
                    height: 40,
                    position: "relative",
                    borderRadius: "var(--radius-md)",
                    outline: "1px solid var(--color-interaction-outline-enabled)",
                    outlineOffset: -1,
                    overflow: "hidden",
                    background: "var(--color-interaction-fill-enabled)",
                  }}
                >
                  <input
                    type="number"
                    value={notificationDays}
                    onChange={(e) => setNotificationDays(e.target.value)}
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      textAlign: "center",
                      fontFamily: "var(--font-family-primary)",
                      fontSize: "var(--text-body-lg)",
                      color: "var(--color-content-primary)",
                      padding: "0 8px",
                    }}
                  />
                </div>
                {/* Unit dropdown */}
                <div style={{ width: 100 }}>
                  <SelectField
                    value={notificationUnit}
                    onChange={setNotificationUnit}
                    options={DAYS_OPTIONS}
                    placeholder="Unit"
                  />
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

        {/* â”€â”€ TERMINATION â”€â”€ */}
        <Section style={{ paddingBottom: 32 }}>
          <FormSectionTitle>Termination</FormSectionTitle>
          <Checkbox
            isSelected={terminateWithAgreement}
            onChange={setTerminateWithAgreement}
            size="sm"
          >
            Terminate obligation when agreement is terminated
          </Checkbox>
        </Section>
      </div>

      {/* â”€â”€ FOOTER â”€â”€ */}
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
        <Button variant="tertiary" size="md" style={{ color: "var(--color-content-negative)" }}>
          Discard
        </Button>
        <Button variant="secondary" size="md" onClick={handleCreate}>
          Create
        </Button>
      </div>
    </div>
  );
}

