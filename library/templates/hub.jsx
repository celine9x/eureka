"use client";

/**
 * Hub Template
 *
 * A complete page layout template combining SideMenu, HubHeader, Table, and Pagination.
 * Use this as a starting point for list/hub pages in your application.
 */

import React, { useEffect, useMemo, useState } from "react";
import { SideMenu } from "../organisms/side-menu/side-menu.jsx";
import {
  HubHeader,
  HubHeaderActions,
} from "../organisms/hub-header.jsx";
import {
  FilterPanel,
  DEFAULT_FILTER_PANEL_OPTIONS,
  FILTER_TYPES,
} from "../organisms/filter-panel.jsx";
import {
  Table,
} from "../organisms/table/table.jsx";
import { Pagination } from "../organisms/pagination.jsx";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";
import { Checkbox } from "../atoms/checkbox.jsx";
import { RadioButton, RadioGroup } from "../atoms/radio-button.jsx";
import { Tooltip } from "../atoms/tooltip.jsx";
import { Search } from "../molecules/search.jsx";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../molecules/dropdown-menu.jsx";
import { Portal } from "../utils/portal.jsx";

const HUB_MENU_VARIANTS = {
  default: "default",
  deal: "deal",
};

const DEAL_MENU_SECTIONS = [
  {
    items: [
      { label: "Home", iconName: "Home" },
      { label: "Dashboard", iconName: "ChartBar" },
      { label: "Network", iconName: "Share" },
    ],
  },
  {
    title: "Workspace",
    items: [
      { label: "Initiatives", iconName: "initiative" },
      { label: "Opportunities", iconName: "opportunity", state: "active" },
      { label: "Agreements", iconName: "agreement" },
      { label: "Alliances", iconName: "alliance" },
      { label: "Obligations", iconName: "obligation" },
    ],
  },
  {
    title: "Directory",
    items: [
      { label: "Companies", iconName: "company" },
      { label: "Contacts", iconName: "contact" },
      { label: "Meetings", iconName: "meeting" },
    ],
    dividerAfter: true,
  },
  {
    title: "Recent Initiatives",
    items: [
      { label: "ALLINPART", iconColor: "var(--color-content-brand)", iconLetter: "A" },
    ],
  },
];

/* ===========================================
   STYLE CONFIGURATION
   =========================================== */

