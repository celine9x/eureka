/**
 * Eureka Design System - TextInput Molecule
 *
 * A complete text input component with label and helper text.
 *
 * Usage:
 *   <e-text-input placeholder="Enter text"></e-text-input>
 *   <e-text-input label="Email" type="email" required></e-text-input>
 *   <e-text-input label="Password" type="password" error="Required field"></e-text-input>
 *   <e-text-input label="Name" helper="Enter your full name"></e-text-input>
 *
 * Attributes:
 *   - type: text | email | password | number | tel | url (default: text)
 *   - label: string (optional label above input)
 *   - placeholder: string
 *   - value: string
 *   - helper: string (helper text below input)
 *   - error: string (error message, triggers error state)
 *   - disabled: boolean
 *   - required: boolean
 *   - readonly: boolean
 *   - name: string (for forms)
 *   - id: string
 *
 * Events:
 *   - e-input: fires on input change
 *   - e-change: fires on blur
 *   - e-focus: fires on focus
 *   - e-blur: fires on blur
 */

import './label.js';
import './input.js';
import './helper-text.js';

class ETextInput extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'label', 'placeholder', 'value', 'helper', 'error', 'disabled', 'required', 'readonly', 'name', 'id'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._inputId = `input-${Math.random().toString(36).slice(2, 11)}`;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback() {
    if (this.shadowRoot.innerHTML) {
      this.render();
      this.setupEventListeners();
    }
  }

  get type() { return this.getAttribute('type') || 'text'; }
  get label() { return this.getAttribute('label'); }
  get placeholder() { return this.getAttribute('placeholder') || ''; }
  get value() { return this.getAttribute('value') || ''; }
  get helper() { return this.getAttribute('helper'); }
  get error() { return this.getAttribute('error'); }
  get disabled() { return this.hasAttribute('disabled'); }
  get required() { return this.hasAttribute('required'); }
  get readonly() { return this.hasAttribute('readonly'); }
  get name() { return this.getAttribute('name'); }
  get inputId() { return this.getAttribute('id') || this._inputId; }

  set value(val) {
    this.setAttribute('value', val);
    const input = this.shadowRoot.querySelector('e-input');
    if (input) input.value = val;
  }

  setupEventListeners() {
    const input = this.shadowRoot.querySelector('e-input');
    if (!input) return;

    // Remove old listeners by replacing element (simple approach)
    const newInput = input.cloneNode(true);
    input.parentNode.replaceChild(newInput, input);

    newInput.addEventListener('e-input', (e) => {
      this.setAttribute('value', e.detail.value);
      this.dispatchEvent(new CustomEvent('e-input', {
        detail: e.detail,
        bubbles: true,
        composed: true
      }));
    });

    newInput.addEventListener('e-change', (e) => {
      this.dispatchEvent(new CustomEvent('e-change', {
        detail: e.detail,
        bubbles: true,
        composed: true
      }));
    });

    newInput.addEventListener('e-focus', () => {
      this.dispatchEvent(new CustomEvent('e-focus', { bubbles: true, composed: true }));
    });

    newInput.addEventListener('e-blur', () => {
      this.dispatchEvent(new CustomEvent('e-blur', { bubbles: true, composed: true }));
    });
  }

  render() {
    const hasError = !!this.error;

    const styles = `
      <style>
        :host {
          display: block;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-1, 0.25rem);
        }
      </style>
    `;

    const labelHtml = this.label ? `
      <e-label for="${this.inputId}" ${this.required ? 'required' : ''}>${this.label}</e-label>
    ` : '';

    const helperHtml = this.error
      ? `<e-helper-text variant="error">${this.error}</e-helper-text>`
      : this.helper
        ? `<e-helper-text>${this.helper}</e-helper-text>`
        : '';

    this.shadowRoot.innerHTML = `
      ${styles}
      <div class="field">
        ${labelHtml}
        <e-input
          type="${this.type}"
          placeholder="${this.placeholder}"
          value="${this.value}"
          ${this.name ? `name="${this.name}"` : ''}
          ${this.disabled ? 'disabled' : ''}
          ${this.readonly ? 'readonly' : ''}
          ${hasError ? 'error' : ''}
        ></e-input>
        ${helperHtml}
      </div>
    `;
  }
}

customElements.define('e-text-input', ETextInput);

export default ETextInput;
