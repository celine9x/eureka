import React, { useMemo, useState } from "react";
import { Hub } from "../../library/templates/hub.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { Checkbox } from "../../library/atoms/checkbox.jsx";
import { Chip } from "../../library/atoms/chip.jsx";
import { DropdownMenuDivider } from "../../library/molecules/dropdown-menu-item.jsx";
import { DropdownList, DropdownListItem, DropdownSection } from "../../library/molecules/dropdown-list.jsx";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "../../library/molecules/dropdown-menu.jsx";
import {
  RESULT_ASSETS,
  buildInitialFilters,
  buildHubFilterSuggestionsFromCriteria,
  filterAssets,
  SEARCH_FIELDS,
  OPTION_LABEL_MAP,
  CONDITION_LABELS,
  ONTOLOGY_FIELD_TREES,
} from "./nexus-search-data.js";
import Button from "../../library/atoms/button.jsx";

// ─────────────────────────────────────────────
// ONTOLOGY HELPERS
// ─────────────────────────────────────────────

const ONTOLOGY_FIELDS = ["drug-type", "target", "clinical-indication"];

const ontologyBuildLookup = (nodes, map = new Map()) => {
  nodes.forEach((node) => {
    map.set(node.id, node);
    if (node.children?.length) ontologyBuildLookup(node.children, map);
  });
  return map;
};

const ontologyGetLeafIds = (node) => {
  if (!node.children || node.children.length === 0) return [node.id];
  return node.children.flatMap(ontologyGetLeafIds);
};

const ontologyMatchesTree = (node, query) => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  if (node.label.toLowerCase().includes(normalized)) return true;
  return (node.children || []).some((child) => ontologyMatchesTree(child, query));
};

const ontologyFilterTreeBySearch = (nodes, query) => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return nodes;

  return nodes.reduce((acc, node) => {
    const filteredChildren = ontologyFilterTreeBySearch(node.children || [], query);
    const selfMatches = node.label.toLowerCase().includes(normalized);
    if (selfMatches || filteredChildren.length > 0) {
      acc.push({ ...node, children: filteredChildren });
    }
    return acc;
  }, []);
};

const ontologyCollectNodeIds = (nodes) => {
  return nodes.flatMap((node) => [
    node.id,
    ...(node.children?.length ? ontologyCollectNodeIds(node.children) : []),
  ]);
};

// Build a tree showing only selected nodes with their ancestors
const buildSelectedTree = (nodes, selectedIds, map) => {
  return nodes.reduce((acc, node) => {
    const leafIds = ontologyGetLeafIds(node);
    const hasSelected = leafIds.some((id) => selectedIds.has(id));
    if (!hasSelected) return acc;

    const child = {
      id: node.id,
      label: node.label,
      isSelected: selectedIds.has(node.id),
    };
    if (node.children?.length) {
      child.children = buildSelectedTree(node.children, selectedIds, map);
    }
    acc.push(child);
    return acc;
  }, []);
};

const RenderTreeNode = ({ node, depth = 0 }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children?.length > 0;

  return (
    <div>
      <div
        style={{
          paddingLeft: `calc(var(--spacing-sm) + ${depth} * 16px)`,
          paddingTop: "6px",
          paddingBottom: "6px",
          paddingRight: "12px",
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-xs)",
          fontFamily: "var(--font-family-primary)",
          fontSize: "var(--text-body-md)",
          color: "var(--color-content-primary)",
          lineHeight: "var(--line-height-body-md)",
        }}
      >
        {hasChildren ? (
          <button
            type="button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 16,
              height: 16,
              border: "none",
              background: "transparent",
              color: "var(--color-content-secondary)",
              cursor: "pointer",
              flexShrink: 0,
              padding: 0,
            }}
            onClick={() => setExpanded(!expanded)}
          >
            <Icon name={expanded ? "ChevronDown" : "ChevronRight"} size={12} />
          </button>
        ) : (
          <span style={{ width: 16, flexShrink: 0 }} />
        )}
        {node.isSelected && (
          <span
            style={{
              display: "inline-flex",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--color-interaction-fill-enabled)",
              flexShrink: 0,
            }}
          />
        )}
        {node.label}
      </div>
      {hasChildren && expanded && node.children.map((child) => <RenderTreeNode key={child.id} node={child} depth={depth + 1} />)}
    </div>
  );
};

