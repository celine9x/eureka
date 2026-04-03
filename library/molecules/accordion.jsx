/**
 * Accordion Component
 *
 * An expandable/collapsible content container with header and optional actions.
 * Uses Tailwind CSS with design tokens.
 */

import React, { useState, useRef, useEffect, createContext, useContext, useId } from "react";
import { cx } from "../utils/cx.js";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

/** Accordion sizes */
export const ACCORDION_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  accordion: "inline-flex flex-col justify-start items-start w-full",

  header: [
    "self-stretch inline-flex justify-start items-center gap-4 px-6",
    "bg-background-white rounded-lg border-none cursor-pointer text-left",
    "outline outline-1 -outline-offset-1 outline-outline-neutral",
    "transition-all duration-fast",
    "hover:not-disabled:bg-background-neutral-lighter hover:not-disabled:outline-neutral-300",
    "focus-visible:outline-primary-600 focus-visible:shadow-focus",
    "disabled:bg-background-neutral-light disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),

  headerExpanded: "rounded-t-lg rounded-b-none",

  headerSizes: {
    sm: "py-2",
    md: "py-4",
    lg: "py-5",
  },

  headerLeft: "flex-1 flex justify-start items-center gap-2 min-w-0",
  headerRight: "flex justify-start items-center gap-2 flex-shrink-0",

  icon: "flex-shrink-0 size-5 flex items-center justify-center text-content-secondary",

  title: "font-primary text-content-primary whitespace-nowrap overflow-hidden text-ellipsis",

  titleSizes: {
    sm: "text-body-md font-semibold",
    md: "text-body-lg font-bold",
    lg: "text-heading-sm font-bold",
  },

  secondaryText: "font-primary text-body-md font-normal text-content-secondary",

  chevron: [
    "flex-shrink-0 size-5 flex items-center justify-center",
    "text-content-secondary transition-transform duration-fast",
  ].join(" "),

  chevronExpanded: "rotate-180",

  content: [
    "self-stretch overflow-hidden bg-background-white",
    "rounded-b-lg border border-outline-neutral border-t-0",
  ].join(" "),

  contentAnimated: "transition-[height] duration-normal",

  contentInner: "p-6 min-h-14",

  group: "flex flex-col gap-3 w-full",
};

// ─────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────

const AccordionContext = createContext(null);

// ─────────────────────────────────────────────
// ACCORDION ITEM COMPONENT
// ─────────────────────────────────────────────

/**
 * AccordionItem
 *
 * A single accordion item with header and collapsible content.
 *
 * @param {string} id - Unique identifier for the item
 * @param {string} title - Header title text
 * @param {string} secondaryText - Secondary text after title
 * @param {ReactNode} icon - Leading icon element
 * @param {string} iconName - Leading icon name (alternative to icon prop)
 * @param {ReactNode} action - Action element (Button) in header
 * @param {string} size - sm | md | lg (default: md)
 * @param {boolean} isDisabled - Disable the accordion item
 * @param {boolean} expanded - Controlled expanded state
 * @param {boolean} defaultExpanded - Default expanded state (uncontrolled)
 * @param {function} onToggle - Called when toggled
 * @param {boolean} animated - Enable height animation (default: true)
 * @param {ReactNode} children - Content to display when expanded
 * @param {string} className - Additional CSS classes
 */
