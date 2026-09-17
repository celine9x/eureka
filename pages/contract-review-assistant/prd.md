# PRD: Contract review assistant (current prototype behavior)

This document describes the **actual behavior implemented** in `pages/contract-review-assistant/`: `guidance.jsx`, `loading.jsx`, `review.jsx`, `contract-content.js`, and the `router-app.jsx` that wires them together. It replaces the previous version of this PRD, which had drifted significantly from the code — in particular `review.jsx` has since been rebuilt around a full paginated contract document, a table-aware findings model, toast notifications, an "Apply all" action, and an export flow.

## Flow

> **Setup (`guidance.jsx`) → Analysis in progress (`loading.jsx`) → Findings & review (`review.jsx`)**

All three screens share the same shell:

- `SideMenu` — collapsed, expands on hover, `menuVariant="deal"` (or an equivalent `sections` list on `loading.jsx`), hardcoded user **Julie Settipani** / `julie.settipani@heliospharma.com`.
- `HubHeader` — **Back** button + title **"Draft License Agreement Meridian - Helios"** on the left; **Save and close** (all screens) and **Export** (`review.jsx` only) on the right.
- A 12-column grid (`main`) with content in columns 2–11: a `DocumentViewer` pane (6 of 10 inner columns) on the left and a `CreationFormPanel` pane (4 of 10) on the right.

