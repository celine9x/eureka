import React, { useEffect, useMemo, useState } from "react";
import { Hub } from "../../library/templates/hub.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { Chip } from "../../library/atoms/chip.jsx";
import { DropdownMenuDivider } from "../../library/molecules/dropdown-menu-item.jsx";
import { DropdownList, DropdownListItem } from "../../library/molecules/dropdown-list.jsx";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "../../library/molecules/dropdown-menu.jsx";
import {
  buildInitialFilters,
  buildHubFilterSuggestionsFromCriteria,
  filterAssets,
  SEARCH_FIELDS,
  OPTION_LABEL_MAP,
  CONDITION_LABELS,
  ONTOLOGY_FIELD_TREES,
} from "./nexus-search-data.js";
import Button from "../../library/atoms/button.jsx";
import csvInputRaw from "./2026-05-21T07-32-53-150Z.csv?raw";

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// ONTOLOGY HELPERS
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const ONTOLOGY_FIELDS = ["drug-type", "target", "clinical-indication"];

const CSV_FIELD_COLUMN_MAP = {
  "therapeutic-area": "Therapeutic Areas",
  "drug-type": "Drug Type",
  "target": "Target",
  "mechanism": "Mechanisms of Action",
  "clinical-indication": "Clinical Indications",
  "development-phase": "Development Phases",
  "territories": "Country",
};

const csvToId = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const parsePipeValues = (value) =>
  String(value || "")
    .split("|")
    .map((entry) => entry.trim())
    .filter(Boolean);

const parseCsv = (text) => {
  if (!text) return [];

  const rows = [];
  let current = "";
  let row = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(current);
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(current);
      if (row.some((field) => field.length > 0)) rows.push(row);
      row = [];
      current = "";
      continue;
    }

    current += char;
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current);
    if (row.some((field) => field.length > 0)) rows.push(row);
  }

  if (rows.length === 0) return [];

  const headers = rows[0].map((header) => header.trim());
  return rows.slice(1).map((values) => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = (values[index] || "").trim();
    });
    return record;
  });
};

const toStatusBadge = (statusText) => {
  const value = String(statusText || "").trim();
  const normalized = value.toLowerCase();
  const label = value || "Active";

  if (normalized.includes("suspend")) return { label, color: "neutral", shape: "pill" };
  if (normalized.includes("preclinical") || normalized.includes("phase 1")) {
    return { label, color: "warning", shape: "pill" };
  }
  if (normalized.includes("launched") || normalized.includes("approved") || normalized.includes("phase 3")) {
    return { label, color: "positive", shape: "pill" };
  }
  return { label, color: "positive", shape: "pill" };
};

const toDisplayDate = (isoDate) => {
  if (!isoDate) return "-";
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return "-";
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  const year = parsed.getFullYear();
  return `${month}/${day}/${year}`;
};

