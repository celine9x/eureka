/**
 * Eureka Design System - Component Library Demo
 *
 * A comprehensive test page with side menu navigation
 * to browse all components from atoms to templates.
 */

import React, { useEffect, useMemo, useState } from "react";
import tokensCssRaw from "./library/tokens/tokens.css?raw";

// ─────────────────────────────────────────────
// ATOMS
// ─────────────────────────────────────────────
import { Button } from "./library/atoms/button.jsx";
import { Badge } from "./library/atoms/badge.jsx";
import { Avatar } from "./library/atoms/avatar.jsx";
import { Checkbox } from "./library/atoms/checkbox.jsx";
import { Toggle } from "./library/atoms/toggle.jsx";
import { Icon, ICON_EXAMPLE_NAMES, OBJECT_TYPE_NAMES } from "./library/atoms/icon.jsx";
import { Chip } from "./library/atoms/chip.jsx";
import { RadioButton, RadioGroup } from "./library/atoms/radio-button.jsx";
import { Link } from "./library/atoms/link.jsx";
import { Tooltip } from "./library/atoms/tooltip.jsx";
import { Step, STEP_STATUS } from "./library/atoms/step.jsx";
import { ButtonBadge } from "./library/atoms/button-badge.jsx";
import { AiButton } from "./library/atoms/ai-button.jsx";
import { ProgressIndicator, PROGRESS_INDICATOR_LABEL_POSITIONS } from "./library/atoms/progress-indicator.jsx";

// ─────────────────────────────────────────────
// MOLECULES
// ─────────────────────────────────────────────
import { Search } from "./library/molecules/search.jsx";
import { Tabs, Tab, TabPanel } from "./library/molecules/tabs.jsx";
import { Accordion, AccordionItem, AccordionGroup } from "./library/molecules/accordion.jsx";
import { TextInput } from "./library/molecules/text-input.jsx";
import { DropdownMenuItem, DropdownMenuDivider, DropdownMenuLabel } from "./library/molecules/dropdown-menu-item.jsx";
import { Stepper } from "./library/molecules/stepper.jsx";
import { Textarea } from "./library/molecules/textarea.jsx";
import { RadioCard, RadioCardGroup } from "./library/molecules/radio-card.jsx";
import { Pagination, SimplePagination } from "./library/molecules/pagination.jsx";
import { Infobox, INFOBOX_VARIANTS } from "./library/molecules/infobox.jsx";
import { ButtonGroup, ButtonGroupItem } from "./library/molecules/button-group.jsx";
import { AvatarGroup } from "./library/molecules/avatar-group.jsx";
import { ChipInput } from "./library/molecules/chip-input.jsx";
import { CommentPopover } from "./library/molecules/comment-popover.jsx";
import { Dialog, ConfirmDialog, AlertDialog } from "./library/molecules/dialog.jsx";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSection, SimpleDropdownMenu } from "./library/molecules/dropdown-menu.jsx";
import { DropdownList, DropdownSection, DropdownListItem } from "./library/molecules/dropdown-list.jsx";
import { Subinfo } from "./library/molecules/subinfo.jsx";
import { Infofield, InfofieldGroup } from "./library/molecules/infofield.jsx";
import { MiniInfobox } from "./library/molecules/miniinfobox.jsx";
import { Attachment } from "./library/molecules/attachment.jsx";
import { FileUploader } from "./library/molecules/file-uploader.jsx";
import { AiChatInput } from "./library/molecules/ai-chat-input.jsx";
import { EmptyState, EMPTY_STATE_SIZES } from "./library/molecules/empty-state.jsx";
import { ExpandableText } from "./library/molecules/expandable-text.jsx";
import { Toast, ToastProvider, useToast } from "./library/molecules/toast.jsx";

import { DatePicker } from "./library/molecules/datepicker.jsx";
import { RichTextInput, RichTextInputEditable } from "./library/molecules/rich-text-input.jsx";
import { RichTextEditToolbars } from "./library/molecules/rich-text-edit-toolbars.jsx";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

// ─────────────────────────────────────────────
// ORGANISMS
// ─────────────────────────────────────────────
import { SideMenu } from "./library/organisms/side-menu/side-menu.jsx";
import { SideMenuItem, SIDE_MENU_ITEM_STATES } from "./library/organisms/side-menu/side-menu-item.jsx";
import { UserButton, USER_BUTTON_STATES } from "./library/organisms/side-menu/user-button.jsx";
import { TableCell, TABLECELL_VARIANTS, TableCellLinkRow, TableCellLinkedName, TableCellTwoLevel, TableCellTags } from "./library/organisms/table/tablecell.jsx";
import { TextCellInlineEdit, ButtonCellInlineEdit, LinkCellInlineEdit, ChipCellInlineEdit, LongTextCellInlineEdit, NumberCellInlineEdit, TextMultipleCellInlineEdit } from "./library/organisms/table/table-cell-inline-edit.jsx";

import { Modal } from "./library/organisms/modal.jsx";
import { AccessControlModal } from "./library/organisms/access-control-modal.jsx";
import { Table, TableColumns, TableColumn, TableRow, TableCard, TableCellHeader } from "./library/organisms/table/table.jsx";
import {
  ObjectHeader,
  ObjectHeaderTopBar,
  ObjectHeaderTopBarLeft,
  ObjectHeaderTopBarRight,
  ObjectHeaderActionsGroup,
  ObjectHeaderDivider,
  ObjectHeaderMeta,
  ObjectHeaderTitleSection,
  ObjectHeaderTitle,
  ObjectHeaderSubinfoRow,
  ObjectHeaderSubinfoItem,
  ObjectHeaderStepperSection as ObjectHeaderStepper,
  ObjectHeaderTabsSection as ObjectHeaderTabs,
} from "./library/organisms/object-header.jsx";
import {
  HubHeader,
  HubHeaderTitle,
  HubHeaderLabel,
  HubHeaderActions,
  HubHeaderControls,
  HubHeaderRow,
  HubHeaderLeft,
  HubHeaderRight,
  HubHeaderSecondary,
} from "./library/organisms/hub-header.jsx";
import { FilterPanel, Row as FilterPanelRow, DEFAULT_FILTER_PANEL_OPTIONS } from "./library/organisms/filter-panel.jsx";
import { DocumentViewer } from "./library/organisms/document-viewer/document-viewer.jsx";
import pharmaAgreementPdf from "./library/organisms/document-viewer/pharma_agreement.pdf";
import { Pagination as PaginationOrganism } from "./library/organisms/pagination.jsx";
import { StatusUpdate } from "./library/organisms/status-update.jsx";
import { CreationFormPanel } from "./library/organisms/section/creation-form-panel.jsx";
import { SideMenuRichTextInput } from "./library/organisms/side-menu/rich-text-input.jsx";

// ─────────────────────────────────────────────
// TEMPLATES
// ─────────────────────────────────────────────
import { Hub } from "./library/templates/hub.jsx";
import { ObjectPage } from "./library/templates/object-page.jsx";
import { SidePanel } from "./library/templates/side-panel.jsx";
import { DocumentViewerPage } from "./library/templates/document-viewer-page.jsx";
import { AiHomepage } from "./library/templates/ai-homepage.jsx";

// ─────────────────────────────────────────────
// SHARED PROPS
// ─────────────────────────────────────────────
import { BUTTON_VARIANTS } from "./library/utils/props.js";

// ─────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────
import { PreviewComponent } from "./library/utils/preview-component.jsx";

// ─────────────────────────────────────────────
// LAYOUT COMPONENTS
// ─────────────────────────────────────────────

const PACKAGE_NAME = "qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n";

const toKebabCase = (value = "") =>
  value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

const toPascalCase = (value = "") =>
  value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");

const useClipboardCopy = ({ getText, onError }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(getText());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      if (onError) onError(error);
    }
  };

  return { copied, copy };
};

const COPYABLE_CODE_BOX_STYLE = {
  border: "1px solid var(--color-action-outline-secondary-enabled)",
  borderRadius: 14,
  background: "var(--color-general-white)",
  padding: 8,
};

const CODE_SNIPPET_STYLE = {
  margin: 0,
  padding: "14px 16px",
  borderRadius: 10,
  background: "var(--color-general-neutral-25)",
  overflowX: "auto",
  fontFamily: "Monaco, Menlo, Consolas, monospace",
  fontSize: 14,
  lineHeight: 1.5,
  color: "var(--color-content-primary)",
};

const DEMO_ROW_STYLE = { display: "flex", gap: 12, flexWrap: "wrap" };
const DEMO_ROW_ALIGN_END_STYLE = { display: "flex", alignItems: "flex-end", gap: 16, flexWrap: "wrap" };
const SECTION_HEADING_STYLE = { fontSize: 28, fontWeight: 700, color: "var(--color-content-primary)" };
const COPY_BUTTON_OVERLAY_STYLE = { position: "absolute", top: "50%", right: 16, transform: "translateY(-50%)", zIndex: 1 };
const COPY_BUTTON_CARD_STYLE = { position: "absolute", top: 12, right: 12, background: "rgba(255, 255, 255, 0.92)" };
const APP_SHELL_STYLE = { display: "flex", minHeight: "100vh", background: "var(--color-general-neutral-light)" };
const MAIN_CONTENT_STYLE = { flex: 1, marginLeft: 80, overflow: "auto" };
const MAIN_CONTENT_INNER_STYLE = { maxWidth: 1000, margin: "0 auto" };
const SIDE_MENU_USER = { name: "Developer", email: "dev@eureka.design", avatarInitials: "EU" };

const CopyButton = ({ copied, onClick, size = "md", style }) => (
  <Button
    variant="secondary"
    size={size}
    iconLeading={<Icon name={copied ? "Check" : "DocumentDuplicate"} size="sm" />}
    onClick={onClick}
    style={style}
  >
    {copied ? "Copied" : "Copy"}
  </Button>
);

const InstallationBlock = ({ title }) => {
  const [installMethod, setInstallMethod] = useState("cli");
  const componentKey = toKebabCase(title);
  const componentName = toPascalCase(title);
  const cliSnippet = `npx ${PACKAGE_NAME}@latest add ${componentKey}`;
  const manualSnippet = `import "${PACKAGE_NAME}/style.css";
import { ${componentName} } from "${PACKAGE_NAME}";

export default function Example() {
  return <${componentName} />;
}`;
  const activeSnippet = installMethod === "cli" ? cliSnippet : manualSnippet;

  const { copied, copy } = useClipboardCopy({
    getText: () => activeSnippet,
    onError: (error) => console.error("Failed to copy installation snippet:", error),
  });

  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ ...SECTION_HEADING_STYLE, margin: 0 }}>Installation</h2>
      <p style={{ color: "var(--color-content-secondary)", fontSize: 16, marginTop: 8, marginBottom: 16 }}>
        You can add this {title.toLowerCase()} component using our CLI or manually:
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <Tabs selectedKey={installMethod} onSelectionChange={setInstallMethod}>
          <Tab id="cli">CLI</Tab>
          <Tab id="manual">Manual</Tab>
        </Tabs>
        <CopyButton copied={copied} onClick={copy} />
      </div>
      <div
        style={{
          marginTop: 12,
          ...COPYABLE_CODE_BOX_STYLE,
        }}
      >
        <pre style={CODE_SNIPPET_STYLE}>
          <code>{activeSnippet}</code>
        </pre>
      </div>
    </div>
  );
};

const ImportBlock = ({ title, importStatement, label = "Import" }) => {
  const { copied, copy } = useClipboardCopy({
    getText: () => importStatement,
    onError: (error) => console.error(`Failed to copy ${title} import snippet:`, error),
  });

  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ ...SECTION_HEADING_STYLE, marginBottom: 10 }}>{label}</h2>
      
      <div
        style={{
          position: "relative",
          ...COPYABLE_CODE_BOX_STYLE,
        }}
      >
        <CopyButton copied={copied} onClick={copy} style={COPY_BUTTON_OVERLAY_STYLE} />
        <pre style={{ ...CODE_SNIPPET_STYLE, paddingRight: 128 }}>
          <code>{importStatement}</code>
        </pre>
      </div>
    </div>
  );
};

const normalizeSectionTitle = (title = "") =>
  title
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s*[—-]\s*.*$/, "")
    .replace(/\s+Template$/, "")
    .trim();

const getPageByTitle = (title) => {
  const normalizedTitle = normalizeSectionTitle(title);
  return Object.values(PAGES).find((page) => page.title === title || page.title === normalizedTitle);
};

const getHeaderImportStatement = (title) => {
  const page = getPageByTitle(title);

  if (!page) {
    return null;
  }

  if (title === "Stage") {
    return 'import { Stepper } from "@/library/molecules/stepper";';
  }

  if (title === "Pagination (Organism)") {
    return 'import { Pagination as PaginationOrganism } from "@/library/organisms/pagination";';
  }

  const normalizedTitle = normalizeSectionTitle(title);

  if (page.category === "atoms" || page.category === "molecules") {
    return `import { ${normalizedTitle} } from "@/library/${page.category}/${toKebabCase(normalizedTitle)}";`;
  }

  if (page.category === "templates") {
    return `import { ${normalizedTitle} } from "@/library/templates/${toKebabCase(normalizedTitle)}";`;
  }

  if (
    normalizedTitle === "SideMenuItem"
    || normalizedTitle === "UserButton"
    || normalizedTitle === "SideMenu"
    || normalizedTitle === "SideMenuRichTextInput"
  ) {
    return `import { ${normalizedTitle} } from "@/library/organisms/side-menu/${toKebabCase(normalizedTitle)}";`;
  }

  if (normalizedTitle === "TableCell") {
    return 'import { TableCell } from "@/library/organisms/table/tablecell";';
  }

  if (normalizedTitle === "DocumentViewer") {
    return 'import { DocumentViewer } from "@/library/organisms/document-viewer/document-viewer";';
  }

  return `import { ${normalizedTitle} } from "@/library/organisms/${toKebabCase(normalizedTitle)}";`;
};

const getSectionHeaderBlock = (title) => {
  const importStatement = getHeaderImportStatement(title);

  return importStatement ? <ImportBlock title={title} importStatement={importStatement} /> : <InstallationBlock title={title} />;
};

const Section = ({ title, description, children, topBlock, showExamplesHeader = true }) => (
  <section style={{ marginBottom: 48 }}>
    <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid var(--color-neutral-200)" }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, color: "var(--color-content-primary)", marginBottom: 4 }}>{title}</h1>
      {description && <p style={{ color: "var(--color-content-secondary)", fontSize: 14 }}>{description}</p>}
    </div>
    {topBlock !== undefined ? topBlock : getSectionHeaderBlock(title)}
    {showExamplesHeader && (
      <div
        style={{
          marginBottom: 20,
          paddingTop: 24,
          borderTop: "1px dashed var(--color-action-outline-secondary-enabled)",
        }}
      >
        <h2 style={{ ...SECTION_HEADING_STYLE, margin: 0 }}>{title} Examples</h2>
        <p style={{ color: "var(--color-content-secondary)", fontSize: 16, marginTop: 8, marginBottom: 0 }}>
          Below are examples and variations of this {title.toLowerCase()} component:
        </p>
      </div>
    )}
    {children}
  </section>
);

const SubSection = ({ title, children }) => (
  <div style={{ marginBottom: 24 }}>
    <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--color-content-primary)", marginBottom: 16 }}>{title}</h3>
    {children}
  </div>
);

const Row = ({ label, children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
    <span style={{ width: 120, fontSize: 12, color: "var(--color-content-secondary)", flexShrink: 0 }}>{label}</span>
    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>{children}</div>
  </div>
);

const DemoBox = ({ children }) => (
  <div style={{
    padding: 24,
    background: "var(--color-neutral-0)",
    borderRadius: 8,
    border: "1px solid var(--color-neutral-200)",
    marginBottom: 16,
    overflowX: "auto",
    overflowY: "visible",
    WebkitOverflowScrolling: "touch",
  }}>
    {children}
  </div>
);

const COLOR_PRIMITIVE_FAMILIES = ["grey", "blue", "skyblue", "cyan", "green", "yellow", "peach", "orange", "red", "pink", "brown", "purple"];

const COLOR_TOKEN_RE = /^\s*(--(?:color-[A-Za-z0-9-]+|(?:grey|blue|skyblue|cyan|green|yellow|peach|orange|red|pink|brown|purple)-\d+)):\s*([^;]+);/gm;

const parseColorTokens = (cssText) => {
  const tokenMap = new Map();
  let match;

  while ((match = COLOR_TOKEN_RE.exec(cssText)) !== null) {
    tokenMap.set(match[1], match[2].trim());
  }

  const resolveValue = (name, seen = new Set()) => {
    if (seen.has(name)) return tokenMap.get(name) || "";
    const rawValue = tokenMap.get(name);
    if (!rawValue) return "";

    const directVarMatch = rawValue.match(/^var\((--[A-Za-z0-9-]+)\)$/);
    if (directVarMatch) {
      return resolveValue(directVarMatch[1], new Set([...seen, name]));
    }

    return rawValue.replace(/var\((--[A-Za-z0-9-]+)\)/g, (_, reference) => resolveValue(reference, new Set([...seen, name])) || rawValue);
  };

  const getGroup = (name) => {
    if (!name.startsWith("--color-")) {
      const family = name.slice(2).split("-")[0];
      return `Primitive / ${family.charAt(0).toUpperCase() + family.slice(1)}`;
    }

    const parts = name.slice(8).split("-");
    const root = parts[0];
    const second = parts[1];

    if (root === "action" && second) return `Action / ${second.charAt(0).toUpperCase() + second.slice(1)}`;
    if (root === "interaction" && second) return `Interaction / ${second.charAt(0).toUpperCase() + second.slice(1)}`;
    if (root === "ai" && second) return `AI / ${second.charAt(0).toUpperCase() + second.slice(1)}`;

    return root.charAt(0).toUpperCase() + root.slice(1);
  };

  const isRenderableColor = (value) => {
    const normalized = value.trim().toLowerCase();
    return (
      normalized.startsWith("#") ||
      normalized.startsWith("rgb(") ||
      normalized.startsWith("rgba(") ||
      normalized.startsWith("hsl(") ||
      normalized.startsWith("hsla(") ||
      normalized === "transparent"
    );
  };

  const tokens = [];

  for (const [name, rawValue] of tokenMap.entries()) {
    if (!name.startsWith("--color-") && !COLOR_PRIMITIVE_FAMILIES.some((family) => name.startsWith(`--${family}-`))) {
      continue;
    }

    const resolvedValue = resolveValue(name);
    if (!resolvedValue || resolvedValue.includes("gradient(")) {
      continue;
    }
    if (!isRenderableColor(resolvedValue)) {
      continue;
    }

    tokens.push({ name, rawValue, value: resolvedValue, group: getGroup(name) });
  }

  const groupOrder = [
    "Primitive / Grey",
    "Primitive / Blue",
    "Primitive / Skyblue",
    "Primitive / Cyan",
    "Primitive / Green",
    "Primitive / Yellow",
    "Primitive / Peach",
    "Primitive / Orange",
    "Primitive / Red",
    "Primitive / Pink",
    "Primitive / Brown",
    "Primitive / Purple",
    "General",
    "Content",
    "Neutral",
    "Action / Fill",
    "Action / Content",
    "Action / Outline",
    "Interaction / Fill",
    "Interaction / Outline",
    "Accent",
    "AI / Content",
    "AI / Outline",
  ];

  const groupRank = new Map(groupOrder.map((group, index) => [group, index]));

  tokens.sort((a, b) => {
    if (a.group !== b.group) return (groupRank.get(a.group) ?? 999) - (groupRank.get(b.group) ?? 999);

    const aShade = Number(a.name.match(/(\d+)$/)?.[1] || Number.POSITIVE_INFINITY);
    const bShade = Number(b.name.match(/(\d+)$/)?.[1] || Number.POSITIVE_INFINITY);

    if (aShade !== bShade) return aShade - bShade;
    return a.name.localeCompare(b.name);
  });

  return Object.entries(
    tokens.reduce((accumulator, token) => {
      if (!accumulator[token.group]) accumulator[token.group] = [];
      accumulator[token.group].push(token);
      return accumulator;
    }, {})
  ).map(([group, items]) => ({ group, items }));
};

const isDarkColor = (value) => {
  const hex = value.trim();
  if (!hex.startsWith("#")) return false;

  const normalized = hex.slice(1);
  const expanded = normalized.length === 3 ? normalized.split("").map((char) => char + char).join("") : normalized;
  if (expanded.length !== 6) return false;

  const red = Number.parseInt(expanded.slice(0, 2), 16);
  const green = Number.parseInt(expanded.slice(2, 4), 16);
  const blue = Number.parseInt(expanded.slice(4, 6), 16);
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000;

  return luminance < 128;
};

const ColorTokenCard = ({ token }) => {
  const isTransparent = token.value.trim().toLowerCase() === "transparent";
  const cardTextColor = isTransparent || isDarkColor(token.value) ? "var(--color-general-white)" : "var(--color-content-primary)";

  const { copied, copy } = useClipboardCopy({
    getText: () => token.name,
    onError: (error) => console.error("Failed to copy color token:", error),
  });

  const cardStyle = {
    position: "relative",
    minHeight: 120,
    padding: 16,
    borderRadius: 16,
    overflow: "hidden",
    border: "1px solid var(--color-action-outline-secondary-enabled)",
    background: isTransparent
      ? "linear-gradient(45deg, var(--color-general-neutral-lighter) 25%, transparent 25%, transparent 75%, var(--color-general-neutral-lighter) 75%, var(--color-general-neutral-lighter)), linear-gradient(45deg, var(--color-general-neutral-lighter) 25%, transparent 25%, transparent 75%, var(--color-general-neutral-lighter) 75%, var(--color-general-neutral-lighter)), var(--color-general-white)"
      : token.value,
    backgroundSize: isTransparent ? "16px 16px" : undefined,
    backgroundPosition: isTransparent ? "0 0, 8px 8px, 0 0" : undefined,
    boxShadow: "var(--shadow-light-down)",
    color: cardTextColor,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 16,
  };

  return (
    <div style={cardStyle}>
      <CopyButton copied={copied} onClick={copy} size="sm" style={COPY_BUTTON_CARD_STYLE} />

      <div style={{ paddingRight: 88 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: cardTextColor, marginBottom: 8 }}>{token.name.replace(/^--/, "")}</div>
        <div style={{ fontSize: 11, lineHeight: 1.4, color: cardTextColor, opacity: 0.9, wordBreak: "break-word" }}>{token.value}</div>
      </div>
    </div>
  );
};

const ColorTokenGroup = ({ group, items }) => (
  <section style={{ marginBottom: 32 }}>
    <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--color-content-primary)", marginBottom: 16 }}>{group}</h3>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
      {items.map((token) => (
        <ColorTokenCard key={token.name} token={token} />
      ))}
    </div>
  </section>
);

// ─────────────────────────────────────────────
// ATOM PAGES
// ─────────────────────────────────────────────

const StepAtomPage = () => (
  <Section title="Step" description="A single step indicator atom used inside Stepper or standalone progress indicators.">
    <PreviewComponent
      title="All Step Statuses"
      code={`import { Step } from "@/library/atoms/step";

<Step status="completed" title="Completed" showLine={false} />
<Step status="current" title="Current" showLine={false} />
<Step status="next" title="Next" showLine={false} />
<Step status="pending" title="Pending" showLine={false} />
<Step status="disabled" title="Disabled" showLine={false} />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Step status="completed" title="Completed" showLine={false} />
        <Step status="current" title="Current" showLine={false} />
        <Step status="next" title="Next" showLine={false} />
        <Step status="pending" title="Pending" showLine={false} />
        <Step status="disabled" title="Disabled" showLine={false} />
      </div>
    </PreviewComponent>
    <PreviewComponent
      title="Horizontal Steps"
      code={`<div style={{ display: "flex" }}>
  <Step status="completed" title="Step 1" />
  <Step status="completed" title="Step 2" />
  <Step status="current" title="Step 3" />
  <Step status="next" title="Step 4" showLine={false} />
</div>`}
    >
      <div style={{ display: "flex" }}>
        <Step status="completed" title="Step 1" />
        <Step status="completed" title="Step 2" />
        <Step status="current" title="Step 3" />
        <Step status="next" title="Step 4" showLine={false} />
      </div>
    </PreviewComponent>
  </Section>
);

const ButtonPage = () => (
  <Section title="Button" description="A flexible button with variants, sizes, and loading states.">
    <PreviewComponent
      title="All Button Variants"
        code={`import { Button } from "@/components/base/buttons/button";

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="negative">Negative</Button>
<Button variant="positive">Positive</Button>
<Button variant="link">Link</Button>`}
      >
        <div style={DEMO_ROW_STYLE}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="negative">Negative</Button>
          <Button variant="positive">Positive</Button>
          <Button variant="link">Link</Button>
        </div>
      </PreviewComponent>

    <PreviewComponent
      title="Button Sizes"
        code={`import { Button } from "@/components/base/buttons/button";

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`}
      >
        <div style={DEMO_ROW_ALIGN_END_STYLE}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </PreviewComponent>

    <PreviewComponent
      title="Primary Button"
        code={`import { Button } from "@/components/base/buttons/button";

<Button variant="primary">Primary</Button>
<Button variant="primary" isDisabled>Disabled</Button>
<Button variant="primary" loading>Loading</Button>`}
      >
        <div style={DEMO_ROW_STYLE}>
          <Button variant="primary">Primary</Button>
          <Button variant="primary" isDisabled>Disabled</Button>
          <Button variant="primary" loading>Loading</Button>
        </div>
      </PreviewComponent>

    <PreviewComponent
      title="Secondary Button"
        code={`import { Button } from "@/components/base/buttons/button";

<Button variant="secondary">Secondary</Button>
<Button variant="secondary" isDisabled>Disabled</Button>
<Button variant="secondary" loading>Loading</Button>`}
      >
        <div style={DEMO_ROW_STYLE}>
          <Button variant="secondary">Secondary</Button>
          <Button variant="secondary" isDisabled>Disabled</Button>
          <Button variant="secondary" loading>Loading</Button>
        </div>
      </PreviewComponent>

    <PreviewComponent
      title="Tertiary Button"
        code={`import { Button } from "@/components/base/buttons/button";

<Button variant="tertiary">Tertiary</Button>
<Button variant="tertiary" isDisabled>Disabled</Button>`}
      >
        <div style={DEMO_ROW_STYLE}>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="tertiary" isDisabled>Disabled</Button>
        </div>
      </PreviewComponent>

    <PreviewComponent
      title="Negative Button"
        code={`import { Button } from "@/components/base/buttons/button";

<Button variant="negative">Delete</Button>
<Button variant="negative" isDisabled>Disabled</Button>`}
      >
        <div style={DEMO_ROW_STYLE}>
          <Button variant="negative">Delete</Button>
          <Button variant="negative" isDisabled>Disabled</Button>
        </div>
      </PreviewComponent>

    <PreviewComponent
      title="Positive Button"
        code={`import { Button } from "@/components/base/buttons/button";

<Button variant="positive">Confirm</Button>
<Button variant="positive" isDisabled>Disabled</Button>`}
      >
        <div style={DEMO_ROW_STYLE}>
          <Button variant="positive">Confirm</Button>
          <Button variant="positive" isDisabled>Disabled</Button>
        </div>
      </PreviewComponent>

    <PreviewComponent
      title="Link Button"
        code={`import { Button } from "@/components/base/buttons/button";

<Button variant="link">Link Button</Button>
<Button variant="link" isDisabled>Disabled</Button>`}
      >
        <div style={DEMO_ROW_STYLE}>
          <Button variant="link">Link Button</Button>
          <Button variant="link" isDisabled>Disabled</Button>
        </div>
      </PreviewComponent>

    <PreviewComponent
      title="Button with Icon"
        code={`import { Button } from "@/components/base/buttons/button";
import { Icon } from "@/library/atoms/icon";

<Button variant="primary" iconLeading={<Icon name="Check" size="sm" />}>
  Publish now
</Button>`}
      >
        <Button variant="primary" iconLeading={<Icon name="Check" size="sm" />}>
          Publish now
        </Button>
      </PreviewComponent>
  </Section>
);

const BadgePage = () => (
  <Section title="Badge" description="A compact label element with colors, sizes, and shapes.">
    {/* 1. All Badge Colors */}
    <PreviewComponent
      title="All Badge Colors"
      code={`import { Badge } from "@/library/atoms/badge";

<Badge color="neutral">Neutral</Badge>
<Badge color="brand">Brand</Badge>
<Badge color="disabled">Disabled</Badge>
<Badge color="ai">AI</Badge>
<Badge color="positive">Positive</Badge>
<Badge color="negative">Negative</Badge>
<Badge color="warning">Warning</Badge>
<Badge color="informative">Informative</Badge>
<Badge color="ai">AI</Badge>`}
    >
      <div style={DEMO_ROW_STYLE}>
        <Badge color="neutral">Neutral</Badge>
        <Badge color="brand">Brand</Badge>
        <Badge color="disabled">Disabled</Badge>
        <Badge color="ai">AI</Badge>
        <Badge color="positive">Positive</Badge>
        <Badge color="negative">Negative</Badge>
        <Badge color="warning">Warning</Badge>
        <Badge color="informative">Informative</Badge>
      </div>
    </PreviewComponent>

    {/* 2. Badge Sizes */}
    <PreviewComponent
      title="Badge Sizes"
      code={`import { Badge } from "@/library/atoms/badge";

<Badge color="brand" size="xs">Extra Small</Badge>
<Badge color="brand" size="sm">Small</Badge>
<Badge color="brand" size="md">Medium</Badge>
<Badge color="brand" size="lg">Large</Badge>`}
    >
      <div style={DEMO_ROW_ALIGN_END_STYLE}>
        <Badge color="brand" size="xs">Extra Small</Badge>
        <Badge color="brand" size="sm">Small</Badge>
        <Badge color="brand" size="md">Medium</Badge>
        <Badge color="brand" size="lg">Large</Badge>
      </div>
    </PreviewComponent>

    {/* 3. Neutral Badge */}
    <PreviewComponent
      title="Neutral Badge"
      code={`import { Badge } from "@/library/atoms/badge";

<Badge color="neutral" size="md">Neutral</Badge>
<Badge color="neutral" size="md" icon>With Icon</Badge>
<Badge color="neutral" size="lg" icon>Large with Icon</Badge>`}
    >
      <div style={DEMO_ROW_STYLE}>
        <Badge color="neutral" size="md">Neutral</Badge>
        <Badge color="neutral" size="md" icon>With Icon</Badge>
        <Badge color="neutral" size="lg" icon>Large with Icon</Badge>
      </div>
    </PreviewComponent>

    {/* 4. Brand Badge */}
    <PreviewComponent
      title="Brand Badge"
      code={`import { Badge } from "@/library/atoms/badge";

<Badge color="brand" size="md">Brand</Badge>
<Badge color="brand" size="md" icon>With Icon</Badge>
<Badge color="brand" size="lg" icon>Large with Icon</Badge>`}
    >
      <div style={DEMO_ROW_STYLE}>
        <Badge color="brand" size="md">Brand</Badge>
        <Badge color="brand" size="md" icon>With Icon</Badge>
        <Badge color="brand" size="lg" icon>Large with Icon</Badge>
      </div>
    </PreviewComponent>

    {/* 5. Disabled Badge */}
    <PreviewComponent
      title="Disabled Badge"
      code={`import { Badge } from "@/library/atoms/badge";

<Badge color="disabled" size="md">Disabled</Badge>
<Badge color="disabled" size="md" icon>With Icon</Badge>
<Badge color="disabled" size="lg" icon>Large with Icon</Badge>`}
    >
      <div style={DEMO_ROW_STYLE}>
        <Badge color="disabled" size="md">Disabled</Badge>
        <Badge color="disabled" size="md" icon>With Icon</Badge>
        <Badge color="disabled" size="lg" icon>Large with Icon</Badge>
      </div>
    </PreviewComponent>

    {/* 6. AI Badge */}
    <PreviewComponent
      title="AI Badge"
      code={`import { Badge } from "@/library/atoms/badge";

<Badge color="ai" size="md">AI</Badge>
<Badge color="ai" size="md" icon>AI Generated</Badge>
<Badge color="ai" size="lg" icon>AI with Sparkles</Badge>`}
    >
      <div style={DEMO_ROW_STYLE}>
        <Badge color="ai" size="md">AI</Badge>
        <Badge color="ai" size="md" icon>AI Generated</Badge>
        <Badge color="ai" size="lg" icon>AI with Sparkles</Badge>
      </div>
    </PreviewComponent>

    {/* 7. Positive Badge */}
    <PreviewComponent
      title="Positive Badge"
      code={`import { Badge } from "@/library/atoms/badge";

<Badge color="positive" size="md">Positive</Badge>
<Badge color="positive" size="md" icon>With Icon</Badge>
<Badge color="positive" size="lg" icon>Large with Icon</Badge>`}
    >
      <div style={DEMO_ROW_STYLE}>
        <Badge color="positive" size="md">Positive</Badge>
        <Badge color="positive" size="md" icon>With Icon</Badge>
        <Badge color="positive" size="lg" icon>Large with Icon</Badge>
      </div>
    </PreviewComponent>

    {/* 8. Negative Badge */}
    <PreviewComponent
      title="Negative Badge"
      code={`import { Badge } from "@/library/atoms/badge";

<Badge color="negative" size="md">Negative</Badge>
<Badge color="negative" size="md" icon>With Icon</Badge>
<Badge color="negative" size="lg" icon>Large with Icon</Badge>`}
    >
      <div style={DEMO_ROW_STYLE}>
        <Badge color="negative" size="md">Negative</Badge>
        <Badge color="negative" size="md" icon>With Icon</Badge>
        <Badge color="negative" size="lg" icon>Large with Icon</Badge>
      </div>
    </PreviewComponent>

    {/* 9. Warning Badge */}
    <PreviewComponent
      title="Warning Badge"
      code={`import { Badge } from "@/library/atoms/badge";

<Badge color="warning" size="md">Warning</Badge>
<Badge color="warning" size="md" icon>With Icon</Badge>
<Badge color="warning" size="lg" icon>Large with Icon</Badge>`}
    >
      <div style={DEMO_ROW_STYLE}>
        <Badge color="warning" size="md">Warning</Badge>
        <Badge color="warning" size="md" icon>With Icon</Badge>
        <Badge color="warning" size="lg" icon>Large with Icon</Badge>
      </div>
    </PreviewComponent>

    {/* 10. Informative Badge */}
    <PreviewComponent
      title="Informative Badge"
      code={`import { Badge } from "@/library/atoms/badge";

<Badge color="informative" size="md">Informative</Badge>
<Badge color="informative" size="md" icon>With Icon</Badge>
<Badge color="informative" size="lg" icon>Large with Icon</Badge>`}
    >
      <div style={DEMO_ROW_STYLE}>
        <Badge color="informative" size="md">Informative</Badge>
        <Badge color="informative" size="md" icon>With Icon</Badge>
        <Badge color="informative" size="lg" icon>Large with Icon</Badge>
      </div>
    </PreviewComponent>

    {/* 11. Badge Shapes */}
    <PreviewComponent
      title="Badge Shapes"
      code={`import { Badge } from "@/library/atoms/badge";

<Badge color="brand" size="md" shape="rounded">Rounded</Badge>
<Badge color="brand" size="md" shape="rounded" icon>Rounded with Icon</Badge>
<Badge color="brand" size="md" shape="pill">Pill</Badge>
<Badge color="brand" size="md" shape="pill" icon>Pill with Icon</Badge>`}
    >
      <div style={DEMO_ROW_STYLE}>
        <Badge color="brand" size="md" shape="rounded">Rounded</Badge>
        <Badge color="brand" size="md" shape="rounded" icon>Rounded with Icon</Badge>
        <Badge color="brand" size="md" shape="pill">Pill</Badge>
        <Badge color="brand" size="md" shape="pill" icon>Pill with Icon</Badge>
      </div>
    </PreviewComponent>
  </Section>
);

const AvatarPage = () => (
  <Section title="Avatar" description="A circular avatar displaying initials or an image.">
    {/* 1. All Avatar Sizes */}
    <PreviewComponent
      title="Avatar Sizes"
      code={`import { Avatar } from "@/library/atoms/avatar";

<Avatar size="xs" name="John Doe" />
<Avatar size="sm" name="Jane Smith" />
<Avatar size="md" name="Bob Wilson" />
<Avatar size="lg" name="Alice Brown" />
<Avatar size="xl" name="Charlie Davis" />`}
    >
      <div style={DEMO_ROW_ALIGN_END_STYLE}>
        <Avatar size="xs" name="John Doe" />
        <Avatar size="sm" name="Jane Smith" />
        <Avatar size="md" name="Bob Wilson" />
        <Avatar size="lg" name="Alice Brown" />
        <Avatar size="xl" name="Charlie Davis" />
      </div>
    </PreviewComponent>

    {/* 2. Avatar with Name-based Initials */}
    <PreviewComponent
      title="Name-based Initials"
      code={`import { Avatar } from "@/library/atoms/avatar";

<Avatar size="lg" name="Alice Brown" />
<Avatar size="lg" name="Bob Wilson" />
<Avatar size="lg" name="Charlie Davis" />`}
    >
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Avatar size="lg" name="Alice Brown" />
        <Avatar size="lg" name="Bob Wilson" />
        <Avatar size="lg" name="Charlie Davis" />
      </div>
    </PreviewComponent>

    {/* 3. Avatar with Custom Initials */}
    <PreviewComponent
      title="Custom Initials"
      code={`import { Avatar } from "@/library/atoms/avatar";

<Avatar size="lg" initials="AB" />
<Avatar size="lg" initials="CD" />
<Avatar size="lg" initials="EF" />`}
    >
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Avatar size="lg" initials="AB" />
        <Avatar size="lg" initials="CD" />
        <Avatar size="lg" initials="EF" />
      </div>
    </PreviewComponent>
  </Section>
);

const CheckboxPage = () => {
  return (
    <Section title="Checkbox" description="A reusable checkbox with sizes and states.">
      <PreviewComponent
        title="All Variants - SM"
        code={`import { Checkbox } from "@/library/atoms/checkbox";

<Checkbox size="sm" type="unchecked" state="enabled">SM Unchecked Enabled</Checkbox>
<Checkbox size="sm" type="checked" state="enabled">SM Checked Enabled</Checkbox>
<Checkbox size="sm" type="intermediate" state="enabled">SM Intermediate Enabled</Checkbox>
<Checkbox size="sm" type="unchecked" state="disabled">SM Unchecked Disabled</Checkbox>
<Checkbox size="sm" type="checked" state="disabled">SM Checked Disabled</Checkbox>
<Checkbox size="sm" type="intermediate" state="disabled">SM Intermediate Disabled</Checkbox>`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Checkbox size="sm" type="unchecked" state="enabled">SM Unchecked Enabled</Checkbox>
          <Checkbox size="sm" type="checked" state="enabled">SM Checked Enabled</Checkbox>
          <Checkbox size="sm" type="intermediate" state="enabled">SM Intermediate Enabled</Checkbox>
          <Checkbox size="sm" type="unchecked" state="disabled">SM Unchecked Disabled</Checkbox>
          <Checkbox size="sm" type="checked" state="disabled">SM Checked Disabled</Checkbox>
          <Checkbox size="sm" type="intermediate" state="disabled">SM Intermediate Disabled</Checkbox>
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="All Variants - MD"
        code={`import { Checkbox } from "@/library/atoms/checkbox";

<Checkbox size="md" type="unchecked" state="enabled">MD Unchecked Enabled</Checkbox>
<Checkbox size="md" type="checked" state="enabled">MD Checked Enabled</Checkbox>
<Checkbox size="md" type="intermediate" state="enabled">MD Intermediate Enabled</Checkbox>
<Checkbox size="md" type="unchecked" state="disabled">MD Unchecked Disabled</Checkbox>
<Checkbox size="md" type="checked" state="disabled">MD Checked Disabled</Checkbox>
<Checkbox size="md" type="intermediate" state="disabled">MD Intermediate Disabled</Checkbox>`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Checkbox size="md" type="unchecked" state="enabled">MD Unchecked Enabled</Checkbox>
          <Checkbox size="md" type="checked" state="enabled">MD Checked Enabled</Checkbox>
          <Checkbox size="md" type="intermediate" state="enabled">MD Intermediate Enabled</Checkbox>
          <Checkbox size="md" type="unchecked" state="disabled">MD Unchecked Disabled</Checkbox>
          <Checkbox size="md" type="checked" state="disabled">MD Checked Disabled</Checkbox>
          <Checkbox size="md" type="intermediate" state="disabled">MD Intermediate Disabled</Checkbox>
        </div>
      </PreviewComponent>
    </Section>
  );
};

const TogglePage = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Section title="Toggle" description="A switch/toggle control with multiple sizes and states.">
      {/* 1. All Toggle States */}
      <PreviewComponent
        title="Toggle States"
        code={`import { Toggle } from "@/library/atoms/toggle";

<Toggle label="Toggle off" isSelected={false} />
<Toggle label="Toggle on" isSelected={true} />
<Toggle label="Disabled off" isDisabled />
<Toggle label="Disabled on" isDisabled isSelected />`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Toggle label="Toggle off" isSelected={enabled} onChange={setEnabled} />
          <Toggle label="Toggle on" isSelected={!enabled} onChange={(v) => setEnabled(!v)} />
          <Toggle label="Disabled off" isDisabled />
          <Toggle label="Disabled on" isDisabled isSelected />
        </div>
      </PreviewComponent>

      {/* 2. Toggle Sizes */}
      <PreviewComponent
        title="Toggle Sizes"
        code={`import { Toggle } from "@/library/atoms/toggle";

<Toggle size="sm" label="Small toggle" />
<Toggle size="md" label="Medium toggle" />`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Toggle size="sm" label="Small toggle" />
          <Toggle size="md" label="Medium toggle" />
        </div>
      </PreviewComponent>

      {/* 3. Label Position */}
      <PreviewComponent
        title="Label Position"
        code={`import { Toggle } from "@/library/atoms/toggle";

<Toggle label="Label on right" labelPosition="right" />
<Toggle label="Label on left" labelPosition="left" />`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Toggle label="Label on right" labelPosition="right" />
          <Toggle label="Label on left" labelPosition="left" />
        </div>
      </PreviewComponent>

      {/* 4. Interactive Example */}
      <PreviewComponent
        title="Interactive Toggle"
        code={`import { Toggle } from "@/library/atoms/toggle";
import { useState } from "react";

const [enabled, setEnabled] = useState(false);

<Toggle 
  label="Enable notifications" 
  isSelected={enabled} 
  onChange={setEnabled} 
/>`}
      >
        <Toggle 
          label="Enable notifications" 
          isSelected={enabled} 
          onChange={setEnabled} 
        />
      </PreviewComponent>
    </Section>
  );
};

const IconPage = () => {
  const secondaryColor = "var(--color-content-secondary)";

  return (
    <Section title="Icon" description="A unified icon library wrapping Heroicons and custom object-type icons.">
      <PreviewComponent
        title="All Example Icons"
        code={`import { Icon, ICON_EXAMPLE_NAMES } from "@/library/atoms/icon";

<div>
  {ICON_EXAMPLE_NAMES.map((name) => (
    <div key={name}>
      <Icon name={name} variant="outline" size="lg" color="var(--color-content-secondary)" />
      <Icon name={name} variant="fill" size="lg" color="var(--color-content-secondary)" />
    </div>
  ))}
</div>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 16 }}>
          {ICON_EXAMPLE_NAMES.map((name) => (
            <div
              key={name}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: secondaryColor }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name={name} variant="outline" size="lg" color={secondaryColor} />
                <Icon name={name} variant="fill" size="lg" color={secondaryColor} />
              </div>
              <span style={{ fontSize: 12, color: secondaryColor, textAlign: "center" }}>{name}</span>
            </div>
          ))}
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="All Object Type Icons"
        code={`import { Icon, OBJECT_TYPE_NAMES } from "@/library/atoms/icon";

<div>
  {OBJECT_TYPE_NAMES.map((name) => (
    <div key={name}>
      <Icon type={name} variant="outline" size="lg" color="var(--color-content-secondary)" />
      <Icon type={name} variant="fill" size="lg" color="var(--color-content-secondary)" />
    </div>
  ))}
</div>`}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 16 }}>
          {OBJECT_TYPE_NAMES.map((name) => (
            <div
              key={name}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: secondaryColor }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon type={name} variant="outline" size="lg" color={secondaryColor} />
                <Icon type={name} variant="fill" size="lg" color={secondaryColor} />
              </div>
              <span style={{ fontSize: 12, color: secondaryColor, textAlign: "center" }}>{name}</span>
            </div>
          ))}
        </div>
      </PreviewComponent>
    </Section>
  );
};

const ColorsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const colorGroups = useMemo(() => parseColorTokens(tokensCssRaw), []);

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return colorGroups;
    const query = searchQuery.toLowerCase();

    return colorGroups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (token) =>
            token.name.toLowerCase().includes(query) ||
            token.value.toLowerCase().includes(query) ||
            group.group.toLowerCase().includes(query)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [colorGroups, searchQuery]);

  return (
    <Section
      title="Colors"
      description="Search and copy every color token from library/tokens/tokens.css, including --color-content-search-highlight."
      topBlock={null}
      showExamplesHeader={false}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ maxWidth: 420 }}>
          <TextInput
            label="Search colors"
            placeholder="Search token name or value..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        {filteredGroups.length > 0 ? (
          filteredGroups.map((group) => <ColorTokenGroup key={group.group} group={group.group} items={group.items} />)
        ) : (
          <div style={{ padding: 24, border: "1px dashed var(--color-action-outline-secondary-enabled)", borderRadius: 16, color: "var(--color-content-secondary)" }}>
            No matching color tokens.
          </div>
        )}
      </div>
    </Section>
  );
};

const ChipPage = () => (
  <Section title="Chip" description="A compact label element with optional color accent, icons, and actions.">
    {/* 1. All Chip Variants */}
    <PreviewComponent
      title="All Chip Variants"
      code={`import { Chip } from "@/library/atoms/chip";

<Chip variant="neutral">Neutral</Chip>
<Chip variant="primary">Primary</Chip>
<Chip variant="positive">Positive</Chip>
<Chip variant="negative">Negative</Chip>
<Chip variant="warning">Warning</Chip>`}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <Chip variant="neutral">Neutral</Chip>
        <Chip variant="primary">Primary</Chip>
        <Chip variant="positive">Positive</Chip>
        <Chip variant="negative">Negative</Chip>
        <Chip variant="warning">Warning</Chip>
      </div>
    </PreviewComponent>

    {/* 2. Chip Sizes */}
    <PreviewComponent
      title="Chip Sizes"
      code={`import { Chip } from "@/library/atoms/chip";

<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>`}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap: 12, flexWrap: "wrap" }}>
        <Chip size="sm">Small</Chip>
        <Chip size="md">Medium</Chip>
      </div>
    </PreviewComponent>

    {/* 3. Chip with Icon */}
    <PreviewComponent
      title="Chip with Icon"
      code={`import { Chip } from "@/library/atoms/chip";
import { Icon } from "@/library/atoms/icon";

<Chip icon={<Icon name="Star" size="sm" />}>With Icon</Chip>
<Chip variant="primary" icon={<Icon name="Check" size="sm" />}>Verified</Chip>
<Chip variant="positive" icon={<Icon name="Heart" variant="solid" size="sm" />}>Favorite</Chip>`}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <Chip icon={<Icon name="Star" size="sm" />}>With Icon</Chip>
        <Chip variant="primary" icon={<Icon name="Check" size="sm" />}>Verified</Chip>
        <Chip variant="positive" icon={<Icon name="Heart" variant="solid" size="sm" />}>Favorite</Chip>
      </div>
    </PreviewComponent>

    {/* 4. Chip with Chevron */}
    <PreviewComponent
      title="Chip with Chevron"
      code={`import { Chip } from "@/library/atoms/chip";

<Chip chevron>With Chevron</Chip>
<Chip variant="primary" chevron>Dropdown</Chip>`}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <Chip chevron>With Chevron</Chip>
        <Chip variant="primary" chevron>Dropdown</Chip>
      </div>
    </PreviewComponent>

    {/* 5. Removable Chip */}
    <PreviewComponent
      title="Removable Chip"
      code={`import { Chip } from "@/library/atoms/chip";

<Chip removable onRemove={() => alert("Remove clicked")}>
  Removable
</Chip>
<Chip variant="primary" removable onRemove={() => alert("Remove clicked")}>
  Tag
</Chip>`}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <Chip removable onRemove={() => alert("Remove clicked")}>Removable</Chip>
        <Chip variant="primary" removable onRemove={() => alert("Remove clicked")}>Tag</Chip>
      </div>
    </PreviewComponent>

    {/* 6. Chip with Custom Color */}
    <PreviewComponent
      title="Custom Color Chip"
      code={`import { Chip } from "@/library/atoms/chip";

<Chip color="#4649FF">Custom Blue</Chip>
<Chip color="#FF6B6B">Custom Red</Chip>
<Chip color="#10B981">Custom Green</Chip"`}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <Chip color="#4649FF">Custom Blue</Chip>
        <Chip color="#FF6B6B">Custom Red</Chip>
        <Chip color="#10B981">Custom Green</Chip>
      </div>
    </PreviewComponent>

    {/* 7. Full Featured Chip */}
    <PreviewComponent
      title="Full Featured Chip"
      code={`import { Chip } from "@/library/atoms/chip";
import { Icon } from "@/library/atoms/icon";

<Chip 
  color="#FF6B6B" 
  icon={<Icon name="Heart" variant="solid" size="sm" />} 
  removable
  onRemove={() => alert("Remove clicked")}
>
  Full Featured
</Chip>`}
    >
      <Chip 
        color="#FF6B6B" 
        icon={<Icon name="Heart" variant="solid" size="sm" />} 
        removable
        onRemove={() => alert("Remove clicked")}
      >
        Full Featured
      </Chip>
    </PreviewComponent>
  </Section>
);

const LinkPage = () => (
  <Section title="Link" description="A styled anchor link with optional leading/trailing icons.">
    {/* 1. Link Sizes */}
    <PreviewComponent
      title="Link Sizes"
      code={`import { Link } from "@/library/atoms/link";

<Link href="#" size="sm">Small Link</Link>
<Link href="#" size="md">Medium Link</Link>
<Link href="#" size="lg">Large Link</Link>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Link href="#" size="sm">Small Link</Link>
        <Link href="#" size="md">Medium Link</Link>
        <Link href="#" size="lg">Large Link</Link>
      </div>
    </PreviewComponent>

    {/* 2. Link States */}
    <PreviewComponent
      title="Link States"
      code={`import { Link } from "@/library/atoms/link";

<Link href="#">Default Link</Link>
<Link href="#" isDisabled>Disabled Link</Link>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Link href="#">Default Link</Link>
        <Link href="#" isDisabled>Disabled Link</Link>
      </div>
    </PreviewComponent>

    {/* 3. Link with Leading Icon */}
    <PreviewComponent
      title="Link with Leading Icon"
      code={`import { Link } from "@/library/atoms/link";
import { Icon } from "@/library/atoms/icon";

<Link href="#" iconLeading={<Icon name="ArrowLeft" size="sm" />}>
  Back
</Link>
<Link href="#" iconLeading={<Icon name="ArrowUpRight" size="sm" />} target="_blank">
  Open External
</Link>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Link href="#" iconLeading={<Icon name="ArrowLeft" size="sm" />}>Back</Link>
        <Link href="#" iconLeading={<Icon name="ArrowUpRight" size="sm" />} target="_blank">Open External</Link>
      </div>
    </PreviewComponent>

    {/* 4. Link with Trailing Icon */}
    <PreviewComponent
      title="Link with Trailing Icon"
      code={`import { Link } from "@/library/atoms/link";
import { Icon } from "@/library/atoms/icon";

<Link href="#" iconTrailing={<Icon name="ArrowRight" size="sm" />}>
  Continue
</Link>
<Link href="#" iconTrailing={<Icon name="ChevronRight" size="sm" />}>
  Learn More
</Link>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Link href="#" iconTrailing={<Icon name="ArrowRight" size="sm" />}>Continue</Link>
        <Link href="#" iconTrailing={<Icon name="ChevronRight" size="sm" />}>Learn More</Link>
      </div>
    </PreviewComponent>
  </Section>
);

const TooltipPage = () => (
  <Section title="Tooltip" description="A contextual helper that appears on hover or focus and can wrap any trigger component.">
    <PreviewComponent
      title="Tooltip Placements"
      code={`import { Tooltip } from "@/library/atoms/tooltip";
import { Button } from "@/library/atoms/button";

<Tooltip placement="top-left" content="Top left tooltip">
  <Button variant="secondary">Top Left</Button>
</Tooltip>
<Tooltip placement="top-right" content="Top right tooltip">
  <Button variant="secondary">Top Right</Button>
</Tooltip>
<Tooltip placement="bottom-left" content="Bottom left tooltip">
  <Button variant="secondary">Bottom Left</Button>
</Tooltip>
<Tooltip placement="bottom-right" content="Bottom right tooltip">
  <Button variant="secondary">Bottom Right</Button>
</Tooltip>
<Tooltip placement="left" content="Left tooltip">
  <Button variant="secondary">Left</Button>
</Tooltip>
<Tooltip placement="right" content="Right tooltip">
  <Button variant="secondary">Right</Button>
</Tooltip>`}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <Tooltip placement="top-left" content="Top left tooltip">
          <Button variant="secondary">Top Left</Button>
        </Tooltip>
        <Tooltip placement="top-right" content="Top right tooltip">
          <Button variant="secondary">Top Right</Button>
        </Tooltip>
        <Tooltip placement="bottom-left" content="Bottom left tooltip">
          <Button variant="secondary">Bottom Left</Button>
        </Tooltip>
        <Tooltip placement="bottom-right" content="Bottom right tooltip">
          <Button variant="secondary">Bottom Right</Button>
        </Tooltip>
        <Tooltip placement="left" content="Left tooltip">
          <Button variant="secondary">Left</Button>
        </Tooltip>
        <Tooltip placement="right" content="Right tooltip">
          <Button variant="secondary">Right</Button>
        </Tooltip>
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Works With Any Trigger"
      code={`import { Tooltip } from "@/library/atoms/tooltip";
import { Link } from "@/library/atoms/link";
import { Icon } from "@/library/atoms/icon";

<Tooltip content="Tooltip on link">
  <Link href="#">Hover link</Link>
</Tooltip>

<Tooltip content="Tooltip on icon button" placement="left">
  <button type="button" style={{ border: "none", background: "transparent", cursor: "pointer" }}>
    <Icon name="InformationCircle" size="md" />
  </button>
</Tooltip>`}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <Tooltip content="Tooltip on link">
          <Link href="#">Hover link</Link>
        </Tooltip>

        <Tooltip content="Tooltip on icon button" placement="left">
          <button
            type="button"
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="InformationCircle" size="md" />
          </button>
        </Tooltip>
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Long Content"
      code={`<Tooltip
  placement="top-right"
  maxWidth={360}
  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras efficitur, odio id laoreet dignissim, orci dolor feugiat lacus, non sagittis nisi nisi id felis. Cras elementum egestas ex, eu dapibus felis pulvinar et."
>
  <Button variant="primary">Hover for Long Tooltip</Button>
</Tooltip>`}
    >
      <Tooltip
        placement="top-right"
        maxWidth={360}
        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras efficitur, odio id laoreet dignissim, orci dolor feugiat lacus, non sagittis nisi nisi id felis. Cras elementum egestas ex, eu dapibus felis pulvinar et."
      >
        <Button variant="primary">Hover for Long Tooltip</Button>
      </Tooltip>
    </PreviewComponent>
  </Section>
);

const StepPage = () => (
  <Section title="Step" description="A step indicator for use in steppers/progress indicators.">
    {/* 1. All Step Statuses */}
    <PreviewComponent
      title="All Step Statuses"
      code={`import { Step } from "@/library/atoms/step";

<Step status="completed" title="Completed Step" showLine={false} />
<Step status="current" title="Current Step" showLine={false} />
<Step status="next" title="Next Step" showLine={false} />
<Step status="pending" title="Pending Step" showLine={false} />
<Step status="disabled" title="Disabled Step" showLine={false} />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Step status="completed" title="Completed Step" showLine={false} />
        <Step status="current" title="Current Step" showLine={false} />
        <Step status="next" title="Next Step" showLine={false} />
        <Step status="pending" title="Pending Step" showLine={false} />
        <Step status="disabled" title="Disabled Step" showLine={false} />
      </div>
    </PreviewComponent>

    {/* 2. Horizontal Stepper */}
    <PreviewComponent
      title="Horizontal Stepper"
      code={`import { Step } from "@/library/atoms/step";

<div style={{ display: "flex", gap: 0 }}>
  <Step status="completed" title="Step 1" subtitle="Completed" />
  <Step status="completed" title="Step 2" subtitle="Completed" />
  <Step status="current" title="Step 3" subtitle="In Progress" />
  <Step status="next" title="Step 4" subtitle="Pending" />
  <Step status="next" title="Step 5" subtitle="Pending" showLine={false} />
</div>`}
    >
      <div style={{ display: "flex", gap: 0 }}>
        <Step status="completed" title="Step 1" subtitle="Completed" />
        <Step status="completed" title="Step 2" subtitle="Completed" />
        <Step status="current" title="Step 3" subtitle="In Progress" />
        <Step status="next" title="Step 4" subtitle="Pending" />
        <Step status="next" title="Step 5" subtitle="Pending" showLine={false} />
      </div>
    </PreviewComponent>

    {/* 3. Vertical Stepper */}
    <PreviewComponent
      title="Vertical Stepper"
      code={`import { Step } from "@/library/atoms/step";

<div style={{ display: "flex", flexDirection: "column", height: 300 }}>
  <Step status="completed" title="Account Created" subtitle="Jan 1, 2024" orientation="vertical" />
  <Step status="completed" title="Profile Setup" subtitle="Jan 5, 2024" orientation="vertical" />
  <Step status="current" title="Verification" subtitle="In Progress" orientation="vertical" />
  <Step status="next" title="Complete" subtitle="" orientation="vertical" showLine={false} />
</div>`}
    >
      <div style={{ display: "flex", flexDirection: "column", height: 300 }}>
        <Step status="completed" title="Account Created" subtitle="Jan 1, 2024" orientation="vertical" />
        <Step status="completed" title="Profile Setup" subtitle="Jan 5, 2024" orientation="vertical" />
        <Step status="current" title="Verification" subtitle="In Progress" orientation="vertical" />
        <Step status="next" title="Complete" subtitle="" orientation="vertical" showLine={false} />
      </div>
    </PreviewComponent>

    {/* 4. Steps with Subtitles */}
    <PreviewComponent
      title="Steps with Subtitles"
      code={`import { Step } from "@/library/atoms/step";

<Step status="completed" title="Order Placed" subtitle="March 15, 2024" showLine={false} />
<Step status="current" title="Processing" subtitle="In Progress" showLine={false} />
<Step status="next" title="Shipped" subtitle="Pending" showLine={false} />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Step status="completed" title="Order Placed" subtitle="March 15, 2024" showLine={false} />
        <Step status="current" title="Processing" subtitle="In Progress" showLine={false} />
        <Step status="next" title="Shipped" subtitle="Pending" showLine={false} />
      </div>
    </PreviewComponent>
  </Section>
);

const ButtonBadgePage = () => {
  const [activeFilter, setActiveFilter] = useState(null);

  return (
    <Section title="ButtonBadge" description="A button element with an optional icon, label, and integrated Badge.">
      {/* 1. All ButtonBadge States */}
      <PreviewComponent
        title="ButtonBadge States"
        code={`import { ButtonBadge } from "@/library/atoms/button-badge";

<ButtonBadge state="enabled" badgeLabel="5">Enabled</ButtonBadge>
<ButtonBadge state="active" badgeLabel="5">Active</ButtonBadge>
<ButtonBadge state="disabled" badgeLabel="5" isDisabled>Disabled</ButtonBadge>`}
      >
        <div style={DEMO_ROW_STYLE}>
          <ButtonBadge state="enabled" badgeLabel="5">Enabled</ButtonBadge>
          <ButtonBadge state="active" badgeLabel="5">Active</ButtonBadge>
          <ButtonBadge state="disabled" badgeLabel="5" isDisabled>Disabled</ButtonBadge>
        </div>
      </PreviewComponent>

      {/* 2. Auto-Toggle Interaction (Default) */}
      <PreviewComponent
        title="Auto-Toggle on Click (Default Behavior)"
        code={`import { ButtonBadge } from "@/library/atoms/button-badge";

{/* Click to toggle between enabled and active */}
<ButtonBadge badgeLabel="5">Click Me</ButtonBadge>
<ButtonBadge iconName="Bell" badgeLabel="3">Notifications</ButtonBadge>
<ButtonBadge variant="without-badge" iconName="Funnel">Filter</ButtonBadge>`}
      >
        <div style={DEMO_ROW_STYLE}>
          <ButtonBadge badgeLabel="5">Click Me</ButtonBadge>
          <ButtonBadge iconName="Bell" badgeLabel="3">Notifications</ButtonBadge>
          <ButtonBadge variant="without-badge" iconName="Funnel">Filter</ButtonBadge>
        </div>
      </PreviewComponent>

      {/* 3. ButtonBadge Sizes */}
      <PreviewComponent
        title="ButtonBadge Sizes"
        code={`import { ButtonBadge } from "@/library/atoms/button-badge";

<ButtonBadge size="md" badgeLabel="5">Medium</ButtonBadge>
<ButtonBadge size="lg" badgeLabel="5">Large</ButtonBadge>`}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, flexWrap: "wrap" }}>
          <ButtonBadge size="md" badgeLabel="5">Medium</ButtonBadge>
          <ButtonBadge size="lg" badgeLabel="5">Large</ButtonBadge>
        </div>
      </PreviewComponent>

      {/* 4. Basic Usage */}
      <PreviewComponent
        title="Basic ButtonBadge"
        code={`import { ButtonBadge } from "@/library/atoms/button-badge";

<ButtonBadge badgeLabel="5">Notifications</ButtonBadge>
<ButtonBadge badgeLabel="12">Messages</ButtonBadge>
<ButtonBadge badgeLabel="New">Updates</ButtonBadge>`}
      >
        <div style={DEMO_ROW_STYLE}>
          <ButtonBadge badgeLabel="5">Notifications</ButtonBadge>
          <ButtonBadge badgeLabel="12">Messages</ButtonBadge>
          <ButtonBadge badgeLabel="New">Updates</ButtonBadge>
        </div>
      </PreviewComponent>

      {/* 5. With Icons */}
      <PreviewComponent
        title="ButtonBadge with Icons"
        code={`import { ButtonBadge } from "@/library/atoms/button-badge";

<ButtonBadge iconName="Bell" badgeLabel="3">Alerts</ButtonBadge>
<ButtonBadge iconName="Envelope" badgeLabel="99+">Inbox</ButtonBadge>
<ButtonBadge iconName="ShoppingCart" badgeLabel="2">Cart</ButtonBadge>`}
      >
        <div style={DEMO_ROW_STYLE}>
          <ButtonBadge iconName="Bell" badgeLabel="3">Alerts</ButtonBadge>
          <ButtonBadge iconName="Envelope" badgeLabel="99+">Inbox</ButtonBadge>
          <ButtonBadge iconName="ShoppingCart" badgeLabel="2">Cart</ButtonBadge>
        </div>
      </PreviewComponent>

      {/* 6. Without Badge Variant */}
      <PreviewComponent
        title="Without Badge"
        code={`import { ButtonBadge } from "@/library/atoms/button-badge";

<ButtonBadge variant="without-badge" iconName="Funnel">Filter</ButtonBadge>
<ButtonBadge variant="without-badge" iconName="ArrowsUpDown">Sort</ButtonBadge>
<ButtonBadge variant="without-badge" iconRightName="ChevronDown">Dropdown</ButtonBadge>`}
      >
        <div style={DEMO_ROW_STYLE}>
          <ButtonBadge variant="without-badge" iconName="Funnel">Filter</ButtonBadge>
          <ButtonBadge variant="without-badge" iconName="ArrowsUpDown">Sort</ButtonBadge>
          <ButtonBadge variant="without-badge" iconRightName="ChevronDown">Dropdown</ButtonBadge>
        </div>
      </PreviewComponent>

      {/* 7. Interactive Filter Example (Controlled State) */}
      <PreviewComponent
        title="Interactive Filter Example (Controlled State)"
        code={`import { ButtonBadge } from "@/library/atoms/button-badge";
import { useState } from "react";

const [activeFilter, setActiveFilter] = useState(null);

{["All", "Active", "Pending", "Completed"].map((filter) => (
  <ButtonBadge
    key={filter}
    state={activeFilter === filter ? "active" : "enabled"}
    onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
    badgeLabel={filter === "All" ? "24" : filter === "Active" ? "8" : filter === "Pending" ? "12" : "4"}
  >
    {filter}
  </ButtonBadge>
))}`}
      >
        <div>
          <p style={{ marginBottom: 16, color: "var(--color-content-secondary)", fontSize: 14 }}>
            Click to toggle active state:
          </p>
          <div style={DEMO_ROW_STYLE}>
            {["All", "Active", "Pending", "Completed"].map((filter) => (
              <ButtonBadge
                key={filter}
                state={activeFilter === filter ? "active" : "enabled"}
                onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
                badgeLabel={filter === "All" ? "24" : filter === "Active" ? "8" : filter === "Pending" ? "12" : "4"}
              >
                {filter}
              </ButtonBadge>
            ))}
          </div>
        </div>
      </PreviewComponent>
    </Section>
  );
};

const AiButtonPage = () => (
  <Section title="AiButton" description="An AI-branded button with animated blob background and gradient accents. Use primary for key AI actions, secondary for outlined actions, and tertiary for inline contexts.">
    <PreviewComponent
      title="Primary — All Sizes"
      code={`import { AiButton } from "@/library/atoms/ai-button";
import { Icon } from "@/library/atoms/icon";

<AiButton variant="primary" size="lg" iconLeading={<Icon name="Sparkles" />}>Ask AI</AiButton>
<AiButton variant="primary" size="md" iconLeading={<Icon name="Sparkles" />}>Ask AI</AiButton>
<AiButton variant="primary" size="sm" iconLeading={<Icon name="Sparkles" />}>Ask AI</AiButton>`}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <AiButton variant="primary" size="lg" iconLeading={<Icon name="Sparkles" />}>Ask AI</AiButton>
        <AiButton variant="primary" size="md" iconLeading={<Icon name="Sparkles" />}>Ask AI</AiButton>
        <AiButton variant="primary" size="sm" iconLeading={<Icon name="Sparkles" />}>Ask AI</AiButton>
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Secondary — All Sizes"
      code={`import { AiButton } from "@/library/atoms/ai-button";
import { Icon } from "@/library/atoms/icon";

<AiButton variant="secondary" size="lg" iconLeading={<Icon name="Sparkles" />}>Ask AI</AiButton>
<AiButton variant="secondary" size="md" iconLeading={<Icon name="Sparkles" />}>Ask AI</AiButton>
<AiButton variant="secondary" size="sm" iconLeading={<Icon name="Sparkles" />}>Ask AI</AiButton>`}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <AiButton variant="secondary" size="lg" iconLeading={<Icon name="Sparkles" />}>Ask AI</AiButton>
        <AiButton variant="secondary" size="md" iconLeading={<Icon name="Sparkles" />}>Ask AI</AiButton>
        <AiButton variant="secondary" size="sm" iconLeading={<Icon name="Sparkles" />}>Ask AI</AiButton>
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Tertiary — All Sizes"
      code={`import { AiButton } from "@/library/atoms/ai-button";
import { Icon } from "@/library/atoms/icon";

<AiButton variant="tertiary" size="lg" iconLeading={<Icon name="Sparkles" />}>Ask AI</AiButton>
<AiButton variant="tertiary" size="md" iconLeading={<Icon name="Sparkles" />}>Ask AI</AiButton>
<AiButton variant="tertiary" size="sm" iconLeading={<Icon name="Sparkles" />}>Ask AI</AiButton>`}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <AiButton variant="tertiary" size="lg" iconLeading={<Icon name="Sparkles" />}>Ask AI</AiButton>
        <AiButton variant="tertiary" size="md" iconLeading={<Icon name="Sparkles" />}>Ask AI</AiButton>
        <AiButton variant="tertiary" size="sm" iconLeading={<Icon name="Sparkles" />}>Ask AI</AiButton>
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="States — Primary"
      code={`import { AiButton } from "@/library/atoms/ai-button";
import { Icon } from "@/library/atoms/icon";

<AiButton variant="primary" size="lg" iconLeading={<Icon name="Sparkles" />}>Enabled</AiButton>
<AiButton variant="primary" size="lg" iconLeading={<Icon name="Sparkles" />} isDisabled>Disabled</AiButton>`}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <AiButton variant="primary" size="lg" iconLeading={<Icon name="Sparkles" />}>Enabled</AiButton>
        <AiButton variant="primary" size="lg" iconLeading={<Icon name="Sparkles" />} isDisabled>Disabled</AiButton>
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="States — Secondary"
      code={`import { AiButton } from "@/library/atoms/ai-button";
import { Icon } from "@/library/atoms/icon";

<AiButton variant="secondary" size="lg" iconLeading={<Icon name="Sparkles" />}>Enabled</AiButton>
<AiButton variant="secondary" size="lg" iconLeading={<Icon name="Sparkles" />} isDisabled>Disabled</AiButton>`}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <AiButton variant="secondary" size="lg" iconLeading={<Icon name="Sparkles" />}>Enabled</AiButton>
        <AiButton variant="secondary" size="lg" iconLeading={<Icon name="Sparkles" />} isDisabled>Disabled</AiButton>
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Icon Only"
      code={`import { AiButton } from "@/library/atoms/ai-button";
import { Icon } from "@/library/atoms/icon";

<AiButton variant="primary" size="lg" iconOnly iconLeading={<Icon name="Sparkles" />} />
<AiButton variant="secondary" size="md" iconOnly iconLeading={<Icon name="Sparkles" />} />
<AiButton variant="tertiary" size="sm" iconOnly iconLeading={<Icon name="Sparkles" />} />`}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <AiButton variant="primary" size="lg" iconOnly iconLeading={<Icon name="Sparkles" />} />
        <AiButton variant="secondary" size="md" iconOnly iconLeading={<Icon name="Sparkles" />} />
        <AiButton variant="tertiary" size="sm" iconOnly iconLeading={<Icon name="Sparkles" />} />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="With Trailing Icon"
      code={`import { AiButton } from "@/library/atoms/ai-button";
import { Icon } from "@/library/atoms/icon";

<AiButton variant="primary" size="lg" iconLeading={<Icon name="Sparkles" />} iconTrailing={<Icon name="ChevronDown" />}>Generate</AiButton>
<AiButton variant="secondary" size="lg" iconLeading={<Icon name="Sparkles" />} iconTrailing={<Icon name="ChevronDown" />}>Generate</AiButton>`}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <AiButton variant="primary" size="lg" iconLeading={<Icon name="Sparkles" />} iconTrailing={<Icon name="ChevronDown" />}>Generate</AiButton>
        <AiButton variant="secondary" size="lg" iconLeading={<Icon name="Sparkles" />} iconTrailing={<Icon name="ChevronDown" />}>Generate</AiButton>
      </div>
    </PreviewComponent>
  </Section>
);

const ProgressIndicatorPage = () => (
  <Section title="ProgressIndicator" description="A token-based progress indicator with optional value labels in several layouts.">
    <PreviewComponent
      title="Default"
      code={`import { ProgressIndicator } from "@/library/atoms/progress-indicator";

<ProgressIndicator value={35} />
<ProgressIndicator value={65} />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 420 }}>
        <ProgressIndicator value={35} />
        <ProgressIndicator value={65} />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="With Right Label"
      code={`import { ProgressIndicator } from "@/library/atoms/progress-indicator";

<ProgressIndicator value={72} labelPosition="right" />`}
    >
      <div style={{ maxWidth: 420 }}>
        <ProgressIndicator value={72} labelPosition={PROGRESS_INDICATOR_LABEL_POSITIONS.right} />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Bottom and Floating Labels"
      code={`import { ProgressIndicator, PROGRESS_INDICATOR_LABEL_POSITIONS } from "@/library/atoms/progress-indicator";

<ProgressIndicator value={48} labelPosition={PROGRESS_INDICATOR_LABEL_POSITIONS.bottom} />
<ProgressIndicator value={88} labelPosition={PROGRESS_INDICATOR_LABEL_POSITIONS.bottomFloating} />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 420 }}>
        <ProgressIndicator value={48} labelPosition={PROGRESS_INDICATOR_LABEL_POSITIONS.bottom} />
        <ProgressIndicator value={88} labelPosition={PROGRESS_INDICATOR_LABEL_POSITIONS.bottomFloating} />
      </div>
    </PreviewComponent>
  </Section>
);

