# PRD: Contract review assistant

## Overview

### Product name
**Contract review assistant**  


### Summary

contract review assistant helps alliance managers identify, assess, and resolve commercial and legal risks in agreements before execution. The user selects the risk checks to run, optionally supplies relevant reference documents and instructions, and starts an AI analysis.

The system returns a prioritized list of findings. Selecting a finding navigates the user to the relevant contract clause, highlights the implicated text, explains why it was flagged, and offers an AI-generated redline or recommended action. The user can apply, edit, dismiss, each finding while retaining a complete review trail.

The primary interaction model is:

> **Findings list for navigation → document as source of truth → detail card for decision and action**

---

## Problem

Alliance managers frequently review partner agreements that contain risks outside of purely legal issues, including unfavorable commercial commitments, unclear governance, imbalanced obligations, financial exposure, exclusivity constraints, restrictive terms, missing protections, and terms that conflict with internal partner policies.

Today, review is often fragmented:

- The manager reads long contracts manually and may miss material obligations or deviations.
- Legal review may be required for issues that could be identified and prepared earlier.
- Commercial, market, and partner-policy guidance exists in separate documents and is not consistently applied.
- Review feedback is communicated through comments, email, and redlines without a centralized risk record.
- Users may receive a large set of AI findings but lack an efficient way to connect each finding to the source clause and act on it.

The feature should make contract review faster and more consistent without removing human judgment. It must help alliance managers understand **what is risky, why it matters, and what action to take**.

---

## Goals

### Primary goals

- Identify contract terms that conflict with selected alliance, commercial, legal, and policy-based risk checks.
- Allow alliance managers to tailor each analysis to the specific partnership, market, or negotiation.
- Present findings in a prioritized, scannable list.
- Connect every finding to the exact relevant location in the contract.
- Allow users to apply AI-suggested edits as tracked changes.
- Preserve reviewer control: users can modify, dismiss, or manually resolve suggestions.
- Create an auditable record of detected findings, user decisions, applied changes, and review status.
- Reduce time spent locating and interpreting material contract risks.

### Success criteria

The feature is successful when an alliance manager can:

1. Upload or open an agreement.
2. Choose relevant risk checks.
3. Add policies, market guidance, or negotiation instructions.
4. Run analysis.
5. Review prioritized findings in context.
6. Apply or resolve findings with clear status tracking.
7. Export or hand off a redlined agreement.

---

## Non-goals

The initial version will not:

- Replace legal counsel or provide definitive legal advice.
- Automatically execute or send a contract for signature.
- Automatically accept all redlines without a human review.
- Negotiate directly with a counterparty.
- Guarantee that every legal, financial, regulatory, or commercial risk is detected.
- Rewrite an entire agreement without an explicit user request.
- Replace the organization’s formal legal-approval workflow.
- Automatically advance to the next issue in every circumstance without a user-controlled preference.

---

## Users and Jobs to Be Done

### Primary user: Alliance Manager

The alliance manager owns or supports a strategic partnership and needs to evaluate whether a proposed agreement aligns with commercial objectives, internal policies, partner strategy, and acceptable risk levels.

### Jobs to be done

- “When I receive a draft agreement from a partner, help me identify the terms that create alliance, commercial, or policy risks.”
- “Help me understand the contract language in context, not just receive a generic warning.”
- “Give me a practical redline or next action so I can move negotiations forward.”
- “Let me use country, market, company, or partnership-specific guidance during review.”
- “Help me escalate only the issues that need legal, finance, leadership, or executive review.”
- “Keep a record of what was found, what changed, and what was intentionally accepted.”

### Secondary users

| User | Primary need |
|---|---|
| Legal counsel | Review material issues, validate or modify proposed language, and approve exceptions |
| Commercial / business owner | Assess financial, pricing, revenue-share, exclusivity, and commitment risks |
| Finance | Review payment, liability, currency, audit, credit, and financial exposure |
| Compliance / policy owner | Confirm that terms align with internal policy and regional requirements |
| Executive approver | Review a concise summary of unresolved high-severity risks and requested decisions |

---

## User Experience

### Review workspace

The workspace contains three primary areas:

| Area | Purpose |
|---|---|
| Contract viewer/editor | Displays the agreement, source text, highlights, and tracked redlines |
| Findings list | Enables scanning, prioritization, filtering, navigation, and status tracking |
| Finding detail panel | Explains the issue, shows the relevant source text, presents suggested edits, and provides resolution actions |

### Layout principle

