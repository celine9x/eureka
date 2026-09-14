import React, { useMemo, useState } from "react";
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
import { Chip } from "../../library/atoms/chip.jsx";
import { Badge } from "../../library/atoms/badge.jsx";
import InpartLogo from "../../library/organisms/side-menu/Inpart.svg";
import InpartLogoCollapsed from "../../library/organisms/side-menu/Inpart1.svg";
import Accordion from "../../library/molecules/accordion.jsx";
import { TextInput } from "../../library/molecules/text-input.jsx";
import { Link } from "../../library/atoms/link.jsx";
import { Textarea, TextareaField } from "../../library/molecules/textarea.jsx";

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

const FINDINGS = [
  {
    id: "field-scope",
    title: "Early termination exposure",
    severity: "High",
    severityVariant: "warning",
    reason:
      "The review found no express obligation for transition support and recovery of non-cancellable costs after early termination.",
    sourceTitle: "Post-mortem, Alliance X",
    sourceSummary:
      "Section 15 language caused unrecovered commitments and a delayed CMO transfer due to missing transition and recovery obligations.",
    suggestion: "Either Party may terminate with 180 days notice where convenience is documented and transition support obligations are explicitly preserved in Schedule 2.",
    recommendations: [
      "Add explicit non-cancellable cost recovery mechanics.",
      "Define transition support scope and timeline.",
      "Require documented rationale for convenience termination.",
    ],
  },
  {
    id: "royalty-term",
    title: "Royalty term ambiguity",
    severity: "Moderate",
    severityVariant: "neutral",
    reason:
      "Royalty end-date wording is ambiguous across patent expiry and exclusivity tails.",
    sourceTitle: "Reference agreement, Meridian 2022",
    sourceSummary:
      "A similar ambiguity produced a dispute over whether SPC extension extended the royalty period.",
    suggestion: "Define the royalty term by country with explicit treatment of patent term extensions and regulatory exclusivity.",
    recommendations: [
      "Define patent-expiry trigger by jurisdiction.",
      "Clarify treatment of supplementary protection periods.",
      "Add drafting examples to reduce interpretation disputes.",
    ],
  },
  {
    id: "governance-deadlock",
    title: "JSC deadlock escalation missing",
    severity: "High",
    severityVariant: "warning",
    reason:
      "The JSC process has no binding fallback when parties cannot resolve strategic decisions.",
    sourceTitle: "Playbook guidance",
    sourceSummary:
      "Governance deadlocks should escalate to executive sponsors within a fixed timeline.",
    suggestion: "Add a 10-business-day escalation path from JSC to executive committee with topic-specific final authority.",
    recommendations: [
      "Set a fixed escalation timeline after deadlock.",
      "Assign final decision rights per topic area.",
      "Capture interim operating rules during dispute windows.",
    ],
  },
  {
    id: "termination-notice",
    title: "Termination notice period inconsistent",
    severity: "Moderate",
    severityVariant: "neutral",
    reason:
      "Notice periods differ between convenience and breach sections without priority rules.",
    sourceTitle: "Internal policy",
    sourceSummary:
      "Termination timelines should be harmonized unless an explicit exception is stated.",
    suggestion: "Align notice and cure windows, then add clause precedence language for conflicting timelines.",
    recommendations: [
      "Harmonize notice periods across clauses.",
      "Specify cure windows for material and non-material breach.",
      "State effective date mechanics for notice delivery.",
    ],
  },
  {
    id: "ip-ownership",
    title: "Foreground IP ownership is incomplete",
    severity: "High",
    severityVariant: "warning",
    reason:
      "Foreground IP clauses do not fully allocate ownership and prosecution authority for joint inventions.",
    sourceTitle: "Alliance dispute summary",
    sourceSummary:
      "Unclear assignment wording previously delayed patent filing responsibilities across affiliates.",
    suggestion: "Separate sole/joint invention ownership, assignment obligations, and prosecution controls by invention type.",
    recommendations: [
      "Define sole vs joint ownership rules for inventions.",
      "Add assignment mechanics for affiliate contributors.",
      "Include prosecution and enforcement decision rights.",
    ],
  },
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
  findingsStack: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-2)",
  },
  activeAccordion: {
    outline: "2px solid var(--color-content-brand)",
    outlineOffset: "-2px",
  },
  reviewSection: {
    marginBottom: "var(--spacing-4)",
  },
  reviewLabel: {
    fontSize: "var(--text-body-md)",
    color: "var(--color-content-secondary)",
   
  },
  sourcesection: {
    padding: "var(--spacing-md)",
    background: "var(--color-general-neutral-lighter)",
    borderRadius: "var(--border-radius-md)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "var(--spacing-sm)",
   
    gap: "var(--spacing-sm)",
  
  },

  sourceexcerption: {
    paddingLeft: "var(--spacing-md)",
    borderLeft: "2px solid var(--color-outline-neutral)",
    color: "var(--color-content-secondary)",
    fontSize: "var(--font-size-sm)",
    gap: "var(--spacing-md)",
     flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',
    display: 'flex',
     
  },

 

  
  
};