The three screens are wired together via `router-app.jsx` and real navigation calls (see [Routing](#routing--router-appjsx)). State is still **not shared** across screens — each owns its own local sample data, and nothing selected in `guidance.jsx` (checked post-mortems/risks, uploaded files, instructions) carries into `loading.jsx` or `review.jsx`.

---

## Screen 1 — Review setup (`guidance.jsx`)

### Document viewer (left)
- Renders a short static sample contract (own `SAMPLE_DOCUMENT_TEXT` — a 4-section Veltarix/Meridian "Collaboration and License Agreement": Definitions, License Grant, Governance, Term and Termination), `editable`, with toolbar and edit toolbar shown. No highlights, no redlines — a plain read/edit view before analysis. This is the same sample text used by `loading.jsx`, but it is a **different document** from the one `review.jsx` shows (see [Document mismatch](#known-gaps--not-yet-wired)).

### Form panel (right) — `CreationFormPanel title="Contract review"`
- Info message: *"Inaccuracies may occur with AI. Please review carefully."*
- Heading **"Review guidance"** + subtext *"Redlines the contract against your selected instructions."*
- **Accordion — "Alliance post-mortems"** (size `sm`, header checkbox, badge `{selected}/{total}`):
  - Rows for `ALLIANCE_POST_MORTEMS` (2 items — *"Post-Mortem — Helios Pharma / Kestrel Bio Alliance (Closed 2024)"* and *"Post-Mortem — Helios Pharma / Corvale Biosciences Alliance (Closed 2025)"*), each a `Checkbox` + `Link` (icon leading `DocumentText`), label truncated to one line with an ellipsis and a `Tooltip` (`bottom-left`) showing the full label on hover. These two post-mortems are the same two alliances cited as `sources[]` on the findings in `review.jsx`, though the two screens are not actually linked.
  - Checkbox state (`guidanceChecked`) and the header's select-all checkbox / badge count (`selectedGuidanceCount`) are **fully wired** — checking/unchecking a row or the header updates the badge live. All items start **checked**.
- **Accordion — "Linked open risks"** (size `sm`, header checkbox, badge `{selected}/{total}`):
  - Same structure for `LINKED_OPEN_RISKS` (3 items — *"Milestone slippage pattern"* (High), *"Partner cash runway"* (High), *"Competitive timeline pressure"* (Moderate)), each row also showing a `ColorStatus` risk badge (`variant="risk-impact"`) on the right instead of a plain severity `Badge`. All items start **checked** (there is no longer a default-unchecked row).
  - Same wiring as above (`riskChecked`, `selectedRiskCount`).
- **"Additional files for context"** — secondary **Browse files** button (icon `ArrowUpTray`) opens a hidden native file input; selected files are appended to `contextFiles` and rendered as a list of `FileUploaded` rows, each with a working **Remove** button. Multiple files can be added across multiple browses.
- Free-text instructions: `Textarea` label "Additional instruction", placeholder about cost-sharing, milestone triggers, non-cancellable CMC commitments. Not bound to any state (uncontrolled).
- Footer CTA: **Run review** — AI-styled secondary button (icon `Sparkles`, size `lg`, full width). `onClick` navigates to `/contract-review-assistant/loading`.

---

## Screen 2 — Analysis in progress (`loading.jsx`)

### Document viewer (left)
- Same static `SAMPLE_DOCUMENT_TEXT`, `editable`, toolbar shown — identical to Screen 1. No highlights.

### Form panel (right) — `CreationFormPanel title="Contract review"`, footer hidden
- `EmptyState`: title **"Reviewing"**, description *"The AI is currently reviewing the uploaded contract. Please wait for the process to complete."*, illustration `Detect AI.svg`, no action button.
- `ProgressIndicator`:
  - Value animates 0 → 100 over a fixed **5000 ms** via `requestAnimationFrame` (purely client-side simulation, not tied to a real analysis job or API call).
  - `usePhaseMode` with 4 phases, labeled with in-progress copy: *"Reading the contract...", "Extracting key clauses...", "Comparing against precedent and policy...", "Compiling findings..."*.
  - Label position `right`, value formatted as a rounded `%`.
  - **On completion** (`elapsed >= duration`), automatically navigates to `/contract-review-assistant/review`.

### Dead code (present but unused)
- `guidanceChecked`, `riskChecked`, `selectedGuidanceCount`, `selectedRiskCount`, the `ChecklistRows` component, and the `REVIEW_GUIDANCE_ITEMS` / `LINKED_RISK_ITEMS` constants are all defined but **never rendered** — this screen shows only the `EmptyState` + `ProgressIndicator`, not a guidance/risk checklist. Safe to remove or intentionally wire up.

---

## Screen 3 — Findings & review (`review.jsx`)

### Document content (`contract-content.js`)
- The document is a full "LICENSE AGREEMENT" between MERIDIAN and Helios/LICENSEE, sourced from `contract-content.js`: a title paragraph, an italic disclaimer (*"SYNTHETIC TEST DOCUMENT..."*), styled Heading1/Heading2 section paragraphs, and flowing clause text — plus five embedded **contract tables** (Development milestones, Regulatory milestones, Sales milestones, Patent schedule, IND submission log), each rendered from header/row data arrays rather than as prose. **Known inconsistency:** this is a different document from the short Veltarix/Meridian sample shown in `guidance.jsx`/`loading.jsx`.
- `DOCUMENT_PARAGRAPH_STYLES` maps the title/disclaimer/heading paragraphs to CSS classes (`document-viewer__paragraph--title/italic/heading1/heading2`) via `DocumentViewer`'s `paragraphStyles` prop, so the rendered page matches the source `.docx`'s typographic treatment (bold title, brand-blue headings, italic small print).

### Contract tables
- Each table's marker string (e.g. `[[CONTRACT_TABLE_REGULATORY]]`) is swapped for real HTML (`renderContractTableHtml`, Times New Roman inline styling) via `DocumentViewer`'s `blockHtmlOverrides` prop, so a table flows on the same page as surrounding prose instead of always being pushed to its own page.
- Only the **regulatory milestones** table has per-row state (`regulatoryTableRows`) and a row→finding mapping (`FINDING_BY_TABLE_ROW_ID`, keyed by an optional `finding.milestoneRowId`); the other four tables are static. A finding targeting a table row would highlight that row (severity background + active-row outline) the same way a text clause is highlighted — but **no finding in the current `FINDINGS` data sets `milestoneRowId`**, so this row-targeting path is built but currently unexercised.

### Document pagination
- The document is paginated into real, fixed-size A4 pages (`PAGE_CONTENT_WIDTH`/`HEIGHT`, matching `DocumentViewer`'s default page box) using an off-screen DOM measurer (`createPageMeasurer`) rather than a character-count estimate — `paginateDocumentByMeasurement` greedily packs whole paragraphs (or whole tables) onto a page until the next one wouldn't fit, measuring the table's own real markup for table paragraphs.
- A finding's clause text always starts a fresh page (`FINDING_ORIGINAL_CLAUSES` passed as `forcedPageBreakTexts`), so that when applying the finding grows the paragraph (an applied redline shows both struck-through original and accepted text — see `expandParagraphForMeasurement`), the growth only pushes that one page's own content, not unrelated preceding pages.
- Pagination re-runs (`useLayoutEffect`) whenever `documentText` or `appliedRedlines` changes; a table row's payment value or the active-finding highlight changing does **not** re-trigger it, since neither changes a table's row count/height.

### Findings data model (`FINDINGS`)
Three findings, each with:

| Field | Purpose |
|---|---|
| `id` | Unique key |
| `title` | Clause reference + issue name, e.g. *"5.2.1 Milestone Payments: no notice obligation when a Milestone is achieved"* |
| `severity` | `High` / `Medium` / `Low` (`SEVERITY_ORDER`) — mapped to a `ColorStatus` badge variant (`red`/`orange`/`yellow`, `SEVERITY_COLOR_STATUS_VARIANT`) and to a document highlight level (`high`/`medium`/`low`, `SEVERITY_HIGHLIGHT_LEVEL`) from the same field, so the two never drift out of sync. Currently all three findings are High or Medium — no Low example exists in the data. |
| `reason` | One-paragraph explanation shown under "Reason" |
| `originalClause` | Exact source text — used to highlight the clause in the document and as the string replaced when a suggestion is applied. A leading clause number (e.g. `"5.2.1 "`) is split off (`splitClauseNumber`) before any redline swap, so the number itself is never struck through/replaced. |
| `milestoneRowId` | Optional — targets a regulatory-milestone table row instead of a text clause. Defined as a code path but unused by any current finding. |
| `sources[]` | `{ label, summary, excerpt, documentContent }` — rendered as a link + summary + excerpt under "Sources". `documentContent` is a full mock document (an alliance post-mortem, an internal issue ticket, or an internal best-practice playbook) and literally contains `excerpt` as a substring; clicking the link opens the `SidePanel` with that full document, with the excerpt highlighted inline via `<mark>`. |
| `suggestion` | The AI-proposed redline text |
| `comment` | Seed/default comment copy — **present in data but not currently rendered or used to seed `commentDrafts` anywhere in the UI** |
| `recommendations[]` | Bullet list of follow-ups — **present in data but not currently rendered anywhere in the UI** |

The three current findings: **5.2.1 Milestone Payments** (High — no notice obligation on Milestone achievement), **4.1.1 Development** (High — "Commercially Reasonable Efforts" diligence has no measurable floor), **17.1 Assignment** (Medium — Change of Control assignment has no competitor carve-out). All three sources are written to tie back to the same fictional counterparty (Helios Pharma) and its documented pattern of quiet portfolio deprioritization and milestone slippage across two prior alliances (Kestrel Bio 2024, Corvale Biosciences 2025) plus one internal issue ticket and one internal best-practice playbook.

Findings are sorted High → Medium → Low into `ORDERED_FINDINGS`; there is no re-sort/filter/search control.

### Component state
- `activeTab` — `"needs-review"` or `"resolved"`, drives which findings list is visible.
- `resolvedFindingIds` — set of finding ids moved to the Resolved tab.
- `expandedFindingId` — which finding's accordion is open; also drives the active document highlight.
- `suggestionDrafts` — per-finding edited suggestion text (defaults to `finding.suggestion` until edited).
- `commentDrafts` — per-finding draft comment text (starts empty — not seeded from `finding.comment`).
- `selectedSource` — the source currently shown in the `SidePanel`.
- `documentText` — the live, mutable contract text (mutated when a paragraph-targeted suggestion is applied).
- `documentComments` — comments attached to spans of text (via `addDocumentComment`).
- `appliedRedlines` — list of `{ originalText, proposedText, commentId }`, recorded once **Apply** is used, for both paragraph- and table-targeted findings.
- `regulatoryTableRows` — live state for the one table a finding can target; starts from `INITIAL_REGULATORY_TABLE_ROWS`.
- `isExportModalOpen` / `exportFormat` — drive the **Export contract** modal.
- `isUploadModalOpen` / `uploadFiles` — drive the **Upload another document** modal.
- `measuredTextPages` — the browser-measured page split described above; `null` until the first layout-effect measurement runs, during which `documentPages` falls back to one big page.
- `hasAnnouncedFindingsRef` — guards the one-time "review complete" toast so it doesn't re-fire on re-render.

### Toast notifications (`useToast`)
- On mount, a one-time success toast: *"Contract review complete — found N issue(s) that need review."*
- Applying a single finding shows a success toast naming the clause (e.g. *"Suggestion applied to 5.2.1 Milestone Payments."*), plus *"...and comment added."* if a comment draft was non-empty.
- **Apply all** shows one summary toast covering however many findings and comments were applied in that action.

### Findings list (right panel)
- `CreationFormPanel` header badge shows the total finding count (`ORDERED_FINDINGS.length`, not just visible/unresolved).
- Header action area is conditional:
  - If any finding still needs review: a **header button "Apply all"** (secondary) — calls `handleApplyAllFindings`, which applies every not-yet-applied finding silently (no per-finding toast) and shows one combined success toast.
  - If every finding has been applied (`needsReviewFindings.length === 0`): a read-only **"All applied"** `Badge.WithIcon` (positive/check) in the header instead of the button.
- Below the header, `Tabs` show **Needs review** / **Resolved**, each with a live count badge.
- Each visible finding renders as a vertical `Accordion`:
  - Header: `ColorStatus` severity badge + `finding.title` (truncated with ellipsis if too long), plus a header-level **Resolve** action button (hidden on the Resolved tab).
  - Clicking the header (`onHeaderClick`) sets `expandedFindingId` to that finding (expands it and makes it the active document highlight). Toggling the accordion open/closed independently updates `expandedFindingId` via `onToggle`.
  - **Resolve** (`handleResolveFinding`) adds the finding's id to `resolvedFindingIds` and collapses it if it was expanded — it moves to the Resolved tab. There is no "un-resolve" action.
  - **Expanded content:**
    1. **Reason** — `finding.reason`.
    2. **Sources** — one card per source: bordered/background block with a truncated, tooltip-enabled `Link` (opens the `SidePanel`), `source.summary`, and `source.excerpt` (left-bordered quote).
    3. **Suggestion** — `Textarea variant="ai"`: `aiValue={finding.suggestion}`, `originalValue` = the clause body with its leading number stripped, `showRedlinePreview`. Bound to `suggestionDrafts[finding.id]`; **Revert to AI** resets the draft back to `finding.suggestion`. Becomes **read-only** (`isReadOnly`) once the finding has been applied.
    4. **Comment** — plain `Textarea`, placeholder "Leave your comment", bound to `commentDrafts[finding.id]`. **Hidden entirely once the finding has been applied** (rather than shown disabled).
    5. **Action** — either an **Apply** button (primary, icon `ArrowTurnDownLeft`), or — once applied — a read-only **Applied** `Badge.WithIcon` in its place.
- **Empty states** (`visibleFindings.length === 0`):
  - Resolved tab, nothing resolved yet: `EmptyState` (`noIssues` illustration) — *"No resolved findings yet" / "Findings you resolve tab will show up here."*, no action button.
  - Needs-review tab, everything resolved: `EmptyState` (`noHealthCheck` illustration) — *"All findings resolved" / "Every finding in this contract has been reviewed and resolved. Upload another document to start a new review."*, action **"Upload another document"** opens the upload modal.

### "Apply" behavior (`handleApplyFinding(finding, { silent })`)
1. Resolve the suggestion text: edited draft if present, otherwise `finding.suggestion`.
2. Call `addDocumentComment` with the current comment draft (if empty after trimming, no comment is created; returns an id otherwise).
3. **If the finding targets a table row** (`milestoneRowId`): extract a dollar amount from the suggestion (`extractPaymentAmount`, regex `\$[\d,]+`) and overwrite that row's payment cell in `regulatoryTableRows`; upsert `{ originalText: finding.originalClause, proposedText: suggestion, commentId }` into `appliedRedlines` (keyed by `originalText`, replacing any existing entry for the same clause).
4. **Otherwise** (paragraph clause): split off the clause number from both the original clause and the suggestion so it's never part of the redline swap, reassemble, and replace `finding.originalClause` with the reassembled suggestion inside `documentText` via a plain string `replace`; upsert the clause-body-keyed entry into `appliedRedlines` the same way.
5. Clear the comment draft for that finding.
6. Unless `silent` (used by Apply all, which shows its own combined toast instead), show the per-finding success toast described above.

There is no separate status field — a finding's status is implicit: present in `appliedRedlines` (Applied, via `isFindingApplied`), present in `resolvedFindingIds` (Resolved tab), or neither (Needs review, not yet applied).

### Document viewer wiring
- `text={documentText}` (live, mutates on apply) / `originalText={SAMPLE_DOCUMENT_TEXT}` (baseline for diffing — this is `review.jsx`'s own longer sample, not the one from `guidance.jsx`/`loading.jsx`).
- `pages={documentPages}` — the browser-measured page split described above.
- `appliedRedlines={appliedRedlines}` — renders applied tracked changes inline.
- `highlights` — all **non-table-targeted** findings' `{ text: originalClause, level }`, so every text-clause finding is passively marked regardless of selection.
- `highlightText` — the active finding's applied redline text if one exists, else its `originalClause`; only set while a finding is expanded, otherwise `undefined`.
- `highlightLevel` — the active finding's highlight level (distinct from the passive `highlights` list; drives the "selected" highlight styling).
- `paragraphStyles={DOCUMENT_PARAGRAPH_STYLES}` / `blockHtmlOverrides={blockHtmlOverrides}` — the typographic and table-substitution wiring described above.
- `commentThread={documentComments}` / `onCommentSubmit={addDocumentComment}` — lets a user add a comment directly from the document, independent of any finding.
- `defaultPage={1}`, `editable`, `showToolbar`, `showEditToolbar`.

### Side panel (linked source viewer)
- Opens when `selectedSource` is set. Title = `source.label`, `titleIconName="DocumentText"`. `onOpen={() => {}}` — still a no-op placeholder; there's no real destination for the mock source data.
- Body renders the source's full `documentContent` as a bordered, Times-New-Roman "document" card, with the matching `excerpt` substring highlighted via `<mark>`.

### Export (`Export` button → `Modal`, new since the previous PRD)
- Header **Export** button opens an export `Modal` with a `RadioCardGroup` of two options:
  - **"Redlined version (recommended)"** — downloads the static, pre-generated file `Collaboration-License-Agreement-REDLINE.docx` (a real `.docx` with genuine Word tracked changes/comments, produced out of band — see `documents.md`). This file **does not reflect the current session's actual Apply/Resolve state**; it's the same fixed asset regardless of which findings the user has applied.
  - **"Clean version"** — builds a `Blob` from the live `documentText` (plain string) and downloads it as `contract-clean.docx` with a `.docx` MIME type. This is **not a real Word document** (no OOXML package) — the file extension and content type both claim `.docx`, but the payload is plain text.
- Clicking **Export** in the modal runs `handleExportContract` and closes the modal.

### Upload another document (`Modal`, new since the previous PRD)
- Shown from the "All findings resolved" empty state's action button.
- A `FileUploader` (single file, `.pdf`/`.doc`/`.docx`, 25MB) gates the modal's **Start review** button (disabled until a file is selected).
- **Start review** closes the modal and navigates to `/contract-review-assistant/guidance` — it does **not** pass the selected file along; `guidance.jsx` opens with its own hardcoded sample document as before.

### Redline color and interaction system
- **Passive highlight** (clause markers for all non-table findings, unselected) — severity-keyed CSS vars: `--color-redline-highlight-high/medium/low`, each a `color-mix()` of the matching content-status color at 20–30% over transparent. The same severity level also drives the active regulatory-table row's background.
- **Suggestion textarea redline preview** (read-only state): deletions struck through in `--color-redline-delete`, insertions in `--color-redline-add`, unchanged text in `--color-content-primary`.
- **Click-to-edit:** clicking the suggestion textarea switches it into a fully editable field — deletions hidden, insertions become plain text, and the "AI" badge becomes **Revert to AI**. (Disabled once the finding is applied — see `isReadOnly`.)
- **Apply** inserts the resolved suggestion directly into `documentText` (or the target table cell); the `DocumentViewer`'s `appliedRedlines` prop renders it as a tracked change in the document pane.

---

## Routing (`router-app.jsx`)

- A minimal client-side router keyed off `window.location.pathname`, using `history.pushState`/`popstate` (see each screen's `navigateToPath` helper) rather than a routing library.
- Known paths: `/contract-review-assistant/guidance`, `/contract-review-assistant/loading`, `/contract-review-assistant/review`, and `/library` (the full component library demo, `ComponentLibraryDemo`, including any `/library/...` sub-path).
- Any unrecognized path (including `/`) redirects to `/library` via `history.replaceState`.
- Sets `document.title` per route (e.g. "Contract Review Assistant Review — Eureka").
- This is the only place that ties the three screens together; there is otherwise no shared layout/provider component across them.

---

## Known gaps / not yet wired

These reflect the current code, not the eventual target experience:

- **`guidance.jsx`**: the free-text "Additional instruction" `Textarea` isn't bound to any state — it's not carried forward to `loading.jsx`/`review.jsx`, and neither are the checked post-mortems/risks or uploaded context files.
- **`loading.jsx`**: progress is a fixed 5-second client-side animation, not connected to a real analysis job or the selections made in `guidance.jsx`. It also contains an unused checklist implementation (`guidanceChecked`/`riskChecked`/`ChecklistRows`/`REVIEW_GUIDANCE_ITEMS`/`LINKED_RISK_ITEMS`) that is never rendered.
- **`review.jsx`**: `finding.comment` (seed comment copy) and `finding.recommendations` exist in the data model but are not rendered anywhere, and `finding.comment` is not used to seed `commentDrafts`.
- **`review.jsx`**: the table row-targeting path (`finding.milestoneRowId`, `FINDING_BY_TABLE_ROW_ID`) is fully implemented but currently unused — no finding in `FINDINGS` sets it, so it has no live example to exercise it.
- **`review.jsx`**: the `SidePanel`'s **Open** button (`onOpen`) has no real destination — the mock source data has no URL/document id to open to.
- **`review.jsx`**: the export modal's **"Redlined version"** always downloads the same static `.docx` asset regardless of what the user actually applied/resolved in the session; the **"Clean version"** download is labeled `.docx` but is really a plain-text file, not a valid Word document.
- **`review.jsx`**: the "Upload another document" modal collects a file but doesn't pass it anywhere — **Start review** just navigates to `guidance.jsx`, which still shows its own hardcoded sample.
- **Document mismatch**: `guidance.jsx`/`loading.jsx` show a short 4-section Veltarix/Meridian sample contract; `review.jsx` shows a longer, unrelated Meridian/Helios license agreement (with tables) sourced from `contract-content.js`. They are not the same document.
- **All three screens** use hardcoded local sample data — no file upload is actually analyzed, no backend/API call is made, and no state is shared or persisted across screens (routing changes the URL/screen only, not any data).
