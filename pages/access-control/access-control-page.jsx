import React from "react";
import { AccessControlModal } from "../../library/organisms/access-control-modal.jsx";

const OBJECTS = [
    { label: "initiative", initialIsPublic: false },
  { label: "opportunity", initialIsPublic: true },
  { label: "agreement", initialIsPublic: false },
  { label: "alliance", initialIsPublic: false },

];

const AccessControlPage = () => (
  <div
    style={{
      minHeight: "100vh",
      background: "var(--color-general-neutral-lighter)",
      padding: "var(--spacing-8)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--spacing-8)",
    }}
  >
    <h1
      style={{
        fontFamily: "var(--font-family-primary)",
        fontSize: "var(--text-heading-h2)",
        fontWeight: "var(--font-weight-bold)",
        color: "var(--color-content-primary)",
        margin: 0,
      }}
    >
      Access Control
    </h1>

    <div style={{ display: "flex", gap: "var(--spacing-6)", flexWrap: "wrap", alignItems: "flex-start" }}>
      {OBJECTS.map(({ label, initialIsPublic }) => (
        <InlineAccessControlModal
          key={label}
          objectLabel={label}
          initialIsPublic={initialIsPublic}
        />
      ))}
    </div>
  </div>
);

/**
 * Renders AccessControlModal content inline (not in an overlay) by rendering
 * the modal's inner shell as a card, reusing the same component but with a
 * wrapper that makes it always-visible.
 */
const InlineAccessControlModal = ({ objectLabel, initialIsPublic }) => (
  <div
    style={{
      background: "var(--color-general-white)",
      borderRadius: "var(--radius-md)",
      outline: "1px solid var(--color-action-outline-secondary-enabled)",
      outlineOffset: -1,
      width: 560,
      overflow: "hidden",
    }}
  >
    <AccessControlModal
      open={true}
      onClose={() => {}}
      objectLabel={objectLabel}
      initialIsPublic={initialIsPublic}
      inline
    />
  </div>
);

export default AccessControlPage;
