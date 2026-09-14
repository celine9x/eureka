"use client";

import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";

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

export const RICH_TEXT_TOOLBAR_ACTIONS = {
	bold: "bold",
	italic: "italic",
	underline: "underline",
	numberList: "numberList",
	bulletList: "bulletList",
	table: "table",
	mention: "mention",
	photo: "photo",
	attachment: "attachment",
};

const TOOLBAR_ITEMS = [
	{ key: RICH_TEXT_TOOLBAR_ACTIONS.bold, label: "Bold", icon: <BoldIcon /> },
	{ key: RICH_TEXT_TOOLBAR_ACTIONS.italic, label: "Italic", icon: <ItalicIcon /> },
	{ key: RICH_TEXT_TOOLBAR_ACTIONS.underline, label: "Underline", icon: <UnderlineIcon /> },
	{ key: RICH_TEXT_TOOLBAR_ACTIONS.numberList, label: "Numbered list", icon: <Icon name="NumberedList" size="sm" /> },
	{ key: RICH_TEXT_TOOLBAR_ACTIONS.bulletList, label: "Bullet list", icon: <Icon name="ListBullet" size="sm" /> },
	{ key: RICH_TEXT_TOOLBAR_ACTIONS.table, label: "Insert table", icon: <Icon name="TableCells" size="sm" /> },
	{ key: RICH_TEXT_TOOLBAR_ACTIONS.mention, label: "Mention", icon: <Icon name="AtSymbol" size="sm" /> },
	{ key: RICH_TEXT_TOOLBAR_ACTIONS.photo, label: "Insert photo", icon: <Icon name="Photo" size="sm" /> },
	{ key: RICH_TEXT_TOOLBAR_ACTIONS.attachment, label: "Attach file", icon: <Icon name="PaperClip" size="sm" /> },
];

const TOOLBAR_ITEM_MAP = new Map(TOOLBAR_ITEMS.map((item) => [item.key, item]));

const styles = {
	toolbar: {
		display: "inline-flex",
		alignItems: "center",
		gap: "var(--spacing-xs)",
		padding: "var(--spacing-sm)",
		background: "var(--color-general-neutral-light)",
		borderRadius: "var(--radius-md)",
		outlineWidth: "1px",
		outlineStyle: "solid",
		outlineColor: "var(--color-action-outline-secondary-enabled)",
		outlineOffset: "-1px",
		boxSizing: "border-box",
		flexWrap: "wrap",
	},
	toolbarButton: {
		outline: "none",
		outlineWidth: 0,
		outlineStyle: "none",
		outlineColor: "transparent",
		boxShadow: "none",
	},
	toolbarButtonActive: {
		background: "var(--color-general-informative)",
		color: "var(--color-content-brand)",
		outline: "none",
		outlineWidth: 0,
		outlineStyle: "none",
		outlineColor: "transparent",
		boxShadow: "none",
	},
};

export const RichTextToolbars = ({ actions, activeActions = [], onAction, style, ...props }) => {
	const activeSet = new Set(activeActions);
	const resolvedItems = (actions && actions.length > 0
		? actions.map((actionKey) => TOOLBAR_ITEM_MAP.get(actionKey)).filter(Boolean)
		: TOOLBAR_ITEMS);

	return (
		<div style={{ ...styles.toolbar, ...style }} role="toolbar" aria-label="Rich text formatting" {...props}>
			{resolvedItems.map((item) => {
				const isActive = activeSet.has(item.key);

				return (
					<Button
						key={item.key}
						variant="tertiary"
						size="md"
						iconOnly
						aria-label={item.label}
						iconLeading={item.icon}
						onClick={() => onAction?.(item.key)}
						style={isActive ? styles.toolbarButtonActive : styles.toolbarButton}
					/>
				);
			})}
		</div>
	);
};

RichTextToolbars.displayName = "RichTextToolbars";
RichTextToolbars.actions = RICH_TEXT_TOOLBAR_ACTIONS;

export default RichTextToolbars;