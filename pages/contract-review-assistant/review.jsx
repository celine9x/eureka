import React, { useLayoutEffect, useMemo, useState } from "react";
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
import { ColorStatus } from "../../library/atoms/color-status.jsx";
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
import {
  SAMPLE_DOCUMENT_TEXT,
  CONTRACT_TABLE_DEVELOPMENT_MARKER,
  CONTRACT_TABLE_DEVELOPMENT_HEADERS,
  CONTRACT_TABLE_DEVELOPMENT_ROWS,
  CONTRACT_TABLE_REGULATORY_MARKER,
  CONTRACT_TABLE_REGULATORY_HEADERS,
  CONTRACT_TABLE_REGULATORY_ROWS,
  CONTRACT_TABLE_SALES_MARKER,
  CONTRACT_TABLE_SALES_HEADERS,
  CONTRACT_TABLE_SALES_ROWS,
  CONTRACT_TABLE_PATENTS_MARKER,
  CONTRACT_TABLE_PATENTS_HEADERS,
  CONTRACT_TABLE_PATENTS_ROWS,
  CONTRACT_TABLE_INDSUBMISSIONS_MARKER,
  CONTRACT_TABLE_INDSUBMISSIONS_HEADERS,
  CONTRACT_TABLE_INDSUBMISSIONS_ROWS,
  CONTRACT_TITLE_TEXT,
  CONTRACT_DISCLAIMER_TEXT,
  CONTRACT_HEADING1_TEXTS,
  CONTRACT_HEADING2_TEXTS,
} from "./contract-content.js";

// Typographic treatment for the document's own title/heading/disclaimer
// paragraphs (see DocumentViewer's paragraphStyles prop) — title bold and
// large, section headings in the brand blue Heading1/Heading2 sizes, and
// the small-print disclaimer italic, matching the source docx's styling.
const DOCUMENT_PARAGRAPH_STYLES = [
  { text: CONTRACT_TITLE_TEXT, className: "document-viewer__paragraph--title" },
  { text: CONTRACT_DISCLAIMER_TEXT, className: "document-viewer__paragraph--italic" },
  ...CONTRACT_HEADING1_TEXTS.map((text) => ({ text, className: "document-viewer__paragraph--heading1" })),
  ...CONTRACT_HEADING2_TEXTS.map((text) => ({ text, className: "document-viewer__paragraph--heading2" })),
];

const EXPORT_FORMATS = {
  redlined: "redlined",
  clean: "clean",
};

// Matches router-app.jsx's route for the guidance/upload page — pushState
// alone doesn't trigger a re-render, so the popstate event is dispatched
// manually too, same as guidance.jsx's own navigateToPath.
const CONTRACT_REVIEW_ASSISTANT_GUIDANCE_PATH = "/contract-review-assistant/guidance";
const navigateToPath = (nextPath) => {
  window.history.pushState({}, "", nextPath);
  window.dispatchEvent(new PopStateEvent("popstate"));
};

// Each row needs a stable id for React keys and (for the regulatory
// milestones table) for findings to target a specific row. Tables with no
// attached findings just use their position.
const buildStaticRows = (rows) => rows.map((cells, index) => ({ id: `row-${index}`, cells }));

const DEVELOPMENT_TABLE_ROWS = buildStaticRows(CONTRACT_TABLE_DEVELOPMENT_ROWS);
const SALES_TABLE_ROWS = buildStaticRows(CONTRACT_TABLE_SALES_ROWS);
const PATENTS_TABLE_ROWS = buildStaticRows(CONTRACT_TABLE_PATENTS_ROWS);
const IND_SUBMISSIONS_TABLE_ROWS = buildStaticRows(CONTRACT_TABLE_INDSUBMISSIONS_ROWS);

