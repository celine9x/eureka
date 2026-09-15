# Figma Dev Mode Annotations Guide

**Purpose:** Add detailed edge case annotations directly to Figma frames using Dev Mode annotations.

---

## Quick Start: Adding Annotations

**Every time you need to add an annotation, follow these steps in order:**

### Step 1: Check if Figma MCP is available

Try to use the `mcp__claude_ai_Figma__use_figma` tool. If it works, proceed to Step 2.

If you get "tool not available" or MCP error:
1. Tell the user: *"Figma MCP needs authentication. Please click the link below to sign in."*
2. Call any Figma MCP tool (like `get_screenshot`) to trigger OAuth
3. User completes browser login
4. Retry

### Step 2: Add annotation via use_figma

Call `use_figma` with this Plugin API code:

```javascript
(async () => {
  const node = await figma.getNodeByIdAsync("NODE_ID_HERE");
  if (node) {
    node.annotations = [{
      label: `ANNOTATION_TEXT_HERE`,
      properties: []
    }];
  }
})();
```

Replace `NODE_ID_HERE` with the target node (e.g., `1624:9467`).

### Step 3: If MCP fails completely

Generate the code and tell user to run it manually:

```
Run this in Figma Developer Console (Cmd + Option + I):

[paste the javascript code]
```

---

## Reference: How Figma APIs Work

Before setup, understand what can and cannot add annotations:

| Method | Can Add Annotations? | Auth Type |
|--------|---------------------|-----------|
| **Figma MCP** (`use_figma`) | ✅ Yes | OAuth (browser login) |
| **Figma Developer Console** | ✅ Yes | Already logged into Figma |
| **REST API** (Personal Access Token) | ❌ No | Token (`figd_...`) |

**Key facts:**
- Personal Access Tokens (`figd_...`) are for REST API **only** - they **cannot** add annotations
- Only the **Plugin API** can write annotations
- Plugin API runs either via MCP or manually in Figma's console

---

## Setup: Figma MCP Tools

The Figma MCP is a **cloud MCP server** provided by Claude.ai. It uses **OAuth** (browser login), not tokens.

### ⚠️ MCP Requires Re-Authentication Per Terminal

**OAuth sessions do not persist across terminals.** Each new Claude Code terminal must:
1. Trigger the OAuth flow by using a Figma MCP tool
2. Complete browser authentication
3. Return to terminal

This is a limitation of the MCP OAuth system.

### Step 1: Trigger Authentication

In a new terminal, ask Claude to use any Figma tool:
> "Get a screenshot of this Figma: [link]"

Claude will show an authentication link. Click it, sign in, authorize, and return.

### Step 2: Grant Tool Permissions

When prompted for `mcp__claude_ai_Figma__use_figma`, select **"Allow always"**.

Permissions persist in `~/.claude/settings.local.json`:
```json
{
  "permissions": {
    "allow": [
      "mcp__claude_ai_Figma__use_figma",
      "mcp__claude_ai_Figma__get_design_context",
      "mcp__claude_ai_Figma__get_screenshot"
    ]
  }
}
```

### Step 3: Verify MCP is Connected

Ask: *"What Figma MCP tools do you have access to?"*

If Claude lists `use_figma`, MCP is working. If not, re-authenticate.

---

## How to Add Annotations

### Using use_figma Tool

Once MCP is set up, provide Claude with:
1. **Figma file URL** or **file key**
2. **Node ID** to annotate (from Figma URL or Dev Mode)
3. **Annotation text**

**Example prompt:**
```
Add an annotation to node 1624:9467 in file abc123 with this text:

🟡 MEDIUM - UX: Sort Order Critique

Current: Status → Due date → Type → Alphabetically

Scenarios:
• Default sort unclear
• No ascending/descending toggle

Best Solution:
• Default to "Due date (soonest first)"
• Add ↑↓ direction toggle
```

Claude will call `use_figma` to execute:
```javascript
const node = await figma.getNodeByIdAsync("1624:9467");
node.annotations = [{
  label: `YOUR ANNOTATION TEXT`,
  properties: []
}];
```

---

### If MCP Says "Tool not available"

This means the OAuth session expired or wasn't established. **You must re-authenticate:**

1. Ask Claude: *"Get a screenshot of this Figma: [any figma link]"*
2. Claude will show an OAuth link - click it
3. Sign in and authorize
4. Return to terminal and retry

**Note:** This happens frequently with new terminals. It's expected behavior.

---

## Fallback: Figma Developer Console (Always Works)

If MCP is not connecting, use the **manual method**. This always works because it runs directly inside Figma.

### Steps:

1. **Open Figma file** in browser or desktop app

2. **Open Developer Console:**
   - Mac: `Cmd + Option + I`
   - Windows: `Ctrl + Alt + I`

3. **Go to Console tab**

4. **Paste and run:**

