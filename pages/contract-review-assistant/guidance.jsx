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
import { ColorStatus, RISK_LEVELS, ISSUE_PRIORITY_LEVELS } from "../../library/atoms/color-status.jsx";
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
import {
  SAMPLE_DOCUMENT_TEXT,
  DOCUMENT_PARAGRAPH_STYLES,
  DOCUMENT_BLOCK_HTML_OVERRIDES,
  useContractDocumentPages,
} from "./contract-document-view.js";

const CONTRACT_REVIEW_ASSISTANT_LOADING_PATH = "/contract-review-assistant/loading";

const navigateToPath = (nextPath) => {
  window.history.pushState({}, "", nextPath);
  window.dispatchEvent(new PopStateEvent("popstate"));
};

const POST_MORTEMS = [
  {
    id: "kestrel-helios-postmortem",
    label: "Undisclosed development inactivity",
    meta: "Kestrel Bio - Helios Pharma — closed 2024",
  },
  {
    id: "corvale-helios-postmortem",
    label: "Programme deprioritisation and milestone delays",
    meta: "Corvale Biosciences - Helios Pharma — closed 2025",
  },
];

const RELEVANT_ISSUES = [
  {
    id: "late-milestone-payment-notification",
    label: "Late milestone payment following delayed partner notification",
    priority: "high",
    meta: "Kestrel Bio - Helios Pharma",
  },
  {
    id: "development-status-update-missed",
    label: "Missed development status update following programme deprioritisation",
    priority: "high",
    meta: "Corvale Biosciences - Helios Pharma",
  },
];

const RELEVANT_RISKS = [
  {
    id: "funding-continuity-risk",
    label: "Risk of insufficient funding to complete development",
    impact: "very-high",
    meta: "Meridian due diligence",
  },
  {
    id: "milestone-delivery-risk",
    label: "Risk of delayed development and regulatory milestones",
    impact: "high",
    meta: "Meridian due diligence",
  },
  {
    id: "competitive-position-risk",
    label: "Risk of loss of competitive position",
    impact: "medium",
    meta: "Meridian due diligence",
  },
];

const ISSUE_PRIORITY_LABELS = {
  [ISSUE_PRIORITY_LEVELS.critical]: "Priority: Critical",
  [ISSUE_PRIORITY_LEVELS.high]: "Priority: High",
  [ISSUE_PRIORITY_LEVELS.medium]: "Priority: Medium",
  [ISSUE_PRIORITY_LEVELS.low]: "Priority: Low",
};

const RISK_IMPACT_LABELS = {
  [RISK_LEVELS.veryHigh]: "Impact: Very High",
  [RISK_LEVELS.high]: "Impact: High",
  [RISK_LEVELS.medium]: "Impact: Medium",
  [RISK_LEVELS.low]: "Impact: Low",
};

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
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: "var(--spacing-2)",
    minWidth: 0,
  },
  guidancelineWithBadge: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "var(--spacing-2)",
    minWidth: 0,
  },
  guidancelineLeft: {
    display: "flex",
    alignItems: "flex-start",
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
  guidancelineContent: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
    minWidth: 0,
    flex: "1 1 auto",
  },
  guidancelineMeta: {
    margin: 0,
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-sm)",
    lineHeight: "var(--line-height-body-sm)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  guidancelineMetaRow: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
    minWidth: 0,
  },
  guidancelineMetaText: {
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-sm)",
    lineHeight: "var(--line-height-body-sm)",
    whiteSpace: "nowrap",
  },
  guidancelineMetaSeparator: {
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-sm)",
    lineHeight: "var(--line-height-body-sm)",
  },
  checkboxContainer: {
    paddingTop: 4,
  },
};

const withAllSetTo = (items, isSelected) => Object.fromEntries(items.map((item) => [item.id, isSelected]));

