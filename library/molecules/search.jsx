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

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const SEARCH_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: 8,
    width: "100%",
    boxSizing: "border-box",
    cursor: "text",
    background: "var(--color-general-neutral-lighter)",
    borderRadius: "var(--radius-full)",
    outline: "1px solid var(--color-interaction-outline-enabled)",
    outlineOffset: "-1px",
    transition: "all var(--transition-fast)",
  },

  wrapperHover: {
    outlineColor: "var(--color-interaction-outline-hover)",
  },

  wrapperFocus: {
    outlineColor: "var(--color-interaction-outline-active)",
    boxShadow: "var(--shadow-focus)",
    background: "var(--color-interaction-fill-enabled)",
  },

  wrapperDisabled: {
    background: "var(--color-interaction-fill-disabled)",
    cursor: "not-allowed",
    opacity: 0.6,
  },

  wrapperCollapsed: {
    width: 32,
    padding: 8,
    justifyContent: "center",
  },

  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-secondary)",
    flexShrink: 0,
  },

  input: {
    flex: 1,
    border: "none",
    background: "transparent",
    fontFamily: "var(--font-family-primary)",
    color: "var(--color-content-primary)",
    outline: "none",
    minWidth: 0,
  },

  inputPlaceholder: {
    color: "var(--color-content-tertiary)",
  },

  clear: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-content-tertiary)",
    cursor: "pointer",
    padding: 2,
    borderRadius: "var(--radius-full)",
    transition: "all var(--transition-fast)",
    background: "transparent",
    border: "none",
  },

  clearHover: {
    color: "var(--color-content-secondary)",
    background: "var(--color-general-neutral-light)",
  },

  sizes: {
    sm: {
      wrapper: { height: 28, padding: "4px 8px" },
      icon: { width: 12, height: 12 },
      input: {
        fontSize: "var(--text-body-caption)",
        lineHeight: "var(--line-height-body-caption)",
      },
    },
    md: {
      wrapper: { height: 32 },
      icon: { width: 14, height: 14 },
      input: {
        fontSize: "var(--text-body-md)",
        lineHeight: "var(--line-height-body-md)",
      },
    },
    lg: {
      wrapper: { height: 40, padding: "8px 12px" },
      icon: { width: 16, height: 16 },
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
    const inputRef = useRef(null);
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [clearHovered, setClearHovered] = useState(false);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const isSearchDisabled = isDisabled || disabled;

    const sizeStyles = styles.sizes[size];

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

    // Compose wrapper styles
    const wrapperStyle = {
      ...styles.wrapper,
      ...sizeStyles.wrapper,
      ...(isHovered && !isSearchDisabled && styles.wrapperHover),
      ...(isFocused && !isSearchDisabled && styles.wrapperFocus),
      ...(isSearchDisabled && styles.wrapperDisabled),
      ...(collapsed && styles.wrapperCollapsed),
      ...style,
    };

    // Icon styles
    const iconStyle = {
      ...styles.icon,
      ...sizeStyles.icon,
    };

    // Input styles
    const inputStyle = {
      ...styles.input,
      ...sizeStyles.input,
    };

    // Clear button styles
    const clearStyle = {
      ...styles.clear,
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
          <MagnifyingGlassIcon style={{ width: sizeStyles.icon.width, height: sizeStyles.icon.height }} />
        </span>

        {!collapsed && (
          <>
            <input
              ref={ref || inputRef}
              type="text"
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

export default Search;
