import React from "react";
import { Hub } from "../../library/templates/hub.jsx";
import { DocumentViewerPage } from "../../library/templates/document-viewer-page.jsx";
import { Button } from "../../library/atoms/button.jsx";
import { Badge } from "../../library/atoms/badge.jsx";
import { Chip } from "../../library/atoms/chip.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { Toggle } from "../../library/atoms/toggle.jsx";
import { Checkbox } from "../../library/atoms/checkbox.jsx";
import { TextInput } from "../../library/molecules/text-input.jsx";
import { RadioCard, RadioCardGroup } from "../../library/molecules/radio-card.jsx";
import { ButtonGroup, ButtonGroupItem } from "../../library/molecules/button-group.jsx";
import { Stepper } from "../../library/molecules/stepper.jsx";
import { FileUploader } from "../../library/molecules/file-uploader.jsx";
import { Search } from "../../library/molecules/search.jsx";
import {
  HubHeaderContextButton,
  HubHeaderViewToggle,
  HubHeaderSearch,
  HubHeaderSmartFilterButton,
  HubHeaderSettingsButton,
  HubHeaderExportButton,
} from "../../library/organisms/hub-header.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSection,
} from "../../library/molecules/dropdown-menu.jsx";
import { DropdownMenuItem } from "../../library/molecules/dropdown-menu-item.jsx";
import { Dialog } from "../../library/molecules/dialog.jsx";
import { Infobox } from "../../library/molecules/infobox.jsx";
import { useToast } from "../../library/molecules/toast.jsx";
import { Modal } from "../../library/organisms/modal.jsx";
import {
  ObjectHeader,
  ObjectHeaderBackButton,
  ObjectHeaderTopBar,
  ObjectHeaderTopBarLeft,
  ObjectHeaderTopBarRight,
} from "../../library/organisms/object-header.jsx";
import { AI_OPPORTUNITY_DATA, ASSET_TYPES } from "../shared/mock-data.js";

const REMEMBER_CHOICE_STORAGE_KEY = "eureka-create-opportunity-remember-choice";
const REVIEW_PROGRESS_STORAGE_KEY = "eureka-opportunity-review-progress";

const HUB_PATH = "/ai-opportunity-extraction";
const HUB_PATH_V2 = "/ai-opportunity-extraction-v2";
const REVIEW_PATH = "/ai-opportunity-extraction/review";

const REVIEW_DOCUMENT_PAGES = [
  {
    id: "page-1",
    title: "Cover",
    content: "3Billion Pharmaceutical Partnership Deck\n\nAdvancing Rare Disease Genomic Diagnostics\n\nPrepared for Partnership & Business Development\nQ2 2026 - Confidential",
  },
  {
    id: "page-2",
    title: "Company Overview",
    content: "Company Overview\n\n150,000+ Rare diseases analyzed\n98.3% Diagnostic accuracy\n60+ Countries served\n\nMission\n3Billion harnesses whole-exome sequencing and AI-powered variant interpretation to deliver definitive rare disease diagnoses faster and more affordably.",
  },
  {
    id: "page-3",
    title: "Pipeline",
    content: "Strategic Focus\n\n- Oncology companion diagnostics\n- Rare disease biomarker expansion\n- Partnership-led co-development model\n\nRequested collaboration\n- Joint preclinical validation\n- Companion diagnostic integration",
  },
  {
    id: "page-4",
    title: "Next Steps",
    content: "Next Steps\n\n1. Validate strategic fit by therapeutic area\n2. Align on development phase and evidence package\n3. Confirm ownership and partnership model\n4. Schedule diligence workshop",
  },
];

const EXTRACTED_OPPORTUNITIES = [
  {
    id: "nvt-101",
    label: "NeuroVanta Therapeutics - NVT-101",
    matched: false,
    form: {
      name: "NeuroVanta Therapeutics - NVT-101",
      status: "Active",
      initiative: "Oncology",
      asset: "NVT-101",
      company: "NeuroVanta Therapeutics",
      opportunityType: "Research Collaboration",
      therapeuticArea: "Oncology",
      developmentPhase: "Preclinical",
      drugType: "Antibody-Drug Conjugate (ADC)",
      actionability: "Yes",
      indications: ["HER2-positive breast cancer", "NSCLC"],
      bdTier: "Tier 1 opportunity",
      businessUnit: "Cortellis Oncology",
      currentStatus: "Clinical and CMC diligence in progress, no major concerns",
      applications: ["Oncology", "Solid tumors"],
      approach: ["Immuno-oncology", "Bispecific checkpoint inhibition"],
      developability: "Clinical and CMC diligence in progress, no major concerns",
      probabilityTechnicalSuccess: "35",
    },
  },
  {
    id: "onx-317",
    label: "OncoNexa Therapeutics - ONX-317",
    matched: true,
    form: {
      name: "OncoNexa Therapeutics - ONX-317",
      status: "Active",
      initiative: "Oncology",
      asset: "ONX-317",
      company: "OncoNexa Therapeutics",
      opportunityType: "Research Collaboration",
      therapeuticArea: "Oncology",
      developmentPhase: "Preclinical",
      drugType: "Antibody-Drug Conjugate (ADC)",
      actionability: "Yes",
      indications: ["HER2-positive breast cancer", "NSCLC"],
      bdTier: "Tier 1 opportunity",
      businessUnit: "Cortellis Oncology",
      currentStatus: "Clinical and CMC diligence in progress, no major concerns",
      applications: ["Oncology", "Solid tumors"],
      approach: ["Immuno-oncology", "Bispecific checkpoint inhibition"],
      developability: "Clinical and CMC diligence in progress, no major concerns",
      probabilityTechnicalSuccess: "35",
    },
  },
  {
    id: "ccp-045",
    label: "CardiaCore Pharma - CCP-045",
    matched: false,
    form: {
      name: "CardiaCore Pharma - CCP-045",
      status: "Active",
      initiative: "Cardiology",
      asset: "CCP-045",
      company: "CardiaCore Pharma",
      opportunityType: "Co-development",
      therapeuticArea: "Cardiology",
      developmentPhase: "Discovery",
      drugType: "Small Molecule",
      actionability: "Yes",
      indications: ["Heart failure"],
      bdTier: "Tier 2 opportunity",
      businessUnit: "Cardio Innovation",
      currentStatus: "Partner alignment workshop pending",
      applications: ["Cardiology"],
      approach: ["Small molecule modulation"],
      developability: "Early CMC package available",
      probabilityTechnicalSuccess: "28",
    },
  },
  {
    id: "imx-220",
    label: "ImmuniX Therapeutics - IMX-220",
    matched: true,
    form: {
      name: "ImmuniX Therapeutics - IMX-220",
      status: "Qualified",
      initiative: "Immunology",
      asset: "IMX-220",
      company: "ImmuniX Therapeutics",
      opportunityType: "Licensing",
      therapeuticArea: "Immunology",
      developmentPhase: "Phase I",
      drugType: "Biologic",
      actionability: "Yes",
      indications: ["Autoimmune inflammation"],
      bdTier: "Tier 1 opportunity",
      businessUnit: "Immunology",
      currentStatus: "Clinical data room shared",
      applications: ["Immunology"],
      approach: ["Monoclonal antibody"],
      developability: "Process scale-up in progress",
      probabilityTechnicalSuccess: "42",
    },
  },
  {
    id: "gsb-318",
    label: "GenoSphere Bio - GSB-318",
    matched: true,
    form: {
      name: "GenoSphere Bio - GSB-318",
      status: "Active",
      initiative: "Oncology",
      asset: "GSB-318",
      company: "GenoSphere Bio",
      opportunityType: "Research Collaboration",
      therapeuticArea: "Oncology",
      developmentPhase: "Preclinical",
      drugType: "Gene Therapy",
      actionability: "Review",
      indications: ["Solid tumors"],
      bdTier: "Tier 2 opportunity",
      businessUnit: "Cortellis Oncology",
      currentStatus: "Preclinical package under review",
      applications: ["Oncology", "Solid tumors"],
      approach: ["Gene therapy"],
      developability: "Platform transfer feasibility assessed",
      probabilityTechnicalSuccess: "30",
    },
  },
];

