# UX Critique Guide

**Purpose**
Systematically critique Figma designs for **usability, interaction logic, and UX best practices**. Focus on user cognition, task completion, and design quality.

> **Note:** For missing states and edge cases (empty, error, loading), use `edge-case.md` instead.

---

## How to Use This Guide

### Step 1: Provide Figma Link with Context
```
Critique this Figma: [link]

Context:
- Flow: [Flow name, e.g., "User onboarding"]
- Description: [What user accomplishes]
- Key screens: [Screens to analyze]
- Exclude: [Elements to ignore]
```

### Step 2: I Will Analyze These Categories
1. Clarity & Comprehension
2. Information Hierarchy
3. Interaction Logic
4. Feedback & System Status
5. Decision Friction
6. Cognitive Load
7. Consistency & Predictability

### Step 3: Output File
Generated file: **`critic-{flowname}.md`**

Example: `critic-user-onboarding.md`, `critic-checkout-flow.md`

---

## Output Template

```markdown
# UX Critique - {Flow Name}

**Figma:** [Link](url)
**Date:** YYYY-MM-DD

---

## Flow Summary
[1-2 sentence neutral summary of what the flow enables]

---

## Severity Summary

| Severity | Count | Description |
|----------|-------|-------------|
| 🔴 Critical | X | Blocks task completion |
| 🟠 High | X | Causes significant confusion |
| 🟡 Medium | X | Creates hesitation / reduces efficiency |
| 🟢 Low | X | Minor friction / polish |

---

## 1. Clarity & Comprehension

### Issue: [Specific unclear element]
**Severity:** 🟠 High
**Location:** [Screen] > [Element]

**Problem:**
[What is unclear and why it confuses users]

**Principle:**
[Recognition over recall / Progressive disclosure / etc.]

**Recommendation:**
[Concrete fix]

---

## 2. Information Hierarchy
[Continue for each category with issues found...]

---

## What's Working Well
- [Strength 1]
- [Strength 2]

---

## Priority Actions
1. [Most critical fix]
2. [Second priority]
3. [Third priority]
```

---

## Critique Categories

### 1. Clarity & Comprehension
> Can users understand what they're seeing and what to do?

| Check | Question |
|-------|----------|
| Labels | Are all labels clear and unambiguous? |
| Icons | Do icons clearly communicate meaning? |
| CTAs | Is the primary action obvious? |
| Copy | Is text concise and jargon-free? |
| Purpose | Is the screen's purpose immediately clear? |
| Instructions | Are complex steps explained? |

**Common Issues:**
- Ambiguous button labels ("Submit" vs "Create Account")
- Icons without labels
- Technical jargon in user-facing copy
- Missing context for required actions

---

### 2. Information Hierarchy
> Is information organized by importance? Can users scan effectively?

| Check | Question |
|-------|----------|
| Visual priority | Does the most important element stand out? |
| Grouping | Are related items visually grouped? |
| Scanning | Can users find what they need in 3 seconds? |
| Density | Is there too much competing for attention? |
| Primary action | Is the main CTA visually dominant? |
| Secondary actions | Are they appropriately de-emphasized? |

**Common Issues:**
- Primary and secondary actions have equal visual weight
- Important information buried below the fold
- Too many elements competing for attention
- Poor visual grouping of related items

---

### 3. Interaction Logic
> Do interactions behave as users expect?

| Check | Question |
|-------|----------|
| Affordances | Do clickable elements look clickable? |
| Feedback | Do interactions provide immediate response? |
| Reversibility | Can users undo or go back? |
| Flow | Does the sequence make logical sense? |
| Shortcuts | Are efficient paths available for power users? |
| Touch targets | Are interactive areas large enough (44px)? |

**Common Issues:**
- Links that don't look clickable
- No feedback after clicking
- No way to go back or cancel
- Illogical step sequence
- Buttons too close together

---

### 4. Feedback & System Status
> Does the system keep users informed?

| Check | Question |
|-------|----------|
| Progress | Do multi-step processes show progress? |
| Loading | Is there feedback during wait times? |
| Success | Is completion clearly confirmed? |
| Errors | Are errors clearly communicated? |
| State changes | Are changes to data visible? |
| Current location | Do users know where they are? |

**Common Issues:**
- No loading indicator
- Success without confirmation
- Unclear current step in a flow
- No indication that action was received

