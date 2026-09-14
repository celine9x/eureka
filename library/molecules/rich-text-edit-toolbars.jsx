"use client";

import { useMemo, useState } from "react";

export const RICH_TEXT_EDIT_TOOLBAR_ACTIONS = {
  bold: "bold",
  italic: "italic",
  underline: "underline",
  bulletList: "bulletList",
  numberList: "numberList",
  alignLeft: "alignLeft",
  alignCenter: "alignCenter",
  alignRight: "alignRight",
  link: "link",
  undo: "undo",
  redo: "redo",
};

const BoldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M4 2h5a3 3 0 012.24 5A3 3 0 019.5 14H4V2zm2 5h3a1 1 0 000-2H6v2zm0 2v3h3.5a1.5 1.5 0 000-3H6z" />
  </svg>
);

const ItalicIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M6 2h6v2h-2l-2 8h2v2H4v-2h2l2-8H6V2z" />
  </svg>
);

const UnderlineIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M3 14v-1h10v1H3zm2-3V2h2v9a1 1 0 102 0V2h2v9a3 3 0 01-6 0z" />
  </svg>
);

const BulletListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M2 4a1 1 0 112 0 1 1 0 01-2 0zm4-1h8v2H6V3zm-4 5a1 1 0 112 0 1 1 0 01-2 0zm4-1h8v2H6V7zm-4 5a1 1 0 112 0 1 1 0 01-2 0zm4-1h8v2H6v-2z" />
  </svg>
);

const NumberListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M2 2h2v4H3V3H2V2zm4 1h8v2H6V3zM2 8h2l-1.5 2H4v1H2v-1l1.5-2H2V8zm4 0h8v2H6V8zM3 14v-1H2v-1h2v3H2v-1h1zm3-1h8v2H6v-2z" />
  </svg>
);

const AlignLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M1 2h14v2H1V2zm0 4h10v2H1V6zm0 4h14v2H1v-2zm0 4h10v2H1v-2z" />
  </svg>
);

const AlignCenterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M1 2h14v2H1V2zm2 4h10v2H3V6zM1 10h14v2H1v-2zm2 4h10v2H3v-2z" />
  </svg>
);

const AlignRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M1 2h14v2H1V2zm4 4h10v2H5V6zM1 10h14v2H1v-2zm4 4h10v2H5v-2z" />
  </svg>
);

const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M6.5 9.5a1 1 0 010-1.41l3-3a3 3 0 114.24 4.24l-1 1a1 1 0 01-1.42-1.42l1-1a1 1 0 10-1.41-1.41l-3 3a1 1 0 01-1.41 0zm3-3a1 1 0 010 1.41l-3 3a3 3 0 11-4.24-4.24l1-1a1 1 0 011.42 1.42l-1 1a1 1 0 001.41 1.41l3-3a1 1 0 011.41 0z" />
  </svg>
);

const UndoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M3.41 6H10a4 4 0 110 8H8v-2h2a2 2 0 000-4H3.41l1.3 1.29-1.42 1.42L0 7.41l3.29-3.29 1.42 1.42L3.41 6z" />
  </svg>
);

const RedoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M12.59 6H6a4 4 0 100 8h2v-2H6a2 2 0 010-4h6.59l-1.3 1.29 1.42 1.42L16 7.41l-3.29-3.29-1.42 1.42L12.59 6z" />
  </svg>
);

