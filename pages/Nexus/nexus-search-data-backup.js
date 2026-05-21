// ─────────────────────────────────────────────
// SEARCH FIELDS
// ─────────────────────────────────────────────

export const SEARCH_FIELDS = [
  { id: "therapeutic-area", label: "Therapeutic area", icon: "Squares2X2" },
  { id: "drug-type", label: "Drug type", icon: "BeakerIcon" },
  { id: "target", label: "Target", icon: "AdjustmentsHorizontal" },
  { id: "mechanism", label: "Mechanism", icon: "Cog6Tooth" },
  { id: "clinical-indication", label: "Clinical indication", icon: "Heart" },
  { id: "development-phase", label: "Development phase", icon: "PencilSquare" },
  { id: "territories", label: "Territories", icon: "GlobeAlt" },
];

// ─────────────────────────────────────────────
// FLAT FIELD OPTIONS
// ─────────────────────────────────────────────

export const FIELD_OPTIONS = {
  "therapeutic-area": [
    { id: "anticancer", label: "Anticancer" },
    { id: "cancer", label: "Cancer" },
    { id: "oncology", label: "Oncology" },
    { id: "immunology", label: "Immunology" },
    { id: "neurology", label: "Neurology" },
    { id: "cardiovascular", label: "Cardiovascular" },
    { id: "infectious-disease", label: "Infectious disease" },
    { id: "rare-disease", label: "Rare disease" },
    { id: "metabolic", label: "Metabolic" },
    { id: "respiratory", label: "Respiratory" },
    { id: "hematology", label: "Hematology" },
    { id: "dermatology", label: "Dermatology" },
    { id: "ophthalmology", label: "Ophthalmology" },
    { id: "gastroenterology", label: "Gastroenterology" },
    { id: "rheumatology", label: "Rheumatology" },
  ],
  "mechanism": [
    { id: "checkpoint-inhibitor", label: "Checkpoint inhibitor" },
    { id: "monoclonal-antibody", label: "Monoclonal antibody" },
    { id: "kinase-inhibitor", label: "Kinase inhibitor" },
    { id: "car-t", label: "CAR-T cell therapy" },
    { id: "proteasome-inhibitor", label: "Proteasome inhibitor" },
    { id: "parp-inhibitor", label: "PARP inhibitor" },
    { id: "cdk-inhibitor", label: "CDK inhibitor" },
    { id: "btk-inhibitor", label: "BTK inhibitor" },
    { id: "pi3k-inhibitor", label: "PI3K inhibitor" },
    { id: "hdac-inhibitor", label: "HDAC inhibitor" },
    { id: "bcl2-inhibitor", label: "BCL-2 inhibitor" },
    { id: "angiogenesis-inhibitor", label: "Angiogenesis inhibitor" },
    { id: "immunomodulator", label: "Immunomodulator" },
    { id: "hormone-therapy", label: "Hormone therapy" },
  ],
  "development-phase": [
    { id: "discovery", label: "Discovery" },
    { id: "preclinical", label: "Preclinical" },
    { id: "ind-filed", label: "IND Filed" },
    { id: "phase-1", label: "Phase 1 Clinical" },
    { id: "phase-1-2", label: "Phase 1/2 Clinical" },
    { id: "phase-2", label: "Phase 2 Clinical" },
    { id: "phase-2-3", label: "Phase 2/3 Clinical" },
    { id: "phase-3", label: "Phase 3 Clinical" },
    { id: "nda-bla-filed", label: "NDA/BLA Filed" },
    { id: "approved", label: "Approved" },
    { id: "post-market", label: "Post-market" },
  ],
  "territories": [
    { id: "us", label: "United States" },
    { id: "eu", label: "European Union" },
    { id: "uk", label: "United Kingdom" },
    { id: "jp", label: "Japan" },
    { id: "cn", label: "China" },
    { id: "ca", label: "Canada" },
    { id: "au", label: "Australia" },
    { id: "kr", label: "South Korea" },
    { id: "br", label: "Brazil" },
    { id: "in", label: "India" },
    { id: "global", label: "Global" },
    { id: "row", label: "Rest of World" },
  ],
};

