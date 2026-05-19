import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { FormSectionTitle } from "../../library/organisms/section/form-section-title.jsx";
import { DocumentViewerPage } from "../../library/templates/document-viewer-page.jsx";
import { CreationFormPanel } from "../../library/organisms/section/creation-form-panel.jsx";
import { Button } from "../../library/atoms/button.jsx";
import { AiButton } from "../../library/atoms/ai-button.jsx";
import Checkbox from "../../library/atoms/checkbox.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { Badge } from "../../library/atoms/badge.jsx";
import { Toggle } from "../../library/atoms/toggle.jsx";
import { TextInput, Label, Input } from "../../library/molecules/text-input.jsx";
import { Textarea } from "../../library/molecules/textarea.jsx";
import MiniInfobox from "../../library/molecules/miniinfobox.jsx";
import EmptyState from "../../library/molecules/empty-state.jsx";
import { useToast } from "../../library/molecules/toast.jsx";
import { Tooltip } from "../../library/atoms/tooltip";
import {
  ObjectHeader,
  ObjectHeaderBackButton,
  ObjectHeaderTopBar,
  ObjectHeaderTopBarLeft,
  ObjectHeaderTopBarRight,
} from "../../library/organisms/object-header.jsx";
import ChipInput from "../../library/molecules/chip-input.jsx";
import { DropdownList, DropdownSection, DropdownListItem } from "../../library/molecules/dropdown-list.jsx";
import cortellisIconUrl from "../../library/atoms/custom-icons/cortellis.svg";

const HUB_PATH = "/library";
const AI_SOURCE_LABEL = "Cortellis";

const DOCUMENT_PAGES = [
  {
    id: "page-1",
    title: "Cover",
    content:
      "Partnership Opportunity Document\n\nStrategic Business Development\n\nPrepared for Review\nQ2 2026 - Confidential",
  },
  {
    id: "page-2",
    title: "Overview",
    content:
      "Company Overview\n\nKey Metrics:\n- 50+ Active partnerships\n- 95% Client satisfaction\n- 30+ Countries served",
  },
  {
    id: "page-3",
    title: "Opportunity Details",
    content:
      "Strategic Opportunity\n\n- Market expansion potential\n- Technology integration capabilities\n- Revenue growth projections",
  },
  {
    id: "page-4",
    title: "Next Steps",
    content:
      "Next Steps\n\n1. Review opportunity details\n2. Validate strategic alignment\n3. Schedule follow-up discussion",
  },
];

const INITIAL_OPPORTUNITIES = [
  {
    id: "opp-1",
    name: "NeuroVanta Therapeutics - NVT-101",
    status: "Active",
    initiative: "",
    assetType: "Pharma/Biotech",
    asset: "NVT-101",
    company: "NeuroVanta Therapeutics",
    opportunityType: "",
    therapeuticArea: "Oncology",
    indications: ["HER2-positive breast cancer", "NSCLC"],
    developmentPhase: "",
    drugType: "Antibody-Drug Conjugate (ADC)",
    description: "NeuroVanta Therapeutics is seeking a research collaboration partner for NVT-101, a next-generation ADC targeting HER2-positive malignancies. The asset has demonstrated promising preclinical efficacy and tolerability, with Phase I trials anticipated in H2 2026.",
    linkedContacts: [
      {
        id: "c1",
        firstName: "Joan",
        lastName: "Liu",
        phone: "+09090909090",
        email: "joan.l@gmail.com",
      },
      {
        id: "c2",
        firstName: "Christine",
        lastName: "Russe",
        phone: "+12345678901",
        email: "christine.r@company.com",
      },
    ],
    linkedMeetings: [],
  },
  {
    id: "opp-2",
    name: "OncoNexa Therapeutics - ONX-317",
    status: "Active",
    initiative: "",
    assetType: "Pharma/Biotech",
    asset: "ONX-317",
    company: "OncoNexa Therapeutics",
    opportunityType: "",
    therapeuticArea: "Oncology",
    indications: ["Solid tumors"],
    developmentPhase: "Phase I",
    drugType: "",
    description: "OncoNexa Therapeutics presents ONX-317, a monoclonal antibody in active Phase I development for solid tumor indications. The company is exploring co-development and licensing partnerships to accelerate global clinical expansion and commercialization.",
    linkedContacts: [
      {
        id: "c3",
        firstName: "Michael",
        lastName: "Chen",
        phone: "+19876543210",
        email: "m.chen@onconexa.com",
      },
    ],
    linkedMeetings: [
      {
        id: "lm1",
        title: "Kickoff Call",
        date: "2026-04-10",
        location: "Zoom",
        notes: "Initial discussion with OncoNexa team.",
      },
    ],
  },
  {
    id: "opp-3",
    name: "CardiaCore Pharma - CCP-045",
    status: "Qualified",
    initiative: "",
    assetType: "Pharma/Biotech",
    asset: "CCP-045",
    company: "CardiaCore Pharma",
    opportunityType: "",
    therapeuticArea: "",
    indications: ["Heart failure"],
    developmentPhase: "Discovery",
    drugType: "Small Molecule",
    description: "CardiaCore Pharma is advancing CCP-045, a small molecule candidate for heart failure, currently in the discovery stage. The company seeks a co-development partner with cardiovascular expertise to support IND-enabling studies and early clinical development.",
    linkedContacts: [],
    linkedMeetings: [
      {
        id: "lm2",
        title: "Due Diligence Review",
        date: "2026-04-12",
        location: "Office 2A",
        notes: "Review of CCP-045 data package.",
      },
      {
        id: "lm3",
        title: "Strategy Session",
        date: "2026-04-15",
        location: "HQ Boardroom",
        notes: "Discuss partnership strategy.",
      },
    ],
  },
  {
    id: "opp-4",
    name: "ImmuniX Therapeutics - IMX-220",
    status: "Active",
    initiative: "",
    assetType: "Pharma/Biotech",
    asset: "IMX-220",
    company: "ImmuniX Therapeutics",
    opportunityType: "",
    therapeuticArea: "",
    indications: [],
    developmentPhase: "",
    drugType: "",
    description: "ImmuniX Therapeutics is out-licensing IMX-220, a biologic asset targeting autoimmune inflammation. The company is open to regional licensing arrangements and seeks partners with established immunology pipelines and commercial infrastructure.",
    linkedContacts: [],
    linkedMeetings: [],
  },
  {
    id: "opp-5",
    name: "GenoSphere Bio - GSB-318",
    status: "Active",
    initiative: "",
    assetType: "Pharma/Biotech",
    asset: "GSB-318",
    company: "GenoSphere Bio",
    opportunityType: "",
    therapeuticArea: "Oncology",
    indications: ["Solid tumors"],
    developmentPhase: "",
    drugType: "",
    description: "GenoSphere Bio is developing GSB-318, a gene therapy platform with applications in solid tumor oncology. The company is actively seeking research collaboration partners to advance preclinical programs and explore translational opportunities in immuno-oncology.",
    linkedContacts: [],
    linkedMeetings: [],
  },
];

const INITIAL_STANDALONE_CONTACTS = [
  {
    id: "sc1",
    firstName: "Julia",
    lastName: "James",
    phone: "+11112223333",
    email: "julia.j@email.com",
  },
  {
    id: "sc2",
    firstName: "Mio",
    lastName: "Heilo",
    phone: "+44455566677",
    email: "mio.h@email.com",
  },
];

const INITIAL_STANDALONE_MEETINGS = [
  {
    id: "m1",
    title: "Due Diligence Review",
    date: "2026-04-12",
    location: "Office 2A",
    notes: "Review of NVT-101 data.",
  },
  {
    id: "m2",
    title: "Strategy Session",
    date: "2026-04-15",
    location: "HQ Boardroom",
    notes: "Discuss partnership strategy.",
  },
];

