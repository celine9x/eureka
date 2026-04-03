/**
 * Subinfo Component (Molecule)
 *
 * A flexible info display component for showing various types of data.
 * Supports multiple variants: label, chip, button, avatar, icon-text, links, chips.
 * Uses design tokens from tokens.css.
 */

import React from "react";
import { createStyleInjector, cx } from "../utils/styles.js";
import { Icon } from "../atoms/icon.jsx";
import { Badge } from "../atoms/badge.jsx";
import { Chip } from "../atoms/chip.jsx";
import { Link } from "../atoms/link.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

/** Subinfo variants */
export const SUBINFO_VARIANTS = {
  label: "label",
  value: "value",
  avatar: "avatar",
  list: "list",
  chips: "chips",
};

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  base: `
    .subinfo {
      display: inline-flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      align-self: stretch;
      min-width: 120px;
      max-width: 250px;
       padding-left: var(--spacing-2);
    }
    .subinfo--bordered {
     padding-left: var(--spacing-2);
      padding-right: var(--spacing-4);
      border-right: 1px solid var(--color-outline-neutral);
    }
    .subinfo--full-width {
      max-width: none;
      flex: 1;
    }
  `,

  label: `
    .subinfo-label {
      color: var(--color-content-tertiary);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-body-md);
    }
  `,

  value: `
    .subinfo-value {
      display: inline-flex;
      align-items: flex-start;
      gap: var(--spacing-1);
      align-self: stretch;
    }
    .subinfo-value-text {
      flex: 1;
      color: var(--color-content-primary);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-body-md);
    }
    .subinfo-value-link {
      flex: 1;
      color: var(--color-content-brand);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-body-md);
      text-decoration: none;
      cursor: pointer;
    }
    .subinfo-value-link:hover {
      text-decoration: underline;
    }
    .subinfo-value-icon {
      flex-shrink: 0;
      width: var(--size-icon-sm);
      height: var(--size-icon-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-content-secondary);
    }
    .subinfo-value-icon svg {
      width: 100%;
      height: 100%;
    }
  `,

  avatar: `
    .subinfo-avatar {
      width: var(--size-icon-sm);
      height: var(--size-icon-sm);
      flex-shrink: 0;
      border-radius: var(--radius-full);
      background: var(--color-primary-50);
      outline: 0.5px solid var(--color-background-white);
      outline-offset: -0.5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .subinfo-avatar-text {
      color: var(--color-primary-400);
      font-family: var(--font-family-primary);
      font-size: 8px;
      font-weight: var(--font-weight-bold);
      line-height: 12px;
      text-transform: uppercase;
      text-align: center;
    }
  `,

  list: `
    .subinfo-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
      width: 100%;
    }
    .subinfo-list-item {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-1);
      width: 100%;
    }
    .subinfo-list-item-icon {
      flex-shrink: 0;
      width: var(--size-icon-sm);
      height: var(--size-icon-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-content-secondary);
    }
    .subinfo-list-item-icon svg {
      width: 100%;
      height: 100%;
    }
    .subinfo-list-item-text {
      flex: 1;
      color: var(--color-content-primary);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-body-md);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .subinfo-list-item-link {
      flex: 1;
      color: var(--color-content-brand);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-body-md);
      text-decoration: none;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .subinfo-list-item-link:hover {
      text-decoration: underline;
    }
    .subinfo-list-footer {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-2);
      width: 100%;
    }
    .subinfo-list-footer-content {
      flex: 1;
      display: flex;
      align-items: center;
      gap: var(--spacing-1);
    }
  `,

  chips: `
    .subinfo-chips {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: flex-start;
      align-content: flex-start;
      gap: var(--spacing-1);
      align-self: stretch;
    }
  `,
};

const injectStyles = createStyleInjector("subinfo");
const css = Object.values(styles).join("\n");

// ─────────────────────────────────────────────
// SUBINFO AVATAR
// ─────────────────────────────────────────────

/**
 * SubinfoAvatar
 *
 * Small avatar with initials.
 *
 * @param {string} initials - Avatar initials
 * @param {string} className - Additional CSS classes
 */
