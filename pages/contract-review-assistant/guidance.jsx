import React, { useMemo, useRef, useState } from "react";
import { SideMenu } from "../../library/organisms/side-menu/side-menu.jsx";
import {
  HubHeader,
  HubHeaderRow,
  HubHeaderLeft,
  HubHeaderRight,
  HubHeaderActions,
  HubHeaderTitle,
} from "../../library/organisms/hub-header.jsx";
import { DocumentViewer } from "../../library/organisms/document-viewer/document-viewer.jsx";
import { CreationFormPanel } from "../../library/organisms/creation-form-panel.jsx";
import { Button } from "../../library/atoms/button.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { ExportIcon } from "@phosphor-icons/react";
import { ColorStatus, RISK_LEVELS } from "../../library/atoms/color-status.jsx";
import { Checkbox } from "../../library/atoms/checkbox.jsx";
import InpartLogo from "../../library/organisms/side-menu/Inpart.svg";
import InpartLogoCollapsed from "../../library/organisms/side-menu/Inpart1.svg";
import { RichTextToolbars } from "../../library/index.js";
import Accordion from "../../library/molecules/accordion.jsx";
import Link from "../../library/atoms/link.jsx";
import { Tooltip } from "../../library/atoms/tooltip.jsx";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Textarea } from "@/library/molecules/textarea";
import { FileUploader } from "../../library/molecules/file-uploader.jsx";
import { FileUploaded } from "../../library/molecules/file-uploaded.jsx";
import { AiButton } from "@/library/atoms/ai-button";

const dealSections = [
  {
    items: [
      { label: "Home", iconName: "Home" },
      { label: "AI assistant", iconName: "Sparkles" },
      { label: "Dashboard", iconName: "ChartBar" },
      { label: "Network", iconName: "Share" },
    ],
  },
  {
    title: "Workspace",
    items: [
      { label: "Initiatives", iconName: "initiative" },
      { label: "Opportunities", iconName: "opportunity" },
      { label: "Agreements", iconName: "agreement" },
      { label: "Alliances", iconName: "alliance" },
      { label: "Obligations", iconName: "obligation" },
    ],
  },
  {
    title: "Directory",
    items: [
      { label: "Companies", iconName: "company" },
      { label: "Contacts", iconName: "contact" },
      { label: "Meetings", iconName: "meeting" },
    ],
    dividerAfter: true,
  },
  {
    title: "Recent Initiatives",
    items: [{ label: "ALLINPART", iconColor: "var(--color-content-brand)", iconLetter: "A" }],
  },
];

const CONTRACT_REVIEW_ASSISTANT_LOADING_PATH = "/contract-review-assistant/loading";

const navigateToPath = (nextPath) => {
  window.history.pushState({}, "", nextPath);
  window.dispatchEvent(new PopStateEvent("popstate"));
};

const ALLIANCE_POST_MORTEMS = [
  { id: "nuvexa-cmc-overrun", label: "Nuvexa Bio – CMC cost overrun post-mortem" },
  { id: "helix-milestone-dispute", label: "Helix Pharmaceuticals – milestone trigger dispute retro" },
  { id: "arden-jsc-deadlock", label: "Arden Therapeutics – JSC governance deadlock review" },
];

const LINKED_OPEN_RISKS = [
  { id: "liability-cap-gap", label: "Liability cap excludes confidentiality breach — Clause 12.3", severity: "High" },
  { id: "exclusivity-term-cap", label: "Exclusivity term exceeds 12-month policy cap — Clause 8.2", severity: "Moderate" },
  { id: "unbudgeted-spend-gap", label: "Unbudgeted spend approval gap — Clause 2.4", severity: "Moderate" },
  { id: "royalty-term-ambiguity", label: "Royalty term end-date ambiguity — Clause 1.20", severity: "Low" },
];

const SEVERITY_TO_RISK_LEVEL = {
  "Very High": RISK_LEVELS.veryHigh,
  High: RISK_LEVELS.high,
  Moderate: RISK_LEVELS.medium,
  Low: RISK_LEVELS.low,
};

