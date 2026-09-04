"use client";

import React, { useState } from "react";
import {
  HubHeader,
  HubHeaderRow,
  HubHeaderLeft,
  HubHeaderRight,
  HubHeaderTitle,
  HubHeaderControls,
  HubHeaderActions,
  HubHeaderContextButton,
  HubHeaderViewToggle,
  HubHeaderSmartFilterButton,
  HubHeaderSettingsButton,
  HubHeaderExportButton,
} from "../../library/organisms/hub-header.jsx";
import { Button } from "../../library/atoms/button.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { TableInlineEdit } from "../../library/organisms/table/table-inline-edit.jsx";
import { Pagination } from "../../library/organisms/pagination.jsx";
import { SidePanel } from "../../library/templates/side-panel.jsx";
import { BulkActionBar } from "../../library/molecules/bulk-action-bar.jsx";
import { TextInput } from "../../library/molecules/text-input.jsx";

// ─────────────────────────────────────────────
// SEED DATA
// ─────────────────────────────────────────────

const STATUS_OPTIONS = [
  { id: "active", label: "Active", color: "informative" },
  { id: "rejected", label: "Rejected", color: "negative" },
  { id: "onhold", label: "On-hold", color: "neutral" },
];

const OWNER_OPTIONS = [
  { id: "dc", name: "Delfeil Casanova", initials: "DC" },
  { id: "mg", name: "Marjolaine Genevier", initials: "MG" },
  { id: "hw", name: "Habtamu Worku Gebreselassie", initials: "HW" },
  { id: "dg", name: "David Goncalves", initials: "DG" },
];

const COMPANY_OPTIONS = [
  { id: "balsa", label: "Balsa" },
  { id: "immuneoncia", label: "ImmuneOncia Therapeutics LLC" },
  { id: "inpart-habtamu", label: "Inpart Habtamu's Test Co." },
  { id: "bane18", label: "Bane Test Company 18" },
];

const TAG_OPTIONS = [
  { id: "research", label: "Research" },
  { id: "licensing", label: "Licensing" },
  { id: "partnership", label: "Partnership" },
  { id: "confidential", label: "Confidential" },
  { id: "supply-chain", label: "Supply chain" },
  { id: "joint-venture", label: "Joint venture" },
  { id: "co-development", label: "Co-development" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "clinical-trial", label: "Clinical trial" },
  { id: "regulatory", label: "Regulatory" },
  { id: "due-diligence", label: "Due diligence" },
  { id: "term-sheet", label: "Term sheet" },
  { id: "acquisition", label: "Acquisition" },
  { id: "distribution", label: "Distribution" },
];

const AGREEMENT_OPTIONS = [
  { id: "nda", label: "NDA" },
  { id: "msa", label: "Master Services Agreement" },
  { id: "license", label: "License Agreement" },
  { id: "term-sheet", label: "Term Sheet" },
];

