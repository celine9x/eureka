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
import { Tooltip } from "../../library/atoms/tooltip.jsx";
import { Textarea, TextareaField } from "../../library/molecules/textarea.jsx";
import { SidePanel } from "../../library/templates/side-panel.jsx";
import { Tabs, Tab } from "@/library/molecules/tabs";
import { EmptyState } from "../../library/molecules/empty-state.jsx";
import { Modal } from "../../library/organisms/modal.jsx";
import { RadioCardGroup, RadioCard } from "../../library/molecules/radio-card.jsx";
import fileDocIcon from "../../library/atoms/custom-icons/file-doc.svg";
import redlinedContractFile from "./Collaboration-License-Agreement-REDLINE.docx?url";

const EXPORT_FORMATS = {
  redlined: "redlined",
  clean: "clean",
};

const SAMPLE_DOCUMENT_TEXT = `COLLABORATION AND LICENSE AGREEMENT

This Collaboration and License Agreement (this "Agreement") is entered into as of the Effective Date by and between Veltarix Therapeutics, Inc., a Delaware corporation with offices at 1200 Research Parkway, Boston, Massachusetts 02110 ("Veltarix"), and Meridian Biosciences Ltd., a company organized under the laws of England and Wales with offices at 14 Cambridge Science Park, Cambridge CB4 0FY, United Kingdom ("Meridian"). Veltarix and Meridian are each referred to as a "Party" and together as the "Parties."

RECITALS

WHEREAS, Veltarix owns or controls certain intellectual property relating to the Compound and has expertise in the discovery and preclinical development of therapeutic products;

WHEREAS, Meridian has expertise in clinical development, regulatory affairs, manufacturing, and commercialization of therapeutic products in the Territory;

WHEREAS, the Parties wish to collaborate on the development and commercialization of products containing the Compound and to establish the rights and obligations governing that collaboration;

NOW, THEREFORE, in consideration of the mutual covenants and promises contained herein, the Parties agree as follows.

1. DEFINITIONS

1.1 "Affiliate" means, with respect to a Party, any entity that controls, is controlled by, or is under common control with that Party. For purposes of this definition, "control" means the direct or indirect ownership of more than fifty percent (50%) of the voting interests of an entity or the power to direct its management and policies.

1.2 "Applicable Law" means all laws, regulations, regulatory guidance, and governmental requirements applicable to a Party, the Compound, a Product, or activities under this Agreement.

1.3 "Business Day" means a day other than a Saturday, Sunday, or public holiday in Boston, Massachusetts or London, England.

1.7 "Compound" means the proprietary molecule designated VTX-338 and any salt, ester or polymorph thereof.

1.9 "Field" means all human therapeutic, prophylactic and diagnostic uses.

1.14 "Licensed IP" means all patents, know-how, regulatory materials, and other intellectual property controlled by Veltarix that are reasonably necessary to develop, manufacture, use, sell, offer for sale, or import a Product in the Field.

1.20 "Royalty Term" means, on a product-by-product and country-by-country basis, the period beginning on First Commercial Sale and ending on the later of patent expiry or ten (10) years thereafter, without specifying the treatment of patent term extensions or regulatory exclusivity.

\f

2. LICENSE GRANT AND DEVELOPMENT

2.1 Subject to the terms and conditions of this Agreement, Veltarix hereby grants to Meridian an exclusive, royalty-bearing license in the Field and Territory under Licensed IP.

2.2 Meridian shall use Commercially Reasonable Efforts to develop and seek Regulatory Approval for at least one Product in the United States, the United Kingdom, Germany, France, Italy, and Spain. The development plan attached as Schedule 1 may be amended by the JSC from time to time.

2.3 Veltarix shall provide Meridian with the existing preclinical data package, manufacturing process description, and regulatory correspondence in its possession within thirty (30) days after the Effective Date. Each Party shall maintain complete and accurate records of activities conducted under the development plan.

2.4 Meridian shall be responsible for clinical development costs incurred after the Effective Date, except that Veltarix shall bear costs specifically allocated to it in the approved annual budget. Neither Party may incur an unbudgeted commitment exceeding one hundred thousand dollars ($100,000) without prior written approval from the other Party.

2.5 The Parties shall meet at least quarterly to review development progress, material safety findings, manufacturing readiness, and anticipated regulatory interactions. Either Party may request an extraordinary meeting where a matter is reasonably expected to materially affect the development timeline or budget.

2.6 Meridian shall provide Veltarix with written development reports within twenty (20) Business Days after the end of each calendar quarter. Each report shall include study status, budget variance, key risks, and a forecast of activities for the following two quarters.

\f

3. GOVERNANCE

3.1 A Joint Steering Committee (JSC) will oversee development and commercialization activities. Decisions require unanimous approval, and this Agreement does not specify an escalation process for unresolved decisions.

3.2 The JSC shall consist of three (3) representatives appointed by each Party. Each representative must have sufficient seniority and decision-making authority to address matters within the JSC's remit. Either Party may replace its representatives by written notice to the other Party.

3.3 The JSC shall review the development plan, annual budget, clinical strategy, material supply plan, and launch readiness plan. The JSC may establish working groups for clinical operations, chemistry manufacturing and controls, regulatory affairs, and commercial planning.

3.4 Meeting minutes shall be prepared by the chairperson and circulated to the JSC within ten (10) Business Days after each meeting. Minutes shall identify each decision, responsible owner, required deliverable, and target completion date.

3.5 Neither Party may use the JSC to amend this Agreement, alter the scope of the license, waive a material breach, or commit the other Party to expenditures not approved under the annual budget.

\f

4. TERM AND TERMINATION

4.1 This Agreement commences on the Effective Date and remains in effect unless earlier terminated. Neither Party is required to provide transition support or reimburse non-cancellable costs following termination.

4.2 Either Party may terminate this Agreement for convenience upon sixty (60) days' written notice. The notice and cure periods in this Section do not state whether they override other termination timelines.

4.3 Either Party may terminate this Agreement for a material breach by the other Party if the breach is not cured within thirty (30) days after written notice describing the breach in reasonable detail; provided that a breach incapable of cure may be terminated immediately upon written notice.

4.4 Upon expiration or termination, Meridian shall cease use of the Licensed IP except as necessary to wind down ongoing clinical studies in accordance with Applicable Law. The Parties shall cooperate in good faith regarding safety reporting, regulatory notifications, and disposition of remaining Product inventory.

4.5 Termination shall not affect any obligation that by its nature is intended to survive, including confidentiality, accrued payment obligations, limitations of liability, audit rights, and rights necessary to complete regulatory reporting for enrolled subjects.

\f

5. INTELLECTUAL PROPERTY

5.1 Foreground IP arising from the Collaboration will be owned jointly by the Parties. This Agreement does not allocate ownership for sole inventions, assignment obligations for affiliates, or prosecution authority.

5.2 Each Party shall promptly disclose to the other Party any invention conceived or reduced to practice in the performance of activities under the development plan. The Parties shall meet through the JSC to review invention disclosures and determine whether patent protection should be pursued.

5.3 Veltarix shall retain all right, title, and interest in and to its Background IP. Meridian shall retain all right, title, and interest in and to its Background IP. Except for the licenses expressly granted in this Agreement, neither Party grants any right or license to the other Party by implication, estoppel, or otherwise.

5.4 Each Party shall ensure that its employees, contractors, and consultants involved in the Collaboration are bound by written obligations sufficient to permit that Party to grant the rights contemplated by this Agreement.

6. CONFIDENTIALITY AND PUBLICATIONS

6.1 Each Party shall protect the other Party's Confidential Information using at least the same degree of care that it uses to protect its own confidential information of similar importance, and in no event less than reasonable care.

6.2 Neither Party shall issue a press release or make any public announcement concerning this Agreement without the other Party's prior written consent, except as required by Applicable Law or the rules of a securities exchange.

6.3 The Parties acknowledge that timely coordination on publications and external communications is necessary to preserve patent rights and protect the confidentiality of development data.`;

