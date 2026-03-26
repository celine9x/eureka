import '../library/index.js';
import '../library/tokens/tokens.css';

// ─── Page chrome ──────────────────────────────────────────────────────────────

const style = document.createElement('style');
style.textContent = `
  *, *::before, *::after { box-sizing: border-box; }

  body {
    margin: 0;
    background: var(--color-background-neutral-lighter);
    font-family: var(--font-family-primary);
    color: var(--color-content-primary);
    display: flex;
    min-height: 100vh;
  }

  /* ── Nav ── */
  #demo-nav {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 200px;
    flex-shrink: 0;
    background: var(--color-background-white);
    border-right: 1px solid var(--color-outline-neutral);
    overflow-y: auto;
    padding: var(--spacing-6) 0;
  }
  #demo-nav h2 {
    margin: 0 0 var(--spacing-4);
    padding: 0 var(--spacing-4);
    font-size: var(--text-body-lg);
    font-weight: var(--font-weight-heading-h3);
    color: var(--color-content-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  #demo-nav a {
    display: block;
    padding: var(--spacing-2) var(--spacing-4);
    font-size: var(--text-body-lg);
    color: var(--color-content-secondary);
    text-decoration: none;
    border-radius: 0;
    transition: background var(--transition-fast), color var(--transition-fast);
  }
  #demo-nav a:hover { background: var(--color-background-neutral-lighter); color: var(--color-content-primary); }
  #demo-nav .nav-category {
    margin-top: var(--spacing-4);
    padding: 0 var(--spacing-4);
    font-size: var(--text-body-md);
    font-weight: var(--font-weight-highlight-md);
    color: var(--color-content-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  /* ── Main ── */
  #demo-main {
    flex: 1;
    padding: var(--spacing-8);
    max-width: 960px;
    overflow: auto;
  }

  #demo-main h1 {
    margin: 0 0 var(--spacing-8);
    font-size: var(--text-heading-h1);
    font-weight: var(--font-weight-heading-h1);
    color: var(--color-content-primary);
  }

  /* ── Section ── */
  .demo-section {
    margin-bottom: var(--spacing-12);
  }
  .demo-section h2 {
    margin: 0 0 var(--spacing-6);
    font-size: var(--text-heading-h2);
    font-weight: var(--font-weight-heading-h2);
    color: var(--color-content-primary);
    border-bottom: 2px solid var(--color-outline-neutral);
    padding-bottom: var(--spacing-3);
  }
  .demo-subsection {
    margin-bottom: var(--spacing-8);
  }
  .demo-subsection h3 {
    margin: 0 0 var(--spacing-4);
    font-size: var(--text-heading-h3);
    font-weight: var(--font-weight-heading-h3);
    color: var(--color-content-secondary);
  }
  .demo-label {
    display: block;
    font-size: var(--text-body-md);
    color: var(--color-content-tertiary);
    margin-bottom: var(--spacing-2);
    font-weight: var(--font-weight-highlight-md);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  /* ── Row / Group helpers ── */
  .demo-row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: var(--spacing-3);
    margin-bottom: var(--spacing-4);
  }
  .demo-col {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3);
  }
  .demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: var(--spacing-4);
  }
  .demo-card {
    background: var(--color-background-white);
    border: 1px solid var(--color-outline-neutral);
    border-radius: var(--radius-md);
    padding: var(--spacing-4);
  }

  /* ── Event log ── */
  #event-log-wrapper {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 360px;
    z-index: 100;
  }
  #event-log-toggle {
    width: 100%;
    padding: var(--spacing-2) var(--spacing-4);
    background: var(--color-content-primary);
    color: var(--color-content-inverted);
    border: none;
    cursor: pointer;
    font-family: var(--font-family-primary);
    font-size: var(--text-body-md);
    font-weight: var(--font-weight-highlight-md);
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #event-log {
    background: #1a1a2e;
    color: #a6e3a1;
    font-family: monospace;
    font-size: 11px;
    height: 180px;
    overflow-y: auto;
    padding: var(--spacing-3);
    display: none;
  }
  #event-log.open { display: block; }
  #event-log .entry { margin-bottom: 4px; line-height: 1.4; }
  #event-log .entry .ts { color: #6c7086; }
  #event-log .entry .name { color: #89b4fa; }

  /* ── Table wrapper ── */
  .table-wrapper {
    background: var(--color-background-white);
    border: 1px solid var(--color-outline-neutral);
    border-radius: var(--radius-md);
    overflow: hidden;
  }

  /* ── Dropdown wrapper ── */
  .dropdown-wrapper {
    width: 280px;
    background: var(--color-background-white);
    border: 1px solid var(--color-outline-neutral);
    border-radius: var(--radius-md);
    overflow: hidden;
  }
`;
document.head.appendChild(style);

