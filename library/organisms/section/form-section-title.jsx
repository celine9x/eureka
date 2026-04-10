import React from "react";
import { Icon } from "../../atoms/icon.jsx";

/**
 * FormSectionTitle
 * A simple section title for forms.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Section title content
 * @param {object} [props.style] - Style overrides
 */
export const FormSectionTitle = ({ children, style, ...props }) => (
  <h4
    style={{
      margin: 0,
      fontFamily: "var(--font-family-primary)",
      fontSize: "var(--text-heading-h5)",
      lineHeight: "var(--line-height-heading-h5)",
      fontWeight: "var(--font-weight-semibold)",
      color: "var(--color-content-primary)",
      ...style,
    }}
    {...props}
  >
    {children}
  </h4>
);

FormSectionTitle.displayName = "FormSectionTitle";

/**
 * CollapsibleFormSectionTitle
 * A section title that can be collapsed/expanded with optional chevron.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Section title content
 * @param {boolean} [props.isOpen] - Whether the content is expanded (controlled)
 * @param {function} [props.onToggle] - Function to toggle open state (controlled)
 * @param {boolean} [props.defaultOpen] - Initial open state (uncontrolled)
 * @param {boolean} [props.showChevron=true] - Whether to display chevron
 * @param {object} [props.style] - Style overrides
 * @param {string} [props.className] - Additional className
 */
export const CollapsibleFormSectionTitle = ({
  children,
  isOpen,
  onToggle,
  defaultOpen = false,
  showChevron = true,
  style,
  className = "",
}) => {
  const isControlled = isOpen !== undefined && onToggle !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const openState = isControlled ? isOpen : internalOpen;

  const handleToggle = () => {
    if (isControlled) {
      onToggle(!openState);
    } else {
      setInternalOpen(!openState);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: showChevron ? "pointer" : "default",
        padding: "var(--spacing-2)",
        ...style,
      }}
      className={["form-section-title-container", className].filter(Boolean).join(" ")}
      onClick={showChevron ? handleToggle : undefined}
    >
      <h4
        style={{
          margin: 0,
          fontFamily: "var(--font-family-primary)",
          fontSize: "var(--text-heading-h5)",
          lineHeight: "var(--line-height-heading-h5)",
          fontWeight: "var(--font-weight-semibold)",
          color: "var(--color-content-primary)",
        }}
      >
        {children}
      </h4>
      {showChevron && (
        <Icon
          name={openState ? "ChevronUp" : "ChevronDown"}
          size="sm"
          style={{ transition: "transform 0.2s" }}
        />
      )}
    </div>
  );
};

/**
 * Usage inside a container for collapsible content:
 * 
 * const [isOpen, setIsOpen] = React.useState(false);
 * 
 * <CollapsibleFormSectionTitle
 *   onToggle={setIsOpen}
 *   isOpen={isOpen}
 *   showChevron={true}
 * >
 *   Your Title
 * </CollapsibleFormSectionTitle>
 * {isOpen && <div>Your collapsible content here</div>}
 */