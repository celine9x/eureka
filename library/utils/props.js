/**
 * Shared Prop Constants
 *
 * Centralized constants for component props to ensure consistency
 * and enable better autocomplete/documentation.
 */

// ─────────────────────────────────────────────
// SIZE CONSTANTS
// ─────────────────────────────────────────────

/** Standard size options used across components */
export const SIZES = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
};

/** Icon-specific sizes including 2xl */
export const ICON_SIZES = {
  ...SIZES,
  "2xl": "2xl",
};

// ─────────────────────────────────────────────
// BUTTON VARIANTS
// ─────────────────────────────────────────────

/** Button visual variants */
export const BUTTON_VARIANTS = {
  primary: "primary",
  secondary: "secondary",
  tertiary: "tertiary",
  negative: "negative",
  positive: "positive",
  link: "link",
};

// ─────────────────────────────────────────────
// INPUT STATES
// ─────────────────────────────────────────────

/** Input field states */
export const INPUT_STATES = {
  default: "default",
  error: "error",
  success: "success",
};

// ─────────────────────────────────────────────
// BADGE VARIANTS
// ─────────────────────────────────────────────

/** Badge visual variants */
export const BADGE_VARIANTS = {
  neutral: "neutral",
  primary: "primary",
  positive: "positive",
  negative: "negative",
  warning: "warning",
  informative: "informative",
};

/** Badge shapes */
export const BADGE_SHAPES = {
  rounded: "rounded",
  pill: "pill",
};

// ─────────────────────────────────────────────
// CHIP VARIANTS
// ─────────────────────────────────────────────

/** Chip visual variants */
export const CHIP_VARIANTS = {
  neutral: "neutral",
  primary: "primary",
  positive: "positive",
  negative: "negative",
  warning: "warning",
  blue: "blue",
  cyan: "cyan",
  pink: "pink",
  brown: "brown",
};

// ─────────────────────────────────────────────
// AVATAR VARIANTS
// ─────────────────────────────────────────────

/** Avatar size options */
export const AVATAR_SIZES = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
};

// ─────────────────────────────────────────────
// MODAL SIZES
// ─────────────────────────────────────────────

/** Modal width options */
export const MODAL_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  full: "full",
};

// ─────────────────────────────────────────────
// DIALOG VARIANTS
// ─────────────────────────────────────────────

/** Dialog intent variants */
export const DIALOG_VARIANTS = {
  info: "info",
  warning: "warning",
  error: "error",
  success: "success",
};

// ─────────────────────────────────────────────
// STEP STATES
// ─────────────────────────────────────────────

/** Step/Stepper states */
export const STEP_STATES = {
  pending: "pending",
  active: "active",
  completed: "completed",
};

// ─────────────────────────────────────────────
// ORIENTATION
// ─────────────────────────────────────────────

/** Layout orientation */
export const ORIENTATIONS = {
  horizontal: "horizontal",
  vertical: "vertical",
};

// ─────────────────────────────────────────────
// PLACEMENT
// ─────────────────────────────────────────────

/** Dropdown/Popover placement */
export const PLACEMENTS = {
  top: "top",
  topStart: "top-start",
  topEnd: "top-end",
  bottom: "bottom",
  bottomStart: "bottom-start",
  bottomEnd: "bottom-end",
  left: "left",
  leftStart: "left-start",
  leftEnd: "left-end",
  right: "right",
  rightStart: "right-start",
  rightEnd: "right-end",
};

// ─────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────

/**
 * Generates a size class with prefix.
 *
 * @param {string} prefix - Class prefix (e.g., "btn", "avatar")
 * @param {string} size - Size value
 * @returns {string} - Size class or empty string
 *
 * @example
 * getSizeClass("btn", "md") // => "btn-md"
 * getSizeClass("btn", undefined) // => ""
 */
export const getSizeClass = (prefix, size) => (size ? `${prefix}-${size}` : "");

/**
 * Generates a variant class with prefix.
 *
 * @param {string} prefix - Class prefix
 * @param {string} variant - Variant value
 * @returns {string} - Variant class or empty string
 */
export const getVariantClass = (prefix, variant) =>
  variant ? `${prefix}-${variant}` : "";