// ─── Event log ────────────────────────────────────────────────────────────────

const logWrapper = document.createElement('div');
logWrapper.id = 'event-log-wrapper';
logWrapper.innerHTML = `
  <button id="event-log-toggle">
    <span>Event Log</span>
    <span id="log-badge" style="background:#4649FF;border-radius:9999px;padding:1px 7px;font-size:10px;">0</span>
  </button>
  <div id="event-log"></div>
`;
document.body.appendChild(logWrapper);

const logEl = document.getElementById('event-log');
const logBadge = document.getElementById('log-badge');
const logToggle = document.getElementById('event-log-toggle');
let logCount = 0;

logToggle.addEventListener('click', () => logEl.classList.toggle('open'));

function log(eventName, detail) {
  logCount++;
  logBadge.textContent = logCount;
  const ts = new Date().toLocaleTimeString('en', { hour12: false });
  const entry = document.createElement('div');
  entry.className = 'entry';
  entry.innerHTML = `<span class="ts">[${ts}]</span> <span class="name">${eventName}</span> ${JSON.stringify(detail ?? {})}`;
  logEl.prepend(entry);
}

function listenAll(root, events) {
  events.forEach(evt => {
    root.addEventListener(evt, (e) => log(evt, e.detail));
  });
}

// ─── Layout ───────────────────────────────────────────────────────────────────

const nav = document.createElement('nav');
nav.id = 'demo-nav';
nav.innerHTML = `
  <h2>Eureka DS</h2>
  <span class="nav-category">Atoms</span>
  <a href="#buttons">Button</a>
  <a href="#chips">Chip</a>
  <a href="#radio-buttons">Radio Button</a>
  <a href="#links">Link</a>
  <span class="nav-category">Molecules</span>
  <a href="#text-inputs">Text Input</a>
  <a href="#radio-cards">Radio Card</a>
  <a href="#dropdown-list">Dropdown List</a>
  <span class="nav-category">Organisms</span>
  <a href="#table">Table</a>
  <a href="#hub-header">Hub Header</a>
  <span class="nav-category">Templates</span>
  <a href="#hub">Hub</a>
`;

const main = document.createElement('main');
main.id = 'demo-main';
main.innerHTML = `<h1>Component Demo</h1>`;

document.body.prepend(nav);
document.body.insertBefore(main, logWrapper);

function section(id, title, content) {
  const sec = document.createElement('section');
  sec.className = 'demo-section';
  sec.id = id;
  sec.innerHTML = `<h2>${title}</h2>${content}`;
  main.appendChild(sec);
  return sec;
}

// ─────────────────────────────────────────────────────────────────────────────
// ATOMS
// ─────────────────────────────────────────────────────────────────────────────

// ── Buttons ──────────────────────────────────────────────────────────────────

