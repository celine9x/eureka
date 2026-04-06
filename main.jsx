import React from "react";
import { createRoot } from "react-dom/client";
import { ComponentLibraryDemo } from "./eureka.jsx";
import { Hub } from "./library/templates/hub.jsx";
import { ObjectPage } from "./library/templates/object-page.jsx";
import { DocumentViewerPage } from "./library/templates/document-viewer-page.jsx";
import { SidePanel } from "./library/templates/side-panel.jsx";
import { Badge } from "./library/atoms/badge.jsx";
import { Button } from "./library/atoms/button.jsx";
import { Icon } from "./library/atoms/icon.jsx";
import { TextInput } from "./library/molecules/text-input.jsx";
import { Infofield, InfofieldGroup } from "./library/molecules/infofield.jsx";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSection,
  DropdownMenuItem,
} from "./library/molecules/dropdown-menu.jsx";
import "./library/tokens/tokens.css";
import "./src/index.css";

/* ===========================================
   OBJECT PAGE TEST
   =========================================== */
const ObjectPageTest = () => {
  const navigate = (path) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <ObjectPage
      title="ALLINPART Initiative"
      titleIconName="Briefcase"
      meta={{ label: "Last updated on", date: "Jan 15, 2024", author: "Emma Dupont" }}
      subinfoItems={[
        { label: "Owner", value: "Emma Dupont" },
        { label: "Status", value: "In Progress" },
        { label: "Type", value: "Strategic" },
        { label: "Budget", value: "$2.4M" },
      ]}
      steps={[
        { title: "Draft" },
        { title: "Review" },
        { title: "Approved" },
        { title: "Active" },
      ]}
      currentStep={1}
      menuVariant="deal"
      onBack={() => navigate("/library")}
      leftColumnSections={[
        {
          title: "General Information",
          defaultExpanded: true,
          content: (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
              <InfofieldGroup columns={2}>
                <Infofield label="Reference" value="INIT-2024-001" />
                <Infofield label="Category" value="Alliance" />
                <Infofield label="Start Date" value="February 1, 2024" />
                <Infofield label="End Date" value="December 31, 2024" />
              </InfofieldGroup>
            </div>
          ),
        },
        {
          title: "Description",
          defaultExpanded: false,
          content: (
            <p style={{ margin: 0, color: "var(--color-content-secondary)", fontSize: "var(--text-body-lg)", lineHeight: "var(--line-height-body-lg)" }}>
              This initiative aims to establish strategic partnerships across the EMEA region to accelerate market penetration and drive revenue growth.
            </p>
          ),
        },
      ]}
      rightColumnSections={[
        {
          title: "Team Members",
          defaultExpanded: true,
          content: (
            <InfofieldGroup columns={1}>
              <Infofield label="Lead" value="Emma Dupont" />
              <Infofield label="Analyst" value="Thomas Bernard" />
              <Infofield label="Legal" value="Sophie Martin" />
            </InfofieldGroup>
          ),
        },
        {
          title: "Financial Summary",
          defaultExpanded: false,
          content: (
            <InfofieldGroup columns={2}>
              <Infofield label="Budget" value="$2,400,000" />
              <Infofield label="Spent" value="$980,000" />
              <Infofield label="Committed" value="$420,000" />
              <Infofield label="Remaining" value="$1,000,000" />
            </InfofieldGroup>
          ),
        },
      ]}
    />
  );
};

/* ===========================================
   DOCUMENT VIEWER PAGE TEST
   =========================================== */
const DocumentViewerPageTest = () => {
  const navigate = (path) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <DocumentViewerPage
      headerTitle="Contract Review"
      backButtonLabel="Back to list"
      onBack={() => navigate("/library")}
      menuVariant="deal"
      text={`PARTNERSHIP AGREEMENT\f\nThis Partnership Agreement ("Agreement") is entered into as of January 15, 2024, by and between ALLINPART SAS ("Party A") and Global Ventures Inc. ("Party B").\f\nARTICLE 1 - PURPOSE\n\nThe purpose of this Agreement is to establish the terms and conditions under which the parties will collaborate on strategic initiatives to expand their market presence in the EMEA region.\f\nARTICLE 2 - TERM\n\nThis Agreement shall commence on February 1, 2024 and shall continue in full force and effect until December 31, 2024, unless earlier terminated in accordance with the provisions hereof.\f\nARTICLE 3 - OBLIGATIONS\n\nParty A agrees to provide strategic guidance, market access, and funding support. Party B agrees to provide technical expertise, local market knowledge, and operational support.\f\nARTICLE 4 - FINANCIAL TERMS\n\nThe total budget for this initiative shall not exceed USD 2,400,000. Expenses shall be shared equally unless otherwise agreed in writing by both parties.`}
      formHeaderTitle="Review Details"
      formContent={
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
          <TextInput label="Reviewer" defaultValue="Emma Dupont" />
          <TextInput label="Reference" defaultValue="CONTRACT-2024-001" />
          <TextInput label="Review Date" defaultValue="January 15, 2024" />
          <TextInput label="Status" defaultValue="In Review" />
          <TextInput label="Notes" placeholder="Add your review notes here..." />
        </div>
      }
      footerButtons={[
        { label: "Discard", variant: "secondary", color: "secondary-destructive" },
        { label: "Create", variant: "secondary" },
      ]}
    />
  );
};

