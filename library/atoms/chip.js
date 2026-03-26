/**
 * Eureka Design System - Chip Atom
 *
 * A compact label element with optional color accent, left icon,
 * chevron, and remove button. Two visual variants.
 *
 * Usage:
 *   <e-chip>Label</e-chip>
 *   <e-chip variant="negative">Error</e-chip>
 *   <e-chip color="#4649FF" icon chevron removable>Neurology</e-chip>
 *
 * Attributes:
 *   - variant:   neutral | negative  (default: neutral)
 *   - color:     CSS color string — shows the 3×12 accent rectangle on the left
 *   - icon:      boolean — shows the icon slot (16×16)
 *   - chevron:   boolean — shows a chevron-down icon on the right
 *   - removable: boolean — shows a remove (×) button on the right
 *   - disabled:  boolean
 *
 * Slots:
 *   - (default): label text
 *   - icon:      left icon SVG (visible only when `icon` attribute is set)
 *
 * Events:
 *   - e-remove:        fires when the remove button is clicked
 *   - e-chevron-click: fires when the chevron is clicked
 */

class EChip extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'color', 'icon', 'chevron', 'removable', 'disabled'];
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

  get variant()   { return this.getAttribute('variant') || 'neutral'; }
  get color()     { return this.getAttribute('color') || ''; }
  get icon()      { return this.hasAttribute('icon'); }
  get chevron()   { return this.hasAttribute('chevron'); }
  get removable() { return this.hasAttribute('removable'); }
  get disabled()  { return this.hasAttribute('disabled'); }

  _setupListeners() {
    const removeBtn = this.shadowRoot.querySelector('.remove-btn');
    if (removeBtn) {
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent('e-remove', {
          bubbles: true,
          composed: true,
        }));
      });
    }

    const chevronEl = this.shadowRoot.querySelector('.chevron');
    if (chevronEl) {
      chevronEl.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent('e-chevron-click', {
          bubbles: true,
          composed: true,
        }));
      });
    }
  }

  render() {
    const isNegative = this.variant === 'negative';

    // Variant-driven content color
    const contentColor = isNegative
      ? 'var(--color-content-negative, #FF7373)'
      : 'var(--color-content-secondary, #5371AC)';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
        }

        .chip {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-1, 0.25rem);
          padding: var(--spacing-1, 0.25rem);
          background: var(--color-background-neutral-lighter, #F8F9FC);
          border-radius: var(--radius-sm, 0.25rem);
          outline: 1px solid var(--color-outline-neutral, #D9E0ED);
          outline-offset: -1px;
          box-shadow: var(--shadow-light-down, 0px 0px 1px rgba(83, 113, 172, 0.08), 0px 1px 2px rgba(83, 113, 172, 0.08));
          cursor: default;
          user-select: none;
        }

        .chip.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* ── Color accent rectangle ─────────────────── */
        .color-rect {
          flex-shrink: 0;
          width: 3px;
          height: 12px;
          border-radius: var(--radius-sm, 0.25rem);
        }

        /* ── Left icon slot ─────────────────────────── */
        .icon-slot {
          flex-shrink: 0;
          width: var(--size-icon-sm, 1rem);
          height: var(--size-icon-sm, 1rem);
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${contentColor};
          overflow: hidden;
        }

        .icon-slot ::slotted(svg),
        .icon-slot svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* ── Label ──────────────────────────────────── */
        .label {
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: var(--text-body-md, 0.75rem);
          font-weight: var(--font-weight-body-md, 400);
          line-height: var(--line-height-body-md, 1rem);
          color: ${contentColor};
          white-space: nowrap;
        }

        /* ── Chevron ────────────────────────────────── */
        .chevron {
          flex-shrink: 0;
          width: var(--size-icon-sm, 1rem);
          height: var(--size-icon-sm, 1rem);
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${contentColor};
          cursor: pointer;
          border-radius: var(--radius-sm, 0.25rem);
          transition: opacity var(--transition-fast, 150ms ease);
        }

        .chevron:hover:not(.disabled) {
          opacity: 0.7;
        }

        .chevron svg {
          width: 10px;
          height: 10px;
          display: block;
        }

        /* ── Remove button ──────────────────────────── */
        .remove-btn {
          flex-shrink: 0;
          width: var(--size-icon-sm, 1rem);
          height: var(--size-icon-sm, 1rem);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-content-tertiary, #93A6CB);
          cursor: pointer;
          border-radius: var(--radius-sm, 0.25rem);
          transition: color var(--transition-fast, 150ms ease);
          background: none;
          border: none;
          padding: 0;
        }

        .remove-btn:hover:not(:disabled) {
          color: var(--color-content-secondary, #5371AC);
        }

        .remove-btn svg {
          width: 13px;
          height: 13px;
          display: block;
        }
      </style>

      <div class="chip${this.disabled ? ' disabled' : ''}">

        ${this.color ? `
          <div class="color-rect" style="background: ${this.color};"></div>
        ` : ''}

        ${this.icon ? `
          <div class="icon-slot">
            <slot name="icon"></slot>
          </div>
        ` : ''}

        <span class="label">
          <slot></slot>
        </span>

        ${this.chevron ? `
          <div class="chevron" role="button" aria-label="Expand" tabindex="${this.disabled ? -1 : 0}">
            <svg viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        ` : ''}

        ${this.removable ? `
          <button class="remove-btn" aria-label="Remove" ${this.disabled ? 'disabled' : ''}>
            <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6.5" cy="6.5" r="6" stroke="currentColor" stroke-width="1"/>
              <path d="M4.5 4.5L8.5 8.5M8.5 4.5L4.5 8.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
          </button>
        ` : ''}

      </div>
    `;
  }
}

customElements.define('e-chip', EChip);

export default EChip;
