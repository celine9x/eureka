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
  {
    label: "issue1",
    displayLabel: "issue/risk",
    initialIsPublic: true,
    allianceVisibility: "public",
  },
  {
    label: "issue2",
    displayLabel: "issue/risk",
    initialIsPublic: false,
    allianceVisibility: "public",
  },
  {
    label: "issue3",
    displayLabel: "issue/risk",
    initialIsPublic: true,
    allianceVisibility: "private",
  },
  {
    label: "issue4",
    displayLabel: "issue/risk",
    initialIsPublic: false,
    allianceVisibility: "private",
  },
];

const AccessControlPage = () => {
  const [initiativeAccessEntries, setInitiativeAccessEntries] = React.useState([]);
  const [allianceAccessEntries, setAllianceAccessEntries] = React.useState([]);

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

  const alliancePrincipals = allianceAccessEntries.map((entry) => entry.principal);
  const uniqueAlliancePrincipals = Array.from(
    new Map(alliancePrincipals.map((principal) => [principal.id, principal])).values()
  );
  const privateIssueSearchablePrincipals = Array.from(
    uniqueAlliancePrincipals.reduce((map, principal) => {
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
        {OBJECTS.map(({ label, displayLabel, initialIsPublic, initiativeVisibility, allianceVisibility }) => (
          <InlineAccessControlModal
            key={label}
            objectLabel={label}
            objectDisplayLabel={displayLabel || label}
            initialIsPublic={initialIsPublic}
            initiativeVisibility={initiativeVisibility}
            allianceVisibility={allianceVisibility}
            onAccessListChange={
              label === "initiative"
                ? setInitiativeAccessEntries
                : label === "alliance"
                ? setAllianceAccessEntries
                : undefined
            }
            inheritedAccessPrincipals={
              label === "opportunity2"
                ? uniqueInitiativePrincipals
                : label === "issue3" || label === "issue4"
                ? uniqueAlliancePrincipals
                : undefined
            }
            searchablePrincipals={
              label === "opportunity2"
                ? privateOpportunitySearchablePrincipals
                : label === "issue3" || label === "issue4"
                ? privateIssueSearchablePrincipals
                : undefined
            }
            accessFieldMiniInfoboxMessage={
              label === "opportunity2"
                ? "Only authorized users in the Initiative will appear"
                : label === "issue3" || label === "issue4"
                ? "Only authorized users in the Alliance will appear"
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
        ? "Anyone with access to this initiative can access this opportunity"
        : "Only authorized users can access this opportunity",
      actionLabel: isPublic ? "Restrict access" : "Remove restriction",
    };
  }

  return {
    title,
    description: isPublic
      ? "All users can access this Opportunity."
      : "Only authorized users can access this opportunity.",
    actionLabel: isPublic ? "Restrict access" : "Remove restriction",
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
      confirmLabel: nextIsPublic ? "Remove restriction" : "Restrict access",
      cancelLabel: "Cancel",
    };
  }

  return {
    title: `Make Opportunity ${nextIsPublic ? "public" : "private"}?`,
    body: nextIsPublic
      ? "All users will be able to access this Opportunity."
      : "Only authorized users will be able to access this Opportunity.",
    confirmLabel: nextIsPublic ? "Remove restriction" : "Restrict access",
    cancelLabel: "Cancel",
  };
};

const createIssueInfoboxResolver = (allianceVisibility) => ({ isPublic }) => {
  const isInPrivateAlliance = allianceVisibility === "private";
  const allianceLabel = isInPrivateAlliance ? "private alliance" : "public alliance";
  const title = (
    <>
      {`${isPublic ? "Public" : "Private"} in `}
      <Tooltip content="Open Alliance">
        <Link href="#" size="md">
          {allianceLabel}
        </Link>
      </Tooltip>
    </>
  );

  if (isInPrivateAlliance) {
    return {
      title,
      description: isPublic
        ? "Only authorized users in the Alliance can access this Issue/Risk"
        : "Only authorized users can access this Issue/Risk",
      actionLabel: isPublic ? "Restrict access" : "Remove restriction",
    };
  }

  return {
    title,
    description: isPublic
      ? "All users can access this Issue/Risk."
      : "Only authorized users can access this Issue/Risk.",
    actionLabel: isPublic ? "Restrict access" : "Remove restriction",
  };
};

const createIssueConfirmationResolver = (allianceVisibility) => ({ nextIsPublic }) => {
  const isInPrivateAlliance = allianceVisibility === "private";

  if (isInPrivateAlliance) {
    return {
      title: nextIsPublic ? "Remove access restriction?" : "Restrict Issue/Risk access?",
      body: nextIsPublic
        ? "All alliance members will be able to access this Issue/Risk."
        : "Only alliance members with explicit access will be able to access this Issue/Risk.",
      confirmLabel: nextIsPublic ? "Remove restriction" : "Restrict access",
      cancelLabel: "Cancel",
    };
  }

  return {
    title: nextIsPublic ? "Remove access restriction?" : "Restrict Issue/Risk access?",
    body: nextIsPublic
      ? "All users will be able to access this Issue/Risk."
      : "Only authorized users will be able to access this Issue/Risk.",
    confirmLabel: nextIsPublic ? "Remove restriction" : "Restrict access",
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
  allianceVisibility,
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
          : objectDisplayLabel === "issue/risk"
          ? createIssueInfoboxResolver(allianceVisibility)
          : undefined
      }
      confirmationContentResolver={
        objectDisplayLabel === "opportunity"
          ? createOpportunityConfirmationResolver(initiativeVisibility)
          : objectDisplayLabel === "issue/risk"
          ? createIssueConfirmationResolver(allianceVisibility)
          : undefined
      }
      onAccessListChange={onAccessListChange}
      inheritedAccessPrincipals={
        (objectDisplayLabel === "opportunity" && initiativeVisibility === "private") ||
        (objectDisplayLabel === "issue/risk" && allianceVisibility === "private")
          ? inheritedAccessPrincipals
          : undefined
      }
      searchablePrincipals={
        (objectDisplayLabel === "opportunity" && initiativeVisibility === "private") ||
        (objectDisplayLabel === "issue/risk" && allianceVisibility === "private")
          ? searchablePrincipals
          : undefined
      }
      accessFieldMiniInfoboxMessage={
        (objectDisplayLabel === "opportunity" && initiativeVisibility === "private") ||
        (objectDisplayLabel === "issue/risk" && allianceVisibility === "private")
          ? accessFieldMiniInfoboxMessage
          : undefined
      }
      publicAccessAggregateLabel={
        objectDisplayLabel === "opportunity" && initiativeVisibility === "private"
          ? "Authorized users in the Initiative"
          : objectDisplayLabel === "issue/risk" && allianceVisibility === "private"
          ? "Authorized users in the Alliance"
          : undefined
      }
      inheritedAccessLabel={
        objectDisplayLabel === "issue/risk"
          ? "Authorized users in the Alliance"
          : "Authorized users in the Initiative"
      }
      inline
    />
  </div>
);

export default AccessControlPage;