const styles = {
  base: `
    .hub {
      display: flex;
      height: 100vh;
      width: 100%;
      overflow: hidden;
    }
    .hub__sidebar {
      flex: 0 0 80px;
      width: 80px;
      min-width: 80px;
      flex-shrink: 0;
    }
    .hub__main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--color-general-neutral-light);
    }
    .hub__header {
      flex-shrink: 0;
      background: var(--color-general-neutral-light);
      border-bottom: 1px solid var(--color-action-outline-secondary-enabled);
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      column-gap: var(--spacing-6);
      padding: 0 var(--spacing-6);
    }
    .hub__header > * {
      grid-column: 2 / span 10;
    }
    .hub__body {
      flex: 1;
      overflow-y: auto;
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      column-gap: var(--spacing-6);
      padding: var(--spacing-6);
      align-content: start;
    }
    .hub__container {
      grid-column: 2 / span 10;
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: var(--spacing-6);
    }
    .hub__main-content {
      grid-column: span 12;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .hub__table-container {
      background: var(--color-general-white);
      border: 1px solid var(--color-action-outline-secondary-enabled);
      border-radius: var(--radius-lg);
      display: flex;
      flex-direction: column;
      min-width: 0;
      flex: 1;
    }
    .hub__table-content {
      display: flex;
      flex: 1;
      min-height: 0;
      overflow: hidden;
      border: 1px solid var(--color-action-outline-secondary-enabled);
      border-radius: var(--radius-lg);
      background: var(--color-general-white);
    }
    .hub__table-main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .hub__table-toolbar {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      gap: var(--spacing-3);
      margin-bottom: var(--spacing-3);
    }
    .hub__table-toolbar-suffix {
      margin-left: auto;
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
    }
    .hub__clear-filters-action {
      margin-left: auto;
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
    }
    .hub__active-filters {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      flex-wrap: wrap;
      min-height: 40px;
      min-width: 0;
      flex: 1;
    }
    .hub__filter-pill {
      height: 32px;
      max-width: 320px;
      padding: var(--spacing-sm);
      border-radius: var(--radius-sm);
      border: 1px solid var(--color-action-outline-secondary-enabled);
      box-shadow: var(--shadow-light-down);
      background: var(--color-general-white);
      color: var(--color-content-secondary);
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm);
      cursor: pointer;
      box-sizing: border-box;
      font-family: var(--font-family-primary);
      font-size: var(--text-body-lg);
      line-height: var(--line-height-body-lg);
    }
    .hub__filter-pill:focus-visible {
      outline: 2px solid var(--color-interaction-outline-active);
      outline-offset: 2px;
    }
    .hub__filter-pill-label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 220px;
    }
    .hub__filter-pill-meta {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm);
      flex-shrink: 0;
    }
    .hub__filter-pill-badge {
      min-width: 20px;
      height: 20px;
      padding: 0 var(--spacing-xs);
      border-radius: var(--radius-xs);
      border: 1px solid var(--color-action-outline-secondary-enabled);
      background: var(--color-general-neutral-lighter);
      color: var(--color-content-secondary);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: var(--text-body-md);
      line-height: var(--line-height-body-md);
      box-sizing: border-box;
    }
    .hub__filter-pill-icon-btn {
      width: 16px;
      height: 16px;
      border: none;
      background: transparent;
      color: var(--color-content-secondary);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0;
    }
    .hub__filter-editor {
      width: 336px;
      min-width: 336px;
      max-width: 336px;
      border-radius: var(--radius-md);
      background: var(--color-general-white);
      outline: 1px solid var(--color-action-outline-secondary-enabled);
      outline-offset: -1px;
      box-shadow: var(--shadow-light-down);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-sizing: border-box;
    }
    .hub__filter-editor-body {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
      padding: var(--spacing-2);
      max-height: 360px;
      overflow-y: auto;
      overflow-x: hidden;
      box-sizing: border-box;
    }
    .hub__filter-editor-row {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-2);
      width: 100%;
      padding: var(--spacing-sm);
      border-radius: var(--radius-sm);
      box-sizing: border-box;
      border: none;
      background: transparent;
      font-family: var(--font-family-primary);
      cursor: pointer;
    }
    .hub__filter-editor-row.is-selected {
      background: var(--color-general-neutral-lighter);
    }
    .hub__filter-editor-row-left {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm);
      min-width: 0;
    }
    .hub__filter-editor-row-label {
      color: var(--color-content-primary);
      font-size: var(--text-body-lg);
      line-height: var(--line-height-body-lg);
    }
    .hub__filter-editor-fields {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
      padding: var(--spacing-2);
    }
    .hub__filter-editor-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-2);
      min-width: 0;
    }
    .hub__filter-editor-grid > * {
      min-width: 0;
    }
    .hub__filter-editor-label {
      margin: 0;
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      line-height: var(--line-height-body-md);
      color: var(--color-content-secondary);
    }
    .hub__filter-editor-input-wrap {
      position: relative;
      display: flex;
      align-items: center;
      min-width: 0;
    }
    .hub__filter-editor-input {
      width: 100%;
      min-width: 0;
      height: 40px;
      padding: var(--spacing-sm) 32px var(--spacing-sm) var(--spacing-sm);
      border: none;
      border-radius: var(--radius-md);
      outline: 1px solid var(--color-interaction-outline-enabled);
      outline-offset: -1px;
      font-family: var(--font-family-primary);
      font-size: var(--text-body-lg);
      line-height: var(--line-height-body-lg);
      color: var(--color-content-primary);
      box-sizing: border-box;
      background: var(--color-interaction-fill-enabled);
    }
    .hub__filter-editor-input-clear {
      position: absolute;
      right: var(--spacing-sm);
      width: 16px;
      height: 16px;
      border: none;
      background: transparent;
      color: var(--color-content-secondary);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
    }
    .hub__filter-editor-empty {
      margin: 0;
      padding: var(--spacing-sm);
      color: var(--color-content-secondary);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      line-height: var(--line-height-body-md);
    }
    .hub__filter-editor-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-2);
      padding: var(--spacing-2) var(--spacing-4);
      border-top: 1px solid var(--color-action-outline-secondary-enabled);
      width: 100%;
      box-sizing: border-box;
    }
    .hub__filter-editor-footer > * {
      flex: 1 1 0;
      min-width: 0;
    }
    .hub__table-wrapper {
      overflow-x: auto;
      overflow-y: hidden;
      padding-bottom: 2px;
      border-radius: var(--radius-lg);
      flex: 1;
      min-height: 0;
    }
    .hub__footer {
      flex-shrink: 0;
      margin-top: var(--spacing-3);
      padding: var(--spacing-4);
      background: var(--color-general-white);
      border-top: 1px solid var(--color-action-outline-secondary-enabled);
      border: 1px solid var(--color-action-outline-secondary-enabled);
      border-radius: var(--radius-lg);
    }
    .hub__empty {
      text-align: center;
      padding: var(--spacing-8);
      color: var(--color-content-secondary);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
    }
    .hub__filter-panel-overlay {
      position: fixed;
      inset: 0;
      background: var(--color-general-lightbox);
      z-index: 400;
      opacity: 0;
      pointer-events: none;
      transition: opacity 240ms ease;
    }
    .hub__filter-panel-overlay.visible {
      opacity: 1;
      pointer-events: auto;
    }
    .hub__filter-panel-drawer {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 336px;
      max-width: 100vw;
      background: var(--color-general-white);
      z-index: 401;
      transform: translateX(100%);
      transition: transform 280ms cubic-bezier(0.32, 0, 0.15, 1);
      will-change: transform;
      display: flex;
    }
    .hub__filter-panel-drawer.open {
      transform: translateX(0);
      box-shadow: -4px 0 24px var(--color-general-lightbox);
    }
  `,
};

