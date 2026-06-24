import { useState, useEffect, useRef } from "react";
import { RadioCard, RadioCardGroup } from "../../library/molecules/radio-card.jsx";
import { FormSectionTitle } from "../../library/organisms/section/form-section-title.jsx";
import { DocumentViewerPage } from "../../library/templates/document-viewer-page.jsx";
import { CreationFormPanel } from "../../library/organisms/section/creation-form-panel.jsx";
import { Button } from "../../library/atoms/button.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { Badge } from "../../library/atoms/badge.jsx";
import { Toggle } from "../../library/atoms/toggle.jsx";
import { TextInput, Label } from "../../library/molecules/text-input.jsx";
import MiniInfobox from "../../library/molecules/miniinfobox.jsx";
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
    initiative: "Oncology",
    asset: "NVT-101",
    company: "NeuroVanta Therapeutics",
    opportunityType: "Research Collaboration",
    therapeuticArea: "Oncology",
    indications: ["HER2-positive breast cancer", "NSCLC"],
    developmentPhase: "",
    drugType: "Antibody-Drug Conjugate (ADC)",
    linkedContacts: [
      {
        id: "c1",
        firstName: "Joan",
        lastName: "Liu",
        phone: "+09090909090",
        email: "joan.l@gmail.com",
        matchStatus: "matches_found",
        selectedMatchId: "mc1",
        matchCandidates: [
          { id: "mc1", name: "Joan Liu", score: "High", subtitle: "OncoNexa Therapeutics · Manager" },
          { id: "mc2", name: "Joan Lius", score: "Low", subtitle: "OncoNexa · Manager" },
        ],
      },
      {
        id: "c2",
        firstName: "Anna",
        lastName: "Rusie",
        phone: "",
        email: "",
        matchStatus: "new",
        selectedMatchId: null,
        matchCandidates: [],
      },
    ],
    linkedCompany: {
      id: "comp1",
      name: "Biopharma",
      matchStatus: "matches_found",
      selectedMatchId: "mcomp1",
      matchCandidates: [
        { id: "mcomp1", name: "Biopharma", score: "High", subtitle: "Pharma · Paris" },
      ],
    },
    linkedMeetings: [
      {
        id: "lm1",
        title: "OncoNova Biotech",
        matchStatus: "exact_match",
        selectedMatchId: "mlm1",
        matchCandidates: [
          { id: "mlm1", name: "OncoNova Biotech", score: "High", subtitle: "Discovery meeting · July 12, 2026" },
        ],
      },
    ],
  },
  {
    id: "opp-2",
    name: "OncoNexa Therapeutics - ONX-317",
    status: "Active",
    initiative: "Oncology",
    asset: "ONX-317",
    company: "OncoNexa Therapeutics",
    opportunityType: "Research Collaboration",
    therapeuticArea: "Oncology",
    indications: ["Solid tumors"],
    developmentPhase: "Phase I",
    drugType: "",
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
    initiative: "Cardiology",
    asset: "CCP-045",
    company: "CardiaCore Pharma",
    opportunityType: "Co-development",
    therapeuticArea: "",
    indications: ["Heart failure"],
    developmentPhase: "Discovery",
    drugType: "Small Molecule",
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
    initiative: "Immunology",
    asset: "IMX-220",
    company: "ImmuniX Therapeutics",
    opportunityType: "Licensing",
    therapeuticArea: "",
    indications: [],
    developmentPhase: "",
    drugType: "",
    linkedContacts: [],
    linkedMeetings: [],
  },
  {
    id: "opp-5",
    name: "GenoSphere Bio - GSB-318",
    status: "Active",
    initiative: "Oncology",
    asset: "GSB-318",
    company: "GenoSphere Bio",
    opportunityType: "Research Collaboration",
    therapeuticArea: "Oncology",
    indications: ["Solid tumors"],
    developmentPhase: "",
    drugType: "",
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
    marginTop: "var(--spacing-xs)",
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
  linkedSectionToggle: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-2)",
    padding: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-heading-h5)",
    lineHeight: "var(--line-height-heading-h5)",
    fontWeight: "var(--font-weight-semibold)",
    color: "var(--color-content-primary)",
  },
  linkedSectionBody: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-4)",
    marginTop: "var(--spacing-3)",
  },
  linkedInfoboxRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "var(--spacing-2)",
  },
  linkedEntityGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-2)",
  },
  linkedEntityGroupHeader: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-2)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-sm)",
    fontWeight: "var(--font-weight-semibold)",
    color: "var(--color-content-primary)",
  },
  linkedItemCard: {
    border: "1px solid var(--color-action-outline-secondary-enabled)",
    borderRadius: "var(--radius-sm)",
    background: "var(--color-general-white)",
    overflow: "hidden",
  },
  linkedItemCardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "var(--spacing-3) var(--spacing-4)",
    gap: "var(--spacing-2)",
  },
  linkedItemCardHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-2)",
    overflow: "hidden",
    flexShrink: 1,
  },
  linkedItemCardName: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-medium)",
    color: "var(--color-content-primary)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: 0,
  },
  linkedItemCardHeaderRight: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-1)",
    flexShrink: 0,
  },
  linkedItemIconBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "var(--spacing-1)",
    display: "flex",
    alignItems: "center",
    color: "var(--color-content-secondary)",
    borderRadius: "var(--radius-xs)",
  },
  linkedItemCardBody: {
    padding: "var(--spacing-3) var(--spacing-4) var(--spacing-4)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-3)",
    borderTop: "1px solid var(--color-action-outline-secondary-enabled)",
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
  },
  selectOptionSelected: {
    background: "var(--color-general-neutral-lighter)",
  },
};

