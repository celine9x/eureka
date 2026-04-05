/**
 * Eureka Design System - Label Atom
 *
 * Form label element.
 *
 * Usage:
 *   <e-label>Field Name</e-label>
 *   <e-label required>Required Field</e-label>
 *   <e-label for="input-id">Linked Label</e-label>
 *
 * Attributes:
 *   - for: string (input id to link)
 *   - required: boolean (shows * indicator)
 */

class ELabel extends HTMLElement {
  static get observedAttributes() {
    return ['for', 'required'];
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

  get for() { return this.getAttribute('for'); }
  get required() { return this.hasAttribute('required'); }

  render() {
    const styles = `
      <style>
        :host {
          display: block;
        }

        label {
          display: flex;
          align-items: center;
          gap: var(--spacing-1);
          font-family: var(--font-family-primary);
          font-size: var(--text-body-md);
          font-weight: var(--font-weight-highlight-md);
          line-height: var(--line-height-body-md);
          color: var(--color-content-primary);
          cursor: pointer;
        }

        .required {
          color: var(--color-content-negative);
        }
      </style>
    `;

    this.shadowRoot.innerHTML = `
      ${styles}
      <label ${this.for ? `for="${this.for}"` : ''}>
        <slot></slot>
        ${this.required ? '<span class="required">*</span>' : ''}
      </label>
    `;
  }
}

customElements.define('e-label', ELabel);

export default ELabel;
