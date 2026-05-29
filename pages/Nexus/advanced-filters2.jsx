import React, { useState, useRef, useLayoutEffect } from "react";
import { Tabs, Tab } from "../../library/molecules/tabs.jsx";
import TextInput from "../../library/molecules/text-input.jsx";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSection,
  DropdownMenuItem,
} from "../../library/molecules/dropdown-menu.jsx";
import { DropdownList, DropdownListItem, DropdownSection } from "../../library/molecules/dropdown-list.jsx";
import { Button } from "../../library/atoms/button.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { Chip } from "../../library/atoms/chip.jsx";
import { Checkbox } from "../../library/atoms/checkbox.jsx";
import { Tooltip } from "../../library/atoms/tooltip.jsx";
import MiniInfobox from "../../library/molecules/miniinfobox.jsx";
import { Infobox } from "../../library/molecules/infobox.jsx";
import {
  SEARCH_FIELDS,
  FIELD_OPTIONS,
  ONTOLOGY_FIELD_TREES,
} from "./nexus-search-data.js";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const CONDITION_SECTIONS = [
  [
    { id: "has-any-of", label: "has any of" },
    { id: "has-all-of", label: "has all of" },
    { id: "has-none-of", label: "has none of" },
  ],
];

const ALL_CONDITIONS = CONDITION_SECTIONS.flat();

// Text-only fields (value is free text): only text-condition-type logic applies for all fields
const TEXT_FIELDS = [];

const ONTOLOGY_FIELDS = ["drug-type", "target", "clinical-indication"];

// ─────────────────────────────────────────────
// HIGHLIGHT MATCH HELPER
// ─────────────────────────────────────────────

const HighlightMatch = ({ text, query }) => {
  if (!query || !query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.trim().toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: "var(--color-accent-yellow)", color: "inherit", borderRadius: 2, padding: "0 1px" }}>
        {text.slice(idx, idx + query.trim().length)}
      </mark>
      {text.slice(idx + query.trim().length)}
    </>
  );
};

// ─────────────────────────────────────────────
// ONTOLOGY HELPERS
// ─────────────────────────────────────────────

const ontologyGetLeafIds = (node) => {
  if (!node.children || node.children.length === 0) return [node.id];
  return node.children.flatMap(ontologyGetLeafIds);
};

const ontologyBuildLookup = (nodes, map = new Map()) => {
  nodes.forEach((node) => {
    map.set(node.id, node);
    if (node.children?.length) ontologyBuildLookup(node.children, map);
  });
  return map;
};

const ontologyMatchesTree = (node, query) => {
  if (!query.trim()) return true;
  if (node.label.toLowerCase().includes(query.trim().toLowerCase())) return true;
  return (node.children || []).some((child) => ontologyMatchesTree(child, query));
};

const ontologyGetMatchingLeafIds = (nodes, query) => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  const collect = (node) => {
    const selfMatches = node.label.toLowerCase().includes(normalizedQuery);
    if (selfMatches) return ontologyGetLeafIds(node);
    if (!node.children?.length) return [];
    return node.children.flatMap(collect);
  };

  return [...new Set(nodes.flatMap(collect))];
};

const ontologyGetSelectionState = (node, selectedLeafIds) => {
  const leafIds = ontologyGetLeafIds(node);
  const selectedCount = leafIds.filter((id) => selectedLeafIds.has(id)).length;
  if (selectedCount === 0) return { checked: false, indeterminate: false, leafIds };
  if (selectedCount === leafIds.length) return { checked: true, indeterminate: false, leafIds };
  return { checked: false, indeterminate: true, leafIds };
};

const ontologySummarizeSelection = (nodes, selectedLeafIds) => {
  const chips = [];
  const visit = (node) => {
    const state = ontologyGetSelectionState(node, selectedLeafIds);
    if (state.checked) { chips.push({ id: node.id, label: node.label }); return; }
    if (!node.children?.length) {
      if (selectedLeafIds.has(node.id)) chips.push({ id: node.id, label: node.label });
      return;
    }
    node.children.forEach(visit);
  };
  nodes.forEach(visit);
  return chips;
};

// ─────────────────────────────────────────────
// ONTOLOGY TREE ROW
// ─────────────────────────────────────────────

const OntologyTreeRow = ({ node, depth, expandedIds, onToggleExpanded, onToggleSelection, selectedLeafIds, searchQuery }) => {
  const hasChildren = Boolean(node.children?.length);
  if (!ontologyMatchesTree(node, searchQuery)) return null;
  const isExpanded = expandedIds.has(node.id) || Boolean(searchQuery.trim());
  const selectionState = ontologyGetSelectionState(node, selectedLeafIds);
  const treeControl = hasChildren ? (
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
        padding: 0,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onToggleExpanded(node.id);
      }}
      aria-label={isExpanded ? "Collapse" : "Expand"}
    >
      <Icon name={isExpanded ? "ChevronDown" : "ChevronRight"} size={12} />
    </button>
  ) : (
    <span style={{ width: 16, height: 16, display: "inline-block" }} aria-hidden="true" />
  );

  return (
    <>
      <DropdownListItem
        value={node.id}
        checked={selectionState.checked}
        isIndeterminate={selectionState.indeterminate}
        onChange={() => onToggleSelection(node)}
        icon={treeControl}
        iconBeforeCheckbox
        style={{
          padding: "4px 8px",
          paddingLeft: `calc(var(--spacing-sm) + ${depth} * 16px)`,
          boxSizing: "border-box",
        }}
      >
        <HighlightMatch text={node.label} query={searchQuery} />
      </DropdownListItem>
      {hasChildren && isExpanded && node.children.map((child) => (
        <OntologyTreeRow
          key={child.id}
          node={child}
          depth={depth + 1}
          expandedIds={expandedIds}
          onToggleExpanded={onToggleExpanded}
          onToggleSelection={onToggleSelection}
          selectedLeafIds={selectedLeafIds}
          searchQuery={searchQuery}
        />
      ))}
    </>
  );
};

// ─────────────────────────────────────────────
// ONTOLOGY CHIP SELECT INPUT
// ─────────────────────────────────────────────

