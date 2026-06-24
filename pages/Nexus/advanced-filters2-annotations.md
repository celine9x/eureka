# Advanced Filters Builder â€” Design Annotations

## Advanced Search

### Field Selector â€” One Field Per Level

Each filter row has a dropdown for choosing which field to search on. Once a field is chosen in any row, it disappears from the options of all other rows at the same level. Fields used at the top level remain available inside groups, and vice versa â€” scoping is independent between levels. A subtle label showing how many fields are still available can reduce uncertainty for users building longer searches.

---

### Logic Operator â€” Shared Within a Level

The connector word between rows (And / Or) is one shared setting for the whole level, not an individual setting per row. The first row always shows "Where" and cannot be changed; changing the connector on any other row updates all rows at that level immediately. Show And / Or as a single level-wide control rather than repeating it on each row â€” per-row placement implies independent control that does not exist.

---

### Condition Types

Each row uses one of three conditions to define how values are matched. "Has any of" returns assets with at least one selected value (OR). "Has all of" returns assets that carry every selected value â€” the asset may also have additional values beyond those selected (superset). "Has none of" excludes assets with any selected value and requires at least one positive filter to be active elsewhere. Add a short tooltip to each option, since "has any of" and "has all of" look similar but produce very different results with multiple values.

---

### Condition Types â€” Single Value Behavior

When only one value is selected, "has any of" and "has all of" return identical results and display identically in the summary as "[Field] is [Value]." The difference between OR and superset logic only takes effect when two or more values are selected. A subtle inline hint â€” such as "Add more values to apply OR / AND logic" â€” helps users understand why the condition choice matters before they add a second value.

---

### Search Summary â€” Value Display

The summary translates each filter row into a plain sentence: "[Field] is [values]" for positive conditions, and "[Field] is not [values]" in red for "has none of." Up to three values appear inline; additional values appear as "+N more" in the condition's color. For fields with parent-child categories, the display rule depends on the condition: "has any of" and "has none of" collapse a fully-selected parent to its parent name (e.g., "Indication is Oncology"), while "has all of" must show each individual child joined by "and" (e.g., "Indication is NSCLC and SCLC and AML") â€” collapsing would make it visually identical to "has any of" and hide what the superset requirement actually covers.

---

## Additional Annotations

### Ontology Fields â€” Parent and Child Selection

Fields like Drug type, Target, and Indication show a hierarchical tree in their value picker. Selecting a parent automatically selects all its children; the chip trigger then collapses and shows the parent name rather than listing each child. In the search summary, the same collapse applies for "has any of" and "has none of," but "has all of" must always list individual children joined by "and" â€” collapsing to the parent name would make it indistinguishable from "has any of" and misrepresent what is required.

---

### Grouped Criteria

Any filter row can be converted into a group, which holds multiple rows with its own And / Or logic independent from the top level. The group counts as a single unit in the top-level logic, enabling compound queries such as (A and B) or (C and D). Deleting a group removes all its rows immediately with no undo â€” a confirmation step or brief undo toast should be shown when the group contains more than one row.

---

### "Select All" in Search Mode

When a user types in the value search field, a "Select all" option appears above the results and selects only the values matching the current search â€” not all available values. Clearing the search returns to the full list without changing existing selections. Label this "Select all results" rather than "Select all" to make clear that only the filtered subset is affected.

