// ─────────────────────────────────────────────
// ACCESS CONTROL DATA
// Backend-style data definitions for access control per object type.
// ─────────────────────────────────────────────

/**
 * Access levels per object type.
 * Each entry defines the allowed roles for that object.
 * Order matters: most privileged -> least privileged.
 */
export const OBJECT_ACCESS_LEVELS = {
  initiative: [
    { id: "owner", label: "Owner" },
    { id: "full-access", label: "Full access" },
    { id: "can-access", label: "Can access" },
  ],
  opportunity: [
    { id: "owner", label: "Owner" },
    { id: "full-access", label: "Full access" },
    { id: "can-access", label: "Can access" },
  ],
  opportunity: [
    { id: "owner", label: "Owner" },
    { id: "full-access", label: "Full access" },
    { id: "can-access", label: "Can access" },
  ],
  agreement: [
    { id: "owner", label: "Owner" },
    { id: "can-access", label: "Can access" },
  ],
  alliance: [
    { id: "owner", label: "Owner" },
    { id: "can-access", label: "Can access" },
  ],
};

/**
 * Default owner entry shown when an object is set to private.
 */
export const DEFAULT_OWNER = { id: "u1", name: "John Doe", type: "user" };

/**
 * Mock users and groups to search from.
 */
export const MOCK_SEARCHABLE_PRINCIPALS = [
  { id: "u1", name: "John Doe", type: "user" },
  { id: "u2", name: "Alice Johnson", type: "user" },
  { id: "u3", name: "Bob Smith", type: "user" },
  { id: "u4", name: "Carol Davis", type: "user" },
  { id: "u5", name: "David Wilson", type: "user" },
  { id: "u6", name: "Eve Martinez", type: "user" },
  { id: "u7", name: "Frank Lee", type: "user" },
  { id: "g1", name: "Legal Team", type: "group" },
  { id: "g2", name: "Business Development", type: "group" },
  { id: "g3", name: "Executive Committee", type: "group" },
  { id: "g4", name: "Finance Team", type: "group" },
];

/**
 * Mock members for each group in access control list expansion.
 */
export const MOCK_GROUP_MEMBERS = {
  g1: [
    { id: "u2", name: "Alice Johnson", type: "user" },
    { id: "u3", name: "Bob Smith", type: "user" },
    { id: "u4", name: "Carol Davis", type: "user" },
    { id: "u5", name: "David Wilson", type: "user" },
    { id: "u6", name: "Eve Martinez", type: "user" },
    { id: "u7", name: "Frank Lee", type: "user" },
  ],
  g2: [
    { id: "u2", name: "Alice Johnson", type: "user" },
    { id: "u5", name: "David Wilson", type: "user" },
  ],
  g3: [
    { id: "u3", name: "Bob Smith", type: "user" },
    { id: "u6", name: "Eve Martinez", type: "user" },
    { id: "u7", name: "Frank Lee", type: "user" },
  ],
  g4: [
    { id: "u4", name: "Carol Davis", type: "user" },
    { id: "u6", name: "Eve Martinez", type: "user" },
  ],
};

/**
 * Get access levels for a given object type.
 * Falls back to a generic set if type is not found.
 */
export const getAccessLevels = (objectLabel) => {
  const key = objectLabel?.toLowerCase();
  return OBJECT_ACCESS_LEVELS[key] || [
    { id: "owner", label: "Owner" },
    { id: "can-edit", label: "Can edit" },
    { id: "can-view", label: "Can access" },
  ];
};

/**
 * Returns the least-privileged valid level for a principal type.
 * Group principals can never be owner.
 */
export const getLeastPrivilegeAccessLevel = (objectLabel, principalType = "user") => {
  const levels = getAccessLevels(objectLabel);
  const allowedLevels =
    principalType === "group"
      ? levels.filter((level) => level.id !== "owner")
      : levels;

  return allowedLevels[allowedLevels.length - 1]?.id || "owner";
};
