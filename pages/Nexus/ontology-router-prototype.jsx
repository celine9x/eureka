import React, { useEffect, useMemo, useRef, useState } from "react";
import ChipInput from "../../library/molecules/chip-input.jsx";
import { DropdownList, DropdownSection } from "../../library/molecules/dropdown-list.jsx";
import { Checkbox } from "../../library/atoms/checkbox.jsx";
import { Icon } from "../../library/atoms/icon.jsx";

const ONTOLOGY_TREE = [
  {
    id: "diseases",
    label: "Diseases",
    children: [
      {
        id: "musculoskeletal-diseases",
        label: "Musculoskeletal Diseases",
        children: [
          {
            id: "skeletal-diseases",
            label: "Skeletal Diseases",
            children: [
              {
                id: "bone-diseases-developmental",
                label: "Bone Diseases, Developmental",
                children: [
                  {
                    id: "lower-extremity-deformities",
                    label: "Lower Extremity Deformities",
                    children: [
                      {
                        id: "hip-diseases",
                        label: "Hip Diseases",
                        children: [
                          {
                            id: "proximal-femoral-deformities",
                            label: "Proximal Femoral Deformities",
                            children: [
                              {
                                id: "femoral-neck-deformities",
                                label: "Femoral Neck Deformities",
                                children: [
                                  {
                                    id: "coxa-deformities",
                                    label: "Coxa Deformities",
                                    children: [
                                      {
                                        id: "coxa-valga",
                                        label: "Coxa Valga",
                                        children: [
                                          {
                                            id: "coxa-valga-congenita",
                                            label: "Coxa Valga Congenita",
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "bone-neoplasms",
            label: "Bone Neoplasms",
            children: [
              {
                id: "osteoblastoma",
                label: "Osteoblastoma",
              },
            ],
          },
          {
            id: "joint-diseases",
            label: "Joint Diseases",
            children: [
              {
                id: "arthropathies",
                label: "Arthropathies",
                children: [
                  {
                    id: "osteoarthritis",
                    label: "Osteoarthritis",
                    children: [
                      {
                        id: "osteoarthritis-primary-hypertrophic",
                        label: "Osteoarthritis, Primary Hypertrophic",
                        children: [
                          {
                            id: "osteoarthritis-primary-hypertrophic-pelvic-region-thigh",
                            label: "Osteoarthritis, Primary Hypertrophic, Pelvic Region And Thigh",
                          },
                          {
                            id: "osteochondrosis",
                            label: "Osteochondrosis",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: "epiphyses-slipped",
            label: "Epiphyses Slipped",
          },
        ],
      },
    ],
  },
];

const rowStyles = {
  surface: {
    position: "relative",
    width: "100%",
    maxWidth: 440,
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 6px)",
    left: 0,
    right: 0,
    zIndex: 20,
  },
  content: {
    padding: "var(--spacing-6)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-4)",
    background: "var(--color-general-neutral-lightest)",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-4)",
    width: "100%",
    maxWidth: 520,
    padding: "var(--spacing-5)",
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-light-down)",
  },
  eyebrow: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    color: "var(--color-content-secondary)",
  },
  title: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-heading-h4)",
    lineHeight: "var(--line-height-heading-h4)",
    fontWeight: "var(--font-weight-bold)",
    color: "var(--color-content-primary)",
  },
  helper: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    color: "var(--color-content-secondary)",
  },
  treeRow: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-2)",
    width: "100%",
    padding: "var(--spacing-2)",
    borderRadius: "var(--radius-md)",
    boxSizing: "border-box",
  },
  treeRowHover: {
    background: "var(--color-general-neutral-lighter)",
  },
  treeLabelButton: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-2)",
    flex: 1,
    minWidth: 0,
    border: "none",
    background: "transparent",
    padding: 0,
    cursor: "pointer",
    textAlign: "left",
  },
  treeLabelText: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    lineHeight: "var(--line-height-body-lg)",
    color: "var(--color-content-primary)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  chevronButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 20,
    height: 20,
    border: "none",
    borderRadius: "var(--radius-sm)",
    background: "transparent",
    color: "var(--color-content-secondary)",
    cursor: "pointer",
    flexShrink: 0,
  },
  chevronSpacer: {
    width: 20,
    height: 20,
    flexShrink: 0,
  },
  status: {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--spacing-2)",
  },
  statusPill: {
    padding: "var(--spacing-1) var(--spacing-2)",
    borderRadius: "var(--radius-full)",
    background: "var(--color-general-neutral-lighter)",
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-caption)",
    lineHeight: "var(--line-height-body-caption)",
  },
};

const getLeafIds = (node) => {
  if (!node.children || node.children.length === 0) {
    return [node.id];
  }

  return node.children.flatMap(getLeafIds);
};

const buildLookup = (nodes, map = new Map()) => {
  nodes.forEach((node) => {
    map.set(node.id, node);
    if (node.children?.length) {
      buildLookup(node.children, map);
    }
  });

  return map;
};

const matchesTree = (node, query) => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  if (node.label.toLowerCase().includes(normalizedQuery)) {
    return true;
  }

  return (node.children || []).some((child) => matchesTree(child, normalizedQuery));
};

const getSelectionState = (node, selectedLeafIds) => {
  const leafIds = getLeafIds(node);
  const selectedCount = leafIds.filter((leafId) => selectedLeafIds.has(leafId)).length;

  if (selectedCount === 0) {
    return { checked: false, indeterminate: false, leafIds };
  }

  if (selectedCount === leafIds.length) {
    return { checked: true, indeterminate: false, leafIds };
  }

  return { checked: false, indeterminate: true, leafIds };
};

const summarizeTreeSelection = (nodes, selectedLeafIds) => {
  const chips = [];

  const visit = (node) => {
    const state = getSelectionState(node, selectedLeafIds);

    if (state.checked) {
      chips.push({ id: node.id, label: node.label });
      return;
    }

    if (!node.children?.length) {
      if (selectedLeafIds.has(node.id)) {
        chips.push({ id: node.id, label: node.label });
      }
      return;
    }

    node.children.forEach(visit);
  };

  nodes.forEach(visit);
  return chips;
};

const TreeRow = ({
  node,
  depth,
  expandedIds,
  onToggleExpanded,
  onToggleSelection,
  selectedLeafIds,
  searchQuery,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasChildren = Boolean(node.children?.length);

  if (!matchesTree(node, searchQuery)) {
    return null;
  }

  const isExpanded = expandedIds.has(node.id) || Boolean(searchQuery.trim());
  const selectionState = getSelectionState(node, selectedLeafIds);

  return (
    <>
      <div
        style={{
          ...rowStyles.treeRow,
          ...(isHovered ? rowStyles.treeRowHover : null),
          paddingLeft: `calc(var(--spacing-2) + ${depth} * var(--spacing-4))`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {hasChildren ? (
          <button
            type="button"
            style={rowStyles.chevronButton}
            onClick={(event) => {
              event.stopPropagation();
              onToggleExpanded(node.id);
            }}
            aria-label={isExpanded ? `Collapse ${node.label}` : `Expand ${node.label}`}
          >
            <Icon
              name={isExpanded ? "ChevronDown" : "ChevronRight"}
              size="sm"
              color="var(--color-content-secondary)"
            />
          </button>
        ) : (
          <span style={rowStyles.chevronSpacer} aria-hidden="true" />
        )}

        <Checkbox
          size="sm"
          isSelected={selectionState.checked}
          isIndeterminate={selectionState.indeterminate}
          onChange={() => onToggleSelection(node)}
        />

        <button
          type="button"
          style={rowStyles.treeLabelButton}
          onClick={() => onToggleSelection(node)}
          aria-label={`Toggle ${node.label}`}
        >
          <span style={rowStyles.treeLabelText}>{node.label}</span>
        </button>
      </div>

      {hasChildren && isExpanded
        ? node.children.map((child) => (
            <TreeRow
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedIds={expandedIds}
              onToggleExpanded={onToggleExpanded}
              onToggleSelection={onToggleSelection}
              selectedLeafIds={selectedLeafIds}
              searchQuery={searchQuery}
            />
          ))
        : null}
    </>
  );
};

export const OntologyRouterPrototypePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeafIds, setSelectedLeafIds] = useState(
    () =>
      new Set([
        "coxa-valga-congenita",
        "osteoarthritis-primary-hypertrophic-pelvic-region-thigh",
        "osteochondrosis",
      ])
  );
  const [expandedIds, setExpandedIds] = useState(
    () =>
      new Set([
        "diseases",
        "musculoskeletal-diseases",
        "skeletal-diseases",
        "bone-diseases-developmental",
        "lower-extremity-deformities",
        "hip-diseases",
        "proximal-femoral-deformities",
        "femoral-neck-deformities",
        "coxa-deformities",
        "coxa-valga",
        "joint-diseases",
        "arthropathies",
        "osteoarthritis",
        "osteoarthritis-primary-hypertrophic",
      ])
  );
  const containerRef = useRef(null);

  const nodeLookup = useMemo(() => buildLookup(ONTOLOGY_TREE), []);
  const chips = useMemo(
    () => summarizeTreeSelection(ONTOLOGY_TREE, selectedLeafIds),
    [selectedLeafIds]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleExpanded = (nodeId) => {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const toggleSelection = (node) => {
    const { checked, leafIds } = getSelectionState(node, selectedLeafIds);

    setSelectedLeafIds((current) => {
      const next = new Set(current);

      if (checked) {
        leafIds.forEach((leafId) => next.delete(leafId));
      } else {
        leafIds.forEach((leafId) => next.add(leafId));
      }

      return next;
    });
  };

  const removeChip = (chipId) => {
    const node = nodeLookup.get(chipId);
    if (!node) return;

    const leafIds = getLeafIds(node);
    setSelectedLeafIds((current) => {
      const next = new Set(current);
      leafIds.forEach((leafId) => next.delete(leafId));
      return next;
    });
  };

  return (
    <div style={rowStyles.content}>
      <div style={rowStyles.card}>
        <p style={rowStyles.eyebrow}>Quick prototype</p>
        <h1 style={rowStyles.title}>Ontology router selection</h1>
        <p style={rowStyles.helper}>
          Parent selection collapses to one chip, partial branches keep child chips, and the tree now uses
          a real 10-level ontology chain for the Coxa Valga branch.
        </p>

        <div style={rowStyles.surface} ref={containerRef}>
          <ChipInput
            label="Indication"
            placeholder="Select ontology terms"
            chips={chips}
            onChipRemove={removeChip}
            onClear={() => setSelectedLeafIds(new Set())}
            showClear={chips.length > 0}
            isOpen={isOpen}
            onDropdownClick={() => setIsOpen((current) => !current)}
          />

          {isOpen ? (
            <div style={rowStyles.dropdown}>
              <DropdownList
                noAdd
                searchPlaceholder="Search ontology"
                onSearch={setSearchQuery}
              >
                <DropdownSection>
                  {ONTOLOGY_TREE.map((node) => (
                    <TreeRow
                      key={node.id}
                      node={node}
                      depth={0}
                      expandedIds={expandedIds}
                      onToggleExpanded={toggleExpanded}
                      onToggleSelection={toggleSelection}
                      selectedLeafIds={selectedLeafIds}
                      searchQuery={searchQuery}
                    />
                  ))}
                </DropdownSection>
              </DropdownList>
            </div>
          ) : null}
        </div>

        <div style={rowStyles.status}>
          <span style={rowStyles.statusPill}>{`${chips.length} visible chip${chips.length === 1 ? "" : "s"}`}</span>
          <span style={rowStyles.statusPill}>{`${selectedLeafIds.size} selected leaf node${selectedLeafIds.size === 1 ? "" : "s"}`}</span>
        </div>
      </div>
    </div>
  );
};

export default OntologyRouterPrototypePage;