const navigateToPath = (nextPath) => {
  window.history.pushState({}, "", nextPath);
  window.dispatchEvent(new PopStateEvent("popstate"));
};

const readReviewProgress = () => {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(REVIEW_PROGRESS_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.opportunities)) return null;

    return {
      opportunities: parsed.opportunities,
      activeId: parsed.activeId || "",
    };
  } catch (error) {
    return null;
  }
};

const saveReviewProgress = ({ opportunities, activeId }) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    REVIEW_PROGRESS_STORAGE_KEY,
    JSON.stringify({ opportunities, activeId })
  );
};

const clearReviewProgress = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(REVIEW_PROGRESS_STORAGE_KEY);
};

const styles = {
  modalWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-4)",
  },
  sectionTitle: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-heading-h3)",
    lineHeight: "var(--line-height-heading-h3)",
    fontWeight: "var(--font-weight-bold)",
    color: "var(--color-content-primary)",
  },
  fieldLabel: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-primary)",
  },
  required: {
    color: "var(--color-content-negative)",
  },
  optional: {
    color: "var(--color-content-secondary)",
    marginLeft: "var(--spacing-xs)",
  },
  infoBanner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-3)",
    borderRadius: "var(--radius-md)",
    background: "var(--color-general-informative)",
    padding: "var(--spacing-4)",
    boxSizing: "border-box",
  },
  infoText: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    lineHeight: "var(--line-height-body-lg)",
    color: "var(--color-content-primary)",
  },
  helperRow: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-sm)",
    lineHeight: "var(--line-height-body-sm)",
  },
  selectShell: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-3)",
    borderRadius: "var(--radius-md)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    background: "var(--color-general-white)",
    padding: "var(--spacing-sm) var(--spacing-4)",
    minHeight: 40,
    boxSizing: "border-box",
  },
  selectLeft: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
    color: "var(--color-content-tertiary)",
    minWidth: 0,
  },
  selectText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  reviewHeaderTitle: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-heading-h2)",
    lineHeight: "var(--line-height-heading-h2)",
    fontWeight: "var(--font-weight-bold)",
    color: "var(--color-content-primary)",
  },
  reviewFormHead: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-4)",
  },
  reviewFormHeadTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-3)",
  },
  reviewFormHeadActions: {
    display: "inline-flex",
    gap: "var(--spacing-2)",
    alignItems: "center",
  },
  reviewDisclaimer: {
    margin: 0,
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
  },
  extractedList: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
  },
  extractedRow: {
    width: "100%",
    border: "none",
    borderRadius: "var(--radius-sm)",
    background: "var(--color-general-white)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    padding: "var(--spacing-sm) var(--spacing-3)",
    display: "grid",
    gridTemplateColumns: "1fr auto auto",
    alignItems: "center",
    gap: "var(--spacing-2)",
    cursor: "pointer",
    textAlign: "left",
  },
  extractedRowLabel: {
    margin: 0,
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    lineHeight: "var(--line-height-body-lg)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  formPanelWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-4)",
  },
  formPanelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-2)",
  },
  formPanelNav: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "var(--spacing-sm)",
  },
  formPanelNavText: {
    color: "var(--color-content-secondary)",
    fontSize: "var(--text-body-md)",
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-md)",
    whiteSpace: "nowrap",
  },
  formPanelNavButton: {
    height: 24,
    minWidth: 24,
    paddingLeft: "var(--spacing-xs)",
    paddingRight: "var(--spacing-xs)",
    borderRadius: "var(--radius-xs)",
  },
  formPanelTitleWrap: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-2)",
    minWidth: 0,
  },
  duplicatesSectionWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-3)",
    borderRadius: "var(--radius-md)",
    background: "var(--color-general-neutral-lighter)",
    padding: "var(--spacing-4)",
    marginBottom: "var(--spacing-3)",
  },
  duplicatesSectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-2)",
    cursor: "pointer",
    userSelect: "none",
  },
  duplicatesSectionTitle: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-2)",
    margin: 0,
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    lineHeight: "var(--line-height-body-lg)",
    fontWeight: "var(--font-weight-semibold)",
  },
  duplicatesSubsectionWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-2)",
  },
  duplicatesSubsectionLabel: {
    margin: 0,
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-caption)",
    lineHeight: "var(--line-height-body-caption)",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    fontWeight: "var(--font-weight-semibold)",
  },
  duplicateCard: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-3)",
    borderRadius: "var(--radius-sm)",
    background: "var(--color-general-white)",
    border: "1px solid var(--color-action-outline-secondary-enabled)",
    padding: "var(--spacing-3)",
    boxSizing: "border-box",
  },
  duplicateCardIcon: {
    flexShrink: 0,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-secondary)",
  },
  duplicateCardContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
    minWidth: 0,
  },
  duplicateCardTitle: {
    margin: 0,
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    lineHeight: "var(--line-height-body-lg)",
    fontWeight: "var(--font-weight-regular)",
  },
  duplicateCardMeta: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-2)",
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
  },
  duplicateCardActions: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-2)",
    flexShrink: 0,
  },
  formPanelTitle: {
    margin: 0,
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-heading-h5)",
    lineHeight: "var(--line-height-heading-h5)",
    fontWeight: "var(--font-weight-semibold)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  formSectionTitle: {
    margin: 0,
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-heading-h5)",
    lineHeight: "var(--line-height-heading-h5)",
    fontWeight: "var(--font-weight-semibold)",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-sm)",
  },
  fieldTitle: {
    margin: 0,
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    fontWeight: "var(--font-weight-regular)",
  },
  fieldHint: {
    display: "inline-flex",
    gap: "var(--spacing-xs)",
    flexWrap: "wrap",
    alignItems: "center",
  },
  sectionEyebrow: {
    margin: 0,
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-caption)",
    lineHeight: "var(--line-height-body-caption)",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    fontWeight: "var(--font-weight-semibold)",
  },
  referenceBadge: {
    fontSize: "var(--text-body-caption)",
  },
  sectionDivider: {
    border: "none",
    borderTop: "1px solid var(--color-action-outline-secondary-enabled)",
    margin: 0,
  },
};