const INITIAL_ROWS = [
  { id: "op1",  title: "ETLUI-890",               description: "",                                                                                              company: COMPANY_OPTIONS[0], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[0], typeStage: { primary: "hasstages",              secondary: "Draft" },                  status: STATUS_OPTIONS[0] },
  { id: "op2",  title: "Bane test asset",          description: "",                                                                                              company: COMPANY_OPTIONS[1], tags: [],                       agreements: [AGREEMENT_OPTIONS[0]],                                                      owner: OWNER_OPTIONS[1], typeStage: { primary: "InovaTSS1 Workflow",      secondary: "Draft" },                  status: STATUS_OPTIONS[0] },
  { id: "op3",  title: "ETLUI-880",               description: "",                                                                                              company: COMPANY_OPTIONS[0], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[0], typeStage: { primary: "BIO",                    secondary: "Triage" },                 status: STATUS_OPTIONS[0] },
  { id: "op4",  title: "ETLUI-542",               description: "",                                                                                              company: COMPANY_OPTIONS[0], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[0], typeStage: { primary: "hasstages",              secondary: "Draft" },                  status: STATUS_OPTIONS[0] },
  { id: "op5",  title: "ETLUI-733",               description: "",                                                                                              company: COMPANY_OPTIONS[2], tags: [],                       agreements: [AGREEMENT_OPTIONS[0], AGREEMENT_OPTIONS[1]],                                owner: OWNER_OPTIONS[2], typeStage: { primary: "TestOppType",            secondary: "Draft" },                  status: STATUS_OPTIONS[0] },
  { id: "op6",  title: "ETLUI-845_no_milestone",  description: "",                                                                                              company: COMPANY_OPTIONS[2], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[2], typeStage: { primary: "InovaTSS1 Workflow",      secondary: "Draft" },                  status: STATUS_OPTIONS[1] },
  { id: "op7",  title: "ETLUI-825_draft_clean",   description: "Confidential research collaboration evaluation with Inpart Habtamu's Test Co.",                 company: COMPANY_OPTIONS[2], tags: TAG_OPTIONS.slice(0, 7),  agreements: [AGREEMENT_OPTIONS[0], AGREEMENT_OPTIONS[1], AGREEMENT_OPTIONS[2], AGREEMENT_OPTIONS[3]], owner: OWNER_OPTIONS[2], typeStage: { primary: "Research Collaboration", secondary: "Confidential Evaluation" }, status: STATUS_OPTIONS[2] },
  { id: "op8",  title: "ETLUI-901",               description: "In-licensing opportunity for anti-PD-1 monoclonal antibody.",                                   company: COMPANY_OPTIONS[1], tags: [TAG_OPTIONS[0], TAG_OPTIONS[1]], agreements: [AGREEMENT_OPTIONS[2]],                                             owner: OWNER_OPTIONS[3], typeStage: { primary: "In-Licensing",           secondary: "Term Sheet" },             status: STATUS_OPTIONS[0] },
  { id: "op9",  title: "ETLUI-912",               description: "",                                                                                              company: COMPANY_OPTIONS[3], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[1], typeStage: { primary: "BIO",                    secondary: "Active" },                 status: STATUS_OPTIONS[0] },
  { id: "op10", title: "ETLUI-923",               description: "Partnership agreement for clinical trial co-development.",                                       company: COMPANY_OPTIONS[0], tags: [TAG_OPTIONS[4], TAG_OPTIONS[7]], agreements: [AGREEMENT_OPTIONS[1]],                                             owner: OWNER_OPTIONS[0], typeStage: { primary: "Co-Development",         secondary: "Negotiation" },            status: STATUS_OPTIONS[2] },
  { id: "op11", title: "ETLUI-934",               description: "",                                                                                              company: COMPANY_OPTIONS[2], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[2], typeStage: { primary: "hasstages",              secondary: "Review" },                 status: STATUS_OPTIONS[0] },
  { id: "op12", title: "ETLUI-945",               description: "Distribution rights negotiation for EU market.",                                                company: COMPANY_OPTIONS[1], tags: [TAG_OPTIONS[13]],         agreements: [AGREEMENT_OPTIONS[0], AGREEMENT_OPTIONS[3]],                                owner: OWNER_OPTIONS[3], typeStage: { primary: "Distribution",           secondary: "Draft" },                  status: STATUS_OPTIONS[1] },
  { id: "op13", title: "ETLUI-956",               description: "",                                                                                              company: COMPANY_OPTIONS[3], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[0], typeStage: { primary: "TestOppType",            secondary: "Triage" },                 status: STATUS_OPTIONS[0] },
  { id: "op14", title: "ETLUI-967",               description: "Joint venture for manufacturing scale-up.",                                                      company: COMPANY_OPTIONS[0], tags: [TAG_OPTIONS[5], TAG_OPTIONS[7]], agreements: [AGREEMENT_OPTIONS[1], AGREEMENT_OPTIONS[2]],                        owner: OWNER_OPTIONS[1], typeStage: { primary: "Joint Venture",          secondary: "Active" },                 status: STATUS_OPTIONS[0] },
  { id: "op15", title: "ETLUI-978",               description: "",                                                                                              company: COMPANY_OPTIONS[2], tags: [TAG_OPTIONS[9]],         agreements: [],                                                                          owner: OWNER_OPTIONS[2], typeStage: { primary: "InovaTSS1 Workflow",      secondary: "Regulatory Review" },      status: STATUS_OPTIONS[2] },
  { id: "op16", title: "ETLUI-989",               description: "Acquisition target evaluation — oncology pipeline.",                                             company: COMPANY_OPTIONS[1], tags: [TAG_OPTIONS[12], TAG_OPTIONS[10]], agreements: [AGREEMENT_OPTIONS[0]],                                            owner: OWNER_OPTIONS[3], typeStage: { primary: "Acquisition",            secondary: "Due Diligence" },           status: STATUS_OPTIONS[0] },
  { id: "op17", title: "ETLUI-1001",              description: "",                                                                                              company: COMPANY_OPTIONS[3], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[0], typeStage: { primary: "BIO",                    secondary: "Draft" },                  status: STATUS_OPTIONS[0] },
  { id: "op18", title: "ETLUI-1012",              description: "Supply chain agreement for API sourcing.",                                                       company: COMPANY_OPTIONS[0], tags: [TAG_OPTIONS[4]],         agreements: [AGREEMENT_OPTIONS[1]],                                                      owner: OWNER_OPTIONS[1], typeStage: { primary: "Supply Chain",           secondary: "Negotiation" },            status: STATUS_OPTIONS[1] },
  { id: "op19", title: "ETLUI-1023",              description: "",                                                                                              company: COMPANY_OPTIONS[2], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[2], typeStage: { primary: "hasstages",              secondary: "Triage" },                 status: STATUS_OPTIONS[0] },
  { id: "op20", title: "ETLUI-1034",              description: "Term sheet review for out-licensing of CRISPR platform.",                                        company: COMPANY_OPTIONS[1], tags: [TAG_OPTIONS[1], TAG_OPTIONS[11]], agreements: [AGREEMENT_OPTIONS[3]],                                            owner: OWNER_OPTIONS[3], typeStage: { primary: "Out-Licensing",          secondary: "Term Sheet" },             status: STATUS_OPTIONS[0] },
  { id: "op21", title: "ETLUI-1045",              description: "",                                                                                              company: COMPANY_OPTIONS[3], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[0], typeStage: { primary: "TestOppType",            secondary: "Draft" },                  status: STATUS_OPTIONS[2] },
  { id: "op22", title: "ETLUI-1056",              description: "Clinical trial collaboration — Phase II oncology study.",                                        company: COMPANY_OPTIONS[0], tags: [TAG_OPTIONS[8], TAG_OPTIONS[2]], agreements: [AGREEMENT_OPTIONS[0], AGREEMENT_OPTIONS[1]],                        owner: OWNER_OPTIONS[1], typeStage: { primary: "Research Collaboration", secondary: "Active" },                 status: STATUS_OPTIONS[0] },
  { id: "op23", title: "ETLUI-1067",              description: "",                                                                                              company: COMPANY_OPTIONS[2], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[2], typeStage: { primary: "BIO",                    secondary: "Review" },                 status: STATUS_OPTIONS[0] },
  { id: "op24", title: "ETLUI-1078",              description: "Regulatory partnership for EMEA submission.",                                                    company: COMPANY_OPTIONS[1], tags: [TAG_OPTIONS[9]],         agreements: [AGREEMENT_OPTIONS[2]],                                                      owner: OWNER_OPTIONS[3], typeStage: { primary: "InovaTSS1 Workflow",      secondary: "Regulatory Review" },      status: STATUS_OPTIONS[1] },
  { id: "op25", title: "ETLUI-1089",              description: "",                                                                                              company: COMPANY_OPTIONS[3], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[0], typeStage: { primary: "hasstages",              secondary: "Draft" },                  status: STATUS_OPTIONS[0] },
  { id: "op26", title: "ETLUI-1100",              description: "Co-development agreement for mRNA vaccine platform.",                                            company: COMPANY_OPTIONS[0], tags: [TAG_OPTIONS[6], TAG_OPTIONS[0]], agreements: [AGREEMENT_OPTIONS[1], AGREEMENT_OPTIONS[3]],                        owner: OWNER_OPTIONS[1], typeStage: { primary: "Co-Development",         secondary: "Negotiation" },            status: STATUS_OPTIONS[0] },
  { id: "op27", title: "ETLUI-1111",              description: "",                                                                                              company: COMPANY_OPTIONS[2], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[2], typeStage: { primary: "TestOppType",            secondary: "Triage" },                 status: STATUS_OPTIONS[2] },
  { id: "op28", title: "ETLUI-1122",              description: "Due diligence for potential acquisition of biotech startup.",                                    company: COMPANY_OPTIONS[1], tags: [TAG_OPTIONS[10], TAG_OPTIONS[3]], agreements: [AGREEMENT_OPTIONS[0]],                                            owner: OWNER_OPTIONS[3], typeStage: { primary: "Acquisition",            secondary: "Due Diligence" },           status: STATUS_OPTIONS[0] },
  { id: "op29", title: "ETLUI-1133",              description: "",                                                                                              company: COMPANY_OPTIONS[3], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[0], typeStage: { primary: "BIO",                    secondary: "Active" },                 status: STATUS_OPTIONS[0] },
  { id: "op30", title: "ETLUI-1144",              description: "Manufacturing partnership for biologics CMO.",                                                   company: COMPANY_OPTIONS[0], tags: [TAG_OPTIONS[7]],         agreements: [AGREEMENT_OPTIONS[1], AGREEMENT_OPTIONS[2]],                                owner: OWNER_OPTIONS[1], typeStage: { primary: "Joint Venture",          secondary: "Draft" },                  status: STATUS_OPTIONS[1] },
  { id: "op31", title: "ETLUI-1155",              description: "",                                                                                              company: COMPANY_OPTIONS[2], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[2], typeStage: { primary: "hasstages",              secondary: "Review" },                 status: STATUS_OPTIONS[0] },
  { id: "op32", title: "ETLUI-1166",              description: "In-licensing of small molecule library for HTS.",                                                company: COMPANY_OPTIONS[1], tags: [TAG_OPTIONS[0], TAG_OPTIONS[1]], agreements: [AGREEMENT_OPTIONS[3]],                                             owner: OWNER_OPTIONS[3], typeStage: { primary: "In-Licensing",           secondary: "Negotiation" },            status: STATUS_OPTIONS[0] },
  { id: "op33", title: "ETLUI-1177",              description: "",                                                                                              company: COMPANY_OPTIONS[3], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[0], typeStage: { primary: "InovaTSS1 Workflow",      secondary: "Draft" },                  status: STATUS_OPTIONS[2] },
  { id: "op34", title: "ETLUI-1188",              description: "Distribution agreement for APAC region — diagnostics.",                                          company: COMPANY_OPTIONS[0], tags: [TAG_OPTIONS[13], TAG_OPTIONS[2]], agreements: [AGREEMENT_OPTIONS[0], AGREEMENT_OPTIONS[1]],                        owner: OWNER_OPTIONS[1], typeStage: { primary: "Distribution",           secondary: "Active" },                 status: STATUS_OPTIONS[0] },
  { id: "op35", title: "ETLUI-1199",              description: "",                                                                                              company: COMPANY_OPTIONS[2], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[2], typeStage: { primary: "BIO",                    secondary: "Triage" },                 status: STATUS_OPTIONS[0] },
  { id: "op36", title: "ETLUI-1210",              description: "Term sheet for exclusive license — cell therapy IP.",                                            company: COMPANY_OPTIONS[1], tags: [TAG_OPTIONS[11], TAG_OPTIONS[1]], agreements: [AGREEMENT_OPTIONS[3]],                                            owner: OWNER_OPTIONS[3], typeStage: { primary: "Out-Licensing",          secondary: "Term Sheet" },             status: STATUS_OPTIONS[1] },
  { id: "op37", title: "ETLUI-1221",              description: "",                                                                                              company: COMPANY_OPTIONS[3], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[0], typeStage: { primary: "TestOppType",            secondary: "Draft" },                  status: STATUS_OPTIONS[0] },
  { id: "op38", title: "ETLUI-1232",              description: "Phase III clinical study — rare disease indication.",                                            company: COMPANY_OPTIONS[0], tags: [TAG_OPTIONS[8], TAG_OPTIONS[9]], agreements: [AGREEMENT_OPTIONS[2]],                                             owner: OWNER_OPTIONS[1], typeStage: { primary: "Research Collaboration", secondary: "Active" },                 status: STATUS_OPTIONS[0] },
  { id: "op39", title: "ETLUI-1243",              description: "",                                                                                              company: COMPANY_OPTIONS[2], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[2], typeStage: { primary: "hasstages",              secondary: "Review" },                 status: STATUS_OPTIONS[2] },
  { id: "op40", title: "ETLUI-1254",              description: "Acquisition screening — immunology assets.",                                                     company: COMPANY_OPTIONS[1], tags: [TAG_OPTIONS[12], TAG_OPTIONS[10]], agreements: [AGREEMENT_OPTIONS[0], AGREEMENT_OPTIONS[1]],                        owner: OWNER_OPTIONS[3], typeStage: { primary: "Acquisition",            secondary: "Screening" },              status: STATUS_OPTIONS[0] },
  { id: "op41", title: "ETLUI-1265",              description: "",                                                                                              company: COMPANY_OPTIONS[3], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[0], typeStage: { primary: "BIO",                    secondary: "Draft" },                  status: STATUS_OPTIONS[0] },
  { id: "op42", title: "ETLUI-1276",              description: "Supply chain partnership — cold chain logistics.",                                               company: COMPANY_OPTIONS[0], tags: [TAG_OPTIONS[4]],         agreements: [AGREEMENT_OPTIONS[1]],                                                      owner: OWNER_OPTIONS[1], typeStage: { primary: "Supply Chain",           secondary: "Negotiation" },            status: STATUS_OPTIONS[1] },
  { id: "op43", title: "ETLUI-1287",              description: "",                                                                                              company: COMPANY_OPTIONS[2], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[2], typeStage: { primary: "InovaTSS1 Workflow",      secondary: "Triage" },                 status: STATUS_OPTIONS[0] },
  { id: "op44", title: "ETLUI-1298",              description: "Co-development of ADC platform with academic partner.",                                          company: COMPANY_OPTIONS[1], tags: [TAG_OPTIONS[6], TAG_OPTIONS[0]], agreements: [AGREEMENT_OPTIONS[3], AGREEMENT_OPTIONS[2]],                        owner: OWNER_OPTIONS[3], typeStage: { primary: "Co-Development",         secondary: "Draft" },                  status: STATUS_OPTIONS[0] },
  { id: "op45", title: "ETLUI-1309",              description: "",                                                                                              company: COMPANY_OPTIONS[3], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[0], typeStage: { primary: "TestOppType",            secondary: "Active" },                 status: STATUS_OPTIONS[2] },
  { id: "op46", title: "ETLUI-1320",              description: "Out-licensing of proprietary assay technology.",                                                 company: COMPANY_OPTIONS[0], tags: [TAG_OPTIONS[1], TAG_OPTIONS[5]], agreements: [AGREEMENT_OPTIONS[0]],                                             owner: OWNER_OPTIONS[1], typeStage: { primary: "Out-Licensing",          secondary: "Negotiation" },            status: STATUS_OPTIONS[0] },
  { id: "op47", title: "ETLUI-1331",              description: "",                                                                                              company: COMPANY_OPTIONS[2], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[2], typeStage: { primary: "hasstages",              secondary: "Draft" },                  status: STATUS_OPTIONS[0] },
  { id: "op48", title: "ETLUI-1342",              description: "Regulatory strategy partnership — FDA fast track application.",                                  company: COMPANY_OPTIONS[1], tags: [TAG_OPTIONS[9], TAG_OPTIONS[3]], agreements: [AGREEMENT_OPTIONS[2]],                                             owner: OWNER_OPTIONS[3], typeStage: { primary: "InovaTSS1 Workflow",      secondary: "Regulatory Review" },      status: STATUS_OPTIONS[1] },
  { id: "op49", title: "ETLUI-1353",              description: "",                                                                                              company: COMPANY_OPTIONS[3], tags: [],                       agreements: [],                                                                          owner: OWNER_OPTIONS[0], typeStage: { primary: "BIO",                    secondary: "Review" },                 status: STATUS_OPTIONS[0] },
  { id: "op50", title: "ETLUI-1364",              description: "Joint venture for gene therapy manufacturing facility.",                                          company: COMPANY_OPTIONS[0], tags: [TAG_OPTIONS[5], TAG_OPTIONS[7]], agreements: [AGREEMENT_OPTIONS[1], AGREEMENT_OPTIONS[3]],                        owner: OWNER_OPTIONS[1], typeStage: { primary: "Joint Venture",          secondary: "Active" },                 status: STATUS_OPTIONS[0] },
];

