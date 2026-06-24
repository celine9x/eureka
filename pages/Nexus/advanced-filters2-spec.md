# Advanced Filters â€” Functional Specification

> Source of truth: `advanced-filters2.jsx`  
> Handoff to: Engineering

---

## 1. Overview

The page exposes two search modes via tabs:

| Tab | ID | Description |
|---|---|---|
| Basic search | `basic` | Fixed grid of predefined fields, single-value chip selects per field |
| Advanced search | `advanced` | Dynamic rule builder â€” rows, groups, logic operators, condition types |

A persistent hint infobox is shown above the tabs:
> *"To generate results, please enter a search name and select at least one criteria"*

---

## 2. Data Model

### 2.1 Item types

The Advanced tab stores criteria as a flat `items` array. Each item is one of two types:

```ts
type RowItem = {
  type: "row";
  id: string;           // generated, e.g. "row-1"
  logic: "Where" | "And" | "Or";
  fieldId: string;
  conditionId: "has-any-of" | "has-all-of" | "has-none-of";
  value: string[] | null;
};

type GroupItem = {
  type: "group";
  id: string;
  logic: "Where" | "And" | "Or";   // how this group joins to the list above it
  rowLogic: "And" | "Or";          // logic operator used between rows inside the group
  rows: RowItem[];
};
```

### 2.2 Default state

On first load (no URL params), the items array contains one row:

```json
[{ "type": "row", "id": "row-1", "logic": "Where", "fieldId": "therapeutic-area", "conditionId": "has-any-of", "value": null }]
```

### 2.3 URL persistence

On "Generate results", the full criteria payload is JSON-serialised, URI-encoded, and pushed to `?criteria=â€¦`:

```json
{ "searchName": "My search", "items": [ â€¦ ] }
```

On page load, this param is parsed back to restore state (`parseCriteriaFromUrl`).

---

## 3. Fields

### 3.1 Advanced search fields

Sourced from `SEARCH_FIELDS` in `nexus-search-data.js`. Each field has `{ id, label, icon }`.

Default field: `therapeutic-area`.

### 3.2 Field types

| Category | Field IDs | Value input |
|---|---|---|
| **Ontology** (hierarchical tree) | `drug-type`, `target`, `clinical-indication` | Ontology chip select (tree picker) |
| **Flat list** | all others | Flat chip select (checkbox list) |
| **Free text** | *(none currently â€” `TEXT_FIELDS = []`)* | Text input |

### 3.3 Basic search fields (fixed)

| Field ID | Label |
|---|---|
| `therapeutic-area` | Therapeutic area |
| `drug-type` | Drug type |
| `target` | Target |
| `mechanism` | Mechanism |
| `clinical-indication` | Indication |
| `development-phase` | Development phase |
| `territories` | Territories |

---

## 4. Conditions

Three condition options are available for every row:

| ID | Label | Review display | Polarity |
|---|---|---|---|
| `has-any-of` | has any of | "is" (neutral) | Positive |
| `has-all-of` | has all of | "is" (neutral) | Positive |
| `has-none-of` | has none of | "is not" (red) | Negative |

All three conditions are always enabled (no restriction on first row or any row).

---

## 5. Logic Operators

### 5.1 Top-level (between rows / groups)

Options: **And**, **Or**

- The first row always shows a non-interactive **"Where"** label (no operator needed).
- The second row shows a changeable logic dropdown (And / Or).
- All subsequent rows **mirror** the second row's value â€” only one shared operator at the top level. Changing the operator on any row syncs all rows to that value.
- When the second row's operator is disabled (locked), it is rendered as a static badge.

### 5.2 Inside groups

Options: **And**, **Or**

- The first row in a group shows a non-interactive **"Where"** label.
- Subsequent rows within the group share one `rowLogic` operator (same mirroring logic as top-level).

---

## 6. Field Uniqueness

Each field may appear **at most once** at the same level (top-level rows or within a single group). This is enforced at normalisation time:

- `normalizeRowsAtSameLevel` â€” scans a list of rows and replaces duplicate `fieldId` values with the next unused field.
- `findAvailableFieldId` â€” picks the first `SEARCH_FIELDS` entry not already used, falling back to the current field or `therapeutic-area`.
- The **FieldDropdown** only lists fields that are either the current row's field or not yet used at that level.

---

## 7. Groups

- Any top-level row can be **converted into a group** via the row actions menu (â‹® â†’ "Convert into group").
  - The original row becomes the first row of the new group.
  - The group inherits the row's `logic` value.
- Groups can contain multiple rows; rows within a group follow the same field-uniqueness and condition rules.
- Groups cannot be nested.
- A group is deleted via its "Delete group" button â€” all contained rows are removed.

---

## 8. Row Incompleteness

A row is considered **incomplete** when:

- `fieldId` is missing, OR
- `conditionId` is missing, OR
- `value` is empty/null (except for conditions `is-empty` / `is-not-empty` which need no value â€” reserved for future use)

Consequences of incompleteness:
- The **"Add search criteria"** button inside a group is disabled (shows tooltip: *"You have an incomplete search criteria"*) while any row in that group is incomplete.
- Incomplete rows do **not** count toward `hasAtLeastOneComplete`.

