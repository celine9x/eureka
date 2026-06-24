# Contractual Clause Management â€” Feature Guide

> **Purpose:** This document is the single source of truth for building a prototype of the Contractual Clause feature. It covers feature context, all validity date scenarios, milestone mode scenarios, business rules, status logic, and UI interaction rules. Use this as the primary reference when generating or reviewing any code, prototype, or spec related to this feature.

---

## 1. Feature Context

### What we are building
A centralized hub for Alliance Managers (AMs) to log, track, and manage contractual clauses attached to partnership agreements. The goal is to replace manual spreadsheets (e.g., non-compete trackers) with a structured, alerting-capable system.

### Primary user
**Alliance Manager (AM)** â€” logs clauses, monitors their status, and receives alerts when clause conditions change.

### Secondary users
Legal contributors, BD, Strategy â€” read-only access based on agreement-level permissions.

### Core value
- Know critical constraints per agreement without reading full documents
- Act on clauses confidently without checking Legal every time
- Share visibility across teams via role-based access
- Receive timely alerts when clause statuses change

### Clause statuses
| Status | Meaning |
|---|---|
| Pending | Clause exists but the effective date has not been reached yet, or no effective date set |
| Active | Current date is on or after the effective date (and before expiration if set) |
| Expired / Terminated | Past expiration date, or agreement was terminated |
| Breached | Manually flagged |

### In scope (v1)
- Manual entry of clauses
- Configurable clause types per customer (default templates provided)
- Status automation: Pending â†’ Active â†’ Expired/Terminated
- Alerting to clause owner, agreement owner, and alliance owner on status change
- Role-based visibility: users see clauses if they have access to the parent agreement

### Out of scope (v1)
- Automated clause extraction from documents
- Legal ownership and interpretation
- Linking clauses to obligations (except via milestone events)
- Advanced dashboards and risk scoring

---

## 2. Key Concepts

### Validity Dates
Each clause has two optional date fields:
- **Effective date** â€” when the clause becomes active
- **Expiration date** â€” when the clause stops being active

Each field has an **alignment toggle**:
- Toggle **OFF** â†’ the AM enters the date manually on the clause
- Toggle **ON** â†’ the date is inherited from the parent agreement and is **read-only** on the clause

> **Default:** Both alignment toggles are **ON by default** when creating a new clause. The AM must explicitly turn them OFF to enter manual dates.

### Milestone Mode
A toggle in the Validity Dates section. When ON, the clause status and effective date are controlled by a linked milestone (existing or new), not by a manually entered date.

### Termination Checkbox
`Terminate clause when agreement is terminated` â€” when checked, if the parent agreement is terminated, the clause status immediately becomes Terminated regardless of its dates.

---

## 3. Validity Date Scenarios (Milestone toggle OFF)

These are the four core cases the system must handle when milestone mode is not active.

---

### Case 1 â€” No Validity Date
**Condition:** Both effective date and expiration date fields are empty. Both alignment toggles are OFF.

**Form state:**
- Effective date: `Select date` (empty, editable)
- Toggle: "Align with agreement effective date: Jan 1, 2026" (OFF)
- Expiration date: `Select date` (empty, editable)
- Toggle: "Align with agreement expiration date: Dec 1, 2036" (OFF)

**Status implications:**
- The status will **never** become Active â€” always stays Pending
- The clause **cannot** expire (no expiration set)
- The clause will terminate with the agreement (if termination checkbox is checked)

---

### Case 2 â€” Effective Date Set, No Expiration Date
**Condition:** The AM has set an effective date (either manually or via toggle). The expiration date field is empty and the expiration toggle is OFF.

**Form state:**
- Effective date: `Jan 1, 2026` (filled â€” toggle ON, aligned with agreement)
- Toggle: "Align with agreement effective date: Jan 1, 2026" (ON â†’ field is READ-ONLY)
- Expiration date: `Select date` (empty, editable)
- Toggle: "Align with agreement expiration date: Dec 1, 2036" (OFF)

**Status implications:**
- Status is Pending before Jan 1, 2026; Active on or after Jan 1, 2026
- The clause **cannot** expire (no expiration defined)
- The clause terminates manually or with the agreement

---

### Case 3 â€” Expiration Date Set, No Effective Date
**Condition:** The AM has removed the effective date (toggle OFF, field empty) but has entered an expiration date manually.

**Form state:**
- Effective date: `Select date` (empty, editable)
- Toggle: "Align with agreement effective date: Jan 1, 2026" (OFF)
- Expiration date: `Dec 1, 2041` (filled manually â€” NOT aligned with agreement)
- Toggle: "Align with agreement expiration date: Dec 1, 2036" (OFF)