/* ===========================================
   STYLE INJECTION (SSR-safe)
   =========================================== */

let stylesInjected = false;

const injectStyles = () => {
  if (stylesInjected || typeof document === "undefined") return;

  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-eureka", "hub-template");
  styleEl.textContent = styles.base;
  document.head.appendChild(styleEl);
  stylesInjected = true;
};

const buildFilterLookup = (suggestions = [], allFilters = []) => {
  const map = {};

  suggestions.forEach((item) => {
    if (!item?.key) return;
    map[`suggestion::${String(item.key)}`] = {
      type: item.type || FILTER_TYPES.text,
      options: Array.isArray(item.options) ? item.options.map((option) => String(option)) : [],
      label: item.label || String(item.key),
      objectLabel: null,
    };
  });

  allFilters.forEach((group) => {
    const objectKey = String(group?.key || "");
    const objectLabel = String(group?.label || "");
    if (!objectKey) return;

    const filters = Array.isArray(group?.filters) ? group.filters : [];
    filters.forEach((item) => {
      if (!item?.key) return;
      map[`object:${objectKey}::${String(item.key)}`] = {
        type: item.type || FILTER_TYPES.text,
        options: Array.isArray(item.options) ? item.options.map((option) => String(option)) : [],
        label: item.label || String(item.key),
        objectLabel,
      };
    });
  });

  return map;
};

const createDefaultCriteria = (type) => ({
  type,
  includeEmpty: false,
  text: "",
  from: "",
  to: "",
  min: "",
  max: "",
  selectedOptions: [],
  selectedOption: "",
});