```javascript
(async () => {
  const node = await figma.getNodeByIdAsync("YOUR_NODE_ID");
  if (node) {
    node.annotations = [{
      label: `YOUR ANNOTATION TEXT HERE`,
      properties: []
    }];
    console.log("✅ Annotation added to:", node.name);
  } else {
    console.log("❌ Node not found");
  }
})();
```

5. **Press Enter** - annotation is added immediately

6. **View annotation:** Press `Shift + D` for Dev Mode, select the element

### Getting the Node ID

From a Figma URL like:
```
https://www.figma.com/design/abc123/File-Name?node-id=1624-9467
```

The node ID is `1624-9467`. Replace `-` with `:` → `1624:9467`

---

## Annotation Types

### 1. Summary Annotation
Add to the **main/largest frame** in the design section. This frame should contain the summary at the top, followed by its own detailed edge case annotation.

```
📋 EDGE CASE REVIEW - [Page/Flow Name]

[X] edge cases identified

| Priority | Count |
|----------|-------|
| 🔴 High | X |
| 🟡 Medium | X |
| 🟢 Low | X |

---

High Priority (Must Have)
• [Issue] → [Target element]
• [Issue] → [Target element]

Medium Priority (Should Have)
• [Issue] → [Target element]

Low Priority (Nice to Have)
• [Issue] → [Target element]

Select elements to see detailed annotations.

---

[Then include the detail annotation for THIS frame below]
```

### 2. Detail Annotation
Add to specific frames/components that need the edge case design.

```
🟡 MEDIUM - [Category]: [Title]

[Brief description of the problem]

Scenarios:
• [Scenario 1]
• [Scenario 2]
• [Scenario 3]

Best Solution:
• [Solution for scenario 1]
• [Solution for scenario 2]
• [Solution for scenario 3]

Cheap Alternative:
[Simpler fallback approach]
```

---

## Priority Levels

| Priority | Emoji | When to Use |
|----------|-------|-------------|
| 🔴 HIGH | `🔴` | Core user flows, blocking issues |
| 🟡 MEDIUM | `🟡` | Important but not blocking |
| 🟢 LOW | `🟢` | Nice to have, future consideration |

---

## Categories (from edgecase.md)

| Category | Description |
|----------|-------------|
| Data Extremes | Empty, loading, error, overflow states |
| Input Failures | Validation, duplicates, wrong format |
| System Failures | API errors, timeouts, offline |
| State Conflicts | Concurrent edits, stale data, navigation |
| Irreversible Actions | Delete, submit, publish safeguards |
| Access & Permissions | Authorization, session, sharing |

---

## Plugin API Implementation

### Summary + Detail on Main Frame

```javascript
// Find the main/largest frame in the design
const mainFrame = await figma.getNodeByIdAsync("MAIN_FRAME_ID");

// Add combined summary + detail annotation
mainFrame.annotations = [{
  label: `📋 EDGE CASE REVIEW - My Landscapes Page

6 edge cases identified

| Priority | Count |
|----------|-------|
| 🔴 High | 3 |
| 🟡 Medium | 2 |
| 🟢 Low | 1 |

---

High Priority (Must Have)
• Empty/Loading/Error States → Search history
• No Results State → Search history (filter)
• Delete Safeguards → Dialog

Medium Priority (Should Have)
• Rename Validation → Card project
• State Persistence → Main container

Low Priority (Nice to Have)
• Pagination → Projects grid

Select elements to see detailed annotations.

---

🔴 HIGH - Data Extremes: Missing Empty/Loading/Error States

No design for core data states.

Scenarios:
• User has no landscapes (first-time or after delete all)
• Grid is loading landscapes from API
• API fails to return data

Best Solution:
• Empty: Illustration + "Create your first landscape" CTA
• Loading: 6-9 skeleton cards matching grid layout
• Error: "Unable to load" + Retry button + support link

Cheap Alternative:
"No landscapes" text, spinner, generic error message.`,
  properties: []
}];
```

### Detail Annotation on Other Elements

```javascript
node.annotations = [{
  label: `🟡 MEDIUM - Data Extremes: Missing Filter Edge Cases

No design for filter edge cases.

Scenarios:
• All filters applied but no results match
• User wants to clear all filters at once
• Filter options loading

Best Solution:
• No match: "No landscapes match filters" + "Clear all filters" button
• Clear all: "Clear all" link when >1 filter active
• Loading: Skeleton for filter options

Cheap Alternative:
"No results" with individual filter remove buttons.`,
  properties: []
}];
```

---

## Workflow

1. **Run edge case analysis** using `heuristic/edgecase.md`
2. **Identify the main frame** - the largest/primary frame in the design
3. **Add summary annotation** to main frame (includes summary table + its own detail)
4. **Add detail annotations** to other target elements
5. **View in Dev Mode** (Shift + D in Figma)

---

## Viewing Annotations

1. Open Figma file
2. Press `Shift + D` to enter Dev Mode
3. Select the main frame to see summary + overview
4. Select individual elements for their specific edge case details
5. View full annotation text in right panel under "Annotations"