// ─────────────────────────────────────────────
// ONTOLOGY TREES  (drug-type, target, clinical-indication)
// ─────────────────────────────────────────────

export const DRUG_TYPE_TREE = [
  {
    id: "biologics",
    label: "Biologics",
    children: [
      {
        id: "monoclonal-antibody",
        label: "Monoclonal Antibody",
        children: [
          { id: "bispecific-antibody", label: "Bispecific Antibody" },
          { id: "adc", label: "Antibody-Drug Conjugate (ADC)" },
        ],
      },
      { id: "gene-therapy", label: "Gene Therapy" },
      {
        id: "cell-therapy",
        label: "Cell Therapy",
        children: [{ id: "car-t", label: "CAR-T Cell Therapy" }],
      },
      { id: "rna-therapy", label: "RNA Therapy" },
      { id: "peptide", label: "Peptide" },
      { id: "vaccine", label: "Vaccine" },
    ],
  },
  { id: "small-molecule", label: "Small Molecule" },
  { id: "radiopharmaceutical", label: "Radiopharmaceutical" },
];

export const TARGET_TREE = [
  {
    id: "immune-checkpoints",
    label: "Immune Checkpoints",
    children: [
      { id: "pd-1", label: "PD-1" },
      { id: "pd-l1", label: "PD-L1" },
      { id: "ctla-4", label: "CTLA-4" },
      { id: "lag-3", label: "LAG-3" },
      { id: "tim-3", label: "TIM-3" },
      { id: "tigit", label: "TIGIT" },
    ],
  },
  {
    id: "growth-factors-receptors",
    label: "Growth Factors & Receptors",
    children: [
      { id: "her2", label: "HER2" },
      { id: "vegf", label: "VEGF" },
      { id: "vegfr", label: "VEGFR" },
      { id: "egfr", label: "EGFR" },
    ],
  },
  {
    id: "cell-surface-antigens",
    label: "Cell Surface Antigens",
    children: [
      { id: "cd19", label: "CD19" },
      { id: "cd20", label: "CD20" },
      { id: "cd38", label: "CD38" },
      { id: "bcma", label: "BCMA" },
    ],
  },
  {
    id: "oncogenes-signaling",
    label: "Oncogenes & Signaling",
    children: [
      { id: "kras", label: "KRAS" },
      { id: "braf", label: "BRAF" },
      { id: "mek", label: "MEK" },
      { id: "alk", label: "ALK" },
      { id: "ros1", label: "ROS1" },
    ],
  },
];

export const CLINICAL_INDICATION_TREE = [
  {
    id: "oncology-indication",
    label: "Oncology",
    children: [
      {
        id: "hematologic-malignancies",
        label: "Hematologic Malignancies",
        children: [
          { id: "leukemia", label: "Leukemia" },
          { id: "lymphoma", label: "Lymphoma" },
          { id: "multiple-myeloma", label: "Multiple Myeloma" },
        ],
      },
      {
        id: "solid-tumors",
        label: "Solid Tumors",
        children: [
          { id: "lung-cancer", label: "Lung Cancer" },
          { id: "breast-cancer", label: "Breast Cancer" },
          { id: "colorectal-cancer", label: "Colorectal Cancer" },
          { id: "prostate-cancer", label: "Prostate Cancer" },
        ],
      },
    ],
  },
  {
    id: "immunology-indication",
    label: "Immunology",
    children: [
      {
        id: "autoimmune-diseases",
        label: "Autoimmune Diseases",
        children: [
          { id: "rheumatoid-arthritis", label: "Rheumatoid Arthritis" },
          { id: "lupus", label: "Lupus" },
          { id: "multiple-sclerosis", label: "Multiple Sclerosis" },
        ],
      },
    ],
  },
  {
    id: "neurology-indication",
    label: "Neurology",
    children: [
      { id: "alzheimers-disease", label: "Alzheimer's Disease" },
      { id: "parkinsons-disease", label: "Parkinson's Disease" },
    ],
  },
  {
    id: "cardiovascular-indication",
    label: "Cardiovascular",
    children: [
      { id: "heart-failure", label: "Heart Failure" },
      { id: "atrial-fibrillation", label: "Atrial Fibrillation" },
    ],
  },
  {
    id: "infectious-disease-indication",
    label: "Infectious Disease",
    children: [
      { id: "hiv", label: "HIV" },
      { id: "hepatitis-b", label: "Hepatitis B" },
      { id: "hepatitis-c", label: "Hepatitis C" },
    ],
  },
];

