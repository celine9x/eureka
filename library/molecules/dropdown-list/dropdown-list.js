/**
 * Eureka Design System - Dropdown List Molecule
 *
 * A searchable, sectioned list with an optional "Add" action.
 * Composes: e-text-input (search), e-button (add), e-dropdown-list-item, e-radio-card.
 *
 * Usage:
 *   <!-- Full: search + sections with titles + add button -->
 *   <e-dropdown-list>
 *     <e-dropdown-section title="Neurology">
 *       <e-dropdown-list-item value="ad">Alzheimer's disease</e-dropdown-list-item>
 *       <e-dropdown-list-item value="pd" checked>Parkinson's disease</e-dropdown-list-item>
 *     </e-dropdown-section>
 *     <e-dropdown-section title="Oncology">
 *       <e-dropdown-list-item value="bc">Breast cancer</e-dropdown-list-item>
 *     </e-dropdown-section>
 *   </e-dropdown-list>
 *
 *   <!-- No search, no add, section without title -->
 *   <e-dropdown-list no-search no-add>
 *     <e-dropdown-section>
 *       <e-dropdown-list-item value="a">Option A</e-dropdown-list-item>
 *       <e-dropdown-list-item value="b">Option B</e-dropdown-list-item>
 *     </e-dropdown-section>
 *   </e-dropdown-list>
 *
 *   <!-- Radio cards as items -->
 *   <e-dropdown-list no-add>
 *     <e-dropdown-section title="Plans">
 *       <e-radio-card name="plan" value="pro" label="Pro Plan" info="Annual,USD"></e-radio-card>
 *       <e-radio-card name="plan" value="basic" label="Basic Plan"></e-radio-card>
 *     </e-dropdown-section>
 *   </e-dropdown-list>
 *
 * e-dropdown-list attributes:
 *   - no-search:          boolean — hides the search input (search shown by default)
 *   - search-placeholder: string  — placeholder for the search field (default: "Search")
 *   - no-add:             boolean — hides the add button row (shown by default)
 *   - add-label:          string  — label for the add button (default: "Add value")
 *
 * e-dropdown-section attributes:
 *   - title: string — optional uppercase section title; omit for no title
 *
 * Items (slotted inside e-dropdown-section):
 *   - e-dropdown-list-item — checkbox item (filtered by text content)
 *   - e-radio-card         — radio card item (filtered by `label` attribute + text content)
 *
 * Events:
 *   - e-change: bubbles from e-dropdown-list-item ({ value, label, checked })
 *               or from e-radio-card ({ value, name, checked })
 *   - e-add:    fires on the e-dropdown-list element when the add button is clicked
 */

import '../text-input/text-input.js';
import '../../atoms/button.js';
import './dropdown-list-item.js';
import '../radio-card.js';

// ─── e-dropdown-section ──────────────────────────────────────────────────────

class EDropdownSection extends HTMLElement {
  static get observedAttributes() {
    return ['title'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() { this.render(); }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.shadowRoot.innerHTML) this.render();
  }

  get title() { return this.getAttribute('title') || ''; }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        :host([hidden]) {
          display: none;
        }

        .section {
          display: flex;
          flex-direction: column;
          align-self: stretch;
          padding: var(--spacing-2, 0.5rem);
          gap: var(--spacing-1, 0.25rem);
        }

        .section-title {
          padding: var(--spacing-1, 0.25rem);
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: var(--text-highlight-md, 0.75rem);
          font-weight: var(--font-weight-highlight-md, 600);
          line-height: var(--line-height-highlight-md, 1rem);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--color-content-tertiary, #93A6CB);
        }
      </style>

      <div class="section">
        ${this.title ? `<div class="section-title">${this.title}</div>` : ''}
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('e-dropdown-section', EDropdownSection);

// ─── e-dropdown-list ─────────────────────────────────────────────────────────

class EDropdownList extends HTMLElement {
  static get observedAttributes() {
    return ['no-search', 'search-placeholder', 'no-add', 'add-label'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this._setupListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.shadowRoot.innerHTML) {
      this.render();
      this._setupListeners();
    }
  }

  get noSearch()          { return this.hasAttribute('no-search'); }
  get searchPlaceholder() { return this.getAttribute('search-placeholder') || 'Search'; }
  get noAdd()             { return this.hasAttribute('no-add'); }
  get addLabel()          { return this.getAttribute('add-label') || 'Add value'; }

