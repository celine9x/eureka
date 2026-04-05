/**
 * Eureka Design System - Input Atom
 *
 * Base input element - the smallest building block.
 * Use this directly for simple cases, or compose into molecules.
 *
 * Usage:
 *   <e-input placeholder="Enter text"></e-input>
 *   <e-input type="email" error></e-input>
 *
 * Attributes:
 *   - type: text | email | password | number | tel | url (default: text)
 *   - placeholder: string
 *   - value: string
 *   - disabled: boolean
 *   - readonly: boolean
 *   - error: boolean (triggers error styling)
 *   - name: string
 */

class EInput extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'placeholder', 'value', 'disabled', 'readonly', 'error', 'name'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback() {
    this.render();
    this.setupEventListeners();
  }

  get type() { return this.getAttribute('type') || 'text'; }
  get placeholder() { return this.getAttribute('placeholder') || ''; }
  get value() { return this.getAttribute('value') || ''; }
  get disabled() { return this.hasAttribute('disabled'); }
  get readonly() { return this.hasAttribute('readonly'); }
  get error() { return this.hasAttribute('error'); }
  get name() { return this.getAttribute('name'); }

  set value(val) {
    this.setAttribute('value', val);
    const input = this.shadowRoot.querySelector('input');
    if (input) input.value = val;
  }

  setupEventListeners() {
    const input = this.shadowRoot.querySelector('input');
    if (!input) return;

    input.addEventListener('input', (e) => {
      this.setAttribute('value', e.target.value);
      this.dispatchEvent(new CustomEvent('e-input', {
        detail: { value: e.target.value },
        bubbles: true,
        composed: true
      }));
    });

    input.addEventListener('change', (e) => {
      this.dispatchEvent(new CustomEvent('e-change', {
        detail: { value: e.target.value },
        bubbles: true,
        composed: true
      }));
    });

    input.addEventListener('focus', () => {
      this.dispatchEvent(new CustomEvent('e-focus', { bubbles: true, composed: true }));
    });

    input.addEventListener('blur', () => {
      this.dispatchEvent(new CustomEvent('e-blur', { bubbles: true, composed: true }));
    });
  }

  render() {
    const styles = `
      <style>
        :host {
          display: block;
        }

        input {
          width: 100%;
          padding: var(--spacing-2) var(--spacing-3);
          font-family: var(--font-family-primary);
          font-size: var(--text-body-lg);
          font-weight: var(--font-weight-body-lg);
          line-height: var(--line-height-body-lg);
          color: var(--color-content-primary);
          background-color: var(--color-interaction-fill-enabled);
          border: 1px solid var(--color-interaction-outline-enabled);
          border-radius: var(--radius-md);
          outline: none;
          transition: all var(--transition-fast);
          box-sizing: border-box;
        }

        input::placeholder {
          color: var(--color-content-tertiary);
        }

        input:hover:not(:disabled):not(.error) {
          border-color: var(--color-interaction-outline-hover);
        }

        input:focus:not(.error) {
          border-color: var(--color-interaction-outline-active);
          box-shadow: var(--shadow-focus);
        }

        input:disabled {
          background-color: var(--color-interaction-fill-disabled);
          border-color: var(--color-interaction-outline-disabled);
          color: var(--color-content-tertiary);
          cursor: not-allowed;
        }

        input:read-only {
          background-color: var(--color-general-neutral-lighter);
        }

        input.error {
          border-color: var(--color-interaction-outline-negative);
        }

        input.error:focus {
          border-color: var(--color-interaction-outline-negative);
          box-shadow: var(--shadow-focus);
        }
      </style>
    `;

    this.shadowRoot.innerHTML = `
      ${styles}
      <input
        class="${this.error ? 'error' : ''}"
        type="${this.type}"
        placeholder="${this.placeholder}"
        value="${this.value}"
        ${this.name ? `name="${this.name}"` : ''}
        ${this.disabled ? 'disabled' : ''}
        ${this.readonly ? 'readonly' : ''}
      />
    `;
  }
}

customElements.define('e-input', EInput);

export default EInput;