export const ONTOLOGY_FIELD_TREES = {
  "drug-type": DRUG_TYPE_TREE,
  "target": TARGET_TREE,
  "clinical-indication": CLINICAL_INDICATION_TREE,
};

// Count all leaf nodes in a tree
const countLeaves = (nodes) =>
  nodes.reduce((sum, node) =>
    node.children?.length ? sum + countLeaves(node.children) : sum + 1, 0);

// Total option counts per field (used for unconfigured filter badges)
export const FIELD_TOTAL_COUNTS = {
  "therapeutic-area": FIELD_OPTIONS["therapeutic-area"].length,
  "drug-type": countLeaves(DRUG_TYPE_TREE),
  "target": countLeaves(TARGET_TREE),
  "mechanism": FIELD_OPTIONS["mechanism"].length,
  "clinical-indication": countLeaves(CLINICAL_INDICATION_TREE),
  "development-phase": FIELD_OPTIONS["development-phase"].length,
  "territories": FIELD_OPTIONS["territories"].length,
};

// ─────────────────────────────────────────────
// CONDITION LABELS
// ─────────────────────────────────────────────

export const CONDITION_LABELS = {
  "is-exactly": "is exactly",
  "is-exactly-not": "is exactly not",
  "contains": "contains",
  "starts-with": "starts with",
  "ends-with": "ends with",
  "has-any-of": "has any of",
  "has-all-of": "has all of",
  "has-none-of": "has none of",
  "is-empty": "is empty",
  "is-not-empty": "is not empty",
};

// ─────────────────────────────────────────────
// OPTION LABEL LOOKUP  (id → label across all fields)
// ─────────────────────────────────────────────

const flattenOptions = (options) =>
  Object.values(options).flat().reduce((map, o) => { map[o.id] = o.label; return map; }, {});

const flattenTree = (nodes, map = {}) => {
  nodes.forEach((node) => {
    map[node.id] = node.label;
    if (node.children?.length) flattenTree(node.children, map);
  });
  return map;
};

export const OPTION_LABEL_MAP = {
  ...flattenOptions(FIELD_OPTIONS),
  ...flattenTree(DRUG_TYPE_TREE),
  ...flattenTree(TARGET_TREE),
  ...flattenTree(CLINICAL_INDICATION_TREE),
};

export const getOptionLabel = (fieldId, valueId) =>
  OPTION_LABEL_MAP[valueId] ?? valueId;

// ─────────────────────────────────────────────
// MOCK RESULT ASSETS
// ─────────────────────────────────────────────

