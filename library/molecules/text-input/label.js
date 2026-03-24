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
          gap: var(--spacing-1, 0.25rem);
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: var(--text-body-md, 0.75rem);
          font-weight: var(--font-weight-highlight-md, 600);
          line-height: var(--line-height-body-md, 1rem);
          color: var(--color-content-primary, #15154C);
          cursor: pointer;
        }

        .required {
          color: var(--color-content-negative, #FF7373);
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
