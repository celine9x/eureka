/**
 * Icon Component
 *
 * A unified icon library wrapping Heroicons.
 * Uses inline styles with CSS variables from tokens.css for consistent sizing.
 *
 * @example
 * <Icon name="ChevronRight" />
 * <Icon name="Check" variant="solid" size="lg" />
 * <Icon name="Plus" size={24} />
 */

import * as HeroiconsOutline from "@heroicons/react/24/outline";
import * as HeroiconsSolid from "@heroicons/react/24/solid";
import * as HeroiconsMini from "@heroicons/react/20/solid";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const ICON_SIZES = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "2xl": "2xl",
};

export const ICON_VARIANTS = {
  outline: "outline",
  solid: "solid",
  mini: "mini",
};

/** Size to token mapping */
const SIZE_MAP = {
  xs: "var(--size-icon-xs)",
  sm: "var(--size-icon-sm)",
  md: "var(--size-icon-md)",
  lg: "var(--size-icon-lg)",
  xl: "var(--size-icon-xl)",
  "2xl": 32,
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

/** Icon */
export const Icon = ({
  name,
  variant = ICON_VARIANTS.outline,
  size = ICON_SIZES.md,
  color,
  style = {},
  ...props
}) => {
  // Determine icon set based on variant
  let iconSet;
  switch (variant) {
    case "solid":
      iconSet = HeroiconsSolid;
      break;
    case "mini":
      iconSet = HeroiconsMini;
      break;
    case "outline":
    default:
      iconSet = HeroiconsOutline;
  }

  // Convert name to PascalCase with "Icon" suffix if needed
  const iconName = name.endsWith("Icon") ? name : `${name}Icon`;
  const IconComponent = iconSet[iconName];

  if (!IconComponent) {
    console.warn(`Heroicon "${name}" not found in ${variant} variant`);
    return null;
  }

  // Calculate pixel size
  const resolvedSize = typeof size === "number" ? size : SIZE_MAP[size] || "var(--size-icon-md)";

  const iconStyle = {
    ...styles.base,
    width: resolvedSize,
    height: resolvedSize,
    color: color || "currentColor",
    ...style,
  };

  return <IconComponent style={iconStyle} {...props} />;
};

Icon.displayName = "Icon";
Icon.sizes = ICON_SIZES;
Icon.variants = ICON_VARIANTS;

// ─────────────────────────────────────────────
// DIRECT EXPORTS FOR ICON SETS
// ─────────────────────────────────────────────

export { HeroiconsOutline, HeroiconsSolid, HeroiconsMini };

// ─────────────────────────────────────────────
// CONVENIENCE WRAPPER COMPONENTS
// ─────────────────────────────────────────────

export const ChevronRight = (props) => <Icon name="ChevronRight" {...props} />;
export const ChevronLeft = (props) => <Icon name="ChevronLeft" {...props} />;
export const ChevronDown = (props) => <Icon name="ChevronDown" {...props} />;
export const ChevronUp = (props) => <Icon name="ChevronUp" {...props} />;
export const Check = (props) => <Icon name="Check" {...props} />;
export const Plus = (props) => <Icon name="Plus" {...props} />;
export const Minus = (props) => <Icon name="Minus" {...props} />;
export const XMark = (props) => <Icon name="XMark" {...props} />;
export const ArrowLeft = (props) => <Icon name="ArrowLeft" {...props} />;
export const ArrowRight = (props) => <Icon name="ArrowRight" {...props} />;
export const MagnifyingGlass = (props) => <Icon name="MagnifyingGlass" {...props} />;
export const Trash = (props) => <Icon name="Trash" {...props} />;
export const PencilSquare = (props) => <Icon name="PencilSquare" {...props} />;
export const EllipsisVertical = (props) => <Icon name="EllipsisVertical" {...props} />;
export const InformationCircle = (props) => <Icon name="InformationCircle" {...props} />;
export const ExclamationTriangle = (props) => <Icon name="ExclamationTriangle" {...props} />;
export const CheckCircle = (props) => <Icon name="CheckCircle" {...props} />;
export const XCircle = (props) => <Icon name="XCircle" {...props} />;

export default Icon;