const RISK_LEVEL_LABELS = {
  [RISK_LEVELS.veryHigh]: "Very High",
  [RISK_LEVELS.high]: "High",
  [RISK_LEVELS.medium]: "Medium",
  [RISK_LEVELS.low]: "Low",
};

const SAMPLE_DOCUMENT_TEXT = `COLLABORATION AND LICENSE AGREEMENT

This Collaboration and License Agreement (this "Agreement") is entered into as of the Effective Date by and between Veltarix Therapeutics, Inc. ("Veltarix") and Meridian Biosciences Ltd. (the "Company," and together with Veltarix, the "Parties").qskfqskljdf

RECITALS

WHEREAS, Veltarix owns or controls certain intellectual property relating to the Compound and desires to grant a license to the Company on the terms set out herein;

WHEREAS, the Company has expertise in the development and commercialization of therapeutic products and desires to obtain such license;

NOW, THEREFORE, in consideration of the mutual covenants contained herein, the Parties agree as follows.

1. DEFINITIONS
1.1 "Affiliate" means any entity controlling, controlled by, or under common control with a Party.

1.7 "Compound" means the proprietary molecule designated VTX-338 and any salt, ester or polymorph thereof.

1.9 "Field" means all human therapeutic, prophylactic and diagnostic uses.

1.20 "Royalty Term" means, on a product-by-product and country-by-country basis, the period beginning on First Commercial Sale and ending on the later of patent expiry or ten (10) years thereafter.

\f

2. LICENSE GRANT

2.1 Subject to the terms and conditions of this Agreement, Veltarix hereby grants to Company an exclusive, royalty-bearing license in the Field and Territory under Licensed IP.

\f

3. GOVERNANCE

3.1 A Joint Steering Committee (JSC) will oversee development and commercialization activities.

\f

4. TERM AND TERMINATION

4.1 This Agreement commences on the Effective Date and remains in effect unless earlier terminated.`;

const styles = {
  shell: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    background: "var(--color-general-neutral-light)",
  },
  main: {
    marginLeft: 80,
    width: "calc(100vw - 80px)",
    minWidth: 0,
    height: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    gridTemplateRows: "auto auto minmax(0, 1fr)",
    columnGap: "var(--spacing-3)",
    rowGap: "var(--spacing-3)",
  
    boxSizing: "border-box",
  },
  topLabel: {
    gridColumn: "2 / span 10",
    margin: 0,
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    lineHeight: "var(--line-height-body-lg)",
  },
  hubHeaderWrap: {
    gridColumn: "2 / span 10",

    background: "var(--color-general-neutral-light)",

  },
  bottomWrap: {
    gridColumn: "2 / span 10",
    minHeight: 0,
    display: "grid",
    gridTemplateColumns: "repeat(10, minmax(0, 1fr))",
    gap: "var(--spacing-3)",
  },
  viewerPane: {
    gridColumn: "span 6",
    minWidth: 0,
    minHeight: 0,
  },
  formPane: {
    gridColumn: "span 4",
    minWidth: 0,
    minHeight: 0,
  },
  sectionIntro: {
    margin: 0,
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
  },
  checkRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-2)",
  },
  checkLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
    color: "var(--color-content-brand)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
  },
  helperLabel: {
    margin: 0,
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-medium)",
  },
  instruction: {
    minHeight: 64,
    borderRadius: "var(--radius-sm)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    background: "var(--color-general-neutral-light)",
    color: "var(--color-content-tertiary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    padding: "var(--spacing-2)",
  },
  guidanceline: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "var(--spacing-2)",
    minWidth: 0,
  },
  guidancelineWithBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-2)",
    minWidth: 0,
  },
  guidancelineLeft: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-2)",
    minWidth: 0,
    flex: "1 1 auto",
  },
  guidancelineLinkLabel: {
    minWidth: 0,
    flex: "1 1 auto",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

};

const withAllSetTo = (items, isSelected) => Object.fromEntries(items.map((item) => [item.id, isSelected]));

