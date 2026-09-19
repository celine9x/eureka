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
  ObjectHeaderTitleSection,
  ObjectHeaderMeta,
  ObjectHeaderTitle,
  ObjectHeaderSubinfoRow,
  ObjectHeaderSubinfoItem,
  ObjectHeaderStepperSection,
  ObjectHeaderTabsSection,
  ObjectHeaderBackButton,
} from "../organisms/object-header.jsx";
import { Accordion } from "../molecules/accordion.jsx";
import { Tabs, Tab } from "@/library/molecules/tabs";

const OBJECT_PAGE_MENU_VARIANTS = {
  default: "default",
  deal: "deal",
};

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
      flex: 0 0 80px;
      width: 80px;
      min-width: 80px;
      flex-shrink: 0;
    }
    .object-page__main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--color-general-neutral-light);
      position: relative;
    }
    .object-page__scroll-container {
      flex: 1;
      overflow-y: auto;
    }
    .object-page__header {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      column-gap: var(--spacing-6);
      padding: 0 var(--spacing-6);
    }
    .object-page__header > * {
      grid-column: 2 / span 10;
    }
    .object-page__body {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      column-gap: var(--spacing-6);
      padding: var(--spacing-6);
      align-content: start;
    }
    .object-page__container {
      grid-column: 2 / span 10;
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: var(--spacing-6);
    }
    .object-page__content {
      display: contents;
    }
    .object-page__content--single .object-page__column {
      grid-column: span 12;
    }
    .object-page__column {
      grid-column: span 6;
    }
    .object-page__column-inner {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
    }
    .object-page__section {
   
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
  menuVariant = OBJECT_PAGE_MENU_VARIANTS.deal,
  menuCollapsedLogoSrc,
  menuExpandOnHover,
  menuVariantState,
  menuSections = [],
  menuActiveItemId,
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
  const contentClasses = singleColumn ? "object-page__content--single" : "";

  const hasCustomMenuSections = Array.isArray(menuSections) && menuSections.length > 0;
  const isDealMenuVariant = menuVariant === OBJECT_PAGE_MENU_VARIANTS.deal;
  const resolvedMenuSections = hasCustomMenuSections ? menuSections : [];
  const resolvedMenuVariant = menuVariantState || (isDealMenuVariant ? "collapsed" : undefined);
  const resolvedMenuExpandOnHover =
    typeof menuExpandOnHover === "boolean"
      ? menuExpandOnHover
      : isDealMenuVariant;

  // Render accordion sections
  const renderSections = (sections) => {
    return sections.map((section, index) => (
      <Accordion
        key={section.id || index}
        title={section.title}
        defaultExpanded={section.defaultExpanded}
        actionLabel={section.actionLabel}
        onActionClick={section.onActionClick}
        size={section.size || "lg"}
      >
        {section.content}
      </Accordion>
    ));
  };

  // Default back button
  const defaultTopBarLeft = <ObjectHeaderBackButton onClick={onBack} />;

  return (
    <div className={classes} {...props}>
      {/* Side Menu */}
      <div className="object-page__sidebar">
        <SideMenu
          position="fixed"
          variant={resolvedMenuVariant}
          expandOnHover={resolvedMenuExpandOnHover}
          logoSrc={logoSrc}
          collapsedLogoSrc={menuCollapsedLogoSrc}
          sections={resolvedMenuSections}
          defaultActiveItemId={menuActiveItemId}
          user={menuUser}
          onCreateClick={onMenuCreate}
          onSearchChange={onMenuSearch}
        />
      </div>

      {/* Main Content */}
      <div className="object-page__main">
        {/* Scrollable Content */}
        <div className="object-page__scroll-container">
          {/* Object Header - scrolls with content */}
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
                <ObjectHeaderTitle>
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
                <ObjectHeaderStepperSection steps={steps} currentStep={currentStep} />
              )}

              {/* Tabs */}
              {tabs && (
                <ObjectHeaderTabsSection>
                  {tabs}
                </ObjectHeaderTabsSection>
              )}
            </ObjectHeader>
          </div>

          {/* Body with Two Columns */}
          <div className="object-page__body">
            {children || (
              <div className={`object-page__container ${contentClasses}`}>
                {/* Left Column */}
                <div className="object-page__column">
                  <div className="object-page__column-inner">
                    {leftColumnContent || renderSections(leftColumnSections)}
                  </div>
                </div>

                {/* Right Column */}
                {!singleColumn && (
                  <div className="object-page__column">
                    <div className="object-page__column-inner">
                      {rightColumnContent || renderSections(rightColumnSections)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ObjectPage.displayName = "ObjectPage";
ObjectPage.menuVariants = OBJECT_PAGE_MENU_VARIANTS;

ObjectPage.SideMenu = SideMenu;
ObjectPage.Header = ObjectHeader;
ObjectPage.HeaderTopBar = ObjectHeader.TopBar;
ObjectPage.HeaderTopBarLeft = ObjectHeader.TopBarLeft;
ObjectPage.HeaderTopBarRight = ObjectHeader.TopBarRight;
ObjectPage.HeaderTitleSection = ObjectHeader.TitleSection;
ObjectPage.HeaderMeta = ObjectHeader.Meta;
ObjectPage.HeaderTitle = ObjectHeader.Title;
ObjectPage.HeaderSubinfoRow = ObjectHeader.SubinfoRow;
ObjectPage.HeaderSubinfoItem = ObjectHeader.SubinfoItem;
ObjectPage.HeaderStepper = ObjectHeader.StepperSection;
ObjectPage.HeaderTabs = ObjectHeader.TabsSection;
ObjectPage.Tabs = Tabs;
ObjectPage.Tab = Tab;
ObjectPage.Stepper = ObjectHeader.Stepper;
ObjectPage.Accordion = Accordion;
ObjectPage.Button = ObjectHeader.Button;
ObjectPage.Icon = ObjectHeader.Icon;

export default ObjectPage;
