/**
 * HubHeader Component (Organism)
 *
 * A flexible page-section header with multiple variants for list and detail views.
 * Composes: Button, Badge, TextInput, ButtonGroup atoms/molecules.
 * Uses design tokens from tokens.css.
 */

import React from "react";
import { Button } from "../atoms/button.jsx";
import { AiButton } from "../atoms/ai-button.jsx";
import { Badge } from "../atoms/badge.jsx";
import { Icon } from "../atoms/icon.jsx";
import { TextInput } from "../molecules/text-input.jsx";
import { Search } from "../molecules/search.jsx";
import { Tabs, Tab, TabPanel } from "../molecules/tabs.jsx";
import { ButtonGroup, ButtonGroupItem } from "../molecules/button-group.jsx";

/* ===========================================
   STYLE CONFIGURATION
   =========================================== */

const styles = {
  base: `
    .hub-header {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
      width: 100%;
      padding: var(--spacing-4) 0;
      background: var(--color-general-neutral-light);
      border-bottom: 1px solid var(--color-action-outline-secondary-enabled);
      box-sizing: border-box;
    }
    .hub-header--no-border {
      border-bottom: none;
    }
  `,

  row: `
    .hub-header__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-4);
      width: 100%;
    }
  `,

  left: `
    .hub-header__left {
      display: flex;
      align-items: center;
      gap: var(--spacing-4);
      flex: 1;
      min-width: 0;
    }
  `,

  right: `
    .hub-header__right {
      display: flex;
      align-items: center;
      gap: var(--spacing-4);
      flex-shrink: 0;
    }
    .hub-header__actions {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }
  `,

  title: `
    .hub-header__title-group {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }
    .hub-header__title {
      font-family: var(--font-family-primary);
      font-weight: var(--font-weight-bold);
      color: var(--color-content-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .hub-header__title--sm {
      font-size: var(--text-body-lg);
      line-height: var(--line-height-body-lg);
    }
    .hub-header__title--md {
      font-size: var(--text-heading-h2);
      line-height: var(--line-height-heading-h2);
    }
    .hub-header__title--lg {
      font-size: var(--text-heading-h1);
      line-height: var(--line-height-heading-h1);
    }
  `,

  controls: `
    .hub-header__controls {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }
  `,

  secondary: `
    .hub-header__secondary {
      display: flex;
      align-items: center;
      gap: var(--spacing-4);
      width: 100%;
    }
  `,
};

/* ===========================================
   STYLE INJECTION (SSR-safe)
   =========================================== */

let stylesInjected = false;

const injectStyles = () => {
  if (stylesInjected || typeof document === "undefined") return;

  const css = [
    styles.base,
    styles.row,
    styles.left,
    styles.right,
    styles.title,
    styles.controls,
    styles.secondary,
  ].join("\n");

  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-eureka", "hub-header");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
  stylesInjected = true;
};

/* ===========================================
   HUB HEADER TITLE COMPONENT
   =========================================== */

/**
 * HubHeaderTitle
 *
 * Title group with optional badge.
 */
export const HubHeaderTitle = ({
  children,
  badge,
  badgeVariant = "neutral",
  size = "md",
  className = "",
}) => {
  return (
    <div className={`hub-header__title-group ${className}`.trim()}>
      <span className={`hub-header__title hub-header__title--${size}`}>
        {children}
      </span>
      {badge && (
        <Badge color={badgeVariant} size="sm" shape="pill">
          {badge}
        </Badge>
      )}
    </div>
  );
};

HubHeaderTitle.displayName = "HubHeaderTitle";

export const HubHeaderLabel = HubHeaderTitle;
HubHeaderLabel.displayName = "HubHeaderLabel";

/* ===========================================
   HUB HEADER ACTIONS COMPONENT
   =========================================== */

/**
 * HubHeaderActions
 *
 * Container for action buttons.
 */
