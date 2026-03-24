/**
 * Eureka Design System - TableCell Atom
 *
 * A table cell component with text variants.
 *
 * Usage:
 *   <e-table-cell>Short text content</e-table-cell>
 *   <e-table-cell variant="long-text">Long text that can span multiple lines...</e-table-cell>
 *
 * Attributes:
 *   - variant: short-text | long-text (default: short-text)
 */

class ETableCell extends HTMLElement {
  static get observedAttributes() {
    return ['variant'];
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

  get variant() {
    return this.getAttribute('variant') || 'short-text';
  }

  render() {
    const styles = `
      <style>
        :host {
          display: block;
          width: 100%;
        }

        .cell {
          width: 100%;
          box-sizing: border-box;
          padding-left: var(--spacing-4, 1rem);
          padding-right: var(--spacing-4, 1rem);
          background: var(--color-general-neutral-lighter, #F8F9FC);
          border-bottom: 1px solid var(--color-interaction-outline-enabled, #D9E0ED);
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: var(--spacing-2, 0.5rem);
        }

        .cell-content {
          flex: 1 1 0;
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          color: var(--color-content-primary, #15154C);
          word-wrap: break-word;
        }

        /* Short text variant (default) */
        .cell.short-text {
          padding-top: var(--spacing-3-5, 0.875rem);
          padding-bottom: var(--spacing-3-5, 0.875rem);
        }

        .cell.short-text .cell-content {
          font-size: var(--text-body-lg, 0.875rem);
          font-weight: var(--font-weight-body-lg, 400);
          line-height: var(--line-height-body-lg, 1.25rem);
        }

        /* Long text variant */
        .cell.long-text {
          padding-top: var(--spacing-2, 0.5rem);
          padding-bottom: var(--spacing-2, 0.5rem);
        }

        .cell.long-text .cell-content {
          font-size: var(--text-body-md, 0.75rem);
          font-weight: var(--font-weight-body-md, 400);
          line-height: var(--line-height-body-md, 1rem);
          max-height: 3rem; /* 48px = 3 lines of 16px */
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      </style>
    `;

    this.shadowRoot.innerHTML = `
      ${styles}
      <div class="cell ${this.variant}">
        <div class="cell-content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('e-table-cell', ETableCell);

export default ETableCell;
