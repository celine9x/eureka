"use client";

/**
 * DropdownList Component (Molecule)
 *
 * A searchable, sectioned list with optional "Add" action.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 */

import { useState, useCallback, Children, isValidElement } from "react";
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
    padding: "var(--spacing-sm)",
    gap: "var(--spacing-xs)",
  },

  sectionHidden: {
    display: "none",
  },

  sectionTitle: {
    padding: "var(--spacing-xs)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-overline)",
    fontWeight: "var(--font-weight-regular)",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    color: "var(--color-content-secondary)",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: 0,
    textAlign: "left",
  },

  sectionChevron: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-secondary)",
    transition: "transform var(--transition-fast)",
  },

  sectionChevronCollapsed: {
    transform: "rotate(-90deg)",
  },

  sectionContentHidden: {
    display: "none",
  },

  sectionItems: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
  },

  item: {
    display: "inline-flex",
    alignSelf: "stretch",
    width: "100%",
    boxSizing: "border-box",
    padding: "var(--spacing-sm)",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "var(--spacing-sm)",
    borderRadius: "var(--radius-md)",
    cursor: "pointer",
    userSelect: "none",
    transition: "all var(--transition-fast)",
    background: "transparent",
    border: "none",
  },

  itemStates: {
    enabled: {
      item: {
        color: "var(--color-content-secondary)",
      },
      icon: {
        color: "var(--color-content-secondary)",
      },
      label: {
        color: "var(--color-content-primary)",
      },
      subinfo: {
        color: "var(--color-content-secondary)",
      },
    },
    hover: {
      item: {
        background: "var(--color-general-neutral-light)",
        color: "var(--color-content-primary)",
      },
      icon: {
        color: "var(--color-content-primary)",
      },
      label: {
        color: "var(--color-content-primary)",
      },
      subinfo: {
        color: "var(--color-content-primary)",
      },
    },
    active: {
      item: {
        background: "var(--color-general-informative)",
        color: "var(--color-content-primary)",
      },
      icon: {
        color: "var(--color-action-fill-primary-enabled)",
      },
      label: {
        color: "var(--color-content-primary)",
      },
      subinfo: {
        color: "var(--color-content-primary)",
      },
    },
    disabled: {
      item: {
        color: "var(--color-content-tertiary)",
        cursor: "not-allowed",
        pointerEvents: "none",
      },
      icon: {
        color: "var(--color-content-tertiary)",
      },
      label: {
        color: "var(--color-content-tertiary)",
      },
      subinfo: {
        color: "var(--color-content-tertiary)",
      },
    },
  },

  itemHidden: {
    display: "none",
  },

  itemLeft: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
    flex: 1,
    minWidth: 0,
  },

  itemCheckbox: {
    flexShrink: 0,
    pointerEvents: "none",
  },

  itemIcon: {
    flexShrink: 0,
    width: "var(--spacing-4)",
    height: "var(--spacing-4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  itemColor: {
    flexShrink: 0,
    width: "var(--spacing-xs)",
    height: "var(--spacing-4)",
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
    color: "var(--color-content-secondary)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
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
    gap: "var(--spacing-sm)",
    flexShrink: 0,
  },

  itemBadge: {
    display: "flex",
    alignItems: "center",
    padding: "var(--spacing-xs)",
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
    padding: "var(--spacing-2)",
    borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
  },

  listSearchInput: {
    width: "100%",
    padding: "var(--spacing-2) var(--spacing-3)",
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
    maxHeight: "var(--dropdown-list-max-height, calc(var(--spacing-10) * 7))",
    overflowY: "auto",
  },

  listNoResults: {
    alignSelf: "stretch",
    padding: "var(--spacing-4)",
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
    padding: "var(--spacing-2) var(--spacing-4)",
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
export const DropdownSection = ({ title, hidden = false, defaultExpanded = true, style, children, ...props }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const sectionChildren = Children.toArray(children);
  const getSortMeta = (child, index) => {
    if (!isValidElement(child)) return { rank: 1, label: "", index };
    const rawLabel = typeof child.props?.children === "string" ? child.props.children : "";
    return {
      rank: rawLabel ? 0 : 1,
      label: rawLabel.toLowerCase(),
      index,
    };
  };

  const sortedChildren = [...sectionChildren].sort((a, b) => {
    const aMeta = getSortMeta(a, sectionChildren.indexOf(a));
    const bMeta = getSortMeta(b, sectionChildren.indexOf(b));
    if (aMeta.rank !== bMeta.rank) return aMeta.rank - bMeta.rank;
    const byLabel = aMeta.label.localeCompare(bMeta.label);
    if (byLabel !== 0) return byLabel;
    return aMeta.index - bMeta.index;
  });

  const sectionStyle = {
    ...styles.section,
    ...(hidden && styles.sectionHidden),
    ...style,
  };

  const chevronStyle = {
    ...styles.sectionChevron,
    ...(!isExpanded && styles.sectionChevronCollapsed),
  };

  return (
    <div style={sectionStyle} {...props}>
      {title && (
        <button
          type="button"
          style={styles.sectionHeader}
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
        >
          <div style={styles.sectionTitle}>{title}</div>
          <span style={chevronStyle}>
            <Icon name="ChevronDown" size={14} />
          </span>
        </button>
      )}
      <div
        style={{
          ...styles.sectionItems,
          ...(!isExpanded && title ? styles.sectionContentHidden : null),
        }}
      >
        {sortedChildren}
      </div>
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
  active,
  isIndeterminate = false,
  isDisabled = false,
  disabled, // Support legacy prop
  subinfo,
  color,
  icon,
  iconBeforeCheckbox = false,
  badge,
  action,
  hidden = false,
  noCheckbox = true,
  onChange,
  style,
  children,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isItemDisabled = isDisabled || disabled;
  const isActive = active ?? checked;

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

  const getStateStyles = () => {
    if (isItemDisabled) return styles.itemStates.disabled;
    if (isActive) return styles.itemStates.active;
    if (isHovered) return styles.itemStates.hover;
    return styles.itemStates.enabled;
  };

  const stateStyles = getStateStyles();

  const itemStyle = {
    ...styles.item,
    ...stateStyles.item,
    ...(hidden && styles.itemHidden),
    ...style,
  };

  const labelStyle = {
    ...styles.itemLabel,
    ...stateStyles.label,
  };

  const subinfoStyle = {
    ...styles.itemSubinfo,
    ...stateStyles.subinfo,
  };

  const iconStyle = {
    ...styles.itemIcon,
    ...stateStyles.icon,
  };

  const colorStyle = color
    ? { ...styles.itemColor, background: color }
    : styles.itemColor;

  return (
    <div
      style={itemStyle}
      tabIndex={isItemDisabled ? -1 : 0}
      role="checkbox"
      aria-checked={isIndeterminate ? "mixed" : checked}
      aria-disabled={isItemDisabled}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div style={styles.itemLeft}>
        {iconBeforeCheckbox && icon && <div style={iconStyle}>{icon}</div>}

        {!noCheckbox && (
          <div style={styles.itemCheckbox}>
            <Checkbox
              isSelected={checked}
              isIndeterminate={isIndeterminate}
              isDisabled={isItemDisabled}
              size="sm"
              onChange={() => {}}
            />
          </div>
        )}

        {!iconBeforeCheckbox && icon && <div style={iconStyle}>{icon}</div>}

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
DropdownList.Section = DropdownSection;
DropdownList.Item = DropdownListItem;
DropdownList.Button = Button;
DropdownList.Icon = Icon;
DropdownList.Checkbox = Checkbox;

export default DropdownList;
