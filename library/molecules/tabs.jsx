/**
 * Tabs Component (Molecule)
 *
 * A tab navigation component with optional badges and icons.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * Token Mapping (from Figma):
 * - Grey50 (#5371AC) → --color-content-secondary
 * - Grey30 (#324467) → --color-action-content-secondary-hover
 * - Grey90 (#D9E0ED) → --color-action-outline-secondary-enabled
 * - Grey98 (#F8F9FC) → --color-general-neutral-lighter
 * - Grey100 (white) → --color-general-white
 * - Blue60 (#4649FF) → --color-content-brand
 *
 * @example
 * <Tabs selectedKey={tab} onSelectionChange={setTab}>
 *   <Tab id="overview">Overview</Tab>
 *   <Tab id="details" badge={12}>Details</Tab>
 *   <Tab id="settings" icon={<Icon name="Cog6Tooth" />}>Settings</Tab>
 * </Tabs>
 */

import { useState, useRef, useEffect, createContext, useContext } from "react";
import { ChevronRightIcon } from "@heroicons/react/16/solid";

// ─────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────

const TabsContext = createContext(null);

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  // Container with bottom border (Grey90)
  container: {
    position: "relative",
    width: "100%",
    borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 8,
  },

  // Tab list with 24px gap
  list: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    height: 36,
    overflowX: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },

  // Overflow indicator with gradient (Grey95 → transparent)
  overflowIndicator: {
    width: 40,
    height: 36,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 16,
    position: "absolute",
    right: 0,
    top: 0,
    background: "linear-gradient(90deg, rgba(239, 242, 249, 0) 0%, var(--color-general-neutral-light) 100%)",
    display: "inline-flex",
    justifyContent: "flex-end",
    alignItems: "center",
    pointerEvents: "none",
  },

  overflowBtn: {
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-secondary)",
    cursor: "pointer",
    pointerEvents: "auto",
    background: "transparent",
    border: "none",
    padding: 0,
    borderRadius: "var(--radius-sm)",
    transition: "color var(--transition-fast)",
  },

  overflowBtnHover: {
    color: "var(--color-content-primary)",
  },

  // Tab button base styles
  tab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    paddingBottom: 8,
    borderBottom: "2px solid transparent",
    cursor: "pointer",
    userSelect: "none",
    flexShrink: 0,
    transition: "border-color var(--transition-fast)",
    outline: "none",
    background: "transparent",
    border: "none",
    borderRadius: 0,
    fontFamily: "var(--font-family-primary)",
  },

  // Tab inner container
  tabInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    padding: 4,
    borderRadius: 8,
    transition: "background var(--transition-fast)",
  },

  // Tab inner hover state (Grey98 background)
  tabInnerHover: {
    background: "var(--color-general-neutral-lighter)",
  },

  // Tab icon
  tabIcon: {
    width: 16,
    height: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "color var(--transition-fast)",
  },

  // Tab label - Default state (Grey50)
  tabLabel: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-lg)",
    whiteSpace: "nowrap",
    color: "var(--color-content-secondary)",
    transition: "color var(--transition-fast)",
  },

  // Tab label - Hover state (Grey30)
  tabLabelHover: {
    color: "var(--color-action-content-secondary-hover)",
  },

  // Tab label - Active/Selected state (Blue60)
  tabLabelSelected: {
    color: "var(--color-content-brand)",
  },

  // Tab selected border (Blue60)
  tabSelected: {
    borderBottomColor: "var(--color-content-brand)",
  },

  // Tab disabled state
  tabDisabled: {
    cursor: "not-allowed",
    opacity: 0.5,
  },

  // Badge base styles
  badge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 4,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: "var(--radius-sm)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-md)",
    whiteSpace: "nowrap",
    transition: "all var(--transition-fast)",
  },

  // Badge default state (Grey98 background, Grey90 outline, Grey50 text)
  badgeDefault: {
    background: "var(--color-general-neutral-lighter)",
    color: "var(--color-content-secondary)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: -1,
  },

  // Badge active state (Blue60 background, white text, no outline)
  badgeActive: {
    background: "var(--color-content-brand)",
    color: "var(--color-general-white)",
    outline: "none",
  },

  // Tab panel
  panel: {
    padding: "16px 0",
  },
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
 * @param {object} style - Additional inline styles
 */
