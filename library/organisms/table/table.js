/**
 * Eureka Design System - Table Organism
 *
 * Composes e-table-cell-header / e-table-cell-title (header row) and
 * e-table-cell (body rows) into a styled table container.
 *
 * Usage:
 *   <e-table>
 *     <e-table-row variant="header">
 *       <e-table-cell-header sortable>Company</e-table-cell-header>
 *       <e-table-cell-header sortable>Revenue</e-table-cell-header>
 *       <e-table-cell-header>Stage</e-table-cell-header>
 *     </e-table-row>
 *     <e-table-row>
 *       <e-table-cell>Acme Corp</e-table-cell>
 *       <e-table-cell>$1M</e-table-cell>
 *       <e-table-cell>Series A</e-table-cell>
 *     </e-table-row>
 *     <e-table-row selected>
 *       <e-table-cell>Beta Ltd</e-table-cell>
 *       <e-table-cell>$500K</e-table-cell>
 *       <e-table-cell>Seed</e-table-cell>
 *     </e-table-row>
 *   </e-table>
 *
 * e-table attributes: none
 *
 * e-table-row attributes:
 *   - variant: 'header' | 'body' (default: 'body')
 *   - selected: boolean
 *   - disabled: boolean
 *
 * e-table-row events:
 *   - e-row-click: fires on body row click, detail: { selected }
 */

// ---------------------------------------------------------------------------
// e-table-row
// ---------------------------------------------------------------------------

class ETableRow extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'selected', 'disabled'];
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

  get variant() { return this.getAttribute('variant') || 'body'; }
  get selected() { return this.hasAttribute('selected'); }
  set selected(val) {
    if (val) this.setAttribute('selected', '');
    else this.removeAttribute('selected');
  }
  get disabled() { return this.hasAttribute('disabled'); }

  _setupListeners() {
    if (this.variant !== 'body') return;
    const row = this.shadowRoot.querySelector('.row');
    if (!row) return;

    row.addEventListener('click', () => {
      if (this.disabled) return;
      this.dispatchEvent(new CustomEvent('e-row-click', {
        detail: { selected: this.selected },
        bubbles: true,
        composed: true,
      }));
    });
  }

  render() {
    const isHeader = this.variant === 'header';
    const rowClasses = [
      'row',
      isHeader ? 'header' : 'body',
      this.selected ? 'selected' : '',
      this.disabled ? 'disabled' : '',
    ].filter(Boolean).join(' ');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }

        .row {
          display: flex;
          align-items: stretch;
          width: 100%;
          box-sizing: border-box;
        }

        /* Header row */
        .row.header {
          background: var(--color-background-neutral-lighter, #F8F9FC);
          border-bottom: 1px solid var(--color-interaction-outline-enabled, #D9E0ED);
        }

        /* Body row */
        .row.body {
          background: var(--color-background-white, #FFFFFF);
          border-bottom: 1px solid var(--color-interaction-outline-enabled, #D9E0ED);
          cursor: pointer;
          transition: background var(--transition-fast, 150ms ease);
        }

        :host(:nth-child(even)) .row.body {
          background: var(--color-background-neutral-lighter, #F8F9FC);
        }

        .row.body:last-of-type,
        :host(:last-child) .row.body {
          border-bottom: none;
        }

        .row.body:not(.disabled):not(.selected):hover {
          background: var(--color-background-neutral-lighter, #F8F9FC);
        }

        /* Selected */
        .row.body.selected {
          background: var(--color-general-informative, #ECEDFF);
        }

        .row.body.selected:hover {
          background: var(--color-general-informative, #ECEDFF);
        }

        /* Disabled */
        .row.body.disabled {
          background: var(--color-background-neutral-light, #EFF2F9);
          cursor: not-allowed;
        }
      </style>
      <div class="${rowClasses}">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('e-table-row', ETableRow);

// ---------------------------------------------------------------------------
// e-table
// ---------------------------------------------------------------------------

class ETable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }

        .table {
          display: flex;
          flex-direction: column;
          width: 100%;
          box-sizing: border-box;
          background: var(--color-general-white, #FFFFFF);
          border-radius: var(--radius-md, 0.5rem);
          border: 1px solid var(--color-interaction-outline-enabled, #D9E0ED);
          box-shadow: var(--shadow-light-down, 0 0.0625rem 0.125rem 0 rgba(83, 113, 172, 0.08));
          overflow: hidden;
        }
      </style>
      <div class="table" role="table">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('e-table', ETable);

export { ETableRow, ETable };
export default ETable;