  _setupListeners() {
    const searchInput = this.shadowRoot.querySelector('e-text-input');
    if (searchInput) {
      searchInput.addEventListener('e-input', (e) => {
        this._filter(e.detail?.value ?? '');
      });
    }

    const addBtn = this.shadowRoot.querySelector('.add-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('e-add', { bubbles: true, composed: true }));
      });
    }
  }

  _filter(query) {
    const q = query.trim().toLowerCase();

    // Filter both item types: e-dropdown-list-item (text content) and e-radio-card (label attr + text)
    this.querySelectorAll('e-dropdown-list-item, e-radio-card').forEach(item => {
      const text = [
        item.getAttribute('label') || '',
        item.textContent || '',
      ].join(' ').trim().toLowerCase();

      item.hidden = q.length > 0 && !text.includes(q);
    });

    // Hide sections where every item is filtered out
    this.querySelectorAll('e-dropdown-section').forEach(section => {
      const items = [...section.querySelectorAll('e-dropdown-list-item, e-radio-card')];
      section.hidden = items.length > 0 && items.every(i => i.hidden);
    });

    // Show "not found" state when query is non-empty and all items are hidden
    const noResults = this.shadowRoot.querySelector('.no-results');
    if (noResults) {
      const allHidden = q.length > 0 && [...this.querySelectorAll('e-dropdown-list-item, e-radio-card')].every(i => i.hidden);
      noResults.hidden = !allHidden;
      if (allHidden) {
        noResults.querySelector('.no-results-text').textContent = `'${query.trim()}' does not exist`;
      }
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .dropdown {
          display: flex;
          flex-direction: column;
          width: 100%;
          background: var(--color-general-white, #FFFFFF);
          border-radius: var(--radius-md, 0.5rem);
          outline: 1px solid var(--color-outline-neutral, #D9E0ED);
          outline-offset: -1px;
          box-shadow: var(--shadow-light-down, 0 0.0625rem 0.125rem 0 rgba(83, 113, 172, 0.08));
          box-sizing: border-box;
        }

        /* ── Top: search + scrollable content ── */
        .top {
          display: flex;
          flex-direction: column;
          align-self: stretch;
        }

        /* ── Search bar ── */
        .search {
          align-self: stretch;
          padding: var(--spacing-2, 0.5rem);
          border-bottom: 1px solid var(--color-outline-neutral, #D9E0ED);
        }

        /* ── Scrollable content area ── */
        .content {
          display: flex;
          flex-direction: column;
          align-self: stretch;
          max-height: var(--dropdown-list-max-height, 280px);
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(21, 21, 76, 0.4) transparent;
        }

        .content::-webkit-scrollbar {
          width: 6px;
        }

        .content::-webkit-scrollbar-track {
          background: transparent;
        }

        .content::-webkit-scrollbar-thumb {
          background: rgba(21, 21, 76, 0.35);
          border-radius: var(--radius-full, 9999px);
        }

        /* ── No results ── */
        .no-results {
          align-self: stretch;
          padding: var(--spacing-4, 1rem);
          border-bottom: 1px solid var(--color-outline-neutral, #D9E0ED);
        }

        .no-results-text {
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: var(--text-body-lg, 0.875rem);
          font-weight: var(--font-weight-body-lg, 400);
          line-height: var(--line-height-body-lg, 1.25rem);
          color: var(--color-content-secondary, #5371AC);
        }

        /* ── Add button row ── */
        .add {
          align-self: stretch;
          display: flex;
          align-items: center;
          padding: var(--spacing-2, 0.5rem) var(--spacing-4, 1rem);
          border-top: 1px solid var(--color-outline-neutral, #D9E0ED);
        }

        .add-btn {
          display: contents;
        }
      </style>

      <div class="dropdown">
        <div class="top">

          ${!this.noSearch ? `
            <div class="search">
              <e-text-input placeholder="${this.searchPlaceholder}"></e-text-input>
            </div>
          ` : ''}

          <div class="content">
            <slot></slot>
          </div>

          <div class="no-results" hidden>
            <span class="no-results-text"></span>
          </div>

        </div>

        ${!this.noAdd ? `
          <div class="add">
            <div class="add-btn">
              <e-button variant="tertiary" size="sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"/>
                </svg>
                ${this.addLabel}
              </e-button>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

customElements.define('e-dropdown-list', EDropdownList);

export { EDropdownSection, EDropdownList };
export default EDropdownList;
