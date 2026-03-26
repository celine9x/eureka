/**
 * Eureka Design System - TableCell
 *
 * A table cell with several layout variants. Cell height is always fixed by
 * the row's flex layout (align-items: stretch). Content that does not fit is
 * clipped: text gets an ellipsis, tags get an auto-injected "+N" chip.
 *
 * Usage:
 *   <e-table-cell>Short text</e-table-cell>
 *   <e-table-cell icon>Short text with icon</e-table-cell>
 *   <e-table-cell variant="long-text">Long text (3-line clamp)</e-table-cell>
 *
 *   <e-table-cell variant="button">
 *     <e-button variant="secondary" size="sm">Active</e-button>
 *   </e-table-cell>
 *
 *   <e-table-cell variant="two-level">
 *     <e-link slot="primary" href="#">Primary</e-link>
 *     <e-link slot="secondary" href="#" size="md">Secondary</e-link>
 *   </e-table-cell>
 *
 *   <!-- Chips that don't fit are hidden; a "+N" chip is injected automatically -->
 *   <e-table-cell variant="tags">
 *     <e-chip color="rgba(125,190,255,1)">Biotech</e-chip>
 *     <e-chip color="rgba(112,224,229,1)">SaaS</e-chip>
 *   </e-table-cell>
 *
 *   <e-table-cell variant="tags-2">
 *     <e-chip color="rgba(125,190,255,1)">Biotech</e-chip>
 *   </e-table-cell>
 *
 * Attributes:
 *   - variant: 'short-text' | 'long-text' | 'button' | 'two-level' | 'tags' | 'tags-2'
 *   - icon:    boolean  — (short-text / long-text only) show leading icon slot
 *   - alert:   'minor' | 'major' | 'orange' — trailing alert icon
 */

import '../../atoms/button.js';
import '../../atoms/link.js';
import '../../atoms/chip.js';

const DEFAULT_ICON_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M5.5 3A2.5 2.5 0 0 0 3 5.5v2.879a2.5 2.5 0 0 0 .732 1.767l6.5 6.5a2.5 2.5 0 0 0 3.536 0l2.878-2.878a2.5 2.5 0 0 0 0-3.536l-6.5-6.5A2.5 2.5 0 0 0 8.38 3H5.5ZM6 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
  </svg>