const FINDINGS = [
  {
    id: "field-scope",
    title: "4.1 Termination: missing transition support and cost recovery",
    severity: "High",
    reason:
      "The review found no express obligation for transition support and recovery of non-cancellable costs after early termination.",
    originalClause: "4.1 This Agreement commences on the Effective Date and remains in effect unless earlier terminated. Neither Party is required to provide transition support or reimburse non-cancellable costs following termination.",
    sources: [
      {
        label: "Post-mortem, Alliance X",
        summary:
          "Section 15 language caused unrecovered commitments and a delayed CMO transfer due to missing transition and recovery obligations.",
        excerpt:
          "Transition and recovery obligations should survive convenience termination until all committed work has been completed or recovered.",
        documentContent:
          "The Alliance X termination review found that transition obligations ended on the termination date while committed CMO costs continued to accrue. Transition and recovery obligations should survive convenience termination until all committed work has been completed or recovered. Future agreements should preserve transition support and include a defined recovery mechanism for non-cancellable commitments.",
      },
      {
        label: "Termination playbook",
        summary: "The playbook requires a documented transition plan before a termination notice is issued.",
        excerpt: "Document cost ownership, CMO transfer steps, and the final delivery timeline in the termination schedule.",
        documentContent:
          "Before issuing a termination notice, the termination playbook requires a documented transition plan. Document cost ownership, CMO transfer steps, and the final delivery timeline in the termination schedule. This ensures remaining deliverables and the final close-out timeline are addressed.",
      },
    ],
    suggestion: "Either Party may terminate with 180 days notice where convenience is documented and transition support obligations are explicitly preserved in Schedule 2.",
    comment: "Confirm that the transition schedule covers non-cancellable CMO commitments and specifies the recovery process.",
    recommendations: [
      "Add explicit non-cancellable cost recovery mechanics.",
      "Define transition support scope and timeline.",
      "Require documented rationale for convenience termination.",
    ],
  },
  {
    id: "governance-deadlock",
    title: "3.1 Governance: no JSC deadlock escalation",
    severity: "High",
    reason:
      "The JSC process has no binding fallback when parties cannot resolve strategic decisions.",
    originalClause: "3.1 A Joint Steering Committee (JSC) will oversee development and commercialization activities. Decisions require unanimous approval, and this Agreement does not specify an escalation process for unresolved decisions.",
    sources: [
      {
        label: "Playbook guidance",
        summary: "Governance deadlocks should escalate to executive sponsors within a fixed timeline.",
        excerpt: "Escalate unresolved Joint Steering Committee decisions to executive sponsors within 10 business days.",
        documentContent:
          "Playbook guidance requires unresolved governance decisions to follow a defined escalation path. Escalate unresolved Joint Steering Committee decisions to executive sponsors within 10 business days. The agreement should also assign final authority for each decision category.",
      },
    ],
    suggestion: "Add a 10-business-day escalation path from JSC to executive committee with topic-specific final authority.",
    comment: "Confirm executive sponsor roles and final decision rights before the governance clause is finalized.",
    recommendations: [
      "Set a fixed escalation timeline after deadlock.",
      "Assign final decision rights per topic area.",
      "Capture interim operating rules during dispute windows.",
    ],
  },
  {
    id: "termination-notice",
    title: "4.2 Termination: inconsistent notice periods",
    severity: "Moderate",
    reason:
      "Notice periods differ between convenience and breach sections without priority rules.",
    originalClause: "4.2 Either Party may terminate this Agreement for convenience upon sixty (60) days' written notice. The notice and cure periods in this Section do not state whether they override other termination timelines.",
    sources: [
      {
        label: "Internal policy",
        summary: "Termination timelines should be harmonized unless an explicit exception is stated.",
        excerpt: "Use a single notice framework and identify any approved exceptions directly in the applicable termination clause.",
        documentContent:
          "Internal policy requires consistent notice and cure periods across termination provisions. Use a single notice framework and identify any approved exceptions directly in the applicable termination clause. Where timelines differ, the agreement must state which provision controls.",
      },
    ],
    suggestion: "Align notice and cure windows, then add clause precedence language for conflicting timelines.",
    comment: "Check that the revised notice periods align with the dispute-resolution and cure provisions.",
    recommendations: [
      "Harmonize notice periods across clauses.",
      "Specify cure windows for material and non-material breach.",
      "State effective date mechanics for notice delivery.",
    ],
  },
  {
    id: "ip-ownership",
    title: "5.1 Foreground IP: incomplete ownership allocation",
    severity: "Low",
    reason:
      "Foreground IP clauses do not fully allocate ownership and prosecution authority for joint inventions.",
    originalClause: "5.1 Foreground IP arising from the Collaboration will be owned jointly by the Parties. This Agreement does not allocate ownership for sole inventions, assignment obligations for affiliates, or prosecution authority.",
    sources: [
      {
        label: "Alliance dispute summary",
        summary: "Unclear assignment wording previously delayed patent filing responsibilities across affiliates.",
        excerpt: "Ownership and prosecution responsibilities must include affiliates that contribute to a joint invention.",
        documentContent:
          "The dispute summary identified delayed patent filings because the agreement did not clearly assign responsibilities. Ownership and prosecution responsibilities must include affiliates that contribute to a joint invention. Future clauses should distinguish sole and joint inventions and identify responsible parties.",
      },
    ],
    suggestion: "Separate sole/joint invention ownership, assignment obligations, and prosecution controls by invention type.",
    comment: "Confirm that affiliate inventors are covered by the assignment and prosecution provisions.",
    recommendations: [
      "Define sole vs joint ownership rules for inventions.",
      "Add assignment mechanics for affiliate contributors.",
      "Include prosecution and enforcement decision rights.",
    ],
  },
];

