/**
 * Eureka Design System - Hub Template
 *
 * A full page-section template composing e-hub-header (top) and
 * a content area (table or any block) below, separated by --spacing-4 (16px).
 *
 * Usage:
 *   <e-hub>
 *     <e-hub-header slot="header" title="Companies">
 *       <e-button slot="actions" variant="secondary" size="md">Export</e-button>
 *       <e-button slot="actions" variant="primary"   size="md">Add Company</e-button>
 *     </e-hub-header>
 *
 *     <e-table slot="content">
 *       <e-table-row variant="header">
 *         <e-table-cell-header sortable>Company</e-table-cell-header>
 *         <e-table-cell-header sortable>Revenue</e-table-cell-header>
 *         <e-table-cell-header>Stage</e-table-cell-header>
 *       </e-table-row>
 *       <e-table-row>
 *         <e-table-cell icon>Acme Corp</e-table-cell>
 *         <e-table-cell>€1.2M</e-table-cell>
 *         <e-table-cell>Series A</e-table-cell>
 *       </e-table-row>
 *     </e-table>
 *   </e-hub>
 *
 * Slots:
 *   - header:  e-hub-header (or any block for the top bar)
 *   - content: e-table or any main content block
 *
 * Attributes: none
 */

class EHub extends HTMLElement {
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

        .hub {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4, 1rem); /* 16px */
          width: 100%;
          box-sizing: border-box;
        }

        .hub__header {
          display: block;
          width: 100%;
        }

        .hub__content {
          display: block;
          width: 100%;
        }
      </style>

      <div class="hub">
        <div class="hub__header">
          <slot name="header"></slot>
        </div>
        <div class="hub__content">
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('e-hub', EHub);

export default EHub;
