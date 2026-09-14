import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../library/atoms/button.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { Toggle } from "../../library/atoms/toggle.jsx";
import { Badge } from "../../library/atoms/badge.jsx";
import { Chip } from "../../library/atoms/chip.jsx";
import { Tooltip } from "../../library/atoms/tooltip.jsx";
import { TextInput } from "../../library/molecules/text-input.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSection,
  DropdownMenuTrigger,
} from "../../library/molecules/dropdown-menu.jsx";

const REFRESH_META = {
  lastRefreshed: "Jul 3, 2024",
  comparedWith: "Jun 12, 2024",
};

const BASE_ASSETS = [
  {
    id: "ast-001",
    assetTitle: "ALX-201",
    assetClass: "Small molecule",
    owner: "Oncology",
    region: "NA",
    confidence: 95,
    fieldSources: {
      activeCompany: { provider: "EDGAR", refreshedAt: "Jul 3, 2024" },
      target: { provider: "ClinicalTrials.gov", refreshedAt: "Jul 3, 2024" },
      developmentPhase: { provider: "Pipeline DB", refreshedAt: "Jul 3, 2024" },
      clinicalIndications: { provider: "Reg tracker", refreshedAt: "Jul 3, 2024" },
    },
    baseline: {
      asset: "ALX-201",
      activeCompany: "Aurelia Therapeutics",
      otherNames: "AX201",
      developmentPhase: "Phase 2",
      drugType: "Kinase inhibitor",
      mechanismOfAction: "Selective JAK pathway inhibition",
      target: "JAK1",
      clinicalIndications: "Rheumatoid arthritis",
    },
    refreshed: {
      asset: "ALX-201",
      activeCompany: "Aurelia Therapeutics",
      otherNames: "AX201",
      developmentPhase: "Phase 3",
      drugType: "Kinase inhibitor",
      mechanismOfAction: "Selective JAK pathway inhibition",
      target: "JAK1",
      clinicalIndications: "Rheumatoid arthritis",
    },
  },
  {
    id: "ast-002",
    assetTitle: "NRV-88",
    assetClass: "Biologic",
    owner: "Neuro",
    region: "EU",
    confidence: 90,
    fieldSources: {
      activeCompany: { provider: "Company filing", refreshedAt: "Jul 3, 2024" },
      target: { provider: "PubMed graph", refreshedAt: "Jul 3, 2024" },
      mechanismOfAction: { provider: "Research note", refreshedAt: "Jul 3, 2024" },
    },
    baseline: {
      asset: "NRV-88",
      activeCompany: "NordRiver Biotech",
      otherNames: "Nervion-88",
      developmentPhase: "Phase 1",
      drugType: "Monoclonal antibody",
      mechanismOfAction: "IL-17 neutralization",
      target: "IL-17A",
      clinicalIndications: "Psoriasis",
    },
    refreshed: {
      asset: "NRV-88",
      activeCompany: "NordRiver Biotech",
      otherNames: "Nervion-88",
      developmentPhase: "Phase 1",
      drugType: "Monoclonal antibody",
      mechanismOfAction: "IL-17A neutralization",
      target: "IL-17A",
      clinicalIndications: "Psoriasis",
    },
  },
  {
    id: "ast-003",
    assetTitle: "CRX-410",
    assetClass: "Cell therapy",
    owner: "Immunology",
    region: "Global",
    confidence: 82,
    fieldSources: {
      activeCompany: { provider: "Partner portal", refreshedAt: "Jul 3, 2024" },
      developmentPhase: { provider: "Pipeline DB", refreshedAt: "Jul 3, 2024" },
      target: { provider: "Mechanism index", refreshedAt: "Jul 3, 2024" },
    },
    baseline: {
      asset: "CRX-410",
      activeCompany: "Coraxis Labs",
      otherNames: "CRX410",
      developmentPhase: "Preclinical",
      drugType: "CAR-T",
      mechanismOfAction: "Autologous T-cell expansion",
      target: "CD19",
      clinicalIndications: "B-cell lymphoma",
    },
    refreshed: {
      asset: "CRX-410",
      activeCompany: "Coraxis Labs",
      otherNames: "CRX410",
      developmentPhase: "Phase 1",
      drugType: "CAR-T",
      mechanismOfAction: "Autologous T-cell expansion",
      target: "CD19",
      clinicalIndications: "B-cell lymphoma",
    },
  },
  {
    id: "ast-004",
    assetTitle: "MTR-12",
    assetClass: "Peptide",
    owner: "Metabolic",
    region: "APAC",
    confidence: 86,
    fieldSources: {
      activeCompany: { provider: "Exchange feed", refreshedAt: "Jul 3, 2024" },
      clinicalIndications: { provider: "Medical taxonomy", refreshedAt: "Jul 3, 2024" },
      target: { provider: "Target DB", refreshedAt: "Jul 3, 2024" },
    },
    baseline: {
      asset: "MTR-12",
      activeCompany: "Mitratech Pharma",
      otherNames: "Metra-12",
      developmentPhase: "Phase 2",
      drugType: "GLP-1 analog",
      mechanismOfAction: "Incretin receptor agonism",
      target: "GLP-1R",
      clinicalIndications: "Type 2 diabetes",
    },
    refreshed: {
      asset: "MTR-12",
      activeCompany: "Mitratech Pharma",
      otherNames: "",
      developmentPhase: "Phase 2",
      drugType: "GLP-1 analog",
      mechanismOfAction: "Incretin receptor agonism",
      target: "GLP-1R",
      clinicalIndications: "Type 2 diabetes",
    },
  },
  {
    id: "ast-005",
    assetTitle: "QBX-7",
    assetClass: "Antisense",
    owner: "Rare disease",
    region: "LATAM",
    confidence: 79,
    fieldSources: {
      activeCompany: { provider: "Private data room", refreshedAt: "Jul 3, 2024" },
      target: { provider: "Target DB", refreshedAt: "Jul 3, 2024" },
      clinicalIndications: { provider: "ClinicalTrials.gov", refreshedAt: "Jul 3, 2024" },
    },
    baseline: {
      asset: "QBX-7",
      activeCompany: "Qubex Life Sciences",
      otherNames: "QubeX7",
      developmentPhase: "Phase 1",
      drugType: "Antisense oligonucleotide",
      mechanismOfAction: "RNA splicing modulation",
      target: "SMN2",
      clinicalIndications: "Spinal muscular atrophy",
    },
    refreshed: {
      asset: "QBX-7",
      activeCompany: "Qubex Life Sciences",
      otherNames: "QubeX7",
      developmentPhase: "Phase 1",
      drugType: "Antisense oligonucleotide",
      mechanismOfAction: "RNA splicing modulation",
      target: "SMN2",
      clinicalIndications: "Spinal muscular atrophy, pediatric",
    },
  },
];

