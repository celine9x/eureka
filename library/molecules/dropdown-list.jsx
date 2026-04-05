/**
 * DropdownList Component (Molecule)
 *
 * A searchable, sectioned list with optional "Add" action.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 */

import { useState, useCallback } from "react";
import { Button } from "../atoms/button.jsx";
import { Checkbox } from "../atoms/checkbox.jsx";
import { Icon } from "../atoms/icon.jsx";

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  section: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "stretch",
    padding: 8,
    gap: 4,
  },

  sectionHidden: {
    display: "none",
  },

  sectionTitle: {
    padding: 4,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-highlight-md)",
    fontWeight: "var(--font-weight-semibold)",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    color: "var(--color-content-tertiary)",
  },

  item: {
    display: "inline-flex",
    alignSelf: "stretch",
    width: "100%",
    boxSizing: "border-box",
    padding: 8,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    userSelect: "none",
    transition: "all var(--transition-fast)",
    background: "transparent",
    border: "none",
  },

  itemHover: {
    background: "var(--color-general-neutral-lighter)",
    borderRadius: "var(--radius-md)",
  },

  itemDisabled: {
    cursor: "not-allowed",
    opacity: 0.5,
  },

  itemHidden: {
    display: "none",
  },

  itemLeft: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flex: 1,
    minWidth: 0,
  },

  itemCheckbox: {
    flexShrink: 0,
    pointerEvents: "none",
  },

  itemIcon: {
    flexShrink: 0,
    width: 16,
    height: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-secondary)",
    overflow: "hidden",
  },

  itemColor: {
    flexShrink: 0,
    width: 4,
    height: 16,
    borderRadius: "var(--radius-sm)",
    background: "var(--color-content-secondary)",
  },

  itemLabelBlock: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    minWidth: 0,
    gap: 0,
  },

  itemLabel: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-primary)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  itemLabelDisabled: {
    color: "var(--color-content-tertiary)",
  },

  itemSubinfo: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-secondary)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  itemSubinfoDisabled: {
    color: "var(--color-content-tertiary)",
  },

  itemRight: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
    flexShrink: 0,
  },

  itemBadge: {
    display: "flex",
    alignItems: "center",
    padding: 4,
    background: "var(--color-general-neutral-lighter)",
    borderRadius: "var(--radius-sm)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: -1,
  },

  itemAction: {
    display: "flex",
    alignItems: "center",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-md)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: -1,
    boxShadow: "var(--shadow-light-down)",
    boxSizing: "border-box",
  },

  listTop: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "stretch",
  },

  listSearch: {
    alignSelf: "stretch",
    padding: 8,
    borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
  },

  listSearchInput: {
    width: "100%",
    padding: "8px 12px",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-primary)",
    background: "var(--color-interaction-fill-enabled)",
    border: "1px solid var(--color-interaction-outline-enabled)",
    borderRadius: "var(--radius-md)",
    outline: "none",
    transition: "all var(--transition-fast)",
    boxSizing: "border-box",
  },

  listSearchInputHover: {
    borderColor: "var(--color-interaction-outline-hover)",
  },

  listSearchInputFocus: {
    borderColor: "var(--color-interaction-outline-active)",
    boxShadow: "var(--shadow-focus)",
  },

  listContent: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "stretch",
    maxHeight: "var(--dropdown-list-max-height, 280px)",
    overflowY: "auto",
  },

  listNoResults: {
    alignSelf: "stretch",
    padding: 16,
    borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
  },

  listNoResultsHidden: {
    display: "none",
  },

  listNoResultsText: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-secondary)",
  },

  listAdd: {
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    borderTop: "1px solid var(--color-action-outline-secondary-enabled)",
  },
};

// ─────────────────────────────────────────────
// DROPDOWN SECTION COMPONENT
// ─────────────────────────────────────────────

/**
 * DropdownSection
 *
 * A section within a dropdown list with optional title.
 *
 */
export const DropdownSection = ({ title, hidden = false, style, children, ...props }) => {
  const sectionStyle = {
    ...styles.section,
    ...(hidden && styles.sectionHidden),
    ...style,
  };

  return (
    <div style={sectionStyle} {...props}>
      {title && <div style={styles.sectionTitle}>{title}</div>}
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
  style,
  children,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
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

  const itemStyle = {
    ...styles.item,
    ...(isHovered && !isItemDisabled && styles.itemHover),
    ...(isItemDisabled && styles.itemDisabled),
    ...(hidden && styles.itemHidden),
    ...style,
  };

  const labelStyle = {
    ...styles.itemLabel,
    ...(isItemDisabled && styles.itemLabelDisabled),
  };

  const subinfoStyle = {
    ...styles.itemSubinfo,
    ...(isItemDisabled && styles.itemSubinfoDisabled),
  };

  const colorStyle = color
    ? { ...styles.itemColor, background: color }
    : styles.itemColor;

  return (
    <div
      style={itemStyle}
      tabIndex={isItemDisabled ? -1 : 0}
      role="checkbox"
      aria-checked={checked}
      aria-disabled={isItemDisabled}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div style={styles.itemLeft}>
        <div style={styles.itemCheckbox}>
          <Checkbox isSelected={checked} isDisabled={isItemDisabled} size="sm" onChange={() => {}} />
        </div>

        {icon && <div style={styles.itemIcon}>{icon}</div>}

        {color && <div style={colorStyle} />}

        <div style={styles.itemLabelBlock}>
          <span style={labelStyle}>{children}</span>
          {subinfo && <span style={subinfoStyle}>{subinfo}</span>}
        </div>
      </div>

      {(badge || action) && (
        <div style={styles.itemRight}>
          {badge && <div style={styles.itemBadge}>{badge}</div>}
          {action && <div style={styles.itemAction}>{action}</div>}
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
  style,
  children,
  ...props
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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

  const listStyle = {
    ...styles.list,
    ...style,
  };

  const searchInputStyle = {
    ...styles.listSearchInput,
    ...(isSearchHovered && !isSearchFocused && styles.listSearchInputHover),
    ...(isSearchFocused && styles.listSearchInputFocus),
  };

  const noResultsStyle = {
    ...styles.listNoResults,
    ...(!noResults && styles.listNoResultsHidden),
  };

  return (
    <div style={listStyle} {...props}>
      <div style={styles.listTop}>
        {!noSearch && (
          <div style={styles.listSearch}>
            <input
              type="text"
              style={searchInputStyle}
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              onMouseEnter={() => setIsSearchHovered(true)}
              onMouseLeave={() => setIsSearchHovered(false)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
          </div>
        )}

        <div style={styles.listContent}>{children}</div>

        <div style={noResultsStyle}>
          <span style={styles.listNoResultsText}>
            '{searchQuery.trim()}' does not exist
          </span>
        </div>
      </div>

      {!noAdd && (
        <div style={styles.listAdd}>
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