> The contract remains the source of truth.  
> The findings list is the navigation layer.  
> The detail panel is the decision and action layer.

---

## Analysis Setup

Before initiating analysis, the user can configure the review.

### Risk-check selection

The user can select which risk categories—internally called **strokes**—should be included in the review.

Examples:

- Alliance strategy risk
- Commercial risk
- Financial exposure
- Revenue-share and pricing risk
- Exclusivity and non-compete risk
- Territory or market restriction risk
- Governance and decision-rights risk
- Data-sharing and confidentiality risk
- Intellectual-property ownership risk
- Termination and renewal risk
- Liability and indemnity risk
- Missing required terms
- Policy deviation
- Unusual or non-standard contract language

Each risk type must have an on/off toggle.

### Supporting documents

The user can attach optional reference materials to guide the analysis:

- Standard market agreements
- Approved templates
- Existing partner agreements
- Internal alliance policies
- Negotiation playbooks
- Commercial guidance
- Legal fallback language
- Country- or market-specific rules
- Company policies
- Partner-specific guidance

The system should identify each document by name, type, upload date, and processing status.

### Free-text instructions

The user can enter review instructions in natural language.

Examples:

- “Keep proposed language professional and partner-friendly.”
- “Prioritize protection of revenue share and payment terms.”
- “Avoid exclusivity longer than 12 months.”
- “Escalate any unlimited liability.”
- “Use the attached European market agreement as the commercial benchmark.”
- “Take care of the money.”
- “Flag terms that could create dependency on this partner.”
- “Do not suggest changes to clauses already accepted by Legal.”

### Run analysis

The primary call to action should be:

> **Analyze contract**

Secondary terminology may include **Detect risks** or **Run review**, but the product should use one consistent label across the experience.

When selected, the system should:

1. Validate that a contract is available.
2. Validate that at least one risk check is enabled.
3. Confirm that reference documents are accessible and processed.
4. Start analysis.
5. Show progress and allow the user to continue viewing the agreement while processing.
6. Return findings in a batched, prioritized results set.

---

## Findings Experience

### Findings list

By default, findings are displayed as compact rows rather than fully expanded cards.

Each row includes:

- Severity: Critical, High, Medium, Low, or Informational
- Risk category / stroke
- Short issue title
- One-line explanation
- Contract location, such as “Clause 12.3”
- Status
- Indicator for whether a redline is available
- Indicator for whether the issue originated from a reference document or free-text instruction

### Example row

> **High · Financial risk**  
> Liability cap does not exclude confidentiality breach  
> Clause 12.3 · Redline available · Open

### Finding statuses

| Status | Meaning |
|---|---|
| Open | Identified and not yet resolved |
| In review | Currently being reviewed by a user |
| Applied | AI redline applied without modification |
| Applied — modified | Suggested language was edited before application |
| Dismissed | User decided no action is required |
| Accepted risk | User intentionally accepts the deviation |
| Escalated | Requires input or approval from another stakeholder |
| Resolved manually | User addressed the issue outside the suggested redline |
| Superseded | The finding is no longer applicable after a contract change or re-analysis |

### Findings list behavior

The user can:

- Filter by severity, risk type, status, owner, and redline availability.
- Sort by severity, contract order, category, confidence, and status.
- Search findings by keyword.
- Group findings by severity, clause, risk category, or status.
- Select a finding to navigate to the relevant contract text.
- Select multiple findings for bulk review, bulk dismissal, or bulk application where allowed.
- View progress, such as “12 of 28 open findings resolved.”

---

## Finding Selection and Navigation

When the user selects a finding, the system must:

1. Scroll the contract viewer to the relevant clause.
2. Highlight the exact text span that triggered the finding.
3. Show a selected state in the findings list.
4. Open the finding detail panel.
5. Preserve the user’s place in the findings list.
6. Avoid losing the current document zoom, page position, or active filters.

If the finding relates to omitted language rather than existing language, the system should highlight the closest relevant clause or insertion point and clearly label the finding as **Missing term**.

### Highlight behavior

The highlighted text should:

- Be visually distinct from standard tracked changes.
- Remain visible while the finding is selected.
- Be removable when another finding is selected.
- Be accessible through keyboard focus and screen-reader descriptions.
- Not permanently alter the contract document merely by selecting the finding.

---

## Finding Detail Panel

Only the currently selected finding expands into a detailed card or side panel.

### Finding content

The detail panel includes:

#### 1. Finding title

> **Liability cap does not protect against confidentiality breach**

#### 2. Severity and status

> High severity · Open

