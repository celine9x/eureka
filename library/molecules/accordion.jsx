"use client";

/**
 * Accordion Component
 *
 * An expandable/collapsible content container with header and optional actions.
 * Supports multiple sections, 1 or 2 column layouts, and flexible content.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <Accordion title="Container title" defaultExpanded>
 *   <AccordionSection title="Section 1" columns={2}>
 *     <AccordionField label="Field 1" value="Value 1" />
 *     <AccordionField label="Field 2" value="Value 2" />
 *   </AccordionSection>
 * </Accordion>
 */

import { useState, useRef, useEffect, createContext, useContext, useId } from "react";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const ACCORDION_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

// ─────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────

const AccordionContext = createContext(null);

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  accordion: {
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    border: "1px solid var(--color-action-outline-secondary-enabled)",
    borderRadius: 8,
    overflow: "hidden",
    boxSizing: "border-box",
  },

  header: {
    alignSelf: "stretch",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "var(--spacing-4)",
    paddingLeft: "var(--spacing-6)",
    paddingRight: "var(--spacing-6)",
    background: "var(--color-general-white)",
    cursor: "pointer",
    textAlign: "left",
    outline: "none",
    transition: "background var(--transition-fast)",
    boxSizing: "border-box",
  },

  headerHover: {
    background: "var(--color-general-neutral-lighter)",
  },

  headerFocus: {
    boxShadow: "var(--shadow-focus)",
  },

  headerExpanded: {
    borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
  },

  headerDisabled: {
    background: "var(--color-general-neutral-light)",
    cursor: "not-allowed",
    opacity: 0.5,
  },

  headerSizes: {
    sm: {
      paddingTop: "var(--spacing-sm)",
      paddingBottom: "var(--spacing-sm)",
    },
    md: {
      paddingTop: "var(--spacing-4)",
      paddingBottom: "var(--spacing-4)",
    },
    lg: {
      paddingTop: "var(--spacing-5)",
      paddingBottom: "var(--spacing-5)",
    },
  },

  headerLeft: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "var(--spacing-sm)",
    minWidth: 0,
  },

  headerRight: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "var(--spacing-sm)",
    flexShrink: 0,
  },

  icon: {
    flexShrink: 0,
    width: 20,
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-secondary)",
  },

  title: {
    fontFamily: "var(--font-family-primary)",
    color: "var(--color-content-primary)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  titleSizes: {
    sm: {
      fontSize: "var(--text-body-md)",
      fontWeight: "var(--font-weight-semibold)",
      lineHeight: "var(--line-height-body-md)",
    },
    md: {
      fontSize: "var(--text-body-lg)",
      fontWeight: "var(--font-weight-bold)",
      lineHeight: "var(--line-height-body-lg)",
    },
    lg: {
      fontSize: "var(--text-heading-h3)",
      fontWeight: "var(--font-weight-bold)",
      lineHeight: "var(--line-height-heading-h3)",
    },
  },

  secondaryText: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-md)",
    color: "var(--color-content-secondary)",
  },

  chevron: {
    flexShrink: 0,
    width: 20,
    height: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-secondary)",
  },

  content: {
    alignSelf: "stretch",
    overflow: "hidden",
    background: "var(--color-general-white)",
    boxSizing: "border-box",
  },

  contentAnimated: {
    transition: "height var(--transition-normal)",
  },

  contentInner: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-4)",
    padding: "var(--spacing-6)",
  },

  group: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-3)",
    width: "100%",
  },

  // ─────────────────────────────────────────────
  // SECTION STYLES
  // ─────────────────────────────────────────────

  section: {
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "var(--spacing-4)",
    boxSizing: "border-box",
    width: "100%",
  },

  sectionFirst: {},

  sectionLast: {},

  sectionHeader: {
    alignSelf: "stretch",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "var(--spacing-4)",
  },

  sectionTitle: {
    flex: 1,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    fontWeight: "var(--font-weight-bold)",
    lineHeight: "var(--line-height-body-lg)",
    color: "var(--color-content-primary)",
  },

  // ─────────────────────────────────────────────
  // ROW STYLES (1 or 2 columns)
  // ─────────────────────────────────────────────

  row: {
    alignSelf: "stretch",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "var(--spacing-6)",
  },

  // ─────────────────────────────────────────────
  // FIELD STYLES
  // ─────────────────────────────────────────────

  field: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "var(--spacing-xs)",
  },

  fieldLabel: {
    alignSelf: "stretch",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-lg)",
    color: "var(--color-content-secondary)",
  },

  fieldValue: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-lg)",
    color: "var(--color-content-primary)",
  },

  fieldValueChips: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "var(--spacing-xs)",
    flexWrap: "wrap",
  },

  // ─────────────────────────────────────────────
  // DIVIDER STYLES
  // ─────────────────────────────────────────────

  divider: {
    alignSelf: "stretch",
    height: 1,
    background: "var(--color-action-outline-secondary-enabled)",
  },
};

// ─────────────────────────────────────────────
// ACCORDION ITEM COMPONENT
// ─────────────────────────────────────────────