const RadioButtonPage = () => {
  const [selected, setSelected] = useState("option1");

  return (
    <Section title="RadioButton" description="A reusable radio button with sizes and states.">
      <SubSection title="Basic Usage">
        <RadioGroup name="demo" value={selected} onChange={setSelected}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <RadioButton value="option1">Option 1</RadioButton>
            <RadioButton value="option2">Option 2</RadioButton>
            <RadioButton value="option3">Option 3</RadioButton>
          </div>
        </RadioGroup>
      </SubSection>

      <SubSection title="Sizes">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <RadioGroup name="sizes-sm">
            <div style={{ display: "flex", gap: 16 }}>
              <RadioButton size="sm" value="a">Small A</RadioButton>
              <RadioButton size="sm" value="b">Small B</RadioButton>
            </div>
          </RadioGroup>
          <RadioGroup name="sizes-md">
            <div style={{ display: "flex", gap: 16 }}>
              <RadioButton size="md" value="a">Medium A</RadioButton>
              <RadioButton size="md" value="b">Medium B</RadioButton>
            </div>
          </RadioGroup>
          <RadioGroup name="sizes-lg">
            <div style={{ display: "flex", gap: 16 }}>
              <RadioButton size="lg" value="a">Large A</RadioButton>
              <RadioButton size="lg" value="b">Large B</RadioButton>
            </div>
          </RadioGroup>
        </div>
      </SubSection>

      <SubSection title="Disabled">
        <RadioGroup name="disabled" isDisabled defaultValue="a">
          <div style={{ display: "flex", gap: 16 }}>
            <RadioButton value="a">Disabled Selected</RadioButton>
            <RadioButton value="b">Disabled Unselected</RadioButton>
          </div>
        </RadioGroup>
      </SubSection>
    </Section>
  );
};

// ─────────────────────────────────────────────
// MOLECULE PAGES
// ─────────────────────────────────────────────

const DatePickerPage = () => {
  const [singleDate, setSingleDate] = React.useState(null);
  const [rangeStart, setRangeStart] = React.useState(null);
  const [rangeEnd, setRangeEnd] = React.useState(null);

  return (
    <Section title="DatePicker" description="A calendar-based date picker supporting single date and date range selection.">
      <PreviewComponent
        title="Single Date Picker"
        code={`import { DatePicker } from "@/library/molecules/datepicker";
import { useState } from "react";

const [date, setDate] = useState(null);

<DatePicker value={date} onChange={setDate} />`}
      >
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <DatePicker value={singleDate} onChange={setSingleDate} />
        </div>
        {singleDate && (
          <p style={{ marginTop: 12, fontSize: 14, color: "var(--color-content-secondary)" }}>
            Selected: {singleDate.toLocaleDateString()}
          </p>
        )}
      </PreviewComponent>

      <PreviewComponent
        title="Date Range Picker"
        code={`import { DatePicker } from "@/library/molecules/datepicker";
import { useState } from "react";

const [rangeStart, setRangeStart] = useState(null);
const [rangeEnd, setRangeEnd] = useState(null);

<DatePicker
  range
  rangeStart={rangeStart}
  rangeEnd={rangeEnd}
  onRangeChange={({ start, end }) => { setRangeStart(start); setRangeEnd(end); }}
/>`}
      >
        <DatePicker
          range
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onRangeChange={({ start, end }) => { setRangeStart(start); setRangeEnd(end); }}
        />
        {rangeStart && (
          <p style={{ marginTop: 12, fontSize: 14, color: "var(--color-content-secondary)" }}>
            Range: {rangeStart.toLocaleDateString()} → {rangeEnd ? rangeEnd.toLocaleDateString() : "(select end)"}
          </p>
        )}
      </PreviewComponent>

      <PreviewComponent
        title="Dual Calendar Range Picker"
        code={`<DatePicker range dual />`}
      >
        <DatePicker range dual />
      </PreviewComponent>
    </Section>
  );
};

const RichTextInputPage = () => {
  const [value, setValue] = React.useState("");
  const [editableValue, setEditableValue] = React.useState("Project got endorsed by Deal Flow (11/27/2023) to pursue further.");
  const [lastSubmitted, setLastSubmitted] = React.useState(null);

  return (
    <Section title="RichTextInput" description="An inline rich text editor. Click to focus — toolbar and Save button appear on active state.">

      <PreviewComponent
        title="Interactive — Empty"
        code={`import { RichTextInput } from "@/library/molecules/rich-text-input";
import { useState } from "react";

const [value, setValue] = useState("");

<RichTextInput
  placeholder="Write description..."
  value={value}
  onChange={setValue}
  onSubmit={(v) => console.log("saved:", v)}
/>`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <RichTextInput
            placeholder="Write description..."
            value={value}
            onChange={setValue}
            onSubmit={(v) => setLastSubmitted(v)}
          />
          {lastSubmitted !== null && (
            <span style={{ fontSize: 12, color: "var(--Grey50, #5371AC)" }}>
              Saved: {lastSubmitted}
            </span>
          )}
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Interactive — Pre-filled (click to edit)"
        code={`import { RichTextInputEditable } from "@/library/molecules/rich-text-input";
import { useState } from "react";

const [value, setValue] = useState("Project got endorsed...");

<RichTextInputEditable
  placeholder="Write description..."
  value={value}
  onChange={setValue}
  onSubmit={(html) => console.log("saved:", html)}
/>`}
      >
        <RichTextInputEditable
          placeholder="Write description..."
          value={editableValue}
          onChange={setEditableValue}
          onSubmit={(html) => setLastSubmitted(html)}
        />
      </PreviewComponent>

      <PreviewComponent
        title="Disabled"
        code={`<RichTextInput disabled placeholder="Write description..." />`}
      >
        <RichTextInput disabled placeholder="Write description..." />
      </PreviewComponent>

      <PreviewComponent
        title="With helper text"
        code={`<RichTextInput helperText="Maximum 500 characters" placeholder="Write description..." />`}
      >
        <RichTextInput
          helperText="Maximum 500 characters"
          placeholder="Write description..."
          value={value}
          onChange={setValue}
        />
      </PreviewComponent>
    </Section>
  );
};

const RichTextEditToolbarsPage = () => {
  const [activeFormats, setActiveFormats] = useState({});

  const handleToolbarAction = (format) => {
    setActiveFormats((prev) => ({
      ...prev,
      [format]: !prev[format],
    }));
  };

  return (
    <Section
      title="RichTextEditToolbars"
      description="Formatting toolbar molecule used by RichTextInput with all editing actions."
    >
      <PreviewComponent
        title="All Toolbar Actions"
        code={`import { useState } from "react";
import { RichTextEditToolbars } from "@/library/molecules/rich-text-edit-toolbars";

const [activeFormats, setActiveFormats] = useState({});

<RichTextEditToolbars
  activeFormats={activeFormats}
  rightActions={<Button variant="tertiary" size="md" iconLeading={<ChatBubbleLeftRightIcon />}>Comments</Button>}
  onAction={(format) =>
    setActiveFormats((prev) => ({
      ...prev,
      [format]: !prev[format],
    }))
  }
/>
`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <RichTextEditToolbars
            activeFormats={activeFormats}
            rightActions={<Button variant="tertiary" size="md" iconLeading={<ChatBubbleLeftRightIcon />}>Comments</Button>}
            onAction={handleToolbarAction}
          />
          <p style={{ margin: 0, fontSize: 13, color: "var(--color-content-secondary)" }}>
            Click buttons to toggle active state for preview.
          </p>
        </div>
      </PreviewComponent>
    </Section>
  );
};

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Section title="Search" description="A pill-shaped search input with icon.">
      <PreviewComponent
        title="All Search Sizes"
        code={`import { Search } from "@/library/molecules/search";

<Search size="sm" placeholder="Small search..." />
<Search size="md" placeholder="Medium search..." />
<Search size="lg" placeholder="Large search..." />`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
          <Search size="sm" placeholder="Small search..." />
          <Search size="md" placeholder="Medium search..." />
          <Search size="lg" placeholder="Large search..." />
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Search States"
        code={`import { Search } from "@/library/molecules/search";

<Search placeholder="Enabled" visualState="enabled" />
<Search placeholder="Hover" visualState="hover" />
<Search placeholder="Active" visualState="active" />
<Search placeholder="Filled" defaultValue="React components" visualState="filled" />
<Search placeholder="Disabled" visualState="disabled" />`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
          <Search placeholder="Enabled" visualState="enabled" />
          <Search placeholder="Hover" visualState="hover" />
          <Search placeholder="Active" visualState="active" />
          <Search placeholder="Filled" defaultValue="React components" visualState="filled" />
          <Search placeholder="Disabled" visualState="disabled" />
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Controlled Input"
        code={`import { Search } from "@/library/molecules/search";

const [searchValue, setSearchValue] = useState("");

<Search
  placeholder="Type to search..."
  value={searchValue}
  onChange={setSearchValue}
  onSubmit={(value) => alert(\`Searching for: \${value}\`)}
/>
`}
      >
        <div style={{ maxWidth: 400 }}>
          <Search
            placeholder="Type to search..."
            value={searchValue}
            onChange={setSearchValue}
            onSubmit={(value) => alert(`Searching for: ${value}`)}
          />
          <p style={{ marginTop: 12, color: "var(--color-content-secondary)", fontSize: 14 }}>
            Current value: "{searchValue}"
          </p>
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Collapsed Mode"
        code={`import { Search } from "@/library/molecules/search";

<Search collapsed />
<Search collapsed size="lg" />`}
      >
        <div style={{ display: "flex", gap: 16 }}>
          <Search collapsed />
          <Search collapsed size="lg" />
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Without Clear Button"
        code={`import { Search } from "@/library/molecules/search";

<Search placeholder="No clear button" defaultValue="Some text" showClear={false} />`}
      >
        <div style={{ maxWidth: 400 }}>
          <Search placeholder="No clear button" defaultValue="Some text" showClear={false} />
        </div>
      </PreviewComponent>
    </Section>
  );
};

const TabsPage = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <Section title="Tabs" description="A tab navigation component with optional badges and icons.">
      <PreviewComponent
        title="Basic Tabs"
        code={`import { Tabs, Tab } from "@/library/molecules/tabs";

const [activeTab, setActiveTab] = useState("tab1");

<Tabs selectedKey={activeTab} onSelectionChange={setActiveTab}>
  <Tab id="tab1">Overview</Tab>
  <Tab id="tab2">Details</Tab>
  <Tab id="tab3">Settings</Tab>
</Tabs>`}
      >
        <div>
          <Tabs selectedKey={activeTab} onSelectionChange={setActiveTab}>
            <Tab id="tab1">Overview</Tab>
            <Tab id="tab2">Details</Tab>
            <Tab id="tab3">Settings</Tab>
          </Tabs>
          <div style={{ padding: "24px 0" }}>
            {activeTab === "tab1" && <p>Overview content goes here.</p>}
            {activeTab === "tab2" && <p>Details content goes here.</p>}
            {activeTab === "tab3" && <p>Settings content goes here.</p>}
          </div>
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Tabs With Badges"
        code={`import { Tabs, Tab } from "@/library/molecules/tabs";

<Tabs defaultSelectedKey="messages">
  <Tab id="messages" badge={12}>Messages</Tab>
  <Tab id="notifications" badge={3}>Notifications</Tab>
  <Tab id="updates">Updates</Tab>
</Tabs>`}
      >
        <Tabs defaultSelectedKey="messages">
          <Tab id="messages" badge={12}>Messages</Tab>
          <Tab id="notifications" badge={3}>Notifications</Tab>
          <Tab id="updates">Updates</Tab>
        </Tabs>
      </PreviewComponent>

      <PreviewComponent
        title="Tabs With Icons"
        code={`import { Tabs, Tab } from "@/library/molecules/tabs";
import { Icon } from "@/library/atoms/icon";

<Tabs defaultSelectedKey="home">
  <Tab id="home" icon={<Icon name="Home" size="sm" />}>Home</Tab>
  <Tab id="profile" icon={<Icon name="User" size="sm" />}>Profile</Tab>
  <Tab id="settings" icon={<Icon name="Cog6Tooth" size="sm" />}>Settings</Tab>
</Tabs>`}
      >
        <Tabs defaultSelectedKey="home">
          <Tab id="home" icon={<Icon name="Home" size="sm" />}>Home</Tab>
          <Tab id="profile" icon={<Icon name="User" size="sm" />}>Profile</Tab>
          <Tab id="settings" icon={<Icon name="Cog6Tooth" size="sm" />}>Settings</Tab>
        </Tabs>
      </PreviewComponent>
    </Section>
  );
};

const AccordionPage = () => (
  <Section title="Accordion" description="An expandable/collapsible content container.">
    <PreviewComponent
      title="All Accordion Sizes"
      code={`import { Accordion } from "@/library/molecules/accordion";

<Accordion title="Small Size" size="sm">
  <p>Small accordion content</p>
</Accordion>
<Accordion title="Medium Size" size="md">
  <p>Medium accordion content</p>
</Accordion>
<Accordion title="Large Size" size="lg">
  <p>Large accordion content</p>
</Accordion>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Accordion title="Small Size" size="sm">
          <p>Small accordion content</p>
        </Accordion>
        <Accordion title="Medium Size" size="md">
          <p>Medium accordion content</p>
        </Accordion>
        <Accordion title="Large Size" size="lg">
          <p>Large accordion content</p>
        </Accordion>
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Single Accordion"
      code={`import { Accordion } from "@/library/molecules/accordion";

<Accordion title="Click to expand" defaultExpanded>
  <p>This is the accordion content. It can contain any React elements.</p>
</Accordion>`}
    >
      <Accordion title="Click to expand" defaultExpanded>
        <p>This is the accordion content. It can contain any React elements.</p>
      </Accordion>
    </PreviewComponent>

    <PreviewComponent
      title="Accordion Group"
      code={`import { AccordionGroup, AccordionItem } from "@/library/molecules/accordion";

<AccordionGroup defaultExpanded="item1">
  <AccordionItem id="item1" title="Section 1">
    <p>Content for section 1</p>
  </AccordionItem>
  <AccordionItem id="item2" title="Section 2">
    <p>Content for section 2</p>
  </AccordionItem>
  <AccordionItem id="item3" title="Section 3">
    <p>Content for section 3</p>
  </AccordionItem>
</AccordionGroup>`}
    >
      <AccordionGroup defaultExpanded="item1">
        <AccordionItem id="item1" title="Section 1">
          <p>Content for section 1</p>
        </AccordionItem>
        <AccordionItem id="item2" title="Section 2">
          <p>Content for section 2</p>
        </AccordionItem>
        <AccordionItem id="item3" title="Section 3">
          <p>Content for section 3</p>
        </AccordionItem>
      </AccordionGroup>
    </PreviewComponent>

    <PreviewComponent
      title="Horizontal Variant"
      code={`import { Accordion } from "@/library/molecules/accordion";
import { Chip } from "@/library/atoms/chip";
import { Button } from "@/library/atoms/button";
import { Icon } from "@/library/atoms/icon";

<Accordion
  title="Horizontal variant"
  variant="horizontal"
  showChevron
  leftBadgeLabel="2/3"
  leftChip={<Chip variant="neutral">Draft</Chip>}
  leftChipSecondary={<Chip variant="blue">Legal</Chip>}
  action={
    <Button size="sm" variant="secondary" iconLeading={<Icon name="PencilSquare" size="sm" />}>
      Edit
    </Button>
  }
  rightChip={<Chip variant="warning">High risk</Chip>}
/>
`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Accordion title="Vertical default" defaultExpanded>
          <p>This accordion expands to show the inner container.</p>
        </Accordion>
        <Accordion
          title="Horizontal variant"
          variant="horizontal"
          showChevron
          leftBadgeLabel="2/3"
          leftChip={<Chip variant="neutral">Draft</Chip>}
          leftChipSecondary={<Chip variant="blue">Legal</Chip>}
          action={
            <Button size="sm" variant="secondary" iconLeading={<Icon name="PencilSquare" size="sm" />}>
              Edit
            </Button>
          }
          rightChip={<Chip variant="warning">High risk</Chip>}
        />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="With Icon and Action"
      code={`import { Accordion } from "@/library/molecules/accordion";

<Accordion
  title="Settings"
  iconName="Cog6Tooth"
  actionLabel="Edit"
  onActionClick={() => alert("Edit clicked")}
>
  <p>Accordion with icon and action button.</p>
</Accordion>`}
    >
      <Accordion
        title="Settings"
        iconName="Cog6Tooth"
        actionLabel="Edit"
        onActionClick={() => alert("Edit clicked")}
      >
        <p>Accordion with icon and action button.</p>
      </Accordion>
    </PreviewComponent>

    <PreviewComponent
      title="With Checkbox, Badge, and Node Button"
      code={`import { Accordion } from "@/library/molecules/accordion";
import { Button } from "@/library/atoms/button";
import { Icon } from "@/library/atoms/icon";

<Accordion
  title="Workflow"
  showCheckbox
  checkboxProps={{ defaultSelected: true, onChange: (checked) => console.log("checkbox", checked) }}
  badgeLabel="Draft"
  showBadge
  nodeButton={
    <Button
      variant="secondary"
      size="sm"
      iconLeading={<Icon name="EllipsisHorizontal" size="sm" />}
      onClick={() => alert("Node action")}
    />
  }
>
  <p>Accordion with all optional title-area controls.</p>
</Accordion>

<Accordion title="No badge example" badgeLabel="Hidden" showBadge={false}>
  <p>Badge can be turned off with showBadge.</p>
</Accordion>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Accordion
          title="Workflow"
          showCheckbox
          checkboxProps={{ defaultSelected: true, onChange: (checked) => console.log("checkbox", checked) }}
          badgeLabel="Draft"
          showBadge
          nodeButton={(
            <Button
              variant="secondary"
              size="sm"
              iconLeading={<Icon name="EllipsisHorizontal" size="sm" />}
              onClick={() => alert("Node action")}
            />
          )}
        >
          <p>Accordion with all optional title-area controls.</p>
        </Accordion>

        <Accordion title="No badge example" badgeLabel="Hidden" showBadge={false}>
          <p>Badge can be turned off with showBadge.</p>
        </Accordion>
      </div>
    </PreviewComponent>
  </Section>
);

const TextInputPage = () => (
  <Section
    title="TextInput"
    description="A complete text input with label, input field, and helper/error text."
    topBlock={
      <ImportBlock
        title="TextInput"
        label="Import"
        importStatement={`import { TextInput } from "@/library/molecules/text-input";`}
      />
    }
  >
    <PreviewComponent
      title="Dropdown Trigger"
      code={`import { TextInput } from "@/library/molecules/text-input";

    <TextInput
  label="Choose condition"
  placeholder="Click to select"
  menuSections={[
    {
      title: "Neurology",
      items: [
        { value: "ad", label: "Alzheimer's disease" },
        { value: "pd", label: "Parkinson's disease" },
      ],
    },
    {
      title: "Oncology",
      collapsible: true,
      defaultExpanded: false,
      items: [
        { value: "bc", label: "Breast cancer" },
        { value: "lc", label: "Lung cancer" },
      ],
    },
  ]}
/>
`}
    >
      <div style={{ maxWidth: 400 }}>
        <TextInput
          label="Choose condition"
          placeholder="Click to select"
          menuSections={[
            {
              title: "Neurology",
              items: [
                { value: "ad", label: "Alzheimer's disease" },
                { value: "pd", label: "Parkinson's disease" },
              ],
            },
            {
              title: "Oncology",
              collapsible: true,
              defaultExpanded: false,
              items: [
                { value: "bc", label: "Breast cancer" },
                { value: "lc", label: "Lung cancer" },
              ],
            },
          ]}
        />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Sizes"
      code={`import { TextInput } from "@/library/molecules/text-input";

<TextInput size="sm" label="Small" placeholder="Small input..." />
<TextInput size="md" label="Medium (default)" placeholder="Medium input..." />
<TextInput size="lg" label="Large" placeholder="Large input..." />`}
    >
      <div style={DEMO_ROW_ALIGN_END_STYLE}>
        <div style={{ flex: 1, minWidth: 160 }}>
          <TextInput size="sm" label="Small" placeholder="Small input..." />
        </div>
        <div style={{ flex: 1, minWidth: 160 }}>
          <TextInput size="md" label="Medium (default)" placeholder="Medium input..." />
        </div>
        <div style={{ flex: 1, minWidth: 160 }}>
          <TextInput size="lg" label="Large" placeholder="Large input..." />
        </div>
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="All TextInput States"
      code={`import { TextInput } from "@/library/molecules/text-input";

<TextInput label="Default" placeholder="Enter text..." />
<TextInput label="With Helper" placeholder="Enter text..." helper="This is helper text" />
<TextInput label="Error State" placeholder="Enter text..." error="This field is required" />
<TextInput label="Success State" placeholder="Enter text..." success="Looks good!" />
<TextInput label="Disabled" placeholder="Enter text..." isDisabled />
<TextInput label="Read Only" value="Read only value" isReadOnly />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 400 }}>
        <TextInput label="Default" placeholder="Enter text..." />
        <TextInput label="With Helper" placeholder="Enter text..." helper="This is helper text" />
        <TextInput label="Error State" placeholder="Enter text..." error="This field is required" />
        <TextInput label="Success State" placeholder="Enter text..." success="Looks good!" />
        <TextInput label="Disabled" placeholder="Enter text..." isDisabled />
        <TextInput label="Read Only" value="Read only value" isReadOnly />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Input Types"
      code={`import { TextInput } from "@/library/molecules/text-input";

<TextInput label="Text" type="text" placeholder="Plain text" />
<TextInput label="Email" type="email" placeholder="email@example.com" />
<TextInput label="Password" type="password" placeholder="Enter password" />
<TextInput label="Number" type="number" placeholder="0" />
`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 400 }}>
        <TextInput label="Text" type="text" placeholder="Plain text" />
        <TextInput label="Email" type="email" placeholder="email@example.com" />
        <TextInput label="Password" type="password" placeholder="Enter password" />
        <TextInput label="Number" type="number" placeholder="0" />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Required Field"
      code={`import { TextInput } from "@/library/molecules/text-input";

<TextInput label="Email" type="email" placeholder="you@example.com" isRequired />`}
    >
      <div style={{ maxWidth: 400 }}>
        <TextInput label="Email" type="email" placeholder="you@example.com" isRequired />
      </div>
    </PreviewComponent>
  </Section>
);

const DropdownMenuItemPage = () => (
  <Section title="DropdownMenuItem" description="A menu item for dropdown menus with icons, badges, and various states.">
    <PreviewComponent
      title="DropdownMenuItem Sizes"
      code={`import { DropdownMenuItem } from "@/library/molecules/dropdown-menu-item";

<DropdownMenuItem label="Small Item" iconName="Home" size="sm" />
<DropdownMenuItem label="Medium Item" iconName="Home" size="md" />`}
    >
      <div style={{ display: "flex", gap: 24 }}>
        <div style={{ width: 200 }}>
          <p style={{ fontSize: 12, color: "var(--color-content-secondary)", marginBottom: 8 }}>Small</p>
          <DropdownMenuItem label="Small Item" iconName="Home" size="sm" />
          <DropdownMenuItem label="Another Item" iconName="User" size="sm" />
        </div>
        <div style={{ width: 200 }}>
          <p style={{ fontSize: 12, color: "var(--color-content-secondary)", marginBottom: 8 }}>Medium</p>
          <DropdownMenuItem label="Medium Item" iconName="Home" size="md" />
          <DropdownMenuItem label="Another Item" iconName="User" size="md" />
        </div>
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Default Variant"
      code={`import { DropdownMenuItem } from "@/library/molecules/dropdown-menu-item";

<DropdownMenuItem label="Profile" iconName="User" />
<DropdownMenuItem label="Settings" iconName="Cog6Tooth" />
<DropdownMenuItem label="Help" iconName="QuestionMarkCircle" shortcut="?" />
<DropdownMenuItem label="Notifications" iconName="Bell" badge="3" />`}
    >
      <div style={{ width: 280, display: "flex", flexDirection: "column" }}>
        <DropdownMenuItem label="Profile" iconName="User" />
        <DropdownMenuItem label="Settings" iconName="Cog6Tooth" />
        <DropdownMenuItem label="Help" iconName="QuestionMarkCircle" shortcut="?" />
        <DropdownMenuItem label="Notifications" iconName="Bell" badge="3" />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="States"
      code={`import { DropdownMenuItem } from "@/library/molecules/dropdown-menu-item";

<DropdownMenuItem label="Default" iconName="Home" />
<DropdownMenuItem label="Active" iconName="Star" active />
<DropdownMenuItem label="Disabled" iconName="LockClosed" isDisabled />`}
    >
      <div style={{ width: 280, display: "flex", flexDirection: "column" }}>
        <DropdownMenuItem label="Default" iconName="Home" />
        <DropdownMenuItem label="Active" iconName="Star" active />
        <DropdownMenuItem label="Disabled" iconName="LockClosed" isDisabled />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Destructive Variant"
      code={`import { DropdownMenuItem } from "@/library/molecules/dropdown-menu-item";

<DropdownMenuItem label="Delete" iconName="Trash" variant="destructive" />
<DropdownMenuItem label="Remove" iconName="XMark" variant="destructive" />
<DropdownMenuItem label="Disabled Delete" iconName="Trash" variant="destructive" isDisabled />`}
    >
      <div style={{ width: 280, display: "flex", flexDirection: "column" }}>
        <DropdownMenuItem label="Delete" iconName="Trash" variant="destructive" />
        <DropdownMenuItem label="Remove" iconName="XMark" variant="destructive" />
        <DropdownMenuItem label="Disabled Delete" iconName="Trash" variant="destructive" isDisabled />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="With Description"
      code={`import { DropdownMenuItem } from "@/library/molecules/dropdown-menu-item";

<DropdownMenuItem
  label="Edit Profile"
  iconName="PencilSquare"
  description="Change your name and avatar"
/>
<DropdownMenuItem
  label="Privacy Settings"
  iconName="ShieldCheck"
  description="Manage your privacy preferences"
/>`}
    >
      <div style={{ width: 320, display: "flex", flexDirection: "column" }}>
        <DropdownMenuItem
          label="Edit Profile"
          iconName="PencilSquare"
          description="Change your name and avatar"
        />
        <DropdownMenuItem
          label="Privacy Settings"
          iconName="ShieldCheck"
          description="Manage your privacy preferences"
        />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="With Trailing Icon (Submenu)"
      code={`import { DropdownMenuItem } from "@/library/molecules/dropdown-menu-item";

<DropdownMenuItem
  label="More Options"
  iconName="EllipsisHorizontal"
  trailingIconName="ChevronRight"
/>
<DropdownMenuItem
  label="Share"
  iconName="Share"
  trailingIconName="ChevronRight"
/>`}
    >
      <div style={{ width: 280, display: "flex", flexDirection: "column" }}>
        <DropdownMenuItem
          label="More Options"
          iconName="EllipsisHorizontal"
          trailingIconName="ChevronRight"
        />
        <DropdownMenuItem
          label="Share"
          iconName="Share"
          trailingIconName="ChevronRight"
        />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Dividers and Labels"
      code={`import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuDivider } from "@/library/molecules/dropdown-menu-item";

<DropdownMenuLabel>Account</DropdownMenuLabel>
<DropdownMenuItem label="Profile" iconName="User" />
<DropdownMenuItem label="Settings" iconName="Cog6Tooth" />
<DropdownMenuDivider />
<DropdownMenuLabel>Actions</DropdownMenuLabel>
<DropdownMenuItem label="Sign Out" iconName="ArrowRightOnRectangle" />`}
    >
      <div style={{ width: 280, display: "flex", flexDirection: "column" }}>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuItem label="Profile" iconName="User" />
        <DropdownMenuItem label="Settings" iconName="Cog6Tooth" />
        <DropdownMenuDivider />
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem label="Sign Out" iconName="ArrowRightOnRectangle" />
      </div>
    </PreviewComponent>
  </Section>
);

const StagePage = () => (
  <Section title="Stage" description="A staged progress component showing multiple steps with status indicators.">
    <PreviewComponent
      title="Basic Stages"
      code={`import { Stepper } from "@/library/molecules/stepper";

<Stepper
  currentStep={1}
  steps={[
    { title: "Draft", subtitle: "Jan 1, 2024" },
    { title: "Review", subtitle: "Jan 15, 2024" },
    { title: "Approved" },
    { title: "Published" },
  ]}
/>`}
    >
      <Stepper
        currentStep={1}
        steps={[
          { title: "Draft", subtitle: "Jan 1, 2024" },
          { title: "Review", subtitle: "Jan 15, 2024" },
          { title: "Approved" },
          { title: "Published" },
        ]}
      />
    </PreviewComponent>

    <PreviewComponent
      title="Without Background"
      code={`import { Stepper } from "@/library/molecules/stepper";

<Stepper
  showBackground={false}
  currentStep={2}
  steps={[
    { title: "Cart" },
    { title: "Shipping" },
    { title: "Payment" },
    { title: "Confirm" },
  ]}
/>`}
    >
      <Stepper
        showBackground={false}
        currentStep={2}
        steps={[
          { title: "Cart" },
          { title: "Shipping" },
          { title: "Payment" },
          { title: "Confirm" },
        ]}
      />
    </PreviewComponent>
  </Section>
);

const StepperInteractive = () => {
  const [total, setTotal] = React.useState(4);
  const [current, setCurrent] = React.useState(1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Stepper variant="progress" totalSteps={total} currentStep={current} />
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Button size="sm" variant="secondary" onPress={() => setCurrent((c) => Math.max(0, c - 1))}>Prev</Button>
        <Button size="sm" variant="secondary" onPress={() => setCurrent((c) => Math.min(total - 1, c + 1))}>Next</Button>
        <span style={{ fontSize: 12, color: "var(--color-content-secondary)" }}>Step {current + 1}/{total}</span>
        <Button size="sm" variant="secondary" onPress={() => { setTotal((t) => t + 1); }}>+ Step</Button>
        <Button size="sm" variant="secondary" onPress={() => { setTotal((t) => { const next = Math.max(1, t - 1); setCurrent((c) => Math.min(c, next - 1)); return next; }); }}>− Step</Button>
      </div>
    </div>
  );
};

const StepperPage = () => (
  <Section title="Stepper" description="A compact step progress indicator with a segmented progress bar and step label. Pass totalSteps and currentStep to control it.">
    <PreviewComponent
      title="Interactive Stepper"
      code={`import { Stepper } from "@/library/molecules/stepper";

// Simplest usage — just pass totalSteps and currentStep
<Stepper variant="progress" totalSteps={4} currentStep={1} />`}
    >
      <StepperInteractive />
    </PreviewComponent>

    <PreviewComponent
      title="Step 1 of 3"
      code={`<Stepper variant="progress" totalSteps={3} currentStep={0} />`}
    >
      <Stepper variant="progress" totalSteps={3} currentStep={0} />
    </PreviewComponent>

    <PreviewComponent
      title="Step 2 of 3"
      code={`<Stepper variant="progress" totalSteps={3} currentStep={1} />`}
    >
      <Stepper variant="progress" totalSteps={3} currentStep={1} />
    </PreviewComponent>

    <PreviewComponent
      title="Step 3 of 3"
      code={`<Stepper variant="progress" totalSteps={3} currentStep={2} />`}
    >
      <Stepper variant="progress" totalSteps={3} currentStep={2} />
    </PreviewComponent>
  </Section>
);

const CommentPopoverPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([
    {
      id: "comment-1",
      author: "Linh Nguyen",
      initials: "LN",
      timestamp: "6 days ago",
      content: "Can we add this mini infobox please Shreejala Tuladhar",
    },
    {
      id: "comment-2",
      author: "Shreejala Tuladhar",
      initials: "ST",
      timestamp: "5 hours ago",
      content: "Pragya Gyawali",
    },
  ]);

  return (
    <Section title="CommentPopover" description="An anchored threaded comment popover with reply support.">
      <PreviewComponent
        title="Comment Thread"
        code={`import { useState } from "react";
import { Button } from "@/library/atoms/button";
import { CommentPopover } from "@/library/molecules/comment-popover";

const [open, setOpen] = useState(false);
const [comments, setComments] = useState([
  { id: "comment-1", author: "Linh Nguyen", initials: "LN", timestamp: "6 days ago", content: "Can we add this mini infobox please Shreejala Tuladhar" },
]);

<Button variant="secondary" size="md" onClick={() => setOpen(true)}>
  Open comments
</Button>
<CommentPopover
  open={open}
  onClose={() => setOpen(false)}
  comments={comments}
  onSubmit={(content) => setComments((items) => [
    ...items,
    { id: crypto.randomUUID(), author: "Linh Nguyen", initials: "LN", timestamp: "Now", content },
  ])}
/>`}
      >
        <div style={{ position: "relative", display: "inline-flex" }}>
          <Button variant="secondary" size="md" onClick={() => setIsOpen(true)}>
            Open comments
          </Button>
          <CommentPopover
            open={isOpen}
            onClose={() => setIsOpen(false)}
            comments={comments}
            onSubmit={(content) => {
              setComments((items) => [
                ...items,
                {
                  id: crypto.randomUUID(),
                  author: "Linh Nguyen",
                  initials: "LN",
                  timestamp: "Now",
                  content,
                },
              ]);
            }}
          />
        </div>
      </PreviewComponent>
    </Section>
  );
};

const TextareaPage = () => {
  const aiGeneratedValue = "Prioritize the clauses that impact commercial milestones and governance rights.";
  const [aiTextareaValue, setAiTextareaValue] = useState(aiGeneratedValue);

  return (
  <Section title="Textarea" description="A complete textarea with label, textarea field, and helper/error text.">
    <PreviewComponent
      title="All Textarea States"
      code={`import { Textarea } from "@/library/molecules/textarea";

<Textarea label="Default" placeholder="Enter your message..." />
<Textarea label="With Helper" placeholder="Enter your message..." helper="Max 500 characters" />
<Textarea label="Error State" placeholder="Enter your message..." error="This field is required" />
<Textarea label="Success State" placeholder="Enter your message..." success="Message saved!" />
<Textarea label="Disabled" placeholder="Enter your message..." isDisabled />
<Textarea label="Read Only" value="This is read-only content" isReadOnly />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 400 }}>
        <Textarea label="Default" placeholder="Enter your message..." />
        <Textarea label="With Helper" placeholder="Enter your message..." helper="Max 500 characters" />
        <Textarea label="Error State" placeholder="Enter your message..." error="This field is required" />
        <Textarea label="Success State" placeholder="Enter your message..." success="Message saved!" />
        <Textarea label="Disabled" placeholder="Enter your message..." isDisabled />
        <Textarea label="Read Only" value="This is read-only content" isReadOnly />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="AI Content"
      code={`import { useState } from "react";
import { Textarea } from "@/library/molecules/textarea";

const aiGeneratedValue = "Prioritize the clauses that impact commercial milestones and governance rights.";
const originalValue = "Prioritize clauses that impact commercial milestones.";
const [value, setValue] = useState(aiGeneratedValue);

<Textarea
  label="Review instructions"
  variant="ai"
  aiValue={aiGeneratedValue}
  originalValue={originalValue}
  showRedlinePreview
  value={value}
  onChange={(event) => setValue(event.target.value)}
  onRevert={setValue}
/>`}
    >
      <div style={{ maxWidth: 400 }}>
        <Textarea
          label="Review instructions"
          variant="ai"
          aiValue={aiGeneratedValue}
          originalValue="Prioritize clauses that impact commercial milestones."
          showRedlinePreview
          value={aiTextareaValue}
          onChange={(event) => setAiTextareaValue(event.target.value)}
          onRevert={setAiTextareaValue}
        />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Required Field"
      code={`import { Textarea } from "@/library/molecules/textarea";

<Textarea label="Description" placeholder="Enter description..." isRequired rows={4} />`}
    >
      <div style={{ maxWidth: 400 }}>
        <Textarea label="Description" placeholder="Enter description..." isRequired rows={4} />
      </div>
    </PreviewComponent>
  </Section>
  );
};

