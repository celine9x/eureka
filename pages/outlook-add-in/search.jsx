


import { useMemo, useState } from "react";
import { Button } from "@/library/atoms/button";
import { Icon } from "@/library/atoms/icon";
import { RadioCard, RadioCardGroup } from "@/library/molecules/radio-card";
import { TextInput } from "@/library/molecules/text-input";


const opportunities = [
  { name: "ATB test", status: "Active", initiative: "Default Initiative" },
  { name: "ATB Pharma", status: "Active", initiative: "Default Initiative" },
  { name: "Opportunity name", status: "Closed", initiative: "Default Initiative" },
  { name: "Opportunity name", status: "Closed", initiative: "Initiative name" },
  { name: "Opportunity name", status: "Email already processed", initiative: "" },
  { name: "Opportunity name", status: "Closed", initiative: "Default Initiative" },
  { name: "Opportunity name", status: "Closed", initiative: "Default Initiative" },
];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightText = (text, query) => {
  const trimmed = query.trim();

  if (!trimmed) return text;

  const pattern = new RegExp(`(${escapeRegExp(trimmed)})`, "ig");
  const parts = String(text).split(pattern);

  return parts.map((part, index) =>
    pattern.test(part) ? <mark key={`${part}-${index}`} style={styles.highlight}>{part}</mark> : <span key={`${part}-${index}`}>{part}</span>
  );
};

function SearchOpportunityPrototype() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) return opportunities;

    return opportunities.filter((item) => {
      const haystack = `${item.name} ${item.status} ${item.initiative}`.toLowerCase();
      return haystack.includes(value);
    });
  }, [query]);

  const hasResults = filtered.length > 0;

  return (
    <div style={styles.shell}>
      <div style={styles.container}>
        <h1 style={styles.title}>Recent opportunities</h1>

        <TextInput
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search opportunities"
          aria-label="Search opportunities"
          style={styles.textInputOverride}
        />

        <Button variant="secondary" size="lg" iconLeading={<Icon name="Plus" size="sm" />} style={styles.createButton}>
          Create new
        </Button>

        <div style={styles.resultsHeader}>Results</div>

        {!hasResults ? (
          <div style={styles.emptyStateWrap}>
            <div style={styles.emptyTitle}>We didn't find any matches</div>
            <div style={styles.emptyHint}>Try again with different keywords or create new</div>
          </div>
        ) : (
          <RadioCardGroup value={filtered[0]?.name || ""} onChange={() => {}} style={styles.radioGroup}>
            {filtered.map((item, index) => (
              <RadioCard
                key={`${item.name}-${index}`}
                value={item.name}
                label={highlightText(item.name, query)}
                icon={<Icon name="DocumentText" size="md" />}
                info={
                  <span style={styles.radioInfoLine}>
                    {item.status === "Active" ? (
                      <span style={styles.statusWithIcon}>
                        <span style={{ ...styles.statusDot, ...styles.statusDotActive }} />
                        <span>{highlightText(item.status, query)}</span>
                      </span>
                    ) : item.status === "Closed" ? (
                      <span style={styles.statusWithIcon}>
                        <span style={{ ...styles.statusDot, ...styles.statusDotClosed }}>
                          <Icon name="Check" size="sm" color="white" />
                        </span>
                        <span>{highlightText(item.status, query)}</span>
                      </span>
                    ) : item.status === "Email already processed" ? (
                      <span style={styles.statusWithIcon}>
                        <span style={{ ...styles.statusDot, ...styles.statusDotInfo }}>
                          <Icon name="InformationCircle" size="sm" color="var(--color-content-primary)" />
                        </span>
                        <span>{highlightText(item.status, query)}</span>
                      </span>
                    ) : (
                      <span style={styles.statusWithIcon}>{highlightText(item.status, query)}</span>
                    )}
                    {item.initiative && (
                      <>
                        <span style={styles.separator}>•</span>
                        <span style={styles.initiativeBadge}>{highlightText(item.initiative, query)}</span>
                      </>
                    )}
                  </span>
                }
              />
            ))}
          </RadioCardGroup>
        )}

        {hasResults && (
          <Button variant="secondary" size="md" style={styles.loadMoreButton}>
            Load more
          </Button>
        )}
      </div>
    </div>
  );
}