**Status implications:**
- Status will **always** be Pending â€” can never become Active (no effective date)
- The clause expires on Dec 1, 2041
- The clause terminates manually or with the agreement

---

### Case 4 â€” Both Dates Aligned, Agreement Dates Not Yet Defined
**Condition:** Both alignment toggles are ON, but the parent agreement has no effective or expiration date set yet. The toggles bind to future values.

**Form state:**
- Effective date: `Select date` (empty, read-only)
- Toggle: "Align with agreement effective date **when it is defined**" (ON)
- Expiration date: `Select date` (empty, read-only)
- Toggle: "Align with agreement expiration date **when it is defined**" (ON)

**Status implications:**
- Status will always be Pending and can never be Active (until agreement dates are set)
- When the agreement dates are eventually added, the clause effective and/or expiration dates are added automatically
- The clause terminates manually or with the agreement if/when dates are added

---

## 4. Milestone Mode Scenarios (Milestone toggle ON)

When the Milestone toggle is enabled, the validity date panel transforms into a **Milestone and obligations** section. The clause status and effective date are fully controlled by the linked milestone.

> Rule: When milestone mode is ON, the effective date is ALWAYS derived from the milestone â€” it is never manually editable.

---

### Milestone Case 1 â€” No Milestone Selected (empty state)
**Condition:** Milestone toggle is ON but no milestone has been selected yet.

**Form state:**
- Tab selector: `Existing milestone` | `New milestone` (Existing milestone active)
- Milestone title: `Select milestone` (dropdown, empty)
- Termination: "Terminate clause when agreement is terminated" (checked)
- No effective date or expiration date shown yet

---

### Milestone Case 2 â€” Existing Milestone Selected
**Condition:** AM selects an existing milestone from the agreement.

**Form state:**
- Tab: `Existing milestone` (active)
- Selected milestone: e.g., "Agreement signature" â€” Jan 1, 2030 â€¢ On Track
- Contractual clause active: `90` `Days` after the milestone is successful
- Info hint: "The contractual clause owner will also be assigned as the milestone owner"
- Effective date: `Apr 30, 2030` â€” **READ-ONLY**, automatically calculated as: `milestone forecasted date + delay`
- Expiration date: `Select date` (editable by AM)
- Toggle: "Align with agreement expiration date: Dec 1, 2036" (OFF â€” AM can turn ON)
- Termination: checked

**Effective date calculation:** `milestone forecasted date + contractual clause active delay`
> Example: Jan 1, 2030 + 90 days = Apr 30, 2030

---

### Milestone Case 3 â€” Create New Milestone (empty)
**Condition:** AM selects "New milestone" tab but has not filled in milestone details yet.

**Form state:**
- Tab: `New milestone` (active)
- Milestone title: empty placeholder (required)
- Forecasted date: `Select date` (required)
- Milestone description: empty (optional, rich text)
- Contractual clause active: `0` `Days` after the milestone is successful
- Effective date: `Defined by the milestone date` â€” **READ-ONLY**, placeholder text (greyed)
- Expiration date: `Select date` (editable)
- Toggle: "Align with agreement expiration date: Dec 1, 2036" (OFF)
- Termination: checked

---

### Milestone Case 4 â€” Create New Milestone (filled)
**Condition:** AM has filled in all new milestone fields.

**Form state:**
- Tab: `New milestone` (active)
- Milestone title: filled (e.g., "Milestone title")
- Forecasted date: `Jan 1, 2027` (filled)
- Milestone description: optional
- Contractual clause active: `30` `Days` after the milestone is successful
- Effective date: `Apr 30, 2030` â€” **READ-ONLY**, auto-calculated
- Expiration date: `Dec 1, 2036` (filled)
- Toggle: "Align with agreement expiration date: Dec 1, 2036" (ON â†’ expiration field READ-ONLY)
- Termination: checked

---

## 5. Business Rules

### 5.1 Date Field Edit Rules â€” Soft-Decouple Pattern

The alignment toggle is a **convenience pre-fill**, not a hard lock. The date field remains editable even when the toggle is ON, but editing it automatically turns the toggle OFF (decoupling the clause from the agreement).

