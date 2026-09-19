"use client";

import React, { useMemo, useState } from "react";
import { Button } from "../atoms/button.jsx";
import { Badge } from "../atoms/badge.jsx";
import { ContentField } from "../atoms/content-field.jsx";
import { Icon } from "../atoms/icon.jsx";
import { Accordion } from "../molecules/accordion.jsx";
import { ButtonGroup, ButtonGroupItem } from "../molecules/button-group.jsx";
import { TextInput } from "../molecules/text-input.jsx";
import { Table } from "./table/table.jsx";

export const OBJECT_PAGE_TAB_CONTENT_VARIANTS = {
  list: "list",
  content: "content",
};

const styles = {
  container: {
    width: "100%",
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "var(--spacing-4)",
  },
  heading: {
    width: "100%",
    display: "inline-flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "var(--spacing-4)",
  },
  headingLeft: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
  },
  title: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-heading-h2)",
    lineHeight: "var(--line-height-heading-h2)",
    fontWeight: "var(--font-weight-semibold)",
    color: "var(--color-content-primary)",
  },
  toolbar: {
    width: "100%",
    display: "inline-flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "var(--spacing-4)",
    flexWrap: "wrap",
  },
  toolbarLeft: {
    display: "inline-flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    gap: "var(--spacing-4)",
    flexWrap: "wrap",
    alignContent: "flex-end",
    flex: 1,
    minWidth: 360,
  },
  viewSwitchWrap: {
    paddingRight: "var(--spacing-sm)",
    borderRight: "1px solid var(--color-action-outline-secondary-enabled)",
  },
  filters: {
    display: "inline-flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    gap: "var(--spacing-sm)",
    flexWrap: "wrap",
  },
  toolbarRight: {
    display: "inline-flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "var(--spacing-sm)",
    flexWrap: "wrap",
  },
  tableWrap: {
    width: "100%",
  },
  contentColumns: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "var(--spacing-4)",
  },
  contentFieldGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "var(--spacing-4)",
  },
};

const defaultTableColumns = [
  { key: "company", header: "Company", variant: "short-text", width: "240px" },
  { key: "status", header: "Status", variant: "short-text", width: "180px" },
  { key: "owner", header: "Owner", variant: "short-text", width: "220px" },
  { key: "updated", header: "Updated", variant: "short-text", width: "160px" },
];

const defaultTableRows = [
  { id: "row-1", company: "Acme Corporation", status: "Active", owner: "Emma Dupont", updated: "2h ago" },
  { id: "row-2", company: "Nova Biotech", status: "In review", owner: "Liam Chen", updated: "1d ago" },
  { id: "row-3", company: "Global Med", status: "Pending", owner: "Priya Shah", updated: "3d ago" },
];

const defaultAccordionSections = {
  left: [
    {
      id: "left-overview",
      title: "Overview",
      fields: [
        { label: "Account", description: "Primary account", value: "Acme Corporation" },
        { label: "Owner", description: "Current owner", value: "Emma Dupont" },
        { label: "Stage", description: "Current phase", value: "Qualification" },
        { label: "Priority", description: "Delivery priority", value: "High" },
      ],
    },
    {
      id: "left-commercial",
      title: "Commercial",
      fields: [
        { label: "Amount", description: "Estimated value", value: "$125,000" },
        { label: "Type", description: "Deal type", value: "Enterprise" },
        { label: "Region", description: "Primary market", value: "EMEA" },
        { label: "Term", description: "Contract duration", value: "24 months" },
      ],
    },
  ],
  right: [
    {
      id: "right-dates",
      title: "Dates",
      fields: [
        { label: "Created", description: "Record creation date", value: "Jan 15, 2024" },
        { label: "Last activity", description: "Most recent interaction", value: "Feb 20, 2024" },
        { label: "Expected close", description: "Forecast close date", value: "Mar 30, 2024" },
        { label: "Renewal", description: "Next renewal date", value: "Mar 30, 2026" },
      ],
    },
    {
      id: "right-governance",
      title: "Governance",
      fields: [
        { label: "Legal", description: "Legal owner", value: "In-house counsel" },
        { label: "Compliance", description: "Compliance status", value: "Compliant" },
        { label: "Security", description: "Security review", value: "Passed" },
        { label: "Risk", description: "Risk classification", value: "Medium" },
      ],
    },
  ],
};