const btnSec = section('buttons', 'Button', `
  <div class="demo-subsection">
    <h3>Variants</h3>
    <div class="demo-row">
      <e-button variant="primary">Primary</e-button>
      <e-button variant="secondary">Secondary</e-button>
      <e-button variant="tertiary">Tertiary</e-button>
      <e-button variant="negative">Negative</e-button>
      <e-button variant="positive">Positive</e-button>
    </div>
  </div>
  <div class="demo-subsection">
    <h3>Sizes</h3>
    <div class="demo-row" style="align-items:center;">
      <e-button variant="primary" size="lg">Large</e-button>
      <e-button variant="primary" size="md">Medium</e-button>
      <e-button variant="primary" size="sm">Small</e-button>
    </div>
  </div>
  <div class="demo-subsection">
    <h3>Disabled</h3>
    <div class="demo-row">
      <e-button variant="primary" disabled>Primary</e-button>
      <e-button variant="secondary" disabled>Secondary</e-button>
      <e-button variant="tertiary" disabled>Tertiary</e-button>
      <e-button variant="negative" disabled>Negative</e-button>
      <e-button variant="positive" disabled>Positive</e-button>
    </div>
  </div>
  <div class="demo-subsection">
    <h3>Block (full width)</h3>
    <div style="max-width:320px;">
      <e-button variant="primary" block>Full Width Button</e-button>
    </div>
  </div>
`);
listenAll(btnSec, ['click']);

// ── Chips ─────────────────────────────────────────────────────────────────────

const chipSec = section('chips', 'Chip', `
  <div class="demo-subsection">
    <h3>Variants</h3>
    <div class="demo-row">
      <e-chip>Neutral</e-chip>
      <e-chip variant="negative">Negative</e-chip>
    </div>
  </div>
  <div class="demo-subsection">
    <h3>With color accent</h3>
    <div class="demo-row">
      <e-chip color="rgba(125,190,255,1)">Blue</e-chip>
      <e-chip color="rgba(112,224,229,1)">Cyan</e-chip>
      <e-chip color="rgba(115,229,172,1)">Green</e-chip>
      <e-chip color="rgba(239,235,156,1)">Yellow</e-chip>
      <e-chip color="rgba(255,174,112,1)">Orange</e-chip>
      <e-chip color="rgba(255,115,115,1)">Red</e-chip>
      <e-chip color="rgba(133,135,255,1)">Purple</e-chip>
    </div>
  </div>
  <div class="demo-subsection">
    <h3>Removable</h3>
    <div class="demo-row" id="removable-chips">
      <e-chip removable color="rgba(125,190,255,1)">Analytics</e-chip>
      <e-chip removable color="rgba(115,229,172,1)">Biotech</e-chip>
      <e-chip removable color="rgba(133,135,255,1)">AI</e-chip>
    </div>
  </div>
  <div class="demo-subsection">
    <h3>With chevron</h3>
    <div class="demo-row">
      <e-chip chevron>Dropdown</e-chip>
      <e-chip chevron color="rgba(133,135,255,1)">Filter</e-chip>
    </div>
  </div>
  <div class="demo-subsection">
    <h3>Disabled</h3>
    <div class="demo-row">
      <e-chip disabled>Disabled neutral</e-chip>
      <e-chip variant="negative" disabled>Disabled negative</e-chip>
    </div>
  </div>
`);

// Remove chip on e-remove
document.getElementById('removable-chips').addEventListener('e-remove', (e) => {
  log('e-remove', { label: e.target.textContent.trim() });
  e.target.remove();
});
chipSec.addEventListener('e-chevron-click', () => log('e-chevron-click', {}));

// ── Radio Buttons ─────────────────────────────────────────────────────────────