export const RESULT_ASSETS = [
  {
    id: 1,
    name: "Nivolumab Combination Therapy",
    company: { primary: "OncoBio Inc", secondary: "Oncology" },
    status: { label: "Active", color: "positive", shape: "pill" },
    tags: { items: [{ label: "Phase 3" }, { label: "PD-1" }] },
    dealValue: "$420,000",
    startDate: "Jan 10, 2026",
    owner: "Alexandra Johnson",
    // Search field values
    "therapeutic-area": ["oncology", "cancer"],
    "drug-type": ["monoclonal-antibody"],
    "target": ["pd-1"],
    "mechanism": ["checkpoint-inhibitor"],
    "clinical-indication": ["lung-cancer", "colorectal-cancer"],
    "development-phase": ["phase-3"],
    "territories": ["us", "eu"],
  },
  {
    id: 2,
    name: "CD19 CAR-T Program",
    company: { primary: "CellGen Therapeutics", secondary: "Cell Therapy" },
    status: { label: "Active", color: "positive", shape: "pill" },
    tags: { items: [{ label: "Phase 2" }, { label: "CD19" }] },
    dealValue: "$380,000",
    startDate: "Feb 1, 2026",
    owner: "Alice Johnson",
    "therapeutic-area": ["hematology", "oncology"],
    "drug-type": ["car-t"],
    "target": ["cd19"],
    "mechanism": ["car-t"],
    "clinical-indication": ["leukemia", "lymphoma"],
    "development-phase": ["phase-2"],
    "territories": ["us", "eu", "uk"],
  },
  {
    id: 3,
    name: "EGFR Kinase Inhibitor",
    company: { primary: "PrecisionDrug Co", secondary: "Small Molecule" },
    status: { label: "Active", color: "positive", shape: "pill" },
    tags: { items: [{ label: "Phase 2/3" }, { label: "EGFR" }] },
    dealValue: "$290,000",
    startDate: "Mar 15, 2026",
    owner: "Bob Smith",
    "therapeutic-area": ["oncology"],
    "drug-type": ["small-molecule"],
    "target": ["egfr"],
    "mechanism": ["kinase-inhibitor"],
    "clinical-indication": ["lung-cancer"],
    "development-phase": ["phase-2-3"],
    "territories": ["us", "jp", "eu"],
  },
  {
    id: 4,
    name: "HER2 ADC Platform",
    company: { primary: "TargetMed Labs", secondary: "Biologics" },
    status: { label: "Draft", color: "neutral", shape: "pill" },
    tags: { items: [{ label: "Phase 1/2" }, { label: "HER2" }] },
    dealValue: "$185,000",
    startDate: "Apr 1, 2026",
    owner: "Carol Davis",
    "therapeutic-area": ["oncology"],
    "drug-type": ["adc"],
    "target": ["her2"],
    "mechanism": ["monoclonal-antibody"],
    "clinical-indication": ["breast-cancer"],
    "development-phase": ["phase-1-2"],
    "territories": ["us", "eu"],
  },
  {
    id: 5,
    name: "BCMA BiTE Program",
    company: { primary: "HemaForce BV", secondary: "Hematology" },
    status: { label: "Active", color: "positive", shape: "pill" },
    tags: { items: [{ label: "Phase 2" }, { label: "BCMA" }] },
    dealValue: "$310,000",
    startDate: "May 10, 2026",
    owner: "David Wilson",
    "therapeutic-area": ["hematology"],
    "drug-type": ["bispecific-antibody"],
    "target": ["bcma"],
    "mechanism": ["monoclonal-antibody"],
    "clinical-indication": ["multiple-myeloma"],
    "development-phase": ["phase-2"],
    "territories": ["us", "eu", "jp"],
  },
  {
    id: 6,
    name: "PARP Inhibitor Alliance",
    company: { primary: "GenomeTx Ltd", secondary: "Oncology" },
    status: { label: "Active", color: "positive", shape: "pill" },
    tags: { items: [{ label: "Phase 3" }, { label: "BRCA" }] },
    dealValue: "$510,000",
    startDate: "Jun 1, 2026",
    owner: "Eve Martinez",
    "therapeutic-area": ["oncology", "rare-disease"],
    "drug-type": ["small-molecule"],
    "target": ["kras"],
    "mechanism": ["parp-inhibitor"],
    "clinical-indication": ["breast-cancer", "prostate-cancer"],
    "development-phase": ["phase-3"],
    "territories": ["us", "eu", "ca"],
  },
  {
    id: 7,
    name: "PD-L1 Bispecific Antibody",
    company: { primary: "ImmunoCo SA", secondary: "Immunology" },
    status: { label: "Under review", color: "warning", shape: "pill" },
    tags: { items: [{ label: "Phase 1" }, { label: "PD-L1" }] },
    dealValue: "$95,000",
    startDate: "Jul 15, 2026",
    owner: "Frank Lee",
    "therapeutic-area": ["immunology", "oncology"],
    "drug-type": ["bispecific-antibody"],
    "target": ["pd-l1", "lag-3"],
    "mechanism": ["checkpoint-inhibitor"],
    "clinical-indication": ["solid-tumors", "lung-cancer"],
    "development-phase": ["phase-1"],
    "territories": ["us"],
  },
  {
    id: 8,
    name: "RA mRNA Immunomodulator",
    company: { primary: "RheuGen Pharma", secondary: "Autoimmune" },
    status: { label: "Active", color: "positive", shape: "pill" },
    tags: { items: [{ label: "Phase 2" }, { label: "Autoimmune" }] },
    dealValue: "$230,000",
    startDate: "Aug 1, 2026",
    owner: "Grace Kim",
    "therapeutic-area": ["immunology", "rheumatology"],
    "drug-type": ["rna-therapy"],
    "target": ["tigit"],
    "mechanism": ["immunomodulator"],
    "clinical-indication": ["rheumatoid-arthritis"],
    "development-phase": ["phase-2"],
    "territories": ["us", "eu", "uk", "jp"],
  },
  {
    id: 9,
    name: "ALK Inhibitor — 3rd Gen",
    company: { primary: "KinasePath Inc", secondary: "Oncology" },
    status: { label: "Active", color: "positive", shape: "pill" },
    tags: { items: [{ label: "Phase 2" }, { label: "ALK" }] },
    dealValue: "$170,000",
    startDate: "Sep 10, 2026",
    owner: "Henry Park",
    "therapeutic-area": ["oncology"],
    "drug-type": ["small-molecule"],
    "target": ["alk"],
    "mechanism": ["kinase-inhibitor"],
    "clinical-indication": ["lung-cancer"],
    "development-phase": ["phase-2"],
    "territories": ["us", "eu", "kr"],
  },
  {
    id: 10,
    name: "CD38 Naked Antibody",
    company: { primary: "BloodRx Corp", secondary: "Hematology" },
    status: { label: "Approved", color: "positive", shape: "pill" },
    tags: { items: [{ label: "Approved" }, { label: "CD38" }] },
    dealValue: "$750,000",
    startDate: "Oct 1, 2025",
    owner: "Isabelle Chen",
    "therapeutic-area": ["hematology"],
    "drug-type": ["monoclonal-antibody"],
    "target": ["cd38"],
    "mechanism": ["monoclonal-antibody"],
    "clinical-indication": ["multiple-myeloma"],
    "development-phase": ["approved"],
    "territories": ["us", "eu", "jp", "ca", "au"],
  },
  {
    id: 11,
    name: "CAR-T / Gene Therapy Combo",
    company: { primary: "VectorCell AG", secondary: "Cell & Gene Therapy" },
    status: { label: "Active", color: "positive", shape: "pill" },
    tags: { items: [{ label: "Phase 1/2" }, { label: "CD19" }] },
    dealValue: "$460,000",
    startDate: "Nov 5, 2026",
    owner: "James Torres",
    "therapeutic-area": ["hematology", "oncology"],
    "drug-type": ["car-t", "gene-therapy"],
    "target": ["cd19"],
    "mechanism": ["car-t"],
    "clinical-indication": ["leukemia", "lymphoma"],
    "development-phase": ["phase-1-2"],
    "territories": ["us", "eu"],
  },
];