const DETAIL_FIELDS = [
  "asset",
  "activeCompany",
  "otherNames",
  "developmentPhase",
  "drugType",
  "mechanismOfAction",
  "target",
  "clinicalIndications",
];

const FIELD_LABELS = {
  asset: "Asset",
  activeCompany: "Active company",
  otherNames: "Other names",
  developmentPhase: "Development phase",
  drugType: "Drug type",
  mechanismOfAction: "Mechanism of action",
  target: "Target",
  clinicalIndications: "Clinical indications",
};

const styles = {
  mutedText: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-sm)",
    color: "var(--color-content-secondary)",
  },
  card: {
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--color-action-outline-secondary-enabled)",
    boxShadow: "var(--shadow-medium-down)",
  },
};

const getFieldChange = (baselineValue, currentValue) => {
  const before = baselineValue || "";
  const after = currentValue || "";
  if (before === after) return { changed: false, type: null };
  if (!before && after) return { changed: true, type: "added" };
  if (before && !after) return { changed: true, type: "removed" };
  return { changed: true, type: "updated" };
};

const toWorkspaceAsset = (asset, hasComparison) => {
  const fieldChanges = DETAIL_FIELDS.reduce((acc, key) => {
    const change = getFieldChange(asset.baseline[key], asset.refreshed[key]);
    acc[key] = change;
    return acc;
  }, {});

  const changedKeys = DETAIL_FIELDS.filter((key) => fieldChanges[key].changed);

  return {
    ...asset,
    display: hasComparison ? asset.refreshed : asset.baseline,
    changedKeys,
    fieldChanges,
    hasChanges: hasComparison && changedKeys.length > 0,
  };
};

