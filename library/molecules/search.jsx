"use client";

/**
 * Search Component
 *
 * A pill-shaped search input with icon.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <Search placeholder="Quick search" />
 * <Search size="lg" value={query} onChange={setQuery} />
 * <Search onSubmit={(value) => handleSearch(value)} />
 */

import { useState, forwardRef, useRef } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";

let placeholderStylesInjected = false;

const injectPlaceholderStyles = () => {
  if (placeholderStylesInjected || typeof document === "undefined") return;

  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-eureka", "search-placeholder");
  styleEl.textContent = `
    .eureka-search-input::placeholder {
      color: var(--color-content-tertiary);
      opacity: 1;
    }
  `;
  document.head.appendChild(styleEl);
  placeholderStylesInjected = true;
};

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const SEARCH_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

export const SEARCH_VISUAL_STATES = {
  auto: "auto",
  enabled: "enabled",
  hover: "hover",
  active: "active",
  filled: "filled",
  disabled: "disabled",
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-sm)",
    padding: "var(--spacing-sm)",
    width: "100%",
    boxSizing: "border-box",
    cursor: "text",
    borderRadius: "var(--radius-full)",
    outline: "1px solid transparent",
    outlineOffset: "-1px",
    transition: "all var(--transition-fast)",
  },

  wrapperCollapsed: {
    width: "var(--size-input-sm)",
    padding: "var(--spacing-sm)",
    justifyContent: "center",
  },

  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  input: {
    flex: 1,
    border: "none",
    background: "transparent",
    fontFamily: "var(--font-family-primary)",
    outline: "none",
    minWidth: 0,
  },

  clear: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 2,
    borderRadius: "var(--radius-full)",
    transition: "all var(--transition-fast)",
    background: "transparent",
    border: "none",
  },

  clearHover: {
    color: "var(--color-content-primary)",
    background: "var(--color-general-neutral-light)",
  },

  stateTokens: {
    enabled: {
      background: "var(--color-general-neutral-lighter)",
      outlineColor: "var(--color-interaction-outline-enabled)",
      boxShadow: "none",
      textColor: "var(--color-content-secondary)",
      iconColor: "var(--color-content-secondary)",
    },
    hover: {
      background: "var(--color-general-white)",
      outlineColor: "var(--color-interaction-outline-hover)",
      boxShadow: "var(--shadow-medium-down)",
      textColor: "var(--color-content-secondary)",
      iconColor: "var(--color-content-secondary)",
    },
    active: {
      background: "var(--color-general-white)",
      outlineColor: "var(--color-interaction-outline-active)",
      boxShadow: "var(--shadow-focus)",
      textColor: "var(--color-content-primary)",
      iconColor: "var(--color-content-secondary)",
    },
    filled: {
      background: "var(--color-general-white)",
      outlineColor: "var(--color-interaction-outline-enabled)",
      boxShadow: "var(--shadow-light-down)",
      textColor: "var(--color-content-primary)",
      iconColor: "var(--color-content-secondary)",
    },
    disabled: {
      background: "var(--color-general-neutral-lighter)",
      outlineColor: "var(--color-interaction-outline-enabled)",
      boxShadow: "none",
      textColor: "var(--color-general-neutral-dark)",
      iconColor: "var(--color-general-neutral-dark)",
    },
  },

  sizes: {
    sm: {
      wrapper: { height: 28, padding: "var(--spacing-xs) var(--spacing-sm)" },
      icon: { width: 12, height: 12 },
      input: {
        fontSize: "var(--text-body-caption)",
        lineHeight: "var(--line-height-body-caption)",
      },
    },
    md: {
      wrapper: { height: "var(--size-input-sm)" },
      icon: { width: "var(--size-icon-sm)", height: "var(--size-icon-sm)" },
      input: {
        fontSize: "var(--text-body-md)",
        lineHeight: "var(--line-height-body-md)",
      },
    },
    lg: {
      wrapper: { height: "var(--size-input-md)", padding: "var(--spacing-sm) var(--spacing-3)" },
      icon: { width: "var(--size-icon-sm)", height: "var(--size-icon-sm)" },
      input: {
        fontSize: "var(--text-body-lg)",
        lineHeight: "var(--line-height-body-lg)",
      },
    },
  },
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

