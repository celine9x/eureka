// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// SEARCH FIELDS
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const SEARCH_FIELDS = [
  { id: "therapeutic-area", label: "Therapeutic area", icon: "Squares2X2" },
  { id: "drug-type", label: "Drug type", icon: "BeakerIcon" },
  { id: "target", label: "Target", icon: "AdjustmentsHorizontal" },
  { id: "mechanism", label: "Mechanism", icon: "Cog6Tooth" },
  { id: "clinical-indication", label: "Clinical indication", icon: "Heart" },
  { id: "development-phase", label: "Development phase", icon: "PencilSquare" },
  { id: "territories", label: "Territories", icon: "GlobeAlt" },
];

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// FLAT FIELD OPTIONS (10X EXPANDED)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
    { id: "endocrinology", label: "Endocrinology" },
    { id: "nephrology", label: "Nephrology" },
    { id: "pulmonology", label: "Pulmonology" },
    { id: "hepatology", label: "Hepatology" },
    { id: "psychiatry", label: "Psychiatry" },
    { id: "nephro-oncology", label: "Nephro-Oncology" },
    { id: "uro-oncology", label: "Uro-Oncology" },
    { id: "thoracic-oncology", label: "Thoracic Oncology" },
    { id: "head-neck-oncology", label: "Head & Neck Oncology" },
    { id: "gynecologic-oncology", label: "Gynecologic Oncology" },
    { id: "gastric-oncology", label: "Gastric Oncology" },
    { id: "colorectal-oncology", label: "Colorectal Oncology" },
    { id: "pancreatic-oncology", label: "Pancreatic Oncology" },
    { id: "hepatocellular-oncology", label: "Hepatocellular Oncology" },
    { id: "breast-oncology", label: "Breast Oncology" },
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
    { id: "mek-inhibitor", label: "MEK inhibitor" },
    { id: "braf-inhibitor", label: "BRAF inhibitor" },
    { id: "mdm2-inhibitor", label: "MDM2 inhibitor" },
    { id: "hsp90-inhibitor", label: "HSP90 inhibitor" },
    { id: "chk1-inhibitor", label: "CHK1 inhibitor" },
    { id: "rock-inhibitor", label: "ROCK inhibitor" },
    { id: "tgf-beta-inhibitor", label: "TGF-Beta inhibitor" },
    { id: "cox-inhibitor", label: "COX inhibitor" },
    { id: "pd-1-inhibitor", label: "PD-1 inhibitor" },
    { id: "pd-l1-inhibitor", label: "PD-L1 inhibitor" },
    { id: "lag-3-inhibitor", label: "LAG-3 inhibitor" },
    { id: "tim-3-inhibitor", label: "TIM-3 inhibitor" },
    { id: "sting-agonist", label: "STING agonist" },
    { id: "tlr-agonist", label: "TLR agonist" },
    { id: "ox40-agonist", label: "OX40 agonist" },
    { id: "trail-receptor-agonist", label: "TRAIL receptor agonist" },
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
    { id: "phase-1-expansion", label: "Phase 1 Expansion" },
    { id: "phase-2-expansion", label: "Phase 2 Expansion" },
    { id: "phase-3-expansion", label: "Phase 3 Expansion" },
    { id: "poa-filed", label: "POA Filed" },
    { id: "breakthrough-therapy", label: "Breakthrough Therapy" },
    { id: "fast-track", label: "Fast Track" },
    { id: "priority-review", label: "Priority Review" },
    { id: "accelerated-approval", label: "Accelerated Approval" },
    { id: "conditional-approval", label: "Conditional Approval" },
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
    { id: "ch", label: "Switzerland" },
    { id: "se", label: "Sweden" },
    { id: "de", label: "Germany" },
    { id: "fr", label: "France" },
    { id: "it", label: "Italy" },
    { id: "es", label: "Spain" },
    { id: "nl", label: "Netherlands" },
    { id: "be", label: "Belgium" },
    { id: "mx", label: "Mexico" },
    { id: "ar", label: "Argentina" },
    { id: "ru", label: "Russia" },
    { id: "th", label: "Thailand" },
    { id: "sg", label: "Singapore" },
    { id: "nz", label: "New Zealand" },
    { id: "za", label: "South Africa" },
    { id: "ae", label: "United Arab Emirates" },
    { id: "il", label: "Israel" },
    { id: "tr", label: "Turkey" },
  ],
};

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// ONTOLOGY TREES (10X EXPANDED)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
          { id: "trispecific-antibody", label: "Trispecific Antibody" },
          { id: "adc", label: "Antibody-Drug Conjugate (ADC)" },
          { id: "adc-bispecific", label: "Bispecific ADC" },
          { id: "adc-tdc", label: "ADC with Targeted Degradation" },
        ],
      },
      { id: "gene-therapy", label: "Gene Therapy" },
      { id: "gene-therapy-aav", label: "Gene Therapy (AAV)" },
      { id: "gene-therapy-lv", label: "Gene Therapy (Lentiviral)" },
      { id: "gene-therapy-nk", label: "Gene Therapy (Non-viral)" },
      {
        id: "cell-therapy",
        label: "Cell Therapy",
        children: [
          { id: "car-t", label: "CAR-T Cell Therapy" },
          { id: "car-nk", label: "CAR-NK Cell Therapy" },
          { id: "car-m", label: "CAR-M Cell Therapy" },
          { id: "tcr-therapy", label: "TCR Therapy" },
          { id: "stem-cell-therapy", label: "Stem Cell Therapy" },
        ],
      },
      { id: "rna-therapy", label: "RNA Therapy" },
      { id: "rna-siRNA", label: "siRNA Therapy" },
      { id: "rna-miRNA", label: "miRNA Therapy" },
      { id: "rna-asRNA", label: "Antisense RNA Therapy" },
      { id: "rna-mRNA", label: "mRNA Therapy" },
      { id: "peptide", label: "Peptide" },
      { id: "peptide-cyclic", label: "Cyclic Peptide" },
      { id: "peptide-pht", label: "Peptide with PHTase" },
      { id: "vaccine", label: "Vaccine" },
      { id: "vaccine-therapeutic", label: "Therapeutic Vaccine" },
      { id: "vaccine-personalized", label: "Personalized Vaccine" },
      { id: "protein-therapy", label: "Protein Therapy" },
      { id: "enzyme-replacement", label: "Enzyme Replacement" },
      { id: "antibody-fusion", label: "Antibody Fusion Protein" },
    ],
  },
  { id: "small-molecule", label: "Small Molecule" },
  { id: "small-molecule-oral", label: "Small Molecule (Oral)" },
  { id: "small-molecule-iv", label: "Small Molecule (IV)" },
  { id: "small-molecule-inhaled", label: "Small Molecule (Inhaled)" },
  { id: "small-molecule-topical", label: "Small Molecule (Topical)" },
  { id: "radiopharmaceutical", label: "Radiopharmaceutical" },
  { id: "radiopharmaceutical-alpha", label: "Alpha Radiopharmaceutical" },
  { id: "radiopharmaceutical-beta", label: "Beta Radiopharmaceutical" },
  { id: "radiopharmaceutical-lutetium", label: "Lu-177 Radiopharmaceutical" },
  { id: "radiopharmaceutical-ac225", label: "Ac-225 Radiopharmaceutical" },
];

