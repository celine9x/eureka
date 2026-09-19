"use client";

/**
 * Subinfo Component (Molecule)
 *
 * A flexible info display component for showing various types of data.
 * Supports multiple variants: label, chip, button, avatar, icon-text, links, chips.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <Subinfo iconName="User">John Doe</Subinfo>
 * <Subinfo variant="avatar" initials="JD" href="/user/1">John Doe</Subinfo>
 */

import React, { useState } from "react";
import { Icon } from "../atoms/icon.jsx";
import { Badge } from "../atoms/badge.jsx";
import { Button } from "../atoms/button.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const SUBINFO_VARIANTS = {
  label: "label",
  value: "value",
  avatar: "avatar",
  list: "list",
  chips: "chips",
  status: "status",
  links: "links",
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  base: {
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "stretch",
    minWidth: 120,
    maxWidth: 250,
    paddingLeft: 8,
  },

  bordered: {
    paddingLeft: 8,
    paddingRight: 16,
    borderRight: "1px solid var(--color-action-outline-secondary-enabled)",
  },

  fullWidth: {
    maxWidth: "none",
    flex: 1,
  },

  label: {
    color: "var(--color-content-tertiary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-md)",
  },

  value: {
    display: "inline-flex",
    alignItems: "flex-start",
    gap: 4,
    alignSelf: "stretch",
  },

  valueText: {
    flex: 1,
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-md)",
  },

  valueLink: {
    flex: 1,
    color: "var(--color-content-brand)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-md)",
    textDecoration: "none",
    cursor: "pointer",
  },

  valueLinkHover: {
    textDecoration: "underline",
  },

  valueIcon: {
    flexShrink: 0,
    width: 16,
    height: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-secondary)",
  },

  avatar: {
    width: 16,
    height: 16,
    flexShrink: 0,
    borderRadius: "var(--radius-full)",
    background: "var(--color-general-informative)",
    outline: "0.5px solid var(--color-general-white)",
    outlineOffset: "-0.5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "var(--color-action-fill-primary-enabled)",
    fontFamily: "var(--font-family-primary)",
    fontSize: 8,
    fontWeight: "var(--font-weight-bold)",
    lineHeight: "var(--line-height-body-overline)",
    textTransform: "uppercase",
    textAlign: "center",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: "100%",
  },

  listItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    width: "100%",
  },

  listItemIcon: {
    flexShrink: 0,
    width: 16,
    height: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-secondary)",
  },

  listItemText: {
    flex: 1,
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-md)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  listFooter: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },

  listFooterContent: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },

  chips: {
    display: "inline-flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    alignContent: "flex-start",
    gap: 4,
    alignSelf: "stretch",
  },

  // Status variant
  status: {
    display: "inline-flex",
    alignItems: "center",
  },

  // Links variant
  links: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
    width: "100%",
  },

  linkItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
  },

  linkIcon: {
    flexShrink: 0,
    width: 16,
    height: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-secondary)",
  },

  linkText: {
    color: "var(--color-content-brand)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-md)",
    textDecoration: "none",
    cursor: "pointer",
  },

  linkTextHover: {
    textDecoration: "underline",
  },
};

// ─────────────────────────────────────────────
// SUBINFO AVATAR
// ─────────────────────────────────────────────

/**
 * SubinfoAvatar
 *
 * Small avatar with initials.
 *
 */
export const SubinfoAvatar = ({ initials, style }) => {
  return (
    <div style={{ ...styles.avatar, ...style }}>
      <span style={styles.avatarText}>{initials}</span>
    </div>
  );
};

SubinfoAvatar.displayName = "SubinfoAvatar";

// ─────────────────────────────────────────────
// SUBINFO LIST ITEM
// ─────────────────────────────────────────────

/**
 * SubinfoListItem
 *
 * A single item in a subinfo list.
 *
 */
export const SubinfoListItem = ({
  icon,
  iconName,
  truncate = true,
  style,
  children,
}) => {
  const iconElement = icon || (iconName ? <Icon name={iconName} size="sm" /> : null);
  const textStyle = truncate ? {} : { whiteSpace: "normal" };

  return (
    <div style={{ ...styles.listItem, ...style }}>
      {iconElement && <span style={styles.listItemIcon}>{iconElement}</span>}
      <span style={{ ...styles.listItemText, ...textStyle }}>{children}</span>
    </div>
  );
};

SubinfoListItem.displayName = "SubinfoListItem";

// ─────────────────────────────────────────────
// SUBINFO LINK ITEM
// ─────────────────────────────────────────────

/**
 * SubinfoLinkItem
 *
 * A single link item for the links variant.
 *
 */
