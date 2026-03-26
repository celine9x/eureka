/**
 * Eureka Design System - Radio Card Molecule
 *
 * A selectable card composing e-radio-button with a label row, info row, and action slot.
 * Clicking anywhere on the card selects it; sibling cards in the same group are deselected.
 *
 * Usage:
 *   <e-radio-card name="plan" value="pro" label="Pro Plan" info="Annual billing,USD,Cancel anytime">
 *     <svg slot="icon">...</svg>
 *     <e-button slot="action">Select</e-button>
 *   </e-radio-card>
 *
 * Attributes:
 *   - name: string (radio group name, required)
 *   - value: string (radio value)
 *   - checked: boolean (selected state)
 *   - disabled: boolean (disabled state)
 *   - label: string (main label text)
 *   - info: string (comma-separated info items, up to 3)
 *
 * Slots:
 *   - icon: icon displayed before the label (20×20)
 *   - action: content on the right side (e.g. a button)
 *
 * Events:
 *   - e-change: fires when selected, detail: { value, name, checked }
 */

class ERadioCard extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'value', 'checked', 'disabled', 'label', 'info'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
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

  get name() { return this.getAttribute('name') || ''; }
  get value() { return this.getAttribute('value') || ''; }
  get checked() { return this.hasAttribute('checked'); }
  set checked(val) {
    if (val) this.setAttribute('checked', '');
    else this.removeAttribute('checked');
  }
  get disabled() { return this.hasAttribute('disabled'); }
  get label() { return this.getAttribute('label') || ''; }
  get info() { return this.getAttribute('info') || ''; }

  _setupListeners() {
    const card = this.shadowRoot.querySelector('.radio-card');
    if (!card) return;

    card.addEventListener('click', () => {
      if (this.disabled || this.checked) return;
      this._select();
    });

    card.addEventListener('keydown', (e) => {
      if ((e.key === ' ' || e.key === 'Enter') && !this.disabled && !this.checked) {
        e.preventDefault();
        this._select();
      }
    });
  }

  _select() {
    if (this.name) {
      document.querySelectorAll(`e-radio-card[name="${this.name}"]`).forEach(card => {
        if (card !== this) card.removeAttribute('checked');
      });
    }

    this.checked = true;

    this.dispatchEvent(new CustomEvent('e-change', {
      detail: { value: this.value, name: this.name, checked: true },
      bubbles: true,
      composed: true
    }));
  }

  _renderInfoItems() {
    if (!this.info) return '';
    const items = this.info.split(',').map(s => s.trim()).filter(Boolean).slice(0, 3);
    if (!items.length) return '';

    const itemsHtml = items.map((item, i) => `
      ${i > 0 ? '<span class="info-dot"></span>' : ''}
      <span class="info-item">
        <span class="info-text">${item}</span>
      </span>
    `).join('');

    return `<div class="info-row">${itemsHtml}</div>`;
  }

  render() {
    const cardClasses = [
      'radio-card',
      this.checked ? 'checked' : '',
      this.disabled ? 'disabled' : ''
    ].filter(Boolean).join(' ');

    const styles = `
      <style>
        :host {
          display: block;
          width: 100%;
        }

        .radio-card {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-4, 1rem);
          width: 100%;
          padding: var(--spacing-4, 1rem) var(--spacing-6, 1.5rem);
          background: var(--color-general-white, #FFFFFF);
          border-radius: var(--radius-md, 0.5rem);
          outline: 1px solid var(--color-interaction-outline-enabled, #D9E0ED);
          outline-offset: -1px;
          box-shadow: var(--shadow-light-down, 0 0.0625rem 0.125rem 0 rgba(83, 113, 172, 0.08));
          box-sizing: border-box;
          cursor: pointer;
          transition:
            background var(--transition-fast, 150ms ease),
            outline-color var(--transition-fast, 150ms ease),
            box-shadow var(--transition-fast, 150ms ease);
          user-select: none;
        }

        /* Hover — unchecked, enabled */
        .radio-card:not(.disabled):not(.checked):hover {
          background: var(--color-background-neutral-lighter, #F8F9FC);
          outline-color: var(--color-interaction-outline-hover, #5371AC);
        }

        /* Checked */
        .radio-card.checked {
          background: var(--color-general-informative, #ECEDFF);
          outline-color: var(--color-action-fill-primary-hover, #383ACC);
          box-shadow: var(--shadow-dark-down, 0 0.125rem 0.25rem 0 rgba(83, 113, 172, 0.2));
        }

        /* Disabled */
        .radio-card.disabled {
          background: var(--color-background-neutral-light, #EFF2F9);
          cursor: not-allowed;
        }

        .radio-card.disabled:not(.checked) {
          outline-color: var(--color-interaction-outline-disabled, #D9E0ED);
          box-shadow: var(--shadow-light-down, 0 0.0625rem 0.125rem 0 rgba(83, 113, 172, 0.08));
        }

        .radio-card.disabled.checked {
          outline-color: var(--color-action-fill-primary-hover, #383ACC);
          box-shadow: var(--shadow-dark-down, 0 0.125rem 0.25rem 0 rgba(83, 113, 172, 0.2));
        }

        /* Radio control — purely visual, clicks handled by card */
        .radio-control {
          flex-shrink: 0;
          pointer-events: none;
        }

        /* Content area */
        .card-content {
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-1, 0.25rem);
          min-width: 0;
        }

        /* Label row */
        .label-row {
          display: inline-flex;
          align-items: flex-start;
          gap: var(--spacing-2, 0.5rem);
          align-self: stretch;
        }

        .icon-slot {
          width: var(--size-icon-md, 1.25rem);
          height: var(--size-icon-md, 1.25rem);
          flex-shrink: 0;
          overflow: hidden;
          position: relative;
        }

        .card-label {
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: var(--text-body-lg, 0.875rem);
          font-weight: var(--font-weight-body-md, 400);
          line-height: var(--line-height-body-lg, 1.25rem);
          color: var(--color-content-primary, #15154C);
        }

        /* Info row */
        .info-row {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-2, 0.5rem);
          align-self: stretch;
          min-height: 1.5rem;
        }

        .info-item {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-1, 0.25rem);
        }

        .info-text {
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: var(--text-body-md, 0.75rem);
          font-weight: var(--font-weight-body-md, 400);
          line-height: var(--line-height-body-md, 1rem);
          color: var(--color-content-secondary, #5371AC);
        }

        .info-dot {
          width: 2px;
          height: 2px;
          border-radius: var(--radius-full, 9999px);
          background: var(--color-content-secondary, #5371AC);
          flex-shrink: 0;
        }

        /* Action slot */
        .card-action {
          flex-shrink: 0;
        }
      </style>
    `;

    this.shadowRoot.innerHTML = `
      ${styles}
      <div
        class="${cardClasses}"
        tabindex="${this.disabled ? '-1' : '0'}"
        role="radio"
        aria-checked="${this.checked}"
        aria-disabled="${this.disabled}"
      >
        <div class="radio-control">
          <e-radio-button
            name="${this.name}"
            value="${this.value}"
            size="md"
            ${this.checked ? 'checked' : ''}
            ${this.disabled ? 'disabled' : ''}
          ></e-radio-button>
        </div>
        <div class="card-content">
          <div class="label-row">
            <div class="icon-slot">
              <slot name="icon"></slot>
            </div>
            <span class="card-label">${this.label}</span>
          </div>
          ${this._renderInfoItems()}
        </div>
        <div class="card-action">
          <slot name="action"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('e-radio-card', ERadioCard);

export default ERadioCard;
