/**
 * Eureka Design System - Hub Header Organism
 *
 * A page-section header with a heading-h2 title on the left
 * and an action slot on the right for buttons.
 *
 * Usage:
 *   <e-hub-header title="Companies"></e-hub-header>
 *
 *   <e-hub-header title="Portfolio">
 *     <e-button slot="actions" variant="secondary" size="md">Export</e-button>
 *     <e-button slot="actions" variant="primary"   size="md">Add Company</e-button>
 *   </e-hub-header>
 *
 * Attributes:
 *   - title: string — heading text (left side)
 *
 * Slots:
 *   - actions: one or more buttons rendered in a flex row on the right
 */

class EHubHeader extends HTMLElement {
  static get observedAttributes() {
    return ['title'];
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

  get title() { return this.getAttribute('title') || ''; }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }

        .hub-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-4, 1rem);
          width: 100%;
          box-sizing: border-box;
        }

        .hub-header__title {
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: var(--text-heading-h2, 1.25rem);
          font-weight: var(--font-weight-heading-h2, 700);
          line-height: var(--line-height-heading-h2, 1.75rem);
          color: var(--color-content-primary, #15154C);
          flex: 1 1 0;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .hub-header__actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-2, 0.5rem);
          flex-shrink: 0;
        }
      </style>

      <div class="hub-header">
        <span class="hub-header__title">${this.title}</span>
        <div class="hub-header__actions">
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('e-hub-header', EHubHeader);

export default EHubHeader;
