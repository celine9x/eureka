"use client";

/**
 * CreationFormPanel Component (Organism)
 *
 * A panel with sticky header, optional navigation sub-header, scrollable content,
 * and optional sticky footer. Designed for forms with collapsible sections.
 *
 * Uses atoms: Button, Icon
 * Uses molecules: MiniInfobox, TextInput, ChipInput
 *
 * @example
 * <CreationFormPanel
 *   title="Review extraction"
 *   headerButtons={[...]}
 *   infoMessage="Inaccuracies may occur with AI."
 *   showNavigation
 *   navigationTitle="Item name"
 *   currentIndex={1}
 *   totalItems={9}
 *   footerButtons={[...]}
 * >
 *   <CreationFormPanel.Section title="Section 1">
 *     <TextInput label="Field" />
 *   </CreationFormPanel.Section>
 * </CreationFormPanel>
 */

import React, { useState, forwardRef } from "react";
import { Button } from "../../atoms/button.jsx";
import { AiButton } from "../../atoms/ai-button.jsx";
import { Icon } from "../../atoms/icon.jsx";
import { MiniInfobox } from "../../molecules/miniinfobox.jsx";
import { createStyleInjector, joinStyles } from "../../utils/styles.js";

// ─────────────────────────────────────────────
// STYLE CONFIGURATION
// ─────────────────────────────────────────────

const styles = {
  base: `
    .creation-form-panel {
      display: flex;
      flex-direction: column;
      background: var(--color-general-white);
      border-radius: var(--radius-sm);
      outline: 1px solid var(--color-action-outline-secondary-enabled);
      outline-offset: -1px;
      overflow: hidden;
      height: 100%;
    }

    .creation-form-panel__header {
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
      padding: var(--spacing-2) var(--spacing-md) var(--spacing-2);
      background: var(--color-general-white);
      border-bottom: 1px solid var(--color-action-outline-secondary-enabled);
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .creation-form-panel__header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-3);
    }

    .creation-form-panel__title {
      margin: 0;
      font-family: var(--font-family-primary);
      font-size: var(--text-heading-h2);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-heading-h2);
      color: var(--color-content-primary);
    }

    .creation-form-panel__title-group {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-2);
      min-width: 0;
    }

    .creation-form-panel__header-actions {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-2);
      flex-shrink: 0;
    }

    .creation-form-panel__navigation {
      flex: 0 0 auto;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: var(--spacing-2);
      padding: var(--spacing-2) var(--spacing-4);
      background: var(--color-general-white);
      border-bottom: 1px solid var(--color-action-outline-secondary-enabled);
      position: sticky;
      top: 0;
      z-index: 9;
    }

    .creation-form-panel__header + .creation-form-panel__navigation {
      top: auto;
    }

    .creation-form-panel__nav-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--spacing-2);
      width: 100%;
    }

    .creation-form-panel__nav-left {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      min-width: 0;
      flex: 1;
    }

    .creation-form-panel__nav-title {
      margin: 0;
      font-family: var(--font-family-primary);
      font-size: var(--text-body-lg);
      font-weight: var(--font-weight-semibold);
      line-height: var(--line-height-body-lg);
      color: var(--color-content-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
      flex: 1;
    }

    .creation-form-panel__nav-right {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-sm);
      flex-shrink: 0;
    }

    .creation-form-panel__nav-text {
      color: var(--color-content-secondary);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-body-md);
      white-space: nowrap;
    }

    .creation-form-panel__nav-button {
      height: 24px;
      min-width: 24px;
      padding-left: var(--spacing-xs);
      padding-right: var(--spacing-xs);
      border-radius: var(--radius-xs);
    }

    .creation-form-panel__nav-sub-content {
      align-self: flex-start;
    }

    .creation-form-panel__content {
      flex: 1 1 auto;
      overflow-y: auto;
      scrollbar-gutter: stable;
      padding: var(--spacing-6) var(--spacing-md);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
    }

    .creation-form-panel__content::-webkit-scrollbar {
      width: 4px;
    }

    .creation-form-panel__content::-webkit-scrollbar-track {
      background: transparent;
    }

    .creation-form-panel__content::-webkit-scrollbar-thumb {
      background: var(--color-content-tertiary);
      border-radius: var(--radius-full);
    }

    .creation-form-panel__footer {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      gap: var(--spacing-4);
      padding: var(--spacing-4) var(--spacing-6);
      background: var(--color-general-white);
      border-top: 1px solid var(--color-action-outline-secondary-enabled);
      position: sticky;
      bottom: 0;
      z-index: 10;
    }

    .creation-form-panel__footer-left {
      display: contents;
    }

    .creation-form-panel__footer-right {
      display: contents;
    }

    /* Collapsible Section */
    .creation-form-panel__section {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-3);
      padding: var(--spacing-4);
      background: var(--color-general-neutral-lighter);
      border-radius: var(--radius-md);
    }

    .creation-form-panel__section--no-bg {
      background: transparent;
      padding: 0;
    }

    .creation-form-panel__section-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      user-select: none;
    }

    .creation-form-panel__section-header:hover {
      opacity: 0.8;
    }

    .creation-form-panel__section-title-group {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }

    .creation-form-panel__section-title {
      margin: 0;
      font-family: var(--font-family-primary);
      font-size: var(--text-body-lg);
      font-weight: var(--font-weight-semibold);
      line-height: var(--line-height-body-lg);
      color: var(--color-content-primary);
    }

    .creation-form-panel__section-chevron {
      transition: transform var(--transition-fast);
    }

    .creation-form-panel__section-chevron--collapsed {
      transform: rotate(-90deg);
    }

    .creation-form-panel__section-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
    }

    .creation-form-panel__section-content--collapsed {
      display: none;
    }

    .creation-form-panel__section-actions {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-2);
    }

    /* Divider */
    .creation-form-panel__divider {
      border: none;
      border-top: 1px solid var(--color-action-outline-secondary-enabled);
      margin: var(--spacing-2) 0;
    }
  `,
};

