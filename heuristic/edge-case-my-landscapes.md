# Edge Cases - My Landscapes Hub

**Figma:** [Link](https://www.figma.com/design/aFPztwWCuz0xMokZpRbNV7/%E2%9C%85-UI---Nexus-V2?node-id=8534-111406)
**Date:** 2026-09-07
**Dev Mode Annotations:** 6 annotations added - select frames in Dev Mode (Shift+D) to view

---

## Status Summary

| Status | Count | Items |
|--------|-------|-------|
| ✅ Complete | 5 | Empty state, Card loading, Card error, Delete modal, Toast/Undo |
| 🟡 Partial | 2 | Rename validation, Delete button states |
| 🔴 Missing | 3 | Grid skeleton, Search no results, Filter no results |

---

## Flow Summary
Users manage their saved landscape projects (scientific research views) from a central hub. They can view, search, filter, rename, and delete landscapes displayed as cards in a grid layout.

---

## ✅ States Now Designed

### Empty State
- Illustration + CTA for first-time users
- Located in: Search history frame (9186:126447)

### Card States
- **Loading**: Skeleton card while data loads
- **Finished**: Default, Hover, Active states
- **Error**: Error state with recovery option
- Located in: Landscape card component (6586:21743)

### Delete Flow
- Confirmation dialog with Cancel/Delete
- Undo toast after deletion
- Located in: Dialog (9274:55731), Toast (9274:55732)

### Inline Rename
- Edit mode for landscape name
- Located in: Landscape card variants

---

## 🔴 Still Missing (High Priority)

### 1. Grid Loading Skeleton
**Problem:** Individual card loading exists, but full grid loading is not shown.

**Scenarios:**
- Initial page load - all cards loading simultaneously
- Refresh after filter change
- Return to page after navigation

**Best Solution:**
- 6-9 skeleton cards in grid layout
- Maintain grid structure during load
- Progressive reveal as cards load

**Cheap Alternative:** Centered spinner (loses grid context)

---

### 2. Search No Results
**Problem:** No design when search returns zero matches.

**Scenarios:**
- Search query matches nothing
- Typo in search query
- Search for deleted landscape name

**Best Solution:**
- "No landscapes match '[query]'" message
- "Clear search" button
- Search tips or suggestions

**Cheap Alternative:** Generic "No results" text

---

### 3. Filter No Results
**Problem:** No design when filter combination returns empty.

**Scenarios:**
- Filter combination too restrictive
- All filtered items were deleted
- Date range has no items

**Best Solution:**
- "No landscapes match filters" message
- "Clear all filters" button
- Show active filter count

**Cheap Alternative:** Empty grid with filter pills still visible

---

## 🟡 Needs Verification (Medium Priority)

### 4. Rename Validation
**Unclear if designed:** Inline rename exists but validation states not visible.

**Scenarios to verify:**
- Empty name submitted → Inline error?
- Duplicate name → Warning message?
- Character limit → Counter shown?
- Save in progress → Button loading?
- Save failed → Error recovery?

---

### 5. Delete Button States
**Unclear if designed:** Delete dialog exists but button states not visible.

**Scenarios to verify:**
- Delete button loading while processing
- Error state if delete fails
- Landscape name shown in confirmation
- Impact warning for dependencies

---

## 🟢 Low Priority (Nice to Have)

### 6. Pagination
- Consider for 100+ landscapes
- Current design shows ~15 cards

### 7. Offline Support
- Queue actions when offline
- Show offline indicator

### 8. Real-time Sync
- Update when others edit shared landscapes
- Conflict resolution for concurrent edits

---

## Missing States Checklist (Updated)

### Grid / Card List
- [x] Empty state (no landscapes) - **NOW SHOWN**
- [ ] Loading state (skeleton grid) - **NOT SHOWN**
- [ ] Error state (failed to load) - **NOT SHOWN** (card error exists, not grid)
- [x] Card loading state - **NOW SHOWN**
- [x] Card error state - **NOW SHOWN**
- [ ] Filtered empty state (no matches) - **NOT SHOWN**

### Search
- [x] Search field - **SHOWN**
- [ ] Searching state (loading) - **NOT SHOWN**
- [ ] No results state - **NOT SHOWN**

### Filter
- [x] Filter applied indicator - **SHOWN**
- [ ] No matches state - **NOT SHOWN**

### Rename (Inline)
- [x] Default state - **SHOWN**
- [x] Edit mode - **SHOWN**
- [ ] Validation error state - **UNCLEAR**
- [ ] Saving state - **UNCLEAR**

### Delete Modal
- [x] Confirmation state - **SHOWN**
- [ ] Deleting state (button loading) - **UNCLEAR**
- [x] Undo toast - **NOW SHOWN**

---

## Recommendations

### Must Address Before Dev
1. **Grid loading skeleton** - Critical for perceived performance
2. **Search/Filter no results** - Very common scenario

### Verify with Designer
1. **Rename validation states** - May be in component variants
2. **Delete button loading** - May be in button component

### Can Defer
1. Pagination (if <100 landscapes typical)
2. Offline support
3. Real-time sync
