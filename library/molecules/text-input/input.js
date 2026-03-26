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

  attributeChangedCallback(name) {
    if (!this.shadowRoot.innerHTML) return;
    if (name === 'value') {
      const input = this.shadowRoot.querySelector('input');
      if (input && input !== document.activeElement) input.value = this.value;
      return;
    }
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
          padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: var(--text-body-lg, 0.875rem);
          font-weight: var(--font-weight-body-lg, 400);
          line-height: var(--line-height-body-lg, 1.25rem);
          color: var(--color-content-primary, #15154C);
          background-color: var(--color-interaction-fill-enabled, #FFFFFF);
          border: 1px solid var(--color-interaction-outline-enabled, #D9E0ED);
          border-radius: var(--radius-md, 0.5rem);
          outline: none;
          transition: all var(--transition-fast, 150ms ease);
          box-sizing: border-box;
        }

        input::placeholder {
          color: var(--color-content-tertiary, #93A6CB);
        }

        input:hover:not(:disabled):not(.error) {
          border-color: var(--color-interaction-outline-hover, #5371AC);
        }

        input:focus:not(.error) {
          border-color: var(--color-interaction-outline-active, #383ACC);
          box-shadow: var(--shadow-focus, 0 0 0.25rem 0 rgba(56, 58, 204, 0.4));
        }

        input:disabled {
          background-color: var(--color-interaction-fill-disabled, #F8F9FC);
          border-color: var(--color-interaction-outline-disabled, #D9E0ED);
          color: var(--color-content-tertiary, #93A6CB);
          cursor: not-allowed;
        }

        input:read-only {
          background-color: var(--color-general-neutral-lighter, #F8F9FC);
        }

        input.error {
          border-color: var(--color-interaction-outline-negative, #FF7373);
        }

        input.error:focus {
          border-color: var(--color-interaction-outline-negative, #FF7373);
          box-shadow: 0 0 0.25rem 0 rgba(255, 115, 115, 0.4);
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