const GroupedFilterEditor = ({ draft, updateDraft, fieldId, scopeIds, extraIds, showDivider }) => {
  const selectedSet = useMemo(() => new Set(draft.selectedOptions || []), [draft.selectedOptions]);
  const hasTwoGroups = showDivider && scopeIds.length > 0 && extraIds.length > 0;
  const isOntology = ONTOLOGY_FIELDS.includes(fieldId);
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedSearch = searchQuery.trim().toLowerCase();

  const getLabel = (id) => OPTION_LABEL_MAP[id] || id;
  const filterBySearch = (ids) => {
    if (!normalizedSearch) return ids;
    return ids.filter((id) => getLabel(id).toLowerCase().includes(normalizedSearch));
  };

  const visibleScopeIds = filterBySearch(scopeIds);
  const visibleExtraIds = filterBySearch(extraIds);
  const visibleSearchResultIds = [...new Set([...visibleScopeIds, ...visibleExtraIds])];
  const ontologyTree = ONTOLOGY_FIELD_TREES[fieldId] || [];

  const ontologyVisibleNodeIds = useMemo(() => {
    if (!isOntology || normalizedSearch.length === 0) return [];
    const scopedTree = buildSelectedTree(ontologyTree, new Set([...scopeIds, ...extraIds]));
    const filteredTree = ontologyFilterTreeBySearch(scopedTree, searchQuery);
    return [...new Set(ontologyCollectNodeIds(filteredTree))];
  }, [isOntology, normalizedSearch, ontologyTree, scopeIds, extraIds, searchQuery]);

  const visibleIdsForSelectAll = isOntology ? ontologyVisibleNodeIds : visibleSearchResultIds;
  const shouldShowSelectAllSearchResults = normalizedSearch.length > 0 && visibleIdsForSelectAll.length > 0;
  const allSearchResultsSelected =
    visibleIdsForSelectAll.length > 0 && visibleIdsForSelectAll.every((id) => selectedSet.has(id));

  const onItemChange = ({ value }) => {
    updateDraft((prev) => {
      const next = new Set(prev.selectedOptions || []);
      next.has(value) ? next.delete(value) : next.add(value);
      return { ...prev, selectedOptions: [...next] };
    });
  };

  const onSelectAllSearchResults = () => {
    updateDraft((prev) => {
      const next = new Set(prev.selectedOptions || []);
      if (allSearchResultsSelected) {
        visibleIdsForSelectAll.forEach((id) => next.delete(id));
      } else {
        visibleIdsForSelectAll.forEach((id) => next.add(id));
      }
      return { ...prev, selectedOptions: [...next] };
    });
  };

  const onToggleExpanded = (nodeId) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(nodeId) ? next.delete(nodeId) : next.add(nodeId);
      return next;
    });
  };

  const renderItems = (ids) =>
    ids.map((id) => (
      <DropdownListItem
        key={id}
        value={id}
        checked={selectedSet.has(id)}
        onChange={onItemChange}
        style={{ padding: "4px 8px" }}
      >
        {getLabel(id)}
      </DropdownListItem>
    ));

  const renderOntologyTree = (ids) => {
    const selectedTree = buildSelectedTree(ontologyTree, new Set(ids));
    const visibleTree = ontologyFilterTreeBySearch(selectedTree, searchQuery);
    
    const renderNode = (node, depth = 0) => {
      const hasChildren = node.children?.length > 0;
      const isExpanded = expandedIds.has(node.id);
      
      return (
        <div key={node.id}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-xs)",
              paddingLeft: `calc(var(--spacing-sm) + ${depth} * 16px)`,
              paddingTop: "4px",
              paddingBottom: "4px",
              paddingRight: "8px",
            }}
          >
            {hasChildren ? (
              <button
                type="button"
                onClick={() => onToggleExpanded(node.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 16,
                  height: 16,
                  border: "none",
                  background: "transparent",
                  color: "var(--color-content-secondary)",
                  cursor: "pointer",
                  flexShrink: 0,
                  padding: 0,
                }}
              >
                <Icon name={isExpanded ? "ChevronDown" : "ChevronRight"} size={12} />
              </button>
            ) : (
              <span style={{ width: 16, flexShrink: 0 }} />
            )}
            <Checkbox
              size="sm"
              isSelected={selectedSet.has(node.id)}
              onChange={() => onItemChange({ value: node.id })}
            />
            <label style={{ cursor: "pointer", flex: 1, fontSize: "var(--text-body-md)" }}>
              {node.label}
            </label>
          </div>
          {hasChildren && isExpanded && node.children.map((child) => renderNode(child, depth + 1))}
        </div>
      );
    };

    return visibleTree.map((node) => renderNode(node, 0));
  };

  return (
    <DropdownList
      noSearch={false}
      noAdd
      onSearch={setSearchQuery}
      searchPlaceholder="Search..."
      style={{
        outline: "none",
        boxShadow: "none",
        borderRadius: 0,
        background: "transparent",
        "--dropdown-list-max-height": "280px",
      }}
    >
      {shouldShowSelectAllSearchResults && (
        <DropdownListItem
          value="__select-all-search-results__"
          checked={allSearchResultsSelected}
          onChange={onSelectAllSearchResults}
          style={{ borderBottom: "1px solid var(--color-action-outline-secondary-enabled)" }}
        >
          Select all search results
        </DropdownListItem>
      )}
      {isOntology ? (
        hasTwoGroups ? (
          <>
            <DropdownSection title="From initial search">
              {renderOntologyTree(scopeIds)}
            </DropdownSection>
            <DropdownMenuDivider />
            <DropdownSection title="Also found in results">
              {renderOntologyTree(extraIds)}
            </DropdownSection>
          </>
        ) : (
          renderOntologyTree([...scopeIds, ...extraIds])
        )
      ) : (
        hasTwoGroups ? (
          <>
            {visibleScopeIds.length > 0 ? (
              <DropdownSection title="From initial search">{renderItems(visibleScopeIds)}</DropdownSection>
            ) : null}
            {visibleScopeIds.length > 0 && visibleExtraIds.length > 0 ? <DropdownMenuDivider /> : null}
            {visibleExtraIds.length > 0 ? (
              <DropdownSection title="Also found in results">{renderItems(visibleExtraIds)}</DropdownSection>
            ) : null}
          </>
        ) : (
          <>
            {renderItems(visibleScopeIds)}
            {renderItems(visibleExtraIds)}
          </>
        )
      )}
    </DropdownList>
  );
};