// Dropdown options
const STATUS_OPTIONS = ["Active", "Qualified", "Pending", "Closed"];
const INITIATIVE_OPTIONS = ["Oncology", "Cardiology", "Immunology", "Neurology", "Rare Disease"];
const ASSET_OPTIONS = ["NVT-101", "ONX-317", "CCP-045", "IMX-220", "GSB-318"];
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
  onChange,
  placeholder = "Select...",
  originalValue,
  onRevert,
  showRevert = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHoveredOption, setIsHoveredOption] = useState(null);
  const dropdownRef = useRef(null);

  const isModified = showRevert && originalValue !== undefined && value !== originalValue;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
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

  return (
    <div style={styles.selectField} ref={dropdownRef}>
      {label && <Label required={isRequired}>{label}</Label>}
      <button
        type="button"
        style={styles.selectTrigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={styles.selectTriggerContent}>
          <span style={{
            ...styles.selectTriggerValue,
            ...(!value ? styles.selectTriggerPlaceholder : {}),
          }}>
            {value || placeholder}
          </span>
          {isModified && (
         <Tooltip style={styles.tooltip} placement="bottom-right" content="Revert to AI suggestion">
  <button
    type="button"
    style={styles.revertBadge}
    onClick={handleRevert}
    title="Revert to AI suggestion"
  >
    <Icon name="ArrowUturnLeft" size="xs" />
  </button>
</Tooltip>
          )}
        </div>
        <Icon
          name="ChevronDown"
          size="sm"
          style={{
            transition: "transform 0.2s",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      {isOpen && (
        <div style={styles.selectDropdown}>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              style={{
                ...styles.selectOption,
                ...(value === option ? styles.selectOptionSelected : {}),
                ...(isHoveredOption === option && value !== option ? { background: "var(--color-general-neutral-lighter)" } : {}),
              }}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setIsHoveredOption(option)}
              onMouseLeave={() => setIsHoveredOption(null)}
            >
              <span>{option}</span>
              {value === option && <Icon name="Check" size="sm" color="var(--color-content-brand)" />}
            </button>
          ))}
        </div>
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

const MATCH_STATUS_LABELS = {
  matches_found: "Matches found",
  exact_match: "Exact match",
  new: "New",
};

const MATCH_STATUS_COLORS = {
  matches_found: "info",
  exact_match: "success",
  new: "neutral",
};

const LinkedItemCard = ({
  icon,
  name,
  matchStatus,
  matchCandidates = [],
  selectedMatchId,
  isExpanded,
  onToggle,
  onSelectMatch,
  onUnlink,
  formContent,
}) => {
  const statusLabel = MATCH_STATUS_LABELS[matchStatus] || matchStatus;
  const statusColor = MATCH_STATUS_COLORS[matchStatus] || "neutral";
  const showCreateNew = matchStatus !== "exact_match";

  return (
    <div style={styles.linkedItemCard}>
      <div style={styles.linkedItemCardHeader}>
        <div style={styles.linkedItemCardHeaderLeft}>
          {icon}
          <p style={styles.linkedItemCardName}>{name}</p>
          <Badge size="sm" color={statusColor}>{statusLabel}</Badge>
        </div>
        <div style={styles.linkedItemCardHeaderRight}>
          <button style={styles.linkedItemIconBtn} type="button" onClick={onUnlink}>
            <Icon name="ExternalLink" size="sm" />
          </button>
          <button style={styles.linkedItemIconBtn} type="button" onClick={onToggle}>
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size="sm" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div style={styles.linkedItemCardBody}>
          {matchCandidates.length > 0 ? (
            <>
              <RadioCardGroup
                value={selectedMatchId}
                onChange={onSelectMatch}
                style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-2)" }}
              >
                {matchCandidates.map((candidate) => (
                  <RadioCard
                    key={candidate.id}
                    value={candidate.id}
                    label={
                      <span style={{ display: "flex", alignItems: "center", gap: "var(--spacing-2)" }}>
                        {candidate.name}
                        <Badge
                          size="sm"
                          color={candidate.score === "High" ? "success" : "warning"}
                        >
                          {candidate.score}
                        </Badge>
                      </span>
                    }
                    info={candidate.subtitle}
                    action={
                      <button
                        style={styles.linkedItemIconBtn}
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icon name="ExternalLink" size="sm" />
                      </button>
                    }
                  />
                ))}
                {showCreateNew && (
                  <RadioCard
                    value={null}
                    label={
                      <span style={{ display: "flex", alignItems: "center", gap: "var(--spacing-2)" }}>
                        <Icon name="Plus" size="sm" />
                        Create new
                      </span>
                    }
                  />
                )}
              </RadioCardGroup>
              {selectedMatchId === null && formContent}
            </>
          ) : (
            formContent
          )}
        </div>
      )}
    </div>
  );
};