const expandableTextLongCopy = `The legal team completed an initial review of the target contracts and highlighted several obligations that may impact post-close operations. While most clauses follow expected market standards, a small set of renewal and assignment terms require escalation before final approval.\n\nIn parallel, the diligence workstream is validating whether notification timelines are aligned across jurisdictions. Any mismatch between governing law and termination windows can increase execution risk, especially for cross-border entities with staggered milestones.\n\nThe integration planning track also noted dependencies across data retention, audit readiness, and third-party consent handling. These dependencies can affect sequencing and should be resolved before launch readiness checks begin.\n\nThis summary is intentionally long to demonstrate the 8-line overflow behavior. Use Show more to expand and Show less to collapse while preserving the same typography and spacing tokens.`;

const ExpandableTextPage = () => (
  <Section title="ExpandableText" description="A text block that truncates after 8 lines and reveals full content via Show more / Show less.">
    <PreviewComponent
      title="MD Variant"
      code={`import { ExpandableText } from "@/library/molecules/expandable-text";

<ExpandableText
  variant="md"
  content="Long content here..."
  showMoreLabel="Show more"
  showLessLabel="Show less"
/>`}
    >
      <div style={{ maxWidth: 460 }}>
        <ExpandableText variant="md" content={expandableTextLongCopy} />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="LG Variant"
      code={`import { ExpandableText } from "@/library/molecules/expandable-text";

<ExpandableText
  variant="lg"
  content="Long content here..."
  showMoreLabel="Show more"
  showLessLabel="Show less"
/>`}
    >
      <div style={{ maxWidth: 460 }}>
        <ExpandableText variant="lg" content={expandableTextLongCopy} />
      </div>
    </PreviewComponent>
  </Section>
);

const RadioCardPage = () => {
  const [selected, setSelected] = useState("basic");

  return (
    <Section title="RadioCard" description="A selectable card with a radio button, label, and optional info items.">
      <PreviewComponent
        title="Basic RadioCard"
        code={`import { RadioCard, RadioCardGroup } from "@/library/molecules/radio-card";

const [selected, setSelected] = useState("basic");

<RadioCardGroup value={selected} onChange={setSelected}>
  <RadioCard value="basic" label="Basic Plan" info="$9/month,5 users,10GB storage" />
  <RadioCard value="pro" label="Pro Plan" info="$29/month,25 users,100GB storage" />
  <RadioCard value="enterprise" label="Enterprise Plan" info="Custom pricing,Unlimited users,Unlimited storage" />
</RadioCardGroup>`}
      >
        <RadioCardGroup value={selected} onChange={setSelected}>
          <RadioCard value="basic" label="Basic Plan" info="$9/month,5 users,10GB storage" />
          <RadioCard value="pro" label="Pro Plan" info="$29/month,25 users,100GB storage" />
          <RadioCard value="enterprise" label="Enterprise Plan" info="Custom pricing,Unlimited users,Unlimited storage" />
        </RadioCardGroup>
      </PreviewComponent>

      <PreviewComponent
        title="With Icons"
        code={`import { RadioCard, RadioCardGroup } from "@/library/molecules/radio-card";
import { Icon } from "@/library/atoms/icon";

<RadioCardGroup value={selected} onChange={setSelected}>
  <RadioCard value="basic" label="Credit Card" icon={<Icon name="CreditCard" size="md" />} info="Visa, Mastercard, Amex" />
  <RadioCard value="pro" label="PayPal" icon={<Icon name="Wallet" size="md" />} info="Pay with your PayPal account" />
</RadioCardGroup>`}
      >
        <RadioCardGroup value={selected} onChange={setSelected}>
          <RadioCard value="basic" label="Credit Card" icon={<Icon name="CreditCard" size="md" />} info="Visa, Mastercard, Amex" />
          <RadioCard value="pro" label="PayPal" icon={<Icon name="Wallet" size="md" />} info="Pay with your PayPal account" />
        </RadioCardGroup>
      </PreviewComponent>

      <PreviewComponent
        title="Disabled State"
        code={`import { RadioCard, RadioCardGroup } from "@/library/molecules/radio-card";

<RadioCardGroup value="basic">
  <RadioCard value="basic" label="Available Option" info="This option is available" />
  <RadioCard value="pro" label="Unavailable Option" info="This option is not available" isDisabled />
</RadioCardGroup>`}
      >
        <RadioCardGroup value="basic">
          <RadioCard value="basic" label="Available Option" info="This option is available" />
          <RadioCard value="pro" label="Unavailable Option" info="This option is not available" isDisabled />
        </RadioCardGroup>
      </PreviewComponent>
    </Section>
  );
};

const PaginationPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  return (
    <Section title="Pagination" description="A pagination control with page numbers, navigation buttons, and per-page selector.">
      <PreviewComponent
        title="Full Pagination"
        code={`import { Pagination } from "@/library/molecules/pagination";

const [page, setPage] = useState(1);
const [perPage, setPerPage] = useState(10);

<Pagination
  currentPage={page}
  totalPages={10}
  perPage={perPage}
  onPageChange={setPage}
  onPerPageChange={setPerPage}
  showPerPage
  showInfo
  totalItems={100}
/>`}
      >
        <div>
          <Pagination
            currentPage={page}
            totalPages={10}
            perPage={perPage}
            onPageChange={setPage}
            onPerPageChange={setPerPage}
            showPerPage
            showInfo
            totalItems={100}
          />
          <p style={{ marginTop: 16, color: "var(--color-content-secondary)", fontSize: 14 }}>
            Current page: {page}, Per page: {perPage}
          </p>
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Simple Pagination"
        code={`import { SimplePagination } from "@/library/molecules/pagination";

<SimplePagination
  currentPage={page}
  totalPages={10}
  onPageChange={setPage}
/>`}
      >
        <SimplePagination
          currentPage={page}
          totalPages={10}
          onPageChange={setPage}
        />
      </PreviewComponent>

      <PreviewComponent
        title="With First/Last Buttons"
        code={`import { Pagination } from "@/library/molecules/pagination";

<Pagination
  currentPage={page}
  totalPages={20}
  onPageChange={setPage}
  showFirstLast
  showPerPage={false}
/>`}
      >
        <Pagination
          currentPage={page}
          totalPages={20}
          onPageChange={setPage}
          showFirstLast
          showPerPage={false}
        />
      </PreviewComponent>
    </Section>
  );
};

