import React from "react";
import { AccessControlModal } from "../../library/organisms/access-control-modal.jsx";
import { Link } from "../../library/atoms/link.jsx";
import { Tooltip } from "../../library/atoms/tooltip.jsx";
import { MOCK_GROUP_MEMBERS } from "./access-control-data.js";

const OBJECTS = [
  { label: "initiative", initialIsPublic: false },
  {
    label: "opportunity1",
    displayLabel: "opportunity",
    initialIsPublic: true,
    initiativeVisibility: "public",
  },
  {
    label: "opportunity2",
    displayLabel: "opportunity",
    initialIsPublic: true,
    initiativeVisibility: "private",
  },
  { label: "agreement", initialIsPublic: false },
  { label: "alliance", initialIsPublic: false },
];

const AccessControlPage = () => {
  const [initiativeAccessEntries, setInitiativeAccessEntries] = React.useState([]);

  const initiativePrincipals = initiativeAccessEntries.map((entry) => entry.principal);
  const uniqueInitiativePrincipals = Array.from(
    new Map(initiativePrincipals.map((principal) => [principal.id, principal])).values()
  );
  const privateOpportunitySearchablePrincipals = Array.from(
    uniqueInitiativePrincipals.reduce((map, principal) => {
      if (principal.type === "user") {
        map.set(principal.id, principal);
      }

      if (principal.type === "group") {
        const members = MOCK_GROUP_MEMBERS[principal.id] || [];
        members.forEach((member) => map.set(member.id, member));
      }

      return map;
    }, new Map()).values()
  );

  return (
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
        {OBJECTS.map(({ label, displayLabel, initialIsPublic, initiativeVisibility }) => (
          <InlineAccessControlModal
            key={label}
            objectLabel={label}
            objectDisplayLabel={displayLabel || label}
            initialIsPublic={initialIsPublic}
            initiativeVisibility={initiativeVisibility}
            onAccessListChange={label === "initiative" ? setInitiativeAccessEntries : undefined}
            inheritedAccessPrincipals={
              label === "opportunity2" ? uniqueInitiativePrincipals : undefined
            }
            searchablePrincipals={
              label === "opportunity2" ? privateOpportunitySearchablePrincipals : undefined
            }
            accessFieldMiniInfoboxMessage={
              label === "opportunity2"
                ? "Only authorized users in the Initiative will appear"
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};

const createOpportunityInfoboxResolver = (initiativeVisibility) => ({ isPublic }) => {
  const isInPrivateInitiative = initiativeVisibility === "private";
  const initiativeLabel = isInPrivateInitiative ? "private initiative" : "public initiative";
  const title = (
    <>
      {`${isPublic ? "Public" : "Private"} in `}
      <Tooltip content="Open Initiative">
        <Link href="#" size="md">
          {initiativeLabel}
        </Link>
      </Tooltip>
    </>
  );

  if (isInPrivateInitiative) {
    return {
      title,
      description: isPublic
        ? "Only authorized users in the Initiative can access this Opportunity"
        : "Only authorized users can access this Opportunity",
      actionLabel: isPublic ? "Make private" : "Make public",
    };
  }

  return {
    title,
    description: isPublic
      ? "All users can access this Opportunity."
      : "Only authorized users can access this Opportunity.",
    actionLabel: isPublic ? "Make private" : "Make public",
  };
};

const createOpportunityConfirmationResolver = (initiativeVisibility) => ({ nextIsPublic }) => {
  const isInPrivateInitiative = initiativeVisibility === "private";

  if (isInPrivateInitiative) {
    return {
      title: `Make Opportunity ${nextIsPublic ? "public" : "private"}?`,
      body: nextIsPublic
        ? "All initiative members will be able to access this Opportunity."
        : "Only initiative members with explicit access will be able to access this Opportunity.",
      confirmLabel: nextIsPublic ? "Make public" : "Make private",
      cancelLabel: "Cancel",
    };
  }

  return {
    title: `Make Opportunity ${nextIsPublic ? "public" : "private"}?`,
    body: nextIsPublic
      ? "All users will be able to access this Opportunity."
      : "Only authorized users will be able to access this Opportunity.",
    confirmLabel: nextIsPublic ? "Make public" : "Make private",
    cancelLabel: "Cancel",
  };
};

/**
 * Renders AccessControlModal content inline (not in an overlay) by rendering
 * the modal's inner shell as a card, reusing the same component but with a
 * wrapper that makes it always-visible.
 */
const InlineAccessControlModal = ({
  objectLabel,
  objectDisplayLabel,
  initialIsPublic,
  initiativeVisibility,
  onAccessListChange,
  inheritedAccessPrincipals,
  searchablePrincipals,
  accessFieldMiniInfoboxMessage,
}) => (
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
      objectDisplayLabel={objectDisplayLabel}
      initialIsPublic={initialIsPublic}
      infoboxContentResolver={
        objectDisplayLabel === "opportunity"
          ? createOpportunityInfoboxResolver(initiativeVisibility)
          : undefined
      }
      confirmationContentResolver={
        objectDisplayLabel === "opportunity"
          ? createOpportunityConfirmationResolver(initiativeVisibility)
          : undefined
      }
      onAccessListChange={onAccessListChange}
      inheritedAccessPrincipals={
        objectDisplayLabel === "opportunity" && initiativeVisibility === "private"
          ? inheritedAccessPrincipals
          : undefined
      }
      searchablePrincipals={
        objectDisplayLabel === "opportunity" && initiativeVisibility === "private"
          ? searchablePrincipals
          : undefined
      }
      accessFieldMiniInfoboxMessage={
        objectDisplayLabel === "opportunity" && initiativeVisibility === "private"
          ? accessFieldMiniInfoboxMessage
          : undefined
      }
      publicAccessAggregateLabel={
        objectDisplayLabel === "opportunity" && initiativeVisibility === "private"
          ? "Authorized users in the Initiative"
          : undefined
      }
      inheritedAccessLabel="Authorized users in the Initiative"
      inline
    />
  </div>
);

export default AccessControlPage;