const radioBtnSec = section('radio-buttons', 'Radio Button', `
  <div class="demo-subsection">
    <h3>Group — sizes</h3>
    <div class="demo-row" style="align-items:center;gap:var(--spacing-6);">
      <div class="demo-col">
        <span class="demo-label">Large</span>
        <e-radio-button name="size-demo" value="lg" size="lg">Option A</e-radio-button>
        <e-radio-button name="size-demo" value="md" size="lg" checked>Option B</e-radio-button>
        <e-radio-button name="size-demo" value="sm" size="lg">Option C</e-radio-button>
      </div>
      <div class="demo-col">
        <span class="demo-label">Medium</span>
        <e-radio-button name="size-md-demo" value="a" size="md" checked>Option A</e-radio-button>
        <e-radio-button name="size-md-demo" value="b" size="md">Option B</e-radio-button>
        <e-radio-button name="size-md-demo" value="c" size="md">Option C</e-radio-button>
      </div>
      <div class="demo-col">
        <span class="demo-label">Small</span>
        <e-radio-button name="size-sm-demo" value="x" size="sm" checked>Option A</e-radio-button>
        <e-radio-button name="size-sm-demo" value="y" size="sm">Option B</e-radio-button>
        <e-radio-button name="size-sm-demo" value="z" size="sm">Option C</e-radio-button>
      </div>
    </div>
  </div>
  <div class="demo-subsection">
    <h3>Disabled</h3>
    <div class="demo-row">
      <e-radio-button name="dis-demo" value="a" disabled>Disabled unchecked</e-radio-button>
      <e-radio-button name="dis-demo" value="b" disabled checked>Disabled checked</e-radio-button>
    </div>
  </div>
`);
radioBtnSec.addEventListener('e-change', (e) => log('e-change', e.detail));

// ── Links ─────────────────────────────────────────────────────────────────────

const linkSec = section('links', 'Link', `
  <div class="demo-subsection">
    <h3>Sizes</h3>
    <div class="demo-row" style="align-items:center;">
      <e-link href="#">Large (LG)</e-link>
      <e-link href="#" size="md">Medium (MD)</e-link>
    </div>
  </div>
  <div class="demo-subsection">
    <h3>With icons</h3>
    <div class="demo-row" style="align-items:center;">
      <e-link href="#" icon-left>
        <svg slot="icon-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2Zm0 14.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Z"/></svg>
        Left icon
      </e-link>
      <e-link href="#" icon-right>
        Right icon
        <svg slot="icon-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clip-rule="evenodd"/></svg>
      </e-link>
      <e-link href="#" icon-left icon-right size="md">
        <svg slot="icon-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2Z"/></svg>
        Both icons
        <svg slot="icon-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path fill-rule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.25a.75.75 0 0 1 0 1.06l-4.5 4.25a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clip-rule="evenodd"/></svg>
      </e-link>
    </div>
  </div>
  <div class="demo-subsection">
    <h3>Disabled</h3>
    <div class="demo-row" style="align-items:center;">
      <e-link disabled>Large disabled</e-link>
      <e-link disabled size="md">Medium disabled</e-link>
    </div>
  </div>
`);
listenAll(linkSec, ['e-click']);

// ─────────────────────────────────────────────────────────────────────────────
// MOLECULES
// ─────────────────────────────────────────────────────────────────────────────

// ── Text Input ────────────────────────────────────────────────────────────────

const textInputSec = section('text-inputs', 'Text Input', `
  <div class="demo-grid">
    <div class="demo-card">
      <span class="demo-label">Default</span>
      <e-text-input label="Full name" placeholder="John Doe" name="full-name"></e-text-input>
    </div>
    <div class="demo-card">
      <span class="demo-label">With helper text</span>
      <e-text-input label="Email" type="email" placeholder="you@example.com" helper="We'll never share your email." name="email"></e-text-input>
    </div>
    <div class="demo-card">
      <span class="demo-label">Required</span>
      <e-text-input label="Company" placeholder="Acme Corp" required name="company"></e-text-input>
    </div>
    <div class="demo-card">
      <span class="demo-label">Error state</span>
      <e-text-input label="Password" type="password" value="abc" error="Password must be at least 8 characters." name="password"></e-text-input>
    </div>
    <div class="demo-card">
      <span class="demo-label">Disabled</span>
      <e-text-input label="Read-only field" value="Locked value" disabled name="disabled-field"></e-text-input>
    </div>
    <div class="demo-card">
      <span class="demo-label">Readonly</span>
      <e-text-input label="Readonly field" value="Cannot edit" readonly name="readonly-field"></e-text-input>
    </div>
    <div class="demo-card">
      <span class="demo-label">Number</span>
      <e-text-input label="Headcount" type="number" placeholder="0" name="headcount"></e-text-input>
    </div>
    <div class="demo-card">
      <span class="demo-label">No label</span>
      <e-text-input placeholder="Search…" name="search-bare"></e-text-input>
    </div>
  </div>
`);
listenAll(textInputSec, ['e-input', 'e-change', 'e-focus', 'e-blur']);

