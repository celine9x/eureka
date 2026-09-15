"use client";

import { useState } from "react";
import { Avatar } from "../atoms/avatar.jsx";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";
import { TextInput } from "./text-input.jsx";

export const DEFAULT_COMMENT_THREAD = [
  {
    id: "comment-1",
    author: "Linh Nguyen",
    initials: "LN",
    timestamp: "6 days ago",
    content: "Can we add this mini infobox please Shreejala Tuladhar",
  },
  {
    id: "comment-2",
    author: "Shreejala Tuladhar",
    initials: "ST",
    timestamp: "5 hours ago",
    content: "Pragya Gyawali",
  },
];

const styles = {
  popover: {
    position: "absolute",
    top: "calc(100% + var(--spacing-sm))",
    right: 0,
    zIndex: 10,
    width: 320,
    maxWidth: "calc(100vw - var(--spacing-6))",
    padding: "var(--spacing-md)",
    boxSizing: "border-box",
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-sm)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    boxShadow: "var(--shadow-dark-down)",
  },
  content: { display: "flex", flexDirection: "column", gap: "var(--spacing-md)" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-2)" },
  title: {
    margin: 0,
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-highlight-lg)",
    fontWeight: "var(--font-weight-highlight-lg)",
    lineHeight: "var(--line-height-highlight-lg)",
  },
  actions: { display: "inline-flex", alignItems: "center", gap: "var(--spacing-xs)" },
  thread: { display: "flex", flexDirection: "column", gap: "var(--spacing-md)" },
  comment: { display: "flex", alignItems: "flex-start", gap: "var(--spacing-sm)" },
  commentBody: { display: "flex", flexDirection: "column", gap: "var(--spacing-xs)", minWidth: 0 },
  commentMeta: { display: "inline-flex", alignItems: "baseline", flexWrap: "wrap", gap: "var(--spacing-xs)" },
  commentAuthor: {
    color: "var(--color-content-primary)", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", fontWeight: "var(--font-weight-semibold)", lineHeight: "var(--line-height-body-md)",
  },
  commentTime: { color: "var(--color-content-secondary)", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", lineHeight: "var(--line-height-body-md)" },
  commentText: { margin: 0, color: "var(--color-content-primary)", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", lineHeight: "var(--line-height-body-md)" },
  reply: { display: "flex", alignItems: "center", gap: "var(--spacing-sm)" },
  replyInput: { flex: 1 },
};

export const CommentPopover = ({
  open = false,
  onClose,
  comments = DEFAULT_COMMENT_THREAD,
  onSubmit,
  onMore,
  onResolve,
  replyInitials = "LN",
  title = "Comment",
}) => {
  const [reply, setReply] = useState("");

  const handleSubmit = () => {
    const value = reply.trim();
    if (!value) return;
    onSubmit?.(value);
    setReply("");
  };

  if (!open) return null;

  return (
    <div role="dialog" aria-label={title} style={styles.popover}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h2 style={styles.title}>{title}</h2>
          <div style={styles.actions}>
            <Button variant="tertiary" size="md" iconOnly aria-label="More comment actions" iconLeading={<Icon name="EllipsisVertical" size="sm" />} onClick={onMore} />
            <Button variant="tertiary" size="md" iconOnly aria-label="Resolve comment" iconLeading={<Icon name="CheckCircle" size="sm" />} onClick={onResolve} />
            <Button variant="tertiary" size="md" iconOnly aria-label="Close comments" iconLeading={<Icon name="XMark" size="sm" />} onClick={onClose} />
          </div>
        </div>
        <div style={styles.thread}>
          {comments.map((comment) => (
            <div key={comment.id} style={styles.comment}>
              <Avatar initials={comment.initials} size="xs" />
              <div style={styles.commentBody}>
                <div style={styles.commentMeta}>
                  <span style={styles.commentAuthor}>{comment.author}</span>
                  <span style={styles.commentTime}>{comment.timestamp}</span>
                </div>
                <p style={styles.commentText}>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={styles.reply}>
          <Avatar initials={replyInitials} size="xs" />
          <TextInput aria-label="Reply to comment" placeholder="Reply" value={reply} onChange={(event) => setReply(event.target.value)} onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleSubmit();
            }
          }} style={styles.replyInput} />
          <Button variant="primary" size="md" onClick={handleSubmit} isDisabled={!reply.trim()}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

CommentPopover.displayName = "CommentPopover";
export default CommentPopover;