// ─────────────────────────────────────────────
// ASSET FILTERING
// ─────────────────────────────────────────────

/**
 * Filters RESULT_ASSETS against the search criteria items from the advanced filters page.
 * Supports: has-any-of, has-all-of, has-none-of, is-exactly, is-exactly-not, is-empty, is-not-empty
 */
export const filterAssets = (assets, items = []) => {
  const rows = [];
  items.forEach((item) => {
    if (item.type === "row") rows.push(item);
    else if (item.type === "group") item.rows.forEach((r) => rows.push(r));
  });

  if (rows.length === 0) return assets;

  return assets.filter((asset) => {
    return rows.every((row) => {
      if (!row.fieldId) return true;
      const assetValues = Array.isArray(asset[row.fieldId])
        ? asset[row.fieldId]
        : asset[row.fieldId] != null ? [String(asset[row.fieldId])] : [];
      const criteriaValues = Array.isArray(row.value)
        ? row.value
        : row.value != null ? [String(row.value)] : [];

      switch (row.conditionId) {
        case "has-any-of":
          return criteriaValues.some((v) => assetValues.includes(v));
        case "has-all-of":
          return criteriaValues.every((v) => assetValues.includes(v));
        case "has-none-of":
          return criteriaValues.every((v) => !assetValues.includes(v));
        case "is-exactly": {
          const a = [...assetValues].sort().join(",");
          const b = [...criteriaValues].sort().join(",");
          return a === b;
        }
        case "is-exactly-not": {
          const a = [...assetValues].sort().join(",");
          const b = [...criteriaValues].sort().join(",");
          return a !== b;
        }
        case "is-empty":
          return assetValues.length === 0;
        case "is-not-empty":
          return assetValues.length > 0;
        default:
          return true;
      }
    });
  });
};

