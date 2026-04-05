"use client";

/**
 * SideMenu Component
 *
 * A complete sidebar navigation with logo, search, menu sections,
 * action button, and user profile.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <SideMenu
 *   logoSrc="/logo.png"
 *   sections={[
 *     { items: [{ label: "Home", iconName: "Home", state: "active" }] },
 *     { title: "Workspace", items: [{ label: "Initiatives", iconName: "Folder" }] }
 *   ]}
 *   user={{ name: "Emma Dupont", email: "emma@example.com" }}
 * />
 */

import { useEffect, useMemo, useState } from "react";
import { Icon } from "../../atoms/icon.jsx";
import { Search } from "../../molecules/search.jsx";
import { SideMenuItem } from "./side-menu-item.jsx";
import { UserButton } from "./user-button.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const SIDE_MENU_VARIANTS = {
  expanded: "expanded",
  collapsed: "collapsed",
};

const EXPANDED_WIDTH = 250;
const COLLAPSED_WIDTH = 80;

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  // Main container
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    background: "var(--color-general-white)",
    borderRight: "1px solid var(--color-action-outline-secondary-enabled)",
    height: "100vh",
    boxSizing: "border-box",
    overflow: "hidden",
    transition: "width var(--transition-normal)",
    zIndex: 100,
  },

  // Top section (logo + search + menu sections)
  topWrapper: {
    flex: 1,
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflow: "hidden",
    minHeight: 0,
  },

  // Fixed header area (logo + search)
  headerArea: {
    alignSelf: "stretch",
    paddingTop: 24,
    paddingBottom: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 16,
    flexShrink: 0,
  },

  // Scrollable sections area
  scrollableArea: {
    flex: 1,
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 16,
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    minHeight: 0,
  },

  // Logo and search area
  logoSearchArea: {
    alignSelf: "stretch",
    paddingLeft: 24,
    paddingRight: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 16,
  },

  logoSearchAreaCollapsed: {
    alignItems: "center",
  },

  // Logo container
  logoContainer: {
    paddingLeft: 4,
    paddingRight: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
  },

  logo: {
    width: 130,
    height: 40,
    position: "relative",
  },

  logoCollapsed: {
    width: 26,
    height: 26,
  },

  // Search input styles
  searchWrapper: {
    alignSelf: "stretch",
    height: 32,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 8,
  },

  searchInput: {
    alignSelf: "stretch",
    flex: 1,
    padding: 8,
    background: "var(--color-general-neutral-lighter)",
    borderRadius: 40,
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    display: "inline-flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "none",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
  },

  searchInputHover: {
    outlineColor: "var(--color-interaction-outline-hover)",
  },

  searchInputFocus: {
    outlineColor: "var(--color-interaction-outline-active)",
    boxShadow: "var(--shadow-focus)",
    background: "var(--color-interaction-fill-enabled)",
  },

  searchContent: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
  },

  searchIcon: {
    width: 16,
    height: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-secondary)",
    flexShrink: 0,
  },

  searchPlaceholder: {
    flex: 1,
    color: "var(--color-content-secondary)",
    fontSize: "var(--text-body-md)",
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-md)",
    wordWrap: "break-word",
  },

  // Menu sections container
  sectionsWrapper: {
    alignSelf: "stretch",
    paddingRight: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 8,
  },

  // Section header
  sectionHeader: {
    alignSelf: "stretch",
    paddingLeft: 24,
    paddingRight: 24,
    display: "inline-flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 8,
  },

  sectionHeaderCollapsed: {
    height: 12,
  },

  sectionTitle: {
    color: "var(--color-content-secondary)",
    fontSize: "var(--text-body-overline)",
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-semibold)",
    textTransform: "uppercase",
    lineHeight: "var(--line-height-body-overline)",
    wordWrap: "break-word",
  },

  // Divider
  dividerWrapper: {
    alignSelf: "stretch",
    paddingLeft: 24,
    paddingRight: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 8,
  },

  divider: {
    alignSelf: "stretch",
    height: 1,
    background: "var(--color-action-outline-secondary-enabled)",
  },

  // Footer section
  footer: {
    alignSelf: "stretch",
    paddingTop: 16,
    paddingBottom: 16,
    background: "var(--color-general-white)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 16,
    flexShrink: 0,
    borderTop: "1px solid var(--color-action-outline-secondary-enabled)",
  },

  footerContent: {
    alignSelf: "stretch",
    paddingLeft: 24,
    paddingRight: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 8,
  },

  footerContentCollapsed: {
    justifyContent: "center",
    alignItems: "center",
  },

  // Create button
  createButton: {
    alignSelf: "stretch",
    height: 32,
    paddingLeft: 8,
    paddingRight: 8,
    background: "var(--color-action-fill-primary-enabled)",
    boxShadow: "var(--shadow-button-enabled)",
    borderRadius: "var(--radius-sm)",
    display: "inline-flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
    border: "none",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
  },

  createButtonHover: {
    background: "var(--color-action-fill-primary-hover)",
  },

  createButtonIcon: {
    width: 16,
    height: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-general-white)",
  },

  createButtonLabel: {
    color: "var(--color-general-white)",
    fontSize: "var(--text-body-md)",
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-md)",
    wordWrap: "break-word",
  },

  // User section
  userWrapper: {
    alignSelf: "stretch",
    paddingLeft: 24,
    paddingRight: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 8,
  },

  userWrapperCollapsed: {
    justifyContent: "center",
    alignItems: "center",
  },
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