export const OpportunityExtractionViewerPage = () => {
  const toast = useToast();
  const linkMenuRef = useRef(null);

  const [opportunities, setOpportunities] = useState(INITIAL_OPPORTUNITIES);
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
  const [expandedLinkedItems, setExpandedLinkedItems] = useState(new Set());
  const [linkedSectionExpanded, setLinkedSectionExpanded] = useState(true);
  const [linkedInfoboxDismissed, setLinkedInfoboxDismissed] = useState(false);

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
    ...standaloneContacts.map((c) => ({ type: "contact", ...c })),
    ...standaloneMeetings.map((m) => ({ type: "meeting", ...m })),
  ];

  const totalItems = allItems.length;
  const selectedIndex = allItems.findIndex((item) => item.id === selectedId);
  const selectedItem = allItems[selectedIndex];
  const hasPrevious = selectedIndex > 0;
  const hasNext = selectedIndex >= 0 && selectedIndex < allItems.length - 1;

  const handleSelectItem = (id, type) => {
    setSelectedId(id);
    setView(type);
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

  const updateOpportunityField = (opportunityId, fieldName, value) => {
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

  const toggleLinkedItem = (itemId) => {
    setExpandedLinkedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  const updateLinkedContactMatch = (oppId, contactId, matchId) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === oppId
          ? {
              ...opp,
              linkedContacts: opp.linkedContacts.map((c) =>
                c.id === contactId ? { ...c, selectedMatchId: matchId } : c
              ),
            }
          : opp
      )
    );
  };

  const updateLinkedCompanyMatch = (oppId, matchId) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === oppId && opp.linkedCompany
          ? { ...opp, linkedCompany: { ...opp.linkedCompany, selectedMatchId: matchId } }
          : opp
      )
    );
  };

  const updateLinkedMeetingMatch = (oppId, meetingId, matchId) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === oppId
          ? {
              ...opp,
              linkedMeetings: opp.linkedMeetings.map((m) =>
                m.id === meetingId ? { ...m, selectedMatchId: matchId } : m
              ),
            }
          : opp
      )
    );
  };

  const handleUnlinkCompany = (oppId) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === oppId ? { ...opp, linkedCompany: null } : opp
      )
    );
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
      <CreationFormPanel.Section
        title="Opportunities"
        badge={<Badge size="md">{opportunities.length}</Badge>}
        collapsible={false}
        showBackground={false}
      >
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
      </CreationFormPanel.Section>

      <CreationFormPanel.Section
        title="Contacts"
        badge={<Badge size="md">{standaloneContacts.length}</Badge>}
        collapsible={false}
        showBackground={false}
      >
        {standaloneContacts.map((contact, index) => (
          <button
            key={contact.id}
            type="button"
            style={styles.listItem}
            onClick={() => handleSelectItem(contact.id, "contact")}
          >
            <p style={styles.listItemLabel}>{`${index + 1}. ${contact.firstName} ${contact.lastName}`}</p>
            <Icon name="ChevronRight" size="sm" />
          </button>
        ))}
      </CreationFormPanel.Section>

      <CreationFormPanel.Section
        title="Meetings"
        badge={<Badge size="md">{standaloneMeetings.length}</Badge>}
        collapsible={false}
        showBackground={false}
      >
        {standaloneMeetings.map((meeting, index) => (
          <button
            key={meeting.id}
            type="button"
            style={styles.listItem}
            onClick={() => handleSelectItem(meeting.id, "meeting")}
          >
            <p style={styles.listItemLabel}>{`${index + 1}. ${meeting.title}`}</p>
            <Icon name="ChevronRight" size="sm" />
          </button>
        ))}
      </CreationFormPanel.Section>
    </>
  );

  const opportunityFormContent =
    selectedItem &&
    selectedItem.type === "opportunity" && (
      <>
        <div style={styles.editableField}>
          <TextInput
            label="Opportunity name"
            isRequired
            value={selectedItem.name || ""}
            onChange={(e) =>
              updateOpportunityField(selectedItem.id, "name", e.target.value)
            }
          />
          <div style={styles.badgeInlineWrap}>
            <Badge leadingIcon={<Icon name="PaperClip" size="sm" />} size="md">
              Non-confidential.pdf / 3 refs
            </Badge>
          </div>
        </div>

        <div style={styles.editableField}>
          <SelectField
            label="Status"
            isRequired
            value={selectedItem.status || ""}
            options={STATUS_OPTIONS}
            onChange={(value) =>
              updateOpportunityField(selectedItem.id, "status", value)
            }
            originalValue={getInitialOpportunityById(selectedItem.id)?.status}
            showRevert={populateMissing}
          />
          {populateMissing &&
            selectedItem.status === getInitialOpportunityById(selectedItem.id)?.status && (
              <SourceBadge label={AI_SOURCE_LABEL} />
            )}
        </div>

        <div style={styles.editableField}>
          <SelectField
            label="Initiative"
            isRequired
            value={selectedItem.initiative || ""}
            options={INITIATIVE_OPTIONS}
            onChange={(value) =>
              updateOpportunityField(selectedItem.id, "initiative", value)
            }
            originalValue={getInitialOpportunityById(selectedItem.id)?.initiative}
            showRevert
          />
          {selectedItem.initiative === getInitialOpportunityById(selectedItem.id)?.initiative && (
            <div style={styles.badgeInlineWrap}>
              <Badge leadingIcon={<Icon name="PaperClip" size="sm" />} size="md">
                2 documents / 5 refs
              </Badge>
            </div>
          )}
        </div>

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
          />
          {selectedItem.asset === getInitialOpportunityById(selectedItem.id)?.asset && (
            <div style={styles.badgeInlineWrap}>
              <Badge leadingIcon={<Icon name="PaperClip" size="sm" />} size="md">
                2 documents / 5 refs
              </Badge>
            </div>
          )}
        </div>

        <div style={styles.editableField}>
          <SelectField
            label="Opportunity type"
            value={selectedItem.opportunityType || ""}
            options={OPPORTUNITY_TYPE_OPTIONS}
            onChange={(value) =>
              updateOpportunityField(selectedItem.id, "opportunityType", value)
            }
            originalValue={getInitialOpportunityById(selectedItem.id)?.opportunityType}
            showRevert={populateMissing}
          />
          {populateMissing &&
            selectedItem.opportunityType === getInitialOpportunityById(selectedItem.id)?.opportunityType && (
              <SourceBadge label={AI_SOURCE_LABEL} />
            )}
        </div>

        <CreationFormPanel.Divider />
        <FormSectionTitle>Additional required information</FormSectionTitle>

        <div style={styles.editableField}>
          <TextInput
            label="Therapeutic areas"
            isRequired
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
            required
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
            isRequired
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
            isRequired
            value={selectedItem.drugType || ""}
            onChange={(e) =>
              updateOpportunityField(selectedItem.id, "drugType", e.target.value)
            }
          />
          {renderSourceBadge(isAiField(selectedItem.id, "drugType"))}
        </div>

        <CreationFormPanel.Divider />

        <button
          style={styles.linkedSectionToggle}
          type="button"
          onClick={() => setLinkedSectionExpanded((v) => !v)}
        >
          <Icon name={linkedSectionExpanded ? "ChevronDown" : "ChevronRight"} size="sm" />
          Linked items
        </button>

        {linkedSectionExpanded && (
          <div style={styles.linkedSectionBody}>
            {!linkedInfoboxDismissed && (
              <div style={styles.linkedInfoboxRow}>
                <MiniInfobox
                  style={{ flex: 1 }}
                  variant="info"
                  message="Linked items will be added or created with this opportunity. Unlinked items will move to main list to review."
                />
                <button
                  style={styles.linkedItemIconBtn}
                  type="button"
                  onClick={() => setLinkedInfoboxDismissed(true)}
                >
                  <Icon name="X" size="sm" />
                </button>
              </div>
            )}

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
                (standaloneContacts.length > 0 || standaloneMeetings.length > 0) && (
                  <div style={styles.linkMenu}>
                    {standaloneContacts.length > 0 && (
                      <>
                        <p style={styles.linkMenuSectionTitle}>Contacts</p>
                        {standaloneContacts.map((contact) => (
                          <button
                            key={contact.id}
                            type="button"
                            style={styles.linkMenuItem}
                            onClick={() => handleLinkContact(selectedItem.id, contact.id)}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = "var(--color-general-neutral-lighter)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background = "transparent")
                            }
                          >
                            <Icon name="User" size="sm" />
                            <span>{contact.firstName} {contact.lastName}</span>
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
                            onClick={() => handleLinkMeeting(selectedItem.id, meeting.id)}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background = "var(--color-general-neutral-lighter)")
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

            {/* Contacts group */}
            {selectedItem.linkedContacts?.length > 0 && (
              <div style={styles.linkedEntityGroup}>
                <div style={styles.linkedEntityGroupHeader}>
                  <Icon name="User" size="sm" />
                  Contacts
                  <Badge size="sm">{selectedItem.linkedContacts.length}</Badge>
                </div>
                {selectedItem.linkedContacts.map((contact) => (
                  <LinkedItemCard
                    key={contact.id}
                    icon={<Icon name="User" size="sm" />}
                    name={`${contact.firstName} ${contact.lastName}`}
                    matchStatus={contact.matchStatus || "new"}
                    matchCandidates={contact.matchCandidates || []}
                    selectedMatchId={contact.selectedMatchId ?? null}
                    isExpanded={expandedLinkedItems.has(contact.id)}
                    onToggle={() => toggleLinkedItem(contact.id)}
                    onSelectMatch={(matchId) =>
                      updateLinkedContactMatch(selectedItem.id, contact.id, matchId)
                    }
                    onUnlink={() => handleUnlinkContact(selectedItem.id, contact.id)}
                    formContent={
                      <div style={styles.fieldRow}>
                        <TextInput
                          label="First name"
                          isRequired
                          value={contact.firstName || ""}
                          onChange={(e) =>
                            updateLinkedContactField(selectedItem.id, contact.id, "firstName", e.target.value)
                          }
                        />
                        <TextInput
                          label="Last name"
                          isRequired
                          value={contact.lastName || ""}
                          onChange={(e) =>
                            updateLinkedContactField(selectedItem.id, contact.id, "lastName", e.target.value)
                          }
                        />
                      </div>
                    }
                  />
                ))}
              </div>
            )}

            {/* Company group */}
            {selectedItem.linkedCompany && (
              <div style={styles.linkedEntityGroup}>
                <div style={styles.linkedEntityGroupHeader}>
                  <Icon name="Building2" size="sm" />
                  Company
                  <Badge size="sm">1</Badge>
                </div>
                <LinkedItemCard
                  icon={<Icon name="Building2" size="sm" />}
                  name={selectedItem.linkedCompany.name}
                  matchStatus={selectedItem.linkedCompany.matchStatus || "new"}
                  matchCandidates={selectedItem.linkedCompany.matchCandidates || []}
                  selectedMatchId={selectedItem.linkedCompany.selectedMatchId ?? null}
                  isExpanded={expandedLinkedItems.has(selectedItem.linkedCompany.id)}
                  onToggle={() => toggleLinkedItem(selectedItem.linkedCompany.id)}
                  onSelectMatch={(matchId) =>
                    updateLinkedCompanyMatch(selectedItem.id, matchId)
                  }
                  onUnlink={() => handleUnlinkCompany(selectedItem.id)}
                />
              </div>
            )}

            {/* Meetings group */}
            {selectedItem.linkedMeetings?.length > 0 && (
              <div style={styles.linkedEntityGroup}>
                <div style={styles.linkedEntityGroupHeader}>
                  <Icon name="Calendar" size="sm" />
                  Meetings
                  <Badge size="sm">{selectedItem.linkedMeetings.length}</Badge>
                </div>
                {selectedItem.linkedMeetings.map((meeting) => (
                  <LinkedItemCard
                    key={meeting.id}
                    icon={<Icon name="Calendar" size="sm" />}
                    name={meeting.title}
                    matchStatus={meeting.matchStatus || "new"}
                    matchCandidates={meeting.matchCandidates || []}
                    selectedMatchId={meeting.selectedMatchId ?? null}
                    isExpanded={expandedLinkedItems.has(meeting.id)}
                    onToggle={() => toggleLinkedItem(meeting.id)}
                    onSelectMatch={(matchId) =>
                      updateLinkedMeetingMatch(selectedItem.id, meeting.id, matchId)
                    }
                    onUnlink={() => handleUnlinkMeeting(selectedItem.id, meeting.id)}
                    formContent={
                      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-3)" }}>
                        <TextInput
                          label="Title"
                          isRequired
                          value={meeting.title || ""}
                          onChange={(e) =>
                            updateLinkedMeetingField(selectedItem.id, meeting.id, "title", e.target.value)
                          }
                        />
                        <div style={styles.fieldRow}>
                          <TextInput
                            label="Date"
                            value={meeting.date || ""}
                            onChange={(e) =>
                              updateLinkedMeetingField(selectedItem.id, meeting.id, "date", e.target.value)
                            }
                          />
                          <TextInput
                            label="Location"
                            value={meeting.location || ""}
                            onChange={(e) =>
                              updateLinkedMeetingField(selectedItem.id, meeting.id, "location", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    }
                  />
                ))}
              </div>
            )}
          </div>
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
            isRequired
            value={selectedItem.firstName || ""}
            onChange={(e) =>
              updateContactField(selectedItem.id, "firstName", e.target.value)
            }
          />
          <TextInput
            label="Last name"
            isRequired
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
          isRequired
          value={selectedItem.title || ""}
          onChange={(e) =>
            updateMeetingField(selectedItem.id, "title", e.target.value)
          }
        />
        <div style={styles.fieldRow}>
          <TextInput
            label="Date"
            isRequired
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
          size: "lg",
          style: { flex: 1 },
        },
        {
          label: "Create",
          variant: "secondary",
          onClick: handleCreate,
          position: "right",
          size: "lg",
          style: { flex: 1 },
        },
      ]
    : [];

  const formPanelProps = {
    title: "Review extraction",
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
    navigationSubContent: view === "opportunity" ? (
      <Toggle
        label="Populate missing with Market Intelligence"
        isSelected={populateMissing}
        onChange={handlePopulateMissingChange}
        size="sm"
      />
    ) : null,
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