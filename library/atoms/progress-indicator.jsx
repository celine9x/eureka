/**
 * ProgressIndicator Component
 *
 * A token-based progress indicator for tracking completion or progress.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <ProgressIndicator value={45} />
 * <ProgressIndicator value={75} labelPosition="right" />
 * <ProgressIndicator value={90} labelPosition="bottom-floating" />
 */

export const PROGRESS_INDICATOR_LABEL_POSITIONS = {
  right: "right",
  bottom: "bottom",
  topFloating: "top-floating",
  bottomFloating: "bottom-floating",
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const styles = {
  track: {
    position: "relative",
    width: "100%",
    height: 8,
    overflow: "hidden",
    borderRadius: "var(--radius-md)",
    background: "var(--color-general-neutral-light)",
    boxShadow: "inset 0 0 0 1px var(--color-action-outline-secondary-enabled)",
    boxSizing: "border-box",
  },

  fill: {
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
    background: "var(--color-action-fill-primary-enabled)",
    transformOrigin: "left center",
    transition: "transform var(--transition-fast)",
  },

  wrapper: {
    position: "relative",
    width: "100%",
  },

  label: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-secondary)",
    whiteSpace: "nowrap",
  },

  floatingBadge: {
    position: "absolute",
    top: 0,
    transform: "translate(-50%, -50%)",
    background: "var(--color-general-white)",
    border: "1px solid var(--color-action-outline-secondary-enabled)",
    borderRadius: "var(--radius-sm)",
    boxShadow: "var(--shadow-light-down)",
    padding: "var(--spacing-xs) var(--spacing-sm)",
    zIndex: 1,
  },
};

export const ProgressIndicatorBase = ({
  value,
  min = 0,
  max = 100,
  className,
  progressClassName,
  style,
  fillStyle,
  ...props
}) => {
  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) ? Math.max(max, safeMin + 1) : 100;
  const safeValue = clamp(Number.isFinite(value) ? value : 0, safeMin, safeMax);
  const percentage = ((safeValue - safeMin) * 100) / (safeMax - safeMin);

  const trackStyle = {
    ...styles.track,
    ...(className ? undefined : undefined),
    ...style,
  };

  const fillStyleResolved = {
    ...styles.fill,
    transform: `translateX(-${100 - percentage}%)`,
    ...fillStyle,
  };

  return (
    <div
      role="progressbar"
      aria-valuenow={safeValue}
      aria-valuemin={safeMin}
      aria-valuemax={safeMax}
      style={trackStyle}
      {...props}
    >
      <div
        style={{
          ...fillStyleResolved,
          ...(progressClassName ? undefined : undefined),
        }}
      />
    </div>
  );
};

ProgressIndicatorBase.displayName = "ProgressIndicatorBase";

