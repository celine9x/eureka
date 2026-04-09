/**
 * Eureka Design System - Input Atom
 *
 * Base input element - the smallest building block.
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
 *   - error: boolean
 *   - name: string
 */

class EInput extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'placeholder', 'value', 'disabled', 'readonly', 'error', 'name'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  connectedCallback() {
    this.render();
    this.cacheElements();
    this.attachEventListeners();
    this.syncInputFromAttributes();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.shadowRoot) return;
    if (oldValue === newValue) return;

    if (!this.inputEl) {
      this.render();
      this.cacheElements();
      this.attachEventListeners();
    }

    this.syncSingleAttribute(name, newValue);
  }

  disconnectedCallback() {
    this.detachEventListeners();
  }

  get inputEl() {
    return this._inputEl;
  }

  get type() {
    return this.getAttribute('type') || 'text';
  }

  set type(val) {
    if (val == null) {
      this.removeAttribute('type');
    } else {
      this.setAttribute('type', val);
    }
  }

  get placeholder() {
    return this.getAttribute('placeholder') || '';
  }

  set placeholder(val) {
    if (val == null) {
      this.removeAttribute('placeholder');
    } else {
      this.setAttribute('placeholder', val);
    }
  }

  get value() {
    return this.getAttribute('value') || '';
  }

  set value(val) {
    const normalized = val ?? '';
    if (this.getAttribute('value') !== normalized) {
      this.setAttribute('value', normalized);
    } else if (this.inputEl && this.inputEl.value !== normalized) {
      this.inputEl.value = normalized;
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val) {
    this.toggleAttribute('disabled', Boolean(val));
  }

  get readonly() {
    return this.hasAttribute('readonly');
  }

  set readonly(val) {
    this.toggleAttribute('readonly', Boolean(val));
  }

  get error() {
    return this.hasAttribute('error');
  }

  set error(val) {
    this.toggleAttribute('error', Boolean(val));
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  set name(val) {
    if (!val) {
      this.removeAttribute('name');
    } else {
      this.setAttribute('name', val);
    }
  }

  focus() {
    this.inputEl?.focus();
  }

  blur() {
    this.inputEl?.blur();
  }

  cacheElements() {
    this._inputEl = this.shadowRoot.querySelector('input');
  }

  attachEventListeners() {
    if (!this.inputEl || this._listenersAttached) return;

    this.inputEl.addEventListener('input', this.handleInput);
    this.inputEl.addEventListener('change', this.handleChange);
    this.inputEl.addEventListener('focus', this.handleFocus);
    this.inputEl.addEventListener('blur', this.handleBlur);

    this._listenersAttached = true;
  }

  detachEventListeners() {
    if (!this.inputEl || !this._listenersAttached) return;

    this.inputEl.removeEventListener('input', this.handleInput);
    this.inputEl.removeEventListener('change', this.handleChange);
    this.inputEl.removeEventListener('focus', this.handleFocus);
    this.inputEl.removeEventListener('blur', this.handleBlur);

    this._listenersAttached = false;
  }

  handleInput(e) {
    const newValue = e.target.value;

    if (this.getAttribute('value') !== newValue) {
      this.setAttribute('value', newValue);
    }

    this.dispatchEvent(
      new CustomEvent('e-input', {
        detail: { value: newValue },
        bubbles: true,
        composed: true
      })
    );
  }

  handleChange(e) {
    this.dispatchEvent(
      new CustomEvent('e-change', {
        detail: { value: e.target.value },
        bubbles: true,
        composed: true
      })
    );
  }

  handleFocus() {
    this.dispatchEvent(
      new CustomEvent('e-focus', {
        bubbles: true,
        composed: true
      })
    );
  }

  handleBlur() {
    this.dispatchEvent(
      new CustomEvent('e-blur', {
        bubbles: true,
        composed: true
      })
    );
  }

  syncInputFromAttributes() {
    if (!this.inputEl) return;

    this.inputEl.type = this.type;
    this.inputEl.placeholder = this.placeholder;
    this.inputEl.value = this.value;
    this.inputEl.disabled = this.disabled;
    this.inputEl.readOnly = this.readonly;
    this.inputEl.name = this.name;
    this.inputEl.classList.toggle('error', this.error);
  }

  syncSingleAttribute(name, value) {
    if (!this.inputEl) return;

    switch (name) {
      case 'type':
        this.inputEl.type = value || 'text';
        break;
      case 'placeholder':
        this.inputEl.placeholder = value || '';
        break;
      case 'value':
        if (this.inputEl.value !== (value || '')) {
          this.inputEl.value = value || '';
        }
        break;
      case 'disabled':
        this.inputEl.disabled = this.disabled;
        break;
      case 'readonly':
        this.inputEl.readOnly = this.readonly;
        break;
      case 'error':
        this.inputEl.classList.toggle('error', this.error);
        break;
      case 'name':
        this.inputEl.name = value || '';
        break;
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
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
          box-sizing: border-box;
          box-shadow: none;
          transition:
            border-color var(--transition-fast),
            box-shadow var(--transition-fast),
            background-color var(--transition-fast),
            color var(--transition-fast);
        }

        input::placeholder {
          color: var(--color-content-tertiary);
        }

        input:hover:not(:disabled):not(:focus):not(.error) {
          border-color: var(--color-interaction-outline-hover);
          box-shadow: var(--shadow-medium-down);
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
          box-shadow: none;
        }

        input:read-only:not(:disabled) {
          background-color: var(--color-general-neutral-lighter);
        }

        input.error {
          border-color: var(--color-interaction-outline-negative);
        }

        input.error:hover:not(:disabled),
        input.error:focus:not(:disabled) {
          border-color: var(--color-interaction-outline-negative);
          box-shadow: var(--shadow-focus);
        }
      </style>

      <input />
    `;
  }
}

if (!customElements.get('e-input')) {
  customElements.define('e-input', EInput);
}

export default EInput;