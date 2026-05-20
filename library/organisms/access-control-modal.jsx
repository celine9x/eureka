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
import { Avatar } from "../atoms/avatar.jsx";
import { Chip } from "../atoms/chip.jsx";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";
import { TextInput } from "../molecules/text-input.jsx";
import {
  DropdownMenuContent,
  DropdownMenuSection,
} from "../molecules/dropdown-menu.jsx";
import { DropdownMenuItem } from "../molecules/dropdown-menu-item.jsx";
import {
  MOCK_SEARCHABLE_PRINCIPALS,
  DEFAULT_ACCESS_LEVEL,
  DEFAULT_OWNER,
  getAccessLevels,
} from "../../pages/access-control/access-control-data.js";
import { Portal } from "../utils/portal.jsx";

// ─────────────────────────────────────────────
// PRINCIPAL CHIP FIELD
// ─────────────────────────────────────────────

const PrincipalChipField = ({ label, selected, search, onSearchChange, onChipRemove, onFocus }) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-sm)" }}>
      {label && (
        <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-primary)" }}>
          {label}
        </span>
      )}
      <div
        onClick={() => inputRef.current?.focus()}
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "var(--spacing-sm)",
          padding: selected.length > 0 ? "var(--spacing-xs) var(--spacing-sm)" : "var(--spacing-1-5) var(--spacing-2)",
          minHeight: 36,
          background: "var(--color-general-white)",
          borderRadius: "var(--radius-md)",
          outline: isFocused
            ? "1px solid var(--color-interaction-outline-active)"
            : "1px solid var(--color-interaction-outline-enabled)",
          outlineOffset: -1,
          boxShadow: isFocused ? "var(--shadow-focus)" : "var(--shadow-light-down)",
          cursor: "text",
          boxSizing: "border-box",
        }}
      >
        {selected.map((p) => (
          <Chip
            key={p.id}
            size="sm"
            removable
            onRemove={() => onChipRemove(p.id)}
            icon={
              p.type === "group" ? (
                <Icon name="UserGroup" size={10} />
              ) : (
                <Avatar size="xs" name={p.name} />
              )
            }
          >
            {p.name}
          </Chip>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => { setIsFocused(true); onFocus?.(); }}
          onBlur={() => setIsFocused(false)}
          placeholder={selected.length === 0 ? "Search users or groups" : ""}
          style={{
            flex: 1,
            minWidth: 80,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-family-primary)",
            fontSize: "var(--text-body-md)",
            color: "var(--color-content-primary)",
            padding: 0,
          }}
        />
      </div>
    </div>
  );
};

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// ACCESS LEVEL DROPDOWN
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const AccessLevelDropdown = ({ value, objectLabel, onChange }) => {
  const levels = getAccessLevels(objectLabel);
  const current = levels.find((l) => l.id === value) || levels[0];
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

  return (
    <div ref={triggerRef} style={{ position: "relative", display: "inline-flex" }}>
      <Button
        variant="secondary"
        size="sm"
        iconTrailing={<Icon name="ChevronDown" size={14} />}
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
              right: window.innerWidth - rect.right,
              zIndex: 9999,
              minWidth: 160,
            }}
          >
            <DropdownMenuContent style={{ position: "static" }}>
              <DropdownMenuSection>
                {levels.map((level) => (
                  <DropdownMenuItem
                    key={level.id}
                    label={level.label}
                    active={level.id === value}
                    onClick={() => { onChange(level.id); setOpen(false); }}
                  />
                ))}
              </DropdownMenuSection>
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