const OntologyChipSelectInput = ({ fieldId, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [hovered, setHovered] = useState(false);
  const [expandedIds, setExpandedIds] = useState(new Set());
  const wrapperRef = useRef(null);
  const chipRowRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(null);

  const tree = ONTOLOGY_FIELD_TREES[fieldId] || [];
  const selectedLeafIds = React.useMemo(() => new Set(value || []), [value]);
  const chips = React.useMemo(() => ontologySummarizeSelection(tree, selectedLeafIds), [tree, selectedLeafIds]);
  const matchingLeafIds = React.useMemo(() => ontologyGetMatchingLeafIds(tree, search), [tree, search]);
  const shouldShowSelectAllSearchResults = search.trim().length > 0 && matchingLeafIds.length > 0;
  const allSearchResultsSelected =
    matchingLeafIds.length > 0 && matchingLeafIds.every((id) => selectedLeafIds.has(id));

  React.useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useLayoutEffect(() => {
    if (!chipRowRef.current || chips.length === 0) { setVisibleCount(null); return; }
    const container = chipRowRef.current;
    const containerWidth = container.offsetWidth;
    const children = Array.from(container.querySelectorAll("[data-chip]"));
    if (children.length === 0) { setVisibleCount(null); return; }
    const BADGE_WIDTH = 40;
    let usedWidth = 0, count = 0;
    for (let i = 0; i < children.length; i++) {
      const w = children[i].offsetWidth + 4;
      const remaining = children.length - i - 1;
      if (usedWidth + w > containerWidth || (remaining > 0 && usedWidth + w + BADGE_WIDTH > containerWidth)) break;
      usedWidth += w; count++;
    }
    setVisibleCount(count < chips.length ? count : null);
  }, [chips.length, open]);

  const displayChips = visibleCount !== null ? chips.slice(0, visibleCount) : chips;
  const hiddenChips = visibleCount !== null ? chips.slice(visibleCount) : [];

  const toggleExpanded = (nodeId) => {
    setExpandedIds((prev) => { const next = new Set(prev); next.has(nodeId) ? next.delete(nodeId) : next.add(nodeId); return next; });
  };

  const toggleSelection = (node) => {
    const { checked, leafIds } = ontologyGetSelectionState(node, selectedLeafIds);
    const next = new Set(selectedLeafIds);
    if (checked) leafIds.forEach((id) => next.delete(id));
    else leafIds.forEach((id) => next.add(id));
    onChange([...next]);
  };

  const removeChip = (chipId) => {
    const lookup = ontologyBuildLookup(tree);
    const node = lookup.get(chipId);
    if (!node) return;
    const leafIds = ontologyGetLeafIds(node);
    const next = new Set(selectedLeafIds);
    leafIds.forEach((id) => next.delete(id));
    onChange([...next]);
  };

  const toggleSelectAllSearchResults = () => {
    const next = new Set(selectedLeafIds);
    if (allSearchResultsSelected) {
      matchingLeafIds.forEach((id) => next.delete(id));
    } else {
      matchingLeafIds.forEach((id) => next.add(id));
    }
    onChange([...next]);
  };

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
      <div
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex", alignItems: "center", gap: "var(--spacing-xs)", height: 32,
          padding: "0 var(--spacing-sm)", background: "var(--color-general-white)",
          borderRadius: "var(--radius-md)",
          outline: hovered && !open ? "1px solid var(--color-interaction-outline-hover)" : open ? "1px solid var(--color-interaction-outline-active)" : "1px solid var(--color-interaction-outline-enabled)",
          outlineOffset: "-1px", cursor: "pointer", boxSizing: "border-box", width: "100%",
          transition: "all var(--transition-fast)", overflow: "hidden",
        }}
      >
        {chips.length === 0 && (
          <span style={{ flex: 1, fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-tertiary)" }}>Select options</span>
        )}
        {chips.length > 0 && (
          <div ref={chipRowRef} style={{ flex: 1, display: "flex", alignItems: "center", gap: 4, overflow: "hidden", minWidth: 0 }}>
            {displayChips.map((chip) => (
              <span key={chip.id} data-chip style={{ flexShrink: 0, borderRadius: "var(--radius-xs)", overflow: "hidden" }}>
                <Chip size="md" removable onRemove={(e) => { e && e.stopPropagation(); removeChip(chip.id); }} style={{ borderRadius: "var(--radius-xs)" }}>
                  {chip.label}
                </Chip>
              </span>
            ))}
            {hiddenChips.length > 0 && (
              <Tooltip content={<div style={{ display: "flex", flexDirection: "column", gap: 2 }}>{hiddenChips.map((c) => <div key={c.id}>{c.label}</div>)}</div>} placement="bottom-left">
                <span
                  style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", padding: "var(--spacing-xs)", background: "var(--color-general-neutral-lighter)", borderRadius: "var(--radius-xs)", outline: "1px solid var(--color-action-outline-secondary-enabled)", outlineOffset: "-1px", boxShadow: "var(--shadow-light-down)", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)", whiteSpace: "nowrap", cursor: "default" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  +{hiddenChips.length}
                </span>
              </Tooltip>
            )}
          </div>
        )}
        <span style={{ marginLeft: "auto", flexShrink: 0, color: "var(--color-content-secondary)" }}>
          <Icon name="ChevronDown" size={12} style={{ transform: open ? "rotate(180deg)" : undefined }} />
        </span>
      </div>

      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 1000, background: "var(--color-general-white)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-action-outline-secondary-enabled)", boxShadow: "var(--shadow-medium-down)", overflow: "hidden", maxHeight: 300, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "var(--spacing-sm)", borderBottom: "1px solid var(--color-action-outline-secondary-enabled)" }}>
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              onClick={(e) => e.stopPropagation()}
              style={{ width: "100%", border: "1px solid var(--color-interaction-outline-enabled)", borderRadius: "var(--radius-sm)", padding: "4px 8px", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ overflowY: "auto", padding: "var(--spacing-xs) var(--spacing-xs)" }}>
            {shouldShowSelectAllSearchResults && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--spacing-xs)",
                  padding: "var(--spacing-xs) var(--spacing-sm)",
                  borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
                  marginBottom: "var(--spacing-xs)",
                  cursor: "pointer",
                }}
                onClick={toggleSelectAllSearchResults}
              >
                <Checkbox size="sm" isSelected={allSearchResultsSelected} onChange={toggleSelectAllSearchResults} />
                <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-primary)" }}>
                  Select all
                </span>
              </div>
            )}
            {tree.map((node) => (
              <OntologyTreeRow
                key={node.id}
                node={node}
                depth={0}
                expandedIds={expandedIds}
                onToggleExpanded={toggleExpanded}
                onToggleSelection={toggleSelection}
                selectedLeafIds={selectedLeafIds}
                searchQuery={search}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// SHARED INPUT-STYLE TRIGGER
// ─────────────────────────────────────────────

const inputTriggerBase = {
  display: "inline-flex",
  alignItems: "center",
  height: 32,
  padding: "0 var(--spacing-sm)",
  background: "var(--color-general-white)",
  borderRadius: "var(--radius-md)",
  border: "none",
  outline: "1px solid var(--color-interaction-outline-enabled)",
  outlineOffset: "-1px",
  fontFamily: "var(--font-family-primary)",
  fontSize: "var(--text-body-md)",
  color: "var(--color-content-primary)",
  cursor: "pointer",
  justifyContent: "space-between",
  transition: "all var(--transition-fast)",
  boxSizing: "border-box",
};

const InputTrigger = React.forwardRef(({ children, style, ...props }, ref) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      ref={ref}
      style={{
        ...inputTriggerBase,
        ...(hovered && {
          outline: "1px solid var(--color-interaction-outline-hover)",
          outlineOffset: "-1px",
        }),
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
});

// ─────────────────────────────────────────────
// LOGIC OPERATOR TOGGLE (Where / And / Or)
// ─────────────────────────────────────────────

const LOGIC_OPTIONS = ["Where", "And", "Or"];

const LogicDropdown = ({ value, onChange, disabled }) => {
  const [open, setOpen] = useState(false);

  if (value === "Where") {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--color-action-outline-secondary-enabled)",
          minWidth: 64,
          height: 32,
          padding: "0 var(--spacing-sm)",
          background: "var(--color-general-neutral-light)",
          borderRadius: "var(--radius-md)",
          fontFamily: "var(--font-family-primary)",
          fontSize: "var(--text-body-md)",
          fontWeight: "var(--font-weight-regular)",
          color: "var(--color-content-secondary)",
        }}
      >
        Where
      </div>
    );
  }

  if (disabled) {
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "flex-start",
          minWidth: 64,
          height: 32,
          padding: "0 var(--spacing-sm)",
          background: "var(--color-general-neutral-light)",
          borderRadius: "var(--radius-md)",
          fontFamily: "var(--font-family-primary)",
          fontSize: "var(--text-body-md)",
          fontWeight: "var(--font-weight-regular)",
          color: "var(--color-content-secondary)",
          border: "1px solid var(--color-action-outline-secondary-enabled)",
        }}
      >
        {value}
      </div>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <InputTrigger style={{ minWidth: 64, gap: "var(--spacing-xs)" }}>
          {value}
          <Icon name="ChevronDown" size={12} />
        </InputTrigger>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="left" position="bottom" width={100}>
        <DropdownMenuSection>
          {LOGIC_OPTIONS.filter((o) => o !== "Where").map((op) => (
            <DropdownMenuItem
              key={op}
              label={op}
              active={op === value}
              onClick={() => {
                onChange(op);
                setOpen(false);
              }}
            />
          ))}
        </DropdownMenuSection>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ─────────────────────────────────────────────