/**
 * Search
 *
 */
export const Search = forwardRef(
  (
    {
      size = SEARCH_SIZES.md,
      placeholder = "Search...",
      value,
      defaultValue,
      isDisabled = false,
      disabled,
      visualState = SEARCH_VISUAL_STATES.auto,
      iconLeading,
      showClear = true,
      collapsed = false,
      onChange,
      onClear,
      onSubmit,
      onClick,
      style,
      id,
      name,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    injectPlaceholderStyles();

    const inputRef = useRef(null);
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [clearHovered, setClearHovered] = useState(false);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const isSearchDisabled = isDisabled || disabled;
    const hasValue = Boolean(currentValue && String(currentValue).length > 0);

    const sizeStyles = styles.sizes[size];

    const resolveVisualState = () => {
      if (isSearchDisabled || visualState === SEARCH_VISUAL_STATES.disabled) {
        return SEARCH_VISUAL_STATES.disabled;
      }

      if (visualState && visualState !== SEARCH_VISUAL_STATES.auto) {
        return visualState;
      }

      if (isFocused) return SEARCH_VISUAL_STATES.active;
      if (isHovered) return SEARCH_VISUAL_STATES.hover;
      if (hasValue) return SEARCH_VISUAL_STATES.filled;
      return SEARCH_VISUAL_STATES.enabled;
    };

    const currentState = resolveVisualState();
    const tone = styles.stateTokens[currentState] || styles.stateTokens.enabled;

    const handleChange = (e) => {
      const newValue = e.target.value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue("");
      }
      onClear?.();
      onChange?.("");
      inputRef.current?.focus();
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        onSubmit?.(currentValue);
      }
    };

    const handleWrapperClick = (e) => {
      onClick?.(e);
      if (!isSearchDisabled && !collapsed) {
        inputRef.current?.focus();
      }
    };

    const setRefs = (node) => {
      inputRef.current = node;

      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    // Compose wrapper styles
    const wrapperStyle = {
      ...styles.wrapper,
      ...sizeStyles.wrapper,
      background: tone.background,
      outlineColor: tone.outlineColor,
      boxShadow: tone.boxShadow,
      ...(isSearchDisabled && { cursor: "not-allowed" }),
      ...(collapsed && styles.wrapperCollapsed),
      ...style,
    };

    // Icon styles
    const iconStyle = {
      ...styles.icon,
      ...sizeStyles.icon,
      color: tone.iconColor,
    };

    // Input styles
    const inputStyle = {
      ...styles.input,
      ...sizeStyles.input,
      color: tone.textColor,
    };

    // Clear button styles
    const clearStyle = {
      ...styles.clear,
      color: tone.iconColor,
      ...(clearHovered && styles.clearHover),
    };

    return (
      <div
        style={wrapperStyle}
        onClick={handleWrapperClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <span style={iconStyle}>
          {iconLeading || (
            <MagnifyingGlassIcon style={{ width: sizeStyles.icon.width, height: sizeStyles.icon.height }} />
          )}
        </span>

        {!collapsed && (
          <>
            <input
              ref={setRefs}
              type="text"
              className="eureka-search-input"
              placeholder={placeholder}
              value={currentValue}
              disabled={isSearchDisabled}
              id={id}
              name={name}
              style={inputStyle}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              aria-label={ariaLabel || placeholder}
            />

            {showClear && currentValue && !isSearchDisabled && (
              <button
                type="button"
                style={clearStyle}
                onClick={handleClear}
                onMouseEnter={() => setClearHovered(true)}
                onMouseLeave={() => setClearHovered(false)}
                aria-label="Clear search"
              >
                <XMarkIcon style={{ width: sizeStyles.icon.width, height: sizeStyles.icon.height }} />
              </button>
            )}
          </>
        )}
      </div>
    );
  }
);

Search.displayName = "Search";
Search.sizes = SEARCH_SIZES;
Search.states = SEARCH_VISUAL_STATES;

export default Search;
