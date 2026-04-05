/**
 * PreviewComponent
 *
 * A component for displaying component examples with code toggle.
 * Used in test/demo pages to show both the rendered component and its code.
 */

import React, { useState } from "react";
import { ButtonGroup, ButtonGroupItem } from "../molecules/button-group.jsx";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";

/* ===========================================
   STYLE CONFIGURATION
   =========================================== */

const styles = {
  base: `
    .preview-component {
      margin-bottom: var(--spacing-4);
    }
    .preview-component__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--spacing-4);
      padding-bottom: var(--spacing-3);
      border-bottom: 1px solid var(--color-action-outline-secondary-enabled);
    }
    .preview-component__title {
      font-family: var(--font-family-primary);
      font-size: var(--text-heading-h3);
      font-weight: var(--font-weight-heading-h3);
      color: var(--color-content-primary);
      margin: 0;
    }
    .preview-component__controls {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }
    .preview-component__content {
      background: var(--color-general-white);
      border: 1px solid var(--color-action-outline-secondary-enabled);
      border-radius: var(--radius-lg);
      overflow: hidden;
    }
    .preview-component__preview {
      padding: var(--spacing-6);
      overflow-x: auto;
      overflow-y: visible;
      -webkit-overflow-scrolling: touch;
    }
    .preview-component__code {
      padding: 0;
      margin: 0;
      background: var(--color-general-white);
      border-radius: var(--radius-lg);
      overflow: auto;
    }
    .preview-component__code pre {
      margin: 0;
      padding: var(--spacing-6);
      font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
      font-size: 0.875rem;
      line-height: 1.5;
      color: var(--color-content-primary);
      overflow-x: auto;
    }
    .preview-component__code code {
      font-family: inherit;
    }
  `,
};

/* ===========================================
   STYLE INJECTION (SSR-safe)
   =========================================== */

let stylesInjected = false;

const injectStyles = () => {
  if (stylesInjected || typeof document === "undefined") return;

  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-eureka", "preview-component");
  styleEl.textContent = styles.base;
  document.head.appendChild(styleEl);
  stylesInjected = true;
};

/* ===========================================
   PREVIEW COMPONENT
   =========================================== */

/**
 * PreviewComponent
 *
 * @param {string} title - The title/name of the component being demonstrated
 * @param {React.ReactNode} children - The preview content (rendered component)
 * @param {string} code - The code example as a string
 * @param {string} defaultView - Initial view mode: "preview" or "code" (default: "preview")
 * @param {React.ReactNode} actions - Optional additional actions to show in header
 */
export const PreviewComponent = ({
  title = "Component example",
  children,
  code = "",
  defaultView = "preview",
  actions,
  className = "",
  ...props
}) => {
  injectStyles();

  const [view, setView] = useState(defaultView);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const classes = ["preview-component", className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...props}>
      <div className="preview-component__header">
        <h3 className="preview-component__title">{title}</h3>
        <div className="preview-component__controls">
          {actions}
          {view === "code" && code && (
            <Button
              variant="secondary"
              size="md"
              iconLeading={<Icon name={copied ? "Check" : "DocumentDuplicate"} size="sm" />}
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          )}
          <ButtonGroup value={view} onChange={setView}>
            <ButtonGroupItem value="preview" iconName="Squares2X2">
              Preview
            </ButtonGroupItem>
            <ButtonGroupItem value="code" iconName="DocumentText">
              Code
            </ButtonGroupItem>
          </ButtonGroup>
        </div>
      </div>

      <div className="preview-component__content">
        {view === "preview" ? (
          <div className="preview-component__preview">{children}</div>
        ) : (
          <div className="preview-component__code">
            {code ? (
              <pre>
                <code>{code}</code>
              </pre>
            ) : (
              <pre>
                <code>No code provided</code>
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

PreviewComponent.displayName = "PreviewComponent";

export default PreviewComponent;
