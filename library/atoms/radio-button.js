/**
 * Eureka Design System - Radio Button Atom
 *
 * A reusable radio button Web Component that uses design tokens.
 *
 * Usage:
 *   <e-radio-button name="option" value="1">Option 1</e-radio-button>
 *   <e-radio-button name="option" value="2" checked>Option 2</e-radio-button>
 *   <e-radio-button name="option" value="3" disabled>Option 3</e-radio-button>
 *
 * Attributes:
 *   - name: string (required, groups radios together)
 *   - value: string (the value when selected)
 *   - checked: boolean
 *   - disabled: boolean
 *   - size: lg | md | sm (default: md)
 *
 * Events:
 *   - e-change: fires when selection changes, detail: { value, checked, name }
 */

class ERadioButton extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'value', 'checked', 'disabled', 'size'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._inputId = `radio-${Math.random().toString(36).slice(2, 11)}`;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.shadowRoot.innerHTML) {
      this.render();
      this.setupEventListeners();
    }
  }

  get name() {
    return this.getAttribute('name') || '';
  }

  get value() {
    return this.getAttribute('value') || '';
  }

  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(val) {
    if (val) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  get size() {
    return this.getAttribute('size') || 'md';
  }

  setupEventListeners() {
    const input = this.shadowRoot.querySelector('input');
    if (!input) return;

    input.addEventListener('change', (e) => {
      if (e.target.checked) {
        // Uncheck other radios with same name
        this._uncheckSiblings();
        this.setAttribute('checked', '');

        this.dispatchEvent(new CustomEvent('e-change', {
          detail: {
            value: this.value,
            checked: true,
            name: this.name
          },
          bubbles: true,
          composed: true
        }));
      }
    });

    input.addEventListener('focus', () => {
      this.shadowRoot.querySelector('.radio-control').classList.add('focused');
    });

    input.addEventListener('blur', () => {
      this.shadowRoot.querySelector('.radio-control').classList.remove('focused');
    });
  }

  _uncheckSiblings() {
    if (!this.name) return;

    // Find all radios with same name in the document
    const radios = document.querySelectorAll(`e-radio-button[name="${this.name}"]`);
    radios.forEach(radio => {
      if (radio !== this && radio.hasAttribute('checked')) {
        radio.removeAttribute('checked');
      }
    });
  }

  render() {
    // Size configurations using design tokens
    const sizeConfig = {
      lg: {
        radioSize: '1.25rem',      // 20px
        dotSize: '0.625rem',       // 10px
        gap: 'var(--spacing-3, 0.75rem)',
        fontSize: 'var(--text-body-lg, 0.875rem)',
        lineHeight: 'var(--line-height-body-lg, 1.25rem)'
      },
      md: {
        radioSize: '1rem',         // 16px
        dotSize: '0.5rem',         // 8px
        gap: 'var(--spacing-2, 0.5rem)',
        fontSize: 'var(--text-body-md, 0.75rem)',
        lineHeight: 'var(--line-height-body-md, 1rem)'
      },
      sm: {
        radioSize: '0.875rem',     // 14px
        dotSize: '0.4375rem',      // 7px
        gap: 'var(--spacing-2, 0.5rem)',
        fontSize: 'var(--text-body-md, 0.75rem)',
        lineHeight: 'var(--line-height-body-md, 1rem)'
      }
    };

    const config = sizeConfig[this.size] || sizeConfig.md;

    const styles = `
      <style>
        :host {
          display: inline-flex;
        }

        .radio-wrapper {
          display: inline-flex;
          align-items: center;
          gap: ${config.gap};
          cursor: pointer;
          user-select: none;
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: ${config.fontSize};
          line-height: ${config.lineHeight};
          color: var(--color-content-primary, #15154C);
        }

        .radio-wrapper.disabled {
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

        /* Custom radio control */
        .radio-control {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: ${config.radioSize};
          height: ${config.radioSize};
          border: 1.5px solid var(--color-interaction-outline-enabled, #D9E0ED);
          border-radius: var(--radius-full, 9999px);
          background-color: var(--color-interaction-fill-enabled, #FFFFFF);
          transition: all var(--transition-fast, 150ms ease);
          flex-shrink: 0;
        }

        /* Inner dot */
        .radio-dot {
          width: ${config.dotSize};
          height: ${config.dotSize};
          border-radius: var(--radius-full, 9999px);
          background-color: transparent;
          transition: all var(--transition-fast, 150ms ease);
          transform: scale(0);
        }

        /* Hover state */
        .radio-wrapper:not(.disabled):hover .radio-control {
          border-color: var(--color-interaction-outline-hover, #5371AC);
        }

        /* Focus state */
        .radio-control.focused {
          box-shadow: var(--shadow-focus, 0 0 0.25rem 0 rgba(56, 58, 204, 0.4));
          border-color: var(--color-interaction-outline-active, #383ACC);
        }

        /* Checked state */
        .radio-wrapper.checked .radio-control {
          border-color: var(--color-action-fill-primary-enabled, #4649FF);
          background-color: var(--color-action-fill-primary-enabled, #4649FF);
        }

        .radio-wrapper.checked .radio-dot {
          background-color: var(--color-general-white, #FFFFFF);
          transform: scale(1);
        }

        /* Checked + Hover */
        .radio-wrapper.checked:not(.disabled):hover .radio-control {
          border-color: var(--color-action-fill-primary-hover, #383ACC);
          background-color: var(--color-action-fill-primary-hover, #383ACC);
        }

        /* Disabled state */
        .radio-wrapper.disabled .radio-control {
          border-color: var(--color-interaction-outline-disabled, #D9E0ED);
          background-color: var(--color-interaction-fill-disabled, #F8F9FC);
        }

        /* Disabled + Checked */
        .radio-wrapper.disabled.checked .radio-control {
          border-color: var(--color-action-fill-primary-disabled, #ECEDFF);
          background-color: var(--color-action-fill-primary-disabled, #ECEDFF);
        }

        .radio-wrapper.disabled.checked .radio-dot {
          background-color: var(--color-action-content-primary-disabled, #4649FF);
        }

        /* Label styling */
        .radio-label {
          font-weight: var(--font-weight-body-md, 400);
        }
      </style>
    `;

    const wrapperClasses = [
      'radio-wrapper',
      this.checked ? 'checked' : '',
      this.disabled ? 'disabled' : ''
    ].filter(Boolean).join(' ');

    this.shadowRoot.innerHTML = `
      ${styles}
      <label class="${wrapperClasses}">
        <input
          type="radio"
          name="${this.name}"
          value="${this.value}"
          ${this.checked ? 'checked' : ''}
          ${this.disabled ? 'disabled' : ''}
        />
        <span class="radio-control">
          <span class="radio-dot"></span>
        </span>
        <span class="radio-label">
          <slot></slot>
        </span>
      </label>
    `;
  }
}

// Register the component
customElements.define('e-radio-button', ERadioButton);

export default ERadioButton;
