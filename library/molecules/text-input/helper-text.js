/**
 * Eureka Design System - HelperText Atom
 *
 * Helper or error text below form fields.
 *
 * Usage:
 *   <e-helper-text>Optional helper message</e-helper-text>
 *   <e-helper-text variant="error">Error message</e-helper-text>
 *
 * Attributes:
 *   - variant: default | error (default: default)
 */

class EHelperText extends HTMLElement {
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

  get variant() { return this.getAttribute('variant') || 'default'; }

  render() {
    const styles = `
      <style>
        :host {
          display: block;
        }

        span {
          font-family: var(--font-family-primary);
          font-size: var(--text-body-md);
          font-weight: var(--font-weight-body-md);
          line-height: var(--line-height-body-md);
        }

        .default {
          color: var(--color-content-secondary);
        }

        .error {
          color: var(--color-content-negative);
        }
      </style>
    `;

    this.shadowRoot.innerHTML = `
      ${styles}
      <span class="${this.variant}">
        <slot></slot>
      </span>
    `;
  }
}

customElements.define('e-helper-text', EHelperText);

export default EHelperText;