const renderAccordionColumn = (sections) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
    {sections.map((section) => (
      <Accordion key={section.id} title={section.title} size="lg" defaultExpanded>
        <div style={styles.contentFieldGrid}>
          {section.fields.map((field, index) => (
            <ContentField
              key={`${section.id}-${index}`}
              label={field.label}
              description={field.description}
              value={field.value}
            />
          ))}
        </div>
      </Accordion>
    ))}
  </div>
);

export const ObjectPageTabContent = ({
  variant = OBJECT_PAGE_TAB_CONTENT_VARIANTS.list,
  title = "Companies",
  badgeCount = 124,
  tableColumns = defaultTableColumns,
  tableRows = defaultTableRows,
  accordionSections = defaultAccordionSections,
  onAdd,
  onExport,
  onSettings,
  onMoreFilters,
}) => {
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");

  const companiesMenuItems = useMemo(
    () => [
      { id: "c1", label: "Acme Corporation" },
      { id: "c2", label: "Nova Biotech" },
      { id: "c3", label: "Global Med" },
    ],
    []
  );

  const statusMenuItems = useMemo(
    () => [
      { id: "s1", label: "All" },
      { id: "s2", label: "Active" },
      { id: "s3", label: "Pending" },
      { id: "s4", label: "In review" },
    ],
    []
  );

  return (
    <div style={styles.container}>
      <div style={styles.heading}>
        <div style={styles.headingLeft}>
          <h2 style={styles.title}>{title}</h2>
          <Badge size="sm">{badgeCount}</Badge>
        </div>

        <Button
          variant="primary"
          size="md"
          iconLeading={<Icon name="Plus" size="sm" />}
          onClick={onAdd}
        >
          Add
        </Button>
      </div>

      {variant === OBJECT_PAGE_TAB_CONTENT_VARIANTS.list ? (
        <>
          <div style={styles.toolbar}>
            <div style={styles.toolbarLeft}>
              <div style={styles.viewSwitchWrap}>
                <ButtonGroup value={view} onChange={setView}>
                  <ButtonGroupItem value="list" iconName="QueueList" />
                  <ButtonGroupItem value="kanban" iconName="ViewColumns" />
                </ButtonGroup>
              </div>

              <TextInput
                size="sm"
                label="Search"
                placeholder="Search with keyword"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                iconLeading={<Icon name="MagnifyingGlass" size="sm" />}
              />

              <div style={styles.filters}>
                <TextInput
                  size="sm"
                  label="Companies"
                  placeholder="Select companies"
                  menuItems={companiesMenuItems}
                />

                <TextInput
                  size="sm"
                  label="Status"
                  defaultValue="All"
                  placeholder="Select status"
                  menuItems={statusMenuItems}
                />

                <Button
                  variant="secondary"
                  size="md"
                  iconLeading={<Icon name="AdjustmentsHorizontal" size="sm" />}
                  onClick={onMoreFilters}
                >
                  More filters
                </Button>
              </div>
            </div>

            <div style={styles.toolbarRight}>
              <Button
                variant="secondary"
                size="md"
                iconLeading={<Icon name="ArrowDownTray" size="sm" />}
                onClick={onExport}
              >
                Export
              </Button>

              <Button
                variant="secondary"
                size="md"
                iconLeading={<Icon name="Cog6Tooth" size="sm" />}
                onClick={onSettings}
              >
                Settings
              </Button>
            </div>
          </div>

          <div style={styles.tableWrap}>
            <Table columns={tableColumns} rows={tableRows} />
          </div>
        </>
      ) : (
        <div style={styles.contentColumns}>
          {renderAccordionColumn(accordionSections.left || [])}
          {renderAccordionColumn(accordionSections.right || [])}
        </div>
      )}
    </div>
  );
};

ObjectPageTabContent.displayName = "ObjectPageTabContent";
ObjectPageTabContent.variants = OBJECT_PAGE_TAB_CONTENT_VARIANTS;

export default ObjectPageTabContent;