const menuSections = [
  {
    items: [
      { label: "Home", iconName: "Home" },
      { label: "Deals", iconName: "DocumentText" },
      { label: "Tasks", iconName: "ClipboardDocumentList" },
      { label: "Settings", iconName: "Cog6Tooth" },
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
];

const menuUser = {
  name: "Alexandra Johnson",
  email: "alexandra@example.com",
  avatar: null,
};

const criteriaColumns = SEARCH_FIELDS.map((field) => ({
  key: field.id,
  label: field.label,
  type: "short-text",
  renderCell: (val) => {
    const ids = Array.isArray(val) ? val : val != null ? [val] : [];
    if (ids.length === 0) return <span style={{ color: "var(--color-content-tertiary)", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)" }}>—</span>;
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {ids.map((id) => (
          <span
            key={id}
            style={{
              display: "inline-flex", alignItems: "center",
              padding: "2px 8px",
              background: "var(--color-general-neutral-light)",
              border: "1px solid var(--color-action-outline-secondary-enabled)",
              borderRadius: "var(--radius-full)",
              fontFamily: "var(--font-family-primary)",
              fontSize: "var(--text-body-sm)",
              color: "var(--color-content-primary)",
              whiteSpace: "nowrap",
            }}
          >
            {OPTION_LABEL_MAP[id] || id}
          </span>
        ))}
      </div>
    );
  },
}));

const columns = [
  { key: "name", label: "Name", sortable: true, type: "short-text" },
  {
    key: "company",
    label: "Company",
    sortable: true,
    type: "short-text",
    renderCell: (val) => (
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <span
          style={{
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-body-md)",
            color: "var(--color-content-primary)",
            lineHeight: "var(--line-height-body-md)",
          }}
        >
          {val?.primary ?? val}
        </span>
        {val?.secondary && (
          <span
            style={{
              fontFamily: "var(--font-family-primary)",
              fontSize: "var(--text-body-sm)",
              color: "var(--color-content-secondary)",
              lineHeight: "var(--line-height-body-sm)",
            }}
          >
            {val.secondary}
          </span>
        )}
      </div>
    ),
  },
  ...criteriaColumns,
  { key: "status", label: "Status", type: "badge" },
  { key: "value", label: "Value", sortable: true, type: "short-text" },
  { key: "startDate", label: "Start date", sortable: true, type: "short-text" },
  { key: "owner", label: "Owner", type: "short-text" },
  { key: "action", label: "", type: "button" },
];

const parseSearchCriteria = () => {
  if (typeof window === "undefined") return { searchName: "", items: [] };

  const params = new URLSearchParams(window.location.search);
  const encodedCriteria = params.get("criteria");
  if (!encodedCriteria) return { searchName: "", items: [] };

  try {
    return JSON.parse(decodeURIComponent(encodedCriteria));
  } catch {
    return { searchName: "", items: [] };
  }
};

const POSITIVE_SCOPE_CONDITIONS = new Set(["has-any-of", "has-all-of", "is-exactly"]);
const NO_VALUE_CONDITIONS = new Set(["is-empty", "is-not-empty"]);

const flattenCriteriaRowsForStrip = (items = []) => {
  const rows = [];
  items.forEach((item, itemIndex) => {
    if (item.type === "row") {
      rows.push({
        logic: itemIndex === 0 ? "Where" : item.logic || "And",
        row: item,
      });
      return;
    }

    if (item.type === "group") {
      const groupRows = Array.isArray(item.rows) ? item.rows : [];
      groupRows.forEach((row, groupIndex) => {
        rows.push({
          logic:
            itemIndex === 0 && groupIndex === 0
              ? "Where"
              : groupIndex === 0
                ? item.logic || "And"
                : item.rowLogic || "And",
          row,
        });
      });
    }
  });
  return rows;
};

const getCriteriaValueLabels = (row) => {
  const isOntology = ONTOLOGY_FIELDS.includes(row.fieldId);
  const rawValues = NO_VALUE_CONDITIONS.has(row.conditionId)
    ? []
    : Array.isArray(row.value)
      ? row.value
      : row.value != null
        ? [row.value]
        : [];

  if (isOntology) {
    return { type: "ontology", fieldId: row.fieldId, valueIds: new Set(rawValues) };
  }
  return { type: "flat", labels: rawValues.map((valueId) => OPTION_LABEL_MAP[valueId] || String(valueId)) };
};

const SearchScopeStrip = ({ items, onEdit }) => {
  const rows = useMemo(() => flattenCriteriaRowsForStrip(items), [items]);
  const [openChipId, setOpenChipId] = useState(null);

  return (
    <div
      style={{
        background: "var(--color-general-neutral-default)",
        border: "1px solid var(--color-action-outline-secondary-enabled)",
      
        borderRadius: "var(--radius-lg)",
        padding: "var(--spacing-md)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--spacing-md)",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--spacing-sm)", minWidth: 0, flex: 1 }}>
        <span
          style={{
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-body-lg)",
            color: "var(--color-content-primary)",
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          Search scope
        </span>
        {rows.map(({ row }, index) => {
          const fieldLabel = SEARCH_FIELDS.find((field) => field.id === row.fieldId)?.label || row.fieldId;
          const valueLabels = getCriteriaValueLabels(row);
          const valueCount = valueLabels.type === "ontology" ? valueLabels.valueIds.size : valueLabels.labels.length;
          const chipLabel = `${fieldLabel} (${valueCount})`;
          const chipId = row.id || `${row.fieldId}-${index}`;
          const isOpen = openChipId === chipId;

          return (
            <DropdownMenu key={chipId} open={isOpen} onOpenChange={(open) => setOpenChipId(open ? chipId : null)}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: 0,
                    display: "inline-flex",
                    minWidth: 0,
                    maxWidth: "100%",
                    cursor: "pointer",
                  }}
                >
                  <Chip
                    size="md"
                    chevron
                    style={{
                      maxWidth: 460,
                      background: "var(--color-general-white)",
                      outline: isOpen ? "1px solid var(--color-interaction-outline-active)" : "1px solid var(--color-action-outline-secondary-enabled)",
                      outlineOffset: -1,
                      boxShadow: "none",
                    }}
                  >
                    {chipLabel}
                  </Chip>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="left" position="bottom" width={280}>
                <div style={{ padding: "8px 0", maxHeight: 240, overflowY: "auto" }}>
                  {valueCount > 0 ? (
                    valueLabels.type === "ontology" ? (
                      (() => {
                        const tree = ONTOLOGY_FIELD_TREES[valueLabels.fieldId] || [];
                        const selectedTree = buildSelectedTree(tree, valueLabels.valueIds);
                        return selectedTree.length > 0 ? (
                          selectedTree.map((node) => <RenderTreeNode key={node.id} node={node} depth={0} />)
                        ) : (
                          <div style={{ padding: "6px 12px", color: "var(--color-content-secondary)" }}>
                            {CONDITION_LABELS[row.conditionId] || "No values"}
                          </div>
                        );
                      })()
                    ) : (
                      valueLabels.labels.map((value) => (
                        <div
                          key={`${fieldLabel}-${value}`}
                          style={{
                            padding: "6px 12px",
                            fontFamily: "var(--font-family-primary)",
                            fontSize: "var(--text-body-md)",
                            color: "var(--color-content-primary)",
                            lineHeight: "var(--line-height-body-md)",
                          }}
                        >
                          {value}
                        </div>
                      ))
                    )
                  ) : (
                    <div
                      style={{
                        padding: "6px 12px",
                        fontFamily: "var(--font-family-primary)",
                        fontSize: "var(--text-body-md)",
                        color: "var(--color-content-secondary)",
                        lineHeight: "var(--line-height-body-md)",
                      }}
                    >
                      {CONDITION_LABELS[row.conditionId] || "No values"}
                    </div>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        })}
      </div>

      <Button
        variant="secondary"
        size="sm"
        iconLeading={<Icon name="PencilSquare" size={16} />}
        onClick={onEdit}
        aria-label="Edit search scope"
      >
        Edit
      </Button>
    </div>
  );
};

export const AdvancedFiltersResults2Page = () => {
  const [page, setPage] = useState(1);

  const { searchName, items } = parseSearchCriteria();

  const filterSuggestions = useMemo(() => buildHubFilterSuggestionsFromCriteria(items), []);

  const baseAssets = useMemo(() => filterAssets(RESULT_ASSETS, items), []);

  const openSearchBuilder = () => {
    const params = new URLSearchParams(window.location.search);
    const criteria = params.get("criteria");
    const url = criteria
      ? `/nexus/search2?criteria=${criteria}`
      : "/nexus/search2";
    window.history.pushState({}, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const criteriaByField = useMemo(() => {
    const byField = {};
    const visit = (row) => {
      if (!row.fieldId) return;
      byField[row.fieldId] = row;
    };
    items.forEach((item) => {
      if (item.type === "row") visit(item);
      else if (item.type === "group") (item.rows || []).forEach(visit);
    });
    return byField;
  }, [items]);

  const fieldValueBuckets = useMemo(() => {
    const buckets = {};
    SEARCH_FIELDS.forEach((field) => {
      const criteria = criteriaByField[field.id];
      const isConfigured = Boolean(criteria);
      const allFoundIds = [...new Set(baseAssets.flatMap((asset) => asset[field.id] || []))];
      const criteriaIds = criteria && !NO_VALUE_CONDITIONS.has(criteria.conditionId)
        ? (Array.isArray(criteria.value) ? criteria.value : criteria.value != null ? [criteria.value] : [])
        : [];

      const scopeIds = isConfigured
        ? (POSITIVE_SCOPE_CONDITIONS.has(criteria.conditionId) && criteriaIds.length > 0
            ? criteriaIds
            : allFoundIds)
        : [];

      const scopeIdSet = new Set(scopeIds);
      const emergedIds = allFoundIds.filter((id) => !scopeIdSet.has(id));

      buckets[field.id] = {
        isConfigured,
        scopeIds,
        emergedIds,
        allFoundIds,
      };
    });
    return buckets;
  }, [baseAssets, criteriaByField]);

  const initialFilters = useMemo(() => {
    const base = buildInitialFilters(items);
    // For this page, always start with no filter options selected.
    return base.map((f) => ({
      ...f,
      label: SEARCH_FIELDS.find((field) => field.id === (f.id || f.key))?.label || f.label,
      value: undefined,
      badgeCount: undefined,
      criteria: {
        ...f.criteria,
        selectedOptions: [],
      },
    }));
  }, [items]);

  const [appliedFilters, setAppliedFilters] = useState(() => initialFilters);

  const filterEditorRenderers = useMemo(() =>
    Object.fromEntries(
      SEARCH_FIELDS.map((field) => [
        field.id,
        (_filter, { draft, updateDraft }) => {
          const bucket = fieldValueBuckets[field.id] || {
            isConfigured: false,
            scopeIds: [],
            emergedIds: [],
            allFoundIds: [],
          };

          const scopeIds = bucket.isConfigured
            ? bucket.scopeIds
            : bucket.allFoundIds;
          const extraIds = bucket.isConfigured ? bucket.emergedIds : [];

          return (
            <GroupedFilterEditor
              draft={draft}
              updateDraft={updateDraft}
              fieldId={field.id}
              scopeIds={scopeIds}
              extraIds={extraIds}
              showDivider={bucket.isConfigured && extraIds.length > 0}
            />
          );
        },
      ])
    ), [fieldValueBuckets]);

  const filterBadgeCountsById = useMemo(() => {
    const map = {};
    SEARCH_FIELDS.forEach((field) => {
      const bucket = fieldValueBuckets[field.id];
      if (!bucket) return;

      if (!bucket.isConfigured) {
        map[field.id] = bucket.allFoundIds.length;
        return;
      }

      map[field.id] = bucket.scopeIds.length + bucket.emergedIds.length;
    });
    return map;
  }, [fieldValueBuckets]);

  const tableData = useMemo(
    () =>
      baseAssets
        .filter((asset) =>
          appliedFilters.every((f) => {
            const fieldId = f.id || f.key;
            const selectedOptions = f.criteria?.selectedOptions || [];
            if (!selectedOptions.length) return true;
            const assetValues = asset[fieldId] || [];
            // selectedOptions and assetValues are both IDs
            return assetValues.some((id) => selectedOptions.includes(id));
          })
        )
        .map((asset) => ({
          ...asset,
          value: asset.dealValue,
          action: {
            iconName: "EllipsisVertical",
            iconOnly: true,
            ariaLabel: "More actions",
          },
        })),
    [appliedFilters, baseAssets],
  );

  return (
    <Hub
      title={searchName || "Search Results"}
      badge={String(tableData.length)}
      menuSections={menuSections}
      menuUser={menuUser}
      toolbarTopContent={
        <SearchScopeStrip
          items={items}
          onEdit={openSearchBuilder}
        />
      }
      filterBadgeLabelResolver={(filter) => {
        const filterId = filter.id || filter.key;
        const appliedFilter = appliedFilters.find(f => (f.id || f.key) === filterId);
        const selectedCount = appliedFilter?.criteria?.selectedOptions?.length || 0;
        return selectedCount > 0 ? String(selectedCount) : "";
      }}
      initialFilters={initialFilters}
      filterSuggestions={filterSuggestions}
      filterEditorRenderers={filterEditorRenderers}
      onFiltersApply={setAppliedFilters}
      showFilterActions={false}
      showFilterRemove={false}
      columns={columns}
      data={tableData}
      currentPage={page}
      totalPages={1}
      pageSize={10}
      onPageChange={setPage}
    />
  );
};

export default AdvancedFiltersResults2Page;
