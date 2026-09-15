# UX Edge Cases Checklist

**Purpose**
Systematically identify **missing states and edge cases** not explicitly shown in Figma designs. Focus on user-perceived scenarios like empty states, errors, loading, and boundary conditions.

> **Note:** For design quality critique (usability, visual design, heuristics), use `critic.md` instead.
---

## How to Use This Guide

### Step 1: Provide Figma Link with Context
```
Check edge cases for this Figma: [link]

Context:
- Flow: [Flow name, e.g., "AI obligation extraction"]
- Description: [What user does, e.g., "Upload doc → AI extracts → Review results"]
- Key screens: [Which screens to analyze]
- Exclude: [Elements to ignore]
```

### Step 2: I Will Check These Categories
1. Access & Permissions
2. Data Extremes (empty, missing, overflow)
3. Input Failures (validation, duplicates)
4. System Failures (loading, errors, offline)
5. State Conflicts (concurrent edits, stale data)
6. Irreversible Actions (delete, submit)

### Step 3: Output File
Generated file: **`edge-case-{flowname}.md`**

Example: `edge-case-ai-extraction.md`, `edge-case-user-onboarding.md`

---

## Output Template

```markdown
# Edge Cases - {Flow Name}

**Figma:** [Link](url)
**Date:** YYYY-MM-DD

---

## Flow Summary
[1-2 sentences describing what this flow does]

---

## 1. Access & Permissions
- [ ] **[Specific gap]**
  → Best: [Ideal solution]
  → Cheap: [MVP alternative]

## 2. Data Extremes
[Continue for each relevant category...]

---

## Summary Table

| Category | Gap | Priority | Best Solution |
|----------|-----|----------|---------------|
| [Cat] | [Gap] | High/Med/Low | [Solution] |

---

## Missing States Checklist
- [ ] Empty state
- [ ] Loading state
- [ ] Error state
- [ ] Success state
- [ ] Partial data state
```

---

## 1. Access & Permissions

> What happens when user can't or shouldn't do something?

| Edge Case | Best Solution | Cheap Alternative |
|-----------|---------------|-------------------|
| **No permission for action** | Hide action OR disable with tooltip explaining why | Error toast on attempt |
| **Permission revoked mid-session** | Real-time UI update + notification | Error on next action |
| **View-only access** | Clear "View only" badge, hide edit controls | Disable all inputs |
| **Session expired** | Modal to re-login, preserve draft | Redirect to login |
| **Shared link restrictions** | Explain access level + request access CTA | "Access denied" page |
| **Feature behind paywall** | Show feature preview + upgrade CTA | Hide feature entirely |
| **Role-based restrictions** | Show what user CAN do, not just what they can't | Generic "Not authorized" |

---

## 2. Data Extremes

> What happens at data boundaries: none, partial, too much, wrong?

| Edge Case | Best Solution | Cheap Alternative |
|-----------|---------------|-------------------|
| **Empty state (no data)** | Illustration + helpful message + primary CTA | "No items" text |
| **First-time / onboarding empty** | Guided empty state with tutorial | Same as regular empty |
| **Missing required field data** | Graceful fallback (— or placeholder) | "N/A" text |
| **Partial data loaded** | Skeleton for missing, show available | Spinner until complete |
| **Single item** | Adjust layout if designed for multiple | Same layout, looks sparse |
| **Maximum items reached** | Disable add + show limit + suggest action | Error on add attempt |
| **Very long text content** | Truncate + tooltip/expand option | CSS ellipsis |
| **Very long list (1000+ items)** | Virtualization + pagination + search | Basic scroll |
| **Special characters in content** | Proper escaping + display | May break layout |
| **Numeric extremes (0, negative, huge)** | Format appropriately (0, -$50, 1.2M) | Raw numbers |
| **Date extremes (past, future, invalid)** | Validation + sensible defaults | Allow any value |
| **Search with no results** | Suggestions + clear filters CTA | "No results" |
| **Filter returns nothing** | "No matches" + clear filters button | Empty table |

---

## 3. Input Failures

> What happens when user input is wrong or problematic?

| Edge Case | Best Solution | Cheap Alternative |
|-----------|---------------|-------------------|
| **Invalid format** | Inline validation + specific message | Error on submit |
| **Wrong type** | Input mask/restriction + hint | Reject with error |
| **Too short / too long** | Character counter + limit | Error message |
| **Required field empty** | Mark required (*) + inline error | Error list on submit |
| **Duplicate entry** | Check on blur + link to existing | Error on submit |
| **Double submit** | Disable button + spinner + debounce | Ignore duplicate clicks |
| **Submit while processing** | Show processing state, block resubmit | Queue silently |
| **Paste invalid content** | Sanitize + notify what was cleaned | Accept raw or reject |
| **Upload wrong file type** | Filter file picker + clear allowed types | Error after upload |
| **Upload too large** | Show limit before upload + compress option | Error after attempt |
| **Form abandonment** | Auto-save draft + restore on return | Lose data |

---

## 4. System Failures

> What happens when technical issues occur?

