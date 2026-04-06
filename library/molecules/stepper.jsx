/**
 * Stepper Component (Molecule)
 *
 * A progress stepper showing multiple steps with status indicators.
 * Uses Step atom from atoms/step.jsx.
 * Uses inline styles with CSS variables from tokens.css.
 */

import React from "react";
import { Step, STEP_STATUS } from "../atoms/step.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

export const STEPPER_ORIENTATIONS = {
  horizontal: "horizontal",
  vertical: "vertical",
};

/** Re-export step status */
export { STEP_STATUS };

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  base: {
    display: "inline-flex",
    width: "100%",
    padding: 24,
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-md)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    boxSizing: "border-box",
  },

  horizontal: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  vertical: {
    flexDirection: "column",
    gap: 16,
  },

  noBackground: {
    background: "transparent",
    padding: 0,
    outline: "none",
  },
};

// ─────────────────────────────────────────────
// STEPPER COMPONENT
// ─────────────────────────────────────────────

/**
 * Stepper
 *
 * A progress stepper showing multiple steps.
 *
 *
 * @example
 * // With steps prop
 * <Stepper
 *   currentStep={1}
 *   steps={[
 *     { title: "Draft", subtitle: "Jan 1, 2024" },
 *     { title: "Review", subtitle: "Jan 15, 2024" },
 *     { title: "Approved" },
 *     { title: "Published" },
 *   ]}
 * />
 *
 * // With children
 * <Stepper orientation="vertical">
 *   <Step status="completed" title="Step 1" subtitle="Done" />
 *   <Step status="current" title="Step 2" subtitle="In progress" />
 *   <Step status="next" title="Step 3" />
 *   <Step status="disabled" title="Step 4" />
 * </Stepper>
 */
export const Stepper = ({
  orientation = STEPPER_ORIENTATIONS.horizontal,
  currentStep = 0,
  steps = [],
  showBackground = true,
  onStepClick,
  style,
  children,
  ...props
}) => {
  // Compose stepper styles
  const stepperStyle = {
    ...styles.base,
    ...styles[orientation],
    ...(!showBackground && styles.noBackground),
    ...style,
  };

  // If using children, render them directly
  if (children) {
    return (
      <div style={stepperStyle} {...props}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child;

          return React.cloneElement(child, {
            orientation,
            showLine: index < React.Children.count(children) - 1,
          });
        })}
      </div>
    );
  }

  // Using steps prop - auto-determine status based on currentStep
  return (
    <div style={stepperStyle} {...props}>
      {steps.map((step, index) => {
        let status;
        if (index < currentStep) {
          status = "completed";
        } else if (index === currentStep) {
          status = "current";
        } else {
          status = "disabled";
        }

        const isLast = index === steps.length - 1;
        const isClickable = onStepClick && index <= currentStep;

        return (
          <Step
            key={index}
            status={status}
            title={step.title}
            subtitle={step.subtitle}
            orientation={orientation}
            showLine={!isLast}
            onClick={isClickable ? () => onStepClick(index) : undefined}
            style={isClickable ? { cursor: "pointer" } : undefined}
          />
        );
      })}
    </div>
  );
};

Stepper.displayName = "Stepper";
Stepper.orientations = STEPPER_ORIENTATIONS;
Stepper.stepStatus = STEP_STATUS;
Stepper.Step = Step;

// Export Step for direct usage
export { Step } from "../atoms/step.jsx";

export default Stepper;
