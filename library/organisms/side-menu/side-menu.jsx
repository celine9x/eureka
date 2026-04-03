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

import { useState } from "react";
import { Icon } from "../../atoms/icon.jsx";
import { Button } from "../../atoms/button.jsx";
import { SideMenuItem } from "./side-menu-item.jsx";
import { UserButton } from "./user-button.jsx";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

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
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    background: "var(--color-general-white)",
    borderRight: "1px solid var(--color-action-outline-secondary-enabled)",
    height: "100%",
    boxSizing: "border-box",
    overflow: "hidden",
    transition: "width var(--transition-normal)",
  },

  // Top section (logo + search + menu sections)
  topWrapper: {
    alignSelf: "stretch",
    paddingTop: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 16,
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
    fontSize: 12,
    fontFamily: "var(--font-family-primary)",
    fontWeight: 400,
    lineHeight: "16px",
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
    fontSize: 10,
    fontFamily: "var(--font-family-primary)",
    fontWeight: 600,
    textTransform: "uppercase",
    lineHeight: "12px",
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
    boxShadow: "0px 1px 1px rgba(83, 113, 172, 0.15), 0px 1px 3px rgba(83, 113, 172, 0.20)",
    borderRadius: 8,
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
    fontSize: 12,
    fontFamily: "var(--font-family-primary)",
    fontWeight: 400,
    lineHeight: "16px",
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
 * @param {string} variant - expanded | collapsed (default: collapsed)
 * @param {boolean} expandOnHover - Expand menu on hover (default: true)
 * @param {ReactNode} logo - Logo element or image
 * @param {string} logoSrc - Logo image URL (alternative to logo prop)
 * @param {string} logoAlt - Logo alt text
 * @param {boolean} showSearch - Show search input (default: true)
 * @param {string} searchPlaceholder - Search placeholder text (default: "Quick search")
 * @param {function} onSearchClick - Search click handler
 * @param {Array} sections - Array of section objects with title and items
 * @param {string} createButtonLabel - Create button label (default: "Create")
 * @param {function} onCreateClick - Create button click handler
 * @param {object} user - User object with name, email, avatarSrc
 * @param {function} onUserClick - User button click handler
 * @param {object} style - Additional inline styles
 */
export const SideMenu = ({
  variant = SIDE_MENU_VARIANTS.collapsed,
  expandOnHover = true,
  logo,
  logoSrc,
  logoAlt = "Logo",
  showSearch = true,
  searchPlaceholder = "Quick search",
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
  const [searchHovered, setSearchHovered] = useState(false);
  const [createHovered, setCreateHovered] = useState(false);

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

  // Search input styles
  const searchInputStyle = {
    ...styles.searchInput,
    ...(searchHovered && styles.searchInputHover),
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
      return (
        <img
          src={logoSrc}
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
        <button
          type="button"
          style={searchInputStyle}
          onClick={onSearchClick}
          onMouseEnter={() => setSearchHovered(true)}
          onMouseLeave={() => setSearchHovered(false)}
        >
          <div style={styles.searchContent}>
            <span style={styles.searchIcon}>
              <MagnifyingGlassIcon style={{ width: 16, height: 16 }} />
            </span>
            {!isCollapsed && (
              <span style={styles.searchPlaceholder}>{searchPlaceholder}</span>
            )}
          </div>
        </button>
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
          {section.items?.map((item, itemIndex) => (
            <SideMenuItem
              key={itemIndex}
              state={item.state || "enabled"}
              showIcon={item.showIcon !== false}
              showLabel={!isCollapsed && item.showLabel !== false}
              showBadge={item.showBadge || false}
              icon={item.icon}
              iconName={item.iconName}
              iconColor={item.iconColor}
              iconLetter={item.iconLetter}
              label={item.label}
              badgeLabel={item.badgeLabel}
              onClick={item.onClick}
            />
          ))}
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
        {/* Logo and Search */}
        <div style={logoSearchAreaStyle}>
          <div style={styles.logoContainer}>
            {renderLogo()}
          </div>
          {renderSearch()}
        </div>

        {/* Menu Sections */}
        {renderSections()}
      </div>

      {/* Footer Section: Create Button + User */}
      <div style={styles.footer}>
        {/* Create Button */}
        <div style={footerContentStyle}>
          {renderCreateButton()}
        </div>

        {/* Divider */}
        <div style={styles.divider} />

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
