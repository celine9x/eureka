(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class extends HTMLElement{static get observedAttributes(){return[`variant`,`size`,`disabled`,`block`,`type`]}constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}get variant(){return this.getAttribute(`variant`)||`primary`}get size(){return this.getAttribute(`size`)||`md`}get disabled(){return this.hasAttribute(`disabled`)}get block(){return this.hasAttribute(`block`)}get type(){return this.getAttribute(`type`)||`button`}render(){let e=`
      <style>
        :host {
          display: inline-block;
          ${this.block?`width: 100%;`:``}
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
    `,t=`variant-${this.variant} size-${this.size}`;this.shadowRoot.innerHTML=`
      ${e}
      <button
        class="${t}"
        type="${this.type}"
        ${this.disabled?`disabled`:``}
      >
        <slot></slot>
      </button>
    `,this.shadowRoot.querySelector(`button`).addEventListener(`click`,e=>{this.disabled&&(e.preventDefault(),e.stopPropagation())})}};customElements.define(`e-button`,e);var t=`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M5.5 3A2.5 2.5 0 0 0 3 5.5v2.879a2.5 2.5 0 0 0 .732 1.767l6.5 6.5a2.5 2.5 0 0 0 3.536 0l2.878-2.878a2.5 2.5 0 0 0 0-3.536l-6.5-6.5A2.5 2.5 0 0 0 8.38 3H5.5ZM6 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
  </svg>
`,n=class extends HTMLElement{static get observedAttributes(){return[`variant`,`icon`,`alert`]}constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}get variant(){return this.getAttribute(`variant`)||`short-text`}get icon(){return this.hasAttribute(`icon`)}get alertLevel(){return this.getAttribute(`alert`)}render(){this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          flex: 1 1 0;
          min-width: 0;
          border-bottom: 1px solid var(--color-outline-neutral, rgba(217, 224, 237, 1));
        }

        :host(:last-child) {
          border-right: none;
        }

        .cell {
          width: 100%;
          box-sizing: border-box;
          padding-left: var(--spacing-4, 1rem);
          padding-right: var(--spacing-4, 1rem);
          background: transparent;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: var(--spacing-2, 0.5rem);
        }

        /* ── Icon wrapper ─────────────────────────────── */
        .icon-wrapper {
          flex-shrink: 0;
          width: var(--size-icon-sm, 1rem);
          height: var(--size-icon-sm, 1rem);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-content-secondary, #5371AC);
        }

        .icon-wrapper ::slotted(svg),
        .icon-wrapper svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* ── Cell content ─────────────────────────────── */
        .cell-content {
          flex: 1 1 0;
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          color: var(--color-content-primary, #15154C);
          word-wrap: break-word;
        }

        /* ── Short-text (default) ─────────────────────── */
        .cell.short-text {
          padding-top: var(--spacing-3-5, 0.875rem);
          padding-bottom: var(--spacing-3-5, 0.875rem);
        }

        .cell.short-text .cell-content {
          font-size: var(--text-body-lg, 0.875rem);
          font-weight: var(--font-weight-body-lg, 400);
          line-height: var(--line-height-body-lg, 1.25rem);
        }

        /* ── Alert icon ───────────────────────────────── */
        .alert-icon {
          flex-shrink: 0;
          width: var(--size-icon-sm, 1rem);
          height: var(--size-icon-sm, 1rem);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .alert-icon svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .alert-icon.minor { color: var(--color-content-warning,  #FF9F1C); }
        .alert-icon.major { color: var(--color-content-negative, #FF7373); }

        /* ── Long-text ────────────────────────────────── */
        .cell.long-text {
          padding-top: var(--spacing-2, 0.5rem);
          padding-bottom: var(--spacing-2, 0.5rem);
          align-items: flex-start;
        }

        .cell.long-text .icon-wrapper,
        .cell.long-text .alert-icon {
          margin-top: 0.125rem; /* optically align with first line */
        }

        .cell.long-text .cell-content {
          font-size: var(--text-body-md, 0.75rem);
          font-weight: var(--font-weight-body-md, 400);
          line-height: var(--line-height-body-md, 1rem);
          max-height: 3rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      </style>

      <div class="cell ${this.variant}">
        ${this.icon?`
          <div class="icon-wrapper">
            <slot name="icon">${t}</slot>
          </div>
        `:``}
        <div class="cell-content">
          <slot></slot>
        </div>
        ${this.alertLevel?`
          <div class="alert-icon ${this.alertLevel}" title="Conflict: ${this.alertLevel}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-label="Conflict ${this.alertLevel}">
              <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd"/>
            </svg>
          </div>
        `:``}
      </div>
    `}};customElements.define(`e-table-cell`,n);var r=class extends HTMLElement{static get observedAttributes(){return[`sortable`,`sort`]}constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.render(),this._setupListeners()}attributeChangedCallback(e,t,n){t!==n&&this.shadowRoot.innerHTML&&(this.render(),this._setupListeners())}get sortable(){return this.hasAttribute(`sortable`)}get sort(){return this.getAttribute(`sort`)||``}set sort(e){e?this.setAttribute(`sort`,e):this.removeAttribute(`sort`)}_setupListeners(){let e=this.shadowRoot.querySelector(`.cell`);!e||!this.sortable||(e.addEventListener(`click`,()=>this._cycleSort()),e.addEventListener(`keydown`,e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),this._cycleSort())}))}_cycleSort(){let e=this.sort===``?`asc`:this.sort===`asc`?`desc`:``;this.sort=e,this.dispatchEvent(new CustomEvent(`e-sort`,{detail:{direction:e||`none`},bubbles:!0,composed:!0}))}_sortIcon(){return this.sortable?this.sort===`asc`?`<svg class="sort-icon active" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 2L10 8H2L6 2Z" fill="currentColor"/>
      </svg>`:this.sort===`desc`?`<svg class="sort-icon active" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 10L2 4H10L6 10Z" fill="currentColor"/>
      </svg>`:`<svg class="sort-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1.5L9.5 6H2.5L6 1.5Z" fill="currentColor" opacity="0.4"/>
      <path d="M6 10.5L2.5 6H9.5L6 10.5Z" fill="currentColor" opacity="0.4"/>
    </svg>`:``}render(){let e=[`cell`,this.sortable?`sortable`:``].filter(Boolean).join(` `);this.shadowRoot.innerHTML=`
      
      <style>
        :host {
          display: block;
          flex: 1 1 0;
          min-width: 0;
        }

        .cell {
          display: inline-flex;
          align-items: center;
          justify-content: flex-start;
          gap: var(--spacing-1, 0.25rem);
          padding-left: var(--spacing-4, 1rem);
          padding-right: var(--spacing-4, 1rem);
          padding-top: var(--spacing-3, 0.75rem);
          padding-bottom: var(--spacing-3, 0.75rem);
          width: 100%;
          box-sizing: border-box;
          user-select: none;
        }

        .cell.sortable {
          cursor: pointer;
        }

        .cell.sortable:hover .cell-text {
          color: var(--color-content-primary, #15154C);
        }

        .cell.sortable:hover .sort-icon:not(.active) {
          opacity: 0.7;
        }

        .cell-text {
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: var(--text-body-md, 0.75rem);
          font-weight: var(--font-weight-body-md, 400);
          line-height: var(--line-height-body-md, 1rem);
          color: var(--color-content-secondary, #5371AC);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1 1 0;
          min-width: 0;
          transition: color var(--transition-fast, 150ms ease);
        }

        .sort-icon {
          flex-shrink: 0;
          color: var(--color-content-secondary, #5371AC);
          transition: opacity var(--transition-fast, 150ms ease);
        }

        .sort-icon.active {
          color: var(--color-content-brand, #4649FF);
        }
      </style>
    
      <div
        class="${e}"
        ${this.sortable?`tabindex="0" role="columnheader" aria-sort="${this.sort===`asc`?`ascending`:this.sort===`desc`?`descending`:`none`}"`:``}
      >
        <span class="cell-text"><slot></slot></span>
        ${this._sortIcon()}
      </div>
    `}};customElements.define(`e-table-cell-header`,r);var i=class extends HTMLElement{static get observedAttributes(){return[`variant`,`selected`,`disabled`]}constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.render(),this._setupListeners()}attributeChangedCallback(e,t,n){t!==n&&this.shadowRoot.innerHTML&&(this.render(),this._setupListeners())}get variant(){return this.getAttribute(`variant`)||`body`}get selected(){return this.hasAttribute(`selected`)}set selected(e){e?this.setAttribute(`selected`,``):this.removeAttribute(`selected`)}get disabled(){return this.hasAttribute(`disabled`)}_setupListeners(){if(this.variant!==`body`)return;let e=this.shadowRoot.querySelector(`.row`);e&&e.addEventListener(`click`,()=>{this.disabled||this.dispatchEvent(new CustomEvent(`e-row-click`,{detail:{selected:this.selected},bubbles:!0,composed:!0}))})}render(){let e=[`row`,this.variant===`header`?`header`:`body`,this.selected?`selected`:``,this.disabled?`disabled`:``].filter(Boolean).join(` `);this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
        }

        .row {
          display: flex;
          align-items: stretch;
          width: 100%;
          box-sizing: border-box;
        }

        /* Header row */
        .row.header {
          background: var(--color-interaction-surface-hover, #F8F9FC);
          border-bottom: 1px solid var(--color-interaction-outline-enabled, #D9E0ED);
        }

        /* Body row */
        .row.body {
          background: var(--color-background-white, #FFFFFF);
          border-bottom: 1px solid var(--color-interaction-outline-enabled, #D9E0ED);
          cursor: pointer;
          transition: background var(--transition-fast, 150ms ease);
        }

        :host(:nth-child(even)) .row.body {
          background: var(--color-background-neutral-lighter, #F8F9FC);
        }

        .row.body:last-of-type,
        :host(:last-child) .row.body {
          border-bottom: none;
        }

        .row.body:not(.disabled):not(.selected):hover {
          background: var(--color-interaction-surface-hover, #F8F9FC);
        }

        /* Selected */
        .row.body.selected {
          background: var(--color-action-surface-primary, #ECEDFF);
        }

        .row.body.selected:hover {
          background: var(--color-action-surface-primary, #ECEDFF);
        }

        /* Disabled */
        .row.body.disabled {
          background: var(--color-interaction-surface-disabled, #EFF2F9);
          cursor: not-allowed;
        }
      </style>
      <div class="${e}">
        <slot></slot>
      </div>
    `}};customElements.define(`e-table-row`,i);var a=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
        }

        .table {
          display: flex;
          flex-direction: column;
          width: 100%;
          box-sizing: border-box;
          background: var(--color-general-white, #FFFFFF);
          border-radius: var(--radius-md, 0.5rem);
          border: 1px solid var(--color-interaction-outline-enabled, #D9E0ED);
          box-shadow: var(--shadow-xs, 0px 0px 1px rgba(83, 113, 172, 0.08), 0px 1px 2px rgba(83, 113, 172, 0.08));
          overflow: hidden;
        }
      </style>
      <div class="table" role="table">
        <slot></slot>
      </div>
    `}};customElements.define(`e-table`,a);var o=class extends HTMLElement{static get observedAttributes(){return[`title`]}constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.render()}attributeChangedCallback(e,t,n){t!==n&&this.shadowRoot.innerHTML&&this.render()}get title(){return this.getAttribute(`title`)||``}render(){this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
        }

        .hub-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-4, 1rem);
          width: 100%;
          box-sizing: border-box;
        }

        .hub-header__title {
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: var(--text-heading-h2, 1.25rem);
          font-weight: var(--font-weight-heading-h2, 700);
          line-height: var(--line-height-heading-h2, 1.75rem);
          color: var(--color-content-primary, #15154C);
          flex: 1 1 0;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .hub-header__actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-2, 0.5rem);
          flex-shrink: 0;
        }
      </style>

      <div class="hub-header">
        <span class="hub-header__title">${this.title}</span>
        <div class="hub-header__actions">
          <slot name="actions"></slot>
        </div>
      </div>
    `}};customElements.define(`e-hub-header`,o);var s=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.render()}render(){this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
          width: 100%;
        }

        .hub {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-4, 1rem); /* 16px */
          width: 100%;
          box-sizing: border-box;
        }

        .hub__header {
          display: block;
          width: 100%;
        }

        .hub__content {
          display: block;
          width: 100%;
        }
      </style>

      <div class="hub">
        <div class="hub__header">
          <slot name="header"></slot>
        </div>
        <div class="hub__content">
          <slot name="content"></slot>
        </div>
      </div>
    `}};customElements.define(`e-hub`,s);var c=class extends HTMLElement{static get observedAttributes(){return[`for`,`required`]}constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}get for(){return this.getAttribute(`for`)}get required(){return this.hasAttribute(`required`)}render(){this.shadowRoot.innerHTML=`
      
      <style>
        :host {
          display: block;
        }

        label {
          display: flex;
          align-items: center;
          gap: var(--spacing-1, 0.25rem);
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: var(--text-body-md, 0.75rem);
          font-weight: var(--font-weight-highlight-md, 600);
          line-height: var(--line-height-body-md, 1rem);
          color: var(--color-content-primary, #15154C);
          cursor: pointer;
        }

        .required {
          color: var(--color-content-negative, #FF7373);
        }
      </style>
    
      <label ${this.for?`for="${this.for}"`:``}>
        <slot></slot>
        ${this.required?`<span class="required">*</span>`:``}
      </label>
    `}};customElements.define(`e-label`,c);var l=class extends HTMLElement{static get observedAttributes(){return[`type`,`placeholder`,`value`,`disabled`,`readonly`,`error`,`name`]}constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.render(),this.setupEventListeners()}attributeChangedCallback(){this.render(),this.setupEventListeners()}get type(){return this.getAttribute(`type`)||`text`}get placeholder(){return this.getAttribute(`placeholder`)||``}get value(){return this.getAttribute(`value`)||``}get disabled(){return this.hasAttribute(`disabled`)}get readonly(){return this.hasAttribute(`readonly`)}get error(){return this.hasAttribute(`error`)}get name(){return this.getAttribute(`name`)}set value(e){this.setAttribute(`value`,e);let t=this.shadowRoot.querySelector(`input`);t&&(t.value=e)}setupEventListeners(){let e=this.shadowRoot.querySelector(`input`);e&&(e.addEventListener(`input`,e=>{this.setAttribute(`value`,e.target.value),this.dispatchEvent(new CustomEvent(`e-input`,{detail:{value:e.target.value},bubbles:!0,composed:!0}))}),e.addEventListener(`change`,e=>{this.dispatchEvent(new CustomEvent(`e-change`,{detail:{value:e.target.value},bubbles:!0,composed:!0}))}),e.addEventListener(`focus`,()=>{this.dispatchEvent(new CustomEvent(`e-focus`,{bubbles:!0,composed:!0}))}),e.addEventListener(`blur`,()=>{this.dispatchEvent(new CustomEvent(`e-blur`,{bubbles:!0,composed:!0}))}))}render(){this.shadowRoot.innerHTML=`
      
      <style>
        :host {
          display: block;
        }

        input {
          width: 100%;
          padding: var(--spacing-2, 0.5rem) var(--spacing-3, 0.75rem);
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: var(--text-body-lg, 0.875rem);
          font-weight: var(--font-weight-body-lg, 400);
          line-height: var(--line-height-body-lg, 1.25rem);
          color: var(--color-content-primary, #15154C);
          background-color: var(--color-interaction-fill-enabled, #FFFFFF);
          border: 1px solid var(--color-interaction-outline-enabled, #D9E0ED);
          border-radius: var(--radius-md, 0.5rem);
          outline: none;
          transition: all var(--transition-fast, 150ms ease);
          box-sizing: border-box;
        }

        input::placeholder {
          color: var(--color-content-tertiary, #93A6CB);
        }

        input:hover:not(:disabled):not(.error) {
          border-color: var(--color-interaction-outline-hover, #5371AC);
        }

        input:focus:not(.error) {
          border-color: var(--color-interaction-outline-active, #383ACC);
          box-shadow: var(--shadow-focus, 0 0 0.25rem 0 rgba(56, 58, 204, 0.4));
        }

        input:disabled {
          background-color: var(--color-interaction-fill-disabled, #F8F9FC);
          border-color: var(--color-interaction-outline-disabled, #D9E0ED);
          color: var(--color-content-tertiary, #93A6CB);
          cursor: not-allowed;
        }

        input:read-only {
          background-color: var(--color-general-neutral-lighter, #F8F9FC);
        }

        input.error {
          border-color: var(--color-interaction-outline-negative, #FF7373);
        }

        input.error:focus {
          border-color: var(--color-interaction-outline-negative, #FF7373);
          box-shadow: 0 0 0.25rem 0 rgba(255, 115, 115, 0.4);
        }
      </style>
    
      <input
        class="${this.error?`error`:``}"
        type="${this.type}"
        placeholder="${this.placeholder}"
        value="${this.value}"
        ${this.name?`name="${this.name}"`:``}
        ${this.disabled?`disabled`:``}
        ${this.readonly?`readonly`:``}
      />
    `}};customElements.define(`e-input`,l);var u=class extends HTMLElement{static get observedAttributes(){return[`variant`]}constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}get variant(){return this.getAttribute(`variant`)||`default`}render(){this.shadowRoot.innerHTML=`
      
      <style>
        :host {
          display: block;
        }

        span {
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: var(--text-body-md, 0.75rem);
          font-weight: var(--font-weight-body-md, 400);
          line-height: var(--line-height-body-md, 1rem);
        }

        .default {
          color: var(--color-content-secondary, #5371AC);
        }

        .error {
          color: var(--color-content-negative, #FF7373);
        }
      </style>
    
      <span class="${this.variant}">
        <slot></slot>
      </span>
    `}};customElements.define(`e-helper-text`,u);var d=class extends HTMLElement{static get observedAttributes(){return[`type`,`label`,`placeholder`,`value`,`helper`,`error`,`disabled`,`required`,`readonly`,`name`,`id`]}constructor(){super(),this.attachShadow({mode:`open`}),this._inputId=`input-${Math.random().toString(36).slice(2,11)}`}connectedCallback(){this.render(),this.setupEventListeners()}attributeChangedCallback(){this.shadowRoot.innerHTML&&(this.render(),this.setupEventListeners())}get type(){return this.getAttribute(`type`)||`text`}get label(){return this.getAttribute(`label`)}get placeholder(){return this.getAttribute(`placeholder`)||``}get value(){return this.getAttribute(`value`)||``}get helper(){return this.getAttribute(`helper`)}get error(){return this.getAttribute(`error`)}get disabled(){return this.hasAttribute(`disabled`)}get required(){return this.hasAttribute(`required`)}get readonly(){return this.hasAttribute(`readonly`)}get name(){return this.getAttribute(`name`)}get inputId(){return this.getAttribute(`id`)||this._inputId}set value(e){this.setAttribute(`value`,e);let t=this.shadowRoot.querySelector(`e-input`);t&&(t.value=e)}setupEventListeners(){let e=this.shadowRoot.querySelector(`e-input`);if(!e)return;let t=e.cloneNode(!0);e.parentNode.replaceChild(t,e),t.addEventListener(`e-input`,e=>{this.setAttribute(`value`,e.detail.value),this.dispatchEvent(new CustomEvent(`e-input`,{detail:e.detail,bubbles:!0,composed:!0}))}),t.addEventListener(`e-change`,e=>{this.dispatchEvent(new CustomEvent(`e-change`,{detail:e.detail,bubbles:!0,composed:!0}))}),t.addEventListener(`e-focus`,()=>{this.dispatchEvent(new CustomEvent(`e-focus`,{bubbles:!0,composed:!0}))}),t.addEventListener(`e-blur`,()=>{this.dispatchEvent(new CustomEvent(`e-blur`,{bubbles:!0,composed:!0}))})}render(){let e=!!this.error,t=this.label?`
      <e-label for="${this.inputId}" ${this.required?`required`:``}>${this.label}</e-label>
    `:``,n=this.error?`<e-helper-text variant="error">${this.error}</e-helper-text>`:this.helper?`<e-helper-text>${this.helper}</e-helper-text>`:``;this.shadowRoot.innerHTML=`
      
      <style>
        :host {
          display: block;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-1, 0.25rem);
        }
      </style>
    
      <div class="field">
        ${t}
        <e-input
          type="${this.type}"
          placeholder="${this.placeholder}"
          value="${this.value}"
          ${this.name?`name="${this.name}"`:``}
          ${this.disabled?`disabled`:``}
          ${this.readonly?`readonly`:``}
          ${e?`error`:``}
        ></e-input>
        ${n}
      </div>
    `}};customElements.define(`e-text-input`,d);var f=class extends HTMLElement{static get observedAttributes(){return[`value`,`checked`,`disabled`,`subinfo`,`color`,`icon`,`show-badge`,`show-action`]}constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.render(),this._setupListeners()}attributeChangedCallback(e,t,n){t!==n&&this.shadowRoot.innerHTML&&(this.render(),this._setupListeners())}get value(){return this.getAttribute(`value`)||``}get checked(){return this.hasAttribute(`checked`)}set checked(e){e?this.setAttribute(`checked`,``):this.removeAttribute(`checked`)}get disabled(){return this.hasAttribute(`disabled`)}get subinfo(){return this.getAttribute(`subinfo`)||``}get color(){return this.getAttribute(`color`)||``}get icon(){return this.hasAttribute(`icon`)}get showBadge(){return this.hasAttribute(`show-badge`)}get showAction(){return this.hasAttribute(`show-action`)}_toggle(){this.disabled||(this.checked=!this.checked,this.dispatchEvent(new CustomEvent(`e-change`,{detail:{value:this.value,label:this.textContent.trim(),checked:this.checked},bubbles:!0,composed:!0})))}_setupListeners(){let e=this.shadowRoot.querySelector(`.item`);e&&(e.addEventListener(`click`,()=>this._toggle()),e.addEventListener(`keydown`,e=>{(e.key===` `||e.key===`Enter`)&&(e.preventDefault(),this._toggle())}))}render(){let{checked:e,disabled:t,subinfo:n,color:r,icon:i,showBadge:a,showAction:o}=this;this.shadowRoot.innerHTML=`
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

        /* Checkbox */
        .checkbox {
          flex-shrink: 0;
          width: var(--size-icon-sm, 1rem);
          height: var(--size-icon-sm, 1rem);
          border-radius: var(--radius-sm, 0.25rem);
          border: 1px solid var(--color-outline-neutral, #D9E0ED);
          background: var(--color-general-white, #FFFFFF);
          box-shadow: var(--shadow-light-down, 0px 0px 1px rgba(83,113,172,0.08), 0px 1px 2px rgba(83,113,172,0.08));
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            background var(--transition-fast, 150ms ease),
            border-color var(--transition-fast, 150ms ease);
        }

        .checkbox.checked {
          background: var(--color-content-brand, #4649FF);
          border-color: var(--color-content-brand, #4649FF);
        }

        .checkbox svg { display: none; color: var(--color-content-inverted, #FFFFFF); }
        .checkbox.checked svg { display: block; }

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
        class="item${t?` disabled`:``}"
        tabindex="${t?`-1`:`0`}"
        role="checkbox"
        aria-checked="${e}"
        aria-disabled="${t}"
      >

        <!-- Left -->
        <div class="left">
          <!-- Checkbox -->
          <div class="checkbox${e?` checked`:``}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="10" height="10" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd"/>
            </svg>
          </div>

          <!-- Optional left icon -->
          ${i?`
            <div class="icon-left">
              <slot name="icon"></slot>
            </div>
          `:``}

          <!-- Optional color accent rectangle -->
          ${r?`
            <div class="color-rect" style="background:${r}"></div>
          `:``}

          <!-- Label (+ optional subinfo) -->
          <div class="label-block">
            <span class="label"><slot></slot></span>
            ${n?`<span class="subinfo">${n}</span>`:``}
          </div>
        </div>

        <!-- Right -->
        ${a||o?`
          <div class="right">
            ${a?`<div class="badge-slot"><slot name="badge"></slot></div>`:``}
            ${o?`<div class="action-slot"><slot name="action"></slot></div>`:``}
          </div>
        `:``}

      </div>
    `}};customElements.define(`e-dropdown-list-item`,f);var p=class extends HTMLElement{static get observedAttributes(){return[`title`]}constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.render()}attributeChangedCallback(e,t,n){t!==n&&this.shadowRoot.innerHTML&&this.render()}get title(){return this.getAttribute(`title`)||``}render(){this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: block;
        }
        :host([hidden]) {
          display: none;
        }

        .section {
          display: flex;
          flex-direction: column;
          align-self: stretch;
          padding: var(--spacing-2, 0.5rem);
          gap: var(--spacing-1, 0.25rem);
        }

        .section-title {
          align-self: stretch;
          padding: var(--spacing-1, 0.25rem);
          font-family: var(--font-family-primary, 'Sora', sans-serif);
          font-size: var(--text-highlight-md, 0.75rem);
          font-weight: var(--font-weight-highlight-md, 600);
          line-height: var(--line-height-highlight-md, 1rem);
          text-transform: uppercase;
          color: var(--color-content-tertiary, #93A6CB);
          letter-spacing: 0.04em;
        }
      </style>

      <div class="section">
        ${this.title?`<div class="section-title">${this.title}</div>`:``}
        <slot></slot>
      </div>
    `}};customElements.define(`e-dropdown-section`,p);var m=class extends HTMLElement{static get observedAttributes(){return[`search-placeholder`,`add-label`,`no-add`]}constructor(){super(),this.attachShadow({mode:`open`})}connectedCallback(){this.render(),this._setupListeners()}attributeChangedCallback(e,t,n){t!==n&&this.shadowRoot.innerHTML&&(this.render(),this._setupListeners())}get searchPlaceholder(){return this.getAttribute(`search-placeholder`)||`Search`}get addLabel(){return this.getAttribute(`add-label`)||`Add value`}get noAdd(){return this.hasAttribute(`no-add`)}_setupListeners(){let e=this.shadowRoot.querySelector(`e-text-input`);e&&e.addEventListener(`e-input`,e=>{this._filter(e.detail?.value??``)});let t=this.shadowRoot.querySelector(`.add-btn e-button`);t&&t.addEventListener(`click`,()=>{this.dispatchEvent(new CustomEvent(`e-add`,{bubbles:!0,composed:!0}))})}_filter(e){let t=e.trim().toLowerCase(),n=`e-dropdown-list-item`;this.querySelectorAll(n).forEach(e=>{let n=e.textContent.trim().toLowerCase();e.hidden=t.length>0&&!n.includes(t)}),this.querySelectorAll(`e-dropdown-section`).forEach(e=>{let t=[...e.querySelectorAll(n)];e.hidden=t.length>0&&t.every(e=>e.hidden)})}render(){this.shadowRoot.innerHTML=`
      <style>
        :host {
          display: inline-flex;
          flex-direction: column;
          width: 100%;
        }

        .dropdown {
          display: inline-flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          background: var(--color-general-white, #FFFFFF);
          border-radius: var(--radius-md, 0.5rem);
          outline: 1px solid var(--color-outline-neutral, #D9E0ED);
          outline-offset: -1px;
          box-shadow: var(--shadow-light-down, 0px 0px 1px rgba(83,113,172,0.08), 0px 1px 2px rgba(83,113,172,0.08));
          overflow: hidden;
          box-sizing: border-box;
        }

        /* ── Top: search + scrollable list ── */
        .top {
          align-self: stretch;
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .search {
          align-self: stretch;
          padding: var(--spacing-2, 0.5rem);
          border-bottom: 1px solid var(--color-outline-neutral, #D9E0ED);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-2, 0.5rem);
        }

        .content {
          align-self: stretch;
          overflow-y: auto;
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
          /* Custom scrollbar */
          scrollbar-width: thin;
          scrollbar-color: rgba(21, 21, 76, 0.4) transparent;
        }

        .content::-webkit-scrollbar {
          width: 6px;
        }

        .content::-webkit-scrollbar-track {
          background: transparent;
        }

        .content::-webkit-scrollbar-thumb {
          background: rgba(21, 21, 76, 0.35);
          border-radius: var(--radius-full, 9999px);
        }

        /* ── Bottom: add button ── */
        .bottom {
          align-self: stretch;
          padding: var(--spacing-2, 0.5rem) var(--spacing-4, 1rem);
          border-top: 1px solid var(--color-outline-neutral, #D9E0ED);
          display: inline-flex;
          justify-content: flex-start;
          align-items: center;
          gap: var(--spacing-2, 0.5rem);
        }

        .add-btn {
          display: contents;
        }
      </style>

      <div class="dropdown">
        <div class="top">

          <div class="search">
            <e-text-input
              placeholder="${this.searchPlaceholder}"
            ></e-text-input>
          </div>

          <div class="content">
            <slot></slot>
          </div>

        </div>

        ${this.noAdd?``:`
          <div class="bottom">
            <div class="add-btn">
              <e-button variant="tertiary" size="sm">
                ${this.addLabel}
              </e-button>
            </div>
          </div>
        `}
      </div>
    `}};customElements.define(`e-dropdown-list`,m);var h=`Asset Name,Title,Development Phase,Drug Type,Conflict Level
AMX-3819,Alzheimer's disease,Phase 2 Clinical,Small molecule,none
BRT-5502,"Parkinson's disease, Lewy body dementia",Phase 1 Clinical,"Small molecule, Intravenous formulation",none
CNX-0047,Huntington's disease,Preclinical,Small molecule,none
DPX-8814,"Amyotrophic lateral sclerosis, Frontotemporal dementia",Phase 1 Clinical,"Small molecule, Oral formulation",none
ELX-1193,Parkinson's disease,Discovery,Small molecule,none
FZT-2290,Multiple system atrophy,Preclinical,Small molecule,none
GNX-7701,Vascular dementia,Phase 1 Clinical,"Small molecule, Radiolabeling",none
HXP-4423,"Alzheimer's disease, Mild cognitive impairment",Phase 2 Clinical,Small molecule,none
IVR-9900,Parkinson's disease dementia,Preclinical,"Small molecule, Oral formulation",none
JNK-3351,"Amyotrophic lateral sclerosis, Spinocerebellar ataxia, Spinal muscular atrophy",Phase 1 Clinical,"Small molecule, Systemic formulation unspecified",none
KRZ-5566,Alzheimer's disease,Phase 2 Clinical,Small molecule,minor
LMX-7720,Parkinson's disease,Phase 1 Clinical,"Small molecule, Biologic",major
MNR-0034,"Alzheimer's disease, Parkinson's disease, Huntington's disease",Preclinical,Small molecule,major
NTX-6612,"Alzheimer's disease, Cerebrovascular disease",Phase 1 Clinical,"Small molecule, Infusion",major
OXP-1178,Parkinson's disease,Phase 1 Clinical,"Small molecule, Radiolabeling",minor
PLX-3349,Alzheimer's disease,Phase 2 Clinical,"Small molecule, Oral formulation",major
QVN-8801,"Alzheimer's disease, Cancer",Phase 1 Clinical,"Small molecule, Intravenous formulation",minor
RXT-4490,Frontotemporal dementia,Phase 1 Clinical,Small molecule,major
SNX-2201,"Alzheimer's disease, Demyelinating disease, Multiple sclerosis, Traumatic brain injury",Phase 1 Clinical,"Small molecule, Infusion, Intravenous formulation, Radiolabeling",none
TXA-6630,"Parkinson's disease, Parkinsonism",Phase 1 Clinical,"Small molecule, Biologic, Oral formulation",major
`;function g(e){return e.trim().split(`
`).map(e=>{let t=[],n=``,r=!1;for(let i of e)i===`"`?r=!r:i===`,`&&!r?(t.push(n.trim()),n=``):n+=i;return t.push(n.trim()),t})}var[,..._]=g(h),v=[`Asset Name`,`Clinical Indication`,`Development Phase`,`Drug Type`],y=v.map((e,t)=>{let n=new Set;for(let e of _)(e[t]??``).split(`,`).forEach(e=>{let t=e.trim();t&&n.add(t)});return[...n].sort()});function b(e,t={},...n){let r=document.createElement(e);for(let[e,n]of Object.entries(t))n===!0?r.setAttribute(e,``):n!==!1&&n!=null&&r.setAttribute(e,n);for(let e of n)(typeof e==`string`||e)&&r.append(e);return r}var x=document.createElement(`style`);x.textContent=`
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: var(--font-family-primary, 'Sora', sans-serif);
    background: var(--color-background-neutral-lighter, #F8F9FC);
    color: var(--color-content-primary, #15154C);
    padding: var(--spacing-8, 2rem);
  }

  /* Floating dropdown overlay */
  #dropdown-overlay {
    position: fixed;
    inset: 0;
    z-index: 999;
    pointer-events: none;  /* overlay itself is invisible; only the panel catches clicks */
  }

  #dropdown-panel {
    position: absolute;
    width: 280px;
    max-height: 320px;
    display: flex;
    flex-direction: column;
    pointer-events: all;
    /* panel renders its own shadow via e-dropdown-list */
  }

  #dropdown-panel e-dropdown-list {
    max-height: 320px;
    display: flex;
    flex-direction: column;
  }

  /* Clickable cell highlight */
  e-table-cell[data-clickable] {
    cursor: pointer;
  }
`,document.head.append(x),document.title=`Hub — Eureka DS`;var S=b(`div`,{id:`dropdown-overlay`}),C=b(`div`,{id:`dropdown-panel`});S.append(C),document.body.append(S);var w=null;function T(e,t){if(w===e){E();return}w=e;let n=e.textContent.trim(),r=new Set(n.split(`,`).map(e=>e.trim()).filter(Boolean));C.innerHTML=``;let i=b(`e-dropdown-list`,{"search-placeholder":`Search ${v[t]}…`,"add-label":`Add value`}),a=b(`e-dropdown-section`,{title:v[t]});for(let e of y[t]){let t=b(`e-dropdown-list-item`,{value:e});r.has(e)&&t.setAttribute(`checked`,``),t.textContent=e,a.append(t)}i.append(a),C.append(i);let o=e.getBoundingClientRect(),s=window.innerHeight-o.bottom;s>=320||s>=160?(C.style.top=`${o.bottom+4}px`,C.style.bottom=`auto`):(C.style.bottom=`${window.innerHeight-o.top+4}px`,C.style.top=`auto`);let c=Math.min(o.left,window.innerWidth-284);C.style.left=`${Math.max(0,c)}px`,S.style.pointerEvents=`all`,i.addEventListener(`e-change`,e=>{console.log(`[dropdown] e-change`,e.detail)})}function E(){w=null,C.innerHTML=``,S.style.pointerEvents=`none`}S.addEventListener(`click`,e=>{C.contains(e.target)||E()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&E()});var D=b(`e-hub-header`,{slot:`header`,title:`Pipeline Assets`});D.append(b(`e-button`,{slot:`actions`,variant:`secondary`,size:`md`},`Export`),b(`e-button`,{slot:`actions`,variant:`primary`,size:`md`},`Add Asset`));var O=b(`e-table`,{slot:`content`}),k=b(`e-table-row`,{variant:`header`});for(let e of v)k.append(b(`e-table-cell-header`,{sortable:!0},e));O.append(k);for(let[e,t,n,r,i]of _){let a=i&&i!==`none`,o=a?i:null,s=b(`e-table-row`,{});s.append(b(`e-table-cell`,{"data-clickable":!0,...a&&{alert:o}},e),b(`e-table-cell`,{variant:`long-text`,"data-clickable":!0,...a&&{alert:o}},t),b(`e-table-cell`,{"data-clickable":!0,...a&&{alert:o}},n),b(`e-table-cell`,{variant:`long-text`,"data-clickable":!0,...a&&{alert:o}},r)),O.append(s)}O.addEventListener(`click`,e=>{let t=e.composedPath().find(e=>e.tagName===`E-TABLE-CELL`);if(!t)return;let n=t.closest(`e-table-row`);if(!n||n.getAttribute(`variant`)===`header`)return;let r=[...n.querySelectorAll(`e-table-cell`)].indexOf(t);r!==-1&&T(t,r)});var A=b(`e-hub`);A.append(D,O),document.body.append(A);