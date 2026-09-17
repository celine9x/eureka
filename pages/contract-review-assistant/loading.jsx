import React, { useEffect, useMemo, useState } from "react";
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
import { Badge } from "../../library/atoms/badge.jsx";
import { Checkbox } from "../../library/atoms/checkbox.jsx";
import InpartLogo from "../../library/organisms/side-menu/Inpart.svg";
import InpartLogoCollapsed from "../../library/organisms/side-menu/Inpart1.svg";
import {
  EmptyState,
  ProgressIndicator,
  PROGRESS_INDICATOR_LABEL_POSITIONS,
  RichTextToolbars,
} from "../../library/index.js";
import Accordion from "../../library/molecules/accordion.jsx";
import Link from "../../library/atoms/link.jsx";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { Textarea } from "@/library/molecules/textarea";
import LoaderIllustration from "../../library/atoms/illustration/Loader.svg";
import DetectAiIllustration from "../../library/atoms/illustration/Detect AI.svg";
import {
  SAMPLE_DOCUMENT_TEXT,
  DOCUMENT_PARAGRAPH_STYLES,
  DOCUMENT_BLOCK_HTML_OVERRIDES,
  useContractDocumentPages,
} from "./contract-document-view.js";


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

const CONTRACT_REVIEW_ASSISTANT_REVIEW_PATH = "/contract-review-assistant/review";

const navigateToPath = (nextPath) => {
  window.history.pushState({}, "", nextPath);
  window.dispatchEvent(new PopStateEvent("popstate"));
};

const REVIEW_GUIDANCE_ITEMS = [
  "Nuvexa - CMC cost overrun",
  "Helix - milestone trigger dispute",
  "Arden - JSC governance deadlock",
];

const LINKED_RISK_ITEMS = [
  { label: "Nuvexa - CMC cost overrun", severity: "High", color: "warning" },
  { label: "Helix - milestone trigger dispute", severity: "Moderate", color: "informative" },
  { label: "Arden - JSC governance deadlock", severity: "Low", color: "neutral" },
];

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
  guidanceline:{
    display: "flex",
    justifyContent: "flex-start",
    gap: "var(--spacing-2)",
  }

};

const ChecklistRows = ({ items, selectedMap, onChange, showSeverity = false }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
    {items.map((item) => (
      <div key={item.label} style={styles.checkRow}>
        <Checkbox
          isSelected={Boolean(selectedMap[item.label])}
          onChange={(isSelected) => onChange(item.label, isSelected)}
        >
          <span style={styles.checkLabel}>
            <Icon name="DocumentText" size="sm" />
            <span>{item.label}</span>
          </span>
        </Checkbox>
        {showSeverity ? <Badge size="sm" color={item.color}>{item.severity}</Badge> : null}
      </div>
    ))}
  </div>
);

export const AiObligationExtractionPage = () => {
  const [guidanceChecked, setGuidanceChecked] = useState({
    "Nuvexa - CMC cost overrun": true,
    "Helix - milestone trigger dispute": true,
    "Arden - JSC governance deadlock": true,
  });
  const [riskChecked, setRiskChecked] = useState({
    "Nuvexa - CMC cost overrun": true,
    "Helix - milestone trigger dispute": true,
    "Arden - JSC governance deadlock": false,
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = null;
    let startTime = null;
    const duration = 5000;

    const updateProgress = (timestamp) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const nextProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(nextProgress);

      if (elapsed < duration) {
        rafId = window.requestAnimationFrame(updateProgress);
      } else {
        navigateToPath(CONTRACT_REVIEW_ASSISTANT_REVIEW_PATH);
      }
    };

    rafId = window.requestAnimationFrame(updateProgress);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const selectedGuidanceCount = useMemo(
    () => REVIEW_GUIDANCE_ITEMS.filter((label) => guidanceChecked[label]).length,
    [guidanceChecked]
  );
  const selectedRiskCount = useMemo(
    () => LINKED_RISK_ITEMS.filter((item) => riskChecked[item.label]).length,
    [riskChecked]
  );

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
        sections={dealSections}
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
              showFooter={false}
            
            >
          
    
            <EmptyState
              title="Reviewing"
              description="The AI is currently reviewing the uploaded contract. Please wait for the process to complete."
              showIllustration
              illustration={DetectAiIllustration}
              showActionButton={false}
            />
<ProgressIndicator
  value={progress}
  min={0}
  max={100}
  labelPosition={PROGRESS_INDICATOR_LABEL_POSITIONS.right}
  valueFormatter={(value) => `${Math.round(value)}%`}
  style={{ width: "100%" }}
  labelStyle={{
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-sm)",
    lineHeight: "var(--line-height-body-sm)",
  }}
  fillStyle={{ background: "var(--color-action-fill-primary-enabled)" }}
  usePhaseMode={true}
  phaseCount={4}
  phaseLabels={[
    "Reading the contract...",
    "Extracting key clauses...",
    "Comparing against precedent and policy...",
    "Compiling findings...",
  ]}
/>
          
       




  
            </CreationFormPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiObligationExtractionPage;