const buildAssetsFromCsv = (records) => {
  const labelMap = {};

  const assets = records.map((record, index) => {
    const id = record.ID || `csv-${index + 1}`;
    const companyParts = parsePipeValues(record["Active Company"]);
    const sourceParts = parsePipeValues(record.Sources);
    const statusText = record["Asset Status"] || record["Opportunity Status"] || record["Highest Phase"];

    const mappedSearchFields = Object.fromEntries(
      Object.entries(CSV_FIELD_COLUMN_MAP).map(([fieldId, csvColumn]) => {
        const values = parsePipeValues(record[csvColumn]);
        const ids = values
          .map((value) => ({ id: csvToId(value), label: value }))
          .filter((entry) => Boolean(entry.id));
        ids.forEach(({ id: valueId, label }) => {
          labelMap[valueId] = label;
        });
        return [fieldId, ids.map(({ id: valueId }) => valueId)];
      })
    );

    return {
      id,
      name: record.Name || `Asset ${index + 1}`,
      company: {
        primary: companyParts[0] || "-",
        secondary: companyParts[1] || undefined,
      },
      status: toStatusBadge(statusText),
      dealValue: "-",
      startDate: toDisplayDate(record["Modified At"] || record["Created At"]),
      owner: sourceParts[0] || "-",
      ...mappedSearchFields,
    };
  });

  return { assets, labelMap };
};

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
  const [groupExpanded, setGroupExpanded] = useState({ scope: true, extra: true });
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
  const ontologyKnownIdSet = useMemo(
    () => new Set(ontologyCollectNodeIds(ontologyTree)),
    [ontologyTree]
  );

  const ontologyVisibleNodeIds = useMemo(() => {
    if (!isOntology || normalizedSearch.length === 0) return [];
    const scopedTree = buildSelectedTree(ontologyTree, new Set([...scopeIds, ...extraIds]));
    const filteredTree = ontologyFilterTreeBySearch(scopedTree, searchQuery);
    return [...new Set(ontologyCollectNodeIds(filteredTree))];
  }, [isOntology, normalizedSearch, ontologyTree, scopeIds, extraIds, searchQuery]);

  const ontologyVisibleUnknownIds = useMemo(() => {
    if (!isOntology) return [];
    return visibleSearchResultIds.filter((id) => !ontologyKnownIdSet.has(id));
  }, [isOntology, visibleSearchResultIds, ontologyKnownIdSet]);

  const visibleIdsForSelectAll = isOntology
    ? [...new Set([...ontologyVisibleNodeIds, ...ontologyVisibleUnknownIds])]
    : visibleSearchResultIds;
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

  const onToggleGroupExpanded = (groupKey) => {
    setGroupExpanded((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  };

  const onToggleGroupSelectAll = (groupIds, allGroupSelected) => {
    updateDraft((prev) => {
      const next = new Set(prev.selectedOptions || []);
      if (allGroupSelected) {
        groupIds.forEach((id) => next.delete(id));
      } else {
        groupIds.forEach((id) => next.add(id));
      }
      return { ...prev, selectedOptions: [...next] };
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
      const treeControl = hasChildren ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleExpanded(node.id);
          }}
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
            padding: 0,
          }}
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          <Icon name={isExpanded ? "ChevronDown" : "ChevronRight"} size={12} />
        </button>
      ) : (
        <span style={{ width: 16, height: 16, display: "inline-block" }} aria-hidden="true" />
      );
      
      return (
        <div key={node.id}>
          <DropdownListItem
            value={node.id}
            checked={selectedSet.has(node.id)}
            onChange={onItemChange}
            icon={treeControl}
            iconBeforeCheckbox
            style={{
              padding: "4px 8px",
              paddingLeft: `calc(var(--spacing-sm) + ${depth} * 16px)`,
            }}
          >
            {node.label}
          </DropdownListItem>
          {hasChildren && isExpanded && node.children.map((child) => renderNode(child, depth + 1))}
        </div>
      );
    };

    return visibleTree.map((node) => renderNode(node, 0));
  };

  const splitOntologyIds = (ids) => ({
    knownIds: ids.filter((id) => ontologyKnownIdSet.has(id)),
    unknownIds: ids.filter((id) => !ontologyKnownIdSet.has(id)),
  });

  const renderUnknownOntologyItems = (ids) =>
    ids.map((id) => (
      <DropdownListItem
        key={id}
        value={id}
        checked={selectedSet.has(id)}
        onChange={onItemChange}
        icon={<span style={{ width: 16, height: 16, display: "inline-block" }} aria-hidden="true" />}
        iconBeforeCheckbox
        style={{
          padding: "4px 8px",
          paddingLeft: "var(--spacing-sm)",
          paddingRight: "8px",
        }}
      >
        {getLabel(id)}
      </DropdownListItem>
    ));

  const { knownIds: knownScopeIds, unknownIds: unknownScopeIds } = splitOntologyIds(visibleScopeIds);
  const { knownIds: knownExtraIds, unknownIds: unknownExtraIds } = splitOntologyIds(visibleExtraIds);

  const getOntologyVisibleIds = (knownIds, unknownIds) => {
    const selectedTree = buildSelectedTree(ontologyTree, new Set(knownIds));
    const visibleTree = ontologyFilterTreeBySearch(selectedTree, searchQuery);
    return [...new Set([...ontologyCollectNodeIds(visibleTree), ...unknownIds])];
  };

  const scopeVisibleIdsForSelectAll = isOntology
    ? getOntologyVisibleIds(knownScopeIds, unknownScopeIds)
    : visibleScopeIds;
  const extraVisibleIdsForSelectAll = isOntology
    ? getOntologyVisibleIds(knownExtraIds, unknownExtraIds)
    : visibleExtraIds;

  const allScopeSelected =
    scopeVisibleIdsForSelectAll.length > 0 &&
    scopeVisibleIdsForSelectAll.every((id) => selectedSet.has(id));
  const allExtraSelected =
    extraVisibleIdsForSelectAll.length > 0 &&
    extraVisibleIdsForSelectAll.every((id) => selectedSet.has(id));

  const renderGroupHeader = (groupKey, title) => (
    <button
      type="button"
      onClick={() => onToggleGroupExpanded(groupKey)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px 8px",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        fontFamily: "var(--font-family-primary)",
        fontSize: "var(--text-body-md)",
        fontWeight: "var(--font-weight-regular)",
        color: "var(--color-content-secondary)",
        textAlign: "left",
      }}
    >
      <span>{title}</span>
      <Icon name={groupExpanded[groupKey] ? "ChevronDown" : "ChevronRight"} size={12} />
    </button>
  );

  const shouldShowGlobalSelectAll = shouldShowSelectAllSearchResults && !hasTwoGroups;

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
      {shouldShowGlobalSelectAll && (
        <DropdownListItem
          value="__select-all-search-results__"
          checked={allSearchResultsSelected}
          onChange={onSelectAllSearchResults}
          style={{ borderBottom: "1px solid var(--color-action-outline-secondary-enabled)" }}
        >
          Select all
        </DropdownListItem>
      )}
      {isOntology ? (
        hasTwoGroups ? (
          <>
            <div style={{ padding: "8px", display: "flex", flexDirection: "column", gap: 4 }}>
              {renderGroupHeader("scope", "From initial search")}
              {groupExpanded.scope ? (
                <>
                  {scopeVisibleIdsForSelectAll.length > 0 ? (
                    <DropdownListItem
                      value="__select-all-scope__"
                      checked={allScopeSelected}
                      onChange={() => onToggleGroupSelectAll(scopeVisibleIdsForSelectAll, allScopeSelected)}
                      style={{ padding: "4px 8px" }}
                    >
                      Select all
                    </DropdownListItem>
                  ) : null}
                  {renderOntologyTree(knownScopeIds)}
                  {renderUnknownOntologyItems(unknownScopeIds)}
                </>
              ) : null}
            </div>
            <DropdownMenuDivider />
            <div style={{ padding: "8px", display: "flex", flexDirection: "column", gap: 4 }}>
              {renderGroupHeader("extra", "Also found in results")}
              {groupExpanded.extra ? (
                <>
                  {extraVisibleIdsForSelectAll.length > 0 ? (
                    <DropdownListItem
                      value="__select-all-extra__"
                      checked={allExtraSelected}
                      onChange={() => onToggleGroupSelectAll(extraVisibleIdsForSelectAll, allExtraSelected)}
                      style={{ padding: "4px 8px" }}
                    >
                      Select all
                    </DropdownListItem>
                  ) : null}
                  {renderOntologyTree(knownExtraIds)}
                  {renderUnknownOntologyItems(unknownExtraIds)}
                </>
              ) : null}
            </div>
          </>
        ) : (
          <>
            {renderOntologyTree([...knownScopeIds, ...knownExtraIds])}
            {renderUnknownOntologyItems([...unknownScopeIds, ...unknownExtraIds])}
          </>
        )
      ) : (
        hasTwoGroups ? (
          <>
            {visibleScopeIds.length > 0 ? (
              <div style={{ padding: "8px", display: "flex", flexDirection: "column", gap: 4 }}>
                {renderGroupHeader("scope", "From initial search")}
                {groupExpanded.scope ? (
                  <>
                    <DropdownListItem
                      value="__select-all-scope__"
                      checked={allScopeSelected}
                      onChange={() => onToggleGroupSelectAll(scopeVisibleIdsForSelectAll, allScopeSelected)}
                      style={{ padding: "4px 8px" }}
                    >
                      Select all
                    </DropdownListItem>
                    {renderItems(visibleScopeIds)}
                  </>
                ) : null}
              </div>
            ) : null}
            {visibleScopeIds.length > 0 && visibleExtraIds.length > 0 ? <DropdownMenuDivider /> : null}
            {visibleExtraIds.length > 0 ? (
              <div style={{ padding: "8px", display: "flex", flexDirection: "column", gap: 4 }}>
                {renderGroupHeader("extra", "Also found in results")}
                {groupExpanded.extra ? (
                  <>
                    <DropdownListItem
                      value="__select-all-extra__"
                      checked={allExtraSelected}
                      onChange={() => onToggleGroupSelectAll(extraVisibleIdsForSelectAll, allExtraSelected)}
                      style={{ padding: "4px 8px" }}
                    >
                      Select all
                    </DropdownListItem>
                    {renderItems(visibleExtraIds)}
                  </>
                ) : null}
              </div>
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
    if (ids.length === 0) return <span style={{ color: "var(--color-content-tertiary)", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)" }}>â€”</span>;
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
  {
    key: "name",
    label: "Name",
    sortable: true,
    type: "short-text",
    width: "240px",
    renderCell: (val) => (
      <span
        title={val || ""}
        style={{
          display: "block",
          width: "240px",
          minWidth: 0,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {val}
      </span>
    ),
  },
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

export const AdvancedFiltersResults2Page = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { searchName, items } = parseSearchCriteria();

  const filterSuggestions = useMemo(() => buildHubFilterSuggestionsFromCriteria(items), []);

  const csvDataset = useMemo(() => buildAssetsFromCsv(parseCsv(csvInputRaw)), []);
  const baseAssets = useMemo(() => filterAssets(csvDataset.assets, items), [csvDataset.assets, items]);

  useEffect(() => {
    Object.assign(OPTION_LABEL_MAP, csvDataset.labelMap);
  }, [csvDataset.labelMap]);

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

  useEffect(() => {
    setAppliedFilters(initialFilters);
    setPage(1);
  }, [initialFilters]);

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

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(tableData.length / pageSize)),
    [tableData.length, pageSize]
  );

  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const pagedTableData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return tableData.slice(start, start + pageSize);
  }, [tableData, page, pageSize]);

  return (
    <Hub
      title={searchName || "Search Results"}
      badge={String(tableData.length)}
      menuSections={menuSections}
      menuUser={menuUser}
      headerActions={
        <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-2)" }}>
          <Button
            variant="secondary"
            size="md"
            iconLeading={<Icon name="ArrowUpTray" size="sm" />}
          >
            Export
          </Button>
          <Button
            variant="primary"
            size="md"
            iconLeading={<Icon name="Plus" size="sm" />}
          >
            New project
          </Button>
        </div>
      }
      toolbarTopContent={
        <SearchLogicStrip
          items={items}
          onEdit={openSearchBuilder}
        />
      }
      filterBadgeLabelResolver={(filter) => {
          const selectedCount = Array.isArray(filter.criteria?.selectedOptions)
            ? filter.criteria.selectedOptions.length
            : 0;
          const includeEmptyCount = filter.criteria?.includeEmpty ? 1 : 0;
          const total = selectedCount + includeEmptyCount;
          return total > 0 ? String(total) : undefined;
      }}
      initialFilters={initialFilters}
      filterSuggestions={filterSuggestions}
      filterEditorRenderers={filterEditorRenderers}
      onFiltersApply={setAppliedFilters}
      showFilterActions={false}
      showClearFiltersAction={true}
      clearFiltersBehavior="clear-criteria"
      showFilterRemove={false}
      columns={columns}
      data={pagedTableData}
      currentPage={page}
      totalPages={totalPages}
      pageSize={pageSize}
      onPageChange={setPage}
      onPageSizeChange={(nextSize) => {
        setPageSize(nextSize);
        setPage(1);
      }}
    />
  );
};

export default AdvancedFiltersResults2Page;

