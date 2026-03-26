/**
 * Eureka Design System - Checkbox Atom
 *
 * A reusable checkbox Web Component that uses design tokens.
 *
 * Usage:
 *   <e-checkbox value="opt1">Option 1</e-checkbox>
 *   <e-checkbox value="opt2" checked>Option 2</e-checkbox>
 *   <e-checkbox value="opt3" disabled>Option 3</e-checkbox>
 *
 * Attributes:
 *   - value:    string
 *   - checked:  boolean
 *   - disabled: boolean
 *   - size:     sm | md (default: sm)
 *
 * Events:
 *   - e-change: fires when checked state changes, detail: { value, checked }
 */

class ECheckbox extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'checked', 'disabled', 'size'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._inputId = `checkbox-${Math.random().toString(36).slice(2, 11)}`;
  }

  connectedCallback() {
    this.render();
    this._setupListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.shadowRoot.innerHTML) {
      this.render();
      this._setupListeners();
    }
  }

  get value()    { return this.getAttribute('value') || ''; }
  get checked()  { return this.hasAttribute('checked'); }
  set checked(v) { v ? this.setAttribute('checked', '') : this.removeAttribute('checked'); }
  get disabled() { return this.hasAttribute('disabled'); }
  get size()     { return this.getAttribute('size') || 'sm'; }

  _setupListeners() {
    const input = this.shadowRoot.querySelector('input');
    if (!input) return;

    input.addEventListener('change', () => {
      this.checked = input.checked;
      this.dispatchEvent(new CustomEvent('e-change', {
        detail: { value: this.value, checked: this.checked },
        bubbles:  true,
        composed: true,
      }));
    });

    input.addEventListener('focus', () => {
      this.shadowRoot.querySelector('.checkbox-control')?.classList.add('focused');
    });

    input.addEventListener('blur', () => {
      this.shadowRoot.querySelector('.checkbox-control')?.classList.remove('focused');
    });
  }

  render() {
    const sizeConfig = {
      sm: { size: '1rem',      iconSize: '10px', gap: 'var(--spacing-2, 0.5rem)', fontSize: 'var(--text-body-lg, 0.875rem)', lineHeight: 'var(--line-height-body-lg, 1.25rem)' },
      md: { size: '1.25rem',   iconSize: '12px', gap: 'var(--spacing-3, 0.75rem)', fontSize: 'var(--text-body-lg, 0.875rem)', lineHeight: 'var(--line-height-body-lg, 1.25rem)' },
    };

    const cfg = sizeConfig[this.size] || sizeConfig.sm;
    const { checked, disabled } = this;

    const wrapperClasses = [
      'checkbox-wrapper',
      checked  ? 'checked'  : '',
      disabled ? 'disabled' : '',
    ].filter(Boolean).join(' ');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
        }

        .checkbox-wrapper {
          display: inline-flex;
          align-items: center;
          gap: ${cfg.gap};
          cursor: pointer;
          user-select: none;
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: ${cfg.fontSize};
          line-height: ${cfg.lineHeight};
          color: var(--color-content-primary, #15154C);
        }

        .checkbox-wrapper.disabled {
          cursor: not-allowed;
          color: var(--color-content-tertiary, #93A6CB);
        }

        /* Hidden native input */
        input {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
          margin: 0;
          padding: 0;
        }

        /* Custom checkbox control */
        .checkbox-control {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: ${cfg.size};
          height: ${cfg.size};
          border-radius: var(--radius-sm, 0.25rem);
          border: 0.67px solid var(--color-interaction-outline-enabled, #D9E0ED);
          background: var(--color-general-white, #FFFFFF);
          box-shadow: var(--shadow-light-down, 0px 0px 1px rgba(83, 113, 172, 0.08), 0px 1px 2px rgba(83, 113, 172, 0.08));
          transition:
            background var(--transition-fast, 150ms ease),
            border-color var(--transition-fast, 150ms ease);
        }

        .checkbox-control svg {
          display: none;
          color: var(--color-general-white, #FFFFFF);
        }

        /* Hover */
        .checkbox-wrapper:not(.disabled):hover .checkbox-control {
          border-color: var(--color-interaction-outline-hover, #5371AC);
        }

        /* Focus */
        .checkbox-control.focused {
          box-shadow: var(--shadow-focus, 0 0 0.25rem 0 rgba(56, 58, 204, 0.4));
          border-color: var(--color-interaction-outline-active, #383ACC);
        }

        /* Checked */
        .checkbox-wrapper.checked .checkbox-control {
          background: var(--color-action-fill-primary-enabled, #4649FF);
          border-color: var(--color-action-fill-primary-enabled, #4649FF);
        }

        .checkbox-wrapper.checked .checkbox-control svg {
          display: block;
        }

        /* Checked + Hover */
        .checkbox-wrapper.checked:not(.disabled):hover .checkbox-control {
          background: var(--color-action-fill-primary-hover, #383ACC);
          border-color: var(--color-action-fill-primary-hover, #383ACC);
        }

        /* Disabled */
        .checkbox-wrapper.disabled .checkbox-control {
          border-color: var(--color-interaction-outline-disabled, #D9E0ED);
          background: var(--color-interaction-fill-disabled, #F8F9FC);
        }

        /* Disabled + Checked */
        .checkbox-wrapper.disabled.checked .checkbox-control {
          background: var(--color-action-fill-primary-disabled, #ECEDFF);
          border-color: var(--color-action-fill-primary-disabled, #ECEDFF);
        }

        .checkbox-wrapper.disabled.checked .checkbox-control svg {
          color: var(--color-action-content-primary-disabled, #4649FF);
        }

        .checkbox-label {
          font-weight: var(--font-weight-body-lg, 400);
        }
      </style>

      <label class="${wrapperClasses}">
        <input
          id="${this._inputId}"
          type="checkbox"
          value="${this.value}"
          ${checked  ? 'checked'  : ''}
          ${disabled ? 'disabled' : ''}
        />
        <span class="checkbox-control">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="${cfg.iconSize}" height="${cfg.iconSize}" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"/>
          </svg>
        </span>
        <span class="checkbox-label">
          <slot></slot>
        </span>
      </label>
    `;
  }
}

customElements.define('e-checkbox', ECheckbox);

export default ECheckbox;