// ── Radio Cards ───────────────────────────────────────────────────────────────

const radioCardSec = section('radio-cards', 'Radio Card', `
  <div class="demo-subsection">
    <h3>Group</h3>
    <div class="demo-col" style="max-width:480px;gap:var(--spacing-2);">
      <e-radio-card name="plan" value="starter" label="Starter" info="Up to 5 users,10 GB storage,Email support" checked></e-radio-card>
      <e-radio-card name="plan" value="pro" label="Pro" info="Up to 50 users,100 GB storage,Priority support"></e-radio-card>
      <e-radio-card name="plan" value="enterprise" label="Enterprise" info="Unlimited users,1 TB storage,Dedicated support"></e-radio-card>
    </div>
  </div>
  <div class="demo-subsection">
    <h3>Disabled</h3>
    <div class="demo-col" style="max-width:480px;gap:var(--spacing-2);">
      <e-radio-card name="plan-dis" value="unavailable" label="Unavailable plan" info="Coming soon,Not yet available" disabled></e-radio-card>
    </div>
  </div>
`);
radioCardSec.addEventListener('e-change', (e) => log('e-change (radio-card)', e.detail));

// ── Dropdown List ─────────────────────────────────────────────────────────────

const dropdownSec = section('dropdown-list', 'Dropdown List', `
  <div class="demo-subsection">
    <h3>With sections</h3>
    <div class="dropdown-wrapper">
      <e-dropdown-list search-placeholder="Search sectors…" add-label="Add sector" id="dropdown-demo">
        <e-dropdown-section title="Top picks">
          <e-dropdown-list-item value="biotech" color="rgba(115,229,172,1)" checked>Biotech</e-dropdown-list-item>
          <e-dropdown-list-item value="ai" color="rgba(133,135,255,1)">Artificial Intelligence</e-dropdown-list-item>
          <e-dropdown-list-item value="fintech" color="rgba(125,190,255,1)">Fintech</e-dropdown-list-item>
        </e-dropdown-section>
        <e-dropdown-section title="Other">
          <e-dropdown-list-item value="cleantech" color="rgba(112,224,229,1)">Cleantech</e-dropdown-list-item>
          <e-dropdown-list-item value="medtech" color="rgba(239,235,156,1)">Medtech</e-dropdown-list-item>
          <e-dropdown-list-item value="saas" color="rgba(255,174,112,1)">SaaS</e-dropdown-list-item>
          <e-dropdown-list-item value="hardware" color="rgba(180,139,125,1)">Hardware</e-dropdown-list-item>
        </e-dropdown-section>
      </e-dropdown-list>
    </div>
  </div>
  <div class="demo-subsection">
    <h3>Scrollable list</h3>
    <div class="dropdown-wrapper">
      <e-dropdown-list search-placeholder="Search…" add-label="Add value" id="dropdown-scrollable">
        <e-dropdown-list-item value="label-1">Label</e-dropdown-list-item>
        <e-dropdown-list-item value="label-2">Label</e-dropdown-list-item>
        <e-dropdown-list-item value="label-3">Label</e-dropdown-list-item>
        <e-dropdown-list-item value="label-4">Label</e-dropdown-list-item>
        <e-dropdown-list-item value="label-5">Label</e-dropdown-list-item>
        <e-dropdown-list-item value="label-6">Label</e-dropdown-list-item>
        <e-dropdown-list-item value="label-7">Label</e-dropdown-list-item>
        <e-dropdown-list-item value="label-8">Label</e-dropdown-list-item>
      </e-dropdown-list>
    </div>
  </div>
  <div class="demo-subsection">
    <h3>No "Add" button, with sub-info</h3>
    <div class="dropdown-wrapper">
      <e-dropdown-list no-add search-placeholder="Search companies…" id="dropdown-companies">
        <e-dropdown-list-item value="acme" subinfo="New York, USA" checked>Acme Corp</e-dropdown-list-item>
        <e-dropdown-list-item value="globex" subinfo="Springfield, USA">Globex</e-dropdown-list-item>
        <e-dropdown-list-item value="initech" subinfo="Austin, USA">Initech</e-dropdown-list-item>
        <e-dropdown-list-item value="umbrella" subinfo="Raccoon City" disabled>Umbrella Corp (disabled)</e-dropdown-list-item>
      </e-dropdown-list>
    </div>
  </div>
`);
listenAll(dropdownSec, ['e-change', 'e-add']);

