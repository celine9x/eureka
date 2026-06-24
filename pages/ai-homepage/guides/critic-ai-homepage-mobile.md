# UX Critique â€” AI Homepage Mobile (Document Upload â†’ Opportunity Creation)

**Figma:** [Mobile frame](https://www.figma.com/design/hDFci1fy3CEc9a4fTDrque/%F0%9F%8E%9F%EF%B8%8FMotel?node-id=59-11506)
**Date:** 2026-06-21

---

## Flow Summary

The user uploads a company deck via the AI Homepage, the AI extracts opportunity-relevant data while displaying a "Thinking" progress sequence, then presents pre-populated preview cards for Opportunity, Contacts, and Meeting. The user reviews and confirms to create an Opportunity in Deal. This corresponds to Use Case 7 (importing decks to create new opportunities).

---

## Severity Summary

| Severity | Count | Description |
|----------|-------|-------------|
| ðŸ”´ Critical | 0 | â€” |
| ðŸŸ  High | 4 | Blocks confident task completion or causes significant data risk |
| ðŸŸ¡ Medium | 7 | Creates hesitation or misread at key decision points |
| ðŸŸ¢ Low | 3 | Minor friction or polish |

---

## 1. Clarity & Comprehension

### Issue: "Pending" tag is domain-ambiguous on preview cards
**Severity:** ðŸŸ  High
**Location:** AI Response screen > Opportunity preview / Contacts preview / Meeting preview

**Problem:**
All three preview cards carry a "Pending" status tag. BD and alliance professionals in Inpart use "Pending" as a deal lifecycle status (e.g., a pending agreement or milestone). Reusing it as a UI processing state creates immediate ambiguity: does "Pending" mean the AI is still working, the record is waiting for user review, or the object has been staged in the database? None of those are the same thing, and the distinction matters in a workflow where mislabeled statuses are a compliance risk.

**Principle:** Recognition over recall â€” users apply domain vocabulary to UI labels automatically.

**Recommendation:**
Use state-specific labels. While AI is extracting: show a spinner and label "Extractingâ€¦". When extraction is complete and user action is required: label "Ready to review". Reserve "Pending" exclusively for deal-status usage elsewhere in the product.

---

### Issue: Third quick-action chip is truncated to "+milli..."
**Severity:** ðŸŸ¡ Medium
**Location:** All screens > suggestion chip row

**Problem:**
The third chip renders as "+milli..." â€” completely ambiguous. In a pharma B2B context this could read as a unit prefix, a count suffix, or a truncated product name. Users cannot act on a chip they cannot read, and a truncated label signals an incomplete design to stakeholders during review.

**Principle:** Recognition over recall â€” options must be readable to be selectable.

**Recommendation:**
Limit the chip row to two chips that always render in full, or implement horizontal scrolling with full labels and a visible overflow indicator (e.g., "+2 more"). Do not let labels truncate.

---

### Issue: Thinking steps use internal technical language
**Severity:** ðŸŸ¢ Low
**Location:** Thinking state > step list

**Problem:**
"Preparing metadata data to manageâ€¦" is redundant ("metadata" already means data) and opaque. The other steps ("Searching for referenced materialsâ€¦") use passive, system-oriented phrasing that doesn't map to the user's mental model of what the AI is doing with their deck.

**Principle:** Match system language to user vocabulary.

**Recommendation:**
Rewrite steps in user-facing terms:
- "Reading document structureâ€¦" â†’ "Reading documentâ€¦"
- "Preparing metadata data to manageâ€¦" â†’ "Preparing opportunity fieldsâ€¦"
- "Identifying companies and assetsâ€¦" â†’ stays acceptable
- "Searching for referenced materialsâ€¦" â†’ "Looking up related recordsâ€¦"

---

## 2. Information Hierarchy

### Issue: Greeting dominates; input is at the bottom
**Severity:** ðŸŸ¢ Low
**Location:** Empty state screen

**Problem:**
"Hello Jane, what are you looking for today?" occupies roughly the top 45% of the viewport as a centered heading, while the input field and suggestion chips are anchored to the bottom. This splits attention between a non-interactive headline and the actual entry point, forcing users to travel to the bottom of the screen to begin.

**Principle:** Primary action should be the most visually prominent element.

**Recommendation:**
Reduce the greeting to a compact subheader and vertically center the input + chips in the viewport. The model is familiar from AI assistant UIs (ChatGPT, Perplexity) where the input is the visual anchor of the empty state.

---

### Issue: Three preview cards with equal visual weight after AI response
**Severity:** ðŸŸ¡ Medium
**Location:** AI Response screen > Opportunity preview / Contacts preview / Meeting preview

**Problem:**
Opportunity, Contacts, and Meeting preview cards stack with identical styling. The Opportunity card is the primary outcome of this flow (it triggers a create action), but it receives no more visual emphasis than the Contacts or Meeting cards, which are contextual. Users must read all three to determine which requires action.

**Principle:** Visual priority â€” the most important element must stand out.

**Recommendation:**
Elevate the Opportunity preview card: larger container, visible primary CTA ("Review & create"), distinct border or background. Demote Contacts and Meeting to inline secondary cards below, styled as supporting context rather than actionable items.

---

### Issue: Required form fields are hidden below the fold in the Create opportunity modal
**Severity:** ðŸŸ¡ Medium
**Location:** Create opportunity modal > "Additional required information" section

**Problem:**
The modal shows Therapeutic areas* and Clinical indications* under an "Additional required information" heading â€” but Clinical indications is clipped at the bottom edge of the screen. Users cannot see all required fields before attempting to submit. On a form fully pre-populated by AI, users may tap "Create opportunity" immediately and receive a validation error for a field they didn't know existed.

**Principle:** Users should understand commitment before they commit.

**Recommendation:**
Either reduce the number of fields shown in the modal (defer non-critical fields to the Opportunity detail page post-creation), or add a progress indicator: "6 of 7 fields completed" at the top so users know to scroll.

---

## 3. Interaction Logic

### Issue: No designed post-creation state
**Severity:** ðŸŸ  High
**Location:** Create opportunity modal > "Create opportunity" button

**Problem:**
After the user taps "Create opportunity," there is no designed state showing what happens next. Does the modal close and return to the AI chat? Does the chat thread update with a confirmation message? Does the app navigate to the newly created Opportunity? The absence of a designed success state leaves this decision to implementation, creating risk of a disorienting or silent transition.

**Principle:** Users need to know what will happen before they act, and what happened after they act.

**Recommendation:**
Design the success state explicitly. Recommended: modal dismisses, AI chat inserts a system message: "Opportunity OncoNexa Therapeutics â€” ONX-317 created. [Open opportunity â†’]". This keeps users in the AI flow and provides an actionable confirmation.

---

### Issue: Quick-action chips persist during active AI processing
**Severity:** ðŸŸ¡ Medium
**Location:** Thinking state and AI Response screens > suggestion chip row

**Problem:**
After a document has been uploaded and the AI is mid-processing, the suggestion chips ("Opportunity creation", "Obligation extraction", "+milli...") remain visible. These chips suggest actions that are already in progress, which creates confusion: did the AI trigger from the upload, or does the user still need to tap a chip to initiate something? The persistent chips imply the user has not yet started.

**Principle:** System status should be unambiguous â€” no UI elements that imply an action hasn't been taken when it has.

**Recommendation:**
Hide the generic suggestion chips during active processing and AI response states. Optionally replace them with context-specific follow-up chips after completion (e.g., "Add another contact", "Link to initiative", "Ask about this company").

---

### Issue: No way to cancel mid-processing
**Severity:** ðŸŸ¡ Medium
**Location:** Thinking state

**Problem:**
During the "Thinkingâ€¦" sequence, there is no visible cancel or abort action. If a user uploads the wrong file or realizes the query is incorrect, they must wait for full processing to complete before they can take any corrective action.

**Principle:** Reversibility â€” users should be able to undo or stop actions before they complete.

**Recommendation:**
Add a subtle "Cancel" text link or X button in the Thinking state header. On cancel, restore the empty input state and discard extracted data.

---

## 4. Feedback & System Status

### Issue: Thinking steps show no active vs completed distinction
**Severity:** ðŸŸ  High
**Location:** Thinking state > step list

**Problem:**
All four processing steps are rendered in the same visual state simultaneously. It is not clear whether they run in parallel (all active at once), sequentially (one at a time), or if some have already completed. A user watching this screen cannot tell how much longer processing will take or how far along it is.

**Principle:** Visibility of system status â€” users should always know the current state of the system.

**Recommendation:**
Differentiate step states visually:
- In progress: animated spinner icon + normal text weight
- Completed: static checkmark icon + dimmed text
- Not yet started: empty/dashed indicator + dimmed text

This makes progress legible at a glance and sets accurate time expectations.

---

## 5. Decision Friction

### Issue: No AI confidence signal on pre-populated fields
**Severity:** ðŸŸ  High
**Location:** Create opportunity modal > all pre-populated fields

**Problem:**
Every field in the form (Opportunity name, Status, Initiative, Asset, Company, Opportunity type, Therapeutic areas) is pre-populated by AI extraction. They are rendered identically to manually entered fields â€” no visual distinction, no confidence indicator, no source citation. BD professionals are accountable for data quality. Accepting AI-inferred fields without any confidence signal increases the risk of creating incorrect records in a system where data inaccuracy has downstream compliance and financial consequences (e.g., wrong asset linked to a milestone-bearing agreement).

**Principle:** Users should understand what they are committing to.

**Recommendation:**
Apply a subtle visual treatment to AI-extracted fields (e.g., a small "AI" badge or a distinct border color) and show the source excerpt inline on tap: "Extracted from: 'ONX-317 is our lead oncology assetâ€¦'". For fields where extraction confidence is low, use a placeholder with a prompt to fill rather than a possibly-wrong value.

---

### Issue: Cancel in the Create opportunity modal destroys AI-extracted data without warning
**Severity:** ðŸŸ¡ Medium
**Location:** Create opportunity modal > "Cancel" button

**Problem:**
"Cancel" is placed at the same visual level as "Create opportunity" with no confirmation step. Tapping Cancel after a document upload, AI processing cycle, and form review discards all extracted data silently. Given that "Cancel" is left-aligned and visually accessible during scrolling, accidental taps are likely â€” especially given proximity to the bottom edge on mobile.

**Principle:** High-cost reversible actions require confirmation; error prevention over error recovery.

**Recommendation:**
Add a confirmation sheet on Cancel: "Discard AI-extracted data?" with "Discard" and "Keep editing" options. Alternatively, implement auto-save to a draft state so cancelling does not destroy work.

---

## 6. Cognitive Load

### Issue: Three simultaneous review tasks after AI processing
**Severity:** ðŸŸ¡ Medium
**Location:** AI Response screen > Opportunity preview / Contacts preview / Meeting preview

**Problem:**
When AI extraction completes, the user is immediately presented with three separate review tasks (Opportunity, Contacts, Meeting) stacked in the same view. This requires three parallel decisions before any action can be taken. For a first-time user interacting with this AI feature, the combined review load is high and the priority order is unclear.

**Principle:** Progressive disclosure â€” show the most important action first; defer secondary decisions.

**Recommendation:**
Surface only the Opportunity preview with a primary CTA ("Review and create opportunity"). Present Contacts and Meeting as a follow-on step: after the Opportunity is created, the AI chat updates with "2 more items ready to review: contacts and meeting notes."

---

### Issue: History panel uses a flat undated list
**Severity:** ðŸŸ¢ Low
**Location:** History panel

**Problem:**
The History panel lists 8 conversations ("OncoNexa therapeutics", "Phase 1 opportunities in pancreatic cancer", "Create my to-do list for the week"â€¦) as a flat list with no dates, grouping, or search. BD power users and alliance managers with high query volume will accumulate dozens of entries quickly, making retrieval by memory alone.

**Principle:** Miller's Law â€” chunking information into groups reduces scanning load.

**Recommendation:**
Group entries by recency (Today, Yesterday, This week, Earlier) and add a search input at the top. The bookmark icons (visible on some entries) suggest a saved/pinned system is already planned â€” surface that as a "Pinned" group at the top.

---

## 7. Consistency & Predictability

### Issue: Bottom navigation changes function across screens
**Severity:** ðŸŸ  High
**Location:** AI chat screens > bottom bar vs History panel > bottom bar

**Problem:**
In the AI chat screens, the bottom bar contains "Camera", "Photos", "Files" â€” attachment actions tied to the input context. In the History panel, the same bottom position holds persistent app navigation: Home, History (active), Profile. These are two fundamentally different control types occupying the same space. Users learn the bottom bar as navigation from the History panel, then encounter attachment actions in the same position on the chat screen â€” or vice versa.

**Principle:** Same affordance position = same type of control (Jakob's Law).

**Recommendation:**
Separate concerns. Move Camera/Photos/Files into the input area as a contextual attachment affordance (a "+" or paperclip icon that expands a picker). Maintain the bottom bar exclusively for persistent app navigation (Home, History, Profile) across all screens.

---

## What's Working Well

- The AI response copy is clear and user-appropriate: "You can review and adjust the fields before saving the new opportunity to your workspace" sets correct expectations without over-explaining.
- The "Create opportunity" form correctly carries the required field asterisk (*) convention consistently.
- The info banner at the top of the Create opportunity modal ("OncoNexa Therapeutics deck.pdf will be added into attachment of opportunity") is good proactive disclosure â€” users know the file is being linked automatically.
- The History panel conversation labels are written in natural language user queries, which makes them scannable and meaningful (vs timestamped IDs or system-generated titles).

---

## Priority Actions

1. **Design the post-creation state** â€” define what the UI does after "Create opportunity" is tapped: chat confirmation message, navigation, or toast. This is a gap in the flow that will be caught in the first user test.
2. **Differentiate Thinking step states** â€” add in-progress / completed / pending visual states to the Thinking sequence. Users have no progress signal for what is actively a multi-second wait.
3. **Replace "Pending" on preview cards** â€” the label conflicts with deal-status vocabulary. Use "Ready to review" post-extraction.
4. **Add AI confidence indicators to pre-populated fields** â€” distinguish AI-extracted values from confirmed data so BD professionals can review with appropriate scrutiny.
5. **Separate bottom-bar attachment actions from persistent navigation** â€” Camera/Photos/Files belong in the input area, not the nav bar.

