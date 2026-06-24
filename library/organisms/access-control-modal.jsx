"use client";

/**
 * AccessControlModal Component (Organism)
 *
 * A modal for managing object access with public/private toggle.
 * Public state: shows a banner only.
 * Private state: search for users/groups and manage their access levels.
 */

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Modal } from "./modal.jsx";
import { Infobox } from "../molecules/infobox.jsx";
import { ConfirmDialog } from "../molecules/dialog.jsx";
import { Avatar } from "../atoms/avatar.jsx";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";
import { ChipInput } from "../molecules/chip-input.jsx";
import {
  DropdownMenuContent,
  DropdownMenuSection,
} from "../molecules/dropdown-menu.jsx";
import { DropdownMenuItem } from "../molecules/dropdown-menu-item.jsx";
import { DropdownList, DropdownSection, DropdownListItem } from "../molecules/dropdown-list.jsx";
import {
  MOCK_SEARCHABLE_PRINCIPALS,
  MOCK_GROUP_MEMBERS,
  DEFAULT_OWNER,
  getAccessLevels,
  getLeastPrivilegeAccessLevel,
} from "../../pages/access-control/access-control-data.js";
import { Portal } from "../utils/portal.jsx";

const ACCESS_ROW_ICON_SIZE = "var(--size-icon-md)";
const ACCESS_LEVEL_SLOT_WIDTH = "6.5rem";

const ChevronIcon = ({ size = 12, style }) => (
  <span style={{ display: "inline-flex", alignItems: "center", lineHeight: 0 }}>
    <Icon name="ChevronDown" size={size} style={style} />
  </span>
);