---

## 9. Generate Results â€” Enable / Disable Rules

The **"Generate results"** button is enabled only when **all** of the following are true:

| Condition | Detail |
|---|---|
| At least one complete row exists | Any top-level row or any row inside a group must be complete (field + condition + value set) |
| Search name is non-empty | The "Name this search" text field must have a non-blank value |
| Not only-none-of | The scenario below must NOT apply |

### 9.1 Only-none-of block

**Definition:** Exactly one complete condition exists across all top-level rows and all group rows, and that condition's `conditionId` is `"has-none-of"`.

**When this applies:**
- A **warning `Infobox`** appears above the name/generate row:
  > *"You can't search with only a 'has none of' condition. Please add at least one 'has any of' or 'has all of' criteria."*
- The "Generate results" button is **disabled**.

---

## 10. Conflict Detection

`detectConflictsB` scans all rows (top-level and inside groups) and flags a **conflict** when:

- A row with `conditionId === "has-none-of"` and a row with a positive condition (`has-any-of` or `has-all-of`) share the **same `fieldId`** AND have **overlapping values**.

Conflicts are detected but the current UI does not block generation based on them (reserved for future warning display).

---

## 11. Chip Input â€” Overflow Behaviour

Both flat and ontology chip inputs use a single-row chip display with overflow handling:

- Chips are measured via `useLayoutEffect` after render.
- A `BADGE_WIDTH = 40` reservation is applied so the overflow count badge (`+N`) always fits.
- Chips that don't fit are hidden; a `+N` badge with a tooltip listing the hidden values is shown.
- Removing a chip: fires `onChange` with the chip's ID removed from the value array.

---

## 12. Ontology Chip Input (Tree Picker)

Used for `drug-type`, `target`, `clinical-indication`.

### Selection model

Values stored as **leaf IDs** only. Parent nodes derive their selection state from their children:

| State | Condition |
|---|---|
| Checked | All leaf descendants selected |
| Indeterminate | Some (but not all) leaf descendants selected |
| Unchecked | No leaf descendants selected |

### Toggling a node

- **Checking a parent** â†’ adds all leaf descendants.
- **Unchecking a parent** â†’ removes all leaf descendants.

### Chip summarisation (`ontologySummarizeSelection`)

Displayed chips represent the **highest-level node** whose subtree is fully selected (avoids showing every individual leaf). If a parent is fully selected, only the parent chip appears â€” not its children.

### Search

- Typing filters the visible tree to only nodes (and their ancestors) matching the query string (case-insensitive substring).
- When a query is active, all matching subtrees are **auto-expanded**.
- A **"Select all"** row appears at the top when there are matching results; it toggles all matching leaf IDs.

---

## 13. Flat Chip Input

Used for all non-ontology fields.

- Options sourced from `FIELD_OPTIONS[fieldId]` in `nexus-search-data.js`.
- Multi-select checkbox list with search filter.
- **"Select all"** appears in search mode when filtered results exist; toggles all filtered IDs.
- Free-text entry: when a field has no predefined options (`FIELD_OPTIONS[fieldId]` is empty), the input becomes a free-text field â€” pressing **Enter** adds the typed string as a new chip ID (slugified: lowercase, spaces â†’ `-`).

---

## 14. Review Summary (Advanced tab)

A read-only summary bar displays the full query in sentence form above the name/generate row:

- Items are joined by their `logic` value (And / Or).
- Group rows are joined by `rowLogic` and wrapped together.
- Each row renders as: **`{field label}`** `{condition label}` **`{value 1}`** `{joinWord}` **`{value 2}`** â€¦
- Overflow: if more than 3 values, shows first 3 then `{joinWord} +N`.
- Negative conditions (`has-none-of`) render the condition label and join word in **red** (`--color-content-negative`).
- When no complete criteria exist, shows: *"Add at least one criteria"*.

---

## 15. "Too many results" Warning (reserved)

Title: **Too many results to generate**  
Description: *Narrow your criteria to run this search. Add at least one more filter to continue.*

This warning is not yet wired to a trigger in the current implementation â€” it is defined as a design spec for a future API-response-driven state.

---

## 16. State Normalisation Pipeline

Every mutation to `items` passes through `normalizeItemsByLevel`:

1. `ensureUniqueItemsAndRowIds` â€” regenerates any duplicate IDs.
2. `normalizeRowsAtSameLevel` (top-level rows) â€” deduplicate field IDs.
3. `normalizeRowsAtSameLevel` (inside each group) â€” deduplicate field IDs within each group.

---

## 17. Edge Cases

| Scenario | Behaviour |
|---|---|
| User changes condition from chip-type to text-type (or vice versa) | `value` is reset to `null` |
| User changes field | `value` is reset to `null` |
| User deletes all rows | `items` is empty; no criteria shown; Generate disabled |
| URL param is malformed | Silently falls back to default single-row state |
| All fields already used at a level | FieldDropdown still allows re-selecting the current row's own field; no new fields appear |