/**
 * AccordionItem
 *
 * A single accordion item with header and collapsible content.
 *
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
  disabled,
  expanded: controlledExpanded,
  defaultExpanded = false,
  onToggle,
  animated = true,
  children,
  style,
  ...props
}) => {
  const context = useContext(AccordionContext);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

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

  // Compose accordion styles
  const accordionStyle = {
    ...styles.accordion,
    ...style,
  };

  // Compose header styles
  const headerStyle = {
    ...styles.header,
    ...styles.headerSizes[size],
    ...(isHovered && !isItemDisabled && styles.headerHover),
    ...(isFocused && !isItemDisabled && styles.headerFocus),
    ...(isExpanded && styles.headerExpanded),
    ...(isItemDisabled && styles.headerDisabled),
  };

  // Title styles
  const titleStyle = {
    ...styles.title,
    ...styles.titleSizes[size],
  };

  // Chevron styles
  const chevronStyle = {
    ...styles.chevron,
  };

  // Content styles
  const contentStyle = {
    ...styles.content,
    ...(animated && styles.contentAnimated),
    height: animated && isExpanded ? height : isExpanded ? "auto" : 0,
  };

  const renderIcon = () => {
    if (icon) return <span style={styles.icon}>{icon}</span>;
    if (iconName) {
      return (
        <span style={styles.icon}>
          <Icon name={iconName} size="md" style={{ color: "inherit" }} />
        </span>
      );
    }
    return null;
  };

  return (
    <div style={accordionStyle} data-open={isExpanded} {...props}>
      <button
        type="button"
        className="accordion-header"
        style={headerStyle}
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={isItemDisabled}
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${id}`}
        id={`accordion-header-${id}`}
      >
        <div style={styles.headerLeft}>
          {renderIcon()}
          <span style={titleStyle}>{title}</span>
          {secondaryText && <span style={styles.secondaryText}>{secondaryText}</span>}
        </div>

        <div style={styles.headerRight}>
          {action && <span onClick={(e) => e.stopPropagation()}>{action}</span>}
          <span style={chevronStyle}>
            {isExpanded ? (
              <ChevronUpIcon style={{ width: 20, height: 20 }} />
            ) : (
              <ChevronDownIcon style={{ width: 20, height: 20 }} />
            )}
          </span>
        </div>
      </button>

      {isExpanded && (
        <div
          id={`accordion-content-${id}`}
          style={contentStyle}
          role="region"
          aria-labelledby={`accordion-header-${id}`}
        >
          <div ref={contentRef} style={styles.contentInner}>
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
// ACCORDION SECTION
// ─────────────────────────────────────────────

/**
 * AccordionSection
 *
 * A content section within an expanded accordion.
 * Supports 1 or 2 column layouts with optional title and action.
 *
 */
export const AccordionSection = ({
  title,
  action,
  actionLabel,
  onActionClick,
  columns = 2,
  isLast = false,
  children,
  style,
  ...props
}) => {
  const sectionStyle = {
    ...styles.section,
    ...(isLast && styles.sectionLast),
    ...style,
  };

  // Build action if actionLabel is provided
  const actionElement =
    action ||
    (actionLabel ? (
      <Button
        variant="secondary"
        size="md"
        iconLeading={<Icon name="PencilSquare" size="sm" />}
        onClick={onActionClick}
      >
        {actionLabel}
      </Button>
    ) : null);

  return (
    <div style={sectionStyle} {...props}>
      {(title || actionElement) && (
        <div style={styles.sectionHeader}>
          {title && <div style={styles.sectionTitle}>{title}</div>}
          {actionElement}
        </div>
      )}
      {children}
    </div>
  );
};

AccordionSection.displayName = "AccordionSection";

// ─────────────────────────────────────────────
// ACCORDION ROW
// ─────────────────────────────────────────────

/**
 * AccordionRow
 *
 * A row container for fields within an AccordionSection.
 * Displays children in a horizontal flex layout.
 *
 */
export const AccordionRow = ({ children, style, ...props }) => {
  const rowStyle = {
    ...styles.row,
    ...style,
  };

  return (
    <div style={rowStyle} {...props}>
      {children}
    </div>
  );
};

AccordionRow.displayName = "AccordionRow";

// ─────────────────────────────────────────────
// ACCORDION FIELD
// ─────────────────────────────────────────────

/**
 * AccordionField
 *
 * A label-value pair field within an accordion.
 *
 */
export const AccordionField = ({ label, value, children, style, ...props }) => {
  const fieldStyle = {
    ...styles.field,
    ...style,
  };

  return (
    <div style={fieldStyle} {...props}>
      <div style={styles.fieldLabel}>{label}</div>
      {children || (
        <div style={styles.fieldValue}>{value}</div>
      )}
    </div>
  );
};

AccordionField.displayName = "AccordionField";

// ─────────────────────────────────────────────
// ACCORDION DIVIDER
// ─────────────────────────────────────────────

/**
 * AccordionDivider
 *
 * A horizontal divider line within an accordion section.
 */
export const AccordionDivider = ({ style, ...props }) => {
  const dividerStyle = {
    ...styles.divider,
    ...style,
  };

  return <div style={dividerStyle} {...props} />;
};

AccordionDivider.displayName = "AccordionDivider";

// ─────────────────────────────────────────────
// ACCORDION GROUP
// ─────────────────────────────────────────────

/**
 * AccordionGroup
 *
 * Container for multiple accordion items with optional single-expand behavior.
 *
 */
export const AccordionGroup = ({
  children,
  allowMultiple = true,
  defaultExpanded,
  expanded: controlledExpanded,
  onExpandedChange,
  style,
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

  const groupStyle = {
    ...styles.group,
    ...style,
  };

  return (
    <AccordionContext.Provider value={{ toggleItem, isExpanded }}>
      <div style={groupStyle} {...props}>
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
  disabled,
  expanded,
  defaultExpanded = false,
  onToggle,
  animated = true,
  children,
  style,
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
        onClick={onActionClick}
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
      style={style}
      {...props}
    >
      {children}
    </AccordionItem>
  );
};

Accordion.displayName = "Accordion";
Accordion.sizes = ACCORDION_SIZES;

export default Accordion;