// ─────────────────────────────────────────────────────────────────────────────
// ORGANISMS
// ─────────────────────────────────────────────────────────────────────────────

// ── Table ──────────────────────────────────────────────────────────────────────

const tableSec = section('table', 'Table', `
  <div class="demo-subsection">
    <div class="table-wrapper">
      <e-table id="demo-table">
        <e-table-row variant="header">
          <e-table-cell-header sortable sort="asc">Company</e-table-cell-header>
          <e-table-cell-header sortable>Stage</e-table-cell-header>
          <e-table-cell-header sortable>Country</e-table-cell-header>
          <e-table-cell-title>Employees</e-table-cell-title>
          <e-table-cell-title>Status</e-table-cell-title>
          <e-table-cell-header>Action</e-table-cell-header>
          <e-table-cell-header>Object</e-table-cell-header>
          <e-table-cell-header>Sectors</e-table-cell-header>
          <e-table-cell-header>Tags</e-table-cell-header>
        </e-table-row>
        <e-table-row>
          <e-table-cell icon>Acme Corp</e-table-cell>
          <e-table-cell>Series B</e-table-cell>
          <e-table-cell>USA</e-table-cell>
          <e-table-cell>250</e-table-cell>
          <e-table-cell alert="minor">Review needed</e-table-cell>
          <e-table-cell variant="button">
            <e-button variant="secondary" size="sm">Active</e-button>
          </e-table-cell>
          <e-table-cell variant="two-level">
            <e-link slot="primary" href="#">Acme Corp</e-link>
            <e-link slot="secondary" href="#" size="md">acmecorp.com</e-link>
          </e-table-cell>
          <e-table-cell variant="tags">
            <e-chip color="rgba(125,190,255,1)">Biotech</e-chip>
            <e-chip color="rgba(112,224,229,1)">SaaS</e-chip>
            <e-chip color="rgba(239,235,156,1)">AI</e-chip>
            <e-chip color="rgba(133,135,255,1)">Fintech</e-chip>
          </e-table-cell>
          <e-table-cell variant="tags-2">
            <e-chip color="rgba(125,190,255,1)">Biotech</e-chip>
            <e-chip color="rgba(112,224,229,1)">SaaS</e-chip>
            <e-chip color="rgba(239,235,156,1)">AI</e-chip>
            <e-chip color="rgba(255,174,112,1)">Hardware</e-chip>
            <e-chip color="rgba(133,135,255,1)">Fintech</e-chip>
            <e-chip color="rgba(115,229,172,1)">Cleantech</e-chip>
          </e-table-cell>
        </e-table-row>
        <e-table-row selected>
          <e-table-cell icon>Globex Ltd</e-table-cell>
          <e-table-cell>Series A</e-table-cell>
          <e-table-cell>UK</e-table-cell>
          <e-table-cell>80</e-table-cell>
          <e-table-cell>Active</e-table-cell>
          <e-table-cell variant="button">
            <e-button variant="secondary" size="sm">Active</e-button>
          </e-table-cell>
          <e-table-cell variant="two-level">
            <e-link slot="primary" href="#">Globex Ltd</e-link>
            <e-link slot="secondary" href="#" size="md">globex.co.uk</e-link>
          </e-table-cell>
          <e-table-cell variant="tags">
            <e-chip color="rgba(115,229,172,1)">Fintech</e-chip>
            <e-chip color="rgba(133,135,255,1)">AI</e-chip>
          </e-table-cell>
          <e-table-cell variant="tags-2">
            <e-chip color="rgba(115,229,172,1)">Fintech</e-chip>
            <e-chip color="rgba(133,135,255,1)">AI</e-chip>
          </e-table-cell>
        </e-table-row>
        <e-table-row>
          <e-table-cell icon>Initech</e-table-cell>
          <e-table-cell>Seed</e-table-cell>
          <e-table-cell>Germany</e-table-cell>
          <e-table-cell>12</e-table-cell>
          <e-table-cell alert="major">Action required</e-table-cell>
          <e-table-cell variant="button">
            <e-button variant="secondary" size="sm">Review</e-button>
          </e-table-cell>
          <e-table-cell variant="two-level">
            <e-link slot="primary" href="#">Initech</e-link>
            <e-link slot="secondary" href="#" size="md">initech.de</e-link>
          </e-table-cell>
          <e-table-cell variant="tags">
            <e-chip color="rgba(255,174,112,1)">Hardware</e-chip>
            <e-chip color="rgba(239,235,156,1)">Medtech</e-chip>
            <e-chip color="rgba(255,115,115,1)">Cleantech</e-chip>
          </e-table-cell>
          <e-table-cell variant="tags-2">
            <e-chip color="rgba(255,174,112,1)">Hardware</e-chip>
            <e-chip color="rgba(239,235,156,1)">Medtech</e-chip>
            <e-chip color="rgba(255,115,115,1)">Cleantech</e-chip>
          </e-table-cell>
        </e-table-row>
        <e-table-row disabled>
          <e-table-cell icon>Umbrella Corp</e-table-cell>
          <e-table-cell>Pre-seed</e-table-cell>
          <e-table-cell>Japan</e-table-cell>
          <e-table-cell>5</e-table-cell>
          <e-table-cell>Inactive</e-table-cell>
          <e-table-cell variant="button">
            <e-button variant="secondary" size="sm" disabled>Inactive</e-button>
          </e-table-cell>
          <e-table-cell variant="two-level">
            <e-link slot="primary" disabled>Umbrella Corp</e-link>
            <e-link slot="secondary" size="md" disabled>umbrella.jp</e-link>
          </e-table-cell>
          <e-table-cell variant="tags"></e-table-cell>
          <e-table-cell variant="tags-2"></e-table-cell>
        </e-table-row>
        <e-table-row>
          <e-table-cell icon>Hooli</e-table-cell>
          <e-table-cell>Series C</e-table-cell>
          <e-table-cell>USA</e-table-cell>
          <e-table-cell>1200</e-table-cell>
          <e-table-cell alert="orange">Pending</e-table-cell>
          <e-table-cell variant="button">
            <e-button variant="secondary" size="sm">Pending</e-button>
          </e-table-cell>
          <e-table-cell variant="two-level">
            <e-link slot="primary" href="#">Hooli Inc.</e-link>
            <e-link slot="secondary" href="#" size="md">hooli.xyz</e-link>
          </e-table-cell>
          <e-table-cell variant="tags">
            <e-chip color="rgba(133,135,255,1)">AI</e-chip>
            <e-chip color="rgba(125,190,255,1)">Cloud</e-chip>
            <e-chip color="rgba(112,224,229,1)">SaaS</e-chip>
            <e-chip>+3</e-chip>
          </e-table-cell>
          <e-table-cell variant="tags-2">
            <e-chip color="rgba(133,135,255,1)">AI</e-chip>
            <e-chip color="rgba(125,190,255,1)">Cloud</e-chip>
            <e-chip color="rgba(112,224,229,1)">SaaS</e-chip>
            <e-chip color="rgba(115,229,172,1)">Fintech</e-chip>
            <e-chip color="rgba(255,174,112,1)">Hardware</e-chip>
            <e-chip>+3</e-chip>
          </e-table-cell>
        </e-table-row>
      </e-table>
    </div>
  </div>
`);
listenAll(tableSec, ['e-row-click', 'e-sort', 'e-alert-click']);