export const ProgressIndicator = ({
  value,
  min = 0,
  max = 100,
  labelPosition = PROGRESS_INDICATOR_LABEL_POSITIONS.right,
  valueFormatter,
  className,
  progressClassName,
  style,
  fillStyle,
  trackStyle,
  labelStyle,
  labelGap = "var(--spacing-3)",
  labelMinWidth = "4ch",
  labelAlign = "center",
  phaseLabels,
  phaseCount,
  usePhaseMode,
  ...props
}) => {
  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) ? Math.max(max, safeMin + 1) : 100;
  const safeValue = clamp(Number.isFinite(value) ? value : 0, safeMin, safeMax);
  const percentage = ((safeValue - safeMin) * 100) / (safeMax - safeMin);

  const shouldUsePhaseMode = usePhaseMode ?? Boolean(phaseLabels || phaseCount);
  const resolvedPhaseCount = Number.isFinite(phaseCount) ? Math.max(1, Number(phaseCount)) : null;
  const resolvedPhaseLabels = Array.isArray(phaseLabels) ? phaseLabels.filter((label) => label !== undefined && label !== null) : [];
  const phaseTotal = resolvedPhaseLabels.length > 0 ? resolvedPhaseLabels.length : resolvedPhaseCount;

  const getPhaseLabel = () => {
    if (!shouldUsePhaseMode || !phaseTotal || phaseTotal <= 1) {
      return valueFormatter ? valueFormatter(safeValue, percentage) : `${Math.round(percentage)}%`;
    }

    const eachStep = 100 / phaseTotal;
    const phaseIndex = Math.min(phaseTotal - 1, Math.floor(percentage / eachStep));

    if (resolvedPhaseLabels.length > 0) {
      return resolvedPhaseLabels[phaseIndex] || resolvedPhaseLabels[resolvedPhaseLabels.length - 1];
    }

    return `${phaseIndex + 1}/${phaseTotal}`;
  };

  const formattedValue = getPhaseLabel();

  const baseProgress = (
    <ProgressIndicatorBase
      value={safeValue}
      min={safeMin}
      max={safeMax}
      className={className}
      progressClassName={progressClassName}
      style={{ ...style, ...trackStyle }}
      fillStyle={fillStyle}
      {...props}
    />
  );

  const defaultLabelStyle = {
    ...styles.label,
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-secondary)",
    textAlign: labelAlign,
  };

  if (labelPosition === PROGRESS_INDICATOR_LABEL_POSITIONS.right) {
    const percentageLabel = valueFormatter ? valueFormatter(safeValue, percentage) : `${Math.round(percentage)}%`;
    const phaseText = shouldUsePhaseMode && phaseTotal && phaseTotal > 1 ? formattedValue : null;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-2)", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: labelGap, width: "100%" }}>
          <div style={{ flex: 1, minWidth: 0 }}>{baseProgress}</div>
          <span
            style={{
              ...defaultLabelStyle,
              ...labelStyle,
              display: "inline-block",
              minWidth: labelMinWidth,
              textAlign: labelAlign,
            }}
          >
            {percentageLabel}
          </span>
        </div>
        {phaseText ? (
          <div style={{ width: "100%", display: "flex", justifyContent: labelAlign === "center" ? "center" : "flex-end" }}>
            <span style={{ ...defaultLabelStyle, ...labelStyle, display: "inline-block" }}>{phaseText}</span>
          </div>
        ) : null}
      </div>
    );
  }

  if (labelPosition === PROGRESS_INDICATOR_LABEL_POSITIONS.bottom) {
    const percentageLabel = valueFormatter ? valueFormatter(safeValue, percentage) : `${Math.round(percentage)}%`;
    const phaseText = shouldUsePhaseMode && phaseTotal && phaseTotal > 1 ? formattedValue : null;

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: labelAlign === "center" ? "center" : "flex-end", gap: "var(--spacing-2)", width: "100%" }}>
        {baseProgress}
        <div style={{ width: "100%", display: "flex", justifyContent: labelAlign === "center" ? "center" : "flex-end" }}>
          <span style={{ ...defaultLabelStyle, ...labelStyle, minWidth: labelMinWidth, textAlign: labelAlign }}>{percentageLabel}</span>
        </div>
        {phaseText ? (
          <div style={{ width: "100%", display: "flex", justifyContent: labelAlign === "center" ? "center" : "flex-end" }}>
            <span style={{ ...defaultLabelStyle, ...labelStyle, display: "inline-block" }}>{phaseText}</span>
          </div>
        ) : null}
      </div>
    );
  }

  if (labelPosition === PROGRESS_INDICATOR_LABEL_POSITIONS.topFloating || labelPosition === PROGRESS_INDICATOR_LABEL_POSITIONS.bottomFloating) {
    const isTop = labelPosition === PROGRESS_INDICATOR_LABEL_POSITIONS.topFloating;

    return (
      <div style={{ position: "relative", width: "100%" }}>
        {baseProgress}
        <div
          style={{
            ...styles.floatingBadge,
            left: `${percentage}%`,
            ...(isTop ? { top: 0 } : { top: "100%" }),
            ...(isTop ? { transform: "translate(-50%, -50%)" } : { transform: "translate(-50%, 0%)" }),
          }}
        >
          <span style={{ ...defaultLabelStyle, fontSize: "var(--text-body-sm)", lineHeight: "var(--line-height-body-sm)" }}>{formattedValue}</span>
        </div>
      </div>
    );
  }

  return baseProgress;
};

ProgressIndicator.displayName = "ProgressIndicator";

export default ProgressIndicator;