// FIELD SELECTOR DROPDOWN
// ─────────────────────────────────────────────

const FieldDropdown = ({ value, onChange, usedFields = [] }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const selected = SEARCH_FIELDS.find((f) => f.id === value);
  const availableFields = SEARCH_FIELDS.filter((f) => f.id === value || !usedFields.includes(f.id));
  const visibleFields = availableFields.filter((field) =>
    field.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <InputTrigger style={{ minWidth: 180, gap: "var(--spacing-sm)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-xs)", flex: 1 }}>
            {selected && <Icon name={selected.icon} size={14} />}
            <span>{selected ? selected.label : "Select field"}</span>
          </span>
          <Icon name="ChevronDown" size={12} />
        </InputTrigger>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="left" position="bottom" width={220}>
        <div style={{ minWidth: 220, padding: "var(--spacing-2)", borderBottom: "1px solid var(--color-action-outline-secondary-enabled)" }}>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search field"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "var(--spacing-2) var(--spacing-3)",
              border: "1px solid var(--color-interaction-outline-enabled)",
              borderRadius: "var(--radius-md)",
              fontFamily: "var(--font-family-primary)",
              fontSize: "var(--text-body-lg)",
              color: "var(--color-content-primary)",
              outline: "none",
            }}
          />
        </div>
        <DropdownMenuSection contentStyle={{ maxHeight: 280, overflowY: "auto" }}>
          {visibleFields.length === 0 ? (
            <div style={{ padding: "var(--spacing-sm)", color: "var(--color-content-secondary)", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)" }}>
              No fields found
            </div>
          ) : (
            visibleFields.map((field) => (
              <DropdownMenuItem
                key={field.id}
                label={field.label}
                iconName={field.icon}
                active={field.id === value}
                onClick={() => {
                  onChange(field.id);
                  setOpen(false);
                }}
              />
            ))
          )}
        </DropdownMenuSection>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ─────────────────────────────────────────────
// CONDITION SELECTOR DROPDOWN
// ─────────────────────────────────────────────

const ConditionDropdown = ({ value, fieldId, onChange, isFirst }) => {
  const [open, setOpen] = useState(false);
  const selected = ALL_CONDITIONS.find((o) => o.id === value) || ALL_CONDITIONS.find((o) => o.id === "has-any-of");

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <InputTrigger style={{ minWidth: 120, gap: "var(--spacing-xs)" }}>
          {selected.label}
          <Icon name="ChevronDown" size={12} />
        </InputTrigger>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="left" position="bottom" width={200}>
        <div style={{ maxHeight: 280, overflowY: "auto" }}>
          {CONDITION_SECTIONS.map((section, si) => {
            return (
              <React.Fragment key={si}>
                <DropdownMenuSection>
                  {section.map((opt) => {
                    const disabledByFirst = isFirst && opt.id === "has-none-of";
                    const item = (
                      <DropdownMenuItem
                        key={opt.id}
                        label={opt.label}
                        active={opt.id === selected.id}
                        isDisabled={disabledByFirst}
                        onClick={() => {
                          if (disabledByFirst) return;
                          onChange(opt.id);
                          setOpen(false);
                        }}
                      />
                    );
                    return disabledByFirst ? (
                      <Tooltip key={opt.id} content="Add another criteria row first to use exclusion" placement="bottom-left">
                        <span style={{ display: "block" }}>{item}</span>
                      </Tooltip>
                    ) : item;
                  })}
                </DropdownMenuSection>
              </React.Fragment>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ─────────────────────────────────────────────
// VALUE INPUT (text or chip select)
// ─────────────────────────────────────────────

const ValueInput = ({ fieldId, conditionId, value, onChange }) => {
  const noValueConditions = ["is-empty", "is-not-empty"];
  if (noValueConditions.includes(conditionId)) return null;

  const textConditions = [];
  const isTextField = TEXT_FIELDS.includes(fieldId) || textConditions.includes(conditionId);

  if (isTextField) {
    return (
      <TextInput
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter value"
        size="sm"
        style={{ width: "100%" }}
      />
    );
  }

  if (ONTOLOGY_FIELDS.includes(fieldId)) {
    return <OntologyChipSelectInput fieldId={fieldId} value={value} onChange={onChange} />;
  }

  return <ChipSelectInput fieldId={fieldId} value={value} onChange={onChange} />;
};

const ChipSelectInput = ({ fieldId, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [hovered, setHovered] = useState(false);
  const [overflowTooltipVisible, setOverflowTooltipVisible] = useState(false);
  const wrapperRef = useRef(null);
  const chipRowRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(null);
  const options = FIELD_OPTIONS[fieldId] || [];
  const selected = value || [];

  const normalizedSearch = search.trim().toLowerCase();
  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(normalizedSearch)
  );
  const filteredIds = filtered.map((opt) => opt.id);
  const isSearchMode = normalizedSearch.length > 0;
  const shouldShowSelectAllSearchResults = isSearchMode && filteredIds.length > 0;
  const allSearchResultsSelected =
    filteredIds.length > 0 && filteredIds.every((id) => selected.includes(id));

  const removeChip = (id) => onChange(selected.filter((s) => s !== id));
  const addChip = (id) => {
    onChange([...selected, id]);
    setSearch("");
  };
  const toggleChip = (id) => {
    if (selected.includes(id)) {
      removeChip(id);
      return;
    }
    addChip(id);
  };

  const toggleSelectAllSearchResults = () => {
    const next = new Set(selected);
    if (allSearchResultsSelected) {
      filteredIds.forEach((id) => next.delete(id));
    } else {
      filteredIds.forEach((id) => next.add(id));
    }
    onChange([...next]);
  };
  // free-text entry (when no predefined options match)
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && search.trim() && options.length === 0) {
      const newId = search.trim().toLowerCase().replace(/\s+/g, "-");
      if (!selected.includes(newId)) onChange([...selected, newId]);
      setSearch("");
    }
  };

  // Close on outside click
  React.useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const chips = selected.map((id) => {
    const opt = options.find((o) => o.id === id);
    return { id, label: opt ? opt.label : id };
  });

  // Compute how many chips fit in one row
  useLayoutEffect(() => {
    if (!chipRowRef.current || chips.length === 0) {
      setVisibleCount(null);
      return;
    }
    const container = chipRowRef.current;
    const containerWidth = container.offsetWidth;
    const children = Array.from(container.querySelectorAll("[data-chip]"));
    if (children.length === 0) { setVisibleCount(null); return; }
    let usedWidth = 0;
    let count = 0;
    // Reserve space for the badge if not all chips fit
    const BADGE_WIDTH = 40;
    for (let i = 0; i < children.length; i++) {
      const w = children[i].offsetWidth + 4; // 4px gap
      const remaining = children.length - i - 1;
      const needsBadge = remaining > 0 && (usedWidth + w + (remaining > 0 ? BADGE_WIDTH : 0)) > containerWidth;
      if (usedWidth + w > containerWidth || needsBadge) {
        break;
      }
      usedWidth += w;
      count++;
    }
    setVisibleCount(count < chips.length ? count : null);
  }, [chips.length, open]);

  const displayChips = visibleCount !== null ? chips.slice(0, visibleCount) : chips;
  const hiddenChips = visibleCount !== null ? chips.slice(visibleCount) : [];

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
      {/* Trigger / chip display */}
      <div
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-xs)",
          height: 32,
          padding: "0 var(--spacing-sm)",
          background: "var(--color-general-white)",
          borderRadius: "var(--radius-md)",
          outline: hovered && !open
            ? "1px solid var(--color-interaction-outline-hover)"
            : open
            ? "1px solid var(--color-interaction-outline-active)"
            : "1px solid var(--color-interaction-outline-enabled)",
          outlineOffset: "-1px",
          cursor: "pointer",
          boxSizing: "border-box",
          width: "100%",
          transition: "all var(--transition-fast)",
          overflow: "hidden",
        }}
      >
        {chips.length === 0 && (
          <span
            style={{
              flex: 1,
              fontFamily: "var(--font-family-primary)",
              fontSize: "var(--text-body-md)",
              color: "var(--color-content-tertiary)",
            }}
          >
            Select options
          </span>
        )}
        {chips.length > 0 && (
          <div
            ref={chipRowRef}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 4,
              overflow: "hidden",
              minWidth: 0,
            }}
          >
            {displayChips.map((chip) => (
              <span key={chip.id} data-chip style={{ flexShrink: 0, borderRadius: "var(--radius-xs)", overflow: "hidden" }}>
                <Chip
                  size="md"
                  removable
                  onRemove={(e) => { e && e.stopPropagation(); removeChip(chip.id); }}
                  style={{ borderRadius: "var(--radius-xs)" }}
                >
                  {chip.label}
                </Chip>
              </span>
            ))}
            {hiddenChips.length > 0 && (
              <Tooltip
                content={
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {hiddenChips.map((c) => <div key={c.id}>{c.label}</div>)}
                  </div>
                }
                placement="bottom-left"
              >
                <span
                  style={{
                    flexShrink: 0,
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "var(--spacing-xs)",
                    background: "var(--color-general-neutral-lighter)",
                    borderRadius: "var(--radius-xs)",
                    outline: "1px solid var(--color-action-outline-secondary-enabled)",
                    outlineOffset: "-1px",
                    boxShadow: "var(--shadow-light-down)",
                    fontFamily: "var(--font-family-primary)",
                    fontSize: "var(--text-body-md)",
                    lineHeight: "var(--line-height-body-md)",
                    color: "var(--color-content-secondary)",
                    whiteSpace: "nowrap",
                    cursor: "default",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  +{hiddenChips.length}
                </span>
              </Tooltip>
            )}
          </div>
        )}
        <span style={{ marginLeft: "auto", flexShrink: 0, color: "var(--color-content-secondary)" }}>
          <Icon name="ChevronDown" size={12} style={{ transform: open ? "rotate(180deg)" : undefined }} />
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 1000,
            background: "var(--color-general-white)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-action-outline-secondary-enabled)",
            boxShadow: "var(--shadow-medium-down)",
            overflow: "hidden",
            maxHeight: 260,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {options.length === 0 ? (
            <div style={{ padding: "var(--spacing-sm)", borderBottom: "1px solid var(--color-action-outline-secondary-enabled)" }}>
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Type and press Enter to add..."
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "100%",
                  border: "1px solid var(--color-interaction-outline-enabled)",
                  borderRadius: "var(--radius-sm)",
                  padding: "4px 8px",
                  fontFamily: "var(--font-family-primary)",
                  fontSize: "var(--text-body-md)",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          ) : (
            <DropdownList
              noAdd
              onSearch={setSearch}
              searchPlaceholder="Search..."
              style={{
                outline: "none",
                boxShadow: "none",
                borderRadius: 0,
                background: "transparent",
                "--dropdown-list-max-height": "260px",
              }}
            >
              {shouldShowSelectAllSearchResults && (
                <DropdownListItem
                  value="__select-all-search-results__"
                  checked={allSearchResultsSelected}
                  onChange={toggleSelectAllSearchResults}
                  style={{ borderBottom: "1px solid var(--color-action-outline-secondary-enabled)" }}
                >
                  Select all
                </DropdownListItem>
              )}
              {filtered.map((opt) => (
                <DropdownListItem
                  key={opt.id}
                  value={opt.id}
                  checked={selected.includes(opt.id)}
                  onChange={() => toggleChip(opt.id)}
                >
                  <HighlightMatch text={opt.label} query={search} />
                </DropdownListItem>
              ))}
            </DropdownList>
          )}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// ROW ACTIONS DROPDOWN (3-dot menu)
// ─────────────────────────────────────────────

const RowActionsMenu = ({ onConvertToGroup, onDelete, isGrouped }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="tertiary"
          size="sm"
          iconLeading={<Icon name="EllipsisVertical" size={16} />}
          style={{ flexShrink: 0 }}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="right" position="bottom" width={180}>
        <DropdownMenuSection>
          {!isGrouped && (
            <DropdownMenuItem
              label="Convert into group"
              iconName="Squares2X2"
              onClick={() => {
                onConvertToGroup?.();
                setOpen(false);
              }}
            />
          )}
          <DropdownMenuItem
            label="Delete"
            iconName="Trash"
            variant="destructive"
            onClick={() => {
              onDelete?.();
              setOpen(false);
            }}
          />
        </DropdownMenuSection>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ─────────────────────────────────────────────
// CRITERION ROW
// ─────────────────────────────────────────────

let nextId = 1;
const genId = () => `row-${nextId++}`;

const CriterionRow = ({ row, index, isFirst, isLogicDisabled, isGrouped, onChange, onDelete, onConvertToGroup, usedFields = [], groupLogic, onGroupLogicChange, disableNoneOf = false }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--spacing-sm)",
        flexWrap: "nowrap",
      }}
    >
      {!isGrouped && (
        <LogicDropdown
          value={isFirst ? "Where" : row.logic}
          onChange={(logic) => onChange({ ...row, logic })}
          disabled={!isFirst && isLogicDisabled}
        />
      )}
      {isGrouped && !isFirst && (
        <LogicDropdown
          value={groupLogic}
          onChange={onGroupLogicChange}
          disabled={index > 1}
        />
      )}
      {isGrouped && isFirst && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 64,
            height: 32,
            padding: "0 var(--spacing-sm)",
            background: "var(--color-general-neutral-light)",
            borderRadius: "var(--radius-md)",
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-body-md)",
            fontWeight: "var(--font-weight-regular)",
            color: "var(--color-content-secondary)",
          }}
        >
          Where
        </div>
      )}

      <FieldDropdown
        value={row.fieldId}
        onChange={(fieldId) => onChange({ ...row, fieldId, value: null })}
        usedFields={usedFields}
      />

      <ConditionDropdown
        value={row.conditionId}
        fieldId={row.fieldId}
        isFirst={disableNoneOf}
        onChange={(conditionId) => {
          const textConditions = [];
          const noValueConditions = ["is-empty", "is-not-empty"];
          const isChip = (cid) => !textConditions.includes(cid) && !noValueConditions.includes(cid) && !TEXT_FIELDS.includes(row.fieldId);
          const isText = (cid) => textConditions.includes(cid) || TEXT_FIELDS.includes(row.fieldId);
          const keepValue = (isChip(row.conditionId) && isChip(conditionId)) || (isText(row.conditionId) && isText(conditionId));
          onChange({ ...row, conditionId, value: keepValue ? row.value : null });
        }}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <ValueInput
          fieldId={row.fieldId}
          conditionId={row.conditionId}
          value={row.value}
          onChange={(value) => onChange({ ...row, value })}
        />
      </div>

      {isGrouped ? (
        <Button
          variant="tertiary"
          size="sm"
          iconLeading={<Icon name="Trash" size={16} />}
          style={{ flexShrink: 0 }}
          onClick={onDelete}
        />
      ) : (
        <RowActionsMenu onDelete={onDelete} onConvertToGroup={onConvertToGroup} isGrouped={isGrouped} />
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// GROUP
// ─────────────────────────────────────────────

const CriteriaGroup = ({ group, groupIndex, onChange, onDeleteGroup, isAbsoluteFirst = false }) => {
  const usedFields = group.rows.map((r) => r.fieldId).filter(Boolean);
  const groupLogic = group.rowLogic || "And";

  const setGroupLogic = (rowLogic) => {
    onChange({ ...group, rowLogic });
  };
  const addRow = () => {
    const nextField = SEARCH_FIELDS.find((f) => !usedFields.includes(f.id));
    onChange({
      ...group,
      rows: [...group.rows, { id: genId(), fieldId: nextField?.id || "therapeutic-area", conditionId: "has-any-of", value: null }],
    });
  };

  const updateRow = (rowIndex, updated) => {
    let rows = [...group.rows];
    rows[rowIndex] = updated;
    onChange({ ...group, rows });
  };

  const deleteRow = (rowIndex) => {
    const rows = group.rows.filter((_, i) => i !== rowIndex);
    onChange({ ...group, rows });
  };

  const groupHasIncomplete = group.rows.some(isRowIncomplete);

  return (
    <div
      style={{
        background: "var(--color-general-neutral-light)",
        border: "1px solid var(--color-action-outline-secondary-enabled)",
        borderRadius: "var(--radius-md)",
        padding: "var(--spacing-md)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-sm)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-body-sm)",
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--color-content-secondary)",
          }}
        >
          Group {groupIndex + 1}
        </div>
        <Button variant="tertiary" size="sm" onClick={onDeleteGroup}>
          Delete group
        </Button>
      </div>

      {group.rows.map((row, i) => (
        <CriterionRow
          key={row.id}
          row={row}
          index={i}
          isFirst={i === 0}
          isLogicDisabled={false}
          isGrouped
          onChange={(updated) => updateRow(i, updated)}
          onDelete={() => deleteRow(i)}
          usedFields={usedFields}
          groupLogic={groupLogic}
          onGroupLogicChange={setGroupLogic}
          disableNoneOf={isAbsoluteFirst && i === 0}
        />
      ))}

      <Tooltip
        content="You have an incomplete search criteria"
        placement="bottom-left"
        isDisabled={!groupHasIncomplete}
      >
        <div style={{ display: "inline-flex" }}>
          <Button
            variant="tertiary"
            size="md"
            iconLeading={<Icon name="Plus" size={14} />}
            onClick={groupHasIncomplete ? undefined : addRow}
            style={{
              cursor: groupHasIncomplete ? "not-allowed" : "pointer",
              opacity: groupHasIncomplete ? 0.5 : 1,
              pointerEvents: "auto",
            }}
          >
            Add search criteria
          </Button>
        </div>
      </Tooltip>


    </div>
  );
};

// ─────────────────────────────────────────────
// VALIDATION
// ─────────────────────────────────────────────

const isRowIncomplete = (row) => {
  const noValueConditions = ["is-empty", "is-not-empty"];
  if (!row.fieldId || !row.conditionId) return true;
  if (!noValueConditions.includes(row.conditionId)) {
    const isTextField = TEXT_FIELDS.includes(row.fieldId);
    if (isTextField && !row.value) return true;
    if (!isTextField && (!row.value || row.value.length === 0)) return true;
  }
  return false;
};

const DEFAULT_FIELD_ID = "therapeutic-area";

const findAvailableFieldId = (usedFields = [], currentFieldId) => {
  const used = new Set(usedFields.filter(Boolean));
  if (currentFieldId && !used.has(currentFieldId)) return currentFieldId;
  const next = SEARCH_FIELDS.find((f) => !used.has(f.id));
  return next?.id || currentFieldId || DEFAULT_FIELD_ID;
};

const normalizeRowsAtSameLevel = (rows = []) => {
  const used = new Set();
  return rows.map((row) => {
    let nextFieldId = row.fieldId;
    if (!nextFieldId || used.has(nextFieldId)) {
      nextFieldId = findAvailableFieldId([...used], row.fieldId);
    }
    used.add(nextFieldId);
    return { ...row, fieldId: nextFieldId };
  });
};

const ensureUniqueItemsAndRowIds = (items = []) => {
  const usedItemIds = new Set();

  const nextUniqueId = (preferredId, usedSet) => {
    if (preferredId && !usedSet.has(preferredId)) {
      usedSet.add(preferredId);
      return preferredId;
    }

    let generated = genId();
    while (usedSet.has(generated)) {
      generated = genId();
    }
    usedSet.add(generated);
    return generated;
  };

  return items.map((item) => {
    const normalizedItemId = nextUniqueId(item.id, usedItemIds);

    if (item.type !== "group") {
      return { ...item, id: normalizedItemId };
    }

    const usedRowIds = new Set();
    const rows = (item.rows || []).map((row) => ({
      ...row,
      id: nextUniqueId(row.id, usedRowIds),
    }));

    return {
      ...item,
      id: normalizedItemId,
      rows,
    };
  });
};

const normalizeItemsByLevel = (items = []) => {
  const idSafeItems = ensureUniqueItemsAndRowIds(items);
  const topRows = idSafeItems.filter((item) => item.type === "row");
  const normalizedTopRows = normalizeRowsAtSameLevel(topRows);
  let topRowCursor = 0;

  return idSafeItems.map((item) => {
    if (item.type === "row") {
      const normalized = normalizedTopRows[topRowCursor] || item;
      topRowCursor += 1;
      return { ...item, fieldId: normalized.fieldId };
    }

    if (item.type === "group") {
      return {
        ...item,
        rows: normalizeRowsAtSameLevel(item.rows || []),
      };
    }

    return item;
  });
};

const getFieldLabel = (fieldId) => {
  return SEARCH_FIELDS.find((field) => field.id === fieldId)?.label || "Unknown field";
};

const getConditionReviewMeta = (conditionId) => {
  if (conditionId === "has-any-of") return { label: "is", isNegative: false, joinWord: "or" };
  if (conditionId === "has-all-of") return { label: "is", isNegative: false, joinWord: "and" };
  if (conditionId === "has-none-of") return { label: "is not", isNegative: true, joinWord: "or" };
  return { label: "", isNegative: false, joinWord: "or" };
};

const getValueLabels = (fieldId, value) => {
  if (value === null || value === undefined || value === "") return [];

  const values = Array.isArray(value) ? value : [value];

  if (ONTOLOGY_FIELDS.includes(fieldId)) {
    const lookup = ontologyBuildLookup(ONTOLOGY_FIELD_TREES[fieldId] || []);
    return values.map((id) => lookup.get(id)?.label || String(id));
  }

  const optionMap = new Map((FIELD_OPTIONS[fieldId] || []).map((opt) => [opt.id, opt.label]));
  return values.map((id) => optionMap.get(id) || String(id));
};

// ─────────────────────────────────────────────
// CONFLICT DETECTION (Layout B)
// ─────────────────────────────────────────────

const valuesOverlapB = (a, b) => {
  const setA = new Set(Array.isArray(a) ? a : []);
  return (Array.isArray(b) ? b : []).some((v) => setA.has(v));
};

const detectConflictsB = (items) => {
  // For Layout B: negation comes from has-none-of condition
  const positiveRows = []; // has-any-of or has-all-of
  const negativeRows = []; // has-none-of

  items.forEach((item) => {
    if (item.type === "row") {
      (item.conditionId === "has-none-of" ? negativeRows : positiveRows).push(item);
    } else if (item.type === "group") {
      (item.rows || []).forEach((row) => {
        (row.conditionId === "has-none-of" ? negativeRows : positiveRows).push(row);
      });
    }
  });

  for (const neg of negativeRows) {
    for (const pos of positiveRows) {
      if (neg.fieldId && pos.fieldId && neg.fieldId === pos.fieldId) {
        if (valuesOverlapB(neg.value, pos.value)) return true;
      }
    }
  }
  return false;
};

// ─────────────────────────────────────────────
// ─────────────────────────────────────────────

const parseCriteriaFromUrl = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("criteria");
    if (!encoded) return null;
    return JSON.parse(decodeURIComponent(encoded));
  } catch {
    return null;
  }
};