const AI_SUGGESTIONS_BY_OPPORTUNITY = {
  "opp-1": {
    developmentPhase: "Phase I",
  },
  "opp-2": {
    drugType: "Monoclonal antibody",
  },
  "opp-3": {
    therapeuticArea: "Cardiology",
  },
  "opp-4": {
    therapeuticArea: "Immunology",
    indications: ["Autoimmune inflammation"],
    developmentPhase: "Phase I",
    drugType: "Biologic",
  },
  "opp-5": {
    developmentPhase: "Preclinical",
    drugType: "Gene therapy",
  },
};

// Initiative to Opportunity Type mapping
// - fixedType: Initiative has a locked opportunity type (read-only)
// - null: Initiative allows any opportunity type (or none, can be cleared)
const INITIATIVE_CONFIG = {
  Oncology: { fixedType: null }, // Flexible - user can choose any type or clear
  Cardiology: { fixedType: "Research Collaboration" }, // Fixed type
  Immunology: { fixedType: null }, // Flexible
  Neurology: { fixedType: null }, // Flexible
  "Rare Disease": { fixedType: "Licensing" }, // Fixed type
};

// Opportunity Type additional fields configuration
// - fields: Array of field definitions
// - requiredFields: Array of field keys that are required to create opportunity
const OPPORTUNITY_TYPE_FIELDS = {
  "Research Collaboration": {
    fields: [
      { key: "researchObjective", label: "Research objective" },
      { key: "collaborationScope", label: "Collaboration scope" },
      { key: "ipTerms", label: "IP terms" },
    ],
    requiredFields: ["researchObjective", "collaborationScope"],
  },
  "Co-development": {
    fields: [
      { key: "developmentStage", label: "Development stage" },
      { key: "costSharingModel", label: "Cost sharing model" },
      { key: "territorialRights", label: "Territorial rights" },
      { key: "decisionGovernance", label: "Decision governance" },
    ],
    requiredFields: ["developmentStage", "costSharingModel"],
  },
  Licensing: {
    fields: [
      { key: "licenseType", label: "License type" },
      { key: "exclusivity", label: "Exclusivity" },
      { key: "upfrontPayment", label: "Upfront payment" },
      { key: "milestonePayments", label: "Milestone payments" },
      { key: "royaltyRate", label: "Royalty rate" },
    ],
    requiredFields: ["licenseType", "exclusivity"],
  },
  Acquisition: {
    fields: [
      { key: "acquisitionType", label: "Acquisition type" },
      { key: "valuationRange", label: "Valuation range" },
      { key: "dueDiligenceStatus", label: "Due diligence status" },
    ],
    requiredFields: ["acquisitionType"],
  },
  "Joint Venture": {
    requiresImmediateInfo: true,
    fields: [
      { key: "ventureStructure", label: "Venture structure" },
      { key: "equitySplit", label: "Equity split" },
    ],
    requiredFields: ["ventureStructure", "equitySplit"],
  },
};

// Mock extracted data per opportunity type (simulates AI extraction results)
const MOCK_EXTRACTED_DATA = {
  "Research Collaboration": {
    researchObjective: "Target validation and lead optimization",
    collaborationScope: "Preclinical through Phase I",
    ipTerms: "Joint ownership with exclusive license option",
  },
  "Co-development": {
    developmentStage: "Phase II ready",
    costSharingModel: "50/50 cost and profit share",
    territorialRights: "Worldwide excluding Asia-Pacific",
    decisionGovernance: "Joint steering committee",
  },
  Licensing: {
    licenseType: "Exclusive license",
    exclusivity: "Worldwide exclusive",
    upfrontPayment: "$15M",
    milestonePayments: "Up to $200M",
    royaltyRate: "8-12% tiered",
  },
  Acquisition: {
    acquisitionType: "Asset acquisition",
    valuationRange: "$50M - $75M",
    dueDiligenceStatus: "Initial review complete",
  },
  "Joint Venture": {
    ventureStructure: "NewCo formation",
    equitySplit: "60/40",
    governanceModel: "Board with equal representation",
    exitStrategy: "IPO or acquisition after 5 years",
  },
};

const navigateToPath = (nextPath) => {
  window.history.pushState({}, "", nextPath);
  window.dispatchEvent(new PopStateEvent("popstate"));
};

const styles = {
  headerTitle: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-heading-h2)",
    lineHeight: "var(--line-height-heading-h2)",
    fontWeight: "var(--font-weight-bold)",
    color: "var(--color-content-primary)",
  },
  listItem: {
    width: "100%",
    border: "none",
    borderRadius: "var(--radius-sm)",
    background: "var(--color-general-white)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    padding: "var(--spacing-sm) var(--spacing-md)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-2)",
    cursor: "pointer",
    textAlign: "left",
  },
  listItemLabel: {
    margin: 0,
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    lineHeight: "var(--line-height-body-lg)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  linkedSection: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-3)",
  },
  linkedCard: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-3)",
    padding: "var(--spacing-4)",
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-sm)",
    border: "1px solid var(--color-action-outline-secondary-enabled)",
  },
  linkedCardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "var(--spacing-3)",
  },
  linkMenuWrapper: {
    position: "relative",
    display: "inline-block",
    alignSelf: "flex-start",
  },
  linkMenu: {
    position: "absolute",
    top: "calc(100% + var(--spacing-xs))",
    left: 0,
    zIndex: 100,
    minWidth: 280,
    maxHeight: 320,
    overflowY: "auto",
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-dropdown)",
    border: "1px solid var(--color-action-outline-secondary-enabled)",
    padding: "var(--spacing-xs)",
  },
  linkMenuSectionTitle: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-sm)",
    fontWeight: "var(--font-weight-semibold)",
    color: "var(--color-content-secondary)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    padding: "var(--spacing-xs) var(--spacing-sm)",
  },
  linkMenuItem: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
    padding: "var(--spacing-sm) var(--spacing-md)",
    background: "transparent",
    border: "none",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    color: "var(--color-content-primary)",
    transition: "background var(--transition-fast)",
  },
  editableField: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
  },
  extractMoreSection: {
    border: "1px solid var(--color-action-outline-secondary-enabled)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-sm)",
    padding: "var(--spacing-md)",
    background: "var(--color-general-neutral-lighter)",
    borderRadius: "var(--radius-md)",
    alignItems: "flex-start",
  },
  extractMoreTitle: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    fontWeight: "var(--font-weight-medium)",
    color: "var(--color-content-primary)",
    margin: 0,
  },
  badgeInlineWrap: {
    display: "inline-flex",
    alignSelf: "flex-start",
    width: "fit-content",
    maxWidth: "100%",
    flexShrink: 0,
  },
  badgeContent: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
    whiteSpace: "nowrap",
  },
 badgeIcon: {
  width: 16,
  height: 16,
  flexShrink: 0,
  display: "block",
  objectFit: "contain",
},
  selectField: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
    position: "relative",
  },
  selectTrigger: {
    width: "100%",
    padding: "var(--spacing-sm) var(--spacing-3)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-lg)",
    color: "var(--color-content-primary)",
    background: "var(--color-interaction-fill-enabled)",
    border: "none",
    borderRadius: "var(--radius-md)",
    outline: "1px solid var(--color-interaction-outline-enabled)",
    outlineOffset: "-1px",
    boxSizing: "border-box",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-2)",
    textAlign: "left",
  },
  selectTriggerPlaceholder: {
    color: "var(--color-content-tertiary)",
  },
  selectTriggerContent: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-2)",
    flex: 1,
    minWidth: 0,
  },
  selectTriggerValue: {
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  tooltip: {
    display: "inline-block",
    position: "relative",
  
  },

  revertBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-xxs)",
    padding: "var(--spacing-xxs) var(--spacing-xs)",
    background: "var(--color-general-neutral-lighter)",
    borderRadius: "var(--radius-sm)",
   
    color: "var(--color-content-secondary)",
    cursor: "pointer",
    flexShrink: 0,
    border: "none",
  },
  selectDropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    marginTop: "var(--spacing-1)",
    zIndex: 1000,
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-md)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    boxShadow: "var(--shadow-medium-down)",
    maxHeight: 240,
    overflowY: "auto",
  },
  selectOption: {
    width: "100%",
    padding: "var(--spacing-2) var(--spacing-3)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    color: "var(--color-content-primary)",
    background: "transparent",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-xs)",
  },
  selectOptionSelected: {
    background: "var(--color-general-neutral-lighter)",
  },
};

