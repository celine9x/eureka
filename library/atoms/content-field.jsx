"use client";

import { Icon } from "./icon.jsx";
import { Chip } from "./chip.jsx";
import { Tooltip } from "./tooltip.jsx";

/* ===========================================
   STYLES
   =========================================== */

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "var(--spacing-xs)",
  },
  label: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    fontWeight: "var(--font-weight-regular)",
  },
  labelIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-secondary)",
    cursor: "help",
    flexShrink: 0,
  },
  contentText: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    lineHeight: "var(--line-height-body-lg)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-primary)",
  },
  contentChips: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "var(--spacing-xs)",
  },
};

/* ===========================================
   CONTENT FIELD COMPONENT
   =========================================== */

/**
 * ContentField
 *
 * A field component with a label and content that can be text or chips.
 * Label includes an info icon with tooltip showing the description.
 *
 * @example
 * // Text variant
 * <ContentField
 *   label="Owner"
 *   description="The person responsible for this item"
 *   value="Emma Dupont"
 * />
 *
 * @example
 * // Chip variant
 * <ContentField
 *   label="Tags"
 *   description="Categories assigned to this item"
 *   variant="chip"
 *   value={["Legal", "Finance", "Operations"]}
 * />
 */
export const ContentField = ({
  label,
  description,
  value,
  variant = "text",
  chipVariant = "neutral",
  style,
  className = "",
  ...props
}) => {
  const renderContent = () => {
    if (variant === "chip") {
      const chips = Array.isArray(value) ? value : [value];
      return (
        <div style={styles.contentChips}>
          {chips.map((chipValue, index) => (
            <Chip
              key={index}
              size="md"
              variant={chipVariant}
            >
              {chipValue}
            </Chip>
          ))}
        </div>
      );
    }

    // Default: text variant
    return <span style={styles.contentText}>{value}</span>;
  };

  return (
    <div
      style={{ ...styles.container, ...style }}
      className={className}
      {...props}
    >
      {label && (
        <div style={styles.label}>
          <span>{label}</span>
          {description && (
            <Tooltip content={description}>
              <span style={styles.labelIcon}>
                <Icon name="InformationCircle" variant="solid" size="sm" />
              </span>
            </Tooltip>
          )}
        </div>
      )}
      {renderContent()}
    </div>
  );
};

ContentField.displayName = "ContentField";

export default ContentField;
