"use client";

import { useState } from "react";
import { Accordion } from "../molecules/accordion.jsx";
import { ExpandableText } from "../molecules/expandable-text.jsx";
import { RichTextInput } from "../molecules/rich-text-input.jsx";
import { Icon } from "../atoms/icon.jsx";
import { Button } from "../atoms/button.jsx";
import { ButtonBadge } from "../atoms/button-badge.jsx";
import { Avatar } from "../atoms/avatar.jsx";

/* ===========================================
   DESCRIPTION CARD STYLES
   =========================================== */

const descriptionCardStyles = {
  container: {
    padding: "var(--spacing-lg)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-md)",
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--color-action-outline-secondary-enabled)",
  },
  title: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-heading-h2)",
    fontWeight: "var(--font-weight-semibold)",
    lineHeight: "var(--line-height-heading-h2)",
    color: "var(--color-content-primary)",
  },
  timestamp: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    color: "var(--color-content-secondary)",
  },
  authorName: {
    color: "var(--color-content-primary)",
  },
};

/* ===========================================
   DESCRIPTION CARD COMPONENT
   =========================================== */

/**
 * DescriptionCard
 *
 * A card component for displaying and editing descriptions with author attribution.
 *
 * @example
 * <DescriptionCard
 *   authorName="Emma Dupont"
 *   authorInitials="ED"
 *   timestamp="Last edited Feb 20, 2024"
 *   value="This is the description content..."
 *   onChange={(value) => console.log(value)}
 * />
 */
export const DescriptionCard = ({
  title = "Description",
  authorName,
  authorInitials,
  authorAvatarSrc,
  timestamp = "Last edited",
  value = "",
  onChange,
  onSubmit,
  placeholder = "Add description",
  readOnly = false,
  disabled = false,
  style,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value);

  const isControlled = onChange !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (newValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const showTimestamp = authorName || timestamp;

  return (
    <div style={{ ...descriptionCardStyles.container, ...style }} {...props}>
      <h2 style={descriptionCardStyles.title}>{title}</h2>

      {showTimestamp && (
        <div style={descriptionCardStyles.timestamp}>
          <span>{timestamp}</span>
          {authorName && (
            <>
              <span>by</span>
              <Avatar
                size="xs"
                name={authorName}
                initials={authorInitials}
                src={authorAvatarSrc}
              />
              <span style={descriptionCardStyles.authorName}>{authorName}</span>
            </>
          )}
        </div>
      )}

      <RichTextInput
        placeholder={placeholder}
        value={currentValue}
        onChange={handleChange}
        onSubmit={onSubmit}
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
};

DescriptionCard.displayName = "DescriptionCard";

/* ===========================================
   STATUS UPDATE STYLES
   =========================================== */

const styles = {
    actions: {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--spacing-sm)",
    },
    body: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-4)",
    },
    metaRow: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "var(--spacing-4)",
    },
    metaItem: {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--spacing-xs)",
        color: "var(--color-content-secondary)",
        fontFamily: "var(--font-family-primary)",
        fontSize: "var(--text-body-md)",
        lineHeight: "var(--line-height-body-md)",
    },
    statusIconWrap: {
        width: 16,
        height: 16,
        borderRadius: "var(--radius-full)",
        background: "var(--color-status-positive, #2e9b4a)",
        color: "var(--color-content-inverted)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
    },
    section: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-xs)",
    },
    sectionLabel: {
        color: "var(--color-content-secondary)",
        fontFamily: "var(--font-family-primary)",
        fontSize: "var(--text-body-md)",
        lineHeight: "var(--line-height-body-md)",
        fontWeight: "var(--font-weight-regular)",
    },
};

export const StatusUpdate = ({
    title = "Status update",
    dateLabel = "Sep 8, 2026",
    authorName = "Linh Nguyen",
    authorInitials = "LN",
    statusLabel = "On track",
    nextStepsContent = "Align stakeholder feedback, finalize timeline, and confirm legal sign-off milestones before Monday.",
    updatesContent = "Completed clause review and validated dependencies across diligence workstreams. No critical blockers were identified.",
    badgeCount = "12",
    defaultExpanded = true,
    onAddNewClick,
    onBadgeClick,
    onMoreClick,
    onToggle,
    style,
    ...props
}) => {
    return (
        <Accordion
            title={title}
            expanded
            collapsible={false}
            showChevron={false}
            defaultExpanded={defaultExpanded}
            onToggle={onToggle}
            action={
                <div style={styles.actions}>
                    <Button variant="secondary" size="md" iconLeading={<Icon name="Plus" size="sm" />} onClick={onAddNewClick}>
                        Add new
                    </Button>
                    <ButtonBadge iconName="Clock" badgeLabel={badgeCount} onClick={onBadgeClick} />
                    <Button
                        variant="secondary"
                        size="md"
                        iconOnly
                        aria-label="More actions"
                        iconLeading={<Icon name="EllipsisVertical" size="sm" />}
                        onClick={onMoreClick}
                    />
                </div>
            }
            style={style}
            {...props}
        >
            <div style={styles.body}>
                <div style={styles.metaRow}>
                    <span style={styles.metaItem}>
                        <Icon name="Calendar" size="sm" />
                        {dateLabel}
                    </span>

                    <span style={styles.metaItem}>
                        <Avatar initials={authorInitials} name={authorName} size="xs" />
                        {authorName}
                    </span>

                    <span style={styles.metaItem}>
                        <span style={styles.statusIconWrap}>
                            <Icon name="Check" size="sm" />
                        </span>
                        {statusLabel}
                    </span>
                </div>

                <div style={styles.section}>
                    <span style={styles.sectionLabel}>Next steps</span>
                    <ExpandableText variant="md" content={nextStepsContent} />
                </div>

                <div style={styles.section}>
                    <span style={styles.sectionLabel}>Updates</span>
                    <ExpandableText variant="md" content={updatesContent} />
                </div>
            </div>
        </Accordion>
    );
};

StatusUpdate.displayName = "StatusUpdate";

export default DescriptionCard;

