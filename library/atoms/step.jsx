/**
 * Step Component
 *
 * A step indicator for use in steppers/progress indicators.
 * Uses inline styles with CSS variables from tokens.css for consistent styling.
 *
 * @example
 * <Step status="completed" title="Step 1" subtitle="Jan 1, 2024" />
 * <Step status="current" title="Step 2" subtitle="Jan 15, 2024" />
 * <Step status="next" title="Step 3" />
 */

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const STEP_STATUS = {
  current: "current",
  completed: "completed",
  next: "next",
  pending: "pending",
  disabled: "disabled",
};

export const STEP_ORIENTATIONS = {
  horizontal: "horizontal",
  vertical: "vertical",
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  base: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 24,
    flex: 1,
  },

  vertical: {
    flex: "none",
    alignSelf: "stretch",
  },

  spacer: {
    alignSelf: "stretch",
    paddingTop: 8,
    paddingLeft: 8,
  },

  indicator: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 16,
    height: 16,
    borderRadius: "var(--radius-full)",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: "var(--radius-full)",
    boxShadow: "var(--shadow-light-down)",
  },

  content: {
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  title: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    fontWeight: 400,
    color: "var(--color-content-primary)",
  },

  subtitle: {
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-md)",
    lineHeight: "var(--line-height-body-md)",
    fontWeight: 400,
    color: "var(--color-content-secondary)",
    padding: 4,
    borderRadius: "var(--radius-sm)",
  },

  line: {
    content: "''",
    position: "absolute",
    background: "var(--color-content-tertiary)",
  },

  lineHorizontal: {
    top: 7,
    left: 16,
    right: 0,
    height: 2,
  },

  lineVertical: {
    top: 16,
    left: 7,
    bottom: 0,
    width: 2,
  },

  lineCompleted: {
    background: "var(--color-action-fill-primary-enabled)",
  },

  status: {
    current: {
      indicator: {
        background: "var(--color-action-fill-primary-enabled)",
        boxShadow: "var(--shadow-light-down)",
        padding: 1.6,
      },
      dot: { background: "var(--color-general-white)" },
      title: { fontWeight: 600 },
    },
    completed: {
      indicator: {
        background: "var(--color-action-fill-primary-enabled)",
        boxShadow: "var(--shadow-light-down)",
        padding: 1.6,
      },
      dot: { background: "var(--color-general-white)" },
    },
    next: {
      indicator: {
        background: "var(--color-general-white)",
        padding: 1.6,
      },
      dot: { background: "var(--color-content-secondary)" },
    },
    pending: {
      indicator: {
        background: "var(--color-general-white)",
        padding: 1.6,
      },
      dot: { background: "var(--color-content-tertiary)" },
    },
    disabled: {
      indicator: {
        background: "var(--color-general-white)",
        padding: 1.6,
      },
      dot: { background: "var(--color-content-tertiary)" },
      title: { color: "var(--color-content-tertiary)" },
      subtitle: { color: "var(--color-content-tertiary)", padding: 0 },
    },
  },
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

/**
 * Step
 *
 * @param {string} status - current | completed | next | pending | disabled (default: next)
 * @param {string} title - Step title text
 * @param {string} subtitle - Optional subtitle (e.g., date)
 * @param {boolean} showLine - Show connecting line to next step (default: true)
 * @param {string} orientation - horizontal | vertical (default: horizontal)
 * @param {object} style - Additional inline styles
 */
export const Step = ({
  status = STEP_STATUS.next,
  title,
  subtitle,
  showLine = true,
  orientation = STEP_ORIENTATIONS.horizontal,
  style,
  ...props
}) => {
  const statusStyles = styles.status[status] || styles.status.next;

  // Compose base styles
  const stepStyle = {
    ...styles.base,
    ...(orientation === "vertical" && styles.vertical),
    ...style,
  };

  // Indicator styles
  const indicatorStyle = {
    ...styles.indicator,
    ...statusStyles.indicator,
  };

  // Dot styles
  const dotStyle = {
    ...styles.dot,
    ...statusStyles.dot,
  };

  // Title styles
  const titleStyle = {
    ...styles.title,
    ...statusStyles.title,
  };

  // Subtitle styles
  const subtitleStyle = {
    ...styles.subtitle,
    ...statusStyles.subtitle,
  };

  // Line styles
  const lineStyle = showLine
    ? {
        ...styles.line,
        ...(orientation === "horizontal" ? styles.lineHorizontal : styles.lineVertical),
        ...(status === "completed" && styles.lineCompleted),
      }
    : null;

  return (
    <div style={stepStyle} {...props}>
      {/* Line (pseudo-element replacement) */}
      {lineStyle && <div style={lineStyle} />}

      {/* Spacer for indicator positioning */}
      <div style={styles.spacer} />

      {/* Step indicator */}
      <div style={indicatorStyle}>
        <div style={dotStyle} />
      </div>

      {/* Content */}
      <div style={styles.content}>
        {title && <span style={titleStyle}>{title}</span>}
        {subtitle && <span style={subtitleStyle}>{subtitle}</span>}
      </div>
    </div>
  );
};

Step.displayName = "Step";
Step.status = STEP_STATUS;
Step.orientations = STEP_ORIENTATIONS;

export default Step;
