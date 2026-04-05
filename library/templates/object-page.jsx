/**
 * ObjectPage Template
 *
 * A complete detail page layout template combining SideMenu, ObjectHeader,
 * and a two-column content area with Accordions.
 * Use this as a starting point for object/detail pages in your application.
 */

import React from "react";
import { SideMenu } from "../organisms/side-menu/side-menu.jsx";
import {
  ObjectHeader,
  ObjectHeaderTopBar,
  ObjectHeaderTopBarLeft,
  ObjectHeaderTopBarRight,
  ObjectHeaderMeta,
  ObjectHeaderTitleSection,
  ObjectHeaderTitle,
  ObjectHeaderSubinfoRow,
  ObjectHeaderSubinfoItem,
  ObjectHeaderStepper,
  ObjectHeaderTabs,
} from "../organisms/object-header.jsx";
import { Accordion } from "../molecules/accordion.jsx";
import { Stepper } from "../molecules/stepper.jsx";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";

/* ===========================================
   STYLE CONFIGURATION
   =========================================== */

const styles = {
  base: `
    .object-page {
      display: flex;
      height: 100vh;
      width: 100%;
      overflow: hidden;
    }
    .object-page__sidebar {
      flex-shrink: 0;
    }
    .object-page__main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--color-general-neutral-light);
    }
    .object-page__header {
      flex-shrink: 0;
      background: var(--color-general-white);
      border-bottom: 1px solid var(--color-action-outline-secondary-enabled);
      padding: 0 var(--spacing-6);
    }
    .object-page__body {
      flex: 1;
      overflow-y: auto;
      padding: var(--spacing-6);
    }
    .object-page__content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--spacing-6);
    }
    .object-page__content--single {
      grid-template-columns: 1fr;
    }
    .object-page__column {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
    }
    .object-page__section {
      background: var(--color-general-white);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-action-outline-secondary-enabled);
      overflow: hidden;
    }
    .object-page__section-content {
      padding: var(--spacing-6);
    }
  `,
};

/* ===========================================
   STYLE INJECTION (SSR-safe)
   =========================================== */

let stylesInjected = false;

const injectStyles = () => {
  if (stylesInjected || typeof document === "undefined") return;

  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-eureka", "object-page-template");
  styleEl.textContent = styles.base;
  document.head.appendChild(styleEl);
  stylesInjected = true;
};

/* ===========================================
   OBJECTPAGE TEMPLATE COMPONENT
   =========================================== */

/**
 * ObjectPage
 *
 * A complete object/detail page template with sidebar navigation, object header,
 * and two-column content area with accordions.
 *
 * @example
 * <ObjectPage
 *   title="Initiative Name"
 *   titleIconName="ExclamationTriangle"
 *   titleIconVariant="warning"
 *   meta={{ label: "Last updated on", date: "Jan 15, 2024", author: "Emma" }}
 *   subinfoItems={[
 *     { label: "Owner", value: "Emma Dupont" },
 *     { label: "Status", value: "In Progress" },
 *   ]}
 *   steps={[{ title: "Draft" }, { title: "Review" }, { title: "Approved" }]}
 *   currentStep={1}
 *   onBack={() => navigate(-1)}
 *   leftColumnSections={[
 *     { title: "Details", content: <DetailsForm />, defaultExpanded: true },
 *     { title: "History", content: <HistoryList /> },
 *   ]}
 *   rightColumnSections={[
 *     { title: "Related Items", content: <RelatedItems /> },
 *   ]}
 * />
 */
