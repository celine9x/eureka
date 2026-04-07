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
import { Checkbox } from "./library/atoms/checkbox.jsx";
import { TextInput } from "./library/molecules/text-input.jsx";
import { RadioCard, RadioCardGroup } from "./library/molecules/radio-card.jsx";
import { ButtonGroup, ButtonGroupItem } from "./library/molecules/button-group.jsx";
import { Stepper } from "./library/molecules/stepper.jsx";
import { ChipInput } from "./library/molecules/chip-input.jsx";
import { Infofield, InfofieldGroup } from "./library/molecules/infofield.jsx";
import { Modal } from "./library/organisms/modal.jsx";
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
   AI OPPORTUNITY EXTRACTION PAGE
   =========================================== */
const AI_OPPORTUNITY_DATA = [
  {
    id: 1,
    name: { label: "Acme Corp - Cloud Migration", href: "#", iconLeadingName: "BuildingOffice2" },
    status: "Active",
    confidence: "High",
    value: "$320K",
    owner: "Emma Dupont",
    source: "Email",
    tags: [{ label: "Cloud" }, { label: "Q2" }],
    action: { iconName: "EllipsisVertical", iconOnly: true, ariaLabel: "Row actions" },
  },
  {
    id: 2,
    name: { label: "Blue Sky - Data Platform", href: "#", iconLeadingName: "BuildingOffice2" },
    status: "Pending",
    confidence: "Medium",
    value: "$180K",
    owner: "Thomas Bernard",
    source: "CRM",
    tags: [{ label: "Data" }, { label: "Q3" }],
    action: { iconName: "EllipsisVertical", iconOnly: true, ariaLabel: "Row actions" },
  },
  {
    id: 3,
    name: { label: "North Star - AI Expansion", href: "#", iconLeadingName: "BuildingOffice2" },
    status: "Active",
    confidence: "High",
    value: "$540K",
    owner: "Sophie Martin",
    source: "Meeting Notes",
    tags: [{ label: "AI" }, { label: "Strategic" }],
    action: { iconName: "EllipsisVertical", iconOnly: true, ariaLabel: "Row actions" },
  },
];

const ASSET_TYPES = [
  {
    value: "pharma",
    label: "Pharma asset",
    description: "Molecules or products aimed at licensing or collaboration projects",
    iconName: "Beaker",
  },
  {
    value: "technology",
    label: "Technology",
    description: "Digital health, medical devices or other technology solutions",
    iconName: "CpuChip",
  },
  {
    value: "organization",
    label: "Organization asset",
    description: "Potential partners for out-licensing, M&A, investment, or landscaping",
    iconName: "BuildingOffice2",
  },
  {
    value: "consumer",
    label: "Consumer health asset",
    description: "Consumer health molecules, products, ingredients or technologies",
    iconName: "Heart",
  },
];

const styles = {
  modalWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-4)",
  },
  sectionTitle: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-heading-h3)",
    lineHeight: "var(--line-height-heading-h3)",
    fontWeight: "var(--font-weight-bold)",
    color: "var(--color-content-primary)",
  },
  fieldLabel: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-primary)",
  },
  required: {
    color: "var(--color-content-negative)",
  },
  optional: {
    color: "var(--color-content-secondary)",
    marginLeft: "var(--spacing-xs)",
  },
  infoBanner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-3)",
    borderRadius: "var(--radius-md)",
    background: "var(--color-general-informative)",
    padding: "var(--spacing-4)",
    boxSizing: "border-box",
  },
  infoText: {
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    lineHeight: "var(--line-height-body-lg)",
    color: "var(--color-content-primary)",
  },
  helperRow: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-sm)",
    lineHeight: "var(--line-height-body-sm)",
  },
  selectShell: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-3)",
    borderRadius: "var(--radius-md)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    background: "var(--color-general-white)",
    padding: "var(--spacing-sm) var(--spacing-4)",
    minHeight: 40,
    boxSizing: "border-box",
  },
  selectLeft: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
    color: "var(--color-content-tertiary)",
    minWidth: 0,
  },
  selectText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  documentList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "var(--spacing-sm)",
  },
  documentChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
    padding: "var(--spacing-xs) var(--spacing-sm)",
    borderRadius: "var(--radius-sm)",
    background: "var(--color-general-neutral-lighter)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
  },
  iconButton: {
    border: "none",
    background: "transparent",
    width: 20,
    height: 20,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    cursor: "pointer",
    color: "var(--color-content-secondary)",
  },
};

