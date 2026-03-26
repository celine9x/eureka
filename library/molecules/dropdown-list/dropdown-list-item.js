/**
 * Eureka Design System - Dropdown List Item
 *
 * A single selectable row used inside e-dropdown-list.
 * Supports 1-line and 2-line content, optional left icon, color accent
 * rectangle, and right-side badge / action slots.
 *
 * Usage:
 *   <!-- 1-line, checkbox only -->
 *   <e-dropdown-list-item value="ad">Alzheimer's disease</e-dropdown-list-item>
 *
 *   <!-- pre-checked -->
 *   <e-dropdown-list-item value="pd" checked>Parkinson's disease</e-dropdown-list-item>
 *
 *   <!-- 2-line with subinfo -->
 *   <e-dropdown-list-item value="az" subinfo="Phase 2 · Small molecule">
 *     Alzheimer's disease
 *   </e-dropdown-list-item>
 *
 *   <!-- left icon slot -->
 *   <e-dropdown-list-item value="bc" icon>
 *     <svg slot="icon" ...></svg>
 *     Breast cancer
 *   </e-dropdown-list-item>
 *
 *   <!-- color accent + right action -->
 *   <e-dropdown-list-item value="ms" color="#5371AC" show-action>
 *     Multiple sclerosis
 *     <e-button slot="action" variant="secondary" size="sm">...</e-button>
 *   </e-dropdown-list-item>
 *
 * Attributes:
 *   - value:       string
 *   - checked:     boolean
 *   - disabled:    boolean
 *   - subinfo:     string   — secondary line beneath the label (enables 2-line layout)
 *   - color:       string   — CSS color for the left accent rectangle
 *   - icon:        boolean  — show the icon-left slot
 *   - show-badge:  boolean  — show the badge slot on the right
 *   - show-action: boolean  — show the action slot on the right
 *
 * Slots:
 *   - (default)  label text
 *   - icon       left icon (16 × 16, only visible when icon attribute is set)
 *   - badge      right badge (e.g. count chip)
 *   - action     right action button (e.g. e-button icon-only)
 *
 * Events:
 *   - e-change (composed, bubbles): { value, label, checked }
 *
 * Design source: dropdown-list-item.js
 *   Figma tokens mapped:
 *     --Grey100  → --color-general-white
 *     --Grey98   → --color-background-neutral-lighter
 *     --Grey90   → --color-outline-neutral
 *     --Grey70   → --color-content-tertiary
 *     --Grey50   → --color-content-secondary
 *     --Blue20   → --color-content-primary
 *     --Orange50 → --color-content-warning
 */

import '../../atoms/checkbox.js';