const REGULATORY_ROW_IDS = [
  "bla-filing",
  "fda-hemoglobinopathy",
  "fda-ultra-orphan",
  "fda-other-indication",
  "ema-hemoglobinopathy",
  "ema-ultra-orphan",
  "ema-other-indication",
  "japan-hemoglobinopathy",
  "japan-ultra-orphan",
  "japan-other-indication",
  "pricing-france",
  "pricing-germany",
  "pricing-italy",
  "pricing-spain",
  "pricing-uk",
  "second-product-fda",
  "second-product-ema",
  "second-product-japan",
];
const INITIAL_REGULATORY_TABLE_ROWS = CONTRACT_TABLE_REGULATORY_ROWS.map((cells, index) => ({
  id: REGULATORY_ROW_IDS[index],
  cells,
}));

// Marker -> table config for the pages that carry a contract table instead of
// flowing text (see documentPages below). The regulatory milestones table is
// the only one with rows in state, since it's the only one a finding targets.
const TABLE_PAGE_CONFIGS = [
  { marker: CONTRACT_TABLE_DEVELOPMENT_MARKER, headers: CONTRACT_TABLE_DEVELOPMENT_HEADERS, rows: DEVELOPMENT_TABLE_ROWS },
  { marker: CONTRACT_TABLE_REGULATORY_MARKER, headers: CONTRACT_TABLE_REGULATORY_HEADERS, rows: null },
  { marker: CONTRACT_TABLE_SALES_MARKER, headers: CONTRACT_TABLE_SALES_HEADERS, rows: SALES_TABLE_ROWS },
  { marker: CONTRACT_TABLE_PATENTS_MARKER, headers: CONTRACT_TABLE_PATENTS_HEADERS, rows: PATENTS_TABLE_ROWS },
  { marker: CONTRACT_TABLE_INDSUBMISSIONS_MARKER, headers: CONTRACT_TABLE_INDSUBMISSIONS_HEADERS, rows: IND_SUBMISSIONS_TABLE_ROWS },
];

