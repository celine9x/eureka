"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../atoms/button.jsx";
import { Badge } from "../atoms/badge.jsx";
import { Icon } from "../atoms/icon.jsx";
import { Checkbox } from "../atoms/checkbox.jsx";
import { RadioButton, RadioGroup } from "../atoms/radio-button.jsx";
import { TextInput } from "../molecules/text-input.jsx";

export const FILTER_TYPES = {
  text: "text",
  date: "date",
  numberRange: "number-range",
  multipleChoice: "multiple-choice",
  singleChoice: "single-choice",
};

const defaultSuggestions = [
  {
    key: "status",
    label: "Status",
    count: 2,
    type: FILTER_TYPES.multipleChoice,
    options: ["Opportunity", "Lead", "Qualified", "Closed won", "Closed lost"],
  },
  {
    key: "name",
    label: "Name",
    type: FILTER_TYPES.text,
  },
  {
    key: "date",
    label: "Date",
    type: FILTER_TYPES.date,
  },
  {
    key: "tags",
    label: "Tags",
    type: FILTER_TYPES.multipleChoice,
    options: ["Oncology", "Dermatology", "Licensing", "CDA", "Skin cancer"],
  },
];

const defaultAllFilters = [
  {
    key: "agreement",
    label: "Agreement",
    filters: [
      {
        key: "forecasted-date",
        label: "Forecasted date",
        type: FILTER_TYPES.date,
      },
      {
        key: "agreement-type",
        label: "Agreement type",
        type: FILTER_TYPES.singleChoice,
        options: ["CDA", "Licensing", "NDA", "MSA"],
      },
      {
        key: "agreement-value",
        label: "Agreement value",
        type: FILTER_TYPES.numberRange,
      },
    ],
  },
  {
    key: "company",
    label: "Company",
    filters: [
      {
        key: "company-name",
        label: "Company name",
        type: FILTER_TYPES.text,
      },
      {
        key: "country",
        label: "Country",
        type: FILTER_TYPES.multipleChoice,
        options: ["Austria", "Germany", "United States", "France", "Canada", "Spain"],
      },
      {
        key: "employee-size",
        label: "Employee size",
        type: FILTER_TYPES.numberRange,
      },
    ],
  },
  {
    key: "meeting",
    label: "Meeting",
    filters: [
      {
        key: "last-meeting-date",
        label: "Last meeting date",
        type: FILTER_TYPES.date,
      },
      {
        key: "meeting-owner",
        label: "Meeting owner",
        type: FILTER_TYPES.text,
      },
    ],
  },
  {
    key: "opportunity",
    label: "Opportunity",
    filters: [
      {
        key: "opportunity-stage",
        label: "Opportunity stage",
        type: FILTER_TYPES.multipleChoice,
        options: ["Discovery", "Review", "Due diligence", "Negotiation", "Signed"],
      },
      {
        key: "probability",
        label: "Probability",
        type: FILTER_TYPES.numberRange,
      },
      {
        key: "opportunity-type",
        label: "Opportunity type",
        type: FILTER_TYPES.singleChoice,
        options: ["In-licensing", "Out-licensing", "Co-development"],
      },
    ],
  },
];

export const DEFAULT_FILTER_PANEL_OPTIONS = {
  suggestions: defaultSuggestions,
  allFilters: defaultAllFilters,
};