const toSentenceCase = (value) => {
  if (!value) return "";
  return value
    .split("/")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("/");
};

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// ACCESS LEVEL DROPDOWN
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const AccessLevelDropdown = ({ value, objectLabel, principalType, onChange, onRemove }) => {
  const levels = getAccessLevels(objectLabel);
  const selectableLevels = principalType === "group" ? [] : levels;
  const current = levels.find((l) => l.id === value) || selectableLevels[0] || levels[0];
  const canEdit =
    selectableLevels.length > 1 ||
    !!onRemove ||
    (principalType === "group" && value === "owner" && selectableLevels.length > 0);
  const [open, setOpen] = useState(false);
  const [rect, setRect] = useState(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const toggle = () => {
    if (!open && triggerRef.current) {
      setRect(triggerRef.current.getBoundingClientRect());
    }
    setOpen((v) => !v);
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      const insideTrigger = triggerRef.current?.contains(e.target);
      const insideMenu = menuRef.current?.contains(e.target);
      if (!insideTrigger && !insideMenu) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  if (!canEdit) {
    return (
      <span
        style={{
          fontFamily: "var(--font-family-primary)",
          fontSize: "var(--text-body-md)",
          color: "var(--color-content-secondary)",
        }}
      >
        {current?.label}
      </span>
    );
  }

  return (
    <div
      ref={triggerRef}
      style={{
        position: "relative",
        display: "inline-flex",
        width: ACCESS_LEVEL_SLOT_WIDTH,
        justifyContent: "flex-end",
      }}
    >
      <Button
        variant="secondary"
        size="xs"
        iconTrailing={<ChevronIcon size={14} />}
        onClick={toggle}
      >
        {current.label}
      </Button>
      {open && rect && (
        <Portal>
          <div
            ref={menuRef}
            style={{
              position: "fixed",
              top: rect.bottom + 4,
              left: rect.right,
              transform: "translateX(-100%)",
              zIndex: 9999,
              minWidth: 160,
            }}
          >
            <DropdownMenuContent style={{ position: "static" }}>
              {selectableLevels.length > 0 && (
                <DropdownMenuSection>
                  {selectableLevels.map((level) => (
                    <DropdownMenuItem
                      key={level.id}
                      label={level.label}
                      active={level.id === value}
                      onClick={() => { onChange(level.id); setOpen(false); }}
                    />
                  ))}
                </DropdownMenuSection>
              )}
              {onRemove && (
                <DropdownMenuSection showDivider={selectableLevels.length > 0}>
                  <DropdownMenuItem
                    label="Remove"
                    icon={<Icon name="Trash" size={14} />}
                    variant="destructive"
                    onClick={() => {
                      onRemove();
                      setOpen(false);
                    }}
                  />
                </DropdownMenuSection>
              )}
            </DropdownMenuContent>
          </div>
        </Portal>
      )}
    </div>
  );
};

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// USER ROW
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const AccessRow = ({
  principal,
  accessLevelId,
  objectLabel,
  onAccessChange,
  onRemove,
  isExpanded = false,
  onToggleMembers,
}) => {
  const isGroup = principal.type === "group";
  const isOwner = accessLevelId === "owner";
  const isProtectedOwner = isOwner && !isGroup;
  const ownerLabel = getAccessLevels(objectLabel).find((level) => level.id === "owner")?.label || "Owner";
  const groupMembers = isGroup ? (MOCK_GROUP_MEMBERS[principal.id] || []) : [];
  const memberCount = groupMembers.length;

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--spacing-sm) 0",
          gap: "var(--spacing-sm)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)", flex: 1, minWidth: 0 }}>
          {isGroup ? (
            <Icon
              name="UserGroup"
              size="md"
              style={{ flexShrink: 0, color: "var(--color-content-secondary)" }}
            />
          ) : (
            <Avatar
              size="xs"
              name={principal.name}
              style={{ width: ACCESS_ROW_ICON_SIZE, height: ACCESS_ROW_ICON_SIZE }}
            />
          )}
          <span
            style={{
              fontFamily: "var(--font-family-primary)",
              fontSize: "var(--text-body-md)",
              color: "var(--color-content-primary)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {principal.name}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)", flexShrink: 0 }}>
          {isGroup && memberCount > 0 && (
            <Button
              variant="tertiary"
              size="xs"
              iconTrailing={<ChevronIcon size={12} style={isExpanded ? { transform: "rotate(180deg)" } : undefined} />}
              onClick={() => onToggleMembers?.(principal.id)}
            >
              {`${memberCount} members`}
            </Button>
          )}
          <div
            style={
              isProtectedOwner
                ? { width: ACCESS_LEVEL_SLOT_WIDTH, display: "flex", justifyContent: "flex-end" }
                : { display: "flex" }
            }
          >
            {isProtectedOwner ? (
              <span
                style={{
                  fontFamily: "var(--font-family-primary)",
                  fontSize: "var(--text-body-md)",
                  color: "var(--color-content-secondary)",
                }}
              >
                {ownerLabel}
              </span>
            ) : (
              <AccessLevelDropdown
                value={accessLevelId}
                objectLabel={objectLabel}
                principalType={principal.type}
                onChange={(id) => onAccessChange(principal.id, id)}
                onRemove={() => onRemove(principal)}
              />
            )}
          </div>
        </div>
      </div>

      {isGroup && isExpanded && memberCount > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-xs)",
            paddingLeft: "calc(var(--size-icon-md) + var(--spacing-sm))",
            paddingBottom: "var(--spacing-sm)",
          }}
        >
          {groupMembers.map((member) => (
            <div
              key={`${principal.id}-${member.id}`}
              style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}
            >
              <Avatar
                size="xs"
                name={member.name}
                style={{ width: ACCESS_ROW_ICON_SIZE, height: ACCESS_ROW_ICON_SIZE }}
              />
              <span
                style={{
                  fontFamily: "var(--font-family-primary)",
                  fontSize: "var(--text-body-md)",
                  color: "var(--color-content-primary)",
                }}
              >
                {member.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// SEARCH DROPDOWN
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const PrincipalSearchDropdown = ({
  search,
  onSelect,
  onDeselect,
  addedIds,
  selectedIds,
  anchorRef,
  dropdownRef,
  searchablePrincipals,
}) => {
  const normalizedSearch = search.trim().toLowerCase();
  const searchResults = searchablePrincipals.filter(
    (p) =>
      (normalizedSearch === "" || p.name.toLowerCase().includes(normalizedSearch))
  );
  // Hide already-added entries from the default scroll list, but keep them discoverable via search.
  const results =
    normalizedSearch === ""
      ? searchResults.filter((p) => !addedIds.has(p.id))
      : searchResults;
  const groupResults = results.filter((p) => p.type === "group");
  const userResults = results.filter((p) => p.type === "user");
  const [rect, setRect] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState({});

  const toggleGroupMembers = (groupId) => {
    setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  useLayoutEffect(() => {
    if (anchorRef?.current) {
      setRect(anchorRef.current.getBoundingClientRect());
    }
  }, [search, anchorRef]);

  if (results.length === 0 || !rect) return null;

  return (
    <Portal>
    <div
      ref={dropdownRef}
      style={{
        position: "fixed",
        top: rect.bottom,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
        background: "var(--color-general-white)",
        borderRadius: "var(--radius-md)",
        outline: "1px solid var(--color-action-outline-secondary-enabled)",
        outlineOffset: -1,
        boxShadow: "var(--shadow-medium-down)",
        overflow: "hidden",
      }}
    >
      <DropdownList noSearch noAdd style={{ position: "static", outline: "none", boxShadow: "none" }}>
        {groupResults.length > 0 && (
          <DropdownSection title="Groups">
            {groupResults.map((p) => {
              const isSelected = selectedIds?.has(p.id);
              const isAlreadyAdded = addedIds.has(p.id);
              const members = MOCK_GROUP_MEMBERS[p.id] || [];
              const memberCount = members.length;
              const isExpanded = !!expandedGroups[p.id];
              return (
                <div key={p.id} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
                  <DropdownListItem
                    value={p.id}
                    checked={isAlreadyAdded ? false : isSelected}
                    icon={<Icon name="UserGroup" size={12} />}
                    style={
                      isAlreadyAdded
                        ? { pointerEvents: "none", cursor: "default" }
                        : undefined
                    }
                    badge={
                      <span
                        style={{
                          fontFamily: "var(--font-family-primary)",
                          fontSize: "var(--text-body-sm)",
                          color: "var(--color-content-secondary)",
                          lineHeight: "1",
                        }}
                      >
                        {memberCount}
                      </span>
                    }
                    action={
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-xs)" }}>
                        {isAlreadyAdded && (
                          <span
                            style={{
                              fontFamily: "var(--font-family-primary)",
                              fontSize: "var(--text-body-sm)",
                              color: "var(--color-content-secondary)",
                            }}
                          >
                            Already added
                          </span>
                        )}
                        {!isAlreadyAdded && (
                          <Button
                            variant="tertiary"
                            size="sm"
                            iconOnly
                            aria-label={isExpanded ? `Hide ${p.name} members` : `Show ${p.name} members`}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleGroupMembers(p.id);
                            }}
                          >
                            <ChevronIcon size={12} style={!isExpanded ? { transform: "rotate(-90deg)" } : undefined} />
                          </Button>
                        )}
                      </div>
                    }
                    onMouseDown={(e) => e.preventDefault()}
                    onChange={() => {
                      if (isAlreadyAdded) return;
                      isSelected ? onDeselect?.(p.id) : onSelect(p);
                    }}
                  >
                    {p.name}
                  </DropdownListItem>

                  {isExpanded && memberCount > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--spacing-xs)",
                        paddingLeft: "calc(var(--size-avatar-sm) + var(--spacing-lg))",
                        paddingBottom: "var(--spacing-xs)",
                      }}
                    >
                      {members.map((member) => (
                        <div
                          key={`${p.id}-${member.id}`}
                          style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}
                        >
                          <Avatar size="xs" name={member.name} />
                          <span
                            style={{
                              fontFamily: "var(--font-family-primary)",
                              fontSize: "var(--text-body-md)",
                              color: "var(--color-content-primary)",
                            }}
                          >
                            {member.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </DropdownSection>
        )}
        {userResults.length > 0 && (
          <DropdownSection title="Users">
            {userResults.map((p) => {
              const isSelected = selectedIds?.has(p.id);
              const isAlreadyAdded = addedIds.has(p.id);
              return (
                <DropdownListItem
                  key={p.id}
                  value={p.id}
                  checked={isAlreadyAdded ? false : isSelected}
                  icon={
                    p.type === "group" ? (
                      <Icon name="UserGroup" size={12} />
                    ) : (
                      <Avatar size="xs" name={p.name} />
                    )
                  }
                  style={
                    isAlreadyAdded
                      ? { pointerEvents: "none", cursor: "default" }
                      : undefined
                  }
                  action={
                    isAlreadyAdded ? (
                      <span
                        style={{
                          fontFamily: "var(--font-family-primary)",
                          fontSize: "var(--text-body-sm)",
                          color: "var(--color-content-secondary)",
                        }}
                      >
                        Already added
                      </span>
                    ) : undefined
                  }
                  onMouseDown={(e) => e.preventDefault()}
                  onChange={() => (isSelected ? onDeselect?.(p.id) : onSelect(p))}
                >
                  {p.name}
                </DropdownListItem>
              );
            })}
          </DropdownSection>
        )}
      </DropdownList>
    </div>
    </Portal>
  );
};

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// MAIN COMPONENT
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const AccessControlModal = ({
  open = false,
  onClose,
  objectLabel = "object",
  objectDisplayLabel = objectLabel,
  initialIsPublic = true,
  preInfoboxContent = null,
  infoboxContentResolver = null,
  confirmationContentResolver = null,
  onAccessListChange = null,
  searchablePrincipals = MOCK_SEARCHABLE_PRINCIPALS,
  accessFieldMiniInfoboxMessage = null,
  publicAccessAggregateLabel = "All users",
  inheritedAccessLabel = "All authorized users in the Initiative",
  inheritedAccessPrincipals = [],
  inline = false,
}) => {
  const displayName = toSentenceCase(objectDisplayLabel);
  const [isPublic, setIsPublic] = useState(initialIsPublic);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] = useState(false);
  const [pendingRemovePrincipal, setPendingRemovePrincipal] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedPrincipals, setSelectedPrincipals] = useState([]); // chips pending add
  const [accessList, setAccessList] = useState(
    initialIsPublic ? [] : [{ principal: DEFAULT_OWNER, accessLevelId: "owner" }]
  );
  const [isInheritedExpanded, setIsInheritedExpanded] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({});
  const searchWrapperRef = useRef(null);
  const dropdownRef = useRef(null);

  const addedIds = new Set(accessList.map((e) => e.principal.id));
  const selectedIds = new Set(selectedPrincipals.map((p) => p.id));
  const nextIsPublic = !isPublic;

  const handleToggle = () => {
    setIsPublic((prev) => {
      const nextIsPublic = !prev;
      setAccessList(nextIsPublic ? [] : [{ principal: DEFAULT_OWNER, accessLevelId: "owner" }]);
      return nextIsPublic;
    });
    setSelectedPrincipals([]);
    setSearch("");
  };

  const openVisibilityConfirmation = () => {
    setIsConfirmOpen(true);
  };

  const confirmVisibilityChange = () => {
    setIsConfirmOpen(false);
    handleToggle();
  };

  const handleChipSelect = (principal) => {
    if (selectedIds.has(principal.id) || addedIds.has(principal.id)) return;
    setSelectedPrincipals((prev) => [...prev, principal]);
    setSearch("");
  };

  const handleChipRemove = (principalId) => {
    setSelectedPrincipals((prev) => prev.filter((p) => p.id !== principalId));
  };

  const handleAdd = () => {
    if (selectedPrincipals.length === 0) return;
    setAccessList((prev) => [
      ...prev,
      ...selectedPrincipals.map((p) => ({
        principal: p,
        accessLevelId: getLeastPrivilegeAccessLevel(objectLabel, p.type),
      })),
    ]);
    setSelectedPrincipals([]);
    setSearch("");
  };

  const handleAccessChange = (principalId, levelId) => {
    setAccessList((prev) => {
      if (levelId !== "owner") {
        return prev.map((e) =>
          e.principal.id === principalId ? { ...e, accessLevelId: levelId } : e
        );
      }

      const demotedOwnerLevelId =
        getAccessLevels(objectLabel).find((level) => level.id !== "owner")?.id || "owner";

      return prev.map((e) => {
        if (e.principal.id === principalId) {
          return { ...e, accessLevelId: "owner" };
        }
        if (e.accessLevelId === "owner") {
          return { ...e, accessLevelId: demotedOwnerLevelId };
        }
        return e;
      });
    });
  };

  const handleRemove = (principalId) => {
    setAccessList((prev) => prev.filter((e) => e.principal.id !== principalId));
    setExpandedGroups((prev) => {
      if (!prev[principalId]) return prev;
      const next = { ...prev };
      delete next[principalId];
      return next;
    });
  };

  const openRemoveConfirmation = (principal) => {
    setPendingRemovePrincipal(principal);
    setIsRemoveConfirmOpen(true);
  };

  const closeRemoveConfirmation = () => {
    setIsRemoveConfirmOpen(false);
    setPendingRemovePrincipal(null);
  };

  const confirmRemovePrincipal = () => {
    if (pendingRemovePrincipal?.id) {
      handleRemove(pendingRemovePrincipal.id);
    }
    closeRemoveConfirmation();
  };

  const handleToggleGroupMembers = (groupId) => {
    setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  useEffect(() => {
    const handler = (e) => {
      const inSearch = searchWrapperRef.current?.contains(e.target);
      const inDropdown = dropdownRef.current?.contains(e.target);
      if (!inSearch && !inDropdown) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    onAccessListChange?.(accessList);
  }, [accessList, onAccessListChange]);

  const showDropdown = searchFocused;

  const sortedAccessList = [...accessList].sort((a, b) => {
    const levelPriority = new Map(
      getAccessLevels(objectLabel).map((level, index) => [level.id, index])
    );

    const rank = (entry) => {
      if (entry.accessLevelId === "owner") return 0;
      if (entry.principal.type === "group") return 1;
      if (entry.principal.type === "user") return 2;
      return 3;
    };

    const rankDiff = rank(a) - rank(b);
    if (rankDiff !== 0) return rankDiff;

    const aLevelRank = levelPriority.get(a.accessLevelId) ?? Number.MAX_SAFE_INTEGER;
    const bLevelRank = levelPriority.get(b.accessLevelId) ?? Number.MAX_SAFE_INTEGER;
    if (aLevelRank !== bLevelRank) return aLevelRank - bLevelRank;

    return a.principal.name.localeCompare(b.principal.name);
  });

  const ownerAccessEntries = sortedAccessList.filter((entry) => entry.accessLevelId === "owner");
  const nonOwnerAccessEntries = sortedAccessList.filter((entry) => entry.accessLevelId !== "owner");

  const inheritedPrincipals = Array.from(
    inheritedAccessPrincipals.reduce((map, principal) => {
      const key = `${principal.type}:${principal.id}`;
      map.set(key, principal);
      return map;
    }, new Map()).values()
  ).sort((a, b) => {
    const typeRank = (type) => {
      if (type === "group") return 0;
      if (type === "user") return 1;
      return 2;
    };

    const diff = typeRank(a.type) - typeRank(b.type);
    if (diff !== 0) return diff;

    return a.name.localeCompare(b.name);
  });

  const inheritedPrincipalCount = inheritedPrincipals.length;

  const bannerIcon = (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        color: isPublic ? "var(--color-content-secondary)" : "var(--color-content-negative)",
      }}
    >
      <Icon name={isPublic ? "LockOpen" : "LockClosed"} variant="solid" size={16} />
    </span>
  );

  const defaultInfoboxContent = {
    title: isPublic ? "Public" : "Private",
    description: isPublic
      ? `All users can access this ${displayName}.`
      : `Only authorized users can access this ${displayName}.`,
    actionLabel: isPublic ? "Restrict access" : "Remove restriction",
  };

  const resolvedInfoboxContent = infoboxContentResolver?.({
    isPublic,
    objectLabel,
    objectDisplayLabel,
  }) || {};

  const infoboxTitle = resolvedInfoboxContent.title || defaultInfoboxContent.title;
  const infoboxDescription = resolvedInfoboxContent.description || defaultInfoboxContent.description;
  const infoboxActionLabel = resolvedInfoboxContent.actionLabel || defaultInfoboxContent.actionLabel;

  const defaultConfirmationContent = {
    title: `Make ${displayName} ${nextIsPublic ? "public" : "private"}?`,
    body: nextIsPublic
      ? `All users will be able to access this ${displayName}.`
      : `Only authorized users will be able to access this ${displayName}.`,
    confirmLabel: nextIsPublic ? "Remove restriction" : "Restrict access",
    cancelLabel: "Cancel",
  };

  const resolvedConfirmationContent = confirmationContentResolver?.({
    isPublic,
    nextIsPublic,
    objectLabel,
    objectDisplayLabel,
    displayName,
  }) || {};

  const confirmationTitle = resolvedConfirmationContent.title || defaultConfirmationContent.title;
  const confirmationBody = resolvedConfirmationContent.body || defaultConfirmationContent.body;
  const confirmationConfirmLabel = resolvedConfirmationContent.confirmLabel || defaultConfirmationContent.confirmLabel;
  const confirmationCancelLabel = resolvedConfirmationContent.cancelLabel || defaultConfirmationContent.cancelLabel;

  const content = (
    <>
      {preInfoboxContent}
      <Infobox
        variant="neutral"
        icon={bannerIcon}
        title={infoboxTitle}
        description={infoboxDescription}
        actionLabel={infoboxActionLabel}
        onAction={openVisibilityConfirmation}
      />

      {isPublic ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: "var(--spacing-xs)",
              }}
            >
              <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-sm)", color: "var(--color-content-secondary)" }}>Name</span>
              <span
                style={{
                  fontFamily: "var(--font-family-primary)",
                  fontSize: "var(--text-body-sm)",
                  color: "var(--color-content-secondary)",
                }}
              >
                Access level
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "var(--spacing-sm) 0",
                gap: "var(--spacing-sm)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)", flex: 1, minWidth: 0 }}>
                <Avatar
                  size="xs"
                  name={DEFAULT_OWNER.name}
                  style={{ width: ACCESS_ROW_ICON_SIZE, height: ACCESS_ROW_ICON_SIZE }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-family-primary)",
                    fontSize: "var(--text-body-md)",
                    color: "var(--color-content-primary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {DEFAULT_OWNER.name}
                </span>
              </div>
              <div style={{ width: ACCESS_LEVEL_SLOT_WIDTH, display: "flex", justifyContent: "flex-end" }}>
                <span
                  style={{
                    fontFamily: "var(--font-family-primary)",
                    fontSize: "var(--text-body-md)",
                    color: "var(--color-content-secondary)",
                  }}
                >
                  Owner
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "var(--spacing-sm) 0",
                gap: "var(--spacing-sm)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)", flex: 1, minWidth: 0 }}>
                <span
                  style={{
                    fontFamily: "var(--font-family-primary)",
                    fontSize: "var(--text-body-md)",
                    color: "var(--color-content-primary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {publicAccessAggregateLabel}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)", flexShrink: 0 }}>
                {inheritedPrincipals.length > 0 && (
                  <Button
                    variant="tertiary"
                    size="xs"
                    iconTrailing={<ChevronIcon size={12} style={isInheritedExpanded ? { transform: "rotate(180deg)" } : undefined} />}
                    onClick={() => setIsInheritedExpanded((prev) => !prev)}
                  >
                    {`${inheritedPrincipalCount} entries`}
                  </Button>
                )}
                <span
                  style={{
                    fontFamily: "var(--font-family-primary)",
                    fontSize: "var(--text-body-md)",
                    color: "var(--color-content-secondary)",
                  }}
                >
                  Can access
                </span>
              </div>
            </div>

            {inheritedPrincipals.length > 0 && isInheritedExpanded && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--spacing-xs)",
                  paddingLeft: "calc(var(--size-icon-md) + var(--spacing-sm))",
                  paddingBottom: "var(--spacing-sm)",
                }}
              >
                {inheritedPrincipals.map((principal) => (
                  <div
                    key={`public-inherited-${principal.type}-${principal.id}`}
                    style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}
                  >
                    {principal.type === "group" ? (
                      <Icon
                        name="UserGroup"
                        size="md"
                        style={{ flexShrink: 0, color: "var(--color-content-secondary)" }}
                      />
                    ) : (
                      <Avatar
                        size="xs"
                        name={principal.name}
                        style={{ width: ACCESS_ROW_ICON_SIZE, height: ACCESS_ROW_ICON_SIZE }}
                      />
                    )}
                    <span
                      style={{
                        fontFamily: "var(--font-family-primary)",
                        fontSize: "var(--text-body-md)",
                        color: "var(--color-content-primary)",
                      }}
                    >
                      {principal.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>

          {/* Chip search + Add */}
          <div style={{ display: "flex", gap: "var(--spacing-sm)", alignItems: "flex-start" }}>
            <div ref={searchWrapperRef} style={{ position: "relative", flex: 1 }} onFocus={() => setSearchFocused(true)}>
              <ChipInput
                label="Access"
                placeholder="Search users or groups"
                chips={selectedPrincipals.map((p) => ({
                  id: p.id,
                  label: p.name,
                  icon:
                    p.type === "group" ? (
                      <Icon name="UserGroup" size={12} />
                    ) : (
                      <Avatar size="xs" name={p.name} />
                    ),
                }))}
                inputValue={search}
                onInputChange={setSearch}
                onChipRemove={handleChipRemove}
                showClear={false}
                showDropdown={false}
                showMiniInfobox={!!accessFieldMiniInfoboxMessage}
                miniInfoboxType="info"
                miniInfoboxMessage={accessFieldMiniInfoboxMessage}
                onFocus={() => setSearchFocused(true)}
              />
              {showDropdown && (
                <PrincipalSearchDropdown
                  search={search}
                  onSelect={handleChipSelect}
                  onDeselect={handleChipRemove}
                  addedIds={addedIds}
                  selectedIds={selectedIds}
                  anchorRef={searchWrapperRef}
                  dropdownRef={dropdownRef}
                  searchablePrincipals={searchablePrincipals}
                />
              )}
            </div>
            <div style={{ paddingTop: 28 }}>
              <Button
                variant="primary"
                size="lg"
                onClick={handleAdd}
                disabled={selectedPrincipals.length === 0}
              >
                Add
              </Button>
            </div>
          </div>

          {/* User list */}
          {accessList.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "var(--spacing-xs)",
                }}
              >
                <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-sm)", color: "var(--color-content-secondary)" }}>Name</span>
                <span
                  style={{
                    fontFamily: "var(--font-family-primary)",
                    fontSize: "var(--text-body-sm)",
                    color: "var(--color-content-secondary)",
                  }}
                >
                  Access level
                </span>
              </div>

              {ownerAccessEntries.map(({ principal, accessLevelId }) => (
                <AccessRow
                  key={principal.id}
                  principal={principal}
                  accessLevelId={accessLevelId}
                  objectLabel={objectLabel}
                  onAccessChange={handleAccessChange}
                  onRemove={openRemoveConfirmation}
                  isExpanded={!!expandedGroups[principal.id]}
                  onToggleMembers={handleToggleGroupMembers}
                />
              ))}

              {inheritedPrincipals.length > 0 && (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "var(--spacing-sm) 0",
                      gap: "var(--spacing-sm)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)", flex: 1, minWidth: 0 }}>
                      <span
                        style={{
                          fontFamily: "var(--font-family-primary)",
                          fontSize: "var(--text-body-md)",
                          color: "var(--color-content-primary)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {inheritedAccessLabel}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)", flexShrink: 0 }}>
                      <Button
                        variant="tertiary"
                        size="xs"
                        iconTrailing={<ChevronIcon size={12} style={isInheritedExpanded ? { transform: "rotate(180deg)" } : undefined} />}
                        onClick={() => setIsInheritedExpanded((prev) => !prev)}
                      >
                        {`${inheritedPrincipalCount} entries`}
                      </Button>
                      <span
                        style={{
                          fontFamily: "var(--font-family-primary)",
                          fontSize: "var(--text-body-md)",
                          color: "var(--color-content-secondary)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Can access
                      </span>
                    </div>
                  </div>

                  {isInheritedExpanded && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--spacing-xs)",
                        paddingLeft: "calc(var(--size-icon-md) + var(--spacing-sm))",
                        paddingBottom: "var(--spacing-sm)",
                      }}
                    >
                      {inheritedPrincipals.map((principal) => (
                        <div
                          key={`inherited-${principal.type}-${principal.id}`}
                          style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}
                        >
                          {principal.type === "group" ? (
                            <Icon
                              name="UserGroup"
                              size="md"
                              style={{ flexShrink: 0, color: "var(--color-content-secondary)" }}
                            />
                          ) : (
                            <Avatar
                              size="xs"
                              name={principal.name}
                              style={{ width: ACCESS_ROW_ICON_SIZE, height: ACCESS_ROW_ICON_SIZE }}
                            />
                          )}
                          <span
                            style={{
                              fontFamily: "var(--font-family-primary)",
                              fontSize: "var(--text-body-md)",
                              color: "var(--color-content-primary)",
                            }}
                          >
                            {principal.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {nonOwnerAccessEntries.map(({ principal, accessLevelId }) => (
                <AccessRow
                  key={principal.id}
                  principal={principal}
                  accessLevelId={accessLevelId}
                  objectLabel={objectLabel}
                  onAccessChange={handleAccessChange}
                  onRemove={openRemoveConfirmation}
                  isExpanded={!!expandedGroups[principal.id]}
                  onToggleMembers={handleToggleGroupMembers}
                />
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-sm)" }}>
              <Icon name="InformationCircle" size={16} />
              <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-secondary)" }}>
                Search and add users or groups to grant access.
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );

  const confirmationDialog = (
    <ConfirmDialog
      isOpen={isConfirmOpen}
      onOpenChange={setIsConfirmOpen}
      variant="warning"
      title={confirmationTitle}
      confirmLabel={confirmationConfirmLabel}
      cancelLabel={confirmationCancelLabel}
      onConfirm={confirmVisibilityChange}
    >
      {confirmationBody}
    </ConfirmDialog>
  );

  const removeConfirmationDialog = (
    <ConfirmDialog
      isOpen={isRemoveConfirmOpen}
      onOpenChange={(open) => {
        if (!open) closeRemoveConfirmation();
      }}
      variant="warning"
      title={`Remove ${pendingRemovePrincipal?.name || "entry"}?`}
      confirmLabel="Remove"
      cancelLabel="Cancel"
      onConfirm={confirmRemovePrincipal}
      onCancel={closeRemoveConfirmation}
    >
      {`This will remove ${pendingRemovePrincipal?.name || "this entry"} from access.`}
    </ConfirmDialog>
  );

  if (inline) {
    return (
      <>
        {confirmationDialog}
        {removeConfirmationDialog}
        <div>
        <div
          style={{
            padding: "var(--spacing-4) var(--spacing-6)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-family-primary)",
              fontSize: "var(--text-heading-h3)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-content-primary)",
            }}
          >
            Manage {displayName} access
          </span>
          <Button
            variant="tertiary"
            size="sm"
            iconOnly
            aria-label="Close"
            onClick={onClose}
          >
            <Icon name="XMark" size={16} />
          </Button>
        </div>
        <div
          style={{
            padding: "0 var(--spacing-6) var(--spacing-6)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-4)",
          }}
        >
          {content}
        </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        title={`Manage ${displayName} access`}
        size="md"
        showFooter={false}
      >
        {content}
      </Modal>
      {confirmationDialog}
      {removeConfirmationDialog}
    </>
  );
};

AccessControlModal.displayName = "AccessControlModal";

export default AccessControlModal;