const CreateOpportunityModal = ({ open, onClose, onExtract }) => {
  const toast = useToast();
  const [mode, setMode] = React.useState("manual");
  const [manualStep, setManualStep] = React.useState(1);
  const [selectedAssetType, setSelectedAssetType] = React.useState("pharma");
  const [rememberChoice, setRememberChoice] = React.useState(false);
  const [documents, setDocuments] = React.useState([]);

  React.useEffect(() => {
    if (!open) return;

    let rememberedConfig = null;
    try {
      const raw = window.localStorage.getItem(REMEMBER_CHOICE_STORAGE_KEY);
      rememberedConfig = raw ? JSON.parse(raw) : null;
    } catch (error) {
      rememberedConfig = null;
    }

    const hasRememberedChoice = Boolean(rememberedConfig?.rememberChoice);

    setMode("manual");
    setManualStep(hasRememberedChoice ? 2 : 1);
    setSelectedAssetType(rememberedConfig?.assetType || "pharma");
    setRememberChoice(hasRememberedChoice);
    setDocuments([]);
  }, [open]);

  const selectedAssetLabel = ASSET_TYPES.find((item) => item.value === selectedAssetType)?.label || "-";

  const manualStepOne = (
    <div style={styles.modalWrap}>
      <Stepper variant="progress" totalSteps={2} currentStep={0} />

      <h3 style={styles.sectionTitle}>Classification</h3>
      <p style={styles.fieldLabel}>
        Asset type <span style={styles.required}>*</span>
      </p>

      <RadioCardGroup value={selectedAssetType} onChange={setSelectedAssetType}>
        {ASSET_TYPES.map((asset) => (
          <RadioCard
            key={asset.value}
            value={asset.value}
            label={asset.label}
            info={asset.description}
            icon={<Icon name={asset.iconName} size="md" />}
            hideControl
          />
        ))}
      </RadioCardGroup>

      <Checkbox isSelected={rememberChoice} onChange={setRememberChoice}>
        Remember my choice
      </Checkbox>
    </div>
  );

  const manualStepTwo = (
    <div style={styles.modalWrap}>
      <Stepper variant="progress" totalSteps={2} currentStep={1} />

      <h3 style={styles.sectionTitle}>Information</h3>

      <div style={styles.infoBanner}>
        <p style={styles.infoText}>
          You are currently evaluating: <strong>{selectedAssetLabel}</strong>
        </p>
        <Button variant="secondary" size="sm" onClick={() => setManualStep(1)}>Change</Button>
      </div>

      <TextInput label="Company" isRequired placeholder="Select or create company" />

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
        <p style={styles.fieldLabel}>
          Asset <span style={styles.required}>*</span>
        </p>
        <div style={styles.selectShell}>
          <div style={styles.selectLeft}>
            <Icon name="MagnifyingGlass" size="sm" />
            <span style={styles.selectText}>Select or create asset</span>
          </div>
        </div>
        <div style={styles.helperRow}>
          <Icon name="InformationCircle" size="sm" />
          <span>Select company first</span>
        </div>
      </div>

      <TextInput label="Opportunity name" isRequired placeholder="Name your opportunity" />

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
        <p style={styles.fieldLabel}>
          Opportunity type <span style={styles.optional}>Optional</span>
        </p>
        <div style={styles.selectShell}>
          <div style={styles.selectLeft}>
            <span style={styles.selectText}>Select opportunity type</span>
          </div>
          <Icon name="ChevronDown" size="sm" />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
        <p style={styles.fieldLabel}>
          Initiative <span style={styles.required}>*</span>
        </p>
        <div style={styles.selectShell}>
          <div style={styles.selectLeft}>
            <span style={styles.selectText}>Select initiative</span>
          </div>
          <Icon name="ChevronDown" size="sm" />
        </div>
      </div>
    </div>
  );

  const aiContent = (
    <div style={styles.modalWrap}>
      <FileUploader
        showIllustration={false}
        onFilesSelected={(files) => {
          const nextDocs = files.map((file, index) => ({
            id: `${Date.now()}-${index}`,
            name: file.name,
          }));
          setDocuments(nextDocs);
        }}
      />
    </div>
  );

  const showManual = mode === "manual";
  const isManualStepOne = showManual && manualStep === 1;
  const isManualStepTwo = showManual && manualStep === 2;

  const persistRememberChoice = React.useCallback(() => {
    if (rememberChoice) {
      window.localStorage.setItem(
        REMEMBER_CHOICE_STORAGE_KEY,
        JSON.stringify({
          rememberChoice: true,
          assetType: selectedAssetType,
        })
      );
      return;
    }

    window.localStorage.removeItem(REMEMBER_CHOICE_STORAGE_KEY);
  }, [rememberChoice, selectedAssetType]);

  const handleManualSubmit = React.useCallback(
    (modeLabel) => {
      persistRememberChoice();
      toast.success({
        message: modeLabel === "open" ? "Opportunity created and opened." : "Opportunity created.",
      });
      onClose();
    },
    [onClose, persistRememberChoice, toast]
  );

  const handleExtract = React.useCallback(() => {
    toast.success({
      message: `Extraction started for ${documents.length} document${documents.length > 1 ? "s" : ""}.`,
    });
    onClose();
    onExtract?.();
  }, [documents.length, onClose, onExtract, toast]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create opportunity"
      size="lg"
      style={{ maxWidth: "600px" }}
      tertiaryLabel={showManual ? (isManualStepOne ? "Cancel" : "Back") : "Cancel"}
      tertiaryVariant={showManual && !isManualStepOne ? "secondary" : "tertiary"}
      onTertiaryClick={
        isManualStepOne
          ? onClose
          : () => {
              if (showManual) {
                setManualStep(1);
              } else {
                onClose();
              }
            }
      }
      secondaryLabel={isManualStepTwo ? "Create" : undefined}
      onSecondaryClick={() => {
        if (!isManualStepTwo) return;
        handleManualSubmit("create");
      }}
      primaryLabel={showManual ? (isManualStepOne ? "Next" : "Create and open") : "Extract"}
      onPrimaryClick={() => {
        if (showManual && isManualStepOne) {
          setManualStep(2);
          return;
        }

        if (showManual) {
          handleManualSubmit("open");
          return;
        }

        handleExtract();
      }}
      primaryDisabled={!showManual && documents.length === 0}
    >
      <div style={styles.modalWrap}>
        <ButtonGroup value={mode} onChange={setMode} style={{ width: "100%", display: "flex" }}>
          <ButtonGroupItem value="manual" style={{ flex: 1, justifyContent: "center" }}>Create manually</ButtonGroupItem>
          <ButtonGroupItem value="ai" style={{ flex: 1, justifyContent: "center" }}>Create with AI</ButtonGroupItem>
        </ButtonGroup>

        {showManual ? (isManualStepOne ? manualStepOne : manualStepTwo) : aiContent}
      </div>
    </Modal>
  );
};