const AdvancedSearchTab = () => {
  const [items, setItems] = useState(() => {
    const saved = parseCriteriaFromUrl();
    const parsedItems = saved?.items || [
      { type: "row", id: genId(), logic: "Where", fieldId: "therapeutic-area", conditionId: "has-any-of", value: null },
    ];
    return normalizeItemsByLevel(parsedItems);
  });
  const [searchName, setSearchName] = useState(() => parseCriteriaFromUrl()?.searchName || "");
  const [showValidation, setShowValidation] = useState(false);

  const rows = items.filter((it) => it.type === "row");
  const groups = items.filter((it) => it.type === "group");

  const topLevelLogic = items[1]?.logic || "Or";

  const renderReviewRow = (row, keyPrefix) => {
    const fieldLabel = getFieldLabel(row.fieldId);
    const { label: conditionLabel, isNegative, joinWord } = getConditionReviewMeta(row.conditionId);
    const valueLabels = getValueLabels(row.fieldId, row.value);
    const MAX_SHOWN = 3;
    const shownValues = valueLabels.slice(0, MAX_SHOWN);
    const overflowCount = valueLabels.length - MAX_SHOWN;
    const negativeColor = "var(--color-content-negative)";
    const valueColor = "var(--color-content-primary)";

    return (
      <span key={keyPrefix} style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-lg)", color: "var(--color-content-primary)" }}>
        <span>{fieldLabel}</span>{" "}
        <span style={{ color: isNegative ? negativeColor : "var(--color-content-secondary)" }}>{conditionLabel}</span>{" "}
        {shownValues.length > 0 ? (
          shownValues.map((label, i) => (
            <React.Fragment key={`${keyPrefix}-v-${i}`}>
              {i > 0 && <span style={{ color: isNegative ? negativeColor : "var(--color-content-secondary)" }}> {joinWord} </span>}
              <span style={{ color: valueColor }}>{label}</span>
            </React.Fragment>
          ))
        ) : (
          <span style={{ color: "var(--color-content-secondary)"}}>—</span>
        )}
        {overflowCount > 0 && (
          <span style={{ color: isNegative ? negativeColor : "var(--color-content-secondary)" }}> {joinWord} +{overflowCount}</span>
        )}
      </span>
    );
  };

  const addRow = () => {
    const usedFields = rows.map((r) => r.fieldId).filter(Boolean);
    const nextField = SEARCH_FIELDS.find((f) => !usedFields.includes(f.id));
    setItems((prev) =>
      normalizeItemsByLevel([
        ...prev,
        { type: "row", id: genId(), logic: topLevelLogic, fieldId: nextField?.id || "therapeutic-area", conditionId: "has-any-of", value: null },
      ])
    );
  };

  const updateItem = (id, updated) => {
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.id === id);
      if (idx === -1) return prev;
      const item = prev[idx];
      // Only sync top-level logic across rows (not groups) when a row's logic changes
      if (item?.type === "row" && updated.logic !== undefined && updated.logic !== item.logic) {
        const nextItems = prev.map((it, i) => i === 0 ? it : { ...it, logic: updated.logic });
        return normalizeItemsByLevel(nextItems);
      }
      const nextItems = prev.map((it, i) => (i === idx ? { ...it, ...updated } : it));
      return normalizeItemsByLevel(nextItems);
    });
  };

  const deleteItem = (id) => {
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.id === id);
      if (idx === -1) return prev;
      return normalizeItemsByLevel(prev.filter((_, i) => i !== idx));
    });
  };

  const convertRowToGroup = (id) => {
    setItems((prev) => {
      const idx = prev.findIndex((it) => it.id === id);
      if (idx === -1) return prev;

      const nextItems = prev.map((it, i) => {
        if (i !== idx) return it;
        return { type: "group", id: it.id, logic: it.logic, rowLogic: "And", rows: [{ ...it, type: "row", logic: "Where" }] };
      });

      return normalizeItemsByLevel(nextItems);
    });
  };

  const hasIncomplete = rows.some(isRowIncomplete) || groups.some((g) => g.rows.some(isRowIncomplete));
  const isEmpty = items.length === 0;
  const hasAtLeastOneComplete = rows.some((r) => !isRowIncomplete(r)) || groups.some((g) => g.rows.some((r) => !isRowIncomplete(r)));
  const canGenerate = hasAtLeastOneComplete && searchName.trim();

  const handleGenerate = () => {
    setShowValidation(true);
    if (canGenerate) {
      const criteria = JSON.stringify({ searchName, items });
      const encoded = encodeURIComponent(criteria);
      window.history.pushState({}, "", `/nexus/results2?criteria=${encoded}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
      {/* Criteria rows */}
      <div
        style={{
          background: "var(--color-general-neutral-lighter)",
          border: "1px solid var(--color-action-outline-secondary-enabled)",
          borderRadius: "var(--radius-lg)",
          padding: "var(--spacing-md)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-sm)",
        }}
      >
        {items.map((item, i) => {
          const isFirst = i === 0;
          if (item.type === "row") {
            const usedFields = rows.map((r) => r.fieldId).filter(Boolean);
            return (
              <CriterionRow
                key={item.id}
                row={item}
                index={i}
                isFirst={isFirst}
                isLogicDisabled={i > 1}
                onChange={(updated) => updateItem(item.id, updated)}
                onDelete={() => deleteItem(item.id)}
                onConvertToGroup={() => convertRowToGroup(item.id)}
                usedFields={usedFields}
                disableNoneOf={isFirst}
              />
            );
          }
          // group
          return (
            <div key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: "var(--spacing-sm)" }}>
              {!isFirst && (
                <div style={{ flexShrink: 0, paddingTop: 4 }}>
                  <LogicDropdown
                    value={item.logic || "Or"}
                    onChange={(logic) => updateItem(item.id, { logic })}
                    disabled={i > 1}
                  />
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <CriteriaGroup
                  group={item}
                  groupIndex={groups.indexOf(item)}
                  onChange={(updated) => updateItem(item.id, updated)}
                  onDeleteGroup={() => deleteItem(item.id)}
                  isAbsoluteFirst={isFirst}
                />
              </div>
            </div>
          );
        })}

        {showValidation && hasIncomplete && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--spacing-xs)",
              background: "var(--color-content-primary)",
              color: "var(--color-general-white)",
              borderRadius: "var(--radius-md)",
              padding: "var(--spacing-xs) var(--spacing-sm)",
              fontFamily: "var(--font-family-primary)",
              fontSize: "var(--text-body-sm)",
              alignSelf: "flex-start",
            }}
          >
            You have an incomplete search criteria
          </div>
        )}

        <Tooltip
          content="You have an incomplete search criteria"
          placement="bottom-left"
          isDisabled={!hasIncomplete}
        >
          <div style={{ display: "inline-flex", alignSelf: "flex-start" }}>
            <Button
              variant="tertiary"
              size="md"
              iconLeading={<Icon name="Plus" size={14} />}
              onClick={hasIncomplete ? undefined : addRow}
              style={{
                cursor: hasIncomplete ? "not-allowed" : "pointer",
                opacity: hasIncomplete ? 0.5 : 1,
                pointerEvents: "auto",
              }}
            >
              Add search criteria
            </Button>
          </div>
        </Tooltip>
      </div>

      <div
        style={{
          width: "100%",
          borderTop: "1px solid var(--color-action-outline-secondary-enabled)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
        <div
          style={{
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-heading-h3)",
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--color-content-primary)",
          }}
        >
          Search summary
        </div>
        <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "var(--spacing-xs)", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-lg)", color: "var(--color-content-primary)" }}>
          <span>Show all assets where</span>
          {items.length > 0 ? (
            items.map((item, index) => (
              <React.Fragment key={`review-${index}`}>
                {index > 0 && (
                  <strong style={{ color: "var(--color-content-primary)" }}>
                    {(items[index].logic || topLevelLogic || "Or").toUpperCase()}
                  </strong>
                )}
                {item.type === "group" ? (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "baseline",
                      flexWrap: "wrap",
                      gap: "var(--spacing-xs)",
                      padding: "var(--spacing-xs)",
                      borderRadius: "var(--radius-sm)",
                      border: "1px dashed var(--color-action-outline-secondary-enabled)",
                      background: "var(--color-general-neutral-lighter)",
                    }}
                  >
                    {(item.rows || []).map((row, rowIndex) => (
                      <React.Fragment key={`review-group-${item.id}-${row.id}`}>
                        {rowIndex > 0 && (
                          <strong style={{ color: "var(--color-content-primary)" }}>
                            {(item.rowLogic || "And").toUpperCase()}
                          </strong>
                        )}
                        <span style={{ display: "inline-flex", alignItems: "baseline", padding: "2px var(--spacing-sm)", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-action-outline-secondary-enabled)", background: "var(--color-general-white)" }}>
                          {renderReviewRow(row, `review-group-row-${item.id}-${row.id}-${rowIndex}`)}
                        </span>
                      </React.Fragment>
                    ))}
                  </span>
                ) : (
                  <span style={{ display: "inline-flex", alignItems: "baseline", padding: "2px var(--spacing-sm)", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-action-outline-secondary-enabled)", background: "var(--color-general-white)" }}>
                    {renderReviewRow(item, `review-row-${item.id}-${index}`)}
                  </span>
                )}
              </React.Fragment>
            ))
          ) : (
            <span style={{ color: "var(--color-content-secondary)" }}>Add at least one criteria</span>
          )}
        </div>
      </div>

      {/* Name input + generate */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-md)" }}>
          <div style={{ flex: 1 }}>
            <TextInput
              label="Name this search"
              isRequired
              size="sm"
              placeholder="Input the name of this search"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div style={{ flexShrink: 0, marginTop: 20 }}>
            <Button variant="primary" iconLeading={<Icon name="SparklesSolid" size={16} />} disabled={!canGenerate} onClick={handleGenerate}>
              Generate results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// BASIC SEARCH TAB
// ─────────────────────────────────────────────

const BASIC_FIELDS = [
  { id: "therapeutic-area", label: "Therapeutic area", placeholder: "Select therapeutic area" },
  { id: "drug-type", label: "Drug type", placeholder: "Select drug type" },
  { id: "target", label: "Target", placeholder: "Select target" },
  { id: "mechanism", label: "Mechanism", placeholder: "Select mechanisms" },
  { id: "clinical-indication", label: "Indication", placeholder: "Select indications" },
  { id: "development-phase", label: "Development phase", placeholder: "Select development phases" },
  { id: "territories", label: "Territories", placeholder: "Select territories" },
];

const BasicSearchTab = () => {
  const [values, setValues] = useState({});
  const [searchName, setSearchName] = useState("");

  const setField = (fieldId, chips) => {
    setValues((prev) => ({ ...prev, [fieldId]: chips }));
  };

  const hasAnyCriteria = Object.values(values).some((v) => v && v.length > 0);
  const canGenerate = hasAnyCriteria && searchName.trim();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "var(--spacing-md)",
        }}
      >
        {BASIC_FIELDS.map((field) => (
          <div key={field.id} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
            <div
              style={{
                fontFamily: "var(--font-family-primary)",
                fontSize: "var(--text-body-md)",
                color: "var(--color-content-primary)",
              }}
            >
              {field.label}
            </div>
            {ONTOLOGY_FIELDS.includes(field.id) ? (
              <OntologyChipSelectInput
                fieldId={field.id}
                value={values[field.id] || []}
                onChange={(chips) => setField(field.id, chips)}
              />
            ) : (
              <ChipSelectInput
                fieldId={field.id}
                value={values[field.id] || []}
                onChange={(chips) => setField(field.id, chips)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Name input + generate */}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-md)" }}>
        <div style={{ flex: 1 }}>
          <TextInput
            label="Name this search"
            isRequired
            size="sm"
            placeholder="Input the name of this search"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div style={{ flexShrink: 0, marginTop: 20 }}>
          <Button
            variant="primary"
            iconLeading={<Icon name="SparklesSolid" size={16} />}
            disabled={!canGenerate}
            onClick={() => canGenerate && alert(`Generating results for: ${searchName}`)}
          >
            Generate results
          </Button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export const AdvancedFilters2Page = () => {
  const [tab, setTab] = useState("advanced");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-general-neutral-light)",
        boxSizing: "border-box",
        fontFamily: "var(--font-family-primary)",
        paddingTop: 48, 
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-md)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-heading-h2)",
            fontWeight: "var(--font-weight-semibold)",
            color: "var(--color-content-primary)",
          }}
        >
          Define search criteria
        </div>

        {/* Hint */}
        <MiniInfobox >
           To generate results, please enter a search name and select at least one criteria
        </MiniInfobox>
    

        <Tabs selectedKey={tab} onSelectionChange={setTab}>
          <Tab id="basic">Basic search</Tab>
          <Tab id="advanced">Advanced search</Tab>
        </Tabs>

        {tab === "basic" && <BasicSearchTab />}
        {tab === "advanced" && <AdvancedSearchTab />}
      </div>
    </div>
  );
};

export default AdvancedFilters2Page;