const normalizeCriteria = (criteria, type) => {
  const base = {
    ...createDefaultCriteria(type),
    ...(criteria || {}),
    type,
  };

  return {
    ...base,
    text: base.text ? String(base.text) : "",
    from: base.from ? String(base.from) : "",
    to: base.to ? String(base.to) : "",
    min: base.min ? String(base.min) : "",
    max: base.max ? String(base.max) : "",
    selectedOptions: Array.isArray(base.selectedOptions)
      ? base.selectedOptions.map((option) => String(option))
      : [],
    selectedOption: base.selectedOption ? String(base.selectedOption) : "",
    includeEmpty: Boolean(base.includeEmpty),
  };
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

/* ===========================================
   HUB TEMPLATE COMPONENT
   =========================================== */

/**
 * Hub
 *
 * A complete hub/list page template with sidebar navigation, header, table, and pagination.
 *
 * @example
 * <Hub
 *   title="Companies"
 *   badge="124"
 *   logoSrc="/logo.png"
 *   menuSections={[
 *     { items: [{ label: "Home", iconName: "Home" }] },
 *   ]}
 *   menuUser={{ name: "John", email: "john@example.com" }}
 *   headerActions={<Button variant="primary">Add Company</Button>}
 *   columns={[
 *     { key: "name", label: "Name", sortable: true },
 *     { key: "status", label: "Status", render: (val) => <Chip>{val}</Chip> },
 *   ]}
 *   data={companies}
 *   currentPage={1}
 *   totalPages={10}
 *   pageSize={10}
 *   onPageChange={setPage}
 * />
 */
export const Hub = ({
  // Header props
  title = "Hub",
  badge,
  headerActions,
  headerSecondary,
  headerLeftContent,
  // Menu props
  showSideMenu = true,
  menuVariant = HUB_MENU_VARIANTS.deal,
  menuCollapsedLogoSrc,
  menuExpandOnHover,
  menuVariantState,
  menuSections = [],
  menuUser,
  logoSrc,
  onMenuCreate,
  onMenuSearch,
  // Table props
  columns = [],
  data = [],
  renderRow,
  selectedRows = [],
  onRowSelect,
  onSelectAll,
  sortColumn,
  sortDirection,
  onSort,
  showCheckbox = false,
  emptyMessage = "No data available",
  // Pagination props
  currentPage = 1,
  totalPages = 1,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  showPagination = true,
  paginationAction,
  // General
  initialFilters = [],
  filterSuggestions = DEFAULT_FILTER_PANEL_OPTIONS.suggestions,
  filterOptions = DEFAULT_FILTER_PANEL_OPTIONS.allFilters,
  filterIncludedSuggestionKeys,
  filterIncludedFilterKeys,
  filterIncludedGroupKeys,
  filterMaxGroupCount,
  filterPanelTitle = "Filters",
  addFiltersLabel = "Add filters",
  onFiltersApply,
  showFilterActions = true,
  showFilterRemove = true,
  filterEditorRenderers = {},
  toolbarTopContent,
  filterToolbarSuffix,
  filterBadgeLabelResolver,
  className = "",
  ...props
}) => {
  injectStyles();

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [openChipId, setOpenChipId] = useState(null);
  const [chipDraftCriteria, setChipDraftCriteria] = useState({});

  const hasCustomMenuSections = Array.isArray(menuSections) && menuSections.length > 0;
  const isDealMenuVariant = menuVariant === HUB_MENU_VARIANTS.deal;
  const resolvedMenuSections = hasCustomMenuSections
    ? menuSections
    : isDealMenuVariant
      ? DEAL_MENU_SECTIONS
      : [];
  const resolvedMenuVariant = menuVariantState || (isDealMenuVariant ? "collapsed" : undefined);
  const resolvedMenuExpandOnHover =
    typeof menuExpandOnHover === "boolean"
      ? menuExpandOnHover
      : isDealMenuVariant;

  const classes = ["hub", className].filter(Boolean).join(" ");

  useEffect(() => {
    if (!isFilterPanelOpen || typeof document === "undefined") return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsFilterPanelOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFilterPanelOpen]);

  // Handle sort
  const handleSort = (column) => {
    if (!column.sortable) return;

    const newDirection =
      sortColumn === column.key
        ? sortDirection === "asc"
          ? "desc"
          : sortDirection === "desc"
          ? ""
          : "asc"
        : "asc";

    onSort?.(column.key, newDirection);
  };

  // Check if all rows are selected
  const allSelected = data.length > 0 && selectedRows.length === data.length;

  const resolvedColumns = [
    ...(showCheckbox
      ? [
          {
            key: "__select",
            header: <Checkbox isSelected={allSelected} onChange={() => onSelectAll?.()} />,
            type: "checkbox",
            width: "var(--size-button-xl)",
            renderCell: (_value, row) => (
              <Checkbox
                isSelected={selectedRows.includes(row.id)}
                onChange={() => onRowSelect?.(row.id)}
              />
            ),
          },
        ]
      : []),
    ...columns.map((column) => ({
      ...column,
      header: column.header ?? column.label,
      type: column.type ?? column.variant,
      sort: sortColumn === column.key ? sortDirection : "",
      onSort: () => handleSort(column),
      renderCell:
        typeof column.render === "function"
          ? (value, row, rowIndex) => column.render(value, row, rowIndex)
          : column.renderCell,
    })),
  ];

  // Default pagination action
  const defaultPaginationAction = (
    <Button
      variant="secondary"
      size="md"
      iconLeading={<Icon name="ArrowDownTray" size="sm" />}
      style={{ width: 32, padding: 0, justifyContent: "center" }}
    />
  );

  const shouldShowPagination = showPagination && data.length > 10;

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    setOpenChipId(null);
    setChipDraftCriteria({});
    setIsFilterPanelOpen(false);
    onFiltersApply?.(filters);
  };

  const handleRemoveFilter = (filterKey) => {
    const nextFilters = activeFilters.filter((item) => (item.id || item.key) !== filterKey);
    setActiveFilters(nextFilters);
    if (openChipId === filterKey) {
      setOpenChipId(null);
      setChipDraftCriteria({});
    }
    onFiltersApply?.(nextFilters);
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
    setOpenChipId(null);
    setChipDraftCriteria({});
    onFiltersApply?.([]);
  };

  const filterLookup = useMemo(
    () => buildFilterLookup(filterSuggestions, filterOptions),
    [filterSuggestions, filterOptions]
  );

  const resolveFilterMeta = (filter) => {
    const fallbackType = filter.type || FILTER_TYPES.text;
    const fallbackLabel = filter.label || "Filter";

    const rawKey = filter.id || filter.key;
    // Try direct key first, then suggestion-prefixed key as fallback
    const lookupMeta = rawKey
      ? filterLookup[rawKey] || filterLookup[`suggestion::${rawKey}`]
      : null;

    return {
      type: lookupMeta?.type || fallbackType,
      options: lookupMeta?.options || [],
      label: lookupMeta?.label || fallbackLabel,
      objectLabel: filter.objectLabel || lookupMeta?.objectLabel || null,
    };
  };

  const getDraftCriteria = (filter) => {
    const filterId = filter.id || filter.key;
    const meta = resolveFilterMeta(filter);
    const raw = chipDraftCriteria[filterId] || filter.criteria;
    return normalizeCriteria(raw, meta.type);
  };

  const updateDraftCriteria = (filter, updater) => {
    const filterId = filter.id || filter.key;
    const current = getDraftCriteria(filter);
    const next = typeof updater === "function" ? updater(current) : updater;
    setChipDraftCriteria((prev) => ({
      ...prev,
      [filterId]: normalizeCriteria(next, current.type),
    }));
  };

  const openChipEditor = (filter) => {
    const filterId = filter.id || filter.key;
    setChipDraftCriteria((prev) => ({
      ...prev,
      [filterId]: getDraftCriteria(filter),
    }));
  };

  const clearDraftForChip = (filter) => {
    const filterId = filter.id || filter.key;
    const meta = resolveFilterMeta(filter);
    setChipDraftCriteria((prev) => ({
      ...prev,
      [filterId]: createDefaultCriteria(meta.type),
    }));
  };

  const applyDraftForChip = (filter) => {
    const filterId = filter.id || filter.key;
    const draft = getDraftCriteria(filter);

    const nextFilters = activeFilters
      .map((item) => {
        const itemId = item.id || item.key;
        if (itemId !== filterId) return item;

        if (!hasActiveCriteria(draft)) return null;

        return {
          ...item,
          value: formatCriteriaSummary(draft),
          badgeCount: getAppliedOptionCount(draft),
          criteria: draft,
        };
      })
      .filter(Boolean);

    setActiveFilters(nextFilters);
    setOpenChipId(null);
    setChipDraftCriteria((prev) => {
      const next = { ...prev };
      delete next[filterId];
      return next;
    });
    onFiltersApply?.(nextFilters);
  };

  const renderChipEditor = (filter) => {
    const meta = resolveFilterMeta(filter);
    const draft = getDraftCriteria(filter);

    const clearableInput = ({ label, type = "text", value, onChange, onClear }) => (
      <div>
        <p className="hub__filter-editor-label">{label}</p>
        <div className="hub__filter-editor-input-wrap">
          <input
            className="hub__filter-editor-input"
            type={type}
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
          {value ? (
            <button
              type="button"
              className="hub__filter-editor-input-clear"
              onClick={onClear}
              aria-label={`Clear ${label.toLowerCase()}`}
            >
              <Icon name="XMark" size="sm" />
            </button>
          ) : null}
        </div>
      </div>
    );

    const filterId = filter.id || filter.key;
    const customRenderer = filterEditorRenderers[filterId];

    return (
      <div className="hub__filter-editor">
        <div className="hub__filter-editor-body">
          {customRenderer
            ? customRenderer(filter, { draft, updateDraft: (upd) => updateDraftCriteria(filter, upd) })
            : (<>
          {meta.type === FILTER_TYPES.text && (
            <div className="hub__filter-editor-fields">
              {clearableInput({
                label: meta.label,
                value: draft.text,
                onChange: (value) => updateDraftCriteria(filter, (prev) => ({ ...prev, text: value })),
                onClear: () => updateDraftCriteria(filter, (prev) => ({ ...prev, text: "" })),
              })}
              <div className="hub__filter-editor-row">
                <div className="hub__filter-editor-row-left">
                  <Checkbox
                    isSelected={draft.includeEmpty}
                    onChange={(checked) => updateDraftCriteria(filter, (prev) => ({ ...prev, includeEmpty: checked }))}
                  >
                    No {meta.label.toLowerCase()}
                  </Checkbox>
                </div>
              </div>
            </div>
          )}

          {meta.type === FILTER_TYPES.date && (
            <div className="hub__filter-editor-fields">
              <div className="hub__filter-editor-grid">
                {clearableInput({
                  label: "From",
                  type: "date",
                  value: draft.from,
                  onChange: (value) => updateDraftCriteria(filter, (prev) => ({ ...prev, from: value })),
                  onClear: () => updateDraftCriteria(filter, (prev) => ({ ...prev, from: "" })),
                })}
                {clearableInput({
                  label: "To",
                  type: "date",
                  value: draft.to,
                  onChange: (value) => updateDraftCriteria(filter, (prev) => ({ ...prev, to: value })),
                  onClear: () => updateDraftCriteria(filter, (prev) => ({ ...prev, to: "" })),
                })}
              </div>
              <div className="hub__filter-editor-row">
                <div className="hub__filter-editor-row-left">
                  <Checkbox
                    isSelected={draft.includeEmpty}
                    onChange={(checked) => updateDraftCriteria(filter, (prev) => ({ ...prev, includeEmpty: checked }))}
                  >
                    No {meta.label.toLowerCase()}
                  </Checkbox>
                </div>
              </div>
            </div>
          )}

          {meta.type === FILTER_TYPES.numberRange && (
            <div className="hub__filter-editor-fields">
              <div className="hub__filter-editor-grid">
                {clearableInput({
                  label: "Min",
                  type: "number",
                  value: draft.min,
                  onChange: (value) => updateDraftCriteria(filter, (prev) => ({ ...prev, min: value })),
                  onClear: () => updateDraftCriteria(filter, (prev) => ({ ...prev, min: "" })),
                })}
                {clearableInput({
                  label: "Max",
                  type: "number",
                  value: draft.max,
                  onChange: (value) => updateDraftCriteria(filter, (prev) => ({ ...prev, max: value })),
                  onClear: () => updateDraftCriteria(filter, (prev) => ({ ...prev, max: "" })),
                })}
              </div>
              <div className="hub__filter-editor-row">
                <div className="hub__filter-editor-row-left">
                  <Checkbox
                    isSelected={draft.includeEmpty}
                    onChange={(checked) => updateDraftCriteria(filter, (prev) => ({ ...prev, includeEmpty: checked }))}
                  >
                    No {meta.label.toLowerCase()}
                  </Checkbox>
                </div>
              </div>
            </div>
          )}

          {meta.type === FILTER_TYPES.multipleChoice && (
            <>
              <Search
                size="lg"
                placeholder={`Search in ${meta.label.toLowerCase()}`}
                value={draft.text}
                onChange={(value) => updateDraftCriteria(filter, (prev) => ({ ...prev, text: value }))}
              />

              {(draft.text.trim()
                ? meta.options.filter((option) => option.toLowerCase().includes(draft.text.trim().toLowerCase()))
                : meta.options
              ).map((option) => {
                const selected = new Set(draft.selectedOptions);
                const isSelected = selected.has(option);
                return (
                  <button
                    key={option}
                    type="button"
                    className={`hub__filter-editor-row${isSelected ? " is-selected" : ""}`}
                    onClick={() => {
                      updateDraftCriteria(filter, (prev) => {
                        const next = new Set(prev.selectedOptions);
                        if (next.has(option)) {
                          next.delete(option);
                        } else {
                          next.add(option);
                        }
                        return {
                          ...prev,
                          selectedOptions: Array.from(next),
                        };
                      });
                    }}
                  >
                    <div className="hub__filter-editor-row-left">
                      <Checkbox isSelected={isSelected} onChange={() => {}}>{option}</Checkbox>
                    </div>
                  </button>
                );
              })}

              {(draft.text.trim()
                ? meta.options.filter((option) => option.toLowerCase().includes(draft.text.trim().toLowerCase()))
                : meta.options
              ).length === 0 ? <p className="hub__filter-editor-empty">No options found.</p> : null}

              <div className="hub__filter-editor-row">
                <div className="hub__filter-editor-row-left">
                  <Checkbox
                    isSelected={draft.includeEmpty}
                    onChange={(checked) => updateDraftCriteria(filter, (prev) => ({ ...prev, includeEmpty: checked }))}
                  >
                    Blank(s)
                  </Checkbox>
                </div>
              </div>
            </>
          )}

          {meta.type === FILTER_TYPES.singleChoice && (
            <div className="hub__filter-editor-fields">
              <RadioGroup
                name={`hub-chip-${filter.id || filter.key}`}
                value={draft.selectedOption}
                onChange={(value) => updateDraftCriteria(filter, (prev) => ({ ...prev, selectedOption: value }))}
              >
                {meta.options.map((option) => (
                  <div key={option} className="hub__filter-editor-row">
                    <div className="hub__filter-editor-row-left">
                      <RadioButton value={option}>{option}</RadioButton>
                    </div>
                  </div>
                ))}
              </RadioGroup>

              <div className="hub__filter-editor-row">
                <div className="hub__filter-editor-row-left">
                  <Checkbox
                    isSelected={draft.includeEmpty}
                    onChange={(checked) => updateDraftCriteria(filter, (prev) => ({ ...prev, includeEmpty: checked }))}
                  >
                    No {meta.label.toLowerCase()}
                  </Checkbox>
                </div>
              </div>
            </div>
          )}
          </>)}
        </div>

        <div className="hub__filter-editor-footer">
          <Button variant="secondary" size="md" onClick={() => clearDraftForChip(filter)}>
            Clear
          </Button>
          <Button
            variant="primary"
            size="md"
            iconLeading={<Icon name="Funnel" size="sm" />}
            isDisabled={!hasActiveCriteria(draft)}
            onClick={() => applyDraftForChip(filter)}
          >
            Apply filters
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={classes} {...props}>
      {/* Side Menu */}
      {showSideMenu && (
        <div className="hub__sidebar">
          <SideMenu
            position="fixed"
            variant={resolvedMenuVariant}
            expandOnHover={resolvedMenuExpandOnHover}
            logoSrc={logoSrc}
            collapsedLogoSrc={menuCollapsedLogoSrc}
            sections={resolvedMenuSections}
            user={menuUser}
            onCreateClick={onMenuCreate}
            onSearchChange={onMenuSearch}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="hub__main">
        {/* Header */}
        <div className="hub__header">
          <HubHeader
            title={title}
            badge={badge}
            leftContent={headerLeftContent}
            rightContent={headerActions}
            secondaryContent={headerSecondary}
          />
        </div>

        {/* Body with Table */}
        <div className="hub__body">
          <div className="hub__container">
          <div className="hub__main-content">
          {toolbarTopContent ? <div style={{ marginBottom: "var(--spacing-3)" }}>{toolbarTopContent}</div> : null}
          <div className="hub__table-toolbar">
            {activeFilters.length === 0 ? (
              <Button
                variant="secondary"
                size="md"
                iconLeading={<Icon name="Plus" size="sm" />}
                onClick={() => setIsFilterPanelOpen(true)}
              >
                {addFiltersLabel}
              </Button>
            ) : (
              <>
                <div className="hub__active-filters">
                  {activeFilters.map((filter) => {
                    const filterId = filter.id || filter.key;
                    const resolvedBadgeLabel = filterBadgeLabelResolver?.(filter);
                    const badgeLabel = resolvedBadgeLabel != null
                      ? String(resolvedBadgeLabel)
                      : (typeof filter.badgeCount === "number" ? String(filter.badgeCount) : filter.value || "");

                    return (
                      <DropdownMenu
                        key={filterId}
                        open={openChipId === filterId}
                        onOpenChange={(nextOpen) => {
                          setOpenChipId(nextOpen ? filterId : null);
                          if (nextOpen) {
                            openChipEditor(filter);
                          }
                        }}
                        closeOnSelect={false}
                      >
                        <DropdownMenuTrigger asChild>
                          <div
                            role="button"
                            tabIndex={0}
                            className="hub__filter-pill"
                          >
                            <span className="hub__filter-pill-label">{filter.label}</span>
                            <span className="hub__filter-pill-meta">
                              {badgeLabel ? (
                                <span className="hub__filter-pill-badge">{badgeLabel}</span>
                              ) : null}
                              <span className="hub__filter-pill-icon-btn" aria-hidden="true">
                                <Icon name="ChevronDown" size="sm" />
                              </span>
                              {showFilterRemove && (
                                <button
                                  type="button"
                                  className="hub__filter-pill-icon-btn"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    handleRemoveFilter(filterId);
                                  }}
                                  aria-label={`Remove ${filter.label} filter`}
                                >
                                  <Icon name="XMark" size="sm" />
                                </button>
                              )}
                            </span>
                          </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="left"
                          position="bottom"
                          width={336}
                          style={{ maxWidth: 336 }}
                        >
                          {renderChipEditor(filter)}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    );
                  })}

                  {showFilterActions && (
                    <Button
                      variant="secondary"
                      size="md"
                      iconLeading={<Icon name="Plus" size="sm" />}
                      onClick={() => setIsFilterPanelOpen(true)}
                    >
                      More filters
                    </Button>
                  )}
                </div>
                {showFilterActions && (
                  <div className="hub__clear-filters-action">
                    <Tooltip content="Remove all" placement="bottom-right">
                      <Button
                        variant="secondary"
                        color="secondary-destructive"
                        size="md"
                        iconOnly
                        ariaLabel="Remove all active filters"
                        iconLeading={<Icon name="XMark" size="sm" />}
                        onClick={handleClearFilters}
                      />
                    </Tooltip>
                  </div>
                )}
                {filterToolbarSuffix ? (
                  <div className="hub__table-toolbar-suffix">{filterToolbarSuffix}</div>
                ) : null}
              </>
            )}
          </div>

          <div className="hub__table-content">
            <div className="hub__table-main">
              <div className="hub__table-wrapper">
                <Table
                  columns={resolvedColumns}
                  rows={data}
                  rowKey="id"
                  emptyState={<div className="hub__empty">{emptyMessage}</div>}
                />
              </div>
            </div>
          </div>

          {shouldShowPagination && (
            <div className="hub__footer">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
                actionButton={paginationAction !== undefined ? paginationAction : defaultPaginationAction}
              />
            </div>
          )}
          </div>{/* /hub__main-content */}
          </div>{/* /hub__container */}
        </div>
      </div>

      <Portal containerId="hub-filter-panel-portal">
        <div
          className={`hub__filter-panel-overlay${isFilterPanelOpen ? " visible" : ""}`}
          onClick={() => setIsFilterPanelOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`hub__filter-panel-drawer${isFilterPanelOpen ? " open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label={filterPanelTitle}
        >
          <FilterPanel
            isOpen={isFilterPanelOpen}
            title={filterPanelTitle}
            suggestions={filterSuggestions}
            allFilters={filterOptions}
            includedSuggestionKeys={filterIncludedSuggestionKeys}
            includedFilterKeys={filterIncludedFilterKeys}
            includedGroupKeys={filterIncludedGroupKeys}
            maxGroupCount={filterMaxGroupCount}
            showActivePreview={false}
            initialSelected={activeFilters}
            onClose={() => setIsFilterPanelOpen(false)}
            onClear={handleClearFilters}
            onApply={handleApplyFilters}
          />
        </div>
      </Portal>
    </div>
  );
};

Hub.displayName = "Hub";
Hub.SideMenu = SideMenu;
Hub.Header = HubHeader;
Hub.HeaderActions = HubHeaderActions;
Hub.FilterPanel = FilterPanel;
Hub.Table = Table;
Hub.Pagination = Pagination;
Hub.Button = Button;
Hub.Icon = Icon;
Hub.Checkbox = Checkbox;
Hub.RadioButton = RadioButton;
Hub.RadioGroup = RadioGroup;
Hub.Search = Search;
Hub.DropdownMenu = DropdownMenu;
Hub.DropdownMenuTrigger = DropdownMenuTrigger;
Hub.DropdownMenuContent = DropdownMenuContent;

export default Hub;