const CreateOpportunityManualModal = ({ open, onClose }) => {
  const toast = useToast();
  const [manualStep, setManualStep] = React.useState(1);
  const [selectedAssetType, setSelectedAssetType] = React.useState("pharma");
  const [rememberChoice, setRememberChoice] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;

    let rememberedConfig = null;
    try {
      const raw = window.localStorage.getItem(REMEMBER_CHOICE_STORAGE_KEY);
      rememberedConfig = raw ? JSON.parse(raw) : null;
    } catch (error) {
      rememberedConfig = null;
    }

    const hasRememberedChoice = Boolean(rememberedConfig?.rememberChoice);
    setManualStep(hasRememberedChoice ? 2 : 1);
    setSelectedAssetType(rememberedConfig?.assetType || "pharma");
    setRememberChoice(hasRememberedChoice);
  }, [open]);

  const selectedAssetLabel = ASSET_TYPES.find((item) => item.value === selectedAssetType)?.label || "-";

  const persistRememberChoice = React.useCallback(() => {
    if (rememberChoice) {
      window.localStorage.setItem(
        REMEMBER_CHOICE_STORAGE_KEY,
        JSON.stringify({
          rememberChoice: true,
          assetType: selectedAssetType,
        })
      );
      return;
    }

    window.localStorage.removeItem(REMEMBER_CHOICE_STORAGE_KEY);
  }, [rememberChoice, selectedAssetType]);

  const handleManualSubmit = React.useCallback(
    (modeLabel) => {
      persistRememberChoice();
      toast.success({
        message: modeLabel === "open" ? "Opportunity created and opened." : "Opportunity created.",
      });
      onClose();
    },
    [onClose, persistRememberChoice, toast]
  );

  const isManualStepOne = manualStep === 1;
  const isManualStepTwo = manualStep === 2;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create opportunity"
      size="lg"
      style={{ maxWidth: "600px" }}
      tertiaryLabel={isManualStepOne ? "Cancel" : "Back"}
      tertiaryVariant={!isManualStepOne ? "secondary" : "tertiary"}
      onTertiaryClick={
        isManualStepOne
          ? onClose
          : () => {
              setManualStep(1);
            }
      }
      secondaryLabel={isManualStepTwo ? "Create" : undefined}
      onSecondaryClick={() => {
        if (!isManualStepTwo) return;
        handleManualSubmit("create");
      }}
      primaryLabel={isManualStepOne ? "Next" : "Create and open"}
      onPrimaryClick={() => {
        if (isManualStepOne) {
          setManualStep(2);
          return;
        }

        handleManualSubmit("open");
      }}
    >
      <div style={styles.modalWrap}>
        {isManualStepOne ? (
          <div style={styles.modalWrap}>
            <Stepper variant="progress" totalSteps={2} currentStep={0} />

            <h3 style={styles.sectionTitle}>Classification</h3>
            <p style={styles.fieldLabel}>
              Asset type <span style={styles.required}>*</span>
            </p>

            <RadioCardGroup value={selectedAssetType} onChange={setSelectedAssetType}>
              {ASSET_TYPES.map((asset) => (
                <RadioCard
                  key={asset.value}
                  value={asset.value}
                  label={asset.label}
                  info={asset.description}
                  icon={<Icon name={asset.iconName} size="md" />}
                  hideControl
                />
              ))}
            </RadioCardGroup>

            <Checkbox isSelected={rememberChoice} onChange={setRememberChoice}>
              Remember my choice
            </Checkbox>
          </div>
        ) : (
          <div style={styles.modalWrap}>
            <Stepper variant="progress" totalSteps={2} currentStep={1} />

            <h3 style={styles.sectionTitle}>Information</h3>

            <div style={styles.infoBanner}>
              <p style={styles.infoText}>
                You are currently evaluating: <strong>{selectedAssetLabel}</strong>
              </p>
              <Button variant="secondary" size="sm" onClick={() => setManualStep(1)}>Change</Button>
            </div>

            <TextInput label="Company" isRequired placeholder="Select or create company" />

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
              <p style={styles.fieldLabel}>
                Asset <span style={styles.required}>*</span>
              </p>
              <div style={styles.selectShell}>
                <div style={styles.selectLeft}>
                  <Icon name="MagnifyingGlass" size="sm" />
                  <span style={styles.selectText}>Select or create asset</span>
                </div>
              </div>
              <div style={styles.helperRow}>
                <Icon name="InformationCircle" size="sm" />
                <span>Select company first</span>
              </div>
            </div>

            <TextInput label="Opportunity name" isRequired placeholder="Name your opportunity" />

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
              <p style={styles.fieldLabel}>
                Opportunity type <span style={styles.optional}>Optional</span>
              </p>
              <div style={styles.selectShell}>
                <div style={styles.selectLeft}>
                  <span style={styles.selectText}>Select opportunity type</span>
                </div>
                <Icon name="ChevronDown" size="sm" />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
              <p style={styles.fieldLabel}>
                Initiative <span style={styles.required}>*</span>
              </p>
              <div style={styles.selectShell}>
                <div style={styles.selectLeft}>
                  <span style={styles.selectText}>Select initiative</span>
                </div>
                <Icon name="ChevronDown" size="sm" />
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

const ExtractWithAiModal = ({ open, onClose, onExtract }) => {
  const toast = useToast();
  const [documents, setDocuments] = React.useState([]);

  React.useEffect(() => {
    if (!open) return;
    setDocuments([]);
  }, [open]);

  const handleExtract = React.useCallback(() => {
    toast.success({
      message: `Extraction started for ${documents.length} document${documents.length > 1 ? "s" : ""}.`,
    });
    onClose();
    onExtract?.();
  }, [documents.length, onClose, onExtract, toast]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Extract opportunity with AI"
      size="lg"
      style={{ maxWidth: "600px" }}
      tertiaryLabel="Cancel"
      onTertiaryClick={onClose}
      primaryLabel="Extract"
      onPrimaryClick={handleExtract}
      primaryDisabled={documents.length === 0}
    >
      <div style={styles.modalWrap}>
        <FileUploader
          showIllustration={false}
          onFilesSelected={(files) => {
            const nextDocs = files.map((file, index) => ({
              id: `${Date.now()}-${index}`,
              name: file.name,
            }));
            setDocuments(nextDocs);
          }}
        />
      </div>
    </Modal>
  );
};

const SelectPreviewField = ({ label, value, required = false, references = [] }) => {
  return (
    <div style={styles.fieldGroup}>
      <p style={styles.fieldTitle}>
        {label}
        {required ? <span style={styles.required}>*</span> : null}
      </p>
      <div style={styles.selectShell}>
        <div style={styles.selectLeft}>
          <span style={styles.selectText}>{value}</span>
        </div>
        <Icon name="ChevronDown" size="sm" />
      </div>
      {references.length > 0 ? (
        <div style={styles.fieldHint}>
          {references.map((ref) => (
            <Badge key={ref} size="xs" style={styles.referenceBadge}>{ref}</Badge>
          ))}
        </div>
      ) : null}
    </div>
  );
};

const MultiValuePreviewField = ({ label, values = [], required = false }) => {
  return (
    <div style={styles.fieldGroup}>
      <p style={styles.fieldTitle}>
        {label}
        {required ? <span style={styles.required}>*</span> : null}
      </p>
      <div style={styles.selectShell}>
        <div style={{ display: "inline-flex", gap: "var(--spacing-xs)", flexWrap: "wrap", minWidth: 0 }}>
          {values.map((item) => (
            <Chip key={item} size="sm">{item}</Chip>
          ))}
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-xs)" }}>
          <Icon name="XMark" size="sm" />
          <Icon name="ChevronDown" size="sm" />
        </div>
      </div>
    </div>
  );
};

const PotentialDuplicatesSection = ({ currentOpportunity, allOpportunities }) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  // Find all other opportunities with matched: true, excluding current
  const matchedOpportunities = allOpportunities.filter(
    (opp) => opp.matched && opp.id !== currentOpportunity.id
  );

  if (matchedOpportunities.length === 0) {
    return null;
  }

  // Categorize matches (HIGH MATCH and OTHER MATCH)
  const highMatches = matchedOpportunities.slice(0, 1);
  const otherMatches = matchedOpportunities.slice(1);

  return (
    <div style={styles.duplicatesSectionWrap}>
      <div
        style={styles.duplicatesSectionHeader}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 style={styles.duplicatesSectionTitle}>
          <Icon
            name={isExpanded ? "ChevronDown" : "ChevronRight"}
            size="sm"
          />
          Potential duplicates
        </h4>
        <Badge size="xs">{matchedOpportunities.length}</Badge>
      </div>

      {isExpanded && (
        <>
          {highMatches.length > 0 && (
            <div style={styles.duplicatesSubsectionWrap}>
              <p style={styles.duplicatesSubsectionLabel}>High match</p>
              {highMatches.map((opportunity) => (
                <div key={opportunity.id} style={styles.duplicateCard}>
                  <div style={styles.duplicateCardIcon}>
                    <Icon name="DocumentText" size="sm" />
                  </div>
                  <div style={styles.duplicateCardContent}>
                    <p style={styles.duplicateCardTitle}>
                      {opportunity.form.company}
                    </p>
                    <div style={styles.duplicateCardMeta}>
                      <span>{opportunity.form.asset}</span>
                      <span style={{ fontSize: 2 }}>•</span>
                      <Badge size="xs" variant={
                        opportunity.form.status === "Active"
                          ? "default"
                          : opportunity.form.status === "Qualified"
                          ? "success"
                          : "warning"
                      }>
                        {opportunity.form.status}
                      </Badge>
                    </div>
                  </div>
                  <div style={styles.duplicateCardActions}>
                    <Button variant="secondary" size="sm">Open</Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {otherMatches.length > 0 && (
            <div style={styles.duplicatesSubsectionWrap}>
              <p style={styles.duplicatesSubsectionLabel}>Other match</p>
              {otherMatches.map((opportunity) => (
                <div key={opportunity.id} style={styles.duplicateCard}>
                  <div style={styles.duplicateCardIcon}>
                    <Icon name="DocumentText" size="sm" />
                  </div>
                  <div style={styles.duplicateCardContent}>
                    <p style={styles.duplicateCardTitle}>
                      {opportunity.form.company}
                    </p>
                    <div style={styles.duplicateCardMeta}>
                      <span>{opportunity.form.asset}</span>
                      <span style={{ fontSize: 2 }}>•</span>
                      <Badge size="xs" variant={
                        opportunity.form.status === "Active"
                          ? "default"
                          : opportunity.form.status === "Qualified"
                          ? "success"
                          : "warning"
                      }>
                        {opportunity.form.status}
                      </Badge>
                    </div>
                  </div>
                  <div style={styles.duplicateCardActions}>
                    <Button variant="secondary" size="sm">Open</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};


export const AiOpportunityExtractionReviewPage = () => {
  const toast = useToast();
  const [opportunities, setOpportunities] = React.useState(() => {
    const saved = readReviewProgress();
    return saved?.opportunities?.length ? saved.opportunities : EXTRACTED_OPPORTUNITIES;
  });
  const [returnHubPath] = React.useState(() => {
    const search = new URLSearchParams(window.location.search);
    return search.get("source") === "v2" ? HUB_PATH_V2 : HUB_PATH;
  });
  const [activeId, setActiveId] = React.useState(() => {
    const search = new URLSearchParams(window.location.search);
    const fromQuery = search.get("opportunity") || "";
    if (fromQuery) return fromQuery;

    const saved = readReviewProgress();
    return saved?.activeId || "";
  });
  const [isSaveDialogOpen, setIsSaveDialogOpen] = React.useState(false);

  const selectedOpportunity = opportunities.find((item) => item.id === activeId) || null;
  const selectedIndex = opportunities.findIndex((item) => item.id === activeId);
  const hasPrevious = selectedIndex > 0;
  const hasNext = selectedIndex >= 0 && selectedIndex < opportunities.length - 1;

  const onBackToList = React.useCallback(() => {
    setActiveId("");
    const params = new URLSearchParams();
    if (returnHubPath === HUB_PATH_V2) {
      params.set("source", "v2");
    }
    const query = params.toString();
    navigateToPath(query ? `${REVIEW_PATH}?${query}` : REVIEW_PATH);
  }, [returnHubPath]);

  const onSelectOpportunity = React.useCallback((opportunityId) => {
    setActiveId(opportunityId);
    const params = new URLSearchParams();
    params.set("opportunity", opportunityId);
    if (returnHubPath === HUB_PATH_V2) {
      params.set("source", "v2");
    }
    navigateToPath(`${REVIEW_PATH}?${params.toString()}`);
  }, [returnHubPath]);

  const onSelectPreviousOpportunity = React.useCallback(() => {
    if (!hasPrevious) return;
    const previous = opportunities[selectedIndex - 1];
    if (!previous) return;
    onSelectOpportunity(previous.id);
  }, [hasPrevious, onSelectOpportunity, opportunities, selectedIndex]);

  const onSelectNextOpportunity = React.useCallback(() => {
    if (!hasNext) return;
    const next = opportunities[selectedIndex + 1];
    if (!next) return;
    onSelectOpportunity(next.id);
  }, [hasNext, onSelectOpportunity, opportunities, selectedIndex]);

  const onDiscardOpportunity = React.useCallback(() => {
    if (!selectedOpportunity) return;

    const discardedIndex = opportunities.findIndex(
      (opp) => opp.id === selectedOpportunity.id
    );

    const updatedOpportunities = opportunities.filter(
      (opp) => opp.id !== selectedOpportunity.id
    );
    setOpportunities(updatedOpportunities);

    toast.success({
      message: `"${selectedOpportunity.label}" has been discarded.`,
      actionLabel: "Undo",
      onAction: () => {
        const restored = [
          ...updatedOpportunities.slice(0, discardedIndex),
          selectedOpportunity,
          ...updatedOpportunities.slice(discardedIndex),
        ];
        setOpportunities(restored);
        onSelectOpportunity(selectedOpportunity.id);
      },
    });

    const currentIndex = opportunities.findIndex(
      (opp) => opp.id === selectedOpportunity.id
    );
    
    if (updatedOpportunities.length === 0) {
      // No more opportunities, go back to list
      setActiveId("");
      const params = new URLSearchParams();
      if (returnHubPath === HUB_PATH_V2) {
        params.set("source", "v2");
      }
      const query = params.toString();
      navigateToPath(query ? `${REVIEW_PATH}?${query}` : REVIEW_PATH);
    } else if (currentIndex < updatedOpportunities.length) {
      // Navigate to the next item (which is now at currentIndex due to removal)
      onSelectOpportunity(updatedOpportunities[currentIndex].id);
    } else {
      // If we were at the end, go to the new last item
      onSelectOpportunity(updatedOpportunities[updatedOpportunities.length - 1].id);
    }
  }, [selectedOpportunity, opportunities, onSelectOpportunity, returnHubPath, toast]);

  const onSaveAndClose = React.useCallback(() => {
    if (opportunities.length > 0) {
      const nextActiveId = selectedOpportunity?.id || opportunities[0]?.id || "";
      saveReviewProgress({ opportunities, activeId: nextActiveId });
    } else {
      clearReviewProgress();
    }

    setIsSaveDialogOpen(false);
    navigateToPath(returnHubPath);
  }, [opportunities, returnHubPath, selectedOpportunity]);

  const formHeaderContent = (
    <div style={styles.reviewFormHead}>
      <div style={styles.reviewFormHeadTop}>
        <h2 style={styles.sectionTitle}>Opportunity extraction</h2>
        <div style={styles.reviewFormHeadActions}>
          <Button variant="secondary" size="md" iconLeading={<Icon name="Plus" size="sm" />}>Add</Button>
          <Button variant="secondary" size="md" iconOnly ariaLabel="Information" iconLeading={<Icon name="InformationCircle" size="sm" />} />
          <Button variant="secondary" size="md" iconOnly ariaLabel="Flag" iconLeading={<Icon name="Flag" size="sm" />} />
        </div>
      </div>
      <p style={styles.reviewDisclaimer}>
        <Icon name="InformationCircle" size="sm" />
        Inaccuracies may occur with AI. Please review carefully.
      </p>
    </div>
  );

  const listContent = (
    <div style={styles.extractedList}>
      {opportunities.map((opportunity, index) => (
        <button
          key={opportunity.id}
          type="button"
          style={styles.extractedRow}
          onClick={() => onSelectOpportunity(opportunity.id)}
        >
          <p style={styles.extractedRowLabel}>{`${index + 1}. ${opportunity.label}`}</p>
          {opportunity.matched ? <Badge size="xs">Matched found</Badge> : <span />}
          <Icon name="ChevronRight" size="sm" />
        </button>
      ))}
    </div>
  );

  const formContent = selectedOpportunity ? (
    <div style={styles.formPanelWrap}>
      <div style={styles.formPanelHeader}>
        <div style={styles.formPanelTitleWrap}>
          <Button
            variant="tertiary"
            size="sm"
            iconOnly
            ariaLabel="Back to extracted opportunities"
            iconLeading={<Icon name="ChevronLeft" size="sm" />}
            onClick={onBackToList}
          />
          <h3 style={styles.formPanelTitle}>{selectedOpportunity.label}</h3>
        </div>
        <div style={styles.formPanelNav}>
          <Button
            variant="secondary"
            size="xs"
            iconOnly
            ariaLabel="Previous extracted opportunity"
            iconLeading={<Icon name="ChevronUp" size="sm" />}
            onClick={onSelectPreviousOpportunity}
            isDisabled={!hasPrevious}
            style={styles.formPanelNavButton}
          />
          <div style={styles.formPanelNavText}>{`${selectedIndex + 1} of ${opportunities.length}`}</div>
          <Button
            variant="secondary"
            size="xs"
            iconOnly
            ariaLabel="Next extracted opportunity"
            iconLeading={<Icon name="ChevronDown" size="sm" />}
            onClick={onSelectNextOpportunity}
            isDisabled={!hasNext}
            style={styles.formPanelNavButton}
          />
        </div>
      </div>

      {selectedOpportunity.matched && (
        <PotentialDuplicatesSection
          currentOpportunity={selectedOpportunity}
          allOpportunities={opportunities}
        />
      )}

      <Toggle label="Populate missing with databases" isSelected={true} size="sm" />

      <TextInput label="Opportunity name" isRequired value={selectedOpportunity.form.name} readOnly />

      <SelectPreviewField label="Status" required value={selectedOpportunity.form.status} references={["Non-confidential.pdf / p.3"]} />
      <SelectPreviewField label="Initiative" required value={selectedOpportunity.form.initiative} references={["Non-confidential.pdf / p.3"]} />
      <SelectPreviewField label="Asset" required value={selectedOpportunity.form.asset} references={["2 documents / 5 refs"]} />
      <SelectPreviewField label="Company" required value={selectedOpportunity.form.company} references={["Non-confidential.pdf / p.3"]} />
      <SelectPreviewField label="Opportunity type" value={selectedOpportunity.form.opportunityType} />

      <hr style={styles.sectionDivider} />
      <h4 style={styles.formSectionTitle}>Additional required information</h4>

      <SelectPreviewField label="Therapeutic areas" required value={selectedOpportunity.form.therapeuticArea} />

      <div style={styles.fieldGroup}>
        <p style={styles.fieldTitle}>
          Clinical indications <span style={styles.required}>*</span>
        </p>
        <div style={{ display: "inline-flex", gap: "var(--spacing-xs)", flexWrap: "wrap" }}>
          {selectedOpportunity.form.indications.map((indication) => (
            <Chip key={indication} size="sm">{indication}</Chip>
          ))}
        </div>
      </div>

      <SelectPreviewField label="Development phase" required value={selectedOpportunity.form.developmentPhase} />
      <SelectPreviewField label="Drug type" required value={selectedOpportunity.form.drugType} />

      <hr style={styles.sectionDivider} />
      <h4 style={styles.formSectionTitle}>Details</h4>
      <p style={styles.sectionEyebrow}>Opportunity details</p>
      <SelectPreviewField label="Actionability confirmed" value={selectedOpportunity.form.actionability} />
      <SelectPreviewField label="BD tier" value={selectedOpportunity.form.bdTier} references={["Cortellis"]} />
      <SelectPreviewField label="Business unit" value={selectedOpportunity.form.businessUnit} references={["Cortellis"]} />
      <SelectPreviewField label="Current status" value={selectedOpportunity.form.currentStatus} />

      <hr style={styles.sectionDivider} />
      <p style={styles.sectionEyebrow}>Asset details</p>
      <MultiValuePreviewField label="Applications" values={selectedOpportunity.form.applications} />
      <MultiValuePreviewField label="Approach" values={selectedOpportunity.form.approach} />
      <SelectPreviewField label="Developability" value={selectedOpportunity.form.developability} />
      <SelectPreviewField
        label="Probability of technical success (%)"
        value={selectedOpportunity.form.probabilityTechnicalSuccess}
      />
    </div>
  ) : (
    listContent
  );

  const footerButtons = selectedOpportunity
    ? [
        {
          label: "Discard",
          variant: "secondary",
          color: "secondary-destructive",
          onClick: onDiscardOpportunity,
        },
        {
          label: "Create",
          variant: "secondary",
        },
      ]
    : [];

  const headerContent = (
    <ObjectHeader>
      <ObjectHeaderTopBar>
        <ObjectHeaderTopBarLeft>
          <ObjectHeaderBackButton label="Back" onClick={() => navigateToPath(returnHubPath)} />
          <h1 style={styles.reviewHeaderTitle}>Deck.pdf</h1>
        </ObjectHeaderTopBarLeft>
        <ObjectHeaderTopBarRight>
          <Button variant="primary" size="md" onClick={() => setIsSaveDialogOpen(true)}>Save and close</Button>
        </ObjectHeaderTopBarRight>
      </ObjectHeaderTopBar>
    </ObjectHeader>
  );

  return (
    <>
      <DocumentViewerPage
        headerContent={headerContent}
        pages={REVIEW_DOCUMENT_PAGES}
        defaultPage={1}
        formHeaderContent={formHeaderContent}
        formContent={formContent}
        footerButtons={footerButtons}
        showDefaultFooterButtons={false}
        documentViewerProps={{
          style: {
            height: "100%",
            "--document-viewer-height": "100%",
          },
        }}
        style={{ height: "100vh" }}
      />
      <Dialog
        isOpen={isSaveDialogOpen}
        onOpenChange={setIsSaveDialogOpen}
        variant="warning"
        title=""
        showIcon={true}
        showClose={true}
        secondaryLabel="Continue reviewing"
        onSecondaryPress={() => setIsSaveDialogOpen(false)}
        primaryLabel="Save"
        onPrimaryPress={onSaveAndClose}
      >
        {`You have ${opportunities.length} unreviewed opportunities.`}
      </Dialog>
    </>
  );
};

export const AiOpportunityExtractionPage = () => {
  const [rows] = React.useState(AI_OPPORTUNITY_DATA);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [reviewProgress, setReviewProgress] = React.useState(() => readReviewProgress());
  const [viewMode, setViewMode] = React.useState("list");
  const [searchValue, setSearchValue] = React.useState("");

  const handleExtractToReview = React.useCallback(() => {
    clearReviewProgress();
    setReviewProgress(null);
    navigateToPath(REVIEW_PATH);
  }, []);

  const handleResumeReview = React.useCallback(() => {
    const saved = readReviewProgress();
    if (!saved?.opportunities?.length) return;

    const nextId = saved.activeId || saved.opportunities[0]?.id || "";
    navigateToPath(nextId ? `${REVIEW_PATH}?opportunity=${nextId}` : REVIEW_PATH);
  }, []);

  const columns = [
    { key: "name", label: "Opportunity", type: "link", sortable: true, width: "280px" },
    { key: "status", label: "Status", type: "chip", width: "140px", chipProps: { chevron: false, removable: false } },
    { key: "confidence", label: "Confidence", type: "chip", width: "140px", chipProps: { chevron: false, removable: false } },
    { key: "value", label: "Est. Value", sortable: true, width: "140px" },
    { key: "owner", label: "Owner", width: "180px" },
    { key: "source", label: "Source", width: "160px" },
    { key: "tags", label: "Tags", type: "badges", width: "200px", maxVisible: 2 },
    { key: "action", label: "Actions", type: "button", width: "88px", sticky: true },
  ];

  return (
    <>
      <Hub
        title="Opportunities"
        badge={String(rows.length)}
        menuVariant="deal"
        columns={columns}
        data={rows}
        showPagination={true}
        totalItems={rows.length}
        headerSecondary={
          reviewProgress?.opportunities?.length ? (
            <Infobox
              variant="info"
              title="You have revisions in progress"
              description={`${reviewProgress.opportunities.length} unreviewed opportunities remaining.`}
              actionLabel="Resume"
              onAction={handleResumeReview}
            />
          ) : null
        }
        headerLeftContent={
          <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-2)" }}>
            <HubHeaderContextButton label="Oncology" starred iconName="User" />
            <HubHeaderViewToggle value={viewMode} onChange={setViewMode} />
          </div>
        }
        headerActions={
          <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-2)" }}>
            <HubHeaderSearch value={searchValue} onChange={setSearchValue} />
            <HubHeaderSmartFilterButton />
            <HubHeaderSettingsButton />
            <HubHeaderExportButton />
            <Button variant="primary" iconLeading={<Icon name="Plus" size="sm" />} size="md" onClick={() => setIsCreateModalOpen(true)}>Create</Button>
          </div>
        }
        emptyMessage="No opportunities found"
      />
      <CreateOpportunityModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onExtract={handleExtractToReview}
      />
    </>
  );
};

export const AiOpportunityExtractionPageV2 = () => {
  const [rows] = React.useState(AI_OPPORTUNITY_DATA);
  const [isCreateManualModalOpen, setIsCreateManualModalOpen] = React.useState(false);
  const [isExtractModalOpen, setIsExtractModalOpen] = React.useState(false);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = React.useState(false);
  const [headerActionValue, setHeaderActionValue] = React.useState("");
  const [reviewProgress, setReviewProgress] = React.useState(() => readReviewProgress());
  const [viewMode, setViewMode] = React.useState("list");
  const [searchValue, setSearchValue] = React.useState("");

  const handleExtractToReview = React.useCallback(() => {
    clearReviewProgress();
    setReviewProgress(null);
    navigateToPath(`${REVIEW_PATH}?source=v2`);
  }, []);

  const handleResumeReview = React.useCallback(() => {
    const saved = readReviewProgress();
    if (!saved?.opportunities?.length) return;

    const nextId = saved.activeId || saved.opportunities[0]?.id || "";
    const params = new URLSearchParams();
    params.set("source", "v2");
    if (nextId) {
      params.set("opportunity", nextId);
    }
    navigateToPath(`${REVIEW_PATH}?${params.toString()}`);
  }, []);

  const handleHeaderActionChange = React.useCallback((nextValue) => {
    setHeaderActionValue("");

    if (nextValue === "create") {
      setIsCreateMenuOpen(false);
      setIsCreateManualModalOpen(true);
      return;
    }

    if (nextValue === "menu") {
      setIsCreateMenuOpen((prev) => !prev);
    }
  }, []);

  const columns = [
    { key: "name", label: "Opportunity", type: "link", sortable: true, width: "280px" },
    { key: "status", label: "Status", type: "chip", width: "140px", chipProps: { chevron: false, removable: false } },
    { key: "confidence", label: "Confidence", type: "chip", width: "140px", chipProps: { chevron: false, removable: false } },
    { key: "value", label: "Est. Value", sortable: true, width: "140px" },
    { key: "owner", label: "Owner", width: "180px" },
    { key: "source", label: "Source", width: "160px" },
    { key: "tags", label: "Tags", type: "badges", width: "200px", maxVisible: 2 },
    { key: "action", label: "Actions", type: "button", width: "88px", sticky: true },
  ];

  return (
    <>
      <Hub
        title="Opportunities"
        badge={String(rows.length)}
        menuVariant="deal"
        columns={columns}
        data={rows}
        showPagination={true}
        totalItems={rows.length}
        headerSecondary={
          reviewProgress?.opportunities?.length ? (
            <Infobox
              variant="info"
              title="You have revisions in progress"
              description={`${reviewProgress.opportunities.length} unreviewed opportunities remaining.`}
              actionLabel="Resume"
              onAction={handleResumeReview}
            />
          ) : null
        }
        headerLeftContent={
          <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-2)" }}>
            <HubHeaderContextButton
              label="Oncology"
              starred
              iconName="User"
            />
            <HubHeaderViewToggle value={viewMode} onChange={setViewMode} />
          </div>
        }
        headerActions={
          <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-2)" }}>
            <HubHeaderSearch value={searchValue} onChange={setSearchValue} />
            <HubHeaderSmartFilterButton />
            <HubHeaderSettingsButton />
            <HubHeaderExportButton />
            <DropdownMenu open={isCreateMenuOpen} onOpenChange={setIsCreateMenuOpen}>
              <ButtonGroup value={headerActionValue} onChange={handleHeaderActionChange}>
                <ButtonGroupItem value="create" iconName="Plus">Create</ButtonGroupItem>
                <ButtonGroupItem value="menu" iconName="ChevronDown" ariaLabel="Open create actions" />
              </ButtonGroup>
              <DropdownMenuContent align="right" width={180}>
                <DropdownMenuSection>
                  <DropdownMenuItem
                    label="Extract with AI"
                    onClick={() => {
                      setIsCreateMenuOpen(false);
                      setIsExtractModalOpen(true);
                    }}
                  />
                </DropdownMenuSection>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
        emptyMessage="No opportunities found"
      />

      <CreateOpportunityManualModal
        open={isCreateManualModalOpen}
        onClose={() => setIsCreateManualModalOpen(false)}
      />

      <ExtractWithAiModal
        open={isExtractModalOpen}
        onClose={() => setIsExtractModalOpen(false)}
        onExtract={handleExtractToReview}
      />
    </>
  );
};

export default AiOpportunityExtractionPage;