| Toggle state | Field behavior | Who controls the date |
|---|---|---|
| OFF | Editable date picker | Clause owner, directly on clause |
| ON (agreement date exists) | Editable, pre-filled from agreement; editing auto-flips toggle to OFF | Initially the agreement; clause owner can override |
| ON (agreement date not yet defined) | Editable, empty; shows "when it is defined"; editing auto-flips toggle to OFF | Agreement (future) unless clause owner overrides first |
| Milestone mode ON | Effective date is read-only in raw form, but the **delay** is editable â€” changing the delay recomputes the date | Milestone forecasted date + delay (adjust delay to change the effective date) |

**The soft-decouple rule:**
> When the AM edits a date field while its alignment toggle is ON, the toggle automatically flips to OFF. This signals "this date is now independently managed by the clause owner." No manual toggle step is required.

**Why this pattern:**
- The clause owner may not have edit permission on the parent agreement, making a hard lock inaccessible to them
- It preserves flexibility for clauses that need a slightly different date from the agreement (legal nuances, clause-specific constraints)
- The toggle remains a clear **source indicator**: ON = date comes from agreement, OFF = date is independently set on the clause

**Agreement date change propagation after a manual override:**
- If the AM has edited the date (toggle is now OFF), a subsequent change to the agreement date does **not** propagate to that clause â€” the clause owner's override is respected
- Only clauses where the toggle is still ON receive automatic updates from the agreement

**To re-link a clause to the agreement date:**
The AM can turn the toggle back ON at any time. This re-populates the field with the current agreement date and re-enables automatic propagation.

### 5.2 Status Calculation Rules

| Effective date | Expiration date | Status behavior |
|---|---|---|
| Not set | Not set | Always Pending, never Active, never Expires |
| Set | Not set | Pending until effective date, then Active indefinitely |
| Not set | Set | Always Pending (never Active), Expires on expiration date |
| Set | Set | Pending â†’ Active (at effective date) â†’ Expired (at expiration date) |

### 5.3 Termination Rule
- If "Terminate clause when agreement is terminated" is checked (default: checked):
  - When the parent agreement is terminated â†’ clause status immediately becomes **Terminated**
  - This overrides any date-based status logic

### 5.4 Agreement Date Change Propagation

**Normal case:** If the agreement's effective or expiration date changes and the clause alignment toggle is ON â†’ the clause date auto-updates to match.

**Conflict case (critical):** If the agreement's expiration date changes to a date **before** the clause's effective date:
- Do **NOT** auto-update the clause expiration date (this would create an invalid state)
- **Leave the effective date unchanged**
- Show an **error/warning in the hub** on that clause's date
- The system prioritizes the effective date to maximize the chance the clause stays in an "active" or actionable state

### 5.5 Date Validation Rules
- Expiration date **cannot** be set to a date before the effective date
- This restriction is enforced in the date picker (dates before effective date are not selectable)
- Behavior mirrors the agreement's own date validation