export const HubHeaderActions = ({ children, className = "" }) => {
  return (
    <div className={`hub-header__actions ${className}`.trim()}>{children}</div>
  );
};

HubHeaderActions.displayName = "HubHeaderActions";

/* ===========================================
   HUB HEADER CONTROLS COMPONENT
   =========================================== */

/**
 * HubHeaderControls
 *
 * Container for filter controls, search, etc.
 */
export const HubHeaderControls = ({ children, className = "" }) => {
  return (
    <div className={`hub-header__controls ${className}`.trim()}>{children}</div>
  );
};

HubHeaderControls.displayName = "HubHeaderControls";

/* ===========================================
   HUB HEADER ROW COMPONENT
   =========================================== */

/**
 * HubHeaderRow
 *
 * A row within the header for flexible layout.
 */
export const HubHeaderRow = ({ children, className = "" }) => {
  return (
    <div className={`hub-header__row ${className}`.trim()}>{children}</div>
  );
};

HubHeaderRow.displayName = "HubHeaderRow";

/* ===========================================
   HUB HEADER LEFT/RIGHT SLOTS
   =========================================== */

export const HubHeaderLeft = ({ children, className = "" }) => {
  return (
    <div className={`hub-header__left ${className}`.trim()}>{children}</div>
  );
};

HubHeaderLeft.displayName = "HubHeaderLeft";

export const HubHeaderRight = ({ children, className = "" }) => {
  return (
    <div className={`hub-header__right ${className}`.trim()}>{children}</div>
  );
};

HubHeaderRight.displayName = "HubHeaderRight";

/* ===========================================
   HUB HEADER SECONDARY ROW
   =========================================== */

/**
 * HubHeaderSecondary
 *
 * Secondary row for ButtonGroup views, tabs, etc.
 */
export const HubHeaderSecondary = ({ children, className = "" }) => {
  return (
    <div className={`hub-header__secondary ${className}`.trim()}>{children}</div>
  );
};

HubHeaderSecondary.displayName = "HubHeaderSecondary";

/* ===========================================
   HUB HEADER CONTEXT BUTTON
   =========================================== */

/**
 * HubHeaderContextButton
 *
 * A dropdown-trigger button representing the active workspace context (e.g. "Oncology").
 * Shows an optional leading icon, label, optional star indicator, and a chevron.
 */
export const HubHeaderContextButton = ({
  label,
  iconName = "User",
  starred = false,
  onClick,
  className = "",
  ...props
}) => (
  <Button
    variant="secondary"
    size="md"
    iconLeading={<Icon name={iconName} size="sm" variant="solid" />}
    iconTrailing={<Icon name="ChevronDown" size="sm" variant="solid" />}
    onClick={onClick}
    className={className}
    {...props}
  >
    <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
      {label}
      {starred && (
        <Icon name="Star" size="sm" variant="solid" style={{ color: "var(--color-status-warning-default)" }} />
      )}
    </span>
  </Button>
);

HubHeaderContextButton.displayName = "HubHeaderContextButton";

/* ===========================================
   HUB HEADER VIEW TOGGLE
   =========================================== */

/**
 * HubHeaderViewToggle
 *
 * A list / grid view switcher using ButtonGroup.
 */
export const HubHeaderViewToggle = ({ value = "list", onChange, className = "", ...props }) => (
  <ButtonGroup value={value} onChange={onChange} className={className} {...props}>
    <ButtonGroupItem value="list" iconName="Bars3" ariaLabel="List view" />
    <ButtonGroupItem value="grid" iconName="Squares2X2" ariaLabel="Grid view" />
  </ButtonGroup>
);

HubHeaderViewToggle.displayName = "HubHeaderViewToggle";

/* ===========================================
   HUB HEADER SEARCH
   =========================================== */

/**
 * HubHeaderSearch
 *
 * A pre-styled Search input for the hub header.
 * Accepts all Search props; defaults width to 200px.
 */
