/**
 * nexus/table-test.js — Hub template test (mock data from CSV)
 *
 * Click any body cell to open a dropdown showing all unique values
 * for that column, with the current cell's values pre-checked.
 */

import '../library/tokens/tokens.css';
import '../library/atoms/button.js';
import '../library/organisms/table/table-cell.js';
import '../library/organisms/table/table-cell-header.js';
import '../library/organisms/table/table.js';
import '../library/organisms/hub-header.js';
import '../library/templates/hub.js';
import '../library/molecules/dropdown-list/dropdown-list.js';

import rawCsv from './mock_data_table.csv?raw';

// ─── CSV parser ───────────────────────────────────────────────────────────────

function parseCsv(text) {
  const lines = text.trim().split('\n');
  return lines.map(line => {
    const fields = [];
    let current = '';
    let inQuotes = false;
    for (const ch of line) {
      if (ch === '"') { inQuotes = !inQuotes; }
      else if (ch === ',' && !inQuotes) { fields.push(current.trim()); current = ''; }
      else { current += ch; }
    }
    fields.push(current.trim());
    return fields;
  });
}

const [, ...rows] = parseCsv(rawCsv);
// CSV columns: 0=Asset Name, 1=Title, 2=Development Phase, 3=Drug Type, 4=Conflict Level
// Display columns (drop 4=Conflict Level, rename 1 → Clinical Indication)
const displayHeaders = ['Asset Name', 'Clinical Indication', 'Development Phase', 'Drug Type'];

// Pre-compute unique values for the 4 displayed columns only
const columnValues = displayHeaders.map((_, colIdx) => {
  const set = new Set();
  for (const row of rows) {
    const cell = row[colIdx] ?? '';
    cell.split(',').forEach(v => { const t = v.trim(); if (t) set.add(t); });
  }
  return [...set].sort();
});

// ─── helpers ─────────────────────────────────────────────────────────────────

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === true) node.setAttribute(k, '');
    else if (v !== false && v != null) node.setAttribute(k, v);
  }
  for (const child of children) {
    if (typeof child === 'string') node.append(child);
    else if (child) node.append(child);
  }
  return node;
}

// ─── page styles ─────────────────────────────────────────────────────────────

const style = document.createElement('style');
style.textContent = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: var(--font-family-primary, 'Sora', sans-serif);
    background: var(--color-background-neutral-lighter, #F8F9FC);
    color: var(--color-content-primary, #15154C);
    padding: var(--spacing-8, 2rem);
  }

  /* Floating dropdown overlay — backdrop only, no painting */
  #dropdown-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    pointer-events: none;
  }

  /* Panel is fixed to the viewport so shadow-DOM overflow:hidden on the table
     can never clip or trap it inside a painting layer */
  #dropdown-panel {
    position: fixed;
    z-index: 1001;
    width: 280px;
    max-height: 320px;
    display: flex;
    flex-direction: column;
    pointer-events: all;
  }

  #dropdown-panel e-dropdown-list {
    max-height: 320px;
    display: flex;
    flex-direction: column;
  }

  /* Clickable cell highlight */
  e-table-cell[data-clickable] {
    cursor: pointer;
  }

  /* Radio buttons inside the radio-card dropdown variant */
  #dropdown-panel e-radio-button {
    display: flex;
    width: 100%;
    padding: var(--spacing-2, 0.5rem);
    box-sizing: border-box;
  }