const styles = {
  root: {
    width: 336,
    minWidth: 336,
    borderLeft: "1px solid var(--color-action-outline-secondary-enabled)",
    background: "var(--color-general-white)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-4)",
    padding: "var(--spacing-6)",
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
    paddingBottom: "var(--spacing-2)",
  },
  title: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-bold)",
    fontSize: "var(--text-heading-h4)",
    lineHeight: "var(--line-height-heading-h4)",
    color: "var(--color-content-primary)",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-4)",
    overflowY: "auto",
    minHeight: 0,
    flex: "1 1 auto",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-2)",
  },
  previewWrap: {
    width: "100%",
    display: "inline-flex",
    gap: "var(--spacing-2)",
    flexWrap: "wrap",
    alignContent: "flex-start",
  },
  previewRow: {
    width: 300,
    maxWidth: 300,
  },
  iconButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 16,
    height: 16,
    border: "none",
    background: "transparent",
    padding: 0,
    color: "var(--color-content-secondary)",
    cursor: "pointer",
  },
  addFilterButtonWrap: {
    width: "fit-content",
  },
  sectionTitle: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-bold)",
    fontSize: "var(--text-body-lg)",
    lineHeight: "var(--line-height-body-lg)",
    color: "var(--color-content-primary)",
  },
  viewHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-2)",
  },
  viewHeaderLeft: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
    minWidth: 0,
  },
  backButton: {
    border: "none",
    background: "transparent",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    cursor: "pointer",
    color: "var(--color-content-secondary)",
  },
  viewTitle: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-bold)",
    fontSize: "var(--text-heading-h5)",
    lineHeight: "var(--line-height-heading-h5)",
    color: "var(--color-content-primary)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  titleBadges: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
  },
  row: {
    width: "100%",
    border: "none",
    borderRadius: "var(--radius-sm)",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-2)",
    padding: "var(--spacing-sm)",
    cursor: "pointer",
    textAlign: "left",
    boxSizing: "border-box",
  },
  rowSelected: {
    background: "var(--color-general-neutral-lighter)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
  },
  rowLabel: {
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-regular)",
    fontSize: "var(--text-body-lg)",
    lineHeight: "var(--line-height-body-lg)",
    color: "var(--color-content-primary)",
  },
  rowLeft: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
    minWidth: 0,
  },
  rowType: {
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-regular)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    color: "var(--color-content-secondary)",
    textTransform: "uppercase",
    letterSpacing: "0.02em",
    whiteSpace: "nowrap",
  },
  rowRight: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-2)",
    flexShrink: 0,
  },
  controlCard: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
    padding: "var(--spacing-sm)",
    borderRadius: "var(--radius-sm)",
    background: "var(--color-general-neutral-light)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    boxSizing: "border-box",
  },
  optionsList: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-2)",
  },
  choiceItem: {
    padding: "var(--spacing-xs) 0",
  },
  fieldGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "var(--spacing-2)",
  },
  label: {
    margin: 0,
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    fontWeight: "var(--font-weight-regular)",
  },
  helperText: {
    margin: 0,
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
  },
  footer: {
    borderTop: "1px solid var(--color-action-outline-secondary-enabled)",
    paddingTop: "var(--spacing-3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-2)",
  },
  empty: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-regular)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    color: "var(--color-content-secondary)",
    padding: "var(--spacing-xs) 0",
  },
};

const normalizeFilter = (item, source = {}) => {
  if (!item || !item.key || !item.label) return null;

  const sourcePrefix = source.objectKey ? `object:${source.objectKey}` : "suggestion";
  const id = `${sourcePrefix}::${String(item.key)}`;

  return {
    id,
    key: String(item.key),
    label: String(item.label),
    count: typeof item.count === "number" ? item.count : undefined,
    type: item.type || FILTER_TYPES.text,
    options: Array.isArray(item.options) ? item.options.map((option) => String(option)) : [],
    objectKey: source.objectKey || null,
    objectLabel: source.objectLabel || null,
  };
};

const normalizeSuggestions = (filters = []) => {
  return filters.map((filter) => normalizeFilter(filter)).filter(Boolean);
};

const normalizeObjectTypes = (allFilters = []) => {
  return allFilters
    .filter((item) => item && item.key && item.label)
    .map((objectType) => {
      const objectKey = String(objectType.key);
      const objectLabel = String(objectType.label);

      const objectFilters = Array.isArray(objectType.filters)
        ? objectType.filters
            .map((filter) =>
              normalizeFilter(filter, {
                objectKey,
                objectLabel,
              })
            )
            .filter(Boolean)
        : [
            normalizeFilter(objectType, {
              objectKey,
              objectLabel,
            }),
          ].filter(Boolean);

      return {
        key: objectKey,
        label: objectLabel,
        count: typeof objectType.count === "number" ? objectType.count : objectFilters.length,
        filters: objectFilters,
      };
    });
};

const toKeySet = (value) => {
  if (!Array.isArray(value) || value.length === 0) return null;
  return new Set(value.map((item) => String(item)));
};

const createDefaultCriteria = (type) => ({
  type,
  displayInTable: false,
  includeEmpty: false,
  text: "",
  from: "",
  to: "",
  min: "",
  max: "",
  selectedOptions: [],
  selectedOption: "",
});

const normalizeCriteria = (filter, initialCriteria) => {
  const criteria = {
    ...createDefaultCriteria(filter.type),
    ...(initialCriteria || {}),
  };

  criteria.selectedOptions = Array.isArray(criteria.selectedOptions)
    ? criteria.selectedOptions.map((option) => String(option))
    : [];
  criteria.selectedOption = criteria.selectedOption ? String(criteria.selectedOption) : "";
  criteria.text = criteria.text ? String(criteria.text) : "";
  criteria.from = criteria.from ? String(criteria.from) : "";
  criteria.to = criteria.to ? String(criteria.to) : "";
  criteria.min = criteria.min ? String(criteria.min) : "";
  criteria.max = criteria.max ? String(criteria.max) : "";

  return criteria;
};

