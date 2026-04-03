/**
 * Portal Component
 *
 * Renders children into a DOM node outside the parent component hierarchy.
 * Useful for modals, dropdowns, tooltips that need to escape overflow/z-index.
 */

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// ─────────────────────────────────────────────
// PORTAL COMPONENT
// ─────────────────────────────────────────────

/**
 * Portal
 *
 * Renders children into a portal container at the end of document.body.
 * SSR-safe - returns null on server.
 *
 * @param {ReactNode} children - Content to render in portal
 * @param {string} containerId - Optional custom container ID (default: "eureka-portal")
 * @param {HTMLElement} container - Optional custom container element
 *
 * @example
 * <Portal>
 *   <div className="modal">Modal content</div>
 * </Portal>
 *
 * @example
 * // With custom container
 * <Portal containerId="custom-portal">
 *   <Tooltip>Tooltip content</Tooltip>
 * </Portal>
 */
export const Portal = ({
  children,
  containerId = "eureka-portal",
  container,
}) => {
  const [mounted, setMounted] = useState(false);
  const [portalContainer, setPortalContainer] = useState(null);

  useEffect(() => {
    setMounted(true);

    // Use provided container or find/create one
    let targetContainer = container;

    if (!targetContainer) {
      targetContainer = document.getElementById(containerId);

      if (!targetContainer) {
        targetContainer = document.createElement("div");
        targetContainer.id = containerId;
        targetContainer.setAttribute("data-eureka-portal", "");
        document.body.appendChild(targetContainer);
      }
    }

    setPortalContainer(targetContainer);

    return () => {
      // Clean up empty portal containers
      if (
        targetContainer &&
        !container &&
        targetContainer.childNodes.length === 0
      ) {
        targetContainer.remove?.();
      }
    };
  }, [containerId, container]);

  // SSR-safe: return null on server
  if (!mounted || !portalContainer) {
    return null;
  }

  return createPortal(children, portalContainer);
};

Portal.displayName = "Portal";

// ─────────────────────────────────────────────
// FOCUS TRAP HOOK
// ─────────────────────────────────────────────

/**
 * useFocusTrap
 *
 * Traps focus within a container element.
 * Returns a ref to attach to the container.
 *
 * @param {boolean} active - Whether the trap is active
 * @returns {React.RefObject} - Ref to attach to container
 *
 * @example
 * const trapRef = useFocusTrap(isOpen);
 * <div ref={trapRef}>...</div>
 */
export const useFocusTrap = (active) => {
  const [containerRef, setContainerRef] = useState(null);

  useEffect(() => {
    if (!active || !containerRef) return;

    const focusableElements = containerRef.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    containerRef.addEventListener("keydown", handleKeyDown);

    // Focus the first focusable element or the container
    if (firstFocusable) {
      firstFocusable.focus();
    } else {
      containerRef.focus();
    }

    return () => {
      containerRef.removeEventListener("keydown", handleKeyDown);
    };
  }, [active, containerRef]);

  return setContainerRef;
};

// ─────────────────────────────────────────────
// SCROLL LOCK HOOK
// ─────────────────────────────────────────────

/**
 * useScrollLock
 *
 * Prevents body scroll when active.
 *
 * @param {boolean} active - Whether scroll lock is active
 *
 * @example
 * useScrollLock(isModalOpen);
 */
export const useScrollLock = (active) => {
  useEffect(() => {
    if (!active || typeof document === "undefined") return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [active]);
};

export default Portal;