`;

class ETableCell extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'icon', 'alert'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._overflowRaf = null;
  }

  connectedCallback() {
    this.render();
    this._setupListeners();
    this._initTagsOverflow();
  }

  attributeChangedCallback() {
    this.render();
    this._setupListeners();
    this._initTagsOverflow();
  }

  disconnectedCallback() {
    if (this._resizeObserver) this._resizeObserver.disconnect();
  }

  _setupListeners() {
    const alertIcon = this.shadowRoot.querySelector('.alert-icon');
    if (!alertIcon) return;
    alertIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      this.dispatchEvent(new CustomEvent('e-alert-click', {
        detail: { level: this.alertLevel },
        bubbles: true,
        composed: true,
      }));
    });
  }

  // ── Tags overflow ────────────────────────────────────────────────────────

  _initTagsOverflow() {
    if (this.variant !== 'tags' && this.variant !== 'tags-2') return;

    const slot = this.shadowRoot.querySelector('slot');
    if (!slot) return;

    slot.addEventListener('slotchange', () => this._scheduleOverflowUpdate());

    // Re-measure when cell is resized (e.g. table column resize)
    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver(() => this._scheduleOverflowUpdate());
    }
    const cell = this.shadowRoot.querySelector('.cell');
    if (cell) this._resizeObserver.observe(cell);

    this._scheduleOverflowUpdate();
  }

  _scheduleOverflowUpdate() {
    cancelAnimationFrame(this._overflowRaf);
    this._overflowRaf = requestAnimationFrame(() => this._updateTagsOverflow());
  }

  _updateTagsOverflow() {
    if (this.variant !== 'tags' && this.variant !== 'tags-2') return;

    const slot = this.shadowRoot.querySelector('slot');
    const cell = this.shadowRoot.querySelector('.cell');
    if (!slot || !cell) return;

    // User chips — exclude the +N badge we injected
    const chips = slot.assignedElements().filter(
      el => el.matches('e-chip') && !el.hasAttribute('data-overflow-badge')
    );
    if (!chips.length) return;

    // Find or create the injected overflow badge chip
    let badge = this.querySelector(':scope > e-chip[data-overflow-badge]');
    if (!badge) {
      badge = document.createElement('e-chip');
      badge.setAttribute('data-overflow-badge', '');
      this.appendChild(badge);
    }

    // Reset: show all chips, hide badge
    chips.forEach(c => { c.hidden = false; });
    badge.hidden = true;

    // Measure after paint
    requestAnimationFrame(() => {
      const cellRect = cell.getBoundingClientRect();
      if (!cellRect.width) return;

      const isWrap = this.variant === 'tags-2';
      let hiddenCount = 0;

      // Walk backwards: hide chips that overflow the cell bounds
      for (let i = chips.length - 1; i >= 0; i--) {
        const r = chips[i].getBoundingClientRect();
        const overflows = isWrap
          ? r.bottom > cellRect.bottom + 2
          : r.right  > cellRect.right  + 2;

        if (overflows || hiddenCount > 0) {
          chips[i].hidden = true;
          hiddenCount++;
        }
      }

      if (hiddenCount === 0) return;

      badge.textContent = `+${hiddenCount}`;
      badge.hidden = false;

      // If the badge itself now overflows, hide one more chip to make room
      requestAnimationFrame(() => {
        const br = badge.getBoundingClientRect();
        const badgeOverflows = isWrap
          ? br.bottom > cellRect.bottom + 2
          : br.right  > cellRect.right  + 2;

        if (badgeOverflows) {
          const lastVisible = chips.filter(c => !c.hidden).pop();
          if (lastVisible) {
            lastVisible.hidden = true;
            hiddenCount++;
            badge.textContent = `+${hiddenCount}`;
          }
        }
      });
    });
  }

  // ── Accessors ────────────────────────────────────────────────────────────

  get variant()    { return this.getAttribute('variant') || 'short-text'; }
  get icon()       { return this.hasAttribute('icon'); }
  get alertLevel() { return this.getAttribute('alert'); }

  // ── Render ───────────────────────────────────────────────────────────────

  render() {
    const { variant, icon, alertLevel } = this;

    let innerHtml;
    if (variant === 'button') {
      innerHtml = `<slot></slot>`;
    } else if (variant === 'two-level') {
      innerHtml = `
        <slot name="primary"></slot>
        <slot name="secondary"></slot>
      `;
    } else if (variant === 'tags' || variant === 'tags-2') {
      innerHtml = `<slot></slot>`;
    } else {
      innerHtml = `
        ${icon ? `
          <div class="icon-wrapper">
            <slot name="icon">${DEFAULT_ICON_SVG}</slot>
          </div>
        ` : ''}
        <div class="cell-content">
          <slot></slot>
        </div>
        ${alertLevel ? `
          <div class="alert-icon ${alertLevel}" title="Conflict: ${alertLevel}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-label="Conflict ${alertLevel}">
              <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd"/>
            </svg>
          </div>
        ` : ''}
      `;
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          flex: 1 1 0;
          min-width: 0;
          border-bottom: 1px solid var(--color-outline-neutral, rgba(217, 224, 237, 1));
        }

        :host(:last-child) { border-right: none; }

        /* ── Base cell ─────────────────────────────────── */
        .cell {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding-left:  var(--spacing-4, 1rem);
          padding-right: var(--spacing-4, 1rem);
          background: transparent;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: var(--spacing-2, 0.5rem);
          overflow: hidden;   /* clip all overflow — JS handles +N badge for tags */
        }

        /* ── Icon wrapper ──────────────────────────────── */
        .icon-wrapper {
          flex-shrink: 0;
          width:  var(--size-icon-sm, 1rem);
          height: var(--size-icon-sm, 1rem);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-content-secondary, rgba(83, 113, 172, 1));
        }

        .icon-wrapper ::slotted(svg),
        .icon-wrapper svg { width: 100%; height: 100%; display: block; }

        /* ── Text content — always truncated ───────────── */
        .cell-content {
          flex: 1 1 0;
          min-width: 0;
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          color: var(--color-content-primary, rgba(21, 21, 76, 1));
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* ── Alert icon ────────────────────────────────── */
        .alert-icon {
          flex-shrink: 0;
          width:  var(--size-icon-sm, 1rem);
          height: var(--size-icon-sm, 1rem);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .alert-icon svg { width: 100%; height: 100%; display: block; }

        .alert-icon.minor  { color: var(--color-content-warning,  rgba(255, 159, 28, 1)); }
        .alert-icon.major  { color: var(--color-content-negative, rgba(255, 115, 115, 1)); }
        .alert-icon.orange { color: var(--color-content-warning,  rgba(255, 159, 28, 1)); }

        /* ── short-text ────────────────────────────────── */
        .cell.short-text {
          padding-top:    var(--spacing-3-5, 0.875rem);
          padding-bottom: var(--spacing-3-5, 0.875rem);
        }

        .cell.short-text .cell-content {
          font-size:   var(--text-body-lg, 0.875rem);
          font-weight: var(--font-weight-body-lg, 400);
          line-height: var(--line-height-body-lg, 1.25rem);
        }

        /* ── long-text ─────────────────────────────────── */
        .cell.long-text {
          padding-top:    var(--spacing-2, 0.5rem);
          padding-bottom: var(--spacing-2, 0.5rem);
          align-items: flex-start;
        }

        .cell.long-text .icon-wrapper,
        .cell.long-text .alert-icon { margin-top: 0.125rem; }

        .cell.long-text .cell-content {
          white-space: normal;          /* allow line wrapping for long text */
          font-size:   var(--text-body-md, 0.75rem);
          font-weight: var(--font-weight-body-md, 400);
          line-height: var(--line-height-body-md, 1rem);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }

        /* ── button ────────────────────────────────────── */
        .cell.button {
          padding-top:    var(--spacing-3, 0.75rem);
          padding-bottom: var(--spacing-3, 0.75rem);
        }

        /* ── two-level ─────────────────────────────────── */
        .cell.two-level {
          padding-top:    var(--spacing-1, 0.25rem);
          padding-bottom: var(--spacing-1, 0.25rem);
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
        }

        /* ── tags (1-row, no wrap) ─────────────────────── */
        .cell.tags {
          padding-top:    var(--spacing-3, 0.75rem);
          padding-bottom: var(--spacing-3, 0.75rem);
          flex-wrap: nowrap;   /* clips horizontally; JS injects +N badge */
        }

        /* ── tags-2 (wrapping, height-clipped by row) ──── */
        .cell.tags-2 {
          padding-top:    var(--spacing-2, 0.5rem);
          padding-bottom: var(--spacing-2, 0.5rem);
          flex-wrap: wrap;
          align-content: flex-start;
          gap: var(--spacing-1, 0.25rem);
        }
      </style>

      <div class="cell ${variant}">
        ${innerHtml}
      </div>
    `;
  }
}

customElements.define('e-table-cell', ETableCell);

export default ETableCell;
