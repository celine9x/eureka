/**
 * SidePanel Template
 *
 * A slide-in side panel triggered by clicking a table row (or any action).
 * Shows an ObjectHeader at the top, single-column accordions in the body,
 * and an "Open" button to expand to a full ObjectPage.
 *
 * @example
 * <SidePanel
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onOpen={() => { setIsOpen(false); setFullPageOpen(true); }}
 *   title="Initiative Name"
 *   meta={{ label: "Updated", date: "Jan 15, 2024" }}
 *   subinfoItems={[{ label: "Owner", value: "Emma" }]}
 *   sections={[
 *     { id: "details", title: "Details", defaultExpanded: true, content: <DetailsForm /> },
 *   ]}
 * />
 */

import React, { useEffect, useRef } from "react";
import { Portal } from "../utils/portal.jsx";
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
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";

/* ===========================================
   STYLE CONFIGURATION
   =========================================== */

const styles = `
  .side-panel-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 400;
    opacity: 0;
    transition: opacity 300ms ease;
    pointer-events: none;
  }
  .side-panel-overlay.visible {
    opacity: 1;
    pointer-events: auto;
  }
  .side-panel {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 520px;
    max-width: 100vw;
    z-index: 401;
    background: var(--color-general-white);
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform 300ms cubic-bezier(0.32, 0, 0.15, 1);
    will-change: transform;
  }
  .side-panel.open {
    transform: translateX(0);
  }
  .side-panel__header {
    flex-shrink: 0;
    background: var(--color-general-white);
    border-bottom: 1px solid var(--color-action-outline-secondary-enabled);
    padding: 0 var(--spacing-6);
  }
  .side-panel__body {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-4) var(--spacing-6);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3);
    background: var(--color-general-neutral-light);
  }
  .side-panel__section {
    background: var(--color-general-white);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-action-outline-secondary-enabled);
    overflow: hidden;
  }
`;

/* ===========================================
   STYLE INJECTION (SSR-safe)
   =========================================== */

let sidePanelStylesInjected = false;

const injectStyles = () => {
  if (sidePanelStylesInjected || typeof document === "undefined") return;

  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-eureka", "side-panel-template");
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);
  sidePanelStylesInjected = true;
};

/* ===========================================
   SIDEPANEL COMPONENT
   =========================================== */

/**
 * SidePanel
 *
 * Slides in from the right with an overlay. Renders via a Portal so it
 * always sits above all page content regardless of DOM nesting.
 *
 * Props:
 * - isOpen {boolean}              — controls visibility + animation
 * - onClose {function}            — called when the × button or overlay is clicked
 * - onOpen {function}             — called when the "Open" button is clicked (navigate to full page)
 * - title {string}                — object title shown in the header
 * - titleIconName {string}        — optional Heroicon name for the title icon
 * - titleIconVariant {string}     — icon variant ("outline" | "fill")
 * - meta {object}                 — { label, date, author } for the meta line
 * - subinfoItems {array}          — [{label, value, iconName?, href?}]
 * - steps {array}                 — [{title, subtitle?}] for the stepper
 * - currentStep {number}          — active step index
 * - tabs {array}                  — [{id, label, badge?}] for optional tabs
 * - activeTab {string}            — selected tab id
 * - onTabChange {function}        — called with new tab id
 * - topBarLeft {ReactNode}        — extra content in the top-bar left slot (before Open button)
 * - topBarRight {ReactNode}       — extra content in the top-bar right slot (before close button)
 * - sections {array}              — [{id, title, defaultExpanded, actionLabel, onActionClick, content}]
 * - openButtonLabel {string}      — label for the expand button (default "Open")
 * - className {string}
 */
export const SidePanel = ({
  isOpen = false,
  onClose,
  onOpen,
  // Header – title
  title = "Object",
  titleIconName,
  titleIconVariant,
  // Header – meta / subinfo
  meta,
  subinfoItems = [],
  // Header – stepper
  steps = [],
  currentStep = 0,
  // Header – tabs
  tabs,
  activeTab,
  onTabChange,
  // Top bar extra slots
  topBarLeft,
  topBarRight,
  // Body sections (single-column accordions)
  sections = [],
  // Open button
  openButtonLabel = "Open",
  className = "",
  ...props
}) => {
  injectStyles();

  const panelRef = useRef(null);

  // Trap focus inside panel when open; restore on close
  useEffect(() => {
    if (isOpen && panelRef.current) {
      const firstFocusable = panelRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }
  }, [isOpen]);

  // Prevent body scroll when panel is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose?.();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const hasMeta = meta && (meta.label || meta.date || meta.author);
  const hasSubinfo = Array.isArray(subinfoItems) && subinfoItems.length > 0;
  const hasSteps = Array.isArray(steps) && steps.length > 0;
  const hasTabs = Array.isArray(tabs) && tabs.length > 0;

  const panelClasses = ["side-panel", isOpen && "open", className].filter(Boolean).join(" ");
  const overlayClasses = ["side-panel-overlay", isOpen && "visible"].filter(Boolean).join(" ");

  return (
    <Portal containerId="side-panel-portal">
      {/* Overlay */}
      <div
        className={overlayClasses}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={panelClasses}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        {...props}
      >
        {/* Header */}
        <div className="side-panel__header">
          <ObjectHeader>
            <ObjectHeaderTopBar>
              <ObjectHeaderTopBarLeft>
                {topBarLeft}
                {onOpen && (
                  <Button
                    variant="secondary"
                    size="sm"
                    iconLeading={<Icon name="ArrowTopRightOnSquare" size="sm" />}
                    onClick={onOpen}
                  >
                    {openButtonLabel}
                  </Button>
                )}
              </ObjectHeaderTopBarLeft>

              <ObjectHeaderTopBarRight>
                {topBarRight}
                <Button
                  variant="tertiary"
                  size="sm"
                  iconOnly
                  ariaLabel="Close panel"
                  onClick={onClose}
                >
                  <Icon name="XMark" size="sm" />
                </Button>
              </ObjectHeaderTopBarRight>
            </ObjectHeaderTopBar>

            <ObjectHeaderTitleSection>
              <ObjectHeaderTitle
                iconName={titleIconName}
                iconVariant={titleIconVariant}
              >
                {title}
              </ObjectHeaderTitle>

              {hasMeta && (
                <ObjectHeaderMeta
                  label={meta.label}
                  date={meta.date}
                  author={meta.author}
                />
              )}
            </ObjectHeaderTitleSection>

            {hasSubinfo && (
              <ObjectHeaderSubinfoRow>
                {subinfoItems.map((item, index) => (
                  <ObjectHeaderSubinfoItem
                    key={item.id || index}
                    label={item.label}
                    value={item.value}
                    iconName={item.iconName}
                    href={item.href}
                    variant={item.variant}
                    initials={item.initials}
                    items={item.items}
                  />
                ))}
              </ObjectHeaderSubinfoRow>
            )}

            {hasSteps && (
              <ObjectHeaderStepper steps={steps} currentStep={currentStep} />
            )}

            {hasTabs && (
              <ObjectHeaderTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={onTabChange}
              />
            )}
          </ObjectHeader>
        </div>

        {/* Body — single-column accordions */}
        <div className="side-panel__body">
          {sections.map((section, index) => (
            <div key={section.id || index} className="side-panel__section">
              <Accordion
                title={section.title}
                defaultExpanded={section.defaultExpanded !== false}
                actionLabel={section.actionLabel}
                onActionClick={section.onActionClick}
                size={section.size || "md"}
              >
                {section.content}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </Portal>
  );
};

export default SidePanel;
