"use client";

/**
 * DropdownMenu Component
 *
 * A dropdown menu container with sections, items, and optional footer.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 */

import React, { useState, useRef, useEffect, createContext, useContext } from "react";
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
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  wrapper: {
    position: "relative",
    display: "inline-flex",
  },

  menu: {
    position: "absolute",
    zIndex: 1000,
    minWidth: 200,
    maxWidth: 320,
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-md)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: -1,
    boxShadow: "var(--shadow-medium-down)",
    overflow: "hidden",
  },

  positions: {
    top: {
      bottom: "100%",
      marginBottom: 4,
    },
    bottom: {
      top: "100%",
      marginTop: 4,
    },
  },

  alignments: {
    left: {
      left: 0,
    },
    right: {
      right: 0,
    },
    center: {
      left: "50%",
      transform: "translateX(-50%)",
    },
  },

  section: {
    padding: "8px 0",
  },

  sectionDivider: {
    borderTop: "1px solid var(--color-action-outline-secondary-enabled)",
  },

  sectionContent: {
    padding: "0 16px",
  },

  footer: {
    padding: "8px 24px",
    background: "var(--color-general-neutral-light)",
    borderTop: "1px solid var(--color-action-outline-secondary-enabled)",
  },

  footerText: {
    fontFamily: "var(--font-family-primary)",
    fontSize: 9,
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "12px",
    color: "var(--color-content-secondary)",
  },
};

// ─────────────────────────────────────────────
// KEYFRAME ANIMATION (via style tag)
// ─────────────────────────────────────────────

const animationKeyframes = `
@keyframes dropdown-fade-in {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes dropdown-fade-in-up {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

// Inject animation styles once
let animationStylesInjected = false;
const injectAnimationStyles = () => {
  if (animationStylesInjected || typeof document === "undefined") return;
  const styleEl = document.createElement("style");
  styleEl.textContent = animationKeyframes;
  document.head.appendChild(styleEl);
  animationStylesInjected = true;
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
 */
export const DropdownMenuSection = ({ children, showDivider = false, style }) => {
  const sectionStyle = {
    ...styles.section,
    ...(showDivider && styles.sectionDivider),
    ...style,
  };

  return (
    <div style={sectionStyle}>
      <div style={styles.sectionContent}>{children}</div>
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
 */
export const DropdownMenuFooter = ({ children, style }) => {
  const footerStyle = {
    ...styles.footer,
    ...style,
  };

  return (
    <div style={footerStyle}>
      {typeof children === "string" ? (
        <div style={styles.footerText}>{children}</div>
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
 */
export const DropdownMenuContent = ({
  children,
  position = DROPDOWN_POSITIONS.bottom,
  align = DROPDOWN_ALIGNMENTS.left,
  width,
  animated = true,
  style = {},
  ...props
}) => {
  // Inject animation styles
  if (animated) {
    injectAnimationStyles();
  }

  const animationStyle = animated
    ? {
        animation: position === "top"
          ? "dropdown-fade-in-up 0.15s ease-out"
          : "dropdown-fade-in 0.15s ease-out",
      }
    : {};

  // Handle center alignment with animation
  const alignmentStyle = { ...styles.alignments[align] };
  if (align === "center" && animated) {
    // Combine transforms
    alignmentStyle.transform = position === "top"
      ? "translateX(-50%)"
      : "translateX(-50%)";
  }

  const menuStyle = {
    ...styles.menu,
    ...styles.positions[position],
    ...alignmentStyle,
    ...animationStyle,
    ...(width && { width }),
    ...style,
  };

  return (
    <div style={menuStyle} role="menu" {...props}>
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
export const DropdownMenuTrigger = ({ children, asChild = false, style, ...props }) => {
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
      style={style}
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
  style,
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

  const wrapperStyle = {
    ...styles.wrapper,
    ...style,
  };

  return (
    <DropdownMenuContext.Provider value={contextValue}>
      <div ref={wrapperRef} style={wrapperStyle} {...props}>
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
  style,
  ...props
}) => {
  return (
    <DropdownMenu style={style} {...props}>
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