const styles = {
  shell: {
    width: "100%",
    background: "#e7ebf0",
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "32px 0",
    fontFamily: "var(--font-family-primary)",
    color: "var(--color-content-primary)",
  },
  container: {
    width: "100%",
    maxWidth: 740,
    padding: "0 24px",
    boxSizing: "border-box",
  },
  title: {
    margin: "0 0 22px",
    fontSize: "clamp(2.2rem, 3vw, 3.2rem)",
    lineHeight: 1.1,
    fontWeight: 700,
    letterSpacing: "-0.04em",
    color: "var(--color-content-primary)",
  },
  textInputOverride: {
    width: "100%",
    marginBottom: 16,
  },
  createButton: {
    width: "100%",
    justifyContent: "flex-start",
    paddingLeft: 22,
    marginBottom: 20,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(76, 92, 119, 0.25)",
    borderRadius: 18,
    fontSize: "2rem",
    fontWeight: 500,
    boxShadow: "none",
  },
  resultsHeader: {
    marginTop: 40,
    marginBottom: 18,
    fontSize: "2rem",
    fontWeight: 600,
    lineHeight: 1.2,
    color: "var(--color-content-primary)",
  },
  emptyStateWrap: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(76, 92, 119, 0.25)",
    borderRadius: 18,
    padding: "28px 28px 18px",
    marginTop: 12,
  },
  emptyTitle: {
    fontSize: "2.05rem",
    lineHeight: 1.3,
    fontWeight: 500,
    color: "var(--color-content-primary)",
  },
  emptyHint: {
    marginTop: 18,
    fontSize: "2rem",
    lineHeight: 1.3,
    color: "var(--color-content-tertiary)",
  },
  radioGroup: {
    gap: 12,
  },
  radioInfoLine: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    fontSize: "1.5rem",
    lineHeight: 1.4,
    color: "var(--color-content-primary)",
  },
  statusWithIcon: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    color: "var(--color-content-primary)",
  },
  statusDot: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 22,
    height: 22,
    borderRadius: 6,
    fontSize: "0.95rem",
    color: "white",
    background: "var(--color-content-primary)",
    flexShrink: 0,
  },
  statusDotActive: {
    borderRadius: 50,
    width: 18,
    height: 18,
    border: "3px solid var(--color-content-brand)",
    position: "relative",
    background: "#fff",
    boxSizing: "border-box",
  },
  statusDotClosed: {
    background: "var(--color-content-positive)",
  },
  statusDotInfo: {
    width: 20,
    height: 20,
    borderRadius: 50,
    background: "transparent",
    border: "2px solid var(--color-content-primary)",
    color: "var(--color-content-primary)",
  },
  separator: {
    color: "var(--color-content-secondary)",
    margin: "0 2px",
  },
  initiativeBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 10px",
    borderRadius: 8,
    background: "rgba(99, 102, 241, 0.12)",
    color: "var(--color-content-brand)",
    fontWeight: 500,
  },
  highlight: {
    background: "var(--color-content-search-highlight)",
    color: "inherit",
    padding: "0 2px",
    borderRadius: 4,
  },
  loadMoreButton: {
    marginTop: 18,
    width: "100%",
    justifyContent: "center",
    border: "1px solid rgba(76, 92, 119, 0.4)",
    borderRadius: 12,
    background: "transparent",
    color: "var(--color-content-primary)",
    fontSize: "1.75rem",
    fontWeight: 600,
    padding: "14px 22px",
    boxShadow: "none",
  },
};

export default SearchOpportunityPrototype;