export const TARGET_TREE = [
  {
    id: "immune-checkpoints",
    label: "Immune Checkpoints",
    children: [
      { id: "pd-1", label: "PD-1" },
      { id: "pd-l1", label: "PD-L1" },
      { id: "pd-l2", label: "PD-L2" },
      { id: "ctla-4", label: "CTLA-4" },
      { id: "lag-3", label: "LAG-3" },
      { id: "tim-3", label: "TIM-3" },
      { id: "tigit", label: "TIGIT" },
      { id: "btla", label: "BTLA" },
      { id: "icos", label: "ICOS" },
      { id: "ox40", label: "OX40" },
    ],
  },
  {
    id: "growth-factors-receptors",
    label: "Growth Factors & Receptors",
    children: [
      { id: "her2", label: "HER2" },
      { id: "her3", label: "HER3" },
      { id: "her4", label: "HER4" },
      { id: "vegf", label: "VEGF" },
      { id: "vegfr", label: "VEGFR" },
      { id: "vegfr1", label: "VEGFR1" },
      { id: "vegfr2", label: "VEGFR2" },
      { id: "vegfr3", label: "VEGFR3" },
      { id: "egfr", label: "EGFR" },
      { id: "igf1r", label: "IGF1R" },
    ],
  },
  {
    id: "cell-surface-antigens",
    label: "Cell Surface Antigens",
    children: [
      { id: "cd19", label: "CD19" },
      { id: "cd20", label: "CD20" },
      { id: "cd22", label: "CD22" },
      { id: "cd30", label: "CD30" },
      { id: "cd33", label: "CD33" },
      { id: "cd38", label: "CD38" },
      { id: "cd47", label: "CD47" },
      { id: "cd70", label: "CD70" },
      { id: "cd123", label: "CD123" },
      { id: "bcma", label: "BCMA" },
    ],
  },
  {
    id: "oncogenes-signaling",
    label: "Oncogenes & Signaling",
    children: [
      { id: "kras", label: "KRAS" },
      { id: "kras-g12c", label: "KRAS G12C" },
      { id: "kras-g12d", label: "KRAS G12D" },
      { id: "kras-g12v", label: "KRAS G12V" },
      { id: "braf", label: "BRAF" },
      { id: "mek", label: "MEK" },
      { id: "alk", label: "ALK" },
      { id: "ros1", label: "ROS1" },
      { id: "ntrk", label: "NTRK" },
      { id: "ret", label: "RET" },
    ],
  },
  {
    id: "kinase-targets",
    label: "Kinase Targets",
    children: [
      { id: "src-kinase", label: "SRC Kinase" },
      { id: "jaks", label: "JAKs" },
      { id: "mtor", label: "mTOR" },
      { id: "pi3k", label: "PI3K" },
      { id: "akt", label: "AKT" },
      { id: "pdk1", label: "PDK1" },
      { id: "map2k", label: "MAP2K" },
      { id: "mapk", label: "MAPK" },
      { id: "erk", label: "ERK" },
      { id: "p38-mapk", label: "p38 MAPK" },
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
          { id: "aml", label: "Acute Myeloid Leukemia" },
          { id: "cml", label: "Chronic Myeloid Leukemia" },
          { id: "all", label: "Acute Lymphoid Leukemia" },
          { id: "lymphoma", label: "Lymphoma" },
          { id: "multiple-myeloma", label: "Multiple Myeloma" },
          { id: "lymphoma-hodgkins", label: "Hodgkin's Lymphoma" },
          { id: "lymphoma-tnhl", label: "T-cell Non-Hodgkin Lymphoma" },
          { id: "lymphoma-bnhl", label: "B-cell Non-Hodgkin Lymphoma" },
        ],
      },
      {
        id: "solid-tumors",
        label: "Solid Tumors",
        children: [
          { id: "lung-cancer", label: "Lung Cancer" },
          { id: "lung-nsclc", label: "NSCLC" },
          { id: "lung-sclc", label: "SCLC" },
          { id: "breast-cancer", label: "Breast Cancer" },
          { id: "breast-her2", label: "HER2+ Breast Cancer" },
          { id: "breast-hr", label: "HR+ Breast Cancer" },
          { id: "colorectal-cancer", label: "Colorectal Cancer" },
          { id: "prostate-cancer", label: "Prostate Cancer" },
          { id: "melanoma", label: "Melanoma" },
          { id: "ovarian-cancer", label: "Ovarian Cancer" },
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
          { id: "ankylosing-spondylitis", label: "Ankylosing Spondylitis" },
          { id: "psoriasis", label: "Psoriasis" },
          { id: "psoriatic-arthritis", label: "Psoriatic Arthritis" },
          { id: "inflammatory-bowel-disease", label: "Inflammatory Bowel Disease" },
          { id: "ibd-crohns", label: "Crohn's Disease" },
          { id: "ibd-uc", label: "Ulcerative Colitis" },
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
      { id: "amyotrophic-lateral-sclerosis", label: "Amyotrophic Lateral Sclerosis (ALS)" },
      { id: "frontotemporal-dementia", label: "Frontotemporal Dementia" },
      { id: "progressive-supranuclear-palsy", label: "Progressive Supranuclear Palsy" },
      { id: "primary-age-related-tauopathy", label: "Primary Age-Related Tauopathy" },
    ],
  },
  {
    id: "cardiovascular-indication",
    label: "Cardiovascular",
    children: [
      { id: "heart-failure", label: "Heart Failure" },
      { id: "hf-reduced-ef", label: "HF with Reduced EF" },
      { id: "hf-preserved-ef", label: "HF with Preserved EF" },
      { id: "atrial-fibrillation", label: "Atrial Fibrillation" },
      { id: "coronary-artery-disease", label: "Coronary Artery Disease" },
      { id: "acute-coronary-syndrome", label: "Acute Coronary Syndrome" },
    ],
  },
  {
    id: "infectious-disease-indication",
    label: "Infectious Disease",
    children: [
      { id: "hiv", label: "HIV" },
      { id: "hepatitis-b", label: "Hepatitis B" },
      { id: "hepatitis-c", label: "Hepatitis C" },
      { id: "tuberculosis", label: "Tuberculosis" },
      { id: "covid-19", label: "COVID-19" },
      { id: "rsv", label: "Respiratory Syncytial Virus" },
    ],
  },
  {
    id: "metabolic-indication",
    label: "Metabolic Diseases",
    children: [
      { id: "type-2-diabetes", label: "Type 2 Diabetes" },
      { id: "obesity", label: "Obesity" },
      { id: "nonalcoholic-fatty-liver-disease", label: "NAFLD" },
      { id: "primary-biliary-cholangitis", label: "Primary Biliary Cholangitis" },
      { id: "primary-sclerosing-cholangitis", label: "Primary Sclerosing Cholangitis" },
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

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// CONDITION LABELS
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// OPTION LABEL LOOKUP  (id â†’ label across all fields)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// MOCK RESULT ASSETS (110 ASSETS - 10X EXPANDED)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const generateAssets = () => {
  const companies = [
    { primary: "OncoBio Inc", secondary: "Oncology" },
    { primary: "CellGen Therapeutics", secondary: "Cell Therapy" },
    { primary: "PrecisionDrug Co", secondary: "Small Molecule" },
    { primary: "TargetMed Labs", secondary: "Biologics" },
    { primary: "HemaForce BV", secondary: "Hematology" },
    { primary: "GenomeTx Ltd", secondary: "Oncology" },
    { primary: "ImmunoCo SA", secondary: "Immunology" },
    { primary: "RheuGen Pharma", secondary: "Autoimmune" },
    { primary: "KinasePath Inc", secondary: "Oncology" },
    { primary: "BloodRx Corp", secondary: "Hematology" },
    { primary: "VectorCell AG", secondary: "Cell & Gene Therapy" },
    { primary: "NeuraTech Systems", secondary: "Neurology" },
    { primary: "CardioInnovate Ltd", secondary: "Cardiovascular" },
    { primary: "MetaboGen Pharma", secondary: "Metabolic" },
    { primary: "BioVaccine Inc", secondary: "Vaccines" },
    { primary: "ProteinDynamics AG", secondary: "Biologics" },
    { primary: "RNATherapy Corp", secondary: "RNA" },
    { primary: "RadioMed Pharma", secondary: "Radiopharmaceuticals" },
    { primary: "PeptideTech Solutions", secondary: "Peptides" },
    { primary: "StemCell Innovations", secondary: "Cell Therapy" },
  ];

  const therapyTypes = [
    "Nivolumab Combination Therapy",
    "CD19 CAR-T Program",
    "EGFR Kinase Inhibitor",
    "HER2 ADC Platform",
    "BCMA BiTE Program",
    "PARP Inhibitor Alliance",
    "PD-L1 Bispecific Antibody",
    "RA mRNA Immunomodulator",
    "ALK Inhibitor â€” 3rd Gen",
    "CD38 Naked Antibody",
    "CAR-T / Gene Therapy Combo",
    "KRAS G12C Inhibitor",
    "HER3 Bispecific Antibody",
    "CD20 Monoclonal Antibody",
    "VEGFR Inhibitor Combination",
    "TIM-3 Checkpoint Inhibitor",
    "TIGIT Dual Inhibitor",
    "LAG-3 Immunomodulator",
    "OX40 Agonist Therapy",
    "CTLA-4 Enhanced Antibody",
    "KRAS/MEK Dual Inhibitor",
    "BRAF Inhibitor Next Generation",
    "mTOR/PI3K Dual Inhibitor",
    "RET Inhibitor Program",
    "NTRK Fusion Inhibitor",
    "ALK Fusion Inhibitor",
    "ROS1 Inhibitor Therapy",
    "FGFR Inhibitor Platform",
    "MET Inhibitor Combination",
    "c-Met Inhibitor Program",
  ];

  const phases = [
    "Phase 1", "Phase 2", "Phase 3", "Phase 1/2", "Phase 2/3",
    "Discovery", "Preclinical", "IND Filed", "Approved", "Post-market"
  ];

  const assets = [];

  for (let i = 1; i <= 110; i++) {
    const company = companies[(i - 1) % companies.length];
    const therapyType = therapyTypes[(i - 1) % therapyTypes.length];
    const phase = phases[(i - 1) % phases.length];

    // Assign varied search fields
    const therapeuticAreaOptions = FIELD_OPTIONS["therapeutic-area"];
    const mechanismOptions = FIELD_OPTIONS["mechanism"];
    const developmentPhaseOptions = FIELD_OPTIONS["development-phase"];
    const territoriesOptions = FIELD_OPTIONS["territories"];

    // Varied combinations to ensure different assets have different field values
    const therapeuticAreaIdx = (i - 1) % therapeuticAreaOptions.length;
    const mechanismIdx = (i - 1) % mechanismOptions.length;
    const devPhaseIdx = (i - 1) % developmentPhaseOptions.length;
    const territory1Idx = i % territoriesOptions.length;
    const territory2Idx = (i + 1) % territoriesOptions.length;

    const therapeuticArea = therapeuticAreaOptions[therapeuticAreaIdx];
    const mechanism = mechanismOptions[mechanismIdx];
    const devPhase = developmentPhaseOptions[devPhaseIdx];
    const territory1 = territoriesOptions[territory1Idx];
    const territory2 = territoriesOptions[territory2Idx];

    // Ontology field assignments - use varied indices to distribute across tree
    const drugTypeLeafIds = getAllLeafIds(DRUG_TYPE_TREE);
    const targetLeafIds = getAllLeafIds(TARGET_TREE);
    const indicationLeafIds = getAllLeafIds(CLINICAL_INDICATION_TREE);

    const drugType = drugTypeLeafIds[(i - 1) % drugTypeLeafIds.length];
    const target = targetLeafIds[(i - 1) % targetLeafIds.length];
    const indication = indicationLeafIds[(i - 1) % indicationLeafIds.length];

    const dealValue = (Math.floor(Math.random() * 7) + 1) * 100000;

    assets.push({
      id: i,
      name: `${therapyType} #${i}`,
      company,
      status: i % 10 === 0 ? 
        { label: "Approved", color: "positive", shape: "pill" } :
        i % 7 === 0 ?
        { label: "Draft", color: "neutral", shape: "pill" } :
        i % 5 === 0 ?
        { label: "Under review", color: "warning", shape: "pill" } :
        { label: "Active", color: "positive", shape: "pill" },
      tags: { items: [{ label: phase }, { label: target }] },
      dealValue: `$${dealValue.toLocaleString()}`,
      startDate: `${String((i % 12) + 1).padStart(2, "0")}/01/2026`,
      owner: ["Alexandra Johnson", "Alice Johnson", "Bob Smith", "Carol Davis", "David Wilson", "Eve Martinez", "Frank Lee", "Grace Kim", "Henry Park", "Isabelle Chen"][i % 10],
      "therapeutic-area": [therapeuticArea.id, therapeuticAreaOptions[(therapeuticAreaIdx + 1) % therapeuticAreaOptions.length].id].slice(0, i % 2 + 1),
      "drug-type": [drugType],
      "target": [target],
      "mechanism": [mechanism.id],
      "clinical-indication": [indication],
      "development-phase": [devPhase.id],
      "territories": territory1.id === territory2.id ? [territory1.id] : [territory1.id, territory2.id],
    });
  }

  return assets;
};

const getAllLeafIds = (tree) => {
  const leaves = [];
  const visit = (node) => {
    if (!node.children || node.children.length === 0) {
      leaves.push(node.id);
    } else {
      node.children.forEach(visit);
    }
  };
  tree.forEach(visit);
  return leaves;
};

export const RESULT_ASSETS = generateAssets();

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// ASSET FILTERING
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// FILTER BUILDER  (criteria â†’ Hub initialFilters)
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
      // should show ALL options EXCEPT the excluded ones â€” all checked.
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
        // so start with no pre-selection â€” nothing checked by default.
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

    // Not configured â€” all options selected by default (show everything), always store IDs
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