const SEVERITY_ORDER = { High: 0, Moderate: 1, Low: 2 };
const SEVERITY_CHIP_VARIANTS = { High: "negative", Moderate: "warning", Low: "blue" };
// Drives the document highlight color from the same severity that labels
// the finding's accordion badge, so the two can never drift out of sync.
const SEVERITY_HIGHLIGHT_LEVEL = { High: "high", Moderate: "medium", Low: "low" };
const ORDERED_FINDINGS = [...FINDINGS].sort(
  (first, second) => SEVERITY_ORDER[first.severity] - SEVERITY_ORDER[second.severity]
);

// Clause numbers (e.g. "4.1 ") are a fixed identifier, not part of the
// substantive text — applying a suggestion should never redline them away.
const CLAUSE_NUMBER_PATTERN = /^\d+(?:\.\d+)*\s+/;
const splitClauseNumber = (clauseText = "") => {
  const match = clauseText.match(CLAUSE_NUMBER_PATTERN);
  return match ? { number: match[0], body: clauseText.slice(match[0].length) } : { number: "", body: clauseText };
};

const renderHighlightedDocument = (documentContent, excerpt) => {
  if (!excerpt) return documentContent;
  const startIndex = documentContent.indexOf(excerpt);
  if (startIndex === -1) return documentContent;
  const endIndex = startIndex + excerpt.length;
  return (
    <>
      {documentContent.slice(0, startIndex)}
      <mark style={styles.sourceDocumentHighlight}>{documentContent.slice(startIndex, endIndex)}</mark>
      {documentContent.slice(endIndex)}
    </>
  );
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
  accordionTitle: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
    minWidth: 0,
  },
  accordionTitleLabel: {
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  reviewSections: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-md)",
  },
  findingActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "var(--spacing-2)",
  },
  appliedBadge: {
    height: "var(--size-button-md)",
    padding: "0 var(--spacing-sm)",
    borderRadius: "var(--radius-sm)",
    justifyContent: "center",
  },
  reviewSection: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
  },
  reviewLabel: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    color: "var(--color-content-secondary)",
  },
  reason: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    lineHeight: "var(--line-height-body-lg)",
    color: "var(--color-content-primary)",
  },
  sources: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
  },
  sourceSection: {
    padding: "var(--spacing-md)",
    background: "var(--color-general-neutral-lighter)",
    borderRadius: "var(--radius-sm)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "var(--spacing-xs)",
  },
  sourceLinkLabel: {
    minWidth: 0,
    flex: "1 1 auto",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  sourceSummary: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-sm)",
    lineHeight: "var(--line-height-body-lg)",
    color: "var(--color-content-primary)",
  },
  sourceExcerpt: {
    margin: 0,
    paddingLeft: "var(--spacing-sm)",
    borderLeft: "1px solid var(--color-outline-neutral)",
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
  },
  sourceDocument: {
    margin: 0,
    padding: "var(--spacing-6)",
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--color-action-outline-secondary-enabled)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    lineHeight: "var(--line-height-body-lg)",
    color: "var(--color-content-primary)",
    whiteSpace: "pre-wrap",
  },
  sourceDocumentHighlight: {
    background: "color-mix(in srgb, var(--color-content-search-highlight) 20%, transparent)",
    borderRadius: "var(--radius-xs)",
  },
  exportModalSubtitle: {
    margin: 0,
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
  },
};

