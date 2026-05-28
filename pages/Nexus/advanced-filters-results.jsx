import React, { useMemo, useState } from "react";
import { Hub } from "../../library/templates/hub.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { Button } from "../../library/atoms/button.jsx";
import { Checkbox } from "../../library/atoms/checkbox.jsx";
import { DropdownMenuLabel, DropdownMenuDivider } from "../../library/molecules/dropdown-menu-item.jsx";
import {
  RESULT_ASSETS,
  buildInitialFilters,
  buildHubFilterSuggestionsFromCriteria,
  ONTOLOGY_FIELD_TREES,
  filterAssets,
  SEARCH_FIELDS,
  OPTION_LABEL_MAP,
} from "./nexus-search-data.js";

// ─── Ontology tree helpers ────────────────────────────────────────────────────

const SearchLogicStrip = ({ items, onEdit }) => {
  const getFieldLabel = (fieldId) => SEARCH_FIELDS.find((f) => f.id === fieldId)?.label || fieldId;

  const getValueLabels = (fieldId, value) => {
    if (value === null || value === undefined) return [];
    const values = Array.isArray(value) ? value : [value];
    return values.map((id) => OPTION_LABEL_MAP[id] || String(id));
  };

  const renderReviewRow = (row, keyPrefix) => {
    const fieldLabel = getFieldLabel(row.fieldId);
    const isNegative = row.conditionId === "has-none-of";
    const conditionLabel = isNegative ? "is not" : "is";
    const valueLabels = getValueLabels(row.fieldId, row.value);
    const displayed = valueLabels.slice(0, 2);
    if (valueLabels.length > 2) displayed.push(`+${valueLabels.length - 2}`);

    return (
      <div
        key={keyPrefix}
        style={{
          display: "inline-flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--spacing-xs)",
          padding: "var(--spacing-xs) var(--spacing-sm)",
          borderRadius: "var(--radius-sm)",
          background: "var(--color-general-white)",
          outline: "1px solid var(--color-action-outline-secondary-enabled)",
          outlineOffset: "-1px",
        }}
      >
        <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)" }}>{fieldLabel}</span>
        <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: isNegative ? "var(--color-content-negative)" : "var(--color-content-primary)" }}>{conditionLabel}</span>
        {displayed.length > 0 ? displayed.map((label, i) => (
          <React.Fragment key={`${keyPrefix}-v-${i}`}>
            {i > 0 && <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: isNegative ? "var(--color-content-negative)" : "var(--color-content-primary)" }}>or</span>}
            <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)" }}>{label}</span>
          </React.Fragment>
        )) : (
          <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)" }}>-</span>
        )}
      </div>
    );
  };

  const topLevelLogic = items[1]?.logic || "Or";

  return (
    <div
      style={{
        background: "var(--color-general-neutral-default)",
        border: "1px solid var(--color-action-outline-secondary-enabled)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--spacing-md)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "var(--spacing-md)",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--spacing-xs)", minWidth: 0, flex: 1 }}>
        <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-primary)", whiteSpace: "nowrap" }}>
          Show all assets that have
        </span>
        {items.map((item, index) => (
          <React.Fragment key={`logic-${index}`}>
            {index > 0 && (
              <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-content-primary)" }}>
                {(item.logic || topLevelLogic).toUpperCase()}
              </span>
            )}
            {item.type === "group" ? (
              <div style={{ display: "inline-flex", alignItems: "center", flexWrap: "wrap", gap: "var(--spacing-xs)", padding: "var(--spacing-xs)", borderRadius: "var(--radius-sm)", border: "1px dashed var(--color-action-outline-secondary-enabled)", background: "var(--color-general-neutral-lighter)" }}>
                {(item.rows || []).map((row, rowIndex) => (
                  <React.Fragment key={`logic-group-${item.id}-${row.id}`}>
                    {rowIndex > 0 && (
                      <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", fontWeight: "var(--font-weight-semibold)", color: "var(--color-content-primary)" }}>
                        {(item.rowLogic || "And").toUpperCase()}
                      </span>
                    )}
                    {renderReviewRow(row, `logic-group-row-${item.id}-${row.id}-${rowIndex}`)}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              renderReviewRow(item, `logic-row-${item.id}-${index}`)
            )}
          </React.Fragment>
        ))}
      </div>
      <Button
        variant="secondary"
        size="sm"
        iconLeading={<Icon name="PencilSquare" size={16} />}
        onClick={onEdit}
        style={{ flexShrink: 0 }}
      >
        Modify
      </Button>
    </div>
  );
};

