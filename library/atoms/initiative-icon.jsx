/**
 * InitiativeIcon Component
 *
 * A compact square icon for initiatives with dynamic initials.
 * Uses token-mapped styles from tokens.css.
 *
 * @example
 * <InitiativeIcon name="New Initiative" />
 * <InitiativeIcon text="N" size="md" />
 */

export const INITIATIVE_ICON_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

const styles = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    background: "var(--color-content-informative)",
    borderRadius: "var(--radius-xs)",
    overflow: "hidden",
    boxSizing: "border-box",
    flexShrink: 0,
  },

  text: {
    width: "100%",
    textAlign: "center",
    color: "var(--color-content-inverted)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-overline)",
    lineHeight: "var(--line-height-body-overline)",
    fontWeight: "var(--font-weight-bold)",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  sizes: {
    sm: {
      width: "var(--size-avatar-sm)",
      height: "var(--size-avatar-sm)",
    },
    md: {
      width: "var(--size-avatar-md)",
      height: "var(--size-avatar-md)",
    },
    lg: {
      width: "var(--size-avatar-lg)",
      height: "var(--size-avatar-lg)",
    },
  },
};

export const getInitiativeInitials = (name = "", maxChars = 1) => {
  const clean = String(name).trim();
  if (!clean) return "N";

  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, maxChars).toUpperCase();
  }

  const initials = parts.map((part) => part[0]).join("");
  return initials.slice(0, maxChars).toUpperCase();
};

export const InitiativeIcon = ({
  name,
  text,
  maxChars = 1,
  size = INITIATIVE_ICON_SIZES.md,
  style,
  ...props
}) => {
  const displayText = (text || getInitiativeInitials(name, maxChars)).toUpperCase();

  const iconStyle = {
    ...styles.base,
    ...(styles.sizes[size] || styles.sizes.md),
    ...style,
  };

  return (
    <div style={iconStyle} aria-label={name ? `Initiative icon for ${name}` : "Initiative icon"} {...props}>
      <span style={styles.text}>{displayText}</span>
    </div>
  );
};

InitiativeIcon.displayName = "InitiativeIcon";
InitiativeIcon.sizes = INITIATIVE_ICON_SIZES;

export default InitiativeIcon;