const DEFAULT_TOOLBAR_GROUPS = [
  {
    id: "text-style",
    buttons: [
      { format: RICH_TEXT_EDIT_TOOLBAR_ACTIONS.bold, icon: BoldIcon, title: "Bold" },
      { format: RICH_TEXT_EDIT_TOOLBAR_ACTIONS.italic, icon: ItalicIcon, title: "Italic" },
      { format: RICH_TEXT_EDIT_TOOLBAR_ACTIONS.underline, icon: UnderlineIcon, title: "Underline" },
    ],
  },
  {
    id: "lists",
    buttons: [
      { format: RICH_TEXT_EDIT_TOOLBAR_ACTIONS.bulletList, icon: BulletListIcon, title: "Bullet list" },
      { format: RICH_TEXT_EDIT_TOOLBAR_ACTIONS.numberList, icon: NumberListIcon, title: "Numbered list" },
    ],
  },
  {
    id: "alignment",
    buttons: [
      { format: RICH_TEXT_EDIT_TOOLBAR_ACTIONS.alignLeft, icon: AlignLeftIcon, title: "Align left" },
      { format: RICH_TEXT_EDIT_TOOLBAR_ACTIONS.alignCenter, icon: AlignCenterIcon, title: "Align center" },
      { format: RICH_TEXT_EDIT_TOOLBAR_ACTIONS.alignRight, icon: AlignRightIcon, title: "Align right" },
    ],
  },
  {
    id: "link",
    buttons: [{ format: RICH_TEXT_EDIT_TOOLBAR_ACTIONS.link, icon: LinkIcon, title: "Insert link" }],
  },
  {
    id: "history",
    buttons: [
      { format: RICH_TEXT_EDIT_TOOLBAR_ACTIONS.undo, icon: UndoIcon, title: "Undo" },
      { format: RICH_TEXT_EDIT_TOOLBAR_ACTIONS.redo, icon: RedoIcon, title: "Redo" },
    ],
  },
];

const styles = {
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-1)",
    padding: "var(--spacing-1) var(--spacing-4)",
    background: "var(--color-general-neutral-light)",
    borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
  },
  toolbarGroup: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-1)",
  },
  divider: {
    width: 1,
    height: 24,
    background: "var(--color-action-outline-secondary-enabled)",
    margin: "0 var(--spacing-1)",
  },
  toolbarBtn: {
    width: 32,
    height: 32,
    padding: 8,
    background: "transparent",
    border: "none",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-secondary)",
    transition: "all var(--transition-fast)",
  },
  toolbarBtnHover: {
    background: "var(--color-action-fill-tertiary-hover)",
    color: "var(--color-action-content-tertiary-hover)",
  },
  toolbarBtnActive: {
    background: "var(--color-action-fill-tertiary-active)",
    color: "var(--color-action-content-tertiary-active)",
  },
  toolbarBtnDisabled: {
    color: "var(--color-content-tertiary)",
    cursor: "not-allowed",
  },
};

const ToolbarButton = ({ icon: IconComponent, active = false, disabled = false, onClick, title }) => {
  const [isHovered, setIsHovered] = useState(false);

  const btnStyle = {
    ...styles.toolbarBtn,
    ...(isHovered && !disabled && !active && styles.toolbarBtnHover),
    ...(active && styles.toolbarBtnActive),
    ...(disabled && styles.toolbarBtnDisabled),
  };

  return (
    <button
      type="button"
      style={btnStyle}
      disabled={disabled}
      onClick={onClick}
      title={title}
      aria-label={title}
      aria-pressed={active}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconComponent />
    </button>
  );
};

export const RichTextEditToolbars = ({
  groups = DEFAULT_TOOLBAR_GROUPS,
  visibleActions,
  activeFormats = {},
  disabled = false,
  onAction,
  style,
  ...props
}) => {
  const filteredGroups = useMemo(() => {
    if (!Array.isArray(visibleActions) || visibleActions.length === 0) {
      return groups;
    }

    const actionSet = new Set(visibleActions);
    return groups
      .map((group) => ({
        ...group,
        buttons: group.buttons.filter((btn) => actionSet.has(btn.format)),
      }))
      .filter((group) => group.buttons.length > 0);
  }, [groups, visibleActions]);

  return (
    <div style={{ ...styles.toolbar, ...style }} role="toolbar" aria-label="Rich text formatting" {...props}>
      {filteredGroups.map((group, groupIndex) => (
        <div key={group.id} style={{ display: "contents" }}>
          {groupIndex > 0 && <div style={styles.divider} />}
          <div style={styles.toolbarGroup}>
            {group.buttons.map((btn) => (
              <ToolbarButton
                key={btn.format}
                icon={btn.icon}
                title={btn.title}
                active={Boolean(activeFormats?.[btn.format])}
                disabled={disabled}
                onClick={() => onAction?.(btn.format)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

RichTextEditToolbars.displayName = "RichTextEditToolbars";
RichTextEditToolbars.actions = RICH_TEXT_EDIT_TOOLBAR_ACTIONS;

export default RichTextEditToolbars;