/**
 * SideMenu
 *
 */
export const SideMenu = ({
  variant = SIDE_MENU_VARIANTS.collapsed,
  expandOnHover = true,
  interactiveItems = true,
  activeItemId,
  defaultActiveItemId,
  onActiveItemChange,
  logo,
  logoSrc,
  collapsedLogoSrc,
  logoAlt = "Logo",
  showSearch = true,
  searchPlaceholder = "Quick search",
  searchValue,
  onSearchChange,
  onSearchClick,
  sections = [],
  createButtonLabel = "Create",
  onCreateClick,
  user,
  onUserClick,
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [createHovered, setCreateHovered] = useState(false);

  const fallbackActiveItemId = useMemo(() => {
    for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex += 1) {
      const items = sections[sectionIndex]?.items || [];
      for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
        const item = items[itemIndex];
        if (item?.state === "active") {
          return item.id || item.key || `${sectionIndex}-${itemIndex}`;
        }
      }
    }
    return undefined;
  }, [sections]);

  const [internalActiveItemId, setInternalActiveItemId] = useState(
    defaultActiveItemId ?? fallbackActiveItemId
  );

  const isActiveItemControlled = activeItemId !== undefined;
  const resolvedActiveItemId = isActiveItemControlled ? activeItemId : internalActiveItemId;

  useEffect(() => {
    if (isActiveItemControlled || !interactiveItems) return;

    if (defaultActiveItemId !== undefined) {
      setInternalActiveItemId(defaultActiveItemId);
      return;
    }

    if (internalActiveItemId === undefined && fallbackActiveItemId !== undefined) {
      setInternalActiveItemId(fallbackActiveItemId);
    }
  }, [
    defaultActiveItemId,
    fallbackActiveItemId,
    internalActiveItemId,
    interactiveItems,
    isActiveItemControlled,
  ]);

  // Determine if collapsed based on variant and hover state
  const isCollapsed = expandOnHover
    ? (variant === "collapsed" && !isHovered)
    : variant === "collapsed";

  // Compose container styles
  const containerStyle = {
    ...styles.container,
    width: isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
    ...style,
  };

  // Logo/search area styles
  const logoSearchAreaStyle = {
    ...styles.logoSearchArea,
    ...(isCollapsed && styles.logoSearchAreaCollapsed),
  };

  // Footer content styles
  const footerContentStyle = {
    ...styles.footerContent,
    ...(isCollapsed && styles.footerContentCollapsed),
  };

  // User wrapper styles
  const userWrapperStyle = {
    ...styles.userWrapper,
    ...(isCollapsed && styles.userWrapperCollapsed),
  };

  // Create button styles
  const createButtonStyle = {
    ...styles.createButton,
    ...(createHovered && styles.createButtonHover),
  };

  // Render logo
  const renderLogo = () => {
    if (logo) return logo;
    if (logoSrc) {
      const resolvedLogoSrc = isCollapsed && collapsedLogoSrc ? collapsedLogoSrc : logoSrc;
      return (
        <img
          src={resolvedLogoSrc}
          alt={logoAlt}
          style={isCollapsed ? styles.logoCollapsed : styles.logo}
        />
      );
    }
    // Default logo placeholder
    return (
      <div style={{ ...styles.logo, background: "var(--color-content-primary)" }} />
    );
  };

  // Render search
  const renderSearch = () => {
    if (!showSearch) return null;
    return (
      <div style={styles.searchWrapper}>
        <Search
          size="md"
          collapsed={isCollapsed}
          placeholder={searchPlaceholder}
          value={onSearchChange ? (searchValue || "") : undefined}
          onChange={onSearchChange}
          onClick={!onSearchChange ? onSearchClick : undefined}
          showClear={Boolean(onSearchChange) && !isCollapsed}
          aria-label={searchPlaceholder}
        />
      </div>
    );
  };

  // Render sections
  const renderSections = () => {
    return sections.map((section, sectionIndex) => (
      <div key={sectionIndex} style={{ alignSelf: "stretch", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Divider before section */}
        {section.dividerBefore && (
          <div style={styles.dividerWrapper}>
            <div style={styles.divider} />
          </div>
        )}

        {/* Section with items */}
        <div style={styles.sectionsWrapper}>
          {/* Section header */}
          {section.title && (
            <div style={{ ...styles.sectionHeader, ...(isCollapsed && styles.sectionHeaderCollapsed) }}>
              {!isCollapsed && (
                <span style={styles.sectionTitle}>{section.title}</span>
              )}
            </div>
          )}

          {/* Menu items */}
          {section.items?.map((item, itemIndex) => {
            const itemId = item.id || item.key || `${sectionIndex}-${itemIndex}`;
            const isItemActive = interactiveItems
              ? resolvedActiveItemId !== undefined
                ? resolvedActiveItemId === itemId
                : item.state === "active"
              : item.state === "active";

            const itemState = isItemActive ? "active" : item.state === "active" ? "enabled" : (item.state || "enabled");

            const handleItemClick = (event) => {
              if (interactiveItems) {
                if (!isActiveItemControlled) {
                  setInternalActiveItemId(itemId);
                }
                onActiveItemChange?.(itemId, item, { sectionIndex, itemIndex, event });
              }

              item.onClick?.(event);
            };

            return (
              <SideMenuItem
                key={itemId}
                state={itemState}
                showIcon={item.showIcon !== false}
                showLabel={!isCollapsed && item.showLabel !== false}
                showBadge={item.showBadge || false}
                icon={item.icon}
                iconName={item.iconName}
                iconColor={item.iconColor}
                iconLetter={item.iconLetter}
                label={item.label}
                badgeLabel={item.badgeLabel}
                onClick={handleItemClick}
              />
            );
          })}
        </div>

        {/* Divider after section */}
        {section.dividerAfter && (
          <div style={styles.dividerWrapper}>
            <div style={styles.divider} />
          </div>
        )}
      </div>
    ));
  };

  // Render create button
  const renderCreateButton = () => {
    if (!onCreateClick) return null;

    return (
      <button
        type="button"
        style={createButtonStyle}
        onClick={onCreateClick}
        onMouseEnter={() => setCreateHovered(true)}
        onMouseLeave={() => setCreateHovered(false)}
      >
        <span style={styles.createButtonIcon}>
          <Icon name="PlusCircle" variant="solid" size="sm" style={{ color: "inherit", width: 16, height: 16 }} />
        </span>
        {!isCollapsed && (
          <span style={styles.createButtonLabel}>{createButtonLabel}</span>
        )}
      </button>
    );
  };

  // Render user button
  const renderUserButton = () => {
    if (!user) return null;

    return (
      <UserButton
        name={user.name}
        email={user.email}
        avatarSrc={user.avatarSrc}
        avatarInitials={user.avatarInitials}
        showEmail={!isCollapsed && user.showEmail !== false}
        showChevron={!isCollapsed}
        collapsed={isCollapsed}
        onClick={onUserClick}
      />
    );
  };

  return (
    <nav
      style={containerStyle}
      onMouseEnter={() => expandOnHover && setIsHovered(true)}
      onMouseLeave={() => expandOnHover && setIsHovered(false)}
      {...props}
    >
      {/* Top Section: Logo, Search, Menu Sections */}
      <div style={styles.topWrapper}>
        {/* Fixed Header: Logo and Search */}
        <div style={styles.headerArea}>
          <div style={logoSearchAreaStyle}>
            <div style={styles.logoContainer}>
              {renderLogo()}
            </div>
            {renderSearch()}
          </div>
        </div>

        {/* Scrollable Menu Sections */}
        <div className="side-menu-scrollable" style={styles.scrollableArea}>
          {renderSections()}
        </div>
      </div>

      {/* Footer Section: Create Button + User */}
      <div style={styles.footer}>
        {/* Create Button */}
        <div style={footerContentStyle}>
          {renderCreateButton()}
        </div>

        {/* User Button */}
        <div style={userWrapperStyle}>
          {renderUserButton()}
        </div>
      </div>
    </nav>
  );
};

SideMenu.displayName = "SideMenu";
SideMenu.variants = SIDE_MENU_VARIANTS;

// ─────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────

export { SideMenuItem } from "./side-menu-item.jsx";
export { UserButton } from "./user-button.jsx";
export default SideMenu;