const CreateOpportunityModal = ({ open, onClose }) => {
  const [mode, setMode] = React.useState("manual");
  const [manualStep, setManualStep] = React.useState(1);
  const [selectedAssetType, setSelectedAssetType] = React.useState("pharma");
  const [rememberChoice, setRememberChoice] = React.useState(false);
  const [documents, setDocuments] = React.useState([{ id: "seed-doc", name: "Deck.pdf" }]);
  const fileInputRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    setMode("manual");
    setManualStep(1);
    setSelectedAssetType("pharma");
    setRememberChoice(false);
    setDocuments([{ id: "seed-doc", name: "Deck.pdf" }]);
  }, [open]);

  const selectedAssetLabel = ASSET_TYPES.find((item) => item.value === selectedAssetType)?.label || "-";

  const handleFilePicked = (event) => {
    const fileList = Array.from(event.target?.files || []);
    if (!fileList.length) return;

    const nextDocs = fileList.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
    }));

    setDocuments((prev) => [...prev, ...nextDocs]);
    event.target.value = "";
  };

  const removeDocument = (id) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const manualStepOne = (
    <div style={styles.modalWrap}>
      <Stepper variant="progress" totalSteps={2} currentStep={0} />

      <h3 style={styles.sectionTitle}>Classification</h3>
      <p style={styles.fieldLabel}>
        Asset type <span style={styles.required}>*</span>
      </p>

      <RadioCardGroup value={selectedAssetType} onChange={setSelectedAssetType}>
        {ASSET_TYPES.map((asset) => (
          <RadioCard
            key={asset.value}
            value={asset.value}
            label={asset.label}
            info={asset.description}
            icon={<Icon name={asset.iconName} size="md" />}
            hideControl
          />
        ))}
      </RadioCardGroup>

      <Checkbox isSelected={rememberChoice} onChange={setRememberChoice}>
        Remember my choice
      </Checkbox>
    </div>
  );

  const manualStepTwo = (
    <div style={styles.modalWrap}>
      <Stepper variant="progress" totalSteps={2} currentStep={1} />

      <h3 style={styles.sectionTitle}>Information</h3>

      <div style={styles.infoBanner}>
        <p style={styles.infoText}>
          You are currently evaluating: <strong>{selectedAssetLabel}</strong>
        </p>
        <Button variant="secondary" size="sm" onClick={() => setManualStep(1)}>Change</Button>
      </div>

      <TextInput label="Company" isRequired placeholder="Select or create company" />

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
        <p style={styles.fieldLabel}>
          Asset <span style={styles.required}>*</span>
        </p>
        <div style={styles.selectShell}>
          <div style={styles.selectLeft}>
            <Icon name="MagnifyingGlass" size="sm" />
            <span style={styles.selectText}>Select or create asset</span>
          </div>
        </div>
        <div style={styles.helperRow}>
          <Icon name="InformationCircle" size="sm" />
          <span>Select company first</span>
        </div>
      </div>

      <TextInput label="Opportunity name" isRequired placeholder="Name your opportunity" />

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
        <p style={styles.fieldLabel}>
          Opportunity type <span style={styles.optional}>Optional</span>
        </p>
        <div style={styles.selectShell}>
          <div style={styles.selectLeft}>
            <span style={styles.selectText}>Select opportunity type</span>
          </div>
          <Icon name="ChevronDown" size="sm" />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
        <p style={styles.fieldLabel}>
          Initiative <span style={styles.required}>*</span>
        </p>
        <div style={styles.selectShell}>
          <div style={styles.selectLeft}>
            <span style={styles.selectText}>Select initiative</span>
          </div>
          <Icon name="ChevronDown" size="sm" />
        </div>
      </div>
    </div>
  );

  const aiContent = (
    <div style={styles.modalWrap}>
      <ChipInput
        label="Select document"
        placeholder="Upload and select documents"
        chips={documents.map((doc) => ({ id: doc.id, label: doc.name }))}
        onChange={(chips) => {
          setDocuments(chips.map((chip) => ({ id: chip.id, name: chip.label })));
        }}
        onChipRemove={(chipId) => removeDocument(chipId)}
        onClear={() => setDocuments([])}
        onDropdownClick={() => fileInputRef.current?.click()}
        showDropdown
        showClear
      />

      <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()} iconLeading={<Icon name="ArrowUpTray" size="sm" />}>
        Upload documents
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={handleFilePicked}
      />
    </div>
  );

  const showManual = mode === "manual";
  const isManualStepOne = showManual && manualStep === 1;
  const isManualStepTwo = showManual && manualStep === 2;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create opportunity"
      size="lg"
      style={{ maxWidth: "600px" }}
      tertiaryLabel={showManual ? (isManualStepOne ? "Cancel" : "Back") : "Cancel"}
      onTertiaryClick={
        isManualStepOne
          ? onClose
          : () => {
              if (showManual) {
                setManualStep(1);
              } else {
                onClose();
              }
            }
      }
      secondaryLabel={isManualStepTwo ? "Create" : undefined}
      onSecondaryClick={onClose}
      primaryLabel={showManual ? (isManualStepOne ? "Next" : "Create and open") : "Extract"}
      onPrimaryClick={() => {
        if (showManual && isManualStepOne) {
          setManualStep(2);
          return;
        }
        onClose();
      }}
      primaryDisabled={!showManual && documents.length === 0}
    >
      <div style={styles.modalWrap}>
        <ButtonGroup value={mode} onChange={setMode} style={{ width: "100%", display: "flex" }}>
          <ButtonGroupItem value="manual" style={{ flex: 1, justifyContent: "center" }}>Create manually</ButtonGroupItem>
          <ButtonGroupItem value="ai" style={{ flex: 1, justifyContent: "center" }}>Create with AI</ButtonGroupItem>
        </ButtonGroup>

        {showManual ? (isManualStepOne ? manualStepOne : manualStepTwo) : aiContent}
      </div>
    </Modal>
  );
};