const FINDINGS = [
  {
    id: "milestone-notice-gap",
    title: "5.2.1 Milestone Payments: no notice obligation when a Milestone is achieved",
    severity: "High",
    reason:
      "The clause ties payment timing to achievement of the Milestone but never requires LICENSEE to notify MERIDIAN when that achievement occurs — MERIDIAN has no proactive visibility and is relying entirely on LICENSEE to self-report. This compounds the risk given Helios's own track record: 3 of its last 4 licensing milestones have slipped by 6+ months, and a company already prone to delay has no contractual obligation to disclose sooner.",
    originalClause: "5.2.1 Milestone Payments. In further consideration of the licenses and rights granted to LICENSEE, within sixty (60) days after achievement of each Milestone set forth below (unless otherwise specified below), LICENSEE shall, subject to Section 1.6, pay to MERIDIAN the corresponding non-creditable and non-refundable milestone payment (each, a \"Milestone Payment\"). For the avoidance of doubt each Milestone Payment shall be payable only once upon achievement of the applicable Milestone.",
    sources: [
      {
        label: "Post-Mortem — Helios Pharma / Kestrel Bio Alliance (Closed 2024)",
        summary:
          "One of two recent Helios alliances where a program went quiet for over a year with no defined check-in point — the same self-reporting gap this finding flags for Milestone achievement.",
        excerpt:
          "Section 5.3's diligence obligation used 'commercially reasonable efforts' without defined FTE or spend commitments.",
        documentContent:
          "Section 5.3's diligence obligation used 'commercially reasonable efforts' without defined FTE or spend commitments. When Helios deprioritized the program following an internal portfolio review, Kestrel had no contractual basis to demonstrate breach, despite 14 months of inactivity. Recommendation: future agreements should tie diligence obligations to measurable inputs (FTEs, budget) rather than effort-based standards.",
      },
      {
        label: "Post-Mortem — Helios Pharma / Corvale Biosciences Alliance (Closed 2025)",
        summary:
          "The same Corvale post-mortem cites Helios's milestone-slippage pattern as \"Risk #1\" alongside a separate diligence-standard failure in that alliance.",
        excerpt:
          "This is the second of Helios's last four licensing deals where this exact standard has failed to hold up",
        documentContent:
          "The diligence clause mirrored standard 'commercially reasonable efforts' language. A shift in Helios's R&D priorities following a portfolio reprioritization led to an 18-month stall with no remedy available to Corvale under the existing terms. This is the second of Helios's last four licensing deals where this exact standard has failed to hold up (see also the Kestrel Bio post-mortem, 2024 — and the milestone-slippage pattern already flagged in Risk #1 above).",
      },
    ],
    suggestion: "Milestone Payments. In further consideration of the licenses and rights granted to LICENSEE, LICENSEE shall notify MERIDIAN in writing within ten (10) business days after achievement of each Milestone, and within sixty (60) days after such achievement, LICENSEE shall, subject to Section 1.6, pay to MERIDIAN the corresponding non-creditable and non-refundable milestone payment (each, a \"Milestone Payment\"), together with reasonable supporting documentation evidencing such achievement. For the avoidance of doubt each Milestone Payment shall be payable only once upon achievement of the applicable Milestone.",
    comment: "Confirm with the deal team whether ten business days is the right notice window, and whether MERIDIAN's finance/alliance management team should be a required notice recipient alongside the primary contract notice address.",
    recommendations: [
      "Add an explicit written-notice obligation (e.g., 10 business days) triggered by achievement of a Milestone.",
      "Require supporting documentation evidencing achievement alongside the Milestone Payment.",
      "Confirm an internal handoff process between LICENSEE's R&D and Alliance Management teams for this counterparty, given its track record of delayed notifications.",
    ],
  },
  {
    id: "reasonable-efforts-diligence-gap",
    title: "4.1.1 Development: \"Commercially Reasonable Efforts\" diligence has no measurable floor",
    severity: "High",
    reason:
      "LICENSEE's diligence obligation is defined only by the \"Commercially Reasonable Efforts\" standard, with no minimum FTE count, spend commitment, or activity-based milestone MERIDIAN can point to if LICENSEE deprioritizes the program. This is the same standard that failed to protect the counterparty in two of Helios's last four licensing alliances (Kestrel Bio, 2024, and Corvale Biosciences, 2025), in both cases following an internal portfolio reprioritization at Helios.",
    originalClause: "4.1.1 LICENSEE shall itself, or through its Affiliates or Sublicensees, use Commercially Reasonable Efforts to Develop Products in the Major Markets in the Field, and LICENSEE shall undertake all Development activities relating to the Compounds and Products in the Field at its sole expense.",
    sources: [
      {
        label: "Issue #ISS-2291 — Late milestone payment, discovered via partner follow-up",
        summary:
          "Internal process gaps let a significant Development milestone go unreported for months — the same lack of visibility that makes an effort-based diligence standard hard to enforce here.",
        excerpt:
          "Alliance Management first learned of the achievement five months later, when Kestrel's BD team followed up asking about the outstanding payment.",
        documentContent:
          "Milestone Event 3 (IND clearance) was achieved on record by Helios's own development team. No internal process notified Alliance Management or Finance, and the contract itself contained no explicit notice obligation — only a payment-timing clause tied to achievement. Alliance Management first learned of the achievement five months later, when Kestrel's BD team followed up asking about the outstanding payment. The payment was processed immediately upon discovery, but the delay prompted a formal notice-of-breach warning from Kestrel's legal team.",
      },
    ],
    suggestion: "LICENSEE shall itself, or through its Affiliates or Sublicensees, use Commercially Reasonable Efforts, including maintaining at least the equivalent of two (2) full-time employees dedicated to Development of the Products until the first Regulatory Approval, to Develop Products in the Major Markets in the Field, and LICENSEE shall undertake all Development activities relating to the Compounds and Products in the Field at its sole expense.",
    comment: "Confirm with the deal team whether a minimum FTE commitment (or a defined spend floor) is the preferred way to make this diligence obligation measurable, given how easily a slowdown can go unreported internally, as in the ISS-2291 milestone-notice gap.",
    recommendations: [
      "Tie the diligence obligation to measurable inputs (minimum FTEs or a spend floor), not just an effort-based standard.",
      "Add a notice obligation if LICENSEE materially reduces or deprioritizes Development.",
      "Define an objective trigger (e.g., a defined period of inactivity) MERIDIAN can point to as a diligence failure.",
    ],
  },
  {
    id: "assignment-change-of-control-gap",
    title: "17.1 Assignment: Change of Control assignment has no competitor carve-out",
    severity: "Medium",
    reason:
      "Clause 17.1(b) lets LICENSEE assign the entire Agreement upon a Change in Control without MERIDIAN's consent and without any carve-out for a direct competitor of MERIDIAN. If LICENSEE is acquired by a competitor, the exclusive license — and the Licensed Technology it covers — could transfer to that competitor with no renegotiation or termination right for MERIDIAN.",
    originalClause: "17.1 Assignment. LICENSEE may not assign its rights and obligations under this Agreement without MERIDIAN' prior written consent, except that: (a) LICENSEE may assign its rights and obligations under this Agreement in whole or in part to one or more of its Affiliates without the consent of MERIDIAN; and (b) LICENSEE may assign this Agreement in the event of a Change in Control.",
    sources: [
      {
        label: "Inpart AM Best Practice Playbook — Section 7: Contract Red Flags",
        summary:
          "Assignment clauses that permit a Change-of-Control transfer without a competitor carve-out are a commonly overlooked risk, especially where the counterparty's financial position makes M&A plausible.",
        excerpt:
          "Reviewers should always check for a competitor carve-out and a renegotiation or termination right — particularly when the counterparty's financial position suggests M&A is plausible.",
        documentContent:
          "Generic M&A assignment clauses are among the most overlooked risk points in licensing agreements. A clause permitting assignment 'without consent' in connection with a merger or acquisition, without a carve-out for direct competitors, can transfer an exclusive license into a competitor's hands with zero renegotiation rights. Reviewers should always check for a competitor carve-out and a renegotiation or termination right — particularly when the counterparty's financial position suggests M&A is plausible.",
      },
    ],
    suggestion: "Assignment. LICENSEE may not assign its rights and obligations under this Agreement without MERIDIAN' prior written consent, except that: (a) LICENSEE may assign its rights and obligations under this Agreement in whole or in part to one or more of its Affiliates without the consent of MERIDIAN; and (b) LICENSEE may assign this Agreement in the event of a Change in Control, provided that the acquiring party is not a direct competitor of MERIDIAN in the Field; if the acquiring party is a direct competitor of MERIDIAN in the Field, such assignment shall require MERIDIAN's prior written consent, not to be unreasonably withheld.",
    comment: "Confirm with the deal team how \"direct competitor\" should be defined for this carve-out, and whether MERIDIAN should also have a termination or renegotiation right rather than only a consent right.",
    recommendations: [
      "Add a competitor carve-out to the Change of Control assignment right in 17.1(b).",
      "Define \"direct competitor\" for purposes of the carve-out.",
      "Consider a renegotiation or termination right for MERIDIAN if the acquiring party is a competitor.",
    ],
  },
];

