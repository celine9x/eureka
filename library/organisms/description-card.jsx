"use client";

import { Accordion } from "../molecules/accordion.jsx";
import { ExpandableText } from "../molecules/expandable-text.jsx";
import { Icon } from "../atoms/icon.jsx";
import { Button } from "../atoms/button.jsx";
import { ButtonBadge } from "../atoms/button-badge.jsx";
import { Avatar } from "../atoms/avatar.jsx";

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

export default StatusUpdate;