### 5.6 Milestone Mode Rules
- When milestone toggle is ON: the clause status and dates are managed by the milestone automatically
- The AM must choose either an **existing milestone** (from the agreement's milestone list) or create a **new milestone** inline
- The milestone owner = the contractual clause owner (auto-assigned, shown as info hint)
- The effective date = `milestone forecasted date + contractual clause active delay`
- The delay unit can be Days, Weeks, or Months
- The expiration date in milestone mode is still independently settable (manually or via agreement alignment toggle)
- When "New milestone" is created from the clause form, it is saved as a milestone on the parent agreement

---

## 6. Conditional Rules & All Error States

### 6.0 Source â€” Figma conditional rules (verbatim)
These rules were defined in the design file and must be treated as authoritative:

1. **Agreement expiration conflict:** If the expiration date of the agreement changes so that it is before the effective date of the Contractual clause â†’ leave the effective date as is and add an error/warning on the date in the hub.
2. **Status priority:** The status of the Contractual clause will prioritise the effective date to increase the odds that it stays as "active" or in an actionable state.
3. **Date picker guard:** Expiration date in the Contractual clause form cannot be before the effective date. This is enforced at the date picker level (dates are not available to select) â€” the design must match agreement behaviour.

---

### 6.1 Error State Taxonomy

Errors fall into four levels:

| Level | Where shown | Blocks saving? | Triggered by |
|---|---|---|---|
| **Preventive** | Date picker (unavailable dates) | Yes â€” silently | AM tries to pick an invalid date |
| **Inline form warning** | Inside the form/modal, near the field | No (warning) or Yes (blocker) | Computed conflict in the form |
| **Hub warning** | On the clause card in the hub/list view | No | External date change propagated in |
| **Informational** | Below the date field or as a status implication | No | Valid but edge-case configuration |

---

### 6.2 All Error States

---

#### Error 1 â€” Expiration before effective date (direct form entry)
**Trigger:** AM tries to select an expiration date that falls before the currently set effective date.

**Level:** Preventive â€” date picker

**Behavior:**
- Dates before the effective date are not selectable in the expiration date picker
- No error message needed â€” the UI prevents it silently
- Mirrors the same restriction on the parent agreement form

**Applies to:** Clause creation form, Edit validity dates modal

---

#### Error 2 â€” Agreement expiration date propagates to before clause effective date
**Trigger:** The parent agreement's expiration date is updated to a date earlier than the clause's effective date, AND the clause's expiration alignment toggle is ON.

**Level:** Hub warning (passive, on the clause card)

**Behavior:**
- The clause expiration date is **NOT** auto-updated (would create an invalid state)
- The clause effective date is left unchanged
- An **error/warning is displayed on the clause card** in the hub view
- Clause status continues to prioritize the effective date â€” the clause stays Active if it was Active
- The AM must manually resolve: go to the agreement and fix the agreement date, or turn the clause's expiration toggle OFF and set a valid manual date

**Visual:** Error/warning indicator on the clause date row in the hub

**Applies to:** Hub/list view, clause detail view

---

#### Error 3 â€” Agreement effective date propagates to after clause expiration date
**Trigger:** The parent agreement's effective date is updated to a date later than the clause's expiration date, AND the clause's effective alignment toggle is ON.

**Level:** Hub warning (passive, on the clause card)

**Behavior:**
- The clause effective date is **NOT** auto-updated (would make expiration < effective)
- The clause expiration date is left unchanged
- An **error/warning is displayed on the clause card** in the hub view
- The clause stays in its current status; the conflict is flagged for the AM to resolve

**Applies to:** Hub/list view, clause detail view

---

#### Error 4 â€” Re-linking toggle causes a conflict
**Trigger:** The AM turns an alignment toggle back ON after having a manually set date, and the current agreement date would conflict with the other date field on the clause.

**Example:** Clause effective date = March 1, 2027. AM re-enables the expiration alignment toggle. Agreement expiration = Feb 1, 2027. This would set expiration before effective.

**Level:** Inline form warning â€” shown before the toggle change is saved

**Behavior:**
- Show a warning message inline (e.g., "The agreement expiration date [Feb 1, 2027] is before this clause's effective date [Mar 1, 2027]. Re-linking will create a conflict.")
- Let the AM choose: cancel (keep current state) or proceed (accept and surface the hub warning)
- If AM proceeds â†’ the conflict is recorded and the hub warning (Error 2 or 3) is shown

**Applies to:** Edit validity dates modal

---

#### Error 5 â€” Milestone computed effective date exceeds expiration date (in-form)
**Trigger:** In milestone mode, the calculated effective date (`milestone forecasted date + delay`) falls after the clause's set expiration date.

**Example:** Milestone date = Jan 1, 2030. Delay = 90 days â†’ effective = Apr 30, 2030. Expiration = Mar 1, 2030. Effective > Expiration.

**Level:** Inline form warning (non-blocking â€” AM can still save, but must acknowledge)

**Behavior:**
- Show an inline warning near the effective date field: "The effective date [Apr 30, 2030] is after the expiration date [Mar 1, 2030]. The clause will never become Active."
- Do not block saving, but make the conflict visible
- Status implication: clause will stay Pending and immediately Expire on the expiration date

**Applies to:** Clause creation form, Edit validity dates modal (milestone mode)

---

#### Error 6 â€” Milestone forecasted date shifts, pushing computed effective date past expiration
**Trigger:** An existing milestone's forecasted date is updated on the agreement level, which causes the clause's computed effective date to shift past its expiration date.

**Level:** Hub warning (passive, on the clause card)

**Behavior:**
- Same pattern as Error 2 â€” the conflict is detected on propagation, not blocked
- Error/warning displayed on the clause card in the hub
- Clause stays in current status; AM must resolve

**Applies to:** Hub/list view, clause detail view

---

#### Error 7 â€” Agreement adds a first-time date that conflicts with existing clause date
**Trigger:** Clause was created with toggle ON ("when it is defined"). The parent agreement later adds a date for the first time, and that date conflicts with the other date already set on the clause.

**Example:** Clause has manual expiration = Jan 1, 2025, and effective toggle is ON "when it is defined". Agreement adds effective date = Jun 1, 2025. Now effective > expiration.

**Level:** Hub warning (passive, on the clause card)

**Behavior:**
- The newly added agreement date IS applied to the clause (the toggle was ON waiting for it)
- But the conflict with the existing other date is flagged as a hub warning
- AM must resolve

**Applies to:** Hub/list view, clause detail view

---

### 6.3 Informational States (non-error, but must be shown)

These are valid configurations, not errors. The UI should surface them as status implications or helper text so the AM understands what will happen.

| Configuration | Informational message |
|---|---|
| No effective date, no expiration date | "This clause will always remain Pending and can never become Active." |
| Effective date set, no expiration date | "This clause will become Active on [date] and will never expire." |
| No effective date, expiration date set | "This clause will always remain Pending. It expires on [date]." |
| Both dates set, effective date in the past | "This clause is immediately Active." |
| Both dates set, both dates in the past | "This clause is already Expired." |
| Both dates set, expiration date in the past at creation | Warning: "The expiration date is in the past. This clause will be immediately Expired upon saving." |
| Milestone mode, milestone not yet successful | "This clause will become Active [N] days after the milestone is marked successful." |

---

## 8. UI Interaction Rules

### Alignment toggle behavior
- Toggle label when agreement date IS defined: `"Align with agreement effective date: Jan 1, 2026"`
- Toggle label when agreement date is NOT defined: `"Align with agreement effective date when it is defined"`
- Toggle ON â†’ date input becomes disabled/read-only (visually grayed, no date picker interaction)
- Toggle OFF â†’ date input becomes an editable date picker

### Date field states
| State | Visual |
|---|---|
| Empty, editable | `Select date` placeholder, active date picker |
| Filled, editable | Shows date, active date picker with clear (Ã—) button |
| Filled, read-only (toggle ON) | Shows date, no interaction, no clear button |
| Filled, read-only (milestone) | Shows "Defined by the milestone date" or computed date, grayed, with clear (Ã—) to remove milestone |

### Milestone mode panel
- Replaces the individual date inputs with a "Milestone and obligations" card
- Contains: tab switcher (Existing / New), milestone selector or creation form, delay input
- Effective date rendered below the card as a separate read-only field
- Expiration date remains below effective date, independently editable

### Termination checkbox
- Default: checked
- Appears at the bottom of the Validity dates section in all states

---

## 9. Prototype Implementation Notes

When building the prototype, implement the following logic:

1. **State-driven form rendering** â€” the validity dates section has distinct render states based on:
   - Milestone toggle: ON / OFF
   - Effective date: set / not set / aligned
   - Expiration date: set / not set / aligned
   - Agreement dates: defined / not yet defined

   **Initial state (new clause):** Both alignment toggles are ON. If the agreement has dates defined, the date fields are pre-filled and read-only. If not, they show empty with "when it is defined" toggle labels.

2. **Edit modal â€” milestone mode:** The "Edit validity dates" modal for a clause in milestone mode must **not** show only a disabled effective date field. Two acceptable implementations:
   - **(Preferred)** Show the milestone delay control in the modal (`N Days/Weeks/Months after the milestone is successful`). The effective date remains read-only but recomputes when the delay changes. The milestone relationship is preserved.
   - **(Fallback)** Make the effective date directly editable. Editing it triggers the soft-decouple pattern â€” milestone date-binding is broken and the toggle/link is cleared. Show a clear visual warning that the milestone link will be removed.
   
   A disabled field with no controls and no alternative path is a dead end â€” the AM must always have a way to adjust validity dates after creation.

3. **Effective date computation** â€” in milestone mode: `effective date = milestone forecasted date + delay (in selected unit)`. Recompute reactively whenever the forecasted date or delay changes.

4. **Conflict detection** â€” when agreement expiration date propagates and would fall before the clause effective date: surface a visible error/warning on the clause card in the hub view. Do not silently update the date.

5. **Status recomputation** â€” clause status is derived, never manually set in normal flow. Recompute from: effective date, expiration date, current date, and termination event. Status = Pending / Active / Expired / Terminated / Breached.

6. **Toggle label is dynamic** â€” check whether the parent agreement has a defined effective/expiration date. If not, append "when it is defined" to the toggle label.

7. **New milestone creation** â€” when AM creates a new milestone from the clause form, treat it as a milestone record creation on the agreement. The clause's effective date remains read-only and recalculates when the forecasted date or delay changes.

---

## 10. Figma Reference

Design file: [UI â€” Contractual Clauses](https://www.figma.com/design/N4U8dWhQVBNwhfX5Wydy2E/%E2%9C%85-UI---Contractual-clauses?node-id=4634-72603)

Key frame: `node-id=4634-72603` â€” Validity date scenarios (all cases including milestone mode)

