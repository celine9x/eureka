"use client";

import React, { useState } from "react";
import { SideMenu } from "../../library/organisms/side-menu/side-menu.jsx";
import {
  HubHeader,
  HubHeaderRow,
  HubHeaderLeft,
  HubHeaderRight,
  HubHeaderActions,
  HubHeaderTitle,
} from "../../library/organisms/hub-header.jsx";
import { Button } from "../../library/atoms/button.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { FileUploader } from "../../library/molecules/file-uploader.jsx";
import { FileUploaded } from "../../library/molecules/file-uploaded.jsx";
import InpartLogo from "../../library/organisms/side-menu/Inpart.svg";
import InpartLogoCollapsed from "../../library/organisms/side-menu/Inpart1.svg";

const dealSections = [
  {
    items: [
      { label: "Home", iconName: "Home" },
      { label: "AI assistant", iconName: "Sparkles" },
      { label: "Dashboard", iconName: "ChartBar" },
      { label: "Network", iconName: "Share" },
    ],
  },
  {
    title: "Workspace",
    items: [
      { label: "Initiatives", iconName: "initiative" },
      { label: "Opportunities", iconName: "opportunity" },
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
  {
    title: "Recent Initiatives",
    items: [{ label: "ALLINPART", iconColor: "var(--color-content-brand)", iconLetter: "A" }],
  },
];

const FILE_TYPE_EXAMPLES = [
  { fileName: "Partner-agreement_draft.docx" },
  { fileName: "Deal-room-photo.png" },
  { fileName: "Term-sheet_signed.pdf" },
  { fileName: "Investor-update_Q3.pptx" },
  { fileName: "Royalty-model_v4.xlsx" },
];

const styles = {
  shell: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    background: "var(--color-general-neutral-light)",
  },
  main: {
    marginLeft: 80,
    width: "calc(100vw - 80px)",
    minWidth: 0,
    height: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    gridTemplateRows: "auto minmax(0, 1fr)",
    columnGap: "var(--spacing-3)",
    rowGap: "var(--spacing-3)",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  hubHeaderWrap: {
    gridColumn: "2 / span 10",
    background: "var(--color-general-neutral-light)",
  },
  content: {
    gridColumn: "2 / span 6",
    minWidth: 0,
    minHeight: 0,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-4)",
    paddingBottom: "var(--spacing-4)",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-3)",
    padding: "var(--spacing-4)",
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-md)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    boxSizing: "border-box",
  },
  cardTitle: {
    margin: 0,
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-highlight-lg)",
    lineHeight: "var(--line-height-highlight-lg)",
  },
  cardSubtitle: {
    margin: 0,
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
  },
  fileRows: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-2)",
  },
};

export const FileUploaderDemoPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  return (
    <div style={styles.shell}>
      <SideMenu
        variant="collapsed"
        expandOnHover
        logoSrc={InpartLogo}
        collapsedLogoSrc={InpartLogoCollapsed}
        showSearch
        searchPlaceholder="Quick search"
        sections={dealSections}
        createButtonLabel="Create"
        user={{
          name: "Linh Nguyen",
          email: "linh.nguyen@inpart.io",
          avatarInitials: "LN",
        }}
        onCreateClick={() => {}}
      />

      <div style={styles.main}>
        <div style={styles.hubHeaderWrap}>
          <HubHeader>
            <HubHeaderRow>
              <HubHeaderLeft>
                <Button variant="secondary" size="sm" iconLeading={<Icon name="ChevronLeft" size="sm" />}>
                  Back
                </Button>
                <HubHeaderTitle size="md">File uploader</HubHeaderTitle>
              </HubHeaderLeft>
              <HubHeaderRight>
                <HubHeaderActions>
                  <Button variant="secondary" size="sm">Save and close</Button>
                </HubHeaderActions>
              </HubHeaderRight>
            </HubHeaderRow>
          </HubHeader>
        </div>

        <div style={styles.content}>
          <div style={styles.card}>
            <div>
              <h3 style={styles.cardTitle}>File uploader</h3>
              <p style={styles.cardSubtitle}>
                Drop files or browse to add them. Each uploaded file renders as a File uploaded row below, with a
                tertiary action to remove it.
              </p>
            </div>

            <FileUploader
              files={uploadedFiles}
              onFilesChange={setUploadedFiles}
              multiple
            />
          </div>

          <div style={styles.card}>
            <div>
              <h3 style={styles.cardTitle}>File uploaded</h3>
              <p style={styles.cardSubtitle}>
                A single uploaded file row, shown standalone for each supported file type icon.
              </p>
            </div>

            <div style={styles.fileRows}>
              {FILE_TYPE_EXAMPLES.map((file) => (
                <FileUploaded
                  key={file.fileName}
                  fileName={file.fileName}
                  onRemove={() => {}}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploaderDemoPage;
