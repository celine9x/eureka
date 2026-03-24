/**
 * Eureka Design System - Button Atom
 *
 * A reusable button Web Component that uses design tokens.
 *
 * Usage:
 *   <e-button variant="primary" size="md">Label</e-button>
 *   <e-button variant="secondary" size="lg" disabled>Disabled</e-button>
 *   <e-button variant="negative" size="sm">Delete</e-button>
 *
 * Attributes:
 *   - variant: primary | secondary | tertiary | negative | positive (default: primary)
 *   - size: lg | md | sm (default: md)
 *   - disabled: boolean
 *   - block: boolean (full width)
 *   - type: button | submit | reset (default: button)
 */

class EButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'block', 'type'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  get variant() {
    return this.getAttribute('variant') || 'primary';
  }

  get size() {
    return this.getAttribute('size') || 'md';
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  get block() {
    return this.hasAttribute('block');
  }

  get type() {
    return this.getAttribute('type') || 'button';
  }

  render() {
    const styles = `
      <style>
        :host {
          display: inline-block;
          ${this.block ? 'width: 100%;' : ''}
        }

        button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-2, 0.5rem);
          border: 1px solid transparent;
          border-radius: var(--radius-md, 0.5rem);
          cursor: pointer;
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-weight: var(--font-weight-button-lg, 400);
          text-decoration: none;
          transition: all var(--transition-fast, 150ms ease);
          white-space: nowrap;
          width: 100%;
          box-sizing: border-box;
        }

        button:focus-visible {
          outline: none;
          box-shadow: var(--shadow-focus, 0 0 0.25rem 0 rgba(56, 58, 204, 0.4));
        }

        /* Sizes */
        button.size-lg {
          padding: var(--spacing-3, 0.75rem) var(--spacing-5, 1.25rem);
          font-size: var(--text-button-lg, 0.875rem);
          line-height: var(--line-height-button-lg, 1.25rem);
          min-height: 2.5rem;
        }

        button.size-md {
          padding: var(--spacing-2, 0.5rem) var(--spacing-4, 1rem);
          font-size: var(--text-button-md, 0.75rem);
          line-height: var(--line-height-button-md, 1rem);
          min-height: 2rem;
        }

        button.size-sm {
          padding: var(--spacing-1, 0.25rem) var(--spacing-3, 0.75rem);
          font-size: var(--text-button-md, 0.75rem);
          line-height: var(--line-height-button-md, 1rem);
          min-height: 1.5rem;
        }

        /* Primary Variant */
        button.variant-primary {
          background-color: var(--color-action-fill-primary-enabled, #4649FF);
          color: var(--color-action-content-primary-enabled, #FFFFFF);
          border-color: var(--color-action-fill-primary-enabled, #4649FF);
        }

        button.variant-primary:hover:not(:disabled) {
          background-color: var(--color-action-fill-primary-hover, #383ACC);
          border-color: var(--color-action-fill-primary-hover, #383ACC);
        }

        button.variant-primary:active:not(:disabled) {
          background-color: var(--color-action-fill-primary-active, #4649FF);
          border-color: var(--color-action-fill-primary-active, #4649FF);
        }

        button.variant-primary:disabled {
          background-color: var(--color-action-fill-primary-disabled, #ECEDFF);
          color: var(--color-action-content-primary-disabled, #4649FF);
          border-color: var(--color-action-fill-primary-disabled, #ECEDFF);
          cursor: not-allowed;
        }

        /* Secondary Variant */
        button.variant-secondary {
          background-color: var(--color-action-fill-secondary-enabled, #FFFFFF);
          color: var(--color-action-content-secondary-enabled, #5371AC);
          border-color: var(--color-action-outline-secondary-enabled, #D9E0ED);
        }

        button.variant-secondary:hover:not(:disabled) {
          background-color: var(--color-action-fill-secondary-hover, #F8F9FC);
          color: var(--color-action-content-secondary-hover, #324467);
          border-color: var(--color-action-outline-secondary-hover, #93A6CB);
        }

        button.variant-secondary:active:not(:disabled) {
          background-color: var(--color-action-fill-secondary-active, #ECEDFF);
          color: var(--color-action-content-secondary-active, #15154C);
          border-color: var(--color-action-outline-secondary-active, #383ACC);
        }

        button.variant-secondary:disabled {
          background-color: var(--color-action-fill-secondary-disabled, #EFF2F9);
          color: var(--color-action-content-secondary-disabled, #93A6CB);
          border-color: var(--color-action-outline-secondary-disabled, #D9E0ED);
          cursor: not-allowed;
        }

        /* Tertiary Variant (Ghost) */
        button.variant-tertiary {
          background-color: var(--color-action-fill-tertiary-enabled, transparent);
          color: var(--color-action-content-tertiary-enabled, #5371AC);
          border-color: transparent;
        }

        button.variant-tertiary:hover:not(:disabled) {
          background-color: var(--color-action-fill-tertiary-hover, #FFFFFF);
          color: var(--color-action-content-tertiary-hover, #324467);
        }

        button.variant-tertiary:active:not(:disabled) {
          background-color: var(--color-action-fill-tertiary-active, #F8F9FC);
          color: var(--color-action-content-tertiary-active, #15154C);
        }

        button.variant-tertiary:disabled {
          background-color: var(--color-action-fill-tertiary-disabled, transparent);
          color: var(--color-action-content-tertiary-disabled, #93A6CB);
          cursor: not-allowed;
        }

        /* Negative Variant */
        button.variant-negative {
          background-color: var(--color-action-fill-negative-enabled, #FF7373);
          color: var(--color-action-content-negative-enabled, #FFFFFF);
          border-color: var(--color-action-fill-negative-enabled, #FF7373);
        }

        button.variant-negative:hover:not(:disabled) {
          background-color: var(--color-action-fill-negative-hover, #E45353);
          border-color: var(--color-action-fill-negative-hover, #E45353);
        }

        button.variant-negative:active:not(:disabled) {
          background-color: var(--color-action-fill-negative-active, #FF7373);
          border-color: var(--color-action-fill-negative-active, #FF7373);
        }

        button.variant-negative:disabled {
          background-color: var(--color-action-fill-negative-disabled, #FFF5F5);
          color: var(--color-action-content-negative-disabled, #FF7373);
          border-color: var(--color-action-fill-negative-disabled, #FFF5F5);
          cursor: not-allowed;
        }

        /* Positive Variant */
        button.variant-positive {
          background-color: var(--color-action-fill-positive-enabled, #02C39A);
          color: var(--color-action-content-positive-enabled, #FFFFFF);
          border-color: var(--color-action-fill-positive-enabled, #02C39A);
        }

        button.variant-positive:hover:not(:disabled) {
          background-color: var(--color-action-fill-positive-hover, #029778);
          border-color: var(--color-action-fill-positive-hover, #029778);
        }

        button.variant-positive:active:not(:disabled) {
          background-color: var(--color-action-fill-positive-active, #02C39A);
          border-color: var(--color-action-fill-positive-active, #02C39A);
        }

        button.variant-positive:disabled {
          background-color: var(--color-action-fill-positive-disabled, #E6FFF9);
          color: var(--color-action-content-positive-disabled, #029778);
          border-color: var(--color-action-fill-positive-disabled, #E6FFF9);
          cursor: not-allowed;
        }

        /* Slot for icons */
        ::slotted(svg) {
          width: 1em;
          height: 1em;
        }
      </style>
    `;

    const classes = `variant-${this.variant} size-${this.size}`;

    this.shadowRoot.innerHTML = `
      ${styles}
      <button
        class="${classes}"
        type="${this.type}"
        ${this.disabled ? 'disabled' : ''}
      >
        <slot></slot>
      </button>
    `;

    // Forward click events
    this.shadowRoot.querySelector('button').addEventListener('click', (e) => {
      if (this.disabled) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }
}

// Register the component
customElements.define('e-button', EButton);

export default EButton;