// Dropdown options
const STATUS_OPTIONS = ["Active", "Qualified", "Pending", "Closed"];
const INITIATIVE_OPTIONS = ["Oncology", "Cardiology", "Immunology", "Neurology", "Rare Disease"];
const ASSET_TYPE_OPTIONS = ["Pharma/Biotech", "Technology", "Organisation", "Consumer Health"];
const ASSET_OPTIONS = ["NVT-101", "ONX-317", "CCP-045", "IMX-220", "GSB-318"];
const COMPANY_OPTIONS = ["NeuroVanta Therapeutics", "CardiaCore Pharma", "ImmuniX Therapeutics", "GenoSphere Bio"];
const NEW_COMPANY_OPTIONS = ["OncoNexa Therapeutics"];
const OPPORTUNITY_TYPE_OPTIONS = ["Research Collaboration", "Co-development", "Licensing", "Acquisition", "Joint Venture"];

// Clinical indications options by category
const INDICATION_OPTIONS = {
  Oncology: [
    { value: "her2-breast", label: "HER2-positive breast cancer", subinfo: "Phase 2" },
    { value: "nsclc", label: "NSCLC", subinfo: "Phase 3" },
    { value: "solid-tumors", label: "Solid tumors", subinfo: "Phase 1" },
    { value: "colorectal", label: "Colorectal cancer", subinfo: "Phase 2" },
    { value: "melanoma", label: "Melanoma", subinfo: "Preclinical" },
  ],
  Neurology: [
    { value: "alzheimers", label: "Alzheimer's disease", subinfo: "Phase 2" },
    { value: "parkinsons", label: "Parkinson's disease", subinfo: "Phase 1" },
    { value: "ms", label: "Multiple sclerosis", subinfo: "Phase 3" },
  ],
  Immunology: [
    { value: "ra", label: "Rheumatoid arthritis", subinfo: "Phase 2" },
    { value: "lupus", label: "Systemic lupus erythematosus", subinfo: "Phase 1" },
    { value: "psoriasis", label: "Psoriasis", subinfo: "Phase 3" },
  ],
};

