"use client";

/**
 * Attachment Molecule
 *
 * A file attachment row with metadata and optional action buttons.
 * Uses Button and Icon atoms with token-based styling.
 */

import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";

export const ATTACHMENT_VARIANTS = {
  row: "row",
  card: "card",
};

const getFileTypeFromName = (value = "") => {
  const parts = String(value).split(".");
  if (parts.length < 2) return "";
  return String(parts[parts.length - 1] || "").trim().toUpperCase();
};

const getFileTypeBadgeStyles = (fileType) => {
  if (fileType === "PDF") {
    return {
      background: "var(--color-content-negative)",
      color: "var(--color-general-white)",
    };
  }

  return {
    background: "var(--color-general-neutral-light)",
    color: "var(--color-content-secondary)",
  };
};

const styles = {
  root: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-4)",
    padding: "var(--spacing-sm) var(--spacing-4)",
    background: "var(--color-general-neutral-lighter)",
    borderLeft: "1px solid var(--color-action-outline-secondary-enabled)",
    borderRight: "1px solid var(--color-action-outline-secondary-enabled)",
    borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
    boxSizing: "border-box",
  },
  cardRoot: {
    width: "auto",
    maxWidth: 240,
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-4)",
    padding: "var(--spacing-4)",
    background: "var(--color-general-neutral-lighter)",
    borderRadius: "var(--radius-sm)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    boxSizing: "border-box",
    flexShrink: 0,
  },
  left: {
    flex: "1 1 0",
    minWidth: 0,
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
  },
  fileIcon: {
    width: 24,
    height: 24,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-secondary)",
    flexShrink: 0,
  },
  fileTypeBadge: {
    width: 24,
    height: 24,
    borderRadius: "var(--radius-xs)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-family-primary)",
    fontSize: 8,
    lineHeight: "var(--line-height-body-caption)",
    fontWeight: "var(--font-weight-bold)",
    textTransform: "uppercase",
    letterSpacing: 0.2,
    flexShrink: 0,
  },
  textWrap: {
    flex: "1 1 0",
    minWidth: 0,
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "var(--spacing-1)",
  },
  fileName: {
    width: "100%",
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-primary)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  metaRow: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
    minWidth: 0,
  },
  metaText: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-secondary)",
    whiteSpace: "nowrap",
  },
  dot: {
    width: 2,
    height: 2,
    borderRadius: "var(--radius-full)",
    background: "var(--color-content-secondary)",
    flexShrink: 0,
  },
  actions: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
    flexShrink: 0,
  },
};

export const Attachment = ({
  variant = ATTACHMENT_VARIANTS.row,
  fileName = "Name-Of-The-Attachment_010203.ext",
  owner = "Jane Doe",
  date = "Oct 21, 2022",
  fileIconName = "DocumentText",
  fileType,
  showFileTypeBadge,
  showMeta,
  actions,
  actionButtons,
  showDelete = true,
  showDownload = true,
  showMore = true,
  onDelete,
  onDownload,
  onMore,
  deleteAriaLabel = "Delete attachment",
  downloadAriaLabel = "Download attachment",
  moreAriaLabel = "Attachment options",
  style,
  ...props
}) => {
  const isCard = variant === ATTACHMENT_VARIANTS.card;
  const resolvedShowMeta = showMeta ?? !isCard;
  const resolvedFileType = String(fileType || getFileTypeFromName(fileName)).slice(0, 4);
  const resolvedShowFileTypeBadge = showFileTypeBadge ?? isCard;

  const resolvedActions = Array.isArray(actions) ? actions.filter(Boolean) : [];

  const resolvedActionButtons =
    Array.isArray(actionButtons) && actionButtons.length > 0
      ? actionButtons
      : [
          showDelete
            ? {
                key: "delete",
                iconName: "Trash",
                ariaLabel: deleteAriaLabel,
                onClick: onDelete,
              }
            : null,
          showDownload
            ? {
                key: "download",
                iconName: "ArrowDown",
                ariaLabel: downloadAriaLabel,
                onClick: onDownload,
              }
            : null,
          showMore
            ? {
                key: "more",
                iconName: "EllipsisVertical",
                ariaLabel: moreAriaLabel,
                onClick: onMore,
              }
            : null,
        ].filter(Boolean);

  return (
    <div style={{ ...(isCard ? styles.cardRoot : styles.root), ...style }} {...props}>
      <div style={styles.left}>
        {resolvedShowFileTypeBadge && resolvedFileType ? (
          <span style={{ ...styles.fileTypeBadge, ...getFileTypeBadgeStyles(resolvedFileType) }}>
            {resolvedFileType}
          </span>
        ) : (
          <span style={styles.fileIcon}>
            <Icon name={fileIconName} size="md" />
          </span>
        )}

        <div style={styles.textWrap}>
          <p style={styles.fileName}>{fileName}</p>

          {resolvedShowMeta ? (
            <div style={styles.metaRow}>
              <p style={styles.metaText}>{owner}</p>
              <span style={styles.dot} />
              <p style={styles.metaText}>{date}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div style={styles.actions}>
        {resolvedActions.length > 0
          ? resolvedActions.map((actionNode, index) => (
              <span
                key={`attachment-custom-action-${index}`}
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                {actionNode}
              </span>
            ))
          : resolvedActionButtons.map((action, index) => {
          if (!action || action.hidden) return null;

          const {
            key,
            icon,
            iconName,
            ariaLabel,
            onClick,
            children,
            buttonProps,
            iconProps,
            ...actionProps
          } = action;

          const hasLabel = typeof children === "string" ? children.trim().length > 0 : Boolean(children);

          return (
            <Button
              key={key || `attachment-action-${index}`}
              variant="secondary"
              size="sm"
              iconOnly={!hasLabel}
              ariaLabel={ariaLabel}
              iconLeading={
                icon || (iconName ? <Icon name={iconName} size="sm" {...(iconProps || {})} /> : undefined)
              }
              onClick={onClick}
              {...(buttonProps || {})}
              {...actionProps}
            >
              {children}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

Attachment.displayName = "Attachment";

export default Attachment;
