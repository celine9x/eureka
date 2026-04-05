/**
 * ObjectHeader Component (Organism)
 *
 * A comprehensive header for object detail pages.
 * Combines buttons, text input, stepper, avatar group, tabs, subinfo, and badges.
 * Uses design tokens from tokens.css.
 */

import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";
import { Badge } from "../atoms/badge.jsx";
import { Chip } from "../atoms/chip.jsx";
import { Avatar } from "../atoms/avatar.jsx";
import { Link } from "../atoms/link.jsx";
import { AvatarGroup } from "../molecules/avatar-group.jsx";
import { Stepper, Step } from "../molecules/stepper.jsx";
import { Tabs, Tab } from "../molecules/tabs.jsx";
import { Subinfo, SubinfoAvatar, SubinfoListItem } from "../molecules/subinfo.jsx";

/* ===========================================
   STYLE CONFIGURATION
   =========================================== */

const styles = {
  base: `
    .object-header {
      width: 100%;
      padding-top: var(--spacing-6);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-6);
    }
  `,

  topBar: `
    .object-header-top-bar {
      align-self: stretch;
      padding-bottom: var(--spacing-4);
      border-bottom: 1px solid var(--color-outline-neutral);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--spacing-4);
    }
    .object-header-top-bar-left {
      flex: 1 1 0;
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }
    .object-header-top-bar-right {
      display: flex;
      align-items: center;
      gap: var(--spacing-4);
    }
    .object-header-actions-group {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }
    .object-header-divider {
      width: 1px;
      height: 32px;
      background: var(--color-outline-neutral);
    }
  `,

  meta: `
    .object-header-meta {
      display: flex;
      align-items: center;
      gap: var(--spacing-1);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-body-md);
      color: var(--color-content-secondary);
    }
    .object-header-meta-icon {
      width: var(--size-icon-sm);
      height: var(--size-icon-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-content-secondary);
    }
  `,

  title: `
    .object-header-title-section {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
    }
    .object-header-title-row {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }
    .object-header-title-icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .object-header-title-icon--warning {
      color: var(--color-content-danger);
    }
    .object-header-title {
      font-family: var(--font-family-primary);
      font-size: var(--text-heading-h2);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-heading-h2);
      color: var(--color-content-primary);
      margin: 0;
    }
  `,

  subinfo: `
    .object-header-subinfo-row {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-4);
      flex-wrap: wrap;
    }
    .object-header-subinfo-item {
      max-width: 250px;
      min-width: 120px;
      padding-right: var(--spacing-4);
      border-right: 1px solid var(--color-outline-neutral);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
    }
    .object-header-subinfo-item:last-child {
      border-right: none;
      padding-right: 0;
    }
  `,

  stepper: `
    .object-header-stepper {
      align-self: stretch;
    }
  `,

  tabs: `
    .object-header-tabs {
      align-self: stretch;
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
    styles.topBar,
    styles.meta,
    styles.title,
    styles.subinfo,
    styles.stepper,
    styles.tabs,
  ].join("\n");

  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-eureka", "object-header");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
  stylesInjected = true;
};

/* ===========================================
   SUB-COMPONENTS
   =========================================== */

/**
 * ObjectHeaderTopBar
 *
 * Top navigation bar with back button, avatar group, and action buttons.
 */
export const ObjectHeaderTopBar = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`object-header-top-bar ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

/**
 * ObjectHeaderTopBarLeft
 *
 * Left section of the top bar (typically back button).
 */
export const ObjectHeaderTopBarLeft = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`object-header-top-bar-left ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

/**
 * ObjectHeaderTopBarRight
 *
 * Right section of the top bar (action buttons, avatar group).
 */
export const ObjectHeaderTopBarRight = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`object-header-top-bar-right ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

/**
 * ObjectHeaderActionsGroup
 *
 * Groups related action buttons together.
 */
export const ObjectHeaderActionsGroup = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`object-header-actions-group ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

/**
 * ObjectHeaderDivider
 *
 * Vertical divider between action groups.
 */
export const ObjectHeaderDivider = ({ className = "", ...props }) => {
  return (
    <div className={`object-header-divider ${className}`.trim()} {...props} />
  );
};

/**
 * ObjectHeaderMeta
 *
 * Metadata row showing "last updated" info.
 */
export const ObjectHeaderMeta = ({
  label = "Last updated on",
  date,
  time,
  author,
  showCalendarIcon = true,
  className = "",
  ...props
}) => {
  return (
    <div className={`object-header-meta ${className}`.trim()} {...props}>
      <span>{label}</span>
      {showCalendarIcon && (
        <span className="object-header-meta-icon">
          <Icon name="Calendar" size="sm" />
        </span>
      )}
      {date && <span>{date}</span>}
      {time && <span>at {time}</span>}
      {author && <span>by {author}</span>}
    </div>
  );
};

/**
 * ObjectHeaderTitleSection
 *
 * Container for meta and title.
 */
export const ObjectHeaderTitleSection = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`object-header-title-section ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

/**
 * ObjectHeaderTitle
 *
 * Main title with optional icon.
 */
export const ObjectHeaderTitle = ({
  icon,
  iconName,
  iconVariant = "default",
  className = "",
  children,
  ...props
}) => {
  const iconClasses = [
    "object-header-title-icon",
    iconVariant === "warning" && "object-header-title-icon--warning",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`object-header-title-row ${className}`.trim()} {...props}>
      {(icon || iconName) && (
        <span className={iconClasses}>
          {icon || <Icon name={iconName} size="md" />}
        </span>
      )}
      <h1 className="object-header-title">{children}</h1>
    </div>
  );
};

