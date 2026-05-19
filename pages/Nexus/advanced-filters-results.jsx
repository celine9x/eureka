import React, { useMemo, useState } from "react";
import { Hub } from "../../library/templates/hub.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { Button } from "../../library/atoms/button.jsx";
import {
  RESULT_ASSETS,
  buildInitialFilters,
} from "./nexus-search-data.js";

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

const columns = [
  { key: "name", label: "Name", sortable: true, type: "short-text" },
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
  { key: "status", label: "Status", type: "badge" },
  { key: "tags", label: "Tags", type: "chips", chipProps: { chevron: false, removable: false } },
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

export const AdvancedFiltersResultsPage = () => {
  const [page, setPage] = useState(1);
  const { searchName, items } = parseSearchCriteria();

  const initialFilters = useMemo(() => buildInitialFilters(items), [items]);

  const tableData = useMemo(
    () =>
      RESULT_ASSETS.map((asset) => ({
        ...asset,
        value: asset.dealValue,
        action: {
          iconName: "EllipsisVertical",
          iconOnly: true,
          ariaLabel: "More actions",
        },
      })),
    [],
  );

  return (
    <Hub
      title={searchName || "Search Results"}
      badge={String(tableData.length)}
      menuSections={menuSections}
      menuUser={menuUser}
      headerLeftContent={
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
          <Button
            variant="tertiary"
            size="sm"
            iconLeading={<Icon name="ArrowLeft" size={16} />}
            onClick={() => window.history.back()}
          >
            Back
          </Button>
        </div>
      }
      initialFilters={initialFilters}
      columns={columns}
      data={tableData}
      currentPage={page}
      totalPages={1}
      pageSize={10}
      onPageChange={setPage}
    />
  );
};

export default AdvancedFiltersResultsPage;