export const AiObligationExtractionPage = () => {
  const [guidanceChecked, setGuidanceChecked] = useState(() => withAllSetTo(ALLIANCE_POST_MORTEMS, true));
  const [riskChecked, setRiskChecked] = useState(() => withAllSetTo(LINKED_OPEN_RISKS, true));

  const selectedGuidanceCount = useMemo(
    () => ALLIANCE_POST_MORTEMS.filter((item) => guidanceChecked[item.id]).length,
    [guidanceChecked]
  );
  const selectedRiskCount = useMemo(
    () => LINKED_OPEN_RISKS.filter((item) => riskChecked[item.id]).length,
    [riskChecked]
  );

  const isGuidanceHeaderChecked = selectedGuidanceCount > 0;
  const isRiskHeaderChecked = selectedRiskCount > 0;

  const toggleGuidanceItem = (id, isSelected) =>
    setGuidanceChecked((current) => ({ ...current, [id]: isSelected }));
  const toggleAllGuidance = (isSelected) => setGuidanceChecked(withAllSetTo(ALLIANCE_POST_MORTEMS, isSelected));

  const toggleRiskItem = (id, isSelected) =>
    setRiskChecked((current) => ({ ...current, [id]: isSelected }));
  const toggleAllRisk = (isSelected) => setRiskChecked(withAllSetTo(LINKED_OPEN_RISKS, isSelected));

  const contextFileInputRef = useRef(null);
  const [contextFiles, setContextFiles] = useState([]);

  const openContextFileDialog = () => contextFileInputRef.current?.click();

  const handleContextFilesSelected = (event) => {
    const selectedFiles = Array.from(event.target?.files || []);
    if (selectedFiles.length > 0) {
      setContextFiles((current) => [...current, ...selectedFiles]);
    }
    event.target.value = "";
  };

  const removeContextFile = (index) =>
    setContextFiles((current) => current.filter((_, fileIndex) => fileIndex !== index));

  return (
    <div style={styles.shell}>
      <SideMenu
        variant="collapsed"
        expandOnHover
        logoSrc={InpartLogo}
        collapsedLogoSrc={InpartLogoCollapsed}
        showSearch
        searchPlaceholder="Quick search"
        sections={dealSections}
        createButtonLabel="Create"
        user={{
          name: "Linh Nguyen",
          email: "linh.nguyen@inpart.io",
          avatarInitials: "LN",
        }}
        onCreateClick={() => {}}
      />

      <div style={styles.main}>
  
        <div style={styles.hubHeaderWrap}>
          <HubHeader>
            <HubHeaderRow>
              <HubHeaderLeft>
                <Button variant="secondary" size="sm" iconLeading={<Icon name="ChevronLeft" size="sm" />}>
                  Back
                </Button>
                <HubHeaderTitle size="md">Alliance name</HubHeaderTitle>
              </HubHeaderLeft>
              <HubHeaderRight>
                <HubHeaderActions>
                  <Button variant="secondary" size="sm">Save and close</Button>
               
                </HubHeaderActions>
              </HubHeaderRight>
            </HubHeaderRow>
          </HubHeader>
        </div>

        <div style={styles.bottomWrap}>
          <div style={styles.viewerPane}>
            <DocumentViewer
              text={SAMPLE_DOCUMENT_TEXT}
              defaultPage={1}
              editable
              showToolbar
              showEditToolbar
              
              style={{ height: "100%", "--document-viewer-height": "100%" }}
            />
          </div>

          <div style={styles.formPane}>
            <CreationFormPanel
              title="Contract review"
              infoMessage="Inaccuracies may occur with AI. Please review carefully."
              footerButtons={[
                {
                  label: "Run review",
                  buttonType: "ai",
                  variant: "secondary",
                  position: "right",
                  size: "lg",
                  iconLeading: <Icon name="Sparkles" size="lg" variant="outline" />,
                  style: { flex: 1 },
                  onClick: () => navigateToPath(CONTRACT_REVIEW_ASSISTANT_LOADING_PATH),
                },
              ]}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
                <h3
                  style={{
                    margin: 0,
                    color: "var(--color-content-primary)",
                    fontFamily: "var(--font-family-primary)",
                    fontSize: "var(--text-highlight-lg)",
                    lineHeight: "var(--line-height-highlight-lg)",
                  }}
                >
                  Review guidance
                </h3>
                <p style={styles.sectionIntro}>
                  Redlines the contract against your selected instructions.
                </p>
              </div>

  {/* ACCORDION */}
<Accordion
  title="Alliance post-mortems"
  size="sm"
  showCheckbox
  checkboxProps={{
    isSelected: isGuidanceHeaderChecked,
    onChange: (isSelected) => toggleAllGuidance(isSelected),
  }}
  badgeLabel={`${selectedGuidanceCount}/${ALLIANCE_POST_MORTEMS.length}`}
  showBadge

>
  {/* Accordion content */}

{ALLIANCE_POST_MORTEMS.map((item) => (
  <div key={item.id} style={styles.guidanceline}>
    <Checkbox
      isSelected={Boolean(guidanceChecked[item.id])}
      onChange={(isSelected) => toggleGuidanceItem(item.id, isSelected)}
    />
    <Tooltip content={item.label} placement="bottom-left" style={{ flex: "1 1 auto", minWidth: 0, justifyContent: "flex-start" }}>
      <Link
        size="md"
        href="#"
        style={{ minWidth: 0, justifyContent: "flex-start" }}
        iconLeading={<Icon name="DocumentText" variant="outline" size="sm" />}
      >
        <span style={styles.guidancelineLinkLabel}>{item.label}</span>
      </Link>
    </Tooltip>
  </div>
))}

</Accordion>

{/* ACCORDION */}
<Accordion
  title="Linked open risks"
  size="sm"
  showCheckbox
  checkboxProps={{ 
    isSelected: isRiskHeaderChecked,
    onChange: (isSelected) => toggleAllRisk(isSelected),
  }}
  badgeLabel={`${selectedRiskCount}/${LINKED_OPEN_RISKS.length}`}
  showBadge

>
  {/* Linked risks */}

{LINKED_OPEN_RISKS.map((item) => (
  <div key={item.id} style={styles.guidancelineWithBadge}>
    <div style={styles.guidancelineLeft}>
      <Checkbox
        isSelected={Boolean(riskChecked[item.id])}
        onChange={(isSelected) => toggleRiskItem(item.id, isSelected)}
      />
      <Tooltip content={item.label} placement="bottom-left" style={{ flex: "1 1 auto", minWidth: 0, justifyContent: "flex-start" }}>
        <Link
          size="md"
          href="#"
          style={{ minWidth: 0, justifyContent: "flex-start" }}
          iconLeading={<Icon name="DocumentText" variant="outline" size="sm" />}
        >
          <span style={styles.guidancelineLinkLabel}>{item.label}</span>
        </Link>
      </Tooltip>
    </div>
    <ColorStatus variant="risk-impact" level={SEVERITY_TO_RISK_LEVEL[item.severity]}>
      {RISK_LEVEL_LABELS[SEVERITY_TO_RISK_LEVEL[item.severity]]}
    </ColorStatus>
  </div>
))}

</Accordion>
<div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-2)" }}>
    <p style={{ color: "var(--color-content-secondary)", fontSize: "var(--text-body-md)", paddingBottom: "var(--spacing-xs)" }}>Additional files for context</p>
<Button variant="secondary" size="sm" iconLeading={<Icon name="ArrowUpTray" size="sm" />} onClick={openContextFileDialog}>
  Browse files
</Button>
<input
  ref={contextFileInputRef}
  type="file"
  multiple
  onChange={handleContextFilesSelected}
  style={{ display: "none" }}
/>
{contextFiles.length > 0 && (
  <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-2)" }}>
    {contextFiles.map((file, index) => (
      <FileUploaded
        key={`${file.name}-${index}`}
        fileName={file.name}
        onRemove={() => removeContextFile(index)}
        removeAriaLabel={`Remove ${file.name}`}
      />
    ))}
  </div>
)}
</div>



         
<Textarea label="Additional instruction" placeholder="Pay particular attention to cost-sharing, milestone triggers, and non-cancellable CMC commitments." />
            </CreationFormPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiObligationExtractionPage;