const changeBadge = (type) => {
  if (type === "added") return <Badge color="positive" size="xs">+ Added</Badge>;
  if (type === "removed") return <Badge color="negative" size="xs">- Removed</Badge>;
  if (type === "updated") return <Badge color="warning" size="xs">Updated</Badge>;
  return null;
};

const SourceIndicator = ({ source }) => {
  if (!source) return null;
  return (
    <Tooltip content={`${source.provider} · Refreshed ${source.refreshedAt}`}>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          color: "var(--color-content-secondary)",
        }}
      >
        <Icon name="InformationCircle" size={14} />
      </span>
    </Tooltip>
  );
};

const TableValueWithSource = ({ value, source, showSources }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-xxs)" }}>
    <span>{value || "-"}</span>
    {showSources && <SourceIndicator source={source} />}
  </div>
);

export default function AddToDealPage() {
  const [isNarrow, setIsNarrow] = useState(false);
  const [hasComparison, setHasComparison] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [highlightChanges, setHighlightChanges] = useState(false);
  const [showChangedRowsOnly, setShowChangedRowsOnly] = useState(false);
  const [showChangedFieldsOnly, setShowChangedFieldsOnly] = useState(false);
  const [showHiddenUnchanged, setShowHiddenUnchanged] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [summaryVisible, setSummaryVisible] = useState(true);
  const [selectedId, setSelectedId] = useState(BASE_ASSETS[0].id);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onResize = () => setIsNarrow(window.innerWidth < 1280);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const assets = useMemo(() => BASE_ASSETS.map((asset) => toWorkspaceAsset(asset, hasComparison)), [hasComparison]);
  const changedCount = useMemo(() => assets.filter((asset) => asset.hasChanges).length, [assets]);

  const filteredRows = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    return assets
      .filter((asset) => !showChangedRowsOnly || asset.hasChanges)
      .filter((asset) => {
        if (!q) return true;
        return (
          asset.assetTitle.toLowerCase().includes(q) ||
          asset.owner.toLowerCase().includes(q) ||
          asset.region.toLowerCase().includes(q)
        );
      });
  }, [assets, searchValue, showChangedRowsOnly]);

  useEffect(() => {
    if (!filteredRows.length) return;
    if (!filteredRows.some((row) => row.id === selectedId)) {
      setSelectedId(filteredRows[0].id);
    }
  }, [filteredRows, selectedId]);

  const selectedAsset = useMemo(
    () => filteredRows.find((row) => row.id === selectedId) || assets.find((row) => row.id === selectedId) || null,
    [assets, filteredRows, selectedId]
  );

  const detailRows = useMemo(() => {
    if (!selectedAsset) return [];
    return DETAIL_FIELDS.map((fieldKey) => {
      const change = selectedAsset.fieldChanges[fieldKey];
      return {
        fieldKey,
        label: FIELD_LABELS[fieldKey],
        baselineValue: selectedAsset.baseline[fieldKey],
        currentValue: selectedAsset.display[fieldKey],
        source: selectedAsset.fieldSources[fieldKey],
        changed: selectedAsset.hasChanges && change.changed,
        type: change.type,
      };
    });
  }, [selectedAsset]);

  const changedDetailRows = useMemo(() => detailRows.filter((row) => row.changed), [detailRows]);
  const unchangedDetailRows = useMemo(() => detailRows.filter((row) => !row.changed), [detailRows]);

  const visibleDetailRows = useMemo(() => {
    if (!showChangedFieldsOnly) return detailRows;
    if (showHiddenUnchanged) return [...changedDetailRows, ...unchangedDetailRows];
    return changedDetailRows;
  }, [detailRows, changedDetailRows, unchangedDetailRows, showChangedFieldsOnly, showHiddenUnchanged]);

  const runRefresh = () => {
    const firstComparison = !hasComparison;
    setHasComparison(true);
    setSummaryVisible(true);
    if (firstComparison) {
      setHighlightChanges(true);
    }
  };

  const clearReviewState = () => {
    setHasComparison(false);
    setHighlightChanges(false);
    setShowChangedRowsOnly(false);
    setShowChangedFieldsOnly(false);
    setShowHiddenUnchanged(false);
    setSummaryVisible(true);
  };

  const clearFilters = () => {
    setShowChangedRowsOnly(false);
    setSearchValue("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(162deg, #f6f9ff 0%, #eef4ff 55%, #eaf1ff 100%)",
        padding: "var(--spacing-8)",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 1460,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-lg)",
        }}
      >
        <header
          style={{
            ...styles.card,
            padding: "var(--spacing-lg)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "var(--spacing-md)",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
            <h1
              style={{
                margin: 0,
                fontFamily: "var(--font-family-primary)",
                fontSize: "var(--text-heading-h3)",
                lineHeight: "var(--line-height-heading-h3)",
                color: "var(--color-content-primary)",
              }}
            >
              Assets Review
            </h1>
            <p style={{ ...styles.mutedText, fontSize: "var(--text-body-md)" }}>
              Validate refreshed extraction changes before publishing to downstream systems.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)", flexWrap: "wrap" }}>
            <DropdownMenu closeOnSelect={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="md" iconLeading={<Icon name="AdjustmentsHorizontal" size={16} />}>
                  View options
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="right" width={350}>
                <DropdownMenuSection>
                  <div style={{ padding: "var(--spacing-sm)", display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
                    <p style={{ ...styles.mutedText, color: "var(--color-content-primary)", fontWeight: 700 }}>View options</p>

                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--spacing-xs)",
                      border: "1px solid var(--color-action-outline-secondary-enabled)",
                      borderRadius: "var(--radius-sm)",
                      padding: "var(--spacing-sm)",
                    }}>
                      <p style={{ ...styles.mutedText, color: "var(--color-content-primary)", fontWeight: 600 }}>Display</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-sm)" }}>
                        <div>
                          <p style={{ ...styles.mutedText, color: "var(--color-content-primary)", fontWeight: 600 }}>Show sources</p>
                          <p style={styles.mutedText}>Apply to table and asset details.</p>
                        </div>
                        <Toggle size="sm" isSelected={showSources} onChange={setShowSources} />
                      </div>
                    </div>

                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--spacing-xs)",
                      border: "1px solid var(--color-action-outline-secondary-enabled)",
                      borderRadius: "var(--radius-sm)",
                      padding: "var(--spacing-sm)",
                    }}>
                      <p style={{ ...styles.mutedText, color: "var(--color-content-primary)", fontWeight: 600 }}>Refresh review</p>
                      {hasComparison ? (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-sm)" }}>
                          <div>
                            <p style={{ ...styles.mutedText, color: "var(--color-content-primary)", fontWeight: 600 }}>Highlight changes</p>
                            <p style={styles.mutedText}>Apply to table and asset details.</p>
                          </div>
                          <Toggle size="sm" isSelected={highlightChanges} onChange={setHighlightChanges} />
                        </div>
                      ) : (
                        <p style={styles.mutedText}>Highlight changes is available after a refresh comparison.</p>
                      )}
                    </div>
                  </div>
                </DropdownMenuSection>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="primary" size="md" iconLeading={<Icon name="ArrowPath" size={16} />} onClick={runRefresh}>
              Run refresh
            </Button>
          </div>
        </header>

        {hasComparison && summaryVisible && (
          <div
            style={{
              ...styles.card,
              padding: "var(--spacing-md)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-sm)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-sm)", flexWrap: "wrap" }}>
              <p style={{ ...styles.mutedText, color: "var(--color-content-primary)", fontWeight: 600 }}>
                Data refreshed successfully · {changedCount} of {assets.length} assets changed
              </p>
              <Button variant="tertiary" size="sm" iconOnly ariaLabel="Dismiss review summary" iconLeading={<Icon name="XMark" size={16} />} onClick={() => setSummaryVisible(false)} />
            </div>

            <p style={styles.mutedText}>
              Last refreshed: {REFRESH_META.lastRefreshed} · Compared with: {REFRESH_META.comparedWith}
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)", flexWrap: "wrap" }}>
              <Button variant="secondary" size="sm" onClick={() => setShowChangedRowsOnly(true)}>
                Show changed assets
              </Button>
              <Button variant="tertiary" size="sm" onClick={clearReviewState}>
                Clear review state
              </Button>
              <Button variant="link" size="sm" onClick={() => setSummaryVisible(false)}>
                Dismiss
              </Button>
            </div>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isNarrow ? "1fr" : "minmax(780px, 1fr) minmax(440px, 520px)",
            gap: "var(--spacing-md)",
            alignItems: "start",
          }}
        >
          <section style={{ ...styles.card, overflow: "hidden" }}>
            <div
              style={{
                padding: "var(--spacing-md)",
                borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "var(--spacing-md)",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)", flexWrap: "wrap" }}>
                <TextInput
                  size="md"
                  placeholder="Search assets, owner, region"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  iconLeading="MagnifyingGlass"
                  style={{ width: 290 }}
                />

                <Button variant="secondary" size="md" iconLeading={<Icon name="Funnel" size={16} />}>
                  Filters
                </Button>

                {hasComparison && (
                  <Button
                    variant={showChangedRowsOnly ? "primary" : "secondary"}
                    size="md"
                    onClick={() => setShowChangedRowsOnly((prev) => !prev)}
                  >
                    Changed since last refresh
                  </Button>
                )}

                {showChangedRowsOnly && (
                  <Chip size="md" removable onRemove={() => setShowChangedRowsOnly(false)}>
                    Changed since last refresh
                  </Chip>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
                {(searchValue.trim() || showChangedRowsOnly) && (
                  <Button variant="link" size="sm" onClick={clearFilters}>
                    Clear filters
                  </Button>
                )}
                <Badge color="neutral" size="md">{filteredRows.length} shown of {assets.length}</Badge>
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  fontFamily: "var(--font-family-primary)",
                }}
              >
                <thead>
                  <tr style={{ background: "var(--color-general-neutral-lighter)" }}>
                    {["Asset", "Active company", "Development phase", "Target", "Owner", "Region", "Confidence"].map((label) => (
                      <th
                        key={label}
                        style={{
                          textAlign: "left",
                          padding: "var(--spacing-sm) var(--spacing-md)",
                          color: "var(--color-content-secondary)",
                          fontWeight: 600,
                          fontSize: "var(--text-body-sm)",
                          borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
                        }}
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((asset) => {
                    const rowSelected = selectedId === asset.id;
                    const tableFields = ["activeCompany", "developmentPhase", "target"];
                    return (
                      <tr
                        key={asset.id}
                        onClick={() => setSelectedId(asset.id)}
                        style={{
                          cursor: "pointer",
                          background: rowSelected ? "var(--color-general-informative)" : "var(--color-general-white)",
                        }}
                      >
                        <td style={{ padding: "var(--spacing-sm) var(--spacing-md)", borderBottom: "1px solid var(--color-action-outline-secondary-enabled)", minWidth: 220 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-xs)", flexWrap: "wrap" }}>
                            <span style={{ fontWeight: 600 }}>{asset.assetTitle}</span>
                            <Badge color="neutral" size="xs">{asset.assetClass}</Badge>
                            {asset.hasChanges && <Badge color="warning" size="xs">Changed</Badge>}
                          </div>
                        </td>

                        {tableFields.map((fieldKey) => {
                          const change = asset.fieldChanges[fieldKey];
                          const fieldChanged = asset.hasChanges && change.changed;
                          const cellHighlighted = fieldChanged && highlightChanges;
                          const baseValue = asset.baseline[fieldKey];
                          const currentValue = asset.display[fieldKey];
                          const source = asset.fieldSources[fieldKey];

                          return (
                            <td
                              key={`${asset.id}-${fieldKey}`}
                              style={{
                                padding: "var(--spacing-sm) var(--spacing-md)",
                                borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
                                background: cellHighlighted ? "rgba(255, 205, 118, 0.22)" : undefined,
                              }}
                            >
                              <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xxs)" }}>
                                <TableValueWithSource value={currentValue || "-"} source={source} showSources={showSources} />
                                {fieldChanged && (
                                  <>
                                    {changeBadge(change.type)}
                                    {change.type === "updated" && (
                                      <span style={{ ...styles.mutedText, fontSize: "var(--text-body-caption)" }}>
                                        Previous: {baseValue}
                                      </span>
                                    )}
                                    {change.type === "removed" && (
                                      <span style={{ ...styles.mutedText, textDecoration: "line-through" }}>{baseValue}</span>
                                    )}
                                  </>
                                )}
                              </div>
                            </td>
                          );
                        })}

                        <td style={{ padding: "var(--spacing-sm) var(--spacing-md)", borderBottom: "1px solid var(--color-action-outline-secondary-enabled)" }}>{asset.owner}</td>
                        <td style={{ padding: "var(--spacing-sm) var(--spacing-md)", borderBottom: "1px solid var(--color-action-outline-secondary-enabled)" }}>{asset.region}</td>
                        <td style={{ padding: "var(--spacing-sm) var(--spacing-md)", borderBottom: "1px solid var(--color-action-outline-secondary-enabled)" }}>{asset.confidence}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <aside
            style={{
              ...styles.card,
              padding: "var(--spacing-lg)",
              minWidth: isNarrow ? "100%" : 440,
              maxWidth: isNarrow ? "100%" : 520,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-md)",
            }}
          >
            {!selectedAsset ? (
              <p style={styles.mutedText}>No asset selected.</p>
            ) : (
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
                  <p style={{ ...styles.mutedText, textTransform: "uppercase", letterSpacing: 0.4 }}>Asset details</p>
                  <h2
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-family-primary)",
                      fontSize: "var(--text-heading-h5)",
                      lineHeight: "var(--line-height-heading-h5)",
                      color: "var(--color-content-primary)",
                    }}
                  >
                    {selectedAsset.assetTitle}
                  </h2>
                </div>

                <div style={{ display: "flex", gap: "var(--spacing-xs)", flexWrap: "wrap" }}>
                  <Badge color="neutral" size="xs">{selectedAsset.assetClass}</Badge>
                  <Badge color="informative" size="xs">{selectedAsset.region}</Badge>
                  {selectedAsset.hasChanges && <Badge color="warning" size="xs">Changed</Badge>}
                </div>

                {hasComparison && (
                  <p style={styles.mutedText}>
                    Last refreshed: {REFRESH_META.lastRefreshed} · Compared with: {REFRESH_META.comparedWith}
                  </p>
                )}

                <div
                  style={{
                    border: "1px dashed var(--color-action-outline-secondary-enabled)",
                    borderRadius: "var(--radius-sm)",
                    padding: "var(--spacing-sm)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--spacing-xs)",
                  }}
                >
                  <p style={{ ...styles.mutedText, color: "var(--color-content-primary)", fontWeight: 600 }}>Review context</p>
                  <p style={styles.mutedText}>• {highlightChanges ? "Changes highlighted" : "Changes not highlighted"}</p>
                  <p style={styles.mutedText}>• {showSources ? "Sources shown" : "Sources hidden"}</p>
                </div>

                {hasComparison && (
                  <div
                    style={{
                      borderTop: "1px solid var(--color-action-outline-secondary-enabled)",
                      paddingTop: "var(--spacing-sm)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "var(--spacing-sm)",
                    }}
                  >
                    <div>
                      <p style={{ ...styles.mutedText, color: "var(--color-content-primary)", fontWeight: 600 }}>Details display</p>
                      <p style={styles.mutedText}>Show changed fields only</p>
                      <p style={styles.mutedText}>Only this asset panel</p>
                    </div>
                    <Toggle
                      size="sm"
                      isSelected={showChangedFieldsOnly}
                      onChange={(next) => {
                        setShowChangedFieldsOnly(next);
                        setShowHiddenUnchanged(false);
                      }}
                    />
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
                  {visibleDetailRows.map((row) => {
                    const highlighted = row.changed && highlightChanges;
                    return (
                      <div
                        key={row.fieldKey}
                        style={{
                          border: "1px solid var(--color-action-outline-secondary-enabled)",
                          borderRadius: "var(--radius-sm)",
                          padding: "var(--spacing-sm)",
                          background: highlighted ? "rgba(255, 205, 118, 0.22)" : "var(--color-general-white)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-xs)" }}>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-xxs)" }}>
                            <p style={{ ...styles.mutedText, margin: 0 }}>{row.label}</p>
                            {showSources && <SourceIndicator source={row.source} />}
                          </div>
                          {row.changed && changeBadge(row.type)}
                        </div>

                        {!row.changed && (
                          <p style={{ margin: "var(--spacing-xxs) 0 0", fontFamily: "var(--font-family-primary)", color: "var(--color-content-primary)" }}>
                            {row.currentValue || "-"}
                          </p>
                        )}

                        {row.changed && row.type === "updated" && (
                          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xxs)", marginTop: "var(--spacing-xxs)" }}>
                            <p style={{ margin: 0, fontFamily: "var(--font-family-primary)", color: "var(--color-content-primary)", fontWeight: 600 }}>
                              {row.currentValue}
                            </p>
                            <p style={styles.mutedText}>Previous: {row.baselineValue}</p>
                          </div>
                        )}

                        {row.changed && row.type === "added" && (
                          <p style={{ margin: "var(--spacing-xxs) 0 0", fontFamily: "var(--font-family-primary)", color: "var(--color-content-positive)", fontWeight: 600 }}>
                            <Icon name="Plus" size={12} /> {row.currentValue}
                          </p>
                        )}

                        {row.changed && row.type === "removed" && (
                          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xxs)", marginTop: "var(--spacing-xxs)" }}>
                            <p style={{ margin: 0, fontFamily: "var(--font-family-primary)", color: "var(--color-content-tertiary)", textDecoration: "line-through" }}>
                              {row.baselineValue}
                            </p>
                            <p style={{ margin: 0, fontFamily: "var(--font-family-primary)", color: "var(--color-content-negative)" }}>
                              <Icon name="Minus" size={12} /> Removed
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {hasComparison && showChangedFieldsOnly && unchangedDetailRows.length > 0 && !showHiddenUnchanged && (
                    <button
                      type="button"
                      onClick={() => setShowHiddenUnchanged(true)}
                      style={{
                        border: "1px dashed var(--color-action-outline-secondary-enabled)",
                        borderRadius: "var(--radius-sm)",
                        background: "var(--color-general-neutral-lighter)",
                        padding: "var(--spacing-sm)",
                        textAlign: "left",
                        fontFamily: "var(--font-family-primary)",
                        color: "var(--color-content-secondary)",
                        cursor: "pointer",
                      }}
                    >
                      {unchangedDetailRows.length} unchanged fields hidden
                    </button>
                  )}
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