// Toggle row selection on click
document.getElementById('demo-table').addEventListener('e-row-click', (e) => {
  const row = e.target;
  const isSelected = row.hasAttribute('selected');
  if (isSelected) {
    row.removeAttribute('selected');
  } else {
    row.setAttribute('selected', '');
  }
});

// ── Hub Header ────────────────────────────────────────────────────────────────

const hubHeaderSec = section('hub-header', 'Hub Header', `
  <div class="demo-subsection">
    <div class="demo-card">
      <e-hub-header title="Portfolio companies" id="hub-header-demo">
        <e-button slot="actions" variant="secondary" size="sm">Export</e-button>
        <e-button slot="actions" variant="primary" size="sm">Add company</e-button>
      </e-hub-header>
    </div>
  </div>
  <div class="demo-subsection">
    <div class="demo-card">
      <e-hub-header title="Investments">
        <e-button slot="actions" variant="tertiary" size="sm">Settings</e-button>
      </e-hub-header>
    </div>
  </div>
`);
listenAll(hubHeaderSec, ['click']);

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

const hubSec = section('hub', 'Hub (Template)', `
  <div class="demo-subsection">
    <e-hub>
      <e-hub-header slot="header" title="Portfolio companies">
        <e-button slot="actions" variant="secondary" size="sm">Export</e-button>
        <e-button slot="actions" variant="primary" size="sm">Add company</e-button>
      </e-hub-header>

      <e-table slot="content">
        <e-table-row variant="header">
          <e-table-cell-header sortable sort="asc">Company</e-table-cell-header>
          <e-table-cell-header sortable>Stage</e-table-cell-header>
          <e-table-cell-header sortable>Country</e-table-cell-header>
          <e-table-cell-title>Status</e-table-cell-title>
        </e-table-row>
        <e-table-row>
          <e-table-cell icon>Acme Corp</e-table-cell>
          <e-table-cell>Series B</e-table-cell>
          <e-table-cell>USA</e-table-cell>
          <e-table-cell>Active</e-table-cell>
        </e-table-row>
        <e-table-row>
          <e-table-cell icon>Globex Ltd</e-table-cell>
          <e-table-cell>Series A</e-table-cell>
          <e-table-cell>UK</e-table-cell>
          <e-table-cell alert="minor">Review needed</e-table-cell>
        </e-table-row>
        <e-table-row disabled>
          <e-table-cell icon>Archived Co</e-table-cell>
          <e-table-cell>Pre-seed</e-table-cell>
          <e-table-cell>France</e-table-cell>
          <e-table-cell>Inactive</e-table-cell>
        </e-table-row>
      </e-table>
    </e-hub>
  </div>
`);
listenAll(hubSec, ['e-row-click', 'e-sort', 'click']);

// ─────────────────────────────────────────────────────────────────────────────
// Open log on first event
// ─────────────────────────────────────────────────────────────────────────────
document.addEventListener('e-change', () => {
  if (!logEl.classList.contains('open')) logEl.classList.add('open');
}, { once: true });
