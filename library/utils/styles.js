/**
 * Style Utilities
 *
 * Shared utilities for style injection and class composition.
 */

// ─────────────────────────────────────────────
// STYLE INJECTION
// ─────────────────────────────────────────────

/**
 * Creates an SSR-safe style injector for a component.
 * Styles are injected once per component name.
 *
 * @param {string} componentName - Unique component identifier
 * @returns {function} - Function to inject CSS
 *
 * @example
 * const injectStyles = createStyleInjector("button");
 * injectStyles(css);
 */
export const createStyleInjector = (componentName) => {
  let injected = false;

  return (css) => {
    if (typeof document === "undefined") return;

    // Remove any existing style tag for this component (stale HMR tags)
    const existing = document.querySelector(`style[data-eureka="${componentName}"]`);
    if (existing) existing.remove();

    if (injected) { injected = false; }

    const el = document.createElement("style");
    el.setAttribute("data-eureka", componentName);
    el.textContent = css;
    document.head.appendChild(el);
    injected = true;
  };
};

// ─────────────────────────────────────────────
// CLASS COMPOSITION
// ─────────────────────────────────────────────

/**
 * Combines class names, filtering out falsy values.
 *
 * @param {...(string|boolean|undefined|null)} classes - Class names to combine
 * @returns {string} - Combined class string
 *
 * @example
 * cx("btn", size && `btn-${size}`, disabled && "btn-disabled", className)
 * // => "btn btn-md btn-disabled custom-class"
 */
export const cx = (...classes) => classes.filter(Boolean).join(" ");

// ─────────────────────────────────────────────
// STYLE OBJECT HELPERS
// ─────────────────────────────────────────────

/**
 * Joins style object values into a single CSS string.
 *
 * @param {Object} styles - Object with CSS string values
 * @returns {string} - Combined CSS string
 *
 * @example
 * const css = joinStyles({ base: ".btn {...}", sizes: ".btn-sm {...}" });
 */
export const joinStyles = (styles) => Object.values(styles).join("\n");
