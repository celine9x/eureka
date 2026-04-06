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

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const SUBINFO_VARIANTS = {
  label: "label",
  value: "value",
  avatar: "avatar",
  list: "list",
  chips: "chips",
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

  listItemLink: {
    flex: 1,
    color: "var(--color-content-brand)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-md)",
    textDecoration: "none",
    cursor: "pointer",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  listItemLinkHover: {
    textDecoration: "underline",
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
  href,
  onClick,
  truncate = true,
  style,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const iconElement = icon || (iconName ? <Icon name={iconName} size="sm" /> : null);
  const isLink = href || onClick;

  const textStyle = truncate ? {} : { whiteSpace: "normal" };

  const linkStyle = {
    ...styles.listItemLink,
    ...textStyle,
    ...(isHovered && styles.listItemLinkHover),
  };

  return (
    <div style={{ ...styles.listItem, ...style }}>
      {iconElement && <span style={styles.listItemIcon}>{iconElement}</span>}
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
        <span style={{ ...styles.listItemText, ...textStyle }}>{children}</span>
      )}
    </div>
  );
};

SubinfoListItem.displayName = "SubinfoListItem";

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
                      href={item.href}
                      onClick={item.onClick}
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
                href={item.href}
                onClick={item.onClick}
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

export default Subinfo;