const pruneTree = (nodes, allowedIds) => {
  const allowed = new Set(allowedIds);
  const prune = (list) =>
    list.reduce((acc, node) => {
      if (!node.children?.length) {
        if (allowed.has(node.id)) acc.push(node);
      } else {
        const children = prune(node.children);
        if (children.length) acc.push({ ...node, children });
      }
      return acc;
    }, []);
  return prune(nodes);
};

const getLeafIds = (node) =>
  !node.children?.length ? [node.id] : node.children.flatMap(getLeafIds);

const getNodeState = (node, selectedSet) => {
  const leafIds = getLeafIds(node);
  const count = leafIds.filter((id) => selectedSet.has(id)).length;
  if (count === 0) return { checked: false, indeterminate: false, leafIds };
  if (count === leafIds.length) return { checked: true, indeterminate: false, leafIds };
  return { checked: false, indeterminate: true, leafIds };
};

const OntologyTreeRow = ({ node, depth, expandedIds, onToggleExpanded, selectedSet, onToggle }) => {
  const hasChildren = Boolean(node.children?.length);
  const isExpanded = expandedIds.has(node.id);
  const state = getNodeState(node, selectedSet);
  return (
    <>
      <div
        style={{ display: "flex", alignItems: "center", gap: 6, padding: `4px 8px 4px ${8 + depth * 16}px`, borderRadius: 4, cursor: "pointer", userSelect: "none" }}
        onClick={() => onToggle(node)}
      >
        {hasChildren ? (
          <button
            type="button"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16, height: 16, border: "none", background: "transparent", color: "var(--color-content-secondary)", cursor: "pointer", flexShrink: 0, padding: 0 }}
            onClick={(e) => { e.stopPropagation(); onToggleExpanded(node.id); }}
          >
            <Icon name={isExpanded ? "ChevronDown" : "ChevronRight"} size={12} />
          </button>
        ) : (
          <span style={{ width: 16, flexShrink: 0 }} />
        )}
        <Checkbox size="sm" isSelected={state.checked} isIndeterminate={state.indeterminate} onChange={() => {}} />
        <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-primary)", lineHeight: "var(--line-height-body-md)" }}>
          {node.label}
        </span>
      </div>
      {hasChildren && isExpanded && node.children.map((child) => (
        <OntologyTreeRow key={child.id} node={child} depth={depth + 1} expandedIds={expandedIds} onToggleExpanded={onToggleExpanded} selectedSet={selectedSet} onToggle={onToggle} />
      ))}
    </>
  );
};

const ONTOLOGY_FIELD_IDS = new Set(["drug-type", "target", "clinical-indication"]);

// ─── Grouped filter editor ────────────────────────────────────────────────────