const InfoboxPage = () => (
  <Section title="Infobox" description="A contextual message box with variants for success, warning, error, info, and neutral states.">
    <PreviewComponent
      title="All Infobox Variants"
      code={`import { Infobox } from "@/library/molecules/infobox";

<Infobox variant="info" title="Information" description="This is an informational message." />
<Infobox variant="success" title="Success" description="Your changes have been saved successfully." />
<Infobox variant="warning" title="Warning" description="Please review your changes before proceeding." />
<Infobox variant="error" title="Error" description="An error occurred while processing your request." />
<Infobox variant="neutral" title="Note" description="This is a neutral informational message." />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Infobox variant="info" title="Information" description="This is an informational message." />
        <Infobox variant="success" title="Success" description="Your changes have been saved successfully." />
        <Infobox variant="warning" title="Warning" description="Please review your changes before proceeding." />
        <Infobox variant="error" title="Error" description="An error occurred while processing your request." />
        <Infobox variant="neutral" title="Note" description="This is a neutral informational message." />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="With Action"
      code={`import { Infobox } from "@/library/molecules/infobox";

<Infobox
  variant="warning"
  title="Unsaved Changes"
  description="You have unsaved changes that will be lost."
  actionLabel="Save Now"
  onAction={() => alert("Save clicked")}
/>`}
    >
      <Infobox
        variant="warning"
        title="Unsaved Changes"
        description="You have unsaved changes that will be lost."
        actionLabel="Save Now"
        onAction={() => alert("Save clicked")}
      />
    </PreviewComponent>
  </Section>
);

const ButtonGroupPage = () => {
  const [view, setView] = useState("list");

  return (
    <Section title="ButtonGroup" description="A horizontal group of connected buttons using ButtonBadge atoms.">
      <PreviewComponent
        title="ButtonGroup Sizes"
        code={`import { ButtonGroup, ButtonGroupItem } from "@/library/molecules/button-group";

<ButtonGroup size="md" value="a">
  <ButtonGroupItem value="a">Option A</ButtonGroupItem>
  <ButtonGroupItem value="b">Option B</ButtonGroupItem>
</ButtonGroup>

<ButtonGroup size="lg" value="a">
  <ButtonGroupItem value="a">Option A</ButtonGroupItem>
  <ButtonGroupItem value="b">Option B</ButtonGroupItem>
</ButtonGroup>`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <p style={{ fontSize: 12, color: "var(--color-content-secondary)", marginBottom: 8 }}>Medium</p>
            <ButtonGroup size="md" value="a">
              <ButtonGroupItem value="a">Option A</ButtonGroupItem>
              <ButtonGroupItem value="b">Option B</ButtonGroupItem>
            </ButtonGroup>
          </div>
          <div>
            <p style={{ fontSize: 12, color: "var(--color-content-secondary)", marginBottom: 8 }}>Large</p>
            <ButtonGroup size="lg" value="a">
              <ButtonGroupItem value="a">Option A</ButtonGroupItem>
              <ButtonGroupItem value="b">Option B</ButtonGroupItem>
            </ButtonGroup>
          </div>
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Basic ButtonGroup"
        code={`import { ButtonGroup, ButtonGroupItem } from "@/library/molecules/button-group";

const [view, setView] = useState("list");

<ButtonGroup value={view} onChange={setView}>
  <ButtonGroupItem value="list" iconName="QueueList">List</ButtonGroupItem>
  <ButtonGroupItem value="grid" iconName="Squares2X2">Grid</ButtonGroupItem>
  <ButtonGroupItem value="kanban" iconName="ViewColumns">Kanban</ButtonGroupItem>
</ButtonGroup>`}
      >
        <div>
          <ButtonGroup value={view} onChange={setView}>
            <ButtonGroupItem value="list" iconName="QueueList">List</ButtonGroupItem>
            <ButtonGroupItem value="grid" iconName="Squares2X2">Grid</ButtonGroupItem>
            <ButtonGroupItem value="kanban" iconName="ViewColumns">Kanban</ButtonGroupItem>
          </ButtonGroup>
          <p style={{ marginTop: 16, color: "var(--color-content-secondary)", fontSize: 14 }}>
            Selected: {view}
          </p>
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Icon Only"
        code={`import { ButtonGroup, ButtonGroupItem } from "@/library/molecules/button-group";

<ButtonGroup value="left">
  <ButtonGroupItem value="left" iconName="Bars3BottomLeft" />
  <ButtonGroupItem value="center" iconName="Bars3" />
  <ButtonGroupItem value="right" iconName="Bars3BottomRight" />
</ButtonGroup>`}
      >
        <ButtonGroup value="left">
          <ButtonGroupItem value="left" iconName="Bars3BottomLeft" />
          <ButtonGroupItem value="center" iconName="Bars3" />
          <ButtonGroupItem value="right" iconName="Bars3BottomRight" />
        </ButtonGroup>
      </PreviewComponent>
    </Section>
  );
};

const AvatarGroupPage = () => (
  <Section title="AvatarGroup" description="A stacked group of avatars with overflow indicator.">
    <PreviewComponent
      title="AvatarGroup Sizes"
      code={`import { AvatarGroup } from "@/library/molecules/avatar-group";

<AvatarGroup size="sm" avatars={[{ name: "A" }, { name: "B" }, { name: "C" }]} />
<AvatarGroup size="md" avatars={[{ name: "A" }, { name: "B" }, { name: "C" }]} />
<AvatarGroup size="lg" avatars={[{ name: "A" }, { name: "B" }, { name: "C" }]} />
<AvatarGroup size="xl" avatars={[{ name: "A" }, { name: "B" }, { name: "C" }]} />`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <p style={{ fontSize: 12, color: "var(--color-content-secondary)", marginBottom: 8 }}>Small</p>
          <AvatarGroup size="sm" avatars={[{ name: "A" }, { name: "B" }, { name: "C" }]} />
        </div>
        <div>
          <p style={{ fontSize: 12, color: "var(--color-content-secondary)", marginBottom: 8 }}>Medium</p>
          <AvatarGroup size="md" avatars={[{ name: "A" }, { name: "B" }, { name: "C" }]} />
        </div>
        <div>
          <p style={{ fontSize: 12, color: "var(--color-content-secondary)", marginBottom: 8 }}>Large</p>
          <AvatarGroup size="lg" avatars={[{ name: "A" }, { name: "B" }, { name: "C" }]} />
        </div>
        <div>
          <p style={{ fontSize: 12, color: "var(--color-content-secondary)", marginBottom: 8 }}>XL</p>
          <AvatarGroup size="xl" avatars={[{ name: "A" }, { name: "B" }, { name: "C" }]} />
        </div>
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Basic AvatarGroup"
      code={`import { AvatarGroup } from "@/library/molecules/avatar-group";

<AvatarGroup
  avatars={[
    { name: "John Doe" },
    { name: "Jane Smith" },
    { name: "Bob Wilson" },
  ]}
/>`}
    >
      <AvatarGroup
        avatars={[
          { name: "John Doe" },
          { name: "Jane Smith" },
          { name: "Bob Wilson" },
        ]}
      />
    </PreviewComponent>

    <PreviewComponent
      title="With Overflow"
      code={`import { AvatarGroup } from "@/library/molecules/avatar-group";

<AvatarGroup
  avatars={[
    { name: "John Doe" },
    { name: "Jane Smith" },
    { name: "Bob Wilson" },
    { name: "Alice Brown" },
    { name: "Charlie Davis" },
    { name: "Eve Johnson" },
  ]}
  max={4}
/>`}
    >
      <AvatarGroup
        avatars={[
          { name: "John Doe" },
          { name: "Jane Smith" },
          { name: "Bob Wilson" },
          { name: "Alice Brown" },
          { name: "Charlie Davis" },
          { name: "Eve Johnson" },
        ]}
        max={4}
      />
    </PreviewComponent>
  </Section>
);

const ChipInputPage = () => {
  const [chips, setChips] = useState([
    { id: "1", label: "React", color: "#7DBEFF" },
    { id: "2", label: "TypeScript", color: "#73E5AC" },
  ]);

  return (
    <Section title="ChipInput" description="A tag/chip input field with label, search functionality, and chip management.">
      <PreviewComponent
        title="All ChipInput States"
        code={`import { ChipInput } from "@/library/molecules/chip-input";

<ChipInput
  label="Tags"
  placeholder="Add tags..."
  chips={chips}
  onChange={setChips}
/>

<ChipInput
  label="Skills"
  required
  placeholder="Add skills..."
  chips={[{ id: "1", label: "JavaScript" }]}
/>

<ChipInput
  label="Keywords"
  placeholder="Add keywords..."
  chips={[]}
  showMiniInfobox
  miniInfoboxType="info"
  miniInfoboxMessage="Use this to help users filter quickly"
/>

<ChipInput
  label="Categories"
  placeholder="Select categories..."
  chips={[]}
  showMiniInfobox
  miniInfoboxType="error"
  miniInfoboxMessage="Please select at least one category"
/>

<ChipInput
  label="Topics"
  placeholder="Select topics..."
  chips={[{ id: "1", label: "Design Systems" }]}
  showMiniInfobox
  miniInfoboxType="success"
  miniInfoboxMessage="Looks good!"
/>

<ChipInput
  label="Disabled Input"
  placeholder="Cannot edit..."
  chips={[{ id: "1", label: "Fixed Tag" }]}
  isDisabled
/>`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 400 }}>
          <ChipInput
            label="Tags"
            placeholder="Add tags..."
            chips={chips}
            onChange={setChips}
          />
          <ChipInput
            label="Skills"
            required
            placeholder="Add skills..."
            chips={[{ id: "1", label: "JavaScript" }]}
          />
          <ChipInput
            label="Keywords"
            placeholder="Add keywords..."
            chips={[]}
            showMiniInfobox
            miniInfoboxType="info"
            miniInfoboxMessage="Use this to help users filter quickly"
          />
          <ChipInput
            label="Categories"
            placeholder="Select categories..."
            chips={[]}
            showMiniInfobox
            miniInfoboxType="error"
            miniInfoboxMessage="Please select at least one category"
          />
          <ChipInput
            label="Topics"
            placeholder="Select topics..."
            chips={[{ id: "1", label: "Design Systems" }]}
            showMiniInfobox
            miniInfoboxType="success"
            miniInfoboxMessage="Looks good!"
          />
          <ChipInput
            label="Disabled Input"
            placeholder="Cannot edit..."
            chips={[{ id: "1", label: "Fixed Tag" }]}
            isDisabled
          />
        </div>
      </PreviewComponent>
    </Section>
  );
};

const DialogPage = () => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  return (
    <Section title="Dialog" description="A modal dialog component for confirmations, alerts, and user interactions.">
      <PreviewComponent
        title="Info Dialog"
        code={`import { Dialog } from "@/library/molecules/dialog";
import { Button } from "@/library/atoms/button";

const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open Info Dialog</Button>

<Dialog
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  variant="info"
  title="Information"
  primaryLabel="Got it"
  onPrimaryPress={() => setIsOpen(false)}
>
  This is an informational dialog with important details for the user.
</Dialog>`}
      >
        <div>
          <Button onClick={() => setIsInfoOpen(true)}>Open Info Dialog</Button>
          <Dialog
            isOpen={isInfoOpen}
            onOpenChange={setIsInfoOpen}
            variant="info"
            title="Information"
            primaryLabel="Got it"
            onPrimaryPress={() => setIsInfoOpen(false)}
          >
            This is an informational dialog with important details for the user.
          </Dialog>
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Confirm Dialog"
        code={`import { ConfirmDialog } from "@/library/molecules/dialog";
import { Button } from "@/library/atoms/button";

const [isOpen, setIsOpen] = useState(false);

<Button variant="positive" onClick={() => setIsOpen(true)}>Open Confirm Dialog</Button>

<ConfirmDialog
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  title="Confirm Action"
  confirmLabel="Confirm"
  cancelLabel="Cancel"
  onConfirm={() => { alert("Confirmed!"); setIsOpen(false); }}
>
  Are you sure you want to proceed with this action?
</ConfirmDialog>`}
      >
        <div>
          <Button variant="positive" onClick={() => setIsConfirmOpen(true)}>Open Confirm Dialog</Button>
          <ConfirmDialog
            isOpen={isConfirmOpen}
            onOpenChange={setIsConfirmOpen}
            title="Confirm Action"
            confirmLabel="Confirm"
            cancelLabel="Cancel"
            onConfirm={() => { alert("Confirmed!"); setIsConfirmOpen(false); }}
          >
            Are you sure you want to proceed with this action?
          </ConfirmDialog>
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Alert Dialog"
        code={`import { AlertDialog } from "@/library/molecules/dialog";
import { Button } from "@/library/atoms/button";

const [isOpen, setIsOpen] = useState(false);

<Button variant="secondary" onClick={() => setIsOpen(true)}>Open Alert Dialog</Button>

<AlertDialog
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  variant="warning"
  title="Warning"
  buttonLabel="Acknowledge"
>
  Please be aware that this action cannot be undone.
</AlertDialog>`}
      >
        <div>
          <Button variant="secondary" onClick={() => setIsAlertOpen(true)}>Open Alert Dialog</Button>
          <AlertDialog
            isOpen={isAlertOpen}
            onOpenChange={setIsAlertOpen}
            variant="warning"
            title="Warning"
            buttonLabel="Acknowledge"
          >
            Please be aware that this action cannot be undone.
          </AlertDialog>
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Error Dialog"
        code={`import { Dialog } from "@/library/molecules/dialog";
import { Button } from "@/library/atoms/button";

const [isOpen, setIsOpen] = useState(false);

<Button variant="negative" onClick={() => setIsOpen(true)}>Open Error Dialog</Button>

<Dialog
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  variant="error"
  title="Error Occurred"
  primaryLabel="Retry"
  secondaryLabel="Cancel"
  onPrimaryPress={() => { alert("Retrying..."); setIsOpen(false); }}
  onSecondaryPress={() => setIsOpen(false)}
>
  An error occurred while processing your request. Please try again.
</Dialog>`}
      >
        <div>
          <Button variant="negative" onClick={() => setIsErrorOpen(true)}>Open Error Dialog</Button>
          <Dialog
            isOpen={isErrorOpen}
            onOpenChange={setIsErrorOpen}
            variant="error"
            title="Error Occurred"
            primaryLabel="Retry"
            secondaryLabel="Cancel"
            onPrimaryPress={() => { alert("Retrying..."); setIsErrorOpen(false); }}
            onSecondaryPress={() => setIsErrorOpen(false)}
          >
            An error occurred while processing your request. Please try again.
          </Dialog>
        </div>
      </PreviewComponent>
    </Section>
  );
};

const DropdownMenuPage = () => (
  <Section title="DropdownMenu" description="A dropdown menu container with sections, items, and optional footer.">
    <PreviewComponent
      title="Basic DropdownMenu"
      code={`import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSection } from "@/library/molecules/dropdown-menu";
import { DropdownMenuItem } from "@/library/molecules/dropdown-menu-item";
import { Button } from "@/library/atoms/button";
import { Icon } from "@/library/atoms/icon";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary" iconTrailing={<Icon name="ChevronDown" size="sm" />}>
      Options
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuSection>
      <DropdownMenuItem label="Edit" iconName="PencilSquare" />
      <DropdownMenuItem label="Duplicate" iconName="DocumentDuplicate" />
      <DropdownMenuItem label="Archive" iconName="ArchiveBox" />
    </DropdownMenuSection>
    <DropdownMenuSection showDivider>
      <DropdownMenuItem label="Delete" iconName="Trash" variant="destructive" />
    </DropdownMenuSection>
  </DropdownMenuContent>
</DropdownMenu>`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" iconTrailing={<Icon name="ChevronDown" size="sm" />}>
            Options
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSection>
            <DropdownMenuItem label="Edit" iconName="PencilSquare" />
            <DropdownMenuItem label="Duplicate" iconName="DocumentDuplicate" />
            <DropdownMenuItem label="Archive" iconName="ArchiveBox" />
          </DropdownMenuSection>
          <DropdownMenuSection showDivider>
            <DropdownMenuItem label="Delete" iconName="Trash" variant="destructive" />
          </DropdownMenuSection>
        </DropdownMenuContent>
      </DropdownMenu>
    </PreviewComponent>

    <PreviewComponent
      title="Simple DropdownMenu"
      code={`import { SimpleDropdownMenu } from "@/library/molecules/dropdown-menu";
import { Button } from "@/library/atoms/button";
import { Icon } from "@/library/atoms/icon";

<SimpleDropdownMenu
  trigger={
    <Button variant="secondary" iconTrailing={<Icon name="ChevronDown" size="sm" />}>
      Account
    </Button>
  }
  items={[
    { label: "Profile", icon: "User" },
    { label: "Settings", icon: "Cog6Tooth" },
    { type: "divider" },
    { label: "Sign out", icon: "ArrowRightOnRectangle" },
  ]}
/>`}
    >
      <SimpleDropdownMenu
        trigger={
          <Button variant="secondary" iconTrailing={<Icon name="ChevronDown" size="sm" />}>
            Account
          </Button>
        }
        items={[
          { label: "Profile", icon: "User" },
          { label: "Settings", icon: "Cog6Tooth" },
          { type: "divider" },
          { label: "Sign out", icon: "ArrowRightOnRectangle" },
        ]}
      />
    </PreviewComponent>
  </Section>
);

const DropdownListPage = () => {
  const explicitSearchItems = Array.from({ length: 6 }, (_, index) => ({
    value: `explicit-${index + 1}`,
    label: `Explicit item ${index + 1}`,
  }));

  const autoSearchItems = Array.from({ length: 8 }, (_, index) => ({
    value: `auto-${index + 1}`,
    label: `Auto item ${index + 1}`,
  }));

  const overflowItems = Array.from({ length: 14 }, (_, index) => ({
    value: `item-${index + 1}`,
    label: `Overflow item ${index + 1}`,
  }));

  return (
    <Section title="DropdownList" description="A searchable, sectioned list with optional 'Add' action.">
      <PreviewComponent
        title="Two Sections"
        code={`import { DropdownList, DropdownSection, DropdownListItem } from "@/library/molecules/dropdown-list";

<DropdownList noSearch noAdd>
  <DropdownSection title="Neurology">
    <DropdownListItem value="ad">Alzheimer's disease</DropdownListItem>
    <DropdownListItem value="pd">Parkinson's disease</DropdownListItem>
  </DropdownSection>
  <DropdownSection title="Oncology">
    <DropdownListItem value="bc">Breast cancer</DropdownListItem>
    <DropdownListItem value="lc">Lung cancer</DropdownListItem>
  </DropdownSection>
</DropdownList>`}
      >
        <div style={{ maxWidth: 320 }}>
          <DropdownList noSearch noAdd>
            <DropdownSection title="Neurology">
              <DropdownListItem value="ad">Alzheimer's disease</DropdownListItem>
              <DropdownListItem value="pd">Parkinson's disease</DropdownListItem>
            </DropdownSection>
            <DropdownSection title="Oncology">
              <DropdownListItem value="bc">Breast cancer</DropdownListItem>
              <DropdownListItem value="lc">Lung cancer</DropdownListItem>
            </DropdownSection>
          </DropdownList>
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Explicit Search Override"
        code={`import { DropdownList, DropdownSection, DropdownListItem } from "@/library/molecules/dropdown-list";

<DropdownList showSearch>
  <DropdownSection title="Auto-collapse section">
    <DropdownListItem value="1">Item 1</DropdownListItem>
    <DropdownListItem value="2">Item 2</DropdownListItem>
    <DropdownListItem value="3">Item 3</DropdownListItem>
    <DropdownListItem value="4">Item 4</DropdownListItem>
    <DropdownListItem value="5">Item 5</DropdownListItem>
    <DropdownListItem value="6">Item 6</DropdownListItem>
  </DropdownSection>
</DropdownList>`}
      >
        <div style={{ maxWidth: 320 }}>
          <DropdownList showSearch>
            <DropdownSection title="Auto-collapse section">
              {explicitSearchItems.map((item) => (
                <DropdownListItem key={item.value} value={item.value}>
                  {item.label}
                </DropdownListItem>
              ))}
            </DropdownSection>
          </DropdownList>
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Automatic Search at 8+ Items"
        code={`import { DropdownList, DropdownSection, DropdownListItem } from "@/library/molecules/dropdown-list";

<DropdownList noAdd>
  <DropdownSection title="Automatic search section">
    <DropdownListItem value="1">Item 1</DropdownListItem>
    <DropdownListItem value="2">Item 2</DropdownListItem>
    <DropdownListItem value="3">Item 3</DropdownListItem>
    <DropdownListItem value="4">Item 4</DropdownListItem>
    <DropdownListItem value="5">Item 5</DropdownListItem>
    <DropdownListItem value="6">Item 6</DropdownListItem>
    <DropdownListItem value="7">Item 7</DropdownListItem>
    <DropdownListItem value="8">Item 8</DropdownListItem>
  </DropdownSection>
</DropdownList>`}
      >
        <div style={{ maxWidth: 320 }}>
          <DropdownList noAdd>
            <DropdownSection title="Automatic search section">
              {autoSearchItems.map((item) => (
                <DropdownListItem key={item.value} value={item.value}>
                  {item.label}
                </DropdownListItem>
              ))}
            </DropdownSection>
          </DropdownList>
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Without Search"
        code={`import { DropdownList, DropdownSection, DropdownListItem } from "@/library/molecules/dropdown-list";

<DropdownList noSearch noAdd>
  <DropdownSection>
    <DropdownListItem value="a">Option A</DropdownListItem>
    <DropdownListItem value="b">Option B</DropdownListItem>
    <DropdownListItem value="c">Option C</DropdownListItem>
  </DropdownSection>
</DropdownList>`}
      >
        <div style={{ maxWidth: 320 }}>
          <DropdownList noSearch noAdd>
            <DropdownSection>
              <DropdownListItem value="a">Option A</DropdownListItem>
              <DropdownListItem value="b">Option B</DropdownListItem>
              <DropdownListItem value="c">Option C</DropdownListItem>
            </DropdownSection>
          </DropdownList>
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Without Add Action"
        code={`import { DropdownList, DropdownSection, DropdownListItem } from "@/library/molecules/dropdown-list";

<DropdownList noAdd>
  <DropdownSection title="Static section">
    <DropdownListItem value="ad">Alzheimer's disease</DropdownListItem>
    <DropdownListItem value="pd">Parkinson's disease</DropdownListItem>
  </DropdownSection>
</DropdownList>`}
      >
        <div style={{ maxWidth: 320 }}>
          <DropdownList noAdd>
            <DropdownSection title="Static section">
              <DropdownListItem value="ad">Alzheimer's disease</DropdownListItem>
              <DropdownListItem value="pd">Parkinson's disease</DropdownListItem>
            </DropdownSection>
          </DropdownList>
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Scrollable Overflow"
        code={`import { DropdownList, DropdownSection, DropdownListItem } from "@/library/molecules/dropdown-list";

<DropdownList noSearch noAdd>
  <DropdownSection title="Overflow section">
    <DropdownListItem value="item-1">Overflow item 1</DropdownListItem>
    <DropdownListItem value="item-2">Overflow item 2</DropdownListItem>
    <DropdownListItem value="item-3">Overflow item 3</DropdownListItem>
    <DropdownListItem value="item-4">Overflow item 4</DropdownListItem>
    <DropdownListItem value="item-5">Overflow item 5</DropdownListItem>
    <DropdownListItem value="item-6">Overflow item 6</DropdownListItem>
    <DropdownListItem value="item-7">Overflow item 7</DropdownListItem>
    <DropdownListItem value="item-8">Overflow item 8</DropdownListItem>
    <DropdownListItem value="item-9">Overflow item 9</DropdownListItem>
    <DropdownListItem value="item-10">Overflow item 10</DropdownListItem>
    <DropdownListItem value="item-11">Overflow item 11</DropdownListItem>
    <DropdownListItem value="item-12">Overflow item 12</DropdownListItem>
    <DropdownListItem value="item-13">Overflow item 13</DropdownListItem>
    <DropdownListItem value="item-14">Overflow item 14</DropdownListItem>
  </DropdownSection>
</DropdownList>`}
      >
        <div style={{ maxWidth: 320 }}>
          <DropdownList noSearch noAdd>
            <DropdownSection title="Overflow section">
              {overflowItems.map((item) => (
                <DropdownListItem key={item.value} value={item.value}>
                  {item.label}
                </DropdownListItem>
              ))}
            </DropdownSection>
          </DropdownList>
        </div>
      </PreviewComponent>
    </Section>
  );
};

const SubinfoPage = () => (
  <Section title="Subinfo" description="A flexible info display component for showing various types of data.">
    <PreviewComponent
      title="All Subinfo Variants"
      code={`import { Subinfo } from "@/library/molecules/subinfo";

<Subinfo label="Owner">John Doe</Subinfo>
<Subinfo label="Status" iconName="Clock">In Progress</Subinfo>
<Subinfo label="Priority" href="#">High</Subinfo>`}
    >
      <div style={{ display: "flex", gap: 24 }}>
        <Subinfo label="Owner">John Doe</Subinfo>
        <Subinfo label="Status" iconName="Clock">In Progress</Subinfo>
        <Subinfo label="Priority" href="#">High</Subinfo>
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Avatar Variant"
      code={`import { Subinfo } from "@/library/molecules/subinfo";

<Subinfo variant="avatar" initials="JD" href="#">John Doe</Subinfo>
<Subinfo variant="avatar" initials="AS">Alice Smith</Subinfo>`}
    >
      <div style={{ display: "flex", gap: 24 }}>
        <Subinfo variant="avatar" initials="JD" href="#">John Doe</Subinfo>
        <Subinfo variant="avatar" initials="AS">Alice Smith</Subinfo>
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="List Variant"
      code={`import { Subinfo } from "@/library/molecules/subinfo";

<Subinfo
  variant="list"
  items={[
    { text: "Marketing", iconName: "Folder" },
    { text: "Design", iconName: "Folder", href: "#" },
    { text: "Engineering", iconName: "Folder" },
    { text: "Sales", iconName: "Folder" },
    { text: "Support", iconName: "Folder" },
    { text: "Operations", iconName: "Folder" },
  ]}
  maxItems={5}
/>`}
    >
      <Subinfo
        variant="list"
        items={[
          { text: "Marketing", iconName: "Folder" },
          { text: "Design", iconName: "Folder", href: "#" },
          { text: "Engineering", iconName: "Folder" },
          { text: "Sales", iconName: "Folder" },
          { text: "Support", iconName: "Folder" },
          { text: "Operations", iconName: "Folder" },
        ]}
        maxItems={5}
      />
    </PreviewComponent>
  </Section>
);

const InfofieldPage = () => (
  <Section title="Infofield" description="A read-only field displaying a label with various value types.">
    <PreviewComponent
      title="Text Values"
      code={`import { Infofield, InfofieldGroup } from "@/library/molecules/infofield";

<InfofieldGroup>
  <Infofield label="Name" value="John Doe" />
  <Infofield label="Email" value="john@example.com" iconName="Envelope" />
  <Infofield label="Empty Field" />
</InfofieldGroup>`}
    >
      <InfofieldGroup>
        <Infofield label="Name" value="John Doe" />
        <Infofield label="Email" value="john@example.com" iconName="Envelope" />
        <Infofield label="Empty Field" />
      </InfofieldGroup>
    </PreviewComponent>

    <PreviewComponent
      title="Badges"
      code={`import { Infofield } from "@/library/molecules/infofield";

<Infofield
  label="Status"
  variant="badges"
  values={["Active", "Verified", "Premium"]}
/>`}
    >
      <Infofield
        label="Status"
        variant="badges"
        values={["Active", "Verified", "Premium"]}
      />
    </PreviewComponent>

    <PreviewComponent
      title="Chips"
      code={`import { Infofield } from "@/library/molecules/infofield";

<Infofield
  label="Tags"
  variant="chips"
  values={[
    { label: "React", color: "#7DBEFF" },
    { label: "TypeScript", color: "#73E5AC" },
    { label: "Node.js", color: "#FFAE70" },
  ]}
/>`}
    >
      <Infofield
        label="Tags"
        variant="chips"
        values={[
          { label: "React", color: "#7DBEFF" },
          { label: "TypeScript", color: "#73E5AC" },
          { label: "Node.js", color: "#FFAE70" },
        ]}
      />
    </PreviewComponent>

    <PreviewComponent
      title="With Overflow"
      code={`import { Infofield } from "@/library/molecules/infofield";

<Infofield
  label="Categories"
  variant="badges"
  values={["Cat 1", "Cat 2", "Cat 3", "Cat 4", "Cat 5", "Cat 6"]}
  maxItems={4}
/>`}
    >
      <Infofield
        label="Categories"
        variant="badges"
        values={["Cat 1", "Cat 2", "Cat 3", "Cat 4", "Cat 5", "Cat 6"]}
        maxItems={4}
      />
    </PreviewComponent>
  </Section>
);

const MiniInfoboxPage = () => (
  <Section title="MiniInfobox" description="A compact inline message with an icon and text.">
    <PreviewComponent
      title="All MiniInfobox Variants"
      code={`import { MiniInfobox } from "@/library/molecules/miniinfobox";

<MiniInfobox variant="info" message="This is an info message" />
<MiniInfobox variant="success" message="Operation completed successfully" />
<MiniInfobox variant="warning" message="Please review your changes" />
<MiniInfobox variant="error" message="An error occurred" />
<MiniInfobox variant="neutral" message="This is a neutral message" />
<MiniInfobox variant="ai" message="AI-generated content" />
`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <MiniInfobox variant="info" message="This is an info message" />
        <MiniInfobox variant="success" message="Operation completed successfully" />
        <MiniInfobox variant="warning" message="Please review your changes" />
        <MiniInfobox variant="error" message="An error occurred" />
        <MiniInfobox variant="neutral" message="This is a neutral message" />
        <MiniInfobox variant="ai" message="AI-generated content" />
      </div>
    </PreviewComponent>
  </Section>
);

const ToastTriggersDemo = () => {
  const toast = useToast();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <Button
          variant="secondary"
          size="md"
          onClick={() =>
            toast.success({
              message:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce congue ex elit, non sollicitudin sem vehicula vel.",
              actionLabel: "Action",
            })
          }
        >
          Trigger Success
        </Button>

        <Button
          variant="secondary"
          size="md"
          onClick={() =>
            toast.warning({
              message:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce congue ex elit, non sollicitudin sem vehicula vel.",
              actionLabel: "Action",
            })
          }
        >
          Trigger Warning
        </Button>

        <Button
          variant="secondary"
          size="md"
          onClick={() =>
            toast.error({
              message:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce congue ex elit, non sollicitudin sem vehicula vel.",
              actionLabel: "Action",
            })
          }
        >
          Trigger Error
        </Button>

        <Button
          variant="secondary"
          size="md"
          onClick={() =>
            toast.info({
              message:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce congue ex elit, non sollicitudin sem vehicula vel.",
              actionLabel: "Action",
            })
          }
        >
          Trigger Info
        </Button>

        <Button
          variant="secondary"
          size="md"
          onClick={() =>
            toast.neutral({
              message:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce congue ex elit, non sollicitudin sem vehicula vel.",
              actionLabel: "Action",
            })
          }
        >
          Trigger Neutral
        </Button>
      </div>

      <p style={{ margin: 0, color: "var(--color-content-secondary)", fontSize: 14 }}>
        Click any action button above. Toasts slide in and auto-dismiss.
      </p>
    </div>
  );
};

const ToastPage = () => (
  <Section title="Toast" description="A stackable notification molecule with slide-in animation and auto-dismiss behavior.">
    <PreviewComponent
      title="Trigger Toasts From Actions"
      code={`import { Button } from "@/library/atoms/button";
import { ToastProvider, useToast } from "@/library/molecules/toast";

const Triggers = () => {
  const toast = useToast();

  return (
    <Button
      variant="secondary"
      onClick={() =>
        toast.success({
          message: "Operation completed successfully",
          actionLabel: "Action",
        })
      }
    >
      Trigger Success
    </Button>
  );
};

<ToastProvider position="bottom-right">
  <Triggers />
</ToastProvider>`}
      >
        <ToastProvider position="bottom-right">
          <ToastTriggersDemo />
        </ToastProvider>
      </PreviewComponent>

      <PreviewComponent
        title="All Variants"
        code={`import { Toast } from "@/library/molecules/toast";

    <Toast variant="success" message="Success message" actionLabel="Action" showActionButton showCloseButton />
    <Toast variant="warning" message="Warning message" actionLabel="Action" showActionButton showCloseButton={false} />
    <Toast variant="error" message="Error message" showActionButton={false} showCloseButton />
    <Toast variant="info" message="Info message" showActionButton={false} showCloseButton={false} />
    <Toast variant="neutral" message="Neutral message" actionLabel="Action" showActionButton showCloseButton />`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 720 }}>
          <Toast
            variant="success"
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce congue ex elit, non sollicitudin sem vehicula vel."
            actionLabel="Action"
            showActionButton={true}
            showCloseButton={true}
            onDismiss={() => {}}
          />
          <Toast
            variant="warning"
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce congue ex elit, non sollicitudin sem vehicula vel."
            actionLabel="Action"
            showActionButton={true}
            showCloseButton={false}
            onDismiss={() => {}}
          />
          <Toast
            variant="error"
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce congue ex elit, non sollicitudin sem vehicula vel."
            showActionButton={false}
            showCloseButton={true}
            onDismiss={() => {}}
          />
          <Toast
            variant="info"
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce congue ex elit, non sollicitudin sem vehicula vel."
            showActionButton={false}
            showCloseButton={false}
            onDismiss={() => {}}
          />
          <Toast
            variant="neutral"
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce congue ex elit, non sollicitudin sem vehicula vel."
            actionLabel="Action"
            showActionButton={true}
            showCloseButton={true}
            onDismiss={() => {}}
          />
        </div>
      </PreviewComponent>
    </Section>
  );

const AiChatInputPage = () => {
  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState([
    { id: "att-1", fileName: "OncoNexa Therape..pdf", fileIconName: "DocumentText" },
    { id: "att-2", fileName: "Cancer-trial-notes.pdf", fileIconName: "DocumentText" },
    { id: "att-3", fileName: "Protocol-v4-final.pdf", fileIconName: "DocumentText" },
    { id: "att-4", fileName: "Partnership-terms.pdf", fileIconName: "DocumentText" },
  ]);

  return (
    <Section title="AiChatInput" description="A reusable AI chat composer molecule with Button atom actions.">
      <PreviewComponent
        title="Default Composer"
        code={`import { useState } from "react";
import { AiChatInput } from "@/library/molecules/ai-chat-input";

const Example = () => {
  const [prompt, setPrompt] = useState("");
  const [attachments, setAttachments] = useState([
    { id: "1", fileName: "OncoNexa Therape..pdf" },
    { id: "2", fileName: "Cancer-trial-notes.pdf" },
    { id: "3", fileName: "Protocol-v4-final.pdf" },
  ]);

  return (
    <AiChatInput
      value={prompt}
      onChange={setPrompt}
      attachments={attachments}
      onAttachmentsChange={setAttachments}
      placeholder="Ask AI anything..."
      onSubmit={(text) => console.log(text)}
      onAttach={() => {}}
    />
  );
};`}
      >
        <AiChatInput
          value={value}
          onChange={setValue}
          attachments={attachments}
          onAttachmentsChange={setAttachments}
          placeholder="Ask AI anything..."
          onSubmit={(text) => {
            alert(`Submitted: ${text}`);
            setValue("");
          }}
          onAttach={() => alert("Attach clicked")}
        />
      </PreviewComponent>

      <PreviewComponent
        title="No Attach + Compact"
        code={`<AiChatInput
  size="sm"
  showLeadingButton={false}
  submitLabel="Ask"
  placeholder="Type your question"
/>`}
      >
        <AiChatInput
          size="sm"
          showLeadingButton={false}
          submitLabel="Ask"
          placeholder="Type your question"
          onSubmit={() => {}}
        />
      </PreviewComponent>
    </Section>
  );
};

const AttachmentPage = () => (
  <Section title="Attachment" description="A file attachment row with metadata and icon action buttons.">
    <PreviewComponent
      title="Custom Action Buttons"
      code={`import { Attachment } from "@/library/molecules/attachment";
import { Button } from "@/library/atoms/button";
import { Icon } from "@/library/atoms/icon";

<Attachment
  fileName="Name-Of-The-Attachment_010203.ext"
  owner="Jane Doe"
  date="Oct 21, 2022"
  actions={[
    <Button iconOnly variant="secondary" size="sm" ariaLabel="Delete" iconLeading={<Icon name="Trash" size="sm" />} onClick={() => {}} />,
    <Button iconOnly variant="secondary" size="sm" ariaLabel="Upload" iconLeading={<Icon name="ArrowUp" size="sm" />} onClick={() => {}} />,
  ]}
/>`}
    >
      <div style={{ borderTop: "1px solid var(--color-action-outline-secondary-enabled)" }}>
        <Attachment
          fileName="Name-Of-The-Attachment_010203.ext"
          owner="Jane Doe"
          date="Oct 21, 2022"
          actions={[
            <Button
              iconOnly
              variant="secondary"
              size="sm"
              ariaLabel="Delete attachment"
              iconLeading={<Icon name="Trash" size="sm" />}
              onClick={() => alert("Delete")}
            />,
            <Button
              iconOnly
              variant="secondary"
              size="sm"
              ariaLabel="Upload new version"
              iconLeading={<Icon name="ArrowUp" size="sm" />}
              onClick={() => alert("Upload")}
            />,
          ]}
        />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Legacy Boolean API"
      code={`<Attachment
  fileName="NDA_Abbvie_2026.pdf"
  owner="Emma Dupont"
  date="Apr 6, 2026"
  showDelete={false}
/>`}
    >
      <div style={{ borderTop: "1px solid var(--color-action-outline-secondary-enabled)" }}>
        <Attachment
          fileName="NDA_Abbvie_2026.pdf"
          owner="Emma Dupont"
          date="Apr 6, 2026"
          showDelete={false}
          onDownload={() => alert("Download")}
          onMore={() => alert("More")}
        />
      </div>
    </PreviewComponent>
  </Section>
);

const FileUploaderPage = () => {
  const [lastSelection, setLastSelection] = useState([]);

  return (
    <Section title="FileUploader" description="A drag-and-drop uploader molecule with browse fallback and file selection callback.">
      <PreviewComponent
        title="Default Uploader"
        code={`import { FileUploader } from "@/library/molecules/file-uploader";

<FileUploader
  onFilesSelected={(files) => console.log(files)}
/>`}
      >
        <FileUploader
          onFilesSelected={(files) => {
            setLastSelection(files.map((file) => file.name));
          }}
        />
      </PreviewComponent>

      <PreviewComponent
        title="Without Illustration"
        code={`<FileUploader
  showIllustration={false}
  title="Upload evidence files"
  subtitle="PDF, PNG, DOCX up to 25MB"
/>`}
      >
        <FileUploader
          showIllustration={false}
          title="Upload evidence files"
          subtitle="PDF, PNG, DOCX up to 25MB"
          onFilesSelected={(files) => {
            setLastSelection(files.map((file) => file.name));
          }}
        />
      </PreviewComponent>

      {lastSelection.length > 0 ? (
        <p style={{ marginTop: 8, color: "var(--color-content-secondary)", fontSize: 14 }}>
          Last selected: {lastSelection.join(", ")}
        </p>
      ) : null}
    </Section>
  );
};

const EmptyStatePage = () => (
  <Section title="EmptyState" description="A reusable empty state molecule with optional illustration and Button atom actions.">
    <PreviewComponent
      title="Default Empty State"
      code={`import { EmptyState } from "@/library/molecules/empty-state";

<EmptyState
  illustrationVariant="noResult"
  title="No results found"
  description="Try adjusting your search or filters"
  actionLabel="Clear filters"
  onAction={() => {}}
/>`}
    >
      <EmptyState
        illustrationVariant="noResult"
        title="No results found"
        description="Try adjusting your search or filters"
        actionLabel="Clear filters"
        onAction={() => alert("Clear filters")}
      />
    </PreviewComponent>

    <PreviewComponent
      title="Create Empty State"
      code={`import { EmptyState } from "@/library/molecules/empty-state";

<EmptyState
  illustrationVariant="create"
  title="Create something new"
  description="Get started by creating your first item"
  actionLabel="Create"
  onAction={() => {}}
/>`}
    >
      <EmptyState
        illustrationVariant="create"
        title="Create something new"
        description="Get started by creating your first item"
        actionLabel="Create"
        onAction={() => alert("Create")}
      />
    </PreviewComponent>

    <PreviewComponent
      title="Compact Empty State"
      code={`import { EmptyState, EMPTY_STATE_SIZES } from "@/library/molecules/empty-state";
import { Button } from "@/library/atoms/button";

<EmptyState
  size={EMPTY_STATE_SIZES.sm}
  showIllustration={false}
  title="No items yet"
  description="Add your first item to get started"
  actions={[<Button variant="secondary" size="md">Add item</Button>]}
/>`}
    >
      <EmptyState
        size={EMPTY_STATE_SIZES.sm}
        showIllustration={false}
        title="No items yet"
        description="Add your first item to get started"
        actions={[
          <Button key="empty-state-action" variant="secondary" size="md" onClick={() => alert("Add item")}>
            Add item
          </Button>,
        ]}
      />
    </PreviewComponent>
  </Section>
);

// ─────────────────────────────────────────────
// ORGANISMS
// ─────────────────────────────────────────────

const SideMenuItemPage = () => (
  <Section title="SideMenuItem" description="A standalone navigation item used inside SideMenu sections.">
    <PreviewComponent
      title="All States"
      code={`import { SideMenuItem, SIDE_MENU_ITEM_STATES } from "@/library/organisms/side-menu/side-menu-item";
import { Icon } from "@/library/atoms/icon";

<SideMenuItem label="Enabled" iconName="Home" state="enabled" />
<SideMenuItem label="Active" iconName="Sparkles" state="active" />
<SideMenuItem label="Disabled" iconName="LockClosed" state="disabled" />`}
    >
      <div style={{ width: 240, display: "flex", flexDirection: "column", gap: 4 }}>
        <SideMenuItem label="Enabled" iconName="Home" state={SIDE_MENU_ITEM_STATES.enabled} />
        <SideMenuItem label="Active" iconName="Sparkles" state={SIDE_MENU_ITEM_STATES.active} />
        <SideMenuItem label="Disabled" iconName="LockClosed" state={SIDE_MENU_ITEM_STATES.disabled} />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="With Badge"
      code={`<SideMenuItem label="Notifications" iconName="Bell" showBadge badgeLabel="5" />`}
    >
      <div style={{ width: 240 }}>
        <SideMenuItem label="Notifications" iconName="Bell" showBadge badgeLabel="5" />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Object Type Icons"
      code={`<SideMenuItem label="Initiatives" iconName="initiative" />
<SideMenuItem label="Opportunities" iconName="opportunity" state="active" />
<SideMenuItem label="Agreements" iconName="agreement" />`}
    >
      <div style={{ width: 240, display: "flex", flexDirection: "column", gap: 4 }}>
        <SideMenuItem label="Initiatives" iconName="initiative" />
        <SideMenuItem label="Opportunities" iconName="opportunity" state="active" />
        <SideMenuItem label="Agreements" iconName="agreement" />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Collapsed (Icon Only)"
      code={`<SideMenuItem label="Home" iconName="Home" showLabel={false} />`}
    >
      <div style={{ display: "flex", gap: 4 }}>
        <SideMenuItem label="Home" iconName="Home" showLabel={false} />
        <SideMenuItem label="Dashboard" iconName="ChartBar" showLabel={false} state="active" />
        <SideMenuItem label="Settings" iconName="Cog6Tooth" showLabel={false} />
      </div>
    </PreviewComponent>
  </Section>
);

const UserButtonPage = () => (
  <Section title="UserButton" description="A user profile button displayed at the bottom of the SideMenu with avatar, name, and email.">
    <PreviewComponent
      title="Default State"
      code={`import { UserButton } from "@/library/organisms/side-menu/user-button";

<UserButton name="Linh Nguyen" email="linh.nguyen@inpart.io" avatarInitials="LN" />`}
    >
      <div style={{ width: 240 }}>
        <UserButton name="Linh Nguyen" email="linh.nguyen@inpart.io" avatarInitials="LN" />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="All States"
      code={`<UserButton state="default" name="Jane Doe" email="jane@example.com" avatarInitials="JD" />
<UserButton state="hover" name="Jane Doe" email="jane@example.com" avatarInitials="JD" />
<UserButton state="active" name="Jane Doe" email="jane@example.com" avatarInitials="JD" />`}
    >
      <div style={{ width: 240, display: "flex", flexDirection: "column", gap: 8 }}>
        <p style={{ fontSize: 12, color: "var(--color-content-secondary)", margin: 0 }}>Default</p>
        <UserButton state={USER_BUTTON_STATES.default} name="Jane Doe" email="jane@example.com" avatarInitials="JD" />
        <p style={{ fontSize: 12, color: "var(--color-content-secondary)", margin: 0 }}>Active</p>
        <UserButton state={USER_BUTTON_STATES.active} name="Jane Doe" email="jane@example.com" avatarInitials="JD" />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Collapsed (Avatar Only)"
      code={`<UserButton collapsed name="Jane Doe" avatarInitials="JD" />`}
    >
      <UserButton collapsed name="Jane Doe" avatarInitials="JD" />
    </PreviewComponent>

    <PreviewComponent
      title="Without Email"
      code={`<UserButton name="Admin User" avatarInitials="AU" showEmail={false} />`}
    >
      <div style={{ width: 240 }}>
        <UserButton name="Admin User" avatarInitials="AU" showEmail={false} />
      </div>
    </PreviewComponent>
  </Section>
);

const statusUpdateNextSteps = "Prepare final diligence memo, align owners for the integration checklist, and confirm who will present the decision summary in Thursday's steering call.";
const statusUpdateUpdates = "The team completed legal review for all priority documents and flagged two clauses for follow-up. Data-room indexing is now up to date, and cross-functional owners have acknowledged action items.The team completed legal review for all priority documents and flagged two clauses for follow-up. Data-room indexing is now up to date, and cross-functional owners have acknowledged action items.The team completed legal review for all priority documents and flagged two clauses for follow-up. Data-room indexing is now up to date, and cross-functional owners have acknowledged action items.The team completed legal review for all priority documents and flagged two clauses for follow-up. Data-room indexing is now up to date, and cross-functional owners have acknowledged action items.The team completed legal review for all priority documents and flagged two clauses for follow-up. Data-room indexing is now up to date, and cross-functional owners have acknowledged action items.The team completed legal review for all priority documents and flagged two clauses for follow-up. Data-room indexing is now up to date, and cross-functional owners have acknowledged action items.";

const StatusUpdatePage = () => (
  <Section title="StatusUpdate" description="An accordion-based status summary with action controls, metadata, and expandable next steps/updates content.">
    <PreviewComponent
      title="Default"
      code={`import { StatusUpdate } from "@/library/organisms/status-update";

<StatusUpdate
  title="Status update"
  dateLabel="Sep 8, 2026"
  authorName="Linh Nguyen"
  statusLabel="On track"
  nextStepsContent="Prepare final diligence memo..."
  updatesContent="The team completed legal review..."
/>`}
    >
      <div style={{ maxWidth: 880 }}>
        <StatusUpdate nextStepsContent={statusUpdateNextSteps} updatesContent={statusUpdateUpdates} />
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Custom Labels"
      code={`<StatusUpdate
  title="Deal status"
  dateLabel="Sep 10, 2026"
  authorName="Product Ops"
  authorInitials="PO"
  statusLabel="Needs review"
  badgeCount="3"
/>`}
    >
      <div style={{ maxWidth: 880 }}>
        <StatusUpdate
          title="Deal status"
          dateLabel="Sep 10, 2026"
          authorName="Product Ops"
          authorInitials="PO"
          statusLabel="Needs review"
          badgeCount="3"
        />
      </div>
    </PreviewComponent>
  </Section>
);

const SideMenuRichTextInputPage = () => {
  const [enabledValue, setEnabledValue] = useState("");
  const [activeValue, setActiveValue] = useState("Draft update prepared for legal review and stakeholder sign-off.");

  return (
    <Section
      title="SideMenuRichTextInput"
      description="A side-menu rich text composer with grouped toolbar actions, optional AI action, and configurable footer actions."
    >
      <PreviewComponent
        title="Enabled"
        code={`import { SideMenuRichTextInput } from "@/library/organisms/side-menu/rich-text-input";

<SideMenuRichTextInput
  value={value}
  onChange={setValue}
  placeholder="Write a comment"
  submitLabel="Submit"
/>`}
      >
        <div style={{ maxWidth: 820 }}>
          <SideMenuRichTextInput value={enabledValue} onChange={setEnabledValue} submitLabel="Submit" />
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Active (With Optional Actions)"
        code={`<SideMenuRichTextInput
  state="active"
  value={value}
  onChange={setValue}
  showSecondButton
  secondButtonLabel="Cancel"
  showBadgeAi
  aiButtonLabel="AI"
  showTableIcons
  submitLabel="Post update"
/>`}
      >
        <div style={{ maxWidth: 820 }}>
          <SideMenuRichTextInput
            state="active"
            value={activeValue}
            onChange={setActiveValue}
            showSecondButton
            secondButtonLabel="Cancel"
            showBadgeAi
            aiButtonLabel="AI"
            showTableIcons
            submitLabel="Post update"
          />
        </div>
      </PreviewComponent>
    </Section>
  );
};

const TableCellPage = () => (
  <Section title="TableCell" description="Individual table cell variants used inside the Table organism.">
    <PreviewComponent
      title="All TableCell Variants"
      code={`import { TableCell, TABLECELL_VARIANTS } from "@/library/organisms/table/tablecell";

<TableCell variant="short-text">Short text cell</TableCell>
<TableCell variant="long-text">Long text content that may overflow</TableCell>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {Object.values(TABLECELL_VARIANTS).map((variant) => (
          <div key={variant} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ width: 140, fontSize: 12, color: "var(--color-content-secondary)", flexShrink: 0 }}>{variant}</span>
            <TableCell variant={variant}>
              {variant === "short-text" && "Short text"}
              {variant === "long-text" && "Long text content that may overflow in narrow columns"}
              {variant === "badge" && <Badge color="positive" size="sm">Active</Badge>}
              {variant === "chip" && <Chip variant="primary" size="sm">Tag</Chip>}
              {variant === "checkbox" && <Checkbox size="sm" type="unchecked" state="enabled" />}
              {variant === "link" && <Link href="#">Linked item</Link>}
              {variant === "text-icon" && (
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon name="User" size="sm" /><span>John Doe</span>
                </div>
              )}
              {variant === "button" && <Button variant="secondary" size="sm">Action</Button>}
            </TableCell>
          </div>
        ))}
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="TwoLevel Cell"
      code={`import { TableCellTwoLevel } from "@/library/organisms/table/tablecell";

<TableCellTwoLevel primary="Primary text" secondary="Secondary label" />`}
    >
      <TableCellTwoLevel primary="Acme Corporation" secondary="acme.com" />
    </PreviewComponent>

    <PreviewComponent
      title="Tags Cell"
      code={`import { TableCellTags } from "@/library/organisms/table/tablecell";

<TableCellTags items={[{ label: "React" }, { label: "TypeScript" }]} maxVisible={3} />`}
    >
      <TableCellTags
        items={[
          { label: "React" },
          { label: "TypeScript" },
          { label: "Node.js" },
          { label: "GraphQL" },
          { label: "Docker" },
        ]}
        maxVisible={3}
      />
    </PreviewComponent>
  </Section>
);

const SideMenuPage = () => (
  <Section title="SideMenu" description="A complete sidebar navigation with logo, search, menu sections, and user profile.">
    <PreviewComponent
      title="Deal Variant"
      code={`import { SideMenu } from "@/library/organisms/side-menu/side-menu";
import InpartLogo from "@/Inpart.svg";
import InpartLogoCollapsed from "@/Inpart1.svg";

      const dealSections = [
        {
          items: [
            { label: "Home", iconName: "Home" },
              { label: "AI assistant", iconName: "Sparkle" },
            { label: "Dashboard", iconName: "ChartBar" },
            { label: "Network", iconName: "Share" },
          ],
        },
        {
          title: "Workspace",
          items: [
            { label: "Initiatives", iconName: "initiative" },
            { label: "Opportunities", iconName: "opportunity", state: "active" },
            { label: "Agreements", iconName: "agreement" },
            { label: "Alliances", iconName: "alliance" },
            { label: "Obligations", iconName: "obligation" },
          ],
        },
        {
          title: "Directory",
          items: [
            { label: "Companies", iconName: "company" },
            { label: "Contacts", iconName: "contact" },
            { label: "Meetings", iconName: "meeting" },
          ],
          dividerAfter: true,
        },
        {
          title: "Recent Initiatives",
          items: [
            { label: "ALLINPART", iconColor: "var(--color-content-brand)", iconLetter: "A" },
          ],
        },
      ];

<SideMenu
  variant="collapsed"
  expandOnHover
  logoSrc={InpartLogo}
  collapsedLogoSrc={InpartLogoCollapsed}
  showSearch
  searchPlaceholder="Quick search"
  sections={dealSections}
  createButtonLabel="Create"
  user={{
    name: "Linh Nguyen",
    email: "linh.nguyen@inpart.io",
    avatarInitials: "LN",
  }}
  onCreateClick={() => {}}
/>
`}
    >
      <div style={{ display: "flex", gap: 24 }}>
        <div style={{ height: 760, border: "1px solid var(--color-action-outline-secondary-enabled)", borderRadius: 8, overflow: "hidden" }}>
          <SideMenu
            variant="collapsed"
            expandOnHover={true}
            logoSrc="/Inpart.svg"
            collapsedLogoSrc="/Inpart1.svg"
            showSearch={true}
            searchPlaceholder="Quick search"
            sections={[
              {
                items: [
                  { label: "Home", iconName: "Home" },
                  { label: "Dashboard", iconName: "ChartBar" },
                  { label: "Network", iconName: "Share" },
                ],
              },
              {
                title: "Workspace",
                items: [
                  { label: "Initiatives", iconName: "initiative" },
                  { label: "Opportunities", iconName: "opportunity", state: "active" },
                  { label: "Agreements", iconName: "agreement" },
                  { label: "Alliances", iconName: "alliance" },
                  { label: "Obligations", iconName: "obligation" },
                ],
              },
              {
                title: "Directory",
                items: [
                  { label: "Companies", iconName: "company" },
                  { label: "Contacts", iconName: "contact" },
                  { label: "Meetings", iconName: "meeting" },
                ],
                dividerAfter: true,
              },
              {
                title: "Recent Initiatives",
                items: [
                  { label: "ALLINPART", iconColor: "var(--color-content-brand)", iconLetter: "A" },
                ],
              },
            ]}
            createButtonLabel="Create"
            user={{ name: "Linh Nguyen", email: "linh.nguyen@inpart.io", avatarInitials: "LN" }}
            onCreateClick={() => alert("Create clicked")}
            style={{ position: "relative" }}
          />
        </div>
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Expanded SideMenu"
      code={`import { SideMenu } from "@/library/organisms/side-menu/side-menu";

<SideMenu
  variant="expanded"
  expandOnHover={false}
  logoSrc="https://via.placeholder.com/120x40?text=Logo"
  showSearch
  sections={[
    {
      items: [
        { label: "Home", iconName: "Home", state: "active" },
        { label: "Dashboard", iconName: "ChartBar" },
      ],
    },
    {
      title: "Workspace",
      items: [
        { label: "Projects", iconName: "Folder" },
        { label: "Tasks", iconName: "ClipboardDocumentList" },
        { label: "Calendar", iconName: "Calendar" },
      ],
    },
  ]}
  user={{ name: "Jane Doe", email: "jane@example.com", avatarInitials: "JD" }}
/>`}
    >
      <p style={{ color: "var(--color-content-secondary)", marginBottom: 16 }}>
        The SideMenu component is being used as the main navigation for this page.
        Hover over the left sidebar to see it expand.
      </p>
      <div style={{ display: "flex", gap: 24 }}>
        <div style={{ height: 400, border: "1px solid var(--color-neutral-200)", borderRadius: 8, overflow: "hidden" }}>
          <SideMenu
            variant="expanded"
            expandOnHover={false}
            logoSrc="https://via.placeholder.com/120x40?text=Logo"
            showSearch={true}
            sections={[
              {
                items: [
                  { label: "Home", iconName: "Home", state: "active" },
                  { label: "Dashboard", iconName: "ChartBar" },
                ]
              },
              {
                title: "Workspace",
                items: [
                  { label: "Projects", iconName: "Folder" },
                  { label: "Tasks", iconName: "ClipboardDocumentList" },
                  { label: "Calendar", iconName: "Calendar" },
                ]
              }
            ]}
            user={{ name: "Jane Doe", email: "jane@example.com", avatarInitials: "JD" }}
            onCreateClick={() => alert("Create clicked")}
            style={{ position: "relative" }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <p><strong>Props:</strong></p>
          <ul style={{ fontSize: 14, color: "var(--color-content-secondary)", paddingLeft: 20 }}>
            <li>variant: "expanded" | "collapsed"</li>
            <li>expandOnHover: boolean</li>
            <li>logoSrc: string</li>
            <li>showSearch: boolean</li>
            <li>sections: array of section objects</li>
            <li>user: object with name, email, avatarSrc</li>
            <li>onCreateClick: function</li>
          </ul>
        </div>
      </div>
    </PreviewComponent>
  </Section>
);

const AccessControlModalPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const mockUsers = [
    { name: "John Doe", role: "Owner" },
    { name: "Alice Johnson", role: "Can edit" },
    { name: "Bob Smith", role: "Can access" },
  ];

  return (
    <Section title="AccessControlModal" description="A modal for managing object access with public/private toggle.">
      <PreviewComponent
        title="Access Control Modal"
        code={`import { AccessControlModal } from "@/library/organisms/access-control-modal";

<AccessControlModal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  objectLabel="agreement"
  users={[{ name: "John Doe", role: "Owner" }]}
/>`}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <Button variant="primary" onClick={() => setIsOpen(true)}>
            Open Access Control
          </Button>
        </div>
        <AccessControlModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          objectLabel="agreement"
          users={mockUsers}
        />
      </PreviewComponent>
    </Section>
  );
};

const ModalPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeOpen, setIsLargeOpen] = useState(false);

  return (
    <Section title="Modal" description="A full-featured modal dialog with header, content area, and footer actions.">
      <PreviewComponent
        title="Modal Variants"
        code={`import { Modal } from "@/library/organisms/modal";
import { Button } from "@/library/atoms/button";

<Button onClick={() => setIsOpen(true)}>Open Modal</Button>
<Button variant="secondary" onClick={() => setIsLargeOpen(true)}>Large Modal</Button>`}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
          <Button variant="secondary" onClick={() => setIsLargeOpen(true)}>Large Modal</Button>
        </div>
      </PreviewComponent>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Profile"
        primaryLabel="Save Changes"
        secondaryLabel="Cancel"
        onPrimaryClick={() => { alert("Saved!"); setIsOpen(false); }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <TextInput label="Name" placeholder="Enter your name" />
          <TextInput label="Email" type="email" placeholder="Enter your email" />
          <Textarea label="Bio" placeholder="Tell us about yourself..." rows={3} />
        </div>
      </Modal>

      <Modal
        open={isLargeOpen}
        onClose={() => setIsLargeOpen(false)}
        title="Large Modal"
        size="lg"
        primaryLabel="Confirm"
        secondaryLabel="Cancel"
        tertiaryLabel="Reset"
      >
        <p>This is a larger modal with more content space. You can use this for forms, complex interactions, or displaying detailed information.</p>
        <div style={{ marginTop: 16, padding: 16, background: "var(--color-neutral-50)", borderRadius: 8 }}>
          <p>Additional content area</p>
        </div>
      </Modal>
    </Section>
  );
};

const TablePage = () => (
  <Section title="Table" description="A complete table system with header, body rows, and various cell types.">
    <PreviewComponent
      title="Single Type Columns"
      code={`import {
  Table,
  TableColumns,
  TableColumn,
  TABLE_COLUMN_TYPES,
} from "@/library/organisms/table/table";

<Table
  rows={singleTypeRows}
>
  <TableColumns>
    <TableColumn
      label="Name"
      type="short text"
      width="260px"
    />
    <TableColumn
      label="Email"
      type="short text"
      width="320px"
    />
    <TableColumn
      label="Action"
      type="button"
      width="120px"
      cellContainerProps={{ className: "my-action-cell" }}
    />
  </TableColumns>
</Table>`}
    >
      <p style={{ marginBottom: 16, color: "var(--color-content-secondary)", fontSize: 14 }}>
        All columns use the same cell type: short-text.
      </p>
      <Table
        columns={[
          { key: "name", header: "Name", variant: "short-text", width: "260px" },
          { key: "email", header: "Email", variant: "short-text", width: "320px" },
          { key: "role", header: "Role", variant: "short-text", width: "220px" },
          { key: "team", header: "Team", variant: "short-text", width: "220px" },
        ]}
        rows={[
          { id: "member-1", name: "John Doe", email: "john@example.com", role: "Admin", team: "Operations" },
          { id: "member-2", name: "Jane Smith", email: "jane@example.com", role: "Editor", team: "Research" },
          { id: "member-3", name: "Alice Brown", email: "alice@example.com", role: "Viewer", team: "Finance" },
        ]}
      />
    </PreviewComponent>

    <PreviewComponent
      title="All Cell Variants"
      code={`import {
  Table,
  TableColumns,
  TableColumn,
} from "@/library/organisms/table/table";

<Table
  rows={allVariantsRows}
>
  <TableColumns>
    <TableColumn label="Short Text" type="short text" />
    <TableColumn label="Long Text" type="long text" />
    <TableColumn label="Badges" type="badges" badgeProps={{ size: "sm" }} />
    <TableColumn label="Chip" type="chip" chipProps={{ chevron: false, removable: false }} />
    <TableColumn label="Checkbox" type="checkbox" />
    <TableColumn label="Link" type="link" linkProps={{ size: "md" }} />
    <TableColumn label="Text Icon" type="text icon" />
    <TableColumn label="Text Input" type="text input" textInputProps={{ label: "", helper: "" }} />
    <TableColumn label="Button" type="button" buttonProps={{ size: "sm", variant: "secondary" }} />
  </TableColumns>
</Table>`}
    >
      <p style={{ marginBottom: 16, color: "var(--color-content-secondary)", fontSize: 14 }}>
        Demonstration of clean atom-backed table column types with 10 rows.
      </p>
      <Table
        rows={Array.from({ length: 10 }, (_, index) => {
          const rowNumber = index + 1;
          const badgeLabels = ["Active", "Pending", "Blocked", "Info", "Archived"];
          const owners = ["John Doe", "Jane Smith", "Alex Brown", "Mina Lee", "Chris Park"];
          const companies = ["Acme Corp", "Globex", "Initech", "Umbrella", "Wayne Labs"];

          return {
            id: `row-${rowNumber}`,
            shortText: `Cell text ${rowNumber}`,
            longText: `Long text example ${rowNumber} for the long-text cell variant to validate overflow and layout behavior.`,
            badges: {
              maxVisible: 4,
              items: [
                { label: badgeLabels[index % badgeLabels.length] },
                { label: "Finance" },
                { label: "Priority" },
                { label: "Reviewed" },
                { label: "Owner" },
              ],
            },
            chip: {
              label: `Tag ${rowNumber}`,
              chevron: true,
              removable: true,
            },
            checkbox: {
              isSelected: index % 2 === 0,
              size: "sm",
            },
            link: {
              label: companies[index % companies.length],
              href: "#",
              size: "md",
              iconLeadingName: "Building",
              iconSize: "sm",
            },
            textIcon: {
              text: owners[index % owners.length],
              iconName: "User",
              iconSize: "sm",
            },
            textInput: {
              placeholder: "Type here",
              defaultValue: `Value ${rowNumber}`,
            },
            button: {
              label: "",
              iconName: "EllipsisVertical",
              buttonVariant: "secondary",
              buttonSize: "sm",
              buttonProps: {
                iconOnly: true,
                ariaLabel: "More actions",
              },
            },
          };
        })}
      >
        <TableColumns>
          <TableColumn label="Short Text" type="short text" width="220px" />
          <TableColumn label="Long Text" type="long text" width="320px" />
          <TableColumn
            label="Badges"
            type="badges"
            width="280px"
            maxVisible={4}
            badgeProps={{ size: "sm" }}
          />
          <TableColumn
            label="Chip"
            type="chip"
            width="180px"
            chipProps={{ chevron: false, removable: true }}
          />
          <TableColumn label="Checkbox" type="checkbox" width="120px" />
          <TableColumn label="Link" type="link" width="220px" linkProps={{ size: "md" }} />
          <TableColumn label="Text Icon" type="text icon" width="220px" />
          <TableColumn label="Text Input" type="text input" width="260px" textInputProps={{ label: "", helper: "" }} />
          <TableColumn label="Button" type="button" width="56px" sticky buttonProps={{ size: "sm", iconOnly: true, ariaLabel: "More actions" }} />
        </TableColumns>
      </Table>
    </PreviewComponent>
  </Section>
);

const ObjectHeaderPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Section title="ObjectHeader" description="A comprehensive header for object detail pages.">
      <PreviewComponent
        title="Complete ObjectHeader"
        code={`import { useState } from "react";
import {
  ObjectHeader,
  ObjectHeaderTopBar,
  ObjectHeaderTopBarLeft,
  ObjectHeaderTopBarRight,
  ObjectHeaderActionsGroup,
  ObjectHeaderDivider,
  ObjectHeaderMeta,
  ObjectHeaderTitleSection,
  ObjectHeaderTitle,
  ObjectHeaderSubinfoRow,
  ObjectHeaderSubinfoItem,
  ObjectHeaderStepperSection as ObjectHeaderStepper,
  ObjectHeaderTabs,
} from "@/library/organisms/object-header";
import { Button } from "@/library/atoms/button";
import { Icon } from "@/library/atoms/icon";
import { Chip } from "@/library/atoms/chip";
import { Link } from "@/library/atoms/link";
import { AvatarGroup } from "@/library/molecules/avatar-group";
import { Stepper } from "@/library/molecules/stepper";
import { Tabs, Tab } from "@/library/molecules/tabs";

const Example = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <ObjectHeader>
      <ObjectHeaderTopBar>
        <ObjectHeaderTopBarLeft>
          <Button variant="secondary" size="md" iconLeading={<Icon name="ArrowLeft" size="sm" />} iconTrailing={<Icon name="ChevronRight" size="sm" />}>
            Back
          </Button>
        </ObjectHeaderTopBarLeft>
        <ObjectHeaderTopBarRight>
          <ObjectHeaderActionsGroup>
            <AvatarGroup
              avatars={[
                { name: "John Doe" },
                { name: "Jane Smith" },
                { name: "Bob Wilson" },
              ]}
              max={3}
              size="sm"
            />
            <Button variant="secondary" size="md" iconLeading={<Icon name="UserPlus" size="sm" />}>
              Manage access
            </Button>
          </ObjectHeaderActionsGroup>
          <ObjectHeaderDivider />
          <ObjectHeaderActionsGroup>
            <Button variant="secondary" size="md" iconLeading={<Icon name="Bookmark" size="sm" />} />
            <Button variant="secondary" size="md" iconLeading={<Icon name="Share" size="sm" />} />
          </ObjectHeaderActionsGroup>
        </ObjectHeaderTopBarRight>
      </ObjectHeaderTopBar>

      <ObjectHeaderTitleSection>
        <ObjectHeaderMeta
          label="Last updated on"
          date="Tue, Oct 21, 2024"
          time="9:21 PM"
          author="John Doe"
        />
        <ObjectHeaderTitle iconName="LockClosed" iconVariant="warning">
          Deal Title - Example Project
        </ObjectHeaderTitle>
      </ObjectHeaderTitleSection>

      <ObjectHeaderSubinfoRow>
        <ObjectHeaderSubinfoItem>
          <Chip variant="positive">Active</Chip>
        </ObjectHeaderSubinfoItem>
        <ObjectHeaderSubinfoItem>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 12, color: "var(--color-content-secondary)" }}>Owner</span>
            <span style={{ fontSize: 14, color: "var(--color-content-primary)" }}>Emma Dupont</span>
          </div>
        </ObjectHeaderSubinfoItem>
        <ObjectHeaderSubinfoItem>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 12, color: "var(--color-content-secondary)" }}>Company</span>
            <Link href="#">Abbvie Limited</Link>
          </div>
        </ObjectHeaderSubinfoItem>
      </ObjectHeaderSubinfoRow>

      <ObjectHeaderStepper>
        <Stepper
          currentStep={3}
          steps={[
            { title: "Draft", subtitle: "Jul 15, 2024" },
            { title: "Review", subtitle: "Jul 20, 2024" },
            { title: "Evaluation", subtitle: "Jul 25, 2024" },
            { title: "Due Diligence", subtitle: "In Progress" },
            { title: "Negotiation" },
            { title: "Contracting" },
            { title: "Signed" },
          ]}
        />
      </ObjectHeaderStepper>

      <ObjectHeaderTabs>
        <Tabs selectedKey={activeTab} onSelectionChange={setActiveTab}>
          <Tab id="overview">Overview</Tab>
          <Tab id="details">Details</Tab>
          <Tab id="meetings" badge={5}>Meetings</Tab>
          <Tab id="contacts" badge={12}>Contacts</Tab>
          <Tab id="attachments" badge={3}>Attachments</Tab>
        </Tabs>
      </ObjectHeaderTabs>
    </ObjectHeader>
  );
};`}
      >
        <ObjectHeader>
            <ObjectHeaderTopBar>
              <ObjectHeaderTopBarLeft>
                <Button variant="secondary" size="md" iconLeading={<Icon name="ArrowLeft" size="sm" />}>
                  Back
                </Button>
              </ObjectHeaderTopBarLeft>
              <ObjectHeaderTopBarRight>
                <ObjectHeaderActionsGroup>
                  <AvatarGroup
                    avatars={[
                      { name: "John Doe" },
                      { name: "Jane Smith" },
                      { name: "Bob Wilson" },
                    ]}
                    max={3}
                    size="sm"
                  />
                  <Button variant="secondary" size="md" iconLeading={<Icon name="UserPlus" size="sm" />}>
                    Manage access
                  </Button>
                </ObjectHeaderActionsGroup>
                <ObjectHeaderDivider />
                <ObjectHeaderActionsGroup>
                  <Button variant="secondary" size="md" iconLeading={<Icon name="Bookmark" size="sm" />} />
                  <Button variant="secondary" size="md" iconLeading={<Icon name="Share" size="sm" />} />
                </ObjectHeaderActionsGroup>
              </ObjectHeaderTopBarRight>
            </ObjectHeaderTopBar>

            <ObjectHeaderTitleSection>
              <ObjectHeaderMeta date="Jan 15, 2024" />
              <ObjectHeaderTitle iconName="Document">Simple Document Title</ObjectHeaderTitle>
            </ObjectHeaderTitleSection>

            <ObjectHeaderStepper>
              <Stepper
                currentStep={2}
                steps={[
                  { title: "Draft" },
                  { title: "Review" },
                  { title: "Approved" },
                  { title: "Active" },
                ]}
              />
            </ObjectHeaderStepper>

            <ObjectHeaderTabs>
              <Tabs selectedKey={activeTab} onSelectionChange={setActiveTab}>
                <Tab id="overview">Overview</Tab>
                <Tab id="details">Details</Tab>
                <Tab id="history">History</Tab>
              </Tabs>
            </ObjectHeaderTabs>
        </ObjectHeader>
      </PreviewComponent>

      <PreviewComponent
        title="Simple Header (No Stepper or Tabs)"
        code={`import {
  ObjectHeader,
  ObjectHeaderTopBar,
  ObjectHeaderTopBarLeft,
  ObjectHeaderTopBarRight,
  ObjectHeaderActionsGroup,
  ObjectHeaderMeta,
  ObjectHeaderTitleSection,
  ObjectHeaderTitle,
} from "@/library/organisms/object-header";
import { Button } from "@/library/atoms/button";
import { Icon } from "@/library/atoms/icon";

<ObjectHeader>
  <ObjectHeaderTopBar>
    <ObjectHeaderTopBarLeft>
      <Button variant="secondary" size="md" iconLeading={<Icon name="ArrowLeft" size="sm" />}>
        Back to list
      </Button>
    </ObjectHeaderTopBarLeft>
    <ObjectHeaderTopBarRight>
      <ObjectHeaderActionsGroup>
        <Button variant="primary" size="md">Save</Button>
        <Button variant="secondary" size="md" iconLeading={<Icon name="EllipsisVertical" size="sm" />} />
      </ObjectHeaderActionsGroup>
    </ObjectHeaderTopBarRight>
  </ObjectHeaderTopBar>

  <ObjectHeaderTitleSection>
    <ObjectHeaderMeta date="Jan 15, 2024" />
    <ObjectHeaderTitle iconName="Document">
      Simple Document Title
    </ObjectHeaderTitle>
  </ObjectHeaderTitleSection>
</ObjectHeader>`}
      >
        <ObjectHeader>
            <ObjectHeaderTopBar>
              <ObjectHeaderTopBarLeft>
                <Button variant="secondary" size="md" iconLeading={<Icon name="ArrowLeft" size="sm" />}>
                  Back to list
                </Button>
              </ObjectHeaderTopBarLeft>
              <ObjectHeaderTopBarRight>
                <ObjectHeaderActionsGroup>
                  <Button variant="primary" size="md">Save</Button>
                  <Button variant="secondary" size="md" iconLeading={<Icon name="EllipsisVertical" size="sm" />} />
                </ObjectHeaderActionsGroup>
              </ObjectHeaderTopBarRight>
            </ObjectHeaderTopBar>

            <ObjectHeaderTitleSection>
              <ObjectHeaderMeta date="Jan 15, 2024" />
              <ObjectHeaderTitle iconName="Document">
                Simple Document Title
              </ObjectHeaderTitle>
            </ObjectHeaderTitleSection>
        </ObjectHeader>
      </PreviewComponent>
    </Section>
  );
};

const HubHeaderPage = () => (
  <Section title="HubHeader" description="A flexible page-section header for list and detail views.">
    <PreviewComponent
      title="List Variant (Default)"
      code={`import { HubHeader } from "@/library/organisms/hub-header";

<HubHeader>
  <HubHeader.Row>
    <HubHeader.Left>
      <HubHeader.Title badge="124">Companies</HubHeader.Title>
    </HubHeader.Left>
    <HubHeader.Right>
      <HubHeader.Actions>
        <HubHeader.Button variant="secondary" size="md" iconLeading={<HubHeader.Icon name="ArrowDownTray" size="sm" />}>
          Export
        </HubHeader.Button>
        <HubHeader.Button variant="primary" size="md" iconLeading={<HubHeader.Icon name="Plus" size="sm" />}>
          Add Company
        </HubHeader.Button>
      </HubHeader.Actions>
    </HubHeader.Right>
  </HubHeader.Row>
</HubHeader>`}
    >
      <HubHeader>
        <HubHeaderRow>
          <HubHeaderLeft>
            <HubHeaderTitle badge="124">Companies</HubHeaderTitle>
          </HubHeaderLeft>
          <HubHeaderRight>
            <HubHeaderActions>
              <HubHeader.Button variant="secondary" size="md" iconLeading={<HubHeader.Icon name="ArrowDownTray" size="sm" />}>Export</HubHeader.Button>
              <HubHeader.Button variant="primary" size="md" iconLeading={<HubHeader.Icon name="Plus" size="sm" />}>Add Company</HubHeader.Button>
            </HubHeaderActions>
          </HubHeaderRight>
        </HubHeaderRow>
      </HubHeader>
    </PreviewComponent>

    <PreviewComponent
      title="With Controls"
      code={`import { HubHeader } from "@/library/organisms/hub-header";

<HubHeader>
  <HubHeader.Row>
    <HubHeader.Left>
      <HubHeader.Label badge="12">Portfolio</HubHeader.Label>
      <HubHeader.Controls>
        <HubHeader.Search size="md" placeholder="Search..." />
        <HubHeader.Button variant="secondary" size="md" iconLeading={<HubHeader.Icon name="Funnel" size="sm" />}>
          Filter
        </HubHeader.Button>
      </HubHeader.Controls>
    </HubHeader.Left>
    <HubHeader.Right>
      <HubHeader.Actions>
        <HubHeader.Button variant="secondary" size="md" iconLeading={<HubHeader.Icon name="ArrowDownTray" size="sm" />}>
          Export
        </HubHeader.Button>
        <HubHeader.Button variant="primary" size="md" iconLeading={<HubHeader.Icon name="Plus" size="sm" />}>
          Create
        </HubHeader.Button>
      </HubHeader.Actions>
    </HubHeader.Right>
  </HubHeader.Row>
</HubHeader>`}
    >
      <HubHeader>
        <HubHeaderRow>
          <HubHeaderLeft>
            <HubHeaderLabel badge="12">Portfolio</HubHeaderLabel>
            <HubHeaderControls>
              <HubHeader.Search size="md" placeholder="Search..." />
              <HubHeader.Button variant="secondary" size="md" iconLeading={<HubHeader.Icon name="Funnel" size="sm" />}>Filter</HubHeader.Button>
            </HubHeaderControls>
          </HubHeaderLeft>
          <HubHeaderRight>
            <HubHeaderActions>
              <HubHeader.Button variant="secondary" size="md" iconLeading={<HubHeader.Icon name="ArrowDownTray" size="sm" />}>Export</HubHeader.Button>
              <HubHeader.Button variant="primary" size="md" iconLeading={<HubHeader.Icon name="Plus" size="sm" />}>Create</HubHeader.Button>
            </HubHeaderActions>
          </HubHeaderRight>
        </HubHeaderRow>
      </HubHeader>
    </PreviewComponent>

    <PreviewComponent
      title="Detail Variant with Back Button"
      code={`import { HubHeader } from "@/library/organisms/hub-header";

<HubHeader>
  <HubHeader.Row>
    <HubHeader.Left>
      <HubHeader.Button
        variant="secondary"
        size="md"
        iconLeading={<HubHeader.Icon name="ArrowLeft" />}
        onClick={() => {}}
      >
        Back
      </HubHeader.Button>
      <HubHeader.Title size="lg" badge="Active">Company Name</HubHeader.Title>
    </HubHeader.Left>
    <HubHeader.Right>
      <HubHeader.Actions>
        <HubHeader.Button variant="primary" size="md">Save</HubHeader.Button>
        <HubHeader.Button variant="secondary" size="md" iconLeading={<HubHeader.Icon name="EllipsisVertical" size="sm" />} />
      </HubHeader.Actions>
    </HubHeader.Right>
  </HubHeader.Row>
  <HubHeader.Secondary>
    <ButtonGroup value="overview">
      <ButtonGroupItem value="overview">Overview</ButtonGroupItem>
      <ButtonGroupItem value="details">Details</ButtonGroupItem>
      <ButtonGroupItem value="history">History</ButtonGroupItem>
    </ButtonGroup>
  </HubHeader.Secondary>
</HubHeader>`}
    >
      <HubHeader>
        <HubHeaderRow>
          <HubHeaderLeft>
            <HubHeader.Button variant="secondary" size="md" iconLeading={<HubHeader.Icon name="ArrowLeft" />} onClick={() => alert("Back clicked")}>Back</HubHeader.Button>
            <HubHeaderTitle size="lg" badge="Active">Company Name</HubHeaderTitle>
          </HubHeaderLeft>
          <HubHeaderRight>
            <HubHeaderActions>
              <HubHeader.Button variant="primary" size="md">Save</HubHeader.Button>
              <HubHeader.Button variant="secondary" size="md" iconLeading={<HubHeader.Icon name="EllipsisVertical" size="sm" />} />
            </HubHeaderActions>
          </HubHeaderRight>
        </HubHeaderRow>
        <HubHeaderSecondary>
          <ButtonGroup value="overview">
            <ButtonGroupItem value="overview">Overview</ButtonGroupItem>
            <ButtonGroupItem value="details">Details</ButtonGroupItem>
            <ButtonGroupItem value="history">History</ButtonGroupItem>
          </ButtonGroup>
        </HubHeaderSecondary>
      </HubHeader>
    </PreviewComponent>

    <PreviewComponent
      title="Composition Mode"
      code={`import { HubHeader, HubHeaderRow, HubHeaderLeft, HubHeaderRight } from "@/library/organisms/hub-header";

<HubHeader showBorder={false}>
  <HubHeaderRow>{/* custom layout */}</HubHeaderRow>
</HubHeader>`}
    >
      <HubHeader showBorder={false}>
          <HubHeaderRow>
            <HubHeaderLeft>
              <HubHeaderTitle size="md" badge="New">Dashboard</HubHeaderTitle>
            </HubHeaderLeft>
            <HubHeaderRight>
              <HubHeaderActions>
                <HubHeader.Button variant="primary" size="md">Action</HubHeader.Button>
              </HubHeaderActions>
            </HubHeaderRight>
          </HubHeaderRow>
          <HubHeaderSecondary>
            <HubHeader.Tabs defaultSelectedKey="all">
              <HubHeader.Tab id="all">All</HubHeader.Tab>
              <HubHeader.Tab id="active">Active</HubHeader.Tab>
              <HubHeader.Tab id="archived">Archived</HubHeader.Tab>
            </HubHeader.Tabs>
          </HubHeaderSecondary>
      </HubHeader>
    </PreviewComponent>

    <PreviewComponent
      title="Title Sizes"
      code={`import { HubHeader } from "@/library/organisms/hub-header";

<HubHeader showBorder={false}>
  <HubHeader.Row>
    <HubHeader.Left>
      <HubHeader.Title size="sm">Small Title</HubHeader.Title>
    </HubHeader.Left>
  </HubHeader.Row>
</HubHeader>
<HubHeader showBorder={false}>
  <HubHeader.Row>
    <HubHeader.Left>
      <HubHeader.Title size="md">Medium Title</HubHeader.Title>
    </HubHeader.Left>
  </HubHeader.Row>
</HubHeader>
<HubHeader showBorder={false}>
  <HubHeader.Row>
    <HubHeader.Left>
      <HubHeader.Title size="lg">Large Title</HubHeader.Title>
    </HubHeader.Left>
  </HubHeader.Row>
</HubHeader>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <HubHeader showBorder={false}>
          <HubHeaderRow>
            <HubHeaderLeft>
              <HubHeaderTitle size="sm">Small Title</HubHeaderTitle>
            </HubHeaderLeft>
          </HubHeaderRow>
        </HubHeader>
        <HubHeader showBorder={false}>
          <HubHeaderRow>
            <HubHeaderLeft>
              <HubHeaderTitle size="md">Medium Title</HubHeaderTitle>
            </HubHeaderLeft>
          </HubHeaderRow>
        </HubHeader>
        <HubHeader showBorder={false}>
          <HubHeaderRow>
            <HubHeaderLeft>
              <HubHeaderTitle size="lg">Large Title</HubHeaderTitle>
            </HubHeaderLeft>
          </HubHeaderRow>
        </HubHeader>
      </div>
    </PreviewComponent>
  </Section>
);

const FilterPanelPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [appliedFilters, setAppliedFilters] = useState([]);

  const demoRows = [
    { id: 1, name: "Acme Corp", status: "Active", owner: "Emma Dupont", updated: "2026-03-12" },
    { id: 2, name: "Helix Labs", status: "On Hold", owner: "Noah Singh", updated: "2026-03-03" },
    { id: 3, name: "Northfield", status: "Declined", owner: "Mina Lee", updated: "2026-02-25" },
    { id: 4, name: "Orbit Bio", status: "Closed", owner: "Ava Martin", updated: "2026-02-19" },
  ];

  const demoColumns = [
    { key: "name", label: "Company", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "owner", label: "Owner", sortable: true },
    { key: "updated", label: "Last Updated", sortable: true },
  ];

  const demoMenuSections = [
    {
      title: "Main",
      items: [
        { label: "Hub", iconName: "Home", isActive: true },
        { label: "Pipeline", iconName: "Squares2X2" },
      ],
    },
  ];

  const demoMenuUser = {
    name: "Emma Dupont",
    email: "emma.dupont@inpart.io",
  };

  return (
    <Section title="FilterPanel" description="Filter panel behavior in context: Add/More opens the side panel, active chips open inline dropdown editors.">
      <PreviewComponent
        title="FilterPanel Row API (Simple)"
        code={`import { Row } from "@/library/organisms/filter-panel";

<Row type="Type:" label="Status" badges={["2"]} onClick={() => {}} />
<Row type="Type:" label="Owner" />`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 360 }}>
          <FilterPanelRow type="Type:" label="Status" badges={["2"]} onClick={() => {}} />
          <FilterPanelRow type="Type:" label="Owner" onClick={() => {}} />
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Hub + FilterPanel Interaction"
        code={`import { useState } from "react";
import { Hub } from "@/library/templates/hub";
    import { Row, DEFAULT_FILTER_PANEL_OPTIONS } from "@/library/organisms/filter-panel";

const [currentPage, setCurrentPage] = useState(1);
const [pageSize, setPageSize] = useState(10);
const [appliedFilters, setAppliedFilters] = useState([]);

    <Row type="Suggestion:" label="Status" badges={["2"]} onClick={() => {}} />
    <Row type="Suggestion:" label="Name" onClick={() => {}} />
    <Row type="Company:" label="Country" onClick={() => {}} />
    <Row type="Agreement:" label="Agreement type" onClick={() => {}} />

<Hub
  title="Companies"
  badge="24"
  showSideMenu={false}
  menuSections={demoMenuSections}
  menuUser={demoMenuUser}
  columns={demoColumns}
  data={demoRows}
  currentPage={currentPage}
  totalPages={4}
  pageSize={pageSize}
  onPageChange={setCurrentPage}
  onPageSizeChange={setPageSize}
  filterSuggestions={DEFAULT_FILTER_PANEL_OPTIONS.suggestions}
  filterOptions={DEFAULT_FILTER_PANEL_OPTIONS.allFilters}
  filterIncludedSuggestionKeys={["status", "name"]}
  filterIncludedFilterKeys={["status", "name", "country", "agreement-type"]}
  filterIncludedGroupKeys={["company", "agreement"]}
  filterMaxGroupCount={2}
  onFiltersApply={setAppliedFilters}
/>

// Behavior:
// 1. Click Add filters / More filters -> opens side panel
// 2. Apply filters -> chips appear above table
// 3. Click a chip -> opens inline dropdown editor for that filter
// 4. Chip order on right: badge, chevron, cross`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ margin: 0, fontSize: 14, color: "var(--color-content-secondary)" }}>
            This preview uses the real Hub integration so the behavior matches production: active chips open inline dropdown editors, while Add/More filters opens the side panel.
          </p>

          <div style={{ height: 620, borderRadius: 8, overflow: "hidden", border: "1px solid var(--color-action-outline-secondary-enabled)" }}>
            <Hub
              title="Companies"
              badge="24"
              showSideMenu={false}
              menuSections={demoMenuSections}
              menuUser={demoMenuUser}
              columns={demoColumns}
              data={demoRows}
              currentPage={currentPage}
              totalPages={4}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
              filterSuggestions={DEFAULT_FILTER_PANEL_OPTIONS.suggestions}
              filterOptions={DEFAULT_FILTER_PANEL_OPTIONS.allFilters}
              filterIncludedSuggestionKeys={["status", "name"]}
              filterIncludedFilterKeys={["status", "name", "country", "agreement-type"]}
              filterIncludedGroupKeys={["company", "agreement"]}
              filterMaxGroupCount={2}
              onFiltersApply={setAppliedFilters}
            />
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Badge color="neutral">Applied filters: {appliedFilters.length}</Badge>
            <Badge color="neutral">{"Flow: Add/More -> side panel"}</Badge>
            <Badge color="neutral">{"Flow: Chip -> dropdown editor"}</Badge>
          </div>
        </div>
      </PreviewComponent>
    </Section>
  );
};

const PaginationOrganismPage = () => {
  const [page, setPage] = useState(4);
  const [pageSize, setPageSize] = useState(10);

  return (
    <Section title="Pagination (Organism)" description="A complete pagination control with page size selector, page navigation, and optional action button.">
      <PreviewComponent
        title="Full Pagination"
        code={`import { Pagination as PaginationOrganism } from "@/library/organisms/pagination";

<PaginationOrganism currentPage={page} totalPages={8} pageSize={pageSize} />`}
      >
        <PaginationOrganism
            currentPage={page}
            totalPages={8}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
        />
        <p style={{ marginTop: 16, color: "var(--color-content-secondary)", fontSize: 14 }}>
          Current page: {page}, Page size: {pageSize}
        </p>
      </PreviewComponent>

      <PreviewComponent
        title="Without Page Numbers"
        code={`<PaginationOrganism showPageNumbers={false} showInfo />`}
      >
        <PaginationOrganism
            currentPage={page}
            totalPages={8}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            showPageNumbers={false}
            showInfo
        />
      </PreviewComponent>

      <PreviewComponent
        title="With Custom Action"
        code={`<PaginationOrganism actionButton={<Button variant="secondary">Download</Button>} />`}
      >
        <PaginationOrganism
            currentPage={page}
            totalPages={8}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            actionButton={
              <Button variant="secondary" size="md" iconLeading={<Icon name="ArrowDownTray" size="sm" />}>
                Download
              </Button>
            }
        />
      </PreviewComponent>

      <PreviewComponent
        title="Minimal (No Per Page)"
        code={`<PaginationOrganism showPerPage={false} />`}
      >
        <PaginationOrganism
            currentPage={page}
            totalPages={8}
            onPageChange={setPage}
            showPerPage={false}
        />
      </PreviewComponent>
    </Section>
  );
};

const DOCUMENT_VIEWER_SAMPLE_TEXT = `1. Milestone Payment Obligation

1.1 ABC agrees to make milestone payments to TO upon the achievement of the following milestones related to the licensed product, "Product X".

- Milestone 1: Successful completion of Phase II clinical trials - $1,000,000
- Milestone 2: Regulatory approval from FDA - $2,500,000
- Milestone 3: First commercial sale in the United States - $3,500,000

2. Audit Rights

2.1 TO shall provide written notice to ABC within fifteen days of achieving each milestone, accompanied by supporting documentation evidencing the achievement of the milestone.

2.2 ABC shall have the right to audit TO's records to verify the accuracy of the milestone achievement and payment calculations.

3. Term

3.1 This milestone payment obligation shall remain in effect until all milestone payments have been made or until the termination of this Agreement.

4. Governing Law

4.1 This Agreement shall be governed by and construed in accordance with the laws of the relevant jurisdiction, without regard to its conflict of law provisions.

5. Entire Agreement

5.1 This Agreement constitutes the entire agreement between the parties with respect to the subject matter and supersedes all prior discussions, negotiations, and understandings.

6. Confidentiality

6.1 Each party agrees to maintain the confidentiality of all proprietary and confidential information disclosed by the other party during the term of this Agreement.

7. Indemnification

7.1 Each party shall indemnify and hold harmless the other party from any third-party claims arising out of a material breach of this Agreement.

8. Limitation of Liability

8.1 Except for confidentiality breaches or willful misconduct, neither party shall be liable for consequential, incidental, or special damages.

9. Notices

9.1 All notices under this Agreement shall be in writing and delivered by recognized courier, certified mail, or electronic mail to the designated contacts of each party.

10. Counterparts

10.1 This Agreement may be executed in counterparts, each of which shall be deemed an original and all of which together shall constitute one instrument.`;