export const HubHeaderSearch = ({ width = 200, style, ...props }) => (
  <div style={{ width, flexShrink: 0, ...style }}>
    <Search size="md" placeholder="Search with keyword" {...props} />
  </div>
);

HubHeaderSearch.displayName = "HubHeaderSearch";

/* ===========================================
   HUB HEADER SMART FILTER BUTTON
   =========================================== */


/**
 * HubHeaderSmartFilterButton
 *
 * An "AI secondary" Smart filter button with a sparkle icon.
 */

export const HubHeaderSmartFilterButton = ({ label = "Smart filter", onClick, ...props }) => (
  <AiButton
    variant="secondary"
    size="md"
    iconLeading={<Icon name="Sparkles" size="sm" />}
    onClick={onClick}
    {...props}
  >
    {label}
  </AiButton>
);

HubHeaderSmartFilterButton.displayName = "HubHeaderSmartFilterButton";

/* ===========================================
   HUB HEADER SETTINGS BUTTON
   =========================================== */

/**
 * HubHeaderSettingsButton
 *
 * An icon-only settings button.
 */
export const HubHeaderSettingsButton = ({ onClick, ...props }) => (
  <Button
    variant="secondary"
    size="md"
    iconOnly
    ariaLabel="Settings"
    iconLeading={<Icon name="Cog6Tooth" size="sm" />}
    onClick={onClick}
    {...props}
  />
);

HubHeaderSettingsButton.displayName = "HubHeaderSettingsButton";

/* ===========================================
   HUB HEADER EXPORT BUTTON
   =========================================== */

/**
 * HubHeaderExportButton
 *
 * An "Export" button with an upload-arrow icon.
 */
export const HubHeaderExportButton = ({ label = "Export", onClick, ...props }) => (
  <Button
    variant="secondary"
    size="md"
    iconLeading={<Icon name="ArrowUpTray" size="sm" />}
    onClick={onClick}
    {...props}
  >
    {label}
  </Button>
);

HubHeaderExportButton.displayName = "HubHeaderExportButton";

/* ===========================================
   HUB HEADER COMPONENT
   =========================================== */

/**
 * HubHeader
 *
 * A flexible page-section header supporting list and detail views.
 *
 * @example
 * // Simple list header
 * <HubHeader title="Companies" badge="Active">
 *   <Button variant="primary" size="md">Add Company</Button>
 * </HubHeader>
 *
 * // List header with controls
 * <HubHeader
 *   title="Portfolio"
 *   badge="12"
 *   leftContent={
 *     <HubHeaderControls>
 *       <TextInput placeholder="Search..." iconLeft={<Icon name="MagnifyingGlass" />} />
 *       <Button variant="secondary" size="md" iconLeading={<Icon name="Funnel" />}>Filter</Button>
 *     </HubHeaderControls>
 *   }
 *   rightContent={
 *     <HubHeaderActions>
 *       <Button variant="secondary" size="md" iconLeading={<Icon name="ArrowDownTray" />}>Export</Button>
 *       <Button variant="primary" size="md" iconLeading={<Icon name="Plus" />}>Create</Button>
 *     </HubHeaderActions>
 *   }
 * />
 *
 * // Detail header with back button and secondary row
 * <HubHeader
 *   variant="detail"
 *   title="Company Name"
 *   titleSize="lg"
 *   badge="Active"
 *   onBack={() => navigate(-1)}
 *   rightContent={
 *     <HubHeaderActions>
 *       <Button variant="primary" size="md">Save</Button>
 *       <Button variant="secondary" size="md" iconLeading={<Icon name="EllipsisVertical" />} />
 *     </HubHeaderActions>
 *   }
 *   secondaryContent={
 *     <ButtonGroup value={activeView} onChange={setActiveView}>
 *       <ButtonGroupItem value="overview">Overview</ButtonGroupItem>
 *       <ButtonGroupItem value="details">Details</ButtonGroupItem>
 *       <ButtonGroupItem value="history">History</ButtonGroupItem>
 *     </ButtonGroup>
 *   }
 * />
 *
 * // Full composition mode
 * <HubHeader showBorder={false}>
 *   <HubHeaderRow>
 *     <HubHeaderLeft>
 *       <HubHeaderTitle size="md" badge="New">Dashboard</HubHeaderTitle>
 *     </HubHeaderLeft>
 *     <HubHeaderRight>
 *       <HubHeaderActions>
 *         <Button variant="primary">Action</Button>
 *       </HubHeaderActions>
 *     </HubHeaderRight>
 *   </HubHeaderRow>
 * </HubHeader>
 */
