/**
 * ObjectHeader Component (Organism)
 *
 * A comprehensive header for object detail pages.
 * Combines buttons, text input, stepper, avatar group, tabs, subinfo, and badges.
 * Uses design tokens from tokens.css.
 */

import { forwardRef } from "react";
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
      padding-top: var(--spacing-md);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
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
      align-self: stretch;
      background-color: var(--color-outline-neutral);
      margin-inline: var(--spacing-2);
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
      gap: var(--spacing-sm);
    }
    .object-header-title-row {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
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
      align-items: stretch;
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
      justify-content: center;
      gap: var(--spacing-2);
      align-self: stretch;
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

export const ObjectHeaderBackButton = ({
  label = "Back",
  iconName = "ArrowLeft",
  iconSize = "sm",
  className = "",
  children,
  ...props
}) => {
  const classes = ["object-header-back-button", className].filter(Boolean).join(" ");

  return (
    <Button
      variant="secondary"
      size="md"
      iconLeading={<Icon name={iconName} size={iconSize} />}
      className={classes}
      {...props}
    >
      {children || label}
    </Button>
  );
};

export const ObjectHeaderActionButton = ({
  iconName,
  iconSize = "sm",
  iconLeading,
  className = "",
  children,
  ...props
}) => {
  const resolvedIconLeading =
    iconLeading !== undefined
      ? iconLeading
      : iconName
        ? <Icon name={iconName} size={iconSize} />
        : undefined;

  return (
    <Button
      variant="secondary"
      size="sm"
      className={className}
      iconLeading={resolvedIconLeading}
      {...props}
    >
      {children}
    </Button>
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
export const ObjectHeaderTitleSection = forwardRef(({
  className = "",
  children,
  ...props
}, ref) => {
  return (
    <div ref={ref} className={`object-header-title-section ${className}`.trim()} {...props}>
      {children}
    </div>
  );
});

/**
 * ObjectHeaderDivider
 *
 * Visual divider between top-bar action groups.
 */
export const ObjectHeaderDivider = ({ className = "", ...props }) => {
  return (
    <div
      aria-hidden="true"
      className={`object-header-divider ${className}`.trim()}
      {...props}
    />
  );
};

ObjectHeaderTitleSection.displayName = "ObjectHeaderTitleSection";

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
 * ObjectHeaderStepper (Internal)
 *
 * Wrapper for the stepper component - internal use only.
 */
export const ObjectHeaderStepperSection = ({
  steps,
  currentStep = 0,
  className = "",
  children,
  ...props
}) => {
  const resolvedContent =
    children !== undefined && children !== null
      ? children
      : Array.isArray(steps) && steps.length > 0
        ? <Stepper steps={steps} currentStep={currentStep} />
        : null;

  return (
    <div className={`object-header-stepper ${className}`.trim()} {...props}>
      {resolvedContent}
    </div>
  );
};

/**
 * ObjectHeaderTabs (Internal)
 *
 * Wrapper for tabs navigation - internal use only.
 */
export const ObjectHeaderTabsSection = ({
  tabs,
  activeTab,
  onTabChange,
  className = "",
  children,
  ...props
}) => {
  const resolvedContent =
    children !== undefined && children !== null
      ? children
      : Array.isArray(tabs) && tabs.length > 0
        ? (
          <Tabs selectedKey={activeTab} onSelectionChange={onTabChange}>
            {tabs.map((tabConfig, index) => {
              if (tabConfig && typeof tabConfig === "object") {
                const {
                  id,
                  label,
                  badge,
                  children: tabChildren,
                  ...tabProps
                } = tabConfig;
                const resolvedId = id || `tab-${index + 1}`;
                return (
                  <Tab id={resolvedId} key={resolvedId} badge={badge} {...tabProps}>
                    {tabChildren || label || resolvedId}
                  </Tab>
                );
              }

              const value = String(tabConfig);
              const resolvedId = value.toLowerCase().trim().replace(/\s+/g, "-");
              return (
                <Tab id={resolvedId} key={resolvedId}>
                  {value}
                </Tab>
              );
            })}
          </Tabs>
        )
        : null;

  return (
    <div className={`object-header-tabs ${className}`.trim()} {...props}>
      {resolvedContent}
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
 * import { useState } from "react";
 * import {
 *   ObjectHeader,
 *   ObjectHeaderTopBar,
 *   ObjectHeaderTopBarLeft,
 *   ObjectHeaderTopBarRight,
 *   ObjectHeaderActionsGroup,
 *   ObjectHeaderMeta,
 *   ObjectHeaderTitleSection,
 *   ObjectHeaderTitle,
 *   ObjectHeaderSubinfoRow,
 *   ObjectHeaderSubinfoItem,
 *   ObjectHeaderStepper,
 *   ObjectHeaderTabs,
 * } from "@/library/organisms/object-header";
 * import { Button } from "@/library/atoms/button";
 * import { Icon } from "@/library/atoms/icon";
 * import { Chip } from "@/library/atoms/chip";
 * import { Link } from "@/library/atoms/link";
 * import { AvatarGroup } from "@/library/molecules/avatar-group";
 * import { Stepper } from "@/library/molecules/stepper";
 * import { Tabs, Tab } from "@/library/molecules/tabs";
 *
 * const Example = () => {
 *   const [activeTab, setActiveTab] = useState("overview");
 *
 *   return (
 *     <ObjectHeader>
 *       <ObjectHeaderTopBar>
 *         <ObjectHeaderTopBarLeft>
 *           <Button variant="secondary" size="md" iconLeading={<Icon name="ArrowLeft" size="sm" />}>
 *             Back
 *           </Button>
 *         </ObjectHeaderTopBarLeft>
 *         <ObjectHeaderTopBarRight>
 *           <ObjectHeaderActionsGroup>
 *             <AvatarGroup
 *               avatars={[
 *                 { name: "John Doe" },
 *                 { name: "Jane Smith" },
 *                 { name: "Bob Wilson" },
 *               ]}
 *               max={3}
 *               size="sm"
 *             />
 *             <Button variant="secondary" size="md" iconLeading={<Icon name="UserPlus" size="sm" />}>
 *               Manage access
 *             </Button>
 *           </ObjectHeaderActionsGroup>
 *           <ObjectHeaderActionsGroup>
 *             <Button variant="secondary" size="md" iconLeading={<Icon name="Bookmark" size="sm" />} />
 *             <Button variant="secondary" size="md" iconLeading={<Icon name="Share" size="sm" />} />
 *           </ObjectHeaderActionsGroup>
 *         </ObjectHeaderTopBarRight>
 *       </ObjectHeaderTopBar>
 *
 *       <ObjectHeaderTitleSection>
 *         <ObjectHeaderMeta
 *           label="Last updated on"
 *           date="Tue, Oct 21, 2024"
 *           time="9:21 PM"
 *           author="John Doe"
 *         />
 *         <ObjectHeaderTitle iconName="LockClosed" iconVariant="warning">
 *           Deal Title - Example Project
 *         </ObjectHeaderTitle>
 *       </ObjectHeaderTitleSection>
 *
 *       <ObjectHeaderSubinfoRow>
 *         <ObjectHeaderSubinfoItem>
 *           <Chip variant="positive">Active</Chip>
 *         </ObjectHeaderSubinfoItem>
 *         <ObjectHeaderSubinfoItem>
 *           <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
 *             <span style={{ fontSize: 12, color: "var(--color-content-secondary)" }}>Owner</span>
 *             <span style={{ fontSize: 14, color: "var(--color-content-primary)" }}>Emma Dupont</span>
 *           </div>
 *         </ObjectHeaderSubinfoItem>
 *         <ObjectHeaderSubinfoItem>
 *           <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
 *             <span style={{ fontSize: 12, color: "var(--color-content-secondary)" }}>Company</span>
 *             <Link href="#">Abbvie Limited</Link>
 *           </div>
 *         </ObjectHeaderSubinfoItem>
 *       </ObjectHeaderSubinfoRow>
 *
 *       <ObjectHeaderStepper>
 *         <Stepper
 *           currentStep={3}
 *           steps={[
 *             { title: "Identification", subtitle: "Jul 15, 2024" },
 *             { title: "Review", subtitle: "Jul 20, 2024" },
 *             { title: "Evaluation", subtitle: "Jul 25, 2024" },
 *             { title: "Due Diligence", subtitle: "In Progress" },
 *             { title: "Negotiation" },
 *             { title: "Contracting" },
 *             { title: "Signed" },
 *           ]}
 *         />
 *       </ObjectHeaderStepper>
 *
 *       <ObjectHeaderTabs>
 *         <Tabs selectedKey={activeTab} onSelectionChange={setActiveTab}>
 *           <Tab id="overview">Overview</Tab>
 *           <Tab id="details">Details</Tab>
 *           <Tab id="meetings" badge={5}>Meetings</Tab>
 *           <Tab id="contacts" badge={12}>Contacts</Tab>
 *           <Tab id="attachments" badge={3}>Attachments</Tab>
 *         </Tabs>
 *       </ObjectHeaderTabs>
 *     </ObjectHeader>
 *   );
 * };
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
        <ObjectHeaderStepperSection {...stepperProps}>{stepper}</ObjectHeaderStepperSection>
      )}

      {resolvedTabs !== undefined && resolvedTabs !== null && (
        <ObjectHeaderTabsSection {...tabsProps}>{resolvedTabs}</ObjectHeaderTabsSection>
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
ObjectHeader.Meta = ObjectHeaderMeta;
ObjectHeader.TitleSection = ObjectHeaderTitleSection;
ObjectHeader.Divider = ObjectHeaderDivider;
ObjectHeader.Title = ObjectHeaderTitle;
ObjectHeader.SubinfoRow = ObjectHeaderSubinfoRow;
ObjectHeader.SubinfoItem = ObjectHeaderSubinfoItem;
ObjectHeader.StepperSection = ObjectHeaderStepperSection;
ObjectHeader.TabsSection = ObjectHeaderTabsSection;
ObjectHeader.BackButton = ObjectHeaderBackButton;
ObjectHeader.ActionButton = ObjectHeaderActionButton;
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

export default ObjectHeader;
