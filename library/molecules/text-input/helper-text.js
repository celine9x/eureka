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
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: var(--text-body-md, 0.75rem);
          font-weight: var(--font-weight-body-md, 400);
          line-height: var(--line-height-body-md, 1rem);
        }

        .default {
          color: var(--color-content-secondary, #5371AC);
        }

        .error {
          color: var(--color-content-negative, #FF7373);
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