const REVIEW_TABS = {
  needsReview: "needs-review",
  resolved: "resolved",
};

export const AiObligationExtractionPage = () => {
  const [activeTab, setActiveTab] = useState(REVIEW_TABS.needsReview);
  const [resolvedFindingIds, setResolvedFindingIds] = useState({});
  const [expandedFindingId, setExpandedFindingId] = useState(null);
  const [suggestionDrafts, setSuggestionDrafts] = useState({});
  const [commentDrafts, setCommentDrafts] = useState({});
  const [selectedSource, setSelectedSource] = useState(null);
  const [documentText, setDocumentText] = useState(SAMPLE_DOCUMENT_TEXT);
  const [documentComments, setDocumentComments] = useState([]);
  const [appliedRedlines, setAppliedRedlines] = useState([]);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState(EXPORT_FORMATS.redlined);

  const selectedFinding = useMemo(
    () => ORDERED_FINDINGS.find((finding) => finding.id === expandedFindingId) ?? ORDERED_FINDINGS[0],
    [expandedFindingId]
  );

  const needsReviewFindings = useMemo(
    () => ORDERED_FINDINGS.filter((finding) => !resolvedFindingIds[finding.id]),
    [resolvedFindingIds]
  );
  const resolvedFindings = useMemo(
    () => ORDERED_FINDINGS.filter((finding) => resolvedFindingIds[finding.id]),
    [resolvedFindingIds]
  );
  const visibleFindings = activeTab === REVIEW_TABS.resolved ? resolvedFindings : needsReviewFindings;

  const handleSelectFinding = (finding) => {
    setExpandedFindingId(finding.id);
  };

  const collapseIfExpanded = (findingId) =>
    setExpandedFindingId((current) => (current === findingId ? null : current));

  const addDocumentComment = (content, targetText = selectedFinding.suggestion, id = crypto.randomUUID()) => {
    const value = content.trim();
    if (!value) return null;
    setDocumentComments((comments) => [
      ...comments,
      {
        id,
        author: "Linh Nguyen",
        initials: "LN",
        timestamp: "Now",
        content: value,
        targetText,
      },
    ]);
    return id;
  };

  const handleApplyFinding = (finding) => {
    const suggestion = suggestionDrafts[finding.id] ?? finding.suggestion;
    const commentId = addDocumentComment(commentDrafts[finding.id] ?? "", suggestion);

    // Keep the clause number (e.g. "4.1 ") fixed: apply the suggestion to
    // the clause body only, so the number is never part of the redline swap
    // and the final document text still starts with it.
    const { number, body: originalBody } = splitClauseNumber(finding.originalClause);
    const suggestionBody = number && suggestion.startsWith(number) ? suggestion.slice(number.length) : suggestion;
    const fullSuggestion = `${number}${suggestionBody}`;

    setDocumentText((currentText) => currentText.replace(finding.originalClause, fullSuggestion));
    setAppliedRedlines((changes) => {
      const nextChange = { originalText: originalBody, proposedText: suggestionBody, commentId };
      const existingIndex = changes.findIndex((change) => change.originalText === nextChange.originalText);
      if (existingIndex < 0) return [...changes, nextChange];
      return changes.map((change, index) => (index === existingIndex ? nextChange : change));
    });
    setCommentDrafts((drafts) => ({ ...drafts, [finding.id]: "" }));
  };

  const handleResolveFinding = (finding) => {
    setResolvedFindingIds((current) => ({ ...current, [finding.id]: true }));
    collapseIfExpanded(finding.id);
  };

  const activeAppliedRedline = appliedRedlines.find(
    (change) => change.originalText === splitClauseNumber(selectedFinding.originalClause).body
  );

  const isFindingApplied = (finding) =>
    appliedRedlines.some(
      (change) => change.originalText === splitClauseNumber(finding.originalClause).body
    );

  const handleExportContract = () => {
    const isRedlined = exportFormat === EXPORT_FORMATS.redlined;
    const link = document.createElement("a");

    if (isRedlined) {
      link.href = redlinedContractFile;
      link.download = "Collaboration-License-Agreement-REDLINE.docx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      setIsExportModalOpen(false);
      return;
    }

    const blob = new Blob([documentText], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "contract-clean.docx";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setIsExportModalOpen(false);
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
        menuVariant="deal"
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
                  <Button
                    variant="secondary"
                    iconLeading={<Icon name="ArrowUpTray" size="sm" />}
                    size="sm"
                    onClick={() => setIsExportModalOpen(true)}
                  >
                    Export
                  </Button>
                </HubHeaderActions>
              </HubHeaderRight>
            </HubHeaderRow>
          </HubHeader>
        </div>

        <div style={styles.bottomWrap}>
          <div style={styles.viewerPane}>
            <DocumentViewer
              text={documentText}
              originalText={SAMPLE_DOCUMENT_TEXT}
              appliedRedlines={appliedRedlines}
              highlights={ORDERED_FINDINGS.map((finding) => ({ text: finding.originalClause, level: SEVERITY_HIGHLIGHT_LEVEL[finding.severity] }))}
              highlightText={expandedFindingId ? activeAppliedRedline?.proposedText ?? selectedFinding.originalClause : undefined}
              highlightLevel={SEVERITY_HIGHLIGHT_LEVEL[selectedFinding.severity]}
              commentThread={documentComments}
              onCommentSubmit={addDocumentComment}
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
              headerBadge={<Badge color="neutral" size="md">{ORDERED_FINDINGS.length}</Badge>}
              infoMessage="Inaccuracies may occur with AI. Please review carefully."
              showNavigation
              navigationSubContent={
                <Tabs  selectedKey={activeTab} onSelectionChange={setActiveTab}>
                  <Tab id={REVIEW_TABS.needsReview} badge={needsReviewFindings.length}>Needs review</Tab>
                  <Tab id={REVIEW_TABS.resolved} badge={resolvedFindings.length}>Resolved</Tab>
                </Tabs>
              }
            >
              <div style={styles.findingsStack}>
                {visibleFindings.length === 0 && (
                  activeTab === REVIEW_TABS.resolved ? (
                    <EmptyState
                      size="sm"
                      illustrationVariant="noIssues"
                      title="No resolved findings yet"
                      description="Findings you resolve tab will show up here."
                      showActionButton={false}
                    />
                  ) : (
                    <p style={styles.reviewLabel}>No findings need review.</p>
                  )
                )}
                {visibleFindings.map((finding) => (
                  <Accordion
                    key={finding.id}
                    title={
                      <span style={styles.accordionTitle}>
                        <Chip variant={SEVERITY_CHIP_VARIANTS[finding.severity]} size="md">{finding.severity}</Chip>
                        <span style={styles.accordionTitleLabel}>{finding.title}</span>
                      </span>
                    }
                    size="sm"
                    variant="vertical"
                    action={
                      activeTab !== REVIEW_TABS.resolved && (
                        <Button iconLeading={<Icon name="Check" size="sm" />} variant="secondary" size="xs" onClick={() => handleResolveFinding(finding)}>
                          Resolve
                        </Button>
                      )
                    }
                    expanded={expandedFindingId === finding.id}
                    onHeaderClick={() => handleSelectFinding(finding)}
                    onToggle={(expanded) => setExpandedFindingId(expanded ? finding.id : null)}
                  >
                    <div style={styles.reviewSections}>
                      <div style={styles.reviewSection}>
                        <p style={styles.reviewLabel}>Reason</p>
                        <p style={styles.reason}>{finding.reason}</p>
                      </div>
                      <div style={styles.reviewSection}>
                        <p style={styles.reviewLabel}>Sources</p>
                        <div style={styles.sources}>
                          {finding.sources.map((source) => (
                            <div key={source.label} style={styles.sourceSection}>
                              <Tooltip content={source.label} placement="bottom-left" style={{ width: "100%", minWidth: 0, justifyContent: "flex-start" }}>
                                <Link
                                  size="md"
                                  href="#"
                                  style={{ width: "100%", minWidth: 0, justifyContent: "flex-start" }}
                                  iconLeading={<Icon name="DocumentText" variant="outline" size="sm" />}
                                  onClick={(event) => {
                                    event.preventDefault();
                                    setSelectedSource(source);
                                  }}
                                >
                                  <span style={styles.sourceLinkLabel}>{source.label}</span>
                                </Link>
                              </Tooltip>
                              <p style={styles.sourceSummary}>{source.summary}</p>
                              <p style={styles.sourceExcerpt}>{source.excerpt}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Textarea
                        label="Suggestion"
                        variant="ai"
                        aiValue={finding.suggestion}
                        originalValue={splitClauseNumber(finding.originalClause).body}
                        showRedlinePreview
                        value={suggestionDrafts[finding.id] ?? finding.suggestion}
                        onChange={(event) => setSuggestionDrafts((drafts) => ({ ...drafts, [finding.id]: event.target.value }))}
                        onRevert={(value) => setSuggestionDrafts((drafts) => ({ ...drafts, [finding.id]: value }))}
                      />
                      <Textarea
                        label="Comment"
                        placeholder="Leave your comment"
                        value={commentDrafts[finding.id] ?? ""}
                        onChange={(event) => setCommentDrafts((drafts) => ({ ...drafts, [finding.id]: event.target.value }))}
                      />
                      <div style={styles.findingActions}>
                        {isFindingApplied(finding) ? (
                          <Badge.WithIcon
                            color="positive"
                            size="md"
                            iconLeading={<Icon name="Check" size="sm" />}
                            style={styles.appliedBadge}
                          >
                            Applied
                          </Badge.WithIcon>
                        ) : (
                          <Button
                            variant="primary"
                            iconLeading={<Icon name="ArrowTurnUpLeft" size="sm" />}
                            onClick={() => handleApplyFinding(finding)}
                          >
                            Apply
                          </Button>
                        )}
                      </div>
                    </div>
                  </Accordion>
                ))}
              </div>
            </CreationFormPanel>
          </div>
        </div>
      </div>

      <SidePanel
        isOpen={selectedSource !== null}
        onClose={() => setSelectedSource(null)}
        onOpen={() => {}}
        title={selectedSource?.label}
        titleIconName="DocumentText"
      >
        {selectedSource && (
          <p style={styles.sourceDocument}>
            {renderHighlightedDocument(selectedSource.documentContent, selectedSource.excerpt)}
          </p>
        )}
      </SidePanel>

      <Modal
        open={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        title="Export contract"
        style={{ maxWidth: 600 }}
        tertiaryLabel="Cancel"
        primaryLabel="Export"
        onTertiaryClick={() => setIsExportModalOpen(false)}
        onPrimaryClick={handleExportContract}
      >
        <p style={styles.exportModalSubtitle}>Choose how you want to export the reviewed contract.</p>
        <RadioCardGroup value={exportFormat} onChange={setExportFormat}>
          <RadioCard
            value={EXPORT_FORMATS.redlined}
            label="Redlined version (recommended)"
            info="Includes all proposed changes as tracked changes."
            icon={<img src={fileDocIcon} alt="" width={20} height={20} />}
          />
          <RadioCard
            value={EXPORT_FORMATS.clean}
            label="Clean version"
            info="Final text with all changes accepted."
            icon={<img src={fileDocIcon} alt="" width={20} height={20} />}
          />
        </RadioCardGroup>
      </Modal>
    </div>
  );
};

export default AiObligationExtractionPage;