const COLUMNS = [
  { key: "title", header: "Title", width: 220, type: "text", placeholder: "Add title", openable: true },
  { key: "description", header: "Description", width: 260, type: "longText", placeholder: "Add description" },
  { key: "company", header: "Company", width: 220, type: "link", options: COMPANY_OPTIONS, icon: <Icon name="BuildingOffice2" size={14} />, placeholder: "Add company" },
  { key: "tags", header: "Tags", width: 200, type: "chip", options: TAG_OPTIONS },
  { key: "agreements", header: "Agreements", width: 240, type: "link", options: AGREEMENT_OPTIONS, multiple: true, icon: <Icon name="LinkIcon" size={14} />, placeholder: "Add agreements", headerBold: false, hideIconWhenEmpty: true },
  { key: "owner", header: "Owner", width: 220, type: "owner", options: OWNER_OPTIONS },
  { key: "typeStage", header: "Type / Stage", width: 200, type: "twoLevel" },
  { key: "status", header: "Status", width: 160, type: "status", options: STATUS_OPTIONS },
];

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const s = {
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    background: "var(--color-general-neutral-light)",
    fontFamily: "var(--font-family-primary)",
  },
  headerWrap: {
    flexShrink: 0,
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    columnGap: "var(--spacing-6)",
    padding: "0 var(--spacing-6)",
    background: "var(--color-general-neutral-light)",
  },
  body: {
    flex: 1,
    overflowY: "auto",
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    columnGap: "var(--spacing-6)",
    padding: "var(--spacing-6) var(--spacing-6) var(--spacing-md)",
    alignContent: "start",
    position: "relative",
  },
  footer: {
    flexShrink: 0,
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    columnGap: "var(--spacing-6)",
    padding: "var(--spacing-3) var(--spacing-6)",
    borderTop: "1px solid var(--color-action-outline-secondary-enabled)",
  },
  footerContent: {
    gridColumn: "2 / span 10",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    gridColumn: "2 / span 10",
  },
  contentColumn: {
    gridColumn: "2 / span 10",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-4)",
  },
  footerInner: {
    gridColumn: "2 / span 10",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerHint: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-2)",
    color: "var(--color-content-secondary)",
    fontSize: "var(--text-body-md)",
  },
};

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export default function HubPage() {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [openRow, setOpenRow] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const updateRow = (id, patch) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const pagedRows = rows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div style={s.root}>
      <div style={s.headerWrap}>
        <div style={s.content}>
          <HubHeader>
            <HubHeaderRow>
              <HubHeaderLeft>
                <HubHeaderTitle badge={String(rows.length)}>Opportunities</HubHeaderTitle>
                <HubHeaderContextButton label="All opportunities" iconName="User" />
                <HubHeaderViewToggle value={view} onChange={setView} />
              </HubHeaderLeft>
              <HubHeaderRight>
                <HubHeaderControls>
                  <TextInput value={search} onChange={(v) => setSearch(v)} placeholder="Search" iconLeading={<Icon name="MagnifyingGlass" size="sm" />} size="sm" />
                </HubHeaderControls>
                <HubHeaderActions>
                  <HubHeaderSmartFilterButton />
                  <HubHeaderSettingsButton />
                  <HubHeaderExportButton />
                  <Button variant="primary" size="md" iconLeading={<Icon name="Plus" size="sm" />}>
                    Create
                  </Button>
                </HubHeaderActions>
              </HubHeaderRight>
            </HubHeaderRow>
          </HubHeader>
        </div>
      </div>

      <div style={s.body}>
        <div style={s.contentColumn}>
          <Button variant="secondary" size="md" iconLeading={<Icon name="Plus" size="sm" />} style={{ alignSelf: "flex-start" }}>
            Add filters
          </Button>

          <TableInlineEdit
            columns={COLUMNS}
            rows={pagedRows}
            onRowChange={updateRow}
            onOpenRow={setOpenRow}
            selectable
            selectedRows={selectedRows}
            onSelectionChange={setSelectedRows}
            trailingColumn={{
              width: 48,
              render: () => (
                <Button variant="secondary" size="sm" iconOnly ariaLabel="Row actions" iconLeading={<Icon name="EllipsisVertical" size="sm" />} />
              ),
            }}
          />

        </div>

        <div style={{ gridColumn: "2 / span 10", position: "sticky", bottom: "var(--spacing-md)", zIndex: 10, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
          <div style={{ pointerEvents: "auto" }}>
            <BulkActionBar
              selectedCount={selectedRows.length}
              totalCount={rows.length}
              itemLabel="opportunities"
              onSelectAll={() => setSelectedRows(rows.map((r) => r.id))}
              position="sticky"
              onClear={() => setSelectedRows([])}
              actions={[
                {
                  id: "status",
                  label: "Status",
                  icon: "CircleStack",
                  options: STATUS_OPTIONS.map((st) => ({ id: st.id, label: st.label })),
                  showSearch: false,
                },
                {
                  id: "owner",
                  label: "Owner",
                  icon: "User",
                  options: OWNER_OPTIONS.map((o) => ({ id: o.id, label: o.name })),
                },
                {
                  id: "tags",
                  label: "Tags",
                  icon: "Tag",
                  options: TAG_OPTIONS.map((t) => ({ id: t.id, label: t.label })),
                },
                {
                  id: "company",
                  label: "Company",
                  icon: "BuildingOffice2",
                  options: COMPANY_OPTIONS.map((c) => ({ id: c.id, label: c.label })),
                },
                {
                  id: "delete",
                  label: "Delete",
                  icon: "Trash",
                  iconOnly: true,
                  destructive: true,
                },
              ]}
              onAction={(actionId, value) => {
                if (actionId === "delete") {
                  setRows((prev) => prev.filter((r) => !selectedRows.includes(r.id)));
                  setSelectedRows([]);
                } else if (actionId === "status" && value) {
                  const statusOption = STATUS_OPTIONS.find((st) => st.id === value.id);
                  setRows((prev) =>
                    prev.map((r) =>
                      selectedRows.includes(r.id) ? { ...r, status: statusOption } : r
                    )
                  );
                } else if (actionId === "owner" && value) {
                  const ownerOption = OWNER_OPTIONS.find((o) => o.id === value.id);
                  setRows((prev) =>
                    prev.map((r) =>
                      selectedRows.includes(r.id) ? { ...r, owner: ownerOption } : r
                    )
                  );
                } else if (actionId === "company" && value) {
                  const companyOption = COMPANY_OPTIONS.find((c) => c.id === value.id);
                  setRows((prev) =>
                    prev.map((r) =>
                      selectedRows.includes(r.id) ? { ...r, company: companyOption } : r
                    )
                  );
                }
              }}
            />
          </div>
        </div>
      </div>

      <div style={s.footer}>
        <div style={s.footerContent}>
          <div style={s.footerHint}>
            <span>Can't find what you're looking for?</span>
            <Button variant="secondary" size="sm" iconLeading={<Icon name="Squares2X2" size="sm" />}>
              Advanced search
            </Button>
          </div>
          <div style={{ flexShrink: 0 }}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={handlePageSizeChange}
              showPerPage
              actionButton={<Button variant="secondary" size="md" iconOnly ariaLabel="Refresh" iconLeading={<Icon name="ArrowPath" size="sm" />} />}
            />
          </div>
        </div>
      </div>

      <SidePanel
        isOpen={Boolean(openRow)}
        onClose={() => setOpenRow(null)}
        title={openRow?.title || "Opportunity"}
        subinfoItems={openRow ? [
          { label: "Company", value: openRow.company?.label },
          { label: "Owner", value: openRow.owner?.name },
          { label: "Status", value: openRow.status?.label },
        ] : []}
        sections={openRow ? [
          {
            id: "details",
            title: "Details",
            defaultExpanded: true,
            content: (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-3)" }}>
                <div>
                  <div style={{ fontSize: "var(--text-body-sm)", color: "var(--color-content-secondary)", marginBottom: "var(--spacing-1)" }}>Description</div>
                  <div style={{ fontSize: "var(--text-body-md)", color: "var(--color-content-primary)" }}>
                    {openRow.description || "—"}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "var(--text-body-sm)", color: "var(--color-content-secondary)", marginBottom: "var(--spacing-1)" }}>Type / Stage</div>
                  <div style={{ fontSize: "var(--text-body-md)", color: "var(--color-content-primary)" }}>
                    {openRow.typeStage?.primary} · {openRow.typeStage?.secondary}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "var(--text-body-sm)", color: "var(--color-content-secondary)", marginBottom: "var(--spacing-1)" }}>Tags</div>
                  <div style={{ fontSize: "var(--text-body-md)", color: "var(--color-content-primary)" }}>
                    {openRow.tags?.length ? openRow.tags.map((t) => t.label).join(", ") : "—"}
                  </div>
                </div>
              </div>
            ),
          },
        ] : []}
      />
    </div>
  );
}