const DocumentViewerOrganismPage = () => {
  const [editablePages, setEditablePages] = useState(() =>
    DocumentViewer.paginateTextToPages({
      text: DOCUMENT_VIEWER_SAMPLE_TEXT,
      maxCharactersPerPage: 700,
    })
  );
  const [commentThread, setCommentThread] = useState([
    {
      id: "review-note",
      author: "Linh Nguyen",
      initials: "LN",
      timestamp: "6 days ago",
      content: "Can we add this mini infobox please Shreejala Tuladhar",
    },
    {
      id: "reply-note",
      author: "Shreejala Tuladhar",
      initials: "ST",
      timestamp: "5 hours ago",
      content: "Pragya Gyawali",
    },
  ]);

  return (
    <Section title="DocumentViewer" description="A reusable document review organism with PDF support and text pagination. Vertical scrolling with fixed height container, zoom controls, and PDF export.">
      <PreviewComponent
        title="Read-only PDF"
        code={`import pharmaAgreementPdf from "@/library/organisms/document-viewer/pharma_agreement.pdf";
import { DocumentViewer } from "@/library/organisms/document-viewer";

<DocumentViewer
  pdfFile={pharmaAgreementPdf}
  editable={false}
  showEditToolbar={false}
  exportFileName="pharma-agreement"
  defaultZoom={0.8}
/>`}
      >
        <div style={{ minHeight: 700 }}>
          <DocumentViewer
            pdfFile={pharmaAgreementPdf}
            editable={false}
            showEditToolbar={false}
            exportFileName="pharma-agreement"
            defaultZoom={0.8}
          />
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Editable Text With Comments"
        code={`import { useState } from "react";
import { DocumentViewer } from "@/library/organisms/document-viewer";

const [pages, setPages] = useState(
  DocumentViewer.paginateTextToPages({ text: longText, maxCharactersPerPage: 700 })
);
const [commentThread, setCommentThread] = useState([
  { id: "review-note", author: "Linh Nguyen", initials: "LN", timestamp: "6 days ago", content: "Can we add this mini infobox please Shreejala Tuladhar" },
]);

<DocumentViewer
  pages={pages}
  editable={true}
  showEditToolbar={true}
  defaultLiveChanges={true}
  showCommentPopover={true}
  commentThread={commentThread}
  onEditablePagesChange={setPages}
  onCommentSubmit={(content) =>
    setCommentThread((comments) => [
      ...comments,
      { id: crypto.randomUUID(), author: "Linh Nguyen", initials: "LN", timestamp: "Now", content },
    ])
  }
/>`}
      >
        <div style={{ minHeight: 700 }}>
          <DocumentViewer
            pages={editablePages}
            editable
            showEditToolbar
            defaultLiveChanges
            showCommentPopover
            onEditablePagesChange={setEditablePages}
            commentThread={commentThread}
            onCommentSubmit={(content) => {
              setCommentThread((comments) => [
                ...comments,
                {
                  id: crypto.randomUUID(),
                  author: "Linh Nguyen",
                  initials: "LN",
                  timestamp: "Now",
                  content,
                },
              ]);
            }}
          />
        </div>
      </PreviewComponent>

      <PreviewComponent
        title="Read-only Text"
        code={`<DocumentViewer
  text={longText}
  editable={false}
  showEditToolbar={false}
/>`}
      >
        <div style={{ minHeight: 700 }}>
          <DocumentViewer text={DOCUMENT_VIEWER_SAMPLE_TEXT} editable={false} showEditToolbar={false} />
        </div>
      </PreviewComponent>
    </Section>
  );
};

const CreationFormPanelPage = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const totalItems = 5;

  return (
    <Section title="CreationFormPanel" description="A sticky-header form panel with optional navigation and footer actions for extraction and review flows.">
      <PreviewComponent
        title="Creation Flow Panel"
        code={`import { useState } from "react";
import { CreationFormPanel } from "@/library/organisms/section/creation-form-panel";
import { TextInput } from "@/library/molecules/text-input";
import { Badge } from "@/library/atoms/badge";

const [currentIndex, setCurrentIndex] = useState(2);

<CreationFormPanel
  title="Review extraction"
  headerButtons={[
    {
      ariaLabel: "Info",
      variant: "secondary",
      size: "md",
      iconLeading: <Icon name="InformationCircle" size="sm" />,
    },
  ]}
  infoMessage="Inaccuracies may occur with AI. Please review carefully."
  showNavigation
  navigationTitle="Opportunity name"
  currentIndex={currentIndex}
  totalItems={5}
  onPrevious={() => setCurrentIndex((prev) => Math.max(1, prev - 1))}
  onNext={() => setCurrentIndex((prev) => Math.min(5, prev + 1))}
  hasPrevious={currentIndex > 1}
  hasNext={currentIndex < 5}
  footerButtons={[
    { label: "Discard", position: "left", variant: "secondary", color: "secondary-destructive" },
    { label: "Create", position: "right", variant: "primary" },
  ]}
>
  <CreationFormPanel.Section title="Opportunities" badge={<Badge size="sm">3</Badge>} collapsible={false}>
    <TextInput label="Opportunity name" isRequired value="NeuroVanta Therapeutics - NVT-101" onChange={() => {}} />
    <TextInput label="Therapeutic area" value="Oncology" onChange={() => {}} />
  </CreationFormPanel.Section>

  <CreationFormPanel.Divider />

  <CreationFormPanel.Section title="Additional information" defaultExpanded={false}>
    <TextInput label="Development phase" value="Phase I" onChange={() => {}} />
    <TextInput label="Drug type" value="Antibody-Drug Conjugate" onChange={() => {}} />
  </CreationFormPanel.Section>
</CreationFormPanel>`}
      >
        <div style={{ height: 680 }}>
          <CreationFormPanel
            title="Review extraction"
            headerButtons={[
              {
                ariaLabel: "Information",
                variant: "secondary",
                size: "md",
                iconLeading: <Icon name="InformationCircle" size="sm" />,
              },
            ]}
            infoMessage="Inaccuracies may occur with AI. Please review carefully."
            showNavigation
            navigationTitle="Opportunity name"
            currentIndex={currentIndex}
            totalItems={totalItems}
            onPrevious={() => setCurrentIndex((prev) => Math.max(1, prev - 1))}
            onNext={() => setCurrentIndex((prev) => Math.min(totalItems, prev + 1))}
            hasPrevious={currentIndex > 1}
            hasNext={currentIndex < totalItems}
            footerButtons={[
              {
                label: "Discard",
                variant: "secondary",
                color: "secondary-destructive",
                position: "left",
              },
              {
                label: "Create",
                variant: "primary",
                position: "right",
              },
            ]}
          >
            <CreationFormPanel.Section
              title="Opportunities"
              badge={<Badge size="sm">3</Badge>}
              collapsible={false}
            >
              <TextInput
                label="Opportunity name"
                isRequired
                value="NeuroVanta Therapeutics - NVT-101"
                onChange={() => {}}
              />
              <TextInput
                label="Therapeutic area"
                value="Oncology"
                onChange={() => {}}
              />
            </CreationFormPanel.Section>

            <CreationFormPanel.Divider />

            <CreationFormPanel.Section
              title="Additional information"
              defaultExpanded={false}
            >
              <TextInput
                label="Development phase"
                value="Phase I"
                onChange={() => {}}
              />
              <TextInput
                label="Drug type"
                value="Antibody-Drug Conjugate"
                onChange={() => {}}
              />
            </CreationFormPanel.Section>
          </CreationFormPanel>
        </div>
      </PreviewComponent>
    </Section>
  );
};

// ─────────────────────────────────────────────
// TEMPLATE PAGES
// ─────────────────────────────────────────────

const SIDE_PANEL_DEMO_ROWS = [
  {
    id: "row-1",
    name: "Acme Partnership",
    status: "Active",
    owner: "Emma Dupont",
    phase: "Negotiation",
    updated: "Jan 15, 2024",
  },
  {
    id: "row-2",
    name: "Global Alliance",
    status: "Pending",
    owner: "John Carter",
    phase: "Review",
    updated: "Feb 3, 2024",
  },
  {
    id: "row-3",
    name: "Tech Venture",
    status: "Draft",
    owner: "Yuki Tanaka",
    phase: "Drafting",
    updated: "Mar 10, 2024",
  },
  {
    id: "row-4",
    name: "Summit Initiative",
    status: "Approved",
    owner: "Sara Webb",
    phase: "Approved",
    updated: "Apr 22, 2024",
  },
];

const SIDE_PANEL_STEPS = [
  { title: "Draft" },
  { title: "Review" },
  { title: "Approved" },
  { title: "Published" },
];

const DocumentViewerPageTemplatePage = () => {

  // Add TextInput import at component level for usage in demo
  const [obligations, setObligations] = useState([
    { id: 1, title: "Clause 1.1", status: "created" },
    { id: 2, title: "Clause 1.2", status: "created" },
  ]);

  // Fix: Add missing state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleAddObligation = () => {
    const newId = Math.max(...obligations.map(o => o.id), 0) + 1;
    setObligations([...obligations, { id: newId, title: `Clause ${newId}`, status: "created" }]);
  };

  const handleRemoveObligation = (id) => {
    setObligations(obligations.filter(o => o.id !== id));
  };

  return (
    <Section title="DocumentViewerPage Template" description="A complete page layout for document review with side-by-side form panel.">
      <PreviewComponent
        title="DocumentViewerPage Template Preview"
        code={`import { DocumentViewerPage } from "@/library/templates/document-viewer-page";
import { TextInput } from "@/library/molecules/text-input";
import { Button } from "@/library/atoms/button";

export default function ObligationExtractor() {
  const [obligations, setObligations] = useState([]);
  
  return (
    <DocumentViewerPage
      showSideMenu={true}
      logoSrc="/Inpart.svg"
      collapsedLogoSrc="/Inpart1.svg"
      
      headerTitle="Extract all Obligation"
      
      pdfFile="./path/to/document.pdf"
      defaultZoom={0.5}
      showToolbar={true}
      exportFileName="document"
      
      formHeaderTitle="Extracted obligations"
      formContent={
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <TextInput
            label="Obligation Title"
            placeholder="Enter obligation title"
          />
          <TextInput
            label="Description"
            placeholder="Enter description"
            multiline
            rows={4}
          />
          <TextInput
            label="Due Date"
            placeholder="YYYY-MM-DD"
            type="date"
          />
          <Button variant="primary" fullWidth>
            Add Obligation
          </Button>
          
          {/* List of extracted obligations */}
          {obligations.map((ob, idx) => (
            <div key={idx} style={{ padding: 12, background: "var(--color-general-neutral-light)", borderRadius: 4 }}>
              {ob.title}
            </div>
          ))}
        </div>
      }
      
      footerButtons={[
        { label: "Go back" },
        { label: "Save & Extract", variant: "primary" }
      ]}
    />
  );
}`}
      >
        <p style={{ marginBottom: 16, color: "var(--color-content-secondary)", fontSize: 14 }}>
          The DocumentViewerPage template combines SideMenu (deal variant), document viewer, and form panel into a complete page layout.
          The form content supports any components - TextInput, TextArea, Buttons, etc.
        </p>
        <div style={{ height: 700, border: "1px solid var(--color-neutral-200)", borderRadius: 8, overflow: "hidden" }}>
          <div style={{ display: "flex", height: "100%", background: "var(--color-general-neutral-light)" }}>
            {/* Mini Sidebar Preview */}
            <div style={{ width: 200, borderRight: "1px solid var(--color-action-outline-secondary-enabled)", overflow: "hidden" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--color-content-brand)", marginBottom: 24 }}>Eureka</div>
              <div style={{ fontSize: 12, color: "var(--color-content-secondary)" }}>Side Menu Preview</div>
            </div>

            {/* Main Content Preview */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              {/* Header */}
              <div style={{ padding: 16, background: "var(--color-general-white)", borderBottom: "1px solid var(--color-action-outline-secondary-enabled)" }}>
                <HubHeader
                  title="Companies"
                  badge="124"
                  showBorder={false}
                  rightContent={
                    <HubHeaderActions>
                      <Button variant="primary" size="sm">Add Company</Button>
                    </HubHeaderActions>
                  }
                />
              </div>

              {/* Table Area */}
              <div style={{ flex: 1, padding: 16, overflow: "auto" }}>
                <Table
                  columns={[
                    { key: "name", header: "Company Name", variant: "short-text", sortable: true, width: "300px" },
                    { key: "status", header: "Status", variant: "badge", sortable: false, width: "300px" },
                    { key: "revenue", header: "Revenue", variant: "short-text", sortable: true, width: "300px" },
                    { key: "employees", header: "Employees", variant: "short-text", sortable: true, width: "300px" },
                  ]}
                  rows={SIDE_PANEL_DEMO_ROWS}
                  onRowClick={({ row }) => handleRowClick({ row })}
                />
              </div>

              {/* Footer with Pagination */}
              <div style={{ padding: 16, background: "var(--color-general-white)", borderTop: "1px solid var(--color-action-outline-secondary-enabled)" }}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={10}
                  perPage={pageSize}
                  onPageChange={setCurrentPage}
                  onPerPageChange={setPageSize}
                  showPerPage
                />
              </div>
            </div>
          </div>
        </div>
      </PreviewComponent>
    </Section>
  );
};

const SidePanelPage = () => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [fullPageOpen, setFullPageOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = ({ row }) => {
    setSelectedRow(row ?? null);
    setPanelOpen(true);
  };

  const handlePanelOpen = () => {
    setPanelOpen(false);
    setFullPageOpen(true);
  };

  const handlePanelClose = () => {
    setPanelOpen(false);
  };

  const handleFullPageBack = () => {
    setFullPageOpen(false);
  };

  const stepIndex = SIDE_PANEL_STEPS.findIndex(
    (s) => s.title === (selectedRow?.phase ?? "Draft")
  );
  const currentStep = stepIndex >= 0 ? stepIndex : 0;

  const subinfoItems = selectedRow
    ? [
        { label: "Owner", value: selectedRow.owner },
        { label: "Status", value: selectedRow.status },
        { label: "Phase", value: selectedRow.phase },
      ]
    : [];

  const panelSections = [
    {
      id: "overview",
      title: "Overview",
      defaultExpanded: true,
      content: selectedRow ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Infofield label="Name" value={selectedRow.name} />
          <Infofield label="Owner" value={selectedRow.owner} />
          <Infofield label="Status" value={selectedRow.status} />
          <Infofield label="Phase" value={selectedRow.phase} />
          <Infofield label="Last Updated" value={selectedRow.updated} />
        </div>
      ) : null,
    },
    {
      id: "notes",
      title: "Notes",
      defaultExpanded: false,
      content: (
        <p style={{ color: "var(--color-content-secondary)", fontSize: 14, margin: 0 }}>
          No notes yet. Click Edit to add notes.
        </p>
      ),
    },
    {
      id: "attachments",
      title: "Attachments",
      defaultExpanded: false,
      content: (
        <p style={{ color: "var(--color-content-secondary)", fontSize: 14, margin: 0 }}>
          No attachments. Drag and drop files here.
        </p>
      ),
    },
  ];

  const fullPageLeftSections = [
    {
      id: "details",
      title: "Details",
      defaultExpanded: true,
      content: selectedRow ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Infofield label="Name" value={selectedRow.name} />
          <Infofield label="Owner" value={selectedRow.owner} />
          <Infofield label="Status" value={selectedRow.status} />
          <Infofield label="Phase" value={selectedRow.phase} />
          <Infofield label="Last Updated" value={selectedRow.updated} />
        </div>
      ) : null,
    },
    {
      id: "notes",
      title: "Notes",
      defaultExpanded: false,
      content: (
        <p style={{ color: "var(--color-content-secondary)", fontSize: 14, margin: 0 }}>
          No notes yet.
        </p>
      ),
    },
  ];

  const fullPageRightSections = [
    {
      id: "team",
      title: "Team",
      defaultExpanded: true,
      content: (
        <AvatarGroup
          avatars={[
            { name: "Emma Dupont" },
            { name: "John Carter" },
            { name: "Yuki Tanaka" },
          ]}
        />
      ),
    },
    {
      id: "attachments",
      title: "Attachments",
      defaultExpanded: false,
      content: (
        <p style={{ color: "var(--color-content-secondary)", fontSize: 14, margin: 0 }}>
          No attachments.
        </p>
      ),
    },
  ];

  if (fullPageOpen && selectedRow) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "var(--color-general-neutral-light)" }}>
        <ObjectPage
          title={selectedRow.name}
          meta={{ label: "Last updated on", date: selectedRow.updated }}
          subinfoItems={subinfoItems}
          steps={SIDE_PANEL_STEPS}
          currentStep={currentStep}
          topBarLeft={
            <Button
              variant="tertiary"
              size="sm"
              iconLeading={<Icon name="ArrowLeft" size="sm" />}
              onClick={handleFullPageBack}
            >
              Back
            </Button>
          }
          topBarRight={
            <Button variant="primary" size="sm">
              Save
            </Button>
          }
          leftColumnSections={fullPageLeftSections}
          rightColumnSections={fullPageRightSections}
          menuSections={[]}
        />
      </div>
    );
  }

  return (
    <Section title="SidePanel" description="A slide-in panel triggered by a table row click, with ObjectHeader and single-column accordions. Click Open to expand to a full ObjectPage with two-column layout.">
      <PreviewComponent
        title="SidePanel with Table"
        code={`import { SidePanel } from "@/library/templates/side-panel";

const [panelOpen, setPanelOpen] = useState(false);
const [selectedRow, setSelectedRow] = useState(null);

<Table
  rows={rows}
  columns={columns}
  onRowClick={({ selected }) => {
    setSelectedRow(selected);
    setPanelOpen(true);
  }}
/>

<SidePanel
  isOpen={panelOpen}
  onClose={() => setPanelOpen(false)}
  onOpen={() => { setPanelOpen(false); setFullPageOpen(true); }}
  title={selectedRow?.name}
  subinfoItems={[
    { label: "Owner", value: selectedRow?.owner },
    { label: "Status", value: selectedRow?.status },
  ]}
  steps={steps}
  currentStep={currentStep}
  sections={sections}
/>`}
      >
        <div>
          <p style={{ marginBottom: 16, fontSize: 14, color: "var(--color-content-secondary)" }}>
            Click any table row to open the side panel.
          </p>
          <Table
            columns={[
              { key: "name", header: "Name", variant: "short-text", width: "240px" },
              { key: "owner", header: "Owner", variant: "short-text", width: "160px" },
              { key: "phase", header: "Phase", variant: "short-text", width: "140px" },
              { key: "updated", header: "Last Updated", variant: "short-text", width: "160px" },
            ]}
            rows={SIDE_PANEL_DEMO_ROWS}
            onRowClick={({ row }) => handleRowClick({ row })}
          />
        </div>
      </PreviewComponent>

      <SidePanel
        isOpen={panelOpen}
        onClose={handlePanelClose}
        onOpen={handlePanelOpen}
        title={selectedRow?.name ?? ""}
        meta={selectedRow ? { label: "Last updated on", date: selectedRow.updated } : undefined}
        subinfoItems={subinfoItems}
        steps={SIDE_PANEL_STEPS}
        currentStep={currentStep}
        sections={panelSections}
      />
    </Section>
  );
};

const ObjectPageTemplatePage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Section title="ObjectPage Template" description="A complete detail page layout with header, stepper, and two-column content.">
      <PreviewComponent
        title="ObjectPage Template Preview"
        code={`import { ObjectPage } from "@/library/templates/object-page";
import { TextInput, Toggle } from "@/library/molecules";

const [activeTab, setActiveTab] = useState("overview");

<ObjectPage
  title="Initiative Name"
  menuVariant="deal"
  logoSrc="/Inpart.svg"
  menuCollapsedLogoSrc="/Inpart1.svg"
  menuUser={{ name: "Emma Dupont", email: "emma.dupont@inpart.io", avatarInitials: "ED" }}
  topBarLeft={
    <ObjectPage.Button
      variant="secondary"
      size="sm"
      iconLeading={<ObjectPage.Icon name="ArrowLeft" size="sm" />}
    >
      Back
    </ObjectPage.Button>
  }
  topBarRight={
    <ObjectPage.Header.ActionsGroup>
      <ObjectPage.Button variant="primary" size="sm">Save</ObjectPage.Button>
    </ObjectPage.Header.ActionsGroup>
  }
  meta={{ date: "Jan 15, 2024", author: "John Doe" }}
  titleIconName="Beaker"
  steps={[
    { title: "Draft" },
    { title: "Review" },
    { title: "Approved" },
    { title: "Active" },
  ]}
  currentStep={2}
  tabs={
    <ObjectPage.Tabs selectedKey={activeTab} onSelectionChange={setActiveTab}>
      <ObjectPage.Tab id="overview">Overview</ObjectPage.Tab>
      <ObjectPage.Tab id="details">Details</ObjectPage.Tab>
      <ObjectPage.Tab id="history">History</ObjectPage.Tab>
    </ObjectPage.Tabs>
  }
  leftColumnSections={[
    {
      title: "General Information",
      defaultExpanded: true,
      content: (
        <>
          <TextInput label="Name" placeholder="Enter name..." />
          <div style={{ marginTop: 16 }}>
            <TextInput label="Description" placeholder="Enter description..." />
          </div>
        </>
      ),
    },
    {
      title: "Settings",
      content: <Toggle label="Enable notifications" />,
    },
  ]}
  rightColumnSections={rightSections}
/>`}
      >
        <p style={{ marginBottom: 16, color: "var(--color-content-secondary)", fontSize: 14 }}>
          The ObjectPage template combines SideMenu, ObjectHeader with stepper/tabs, and a two-column accordion layout.
        </p>
        <div style={{ height: 600, border: "1px solid var(--color-neutral-200)", borderRadius: 8, overflow: "hidden" }}>
          <div style={{ display: "flex", height: "100%", background: "var(--color-general-neutral-light)" }}>
            <div style={{ width: 250, borderRight: "1px solid var(--color-action-outline-secondary-enabled)", overflow: "hidden" }}>
              <SideMenu
                variant="collapsed"
                expandOnHover={true}
                logoSrc="/Inpart.svg"
                collapsedLogoSrc="/Inpart1.svg"
                showSearch={true}
                searchPlaceholder="Quick search"
                sections={[
                  {
                    items: [
                      { label: "Home", iconName: "Home" },
                      { label: "Dashboard", iconName: "ChartBar" },
                      { label: "Network", iconName: "Share" },
                    ],
                  },
                  {
                    title: "Workspace",
                    items: [
                      { label: "Initiatives", iconName: "initiative" },
                      { label: "Opportunities", iconName: "opportunity", state: "active" },
                      { label: "Agreements", iconName: "agreement" },
                      { label: "Alliances", iconName: "alliance" },
                      { label: "Obligations", iconName: "obligation" },
                    ],
                  },
                  {
                    title: "Directory",
                    items: [
                      { label: "Companies", iconName: "company" },
                      { label: "Contacts", iconName: "contact" },
                      { label: "Meetings", iconName: "meeting" },
                    ],
                    dividerAfter: true,
                  },
                  {
                    title: "Recent Initiatives",
                    items: [
                      { label: "ALLINPART", iconColor: "var(--color-content-brand)", iconLetter: "A" },
                    ],
                  },
                ]}
                createButtonLabel="Create"
                user={{ name: "Emma Dupont", email: "emma.dupont@inpart.io", avatarInitials: "ED" }}
                onCreateClick={() => alert("Create clicked")}
                style={{ position: "relative", height: "100%" }}
              />
            </div>

            {/* Main Content Preview */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              {/* Header */}
              <div style={{ padding: 16, background: "var(--color-general-white)", borderBottom: "1px solid var(--color-action-outline-secondary-enabled)" }}>
                <ObjectHeader>
                  <ObjectHeaderTopBar>
                    <ObjectHeaderTopBarLeft>
                      <Button variant="secondary" size="sm" iconLeading={<Icon name="ArrowLeft" size="sm" />}>
                        Back
                      </Button>
                    </ObjectHeaderTopBarLeft>
                    <ObjectHeaderTopBarRight>
                      <ObjectHeaderActionsGroup>
                        <Button variant="primary" size="sm">Save</Button>
                      </ObjectHeaderActionsGroup>
                    </ObjectHeaderTopBarRight>
                  </ObjectHeaderTopBar>

                  <ObjectHeaderTitleSection>
                    <ObjectHeaderMeta date="Jan 15, 2024" author="John Doe" />
                    <ObjectHeaderTitle iconName="Beaker">Initiative Name</ObjectHeaderTitle>
                  </ObjectHeaderTitleSection>

                  <ObjectHeaderStepper>
                    <Stepper
                      currentStep={2}
                      steps={[
                        { title: "Draft" },
                        { title: "Review" },
                        { title: "Approved" },
                        { title: "Active" },
                      ]}
                    />
                  </ObjectHeaderStepper>

                  <ObjectHeaderTabs>
                    <Tabs selectedKey={activeTab} onSelectionChange={setActiveTab}>
                      <Tab id="overview">Overview</Tab>
                      <Tab id="details">Details</Tab>
                      <Tab id="history">History</Tab>
                    </Tabs>
                  </ObjectHeaderTabs>
                </ObjectHeader>
              </div>

              {/* Two Column Content */}
              <div style={{ flex: 1, padding: 16, overflow: "auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {/* Left Column */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <Accordion title="General Information" defaultExpanded>
                      <div style={{ padding: 16 }}>
                        <TextInput label="Name" placeholder="Enter name..." />
                        <div style={{ marginTop: 16 }}>
                          <TextInput label="Description" placeholder="Enter description..." />
                        </div>
                      </div>
                    </Accordion>
                    <Accordion title="Settings">
                      <div style={{ padding: 16 }}>
                        <Toggle label="Enable notifications" />
                      </div>
                    </Accordion>
                  </div>

                  {/* Right Column */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <Accordion title="Related Items" defaultExpanded>
                      <div style={{ padding: 16 }}>
                        <p style={{ color: "var(--color-content-secondary)", fontSize: 14 }}>No related items yet.</p>
                      </div>
                    </Accordion>
                    <Accordion title="Activity Log">
                      <div style={{ padding: 16 }}>
                        <p style={{ color: "var(--color-content-secondary)", fontSize: 14 }}>Recent activity will appear here.</p>
                      </div>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PreviewComponent>

    </Section>
  );
};

const AiHomepageTemplatePage = () => (
    <Section title="AI Homepage Template" description="A complete AI assistant homepage template with greeting, chat input, and task list.">
      <PreviewComponent
        title="AI Homepage Preview"
        code={`import { AiHomepage } from "@/library/templates/ai-homepage";

<AiHomepage />`}
      >
        <p style={{ marginBottom: 16, color: "var(--color-content-secondary)", fontSize: 14 }}>
          The AI Homepage template combines SideMenu, AiChatInput, and RadioCard components into a complete AI assistant landing page.
        </p>
        <div style={{ height: 600, border: "1px solid var(--color-neutral-200)", borderRadius: 8, overflow: "hidden" }}>
          <AiHomepage />
        </div>
      </PreviewComponent>
    </Section>
);

// ─────────────────────────────────────────────
// TABLE CELL INLINE EDIT PAGE
// ─────────────────────────────────────────────

const TEXT_CELL_OPTIONS = [
  { id: "opt1", label: "Option Alpha" },
  { id: "opt2", label: "Option Beta" },
  { id: "opt3", label: "Option Gamma" },
];

const LINK_CELL_OPTIONS = [
  { id: "lnk1", label: "Homepage" },
  { id: "lnk2", label: "Documentation" },
  { id: "lnk3", label: "Repository" },
  { id: "lnk4", label: "Changelog" },
];

const CHIP_CELL_OPTIONS = [
  { id: "c1", label: "Research collaboration" },
  { id: "c2", label: "Licensing" },
  { id: "c3", label: "Partnership" },
  { id: "c4", label: "Supply chain" },
  { id: "c5", label: "Joint venture" },
];

const BTN_CELL_OPTIONS = [
  { id: "s1", label: "Active" },
  { id: "s2", label: "Pending" },
  { id: "s3", label: "In review" },
  { id: "s4", label: "Closed" },
];

function TableCellInlineEditStateRows({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: "var(--color-content-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span>
      <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid var(--color-action-outline-secondary-enabled)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

function StateRow({ state, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "var(--spacing-sm) var(--spacing-3)", borderBottom: "1px solid var(--color-action-outline-secondary-enabled)", background: "var(--color-general-white)" }}>
      <span style={{ width: 120, flexShrink: 0, fontSize: 12, color: "var(--color-content-secondary)", fontFamily: "var(--font-family-primary)" }}>{state}</span>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  );
}

const TableCellInlineEditPage = () => {
  // Text cell state
  const [textEmpty, setTextEmpty] = useState("");
  const [textFilled, setTextFilled] = useState("This is a filled value");
  const [textLeadingIcon, setTextLeadingIcon] = useState("Icon + text value");
  const [textTrailingIcon, setTextTrailingIcon] = useState("Value with trailing");
  const [textError, setTextError] = useState("Invalid input value");

  // Button cell state
  const [btnFilled, setBtnFilled] = useState(BTN_CELL_OPTIONS[0]);
  const [btnError, setBtnError] = useState(BTN_CELL_OPTIONS[1]);

  // Link cell state (single)
  const [linkSingleEmpty, setLinkSingleEmpty] = useState(null);
  const [linkSingleFilled, setLinkSingleFilled] = useState(LINK_CELL_OPTIONS[0]);
  const [linkSingleError, setLinkSingleError] = useState(LINK_CELL_OPTIONS[1]);

  // Link cell state (multiple)
  const [linkMultiEmpty, setLinkMultiEmpty] = useState([]);
  const [linkMultiFilled, setLinkMultiFilled] = useState([LINK_CELL_OPTIONS[0], LINK_CELL_OPTIONS[2]]);
  const [linkMultiError, setLinkMultiError] = useState([LINK_CELL_OPTIONS[0]]);

  // Chip cell state (multiple)
  const [chipMultiEmpty, setChipMultiEmpty] = useState([]);
  const [chipMultiFilled, setChipMultiFilled] = useState([CHIP_CELL_OPTIONS[0], CHIP_CELL_OPTIONS[1]]);
  const [chipMultiError, setChipMultiError] = useState([CHIP_CELL_OPTIONS[0]]);

  // Chip cell state (single)
  const [chipSingleEmpty, setChipSingleEmpty] = useState([]);
  const [chipSingleFilled, setChipSingleFilled] = useState([CHIP_CELL_OPTIONS[2]]);

  return (
    <Section
      title="TableCell — Inline Edit"
      description="Inline-editable table cell components for Text, Button, Link, and Chip types. Each cell supports Empty, Filled, Active (editing/dropdown open), Hover, Error, and Read-only states."
    >
      {/* ── TEXT ── */}
      <PreviewComponent
        title="Text — Left / Right Icon"
        code={`import { TextCellInlineEdit } from "@/library/organisms/table/table-cell-inline-edit";

// Empty
<TextCellInlineEdit value="" onChange={setValue} placeholder="Add text" />
// Filled
<TextCellInlineEdit value="This is a filled value" onChange={setValue} />
// With leading icon
<TextCellInlineEdit value={val} onChange={setVal} iconLeading={<Icon name="UserIcon" size={14} />} />
// With trailing icon
<TextCellInlineEdit value={val} onChange={setVal} iconTrailing={<Icon name="LinkIcon" size={14} />} />
// Error
<TextCellInlineEdit value={val} onChange={setVal} error="This field contains an error" />
// Read-only
<TextCellInlineEdit value={val} readOnly />`}
      >
        <TableCellInlineEditStateRows label="Text cell">
          <StateRow state="Empty">
            <TextCellInlineEdit value={textEmpty} onChange={setTextEmpty} placeholder="Add text" />
          </StateRow>
          <StateRow state="Filled">
            <TextCellInlineEdit value={textFilled} onChange={setTextFilled} />
          </StateRow>
          <StateRow state="Empty-Hover">
            <TextCellInlineEdit value="" onChange={() => {}} placeholder="Hover over to see hover state" />
          </StateRow>
          <StateRow state="Active (click to edit)">
            <TextCellInlineEdit value={textEmpty} onChange={setTextEmpty} placeholder="Click to activate" />
          </StateRow>
          <StateRow state="Left icon + Empty">
            <TextCellInlineEdit
              value=""
              onChange={() => {}}
              placeholder="Add text"
              iconLeading={<Icon name="UserIcon" size={14} />}
            />
          </StateRow>
          <StateRow state="Left icon + Filled">
            <TextCellInlineEdit
              value={textLeadingIcon}
              onChange={setTextLeadingIcon}
              iconLeading={<Icon name="UserIcon" size={14} />}
            />
          </StateRow>
          <StateRow state="Right icon + Filled">
            <TextCellInlineEdit
              value={textTrailingIcon}
              onChange={setTextTrailingIcon}
              iconTrailing={<Icon name="LinkIcon" size={14} />}
            />
          </StateRow>
          <StateRow state="Filled-Error">
            <TextCellInlineEdit
              value={textError}
              onChange={setTextError}
              error="This field contains an error"
            />
          </StateRow>
          <StateRow state="Read-only">
            <TextCellInlineEdit value="Read-only value" onChange={() => {}} readOnly />
          </StateRow>
          <StateRow state="Read-only Empty">
            <TextCellInlineEdit value="" onChange={() => {}} placeholder="Read-only placeholder" readOnly />
          </StateRow>
        </TableCellInlineEditStateRows>
      </PreviewComponent>

      {/* ── BUTTON ── */}
      <PreviewComponent
        title="Button — Single Select via Dropdown"
        code={`import { ButtonCellInlineEdit } from "@/library/organisms/table/table-cell-inline-edit";

const options = [{ id: "s1", label: "Active" }, { id: "s2", label: "Pending" }];

// Filled
<ButtonCellInlineEdit value={options[0]} onChange={setVal} options={options} />
// Active (dropdown open — click to trigger)
<ButtonCellInlineEdit value={options[0]} onChange={setVal} options={options} />
// Error
<ButtonCellInlineEdit value={options[1]} onChange={setVal} options={options} error="Selection required" />
// Read-only
<ButtonCellInlineEdit value={options[0]} onChange={setVal} options={options} readOnly />`}
      >
        <TableCellInlineEditStateRows label="Button cell">
          <StateRow state="Filled">
            <ButtonCellInlineEdit value={btnFilled} onChange={setBtnFilled} options={BTN_CELL_OPTIONS} />
          </StateRow>
          <StateRow state="Filled-Hover">
            <ButtonCellInlineEdit value={btnFilled} onChange={setBtnFilled} options={BTN_CELL_OPTIONS} />
          </StateRow>
          <StateRow state="Active (click to open)">
            <ButtonCellInlineEdit value={btnFilled} onChange={setBtnFilled} options={BTN_CELL_OPTIONS} />
          </StateRow>
          <StateRow state="Filled-Error">
            <ButtonCellInlineEdit value={btnError} onChange={setBtnError} options={BTN_CELL_OPTIONS} error="Invalid selection" />
          </StateRow>
          <StateRow state="Read-only">
            <ButtonCellInlineEdit value={BTN_CELL_OPTIONS[0]} onChange={() => {}} options={BTN_CELL_OPTIONS} readOnly />
          </StateRow>
        </TableCellInlineEditStateRows>
      </PreviewComponent>

      {/* ── LINK — SINGLE ── */}
      <PreviewComponent
        title="Link — Single Select via Dropdown"
        code={`import { LinkCellInlineEdit } from "@/library/organisms/table/table-cell-inline-edit";

const options = [{ id: "lnk1", label: "Homepage" }, { id: "lnk2", label: "Docs" }];

// Single
<LinkCellInlineEdit value={null} onChange={setVal} options={options} placeholder="Add link" />
// Filled
<LinkCellInlineEdit value={options[0]} onChange={setVal} options={options} />
// Icon + Text
<LinkCellInlineEdit value={options[0]} onChange={setVal} options={options} iconLeading={<Icon name="LinkIcon" size={14} />} />
// Error
<LinkCellInlineEdit value={options[0]} onChange={setVal} options={options} error="Broken link" />
// Read-only
<LinkCellInlineEdit value={options[0]} onChange={setVal} options={options} readOnly />`}
      >
        <TableCellInlineEditStateRows label="Link — Single">
          <StateRow state="Empty">
            <LinkCellInlineEdit value={linkSingleEmpty} onChange={setLinkSingleEmpty} options={LINK_CELL_OPTIONS} placeholder="Add link" />
          </StateRow>
          <StateRow state="Filled">
            <LinkCellInlineEdit value={linkSingleFilled} onChange={setLinkSingleFilled} options={LINK_CELL_OPTIONS} />
          </StateRow>
          <StateRow state="Empty-Hover">
            <LinkCellInlineEdit value={null} onChange={() => {}} options={LINK_CELL_OPTIONS} placeholder="Hover me" />
          </StateRow>
          <StateRow state="Active (click to open)">
            <LinkCellInlineEdit value={linkSingleEmpty} onChange={setLinkSingleEmpty} options={LINK_CELL_OPTIONS} placeholder="Click to open" />
          </StateRow>
          <StateRow state="Filled-Hover">
            <LinkCellInlineEdit value={linkSingleFilled} onChange={setLinkSingleFilled} options={LINK_CELL_OPTIONS} />
          </StateRow>
          <StateRow state="Icon + Text">
            <LinkCellInlineEdit
              value={linkSingleFilled}
              onChange={setLinkSingleFilled}
              options={LINK_CELL_OPTIONS}
              iconLeading={<Icon name="LinkIcon" size={14} />}
            />
          </StateRow>
          <StateRow state="Filled-Error">
            <LinkCellInlineEdit value={linkSingleError} onChange={setLinkSingleError} options={LINK_CELL_OPTIONS} error="Broken link detected" />
          </StateRow>
          <StateRow state="Read-only">
            <LinkCellInlineEdit value={LINK_CELL_OPTIONS[0]} onChange={() => {}} options={LINK_CELL_OPTIONS} readOnly />
          </StateRow>
          <StateRow state="Read-only Empty">
            <LinkCellInlineEdit value={null} onChange={() => {}} options={LINK_CELL_OPTIONS} placeholder="No link" readOnly />
          </StateRow>
        </TableCellInlineEditStateRows>
      </PreviewComponent>

      {/* ── LINK — MULTIPLE ── */}
      <PreviewComponent
        title="Link — Multiple Select via Dropdown"
        code={`// Multiple
<LinkCellInlineEdit value={[options[0], options[2]]} onChange={setVal} options={options} multiple placeholder="Add links" />`}
      >
        <TableCellInlineEditStateRows label="Link — Multiple">
          <StateRow state="Empty">
            <LinkCellInlineEdit value={linkMultiEmpty} onChange={setLinkMultiEmpty} options={LINK_CELL_OPTIONS} multiple placeholder="Add links" />
          </StateRow>
          <StateRow state="Filled">
            <LinkCellInlineEdit value={linkMultiFilled} onChange={setLinkMultiFilled} options={LINK_CELL_OPTIONS} multiple />
          </StateRow>
          <StateRow state="Active (click to open)">
            <LinkCellInlineEdit value={linkMultiEmpty} onChange={setLinkMultiEmpty} options={LINK_CELL_OPTIONS} multiple placeholder="Click to open" />
          </StateRow>
          <StateRow state="Filled-Error">
            <LinkCellInlineEdit value={linkMultiError} onChange={setLinkMultiError} options={LINK_CELL_OPTIONS} multiple error="One or more links are invalid" />
          </StateRow>
          <StateRow state="Read-only">
            <LinkCellInlineEdit value={[LINK_CELL_OPTIONS[0], LINK_CELL_OPTIONS[2]]} onChange={() => {}} options={LINK_CELL_OPTIONS} multiple readOnly />
          </StateRow>
        </TableCellInlineEditStateRows>
      </PreviewComponent>

      {/* ── CHIP — MULTIPLE ── */}
      <PreviewComponent
        title="Chip — Multiple Select via Dropdown"
        code={`import { ChipCellInlineEdit } from "@/library/organisms/table/table-cell-inline-edit";

const opts = [{ id: "c1", label: "Research", variant: "primary" }, ...];

// Multiple (default)
<ChipCellInlineEdit value={[]} onChange={setVal} options={opts} placeholder="Add tags" />
<ChipCellInlineEdit value={[opts[0], opts[1]]} onChange={setVal} options={opts} multiple />
// Error
<ChipCellInlineEdit value={[opts[0]]} onChange={setVal} options={opts} error="Invalid tag" />
// Read-only
<ChipCellInlineEdit value={[opts[0]]} readOnly />`}
      >
        <TableCellInlineEditStateRows label="Chip — Multiple">
          <StateRow state="Empty">
            <ChipCellInlineEdit value={chipMultiEmpty} onChange={setChipMultiEmpty} options={CHIP_CELL_OPTIONS} placeholder="Add tags" />
          </StateRow>
          <StateRow state="Filled">
            <ChipCellInlineEdit value={chipMultiFilled} onChange={setChipMultiFilled} options={CHIP_CELL_OPTIONS} />
          </StateRow>
          <StateRow state="Empty-Hover">
            <ChipCellInlineEdit value={[]} onChange={() => {}} options={CHIP_CELL_OPTIONS} placeholder="Hover me" />
          </StateRow>
          <StateRow state="Active (click to open)">
            <ChipCellInlineEdit value={chipMultiEmpty} onChange={setChipMultiEmpty} options={CHIP_CELL_OPTIONS} placeholder="Click to open" />
          </StateRow>
          <StateRow state="Filled-Hover">
            <ChipCellInlineEdit value={chipMultiFilled} onChange={setChipMultiFilled} options={CHIP_CELL_OPTIONS} />
          </StateRow>
          <StateRow state="Filled-Error">
            <ChipCellInlineEdit value={chipMultiError} onChange={setChipMultiError} options={CHIP_CELL_OPTIONS} error="Contains an invalid tag" />
          </StateRow>
          <StateRow state="Read-only">
            <ChipCellInlineEdit value={[CHIP_CELL_OPTIONS[0], CHIP_CELL_OPTIONS[1]]} onChange={() => {}} options={CHIP_CELL_OPTIONS} readOnly />
          </StateRow>
          <StateRow state="Read-only Empty">
            <ChipCellInlineEdit value={[]} onChange={() => {}} options={CHIP_CELL_OPTIONS} placeholder="No tags" readOnly />
          </StateRow>
        </TableCellInlineEditStateRows>
      </PreviewComponent>

      {/* ── CHIP — SINGLE ── */}
      <PreviewComponent
        title="Chip — Single Select via Dropdown"
        code={`// Single selection — only one chip at a time
<ChipCellInlineEdit value={[]} onChange={setVal} options={opts} multiple={false} placeholder="Select one tag" />`}
      >
        <TableCellInlineEditStateRows label="Chip — Single">
          <StateRow state="Empty">
            <ChipCellInlineEdit value={chipSingleEmpty} onChange={setChipSingleEmpty} options={CHIP_CELL_OPTIONS} multiple={false} placeholder="Select one tag" />
          </StateRow>
          <StateRow state="Filled">
            <ChipCellInlineEdit value={chipSingleFilled} onChange={setChipSingleFilled} options={CHIP_CELL_OPTIONS} multiple={false} />
          </StateRow>
          <StateRow state="Active (click to open)">
            <ChipCellInlineEdit value={chipSingleEmpty} onChange={setChipSingleEmpty} options={CHIP_CELL_OPTIONS} multiple={false} placeholder="Click to open" />
          </StateRow>
          <StateRow state="Read-only">
            <ChipCellInlineEdit value={[CHIP_CELL_OPTIONS[2]]} onChange={() => {}} options={CHIP_CELL_OPTIONS} multiple={false} readOnly />
          </StateRow>
        </TableCellInlineEditStateRows>
      </PreviewComponent>
    </Section>
  );
};

// ─────────────────────────────────────────────
// TABLE CELL INLINE EDIT — FULL TABLE PAGE
// ─────────────────────────────────────────────

const INLINE_TABLE_BTN_OPTIONS = [
  { id: "active",  label: "Active" },
  { id: "pending", label: "Pending" },
  { id: "review",  label: "In review" },
  { id: "closed",  label: "Closed" },
];

const INLINE_TABLE_LINK_OPTIONS = [
  { id: "hp",   label: "Homepage" },
  { id: "docs", label: "Documentation" },
  { id: "repo", label: "Repository" },
  { id: "cl",   label: "Changelog" },
];

const INLINE_TABLE_CHIP_OPTIONS = [
  { id: "c1", label: "Research" },
  { id: "c2", label: "Licensing" },
  { id: "c3", label: "Partnership" },
  { id: "c4", label: "Supply chain" },
  { id: "c5", label: "Joint venture" },
];

const INLINE_TABLE_INITIAL_ROWS = [
  { id: "ir1", longText: "",                                                                         text: "",                                 status: null,                          linkSingle: null,                      linkMulti: [],                         chips: [],                                          chipsingle: [],                            number: null, textMulti: [] },
  { id: "ir2", longText: "",                                                                         text: "",                                 status: null,                          linkSingle: null,                      linkMulti: [],                         chips: [],                                          chipsingle: [],                            number: null, textMulti: [] },
  { id: "ir3", longText: "This is a long description that explains the partnership in detail and may overflow into multiple lines depending on the column width.", text: "Partnership outreach Q3",          status: INLINE_TABLE_BTN_OPTIONS[0],   linkSingle: INLINE_TABLE_LINK_OPTIONS[0], linkMulti: [INLINE_TABLE_LINK_OPTIONS[0], INLINE_TABLE_LINK_OPTIONS[2]], chips: [INLINE_TABLE_CHIP_OPTIONS[0], INLINE_TABLE_CHIP_OPTIONS[1]], chipsingle: [INLINE_TABLE_CHIP_OPTIONS[0]], number: 125000,  textMulti: [{ id: "tm1", label: "180 rue Grand Luar, Lyon" }, { id: "tm2", label: "14 Av. des Champs-Élysées" }, { id: "tm3", label: "Quai de la Gare" }, { id: "tm4", label: "Place Bellecour" }] },
  { id: "ir4", longText: "Licensing terms covering exclusivity windows, royalty rates, and sublicensing rights across three jurisdictions.",                       text: "Licensing agreement final review", status: INLINE_TABLE_BTN_OPTIONS[1],   linkSingle: INLINE_TABLE_LINK_OPTIONS[1], linkMulti: [INLINE_TABLE_LINK_OPTIONS[1]], chips: [INLINE_TABLE_CHIP_OPTIONS[1], INLINE_TABLE_CHIP_OPTIONS[2]], chipsingle: [INLINE_TABLE_CHIP_OPTIONS[2]], number: 48750.5, textMulti: [{ id: "tm5", label: "12 Rue de Rivoli" }] },
  { id: "ir5", longText: "Short note.",                                                               text: "Supply chain co-development MOU",  status: INLINE_TABLE_BTN_OPTIONS[2],   linkSingle: INLINE_TABLE_LINK_OPTIONS[2], linkMulti: [INLINE_TABLE_LINK_OPTIONS[0], INLINE_TABLE_LINK_OPTIONS[3]], chips: [INLINE_TABLE_CHIP_OPTIONS[3], INLINE_TABLE_CHIP_OPTIONS[4]], chipsingle: [INLINE_TABLE_CHIP_OPTIONS[3]], number: null,    textMulti: [] },
  { id: "ir6", longText: "",                                                                         text: "Joint venture term sheet",         status: INLINE_TABLE_BTN_OPTIONS[3],   linkSingle: INLINE_TABLE_LINK_OPTIONS[3], linkMulti: [INLINE_TABLE_LINK_OPTIONS[2], INLINE_TABLE_LINK_OPTIONS[3]], chips: [INLINE_TABLE_CHIP_OPTIONS[0], INLINE_TABLE_CHIP_OPTIONS[4]], chipsingle: [INLINE_TABLE_CHIP_OPTIONS[1]], number: 2300000, textMulti: [{ id: "tm6", label: "8 Place de la Comédie" }, { id: "tm7", label: "Gare Saint-Charles" }] },
];

const inlineTablePageStyles = {
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-6)",
  },
  tableWrap: {
    display: "flex",
    flexDirection: "column",
  },
  bodyWrap: {
    borderRadius: "var(--radius-lg)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    background: "var(--color-general-white)",
    overflow: "hidden",
    width: "max-content",
    minWidth: "100%",
  },
  scrollOuter: {
    overflowX: "auto",
    width: "100%",
  },
  tableInner: {
    display: "table",
    width: 2000,
    minWidth: "100%",
    tableLayout: "fixed",
    borderCollapse: "collapse",
  },
};