export const ObjectPage = ({
  // Title props
  title = "Object",
  titleIcon,
  titleIconName,
  titleIconVariant,
  // Meta props
  meta,
  subinfoItems = [],
  steps = [],
  currentStep = 0,
  tabs,
  // Top bar props
  topBarLeft,
  topBarRight,
  onBack,
  // Menu props
  menuSections = [],
  menuUser,
  logoSrc,
  onMenuCreate,
  onMenuSearch,
  // Content props
  leftColumnSections = [],
  rightColumnSections = [],
  leftColumnContent,
  rightColumnContent,
  singleColumn = false,
  children,
  // General
  className = "",
  ...props
}) => {
  injectStyles();

  const classes = ["object-page", className].filter(Boolean).join(" ");

  const contentClasses = [
    "object-page__content",
    singleColumn && "object-page__content--single",
  ].filter(Boolean).join(" ");

  // Render accordion sections
  const renderSections = (sections) => {
    return sections.map((section, index) => (
      <Accordion
        key={section.id || index}
        title={section.title}
        defaultExpanded={section.defaultExpanded}
        actionLabel={section.actionLabel}
        onActionClick={section.onActionClick}
        size={section.size || "md"}
      >
        {section.content}
      </Accordion>
    ));
  };

  // Default back button
  const defaultTopBarLeft = (
    <Button
      variant="secondary"
      size="md"
      iconLeading={<Icon name="ArrowLeft" size="sm" />}
      onClick={onBack}
    >
      Back
    </Button>
  );

  return (
    <div className={classes} {...props}>
      {/* Side Menu */}
      <div className="object-page__sidebar">
        <SideMenu
          logoSrc={logoSrc}
          sections={menuSections}
          user={menuUser}
          onCreateClick={onMenuCreate}
          onSearchChange={onMenuSearch}
        />
      </div>

      {/* Main Content */}
      <div className="object-page__main">
        {/* Object Header */}
        <div className="object-page__header">
          <ObjectHeader>
            {/* Top Bar */}
            <ObjectHeaderTopBar>
              <ObjectHeaderTopBarLeft>
                {topBarLeft || defaultTopBarLeft}
              </ObjectHeaderTopBarLeft>
              {topBarRight && (
                <ObjectHeaderTopBarRight>
                  {topBarRight}
                </ObjectHeaderTopBarRight>
              )}
            </ObjectHeaderTopBar>

            {/* Title Section */}
            <ObjectHeaderTitleSection>
              {meta && (
                <ObjectHeaderMeta
                  label={meta.label}
                  date={meta.date}
                  time={meta.time}
                  author={meta.author}
                />
              )}
              <ObjectHeaderTitle
                icon={titleIcon}
                iconName={titleIconName}
                iconVariant={titleIconVariant}
              >
                {title}
              </ObjectHeaderTitle>
            </ObjectHeaderTitleSection>

            {/* Subinfo Row */}
            {subinfoItems.length > 0 && (
              <ObjectHeaderSubinfoRow>
                {subinfoItems.map((item, index) => (
                  <ObjectHeaderSubinfoItem key={item.id || index}>
                    {item.component || (
                      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-1)" }}>
                        <span style={{ fontSize: "var(--text-body-caption)", color: "var(--color-content-secondary)" }}>
                          {item.label}
                        </span>
                        <span style={{ fontSize: "var(--text-body-md)", color: "var(--color-content-primary)" }}>
                          {item.value}
                        </span>
                      </div>
                    )}
                  </ObjectHeaderSubinfoItem>
                ))}
              </ObjectHeaderSubinfoRow>
            )}

            {/* Stepper */}
            {steps.length > 0 && (
              <ObjectHeaderStepper>
                <Stepper steps={steps} currentStep={currentStep} />
              </ObjectHeaderStepper>
            )}

            {/* Tabs */}
            {tabs && (
              <ObjectHeaderTabs>
                {tabs}
              </ObjectHeaderTabs>
            )}
          </ObjectHeader>
        </div>

        {/* Body with Two Columns */}
        <div className="object-page__body">
          {children || (
            <div className={contentClasses}>
              {/* Left Column */}
              <div className="object-page__column">
                {leftColumnContent || renderSections(leftColumnSections)}
              </div>

              {/* Right Column */}
              {!singleColumn && (
                <div className="object-page__column">
                  {rightColumnContent || renderSections(rightColumnSections)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ObjectPage.displayName = "ObjectPage";

export default ObjectPage;