export const SubinfoAvatar = ({ initials, className }) => {
  return (
    <div className={cx("subinfo-avatar", className)}>
      <span className="subinfo-avatar-text">{initials}</span>
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
 * @param {ReactNode} icon - Icon element
 * @param {string} iconName - Icon name to use with Icon component
 * @param {string} href - Link URL
 * @param {function} onClick - Click handler
 * @param {boolean} truncate - Truncate text with ellipsis (default: true)
 * @param {string} className - Additional CSS classes
 * @param {ReactNode} children - Item content
 */
export const SubinfoListItem = ({
  icon,
  iconName,
  href,
  onClick,
  truncate = true,
  className,
  children,
}) => {
  injectStyles(css);

  const iconElement = icon || (iconName ? <Icon name={iconName} /> : null);
  const isLink = href || onClick;

  return (
    <div className={cx("subinfo-list-item", className)}>
      {iconElement && (
        <span className="subinfo-list-item-icon">{iconElement}</span>
      )}
      {isLink ? (
        <a
          href={href}
          onClick={onClick}
          className="subinfo-list-item-link"
          style={truncate ? {} : { whiteSpace: "normal" }}
        >
          {children}
        </a>
      ) : (
        <span
          className="subinfo-list-item-text"
          style={truncate ? {} : { whiteSpace: "normal" }}
        >
          {children}
        </span>
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
 * @param {string} variant - label | value | avatar | list | chips (default: value)
 * @param {boolean} bordered - Show right border (default: true)
 * @param {boolean} fullWidth - Remove max-width constraint
 * @param {string} label - Label text (for label variant)
 * @param {ReactNode} icon - Icon element
 * @param {string} iconName - Icon name to use with Icon component
 * @param {string} href - Makes value a link
 * @param {function} onClick - Click handler for value
 * @param {string} initials - Avatar initials (for avatar variant)
 * @param {array} items - Array of items for list variant: [{ text, icon?, iconName?, href?, onClick? }]
 * @param {number} maxItems - Max items to show before "more" badge (default: 5)
 * @param {ReactNode} children - Content (value text, chips, or custom content)
 *
 * @example
 * // Label only
 * <Subinfo variant="label">Label</Subinfo>
 *
 * // Value with icon
 * <Subinfo iconName="User">John Doe</Subinfo>
 *
 * // Avatar with link
 * <Subinfo variant="avatar" initials="JD" href="/user/1">John Doe</Subinfo>
 *
 * // List of links
 * <Subinfo
 *   variant="list"
 *   items={[
 *     { text: "Abbvie Limited", iconName: "Building", href: "/company/1" },
 *     { text: "Pfizer Inc", iconName: "Building", href: "/company/2" },
 *   ]}
 *   maxItems={4}
 * />
 *
 * // Chips
 * <Subinfo variant="chips">
 *   <Chip>Tag 1</Chip>
 *   <Chip>Tag 2</Chip>
 *   <Chip>Tag 3</Chip>
 * </Subinfo>
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
  className,
  children,
  ...props
}) => {
  injectStyles(css);

  const classes = cx(
    "subinfo",
    bordered && "subinfo--bordered",
    fullWidth && "subinfo--full-width",
    className
  );

  const iconElement = icon || (iconName ? <Icon name={iconName} /> : null);

  // Label variant
  if (variant === "label") {
    return (
      <div className={classes} {...props}>
        <span className="subinfo-label">{children || label}</span>
      </div>
    );
  }

  // Avatar variant
  if (variant === "avatar") {
    const isLink = href || onClick;
    return (
      <div className={classes} {...props}>
        <div className="subinfo-value">
          {initials && <SubinfoAvatar initials={initials} />}
          {isLink ? (
            <a href={href} onClick={onClick} className="subinfo-value-link">
              {children}
            </a>
          ) : (
            <span className="subinfo-value-text">{children}</span>
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
      <div className={classes} {...props}>
        <div className="subinfo-list">
          {visibleItems.map((item, index) => {
            const isLast = index === visibleItems.length - 1 && hasMore;

            if (isLast) {
              return (
                <div key={index} className="subinfo-list-footer">
                  <div className="subinfo-list-footer-content">
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
      <div className={classes} {...props}>
        <div className="subinfo-chips">{children}</div>
      </div>
    );
  }

  // Default: value variant
  const isLink = href || onClick;
  return (
    <div className={classes} {...props}>
      <div className="subinfo-value">
        {iconElement && (
          <span className="subinfo-value-icon">{iconElement}</span>
        )}
        {isLink ? (
          <a href={href} onClick={onClick} className="subinfo-value-link">
            {children}
          </a>
        ) : (
          <span className="subinfo-value-text">{children}</span>
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