| Edge Case | Best Solution | Cheap Alternative |
|-----------|---------------|-------------------|
| **Content loading** | Skeleton loader matching layout | Spinner |
| **Slow response (>3s)** | Progress indicator + estimated time | Extended spinner |
| **Network lost** | Offline banner + queue actions + auto-retry | Error toast |
| **Network timeout** | Retry button + preserve input | "Request failed" |
| **API error (500)** | Friendly message + retry + support link | "Something went wrong" |
| **API error (404)** | "Not found" + navigation options | Generic error |
| **Partial failure** | Show what succeeded + retry failed | All-or-nothing error |
| **Background process fails** | Notification + retry option | Silent failure |
| **Third-party service down** | Specific message + alternative + ETA | Generic error |
| **File upload fails** | Retry button + keep file selected | Re-select file |
| **Real-time connection lost** | Reconnecting indicator + auto-reconnect | Stale data |

---

## 5. State Conflicts

> What happens when context changes unexpectedly?

| Edge Case | Best Solution | Cheap Alternative |
|-----------|---------------|-------------------|
| **Concurrent edit (same item)** | Presence indicator + conflict resolution UI | Last-write-wins |
| **Data changed externally** | Real-time sync + "Updated" indicator | Stale until refresh |
| **Item deleted while viewing** | "This item was deleted" + redirect | 404 error |
| **Unsaved changes + navigate** | Modal: Save / Discard / Cancel | Browser beforeunload |
| **Session timeout during work** | Auto-save + re-auth modal | Lose work |
| **Multi-tab conflicts** | Sync across tabs OR warn about conflict | Independent sessions |
| **Stale form data** | Refresh option + merge changes | Submit may fail |
| **Filter/sort state lost** | Persist in URL or localStorage | Reset on refresh |
| **Back button breaks state** | Proper history management | Unexpected behavior |
| **Deep link to invalid state** | Graceful fallback + redirect | Error page |

---

## 6. Irreversible Actions

> What happens with destructive or final actions?

| Edge Case | Best Solution | Cheap Alternative |
|-----------|---------------|-------------------|
| **Delete item** | Confirm modal + soft delete + undo (30s) | confirm() dialog |
| **Delete with dependencies** | Show impact ("affects 5 items") + confirm | Generic warning |
| **Bulk delete** | Count confirmation + undo all | Single confirm |
| **Clear / reset all** | Double confirmation + backup option | Single confirm |
| **Submit for review** | Summary preview + edit option + grace period | "Are you sure?" |
| **Send / publish** | Preview + recipient count + undo window | Confirm dialog |
| **Archive vs delete** | Offer archive as safer alternative | Only hard delete |
| **Permanent action** | Clear "cannot be undone" language + friction | Simple warning |
| **Action affects others** | List affected users + notify option | Generic "affects team" |
| **Account deletion** | Waiting period + data export + reactivation | Immediate delete |

---

## Quick Reference

| Category | Key Question | Example Gap |
|----------|--------------|-------------|
| Access & Permissions | What if user can't do this? | No permission → disabled button? |
| Data Extremes | What if empty/huge/missing? | Empty table → illustration? |
| Input Failures | What if input is wrong? | Invalid email → inline error? |
| System Failures | What if system fails? | API error → retry button? |
| State Conflicts | What if context changed? | Unsaved + leave → save modal? |
| Irreversible Actions | What if can't undo? | Delete → confirm + undo? |

---

## Priority Framework

### High Priority (Must Have)
- Empty states for primary content areas
- Error states for core actions
- Loading states for async operations
- Confirmation for destructive actions

### Medium Priority (Should Have)
- Validation messages for all inputs
- Offline/network error handling
- Concurrent editing awareness
- Undo for reversible actions

### Low Priority (Nice to Have)
- Skeleton loaders (vs spinners)
- Real-time conflict resolution
- Progressive loading
- Advanced recovery options

---

## Common Missing States Checklist

For each screen, verify these states exist:

### Lists / Tables
- [ ] Empty state (no items)
- [ ] Loading state (skeleton or spinner)
- [ ] Error state (failed to load)
- [ ] Single item state
- [ ] Many items state (pagination/virtualization)
- [ ] Filtered empty state (no matches)

### Forms
- [ ] Empty / default state
- [ ] Filled state
- [ ] Validation error state (per field)
- [ ] Submitting state (button loading)
- [ ] Success state (confirmation)
- [ ] Failure state (submit error)

### Actions
- [ ] Default state
- [ ] Hover state
- [ ] Active/pressed state
- [ ] Disabled state (with reason)
- [ ] Loading state
- [ ] Success state
- [ ] Error state

### Content
- [ ] Loading state
- [ ] Loaded state
- [ ] Empty / no content state
- [ ] Partial content state
- [ ] Error / failed to load state
- [ ] Offline state

---

## Cost-Benefit Guide

**Invest in Best Solution when:**
- Core user flow (high traffic)
- Significant user/business impact
- Frequent support tickets
- Competitive differentiator

**Cheap Alternative acceptable when:**
- Admin/internal tool
- Low-frequency scenario
- MVP / time-constrained
- Can iterate based on feedback

**Progressive approach:**
1. Ship with Cheap alternative
2. Monitor errors + user feedback
3. Upgrade to Best based on data