export const Tab = ({
  id,
  isDisabled = false,
  disabled,
  icon,
  badge,
  style,
  children,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const context = useContext(TabsContext);

  const isTabDisabled = isDisabled || disabled;
  const isSelected = context?.selectedKey === id;

  const handleClick = () => {
    if (isTabDisabled) return;
    context?.onSelectionChange?.(id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  // Compose tab button styles
  const tabStyle = {
    ...styles.tab,
    ...(isSelected && styles.tabSelected),
    ...(isTabDisabled && styles.tabDisabled),
    ...style,
  };

  // Tab inner styles (hover shows Grey98 background)
  const tabInnerStyle = {
    ...styles.tabInner,
    ...(isHovered && !isTabDisabled && !isSelected && styles.tabInnerHover),
  };

  // Tab label styles based on state
  const tabLabelStyle = {
    ...styles.tabLabel,
    ...(isHovered && !isTabDisabled && !isSelected && styles.tabLabelHover),
    ...(isSelected && styles.tabLabelSelected),
  };

  // Icon color based on state
  const iconStyle = {
    ...styles.tabIcon,
    color: isSelected
      ? "var(--color-content-brand)"
      : isHovered && !isTabDisabled
      ? "var(--color-action-content-secondary-hover)"
      : "var(--color-content-secondary)",
  };

  // Badge styles - active when tab is selected
  const badgeStyle = {
    ...styles.badge,
    ...(isSelected ? styles.badgeActive : styles.badgeDefault),
  };

  return (
    <button
      type="button"
      role="tab"
      id={`tab-${id}`}
      aria-selected={isSelected}
      aria-controls={`tabpanel-${id}`}
      tabIndex={isSelected ? 0 : -1}
      disabled={isTabDisabled}
      style={tabStyle}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div style={tabInnerStyle}>
        {icon && <span style={iconStyle}>{icon}</span>}
        <span style={tabLabelStyle}>{children}</span>
        {badge !== undefined && badge !== null && (
          <span style={badgeStyle}>{badge}</span>
        )}
      </div>
    </button>
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
 * @param {string} defaultSelectedKey - Initial selected key (uncontrolled)
 * @param {function} onSelectionChange - Called with new tab key when selection changes
 * @param {boolean} showOverflow - Show overflow indicator when tabs overflow (default: true)
 * @param {ReactNode} children - Tab components
 * @param {object} style - Additional inline styles
 */
export const Tabs = ({
  selectedKey,
  defaultSelectedKey,
  onSelectionChange,
  value, // Support legacy prop
  onChange, // Support legacy prop
  showOverflow = true,
  style,
  children,
  ...props
}) => {
  const listRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [overflowHovered, setOverflowHovered] = useState(false);
  const [internalSelected, setInternalSelected] = useState(defaultSelectedKey);

  // Support legacy props and controlled/uncontrolled modes
  const isControlled = selectedKey !== undefined || value !== undefined;
  const resolvedSelectedKey = selectedKey ?? value ?? internalSelected;
  const resolvedOnChange = onSelectionChange ?? onChange;

  const handleSelectionChange = (key) => {
    if (!isControlled) {
      setInternalSelected(key);
    }
    resolvedOnChange?.(key);
  };

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

  // Container styles
  const containerStyle = {
    ...styles.container,
    ...style,
  };

  // Overflow button styles
  const overflowBtnStyle = {
    ...styles.overflowBtn,
    ...(overflowHovered && styles.overflowBtnHover),
  };

  return (
    <TabsContext.Provider
      value={{
        selectedKey: resolvedSelectedKey,
        onSelectionChange: handleSelectionChange,
      }}
    >
      <div style={containerStyle} {...props}>
        <div ref={listRef} role="tablist" style={styles.list}>
          {children}
        </div>

        {showOverflow && hasOverflow && (
          <div style={styles.overflowIndicator}>
            <button
              type="button"
              style={overflowBtnStyle}
              onClick={scrollRight}
              onMouseEnter={() => setOverflowHovered(true)}
              onMouseLeave={() => setOverflowHovered(false)}
              aria-label="Scroll tabs"
            >
              <ChevronRightIcon style={{ width: 16, height: 16 }} />
            </button>
          </div>
        )}
      </div>
    </TabsContext.Provider>
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
 * @param {object} style - Additional inline styles
 */
export const TabPanel = ({ id, style, children, ...props }) => {
  const context = useContext(TabsContext);
  const isSelected = context?.selectedKey === id;

  if (!isSelected) return null;

  const panelStyle = {
    ...styles.panel,
    ...style,
  };

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${id}`}
      aria-labelledby={`tab-${id}`}
      tabIndex={0}
      style={panelStyle}
      {...props}
    >
      {children}
    </div>
  );
};

TabPanel.displayName = "TabPanel";

export default Tabs;