#### 3. Why this was flagged

> The agreement limits the partner’s liability for all claims, including potential losses resulting from a confidentiality breach. This may conflict with the alliance policy requiring confidentiality breaches to be excluded from the liability cap.

#### 4. Policy or instruction basis

The system should identify why the issue was detected:

- Selected risk check
- Internal policy
- Reference agreement
- Market guidance
- Company template
- User instruction
- AI-detected deviation from standard practice

Example:

> **Basis:** Alliance Risk Playbook → Liability protections  
> **Reference:** EMEA Partner Agreement, Clause 14.2  
> **Instruction:** “Escalate unlimited or unprotected confidentiality exposure.”

#### 5. Relevant contract text

Show the original text excerpt and highlight the relevant phrase.

> “Neither party’s aggregate liability under this Agreement will exceed the fees paid during the preceding twelve months.”

#### 6. Proposed redline

Show the proposed tracked change before it is applied.

> “Neither party’s aggregate liability under this Agreement will exceed the fees paid during the preceding twelve months, **except for liability arising from confidentiality breaches, intellectual-property infringement, fraud, or willful misconduct**.”

#### 7. Confidence and limitations

Where applicable, show a confidence indicator and a brief caveat.

> **Confidence:** High  
> Review the interaction with the indemnity and confidentiality clauses before applying.

The product must not use confidence to imply legal certainty.

---

## Resolution Actions

### Available actions

Every finding should support one or more of the following actions:

| Action | Description |
|---|---|
| Apply redline | Inserts the suggested change as a tracked edit |
| Edit suggestion | Allows the user to modify AI-proposed language before applying |
| Generate alternative | Produces an alternative redline based on a new instruction |
| Dismiss | Marks the finding as not requiring action |
| Accept risk | Records that the organization knowingly accepts the issue |
| Escalate | Sends the issue for review or approval by a designated stakeholder |
| Mark resolved manually | Records that the issue was addressed through another change or action |
| Add comment | Adds reviewer context, negotiation notes, or rationale |
| View related findings | Shows other findings affecting the same clause or issue |

### Apply redline behavior

When the user selects **Apply redline**, the system should:

1. Insert the change into the contract as a tracked edit.
2. Visually show the inserted or deleted text in the contract.
3. Update the finding status to **Applied**.
4. Record the acting user, timestamp, original recommendation, and applied text.
5. Keep focus on the relevant contract clause.
6. Display a confirmation message.

Example:

> **Redline applied.** The change is visible in Track Changes.

If applying a redline modifies the clause enough that other findings may become invalid, the system should mark related findings as:

> **May require revalidation**

The system should not silently dismiss or remove related findings.

### Edit suggestion behavior

When the user selects **Edit suggestion**, the system should open an editable redline view where the user can:

- Edit proposed insertions and deletions.
- Add or remove language.
- Generate a revised suggestion using free-text guidance.
- Compare the edited version with the original AI proposal.
- Apply the final version as a tracked change.

After the user applies an edited version:

- The finding status becomes **Applied — modified**.
- The audit record retains both the original suggestion and final applied text.
- The system identifies the edit as user-modified, not AI-approved.

### Dismiss behavior

When the user selects **Dismiss**, the system should request an optional or required reason, depending on organization settings.

Suggested reasons:

- Commercially acceptable
- Already addressed elsewhere
- False positive
- Not applicable to this partnership
- Accepted by Legal
- Accepted by business owner
- Will be handled outside the agreement
- Other

Dismissed findings remain visible when users filter for dismissed items and remain part of the audit trail.

### Escalation behavior

When the user selects **Escalate**, they can:

- Assign an owner.
- Choose an escalation type: Legal, Finance, Compliance, Executive, Commercial, or Other.
- Add a comment.
- Set a due date.
- Attach supporting rationale.
- Link the relevant clause and proposed redline.

The finding status becomes **Escalated** until a decision is recorded.

---

## Review Progress and Navigation

### Default navigation

After a user applies, dismisses, accepts, escalates, or manually resolves a finding:

- Update the finding status immediately.
- Keep the reviewer on the current clause by default.
- Keep the finding detail panel open long enough for the reviewer to verify the resulting tracked change.
- Show a visible control:

> **Next unresolved finding**

The reviewer remains in control of when to move.

### Optional auto-advance

The product may support a preference:

> **Auto-advance after resolving a finding**

Default: **Off**

When enabled, the system should:

1. Update the current finding status.
2. Confirm the action.
3. Navigate to the next unresolved finding based on the current sort and filter order.
4. Highlight the next relevant text.
5. Open the next finding’s detail panel.

The system should not auto-advance when:

- The applied change affects related findings.
- The user is editing a suggestion.
- The user escalates an issue.
- The finding requires a manual decision.
- The system identifies a potential conflict or stale analysis.
- The user has selected multiple findings.
- The next item is in a different document or section that could disrupt review context.

### Completion state

When all findings are resolved, show:

> **Review complete**  
> All detected findings have been applied, dismissed, accepted, escalated, or resolved manually.

The user can then:

- View unresolved escalations.
- Re-run analysis.
- Export the redlined agreement.
- Export a review summary.
- Submit the agreement for legal or internal approval.

---

## Functional Requirements

### Contract input

The system must support:

- Uploading a contract.
- Opening an existing contract.
- Reviewing contracts with existing tracked changes.
- Displaying contract page, clause, and paragraph references where possible.
- Maintaining contract version information.

### Risk configuration

The system must allow:

- Selecting one or more risk types.
- Enabling and disabling each risk type.
- Saving frequently used review configurations.
- Applying organization-level required checks.
- Showing which checks are mandatory and which are optional.
- Reusing a previous configuration for a similar agreement.

### Supporting document management

The system must allow users to:

- Upload or select reference documents.
- Preview attached reference materials.
- Remove an attachment before running analysis.
- See document processing status.
- Identify the documents used in an analysis.
- Restrict analysis to authorized documents only.
- Retain document provenance in the result record.

### Findings generation

The system must:

- Generate findings in a batched result set.
- Associate each finding with a risk category.
- Assign severity.
- Provide a concise explanation.
- Identify the source clause or insertion point.
- Provide supporting evidence or a basis for the finding.
- Generate a proposed redline when appropriate.
- Distinguish between existing risky language and missing required language.
- Avoid duplicate findings where possible.
- Link related findings.
- Record the model output and review configuration used for the analysis.

### Redline generation

The system must:

- Generate contract-language suggestions suitable for professional business use.
- Respect user instructions and selected reference documents.
- Preserve the surrounding clause structure where possible.
- Present edits as tracked changes.
- Allow the user to modify a suggested edit before applying.
- Avoid applying edits automatically.
- Flag when the system cannot produce a reliable redline.

### Re-analysis

The system should support re-analysis after edits.

Users can choose:

- Re-analyze the full agreement.
- Re-analyze a clause.
- Revalidate only findings impacted by changes.
- Re-run selected risk types.

After re-analysis:

- Previously resolved findings must remain in the audit trail.
- Findings that no longer apply should be marked **Superseded**, not deleted.
- New findings should be marked **New**.
- The user should be able to compare review runs.

---

## Data Model

### Analysis run

| Field | Description |
|---|---|
| Analysis run ID | Unique identifier for a review run |
| Contract ID and version | The agreement and source version analyzed |
| User ID | User who initiated analysis |
| Timestamp | Start and completion time |
| Selected risk types | Enabled strokes used in the analysis |
| Reference document IDs | Supporting documents used |
| Free-text instructions | User-provided guidance |
| Model / rules version | AI and playbook version used |
| Completion status | Completed, failed, partial, canceled |

### Finding

| Field | Description |
|---|---|
| Finding ID | Unique identifier |
| Analysis run ID | Parent analysis run |
| Title | Short issue summary |
| Description | Detailed explanation |
| Severity | Critical, High, Medium, Low, Informational |
| Risk category | Selected stroke or rule |
| Contract location | Clause, paragraph, page, or source-text anchor |
| Source text | Original relevant excerpt |
| Basis | Policy, playbook, reference document, or instruction |
| Proposed redline | AI-generated suggested edit, if available |
| Status | Open, Applied, Dismissed, Escalated, etc. |
| Confidence | Optional model confidence |
| Related findings | References to connected findings |
| Created timestamp | Finding generation time |
| Resolution record | User action, user ID, timestamp, rationale |

### Audit event

Every material action should create an immutable audit event:

- Analysis started
- Analysis completed
- Finding opened
- Suggested redline generated
- Suggested redline edited
- Redline applied
- Finding dismissed
- Risk accepted
- Finding escalated
- Owner assigned
- Comment added
- Re-analysis initiated
- Finding superseded

---

## Permissions and Governance

### Permissions