/**
 * ObjectHeaderSubinfoRow
 *
 * Row of subinfo items.
 */
export const ObjectHeaderSubinfoRow = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`object-header-subinfo-row ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

/**
 * ObjectHeaderSubinfoItem
 *
 * Individual subinfo item wrapper.
 */
export const ObjectHeaderSubinfoItem = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`object-header-subinfo-item ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

/**
 * ObjectHeaderStepper
 *
 * Wrapper for the stepper component.
 */
export const ObjectHeaderStepper = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`object-header-stepper ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

/**
 * ObjectHeaderTabs
 *
 * Wrapper for tabs navigation.
 */
export const ObjectHeaderTabs = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`object-header-tabs ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

/* ===========================================
   MAIN OBJECTHEADER COMPONENT
   =========================================== */

/**
 * ObjectHeader
 *
 * A comprehensive header for object detail pages.
 * @example
 * <ObjectHeader>
 *   <ObjectHeader.TopBar>
 *     <ObjectHeader.TopBarLeft>
 *       <ObjectHeader.Button variant="secondary" size="md" iconLeading={<ObjectHeader.Icon name="ArrowLeft" size="sm" />}>
 *         Back
 *       </ObjectHeader.Button>
 *     </ObjectHeader.TopBarLeft>
 *     <ObjectHeader.TopBarRight>
 *       <ObjectHeader.ActionsGroup>
 *         <ObjectHeader.AvatarGroup avatars={users} max={4} size="sm" />
 *         <ObjectHeader.Button variant="secondary" size="md" iconLeading={<ObjectHeader.Icon name="UserPlus" size="sm" />}>
 *           Manage access
 *         </ObjectHeader.Button>
 *       </ObjectHeader.ActionsGroup>
 *       <ObjectHeader.Divider />
 *       <ObjectHeader.ActionsGroup>
 *         <ObjectHeader.Button variant="secondary" size="md" iconLeading={<ObjectHeader.Icon name="Bookmark" size="sm" />} />
 *         <ObjectHeader.Button variant="secondary" size="md" iconLeading={<ObjectHeader.Icon name="Share" size="sm" />} />
 *       </ObjectHeader.ActionsGroup>
 *     </ObjectHeader.TopBarRight>
 *   </ObjectHeader.TopBar>
 *
 *   <ObjectHeader.TitleSection>
 *     <ObjectHeader.Meta
 *       date="Tue, Oct 21, 2022"
 *       time="9:21 PM"
 *       author="John Doe"
 *     />
 *     <ObjectHeader.Title iconName="LockClosed" iconVariant="warning">
 *       Deal Title
 *     </ObjectHeader.Title>
 *   </ObjectHeader.TitleSection>
 *
 *   <ObjectHeader.SubinfoRow>
 *     <ObjectHeader.SubinfoItem>
 *       <ObjectHeader.Chip variant="positive">Active</ObjectHeader.Chip>
 *     </ObjectHeader.SubinfoItem>
 *     <ObjectHeader.SubinfoItem>
 *       <ObjectHeader.SubinfoAvatar name="John Doe" initials="JD" />
 *     </ObjectHeader.SubinfoItem>
 *     <ObjectHeader.SubinfoItem>
 *       <ObjectHeader.Subinfo variant="value" iconName="Building" value="Abbvie Limited" link />
 *     </ObjectHeader.SubinfoItem>
 *   </ObjectHeader.SubinfoRow>
 *
 *   <ObjectHeader.StepperSection>
 *     <ObjectHeader.Stepper
 *       currentStep={3}
 *       steps={[
 *         { title: "Identification", subtitle: "Jul 15, 2024" },
 *         { title: "Review", subtitle: "Jul 15, 2024" },
 *         { title: "Evaluation", subtitle: "Jul 15, 2024" },
 *         { title: "Due Diligence", subtitle: "Jul 15, 2024" },
 *         { title: "Negotiation" },
 *         { title: "Contracting" },
 *         { title: "Signed" },
 *       ]}
 *     />
 *   </ObjectHeader.StepperSection>
 *
 *   <ObjectHeader.TabsSection>
 *     <ObjectHeader.Tabs selectedKey={activeTab} onSelectionChange={setActiveTab}>
 *       <ObjectHeader.Tab id="overview">Overview</ObjectHeader.Tab>
 *       <ObjectHeader.Tab id="details">Details</ObjectHeader.Tab>
 *       <ObjectHeader.Tab id="meetings" badge={5}>Meetings</ObjectHeader.Tab>
 *       <ObjectHeader.Tab id="contacts" badge={12}>Contacts</ObjectHeader.Tab>
 *       <ObjectHeader.Tab id="attachments" badge={3}>Attachments</ObjectHeader.Tab>
 *     </ObjectHeader.Tabs>
 *   </ObjectHeader.TabsSection>
 * </ObjectHeader>
 *
 * // Slot-based API (no deep nesting)
 * <ObjectHeader
 *   topBarLeft={<Button variant="secondary">Back</Button>}
 *   topBarRight={
 *     <>
 *       <Button variant="secondary">Share</Button>
 *       <Button variant="primary">Save</Button>
 *     </>
 *   }
 *   meta={<ObjectHeaderMeta date="Tue, Oct 21, 2022" author="John Doe" />}
 *   title={<ObjectHeaderTitle iconName="LockClosed">Deal Title</ObjectHeaderTitle>}
 *   tabs={
 *     <Tabs>
 *       <Tab id="overview">Overview</Tab>
 *       <Tab id="details">Details</Tab>
 *     </Tabs>
 *   }
 * />
 *
 * // Prop-based composition for common internal atoms/molecules
 * <ObjectHeader
 *   backButtonProps={{ children: "Back to deals", onClick: handleBack }}
 *   actionButtons={[
 *     { label: "Manage access", iconName: "UserPlus", onClick: handleAccess },
 *     { iconName: "Bookmark", iconOnly: true, ariaLabel: "Bookmark" },
 *   ]}
 *   tabsItems={[
 *     { id: "overview", label: "Overview" },
 *     { id: "details", label: "Details" },
 *     { id: "contacts", label: "Contacts", badge: 12 },
 *   ]}
 *   defaultSelectedTab="overview"
 * />
 */