/* ===========================================
   HUB PAGE TEST
   =========================================== */
const STATUS_OPTIONS = [
  { value: "Active", iconName: "CheckCircle" },
  { value: "Pending", iconName: "ExclamationTriangle" },
  { value: "Blocked", iconName: "XCircle" },
];

const getStatusIconName = (statusValue) => {
  const match = STATUS_OPTIONS.find((option) => option.value === statusValue);
  return match?.iconName || "InformationCircle";
};

const HUB_TEST_DATA = [
  {
    id: 1,
    name: { label: "Acme Corp", href: "#", iconLeadingName: "BuildingOffice2" },
    status: "Active",
    revenue: "$1.2M",
    owner: "Emma Dupont",
    priority: "High",
    tags: [{ label: "Enterprise" }, { label: "Renewal" }, { label: "Q2" }],
    stage: { text: "Review", iconName: "DocumentText" },
    isActive: true,
    notes: "Ready for legal",
    action: { iconName: "EllipsisVertical", iconOnly: true, ariaLabel: "Row actions" },
  },
  {
    id: 2,
    name: { label: "Blue Sky", href: "#", iconLeadingName: "BuildingOffice2" },
    status: "Pending",
    revenue: "$480K",
    owner: "Thomas Bernard",
    priority: "Medium",
    tags: [{ label: "New" }, { label: "EMEA" }, { label: "Q3" }],
    stage: { text: "Draft", iconName: "PencilSquare" },
    isActive: false,
    notes: "Waiting for budget",
    action: { iconName: "EllipsisVertical", iconOnly: true, ariaLabel: "Row actions" },
  },
  {
    id: 3,
    name: { label: "North Star", href: "#", iconLeadingName: "BuildingOffice2" },
    status: "Active",
    revenue: "$2.1M",
    owner: "Sophie Martin",
    priority: "High",
    tags: [{ label: "Upsell" }, { label: "Strategic" }, { label: "Q1" }],
    stage: { text: "Approved", iconName: "CheckCircle" },
    isActive: true,
    notes: "Contract in progress",
    action: { iconName: "EllipsisVertical", iconOnly: true, ariaLabel: "Row actions" },
  },
  {
    id: 4,
    name: { label: "Horizon Inc", href: "#", iconLeadingName: "BuildingOffice2" },
    status: "Active",
    revenue: "$750K",
    owner: "Luca Romano",
    priority: "Low",
    tags: [{ label: "Mid-Market" }, { label: "Expansion" }, { label: "Q4" }],
    stage: { text: "Negotiation", iconName: "ChatBubbleLeftRight" },
    isActive: true,
    notes: "Need updated scope",
    action: { iconName: "EllipsisVertical", iconOnly: true, ariaLabel: "Row actions" },
  },
  {
    id: 5,
    name: { label: "Apex Partners", href: "#", iconLeadingName: "BuildingOffice2" },
    status: "Pending",
    revenue: "$310K",
    owner: "Anna Kovács",
    priority: "Medium",
    tags: [{ label: "Pilot" }, { label: "SMB" }, { label: "Q2" }],
    stage: { text: "Discovery", iconName: "MagnifyingGlass" },
    isActive: false,
    notes: "Collect requirements",
    action: { iconName: "EllipsisVertical", iconOnly: true, ariaLabel: "Row actions" },
  },
];

const HubTemplateTestPage = () => {
  const [hubRows, setHubRows] = React.useState(HUB_TEST_DATA);
  const [openStatusRowId, setOpenStatusRowId] = React.useState(null);

  const handleStatusChange = (rowId, nextStatus) => {
    setHubRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              status: nextStatus,
              isActive: nextStatus === "Active",
            }
          : row
      )
    );
  };

  const hubColumns = [
    { key: "name", label: "Name", type: "link", sortable: true, width: "220px" },
    {
      key: "status",
      label: "Status",
      type: "button",
      width: "190px",
      render: (value, row) => (
        <DropdownMenu
          open={openStatusRowId === row.id}
          onOpenChange={(isOpen) => setOpenStatusRowId(isOpen ? row.id : null)}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              noTextPadding
              iconLeading={<Icon name={getStatusIconName(value)} size="sm" />}
              iconTrailing={<Icon name="ChevronDown" size="sm" />}
              style={{ width: "fit-content" }}
            >
              {value}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="left" position="bottom" width={180}>
            <DropdownMenuSection>
              {STATUS_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  label={option.value}
                  iconName={option.iconName}
                  active={value === option.value}
                  onClick={() => {
                    handleStatusChange(row.id, option.value);
                    setOpenStatusRowId(null);
                  }}
                />
              ))}
            </DropdownMenuSection>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
    { key: "revenue", label: "Revenue", sortable: true, width: "140px" },
    { key: "owner", label: "Owner", width: "200px" },
    {
      key: "priority",
      label: "Priority",
      type: "chip",
      width: "140px",
      chipProps: { chevron: false, removable: false },
    },
    { key: "tags", label: "Tags", type: "badges", width: "220px", maxVisible: 2 },
    {
      key: "stage",
      label: "Stage",
      type: "text-icon",
      width: "170px",
      textIconProps: { style: { color: "var(--color-content-secondary)" } },
    },
    { key: "isActive", label: "Active", type: "checkbox", width: "110px" },
    { key: "notes", label: "Notes", type: "text-input", width: "220px" },
    { key: "action", label: "Actions", type: "button", width: "88px", sticky: true },
  ];

  return (
    <Hub
      title="Opportunities"
      badge={String(hubRows.length)}
      menuVariant="deal"
      columns={hubColumns}
      data={hubRows}
      showPagination={true}
      totalItems={hubRows.length}
      headerActions={<Button variant="primary" size="md">Create</Button>}
      emptyMessage="No records"
    />
  );
};