// ─────────────────────────────────────────────
// FILTER BUILDER  (criteria → Hub initialFilters)
// ─────────────────────────────────────────────

/**
 * Builds the full list of initialFilters for the Hub results page.
 * ALL 7 fields are always shown:
 *   - configured fields: label includes condition text, badgeCount = selected value count
 *   - unconfigured fields: label = field label only, badgeCount = total options count
 */
// Flatten a tree into an array of label strings (for Hub multipleChoice options)
const flattenTreeLabels = (nodes) => {
  const labels = [];
  const visit = (node) => {
    labels.push(node.label);
    if (node.children?.length) node.children.forEach(visit);
  };
  nodes.forEach(visit);
  return labels;
};

/**
 * Builds the filterSuggestions array expected by the Hub template.
 * Each nexus search field becomes a multipleChoice suggestion with its option labels.
 */
export const buildHubFilterSuggestions = () =>
  SEARCH_FIELDS.map((field) => {
    const isOntology = ["drug-type", "target", "clinical-indication"].includes(field.id);
    const options = isOntology
      ? flattenTreeLabels(ONTOLOGY_FIELD_TREES[field.id])
      : (FIELD_OPTIONS[field.id] || []).map((o) => o.label);
    return { key: field.id, label: field.label, type: "multiple-choice", options };
  });

/**
 * Builds filterSuggestions scoped to what was actually selected in the search criteria.
 * Configured fields only expose the selected values as options.
 * Unconfigured fields expose all options.
 */
export const buildHubFilterSuggestionsFromCriteria = (items = []) => {
  const criteriaByField = {};
  const visit = (row) => {
    if (!row.fieldId) return;
    criteriaByField[row.fieldId] = row;
  };
  items.forEach((item) => {
    if (item.type === "row") visit(item);
    else if (item.type === "group") item.rows.forEach(visit);
  });

  const NEGATIVE_CONDITIONS = new Set(["is-exactly-not", "has-none-of"]);

  return SEARCH_FIELDS.map((field) => {
    const isOntology = ["drug-type", "target", "clinical-indication"].includes(field.id);
    const allOptions = isOntology
      ? flattenTreeLabels(ONTOLOGY_FIELD_TREES[field.id])
      : (FIELD_OPTIONS[field.id] || []).map((o) => o.label);

    const criteria = criteriaByField[field.id];
    const noValueConditions = ["is-empty", "is-not-empty"];
    let options = allOptions;

    if (criteria && !noValueConditions.includes(criteria.conditionId) && criteria.value) {
      const excludedIds = new Set(Array.isArray(criteria.value) ? criteria.value : [criteria.value]);
      const isNegative = NEGATIVE_CONDITIONS.has(criteria.conditionId);

      if (isNegative) {
        // Show all options except the excluded ones
        const allIds = isOntology
          ? flattenTreeLabels(ONTOLOGY_FIELD_TREES[field.id]).map((l) =>
              Object.entries(OPTION_LABEL_MAP).find(([, v]) => v === l)?.[0] || l)
          : (FIELD_OPTIONS[field.id] || []).map((o) => o.id);
        const remainingIds = allIds.filter((id) => !excludedIds.has(id));
        options = remainingIds.map((id) => OPTION_LABEL_MAP[id] || id);
      } else {
        // Show only the selected values
        options = [...excludedIds].map((id) => OPTION_LABEL_MAP[id] || id);
      }
    }

    return { key: field.id, label: field.label, type: "multiple-choice", options };
  });
};