export const ObjectHeader = ({
  className = "",
  topBar,
  topBarLeft,
  topBarRight,
  backButtonProps,
  actionButtons,
  actionButtonsGroupProps,
  topBarProps,
  topBarLeftProps,
  topBarRightProps,
  titleSection,
  meta,
  title,
  titleSectionProps,
  subinfo,
  subinfoRowProps,
  stepper,
  stepperProps,
  tabs,
  tabsItems,
  tabsListProps,
  selectedTab,
  defaultSelectedTab,
  onTabChange,
  tabsProps,
  children,
  ...props
}) => {
  injectStyles();

  const hasActionButtons = Array.isArray(actionButtons) && actionButtons.length > 0;
  const hasTabsItems = Array.isArray(tabsItems) && tabsItems.length > 0;

  const { children: backButtonLabel, iconLeading: backButtonIconLeading, ...resolvedBackButtonProps } =
    backButtonProps || {};

  const generatedTopBarLeft = backButtonProps ? (
    <Button
      variant="secondary"
      size="md"
      iconLeading={backButtonIconLeading || <Icon name="ArrowLeft" size="sm" />}
      {...resolvedBackButtonProps}
    >
      {backButtonLabel || "Back"}
    </Button>
  ) : null;

  const generatedTopBarRight = hasActionButtons ? (
    <ObjectHeaderActionsGroup {...actionButtonsGroupProps}>
      {actionButtons.map((actionConfig, index) => {
        const resolvedConfig =
          typeof actionConfig === "string"
            ? { label: actionConfig }
            : actionConfig && typeof actionConfig === "object"
              ? actionConfig
              : {};

        const {
          id,
          label,
          iconName,
          iconSize = "sm",
          iconLeading,
          children: actionChildren,
          ...buttonProps
        } = resolvedConfig;

        const resolvedIconLeading =
          iconLeading !== undefined
            ? iconLeading
            : iconName
              ? <Icon name={iconName} size={iconSize} />
              : undefined;

        return (
          <Button
            key={id || `object-header-action-${index + 1}`}
            variant="secondary"
            size="md"
            iconLeading={resolvedIconLeading}
            {...buttonProps}
          >
            {actionChildren || label}
          </Button>
        );
      })}
    </ObjectHeaderActionsGroup>
  ) : null;

  const normalizedTabItems = hasTabsItems
    ? tabsItems
      .filter((item) => item !== undefined && item !== null)
      .map((item) => {
        if (typeof item === "string") {
          return {
            id: item.toLowerCase().trim().replace(/\s+/g, "-"),
            label: item,
          };
        }
        return item;
      })
    : [];

  const generatedTabs = normalizedTabItems.length > 0 ? (
    <Tabs
      selectedKey={selectedTab}
      defaultSelectedKey={defaultSelectedTab || normalizedTabItems[0]?.id}
      onSelectionChange={onTabChange}
      {...tabsListProps}
    >
      {normalizedTabItems.map((tabConfig, index) => {
        const { id, label, children: tabChildren, ...tabProps } = tabConfig;
        const resolvedId = id || `tab-${index + 1}`;

        return (
          <Tab id={resolvedId} key={resolvedId} {...tabProps}>
            {tabChildren || label || resolvedId}
          </Tab>
        );
      })}
    </Tabs>
  ) : null;

  const resolvedTopBarLeft = topBarLeft ?? generatedTopBarLeft;
  const resolvedTopBarRight = topBarRight ?? generatedTopBarRight;
  const resolvedTabs = tabs ?? generatedTabs;

  const classes = ["object-header", className].filter(Boolean).join(" ");
  const hasChildren = children !== undefined && children !== null;
  const hasSlotContent = [
    topBar,
    resolvedTopBarLeft,
    resolvedTopBarRight,
    titleSection,
    meta,
    title,
    subinfo,
    stepper,
    resolvedTabs,
  ].some((slot) => slot !== undefined && slot !== null);

  const renderedContent = hasChildren ? children : (
    <>
      {(topBar || resolvedTopBarLeft || resolvedTopBarRight) && (
        <ObjectHeaderTopBar {...topBarProps}>
          {topBar || (
            <>
              {resolvedTopBarLeft !== undefined && resolvedTopBarLeft !== null && (
                <ObjectHeaderTopBarLeft {...topBarLeftProps}>{resolvedTopBarLeft}</ObjectHeaderTopBarLeft>
              )}
              {resolvedTopBarRight !== undefined && resolvedTopBarRight !== null && (
                <ObjectHeaderTopBarRight {...topBarRightProps}>{resolvedTopBarRight}</ObjectHeaderTopBarRight>
              )}
            </>
          )}
        </ObjectHeaderTopBar>
      )}

      {(titleSection || meta || title) && (
        <ObjectHeaderTitleSection {...titleSectionProps}>
          {titleSection || (
            <>
              {meta}
              {title}
            </>
          )}
        </ObjectHeaderTitleSection>
      )}

      {subinfo !== undefined && subinfo !== null && (
        <ObjectHeaderSubinfoRow {...subinfoRowProps}>
          {subinfo}
        </ObjectHeaderSubinfoRow>
      )}

      {stepper !== undefined && stepper !== null && (
        <ObjectHeaderStepper {...stepperProps}>{stepper}</ObjectHeaderStepper>
      )}

      {resolvedTabs !== undefined && resolvedTabs !== null && (
        <ObjectHeaderTabs {...tabsProps}>{resolvedTabs}</ObjectHeaderTabs>
      )}
    </>
  );

  return (
    <div className={classes} {...props}>
      {hasChildren || hasSlotContent ? renderedContent : null}
    </div>
  );
};