const SEVERITY_ORDER = { High: 0, Medium: 1, Low: 2 };
// Red/orange/yellow for High/Medium/Low — same mapping drives the
// ColorStatus badge color and the document highlight color (see
// SEVERITY_HIGHLIGHT_LEVEL and --color-redline-highlight-* in tokens.css),
// so the two can never drift out of sync.
const SEVERITY_COLOR_STATUS_VARIANT = { High: "red", Medium: "orange", Low: "yellow" };
const SEVERITY_HIGHLIGHT_LEVEL = { High: "high", Medium: "medium", Low: "low" };
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

// Findings can target a contract-table row instead of a span of the flowing
// contract text (see FINDINGS[].milestoneRowId), so the table can show the
// same highlight/apply treatment plain-text clauses get. Only the regulatory
// milestones table currently has a finding attached to it.
const FINDING_BY_TABLE_ROW_ID = Object.fromEntries(
  FINDINGS.filter((finding) => finding.milestoneRowId).map((finding) => [finding.milestoneRowId, finding])
);

// Passed to paginateDocumentByMeasurement as forcedPageBreakTexts — each of
// these clauses always starts a fresh page (see that function for why).
// Excludes milestoneRowId findings, which target a table row rather than a
// paragraph in the flowing text.
const FINDING_ORIGINAL_CLAUSES = FINDINGS.filter((finding) => !finding.milestoneRowId).map((finding) => finding.originalClause);