const injectStyles = createStyleInjector("creation-form-panel");

// ─────────────────────────────────────────────
// COLLAPSIBLE SECTION COMPONENT
// ─────────────────────────────────────────────

export const CollapsibleSection = ({
  title,
  badge,
  actions,
  defaultExpanded = true,
  collapsible = true,
  showBackground = true,
  children,
  className = "",
  style,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    if (collapsible) {
      setIsExpanded(!isExpanded);
    }
  };

  const sectionClasses = [
    "creation-form-panel__section",
    !showBackground && "creation-form-panel__section--no-bg",
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className={sectionClasses} style={style} {...props}>
      {(title || badge || actions) && (
        <div
          className="creation-form-panel__section-header"
          onClick={handleToggle}
          role={collapsible ? "button" : undefined}
          aria-expanded={collapsible ? isExpanded : undefined}
          tabIndex={collapsible ? 0 : undefined}
          onKeyDown={(e) => {
            if (collapsible && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              handleToggle();
            }
          }}
        >
          <div className="creation-form-panel__section-title-group">
            {collapsible && (
              <span
                className={`creation-form-panel__section-chevron ${
                  !isExpanded ? "creation-form-panel__section-chevron--collapsed" : ""
                }`}
              >
                <Icon name="ChevronDown" size="sm" />
              </span>
            )}
            {title && <h4 className="creation-form-panel__section-title">{title}</h4>}
            {badge}
          </div>
          {actions && (
            <div
              className="creation-form-panel__section-actions"
              onClick={(e) => e.stopPropagation()}
            >
              {actions}
            </div>
          )}
        </div>
      )}
      <div
        className={`creation-form-panel__section-content ${
          !isExpanded ? "creation-form-panel__section-content--collapsed" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

CollapsibleSection.displayName = "CollapsibleSection";

// ─────────────────────────────────────────────
// DIVIDER COMPONENT
// ─────────────────────────────────────────────

export const FormDivider = ({ style, ...props }) => (
  <hr className="creation-form-panel__divider" style={style} {...props} />
);

FormDivider.displayName = "FormDivider";


// Re-export FormSectionTitle for convenience
export { FormSectionTitle } from "./form-section-title.jsx";

// ─────────────────────────────────────────────
// CREATION FORM PANEL COMPONENT
// ─────────────────────────────────────────────

export const CreationFormPanel = forwardRef(
  (
    {
      // Header props
      title,
      headerBadge,
      headerButtons = [],
      headerActionsContent,
      infoMessage,
      infoVariant = "info",

      // Navigation props
      showNavigation = false,
      navigationTitle,
      onBack,
      currentIndex,
      totalItems,
      onPrevious,
      onNext,
      hasPrevious = true,
      hasNext = true,
      navigationSubContent,

      // Footer props
      footerButtons = [],
      showFooter,

      // Content
      children,

      // Styling
      className = "",
      style,
      ...props
    },
    ref
  ) => {
    injectStyles(joinStyles(styles));

    const classes = ["creation-form-panel", className].filter(Boolean).join(" ");

    const showHeader = title || headerBadge || headerButtons.length > 0 || headerActionsContent || infoMessage;
    const resolvedFooterButtons = Array.isArray(footerButtons) ? footerButtons.filter(Boolean) : [];
    const shouldShowFooter = showFooter === true || (showFooter !== false && resolvedFooterButtons.length > 0);

    const renderFooterButton = (btn, index, position) => {
      const buttonType = btn.buttonType || btn.type || btn.kind || "button";
      const ButtonComponent = buttonType === "ai" ? AiButton : Button;
      const buttonLabel = btn.label ?? btn.children ?? "";

      return (
        <ButtonComponent
          key={`${position}-${index}`}
          variant={btn.variant || (buttonType === "ai" ? "primary" : "secondary")}
          color={btn.color}
          size={btn.size || "md"}
          iconLeading={btn.iconLeading}
          iconTrailing={btn.iconTrailing}
          iconOnly={btn.iconOnly}
          aria-label={btn.ariaLabel}
          onClick={btn.onClick}
          isDisabled={btn.isDisabled}
          href={btn.href}
          type={btn.type === "ai" ? "button" : btn.type || "button"}
          style={{ flex: 1, ...btn.style }}
          {...btn.props}
        >
          {buttonLabel}
        </ButtonComponent>
      );
    };

    return (
      <div ref={ref} className={classes} style={style} {...props}>
        {/* Header */}
        {showHeader && (
          <div className="creation-form-panel__header">
            <div className="creation-form-panel__header-top">
              {(title || headerBadge) && (
                <div className="creation-form-panel__title-group">
                  {title && <h2 className="creation-form-panel__title">{title}</h2>}
                  {headerBadge}
                </div>
              )}
              {headerButtons.length > 0 && (
                <div className="creation-form-panel__header-actions">
                  {headerButtons.map((btn, index) => (
                    <Button
                      key={index}
                      variant={btn.variant || "secondary"}
                      size={btn.size || "md"}
                      iconOnly={btn.iconOnly}
                      aria-label={btn.ariaLabel}
                      iconLeading={btn.iconLeading}
                      iconTrailing={btn.iconTrailing}
                      onClick={btn.onClick}
                      isDisabled={btn.isDisabled}
                      {...btn.props}
                    >
                      {btn.label}
                    </Button>
                  ))}
                </div>
              )}
              {headerActionsContent && (
                <div className="creation-form-panel__header-actions">
                  {headerActionsContent}
                </div>
              )}
            </div>
            {infoMessage && <MiniInfobox variant={infoVariant} message={infoMessage} />}
          </div>
        )}

        {/* Navigation Sub-header */}
        {showNavigation && (
          <div className="creation-form-panel__navigation">
            {(onBack || navigationTitle || (currentIndex !== undefined && totalItems !== undefined)) && (
            <div className="creation-form-panel__nav-row">
              <div className="creation-form-panel__nav-left">
                {onBack && (
                  <Button
                    variant="tertiary"
                    size="sm"
                    iconOnly
                    aria-label="Back to list"
                    iconLeading={<Icon name="ChevronLeft" size="sm" />}
                    onClick={onBack}
                  />
                )}
                {navigationTitle && (
                  <h3 className="creation-form-panel__nav-title">{navigationTitle}</h3>
                )}
              </div>
              {(currentIndex !== undefined && totalItems !== undefined) && (
                <div className="creation-form-panel__nav-right">
                  <Button
                    variant="secondary"
                    size="sm"
                    iconOnly
                    aria-label="Previous item"
                    iconLeading={<Icon name="ChevronUp" size="sm" />}
                    onClick={onPrevious}
                    isDisabled={!hasPrevious}
                    style={{ height: 24, minWidth: 24, padding: "0 var(--spacing-xs)", borderRadius: "var(--radius-xs)" }}
                  />
                  <span className="creation-form-panel__nav-text">
                    {currentIndex} of {totalItems}
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    iconOnly
                    aria-label="Next item"
                    iconLeading={<Icon name="ChevronDown" size="sm" />}
                    onClick={onNext}
                    isDisabled={!hasNext}
                    style={{ height: 24, minWidth: 24, padding: "0 var(--spacing-xs)", borderRadius: "var(--radius-xs)" }}
                  />
                </div>
              )}
            </div>
            )}
            {navigationSubContent && (
              <div className="creation-form-panel__nav-sub-content">
                {navigationSubContent}
              </div>
            )}
          </div>
        )}

        {/* Scrollable Content */}
        <div className="creation-form-panel__content">
          {children}
        </div>

        {/* Footer */}
        {shouldShowFooter && (
          <div className="creation-form-panel__footer">
            <div className="creation-form-panel__footer-left">
              {resolvedFooterButtons
                .filter((btn) => btn.position === "left" || (!btn.position && resolvedFooterButtons.indexOf(btn) === 0))
                .slice(0, 1)
                .map((btn, index) => renderFooterButton(btn, index, "left"))}
            </div>
            <div className="creation-form-panel__footer-right">
              {resolvedFooterButtons
                .filter((btn, idx) => btn.position === "right" || (!btn.position && idx > 0))
                .map((btn, index) => renderFooterButton(btn, index, "right"))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

CreationFormPanel.displayName = "CreationFormPanel";
CreationFormPanel.Section = CollapsibleSection;
CreationFormPanel.Divider = FormDivider;

export default CreationFormPanel;