`;
document.head.append(style);
document.title = 'Hub — Eureka DS';

// ─── dropdown overlay ────────────────────────────────────────────────────────

const overlay  = el('div', { id: 'dropdown-overlay' });
const panel    = el('div', { id: 'dropdown-panel' });
overlay.append(panel);
// Appended after hub (see bottom of file) so it sits last in DOM order

let activeCell = null;

function openDropdown(cell, colIdx) {
  // Close if clicking same cell again
  if (activeCell === cell) { closeDropdown(); return; }
  activeCell = cell;

  // Current cell's values (split multi-value cells)
  const cellText = cell.textContent.trim();
  const cellValues = new Set(cellText.split(',').map(v => v.trim()).filter(Boolean));

  // Build dropdown
  panel.innerHTML = '';
  const dropdown = el('e-dropdown-list', {
    'search-placeholder': `Search ${displayHeaders[colIdx]}…`,
    'add-label': 'Add value',
  });

  const section = el('e-dropdown-section', { title: displayHeaders[colIdx] });
  for (const val of columnValues[colIdx]) {
    const item = el('e-dropdown-list-item', { value: val });
    if (cellValues.has(val)) item.setAttribute('checked', '');
    item.textContent = val;
    section.append(item);
  }
  dropdown.append(section);
  panel.append(dropdown);

  // Position below the cell, aligned to its left edge
  const rect = cell.getBoundingClientRect();
  const spaceBelow = window.innerHeight - rect.bottom;
  const panelHeight = 320;

  if (spaceBelow >= panelHeight || spaceBelow >= 160) {
    panel.style.top  = `${rect.bottom + 4}px`;
    panel.style.bottom = 'auto';
  } else {
    panel.style.bottom = `${window.innerHeight - rect.top + 4}px`;
    panel.style.top = 'auto';
  }

  const leftEdge = Math.min(rect.left, window.innerWidth - 284);
  panel.style.left = `${Math.max(0, leftEdge)}px`;

  overlay.style.pointerEvents = 'all';

  // Log e-change events
  dropdown.addEventListener('e-change', (e) => {
    console.log('[dropdown] e-change', e.detail);
  });
}

function closeDropdown() {
  activeCell = null;
  panel.innerHTML = '';
  overlay.style.pointerEvents = 'none';
}

function openConflictDropdown(cell) {
  if (activeCell === cell) { closeDropdown(); return; }
  activeCell = cell;

  panel.innerHTML = '';
  const dropdown = el('e-dropdown-list', {
    'search-placeholder': 'Search…',
    variant: 'radio-card',
    'no-add': true,
  });

  const section = el('e-dropdown-section', { title: 'Clinical Indication' });

  const rb1 = el('e-radio-button', { name: 'clinical-indication', value: "alzheimer's-disease", checked: true });
  rb1.textContent = "Alzheimer's disease";

  const rb2 = el('e-radio-button', { name: 'clinical-indication', value: 'cerebrovascular-disease' });
  rb2.textContent = 'Cerebrovascular disease';

  section.append(rb1, rb2);
  dropdown.append(section);
  panel.append(dropdown);

  // Position below the cell, aligned to its left edge
  const rect = cell.getBoundingClientRect();
  const spaceBelow = window.innerHeight - rect.bottom;
  const panelHeight = 320;

  if (spaceBelow >= panelHeight || spaceBelow >= 160) {
    panel.style.top    = `${rect.bottom + 4}px`;
    panel.style.bottom = 'auto';
  } else {
    panel.style.bottom = `${window.innerHeight - rect.top + 4}px`;
    panel.style.top    = 'auto';
  }

  const leftEdge = Math.min(rect.left, window.innerWidth - 284);
  panel.style.left = `${Math.max(0, leftEdge)}px`;

  overlay.style.pointerEvents = 'all';

  dropdown.addEventListener('e-change', (e) => {
    console.log('[conflict-dropdown] e-change', e.detail);
  });
}

// Close on overlay click (outside panel)
overlay.addEventListener('click', (e) => {
  if (!panel.contains(e.target)) closeDropdown();
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDropdown();
});

// ─── table ───────────────────────────────────────────────────────────────────

const header = el('e-hub-header', { slot: 'header', title: 'Pipeline Assets' });
header.append(
  el('e-button', { slot: 'actions', variant: 'secondary', size: 'md' }, 'Export'),
  el('e-button', { slot: 'actions', variant: 'primary',   size: 'md' }, 'Add Asset'),
);

const table = el('e-table', { slot: 'content' });

const tableHeaderRow = el('e-table-row', { variant: 'header' });
for (const label of displayHeaders) {
  tableHeaderRow.append(el('e-table-cell-header', { sortable: true }, label));
}
table.append(tableHeaderRow);

for (const [assetName, clinicalIndication, phase, drugType, conflict] of rows) {
  const hasConflict = conflict && conflict !== 'none';
  const alertAttr   = hasConflict ? conflict : null; // 'minor' | 'major' | null

  const row = el('e-table-row', {});
  row.append(
    el('e-table-cell', { 'data-clickable': true, ...(hasConflict && { alert: alertAttr }) },
      assetName),
    el('e-table-cell', { variant: 'long-text', 'data-clickable': true, ...(hasConflict && { alert: alertAttr }) },
      clinicalIndication),
    el('e-table-cell', { 'data-clickable': true, ...(hasConflict && { alert: alertAttr }) },
      phase),
    el('e-table-cell', { variant: 'long-text', 'data-clickable': true, ...(hasConflict && { alert: alertAttr }) },
      drugType),
  );
  table.append(row);
}

// ─── cell click → dropdown ───────────────────────────────────────────────────

// Alert icon click — e-table-cell stops propagation and emits e-alert-click
table.addEventListener('e-alert-click', (e) => {
  const cell = e.target;
  const row = cell.closest('e-table-row');
  if (!row) return;

  const cells = [...row.querySelectorAll('e-table-cell')];
  const colIdx = cells.indexOf(cell);
  const isKRZ5566 = cells[0]?.textContent.trim() === 'KRZ-5566';

  if (isKRZ5566 && colIdx === 1) {
    openConflictDropdown(cell);
  }
});

// Regular cell click → checkbox dropdown
table.addEventListener('click', (e) => {
  // Walk composed path to find the e-table-cell
  const cell = e.composedPath().find(
    node => node.tagName === 'E-TABLE-CELL'
  );
  if (!cell) return;

  // Ignore header rows
  const row = cell.closest('e-table-row');
  if (!row || row.getAttribute('variant') === 'header') return;

  // Determine column index from the row
  const cells = [...row.querySelectorAll('e-table-cell')];
  const colIdx = cells.indexOf(cell);
  if (colIdx === -1) return;

  openDropdown(cell, colIdx);
});

// ─── mount ───────────────────────────────────────────────────────────────────

const hub = el('e-hub');
hub.append(header, table);
document.body.append(hub);
// Overlay appended last so it is always above the hub in both DOM order and z-index
document.body.append(overlay);