ObjectHeader.displayName = "ObjectHeader";

ObjectHeader.TopBar = ObjectHeaderTopBar;
ObjectHeader.TopBarLeft = ObjectHeaderTopBarLeft;
ObjectHeader.TopBarRight = ObjectHeaderTopBarRight;
ObjectHeader.ActionsGroup = ObjectHeaderActionsGroup;
ObjectHeader.Divider = ObjectHeaderDivider;
ObjectHeader.Meta = ObjectHeaderMeta;
ObjectHeader.TitleSection = ObjectHeaderTitleSection;
ObjectHeader.Title = ObjectHeaderTitle;
ObjectHeader.SubinfoRow = ObjectHeaderSubinfoRow;
ObjectHeader.SubinfoItem = ObjectHeaderSubinfoItem;
ObjectHeader.StepperSection = ObjectHeaderStepper;
ObjectHeader.TabsSection = ObjectHeaderTabs;
ObjectHeader.Button = Button;
ObjectHeader.Icon = Icon;
ObjectHeader.Badge = Badge;
ObjectHeader.Chip = Chip;
ObjectHeader.Avatar = Avatar;
ObjectHeader.Link = Link;
ObjectHeader.AvatarGroup = AvatarGroup;
ObjectHeader.Stepper = Stepper;
ObjectHeader.Step = Step;
ObjectHeader.Tabs = Tabs;
ObjectHeader.Tab = Tab;
ObjectHeader.Subinfo = Subinfo;
ObjectHeader.SubinfoAvatar = SubinfoAvatar;
ObjectHeader.SubinfoListItem = SubinfoListItem;

// Re-export commonly used components for convenience
export { Button, Icon, Badge, Chip, Avatar, Link, AvatarGroup, Stepper, Step, Tabs, Tab, Subinfo, SubinfoAvatar, SubinfoListItem };

export default ObjectHeader;
