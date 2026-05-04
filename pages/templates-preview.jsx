/**
 * Templates Preview Pages
 *
 * Each export is a self-contained page showcasing a library template with sample data.
 */

import React, { useState } from "react";
import { Hub } from "../library/templates/hub.jsx";
import { ObjectPage } from "../library/templates/object-page.jsx";
import { SidePanel } from "../library/templates/side-panel.jsx";
import { DocumentViewerPage } from "../library/templates/document-viewer-page.jsx";
import { AiHomepage } from "../library/templates/ai-homepage.jsx";
import { Tabs, Tab } from "../library/molecules/tabs.jsx";
import { Button } from "../library/atoms/button.jsx";
import { AiButton } from "../library/atoms/ai-button.jsx";
import { Badge } from "../library/atoms/badge.jsx";
import { Icon } from "../library/atoms/icon.jsx";
import { TextInput } from "../library/molecules/text-input.jsx";
import {
  HubHeaderContextButton,
  HubHeaderSettingsButton,
  HubHeaderExportButton,
} from "../library/organisms/hub-header.jsx";

// ─────────────────────────────────────────────
// SHARED SAMPLE DATA
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// HUB TEMPLATE PAGE
// ─────────────────────────────────────────────

const hubColumns = [
  { key: "name", label: "Name", sortable: true, type: "short-text" },
  {
    key: "company",
    label: "Company",
    sortable: true,
    type: "short-text",
    renderCell: (val) => (
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-primary)", lineHeight: "var(--line-height-body-md)" }}>{val?.primary ?? val}</span>
        {val?.secondary && <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-sm)", color: "var(--color-content-secondary)", lineHeight: "var(--line-height-body-sm)" }}>{val.secondary}</span>}
      </div>
    ),
  },
  { key: "status", label: "Status", type: "badge" },
  { key: "tags", label: "Tags", type: "chips", chipProps: { chevron: false, removable: false } },
  { key: "value", label: "Value", sortable: true, type: "short-text" },
  { key: "startDate", label: "Start date", sortable: true, type: "short-text" },
  { key: "owner", label: "Owner", type: "short-text" },
  { key: "action", label: "", type: "button" },
];

const hubData = [
  { id: 1, name: "Q1 Partnership Deal", company: { primary: "Acme Corp", secondary: "Healthcare" }, status: { label: "Active", color: "positive", shape: "pill" }, tags: { items: [{ label: "Priority" }, { label: "Q1" }] }, value: "$120,000", startDate: "Jan 10, 2026", owner: "Alexandra Johnson", action: { iconName: "EllipsisVertical", iconOnly: true, ariaLabel: "More actions" } },
  { id: 2, name: "Cloud Migration Project", company: { primary: "TechCo", secondary: "Technology" }, status: { label: "Draft", color: "neutral", shape: "pill" }, tags: { items: [{ label: "Cloud" }] }, value: "$85,000", startDate: "Feb 1, 2026", owner: "Alice Johnson", action: { iconName: "EllipsisVertical", iconOnly: true, ariaLabel: "More actions" } },
  { id: 3, name: "Marketing Alliance", company: { primary: "Brand Inc", secondary: "Marketing" }, status: { label: "Active", color: "positive", shape: "pill" }, tags: { items: [{ label: "Alliance" }, { label: "Marketing" }, { label: "2026" }] }, value: "$45,000", startDate: "Mar 15, 2026", owner: "Bob Smith", action: { iconName: "EllipsisVertical", iconOnly: true, ariaLabel: "More actions" } },
  { id: 4, name: "Enterprise License", company: { primary: "BigCorp", secondary: "Enterprise" }, status: { label: "Active", color: "positive", shape: "pill" }, tags: { items: [{ label: "License" }] }, value: "$210,000", startDate: "Jan 1, 2026", owner: "Carol Davis", action: { iconName: "EllipsisVertical", iconOnly: true, ariaLabel: "More actions" } },
  { id: 5, name: "Reseller Agreement", company: { primary: "Resell Ltd", secondary: "Distribution" }, status: { label: "Draft", color: "neutral", shape: "pill" }, tags: { items: [{ label: "Reseller" }, { label: "Pending" }] }, value: "$30,000", startDate: "Apr 1, 2026", owner: "David Wilson", action: { iconName: "EllipsisVertical", iconOnly: true, ariaLabel: "More actions" } },
  { id: 6, name: "Consulting Services", company: { primary: "Consult LLC", secondary: "Consulting" }, status: { label: "Expired", color: "negative", shape: "pill" }, tags: { items: [{ label: "Consulting" }, { label: "Short-term" }] }, value: "$60,000", startDate: "Nov 1, 2025", owner: "Eve Martinez", action: { iconName: "EllipsisVertical", iconOnly: true, ariaLabel: "More actions" } },
  { id: 7, name: "SaaS Subscription", company: { primary: "SaaS Co", secondary: "Software" }, status: { label: "Active", color: "positive", shape: "pill" }, tags: { items: [{ label: "SaaS" }, { label: "Annual" }] }, value: "$18,000", startDate: "Jan 15, 2026", owner: "Frank Lee", action: { iconName: "EllipsisVertical", iconOnly: true, ariaLabel: "More actions" } },
  { id: 8, name: "Hardware Supply", company: { primary: "HW Solutions", secondary: "Manufacturing" }, status: { label: "Under review", color: "warning", shape: "pill" }, tags: { items: [{ label: "Hardware" }] }, value: "$95,000", startDate: "Mar 1, 2026", owner: "Grace Kim", action: { iconName: "EllipsisVertical", iconOnly: true, ariaLabel: "More actions" } },
];