export const buildInitialFilters = (items = []) => {
  // Flatten criteria from items (rows + group rows)
  const criteriaByField = {};
  const visit = (row) => {
    if (!row.fieldId) return;
    criteriaByField[row.fieldId] = {
      conditionId: row.conditionId,
      value: row.value,
    };
  };
  items.forEach((item) => {
    if (item.type === "row") visit(item);
    else if (item.type === "group") item.rows.forEach(visit);
  });

  return SEARCH_FIELDS.map((field) => {
    const criteria = criteriaByField[field.id];
    const noValueConditions = ["is-empty", "is-not-empty"];

    if (criteria) {
      const conditionLabel = CONDITION_LABELS[criteria.conditionId] || criteria.conditionId;
      const isNoValue = noValueConditions.includes(criteria.conditionId);

      // For ontology fields keep raw IDs; for flat fields resolve to labels.
      // For negative conditions (is-exactly-not, has-none-of), the dropdown
      // should show ALL options EXCEPT the excluded ones — all checked.
      const NEGATIVE_CONDITIONS = new Set(["is-exactly-not", "has-none-of"]);
      const isNegative = NEGATIVE_CONDITIONS.has(criteria.conditionId);
      const isOntologyField = ["drug-type", "target", "clinical-indication"].includes(field.id);

      const criteriaIds = isNoValue ? [] :
        Array.isArray(criteria.value) ? criteria.value :
        criteria.value ? [criteria.value] : [];

      let selectedOptions;
      if (isNoValue) {
        selectedOptions = [];
      } else if (isNegative) {
        // Negative conditions (has-none-of, is-exactly-not) are already handled by
        // filterAssets on the base results. The chip filter is for further narrowing,
        // so start with no pre-selection — nothing checked by default.
        selectedOptions = [];
      } else {
        // Always store IDs
        selectedOptions = criteriaIds;
      }

      const badgeCount = isNoValue ? undefined : selectedOptions.length || undefined;

      return {
        id: field.id,
        label: isNoValue ? `${field.label} ${conditionLabel}` : field.label,
        value: isNoValue ? undefined : conditionLabel,
        badgeCount,
        criteria: {
          type: "multiple-choice",
          selectedOptions,
          includeEmpty: isNoValue,
          text: "",
          from: "",
          to: "",
          min: "",
          max: "",
          selectedOption: "",
        },
      };
    }

    // Not configured — all options selected by default (show everything), always store IDs
    const isOntologyField = ["drug-type", "target", "clinical-indication"].includes(field.id);
    const flattenTreeIds = (nodes) => {
      const ids = [];
      const visit = (node) => {
        if (!node.children?.length) ids.push(node.id);
        else node.children.forEach(visit);
      };
      nodes.forEach(visit);
      return ids;
    };
    const allSelectedOptions = isOntologyField
      ? flattenTreeIds(ONTOLOGY_FIELD_TREES[field.id])
      : (FIELD_OPTIONS[field.id] || []).map((o) => o.id);

    return {
      id: field.id,
      label: field.label,
      badgeCount: undefined,
      criteria: {
        type: "multiple-choice",
        selectedOptions: [],
        includeEmpty: false,
        text: "",
        from: "",
        to: "",
        min: "",
        max: "",
        selectedOption: "",
      },
    };
  });
};