export const AiObligationExtractionPage = () => {
  const [postMortemChecked, setPostMortemChecked] = useState(() => withAllSetTo(POST_MORTEMS, true));
  const [issueChecked, setIssueChecked] = useState(() => withAllSetTo(RELEVANT_ISSUES, true));
  const [riskChecked, setRiskChecked] = useState(() => withAllSetTo(RELEVANT_RISKS, true));

  const selectedPostMortemCount = useMemo(
    () => POST_MORTEMS.filter((item) => postMortemChecked[item.id]).length,
    [postMortemChecked]
  );
  const selectedIssueCount = useMemo(
    () => RELEVANT_ISSUES.filter((item) => issueChecked[item.id]).length,
    [issueChecked]
  );
  const selectedRiskCount = useMemo(
    () => RELEVANT_RISKS.filter((item) => riskChecked[item.id]).length,
    [riskChecked]
  );

  const isPostMortemHeaderChecked = selectedPostMortemCount > 0;
  const isIssueHeaderChecked = selectedIssueCount > 0;
  const isRiskHeaderChecked = selectedRiskCount > 0;

  const togglePostMortemItem = (id, isSelected) =>
    setPostMortemChecked((current) => ({ ...current, [id]: isSelected }));
  const toggleAllPostMortems = (isSelected) => setPostMortemChecked(withAllSetTo(POST_MORTEMS, isSelected));

  const toggleIssueItem = (id, isSelected) =>
    setIssueChecked((current) => ({ ...current, [id]: isSelected }));
  const toggleAllIssues = (isSelected) => setIssueChecked(withAllSetTo(RELEVANT_ISSUES, isSelected));

  const toggleRiskItem = (id, isSelected) =>
    setRiskChecked((current) => ({ ...current, [id]: isSelected }));
  const toggleAllRisks = (isSelected) => setRiskChecked(withAllSetTo(RELEVANT_RISKS, isSelected));

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

  const documentPages = useContractDocumentPages(SAMPLE_DOCUMENT_TEXT);

  return (
    <div style={styles.shell}>
          <SideMenu
             variant="collapsed"
             expandOnHover
             logoSrc={InpartLogo}
             collapsedLogoSrc={InpartLogoCollapsed}
             showSearch
             searchPlaceholder="Quick search"
             menuVariant="deal"
             createButtonLabel="Create"
             user={{
               name: "Julie Settipani",
               email: "julie.settipani@heliospharma.com",
               avatarInitials: "JS",
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
              <HubHeaderTitle size="md">Draft License Agreement Meridian - Helios</HubHeaderTitle>
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
              pages={documentPages}
              paragraphStyles={DOCUMENT_PARAGRAPH_STYLES}
              blockHtmlOverrides={DOCUMENT_BLOCK_HTML_OVERRIDES}
              defaultPage={1}
              editable
              showToolbar
              showEditToolbar
              style={{
                height: "100%",
                "--document-viewer-height": "100%",
                "--document-viewer-page-text-font-family": '"Times New Roman", Times, serif',
              }}
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
                  size: "md",
                  iconLeading: <Icon name="Sparkles" size="md" variant="outline" />,
                  style: { flex: 1 },
                  onClick: () => navigateToPath(CONTRACT_REVIEW_ASSISTANT_LOADING_PATH),
                },
              ]}
              style={{ "--creation-form-panel-content-padding": "var(--spacing-md)" }}
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

  {/* POST-MORTEMS ACCORDION */}
<Accordion
  title="Post-mortems"
  size="sm"
  showCheckbox
  checkboxProps={{
    isSelected: isPostMortemHeaderChecked,
    onChange: (isSelected) => toggleAllPostMortems(isSelected),
  }}
  badgeLabel={`${selectedPostMortemCount}/${POST_MORTEMS.length}`}
  showBadge
>
{POST_MORTEMS.map((item) => (
  <div key={item.id} style={styles.guidancelineWithBadge}>
    <div style={styles.guidancelineLeft}>
      <div style={styles.checkboxContainer}>
        <Checkbox
          isSelected={Boolean(postMortemChecked[item.id])}
          onChange={(isSelected) => togglePostMortemItem(item.id, isSelected)}
        />
      </div>
      <div style={styles.guidancelineContent}>
        <Tooltip content={item.label} placement="bottom-left" style={{ minWidth: 0, justifyContent: "flex-start" }}>
          <Link
            size="md"
            href="#"
            style={{ minWidth: 0, justifyContent: "flex-start" }}
            iconLeading={<Icon name="DocumentText" variant="outline" size="sm" />}
          >
            <span style={styles.guidancelineLinkLabel}>{item.label}</span>
          </Link>
        </Tooltip>
        <p style={styles.guidancelineMeta}>{item.meta}</p>
      </div>
    </div>
  </div>
))}
</Accordion>

{/* RELEVANT ISSUES ACCORDION */}
<Accordion
  title="Relevant issues"
  size="sm"
  showCheckbox
  checkboxProps={{
    isSelected: isIssueHeaderChecked,
    onChange: (isSelected) => toggleAllIssues(isSelected),
  }}
  badgeLabel={`${selectedIssueCount}/${RELEVANT_ISSUES.length}`}
  showBadge
>
{RELEVANT_ISSUES.map((item) => (
  <div key={item.id} style={styles.guidanceline}>
    <div style={styles.checkboxContainer}>
      <Checkbox
        isSelected={Boolean(issueChecked[item.id])}
        onChange={(isSelected) => toggleIssueItem(item.id, isSelected)}
      />
    </div>
    <div style={styles.guidancelineContent}>
      <Tooltip content={item.label} placement="bottom-left" style={{ minWidth: 0, justifyContent: "flex-start" }}>
        <Link
          size="md"
          href="#"
          style={{ minWidth: 0, justifyContent: "flex-start" }}
          iconLeading={<Icon name="DocumentText" variant="outline" size="sm" />}
        >
          <span style={styles.guidancelineLinkLabel}>{item.label}</span>
        </Link>
      </Tooltip>
      <div style={styles.guidancelineMetaRow}>
        <ColorStatus variant="issue-priority" level={item.priority}>
          {ISSUE_PRIORITY_LABELS[item.priority]}
        </ColorStatus>
        <span style={styles.guidancelineMetaSeparator}>·</span>
        <span style={styles.guidancelineMetaText}>{item.meta}</span>
      </div>
    </div>
  </div>
))}
</Accordion>

{/* RELEVANT RISKS ACCORDION */}
<Accordion
  title="Relevant risks"
  size="sm"
  showCheckbox
  checkboxProps={{
    isSelected: isRiskHeaderChecked,
    onChange: (isSelected) => toggleAllRisks(isSelected),
  }}
  badgeLabel={`${selectedRiskCount}/${RELEVANT_RISKS.length}`}
  showBadge
>
{RELEVANT_RISKS.map((item) => (
  <div key={item.id} style={styles.guidanceline}>
    <div style={styles.checkboxContainer}>
      <Checkbox
        isSelected={Boolean(riskChecked[item.id])}
        onChange={(isSelected) => toggleRiskItem(item.id, isSelected)}
      />
    </div>
    <div style={styles.guidancelineContent}>
      <Tooltip content={item.label} placement="bottom-left" style={{ minWidth: 0, justifyContent: "flex-start" }}>
        <Link
          size="md"
          href="#"
          style={{ minWidth: 0, justifyContent: "flex-start" }}
          iconLeading={<Icon name="DocumentText" variant="outline" size="sm" />}
        >
          <span style={styles.guidancelineLinkLabel}>{item.label}</span>
        </Link>
      </Tooltip>
      <div style={styles.guidancelineMetaRow}>
        <ColorStatus variant="risk-impact" level={item.impact}>
          {RISK_IMPACT_LABELS[item.impact]}
        </ColorStatus>
        <span style={styles.guidancelineMetaSeparator}>·</span>
        <span style={styles.guidancelineMetaText}>{item.meta}</span>
      </div>
    </div>
  </div>
))}
</Accordion>
<div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-2)" }}>
    <p style={{
      margin: 0,
      fontFamily: "var(--font-family-primary)",
      fontSize: "var(--text-body-md)",
      fontWeight: "var(--font-weight-regular)",
      lineHeight: "var(--line-height-body-md)",
      color: "var(--color-content-secondary)",
    }}>Additional files for context</p>
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
