# Findings source

Edit the content below to change what shows up in the Contract Review
Assistant's review page. Each `## Finding:` section maps to one accordion
item. When you're done editing, tell me and I'll update `FINDINGS` in
`review.jsx` to match.

Keep the `Finding ID` lines as-is (don't rename them) — they're how I match
your edits back to the right accordion, table row, and applied-suggestion
logic. Everything else is free to change.

## Field guide

- **Title** — the accordion header text.
- **Severity** — `High`, `Moderate`, or `Low`. Controls the badge color and
  the highlight color used in the document viewer.
- **Highlighted / applied text** — the exact clause text that gets
  highlighted in the document and replaced when Apply is clicked. This must
  match the contract text verbatim (case, punctuation, and all) — if you
  reword it, tell me and I'll re-locate the matching clause in the contract.
- **Reason** — the explanation shown under "Reason" in the accordion.
- **Sources** — one or more supporting references shown under "Sources".
  Each has:
  - **Name** — the source's short label (the clickable link text).
  - **Summary** — the one-line description shown under the link.
  - **Excerpt** — the short quoted snippet shown under the summary. Must
    appear verbatim inside that source's Full text.
  - **Full text** — the longer text shown in the side panel when the source
    link is clicked.
- **Suggestion** — the proposed replacement text for the highlighted clause.
- **Comment** — the default reviewer comment shown in the Comment box.
- **Recommendations** — the bullet list shown under Recommendations.

---

## Finding: milestone-notice-gap

**Title:** 5.2.1 Milestone Payments: no notice obligation when a Milestone is achieved

**Severity:** High

**Highlighted / applied text:**
> 5.2.1 Milestone Payments. In further consideration of the licenses and rights granted to LICENSEE, within sixty (60) days after achievement of each Milestone set forth below (unless otherwise specified below), LICENSEE shall, subject to Section 1.6, pay to MERIDIAN the corresponding non-creditable and non-refundable milestone payment (each, a "Milestone Payment"). For the avoidance of doubt each Milestone Payment shall be payable only once upon achievement of the applicable Milestone.

**Reason:**
The clause ties payment timing to achievement of the Milestone but never requires LICENSEE to notify MERIDIAN when that achievement occurs — MERIDIAN has no proactive visibility and is relying entirely on LICENSEE to self-report. This compounds the risk given Helios's own track record: 3 of its last 4 licensing milestones have slipped by 6+ months, and a company already prone to delay has no contractual obligation to disclose sooner.

**Sources:**

1. **Name:** Post-Mortem — Helios Pharma / Kestrel Bio Alliance (Closed 2024)
   **Summary:** One of two recent Helios alliances where a program went quiet for over a year with no defined check-in point — the same self-reporting gap this finding flags for Milestone achievement.
   **Excerpt:** Section 5.3's diligence obligation used 'commercially reasonable efforts' without defined FTE or spend commitments.
   **Full text:** Section 5.3's diligence obligation used 'commercially reasonable efforts' without defined FTE or spend commitments. When Helios deprioritized the program following an internal portfolio review, Kestrel had no contractual basis to demonstrate breach, despite 14 months of inactivity. Recommendation: future agreements should tie diligence obligations to measurable inputs (FTEs, budget) rather than effort-based standards.

2. **Name:** Post-Mortem — Helios Pharma / Corvale Biosciences Alliance (Closed 2025)
   **Summary:** The same Corvale post-mortem cites Helios's milestone-slippage pattern as "Risk #1" alongside a separate diligence-standard failure in that alliance.
   **Excerpt:** This is the second of Helios's last four licensing deals where this exact standard has failed to hold up
   **Full text:** The diligence clause mirrored standard 'commercially reasonable efforts' language. A shift in Helios's R&D priorities following a portfolio reprioritization led to an 18-month stall with no remedy available to Corvale under the existing terms. This is the second of Helios's last four licensing deals where this exact standard has failed to hold up (see also the Kestrel Bio post-mortem, 2024 — and the milestone-slippage pattern already flagged in Risk #1 above).

**Suggestion:**
Milestone Payments. In further consideration of the licenses and rights granted to LICENSEE, LICENSEE shall notify MERIDIAN in writing within ten (10) business days after achievement of each Milestone, and within sixty (60) days after such achievement, LICENSEE shall, subject to Section 1.6, pay to MERIDIAN the corresponding non-creditable and non-refundable milestone payment (each, a "Milestone Payment"), together with reasonable supporting documentation evidencing such achievement. For the avoidance of doubt each Milestone Payment shall be payable only once upon achievement of the applicable Milestone.

(Note: intentionally has no leading "5.2.1" — the app strips the clause number from the original text before diffing, so the suggestion needs to match that, and re-adds the number automatically when applied.)

**Comment:**
Confirm with the deal team whether ten business days is the right notice window, and whether MERIDIAN's finance/alliance management team should be a required notice recipient alongside the primary contract notice address.

**Recommendations:**
- Add an explicit written-notice obligation (e.g., 10 business days) triggered by achievement of a Milestone.
- Require supporting documentation evidencing achievement alongside the Milestone Payment.
- Confirm an internal handoff process between LICENSEE's R&D and Alliance Management teams for this counterparty, given its track record of delayed notifications.

---

## Finding: reasonable-efforts-diligence-gap

**Title:** 4.1.1 Development: "Commercially Reasonable Efforts" diligence has no measurable floor

**Severity:** High

**Highlighted / applied text:**
> 4.1.1 LICENSEE shall itself, or through its Affiliates or Sublicensees, use Commercially Reasonable Efforts to Develop Products in the Major Markets in the Field, and LICENSEE shall undertake all Development activities relating to the Compounds and Products in the Field at its sole expense.

**Reason:**
LICENSEE's diligence obligation is defined only by the "Commercially Reasonable Efforts" standard, with no minimum FTE count, spend commitment, or activity-based milestone MERIDIAN can point to if LICENSEE deprioritizes the program. This is the same standard that failed to protect the counterparty in two of Helios's last four licensing alliances (Kestrel Bio, 2024, and Corvale Biosciences, 2025), in both cases following an internal portfolio reprioritization at Helios.

**Sources:**

1. **Name:** Issue #ISS-2291 — Late milestone payment, discovered via partner follow-up
   **Summary:** Internal process gaps let a significant Development milestone go unreported for months — the same lack of visibility that makes an effort-based diligence standard hard to enforce here.
   **Excerpt:** Alliance Management first learned of the achievement five months later, when Kestrel's BD team followed up asking about the outstanding payment.
   **Full text:** Milestone Event 3 (IND clearance) was achieved on record by Helios's own development team. No internal process notified Alliance Management or Finance, and the contract itself contained no explicit notice obligation — only a payment-timing clause tied to achievement. Alliance Management first learned of the achievement five months later, when Kestrel's BD team followed up asking about the outstanding payment. The payment was processed immediately upon discovery, but the delay prompted a formal notice-of-breach warning from Kestrel's legal team.

**Suggestion:**
LICENSEE shall itself, or through its Affiliates or Sublicensees, use Commercially Reasonable Efforts, including maintaining at least the equivalent of two (2) full-time employees dedicated to Development of the Products until the first Regulatory Approval, to Develop Products in the Major Markets in the Field, and LICENSEE shall undertake all Development activities relating to the Compounds and Products in the Field at its sole expense.

**Comment:**
Confirm with the deal team whether a minimum FTE commitment (or a defined spend floor) is the preferred way to make this diligence obligation measurable, given how easily a slowdown can go unreported internally, as in the ISS-2291 milestone-notice gap.

**Recommendations:**
- Tie the diligence obligation to measurable inputs (minimum FTEs or a spend floor), not just an effort-based standard.
- Add a notice obligation if LICENSEE materially reduces or deprioritizes Development.
- Define an objective trigger (e.g., a defined period of inactivity) MERIDIAN can point to as a diligence failure.

---

## Finding: assignment-change-of-control-gap

**Title:** 17.1 Assignment: Change of Control assignment has no competitor carve-out

**Severity:** Moderate

**Highlighted / applied text:**
> 17.1 Assignment. LICENSEE may not assign its rights and obligations under this Agreement without MERIDIAN' prior written consent, except that: (a) LICENSEE may assign its rights and obligations under this Agreement in whole or in part to one or more of its Affiliates without the consent of MERIDIAN; and (b) LICENSEE may assign this Agreement in the event of a Change in Control.

**Reason:**
Clause 17.1(b) lets LICENSEE assign the entire Agreement upon a Change in Control without MERIDIAN's consent and without any carve-out for a direct competitor of MERIDIAN. If LICENSEE is acquired by a competitor, the exclusive license — and the Licensed Technology it covers — could transfer to that competitor with no renegotiation or termination right for MERIDIAN.

**Sources:**

1. **Name:** Inpart AM Best Practice Playbook — Section 7: Contract Red Flags
   **Summary:** Assignment clauses that permit a Change-of-Control transfer without a competitor carve-out are a commonly overlooked risk, especially where the counterparty's financial position makes M&A plausible.
   **Excerpt:** Reviewers should always check for a competitor carve-out and a renegotiation or termination right — particularly when the counterparty's financial position suggests M&A is plausible.
   **Full text:** Generic M&A assignment clauses are among the most overlooked risk points in licensing agreements. A clause permitting assignment 'without consent' in connection with a merger or acquisition, without a carve-out for direct competitors, can transfer an exclusive license into a competitor's hands with zero renegotiation rights. Reviewers should always check for a competitor carve-out and a renegotiation or termination right — particularly when the counterparty's financial position suggests M&A is plausible.

**Suggestion:**
Assignment. LICENSEE may not assign its rights and obligations under this Agreement without MERIDIAN' prior written consent, except that: (a) LICENSEE may assign its rights and obligations under this Agreement in whole or in part to one or more of its Affiliates without the consent of MERIDIAN; and (b) LICENSEE may assign this Agreement in the event of a Change in Control, provided that the acquiring party is not a direct competitor of MERIDIAN in the Field; if the acquiring party is a direct competitor of MERIDIAN in the Field, such assignment shall require MERIDIAN's prior written consent, not to be unreasonably withheld.

**Comment:**
Confirm with the deal team how "direct competitor" should be defined for this carve-out, and whether MERIDIAN should also have a termination or renegotiation right rather than only a consent right.

**Recommendations:**
- Add a competitor carve-out to the Change of Control assignment right in 17.1(b).
- Define "direct competitor" for purposes of the carve-out.
- Consider a renegotiation or termination right for MERIDIAN if the acquiring party is a competitor.