const AccessRow = ({ principal, accessLevelId, objectLabel, onAccessChange, onRemove }) => {
  const isGroup = principal.type === "group";
  return (
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
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "var(--size-avatar-sm)",
              height: "var(--size-avatar-sm)",
              borderRadius: "var(--radius-full)",
              background: "var(--color-general-neutral-light)",
              flexShrink: 0,
            }}
          >
            <Icon name="UserGroup" size={12} />
          </span>
        ) : (
          <Avatar size="sm" name={principal.name} />
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
      <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-xs)", flexShrink: 0 }}>
        <AccessLevelDropdown
          value={accessLevelId}
          objectLabel={objectLabel}
          onChange={(id) => onAccessChange(principal.id, id)}
        />
        <Button
          variant="tertiary"
          size="sm"
          iconOnly
          onClick={() => onRemove(principal.id)}
          aria-label="Remove"
        >
          <Icon name="XMark" size={14} />
        </Button>
      </div>
    </div>
  );
};

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// SEARCH DROPDOWN
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const PrincipalSearchDropdown = ({ search, onSelect, addedIds, selectedIds, anchorRef, dropdownRef }) => {
  const results = MOCK_SEARCHABLE_PRINCIPALS.filter(
    (p) =>
      !addedIds.has(p.id) &&
      (search === "" || p.name.toLowerCase().includes(search.toLowerCase()))
  );
  const [rect, setRect] = useState(null);

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
        top: rect.bottom + 4,
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
      <div style={{ padding: "var(--spacing-2) 0" }}>
        {results.map((p) => {
              const isSelected = selectedIds?.has(p.id);
              return (
              <button
                key={p.id}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onSelect(p)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--spacing-sm)",
                  width: "100%",
                  padding: "var(--spacing-sm) var(--spacing-3)",
                  background: isSelected ? "var(--color-general-neutral-light)" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-general-neutral-light)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = isSelected ? "var(--color-general-neutral-light)" : "transparent")}
              >
                {p.type === "group" ? (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "var(--size-avatar-sm)",
                      height: "var(--size-avatar-sm)",
                      borderRadius: "var(--radius-full)",
                      background: "var(--color-general-neutral-light)",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name="UserGroup" size={12} />
                  </span>
                ) : (
                  <Avatar size="sm" name={p.name} />
                )}
                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-md)", color: "var(--color-content-primary)" }}>
                    {p.name}
                  </span>
                  <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-sm)", color: "var(--color-content-secondary)" }}>
                    {p.type === "group" ? "Group" : "User"}
                  </span>
                </div>
                {isSelected && <Icon name="Check" size={14} style={{ color: "var(--color-content-brand)", flexShrink: 0 }} />}
              </button>
              );
            })}
      </div>
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
  initialIsPublic = true,
  inline = false,
}) => {
  const [isPublic, setIsPublic] = useState(initialIsPublic);
  const [search, setSearch] = useState("");
  const [selectedPrincipals, setSelectedPrincipals] = useState([]); // chips pending add
  const [accessList, setAccessList] = useState(
    initialIsPublic ? [] : [{ principal: DEFAULT_OWNER, accessLevelId: "owner" }]
  );
  const [searchFocused, setSearchFocused] = useState(false);
  const searchWrapperRef = useRef(null);
  const dropdownRef = useRef(null);

  const addedIds = new Set(accessList.map((e) => e.principal.id));
  const selectedIds = new Set(selectedPrincipals.map((p) => p.id));

  const handleToggle = () => {
    setIsPublic((prev) => {
      const nextIsPublic = !prev;
      setAccessList(nextIsPublic ? [] : [{ principal: DEFAULT_OWNER, accessLevelId: "owner" }]);
      return nextIsPublic;
    });
    setSelectedPrincipals([]);
    setSearch("");
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
      ...selectedPrincipals.map((p) => ({ principal: p, accessLevelId: DEFAULT_ACCESS_LEVEL })),
    ]);
    setSelectedPrincipals([]);
    setSearch("");
  };

  const handleAccessChange = (principalId, levelId) => {
    setAccessList((prev) =>
      prev.map((e) =>
        e.principal.id === principalId ? { ...e, accessLevelId: levelId } : e
      )
    );
  };

  const handleRemove = (principalId) => {
    setAccessList((prev) => prev.filter((e) => e.principal.id !== principalId));
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

  const showDropdown = searchFocused;

  const bannerIcon = (
    <span style={{ display: "flex", alignItems: "center" }}>
      <Icon name={isPublic ? "LockOpen" : "LockClosed"} size={16} />
    </span>
  );

  const content = (
    <>
      <Infobox
        variant="neutral"
        icon={bannerIcon}
        title={`This ${objectLabel} is ${isPublic ? "public" : "private"}`}
        description={
          isPublic
            ? `All platform users have access to the ${objectLabel} and its content`
            : `Only authorized users can access this ${objectLabel}.`
        }
        actionLabel={isPublic ? "Make private" : "Make public"}
        onAction={handleToggle}
      />

      {!isPublic && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>

          {/* Chip search + Add */}
          <div style={{ display: "flex", gap: "var(--spacing-sm)", alignItems: "flex-end" }}>
            <div ref={searchWrapperRef} style={{ position: "relative", flex: 1 }} onFocus={() => setSearchFocused(true)}>
              <PrincipalChipField
                label="Access"
                selected={selectedPrincipals}
                search={search}
                onSearchChange={setSearch}
                onChipRemove={handleChipRemove}
                onFocus={() => setSearchFocused(true)}
              />
              {showDropdown && (
                <PrincipalSearchDropdown
                  search={search}
                  onSelect={handleChipSelect}
                  addedIds={addedIds}
                  selectedIds={selectedIds}
                  anchorRef={searchWrapperRef}
                  dropdownRef={dropdownRef}
                />
              )}
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={handleAdd}
              disabled={selectedPrincipals.length === 0}
            >
              Add
            </Button>
          </div>

          {/* User list */}
          {accessList.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "var(--spacing-xs)",
                  borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
                }}
              >
                <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-sm)", color: "var(--color-content-secondary)" }}>Name</span>
                <span style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-body-sm)", color: "var(--color-content-secondary)" }}>Access level</span>
              </div>
              {accessList.map(({ principal, accessLevelId }) => (
                <AccessRow
                  key={principal.id}
                  principal={principal}
                  accessLevelId={accessLevelId}
                  objectLabel={objectLabel}
                  onAccessChange={handleAccessChange}
                  onRemove={handleRemove}
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

  if (inline) {
    return (
      <div>
        <div
          style={{
            padding: "var(--spacing-4) var(--spacing-6)",
            borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
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
            Manage {objectLabel} access
          </span>
          <button
            type="button"
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 24,
              height: 24,
              border: "none",
              background: "transparent",
              color: "var(--color-content-secondary)",
              cursor: "pointer",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <Icon name="XMark" size={16} />
          </button>
        </div>
        <div
          style={{
            padding: "var(--spacing-6)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-4)",
          }}
        >
          {content}
        </div>
      </div>
    );
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Manage ${objectLabel} access`}
      size="md"
      showFooter={false}
    >
      {content}
    </Modal>
  );
};

AccessControlModal.displayName = "AccessControlModal";

export default AccessControlModal;

