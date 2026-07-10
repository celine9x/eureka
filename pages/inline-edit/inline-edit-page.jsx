"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "../../library/atoms/button.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { TextInput } from "../../library/molecules/text-input.jsx";
import { Textarea } from "../../library/molecules/textarea.jsx";
import { DatePicker } from "../../library/molecules/datepicker.jsx";
import {
  DropdownList,
  DropdownSection,
  DropdownListItem,
} from "../../library/molecules/dropdown-list.jsx";
import { Avatar } from "../../library/atoms/avatar.jsx";

// ─────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────

const TEAM_MEMBERS = [
  { id: "lucie", name: "Lucie Joan", initials: "LJ" },
  { id: "full1", name: "Full name", initials: "FN" },
  { id: "full2", name: "Full name", initials: "FN" },
  { id: "full3", name: "Full name", initials: "FN" },
  { id: "full4", name: "Full name", initials: "FN" },
  { id: "full5", name: "Full name", initials: "FN" },
];

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const s = {
  page: {
    minHeight: "100vh",
    background: "var(--color-general-background)",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "var(--spacing-8)",
    fontFamily: "var(--font-family-primary)",
  },

  card: {
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--color-action-outline-secondary-enabled)",
    padding: "var(--spacing-6)",
    width: 360,
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },

  cardTitle: {
    fontSize: "var(--text-body-lg)",
    fontWeight: "var(--font-weight-semibold)",
    color: "var(--color-content-primary)",
    marginBottom: "var(--spacing-4)",
    fontFamily: "var(--font-family-primary)",
  },

  row: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-3)",
    padding: "var(--spacing-3) 0",
    borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
    cursor: "pointer",
    position: "relative",
    minHeight: 44,
  },

  rowLast: {
    borderBottom: "none",
  },

  rowIcon: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    color: "var(--color-content-secondary)",
    width: 20,
  },

  placeholder: {
    fontSize: "var(--text-body-lg)",
    color: "var(--color-content-tertiary)",
    fontFamily: "var(--font-family-primary)",
  },

  value: {
    fontSize: "var(--text-body-md)",
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
    flex: 1,
  },

  fieldBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
    width: "100%",
  },

  fieldLabel: {
    fontSize: "var(--text-body-sm)",
    fontWeight: "var(--font-weight-medium)",
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
  },

  actions: {
    display: "flex",
    gap: "var(--spacing-xs)",
    marginTop: "var(--spacing-xs)",
  },

  popoverOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 10,
  },

  popoverContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    zIndex: 20,
    marginTop: 4,
    background: "var(--color-general-white)",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--color-action-outline-secondary-enabled)",
    boxShadow: "var(--shadow-medium-down)",
    padding: "var(--spacing-3)",
    minWidth: 300,
  },

  addressGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-3)",
  },

  linksContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-xs)",
    flex: 1,
  },

  linkRow: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
    flex: 1,
  },

  linkText: {
    fontSize: "var(--text-body-md)",
    color: "var(--color-action-fill-primary-enabled)",
    fontFamily: "var(--font-family-primary)",
    flex: 1,
    textDecoration: "none",
  },

  memberRow: {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-xs)",
  },

  memberName: {
    fontSize: "var(--text-body-md)",
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
  },
};

// ─────────────────────────────────────────────
// ADDRESS FIELD
// ─────────────────────────────────────────────

