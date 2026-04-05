/**
 * Eureka Design System - Utilities
 *
 * Shared utilities for components.
 */

// Style utilities
export { createStyleInjector, cx, joinStyles } from "./styles.js";

// Prop constants
export {
  // Sizes
  SIZES,
  ICON_SIZES,
  AVATAR_SIZES,
  MODAL_SIZES,
  // Variants
  BUTTON_VARIANTS,
  BADGE_VARIANTS,
  CHIP_VARIANTS,
  DIALOG_VARIANTS,
  // States
  INPUT_STATES,
  STEP_STATES,
  // Layout
  ORIENTATIONS,
  PLACEMENTS,
  BADGE_SHAPES,
  // Helpers
  getSizeClass,
  getVariantClass,
} from "./props.js";

// Portal and focus management
export { Portal, useFocusTrap, useScrollLock } from "./portal.jsx";

// Preview/Demo utilities
export { PreviewComponent } from "./preview-component.jsx";

// Table system filter utilities
export {
  TABLE_FILTER_OPERATORS,
  buildTableQuery,
  applyTableSystemFilters,
  mapRecordsToTableRows,
  tableCellMappers,
} from "./table-system-filter.js";