export const SubinfoLinkItem = ({
  icon,
  iconName,
  href,
  onClick,
  style,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const iconElement = icon || (iconName ? <Icon name={iconName} size="sm" /> : null);

  const linkStyle = {
    ...styles.linkText,
    ...(isHovered && styles.linkTextHover),
  };

  return (
    <div style={{ ...styles.linkItem, ...style }}>
      {iconElement && <span style={styles.linkIcon}>{iconElement}</span>}
      <a
        href={href}
        onClick={onClick}
        style={linkStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </a>
    </div>
  );
};

SubinfoLinkItem.displayName = "SubinfoLinkItem";

// ─────────────────────────────────────────────
// SUBINFO COMPONENT
// ─────────────────────────────────────────────

/**
 * Subinfo
 *
 * A flexible info display component for showing various types of data.
 *
 */
export const Subinfo = ({
  variant = SUBINFO_VARIANTS.value,
  bordered = true,
  fullWidth = false,
  label,
  icon,
  iconName,
  href,
  onClick,
  initials,
  items = [],
  maxItems = 5,
  // Status variant props
  statusIcon,
  statusIconName,
  style,
  children,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle = {
    ...styles.base,
    ...(bordered && styles.bordered),
    ...(fullWidth && styles.fullWidth),
    ...style,
  };

  const iconElement = icon || (iconName ? <Icon name={iconName} size="sm" /> : null);

  // Label variant
  if (variant === "label") {
    return (
      <div style={baseStyle} {...props}>
        <span style={styles.label}>{children || label}</span>
      </div>
    );
  }

  // Avatar variant
  if (variant === "avatar") {
    const isLink = href || onClick;
    const linkStyle = {
      ...styles.valueLink,
      ...(isHovered && styles.valueLinkHover),
    };

    return (
      <div style={baseStyle} {...props}>
        <div style={styles.value}>
          {initials && <SubinfoAvatar initials={initials} />}
          {isLink ? (
            <a
              href={href}
              onClick={onClick}
              style={linkStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {children}
            </a>
          ) : (
            <span style={styles.valueText}>{children}</span>
          )}
        </div>
      </div>
    );
  }

  // List variant
  if (variant === "list") {
    const visibleItems = items.slice(0, maxItems);
    const remainingCount = items.length - maxItems;
    const hasMore = remainingCount > 0;

    return (
      <div style={baseStyle} {...props}>
        <div style={styles.list}>
          {visibleItems.map((item, index) => {
            const isLast = index === visibleItems.length - 1 && hasMore;

            if (isLast) {
              return (
                <div key={index} style={styles.listFooter}>
                  <div style={styles.listFooterContent}>
                    <SubinfoListItem
                      icon={item.icon}
                      iconName={item.iconName}
                    >
                      {item.text}
                    </SubinfoListItem>
                  </div>
                  <Badge size="xs">+{remainingCount}</Badge>
                </div>
              );
            }

            return (
              <SubinfoListItem
                key={index}
                icon={item.icon}
                iconName={item.iconName}
              >
                {item.text}
              </SubinfoListItem>
            );
          })}
        </div>
      </div>
    );
  }

  // Chips variant
  if (variant === "chips") {
    return (
      <div style={baseStyle} {...props}>
        <div style={styles.chips}>{children}</div>
      </div>
    );
  }

  // Status variant - button with icon, label, and chevron down
  if (variant === "status") {
    const statusIconElement = statusIcon || (statusIconName ? <Icon name={statusIconName} size="sm" /> : null);
    return (
      <div style={baseStyle} {...props}>
        <div style={styles.status}>
          <Button
            variant="secondary"
            size="sm"
            iconLeading={statusIconElement}
            iconTrailing={<Icon name="ChevronDown" size="sm" />}
            onClick={onClick}
          >
            {children || label}
          </Button>
        </div>
      </div>
    );
  }

  // Links variant - flex column of links with icons
  if (variant === "links") {
    return (
      <div style={baseStyle} {...props}>
        <div style={styles.links}>
          {items.map((item, index) => (
            <SubinfoLinkItem
              key={index}
              icon={item.icon}
              iconName={item.iconName}
              href={item.href}
              onClick={item.onClick}
            >
              {item.text || item.title}
            </SubinfoLinkItem>
          ))}
        </div>
      </div>
    );
  }

  // Default: value variant
  const isLink = href || onClick;
  const linkStyle = {
    ...styles.valueLink,
    ...(isHovered && styles.valueLinkHover),
  };

  return (
    <div style={baseStyle} {...props}>
      <div style={styles.value}>
        {iconElement && <span style={styles.valueIcon}>{iconElement}</span>}
        {isLink ? (
          <a
            href={href}
            onClick={onClick}
            style={linkStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {children}
          </a>
        ) : (
          <span style={styles.valueText}>{children}</span>
        )}
      </div>
    </div>
  );
};

Subinfo.displayName = "Subinfo";
Subinfo.variants = SUBINFO_VARIANTS;

// Sub-components
Subinfo.Avatar = SubinfoAvatar;
Subinfo.ListItem = SubinfoListItem;
Subinfo.LinkItem = SubinfoLinkItem;

export default Subinfo;