export const HubHeader = ({
  variant = "list",
  title,
  titleSize = "md",
  badge,
  badgeVariant = "neutral",
  showBorder = true,
  leftContent,
  rightContent,
  secondaryContent,
  onBack,
  backButtonProps,
  titleProps,
  secondaryProps,
  className = "",
  children,
  ...props
}) => {
  injectStyles();

  const classes = [
    "hub-header",
    !showBorder && "hub-header--no-border",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // If children are provided, use composition mode
  if (children) {
    return (
      <div className={classes} {...props}>
        {children}
      </div>
    );
  }

  // Otherwise, render based on variant
  return (
    <div className={classes} {...props}>
      <div className="hub-header__row">
        <div className="hub-header__left">
          {/* Back button for detail variant */}
          {variant === "detail" && onBack && (
            <Button
              variant="secondary"
              size="md"
              iconLeading={<Icon name="ArrowLeft" />}
              onClick={onBack}
              {...backButtonProps}
            >
              {backButtonProps?.children || "Back"}
            </Button>
          )}

          {/* Title group */}
          {title && (
            <HubHeaderTitle size={titleSize} badge={badge} badgeVariant={badgeVariant} {...titleProps}>
              {title}
            </HubHeaderTitle>
          )}

          {/* Left content (controls, filters, etc.) */}
          {leftContent}
        </div>

        <div className="hub-header__right">
          {rightContent}
        </div>
      </div>

      {/* Secondary row */}
      {secondaryContent && (
        <div className="hub-header__secondary" {...secondaryProps}>{secondaryContent}</div>
      )}
    </div>
  );
};

HubHeader.displayName = "HubHeader";

// Sub-components
HubHeader.Title = HubHeaderTitle;
HubHeader.Label = HubHeaderLabel;
HubHeader.Actions = HubHeaderActions;
HubHeader.Controls = HubHeaderControls;
HubHeader.Row = HubHeaderRow;
HubHeader.Left = HubHeaderLeft;
HubHeader.Right = HubHeaderRight;
HubHeader.Secondary = HubHeaderSecondary;
HubHeader.Button = Button;
HubHeader.Icon = Icon;
HubHeader.Badge = Badge;
HubHeader.TextInput = TextInput;
HubHeader.Search = Search;
HubHeader.Tabs = Tabs;
HubHeader.Tab = Tab;
HubHeader.TabPanel = TabPanel;
HubHeader.ContextButton = HubHeaderContextButton;
HubHeader.ViewToggle = HubHeaderViewToggle;
HubHeader.SearchInput = HubHeaderSearch;
HubHeader.SmartFilterButton = HubHeaderSmartFilterButton;
HubHeader.SettingsButton = HubHeaderSettingsButton;
HubHeader.ExportButton = HubHeaderExportButton;

// Re-export commonly used child components for convenience
export { Button } from "../atoms/button.jsx";
export { Icon } from "../atoms/icon.jsx";
export { Badge } from "../atoms/badge.jsx";
export { Tabs, Tab, TabPanel } from "../molecules/tabs.jsx";
export { ButtonGroup, ButtonGroupItem } from "../molecules/button-group.jsx";

export default HubHeader;
