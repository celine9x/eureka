"use client";

/**
 * Outlook Add-in — Recent Lists (quick prototype)
 *
 * A narrow taskpane-style form for searching and picking a recent
 * opportunity, agreement, or alliance to link to the current email.
 *
 * Built only from library primitives: RadioCard, TextInput, Button (+ Icon).
 */

import React, { useMemo, useState } from "react";
import { RadioCard, RadioCardGroup } from "../../library/molecules/radio-card.jsx";
import { TextInput } from "../../library/molecules/text-input.jsx";
import { Button } from "../../library/atoms/button.jsx";
import { Icon } from "../../library/atoms/icon.jsx";

// ─────────────────────────────────────────────
// SEED DATA
// ─────────────────────────────────────────────

const OPPORTUNITIES = [
  { id: "op1", name: "Anti-PD-1 mAb in-licensing", info: "Active,Default initiative" },
  { id: "op2", name: "Gene therapy platform deal", info: "Closed,Default initiative" },
  { id: "op3", name: "CRISPR out-licensing", info: "Email already processed" },
  { id: "op4", name: "mRNA vaccine co-development", info: "Closed,Default initiative" },
  { id: "op5", name: "ADC platform partnership", info: "Closed,Initiative name" },
  { id: "op6", name: "Biologics CMO evaluation", info: "Active,Default initiative" },
  { id: "op7", name: "Cell therapy IP license", info: "Active,Initiative name" },
  { id: "op8", name: "Diagnostics distribution deal", info: "Closed,Default initiative" },
];

const AGREEMENTS = [
  { id: "ag1", name: "Balsa Therapeutics NDA", info: "Active,CDA" },
  { id: "ag2", name: "ImmuneOncia MSA", info: "Active,CDA" },
  { id: "ag3", name: "Inpart Term Sheet", info: "Active,CDA" },
  { id: "ag4", name: "Bane Co. License Agreement", info: "Active,CDA" },
  { id: "ag5", name: "Habtamu Test Co. NDA", info: "Active,CDA" },
  { id: "ag6", name: "Regulatory submission MSA", info: "Active,CDA" },
  { id: "ag7", name: "Supply chain framework", info: "Active,CDA" },
  { id: "ag8", name: "Manufacturing CDA", info: "Active,CDA" },
];

const ALLIANCES = [
  { id: "al1", name: "Oncology research alliance", info: "Active,Research Collaboration Alliance" },
  { id: "al2", name: "Immunology consortium", info: "Active,Research Collaboration Alliance" },
  { id: "al3", name: "Rare disease network", info: "Active,Research Collaboration Alliance" },
  { id: "al4", name: "Gene therapy consortium", info: "Active,Research Collaboration Alliance" },
  { id: "al5", name: "Cell therapy alliance", info: "Active,Research Collaboration Alliance" },
  { id: "al6", name: "Vaccine development network", info: "Active,Research Collaboration Alliance" },
  { id: "al7", name: "Diagnostics working group", info: "Active,Research Collaboration Alliance" },
  { id: "al8", name: "Biologics manufacturing alliance", info: "Active,Research Collaboration Alliance" },
];

const PAGE_SIZE = 5;

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────

const s = {
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 320,
    margin: "0 auto",
    minHeight: "100vh",
    boxSizing: "border-box",
    padding: "var(--spacing-4)",
    gap: "var(--spacing-6)",
    background: "var(--color-general-neutral-light)",
    fontFamily: "var(--font-family-primary)",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-3)",
  },
  sectionTitle: {
    fontSize: "var(--text-body-lg)",
    fontWeight: "var(--font-weight-bold)",
    color: "var(--color-content-primary)",
  },
  createButton: {
    width: "100%",
    justifyContent: "flex-start",
  },
  loadMoreButton: {
    width: "100%",
  },
  emptyState: {
    padding: "var(--spacing-4)",
    textAlign: "center",
    fontSize: "var(--text-body-md)",
    color: "var(--color-content-tertiary)",
  },
};

// ─────────────────────────────────────────────
// SEARCHABLE RADIO LIST (Recent opportunities / agreements / alliances)
// ─────────────────────────────────────────────

const SearchableRadioList = ({ title, placeholder, icon, items, name }) => {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return items;
    return items.filter((item) => item.name.toLowerCase().includes(query));
  }, [items, search]);

  const visibleItems = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div style={s.section}>
      <span style={s.sectionTitle}>{title}</span>

      <TextInput
        placeholder={placeholder}
        value={search}
        onChange={handleSearchChange}
        iconLeading={<Icon name="MagnifyingGlass" size="sm" />}
      />

      <Button
        variant="secondary"
        size="md"
        style={s.createButton}
        iconLeading={<Icon name="Plus" size="sm" />}
      >
        Create new
      </Button>

      <RadioCardGroup name={name} value={selected} onChange={setSelected}>
        {visibleItems.map((item) => (
          <RadioCard
            key={item.id}
            value={item.id}
            hideControl
            icon={icon}
            label={item.name}
            info={item.info}
          />
        ))}
      </RadioCardGroup>

      {visibleItems.length === 0 && (
        <div style={s.emptyState}>No results found.</div>
      )}

      {hasMore && (
        <Button
          variant="secondary"
          size="md"
          style={s.loadMoreButton}
          onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
        >
          Load more
        </Button>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export default function OutlookAddinPage() {
  return (
    <div style={s.root}>
      <SearchableRadioList
        title="Recent opportunities"
        placeholder="Search opportunities"
        icon={<Icon name="DocumentText" size="sm" />}
        items={OPPORTUNITIES}
        name="opportunity"
      />

      <SearchableRadioList
        title="Recent agreements"
        placeholder="Search agreements"
        icon={<Icon name="ClipboardDocumentCheck" size="sm" />}
        items={AGREEMENTS}
        name="agreement"
      />

      <SearchableRadioList
        title="Recent alliances"
        placeholder="Search alliances"
        icon={<Icon name="UserGroup" size="sm" />}
        items={ALLIANCES}
        name="alliance"
      />
    </div>
  );
}

OutlookAddinPage.displayName = "OutlookAddinPage";
