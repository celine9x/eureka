/**
 * Eureka Design System - Table Cell Title
 *
 * A column header label cell. Renders a text label in secondary style
 * with an optional sort indicator (controlled externally via the `sort` attribute).
 *
 * Usage:
 *   <e-table-cell-title>Company Name</e-table-cell-title>
 *   <e-table-cell-title sort="asc">Revenue</e-table-cell-title>
 *   <e-table-cell-title sort="desc">Date</e-table-cell-title>
 *
 * Attributes:
 *   - sort: '' | 'asc' | 'desc'
 *     Controls the sort indicator display. Empty = no indicator shown.
 *
 * Design source: title.js → "Table title / LG 240" (data-show-sorting)
 */

class ETableCellTitle extends HTMLElement {
  static get observedAttributes() {
    return ['sort'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.shadowRoot.innerHTML) {
      this.render();
    }
  }

  get sort() { return this.getAttribute('sort') || ''; }

  _sortIcon() {
    if (!this.sort) return '';

    if (this.sort === 'asc') {
      return `<svg class="sort-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 2L10 8H2L6 2Z" fill="currentColor"/>
      </svg>`;
    }

    return `<svg class="sort-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 10L2 4H10L6 10Z" fill="currentColor"/>
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
        }

        .sort-icon {
          flex-shrink: 0;
          color: var(--color-content-secondary, #5371AC);
        }
      </style>
    `;

    this.shadowRoot.innerHTML = `
      ${styles}
      <div class="cell">
        <span class="cell-text"><slot></slot></span>
        ${this._sortIcon()}
      </div>
    `;
  }
}

customElements.define('e-table-cell-title', ETableCellTitle);

export default ETableCellTitle;
