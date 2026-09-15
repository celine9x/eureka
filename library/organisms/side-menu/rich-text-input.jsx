"use client";

import { useMemo, useState } from "react";
import { Button } from "../../atoms/button.jsx";
import { Icon } from "../../atoms/icon.jsx";
import {
	RichTextToolbars,
	RICH_TEXT_TOOLBAR_ACTIONS,
} from "../../molecules/rich-text-toolbars.jsx";

export const SIDE_MENU_RICH_TEXT_STATES = {
	enabled: "enabled",
	active: "active",
};

const TOOLBAR_GROUPS = {
	formatting: [
		RICH_TEXT_TOOLBAR_ACTIONS.bold,
		RICH_TEXT_TOOLBAR_ACTIONS.italic,
		RICH_TEXT_TOOLBAR_ACTIONS.underline,
	],
	lists: [
		RICH_TEXT_TOOLBAR_ACTIONS.numberList,
		RICH_TEXT_TOOLBAR_ACTIONS.bulletList,
	],
	insert: [
		RICH_TEXT_TOOLBAR_ACTIONS.mention,
		RICH_TEXT_TOOLBAR_ACTIONS.photo,
		RICH_TEXT_TOOLBAR_ACTIONS.attachment,
	],
	table: [RICH_TEXT_TOOLBAR_ACTIONS.table],
};

const styles = {
	root: {
		width: "100%",
		background: "var(--color-general-white)",
		borderRadius: "var(--radius-md)",
		overflow: "hidden",
		outlineWidth: "1px",
		outlineStyle: "solid",
		outlineColor: "var(--color-interaction-outline-enabled)",
		outlineOffset: "-1px",
		transition: "outline-color var(--transition-fast)",
		display: "inline-flex",
		flexDirection: "column",
		alignItems: "stretch",
		gap: "var(--spacing-4)",
		boxSizing: "border-box",
	},
	toolbarSection: {
		padding: "var(--spacing-1) var(--spacing-4)",
		background: "var(--color-general-neutral-light)",
		borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
	},
	toolbarRow: {
		display: "inline-flex",
		alignItems: "center",
		gap: "var(--spacing-xs)",
		flexWrap: "wrap",
	},
	toolbarInline: {
		padding: 0,
		background: "transparent",
		borderRadius: 0,
		outline: "none",
		gap: "var(--spacing-xs)",
	},
	aiButton: {
		outline: "none",
		outlineWidth: 0,
		outlineStyle: "none",
		outlineColor: "transparent",
		boxShadow: "none",
	},
	toolbarDivider: {
		width: 1,
		height: 24,
		background: "var(--color-action-outline-secondary-enabled)",
	},
	contentSection: {
		alignSelf: "stretch",
		minHeight: 74,
		padding: "0 var(--spacing-4)",
		display: "inline-flex",
		alignItems: "flex-start",
		gap: "var(--spacing-sm)",
		boxSizing: "border-box",
	},
	textarea: {
		flex: "1 1 0",
		minHeight: 74,
		border: "none",
		outline: "none",
		resize: "none",
		background: "transparent",
		fontFamily: "var(--font-family-primary)",
		fontSize: "var(--text-body-lg)",
		fontWeight: "var(--font-weight-regular)",
		lineHeight: "var(--line-height-body-lg)",
		color: "var(--color-content-primary)",
	},
	textareaPlaceholder: {
		color: "var(--color-content-tertiary)",
	},
	footer: {
		alignSelf: "stretch",
		padding: "0 var(--spacing-4) var(--spacing-4)",
		display: "inline-flex",
		justifyContent: "flex-end",
		alignItems: "flex-start",
		gap: "var(--spacing-sm)",
		boxSizing: "border-box",
	},
};

const ToolbarGroup = ({ actions, activeActions, onAction }) => (
	<RichTextToolbars
		actions={actions}
		activeActions={activeActions}
		onAction={onAction}
		style={styles.toolbarInline}
	/>
);

export const SideMenuRichTextInput = ({
	value,
	defaultValue = "",
	onChange,
	onSubmit,
	submitLabel = "Submit",
	state = SIDE_MENU_RICH_TEXT_STATES.enabled,
	filled,
	placeholder = "Write a comment",
	showSecondButton = false,
	secondButtonLabel = "Cancel",
	onSecondButtonClick,
	showBadgeAi = false,
	aiButtonLabel = "AI",
	onAiButtonClick,
	showTableIcons = false,
	activeActions = [],
	onToolbarAction,
	style,
	...props
}) => {
	const [internalValue, setInternalValue] = useState(defaultValue);
	const isControlled = value !== undefined;
	const currentValue = isControlled ? value : internalValue;

	const resolvedFilled = useMemo(() => {
		if (typeof filled === "boolean") return filled;
		return String(currentValue || "").trim().length > 0;
	}, [filled, currentValue]);

	const isActive = state === SIDE_MENU_RICH_TEXT_STATES.active || resolvedFilled;

	const handleValueChange = (event) => {
		if (!isControlled) {
			setInternalValue(event.target.value);
		}
		onChange?.(event.target.value, event);
	};

	return (
		<div
			data-filled={resolvedFilled ? "Yes" : "No"}
			data-show-2nd-button={String(showSecondButton)}
			data-show-badge-ai={String(showBadgeAi)}
			data-show-table-icons={String(showTableIcons)}
			data-state={isActive ? "Active" : "Enabled"}
			style={{
				...styles.root,
				...style,
			}}
			{...props}
		>
			<div style={styles.toolbarSection}>
				<div style={styles.toolbarRow}>
					<ToolbarGroup actions={TOOLBAR_GROUPS.formatting} activeActions={activeActions} onAction={onToolbarAction} />
					<span style={styles.toolbarDivider} />
					<ToolbarGroup actions={TOOLBAR_GROUPS.lists} activeActions={activeActions} onAction={onToolbarAction} />
					<span style={styles.toolbarDivider} />
					<ToolbarGroup actions={TOOLBAR_GROUPS.insert} activeActions={activeActions} onAction={onToolbarAction} />

					{showTableIcons && (
						<>
							<span style={styles.toolbarDivider} />
							<ToolbarGroup actions={TOOLBAR_GROUPS.table} activeActions={activeActions} onAction={onToolbarAction} />
						</>
					)}

					{showBadgeAi && (
						<Button
							variant="tertiary"
							size="md"
							iconLeading={<Icon name="Sparkles" size="sm" />}
							onClick={onAiButtonClick}
							style={styles.aiButton}
						>
							{aiButtonLabel}
						</Button>
					)}
				</div>
			</div>

			<div style={styles.contentSection}>
				<textarea
					value={currentValue}
					onChange={handleValueChange}
					placeholder={placeholder}
					style={{
						...styles.textarea,
						...(resolvedFilled ? null : styles.textareaPlaceholder),
					}}
				/>
			</div>

			<div style={styles.footer}>
				{showSecondButton && (
					<Button variant="secondary" size="md" onClick={onSecondButtonClick}>
						{secondButtonLabel}
					</Button>
				)}
				<Button variant="primary" size="md" onClick={() => onSubmit?.(currentValue)}>
					{submitLabel}
				</Button>
			</div>
		</div>
	);
};

SideMenuRichTextInput.displayName = "SideMenuRichTextInput";
SideMenuRichTextInput.states = SIDE_MENU_RICH_TEXT_STATES;

export default SideMenuRichTextInput;