export const HubTemplatePage = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  return (
    <Hub
      title="Opportunities"
      badge={String(hubData.length)}
      menuSections={menuSections}
      menuUser={menuUser}
      headerLeftContent={
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-2)" }}>
          <HubHeaderContextButton label="All opportunities" starred iconName="User" />
        </div>
      }
      headerActions={
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-2)" }}>
          <div style={{ width: 200, flexShrink: 0 }}>
            <TextInput
              placeholder="Search with keyword"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              iconLeft={<Icon name="MagnifyingGlass" size="sm" />}
            />
          </div>
          <AiButton variant="secondary" size="md" iconLeading={<Icon name="Funnel" size="sm" />}>
            Filter
          </AiButton>
          <HubHeaderSettingsButton />
          <HubHeaderExportButton />
          <Button variant="primary" size="md" iconLeading={<Icon name="Plus" size="sm" />}>
            Create
          </Button>
        </div>
      }
      columns={hubColumns}
      data={hubData}
      currentPage={page}
      totalPages={3}
      pageSize={10}
      onPageChange={setPage}
    />
  );
};

// ─────────────────────────────────────────────
// OBJECT PAGE TEMPLATE
// ─────────────────────────────────────────────

export const ObjectPageTemplatePage = () => {
  const [tab, setTab] = useState("overview");

  return (
    <ObjectPage
      title="Q1 Partnership Deal"
      menuSections={menuSections}
      menuUser={menuUser}
      onBack={() => window.history.back()}
      meta={{ label: "Updated", date: "Apr 28, 2026", author: "Alexandra Johnson" }}
      subinfoItems={[
        { label: "Created", value: "Jan 10, 2026" },
        { label: "Modified", value: "Apr 28, 2026" },
        { label: "Status", value: "Active" },
      ]}
      tabs={
        <Tabs selectedKey={tab} onSelectionChange={setTab}>
          <Tab id="overview">Overview</Tab>
          <Tab id="documents">Documents</Tab>
          <Tab id="contacts">Contacts</Tab>
          <Tab id="activity">Activity</Tab>
        </Tabs>
      }
      topBarRight={
        <Button size="sm" variant="primary">Edit</Button>
      }
      leftColumnSections={[
        {
          title: "Details",
          defaultExpanded: true,
          content: (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-2)", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-lg)" }}>
              {[
                ["Name", "Q1 Partnership Deal"],
                ["Type", "Partnership"],
                ["Value", "$120,000"],
                ["Start date", "Jan 10, 2026"],
                ["End date", "Dec 31, 2026"],
              ].map(([label, value]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--color-content-secondary)" }}>{label}</span>
                  <span style={{ color: "var(--color-content-primary)" }}>{value}</span>
                </div>
              ))}
            </div>
          ),
        },
      ]}
      rightColumnSections={[
        {
          title: "Access control",
          defaultExpanded: true,
          content: (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-2)", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-lg)" }}>
              {[
                ["Visibility", "Private"],
                ["Shared with", "2 users"],
              ].map(([label, value]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--color-content-secondary)" }}>{label}</span>
                  <span style={{ color: "var(--color-content-primary)" }}>{value}</span>
                </div>
              ))}
            </div>
          ),
        },
      ]}
    />
  );
};

// ─────────────────────────────────────────────
// SIDE PANEL TEMPLATE
// ─────────────────────────────────────────────

export const SidePanelTemplatePage = () => {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ height: "100vh", background: "var(--color-background-neutral-lighter)", position: "relative" }}>
      {!open && (
        <div style={{ padding: "var(--spacing-6)" }}>
          <Button onClick={() => setOpen(true)} variant="primary" size="sm">Open side panel</Button>
        </div>
      )}
      <SidePanel
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Q1 Partnership Deal"
        meta={{ label: "Updated", date: "Apr 28, 2026" }}
        subinfoItems={[
          { label: "Company", value: "Acme Corp" },
          { label: "Owner", value: "Alexandra Johnson" },
          { label: "Status", value: "Active" },
        ]}
        tabs={[
          { id: "overview", label: "Overview" },
          { id: "documents", label: "Documents" },
          { id: "activity", label: "Activity" },
        ]}
        sections={[
          {
            id: "details",
            title: "Details",
            defaultExpanded: true,
            content: (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-2)", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-lg)" }}>
                {[
                  ["Type", "Partnership"],
                  ["Value", "$120,000"],
                  ["Start date", "Jan 10, 2026"],
                  ["End date", "Dec 31, 2026"],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--color-content-secondary)" }}>{label}</span>
                    <span style={{ color: "var(--color-content-primary)" }}>{value}</span>
                  </div>
                ))}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

// ─────────────────────────────────────────────
// DOCUMENT VIEWER PAGE TEMPLATE
// ─────────────────────────────────────────────

export const DocumentViewerTemplatePage = () => {
  return (
    <DocumentViewerPage
      menuSections={menuSections}
      menuUser={menuUser}
      headerTitle="Partnership Agreement Q1 2026"
      onBack={() => window.history.back()}
      text="This is a sample partnership agreement between Acme Corp and Example Ltd.\n\nThe parties agree to collaborate on joint initiatives for the fiscal year 2026.\n\nTerms and conditions apply as outlined in Schedule A."
      formContent={
        <div style={{ padding: "var(--spacing-4)", fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-lg)", color: "var(--color-content-secondary)" }}>
          Select extracted fields to review on the right.
        </div>
      }
    />
  );
};

// ─────────────────────────────────────────────
// AI HOMEPAGE TEMPLATE
// ─────────────────────────────────────────────

export const AiHomepageTemplatePage = () => {
  return <AiHomepage />;
};
