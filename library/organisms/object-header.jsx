/**
 * ObjectHeader Component (Organism)
 *
 * A comprehensive header for object detail pages.
 * Combines buttons, text input, stepper, avatar group, tabs, subinfo, and badges.
 * Uses design tokens from tokens.css.
 */

import { Icon } from "../atoms/icon.jsx";

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
      line-height: 32px;
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
 *
 * @param {string} label - Label text (e.g., "Last updated on")
 * @param {string} date - Date string
 * @param {string} time - Time string (optional)
 * @param {string} author - Author name (optional)
 * @param {boolean} showCalendarIcon - Show calendar icon (default: true)
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
 *
 * @param {ReactNode} icon - Icon element to display before title
 * @param {string} iconName - Icon name to use with Icon component
 * @param {string} iconVariant - Icon style variant: default | warning
 * @param {ReactNode} children - Title text
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
 *
 * @param {string} className - Additional CSS classes
 * @param {ReactNode} children - ObjectHeader sub-components
 *
 * @example
 * <ObjectHeader>
 *   <ObjectHeaderTopBar>
 *     <ObjectHeaderTopBarLeft>
 *       <Button variant="secondary" size="md" iconName="ArrowLeft">Back</Button>
 *     </ObjectHeaderTopBarLeft>
 *     <ObjectHeaderTopBarRight>
 *       <ObjectHeaderActionsGroup>
 *         <AvatarGroup avatars={users} max={4} size="xl" />
 *         <Button variant="secondary" size="md" iconName="UserPlus">Manage access</Button>
 *       </ObjectHeaderActionsGroup>
 *       <ObjectHeaderDivider />
 *       <ObjectHeaderActionsGroup>
 *         <Button variant="secondary" size="md" iconName="Bookmark" />
 *         <Button variant="secondary" size="md" iconName="Share" />
 *       </ObjectHeaderActionsGroup>
 *     </ObjectHeaderTopBarRight>
 *   </ObjectHeaderTopBar>
 *
 *   <ObjectHeaderTitleSection>
 *     <ObjectHeaderMeta
 *       date="Tue, Oct 21, 2022"
 *       time="9:21 PM"
 *       author="John Doe"
 *     />
 *     <ObjectHeaderTitle iconName="LockClosed" iconVariant="warning">
 *       Deal Title
 *     </ObjectHeaderTitle>
 *   </ObjectHeaderTitleSection>
 *
 *   <ObjectHeaderSubinfoRow>
 *     <ObjectHeaderSubinfoItem>
 *       <Chip variant="neutral" iconRightName="ChevronDown">Active</Chip>
 *     </ObjectHeaderSubinfoItem>
 *     <ObjectHeaderSubinfoItem>
 *       <SubinfoAvatar name="John Doe" initials="JD" />
 *     </ObjectHeaderSubinfoItem>
 *     <ObjectHeaderSubinfoItem>
 *       <Subinfo variant="value" iconName="Building" value="Abbvie Limited" link />
 *     </ObjectHeaderSubinfoItem>
 *     <ObjectHeaderSubinfoItem>
 *       <Subinfo variant="chips" chips={[{ label: "Tag 1" }, { label: "Tag 2" }]} />
 *     </ObjectHeaderSubinfoItem>
 *   </ObjectHeaderSubinfoRow>
 *
 *   <ObjectHeaderStepper>
 *     <Stepper
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
 *   </ObjectHeaderStepper>
 *
 *   <ObjectHeaderTabs>
 *     <Tabs value={activeTab} onChange={setActiveTab}>
 *       <Tab value="overview">Overview</Tab>
 *       <Tab value="details">Details</Tab>
 *       <Tab value="meetings" badge="5">Meetings</Tab>
 *       <Tab value="contacts" badge="12">Contacts</Tab>
 *       <Tab value="attachments" badge="3">Attachments</Tab>
 *       <Tab value="related">Related information</Tab>
 *     </Tabs>
 *   </ObjectHeaderTabs>
 * </ObjectHeader>
 */
export const ObjectHeader = ({
  className = "",
  children,
  ...props
}) => {
  injectStyles();

  const classes = ["object-header", className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

ObjectHeader.displayName = "ObjectHeader";

// Re-export commonly used components for convenience
export { Button } from "../atoms/button.jsx";
export { Icon } from "../atoms/icon.jsx";
export { Badge } from "../atoms/badge.jsx";
export { Chip } from "../atoms/chip.jsx";
export { Avatar } from "../atoms/avatar.jsx";
export { AvatarGroup } from "../molecules/avatar-group.jsx";
export { Stepper, Step } from "../molecules/stepper.jsx";
export { Tabs, Tab } from "../molecules/tabs.jsx";
export { Subinfo, SubinfoAvatar, SubinfoListItem } from "../molecules/subinfo.jsx";

export default ObjectHeader;