const AiOpportunityExtractionPage = () => {
  const [rows] = React.useState(AI_OPPORTUNITY_DATA);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);

  const columns = [
    { key: "name", label: "Opportunity", type: "link", sortable: true, width: "280px" },
    { key: "status", label: "Status", type: "chip", width: "140px", chipProps: { chevron: false, removable: false } },
    { key: "confidence", label: "Confidence", type: "chip", width: "140px", chipProps: { chevron: false, removable: false } },
    { key: "value", label: "Est. Value", sortable: true, width: "140px" },
    { key: "owner", label: "Owner", width: "180px" },
    { key: "source", label: "Source", width: "160px" },
    { key: "tags", label: "Tags", type: "badges", width: "200px", maxVisible: 2 },
    { key: "action", label: "Actions", type: "button", width: "88px", sticky: true },
  ];

  return (
    <>
      <Hub
        title="Opportunities"
        badge={String(rows.length)}
        menuVariant="deal"
        columns={columns}
        data={rows}
        showPagination={true}
        totalItems={rows.length}
        headerActions={<Button variant="primary" iconLeading={<Icon name="Plus" size="sm" />} size="md" onClick={() => setIsCreateModalOpen(true)}>Create</Button>}
        emptyMessage="No opportunities found"
      />
      <CreateOpportunityModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </>
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

  if (path === "/ai-opportunity-extraction") {
    return <AiOpportunityExtractionPage />;
  }

  return <ComponentLibraryDemo />;
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterApp />
  </React.StrictMode>
);
