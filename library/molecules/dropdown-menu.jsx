/**
 * DropdownMenu Component
 *
 * A dropdown menu container with sections, items, and optional footer.
 * Uses Tailwind CSS with design tokens.
 */

import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import { cx } from "../utils/cx.js";
import { DropdownMenuItem, DropdownMenuDivider, DropdownMenuLabel } from "./dropdown-menu-item.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

/** Menu positions */
export const DROPDOWN_POSITIONS = {
  top: "top",
  bottom: "bottom",
};

/** Menu alignments */
export const DROPDOWN_ALIGNMENTS = {
  left: "left",
  right: "right",
  center: "center",
};

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  wrapper: "relative inline-flex",

  menu: [
    "absolute z-[1000] min-w-[200px] max-w-[320px]",
    "bg-background-white rounded-md",
    "outline outline-1 -outline-offset-1 outline-outline-neutral",
    "shadow-medium-down overflow-hidden",
  ].join(" "),

  positions: {
    top: "bottom-full mb-1",
    bottom: "top-full mt-1",
  },

  alignments: {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2",
  },

  animated: "animate-[dropdown-fade-in_0.15s_ease-out]",
  animatedTop: "animate-[dropdown-fade-in-up_0.15s_ease-out]",

  section: "py-2 [&+&]:border-t [&+&]:border-outline-neutral",
  sectionContent: "px-4",

  footer: [
    "py-2 px-6 bg-background-neutral-light border-t border-outline-neutral",
  ].join(" "),
  footerText: "font-primary text-[9px] font-normal leading-3 text-content-secondary",
};

// ─────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────

const DropdownMenuContext = createContext(null);

// ─────────────────────────────────────────────
// DROPDOWN MENU SECTION
// ─────────────────────────────────────────────

/**
 * DropdownMenuSection
 *
 * A section within the dropdown menu, visually separated by dividers.
 *
 * @param {ReactNode} children - Section content
 * @param {string} className - Additional CSS classes
 */
export const DropdownMenuSection = ({ children, className }) => {
  return (
    <div className={cx(styles.section, className)}>
      <div className={styles.sectionContent}>{children}</div>
    </div>
  );
};

DropdownMenuSection.displayName = "DropdownMenuSection";

// ─────────────────────────────────────────────
// DROPDOWN MENU FOOTER
// ─────────────────────────────────────────────

/**
 * DropdownMenuFooter
 *
 * Footer section with background, typically for version info or secondary actions.
 *
 * @param {ReactNode} children - Footer content
 * @param {string} className - Additional CSS classes
 */
export const DropdownMenuFooter = ({ children, className }) => {
  return (
    <div className={cx(styles.footer, className)}>
      {typeof children === "string" ? (
        <div className={styles.footerText}>{children}</div>
      ) : (
        children
      )}
    </div>
  );
};

DropdownMenuFooter.displayName = "DropdownMenuFooter";

// ─────────────────────────────────────────────
// DROPDOWN MENU CONTENT (Panel)
// ─────────────────────────────────────────────

/**
 * DropdownMenuContent
 *
 * The menu panel that appears when dropdown is open.
 *
 * @param {ReactNode} children - Menu content
 * @param {string} position - top | bottom (default: bottom)
 * @param {string} align - left | right | center (default: left)
 * @param {string|number} width - Custom width
 * @param {boolean} animated - Enable animation (default: true)
 * @param {string} className - Additional CSS classes
 */
export const DropdownMenuContent = ({
  children,
  position = DROPDOWN_POSITIONS.bottom,
  align = DROPDOWN_ALIGNMENTS.left,
  width,
  animated = true,
  className,
  style = {},
  ...props
}) => {
  const classes = cx(
    styles.menu,
    styles.positions[position],
    styles.alignments[align],
    animated && (position === "top" ? styles.animatedTop : styles.animated),
    className
  );

  return (
    <div
      className={classes}
      role="menu"
      style={{
        width: width || undefined,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

DropdownMenuContent.displayName = "DropdownMenuContent";

// ─────────────────────────────────────────────
// DROPDOWN MENU TRIGGER
// ─────────────────────────────────────────────

/**
 * DropdownMenuTrigger
 *
 * The button/element that triggers the dropdown.
 */
export const DropdownMenuTrigger = ({ children, asChild = false, className = "", ...props }) => {
  const context = useContext(DropdownMenuContext);

  if (!context) {
    console.warn("DropdownMenuTrigger must be used within DropdownMenu");
    return children;
  }

  const handleClick = (e) => {
    context.toggle();
    props.onClick?.(e);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      context.toggle();
    }
    if (e.key === "ArrowDown" && !context.isOpen) {
      e.preventDefault();
      context.open();
    }
    if (e.key === "Escape" && context.isOpen) {
      e.preventDefault();
      context.close();
    }
    props.onKeyDown?.(e);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      "aria-expanded": context.isOpen,
      "aria-haspopup": "menu",
      ref: context.triggerRef,
    });
  }

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-expanded={context.isOpen}
      aria-haspopup="menu"
      ref={context.triggerRef}
      {...props}
    >
      {children}
    </button>
  );
};

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

