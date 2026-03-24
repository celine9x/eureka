# Eureka Design System - Development Instructions

## Overview
This document outlines the workflow for converting HTML component exports (from Zeroheight or other sources) into reusable Web Components following atomic design principles.

---

## Workflow: Processing New Component Files

When the user feeds an HTML file from the root folder (e.g., `button.html`, `text-input.html`, `checkbox.html`):

### Step 1: Analyze the HTML File
- Read the file to understand the component structure
- Identify design tokens being used (colors, spacing, typography, etc.)
- Determine if it's an **Atom**, **Molecule**, or **Organism**

### Step 2: Classify the Component

| Type | Description | Examples |
|------|-------------|----------|
| **Atom** | Single, indivisible UI element | Button, Input, Label, Icon, Badge, Checkbox, Radio |
| **Molecule** | Combination of 2+ atoms | TextField (label + input + helper), SearchBar, Dropdown |
| **Organism** | Complex section with multiple molecules | LoginForm, NavBar, Modal, Dialog |
| **Template** | Page layout skeleton | DashboardLayout, AuthLayout |
| **Page** | Final concrete view | LoginPage, SettingsPage |

### Step 3: Create the Web Component

**File Location:**
- Atoms → `/library/atoms/{component-name}.js`
- Molecules → `/library/molecules/{component-name}.js`
- Organisms → `/library/organisms/{component-name}.js`

**Naming Convention:**
- File: `kebab-case.js` (e.g., `helper-text.js`)
- Class: `PascalCase` (e.g., `EHelperText`)
- Custom Element: `e-{name}` (e.g., `e-helper-text`)

### Step 4: Update index.js
Add the import statement to `/library/index.js` under the appropriate section.

---

## Rules

### DO:
1. **Map to design tokens** - Always use CSS variables from `tokens.css`
2. **Use Shadow DOM** - All components use `attachShadow({ mode: 'open' })`
3. **Follow atomic structure** - If a component composes other elements, it belongs in molecules or higher
4. **Include JSDoc comments** - Document usage, attributes, and events
5. **Dispatch custom events** - Use `e-` prefix (e.g., `e-input`, `e-change`, `e-click`)
6. **Export default** - Always export the class as default

### DON'T:
1. **Don't auto-update demo.html** - Only update when explicitly requested
2. **Don't auto-run or execute** - Wait for user instruction
3. **Don't create unnecessary files** - Only create what's needed for the component
4. **Don't use deprecated methods** - Use `.slice()` instead of `.substr()`
5. **Don't duplicate styles** - Reference tokens, don't hardcode values

---

## Demo.html Policy

### When to Update:
- **ONLY** when the user explicitly asks to update the demo
- Example requests: "update demo", "add to demo", "show in demo"

### When NOT to Update:
- After creating a new component (wait for instruction)
- After modifying an existing component
- Automatically after any change

### What to Include When Updating:
1. Add component to sidebar navigation
2. Create a new section with:
   - All variants displayed
   - Interactive playground (if applicable)
   - Code examples
3. Load the component script at the bottom

---

## Component Template

```javascript
/**
 * Eureka Design System - {ComponentName} {Type}
 *
 * {Description}
 *
 * Usage:
 *   <e-{name} attr="value">{content}</e-{name}>
 *
 * Attributes:
 *   - attr: type (description)
 *
 * Events:
 *   - e-{event}: description
 */

class E{ComponentName} extends HTMLElement {
  static get observedAttributes() {
    return ['attr1', 'attr2'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  // Getters for attributes
  get attr1() { return this.getAttribute('attr1') || 'default'; }

  render() {
    const styles = `
      <style>
        :host {
          display: block;
        }
        /* Use tokens: var(--token-name, fallback) */
      </style>
    `;

    this.shadowRoot.innerHTML = `
      ${styles}
      <!-- Component HTML -->
    `;
  }
}

customElements.define('e-{name}', E{ComponentName});

export default E{ComponentName};
```

---

## Token Mapping Reference

When creating components, map properties to these token categories:

| Property | Token Pattern | Example |
|----------|--------------|---------|
| Colors | `--color-{category}-{variant}` | `--color-action-fill-primary-enabled` |
| Typography | `--text-{type}-{size}` | `--text-body-lg` |
| Font Weight | `--font-weight-{type}` | `--font-weight-heading-h1` |
| Line Height | `--line-height-{type}` | `--line-height-body-lg` |
| Spacing | `--spacing-{n}` | `--spacing-4` |
| Border Radius | `--radius-{size}` | `--radius-md` |
| Shadows | `--shadow-{type}` | `--shadow-focus` |
| Transitions | `--transition-{speed}` | `--transition-fast` |

---

## Current Library Structure

```
library/
├── tokens/
│   └── tokens.css              ← Source of truth (CSS variables)
├── atoms/
│   └── button.js               ← e-button
├── molecules/
│   └── text-input/
│       ├── text-input.js       ← e-text-input (main)
│       ├── input.js            ← internal
│       ├── label.js            ← internal
│       └── helper-text.js      ← internal
├── organisms/                  ← (empty, coming soon)
├── index.js                    ← Main entry
├── demo.html                   ← Interactive testing
└── instruction.md              ← This file
```

---

## Quick Reference Commands

**User says:** "Here's checkbox.html" or feeds a file
**Action:** Read → Classify → Create component → Update index.js → STOP (don't touch demo)

**User says:** "Update demo with the new checkbox"
**Action:** Add checkbox section to demo.html with variants and playground

**User says:** "Create a search bar molecule"
**Action:** Create in molecules/ → May need to create atoms first if missing → Update index.js → STOP