export const AiObligationExtractionPage = () => {
  const [isDetailView, setIsDetailView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);

  const selectedFinding = useMemo(
    () => FINDINGS[currentIndex - 1] ?? FINDINGS[0],
    [currentIndex]
  );

  const handleSelectFinding = (index) => {
    setCurrentIndex(index + 1);
    setIsDetailView(true);
  };

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
                  <Button variant="secondary" iconLeading={<Icon name="Export" size="sm" />} size="sm">Export</Button>
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
              title={isDetailView ? "Review extraction" : "Contract review"}
              headerButtons={
                isDetailView
                  ? [
                      {
                        ariaLabel: "Info",
                        variant: "secondary",
                        size: "md",
                        iconLeading: <Icon name="InformationCircle" size="sm" />,
                      },
                    ]
                  : []
              }
              infoMessage="Inaccuracies may occur with AI. Please review carefully."
              showNavigation={isDetailView}
              navigationTitle={isDetailView ? selectedFinding.title : undefined}
              currentIndex={isDetailView ? currentIndex : undefined}
              totalItems={isDetailView ? FINDINGS.length : undefined}
              onBack={isDetailView ? () => setIsDetailView(false) : undefined}
              onPrevious={
                isDetailView
                  ? () => setCurrentIndex((prev) => Math.max(1, prev - 1))
                  : undefined
              }
              onNext={
                isDetailView
                  ? () => setCurrentIndex((prev) => Math.min(FINDINGS.length, prev + 1))
                  : undefined
              }
              hasPrevious={isDetailView ? currentIndex > 1 : undefined}
              hasNext={isDetailView ? currentIndex < FINDINGS.length : undefined}
              footerButtons={
                isDetailView
                  ? [
                      {
                        label: "Dismiss",
                        position: "left",
                        variant: "secondary",
                        color: "secondary-destructive",
                      },
                      { label: "Apply", position: "right", variant: "primary" },
                    ]
                  : []
              }
            >
              {!isDetailView ? (
                <div style={styles.findingsStack}>
                  {FINDINGS.map((finding, index) => (
                    <Accordion
                      key={finding.id}
                      title={finding.title}
                      size="sm"
                      variant="horizontal"
                      showRightChips
                      rightChip={<Chip variant={finding.severityVariant}>{finding.severity}</Chip>}
                      onHeaderClick={() => handleSelectFinding(index)}
                      style={currentIndex === index + 1 ? styles.activeAccordion : undefined}
                    />
                  ))}
                </div>
              ) : (
                <>
         
            

               <div style={styles.reviewSection}>
                <p style={styles.reviewLabel}>Reason</p>
                <p>value reason</p>
              </div>
              <div style={styles.reviewSection}>
                <p style={styles.reviewLabel}>Sources</p>
               
               
                <div style={styles.sourcesection}>
                  <Link
                      href="#"
                      iconLeading={<Icon name="DocumentText" variant="outline" size="sm" />}
                      iconTrailing={<Icon name="ArrowTopRightOnSquare" variant="outline" size="sm" />}
                    >
                      Alliance mortems name
                    </Link>
                   <p>Summary of the source</p>
                  <p style={styles.sourceexcerption} >Additional details or notes about the source</p>
                </div>
              </div>
                <Textarea label="Default" placeholder="Enter your message..." />
            <Button variant="secondary">Add comment</Button>
       

        
                  
                  
                 

                 

                  
                </>
              )}
            </CreationFormPanel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiObligationExtractionPage;
