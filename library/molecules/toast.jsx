"use client";

/**
 * Toast Molecule
 *
 * Reusable toast notifications with slide-in animation, auto-dismiss,
 * optional action button, and close button.
 *
 * Use `ToastProvider` + `useToast` for app-wide triggers.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";

export const TOAST_VARIANTS = {
  success: "success",
  warning: "warning",
  error: "error",
  info: "info",
  neutral: "neutral",
};

export const TOAST_POSITIONS = {
  "top-left": "top-left",
  "top-right": "top-right",
  "bottom-left": "bottom-left",
  "bottom-right": "bottom-right",
};

const TOAST_ENTER_MS = 180;
const TOAST_EXIT_MS = 180;
const TOAST_DEFAULT_DURATION = 4000;

const VARIANT_META = {
  [TOAST_VARIANTS.success]: {
    bg: "var(--color-general-positive)",
    iconColor: "var(--color-content-positive)",
    iconName: "CheckCircle",
  },
  [TOAST_VARIANTS.warning]: {
    bg: "var(--color-general-warning)",
    iconColor: "var(--color-content-warning)",
    iconName: "ExclamationTriangle",
  },
  [TOAST_VARIANTS.error]: {
    bg: "var(--color-general-negative)",
    iconColor: "var(--color-content-negative)",
    iconName: "XCircle",
  },
  [TOAST_VARIANTS.info]: {
    bg: "var(--color-general-informative)",
    iconColor: "var(--color-content-brand)",
    iconName: "InformationCircle",
  },
  [TOAST_VARIANTS.neutral]: {
    bg: "var(--color-general-neutral-light)",
    iconColor: "var(--color-content-secondary)",
    iconName: "InformationCircle",
  },
};

const styles = {
  viewport: {
    position: "fixed",
    zIndex: 1200,
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-4)",
    width: "min(92vw, 720px)",
    pointerEvents: "none",
  },
  positions: {
    [TOAST_POSITIONS["top-left"]]: {
      top: "var(--spacing-6)",
      left: "var(--spacing-6)",
      alignItems: "flex-start",
    },
    [TOAST_POSITIONS["top-right"]]: {
      top: "var(--spacing-6)",
      right: "var(--spacing-6)",
      alignItems: "flex-end",
    },
    [TOAST_POSITIONS["bottom-left"]]: {
      bottom: "var(--spacing-6)",
      left: "var(--spacing-6)",
      alignItems: "flex-start",
    },
    [TOAST_POSITIONS["bottom-right"]]: {
      bottom: "var(--spacing-6)",
      right: "var(--spacing-6)",
      alignItems: "flex-end",
    },
  },
  toast: {
    width: "100%",
    minHeight: 48,
    padding: "var(--spacing-sm)",
    borderRadius: "var(--radius-sm)",
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-4)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    boxShadow: "var(--shadow-light-down)",
    boxSizing: "border-box",
    pointerEvents: "auto",
    transition: `opacity ${TOAST_ENTER_MS}ms ease, transform ${TOAST_ENTER_MS}ms ease`,
  },
  left: {
    flex: "1 1 0",
    minWidth: 0,
    display: "flex",
    alignItems: "flex-start",
    gap: "var(--spacing-sm)",
  },
  message: {
    flex: "1 1 0",
    minWidth: 0,
    margin: 0,
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-primary)",
    overflowWrap: "anywhere",
  },
  iconWrap: {
    width: "var(--size-icon-sm)",
    height: "var(--size-icon-sm)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  actions: {
    display: "inline-flex",
    alignItems: "center",
    gap: "var(--spacing-2)",
    flexShrink: 0,
  },
};

const ToastContext = createContext(null);

const buildToastId = (() => {
  let seq = 0;
  return () => {
    seq += 1;
    return `toast-${Date.now()}-${seq}`;
  };
})();

export const Toast = ({
  variant = TOAST_VARIANTS.neutral,
  message,
  actionLabel,
  onAction,
  closeOnAction = true,
  onDismiss,
  dismissible = true,
  showActionButton,
  showCloseButton,
  iconName,
  actionProps,
  toastPayload,
  phase = "entered",
}) => {
  const meta = VARIANT_META[variant] || VARIANT_META[TOAST_VARIANTS.neutral];
  const resolvedShowActionButton = showActionButton ?? Boolean(actionLabel);
  const resolvedShowCloseButton = showCloseButton ?? dismissible;

  const phaseStyle =
    phase === "from"
      ? { opacity: 0, transform: "translateX(16px)" }
      : phase === "leaving"
      ? { opacity: 0, transform: "translateX(16px)" }
      : { opacity: 1, transform: "translateX(0)" };

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        ...styles.toast,
        background: meta.bg,
        ...phaseStyle,
      }}
    >
      <div style={styles.left}>
        <span style={{ ...styles.iconWrap, color: meta.iconColor }}>
          <Icon name={iconName || meta.iconName} size="sm" />
        </span>
        <p style={styles.message}>{message}</p>
      </div>

      <div style={styles.actions}>
        {resolvedShowActionButton && actionLabel ? (
          <Button
            variant="secondary"
            size="md"
            onClick={() => {
              onAction?.(toastPayload);
              if (closeOnAction) onDismiss?.();
            }}
            {...(actionProps || {})}
          >
            {actionLabel}
          </Button>
        ) : null}

        {resolvedShowCloseButton ? (
          <Button
            variant="tertiary"
            size="sm"
            iconOnly
            ariaLabel="Dismiss notification"
            onClick={onDismiss}
            iconLeading={<Icon name="XMark" size="sm" />}
          />
        ) : null}
      </div>
    </div>
  );
};

const ToastItem = ({ toast, onRemove }) => {
  const {
    id,
    variant = TOAST_VARIANTS.neutral,
    message,
    duration = TOAST_DEFAULT_DURATION,
    autoDismiss = true,
    actionLabel,
    onAction,
    closeOnAction = true,
    dismissible = true,
    showActionButton,
    showCloseButton,
    iconName,
    actionProps,
  } = toast;

  const [phase, setPhase] = useState("from");
  const removeTimerRef = useRef(null);

  const meta = VARIANT_META[variant] || VARIANT_META[TOAST_VARIANTS.neutral];

  const requestClose = useCallback(() => {
    setPhase("leaving");
    window.clearTimeout(removeTimerRef.current);
    removeTimerRef.current = window.setTimeout(() => {
      onRemove(id);
    }, TOAST_EXIT_MS);
  }, [id, onRemove]);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => {
      setPhase("entered");
    });
    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!autoDismiss || duration <= 0) return undefined;
    const timer = window.setTimeout(requestClose, duration);
    return () => window.clearTimeout(timer);
  }, [autoDismiss, duration, requestClose]);

  useEffect(() => {
    return () => window.clearTimeout(removeTimerRef.current);
  }, []);

  return (
    <Toast
      variant={variant}
      message={message}
      actionLabel={actionLabel}
      onAction={onAction}
      closeOnAction={closeOnAction}
      onDismiss={requestClose}
      dismissible={dismissible}
      showActionButton={showActionButton}
      showCloseButton={showCloseButton}
      iconName={iconName}
      actionProps={actionProps}
      toastPayload={toast}
      phase={phase}
    />
  );
};

export const ToastViewport = ({
  toasts = [],
  position = TOAST_POSITIONS["bottom-right"],
  onRemove,
  style,
}) => {
  if (!toasts.length) return null;

  const resolvedPosition = styles.positions[position] || styles.positions[TOAST_POSITIONS["bottom-right"]];

  return (
    <div style={{ ...styles.viewport, ...resolvedPosition, ...style }}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

export const ToastProvider = ({
  children,
  position = TOAST_POSITIONS["bottom-right"],
  maxToasts = 5,
  defaultDuration = TOAST_DEFAULT_DURATION,
}) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addToast = useCallback(
    (toastConfig) => {
      const id = toastConfig?.id || buildToastId();
      const nextToast = {
        id,
        variant: toastConfig?.variant || TOAST_VARIANTS.neutral,
        message: toastConfig?.message || "",
        duration: toastConfig?.duration ?? defaultDuration,
        autoDismiss: toastConfig?.autoDismiss ?? true,
        dismissible: toastConfig?.dismissible ?? true,
        showActionButton: toastConfig?.showActionButton,
        showCloseButton: toastConfig?.showCloseButton,
        actionLabel: toastConfig?.actionLabel,
        onAction: toastConfig?.onAction,
        closeOnAction: toastConfig?.closeOnAction ?? true,
        iconName: toastConfig?.iconName,
        actionProps: toastConfig?.actionProps,
      };

      setToasts((prev) => {
        const next = [...prev, nextToast];
        return next.slice(Math.max(0, next.length - maxToasts));
      });

      return id;
    },
    [defaultDuration, maxToasts]
  );

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const contextValue = useMemo(
    () => ({
      toasts,
      addToast,
      toast: addToast,
      dismissToast: removeToast,
      clearToasts,
      success: (config) => addToast({ ...config, variant: TOAST_VARIANTS.success }),
      warning: (config) => addToast({ ...config, variant: TOAST_VARIANTS.warning }),
      error: (config) => addToast({ ...config, variant: TOAST_VARIANTS.error }),
      info: (config) => addToast({ ...config, variant: TOAST_VARIANTS.info }),
      neutral: (config) => addToast({ ...config, variant: TOAST_VARIANTS.neutral }),
    }),
    [toasts, addToast, removeToast, clearToasts]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastViewport toasts={toasts} position={position} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};

export default ToastProvider;
