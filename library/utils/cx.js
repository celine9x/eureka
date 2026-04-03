/**
 * Class Name Utilities
 *
 * Utilities for composing class names in the variant-map architecture.
 */

/**
 * Combines class names, filtering out falsy values.
 * Supports strings, arrays, and conditional class names.
 *
 * @param {...(string|boolean|undefined|null|string[])} classes - Class names to combine
 * @returns {string} - Combined class string
 *
 * @example
 * cx("btn", size && `btn-${size}`, disabled && "btn-disabled", className)
 * // => "btn btn-md btn-disabled custom-class"
 *
 * cx(["base", "class"], isActive && "active")
 * // => "base class active"
 */
export const cx = (...classes) => {
  return classes
    .flat()
    .filter(Boolean)
    .join(" ");
};

/**
 * Sorts and joins class name arrays for consistent output.
 * Used to organize style objects for better readability.
 *
 * @param {Object} styles - Style object with class name values
 * @returns {Object} - Same structure with joined class strings
 *
 * @example
 * const styles = sortCx({
 *   common: {
 *     root: ["base", "flex", "items-center"],
 *     icon: ["shrink-0", "size-5"],
 *   },
 *   sizes: {
 *     sm: { root: ["h-8", "px-3"] },
 *     md: { root: ["h-10", "px-4"] },
 *   },
 * });
 */
export const sortCx = (styles) => {
  const process = (obj) => {
    if (typeof obj === "string") return obj;
    if (Array.isArray(obj)) return obj.join(" ");
    if (typeof obj === "object" && obj !== null) {
      const result = {};
      for (const key in obj) {
        result[key] = process(obj[key]);
      }
      return result;
    }
    return obj;
  };
  return process(styles);
};

/**
 * Checks if a value is a valid React component (function or class).
 *
 * @param {any} value - Value to check
 * @returns {boolean} - True if it's a React component
 */
export const isReactComponent = (value) => {
  return typeof value === "function";
};

export default cx;
