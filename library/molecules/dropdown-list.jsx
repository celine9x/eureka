/**
 * DropdownList Component (Molecule)
 *
 * A searchable, sectioned list with optional "Add" action.
 * Uses Tailwind CSS with design tokens.
 */

import React, { useState, useCallback } from "react";
import { cx } from "../utils/cx.js";
import { Button } from "../atoms/button.jsx";
import { Checkbox } from "../atoms/checkbox.jsx";
import { Icon } from "../atoms/icon.jsx";

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  section: "flex flex-col self-stretch p-2 gap-1",

  sectionTitle: [
    "p-1 font-primary text-highlight-md font-semibold",
    "uppercase tracking-[0.04em] text-content-tertiary",
  ].join(" "),

  item: [
    "inline-flex self-stretch w-full box-border p-2",
    "justify-between items-center gap-2 rounded-sm",
    "cursor-pointer select-none transition-colors duration-fast",
    "hover:bg-background-neutral-lighter hover:rounded-md",
    "focus-visible:outline-2 focus-visible:outline-content-brand focus-visible:-outline-offset-2 focus-visible:rounded-md",
  ].join(" "),

  itemDisabled: "cursor-not-allowed opacity-50",
  itemHidden: "hidden",

  itemLeft: "flex items-center gap-2 flex-1 min-w-0",
  itemCheckbox: "flex-shrink-0 pointer-events-none",

  itemIcon: [
    "flex-shrink-0 size-icon-sm flex items-center justify-center",
    "text-content-secondary overflow-hidden [&_svg]:w-full [&_svg]:h-full",
  ].join(" "),

  itemColor: "flex-shrink-0 w-1 h-icon-sm rounded-sm bg-content-secondary",

  itemLabelBlock: "flex flex-col justify-center items-start min-w-0 gap-0",

  itemLabel: [
    "font-primary text-body-lg font-normal text-content-primary",
    "whitespace-nowrap overflow-hidden text-ellipsis",
  ].join(" "),

  itemSubinfo: [
    "font-primary text-body-md font-normal text-content-secondary",
    "whitespace-nowrap overflow-hidden text-ellipsis",
  ].join(" "),

  itemLabelDisabled: "text-content-tertiary",
  itemSubinfoDisabled: "text-content-tertiary",

  itemRight: "flex items-center justify-end gap-2 flex-shrink-0",

  itemBadge: [
    "flex items-center p-1 bg-background-neutral-lighter rounded-sm",
    "outline outline-1 -outline-offset-1 outline-outline-neutral",
  ].join(" "),

  itemAction: "flex items-center",

  list: [
    "flex flex-col w-full bg-background-white rounded-md",
    "outline outline-1 -outline-offset-1 outline-outline-neutral",
    "shadow-light-down box-border",
  ].join(" "),

  listTop: "flex flex-col self-stretch",

  listSearch: "self-stretch p-2 border-b border-outline-neutral",

  listSearchInput: [
    "w-full py-2 px-3 font-primary text-body-lg font-normal text-content-primary",
    "bg-interaction-fill border border-interaction-outline rounded-md",
    "outline-none transition-all duration-fast box-border",
    "placeholder:text-content-tertiary",
    "hover:border-interaction-outline-hover",
    "focus:border-interaction-outline-active focus:shadow-focus",
  ].join(" "),

  listContent: [
    "flex flex-col self-stretch max-h-[var(--dropdown-list-max-height,280px)]",
    "overflow-y-auto scrollbar-thin scrollbar-thumb-[rgba(21,21,76,0.35)] scrollbar-track-transparent",
  ].join(" "),

  listNoResults: "self-stretch p-4 border-b border-outline-neutral",
  listNoResultsHidden: "hidden",
  listNoResultsText: "font-primary text-body-lg font-normal text-content-secondary",

  listAdd: "self-stretch flex items-center py-2 px-4 border-t border-outline-neutral",
};

// ─────────────────────────────────────────────
// DROPDOWN SECTION COMPONENT
// ─────────────────────────────────────────────

/**
 * DropdownSection
 *
 * A section within a dropdown list with optional title.
 *
 * @param {string} title - Optional uppercase section title
 * @param {boolean} hidden - Hides the section
 * @param {ReactNode} children - Section items
 */
export const DropdownSection = ({ title, hidden = false, className = "", children, ...props }) => {
  return (
    <div className={cx(styles.section, hidden && "hidden", className)} {...props}>
      {title && <div className={styles.sectionTitle}>{title}</div>}
      {children}
    </div>
  );
};

DropdownSection.displayName = "DropdownSection";

// ─────────────────────────────────────────────
// DROPDOWN LIST ITEM COMPONENT
// ─────────────────────────────────────────────