const hasActiveCriteria = (criteria) => {
  if (!criteria) return false;

  if (criteria.type === FILTER_TYPES.text) {
    return Boolean(criteria.text.trim() || criteria.includeEmpty);
  }
  if (criteria.type === FILTER_TYPES.date) {
    return Boolean(criteria.from || criteria.to || criteria.includeEmpty);
  }
  if (criteria.type === FILTER_TYPES.numberRange) {
    return Boolean(criteria.min || criteria.max || criteria.includeEmpty);
  }
  if (criteria.type === FILTER_TYPES.multipleChoice) {
    return Boolean(criteria.selectedOptions.length > 0 || criteria.includeEmpty);
  }
  if (criteria.type === FILTER_TYPES.singleChoice) {
    return Boolean(criteria.selectedOption || criteria.includeEmpty);
  }

  return false;
};

const formatCriteriaSummary = (criteria) => {
  if (!criteria) return "";

  if (criteria.type === FILTER_TYPES.text) {
    if (criteria.text.trim()) return criteria.text.trim();
    return criteria.includeEmpty ? "Blank(s)" : "";
  }

  if (criteria.type === FILTER_TYPES.date) {
    if (criteria.from && criteria.to) return `${criteria.from} - ${criteria.to}`;
    if (criteria.from) return `From ${criteria.from}`;
    if (criteria.to) return `To ${criteria.to}`;
    return criteria.includeEmpty ? "No date" : "";
  }

  if (criteria.type === FILTER_TYPES.numberRange) {
    if (criteria.min && criteria.max) return `${criteria.min} - ${criteria.max}`;
    if (criteria.min) return `>= ${criteria.min}`;
    if (criteria.max) return `<= ${criteria.max}`;
    return criteria.includeEmpty ? "No number" : "";
  }

  if (criteria.type === FILTER_TYPES.multipleChoice) {
    if (criteria.selectedOptions.length === 1) return criteria.selectedOptions[0];
    if (criteria.selectedOptions.length > 1) return `${criteria.selectedOptions.length} selected`;
    return criteria.includeEmpty ? "Blank(s)" : "";
  }

  if (criteria.type === FILTER_TYPES.singleChoice) {
    if (criteria.selectedOption) return criteria.selectedOption;
    return criteria.includeEmpty ? "No value" : "";
  }

  return "";
};

const getAppliedOptionCount = (criteria) => {
  if (!criteria) return 0;

  if (criteria.type === FILTER_TYPES.multipleChoice) {
    return criteria.selectedOptions.length + (criteria.includeEmpty ? 1 : 0);
  }

  if (criteria.type === FILTER_TYPES.singleChoice) {
    return (criteria.selectedOption ? 1 : 0) + (criteria.includeEmpty ? 1 : 0);
  }

  if (criteria.type === FILTER_TYPES.text) {
    return (criteria.text.trim() ? 1 : 0) + (criteria.includeEmpty ? 1 : 0);
  }

  if (criteria.type === FILTER_TYPES.date) {
    return (criteria.from ? 1 : 0) + (criteria.to ? 1 : 0) + (criteria.includeEmpty ? 1 : 0);
  }

  if (criteria.type === FILTER_TYPES.numberRange) {
    return (criteria.min ? 1 : 0) + (criteria.max ? 1 : 0) + (criteria.includeEmpty ? 1 : 0);
  }

  return 0;
};

const getPreviewBadge = (criteria) => {
  if (!criteria) return null;
  const count = getAppliedOptionCount(criteria);
  if (count <= 0) return null;
  return { label: String(count), color: "neutral" };
};

const applyInitialSelection = (filtersById, initialSelected) => {
  const next = {};
  const candidates = Array.isArray(initialSelected) ? initialSelected : [];

  candidates.forEach((selected) => {
    const selectedId = selected?.id;
    if (selectedId && filtersById[selectedId]) {
      next[selectedId] = normalizeCriteria(filtersById[selectedId], selected.criteria);
      return;
    }

    const byKey = Object.values(filtersById).find((filter) => filter.key === selected?.key);
    if (byKey) {
      next[byKey.id] = normalizeCriteria(byKey, selected.criteria);
    }
  });

  return next;
};

