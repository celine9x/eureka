// ─────────────────────────────────────────────
// ACCESS CONTROL DATA
// Backend-style data definitions for access control per object type.
// ─────────────────────────────────────────────

/**
 * Access levels per object type.
 * Each entry defines the allowed roles for that object.
 */
export const OBJECT_ACCESS_LEVELS = {
  opportunity: [
    { id: "owner", label: "Owner" },
    { id: "can-edit", label: "Can edit" },
    { id: "can-view", label: "Can view" },
  ],
  agreement: [
    { id: "owner", label: "Owner" },
    { id: "can-edit", label: "Can edit" },
    { id: "can-comment", label: "Can comment" },
    { id: "can-view", label: "Can view" },
  ],
  alliance: [
    { id: "owner", label: "Owner" },
    { id: "can-edit", label: "Can edit" },
    { id: "can-view", label: "Can view" },
  ],
  initiative: [
    { id: "owner", label: "Owner" },
    { id: "can-edit", label: "Can edit" },
    { id: "can-view", label: "Can view" },
  ],
  contact: [
    { id: "owner", label: "Owner" },
    { id: "can-edit", label: "Can edit" },
    { id: "can-view", label: "Can view" },
  ],
  company: [
    { id: "owner", label: "Owner" },
    { id: "can-view", label: "Can view" },
  ],
  meeting: [
    { id: "owner", label: "Owner" },
    { id: "can-edit", label: "Can edit" },
    { id: "can-view", label: "Can view" },
  ],
};

/**
 * Default access level id to pre-select when adding a new user.
 */
export const DEFAULT_ACCESS_LEVEL = "can-view";

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
 * Get access levels for a given object type.
 * Falls back to a generic set if type is not found.
 */
export const getAccessLevels = (objectLabel) => {
  const key = objectLabel?.toLowerCase();
  return OBJECT_ACCESS_LEVELS[key] || [
    { id: "owner", label: "Owner" },
    { id: "can-edit", label: "Can edit" },
    { id: "can-view", label: "Can view" },
  ];
};