const PAYMENT_AMOUNT_PATTERN = /\$[\d,]+/;
const extractPaymentAmount = (value = "") => value.match(PAYMENT_AMOUNT_PATTERN)?.[0] ?? null;

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const CONTRACT_TABLE_STYLE = 'width:100%;border-collapse:collapse;font-family:"Times New Roman",Times,serif;font-size:var(--text-body-md);color:var(--color-content-primary);';
const CONTRACT_TABLE_HEADER_CELL_STYLE = "border:1px solid var(--color-content-primary);padding:var(--spacing-xs) var(--spacing-sm);text-align:left;font-weight:var(--font-weight-bold);";
const CONTRACT_TABLE_CELL_STYLE = "border:1px solid var(--color-content-primary);padding:var(--spacing-xs) var(--spacing-sm);vertical-align:top;";

// Builds one of the contract's tables (development/regulatory/sales
// milestones, patent schedule, IND submission log) as an HTML string, in the
// document's own Times New Roman styling. This (rather than a React
// component) is what lets a table be substituted directly into a page's
// text content — see DocumentViewer's blockHtmlOverrides — so it flows on
// the same page as surrounding prose instead of needing a page of its own.
// `findingByRowId` is only passed for the table a finding can target, so
// the others render with no highlight behavior.
const renderContractTableHtml = ({ headers, rows, findingByRowId, expandedFindingId }) => {
  const headerCellsHtml = headers
    .map((header) => `<th style="${CONTRACT_TABLE_HEADER_CELL_STYLE}">${escapeHtml(header)}</th>`)
    .join("");
  const rowsHtml = rows
    .map((row) => {
      const finding = findingByRowId?.[row.id];
      const isActive = finding?.id === expandedFindingId;
      const highlightLevel = finding && SEVERITY_HIGHLIGHT_LEVEL[finding.severity];
      const rowExtraStyle = [
        highlightLevel ? `background:var(--color-redline-highlight-${highlightLevel});` : "",
        isActive ? "box-shadow:inset 0 0 0 2px var(--color-content-brand);" : "",
      ].join("");
      const cellsHtml = row.cells
        .map((cell) => `<td style="${CONTRACT_TABLE_CELL_STYLE}${rowExtraStyle}">${escapeHtml(cell)}</td>`)
        .join("");
      return `<tr${isActive ? ' data-document-highlight="active"' : ""}>${cellsHtml}</tr>`;
    })
    .join("");
  return `<table style="${CONTRACT_TABLE_STYLE}"><thead><tr>${headerCellsHtml}</tr></thead><tbody>${rowsHtml}</tbody></table>`;
};

// Matches DocumentViewer's default pageWidth/pageHeight/pagePadding (595 x
// 842 = A4 at 72dpi, 40px padding) — this page never overrides them, so the
// measurer below has to reproduce the same content box to paginate accurately.
const PAGE_CONTENT_WIDTH = 595 - 40 * 2;
const PAGE_CONTENT_HEIGHT = 842 - 40 * 2;