export const FilterPanelRow = ({
  type,
  label,
  title,
  badges = [],
  onClick,
  isActive = false,
  showChevron = true,
  children,
}) => {
  const rowLabel = label ?? title;

  if (children) {
    return (
      <button
        type="button"
        style={{ ...styles.row, ...(isActive ? styles.rowSelected : null) }}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      style={{ ...styles.row, ...(isActive ? styles.rowSelected : null) }}
      onClick={onClick}
    >
      <FilterPanelRowLeft>
        {type ? <FilterPanelRowType>{type}</FilterPanelRowType> : null}
        <FilterPanelRowTitle>{rowLabel}</FilterPanelRowTitle>
      </FilterPanelRowLeft>
      <span style={styles.rowRight}>
        {badges.map((badge, index) => {
          const label = typeof badge === "object" ? badge.label : badge;
          const color = typeof badge === "object" ? badge.color || "neutral" : "neutral";
          return (
            <Badge key={`${label}-${index}`} size="sm" color={color}>
              {label}
            </Badge>
          );
        })}
        {showChevron && <Icon name="ChevronRight" size="sm" />}
      </span>
    </button>
  );
};

FilterPanelRow.displayName = "FilterPanelRow";

export const FilterPanelRowLeft = ({ children }) => {
  return <span style={styles.rowLeft}>{children}</span>;
};

FilterPanelRowLeft.displayName = "FilterPanelRowLeft";

export const FilterPanelRowType = ({ children }) => {
  return <span style={styles.rowType}>{children}</span>;
};

FilterPanelRowType.displayName = "FilterPanelRowType";

export const FilterPanelRowTitle = ({ children }) => {
  return <span style={styles.rowLabel}>{children}</span>;
};

FilterPanelRowTitle.displayName = "FilterPanelRowTitle";

export const FilterPanelRowRight = ({ children }) => {
  return <span style={styles.rowRight}>{children}</span>;
};

FilterPanelRowRight.displayName = "FilterPanelRowRight";

export const FilterPanelRowBadges = ({ badges = [] }) => {
  return (
    <>
      {badges.map((badge, index) => {
        const label = typeof badge === "object" ? badge.label : badge;
        const color = typeof badge === "object" ? badge.color || "neutral" : "neutral";
        return (
          <Badge key={`${label}-${index}`} size="sm" color={color}>
            {label}
          </Badge>
        );
      })}
    </>
  );
};

FilterPanelRowBadges.displayName = "FilterPanelRowBadges";

export const FilterPanelRowChevron = ({ show = true }) => {
  if (!show) return null;
  return <Icon name="ChevronRight" size="sm" />;
};

FilterPanelRowChevron.displayName = "FilterPanelRowChevron";

export const FilterPanel = ({
  isOpen = false,
  suggestions = defaultSuggestions,
  allFilters = defaultAllFilters,
  includedSuggestionKeys,
  includedFilterKeys,
  includedGroupKeys,
  maxGroupCount,
  initialSelected = [],
  title = "Filters",
  searchPlaceholder = "Search filters",
  showActivePreview = false,
  onClose,
  onApply,
  onClear,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [objectSearchValue, setObjectSearchValue] = useState("");
  const [isFilterPickerOpen, setIsFilterPickerOpen] = useState(!showActivePreview);
  const [activeObjectKey, setActiveObjectKey] = useState(null);
  const [activeFilterId, setActiveFilterId] = useState(null);

  const suggestionKeySet = useMemo(() => toKeySet(includedSuggestionKeys), [includedSuggestionKeys]);
  const filterKeySet = useMemo(() => toKeySet(includedFilterKeys), [includedFilterKeys]);
  const groupKeySet = useMemo(() => toKeySet(includedGroupKeys), [includedGroupKeys]);

  const filteredSuggestions = useMemo(() => {
    let next = Array.isArray(suggestions) ? suggestions : [];

    if (suggestionKeySet) {
      next = next.filter((item) => suggestionKeySet.has(String(item?.key)));
    }

    if (filterKeySet) {
      next = next.filter((item) => filterKeySet.has(String(item?.key)));
    }

    return next;
  }, [filterKeySet, suggestionKeySet, suggestions]);

  const filteredAllFilters = useMemo(() => {
    let next = Array.isArray(allFilters) ? allFilters : [];

    if (groupKeySet) {
      next = next.filter((item) => groupKeySet.has(String(item?.key)));
    }

    const withFilteredFilters = next
      .map((group) => {
        if (!group || !group.key || !group.label) return null;

        if (!filterKeySet) return group;

        if (Array.isArray(group.filters)) {
          const filteredGroupFilters = group.filters.filter((filter) =>
            filterKeySet.has(String(filter?.key))
          );

          if (filteredGroupFilters.length === 0) return null;

          return {
            ...group,
            filters: filteredGroupFilters,
          };
        }

        if (filterKeySet.has(String(group.key))) {
          return group;
        }

        return null;
      })
      .filter(Boolean);

    if (typeof maxGroupCount === "number" && Number.isFinite(maxGroupCount) && maxGroupCount >= 0) {
      return withFilteredFilters.slice(0, Math.floor(maxGroupCount));
    }

    return withFilteredFilters;
  }, [allFilters, filterKeySet, groupKeySet, maxGroupCount]);

  const suggestionFilters = useMemo(() => normalizeSuggestions(filteredSuggestions), [filteredSuggestions]);
  const objectTypes = useMemo(() => normalizeObjectTypes(filteredAllFilters), [filteredAllFilters]);

  const filtersById = useMemo(() => {
    const map = {};
    suggestionFilters.forEach((filter) => {
      map[filter.id] = filter;
    });
    objectTypes.forEach((objectType) => {
      objectType.filters.forEach((filter) => {
        map[filter.id] = filter;
      });
    });
    return map;
  }, [objectTypes, suggestionFilters]);

  const [criteriaById, setCriteriaById] = useState(() => applyInitialSelection(filtersById, initialSelected));

  useEffect(() => {
    setCriteriaById(applyInitialSelection(filtersById, initialSelected));
  }, [filtersById, initialSelected]);

  useEffect(() => {
    if (!isOpen) return;
    setIsFilterPickerOpen(!showActivePreview);
    setActiveObjectKey(null);
    setActiveFilterId(null);
    setSearchValue("");
    setObjectSearchValue("");
  }, [isOpen, showActivePreview]);

  useEffect(() => {
    if (!activeObjectKey) return;
    const exists = objectTypes.some((item) => item.key === activeObjectKey);
    if (!exists) {
      setActiveObjectKey(null);
      setActiveFilterId(null);
    }
  }, [activeObjectKey, objectTypes]);

  useEffect(() => {
    if (!activeFilterId) return;
    if (!filtersById[activeFilterId]) {
      setActiveFilterId(null);
    }
  }, [activeFilterId, filtersById]);

  const activeObject = useMemo(
    () => objectTypes.find((objectType) => objectType.key === activeObjectKey) || null,
    [activeObjectKey, objectTypes]
  );

  const activeFilter = activeFilterId ? filtersById[activeFilterId] || null : null;
  const activeCriteria = activeFilter ? normalizeCriteria(activeFilter, criteriaById[activeFilter.id]) : null;

  const selectedCount = useMemo(
    () =>
      Object.values(filtersById).reduce((count, filter) => {
        const criteria = criteriaById[filter.id];
        return count + (hasActiveCriteria(criteria) ? 1 : 0);
      }, 0),
    [criteriaById, filtersById]
  );

  const appliedFilters = useMemo(() => {
    return Object.values(filtersById)
      .map((filter) => {
        const criteria = criteriaById[filter.id];
        if (!hasActiveCriteria(criteria)) return null;
        return {
          ...filter,
          criteria,
          summary: formatCriteriaSummary(criteria),
          appliedOptionCount: getAppliedOptionCount(criteria),
          badge: getPreviewBadge(criteria),
        };
      })
      .filter(Boolean);
  }, [criteriaById, filtersById]);

  const rootSearchResults = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) {
      return {
        suggestions: suggestionFilters,
        objects: objectTypes,
      };
    }

    const filteredSuggestions = suggestionFilters.filter((filter) => {
      return filter.label.toLowerCase().includes(query);
    });

    const filteredObjects = objectTypes.filter((objectType) => {
      const objectMatch = objectType.label.toLowerCase().includes(query);
      const nestedMatch = objectType.filters.some((filter) => filter.label.toLowerCase().includes(query));
      return objectMatch || nestedMatch;
    });

    return {
      suggestions: filteredSuggestions,
      objects: filteredObjects,
    };
  }, [objectTypes, searchValue, suggestionFilters]);

  const objectFilters = useMemo(() => {
    if (!activeObject) return [];
    const query = objectSearchValue.trim().toLowerCase();
    if (!query) return activeObject.filters;
    return activeObject.filters.filter((filter) => filter.label.toLowerCase().includes(query));
  }, [activeObject, objectSearchValue]);

  const updateCriteria = (filter, updater) => {
    setCriteriaById((prev) => {
      const current = normalizeCriteria(filter, prev[filter.id]);
      const nextValue = typeof updater === "function" ? updater(current) : updater;
      return {
        ...prev,
        [filter.id]: normalizeCriteria(filter, nextValue),
      };
    });
  };

  const buildAppliedFilters = () => {
    return Object.values(filtersById)
      .map((filter) => {
        const criteria = criteriaById[filter.id];
        if (!hasActiveCriteria(criteria)) return null;

        return {
          id: filter.id,
          key: filter.id,
          rawKey: filter.key,
          label: filter.label,
          value: formatCriteriaSummary(criteria),
          badgeCount: getAppliedOptionCount(criteria),
          type: filter.type,
          objectKey: filter.objectKey,
          objectLabel: filter.objectLabel,
          criteria,
        };
      })
      .filter(Boolean);
  };

  const handleApply = () => {
    onApply?.(buildAppliedFilters());
    setIsFilterPickerOpen(false);
    setActiveObjectKey(null);
    setActiveFilterId(null);
    setSearchValue("");
    setObjectSearchValue("");
  };

  const handleClear = () => {
    setCriteriaById({});
    setSearchValue("");
    setObjectSearchValue("");
    setIsFilterPickerOpen(false);
    setActiveObjectKey(null);
    setActiveFilterId(null);
    onClear?.();
  };

  const removeAppliedFilter = (filterId) => {
    setCriteriaById((prev) => {
      const next = { ...prev };
      delete next[filterId];
      const nextApplied = Object.values(filtersById)
        .map((filter) => {
          const criteria = next[filter.id];
          if (!hasActiveCriteria(criteria)) return null;
          return {
            id: filter.id,
            key: filter.id,
            rawKey: filter.key,
            label: filter.label,
            value: formatCriteriaSummary(criteria),
            badgeCount: getAppliedOptionCount(criteria),
            type: filter.type,
            objectKey: filter.objectKey,
            objectLabel: filter.objectLabel,
            criteria,
          };
        })
        .filter(Boolean);

      onApply?.(nextApplied);
      return next;
    });
  };

  const openSuggestionFilter = (filterId) => {
    setIsFilterPickerOpen(true);
    setActiveObjectKey(null);
    setObjectSearchValue("");
    setActiveFilterId(filterId);
  };

  const openObjectType = (objectKey) => {
    setIsFilterPickerOpen(true);
    setActiveObjectKey(objectKey);
    setObjectSearchValue("");
    setActiveFilterId(null);
  };

  const openObjectFilter = (filterId) => {
    setIsFilterPickerOpen(true);
    setActiveFilterId(filterId);
  };

  const closeDetail = () => {
    setActiveFilterId(null);
  };

  const backFromObject = () => {
    setActiveObjectKey(null);
    setObjectSearchValue("");
  };

  const renderEditor = () => {
    if (!activeFilter || !activeCriteria) return null;

    const update = (partial) => {
      updateCriteria(activeFilter, (prev) => ({ ...prev, ...partial }));
    };

    if (activeFilter.type === FILTER_TYPES.text) {
      return (
        <>
          <TextInput
            placeholder={`Enter ${activeFilter.label.toLowerCase()}`}
            value={activeCriteria.text}
            onChange={(event) => update({ text: event.target.value })}
          />
          <div style={styles.choiceItem}>
            <Checkbox
              isSelected={activeCriteria.includeEmpty}
              onChange={(checked) => update({ includeEmpty: checked })}
            >
              No {activeFilter.label.toLowerCase()}
            </Checkbox>
          </div>
        </>
      );
    }

    if (activeFilter.type === FILTER_TYPES.date) {
      return (
        <>
          <div style={styles.fieldGrid}>
            <div>
              <p style={styles.label}>From</p>
              <TextInput
                type="date"
                value={activeCriteria.from}
                onChange={(event) => update({ from: event.target.value })}
              />
            </div>
            <div>
              <p style={styles.label}>To</p>
              <TextInput
                type="date"
                value={activeCriteria.to}
                onChange={(event) => update({ to: event.target.value })}
              />
            </div>
          </div>
          <div style={styles.choiceItem}>
            <Checkbox
              isSelected={activeCriteria.includeEmpty}
              onChange={(checked) => update({ includeEmpty: checked })}
            >
              No {activeFilter.label.toLowerCase()}
            </Checkbox>
          </div>
        </>
      );
    }

    if (activeFilter.type === FILTER_TYPES.numberRange) {
      return (
        <>
          <div style={styles.fieldGrid}>
            <div>
              <p style={styles.label}>Min</p>
              <TextInput
                type="number"
                placeholder="0"
                value={activeCriteria.min}
                onChange={(event) => update({ min: event.target.value })}
              />
            </div>
            <div>
              <p style={styles.label}>Max</p>
              <TextInput
                type="number"
                placeholder="100"
                value={activeCriteria.max}
                onChange={(event) => update({ max: event.target.value })}
              />
            </div>
          </div>
          <div style={styles.choiceItem}>
            <Checkbox
              isSelected={activeCriteria.includeEmpty}
              onChange={(checked) => update({ includeEmpty: checked })}
            >
              No {activeFilter.label.toLowerCase()}
            </Checkbox>
          </div>
        </>
      );
    }

    if (activeFilter.type === FILTER_TYPES.multipleChoice) {
      const options = activeFilter.options || [];
      const query = activeCriteria.text.trim().toLowerCase();
      const visibleOptions = query
        ? options.filter((option) => option.toLowerCase().includes(query))
        : options;
      const selected = new Set(activeCriteria.selectedOptions);
      const allVisibleSelected =
        visibleOptions.length > 0 && visibleOptions.every((option) => selected.has(option));

      return (
        <>
          <TextInput
            placeholder={`Search in ${activeFilter.label.toLowerCase()}`}
            value={activeCriteria.text}
            onChange={(event) => update({ text: event.target.value })}
          />

          <div style={styles.optionsList}>
            <div style={styles.choiceItem}>
              <Checkbox
                isSelected={allVisibleSelected}
                onChange={(checked) => {
                  const next = new Set(selected);
                  if (checked) {
                    visibleOptions.forEach((option) => next.add(option));
                  } else {
                    visibleOptions.forEach((option) => next.delete(option));
                  }
                  update({ selectedOptions: Array.from(next) });
                }}
              >
                Select all
              </Checkbox>
            </div>

            <div style={styles.choiceItem}>
              <Checkbox
                isSelected={activeCriteria.includeEmpty}
                onChange={(checked) => update({ includeEmpty: checked })}
              >
                Blank(s)
              </Checkbox>
            </div>

            {visibleOptions.map((option) => (
              <div key={option} style={styles.choiceItem}>
                <Checkbox
                  isSelected={selected.has(option)}
                  onChange={(checked) => {
                    const next = new Set(selected);
                    if (checked) {
                      next.add(option);
                    } else {
                      next.delete(option);
                    }
                    update({ selectedOptions: Array.from(next) });
                  }}
                >
                  {option}
                </Checkbox>
              </div>
            ))}

            {visibleOptions.length === 0 && (
              <p style={styles.helperText}>No options found.</p>
            )}
          </div>
        </>
      );
    }

    if (activeFilter.type === FILTER_TYPES.singleChoice) {
      const options = activeFilter.options || [];
      return (
        <>
          <RadioGroup
            name={`single-${activeFilter.id}`}
            value={activeCriteria.selectedOption}
            onChange={(value) => update({ selectedOption: value })}
            style={styles.optionsList}
          >
            {options.map((option) => (
              <div key={option} style={styles.choiceItem}>
                <RadioButton value={option}>{option}</RadioButton>
              </div>
            ))}
          </RadioGroup>

          <div style={styles.choiceItem}>
            <Checkbox
              isSelected={activeCriteria.includeEmpty}
              onChange={(checked) => update({ includeEmpty: checked })}
            >
              No {activeFilter.label.toLowerCase()}
            </Checkbox>
          </div>
        </>
      );
    }

    return null;
  };

  if (!isOpen) return null;

  return (
    <aside style={styles.root} aria-label="Filter panel">
      <div style={styles.header}>
        <h2 style={styles.title}>{title}</h2>
        <Button
          variant="tertiary"
          size="md"
          iconLeading={<Icon name="XMark" size="sm" />}
          onClick={onClose}
          aria-label="Close filters panel"
        />
      </div>

      <div style={styles.content}>
        {showActivePreview && !isFilterPickerOpen && !activeObject && !activeFilter && (
          <>
            <div style={styles.previewWrap}>
              {appliedFilters.map((filter) => {
                const badges = [];
                if (filter.badge) badges.push(filter.badge);

                return (
                  <div key={filter.id} style={styles.previewRow}>
                    <FilterPanelRow
                      title={filter.label}
                      badges={badges}
                      onClick={() => openObjectFilter(filter.id)}
                    >
                      <FilterPanel.RowLeft>
                        <FilterPanel.RowTitle>{filter.label}</FilterPanel.RowTitle>
                      </FilterPanel.RowLeft>
                      <FilterPanel.RowRight>
                        <FilterPanel.RowBadges badges={badges} />
                        <FilterPanel.RowChevron />
                        <button
                          type="button"
                          style={styles.iconButton}
                          onClick={(event) => {
                            event.stopPropagation();
                            removeAppliedFilter(filter.id);
                          }}
                          aria-label={`Remove ${filter.label} filter`}
                        >
                          <Icon name="XMark" size="sm" />
                        </button>
                      </FilterPanel.RowRight>
                    </FilterPanelRow>
                  </div>
                );
              })}

              <div style={styles.addFilterButtonWrap}>
                <Button
                  variant="secondary"
                  size="md"
                  iconLeading={<Icon name="Plus" size="sm" />}
                  onClick={() => setIsFilterPickerOpen(true)}
                >
                  Add filter
                </Button>
              </div>
            </div>
          </>
        )}

        {(!showActivePreview || isFilterPickerOpen) && !activeObject && !activeFilter && (
          <>
            <TextInput
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />

            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>Suggestions</h3>
              {rootSearchResults.suggestions.length === 0 ? (
                <p style={styles.empty}>No suggestion filters found.</p>
              ) : (
                rootSearchResults.suggestions.map((filter) => {
                  const criteria = criteriaById[filter.id];
                  const appliedCount = getAppliedOptionCount(criteria);
                  const badges = [];
                  if (appliedCount > 0) badges.push(String(appliedCount));
                  if (typeof filter.count === "number") badges.push(String(filter.count));
                  return (
                    <FilterPanelRow
                      key={filter.id}
                      title={filter.label}
                      badges={badges}
                      isActive={hasActiveCriteria(criteria)}
                      onClick={() => openSuggestionFilter(filter.id)}
                    />
                  );
                })
              )}
            </section>

            <section style={styles.section}>
              <h3 style={styles.sectionTitle}>All filters</h3>
              {rootSearchResults.objects.length === 0 ? (
                <p style={styles.empty}>No object types found.</p>
              ) : (
                rootSearchResults.objects.map((objectType) => {
                  const objectActiveCount = objectType.filters.reduce((count, filter) => {
                    return count + (hasActiveCriteria(criteriaById[filter.id]) ? 1 : 0);
                  }, 0);

                  const badges = [];
                  badges.push({ label: String(objectActiveCount), color: objectActiveCount > 0 ? "brand" : "neutral" });

                  return (
                    <FilterPanelRow
                      key={objectType.key}
                      title={objectType.label}
                      badges={badges}
                      onClick={() => openObjectType(objectType.key)}
                    />
                  );
                })
              )}
            </section>
          </>
        )}

        {activeObject && !activeFilter && (
          <>
            <div style={styles.viewHeader}>
              <div style={styles.viewHeaderLeft}>
                <button type="button" style={styles.backButton} onClick={backFromObject}>
                  <Icon name="ChevronLeft" size="sm" />
                </button>
                <h3 style={styles.viewTitle}>{activeObject.label}</h3>
              </div>
              <div style={styles.titleBadges}>
                <Badge size="sm" color="neutral">All filters</Badge>
              </div>
            </div>

            <TextInput
              placeholder={`Search in ${activeObject.label.toLowerCase()}`}
              value={objectSearchValue}
              onChange={(event) => setObjectSearchValue(event.target.value)}
            />

            <section style={styles.section}>
              {objectFilters.length === 0 ? (
                <p style={styles.empty}>No filters found for this object.</p>
              ) : (
                objectFilters.map((filter) => {
                  const criteria = criteriaById[filter.id];
                  const appliedCount = getAppliedOptionCount(criteria);
                  const badges = [];
                  if (filter.objectLabel) {
                    badges.push({ label: filter.objectLabel, color: "neutral" });
                  }
                  if (appliedCount > 0) badges.push(String(appliedCount));
                  if (typeof filter.count === "number") badges.push(String(filter.count));

                  return (
                    <FilterPanelRow
                      key={filter.id}
                      title={filter.label}
                      badges={badges}
                      isActive={hasActiveCriteria(criteria)}
                      onClick={() => openObjectFilter(filter.id)}
                    />
                  );
                })
              )}
            </section>
          </>
        )}

        {activeFilter && (
          <>
            <div style={styles.viewHeader}>
              <div style={styles.viewHeaderLeft}>
                <button type="button" style={styles.backButton} onClick={closeDetail}>
                  <Icon name="ChevronLeft" size="sm" />
                </button>
                <h3 style={styles.viewTitle}>{activeFilter.label}</h3>
              </div>
              <div style={styles.titleBadges}>
                {activeFilter.objectLabel ? (
                  <Badge size="sm" color="neutral">{activeFilter.objectLabel}</Badge>
                ) : (
                  <Badge size="sm" color="neutral">Suggestions</Badge>
                )}
              </div>
            </div>

            <div style={styles.controlCard}>
              <Checkbox
                isSelected={activeCriteria?.displayInTable || false}
                onChange={(checked) =>
                  updateCriteria(activeFilter, (prev) => ({
                    ...prev,
                    displayInTable: checked,
                  }))
                }
              >
                Display column in table
              </Checkbox>
            </div>

            {renderEditor()}
          </>
        )}
      </div>

      {(isFilterPickerOpen || activeObject || activeFilter) && (
        <div style={styles.footer}>
          <Button variant="secondary" size="md" onClick={handleClear}>
            Clear all
          </Button>
          <Button
            variant="primary"
            size="md"
            iconLeading={<Icon name="Funnel" size="sm" />}
            isDisabled={selectedCount === 0}
            onClick={handleApply}
          >
            Apply filters
          </Button>
        </div>
      )}
    </aside>
  );
};

FilterPanel.displayName = "FilterPanel";

FilterPanel.Row = FilterPanelRow;
FilterPanel.RowLeft = FilterPanelRowLeft;
FilterPanel.RowType = FilterPanelRowType;
FilterPanel.RowTitle = FilterPanelRowTitle;
FilterPanel.RowRight = FilterPanelRowRight;
FilterPanel.RowBadges = FilterPanelRowBadges;
FilterPanel.RowChevron = FilterPanelRowChevron;
FilterPanel.Badge = Badge;
FilterPanel.Icon = Icon;

export const Row = FilterPanelRow;
Row.Left = FilterPanelRowLeft;
Row.Type = FilterPanelRowType;
Row.Title = FilterPanelRowTitle;
Row.Right = FilterPanelRowRight;
Row.Badges = FilterPanelRowBadges;
Row.Chevron = FilterPanelRowChevron;

export default FilterPanel;
