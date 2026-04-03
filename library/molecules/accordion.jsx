/**
 * Accordion Component
 *
 * An expandable/collapsible content container with header and optional actions.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <Accordion title="Container title" defaultExpanded>
 *   <p>Content here</p>
 * </Accordion>
 */

import { useState, useRef, useEffect, createContext, useContext, useId } from "react";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

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
  },

  header: {
    alignSelf: "stretch",
    display: "inline-flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 16,
    paddingLeft: 24,
    paddingRight: 24,
    background: "var(--color-general-white)",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    transition: "all var(--transition-fast)",
    boxSizing: "border-box",
  },

  headerHover: {
    background: "var(--color-general-neutral-lighter)",
    outlineColor: "var(--color-action-outline-secondary-hover)",
  },

  headerFocus: {
    outlineColor: "var(--color-action-fill-primary-enabled)",
    boxShadow: "var(--shadow-focus)",
  },

  headerExpanded: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  headerDisabled: {
    background: "var(--color-general-neutral-light)",
    cursor: "not-allowed",
    opacity: 0.5,
  },

  headerSizes: {
    sm: {
      paddingTop: 8,
      paddingBottom: 8,
    },
    md: {
      paddingTop: 16,
      paddingBottom: 16,
    },
    lg: {
      paddingTop: 20,
      paddingBottom: 20,
    },
  },

  headerLeft: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
    minWidth: 0,
  },

  headerRight: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
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
      fontWeight: 600,
      lineHeight: "var(--line-height-body-md)",
    },
    md: {
      fontSize: "var(--text-body-lg)",
      fontWeight: 700,
      lineHeight: "var(--line-height-body-lg)",
    },
    lg: {
      fontSize: "var(--text-heading-h3)",
      fontWeight: 700,
      lineHeight: "var(--line-height-heading-h3)",
    },
  },

  secondaryText: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    fontWeight: 400,
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
    transition: "transform var(--transition-fast)",
  },

  chevronExpanded: {
    transform: "rotate(180deg)",
  },

  content: {
    alignSelf: "stretch",
    overflow: "hidden",
    background: "var(--color-general-white)",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderLeft: "1px solid var(--color-action-outline-secondary-enabled)",
    borderRight: "1px solid var(--color-action-outline-secondary-enabled)",
    borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
    boxSizing: "border-box",
  },

  contentAnimated: {
    transition: "height var(--transition-normal)",
  },

  contentInner: {
    padding: 24,
    minHeight: 56,
  },

  group: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    width: "100%",
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
 * @param {object} style - Additional inline styles
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
    ...(isExpanded && styles.chevronExpanded),
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
            <ChevronDownIcon style={{ width: 20, height: 20 }} />
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
 * @param {object} style - Additional inline styles
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
 * @param {object} style - Additional inline styles
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