// A hidden, off-screen element used purely to measure how tall a given
// amount of content renders at — same width/font/line-height as the real
// page text (and, for a table paragraph, the table's own real markup), so
// "does this fit on one A4 page" is answered by the browser's own layout
// instead of a guessed character count (which either wastes space or
// silently clips, depending on which way the guess is wrong).
const createPageMeasurer = () => {
  const element = document.createElement("div");
  element.style.position = "absolute";
  element.style.visibility = "hidden";
  element.style.pointerEvents = "none";
  element.style.top = "-99999px";
  element.style.left = "-99999px";
  element.style.width = `${PAGE_CONTENT_WIDTH}px`;
  element.style.whiteSpace = "pre-wrap";
  element.style.wordBreak = "break-word";
  element.style.boxSizing = "border-box";
  element.style.fontFamily = '"Times New Roman", Times, serif';
  element.style.fontSize = "var(--text-body-md)";
  element.style.lineHeight = "var(--line-height-body-lg)";
  document.body.appendChild(element);
  return element;
};

// Once a finding is applied, the paragraph it touched renders both the
// struck-through original text AND the accepted replacement (see
// createAppliedRedlineHtml in document-viewer.jsx) — taller than the
// replacement text alone. Measuring only the current (already-replaced)
// paragraph text would under-count that height and clip the page, so for
// measurement only, the original text is added back in ahead of the
// replacement wherever an applied redline's proposed text appears. This
// slightly over-estimates height (the real diff can share a common
// prefix/suffix and take less room), which is the safe direction to be
// wrong in — a little extra blank space beats clipped text.
const expandParagraphForMeasurement = (paragraph, appliedRedlines) =>
  appliedRedlines.reduce((text, { originalText = "", proposedText = "" }) => {
    if (!proposedText || !text.includes(proposedText)) return text;
    return text.split(proposedText).join(`${originalText}${proposedText}`);
  }, paragraph);

// A paragraph that's really a table marker measures using the table's own
// real rendered HTML instead of its literal marker text, so the packer
// below sees the table's true height — exactly what DocumentViewer will
// substitute in at render time (see blockHtmlOverrides).
const buildMeasurementHtml = (paragraphs, tableHtmlByMarker, appliedRedlines) =>
  paragraphs
    .map((paragraph) => tableHtmlByMarker[paragraph] ?? escapeHtml(expandParagraphForMeasurement(paragraph, appliedRedlines)))
    .join("<br><br>");

const measuredParagraphsFitOnPage = (measurer, paragraphs, tableHtmlByMarker, appliedRedlines) => {
  measurer.innerHTML = buildMeasurementHtml(paragraphs, tableHtmlByMarker, appliedRedlines);
  return measurer.scrollHeight <= PAGE_CONTENT_HEIGHT;
};