/* ===========================================
   SIDE PANEL TEST
   =========================================== */
const SidePanelTest = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "var(--color-general-neutral-light)" }}>
      {/* Simulated page background */}
      <div style={{ padding: "var(--spacing-6)", borderBottom: "1px solid var(--color-action-outline-secondary-enabled)", background: "var(--color-general-white)" }}>
        <h2 style={{ margin: 0, fontFamily: "var(--font-family-primary)", fontSize: "var(--text-heading-h2)", fontWeight: "var(--font-weight-bold)", color: "var(--color-content-primary)" }}>
          Side Panel Template Test
        </h2>
      </div>
      <div style={{ padding: "var(--spacing-6)", display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
        <p style={{ margin: 0, fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-lg)", color: "var(--color-content-secondary)" }}>
          Click a row below to open the side panel.
        </p>
        <div style={{ background: "var(--color-general-white)", border: "1px solid var(--color-action-outline-secondary-enabled)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
          {HUB_TEST_DATA.map((row, i) => (
            <button
              key={row.id}
              onClick={() => setIsOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-4)",
                width: "100%",
                padding: "var(--spacing-4) var(--spacing-6)",
                borderBottom: i < HUB_TEST_DATA.length - 1 ? "1px solid var(--color-action-outline-secondary-enabled)" : "none",
                background: "none",
                border: "none",
                borderBottom: i < HUB_TEST_DATA.length - 1 ? "1px solid var(--color-action-outline-secondary-enabled)" : "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "var(--font-family-primary)",
                fontSize: "var(--text-body-lg)",
                color: "var(--color-content-primary)",
              }}
            >
              <span style={{ flex: 1 }}>{row.name?.label || "-"}</span>
              <Badge color={row.status === "Active" ? "positive" : "warning"}>{row.status}</Badge>
              <span style={{ color: "var(--color-content-secondary)" }}>{row.revenue}</span>
            </button>
          ))}
        </div>
      </div>

      <SidePanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(false)}
        title="ALLINPART Initiative"
        titleIconName="Briefcase"
        meta={{ label: "Last updated on", date: "Jan 15, 2024", author: "Emma Dupont" }}
        subinfoItems={[
          { label: "Owner", value: "Emma Dupont" },
          { label: "Status", value: "In Progress" },
          { label: "Budget", value: "$2.4M" },
        ]}
        steps={[{ title: "Draft" }, { title: "Review" }, { title: "Approved" }, { title: "Active" }]}
        currentStep={1}
        sections={[
          {
            id: "details",
            title: "General Information",
            defaultExpanded: true,
            content: (
              <InfofieldGroup columns={2}>
                <Infofield label="Reference" value="INIT-2024-001" />
                <Infofield label="Category" value="Alliance" />
                <Infofield label="Start Date" value="Feb 1, 2024" />
                <Infofield label="End Date" value="Dec 31, 2024" />
              </InfofieldGroup>
            ),
          },
          {
            id: "team",
            title: "Team",
            defaultExpanded: false,
            content: (
              <InfofieldGroup columns={1}>
                <Infofield label="Lead" value="Emma Dupont" />
                <Infofield label="Analyst" value="Thomas Bernard" />
              </InfofieldGroup>
            ),
          },
        ]}
      />
    </div>
  );
};

/* ===========================================
   ROUTER
   =========================================== */
const RouterApp = () => {
  const [path, setPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    if (window.location.pathname === "/") {
      window.history.replaceState({}, "", "/library");
      setPath("/library");
      return;
    }

    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (path === "/test" || path === "/hub") {
    return <HubTemplateTestPage />;
  }

  if (path === "/object-page") {
    return <ObjectPageTest />;
  }

  if (path === "/document-viewer-page") {
    return <DocumentViewerPageTest />;
  }

  if (path === "/side-panel") {
    return <SidePanelTest />;
  }

  return <ComponentLibraryDemo />;
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterApp />
  </React.StrictMode>
);
