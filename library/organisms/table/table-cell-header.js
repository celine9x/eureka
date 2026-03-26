/**
 * Eureka Design System - Table Cell Header
 *
 * An interactive column header cell. Same visual as e-table-cell-title but
 * clicking cycles the sort state: none → asc → desc → none.
 *
 * Usage:
 *   <e-table-cell-header>Company Name</e-table-cell-header>
 *   <e-table-cell-header sortable>Revenue</e-table-cell-header>
 *   <e-table-cell-header sortable sort="asc">Date</e-table-cell-header>
 *
 * Attributes:
 *   - sortable: boolean (enables sort cycling on click)
 *   - sort: '' | 'asc' | 'desc' (current sort direction)
 *
 * Events:
 *   - e-sort: fires on sort change, detail: { direction: 'asc' | 'desc' | 'none' }
 */

class ETableCellHeader extends HTMLElement {
  static get observedAttributes() {
    return ['sortable', 'sort'];
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

  get sortable() { return this.hasAttribute('sortable'); }
  get sort() { return this.getAttribute('sort') || ''; }
  set sort(val) {
    if (val) this.setAttribute('sort', val);
    else this.removeAttribute('sort');
  }

  _setupListeners() {
    const cell = this.shadowRoot.querySelector('.cell');
    if (!cell || !this.sortable) return;

    cell.addEventListener('click', () => this._cycleSort());
    cell.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this._cycleSort();
      }
    });
  }

  _cycleSort() {
    const next = this.sort === '' ? 'asc' : this.sort === 'asc' ? 'desc' : '';
    this.sort = next;

    this.dispatchEvent(new CustomEvent('e-sort', {
      detail: { direction: next || 'none' },
      bubbles: true,
      composed: true
    }));
  }

  _sortIcon() {
    if (!this.sortable) return '';

    if (this.sort === 'asc') {
      return `<svg class="sort-icon active" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 2L10 8H2L6 2Z" fill="currentColor"/>
      </svg>`;
    }

    if (this.sort === 'desc') {
      return `<svg class="sort-icon active" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 10L2 4H10L6 10Z" fill="currentColor"/>
      </svg>`;
    }

    /* Unsorted — dim double arrow */
    return `<svg class="sort-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1.5L9.5 6H2.5L6 1.5Z" fill="currentColor" opacity="0.4"/>
      <path d="M6 10.5L2.5 6H9.5L6 10.5Z" fill="currentColor" opacity="0.4"/>
    </svg>`;
  }

  render() {
    const styles = `
      <style>
        :host {
          display: block;
          flex: 1 1 0;
          min-width: 0;
        }

        .cell {
          display: inline-flex;
          align-items: center;
          justify-content: flex-start;
          gap: var(--spacing-1, 0.25rem);
          padding-left: var(--spacing-4, 1rem);
          padding-right: var(--spacing-4, 1rem);
          padding-top: var(--spacing-3, 0.75rem);
          padding-bottom: var(--spacing-3, 0.75rem);
          width: 100%;
          box-sizing: border-box;
          user-select: none;
        }

        .cell.sortable {
          cursor: pointer;
        }

        .cell.sortable:hover .cell-text {
          color: var(--color-content-primary, #15154C);
        }

        .cell.sortable:hover .sort-icon:not(.active) {
          opacity: 0.7;
        }

        .cell-text {
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: var(--text-body-md, 0.75rem);
          font-weight: var(--font-weight-body-md, 400);
          line-height: var(--line-height-body-md, 1rem);
          color: var(--color-content-secondary, #5371AC);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1 1 0;
          min-width: 0;
          transition: color var(--transition-fast, 150ms ease);
        }

        .sort-icon {
          flex-shrink: 0;
          color: var(--color-content-secondary, #5371AC);
          transition: opacity var(--transition-fast, 150ms ease);
        }

        .sort-icon.active {
          color: var(--color-content-brand, #4649FF);
        }
      </style>
    `;

    const cellClasses = ['cell', this.sortable ? 'sortable' : ''].filter(Boolean).join(' ');

    this.shadowRoot.innerHTML = `
      ${styles}
      <div
        class="${cellClasses}"
        ${this.sortable ? `tabindex="0" role="columnheader" aria-sort="${this.sort === 'asc' ? 'ascending' : this.sort === 'desc' ? 'descending' : 'none'}"` : ''}
      >
        <span class="cell-text"><slot></slot></span>
        ${this._sortIcon()}
      </div>
    `;
  }
}

customElements.define('e-table-cell-header', ETableCellHeader);

export default ETableCellHeader;