// Greedily fills each page paragraph-by-paragraph (a "paragraph" being
// either prose or a table marker), checking real rendered height rather
// than a character count — so a table shares a page with surrounding prose
// exactly when there's room, instead of always burning a whole page.
// Only ever breaks between whole paragraphs/tables (never mid-paragraph)
// unless a single paragraph alone doesn't fit a full page — which doesn't
// happen for this document's prose, but the word-level fallback keeps that
// case from silently overflowing/clipping. Breaking only at paragraph
// boundaries also guarantees a finding's clause text (always wholly inside
// one paragraph) never ends up split across two pages, which would
// otherwise stop it from being found for highlighting.
//
// A paragraph a finding targets (forcedPageBreakTexts) always starts a
// fresh page, even if it would technically still fit alongside whatever
// came before it. Applying that finding can make the paragraph grow (the
// redline shows both the struck-through original and the accepted text —
// see expandParagraphForMeasurement), and if it started mid-page, that
// growth would knock it — and only it — onto the next page, shifting
// unrelated preceding content along with it. Starting the clause at the top
// of its own page means growth only ever affects that one page.
const paginateDocumentByMeasurement = (documentParagraphs, measurer, tableHtmlByMarker, appliedRedlines, forcedPageBreakTexts = []) => {
  const pages = [];
  let current = [];

  const startFreshPage = (paragraph) => {
    if (measuredParagraphsFitOnPage(measurer, [paragraph], tableHtmlByMarker, appliedRedlines)) {
      current = [paragraph];
      return;
    }
    if (tableHtmlByMarker[paragraph]) {
      // A table alone taller than a full page isn't expected in this
      // document — keep it whole rather than attempting to split table rows.
      current = [paragraph];
      return;
    }
    const words = paragraph.split(/\s+/).filter(Boolean);
    let chunk = "";
    words.forEach((word) => {
      const candidate = chunk ? `${chunk} ${word}` : word;
      if (!chunk || measuredParagraphsFitOnPage(measurer, [candidate], tableHtmlByMarker, appliedRedlines)) {
        chunk = candidate;
        return;
      }
      pages.push([chunk]);
      chunk = word;
    });
    current = [chunk];
  };

  documentParagraphs.forEach((paragraph) => {
    if (current.length === 0) {
      startFreshPage(paragraph);
      return;
    }
    const mustStartFreshPage = forcedPageBreakTexts.some((text) => text && paragraph.includes(text));
    if (mustStartFreshPage) {
      pages.push(current);
      current = [];
      startFreshPage(paragraph);
      return;
    }
    const candidate = [...current, paragraph];
    if (measuredParagraphsFitOnPage(measurer, candidate, tableHtmlByMarker, appliedRedlines)) {
      current = candidate;
      return;
    }
    pages.push(current);
    current = [];
    startFreshPage(paragraph);
  });

  if (current.length > 0) pages.push(current);
  return pages.length > 0 ? pages.map((page) => page.join("\n\n")) : [documentParagraphs.join("\n\n")];
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
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
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
  const [regulatoryTableRows, setRegulatoryTableRows] = useState(INITIAL_REGULATORY_TABLE_ROWS);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState(EXPORT_FORMATS.redlined);
  // Pagination measured against the real A4 page box (see
  // paginateDocumentByMeasurement), so each fixed-size page — including ones
  // that contain a table — is packed to capacity instead of a table always
  // burning a whole page regardless of how little it fills. Null until the
  // layout-effect below measures it in the browser; documentPages falls back
  // to one big page until then.
  const [measuredTextPages, setMeasuredTextPages] = useState(null);

  // Each table's HTML (current row data + which row, if any, is the active
  // finding) substituted into a page's text wherever that table's marker
  // paragraph appears — see DocumentViewer's blockHtmlOverrides prop. A
  // row's own payment digits changing doesn't change the table's row count,
  // so this doesn't need to trigger re-pagination (see the effect below).
  const tableHtmlByMarker = useMemo(
    () =>
      Object.fromEntries(
        TABLE_PAGE_CONFIGS.map((config) => {
          const isRegulatoryTable = config.marker === CONTRACT_TABLE_REGULATORY_MARKER;
          return [
            config.marker,
            renderContractTableHtml({
              headers: config.headers,
              rows: isRegulatoryTable ? regulatoryTableRows : config.rows,
              findingByRowId: isRegulatoryTable ? FINDING_BY_TABLE_ROW_ID : undefined,
              expandedFindingId,
            }),
          ];
        })
      ),
    [regulatoryTableRows, expandedFindingId]
  );
  const blockHtmlOverrides = useMemo(
    () => TABLE_PAGE_CONFIGS.map((config) => ({ text: config.marker, html: tableHtmlByMarker[config.marker] })),
    [tableHtmlByMarker]
  );

  useLayoutEffect(() => {
    const measurer = createPageMeasurer();
    try {
      const paragraphs = documentText.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
      setMeasuredTextPages(
        paginateDocumentByMeasurement(paragraphs, measurer, tableHtmlByMarker, appliedRedlines, FINDING_ORIGINAL_CLAUSES)
      );
    } finally {
      measurer.remove();
    }
    // Re-measures whenever documentText or appliedRedlines changes (applying
    // a finding updates both together) — but not for every
    // regulatoryTableRows/expandedFindingId change (which tableHtmlByMarker
    // also depends on), since a payment amount or the active row changing
    // doesn't change a table's row count/height enough to matter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentText, appliedRedlines]);

  const documentPages = useMemo(
    () => (measuredTextPages ?? [documentText]).map((pageText) => ({ content: pageText })),
    [measuredTextPages, documentText]
  );

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

    // Table-targeted findings update a specific regulatory-milestone row's
    // payment cell directly instead of doing a text replace in the flowing
    // contract text.
    if (finding.milestoneRowId) {
      const nextPayment = extractPaymentAmount(suggestion) ?? suggestion;
      setRegulatoryTableRows((rows) =>
        rows.map((row) =>
          row.id === finding.milestoneRowId ? { ...row, cells: [row.cells[0], nextPayment] } : row
        )
      );
      setAppliedRedlines((changes) => {
        const nextChange = { originalText: finding.originalClause, proposedText: suggestion, commentId };
        const existingIndex = changes.findIndex((change) => change.originalText === nextChange.originalText);
        if (existingIndex < 0) return [...changes, nextChange];
        return changes.map((change, index) => (index === existingIndex ? nextChange : change));
      });
      setCommentDrafts((drafts) => ({ ...drafts, [finding.id]: "" }));
      return;
    }

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

  const handleApplyAllFindings = () => {
    ORDERED_FINDINGS.forEach((finding) => {
      if (isFindingApplied(finding)) return;
      handleApplyFinding(finding);
    });
  };

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
                <HubHeaderTitle size="md">Meridian bio alliance</HubHeaderTitle>
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
              pages={documentPages}
              originalText={SAMPLE_DOCUMENT_TEXT}
              appliedRedlines={appliedRedlines}
              highlights={ORDERED_FINDINGS.filter((finding) => !finding.milestoneRowId).map((finding) => ({ text: finding.originalClause, level: SEVERITY_HIGHLIGHT_LEVEL[finding.severity] }))}
              highlightText={expandedFindingId ? activeAppliedRedline?.proposedText ?? selectedFinding.originalClause : undefined}
              highlightLevel={SEVERITY_HIGHLIGHT_LEVEL[selectedFinding.severity]}
              paragraphStyles={DOCUMENT_PARAGRAPH_STYLES}
              blockHtmlOverrides={blockHtmlOverrides}
              commentThread={documentComments}
              onCommentSubmit={addDocumentComment}
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
              headerBadge={<Badge color="neutral" size="md">{ORDERED_FINDINGS.length}</Badge>}
              headerButtons={[
                {
                  label: "Apply all",
                  variant: "secondary",
                  onClick: handleApplyAllFindings,
                  isDisabled: needsReviewFindings.length === 0,
                },
              ]}
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
                    <EmptyState
                      size="sm"
                      illustrationVariant="noIssues"
                      title="All findings resolved"
                      description="Every finding in this contract has been reviewed and resolved. Upload another document to start a new review."
                      actionLabel="Upload another document"
                      onAction={() => navigateToPath(CONTRACT_REVIEW_ASSISTANT_GUIDANCE_PATH)}
                    />
                  )
                )}
                {visibleFindings.map((finding) => (
                  <Accordion
                    key={finding.id}
                    title={
                      <span style={styles.accordionTitle}>
                        <ColorStatus variant={SEVERITY_COLOR_STATUS_VARIANT[finding.severity]}>{finding.severity}</ColorStatus>
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
                        isReadOnly={isFindingApplied(finding)}
                      />
                      {!isFindingApplied(finding) && (
                        <Textarea
                          label="Comment"
                          placeholder="Leave your comment"
                          value={commentDrafts[finding.id] ?? ""}
                          onChange={(event) => setCommentDrafts((drafts) => ({ ...drafts, [finding.id]: event.target.value }))}
                        />
                      )}
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
                            iconLeading={<Icon name="ArrowTurnDownLeft" size="sm" />}
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