| Role | Permissions |
|---|---|
| Alliance manager | Run analysis, view findings, apply permitted edits, dismiss, accept risk within authority, escalate |
| Legal reviewer | All alliance-manager permissions plus modify playbooks and approve legal exceptions where authorized |
| Finance reviewer | View and resolve assigned financial findings; add comments and approvals |
| Executive approver | View summary, unresolved material risks, and escalation decisions |
| Administrator | Manage risk checks, playbooks, templates, roles, and organization settings |

### Governance requirements

- Users must see that AI output is advisory and requires human review.
- The product must preserve source-document provenance for findings.
- All applied redlines must be traceable to a finding, a user, and a timestamp.
- Dismissals and accepted risks must be auditable.
- Reference documents must only be used if the user has permission to access them.
- The system must clearly identify when a recommendation comes from a policy, reference agreement, user instruction, or general AI reasoning.
- The system must not claim that an agreement is “legally safe” or “approved” solely because findings have been resolved.

---

## Metrics

### Adoption metrics

- Number of contracts analyzed per active alliance manager.
- Percentage of eligible agreements analyzed before negotiation or approval.
- Number of risk configurations saved and reused.
- Percentage of analyses using supporting documents or instructions.

### Efficiency metrics

- Median time from contract upload to first finding review.
- Median time from analysis completion to review completion.
- Average time per finding.
- Number of findings reviewed per session.
- Percentage of users using **Next unresolved finding**.
- Percentage of users enabling auto-advance.

### Outcome metrics

- Percentage of findings resolved through an applied redline.
- Percentage of AI redlines applied without modification.
- Percentage of AI redlines applied with modification.
- Dismissal rate and false-positive reason distribution.
- Number and rate of escalated high-severity findings.
- Reduction in time to first legal review.
- Reduction in contract turnaround time.
- Post-signature issues attributable to risks not detected or not resolved.

### Quality metrics

- Human validation rate for high-severity findings.
- Precision of findings by risk category.
- Duplicate-finding rate.
- Percentage of findings with a valid source-text anchor.
- Percentage of applied redlines that remain unchanged through final contract approval.
- User-rated usefulness of finding rationale and suggested language.

---

## Acceptance Criteria

### Analysis setup

- A user can enable and disable individual risk checks before analysis.
- The system prevents analysis when no risk checks are enabled.
- A user can attach reference documents and see their processing status.
- A user can enter free-text instructions.
- The analysis record stores the selected checks, documents, and instructions.

### Findings list

- Completed analysis returns a batched, prioritized findings list.
- Every finding includes severity, category, summary, location, and status.
- The user can filter findings by severity, risk type, and status.
- The user can identify which findings have available redlines.
- The user can see review progress.

### Navigation and highlighting

- Clicking a finding navigates to the correct contract location.
- The relevant source text is highlighted.
- Selecting a new finding updates the selected row and highlighted text.
- The user retains the active filter and sort state when navigating between findings.
- Missing-term findings navigate to a clear insertion point or nearest related clause.

### Redlines and resolution

- A user can preview a proposed redline before applying it.
- Applying a redline inserts a tracked change into the agreement.
- A user can edit a suggestion before application.
- An edited suggestion is recorded as **Applied — modified**.
- A user can dismiss, accept risk, escalate, or mark a finding manually resolved.
- Every resolution action is stored in the audit trail.
- Related findings are not silently deleted when an edit is applied.

### Navigation after resolution

- Applying or resolving a finding updates its status immediately.
- By default, the user stays on the current finding and sees the applied tracked change.
- The user can select **Next unresolved finding**.
- If auto-advance is enabled, the next unresolved finding opens after resolution.
- Auto-advance does not occur when a finding is escalated, requires manual review, or affects related findings.

---

## Open Questions

1. Should “stroke” remain an internal technical term, or should the user-facing label be **Risk check**, **Review category**, or **Policy check**?
2. Which risk categories are mandatory by organization, agreement type, or market?
3. Should a user be able to apply multiple redlines in bulk, or only apply them one at a time?
4. Who can mark a finding as **Accepted risk**, and is approval required above a defined severity?
5. Should dismissed findings require a reason for High and Critical findings?
6. How should the product handle conflicts between a user instruction, internal policy, and an attached reference agreement?
7. What source formats must be supported at launch: DOCX, PDF, Google Docs, Word Online, or native editor?
8. How should the system treat agreements that already include tracked changes?
9. What should happen when a finding’s source text changes after a user manually edits the agreement?
10. Which users can view, edit, or export the review audit trail?
11. Should AI-generated redlines use the organization’s preferred clause library before generating new text?
12. What severity thresholds require an automatic escalation recommendation?
