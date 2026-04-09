/**
 * Eureka Design System - TextInput Molecule
 *
 * Complete text input with label and helper text.
 *
 * Usage:
 *   <e-text-input placeholder="Enter text"></e-text-input>
 *   <e-text-input label="Email" type="email" required></e-text-input>
 *   <e-text-input label="Password" type="password" error="Required field"></e-text-input>
 *   <e-text-input label="Name" helper="Enter your full name"></e-text-input>
 *
 * Attributes:
 *   - type: text | email | password | number | tel | url (default: text)
 *   - label: string
 *   - placeholder: string
 *   - value: string
 *   - helper: string
 *   - error: string (error message, triggers error state)
 *   - disabled: boolean
 *   - required: boolean
 *   - readonly: boolean
 *   - name: string
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
    this._inputRef = null;
    this._handleInputEvent = this._handleInputEvent.bind(this);
    this._handleChangeEvent = this._handleChangeEvent.bind(this);
    this._handleFocusEvent = this._handleFocusEvent.bind(this);
    this._handleBlurEvent = this._handleBlurEvent.bind(this);
  }

  connectedCallback() {
    this.render();
    this._cacheElements();
    this._attachEventListeners();
  }

  disconnectedCallback() {
    this._detachEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue || !this.shadowRoot) return;

    // Full re-render only if structural change
    if (['label', 'helper', 'error'].includes(name)) {
      this.render();
      this._cacheElements();
      this._attachEventListeners();
      return;
    }

    // Sync props to child input
    this._syncChildAttribute(name, newValue);
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
    this.setAttribute('value', val ?? '');
  }

  focus() {
    this._inputRef?.focus();
  }

  blur() {
    this._inputRef?.blur();
  }

  _cacheElements() {
    this._inputRef = this.shadowRoot.querySelector('e-input');
  }

  _attachEventListeners() {
    if (!this._inputRef || this._listenersAttached) return;

    this._inputRef.addEventListener('e-input', this._handleInputEvent);
    this._inputRef.addEventListener('e-change', this._handleChangeEvent);
    this._inputRef.addEventListener('e-focus', this._handleFocusEvent);
    this._inputRef.addEventListener('e-blur', this._handleBlurEvent);

    this._listenersAttached = true;
  }

  _detachEventListeners() {
    if (!this._inputRef || !this._listenersAttached) return;

    this._inputRef.removeEventListener('e-input', this._handleInputEvent);
    this._inputRef.removeEventListener('e-change', this._handleChangeEvent);
    this._inputRef.removeEventListener('e-focus', this._handleFocusEvent);
    this._inputRef.removeEventListener('e-blur', this._handleBlurEvent);

    this._listenersAttached = false;
  }

  _handleInputEvent(e) {
    const newValue = e.detail.value;
    if (this.value !== newValue) {
      this.setAttribute('value', newValue);
    }
    this.dispatchEvent(new CustomEvent('e-input', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  _handleChangeEvent(e) {
    this.dispatchEvent(new CustomEvent('e-change', {
      detail: e.detail,
      bubbles: true,
      composed: true
    }));
  }

  _handleFocusEvent() {
    this.dispatchEvent(new CustomEvent('e-focus', { bubbles: true, composed: true }));
  }

  _handleBlurEvent() {
    this.dispatchEvent(new CustomEvent('e-blur', { bubbles: true, composed: true }));
  }

  _syncChildAttribute(name, value) {
    if (!this._inputRef) return;

    switch (name) {
      case 'type':
        this._inputRef.type = value || 'text';
        break;
      case 'placeholder':
        this._inputRef.placeholder = value || '';
        break;
      case 'value':
        this._inputRef.value = value || '';
        break;
      case 'disabled':
        this._inputRef.disabled = this.disabled;
        break;
      case 'readonly':
        this._inputRef.readonly = this.readonly;
        break;
      case 'error':
        this._inputRef.error = !!this.error;
        break;
      case 'name':
        this._inputRef.name = value || '';
        break;
      case 'required':
        // Handle required on label if needed
        break;
      case 'id':
        // Update label for
        const label = this.shadowRoot.querySelector('e-label');
        if (label) label.setAttribute('for', this.inputId);
        break;
    }
  }

  render() {
    const inputId = this.inputId;
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

        .field:focus-within e-label {
          color: var(--color-interaction-outline-active);
        }
      </style>
    `;

    const labelHtml = this.label ? `
      <e-label for="${inputId}" ${this.required ? 'required' : ''}>${this.label}</e-label>
    ` : '';

    const helperHtml = this.error ? `
      <e-helper-text variant="error">${this.error}</e-helper-text>
    ` : this.helper ? `
      <e-helper-text>${this.helper}</e-helper-text>
    ` : '';

    this.shadowRoot.innerHTML = `
      ${styles}
      <div class="field">
        ${labelHtml}
        <e-input
          id="${inputId}"
          type="${this.type}"
          placeholder="${this.placeholder}"
          value="${this.value}"
          name="${this.name || ''}"
          ${this.disabled ? 'disabled' : ''}
          ${this.readonly ? 'readonly' : ''}
          ${hasError ? 'error' : ''}
        ></e-input>
        ${helperHtml}
      </div>
    `;
  }
}

if (!customElements.get('e-text-input')) {
  customElements.define('e-text-input', ETextInput);
}

export default ETextInput;