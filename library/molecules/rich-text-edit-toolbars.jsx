"use client";

import { useMemo, useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  BarsArrowDownIcon,
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  ListBulletIcon,
  NumberedListIcon,
  QueueListIcon,
  UnderlineIcon,
} from "@heroicons/react/24/outline";

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

const AlignLeftIcon = QueueListIcon;
const AlignCenterIcon = AdjustmentsHorizontalIcon;
const AlignRightIcon = BarsArrowDownIcon;
const UndoIcon = ArrowUturnLeftIcon;
const RedoIcon = ArrowUturnRightIcon;

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
      { format: RICH_TEXT_EDIT_TOOLBAR_ACTIONS.bulletList, icon: ListBulletIcon, title: "Bullet list" },
      { format: RICH_TEXT_EDIT_TOOLBAR_ACTIONS.numberList, icon: NumberedListIcon, title: "Numbered list" },
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
  toolbarLeft: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-1)",
    minWidth: 0,
  },
  toolbarRight: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    flexShrink: 0,
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
  rightActions,
  showRightActions = true,
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
      <div style={styles.toolbarLeft}>
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
      {showRightActions && rightActions && <div style={styles.toolbarRight}>{rightActions}</div>}
    </div>
  );
};

RichTextEditToolbars.displayName = "RichTextEditToolbars";
RichTextEditToolbars.actions = RICH_TEXT_EDIT_TOOLBAR_ACTIONS;

export default RichTextEditToolbars;