// SelectField component with dropdown and revert functionality
const SelectField = ({
  label,
  isRequired,
  value,
  options,
  newOptions = [],
  newSectionTitle = "New",
  onChange,
  placeholder = "Select...",
  originalValue,
  onRevert,
  showRevert = false,
  error,
  hint,
  onClear,
  trailingBadge,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [dropdownRect, setDropdownRect] = useState(null);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const portalRef = useRef(null);

  const isModified = showRevert && !!originalValue && value !== originalValue;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        portalRef.current && !portalRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleRevert = (e) => {
    e.stopPropagation();
    if (onRevert) {
      onRevert();
    } else if (originalValue !== undefined) {
      onChange(originalValue);
    }
  };

  const dropdownPositionStyle = dropUp
    ? { bottom: "calc(100% + var(--spacing-1))", top: "auto" }
    : { top: "calc(100% + var(--spacing-1))", bottom: "auto" };

  const openDropdown = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = Math.min(options.length * 44 + 16, 240);
      setDropUp(spaceBelow < dropdownHeight);
      setDropdownRect(rect);
    }
    setIsOpen(true);
  };

  const handleChevronClick = (e) => {
    e.stopPropagation();
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = Math.min(options.length * 44 + 16, 240);
      setDropUp(spaceBelow < dropdownHeight);
      setDropdownRect(rect);
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div style={styles.selectField} ref={dropdownRef}>
      {label && <Label required={isRequired}>{label}</Label>}
      <div ref={triggerRef} style={{ position: "relative" }}>
        <Input
          value={value || ""}
          placeholder={placeholder}
          state={error ? "error" : "default"}
          onChange={(e) => {
            onChange(e.target.value);
            if (!isOpen) openDropdown();
          }}
          onFocus={openDropdown}
          style={{
            paddingRight: 40,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "var(--spacing-3)",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-xs)",
            pointerEvents: "none",
          }}
        >
          {isModified && (
            <Tooltip style={styles.tooltip} placement="bottom-right" content="Revert to AI suggestion">
              <button
                type="button"
                style={{ ...styles.revertBadge, pointerEvents: "auto" }}
                onClick={handleRevert}
                title="Revert to AI suggestion"
              >
                <Icon name="ArrowUturnLeft" size="xs" />
              </button>
            </Tooltip>
          )}
          {trailingBadge && value && (
            <span style={{ pointerEvents: "none" }}>{trailingBadge}</span>
          )}
          {onClear && value && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onClear(); }}
              style={{ pointerEvents: "auto", background: "transparent", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", color: "var(--color-content-tertiary)" }}
            >
              <XCircleIcon style={{ width: 12, height: 12 }} />
            </button>
          )}
          <button
            type="button"
            onClick={handleChevronClick}
            aria-label="Toggle options"
            style={{
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <Icon
              name="ChevronDown"
              size="sm"
              color="var(--color-content-secondary)"
              style={{
                transition: "transform 0.2s",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>
        </div>
      </div>
      {isOpen && dropdownRect && createPortal(
        <div
          ref={portalRef}
          style={{
            position: "fixed",
            top: dropUp ? undefined : dropdownRect.bottom + 4,
            bottom: dropUp ? window.innerHeight - dropdownRect.top + 4 : undefined,
            left: dropdownRect.left,
            width: dropdownRect.width,
            zIndex: 9999,
          }}
        >
          <DropdownList noSearch noAdd>
            {newOptions.length > 0 && (
              <DropdownSection title={newSectionTitle}>
                {newOptions.map((option) => (
                  <DropdownListItem
                    key={`new-${option}`}
                    value={option}
                    checked={value === option}
                    noCheckbox
                    onChange={() => handleSelect(option)}
                    badge={<Badge size="sm" color="neutral">New</Badge>}
                  >
                    {option}
                  </DropdownListItem>
                ))}
              </DropdownSection>
            )}
            <DropdownSection title={newOptions.length > 0 ? "Existing" : undefined}>
              {options.map((option) => (
                <DropdownListItem
                  key={option}
                  value={option}
                  checked={value === option}
                  noCheckbox
                  onChange={() => handleSelect(option)}
                >
                  {option}
                </DropdownListItem>
              ))}
            </DropdownSection>
          </DropdownList>
        </div>,
        document.body
      )}
      {error && (
        <MiniInfobox variant="error" message={error} />
      )}
      {!error && hint && (
        <MiniInfobox variant="info" message={hint} />
      )}
    </div>
  );
};

// ChipInputWithDropdown component - combines ChipInput with DropdownList for multi-select
const ChipInputWithDropdown = ({
  label,
  required,
  chips = [],
  onChange,
  placeholder = "Search...",
  originalChips,
  showRevert = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);

  // Compare arrays to check if modified
  const arraysEqual = (a, b) => {
    if (!a || !b) return false;
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((val, idx) => val === sortedB[idx]);
  };

  const currentValues = chips.map((c) => c.label);
  const originalValues = originalChips || [];
  const isModified = showRevert && !arraysEqual(currentValues, originalValues);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemChange = ({ value, label: itemLabel, checked }) => {
    if (checked) {
      // Add chip
      const newChips = [...chips, { id: value, label: itemLabel }];
      onChange(newChips);
    } else {
      // Remove chip
      const newChips = chips.filter((c) => c.label !== itemLabel);
      onChange(newChips);
    }
  };

  const handleRevert = () => {
    if (originalValues) {
      const revertedChips = originalValues.map((label) => ({ id: label, label }));
      onChange(revertedChips);
    }
  };

  // Filter options based on search
  const filterOptions = (options) => {
    if (!searchQuery) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div style={{ ...styles.selectField, position: "relative" }} ref={containerRef}>
      <ChipInput
        label={label}
        required={required}
        placeholder={placeholder}
        chips={chips}
        onChange={onChange}
        inputValue={searchQuery}
        onInputChange={setSearchQuery}
        isOpen={isOpen}
        onDropdownClick={handleDropdownClick}
        showClear={chips.length > 0}
        onClear={() => onChange([])}
      />
      {isModified && (
        <button
          type="button"
          style={{
            ...styles.revertBadge,
            position: "absolute",
            top: 0,
            right: 0,
            marginTop: "var(--spacing-xs)",
          }}
          onClick={handleRevert}
          title="Revert to original values"
        >
          <Icon name="ArrowUturnLeft" size="xs" />
         
        </button>
      )}
      {isOpen && (
        <div style={{ ...styles.selectDropdown, maxHeight: 320 }}>
          <DropdownList noSearch noAdd>
            {Object.entries(INDICATION_OPTIONS).map(([category, options]) => {
              const filteredOptions = filterOptions(options);
              if (filteredOptions.length === 0) return null;
              return (
                <DropdownSection key={category} title={category}>
                  {filteredOptions.map((opt) => (
                    <DropdownListItem
                      key={opt.value}
                      value={opt.value}
                      checked={chips.some((c) => c.label === opt.label)}
                      onChange={() =>
                        handleItemChange({
                          value: opt.value,
                          label: opt.label,
                          checked: !chips.some((c) => c.label === opt.label),
                        })
                      }
                      subinfo={opt.subinfo}
                    >
                      {opt.label}
                    </DropdownListItem>
                  ))}
                </DropdownSection>
              );
            })}
          </DropdownList>
        </div>
      )}
    </div>
  );
};

const isEmptyValue = (value) => {
  if (Array.isArray(value)) return value.length === 0;
  return value === undefined || value === null || value === "";
};

// Helper to compare arrays
const arraysEqual = (a, b) => {
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((val, idx) => val === sortedB[idx]);
};

const getInitialOpportunityById = (opportunityId) =>
  INITIAL_OPPORTUNITIES.find((opp) => opp.id === opportunityId);

const hasAiSuggestion = (opportunityId, fieldName) => {
  const suggestion = AI_SUGGESTIONS_BY_OPPORTUNITY[opportunityId]?.[fieldName];
  return !isEmptyValue(suggestion);
};

const SourceBadge = ({ label }) => (
  <div style={styles.badgeInlineWrap}>
   <Badge
  color="ai"
  size="md"
  variant="ai"
>
  <span style={styles.badgeContent}>
    <img
      src={cortellisIconUrl}
      alt=""
      aria-hidden="true"
      style={styles.badgeIcon}
    />
    <span>{label}</span>
  </span>
</Badge>
  </div>
);

export const OpportunityExtractionViewerPage = () => {
  const toast = useToast();
  const linkMenuRef = useRef(null);

  const [opportunities, setOpportunities] = useState(INITIAL_OPPORTUNITIES);
  const [fieldErrors, setFieldErrors] = useState({});
  const [standaloneContacts, setStandaloneContacts] = useState(
    INITIAL_STANDALONE_CONTACTS
  );
  const [standaloneMeetings, setStandaloneMeetings] = useState(
    INITIAL_STANDALONE_MEETINGS
  );
  const [view, setView] = useState("list");
  const [selectedId, setSelectedId] = useState(null);
  const [populateMissing, setPopulateMissing] = useState(true);
  const [showLinkMenu, setShowLinkMenu] = useState(false);
  const [applyToAllOpps, setApplyToAllOpps] = useState(true);
  const [extractingOppIds, setExtractingOppIds] = useState([]);
  // Track extracted data per opportunity + initiative: { "opp-1:Oncology": { field: value, ... } }
  const [extractedDataByOppInitiative, setExtractedDataByOppInitiative] = useState({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (linkMenuRef.current && !linkMenuRef.current.contains(event.target)) {
        setShowLinkMenu(false);
      }
    };

    if (showLinkMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLinkMenu]);

  useEffect(() => {
    setShowLinkMenu(false);
  }, [view, selectedId]);

  useEffect(() => {
    if (populateMissing) {
      applyAiToMissingFields();
    }
  }, []);

  const applyAiToMissingFields = () => {
    setOpportunities((prev) =>
      prev.map((opp) => {
        const suggestions = AI_SUGGESTIONS_BY_OPPORTUNITY[opp.id] || {};
        let nextOpp = opp;

        Object.entries(suggestions).forEach(([fieldName, aiValue]) => {
          if (isEmptyValue(nextOpp[fieldName]) && !isEmptyValue(aiValue)) {
            if (nextOpp === opp) nextOpp = { ...opp };
            nextOpp[fieldName] = aiValue;
          }
        });

        return nextOpp;
      })
    );
  };

  const removeAiPopulatedFields = () => {
    setOpportunities((prev) =>
      prev.map((opp) => {
        const initialOpp = getInitialOpportunityById(opp.id);
        if (!initialOpp) return opp;

        let nextOpp = opp;

        Object.keys(AI_SUGGESTIONS_BY_OPPORTUNITY[opp.id] || {}).forEach(
          (fieldName) => {
            const initialValue = initialOpp[fieldName];

            if (isEmptyValue(initialValue)) {
              if (nextOpp === opp) nextOpp = { ...opp };
              nextOpp[fieldName] = Array.isArray(initialValue) ? [] : "";
            }
          }
        );

        return nextOpp;
      })
    );
  };

  const handlePopulateMissingChange = (isSelected) => {
    setPopulateMissing(isSelected);

    if (isSelected) {
      applyAiToMissingFields();
    } else {
      removeAiPopulatedFields();
    }
  };

  const allItems = [
    ...opportunities.map((o) => ({ type: "opportunity", ...o })),
  ];

  const totalItems = allItems.length;
  const selectedIndex = allItems.findIndex((item) => item.id === selectedId);
  const selectedItem = allItems[selectedIndex];
  const hasPrevious = selectedIndex > 0;
  const hasNext = selectedIndex >= 0 && selectedIndex < allItems.length - 1;

  const handleSelectItem = (id, type) => {
    setSelectedId(id);
    setView(type);
    setFieldErrors({});
  };

  const handleBack = () => {
    setView("list");
    setSelectedId(null);
  };

  const handlePrevious = () => {
    if (!hasPrevious) return;
    const prev = allItems[selectedIndex - 1];
    handleSelectItem(prev.id, prev.type);
  };

  const handleNext = () => {
    if (!hasNext) return;
    const next = allItems[selectedIndex + 1];
    handleSelectItem(next.id, next.type);
  };

  const handleExtractMore = () => {
    if (!selectedItem) return;
    const opportunityType = selectedItem.opportunityType || "";

    const targetIds = applyToAllOpps
      ? opportunities.map((o) => o.id)
      : [selectedItem.id];

    setExtractingOppIds((prev) => Array.from(new Set([...prev, ...targetIds])));

    setTimeout(() => {
      setExtractingOppIds((prev) =>
        prev.filter((id) => !targetIds.includes(id))
      );

      // Save extracted data for each opportunity + opportunityType combination
      setExtractedDataByOppInitiative((prev) => {
        const next = { ...prev };
        targetIds.forEach((oppId) => {
          const opp = opportunities.find((o) => o.id === oppId);
          const oppType = opp?.opportunityType || opportunityType;
          const key = `${oppId}:${oppType}`;
          // Get mock data for this opportunity type (empty object when no type set)
          next[key] = MOCK_EXTRACTED_DATA[oppType] || {};
        });
        return next;
      });
    }, 4000);
  };

  // Helper to get extraction key for an opportunity
  const getExtractionKey = (oppId, opportunityType) => `${oppId}:${opportunityType}`;

  // Check if current opportunity + opportunityType has extracted data
  const hasExtractedData = (oppId, opportunityType) => {
    const key = getExtractionKey(oppId, opportunityType || "");
    return !!extractedDataByOppInitiative[key];
  };

  // Get extracted data for current opportunity + opportunityType
  const getExtractedData = (oppId, opportunityType) => {
    const key = getExtractionKey(oppId, opportunityType || "");
    return extractedDataByOppInitiative[key] || null;
  };

  // Update extracted field value
  const updateExtractedField = (oppId, opportunityType, fieldKey, value) => {
    const key = getExtractionKey(oppId, opportunityType);
    setExtractedDataByOppInitiative((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [fieldKey]: value,
      },
    }));
  };

  // Get the fixed opportunity type for an initiative (if any)
  const getFixedOpportunityType = (initiative) => {
    return INITIATIVE_CONFIG[initiative]?.fixedType || null;
  };

  // Check if opportunity type is editable for current initiative
  const isOpportunityTypeEditable = (initiative) => {
    return !INITIATIVE_CONFIG[initiative]?.fixedType;
  };

  const updateOpportunityField = (opportunityId, fieldName, value) => {
    setFieldErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === opportunityId ? { ...opp, [fieldName]: value } : opp
      )
    );
  };

  const updateContactField = (contactId, fieldName, value) => {
    setStandaloneContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId ? { ...contact, [fieldName]: value } : contact
      )
    );
  };

  const updateMeetingField = (meetingId, fieldName, value) => {
    setStandaloneMeetings((prev) =>
      prev.map((meeting) =>
        meeting.id === meetingId ? { ...meeting, [fieldName]: value } : meeting
      )
    );
  };

  const updateLinkedContactField = (
    opportunityId,
    contactId,
    fieldName,
    value
  ) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === opportunityId
          ? {
              ...opp,
              linkedContacts: (opp.linkedContacts || []).map((contact) =>
                contact.id === contactId
                  ? { ...contact, [fieldName]: value }
                  : contact
              ),
            }
          : opp
      )
    );
  };

  const updateLinkedMeetingField = (
    opportunityId,
    meetingId,
    fieldName,
    value
  ) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === opportunityId
          ? {
              ...opp,
              linkedMeetings: (opp.linkedMeetings || []).map((meeting) =>
                meeting.id === meetingId
                  ? { ...meeting, [fieldName]: value }
                  : meeting
              ),
            }
          : opp
      )
    );
  };

  const isAiField = (opportunityId, fieldName) => {
    if (!populateMissing) return false;

    const initialOpp = getInitialOpportunityById(opportunityId);
    const currentOpp = opportunities.find((opp) => opp.id === opportunityId);

    if (!initialOpp || !currentOpp) return false;

    return (
      isEmptyValue(initialOpp[fieldName]) &&
      !isEmptyValue(currentOpp[fieldName]) &&
      hasAiSuggestion(opportunityId, fieldName)
    );
  };

  const renderSourceBadge = (show) =>
    show ? <SourceBadge label={AI_SOURCE_LABEL} /> : null;

  const handleUnlinkContact = (opportunityId, contactId) => {
    const opp = opportunities.find((o) => o.id === opportunityId);
    if (!opp) return;

    const contact = opp.linkedContacts.find((c) => c.id === contactId);
    if (!contact) return;

    setOpportunities((prev) =>
      prev.map((o) =>
        o.id === opportunityId
          ? {
              ...o,
              linkedContacts: o.linkedContacts.filter((c) => c.id !== contactId),
            }
          : o
      )
    );

    setStandaloneContacts((prev) => [...prev, contact]);
    toast.success({
      message: `Contact "${contact.firstName} ${contact.lastName}" unlinked.`,
    });
  };

  const handleUnlinkMeeting = (opportunityId, meetingId) => {
    const opp = opportunities.find((o) => o.id === opportunityId);
    if (!opp) return;

    const meeting = (opp.linkedMeetings || []).find((m) => m.id === meetingId);
    if (!meeting) return;

    setOpportunities((prev) =>
      prev.map((o) =>
        o.id === opportunityId
          ? {
              ...o,
              linkedMeetings: (o.linkedMeetings || []).filter(
                (m) => m.id !== meetingId
              ),
            }
          : o
      )
    );

    setStandaloneMeetings((prev) => [...prev, meeting]);
    toast.success({ message: `Meeting "${meeting.title}" unlinked.` });
  };

  const handleLinkContact = (opportunityId, contactId) => {
    const contact = standaloneContacts.find((c) => c.id === contactId);
    if (!contact) return;

    setOpportunities((prev) =>
      prev.map((o) =>
        o.id === opportunityId
          ? { ...o, linkedContacts: [...(o.linkedContacts || []), contact] }
          : o
      )
    );

    setStandaloneContacts((prev) => prev.filter((c) => c.id !== contactId));
    setShowLinkMenu(false);
    toast.success({
      message: `Contact "${contact.firstName} ${contact.lastName}" linked.`,
    });
  };

  const handleLinkMeeting = (opportunityId, meetingId) => {
    const meeting = standaloneMeetings.find((m) => m.id === meetingId);
    if (!meeting) return;

    setOpportunities((prev) =>
      prev.map((o) =>
        o.id === opportunityId
          ? { ...o, linkedMeetings: [...(o.linkedMeetings || []), meeting] }
          : o
      )
    );

    setStandaloneMeetings((prev) => prev.filter((m) => m.id !== meetingId));
    setShowLinkMenu(false);
    toast.success({ message: `Meeting "${meeting.title}" linked.` });
  };

  const handleDiscard = () => {
    if (!selectedItem) return;

    if (selectedItem.type === "opportunity") {
      const oppName = selectedItem.name;
      setOpportunities((prev) => prev.filter((o) => o.id !== selectedId));
      toast.success({ message: `"${oppName}" discarded.` });
    } else if (selectedItem.type === "contact") {
      const contactName = `${selectedItem.firstName} ${selectedItem.lastName}`;
      setStandaloneContacts((prev) => prev.filter((c) => c.id !== selectedId));
      toast.success({ message: `"${contactName}" discarded.` });
    } else if (selectedItem.type === "meeting") {
      const meetingTitle = selectedItem.title;
      setStandaloneMeetings((prev) => prev.filter((m) => m.id !== selectedId));
      toast.success({ message: `"${meetingTitle}" discarded.` });
    }

    if (hasNext) {
      const next = allItems[selectedIndex + 1];
      handleSelectItem(next.id, next.type);
    } else if (hasPrevious) {
      const prev = allItems[selectedIndex - 1];
      handleSelectItem(prev.id, prev.type);
    } else {
      handleBack();
    }
  };

  const handleCreate = () => {
    if (!selectedItem) return;

    if (selectedItem.type === "opportunity") {
      const errors = {};
      if (!selectedItem.assetType) errors.assetType = "Asset type is required";
      if (selectedItem.assetType !== "Organisation" && !selectedItem.company) errors.company = "Company is required";
      if (selectedItem.assetType !== "Organisation" && !selectedItem.asset) errors.asset = "Asset is required";
      if (!selectedItem.name) errors.name = "Opportunity name is required";
      if (!selectedItem.initiative) errors.initiative = "Initiative is required";

      // Validate required additional fields tied to the selected opportunity type
      const oppType = selectedItem.opportunityType;
      const typeConfig = OPPORTUNITY_TYPE_FIELDS[oppType];
      if (oppType && typeConfig?.requiredFields?.length) {
        const extracted = getExtractedData(selectedItem.id, oppType);
        // Only validate if user has already extracted data for this type
        if (extracted) {
          typeConfig.requiredFields.forEach((fieldKey) => {
            if (!extracted[fieldKey]) {
              const fieldDef = typeConfig.fields.find((f) => f.key === fieldKey);
              errors[fieldKey] = `${fieldDef?.label || fieldKey} is required`;
            }
          });
        }
      }

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }
      setFieldErrors({});
      const oppName = selectedItem.name;
      setOpportunities((prev) => prev.filter((o) => o.id !== selectedId));
      toast.success({ message: `"${oppName}" created.` });
    } else if (selectedItem.type === "contact") {
      const contactName = `${selectedItem.firstName} ${selectedItem.lastName}`;
      setStandaloneContacts((prev) => prev.filter((c) => c.id !== selectedId));
      toast.success({ message: `"${contactName}" created.` });
    } else if (selectedItem.type === "meeting") {
      const meetingTitle = selectedItem.title;
      setStandaloneMeetings((prev) => prev.filter((m) => m.id !== selectedId));
      toast.success({ message: `"${meetingTitle}" created.` });
    }

    if (hasNext) {
      const next = allItems[selectedIndex + 1];
      handleSelectItem(next.id, next.type);
    } else if (hasPrevious) {
      const prev = allItems[selectedIndex - 1];
      handleSelectItem(prev.id, prev.type);
    } else {
      handleBack();
    }
  };

  const headerContent = (
    <ObjectHeader>
      <ObjectHeaderTopBar>
        <ObjectHeaderTopBarLeft>
          <ObjectHeaderBackButton
            label="Back"
            onClick={() => navigateToPath(HUB_PATH)}
          />
          <h1 style={styles.headerTitle}>Deck name</h1>
        </ObjectHeaderTopBarLeft>
        <ObjectHeaderTopBarRight>
          <Button variant="primary" size="md">
            Save and close
          </Button>
        </ObjectHeaderTopBarRight>
      </ObjectHeaderTopBar>
    </ObjectHeader>
  );

  const listContent = (
    <>
      {opportunities.map((opp, index) => (
        <button
          key={opp.id}
          type="button"
          style={styles.listItem}
          onClick={() => handleSelectItem(opp.id, "opportunity")}
        >
          <p style={styles.listItemLabel}>{`${index + 1}. ${opp.name}`}</p>
          <Icon name="ChevronRight" size="sm" />
        </button>
      ))}
    </>
  );

  const opportunityFormContent =
    selectedItem &&
    selectedItem.type === "opportunity" && (
      <>
        <div style={styles.editableField}>
          <SelectField
            label="Asset type"
            isRequired
            value={selectedItem.assetType || ""}
            options={ASSET_TYPE_OPTIONS}
            onChange={(value) =>
              updateOpportunityField(selectedItem.id, "assetType", value)
            }
            originalValue={getInitialOpportunityById(selectedItem.id)?.assetType}
            showRevert={populateMissing}
            error={fieldErrors.assetType}
          />
        </div>

        <div style={styles.editableField}>
          {(() => {
            const fixedType = getFixedOpportunityType(selectedItem.initiative);
            const isReadOnly = !!fixedType;
            const currentValue = isReadOnly ? fixedType : (selectedItem.opportunityType || "");

            if (isReadOnly) {
              // Read-only field for fixed opportunity type
              return (
                <TextInput
                  label="Opportunity type"
                  value={currentValue}
                  readOnly
                  hint={`Fixed for ${selectedItem.initiative} initiative`}
                />
              );
            }

            // Editable field with clear option
            return (
              <SelectField
                label="Opportunity type"
                value={currentValue}
                options={OPPORTUNITY_TYPE_OPTIONS}
                onChange={(value) =>
                  updateOpportunityField(selectedItem.id, "opportunityType", value)
                }
                originalValue={getInitialOpportunityById(selectedItem.id)?.opportunityType}
                showRevert={populateMissing}
                placeholder="Select option"
                onClear={() => updateOpportunityField(selectedItem.id, "opportunityType", "")}
              />
            );
          })()}
        </div>

        <div style={{ ...styles.editableField, position: "relative" }}>
          <SelectField
            label="Company"
            isRequired
            value={selectedItem.company || ""}
            options={
              selectedItem.id === "opp-2"
                ? COMPANY_OPTIONS.filter((c) => c !== selectedItem.company)
                : COMPANY_OPTIONS
            }
            newOptions={
              selectedItem.id === "opp-2" ? NEW_COMPANY_OPTIONS : []
            }
            onChange={(value) =>
              updateOpportunityField(selectedItem.id, "company", value)
            }
            originalValue={getInitialOpportunityById(selectedItem.id)?.company}
            showRevert={populateMissing}
            error={fieldErrors.company}
            trailingBadge={
              selectedItem.id === "opp-2" && NEW_COMPANY_OPTIONS.includes(selectedItem.company) ? (
                <Badge size="sm" color="neutral">New</Badge>
              ) : null
            }
          />
        </div>

        {selectedItem.assetType !== "Organisation" && (
          <div style={styles.editableField}>
            <SelectField
              label="Asset"
              isRequired
              value={selectedItem.asset || ""}
              options={ASSET_OPTIONS}
              onChange={(value) =>
                updateOpportunityField(selectedItem.id, "asset", value)
              }
              originalValue={getInitialOpportunityById(selectedItem.id)?.asset}
              showRevert
              error={fieldErrors.asset}
            />
          </div>
        )}

        <div style={styles.editableField}>
          <TextInput
            label="Opportunity name"
            isRequired
            value={selectedItem.name || ""}
            onChange={(e) =>
              updateOpportunityField(selectedItem.id, "name", e.target.value)
            }
          />
          {fieldErrors.name && <MiniInfobox variant="error" message={fieldErrors.name} />}
        </div>

        <div style={styles.editableField}>
          <SelectField
            label="Initiative"
            isRequired
            value={selectedItem.initiative || ""}
            options={INITIATIVE_OPTIONS}
            onChange={(value) => {
              updateOpportunityField(selectedItem.id, "initiative", value);
              // Auto-set opportunity type if initiative has a fixed type
              const fixedType = getFixedOpportunityType(value);
              if (fixedType) {
                updateOpportunityField(selectedItem.id, "opportunityType", fixedType);
              }
            }}
            originalValue={getInitialOpportunityById(selectedItem.id)?.initiative}
            showRevert
            placeholder="Select option"
            error={fieldErrors.initiative}
          />
        </div>

        <div style={styles.editableField}>
          <Textarea
            label="Description"
            value={selectedItem.description || ""}
            onChange={(e) =>
              updateOpportunityField(selectedItem.id, "description", e.target.value)
            }
          />
        </div>

        {(() => {
          const requiredFilled =
            !!selectedItem.assetType &&
            !!selectedItem.company &&
            !!selectedItem.name &&
            !!selectedItem.initiative &&
            (selectedItem.assetType === "Organisation" || !!selectedItem.asset);
          if (!requiredFilled) return null;
          const isExtracting = extractingOppIds.includes(selectedItem.id);
          // Check if this specific opportunity + opportunityType combination has extracted data
          const isExtracted = hasExtractedData(selectedItem.id, selectedItem.opportunityType);
          if (isExtracted || isExtracting) return null;
          return (
            <div
              ref={(el) => {
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }
              }}
              style={styles.extractMoreSection}
            >
              <p style={styles.extractMoreTitle}>Extract more fields</p>
              <Checkbox
                isSelected={applyToAllOpps}
                onChange={(isSelected) => {
                  setApplyToAllOpps(isSelected);
                  if (isSelected && selectedItem) {
                    setOpportunities((prev) =>
                      prev.map((opp) =>
                        opp.id === selectedItem.id
                          ? opp
                          : {
                              ...opp,
                              initiative: selectedItem.initiative || opp.initiative,
                              opportunityType:
                                selectedItem.opportunityType || opp.opportunityType,
                            }
                      )
                    );
                  }
                }}
                style={{ alignItems: "flex-start" }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-xs)" }}>
                  Apply to other opportunities
                 
                </span>
              </Checkbox>
              <div style={{ width: "100%" }}>
                <AiButton
                  variant="secondary"
                  size="md"
                  iconLeading={<SparklesIcon style={{ width: 16, height: 16 }} />}
                  style={{ width: "100%" }}
                  onClick={handleExtractMore}
                >
                  Extract
                </AiButton>
              </div>
            </div>
          );
        })()}

        {extractingOppIds.includes(selectedItem.id) && (
          <div
            ref={(el) => {
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "end" });
              }
            }}
            style={styles.extractMoreSection}
          >
            <EmptyState
              size="sm"
              illustrationVariant="loader"
              title="Extracting additional fields..."
              description={
                extractingOppIds.length > 1
                  ? "This will take sometime."
                  : "This will take sometime. "
              }
              actionLabel={null}
            />
          </div>
        )}

        {/* Show extracted fields based on current opportunity type */}
        {(() => {
          const opportunityType = selectedItem.opportunityType;
          const typeConfig = OPPORTUNITY_TYPE_FIELDS[opportunityType] || {};
          const typeFields = typeConfig.fields || [];
          const requiredFields = typeConfig.requiredFields || [];
          const showImmediately = !!typeConfig.requiresImmediateInfo;
          const extractedData = getExtractedData(selectedItem.id, opportunityType);
          const fieldValues = extractedData || (showImmediately ? {} : null);

          if (!fieldValues || typeFields.length === 0) return null;

          return (
            <>
              <CreationFormPanel.Divider />
              <FormSectionTitle>
                {showImmediately
                  ? `Additional required information (${opportunityType})`
                  : `Additional information (${opportunityType})`}
              </FormSectionTitle>

              {typeFields.map((field) => {
                const isRequired = requiredFields.includes(field.key);
                return (
                  <div key={field.key} style={styles.editableField}>
                    <TextInput
                      label={field.label}
                      isRequired={isRequired}
                      value={fieldValues[field.key] || ""}
                      error={fieldErrors[field.key]}
                      onChange={(e) => {
                        if (fieldErrors[field.key]) {
                          setFieldErrors((prev) => ({ ...prev, [field.key]: undefined }));
                        }
                        updateExtractedField(
                          selectedItem.id,
                          opportunityType,
                          field.key,
                          e.target.value
                        );
                      }}
                    />
                  </div>
                );
              })}
            </>
          );
        })()}

        {/* Additional fields — kept for future use */}
        {false && (
          <>
        <CreationFormPanel.Divider />
        <FormSectionTitle>Additional required information</FormSectionTitle>

        <div style={styles.editableField}>
          <TextInput
            label="Therapeutic areas"
            value={selectedItem.therapeuticArea || ""}
            onChange={(e) =>
              updateOpportunityField(
                selectedItem.id,
                "therapeuticArea",
                e.target.value
              )
            }
          />
          {renderSourceBadge(isAiField(selectedItem.id, "therapeuticArea"))}
        </div>

        <div style={styles.editableField}>
          <ChipInputWithDropdown
            label="Clinical indications"
            chips={(selectedItem.indications || []).map((ind) => ({
              id: ind,
              label: ind,
            }))}
            onChange={(newChips) =>
              updateOpportunityField(
                selectedItem.id,
                "indications",
                newChips.map((chip) => chip.label)
              )
            }
            originalChips={getInitialOpportunityById(selectedItem.id)?.indications}
            showRevert={populateMissing}
          />
          {populateMissing &&
            arraysEqual(
              selectedItem.indications,
              getInitialOpportunityById(selectedItem.id)?.indications
            ) && <SourceBadge label={AI_SOURCE_LABEL} />}
        </div>

        <div style={styles.editableField}>
          <TextInput
            label="Development phase"
            value={selectedItem.developmentPhase || ""}
            onChange={(e) =>
              updateOpportunityField(
                selectedItem.id,
                "developmentPhase",
                e.target.value
              )
            }
          />
          {renderSourceBadge(isAiField(selectedItem.id, "developmentPhase"))}
        </div>

        <div style={styles.editableField}>
          <TextInput
            label="Drug type"
            value={selectedItem.drugType || ""}
            onChange={(e) =>
              updateOpportunityField(selectedItem.id, "drugType", e.target.value)
            }
          />
          {renderSourceBadge(isAiField(selectedItem.id, "drugType"))}
        </div>

        <CreationFormPanel.Divider />
        <FormSectionTitle>Linked items</FormSectionTitle>

        <MiniInfobox
          variant="info"
          message="Linked items will be created with this opportunity. Unlinked items will move to a separate list for review."
        />

        <div ref={linkMenuRef} style={styles.linkMenuWrapper}>
          <Button
            size="sm"
            iconLeading={<Icon name="Plus" size="sm" />}
            iconTrailing={<Icon name="ChevronDown" size="sm" />}
            variant="secondary"
            onClick={() => setShowLinkMenu(!showLinkMenu)}
            isDisabled={
              standaloneContacts.length === 0 && standaloneMeetings.length === 0
            }
          >
            Add linked extracted items
          </Button>

          {showLinkMenu &&
            (standaloneContacts.length > 0 ||
              standaloneMeetings.length > 0) && (
              <div style={styles.linkMenu}>
                {standaloneContacts.length > 0 && (
                  <>
                    <p style={styles.linkMenuSectionTitle}>Contacts</p>
                    {standaloneContacts.map((contact) => (
                      <button
                        key={contact.id}
                        type="button"
                        style={styles.linkMenuItem}
                        onClick={() =>
                          handleLinkContact(selectedItem.id, contact.id)
                        }
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "var(--color-general-neutral-lighter)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <Icon name="User" size="sm" />
                        <span>
                          {contact.firstName} {contact.lastName}
                        </span>
                      </button>
                    ))}
                  </>
                )}

                {standaloneMeetings.length > 0 && (
                  <>
                    <p style={styles.linkMenuSectionTitle}>Meetings</p>
                    {standaloneMeetings.map((meeting) => (
                      <button
                        key={meeting.id}
                        type="button"
                        style={styles.linkMenuItem}
                        onClick={() =>
                          handleLinkMeeting(selectedItem.id, meeting.id)
                        }
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "var(--color-general-neutral-lighter)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <Icon name="Calendar" size="sm" />
                        <span>{meeting.title}</span>
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}
        </div>

        {selectedItem.linkedContacts && selectedItem.linkedContacts.length > 0 && (
          <div style={styles.linkedSection}>
            <p
              style={{
                fontSize: "var(--text-highlight-lg)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              Contacts
            </p>
            {selectedItem.linkedContacts.map((contact, index) => (
              <div key={contact.id} style={styles.linkedCard}>
                <div style={styles.linkedCardHeader}>
                  <p>Contact {index + 1}</p>
                  <Button
                    variant="secondary"
                    size="sm"
                    iconLeading={<Icon name="Link" size="sm" />}
                    onClick={() =>
                      handleUnlinkContact(selectedItem.id, contact.id)
                    }
                  >
                    Unlink
                  </Button>
                </div>
                <div style={styles.fieldRow}>
                  <TextInput
                    label="First name"
                    value={contact.firstName || ""}
                    onChange={(e) =>
                      updateLinkedContactField(
                        selectedItem.id,
                        contact.id,
                        "firstName",
                        e.target.value
                      )
                    }
                  />
                  <TextInput
                    label="Last name"
                    value={contact.lastName || ""}
                    onChange={(e) =>
                      updateLinkedContactField(
                        selectedItem.id,
                        contact.id,
                        "lastName",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div style={styles.fieldRow}>
                  <TextInput
                    label="Phone"
                    value={contact.phone || ""}
                    onChange={(e) =>
                      updateLinkedContactField(
                        selectedItem.id,
                        contact.id,
                        "phone",
                        e.target.value
                      )
                    }
                  />
                  <TextInput
                    label="Email address"
                    value={contact.email || ""}
                    onChange={(e) =>
                      updateLinkedContactField(
                        selectedItem.id,
                        contact.id,
                        "email",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedItem.linkedMeetings && selectedItem.linkedMeetings.length > 0 && (
          <div style={styles.linkedSection}>
            <p
              style={{
                fontSize: "var(--text-highlight-lg)",
                fontWeight: "var(--font-weight-semibold)",
              }}
            >
              Meetings
            </p>
            {selectedItem.linkedMeetings.map((meeting) => (
              <div key={meeting.id} style={styles.linkedCard}>
                <div style={styles.linkedCardHeader}>
                  <Badge size="md">Meeting</Badge>
                  <Button
                    variant="secondary"
                    size="sm"
                    iconLeading={<Icon name="Link" size="sm" />}
                    onClick={() =>
                      handleUnlinkMeeting(selectedItem.id, meeting.id)
                    }
                  >
                    Unlink
                  </Button>
                </div>
                <TextInput
                  label="Title"
                  value={meeting.title || ""}
                  onChange={(e) =>
                    updateLinkedMeetingField(
                      selectedItem.id,
                      meeting.id,
                      "title",
                      e.target.value
                    )
                  }
                />
                <div style={styles.fieldRow}>
                  <TextInput
                    label="Date"
                    value={meeting.date || ""}
                    onChange={(e) =>
                      updateLinkedMeetingField(
                        selectedItem.id,
                        meeting.id,
                        "date",
                        e.target.value
                      )
                    }
                  />
                  <TextInput
                    label="Location"
                    value={meeting.location || ""}
                    onChange={(e) =>
                      updateLinkedMeetingField(
                        selectedItem.id,
                        meeting.id,
                        "location",
                        e.target.value
                      )
                    }
                  />
                </div>
                <TextInput
                  label="Notes"
                  value={meeting.notes || ""}
                  onChange={(e) =>
                    updateLinkedMeetingField(
                      selectedItem.id,
                      meeting.id,
                      "notes",
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
          </div>
        )}
          </>
        )}
      </>
    );

  const contactFormContent =
    selectedItem &&
    selectedItem.type === "contact" && (
      <>
        <div style={styles.fieldRow}>
          <TextInput
            label="First name"
            value={selectedItem.firstName || ""}
            onChange={(e) =>
              updateContactField(selectedItem.id, "firstName", e.target.value)
            }
          />
          <TextInput
            label="Last name"
            value={selectedItem.lastName || ""}
            onChange={(e) =>
              updateContactField(selectedItem.id, "lastName", e.target.value)
            }
          />
        </div>
        <div style={styles.fieldRow}>
          <TextInput
            label="Phone"
            value={selectedItem.phone || ""}
            onChange={(e) =>
              updateContactField(selectedItem.id, "phone", e.target.value)
            }
          />
          <TextInput
            label="Email address"
            value={selectedItem.email || ""}
            onChange={(e) =>
              updateContactField(selectedItem.id, "email", e.target.value)
            }
          />
        </div>
      </>
    );

  const meetingFormContent =
    selectedItem &&
    selectedItem.type === "meeting" && (
      <>
        <TextInput
          label="Title"
          value={selectedItem.title || ""}
          onChange={(e) =>
            updateMeetingField(selectedItem.id, "title", e.target.value)
          }
        />
        <div style={styles.fieldRow}>
          <TextInput
            label="Date"
            value={selectedItem.date || ""}
            onChange={(e) =>
              updateMeetingField(selectedItem.id, "date", e.target.value)
            }
          />
          <TextInput
            label="Location"
            value={selectedItem.location || ""}
            onChange={(e) =>
              updateMeetingField(selectedItem.id, "location", e.target.value)
            }
          />
        </div>
        <TextInput
          label="Notes"
          value={selectedItem.notes || ""}
          onChange={(e) =>
            updateMeetingField(selectedItem.id, "notes", e.target.value)
          }
        />
      </>
    );

  const getFormContent = () => {
    if (view === "list") return listContent;
    if (view === "opportunity") return opportunityFormContent;
    if (view === "contact") return contactFormContent;
    if (view === "meeting") return meetingFormContent;
    return listContent;
  };

  const getNavigationTitle = () => {
    if (!selectedItem) return "";
    if (selectedItem.type === "opportunity") return selectedItem.name;
    if (selectedItem.type === "contact") {
      return `${selectedItem.firstName} ${selectedItem.lastName}`;
    }
    if (selectedItem.type === "meeting") return selectedItem.title;
    return "";
  };

 const headerButtons = [
  {
    "aria-label": "Information",
    variant: "secondary",
    size: "md",
    iconLeading: <Icon name="InformationCircle" size="sm" />,
  },
  {
    "aria-label": "Flag",
    variant: "secondary",
    size: "md",
    iconLeading: <Icon name="Flag" size="sm" />,
  },
];

const footerButtons =
  view !== "list"
    ? [
        {
          label: "Discard",
          variant: "secondary",
          color: "secondary-destructive",
          onClick: handleDiscard,
          position: "left",
          size: "md",
          style: { flex: 1 },
        },
        {
          label: "Create",
          variant: "secondary",
          onClick: handleCreate,
          position: "right",
          size: "md",
          style: { flex: 1 },
        },
      ]
    : [];

  const formPanelProps = {
    title: "Create opportunity",
    headerButtons,
    infoMessage: "Inaccuracies may occur with AI. Please review carefully.",
    infoVariant: "info",
    showNavigation: view !== "list",
    navigationTitle: getNavigationTitle(),
    onBack: handleBack,
    currentIndex: selectedIndex + 1,
    totalItems,
  
    onPrevious: handlePrevious,
    onNext: handleNext,
    hasPrevious,
    hasNext,
    footerButtons,
  };

  return (
    <DocumentViewerPage
      headerContent={headerContent}
      pages={DOCUMENT_PAGES}
      defaultPage={1}
      useFormPanel
      formPanelProps={formPanelProps}
      formContent={getFormContent()}
      documentViewerProps={{
        style: {
          height: "100%",
          "--document-viewer-height": "100%",
        },
      }}
      style={{ height: "100vh" }}
    />
  );
};

export default OpportunityExtractionViewerPage;