---

### 5. Decision Friction
> Can users make choices confidently?

| Check | Question |
|-------|----------|
| Options | Are choices clearly differentiated? |
| Consequences | Do users understand what happens next? |
| Defaults | Are sensible defaults provided? |
| Comparison | Can users compare options easily? |
| Commitment | Is the level of commitment clear? |
| Recovery | Can wrong choices be fixed? |

**Common Issues:**
- Too many options presented at once
- Unclear what each option does
- No recommended/default option
- Unclear if action is reversible
- Options that sound too similar

---

### 6. Cognitive Load
> Is the design mentally easy to use?

| Check | Question |
|-------|----------|
| Complexity | Is the screen overwhelmingly complex? |
| Memory | Does user need to remember info from previous screens? |
| Choices | Are there too many decisions at once? |
| Steps | Are there unnecessary steps? |
| Distractions | Are there elements unrelated to the task? |
| Chunking | Is complex info broken into manageable pieces? |

**Common Issues:**
- All options shown at once instead of progressively
- User must remember info across screens
- Multiple unrelated tasks on one screen
- Unnecessary confirmation steps
- Dense forms without logical grouping

---

### 7. Consistency & Predictability
> Does the design follow patterns users expect?

| Check | Question |
|-------|----------|
| Internal consistency | Same action = same result everywhere? |
| Pattern reuse | Are similar things styled similarly? |
| Platform conventions | Does it follow OS/web standards? |
| Terminology | Same concept = same word throughout? |
| Placement | Are common elements in expected locations? |
| Behavior | Do similar controls behave the same way? |

**Common Issues:**
- Different buttons for same action type
- Inconsistent terminology (Save vs Submit vs Done)
- Controls in unexpected locations
- Different interaction patterns for similar features

---

## UX Principles Reference

| Principle | Description | Application |
|-----------|-------------|-------------|
| **Recognition over Recall** | Show options, don't make users remember | Visible labels, recent items |
| **Progressive Disclosure** | Show only what's needed now | Hide advanced options |
| **Fitts's Law** | Larger, closer targets are easier | Big CTAs, grouped actions |
| **Hick's Law** | More choices = longer decisions | Limit options, smart defaults |
| **Aesthetic-Usability** | Pretty things seem easier to use | Polish matters |
| **Jakob's Law** | Users expect your site to work like others | Follow conventions |
| **Miller's Law** | Working memory holds ~7 items | Chunk information |
| **Serial Position** | First and last items remembered best | Important items at edges |

---

## Severity Definitions

| Severity | Definition | Example |
|----------|------------|---------|
| 🔴 **Critical** | User cannot complete task | Submit button doesn't work |
| 🟠 **High** | Significant confusion/frustration | Unclear what primary action is |
| 🟡 **Medium** | Noticeable hesitation | Confusing label on secondary action |
| 🟢 **Low** | Minor friction | Slightly awkward wording |

---

## What NOT to Critique

This guide is for **UX critique**, not:

| Out of Scope | Use Instead |
|--------------|-------------|
| Missing states (empty, error, loading) | `edge-case.md` |
| Pixel-perfect spacing | Design system review |
| Color palette choices | Brand review |
| Typography selection | Design system review |
| Implementation feasibility | Engineering review |
| Business requirements | Product review |

---

## Quality Standards

### Good Critique
> The primary action button competes visually with secondary actions, reducing decision clarity. This violates Hick's Law by presenting equal-weight options. Elevate the primary action using size and color contrast while demoting secondary actions to outline style.

### Bad Critique
> The layout feels confusing. Consider simplifying.

### Every Issue Must Include:
1. **What** is problematic (specific element)
2. **Why** it creates friction (user impact)
3. **Principle** involved (UX reasoning)
4. **Recommendation** (concrete fix)

---

## Tone Requirements

- Direct and analytical
- Professional and structured
- Concise but precise
- No filler or fluff
- No motivational language
- No generic praise
- Specific and actionable

---

## Rules

1. Only critique what is visible in defined scope
2. Do not invent missing screens
3. Do not assume backend/technical constraints
4. Avoid vague language ("feels confusing")
5. Don't repeat the same insight in multiple categories
6. Don't critique visual aesthetics unless they affect usability
7. Focus on user impact, not personal preference
8. Provide actionable recommendations