// ─────────────────────────────────────────────
// DROPDOWN MENU (Root)
// ─────────────────────────────────────────────

/**
 * DropdownMenu
 *
 * Root component that manages dropdown state.
 *
 * @param {boolean} open - Controlled open state
 * @param {boolean} defaultOpen - Default open state
 * @param {function} onOpenChange - Called when open state changes
 * @param {boolean} closeOnSelect - Close menu when item is selected
 * @param {boolean} closeOnClickOutside - Close menu when clicking outside
 *
 * @example
 * <DropdownMenu>
 *   <DropdownMenuTrigger asChild>
 *     <Button>Open Menu</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuSection>
 *       <DropdownMenuItem label="Profile" iconName="User" />
 *       <DropdownMenuItem label="Settings" iconName="Cog" />
 *     </DropdownMenuSection>
 *     <DropdownMenuSection>
 *       <DropdownMenuItem label="Sign out" iconName="ArrowRightOnRectangle" />
 *     </DropdownMenuSection>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 */
export const DropdownMenu = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  closeOnSelect = true,
  closeOnClickOutside = true,
  className = "",
  ...props
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = (value) => {
    if (!isControlled) {
      setInternalOpen(value);
    }
    onOpenChange?.(value);
  };

  const open = () => setOpen(true);
  const close = () => setOpen(false);
  const toggle = () => setOpen(!isOpen);

  // Close on click outside
  useEffect(() => {
    if (!closeOnClickOutside || !isOpen) return;

    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeOnClickOutside]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const contextValue = {
    isOpen,
    open,
    close,
    toggle,
    closeOnSelect,
    triggerRef,
  };

  // Process children to inject context-aware behavior
  const processChildren = (children) => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      // Handle DropdownMenuContent visibility
      if (child.type === DropdownMenuContent) {
        if (!isOpen) return null;
        return child;
      }

      // Handle DropdownMenuItem click to close menu
      if (child.type === DropdownMenuItem && closeOnSelect) {
        return React.cloneElement(child, {
          onClick: (e) => {
            child.props.onClick?.(e);
            if (!child.props.disabled && !child.props.isDisabled) {
              close();
            }
          },
        });
      }

      // Recursively process section children
      if (child.type === DropdownMenuSection) {
        return React.cloneElement(child, {
          children: processChildren(child.props.children),
        });
      }

      return child;
    });
  };

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      <div ref={wrapperRef} className={cx(styles.wrapper, className)} {...props}>
        {processChildren(children)}
      </div>
    </DropdownMenuContext.Provider>
  );
};

DropdownMenu.displayName = "DropdownMenu";

// ─────────────────────────────────────────────
// SIMPLE DROPDOWN MENU (Convenience)
// ─────────────────────────────────────────────

/**
 * SimpleDropdownMenu
 *
 * A convenience component that creates a complete dropdown menu from items config.
 *
 * @example
 * <SimpleDropdownMenu
 *   trigger={<Button>Menu</Button>}
 *   items={[
 *     { label: 'Profile', icon: 'User' },
 *     { label: 'Settings', icon: 'Cog' },
 *     { type: 'divider' },
 *     { label: 'Sign out', icon: 'ArrowRightOnRectangle' },
 *   ]}
 * />
 */
export const SimpleDropdownMenu = ({
  trigger,
  items = [],
  position = "bottom",
  align = "left",
  width,
  footer,
  className = "",
  ...props
}) => {
  return (
    <DropdownMenu className={className} {...props}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent position={position} align={align} width={width}>
        <DropdownMenuSection>
          {items.map((item, index) => {
            if (item.type === "divider") {
              return <DropdownMenuDivider key={`divider-${index}`} />;
            }

            if (item.type === "label") {
              return <DropdownMenuLabel key={`label-${index}`}>{item.text}</DropdownMenuLabel>;
            }

            return (
              <DropdownMenuItem
                key={item.id || item.label || index}
                label={item.label}
                iconName={item.icon}
                badge={item.badge}
                description={item.description}
                shortcut={item.shortcut}
                variant={item.variant}
                isDisabled={item.disabled}
                active={item.active}
                onClick={item.onClick}
                href={item.href}
              />
            );
          })}
        </DropdownMenuSection>

        {footer && <DropdownMenuFooter>{footer}</DropdownMenuFooter>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

SimpleDropdownMenu.displayName = "SimpleDropdownMenu";

// Re-export item components for convenience
export { DropdownMenuItem, DropdownMenuDivider, DropdownMenuLabel };

export default DropdownMenu;
