/**
 * Avatar Component
 *
 * A circular avatar displaying initials or an image.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <Avatar initials="JD" size="lg" />
 * <Avatar name="John Doe" size="md" />
 * <Avatar src="/path/to/image.jpg" alt="John Doe" size="xl" />
 */

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const AVATAR_SIZES = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  base: {
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    borderRadius: "var(--radius-full)",
    boxSizing: "border-box",
  },

  initials: {
    background: "var(--color-general-informative)",
    outline: "1px solid var(--color-general-white)",
    outlineOffset: "-1px",
  },

  image: {
    overflow: "hidden",
  },

  imageElement: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "var(--radius-full)",
    border: "1px solid var(--color-general-white)",
  },

  initialsText: {
    textAlign: "center",
    color: "var(--color-content-brand)",
    fontFamily: "var(--font-family-primary)",
    fontWeight: 700,
    textTransform: "uppercase",
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  sizes: {
    xs: {
      base: { width: 16, height: 16 },
      initials: { outlineWidth: 0.5, outlineOffset: -0.5 },
      text: { fontSize: "0.5rem", lineHeight: "0.75rem" },
    },
    sm: {
      base: { width: 20, height: 20 },
      initials: { outlineWidth: 0.5, outlineOffset: -0.5 },
      text: { fontSize: "0.5rem", lineHeight: "0.75rem" },
    },
    md: {
      base: { width: 24, height: 24 },
      initials: { outlineWidth: 0.625, outlineOffset: -0.625 },
      text: { fontSize: "0.625rem", lineHeight: "0.9375rem" },
    },
    lg: {
      base: { width: 28, height: 28 },
      initials: { outlineWidth: 0.75, outlineOffset: -0.75 },
      text: { fontSize: "0.75rem", lineHeight: "1.125rem" },
    },
    xl: {
      base: { width: 32, height: 32 },
      initials: { outlineWidth: 1, outlineOffset: -1 },
      text: { fontSize: "1rem", lineHeight: "1.5rem" },
    },
  },
};

// ─────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────

/**
 * Generate initials from a name
 * @param {string} name - Full name
 * @returns {string} - 1-2 character initials
 */
export const getInitials = (name) => {
  if (!name) return "";

  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

/**
 * Avatar
 *
 * @param {string} size - xs | sm | md | lg | xl (default: md)
 * @param {string} src - Image URL (renders as image if provided)
 * @param {string} alt - Alt text for image
 * @param {string} initials - 1-2 character initials (overrides name)
 * @param {string} name - Full name to generate initials from
 * @param {object} style - Additional inline styles
 */
export const Avatar = ({
  size = AVATAR_SIZES.md,
  src,
  alt = "",
  initials,
  name,
  style,
  ...props
}) => {
  const isImage = !!src;
  const displayInitials = initials || (name ? getInitials(name) : "");
  const sizeStyles = styles.sizes[size];

  // Compose base styles
  const avatarStyle = {
    ...styles.base,
    ...sizeStyles.base,
    ...(isImage ? styles.image : styles.initials),
    ...style,
  };

  // Text styles
  const textStyle = {
    ...styles.initialsText,
    ...sizeStyles.text,
  };

  if (isImage) {
    return (
      <div style={avatarStyle} {...props}>
        <img src={src} alt={alt || name || "Avatar"} style={styles.imageElement} />
      </div>
    );
  }

  return (
    <div style={avatarStyle} {...props}>
      <span style={textStyle}>{displayInitials}</span>
    </div>
  );
};

Avatar.displayName = "Avatar";
Avatar.sizes = AVATAR_SIZES;

export default Avatar;