function InlineTableHeaderRow() {
  const colStyle = (w) => ({
    display: "table-cell",
    width: w,
    padding: "var(--spacing-sm) var(--spacing-3)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-sm)",
    fontWeight: "var(--font-weight-semibold)",
    color: "var(--color-content-secondary)",
    background: "var(--color-general-neutral-25)",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
  });
  return (
    <div style={{ display: "table-row" }}>
      <div style={colStyle(280)}>Long Text</div>
      <div style={colStyle(240)}>Text</div>
      <div style={colStyle(160)}>Button</div>
      <div style={colStyle(200)}>Link — Single</div>
      <div style={colStyle(260)}>Link — Multiple</div>
      <div style={colStyle(280)}>Chip — Multiple</div>
      <div style={colStyle(200)}>Chip — Single</div>
      <div style={colStyle(160)}>Number</div>
      <div style={colStyle(220)}>Text Multiple</div>
    </div>
  );
}

function InlineTableBodyRow({ row, onUpdate, index = 0 }) {
  const zebraColor = index % 2 === 0
    ? "var(--color-general-white)"
    : "var(--color-general-neutral-lighter)";
  const cellStyle = {
    display: "table-cell",
    padding: 0,
    height: "1px", // enables height:100% on child components
    borderBottom: "1px solid var(--color-action-outline-secondary-enabled)",
    verticalAlign: "middle",
    position: "relative",
    background: zebraColor,
  };
  return (
    <div style={{ display: "table-row", height: 56 }}>
      <div style={cellStyle}>
        <LongTextCellInlineEdit
          value={row.longText}
          onChange={(v) => onUpdate({ longText: v })}
          placeholder="Add description"
        />
      </div>
      <div style={cellStyle}>
        <TextCellInlineEdit
          value={row.text}
          onChange={(v) => onUpdate({ text: v })}
          placeholder="Add text"
          iconLeading={<Icon name="DocumentTextIcon" size={14} />}
        />
      </div>
      <div style={cellStyle}>
        <ButtonCellInlineEdit
          value={row.status}
          onChange={(v) => onUpdate({ status: v })}
          options={INLINE_TABLE_BTN_OPTIONS}
          placeholder="Select"
        />
      </div>
      <div style={cellStyle}>
        <LinkCellInlineEdit
          value={row.linkSingle}
          onChange={(v) => onUpdate({ linkSingle: v })}
          options={INLINE_TABLE_LINK_OPTIONS}
          placeholder="Add link"
          iconLeading={<Icon name="LinkIcon" size={14} />}
        />
      </div>
      <div style={cellStyle}>
        <LinkCellInlineEdit
          value={row.linkMulti}
          onChange={(v) => onUpdate({ linkMulti: v })}
          options={INLINE_TABLE_LINK_OPTIONS}
          multiple
          placeholder="Add links"
        />
      </div>
      <div style={cellStyle}>
        <ChipCellInlineEdit
          value={row.chips}
          onChange={(v) => onUpdate({ chips: v })}
          options={INLINE_TABLE_CHIP_OPTIONS}
          placeholder="Add tags"
        />
      </div>
      <div style={cellStyle}>
        <ChipCellInlineEdit
          value={row.chipsingle}
          onChange={(v) => onUpdate({ chipsingle: v })}
          options={INLINE_TABLE_CHIP_OPTIONS}
          multiple={false}
          placeholder="Select tag"
        />
      </div>
      <div style={cellStyle}>
        <NumberCellInlineEdit
          value={row.number}
          onChange={(v) => onUpdate({ number: v })}
          currency="USD"
        />
      </div>
      <div style={cellStyle}>
        <TextMultipleCellInlineEdit
          value={row.textMulti}
          onChange={(v) => onUpdate({ textMulti: v })}
          placeholder="Add address"
          iconLeading={<Icon name="MapPinIcon" size={14} />}
        />
      </div>
    </div>
  );
}

const TableCellInlineEditTablePage = () => {
  const [rows, setRows] = useState(INLINE_TABLE_INITIAL_ROWS);

  const updateRow = (id, patch) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const addRow = () =>
    setRows((prev) => [
      ...prev,
      { id: `ir${Date.now()}`, longText: "", text: "", status: null, linkSingle: null, linkMulti: [], chips: [], chipsingle: [], number: null, textMulti: [] },
    ]);

  return (
    <Section
      title="TableCell — Inline Edit Table"
      description="A full table demonstrating all four inline-edit cell types (Text, Button, Link, Chip) working together with live state. Click any cell to edit."
    >
      <PreviewComponent
        title="Live Inline Edit Table"
        code={`import { TextCellInlineEdit, ButtonCellInlineEdit, LinkCellInlineEdit, ChipCellInlineEdit } from "@/library/organisms/table/table-cell-inline-edit";

<TextCellInlineEdit value={row.text} onChange={(v) => update({ text: v })} iconLeading={<Icon name="DocumentTextIcon" size={14} />} />
<ButtonCellInlineEdit value={row.status} onChange={(v) => update({ status: v })} options={BTN_OPTIONS} />
<LinkCellInlineEdit value={row.link} onChange={(v) => update({ link: v })} options={LINK_OPTIONS} />
<LinkCellInlineEdit value={row.links} onChange={(v) => update({ links: v })} options={LINK_OPTIONS} multiple />
<ChipCellInlineEdit value={row.chips} onChange={(v) => update({ chips: v })} options={CHIP_OPTIONS} />
<ChipCellInlineEdit value={row.chip} onChange={(v) => update({ chip: v })} options={CHIP_OPTIONS} multiple={false} />`}
      >
        <div style={inlineTablePageStyles.tableWrap}>
          <div style={inlineTablePageStyles.scrollOuter}>
            {/* Header table — outside the outlined card */}
            <div style={{ ...inlineTablePageStyles.tableInner, marginBottom: 4 }}>
              <InlineTableHeaderRow />
            </div>
            {/* Body table — inside the outlined card */}
            <div style={inlineTablePageStyles.bodyWrap}>
              <div style={inlineTablePageStyles.tableInner}>
                {rows.map((row, index) => (
                  <InlineTableBodyRow
                    key={row.id}
                    row={row}
                    index={index}
                    onUpdate={(patch) => updateRow(row.id, patch)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </PreviewComponent>

      {/* Read-only variant */}
      <PreviewComponent
        title="Read-only Rows"
        code={`<TextCellInlineEdit value="Read-only text" readOnly />
<ButtonCellInlineEdit value={option} options={opts} readOnly />
<LinkCellInlineEdit value={link} options={opts} readOnly />
<ChipCellInlineEdit value={chips} options={opts} readOnly />`}
      >
        <div style={inlineTablePageStyles.tableWrap}>
          <div style={inlineTablePageStyles.scrollOuter}>
            <div style={inlineTablePageStyles.tableInner}>
              <InlineTableHeaderRow />
              {[INLINE_TABLE_INITIAL_ROWS[2], INLINE_TABLE_INITIAL_ROWS[3]].map((row, index) => (
                <div key={row.id} style={{ display: "table-row" }}>
                  {[
                    <TextCellInlineEdit key="t" value={row.text} onChange={() => {}} readOnly iconLeading={<Icon name="DocumentTextIcon" size={14} />} />,
                    <ButtonCellInlineEdit key="b" value={row.status} onChange={() => {}} options={INLINE_TABLE_BTN_OPTIONS} readOnly />,
                    <LinkCellInlineEdit key="ls" value={row.linkSingle} onChange={() => {}} options={INLINE_TABLE_LINK_OPTIONS} readOnly />,
                    <LinkCellInlineEdit key="lm" value={row.linkMulti} onChange={() => {}} options={INLINE_TABLE_LINK_OPTIONS} multiple readOnly />,
                    <ChipCellInlineEdit key="cm" value={row.chips} onChange={() => {}} options={INLINE_TABLE_CHIP_OPTIONS} readOnly />,
                    <ChipCellInlineEdit key="cs" value={row.chipsingle} onChange={() => {}} options={INLINE_TABLE_CHIP_OPTIONS} multiple={false} readOnly />,
                  ].map((cell, i) => (
                    <div key={i} style={{ display: "table-cell", padding: "var(--spacing-sm) var(--spacing-3)", borderBottom: "1px solid var(--color-action-outline-secondary-enabled)", verticalAlign: "middle", background: index % 2 === 0 ? "var(--color-general-white)" : "var(--color-general-neutral-lighter)" }}>
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </PreviewComponent>

      {/* Error state rows */}
      <PreviewComponent
        title="Error State Rows"
        code={`<TextCellInlineEdit value="Bad value" error="This field is invalid" />
<ButtonCellInlineEdit value={option} options={opts} error="Selection not allowed" />
<LinkCellInlineEdit value={link} options={opts} error="Broken link" />
<ChipCellInlineEdit value={chips} options={opts} error="Invalid tag" />`}
      >
        <div style={inlineTablePageStyles.tableWrap}>
          <div style={inlineTablePageStyles.scrollOuter}>
            <div style={inlineTablePageStyles.tableInner}>
              <InlineTableHeaderRow />
              {[INLINE_TABLE_INITIAL_ROWS[4], INLINE_TABLE_INITIAL_ROWS[5]].map((row, index) => (
                <div key={row.id} style={{ display: "table-row" }}>
                  {[
                    <TextCellInlineEdit key="t" value={row.text} onChange={() => {}} error="This field is invalid" />,
                    <ButtonCellInlineEdit key="b" value={row.status} onChange={() => {}} options={INLINE_TABLE_BTN_OPTIONS} error="Selection required" />,
                    <LinkCellInlineEdit key="ls" value={row.linkSingle} onChange={() => {}} options={INLINE_TABLE_LINK_OPTIONS} error="Broken link" />,
                    <LinkCellInlineEdit key="lm" value={row.linkMulti} onChange={() => {}} options={INLINE_TABLE_LINK_OPTIONS} multiple error="One or more links are invalid" />,
                    <ChipCellInlineEdit key="cm" value={row.chips} onChange={() => {}} options={INLINE_TABLE_CHIP_OPTIONS} error="Contains invalid tag" />,
                    <ChipCellInlineEdit key="cs" value={row.chipsingle} onChange={() => {}} options={INLINE_TABLE_CHIP_OPTIONS} multiple={false} error="Invalid tag" />,
                  ].map((cell, i) => (
                    <div key={i} style={{ display: "table-cell", padding: "var(--spacing-sm) var(--spacing-3)", borderBottom: "1px solid var(--color-action-outline-secondary-enabled)", verticalAlign: "middle", background: index % 2 === 0 ? "var(--color-general-white)" : "var(--color-general-neutral-lighter)" }}>
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </PreviewComponent>
    </Section>
  );
};

// ─────────────────────────────────────────────
// PAGE CONFIG
// ─────────────────────────────────────────────

const PAGES = {
  // Atoms
  button: { title: "Button", component: ButtonPage, category: "atoms" },
  badge: { title: "Badge", component: BadgePage, category: "atoms" },
  avatar: { title: "Avatar", component: AvatarPage, category: "atoms" },
  checkbox: { title: "Checkbox", component: CheckboxPage, category: "atoms" },
  toggle: { title: "Toggle", component: TogglePage, category: "atoms" },
  icon: { title: "Icon", component: IconPage, category: "atoms" },
  colors: { title: "Colors", component: ColorsPage, category: "atoms" },
  chip: { title: "Chip", component: ChipPage, category: "atoms" },
  radioButton: { title: "RadioButton", component: RadioButtonPage, category: "atoms" },
  link: { title: "Link", component: LinkPage, category: "atoms" },
  tooltip: { title: "Tooltip", component: TooltipPage, category: "atoms" },
  buttonBadge: { title: "ButtonBadge", component: ButtonBadgePage, category: "atoms" },
  aiButton: { title: "AiButton", component: AiButtonPage, category: "atoms" },
  progressIndicator: { title: "ProgressIndicator", component: ProgressIndicatorPage, category: "atoms" },
  step: { title: "Step", component: StepAtomPage, category: "atoms" },
  // Molecules
  datePicker: { title: "DatePicker", component: DatePickerPage, category: "molecules" },
  richTextInput: { title: "RichTextInput", component: RichTextInputPage, category: "molecules" },
  richTextEditToolbars: { title: "RichTextEditToolbars", component: RichTextEditToolbarsPage, category: "molecules" },
  search: { title: "Search", component: SearchPage, category: "molecules" },
  tabs: { title: "Tabs", component: TabsPage, category: "molecules" },
  accordion: { title: "Accordion", component: AccordionPage, category: "molecules" },
  commentPopover: { title: "CommentPopover", component: CommentPopoverPage, category: "molecules" },
  textInput: { title: "TextInput", component: TextInputPage, category: "molecules" },
  textarea: { title: "Textarea", component: TextareaPage, category: "molecules" },
  dropdownMenuItem: { title: "DropdownMenuItem", component: DropdownMenuItemPage, category: "molecules" },
  stage: { title: "Stage", component: StagePage, category: "molecules" },
  stepper: { title: "Stepper", component: StepperPage, category: "molecules" },
  radioCard: { title: "RadioCard", component: RadioCardPage, category: "molecules" },
  pagination: { title: "Pagination", component: PaginationPage, category: "molecules" },
  infobox: { title: "Infobox", component: InfoboxPage, category: "molecules" },
  buttonGroup: { title: "ButtonGroup", component: ButtonGroupPage, category: "molecules" },
  avatarGroup: { title: "AvatarGroup", component: AvatarGroupPage, category: "molecules" },
  chipInput: { title: "ChipInput", component: ChipInputPage, category: "molecules" },
  dialog: { title: "Dialog", component: DialogPage, category: "molecules" },
  dropdownMenu: { title: "DropdownMenu", component: DropdownMenuPage, category: "molecules" },
  dropdownList: { title: "DropdownList", component: DropdownListPage, category: "molecules" },
  subinfo: { title: "Subinfo", component: SubinfoPage, category: "molecules" },
  infofield: { title: "Infofield", component: InfofieldPage, category: "molecules" },
  miniInfobox: { title: "MiniInfobox", component: MiniInfoboxPage, category: "molecules" },
  attachment: { title: "Attachment", component: AttachmentPage, category: "molecules" },
  fileUploader: { title: "FileUploader", component: FileUploaderPage, category: "molecules" },
  emptyState: { title: "EmptyState", component: EmptyStatePage, category: "molecules" },
  expandableText: { title: "ExpandableText", component: ExpandableTextPage, category: "molecules" },
  aiChatInput: { title: "AiChatInput", component: AiChatInputPage, category: "molecules" },
  toast: { title: "Toast", component: ToastPage, category: "molecules" },
  // Organisms
  sideMenuItem: { title: "SideMenuItem", component: SideMenuItemPage, category: "organisms" },
  userButton: { title: "UserButton", component: UserButtonPage, category: "organisms" },
  tableCell: { title: "TableCell", component: TableCellPage, category: "organisms" },
  sideMenu: { title: "SideMenu", component: SideMenuPage, category: "organisms" },
  accessControlModal: { title: "AccessControlModal", component: AccessControlModalPage, category: "organisms" },
  modal: { title: "Modal", component: ModalPage, category: "organisms" },
  table: { title: "Table", component: TablePage, category: "organisms" },
  objectHeader: { title: "ObjectHeader", component: ObjectHeaderPage, category: "organisms" },
  hubHeader: { title: "HubHeader", component: HubHeaderPage, category: "organisms" },
  statusUpdate: { title: "StatusUpdate", component: StatusUpdatePage, category: "organisms" },
  sideMenuRichTextInput: { title: "SideMenuRichTextInput", component: SideMenuRichTextInputPage, category: "organisms" },
  filterPanel: { title: "FilterPanel", component: FilterPanelPage, category: "organisms" },
  creationFormPanel: { title: "CreationFormPanel", component: CreationFormPanelPage, category: "organisms" },
  documentViewer: { title: "DocumentViewer", component: DocumentViewerOrganismPage, category: "organisms" },
  paginationOrganism: { title: "Pagination (Organism)", component: PaginationOrganismPage, category: "organisms" },
  tableCellInlineEdit: { title: "TableCell — Inline Edit", component: TableCellInlineEditPage, category: "organisms" },
  tableCellInlineEditTable: { title: "TableCell — Inline Edit Table", component: TableCellInlineEditTablePage, category: "organisms" },
  // Templates
  objectPageTemplate: { title: "ObjectPage", component: ObjectPageTemplatePage, category: "templates" },
  documentViewerPageTemplate: { title: "DocumentViewerPage", component: DocumentViewerPageTemplatePage, category: "templates" },
  sidePanelTemplate: { title: "SidePanel", component: SidePanelPage, category: "templates" },
  aiHomepageTemplate: { title: "AiHomepage", component: AiHomepageTemplatePage, category: "templates" },
};

const PAGE_SECTIONS = [
  { title: "Atoms", category: "atoms" },
  { title: "Molecules", category: "molecules" },
  { title: "Organisms", category: "organisms" },
  { title: "Templates", category: "templates" },
];

const PAGE_ICON_MAP = {
  button: "CursorArrowRays",
  badge: "Tag",
  avatar: "UserCircle",
  checkbox: "CheckCircle",
  toggle: "AdjustmentsHorizontal",
  icon: "Sparkles",
  colors: "DocumentText",
  chip: "RectangleStack",
  radioButton: "ListBullet",
  link: "Link",
  tooltip: "ChatBubbleLeftRight",
  buttonBadge: "RectangleGroup",
  search: "MagnifyingGlass",
  tabs: "Squares2X2",
  accordion: "Bars3BottomLeft",
  commentPopover: "ChatBubbleLeftRight",
  textInput: "PencilSquare",
  textarea: "DocumentText",
  dropdownMenuItem: "QueueList",
  stepper: "ArrowTrendingUp",
  radioCard: "CreditCard",
  pagination: "ChevronDoubleRight",
  infobox: "InformationCircle",
  buttonGroup: "ViewColumns",
  avatarGroup: "UserGroup",
  chipInput: "Tag",
  dialog: "ChatBubbleLeftRight",
  dropdownMenu: "EllipsisVertical",
  dropdownList: "ListBullet",
  subinfo: "InformationCircle",
  infofield: "DocumentText",
  miniInfobox: "ExclamationCircle",
  attachment: "PaperClip",
  fileUploader: "ArrowUpTray",
  emptyState: "DocumentText",
  aiChatInput: "ChatBubbleLeftRight",
  toast: "InformationCircle",
  sideMenu: "Bars3",
  modal: "Square2Stack",
  table: "TableCells",
  objectHeader: "DocumentText",
  hubHeader: "RectangleGroup",
  filterPanel: "Funnel",
  creationFormPanel: "RectangleStack",
  documentViewer: "DocumentText",
  paginationOrganism: "ChevronDoubleRight",
  hubTemplate: "ViewColumns",
  objectPageTemplate: "Document",
  documentViewerPageTemplate: "DocumentDuplicate",
  sidePanelTemplate: "RectangleStack",
  aiHomepageTemplate: "Sparkles",
  step: "ArrowTrendingUp",
  datePicker: "Calendar",
  richTextInput: "PencilSquare",
  richTextEditToolbars: "Bars3BottomLeft",
  sideMenuRichTextInput: "PencilSquare",
  sideMenuItem: "Bars3",
  userButton: "UserCircle",
  tableCell: "TableCells",
  tableCellInlineEdit: "PencilSquare",
  tableCellInlineEditTable: "TableCells",
};

const getIconForPage = (pageKey) => PAGE_ICON_MAP[pageKey] || "DocumentText";

const LIBRARY_BASE_PATH = "/library";

const getPageFromPathname = (pathname) => {
  if (!pathname || !pathname.startsWith(`${LIBRARY_BASE_PATH}/`)) {
    return null;
  }

  const routeSegment = pathname.slice(`${LIBRARY_BASE_PATH}/`.length).toLowerCase();
  if (!routeSegment) {
    return null;
  }

  return Object.keys(PAGES).find((key) => key.toLowerCase() === routeSegment) || null;
};

const getLibraryRouteForPage = (pageKey) => `${LIBRARY_BASE_PATH}/${pageKey.toLowerCase()}`;

const matchesPageQuery = (query, key, page) =>
  page.title.toLowerCase().includes(query) ||
  page.category.toLowerCase().includes(query) ||
  key.toLowerCase().includes(query);

const groupEntriesByCategory = (entries) =>
  entries.reduce((accumulator, [key, page]) => {
    if (!accumulator[page.category]) accumulator[page.category] = [];
    accumulator[page.category].push([key, page]);
    return accumulator;
  }, {});

const buildSectionItems = ({ entries, activePage, setActivePage }) =>
  entries.map(([key, page]) => ({
    label: page.title,
    iconName: getIconForPage(key),
    state: activePage === key ? "active" : "enabled",
    onClick: () => setActivePage(key),
  }));

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

export const ComponentLibraryDemo = () => {
  const [activePage, setActivePage] = useState(() => getPageFromPathname(window.location.pathname) || "button");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handlePopState = () => {
      const routePage = getPageFromPathname(window.location.pathname);
      setActivePage(routePage || "button");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const targetPath = getLibraryRouteForPage(activePage);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, "", targetPath);
    }
  }, [activePage]);

  const filteredEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return Object.entries(PAGES);

    return Object.entries(PAGES).filter(([key, page]) => matchesPageQuery(query, key, page));
  }, [searchQuery]);

  const entriesByCategory = useMemo(() => groupEntriesByCategory(filteredEntries), [filteredEntries]);

  const sections = useMemo(
    () =>
      PAGE_SECTIONS
        .map((section, sectionIndex) => {
          const entries = entriesByCategory[section.category] || [];
          const items = buildSectionItems({ entries, activePage, setActivePage });

          return {
            title: section.title,
            dividerBefore: sectionIndex > 0,
            items,
          };
        })
        .filter((section) => section.items.length > 0),
    [entriesByCategory, activePage]
  );

  const selectedPage = PAGES[activePage];
  const CurrentPage = selectedPage?.component || ButtonPage;
  const fullBleed = Boolean(selectedPage?.fullBleed);

  return (
    <div style={APP_SHELL_STYLE}>
      {/* Side Menu */}
      <SideMenu
        variant="collapsed"
        expandOnHover={true}
        logo={
          <div style={{ fontSize: 20, fontWeight: 700, color: "var(--color-content-brand)" }}>
            Eureka
          </div>
        }
        showSearch={true}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search components..."
        sections={sections}
        user={SIDE_MENU_USER}
      />

      {/* Main Content */}
      <main style={{ ...MAIN_CONTENT_STYLE, padding: fullBleed ? 0 : 48 }}>
        {fullBleed ? (
          <CurrentPage />
        ) : (
          <div style={MAIN_CONTENT_INNER_STYLE}>
            <CurrentPage />
          </div>
        )}
      </main>
    </div>
  );
};

export default ComponentLibraryDemo;