export const AccordionItem = ({
  id,
  title,
  secondaryText,
  icon,
  iconName,
  action,
  size = ACCORDION_SIZES.md,
  isDisabled = false,
  disabled, // Support legacy prop
  expanded: controlledExpanded,
  defaultExpanded = false,
  onToggle,
  animated = true,
  children,
  className,
  ...props
}) => {
  const context = useContext(AccordionContext);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  const isItemDisabled = isDisabled || disabled;

  // Standalone or grouped mode
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);

  const isControlled = controlledExpanded !== undefined || context;
  const isExpanded = context
    ? context.isExpanded(id)
    : controlledExpanded !== undefined
    ? controlledExpanded
    : internalExpanded;

  const handleToggle = () => {
    if (isItemDisabled) return;

    if (context) {
      context.toggleItem(id);
    } else if (controlledExpanded !== undefined) {
      onToggle?.(!controlledExpanded);
    } else {
      setInternalExpanded(!internalExpanded);
      onToggle?.(!internalExpanded);
    }
  };

  // Measure content height for animation
  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children, isExpanded]);

  const accordionClasses = cx(styles.accordion, className);

  const headerClasses = cx(
    styles.header,
    styles.headerSizes[size],
    isExpanded && styles.headerExpanded
  );

  const titleClasses = cx(styles.title, styles.titleSizes[size]);

  const chevronClasses = cx(styles.chevron, isExpanded && styles.chevronExpanded);

  const contentClasses = cx(styles.content, animated && styles.contentAnimated);

  const renderIcon = () => {
    if (icon) return <span className={styles.icon}>{icon}</span>;
    if (iconName)
      return (
        <span className={styles.icon}>
          <Icon name={iconName} size="md" />
        </span>
      );
    return null;
  };

  return (
    <div className={accordionClasses} data-open={isExpanded} {...props}>
      <button
        type="button"
        className={headerClasses}
        onClick={handleToggle}
        disabled={isItemDisabled}
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${id}`}
        id={`accordion-header-${id}`}
      >
        <div className={styles.headerLeft}>
          {renderIcon()}
          <span className={titleClasses}>{title}</span>
          {secondaryText && <span className={styles.secondaryText}>{secondaryText}</span>}
        </div>

        <div className={styles.headerRight}>
          {action && <span onClick={(e) => e.stopPropagation()}>{action}</span>}
          <span className={chevronClasses}>
            <Icon name="ChevronDown" size="md" />
          </span>
        </div>
      </button>

      {isExpanded && (
        <div
          id={`accordion-content-${id}`}
          className={contentClasses}
          role="region"
          aria-labelledby={`accordion-header-${id}`}
          style={{
            height: animated ? height : "auto",
          }}
        >
          <div ref={contentRef} className={styles.contentInner}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

AccordionItem.displayName = "AccordionItem";
AccordionItem.sizes = ACCORDION_SIZES;

// ─────────────────────────────────────────────
// ACCORDION GROUP
// ─────────────────────────────────────────────

/**
 * AccordionGroup
 *
 * Container for multiple accordion items with optional single-expand behavior.
 *
 * @param {boolean} allowMultiple - Allow multiple items to be expanded at once (default: true)
 * @param {string|array} defaultExpanded - ID(s) of initially expanded item(s)
 * @param {string|array} expanded - Controlled expanded state
 * @param {function} onExpandedChange - Called when expanded state changes
 * @param {ReactNode} children - AccordionItem children
 * @param {string} className - Additional CSS classes
 */
export const AccordionGroup = ({
  children,
  allowMultiple = true,
  defaultExpanded,
  expanded: controlledExpanded,
  onExpandedChange,
  className,
  ...props
}) => {
  const [internalExpanded, setInternalExpanded] = useState(() => {
    if (defaultExpanded) {
      return Array.isArray(defaultExpanded) ? defaultExpanded : [defaultExpanded];
    }
    return [];
  });

  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled
    ? Array.isArray(controlledExpanded)
      ? controlledExpanded
      : [controlledExpanded]
    : internalExpanded;

  const toggleItem = (id) => {
    let newExpanded;

    if (expanded.includes(id)) {
      newExpanded = expanded.filter((item) => item !== id);
    } else {
      newExpanded = allowMultiple ? [...expanded, id] : [id];
    }

    if (!isControlled) {
      setInternalExpanded(newExpanded);
    }

    onExpandedChange?.(allowMultiple ? newExpanded : newExpanded[0] || null);
  };

  const isExpanded = (id) => expanded.includes(id);

  return (
    <AccordionContext.Provider value={{ toggleItem, isExpanded }}>
      <div className={cx(styles.group, className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

AccordionGroup.displayName = "AccordionGroup";

// ─────────────────────────────────────────────
// STANDALONE ACCORDION
// ─────────────────────────────────────────────

/**
 * Accordion
 *
 * A single standalone accordion (wrapper around AccordionItem for convenience).
 *
 * @param {string} title - Header title text
 * @param {string} secondaryText - Secondary text after title
 * @param {ReactNode} icon - Leading icon element
 * @param {string} iconName - Leading icon name
 * @param {ReactNode} action - Action element (Button) in header
 * @param {string} actionLabel - Label for built-in action button
 * @param {function} onActionClick - Click handler for built-in action button
 * @param {string} size - sm | md | lg (default: md)
 * @param {boolean} isDisabled - Disable the accordion
 * @param {boolean} expanded - Controlled expanded state
 * @param {boolean} defaultExpanded - Default expanded state
 * @param {function} onToggle - Called when toggled
 * @param {boolean} animated - Enable height animation
 * @param {ReactNode} children - Content to display when expanded
 * @param {string} className - Additional CSS classes
 *
 * @example
 * // Basic usage
 * <Accordion title="Container title">
 *   <p>Content here</p>
 * </Accordion>
 *
 * @example
 * // With action button
 * <Accordion
 *   title="Container title"
 *   actionLabel="Button"
 *   onActionClick={() => console.log('clicked')}
 * >
 *   <p>Content here</p>
 * </Accordion>
 */
export const Accordion = ({
  title,
  secondaryText,
  icon,
  iconName,
  action,
  actionLabel,
  onActionClick,
  size = ACCORDION_SIZES.md,
  isDisabled = false,
  disabled, // Support legacy prop
  expanded,
  defaultExpanded = false,
  onToggle,
  animated = true,
  children,
  className,
  ...props
}) => {
  const generatedId = useId();
  const id = `accordion-${generatedId}`;

  const isAccordionDisabled = isDisabled || disabled;

  // Build action if actionLabel is provided
  const actionElement =
    action ||
    (actionLabel ? (
      <Button
        variant="secondary"
        size="sm"
        onPress={onActionClick}
        isDisabled={isAccordionDisabled}
      >
        {actionLabel}
      </Button>
    ) : null);

  return (
    <AccordionItem
      id={id}
      title={title}
      secondaryText={secondaryText}
      icon={icon}
      iconName={iconName}
      action={actionElement}
      size={size}
      isDisabled={isAccordionDisabled}
      expanded={expanded}
      defaultExpanded={defaultExpanded}
      onToggle={onToggle}
      animated={animated}
      className={className}
      {...props}
    >
      {children}
    </AccordionItem>
  );
};

Accordion.displayName = "Accordion";
Accordion.sizes = ACCORDION_SIZES;

export default Accordion;