/**
 * DropdownListItem
 *
 * A selectable item with checkbox in a dropdown list.
 *
 * @param {string} value - Item value
 * @param {boolean} checked - Checked state
 * @param {boolean} isDisabled - Disables the item
 * @param {string} subinfo - Secondary line beneath the label
 * @param {string} color - CSS color for left accent rectangle
 * @param {ReactNode} icon - Icon element on the left
 * @param {ReactNode} badge - Badge element on the right
 * @param {ReactNode} action - Action element on the right
 * @param {function} onChange - Called with { value, label, checked }
 * @param {ReactNode} children - Label text
 *
 * @example
 * <DropdownListItem value="ad" checked>Alzheimer's disease</DropdownListItem>
 * <DropdownListItem value="bc" subinfo="Phase 2 / Small molecule" icon={<Icon name="Tag" />}>
 *   Breast cancer
 * </DropdownListItem>
 */
export const DropdownListItem = ({
  value,
  checked = false,
  isDisabled = false,
  disabled, // Support legacy prop
  subinfo,
  color,
  icon,
  badge,
  action,
  hidden = false,
  onChange,
  className = "",
  children,
  ...props
}) => {
  const isItemDisabled = isDisabled || disabled;

  const handleToggle = () => {
    if (isItemDisabled) return;
    onChange?.({ value, label: children, checked: !checked });
  };

  const handleKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleToggle();
    }
  };

  const classes = cx(
    styles.item,
    isItemDisabled && styles.itemDisabled,
    hidden && styles.itemHidden,
    className
  );

  return (
    <div
      className={classes}
      tabIndex={isItemDisabled ? -1 : 0}
      role="checkbox"
      aria-checked={checked}
      aria-disabled={isItemDisabled}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <div className={styles.itemLeft}>
        <div className={styles.itemCheckbox}>
          <Checkbox isSelected={checked} isDisabled={isItemDisabled} size="sm" onChange={() => {}} />
        </div>

        {icon && <div className={styles.itemIcon}>{icon}</div>}

        {color && <div className={styles.itemColor} style={{ background: color }} />}

        <div className={styles.itemLabelBlock}>
          <span className={cx(styles.itemLabel, isItemDisabled && styles.itemLabelDisabled)}>
            {children}
          </span>
          {subinfo && (
            <span className={cx(styles.itemSubinfo, isItemDisabled && styles.itemSubinfoDisabled)}>
              {subinfo}
            </span>
          )}
        </div>
      </div>

      {(badge || action) && (
        <div className={styles.itemRight}>
          {badge && <div className={styles.itemBadge}>{badge}</div>}
          {action && <div className={styles.itemAction}>{action}</div>}
        </div>
      )}
    </div>
  );
};

DropdownListItem.displayName = "DropdownListItem";

// ─────────────────────────────────────────────
// DROPDOWN LIST COMPONENT
// ─────────────────────────────────────────────

/**
 * DropdownList
 *
 * A searchable, sectioned list with optional "Add" action.
 *
 * @param {boolean} noSearch - Hides the search input
 * @param {string} searchPlaceholder - Placeholder for search field (default: "Search")
 * @param {boolean} noAdd - Hides the add button row
 * @param {string} addLabel - Label for add button (default: "Add value")
 * @param {function} onAdd - Called when add button is clicked
 * @param {function} onSearch - Called with search query when searching
 * @param {ReactNode} children - DropdownSection and item components
 *
 * @example
 * <DropdownList>
 *   <DropdownSection title="Neurology">
 *     <DropdownListItem value="ad">Alzheimer's disease</DropdownListItem>
 *     <DropdownListItem value="pd" checked>Parkinson's disease</DropdownListItem>
 *   </DropdownSection>
 * </DropdownList>
 */
export const DropdownList = ({
  noSearch = false,
  searchPlaceholder = "Search",
  noAdd = false,
  addLabel = "Add value",
  onAdd,
  onSearch,
  className = "",
  children,
  ...props
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearchChange = useCallback(
    (e) => {
      const query = e.target.value;
      setSearchQuery(query);
      onSearch?.(query);
    },
    [onSearch]
  );

  const handleAdd = () => {
    onAdd?.();
  };

  return (
    <div className={cx(styles.list, className)} {...props}>
      <div className={styles.listTop}>
        {!noSearch && (
          <div className={styles.listSearch}>
            <input
              type="text"
              className={styles.listSearchInput}
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        )}

        <div className={styles.listContent}>{children}</div>

        <div className={cx(styles.listNoResults, !noResults && styles.listNoResultsHidden)}>
          <span className={styles.listNoResultsText}>
            '{searchQuery.trim()}' does not exist
          </span>
        </div>
      </div>

      {!noAdd && (
        <div className={styles.listAdd}>
          <Button
            variant="tertiary"
            size="sm"
            onPress={handleAdd}
            iconLeading={<Icon name="Plus" size="sm" />}
          >
            {addLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

DropdownList.displayName = "DropdownList";

export default DropdownList;
