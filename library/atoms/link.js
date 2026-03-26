/**
 * Eureka Design System - Link Atom
 *
 * A styled anchor link Web Component with optional left/right icon slots.
 *
 * Usage:
 *   <e-link href="/page">Go to page</e-link>
 *   <e-link href="/page" size="md">Medium link</e-link>
 *   <e-link href="/page" icon-left>
 *     <svg slot="icon-left" ...></svg>
 *     With left icon
 *   </e-link>
 *   <e-link href="/page" icon-right>
 *     With right icon
 *     <svg slot="icon-right" ...></svg>
 *   </e-link>
 *   <e-link disabled>Disabled link</e-link>
 *
 * Attributes:
 *   - href:       string  — URL to navigate to (omit for non-navigating links)
 *   - target:     string  — anchor target (e.g. "_blank")
 *   - size:       lg | md (default: lg)
 *   - disabled:   boolean
 *   - icon-left:  boolean — show the icon-left slot
 *   - icon-right: boolean — show the icon-right slot
 *
 * Slots:
 *   - (default)  link text
 *   - icon-left  icon before the text
 *   - icon-right icon after the text
 *
 * Events:
 *   - e-click (composed, bubbles): fires on click when not disabled
 */

class ELink extends HTMLElement {
  static get observedAttributes() {
    return ['href', 'target', 'size', 'disabled', 'icon-left', 'icon-right'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this._setupListeners();
  }

  attributeChangedCallback(_name, oldValue, newValue) {
    if (oldValue !== newValue && this.shadowRoot.innerHTML) {
      this.render();
      this._setupListeners();
    }
  }

  get href()      { return this.getAttribute('href') || ''; }
  get target()    { return this.getAttribute('target') || ''; }
  get size()      { return this.getAttribute('size') || 'lg'; }
  get disabled()  { return this.hasAttribute('disabled'); }
  get iconLeft()  { return this.hasAttribute('icon-left'); }
  get iconRight() { return this.hasAttribute('icon-right'); }

  _setupListeners() {
    const anchor = this.shadowRoot.querySelector('a');
    if (!anchor) return;

    anchor.addEventListener('click', (e) => {
      if (this.disabled) {
        e.preventDefault();
        return;
      }
      this.dispatchEvent(new CustomEvent('e-click', {
        bubbles:  true,
        composed: true,
      }));
    });
  }

  render() {
    // LG: text-body-lg (14px/20px), icon-md (20px), height 28px
    // MD: text-body-md (12px/16px), icon-sm (16px), height 24px
    const sizeConfig = {
      lg: {
        height:     '1.75rem',
        iconSize:   'var(--size-icon-md, 1.25rem)',
        fontSize:   'var(--text-body-lg, 0.875rem)',
        fontWeight: 'var(--font-weight-body-lg, 400)',
        lineHeight: 'var(--line-height-body-lg, 1.25rem)',
      },
      md: {
        height:     '1.5rem',
        iconSize:   'var(--size-icon-sm, 1rem)',
        fontSize:   'var(--text-body-md, 0.75rem)',
        fontWeight: 'var(--font-weight-body-md, 400)',
        lineHeight: 'var(--line-height-body-md, 1rem)',
      },
    };

    const cfg = sizeConfig[this.size] || sizeConfig.lg;
    const { disabled, iconLeft, iconRight, href, target } = this;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
        }

        a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-1, 0.25rem);
          height: ${cfg.height};
          padding: 0 var(--spacing-1, 0.25rem);
          border-radius: var(--radius-sm, 0.25rem);
          text-decoration: none;
          cursor: pointer;

          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: ${cfg.fontSize};
          font-weight: ${cfg.fontWeight};
          line-height: ${cfg.lineHeight};
          color: var(--color-content-brand, #4649FF);

          transition:
            background var(--transition-fast, 150ms ease),
            color var(--transition-fast, 150ms ease);
        }

        /* Hover — Blue30 (#1F207A) has no direct token; --color-content-primary is the closest */
        a:hover:not(.disabled) {
          color: var(--color-content-primary, #15154C);
          text-decoration: underline;
        }

        /* Active / pressed */
        a:active:not(.disabled) {
          background: var(--color-action-fill-tertiary-active, #F8F9FC);
          color: var(--color-content-primary, #15154C);
          text-decoration: underline;
        }

        /* Focus */
        a:focus-visible {
          outline: 2px solid var(--color-content-brand, #4649FF);
          outline-offset: 2px;
          border-radius: var(--radius-sm, 0.25rem);
        }

        /* Disabled */
        a.disabled {
          cursor: not-allowed;
          color: var(--color-content-secondary, #5371AC);
          pointer-events: none;
        }

        /* Icon slots */
        .icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: ${cfg.iconSize};
          height: ${cfg.iconSize};
          overflow: hidden;
          color: inherit;
        }

        .icon ::slotted(svg) {
          width: 100%;
          height: 100%;
          display: block;
        }
      </style>

      <a
        ${href ? `href="${href}"` : ''}
        ${target ? `target="${target}"` : ''}
        class="${disabled ? 'disabled' : ''}"
        ${disabled ? 'aria-disabled="true" tabindex="-1"' : ''}
      >
        ${iconLeft  ? `<span class="icon"><slot name="icon-left"></slot></span>`  : ''}
        <slot></slot>
        ${iconRight ? `<span class="icon"><slot name="icon-right"></slot></span>` : ''}
      </a>
    `;
  }
}

customElements.define('e-link', ELink);

export default ELink;