const GroupedFilterEditor = ({ fieldId, draft, updateDraft, searchIds, extraIds }) => {
  const [expandedIds, setExpandedIds] = useState(() => new Set());
  const selectedSet = useMemo(() => new Set(draft.selectedOptions || []), [draft.selectedOptions]);
  const isOntology = ONTOLOGY_FIELD_IDS.has(fieldId);
  const fullTree = ONTOLOGY_FIELD_TREES[fieldId] || [];

  const toggleExpanded = (id) =>
    setExpandedIds((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });

  const toggleNode = (node) => {
    const { checked, indeterminate, leafIds } = getNodeState(node, selectedSet);
    updateDraft((prev) => {
      const next = new Set(prev.selectedOptions || []);
      if (checked || indeterminate) leafIds.forEach((id) => next.delete(id));
      else leafIds.forEach((id) => next.add(id));
      return { ...prev, selectedOptions: [...next] };
    });
  };

  const toggleFlat = (id) => {
    updateDraft((prev) => {
      const next = new Set(prev.selectedOptions || []);
      next.has(id) ? next.delete(id) : next.add(id);
      return { ...prev, selectedOptions: [...next] };
    });
  };

  const renderTree = (ids) => {
    const tree = pruneTree(fullTree, ids);
    return tree.map((node) => (
      <OntologyTreeRow
        key={node.id}
        node={node}
        depth={0}
        expandedIds={expandedIds}
        onToggleExpanded={toggleExpanded}
        selectedSet={selectedSet}
        onToggle={toggleNode}
      />
    ));
  };

  const renderFlat = (ids) =>
    ids.map((id) => (
      <div
        key={id}
        style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 8px", cursor: "pointer", borderRadius: 4, userSelect: "none" }}
        onClick={() => toggleFlat(id)}
      >
        <Checkbox size="sm" isSelected={selectedSet.has(id)} onChange={() => {}} />
        <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-primary)", lineHeight: "var(--line-height-body-md)" }}>
          {OPTION_LABEL_MAP[id] || id}
        </span>
      </div>
    ));

  const render = isOntology ? renderTree : renderFlat;

  const getLeafIdsForGroup = (ids) => {
    if (!isOntology) return ids;
    const tree = pruneTree(fullTree, ids);
    return tree.flatMap(getLeafIds);
  };

  const renderSelectAll = (ids) => {
    const leafIds = getLeafIdsForGroup(ids);
    if (leafIds.length === 0) return null;
    const allSelected = leafIds.every((id) => selectedSet.has(id));
    const someSelected = !allSelected && leafIds.some((id) => selectedSet.has(id));
    return (
      <div
        style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 8px", cursor: "pointer", borderRadius: 4, userSelect: "none" }}
        onClick={() =>
          updateDraft((prev) => {
            const next = new Set(prev.selectedOptions || []);
            if (allSelected || someSelected) leafIds.forEach((id) => next.delete(id));
            else leafIds.forEach((id) => next.add(id));
            return { ...prev, selectedOptions: [...next] };
          })
        }
      >
        <Checkbox size="sm" isSelected={allSelected} isIndeterminate={someSelected} onChange={() => {}} />
        <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-primary)", lineHeight: "var(--line-height-body-md)", fontWeight: 500 }}>
          Select all
        </span>
      </div>
    );
  };

  return (
    <div style={{ overflowY: "auto", maxHeight: 280, padding: "4px 0" }}>
      {searchIds.length > 0 && <DropdownMenuLabel>From initial search</DropdownMenuLabel>}
      {searchIds.length > 0 && renderSelectAll(searchIds)}
      {render(searchIds)}
      {searchIds.length > 0 && extraIds.length > 0 && <DropdownMenuDivider />}
      {extraIds.length > 0 && <DropdownMenuLabel>Also found in results</DropdownMenuLabel>}
      {extraIds.length > 0 && renderSelectAll(extraIds)}
      {render(extraIds)}
    </div>
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

export const AdvancedFiltersResultsPage = () => {
  const [page, setPage] = useState(1);
  const { searchName, items } = parseSearchCriteria();

  const filterSuggestions = useMemo(() => buildHubFilterSuggestionsFromCriteria(items), []);

  const baseAssets = useMemo(() => filterAssets(RESULT_ASSETS, items), []);

  // Per-field grouped options: what was in the search vs what else is in results
  const groupedFieldOptions = useMemo(() => {
    // Extract raw criteria IDs per field from items
    const criteriaIdsByField = {};
    const visit = (row) => {
      if (!row.fieldId) return;
      criteriaIdsByField[row.fieldId] = Array.isArray(row.value)
        ? row.value
        : row.value ? [row.value] : [];
    };
    items.forEach((item) => {
      if (item.type === "row") visit(item);
      else if (item.type === "group") item.rows.forEach(visit);
    });

    const result = {};
    SEARCH_FIELDS.forEach((field) => {
      const searchIds = criteriaIdsByField[field.id] || [];
      const searchIdSet = new Set(searchIds);
      const allFoundIds = [...new Set(baseAssets.flatMap((asset) => asset[field.id] || []))];
      const extraIds = allFoundIds.filter((id) => !searchIdSet.has(id));
      result[field.id] = { searchIds, extraIds };
    });
    return result;
  }, [baseAssets]);

  const initialFilters = useMemo(() => {
    const base = buildInitialFilters(items);
    return base.map((f) => {
      const fieldId = f.id || f.key;
      const { extraIds = [] } = groupedFieldOptions[fieldId] || {};
      if (!extraIds.length) return f;
      const existing = f.criteria?.selectedOptions || [];
      const merged = [...new Set([...existing, ...extraIds])];
      return { ...f, badgeCount: merged.length, criteria: { ...f.criteria, selectedOptions: merged } };
    });
  }, [groupedFieldOptions]);

  const [appliedFilters, setAppliedFilters] = useState(() => initialFilters);

  const filterEditorRenderers = useMemo(() =>
    Object.fromEntries(
      SEARCH_FIELDS.map((field) => [
        field.id,
        (_filter, { draft, updateDraft }) => {
          const { searchIds, extraIds } = groupedFieldOptions[field.id] || { searchIds: [], extraIds: [] };
          return (
            <GroupedFilterEditor
              fieldId={field.id}
              draft={draft}
              updateDraft={updateDraft}
              searchIds={searchIds}
              extraIds={extraIds}
            />
          );
        },
      ])
    ), [groupedFieldOptions]);

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
      headerActions={null}
      toolbarTopContent={
        <SearchLogicStrip
          items={items}
          onEdit={() => {
            const params = new URLSearchParams(window.location.search);
            const criteria = params.get("criteria");
            const url = criteria ? `/nexus/search?criteria=${criteria}` : "/nexus/search";
            window.history.pushState({}, "", url);
            window.dispatchEvent(new PopStateEvent("popstate"));
          }}
        />
      }
      initialFilters={[]}
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

export default AdvancedFiltersResultsPage;