class EDropdownListItem extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'checked', 'disabled', 'subinfo', 'color', 'icon', 'show-badge', 'show-action'];
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

  get value()      { return this.getAttribute('value') || ''; }
  get checked()    { return this.hasAttribute('checked'); }
  set checked(v)   { v ? this.setAttribute('checked', '') : this.removeAttribute('checked'); }
  get disabled()   { return this.hasAttribute('disabled'); }
  get subinfo()    { return this.getAttribute('subinfo') || ''; }
  get color()      { return this.getAttribute('color') || ''; }
  get icon()       { return this.hasAttribute('icon'); }
  get showBadge()  { return this.hasAttribute('show-badge'); }
  get showAction() { return this.hasAttribute('show-action'); }

  _toggle() {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('e-change', {
      detail: { value: this.value, label: this.textContent.trim(), checked: this.checked },
      bubbles:  true,
      composed: true,
    }));
  }

  _setupListeners() {
    const row = this.shadowRoot.querySelector('.item');
    if (!row) return;
    row.addEventListener('click', () => this._toggle());
    row.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); this._toggle(); }
    });
  }

  render() {
    const { checked, disabled, subinfo, color, icon, showBadge, showAction } = this;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        :host([hidden]) {
          display: none;
        }

        /* ── Row ───────────────────────────────────── */
        .item {
          display: inline-flex;
          align-self: stretch;
          width: 100%;
          box-sizing: border-box;
          padding: var(--spacing-2, 0.5rem);
          justify-content: space-between;
          align-items: center;
          gap: var(--spacing-2, 0.5rem);
          border-radius: var(--radius-sm, 0.25rem);
          cursor: pointer;
          user-select: none;
          transition: background var(--transition-fast, 150ms ease);
        }

        .item:hover:not(.disabled) {
          background: var(--color-background-neutral-lighter, #F8F9FC);
          border-radius: var(--radius-md, 0.5rem);
        }

        .item:focus-visible {
          outline: 2px solid var(--color-content-brand, #4649FF);
          outline-offset: -2px;
          border-radius: var(--radius-md, 0.5rem);
        }

        .item.disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        /* ── Left side ─────────────────────────────── */
        .left {
          display: flex;
          align-items: center;
          gap: var(--spacing-2, 0.5rem);
          flex: 1 1 0;
          min-width: 0;
        }

        /* Checkbox — visual only, row handles interaction */
        e-checkbox {
          flex-shrink: 0;
          pointer-events: none;
        }

        /* Left icon slot */
        .icon-left {
          flex-shrink: 0;
          width: var(--size-icon-sm, 1rem);
          height: var(--size-icon-sm, 1rem);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-content-secondary, #5371AC);
          overflow: hidden;
        }

        .icon-left ::slotted(svg),
        .icon-left svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* Color accent rectangle */
        .color-rect {
          flex-shrink: 0;
          width: 4px;
          height: var(--size-icon-sm, 1rem);
          border-radius: var(--radius-sm, 0.25rem);
          background: var(--color-content-secondary, #5371AC);
        }

        /* Label block */
        .label-block {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          min-width: 0;
          gap: 0;
        }

        .label {
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: var(--text-body-lg, 0.875rem);
          font-weight: var(--font-weight-body-lg, 400);
          line-height: var(--line-height-body-lg, 1.25rem);
          color: var(--color-content-primary, #15154C);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .subinfo {
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: var(--text-body-md, 0.75rem);
          font-weight: var(--font-weight-body-md, 400);
          line-height: var(--line-height-body-md, 1rem);
          color: var(--color-content-secondary, #5371AC);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item.disabled .label,
        .item.disabled .subinfo {
          color: var(--color-content-tertiary, #93A6CB);
        }

        /* ── Right side ────────────────────────────── */
        .right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: var(--spacing-2, 0.5rem);
          flex-shrink: 0;
        }

        /* Badge slot wrapper */
        .badge-slot {
          display: flex;
          align-items: center;
          padding: var(--spacing-1, 0.25rem);
          background: var(--color-background-neutral-lighter, #F8F9FC);
          border-radius: var(--radius-sm, 0.25rem);
          outline: 1px solid var(--color-outline-neutral, #D9E0ED);
          outline-offset: -1px;
        }

        /* Action slot wrapper */
        .action-slot {
          display: flex;
          align-items: center;
        }
      </style>

      <div
        class="item${disabled ? ' disabled' : ''}"
        tabindex="${disabled ? '-1' : '0'}"
        role="checkbox"
        aria-checked="${checked}"
        aria-disabled="${disabled}"
      >

        <!-- Left -->
        <div class="left">
          <!-- Checkbox -->
          <e-checkbox
            ${checked  ? 'checked'  : ''}
            ${disabled ? 'disabled' : ''}
          ></e-checkbox>

          <!-- Optional left icon -->
          ${icon ? `
            <div class="icon-left">
              <slot name="icon"></slot>
            </div>
          ` : ''}

          <!-- Optional color accent rectangle -->
          ${color ? `
            <div class="color-rect" style="background:${color}"></div>
          ` : ''}

          <!-- Label (+ optional subinfo) -->
          <div class="label-block">
            <span class="label"><slot></slot></span>
            ${subinfo ? `<span class="subinfo">${subinfo}</span>` : ''}
          </div>
        </div>

        <!-- Right -->
        ${(showBadge || showAction) ? `
          <div class="right">
            ${showBadge ? `<div class="badge-slot"><slot name="badge"></slot></div>` : ''}
            ${showAction ? `<div class="action-slot"><slot name="action"></slot></div>` : ''}
          </div>
        ` : ''}

      </div>
    `;
  }
}

customElements.define('e-dropdown-list-item', EDropdownListItem);

export default EDropdownListItem;
