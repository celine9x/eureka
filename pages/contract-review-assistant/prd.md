# PRD: Contract review assistant (current prototype behavior)

This document describes the **actual behavior implemented** in `pages/contract-review-assistant/`: `guidance.jsx`, `loading.jsx`, `review.jsx`, and the `router-app.jsx` that wires them together. It replaces the previous version of this PRD, which had drifted from the code (dismiss flow, side panel accordion, hardcoded badges, "Phase 1"–"Phase 4" labels, and the missing routing layer no longer match what's implemented).

## Flow

> **Setup (`guidance.jsx`) → Analysis in progress (`loading.jsx`) → Findings & review (`review.jsx`)**

All three screens share the same shell:

- `SideMenu` — collapsed, expands on hover, standard workspace/directory nav, hardcoded user (Linh Nguyen, linh.nguyen@inpart.io).
- `HubHeader` — **Back** button + **Alliance name** title on the left; **Save and close** and **Export** buttons on the right.
- A 12-column grid (`main`) with content in columns 2–11: a `DocumentViewer` pane (6 of 10 inner columns) on the left and a `CreationFormPanel` pane (4 of 10) on the right.

Unlike the earlier prototype, the three screens **are now wired together** via `router-app.jsx` and real navigation calls (see [Routing](#routing--router-appjsx)). State is still **not shared** across screens — each owns its own local sample data, and nothing selected in `guidance.jsx` (checked post-mortems/risks, uploaded files, instructions) carries into `loading.jsx` or `review.jsx`.

---

## Screen 1 — Review setup (`guidance.jsx`)

### Document viewer (left)
- Renders a short static sample contract (`SAMPLE_DOCUMENT_TEXT`, 4 clauses), `editable`, with toolbar and edit toolbar shown. No highlights, no redlines — a plain read/edit view before analysis.

### Form panel (right) — `CreationFormPanel title="Contract review"`
- Info message: *"Inaccuracies may occur with AI. Please review carefully."*
- Heading **"Review guidance"** + subtext *"Redlines the contract against your selected guidance and instructions."*
- **Accordion — "Alliance post-mortems"** (size `sm`, header checkbox, badge `{selected}/{total}`):
  - Rows for `ALLIANCE_POST_MORTEMS` (3 items, e.g. *"Nuvexa Bio – CMC cost overrun post-mortem"*), each a `Checkbox` + `Link` (icon leading `DocumentText`, icon trailing external-link icon), label truncated to one line with an ellipsis and a `Tooltip` (`bottom-left`) showing the full label on hover.
  - Checkbox state (`guidanceChecked`) and the header's select-all checkbox / badge count (`selectedGuidanceCount`) are **fully wired** — checking/unchecking a row or the header updates the badge live.
- **Accordion — "Linked open risks"** (size `sm`, header checkbox, badge `{selected}/{total}`):
  - Same structure for `LINKED_OPEN_RISKS` (4 items), each row also showing a severity `Badge` (`High`/`Moderate`/`Low`) on the right. One row ("Royalty term end-date ambiguity") starts unchecked by default; the rest start checked.
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
  - `usePhaseMode` with 4 phases, now labeled with in-progress copy rather than generic step numbers: *"Reading the contract...", "Extracting key clauses...", "Comparing against precedent and policy...", "Compiling findings..."*.
  - Label position `right`, value formatted as a rounded `%`.
  - **On completion** (`elapsed >= duration`), automatically navigates to `/contract-review-assistant/review` — this transition is now implemented (previously it was a known gap).

### Dead code (present but unused)
- `guidanceChecked`, `riskChecked`, `selectedGuidanceCount`, `selectedRiskCount`, the `ChecklistRows` component, and the `REVIEW_GUIDANCE_ITEMS` / `LINKED_RISK_ITEMS` constants are all defined but **never rendered** — this screen shows only the `EmptyState` + `ProgressIndicator`, not a guidance/risk checklist. Safe to remove or intentionally wire up.

---

## Screen 3 — Findings & review (`review.jsx`)

### Document text
- Uses a longer, more complete sample agreement (its own `SAMPLE_DOCUMENT_TEXT`, distinct from — and structurally unrelated to — the short one shared by Screens 1–2) with numbered clauses (Definitions, License Grant, Governance, Term and Termination, IP, Confidentiality) so each finding can anchor to a real clause. **Known inconsistency:** the document reviewed here is not the same document shown in `guidance.jsx`/`loading.jsx`.

### Findings data model (`FINDINGS`)
Each finding object has:

| Field | Purpose |
|---|---|
| `id` | Unique key |
| `title` | Clause reference + issue name, e.g. *"4.1 Termination: missing transition support and cost recovery"* |
| `severity` | `High` / `Moderate` / `Low` — mapped to chip variant via `SEVERITY_CHIP_VARIANTS` (`negative` / `warning` / `blue`) and to document highlight level via `SEVERITY_HIGHLIGHT_LEVEL` (`high` / `medium` / `low`), so both stay in sync from one field. |
| `reason` | One-paragraph explanation shown under "Reason" |
| `originalClause` | Exact source text — used to highlight the clause in the document and as the string replaced when a suggestion is applied |
| `sources[]` | `{ label, summary, excerpt, documentContent }` — rendered as a link + summary + excerpt under "Sources". `documentContent` **literally contains** `excerpt` as a substring (data was adjusted so this holds for every source); clicking the link opens the `SidePanel` with the full document, with the excerpt portion highlighted inline via `<mark>`. |
| `suggestion` | The AI-proposed redline text |
| `comment` | Seed/default comment copy — **present in data but not currently rendered anywhere in the UI** |
| `recommendations[]` | Bullet list of follow-ups — **present in data but not currently rendered anywhere in the UI** |

Findings are sorted High → Moderate → Low (`SEVERITY_ORDER`) into `ORDERED_FINDINGS`; there is no re-sort/filter/search control.

### Component state
- `activeTab` — `"needs-review"` or `"resolved"`, drives which findings list is visible.
- `resolvedFindingIds` — set of finding ids moved to the Resolved tab.
- `expandedFindingId` — which finding's accordion is open; also drives the active document highlight.
- `suggestionDrafts` — per-finding edited suggestion text (defaults to `finding.suggestion` until edited).
- `commentDrafts` — per-finding draft comment text.
- `selectedSource` — the source currently shown in the `SidePanel`.
- `documentText` — the live, mutable contract text (mutated when a suggestion is applied).
- `documentComments` — comments attached to spans of text.
- `appliedRedlines` — list of `{ originalText, proposedText, commentId }`, recorded once **Apply** is used.

### Findings list (right panel)
- `CreationFormPanel` header badge shows the total finding count; below the header, `Tabs` show **Needs review** / **Resolved**, each with a live count badge.
- Each visible finding renders as a vertical `Accordion`:
  - Header: severity `Chip` + `finding.title` (truncated with ellipsis if too long), plus a header-level **Resolve** action button (hidden on the Resolved tab).
  - Clicking the header (`onHeaderClick`) sets `expandedFindingId` to that finding (expands it and makes it the active document highlight). Toggling the accordion open/closed independently updates `expandedFindingId` via `onToggle`.
  - **Resolve** (`handleResolveFinding`) adds the finding's id to `resolvedFindingIds` and collapses it if it was expanded — it moves to the Resolved tab. There is no "un-resolve" action.
  - **Expanded content:**
    1. **Reason** — `finding.reason`.
    2. **Sources** — one card per source: bordered/background block with a truncated, tooltip-enabled `Link` (opens the `SidePanel`), `source.summary`, and `source.excerpt` (left-bordered quote).
    3. **Suggestion** — `Textarea variant="ai"`: `aiValue={finding.suggestion}`, `originalValue={finding.originalClause}`, `showRedlinePreview`. Bound to `suggestionDrafts[finding.id]`; **Revert to AI** resets the draft back to `finding.suggestion`.
    4. **Comment** — plain `Textarea`, placeholder "Leave your comment", bound to `commentDrafts[finding.id]`.
    5. **Action** — either an **Apply** button (primary), or — once applied — a read-only **Applied** `Badge.WithIcon` in its place. There is no separate Dismiss action in this screen; Resolve (header) is the only dismissal-style action.

### "Apply" behavior (`handleApplyFinding`)
1. Resolve the suggestion text: edited draft if present, otherwise `finding.suggestion`.
2. Call `addDocumentComment` with the current comment draft (if empty after trimming, no comment is created).
3. Split off the clause number (e.g. `"4.1 "`) from both the original clause and the suggestion so it's never part of the redline swap, then replace `finding.originalClause` with the reassembled suggestion inside `documentText` via a plain string `replace`.
4. Upsert an entry in `appliedRedlines` keyed by the clause body (replaces any existing entry for the same clause rather than duplicating).
5. Clear the comment draft for that finding.

There is no separate status field — a finding's status is implicit: present in `appliedRedlines` (Applied), present in `resolvedFindingIds` (Resolved tab), or neither (Needs review, not yet applied).

### Document viewer wiring
- `text={documentText}` (live, mutates on apply) / `originalText={SAMPLE_DOCUMENT_TEXT}` (baseline for diffing).
- `appliedRedlines={appliedRedlines}` — renders applied tracked changes inline.
- `highlights` — **all** findings' `{ text: originalClause, level }`, so every finding's clause is passively marked regardless of selection.
- `highlightText` — the active finding's applied redline text if one exists, else its `originalClause`; only set while a finding is expanded, otherwise `undefined`.
- `highlightLevel` — the active finding's highlight level (distinct from the passive `highlights` list; drives the "selected" highlight styling).
- `commentThread={documentComments}` / `onCommentSubmit={addDocumentComment}` — lets a user add a comment directly from the document, independent of any finding.

### Redline color and interaction system
- **Passive highlight** (clause markers for all findings, unselected) — severity-keyed CSS vars: `--color-redline-highlight-high/medium/low`, each a `color-mix()` of the matching content-status color at 20–30% over transparent.
- **Suggestion textarea redline preview** (read-only state): deletions struck through in `--color-redline-delete`, insertions in `--color-redline-add`, unchanged text in `--color-content-primary`.
- **Click-to-edit:** clicking the suggestion textarea switches it into a fully editable field — deletions hidden, insertions become plain text, and the "AI" badge becomes **Revert to AI**.
- **Apply** inserts the resolved suggestion directly into `documentText`; the `DocumentViewer`'s `appliedRedlines` prop renders it as a tracked change in the document pane.

### Side panel (linked source viewer)
- Opens when `selectedSource` is set. Header: `source.label` as title (icon `DocumentText`, colored `--color-content-secondary`), an **Open** button in the top-left (currently a no-op placeholder — there's no real destination for the mock source data), and a close (×) button top-right. No divider between the top bar and the title, and no accordion in the body.
- Body renders the source's full `documentContent` as a bordered "document" card, with the matching `excerpt` substring highlighted via `<mark>` (`color-mix(in srgb, var(--color-content-search-highlight) 20%, transparent)`).

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
- **`review.jsx`**: `finding.comment` (seed comment copy) and `finding.recommendations` exist in the data model but are not rendered anywhere.
- **`review.jsx`**: the `SidePanel`'s **Open** button has no real destination — the mock source data has no URL/document id to open to.
- **Document mismatch**: `guidance.jsx`/`loading.jsx` show a short 4-clause sample contract; `review.jsx` shows a longer, unrelated 6-section sample agreement. They are not the same document.
- **All three screens** use hardcoded local sample data — no file upload is actually analyzed, no backend/API call is made, and no state is shared or persisted across screens (routing changes the URL/screen only, not any data).
