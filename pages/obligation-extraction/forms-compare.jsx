"use client";

/**
 * Side-by-side comparison of both obligation form versions.
 */

import ObligationForm from "./form.jsx";
import ObligationFormV2 from "./form-v2.jsx";

export default function ObligationFormsCompare() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "var(--color-general-neutral-light, #f5f5f5)",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      {/* Labels row */}
      <style>{`
        .compare-col {
          flex: 0 0 480px;
          width: 480px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .compare-form-wrap {
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .compare-divider {
          width: 200px;
          background: var(--color-action-outline-secondary-enabled, #e0e0e0);
          flex-shrink: 0;
        }
      `}</style>

      {/* V1 column */}
      <div className="compare-col">
        <div className="compare-form-wrap">
          <ObligationForm />
        </div>
      </div>

      <div className="compare-divider" />

      {/* V2 column */}
      <div className="compare-col">
        <div className="compare-form-wrap">
          <ObligationFormV2 />
        </div>
      </div>
    </div>
  );
}

