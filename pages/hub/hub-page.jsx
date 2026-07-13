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
  HubHeaderSearch,
  HubHeaderSmartFilterButton,
  HubHeaderSettingsButton,
  HubHeaderExportButton,
} from "../../library/organisms/hub-header.jsx";
import { Button } from "../../library/atoms/button.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { TableInlineEdit } from "../../library/organisms/table/table-inline-edit.jsx";
import { Pagination } from "../../library/organisms/pagination.jsx";
import { SidePanel } from "../../library/templates/side-panel.jsx";

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
  { id: "op1", title: "ETLUI-890", description: "", company: COMPANY_OPTIONS[0], tags: [], agreements: [], owner: OWNER_OPTIONS[0], typeStage: { primary: "hasstages", secondary: "Draft" }, status: STATUS_OPTIONS[0] },
  { id: "op2", title: "Bane test asset", description: "", company: COMPANY_OPTIONS[1], tags: [], agreements: [AGREEMENT_OPTIONS[0]], owner: OWNER_OPTIONS[1], typeStage: { primary: "InovaTSS1 Workflow", secondary: "Draft" }, status: STATUS_OPTIONS[0] },
  { id: "op3", title: "ETLUI-880", description: "", company: COMPANY_OPTIONS[0], tags: [], agreements: [], owner: OWNER_OPTIONS[0], typeStage: { primary: "BIO", secondary: "Triage" }, status: STATUS_OPTIONS[0] },
  { id: "op4", title: "ETLUI-542", description: "", company: COMPANY_OPTIONS[0], tags: [], agreements: [], owner: OWNER_OPTIONS[0], typeStage: { primary: "hasstages", secondary: "Draft" }, status: STATUS_OPTIONS[0] },
  { id: "op5", title: "ETLUI-733", description: "", company: COMPANY_OPTIONS[2], tags: [], agreements: [AGREEMENT_OPTIONS[0], AGREEMENT_OPTIONS[1]], owner: OWNER_OPTIONS[2], typeStage: { primary: "TestOppType", secondary: "Draft" }, status: STATUS_OPTIONS[0] },
  { id: "op6", title: "ETLUI-845_no_milestone", description: "", company: COMPANY_OPTIONS[2], tags: [], agreements: [], owner: OWNER_OPTIONS[2], typeStage: { primary: "InovaTSS1 Workflow", secondary: "Draft" }, status: STATUS_OPTIONS[1] },
  { id: "op7", title: "ETLUI-825_draft_clean", description: "Confidential research collaboration evaluation with Inpart Habtamu's Test Co.", company: COMPANY_OPTIONS[2], tags: TAG_OPTIONS.slice(0, 7), agreements: [AGREEMENT_OPTIONS[0], AGREEMENT_OPTIONS[1], AGREEMENT_OPTIONS[2], AGREEMENT_OPTIONS[3]], owner: OWNER_OPTIONS[2], typeStage: { primary: "Research Collaboration", secondary: "Confidential Evaluation" }, status: STATUS_OPTIONS[2] },
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
    padding: "var(--spacing-6)",
    alignContent: "start",
  },
  footer: {
    flexShrink: 0,
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    columnGap: "var(--spacing-6)",
    padding: "var(--spacing-3) var(--spacing-6)",
    borderTop: "1px solid var(--color-action-outline-secondary-enabled)",
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
  footerRow: {
    gridColumn: "2 / span 10",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-4)",
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

  const updateRow = (id, patch) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

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
                  <HubHeaderSearch value={search} onChange={setSearch} />
                </HubHeaderControls>
                <HubHeaderActions>
                  <HubHeaderSmartFilterButton />
                  <Button variant="secondary" size="md" iconLeading={<Icon name="Funnel" size="sm" />}>
                    Filter
                  </Button>
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
            rows={rows}
            onRowChange={updateRow}
            onOpenRow={setOpenRow}
            trailingColumn={{
              width: 48,
              render: () => (
                <Button variant="secondary" size="sm" iconOnly ariaLabel="Row actions" iconLeading={<Icon name="EllipsisVertical" size="sm" />} />
              ),
            }}
          />
        </div>
      </div>

      <div style={s.footer}>
        <div style={s.footerRow}>
          <div style={s.footerHint}>
            <span>Can't find what you're looking for?</span>
            <Button variant="secondary" size="sm" iconLeading={<Icon name="Squares2X2" size="sm" />}>
              Advanced search
            </Button>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={57}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            showPerPage
            actionButton={<Button variant="secondary" size="md" iconOnly ariaLabel="Refresh" iconLeading={<Icon name="ArrowPath" size="sm" />} />}
          />
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
