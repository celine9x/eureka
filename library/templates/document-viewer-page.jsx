"use client";

/**
 * DocumentViewerPage Template
 *
 * A complete page layout template for document review with side-by-side form.
 * Features a page header, document viewer on the left, form panel on the right,
 * and action buttons at the bottom.
 */

import React from "react";
import { SideMenu } from "../organisms/side-menu/side-menu.jsx";
import { DocumentViewer } from "../organisms/document-viewer/document-viewer.jsx";
import { Button } from "../atoms/button.jsx";
import {
  ObjectHeader,
  ObjectHeaderBackButton,
  ObjectHeaderTopBar,
  ObjectHeaderTopBarLeft,
} from "../organisms/object-header.jsx";
import { createStyleInjector, joinStyles } from "../utils/styles.js";

/* ===========================================
   MENU CONFIGURATION
   =========================================== */

const DEAL_MENU_SECTIONS = [
  {
    items: [
      { label: "Home", iconName: "Home" },
      { label: "Dashboard", iconName: "ChartBar" },
      { label: "Network", iconName: "Share" },
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
  {
    title: "Recent Initiatives",
    items: [
      { label: "ALLINPART", iconColor: "var(--color-content-brand)", iconLetter: "A" },
    ],
  },
];

/* ===========================================
   STYLE CONFIGURATION
   =========================================== */

const styles = {
  base: `
    .document-viewer-page {
      display: flex;
      height: 100%;
      width: 100%;
      background: var(--color-general-neutral-light);
      overflow: hidden;
    }

    .document-viewer-page__sidebar {
      flex: 0 0 80px;
      width: 80px;
      min-width: 80px;
      flex-shrink: 0;
      background: var(--color-general-white);
      border-right: 1px solid var(--color-action-outline-secondary-enabled);
    }

    .document-viewer-page__wrapper {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: hidden;
    }

    .document-viewer-page__header {
      flex: 0 0 auto;
      padding: var(--spacing-6);
      background: var(--color-general-white);
      border-bottom: 1px solid var(--color-action-outline-secondary-enabled);
    }

    .document-viewer-page__header .object-header {
      padding-top: 0;
      gap: 0;
    }

    .document-viewer-page__header .object-header-top-bar {
      padding-bottom: 0;
      border-bottom: none;
    }

    .document-viewer-page__header-title {
      margin: 0;
      color: var(--color-content-primary);
      font-family: var(--font-family-primary);
      font-size: var(--text-heading-h1);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-heading-h1);
    }

    .document-viewer-page__content {
      display: flex;
      flex: 1 1 auto;
      gap: var(--spacing-6);
      padding: var(--spacing-6);
      overflow: hidden;
    }

    .document-viewer-page__viewer-section {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      min-width: 0;
      overflow: hidden;
    }

    .document-viewer-page__form-section {
      flex: 0 0 calc(4 / 12 * 100%);
      display: flex;
      flex-direction: column;
      background: var(--color-general-white);
      border-radius: var(--radius-sm);
      outline: 1px solid var(--color-action-outline-secondary-enabled);
      outline-offset: -1px;
      overflow: hidden;
    }

    .document-viewer-page__form-header {
      flex: 0 0 auto;
      padding: var(--spacing-6);
      border-bottom: 1px solid var(--color-action-outline-secondary-enabled);
      background: var(--color-general-white);
    }

    .document-viewer-page__form-content {
      flex: 1 1 auto;
      padding: var(--spacing-6);
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
    }

    .document-viewer-page__form-footer {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-4);
      padding: var(--spacing-6);
      background: var(--color-general-white);
      border-top: 1px solid var(--color-action-outline-secondary-enabled);
    }

    .document-viewer-page__form-footer-right {
      margin-left: auto;
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-4);
    }

    /* Scrollbar styles */
    .document-viewer-page__form-content::-webkit-scrollbar {
      width: 4px;
    }

    .document-viewer-page__form-content::-webkit-scrollbar-track {
      background: transparent;
    }

    .document-viewer-page__form-content::-webkit-scrollbar-thumb {
      background: var(--color-content-tertiary);
      border-radius: var(--radius-full);
    }
  `,
};

const injectStyles = createStyleInjector("document-viewer-page");

export const DocumentViewerPage = ({
  // Sidebar props
  showSideMenu = true,
  logoSrc,
  collapsedLogoSrc,
  menuUser,
  menuSections,

  // Header props
  headerContent,
  headerTitle,
  backButtonLabel = "Back",
  onBack,

  // Document viewer props
  pdfFile,
  pages,
  text,
  pageSeparator = "\f",
  maxCharactersPerPage = 1800,
  defaultPage = 1,
  defaultZoom = 1,
  minZoom = 0.75,
  maxZoom = 1.5,
  zoomStep = 0.1,
  pageWidth = 598,
  pageHeight = 789,
  pagePadding = 40,
  showToolbar = true,
  exportFileName = "document-preview",

  // Form props
  formHeaderContent,
  formHeaderTitle,
  formContent,
  children,

  // Footer props
  footerButtons,
  showDefaultFooterButtons = false,
  onDiscard,
  onCreate,
  discardLabel = "Discard",
  createLabel = "Create",
  onActionClick,

  // Styling props
  className = "",
  style,
  ...props
}) => {
  injectStyles(joinStyles(styles));

  const resolvedMenuSections = menuSections || DEAL_MENU_SECTIONS;
  const resolvedFooterButtons = Array.isArray(footerButtons)
    ? footerButtons
    : showDefaultFooterButtons
      ? [
          {
            label: discardLabel,
            variant: "secondary",
            color: "secondary-destructive",
            onClick: onDiscard,
          },
          {
            label: createLabel,
            variant: "secondary",
            onClick: onCreate,
          },
        ]
      : [];

  return (
    <div className={`document-viewer-page ${className}`} style={style} {...props}>
      {/* Side Menu */}
      {showSideMenu && (
        <div className="document-viewer-page__sidebar">
          <SideMenu
            position="fixed"
            variant="collapsed"
            expandOnHover={true}
            logoSrc={logoSrc}
            collapsedLogoSrc={collapsedLogoSrc}
            sections={resolvedMenuSections}
            user={menuUser}
          />
        </div>
      )}

      {/* Main Content Wrapper */}
      <div className="document-viewer-page__wrapper">
        {/* Header */}
        {(headerContent || headerTitle) && (
          <div className="document-viewer-page__header">
            {headerContent || (
              <ObjectHeader>
                <ObjectHeaderTopBar>
                  <ObjectHeaderTopBarLeft>
                    <ObjectHeaderBackButton label={backButtonLabel} onClick={onBack} />
                    <h1 className="document-viewer-page__header-title">{headerTitle}</h1>
                  </ObjectHeaderTopBarLeft>
                </ObjectHeaderTopBar>
              </ObjectHeader>
            )}
          </div>
        )}

        {/* Main Content */}
        <div className="document-viewer-page__content">
          {/* Document Viewer Section */}
          <div className="document-viewer-page__viewer-section">
            <DocumentViewer
              pdfFile={pdfFile}
              pages={pages}
              text={text}
              pageSeparator={pageSeparator}
              maxCharactersPerPage={maxCharactersPerPage}
              defaultPage={defaultPage}
              defaultZoom={defaultZoom}
              minZoom={minZoom}
              maxZoom={maxZoom}
              zoomStep={zoomStep}
              pageWidth={pageWidth}
              pageHeight={pageHeight}
              pagePadding={pagePadding}
              showToolbar={showToolbar}
              exportFileName={exportFileName}
            />
          </div>

          {/* Form Section */}
          {(formContent || children || formHeaderContent || formHeaderTitle) && (
            <div className="document-viewer-page__form-section">
              {/* Form Header */}
              {(formHeaderContent || formHeaderTitle) && (
                <div className="document-viewer-page__form-header">
                  {formHeaderContent || <h2>{formHeaderTitle}</h2>}
                </div>
              )}

              {/* Form Content */}
              <div className="document-viewer-page__form-content">
                {formContent || children}
              </div>

              {/* Footer with Actions */}
              {resolvedFooterButtons.length > 0 && (
                <div className="document-viewer-page__form-footer">
                  <Button
                    variant={resolvedFooterButtons[0]?.variant || "secondary"}
                    color={resolvedFooterButtons[0]?.color}
                    size={resolvedFooterButtons[0]?.size || "md"}
                    isDisabled={resolvedFooterButtons[0]?.isDisabled}
                    onClick={(e) => {
                      resolvedFooterButtons[0]?.onClick?.(e);
                      onActionClick?.(0, e);
                    }}
                  >
                    {resolvedFooterButtons[0]?.children || resolvedFooterButtons[0]?.label || "Discard"}
                  </Button>

                  <div className="document-viewer-page__form-footer-right">
                    {resolvedFooterButtons.slice(1).map((button, index) => (
                      <Button
                        key={index + 1}
                        variant={button.variant || "secondary"}
                        color={button.color}
                        size={button.size || "md"}
                        isDisabled={button.isDisabled}
                        onClick={(e) => {
                          button.onClick?.(e);
                          onActionClick?.(index + 1, e);
                        }}
                      >
                        {button.children || button.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentViewerPage;
