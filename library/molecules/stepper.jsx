/**
 * Stepper Component (Molecule)
 *
 * A progress stepper showing multiple steps with status indicators.
 * Uses Step atom from atoms/step.jsx.
 * Uses design tokens from tokens.css.
 */

import React from "react";
import { createStyleInjector, cx } from "../utils/styles.js";
import { ORIENTATIONS } from "../utils/props.js";
import { Step, STEP_STATUS } from "../atoms/step.jsx";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

/** Re-export orientations */
export { ORIENTATIONS };

/** Re-export step status */
export { STEP_STATUS };

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const styles = {
  base: `
    .stepper {
      display: inline-flex;
      width: 100%;
      padding: var(--spacing-6);
      background: var(--color-background-white);
      border-radius: var(--radius-md);
      outline: 1px solid var(--color-outline-neutral);
      outline-offset: -1px;
      box-sizing: border-box;
    }
    .stepper--horizontal {
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
    }
    .stepper--vertical {
      flex-direction: column;
      gap: var(--spacing-4);
    }
    .stepper--no-background {
      background: transparent;
      padding: 0;
      outline: none;
    }
  `,
};

const injectStyles = createStyleInjector("stepper");
const css = Object.values(styles).join("\n");

// ─────────────────────────────────────────────
// STEPPER COMPONENT
// ─────────────────────────────────────────────

/**
 * Stepper
 *
 * A progress stepper showing multiple steps.
 *
 * @param {string} orientation - horizontal | vertical (default: horizontal)
 * @param {number} currentStep - Index of the current step (0-based)
 * @param {array} steps - Array of step objects: [{ title, subtitle? }]
 * @param {boolean} showBackground - Show container background (default: true)
 * @param {function} onStepClick - Called when a step is clicked (receives step index)
 * @param {ReactNode} children - Alternative to steps prop (Step components)
 * @param {string} className - Additional CSS classes
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
 *
 * // Clickable steps
 * <Stepper
 *   currentStep={2}
 *   steps={steps}
 *   onStepClick={(index) => setCurrentStep(index)}
 * />
 */
export const Stepper = ({
  orientation = ORIENTATIONS.horizontal,
  currentStep = 0,
  steps = [],
  showBackground = true,
  onStepClick,
  className,
  children,
  ...props
}) => {
  injectStyles(css);

  const classes = cx(
    "stepper",
    `stepper--${orientation}`,
    !showBackground && "stepper--no-background",
    className
  );

  // If using children, render them directly
  if (children) {
    return (
      <div className={classes} {...props}>
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
    <div className={classes} {...props}>
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
Stepper.orientations = ORIENTATIONS;
Stepper.stepStatus = STEP_STATUS;

// Export Step for direct usage
export { Step } from "../atoms/step.jsx";

export default Stepper;
