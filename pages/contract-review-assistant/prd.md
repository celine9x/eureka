# PRD: Contract review assistant (current prototype behavior)

This document describes the **actual behavior implemented** in the three prototype screens — `guidance.jsx`, `loading.jsx`, `review.jsx` — as a single source of truth. It replaces the earlier goal-oriented PRD and the separate `code.md` notes; both are folded in below.

## Flow

> **Setup (`guidance.jsx`) → Analysis in progress (`loading.jsx`) → Findings & review (`review.jsx`)**

All three screens share the same shell:

- `SideMenu` — collapsed, expands on hover, with the standard workspace/directory nav and a hardcoded user (Linh Nguyen).
- `HubHeader` — **Back** button + **Alliance name** title on the left; **Save and close** and **Export** buttons on the right.
- A 12-column grid (`main`) with content occupying columns 2–11: a `DocumentViewer` pane (6 of 10 inner columns) on the left and a `CreationFormPanel` pane (4 of 10) on the right.

There is currently **no wiring between the three screens** — each renders in isolation with its own local/sample data, and none of them navigates to the next (see [Known gaps](#known-gaps--not-yet-wired)).

---

## Screen 1 — Review setup (`guidance.jsx`)

### Document viewer (left)
- Renders a short static sample contract (`SAMPLE_DOCUMENT_TEXT`), `editable`, with toolbar and edit toolbar shown.
- No highlights, no redlines — this is a plain read/edit view of the contract before analysis.

### Form panel (right) — `CreationFormPanel title="Contract review"`
- Info message: *"Inaccuracies may occur with AI. Please review carefully."*
- Heading **"Review guidance"** + subtext *"Redlines the contract against your selected guidance and instructions."*
- **Accordion — "Alliance post-mortems"** (size `sm`, header checkbox, badge `3/3`):
  - Two rows, each a checkbox (default selected) + `Link` (icon leading `DocumentText`, icon trailing external-link) labeled "Alliance mortems name", opening the source in a new context.
- **Accordion — "Linked open risks"** (size `sm`, header checkbox, badge `3/4`):
  - Two rows, same structure, labeled "Linked risk name".
- **"Additional files for context"** — label + secondary **Browse files** button (icon `ArrowUpTray`). No uploaded-file list is rendered.
- Free-text instructions: `Textarea` label "Default", placeholder "Enter your message...".
- Footer CTA: **Run review** — AI-styled secondary button (icon `Sparkles`, size `lg`, full width).

---

## Screen 2 — Analysis in progress (`loading.jsx`)

### Document viewer (left)
- Same static `SAMPLE_DOCUMENT_TEXT`, `editable`, toolbar shown — identical to Screen 1. No highlights.

### Form panel (right) — `CreationFormPanel title="Contract review"`, footer hidden
- `EmptyState`: title **"Reviewing"**, description *"The AI is currently reviewing the uploaded contract. Please wait for the process to complete."*, illustration `Detect AI.svg`, no action button.
- `ProgressIndicator`:
  - Value animates 0 → 100 over a fixed **5000 ms** via `requestAnimationFrame` (purely client-side simulation, not tied to a real analysis job or API call).
  - `usePhaseMode` with 4 phases labeled "Phase 1"–"Phase 4".
  - Label position `right`, value formatted as a rounded `%`.

---

## Screen 3 — Findings & review (`review.jsx`)

### Document text
- Uses a longer, more complete sample agreement (its own `SAMPLE_DOCUMENT_TEXT`, distinct from Screens 1–2) with numbered clauses (Definitions, License Grant, Governance, Term and Termination, IP, Confidentiality) so each finding can anchor to a real clause.

### Findings data model (`FINDINGS`)
Each finding object has:

| Field | Purpose |
|---|---|
| `id` | Unique key |
| `title` | Clause reference + issue name, e.g. *"4.1 Termination: missing transition support and cost recovery"* |
| `severity` / `severityVariant` | `High` / `Moderate` / `Low`, mapped to chip color `warning` / `neutral` / `positive` |
| `reason` | One-paragraph explanation shown under "Reason" |
| `originalClause` | Exact source text — used both to highlight the clause in the document and as the string replaced when a redline is applied |
| `highlightLevel` | `high` / `medium` / `low` — drives the highlight color in the document |
| `sources[]` | `{ label, summary, excerpt, documentContent }` — rendered as a link + summary + excerpt under "Sources"; `documentContent` is shown in the `SidePanel` when the source link is clicked |
| `suggestion` | The AI-proposed redline text |
| `comment` | Seed/default comment copy — **present in data but not currently rendered anywhere in the UI** |
| `recommendations[]` | Bullet list of follow-ups — **present in data but not currently rendered anywhere in the UI** |

Findings are sorted High → Moderate → Low (`SEVERITY_ORDER`) into `ORDERED_FINDINGS` before rendering; there is no re-sort/filter/search control in this prototype.

### Component state
- `currentIndex` — 1-based index of the "active" finding; drives which clause is treated as selected even when its accordion is collapsed.
- `expandedFindingId` — which finding's accordion is open (controls whether detail content, including the active document highlight, is shown).
- `suggestionDrafts` — per-finding edited suggestion text (defaults to `finding.suggestion` until the user edits it).
- `commentDrafts` — per-finding draft comment text.
- `selectedSource` — the source currently shown in the `SidePanel`.
- `documentText` — the live, mutable contract text (starts equal to the sample text; mutated when a redline is applied).
- `documentComments` — comments attached to spans of text.
- `appliedRedlines` — list of `{ originalText, proposedText, commentId }` recorded once **Apply** is used.

### Findings list (right panel)
- `CreationFormPanel` header badge shows the total finding count.
- Each finding renders as a vertical `Accordion`:
  - Header: `finding.title` + right-aligned `Chip` with severity label/color.
  - Clicking the header (`onHeaderClick`) sets `currentIndex` to that finding **and** sets `expandedFindingId` to its id (this both expands the row and makes it the "active" document highlight). Toggling the accordion open/closed independently updates `expandedFindingId` via `onToggle`.
  - **Expanded content:**
    1. **Reason** — `finding.reason`.
    2. **Sources** — one card per source: bordered/background block with a `Link` (opens the `SidePanel` with `source.documentContent`), `source.summary`, and `source.excerpt` (rendered as a left-bordered quote).
    3. **Suggestion** — `Textarea variant="ai"`: `aiValue={finding.suggestion}`, `originalValue={finding.originalClause}`, `showRedlinePreview`. Bound to `suggestionDrafts[finding.id]`; clicking **Revert to AI** resets the draft back to `finding.suggestion`.
    4. **Comment** — plain `Textarea`, placeholder "Leave your comment", bound to `commentDrafts[finding.id]`.
    5. **Actions** — **Dismiss** (secondary, destructive) and **Apply** (primary).

### "Dismiss" behavior (as implemented)
Only collapses the accordion (`setExpandedFindingId(null)`). It does **not** set a dismissed status, capture a reason, or persist any record — this is a placeholder, not the full dismiss flow described in the goal-state PRD.

### "Apply" behavior (`handleApplyFinding`)
1. Resolve the suggestion text: edited draft if present, otherwise `finding.suggestion`.
2. Call `addDocumentComment` with the current comment draft (if the draft is empty after trimming, no comment is created — `addDocumentComment` returns `null` and is skipped).
3. Replace `finding.originalClause` with the resolved suggestion inside `documentText` via a plain string `replace`.
4. Upsert an entry in `appliedRedlines` keyed by `originalText` (replaces any existing entry for the same clause rather than duplicating).
5. Clear the comment draft for that finding.

There is no status field on findings (e.g. Open/Applied/Dismissed) in this prototype — status is only implicit in whether an `appliedRedlines` entry exists for that clause.

### Document viewer wiring
- `text={documentText}` (live, mutates on apply) / `originalText={SAMPLE_DOCUMENT_TEXT}` (baseline for diffing).
- `appliedRedlines={appliedRedlines}` — renders applied tracked changes inline.
- `highlights` — **all** findings' `{ text: originalClause, level: highlightLevel }`, so every finding's clause is passively marked in the document regardless of selection.
- `highlightText` — the active finding's applied redline text if one exists, else its `originalClause`; only set while a finding is expanded (`expandedFindingId` truthy), otherwise `undefined` (no active/scrolled highlight).
- `highlightLevel` — the active finding's `highlightLevel`, distinct from the passive `highlights` list (drives the "selected" highlight styling).
- `commentThread={documentComments}` / `onCommentSubmit={addDocumentComment}` — lets a user add a comment directly from the document, independent of any finding.

### Redline color and interaction system
- **Passive highlight** (clause markers for all findings, unselected) — severity-keyed CSS vars:
  - `--color-redline-highlight-high`: `color-mix(in srgb, var(--color-content-negative) 30%, transparent)`
  - `--color-redline-highlight-medium`: `color-mix(in srgb, var(--color-content-warning) 30%, transparent)`
  - `--color-redline-highlight-low`: `color-mix(in srgb, var(--color-content-positive) 30%, transparent)`
- **Suggestion textarea redline preview** (read-only state):
  - Deleted text → `--color-redline-delete` (`var(--color-content-negative)`), struck through.
  - Inserted text → `--color-redline-add` (`var(--color-content-positive)`).
  - Unchanged text → `--color-content-primary`.
  - The container sizes to fit content.
- **Click-to-edit:** clicking the suggestion textarea switches it from the read-only redline-preview render into a fully editable textarea: all text becomes plain `--color-content-primary`, the struck-through deletion is hidden, the insertion becomes normal editable text, and the "AI" badge becomes a **Revert to AI** button — standard `Textarea` behavior once the field has focus/edits.
- **Apply** inserts the resolved suggestion directly into `documentText` as the new clause text (via `handleApplyFinding`); the `DocumentViewer`'s `appliedRedlines` prop is what renders it as a tracked change in the document pane.

### Side panel
- Opens when `selectedSource` is set; title = `source.label` (icon `DocumentText`); single section **"Document content"** rendering `source.documentContent`.

---

## Known gaps / not yet wired

These reflect the current code, not the eventual target experience:

- **`guidance.jsx`**: `guidanceChecked` / `riskChecked` state and the derived `selectedGuidanceCount` / `selectedRiskCount` are computed but not connected to the rendered accordion checkboxes or badges — the badges are hardcoded (`3/3`, `3/4`) and each row's checkbox uses its own inline `defaultSelected` plus a `console.log`, not the outer state.
- **`guidance.jsx`**: the free-text instructions `Textarea` and **Browse files** button aren't wired to any state; **Run review** has no `onClick` / navigation to `loading.jsx`.
- **`loading.jsx`**: progress is a fixed 5-second client-side animation, not connected to a real analysis job, and there is no automatic or manual transition into `review.jsx` once it completes.
- **`review.jsx`**: `finding.comment` (seed comment copy) and `finding.recommendations` exist in the data model but are not rendered anywhere.
- **`review.jsx`**: **Dismiss** only collapses the accordion — no status, reason capture, or persistence.
- **All three screens** use hardcoded local sample data — no file upload, no backend/API call, and no state is shared or persisted across screens.