function AddressField() {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [saved, setSaved] = useState(null);
  const containerRef = useRef(null);

  const displayValue = saved
    ? [saved.street, saved.city, saved.state, saved.zip, saved.country]
        .filter(Boolean)
        .join(", ")
    : null;

  const handleSave = () => {
    setSaved({ ...address });
    setOpen(false);
  };

  const handleCancel = () => {
    if (saved) {
      setAddress({ ...saved });
    } else {
      setAddress({ street: "", city: "", state: "", zip: "", country: "" });
    }
    setOpen(false);
  };

  const handleOpen = () => {
    if (saved) setAddress({ ...saved });
    setOpen(true);
  };

  return (
    <div
      ref={containerRef}
      style={{ ...s.row, flexWrap: "wrap" }}
      onClick={!open ? handleOpen : undefined}
    >
      <span style={s.rowIcon}>
        <Icon name="MapPinIcon" size={16} />
      </span>
      {!open && (
        <span style={displayValue ? s.value : s.placeholder}>
          {displayValue || "Add address"}
        </span>
      )}
      {open && (
        <>
          <div
            style={s.popoverOverlay}
            onClick={(e) => {
              e.stopPropagation();
              handleCancel();
            }}
          />
          <div
            style={s.popoverContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={s.addressGrid}>
              <div style={s.fieldLabel}>Address</div>
              <TextInput
                placeholder="Enter address"
                value={address.street}
                onChange={(e) =>
                  setAddress((a) => ({ ...a, street: e.target.value }))
                }
                size="sm"
                autoFocus
              />
              <div style={s.fieldLabel}>City</div>
              <TextInput
                placeholder="Enter city"
                value={address.city}
                onChange={(e) =>
                  setAddress((a) => ({ ...a, city: e.target.value }))
                }
                size="sm"
              />
              <div style={s.fieldLabel}>State/province</div>
              <TextInput
                placeholder="Enter state/province"
                value={address.state}
                onChange={(e) =>
                  setAddress((a) => ({ ...a, state: e.target.value }))
                }
                size="sm"
              />
              <div style={s.fieldLabel}>Zipcode</div>
              <TextInput
                placeholder="Enter zipcode"
                value={address.zip}
                onChange={(e) =>
                  setAddress((a) => ({ ...a, zip: e.target.value }))
                }
                size="sm"
              />
              <div style={s.fieldLabel}>Country</div>
              <TextInput
                placeholder="Select country"
                value={address.country}
                onChange={(e) =>
                  setAddress((a) => ({ ...a, country: e.target.value }))
                }
                size="sm"
              />
              <div style={s.actions}>
                <Button variant="secondary" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// DESCRIPTION FIELD
// ─────────────────────────────────────────────

function DescriptionField({ label = "Add description" }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState("");

  const commit = (val) => {
    setSaved(val);
    setOpen(false);
  };

  return (
    <div
      style={open ? { ...s.row, flexWrap: "wrap", cursor: "default" } : s.row}
      onClick={!open ? () => { setValue(saved); setOpen(true); } : undefined}
    >
      <span style={s.rowIcon}>
        <Icon name="Bars3BottomLeftIcon" size={16} />
      </span>
      {!open && (
        <span style={saved ? s.value : s.placeholder}>
          {saved || label}
        </span>
      )}
      {open && (
        <div
          style={{ flex: 1 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder=""
            autoFocus
            onBlur={() => commit(value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                commit(value);
              }
              if (e.key === "Escape") {
                setValue(saved);
                setOpen(false);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// LINK FIELD
// ─────────────────────────────────────────────

function LinkField() {
  const [links, setLinks] = useState([]);
  const [editingIdx, setEditingIdx] = useState(null);
  const [inputVal, setInputVal] = useState("");

  const handleAddLink = () => {
    const newIdx = links.length;
    setLinks((l) => [...l, ""]);
    setInputVal("");
    setEditingIdx(newIdx);
  };

  const handleSave = (idx) => {
    const trimmed = inputVal.trim();
    if (!trimmed) {
      setLinks((l) => l.filter((_, i) => i !== idx));
    } else {
      setLinks((l) => l.map((link, i) => (i === idx ? trimmed : link)));
    }
    setEditingIdx(null);
    setInputVal("");
  };

  const handleEdit = (idx) => {
    setInputVal(links[idx]);
    setEditingIdx(idx);
  };

  return (
    <div style={{ ...s.row, flexWrap: "wrap", alignItems: "flex-start" }}>
      <span style={{ ...s.rowIcon, paddingTop: 2 }}>
        <Icon name="LinkIcon" size={16} />
      </span>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--spacing-xs)" }}>
        {links.map((link, idx) =>
          editingIdx === idx ? (
            <div
              key={idx}
              style={{ display: "flex", alignItems: "center", gap: "var(--spacing-xs)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <TextInput
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="https://"
                size="sm"
                autoFocus
                onBlur={() => handleSave(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave(idx);
                  if (e.key === "Escape") {
                    setEditingIdx(null);
                    if (!links[idx]) setLinks((l) => l.filter((_, i) => i !== idx));
                  }
                }}
                style={{ flex: 1 }}
              />
            </div>
          ) : (
            <div
              key={idx}
              style={s.linkRow}
              onClick={(e) => { e.stopPropagation(); handleEdit(idx); }}
            >
              <a
                href={link}
                style={s.linkText}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noreferrer"
              >
                {link}
              </a>
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                onClick={(e) => {
                  e.stopPropagation();
                  setLinks((l) => l.filter((_, i) => i !== idx));
                }}
              >
                <Icon name="XMarkIcon" size={12} />
              </Button>
            </div>
          )
        )}
        {editingIdx === null && (
          <div
            style={{ display: "flex", alignItems: "center", gap: "var(--spacing-xs)", cursor: "pointer" }}
            onClick={handleAddLink}
          >
            {links.length === 0 && (
              <span style={s.placeholder}>Add link</span>
            )}
            {links.length > 0 && (
              <Button variant="ghost" size="sm" iconOnly onClick={handleAddLink}>
                <Icon name="PlusIcon" size={14} />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FIRST CONTACT DATE FIELD
// ─────────────────────────────────────────────

function FirstContactDateField() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [saved, setSaved] = useState(null);
  const containerRef = useRef(null);

  const fmt = (d) =>
    d
      ? d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : null;

  const handleSave = () => {
    setSaved(date);
    setOpen(false);
  };

  const handleOpen = () => {
    setDate(saved);
    setOpen(true);
  };

  const handleCancel = () => {
    setDate(saved);
    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      style={{ ...s.row, flexWrap: "wrap", position: "relative" }}
      onClick={!open ? handleOpen : undefined}
    >
      <span style={s.rowIcon}>
        <Icon name="CalendarIcon" size={16} />
      </span>
      {!open && (
        <span style={saved ? s.value : s.placeholder}>
          {fmt(saved) || "Add first contact date"}
        </span>
      )}
      {open && (
        <>
          <div
            style={s.popoverOverlay}
            onClick={(e) => {
              e.stopPropagation();
              handleCancel();
            }}
          />
          <div
            style={s.popoverContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <DatePicker
              value={date}
              onChange={(d) => setDate(d)}
            />
            <div style={{ ...s.actions, justifyContent: "flex-end", marginTop: "var(--spacing-2)" }}>
              <Button variant="primary" size="sm" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// FIRST CONTACTED BY FIELD
// ─────────────────────────────────────────────

function FirstContactedByField() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const containerRef = useRef(null);

  const handleSelect = (member) => {
    setSelected((prev) => (prev?.id === member.id ? null : member));
    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      style={{ ...s.row, ...s.rowLast, flexWrap: "wrap", position: "relative" }}
      onClick={!open ? () => setOpen(true) : undefined}
    >
      <span style={s.rowIcon}>
        <Icon name="CalendarDaysIcon" size={16} />
      </span>
      {!open && !selected && (
        <span style={s.placeholder}>Add first contacted by</span>
      )}
      {!open && selected && (
        <div style={{ ...s.memberRow, flex: 1, justifyContent: "space-between" }}>
          <div style={s.memberRow}>
            <Avatar size="xs" initials={selected.initials} />
            <span style={s.memberName}>{selected.name}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            onClick={(e) => {
              e.stopPropagation();
              setSelected(null);
            }}
          >
            <Icon name="XMarkIcon" size={14} />
          </Button>
        </div>
      )}
      {open && (
        <>
          <div
            style={s.popoverOverlay}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          />
          <div
            style={{ ...s.popoverContainer, minWidth: 220, padding: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownList searchable searchPlaceholder="Search">
              <DropdownSection>
                {TEAM_MEMBERS.map((m) => (
                  <DropdownListItem
                    key={m.id}
                    label={m.name}
                    selected={selected?.id === m.id}
                    leadingContent={<Avatar size="xs" initials={m.initials} />}
                    onClick={() => handleSelect(m)}
                  />
                ))}
              </DropdownSection>
            </DropdownList>
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export default function InlineEditPage() {
  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.cardTitle}>Details</div>
        <AddressField />
        <DescriptionField label="Add description" />
        <LinkField />
        <FirstContactDateField />
        <DescriptionField label="Add description" />
        <FirstContactedByField />
      </div>
    </div>
  );
}
