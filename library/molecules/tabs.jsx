/**
 * Tabs Component (Molecule)
 *
 * A tab navigation component with optional badges and icons.
 * Uses Tailwind CSS with design tokens and react-aria-components for accessibility.
 */

import React, { useRef, useState, useEffect } from "react";
import {
  Tabs as AriaTabs,
  TabList as AriaTabList,
  Tab as AriaTab,
  TabPanel as AriaTabPanel,
} from "react-aria-components";
import { cx } from "../utils/cx.js";
import { Icon } from "../atoms/icon.jsx";

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  container: "relative w-full border-b border-outline-neutral",

  list: [
    "inline-flex items-center gap-6 h-9 overflow-x-auto",
    "scrollbar-none",
  ].join(" "),

  overflowIndicator: [
    "w-10 h-9 py-1.5 px-4 absolute right-0 top-0",
    "bg-gradient-to-r from-transparent to-background-neutral-light",
    "flex justify-end items-center pointer-events-none",
  ].join(" "),

  overflowBtn: [
    "size-6 flex items-center justify-center text-content-secondary",
    "cursor-pointer pointer-events-auto bg-transparent border-none p-0 rounded-sm",
    "transition-colors duration-fast hover:text-content-primary",
  ].join(" "),

  tab: [
    "flex items-center gap-2 pb-2 border-b-2 border-transparent",
    "cursor-pointer select-none flex-shrink-0 transition-colors duration-fast",
    "outline-none",
    "focus-visible:outline-2 focus-visible:outline-content-brand focus-visible:outline-offset-2 focus-visible:rounded-sm",
    // Default state
    "text-content-secondary",
    "[&_.tab-icon]:text-content-secondary",
    "hover:text-content-primary [&:hover_.tab-icon]:text-content-primary",
    // Selected state
    "selected:border-content-brand selected:text-content-brand",
    "[&.selected_.tab-icon]:text-content-brand",
    // Disabled state
    "disabled:cursor-not-allowed disabled:opacity-50",
    "disabled:hover:text-content-secondary",
  ].join(" "),

  tabInner: "flex items-center gap-2 p-1",

  tabIcon: "tab-icon size-icon-sm flex items-center justify-center flex-shrink-0 [&_svg]:w-full [&_svg]:h-full",

  tabLabel: "font-primary text-body-lg font-normal whitespace-nowrap transition-colors duration-fast",

  badge: [
    "flex items-center gap-1 py-0.5 px-1 rounded-sm",
    "font-primary text-body-md font-normal whitespace-nowrap",
    "transition-all duration-fast",
  ].join(" "),

  badgeDefault: "bg-background-neutral-lighter text-content-secondary outline outline-1 -outline-offset-1 outline-outline-neutral",

  badgeActive: "bg-content-brand text-background-white",
};

// ─────────────────────────────────────────────
// TAB COMPONENT
// ─────────────────────────────────────────────

/**
 * Tab
 *
 * A single tab item within a Tabs container.
 *
 * @param {string} id - Unique identifier for this tab
 * @param {boolean} isDisabled - Disables the tab
 * @param {ReactNode} icon - Icon element to display before the label
 * @param {string|number} badge - Badge content (e.g., count)
 * @param {ReactNode} children - Tab label text
 *
 * @example
 * <Tab id="overview">Overview</Tab>
 * <Tab id="details" badge={5}>Details</Tab>
 * <Tab id="settings" icon={<Icon name="Cog6Tooth" />}>Settings</Tab>
 */
export const Tab = ({
  id,
  isDisabled = false,
  disabled, // Support legacy prop
  icon,
  badge,
  className = "",
  children,
  ...props
}) => {
  return (
    <AriaTab
      id={id}
      isDisabled={isDisabled || disabled}
      className={({ isSelected, isDisabled }) =>
        cx(
          styles.tab,
          isSelected && "selected",
          isDisabled && "opacity-50 cursor-not-allowed",
          className
        )
      }
      {...props}
    >
      {({ isSelected }) => (
        <div className={styles.tabInner}>
          {icon && <span className={styles.tabIcon}>{icon}</span>}
          <span className={styles.tabLabel}>{children}</span>
          {badge !== undefined && badge !== null && (
            <span className={cx(styles.badge, isSelected ? styles.badgeActive : styles.badgeDefault)}>
              {badge}
            </span>
          )}
        </div>
      )}
    </AriaTab>
  );
};

Tab.displayName = "Tab";

// ─────────────────────────────────────────────
// TABS COMPONENT
// ─────────────────────────────────────────────

/**
 * Tabs
 *
 * A tab navigation container that manages active state.
 *
 * @param {string} selectedKey - Currently active tab key
 * @param {function} onSelectionChange - Called with new tab key when selection changes
 * @param {boolean} showOverflow - Show overflow indicator when tabs overflow (default: true)
 * @param {ReactNode} children - Tab components
 *
 * @example
 * const [tab, setTab] = useState('overview');
 *
 * <Tabs selectedKey={tab} onSelectionChange={setTab}>
 *   <Tab id="overview">Overview</Tab>
 *   <Tab id="details" badge={12}>Details</Tab>
 *   <Tab id="settings" icon={<Icon name="Cog6Tooth" />}>Settings</Tab>
 * </Tabs>
 */
export const Tabs = ({
  selectedKey,
  defaultSelectedKey,
  onSelectionChange,
  value, // Support legacy prop
  onChange, // Support legacy prop
  showOverflow = true,
  className = "",
  children,
  ...props
}) => {
  const listRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (listRef.current) {
        const { scrollWidth, clientWidth } = listRef.current;
        setHasOverflow(scrollWidth > clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [children]);

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  // Support legacy props
  const resolvedSelectedKey = selectedKey ?? value;
  const resolvedOnChange = onSelectionChange ?? onChange;

  return (
    <AriaTabs
      selectedKey={resolvedSelectedKey}
      defaultSelectedKey={defaultSelectedKey}
      onSelectionChange={resolvedOnChange}
      className={cx(styles.container, className)}
      {...props}
    >
      <AriaTabList ref={listRef} className={styles.list}>
        {children}
      </AriaTabList>
      {showOverflow && hasOverflow && (
        <div className={styles.overflowIndicator}>
          <button
            type="button"
            className={styles.overflowBtn}
            onClick={scrollRight}
            aria-label="Scroll tabs"
          >
            <Icon name="ChevronRight" size="sm" />
          </button>
        </div>
      )}
    </AriaTabs>
  );
};

Tabs.displayName = "Tabs";

// ─────────────────────────────────────────────
// TAB PANEL COMPONENT
// ─────────────────────────────────────────────

/**
 * TabPanel
 *
 * Content panel that displays when its associated tab is active.
 *
 * @param {string} id - Tab id this panel is associated with
 * @param {ReactNode} children - Panel content
 *
 * @example
 * <TabPanel id="overview">
 *   <p>Overview content</p>
 * </TabPanel>
 */
export const TabPanel = ({ id, className = "", children, ...props }) => {
  return (
    <AriaTabPanel id={id} className={className} {...props}>
      {children}
    </AriaTabPanel>
  );
};

TabPanel.displayName = "TabPanel";

export default Tabs;
