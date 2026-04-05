/**
 * Eureka Design System - Component Library Demo
 *
 * A comprehensive test page with side menu navigation
 * to browse all components from atoms to templates.
 */

import React, { useState } from "react";

// ─────────────────────────────────────────────
// ATOMS
// ─────────────────────────────────────────────
import { Button } from "./library/atoms/button.jsx";
import { Badge } from "./library/atoms/badge.jsx";
import { Avatar } from "./library/atoms/avatar.jsx";
import { Checkbox } from "./library/atoms/checkbox.jsx";
import { Toggle } from "./library/atoms/toggle.jsx";
import { Icon } from "./library/atoms/icon.jsx";
import { Chip } from "./library/atoms/chip.jsx";
import { RadioButton, RadioGroup } from "./library/atoms/radio-button.jsx";
import { Link } from "./library/atoms/link.jsx";
import { Step, STEP_STATUS } from "./library/atoms/step.jsx";
import { ButtonBadge } from "./library/atoms/button-badge.jsx";

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
import { Dialog, ConfirmDialog, AlertDialog } from "./library/molecules/dialog.jsx";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSection, SimpleDropdownMenu } from "./library/molecules/dropdown-menu.jsx";
import { DropdownList, DropdownSection, DropdownListItem } from "./library/molecules/dropdown-list.jsx";
import { Subinfo } from "./library/molecules/subinfo.jsx";
import { Infofield, InfofieldGroup } from "./library/molecules/infofield.jsx";
import { MiniInfobox } from "./library/molecules/miniinfobox.jsx";

// ─────────────────────────────────────────────
// ORGANISMS
// ─────────────────────────────────────────────
import { SideMenu } from "./library/organisms/side-menu/side-menu.jsx";
import { Modal } from "./library/organisms/modal.jsx";
import { Table, TableRow, TableCell, TableCellHeader, TableCellLinkRow, TableCellLinkedName } from "./library/organisms/table/table.jsx";
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
  ObjectHeaderStepper,
  ObjectHeaderTabs,
} from "./library/organisms/object-header.jsx";
import {
  HubHeader,
  HubHeaderTitle,
  HubHeaderActions,
  HubHeaderControls,
  HubHeaderRow,
  HubHeaderLeft,
  HubHeaderRight,
  HubHeaderSecondary,
} from "./library/organisms/hub-header.jsx";
import { Pagination as PaginationOrganism } from "./library/organisms/pagination.jsx";

// ─────────────────────────────────────────────
// TEMPLATES
// ─────────────────────────────────────────────
import { Hub } from "./library/templates/hub.jsx";
import { ObjectPage } from "./library/templates/object-page.jsx";

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

const Section = ({ title, description, children }) => (
  <section style={{ marginBottom: 48 }}>
    <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid var(--color-neutral-200)" }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--color-content-primary)", marginBottom: 4 }}>{title}</h2>
      {description && <p style={{ color: "var(--color-content-secondary)", fontSize: 14 }}>{description}</p>}
    </div>
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
  }}>
    {children}
  </div>
);

// ─────────────────────────────────────────────
// ATOM PAGES
// ─────────────────────────────────────────────

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
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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

<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
          <Button size="xs">Extra Small</Button>
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
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
<Badge color="informative">Informative</Badge>`}
    >
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
      <div style={{ display: "flex", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
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
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
      <div style={{ display: "flex", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
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
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);

  return (
    <Section title="Checkbox" description="A reusable checkbox with sizes and states.">
      {/* 1. All Checkbox States */}
      <PreviewComponent
        title="Checkbox States"
        code={`import { Checkbox } from "@/library/atoms/checkbox";

<Checkbox isSelected={false}>Unchecked option</Checkbox>
<Checkbox isSelected={true}>Checked option</Checkbox>
<Checkbox isDisabled>Disabled unchecked</Checkbox>
<Checkbox isDisabled defaultSelected>Disabled checked</Checkbox>`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Checkbox isSelected={checked1} onChange={setChecked1}>Unchecked option</Checkbox>
          <Checkbox isSelected={checked2} onChange={setChecked2}>Checked option</Checkbox>
          <Checkbox isDisabled>Disabled unchecked</Checkbox>
          <Checkbox isDisabled defaultSelected>Disabled checked</Checkbox>
        </div>
      </PreviewComponent>

      {/* 2. Checkbox Sizes */}
      <PreviewComponent
        title="Checkbox Sizes"
        code={`import { Checkbox } from "@/library/atoms/checkbox";

<Checkbox size="sm">Small checkbox</Checkbox>
<Checkbox size="md">Medium checkbox</Checkbox>`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Checkbox size="sm">Small checkbox</Checkbox>
          <Checkbox size="md">Medium checkbox</Checkbox>
        </div>
      </PreviewComponent>

      {/* 3. Interactive Example */}
      <PreviewComponent
        title="Interactive Checkbox"
        code={`import { Checkbox } from "@/library/atoms/checkbox";
import { useState } from "react";

const [checked, setChecked] = useState(false);

<Checkbox isSelected={checked} onChange={setChecked}>
  I agree to the terms and conditions
</Checkbox>`}
      >
        <Checkbox isSelected={checked1} onChange={setChecked1}>
          I agree to the terms and conditions
        </Checkbox>
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

const IconPage = () => (
  <Section title="Icon" description="A unified icon library wrapping Heroicons and Phosphor Icons.">
    {/* 1. Common Icons */}
    <PreviewComponent
      title="Common Icons"
      code={`import { Icon } from "@/library/atoms/icon";

<Icon name="Home" size="lg" />
<Icon name="User" size="lg" />
<Icon name="Cog6Tooth" size="lg" />
<Icon name="Bell" size="lg" />
<Icon name="MagnifyingGlass" size="lg" />
<Icon name="Plus" size="lg" />
<Icon name="Check" size="lg" />
<Icon name="XMark" size="lg" />
<Icon name="ChevronRight" size="lg" />
<Icon name="ArrowRight" size="lg" />`}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <Icon name="Home" size="lg" />
        <Icon name="User" size="lg" />
        <Icon name="Cog6Tooth" size="lg" />
        <Icon name="Bell" size="lg" />
        <Icon name="MagnifyingGlass" size="lg" />
        <Icon name="Plus" size="lg" />
        <Icon name="Check" size="lg" />
        <Icon name="XMark" size="lg" />
        <Icon name="ChevronRight" size="lg" />
        <Icon name="ArrowRight" size="lg" />
      </div>
    </PreviewComponent>

    {/* 2. Icon Sizes */}
    <PreviewComponent
      title="Icon Sizes"
      code={`import { Icon } from "@/library/atoms/icon";

<Icon name="Home" size="xs" />
<Icon name="Home" size="sm" />
<Icon name="Home" size="md" />
<Icon name="Home" size="lg" />
<Icon name="Home" size="xl" />`}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
        <Icon name="Home" size="xs" />
        <Icon name="Home" size="sm" />
        <Icon name="Home" size="md" />
        <Icon name="Home" size="lg" />
        <Icon name="Home" size="xl" />
      </div>
    </PreviewComponent>

    {/* 3. Outline Variant */}
    <PreviewComponent
      title="Outline Icons"
      code={`import { Icon } from "@/library/atoms/icon";

<Icon name="Heart" variant="outline" size="xl" />
<Icon name="Star" variant="outline" size="xl" />
<Icon name="Folder" variant="outline" size="xl" />`}
    >
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Icon name="Heart" variant="outline" size="xl" />
        <Icon name="Star" variant="outline" size="xl" />
        <Icon name="Folder" variant="outline" size="xl" />
      </div>
    </PreviewComponent>

    {/* 4. Solid Variant */}
    <PreviewComponent
      title="Solid Icons"
      code={`import { Icon } from "@/library/atoms/icon";

<Icon name="Heart" variant="solid" size="xl" />
<Icon name="Star" variant="solid" size="xl" />
<Icon name="Folder" variant="solid" size="xl" />`}
    >
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Icon name="Heart" variant="solid" size="xl" />
        <Icon name="Star" variant="solid" size="xl" />
        <Icon name="Folder" variant="solid" size="xl" />
      </div>
    </PreviewComponent>
  </Section>
);

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
<Chip color="#10B981">Custom Green</Chip>`}
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
<Link href="#" iconLeading={<Icon name="ExternalLink" size="sm" />} target="_blank">
  Open External
</Link>`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Link href="#" iconLeading={<Icon name="ArrowLeft" size="sm" />}>Back</Link>
        <Link href="#" iconLeading={<Icon name="ExternalLink" size="sm" />} target="_blank">Open External</Link>
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
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonBadge state="enabled" badgeLabel="5">Enabled</ButtonBadge>
          <ButtonBadge state="active" badgeLabel="5">Active</ButtonBadge>
          <ButtonBadge state="disabled" badgeLabel="5" isDisabled>Disabled</ButtonBadge>
        </div>
      </PreviewComponent>

      {/* 2. ButtonBadge Sizes */}
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

      {/* 3. Basic Usage */}
      <PreviewComponent
        title="Basic ButtonBadge"
        code={`import { ButtonBadge } from "@/library/atoms/button-badge";

<ButtonBadge badgeLabel="5">Notifications</ButtonBadge>
<ButtonBadge badgeLabel="12">Messages</ButtonBadge>
<ButtonBadge badgeLabel="New">Updates</ButtonBadge>`}
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonBadge badgeLabel="5">Notifications</ButtonBadge>
          <ButtonBadge badgeLabel="12">Messages</ButtonBadge>
          <ButtonBadge badgeLabel="New">Updates</ButtonBadge>
        </div>
      </PreviewComponent>

      {/* 4. With Icons */}
      <PreviewComponent
        title="ButtonBadge with Icons"
        code={`import { ButtonBadge } from "@/library/atoms/button-badge";

<ButtonBadge iconName="Bell" badgeLabel="3">Alerts</ButtonBadge>
<ButtonBadge iconName="Envelope" badgeLabel="99+">Inbox</ButtonBadge>
<ButtonBadge iconName="ShoppingCart" badgeLabel="2">Cart</ButtonBadge>`}
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonBadge iconName="Bell" badgeLabel="3">Alerts</ButtonBadge>
          <ButtonBadge iconName="Envelope" badgeLabel="99+">Inbox</ButtonBadge>
          <ButtonBadge iconName="ShoppingCart" badgeLabel="2">Cart</ButtonBadge>
        </div>
      </PreviewComponent>

      {/* 5. Without Badge Variant */}
      <PreviewComponent
        title="Without Badge"
        code={`import { ButtonBadge } from "@/library/atoms/button-badge";

<ButtonBadge variant="without-badge" iconName="Funnel">Filter</ButtonBadge>
<ButtonBadge variant="without-badge" iconName="ArrowsUpDown">Sort</ButtonBadge>
<ButtonBadge variant="without-badge" iconRightName="ChevronDown">Dropdown</ButtonBadge>`}
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonBadge variant="without-badge" iconName="Funnel">Filter</ButtonBadge>
          <ButtonBadge variant="without-badge" iconName="ArrowsUpDown">Sort</ButtonBadge>
          <ButtonBadge variant="without-badge" iconRightName="ChevronDown">Dropdown</ButtonBadge>
        </div>
      </PreviewComponent>

      {/* 6. Interactive Filter Example */}
      <PreviewComponent
        title="Interactive Filter Example"
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
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Section title="Search" description="A pill-shaped search input with icon.">
      <SubSection title="Sizes">
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
          <Search size="sm" placeholder="Small search..." />
          <Search size="md" placeholder="Medium search..." />
          <Search size="lg" placeholder="Large search..." />
        </div>
      </SubSection>

      <SubSection title="Controlled Input">
        <DemoBox>
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
        </DemoBox>
      </SubSection>

      <SubSection title="States">
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
          <Search placeholder="Default search..." />
          <Search placeholder="With value" defaultValue="React components" />
          <Search placeholder="Disabled search..." isDisabled />
        </div>
      </SubSection>

      <SubSection title="Collapsed Mode">
        <p style={{ marginBottom: 16, color: "var(--color-content-secondary)", fontSize: 14 }}>
          Used in collapsed side menus:
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          <Search collapsed />
          <Search collapsed size="lg" />
        </div>
      </SubSection>

      <SubSection title="Without Clear Button">
        <div style={{ maxWidth: 400 }}>
          <Search placeholder="No clear button" defaultValue="Some text" showClear={false} />
        </div>
      </SubSection>
    </Section>
  );
};

const TabsPage = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <Section title="Tabs" description="A tab navigation component with optional badges and icons.">
      <SubSection title="Basic Tabs">
        <DemoBox>
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
        </DemoBox>
      </SubSection>

      <SubSection title="With Badges">
        <DemoBox>
          <Tabs defaultSelectedKey="messages">
            <Tab id="messages" badge={12}>Messages</Tab>
            <Tab id="notifications" badge={3}>Notifications</Tab>
            <Tab id="updates">Updates</Tab>
          </Tabs>
        </DemoBox>
      </SubSection>

      <SubSection title="With Icons">
        <DemoBox>
          <Tabs defaultSelectedKey="home">
            <Tab id="home" icon={<Icon name="Home" size="sm" />}>Home</Tab>
            <Tab id="profile" icon={<Icon name="User" size="sm" />}>Profile</Tab>
            <Tab id="settings" icon={<Icon name="Cog6Tooth" size="sm" />}>Settings</Tab>
          </Tabs>
        </DemoBox>
      </SubSection>
    </Section>
  );
};

const AccordionPage = () => (
  <Section title="Accordion" description="An expandable/collapsible content container.">
    <SubSection title="Single Accordion">
      <DemoBox>
        <Accordion title="Click to expand" defaultExpanded>
          <p>This is the accordion content. It can contain any React elements.</p>
        </Accordion>
      </DemoBox>
    </SubSection>

    <SubSection title="Accordion Group">
      <DemoBox>
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
      </DemoBox>
    </SubSection>

    <SubSection title="With Icon and Action">
      <DemoBox>
        <Accordion
          title="Settings"
          iconName="Cog6Tooth"
          actionLabel="Edit"
          onActionClick={() => alert("Edit clicked")}
        >
          <p>Accordion with icon and action button.</p>
        </Accordion>
      </DemoBox>
    </SubSection>

    <SubSection title="Sizes">
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
    </SubSection>
  </Section>
);

const TextInputPage = () => (
  <Section title="TextInput" description="A complete text input with label, input field, and helper/error text.">
    <SubSection title="States">
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 400 }}>
        <TextInput label="Default" placeholder="Enter text..." />
        <TextInput label="With Helper" placeholder="Enter text..." helper="This is helper text" />
        <TextInput label="Error State" placeholder="Enter text..." error="This field is required" />
        <TextInput label="Success State" placeholder="Enter text..." success="Looks good!" />
        <TextInput label="Disabled" placeholder="Enter text..." isDisabled />
        <TextInput label="Read Only" value="Read only value" isReadOnly />
      </div>
    </SubSection>

    <SubSection title="Required Field">
      <div style={{ maxWidth: 400 }}>
        <TextInput label="Email" type="email" placeholder="you@example.com" isRequired />
      </div>
    </SubSection>

    <SubSection title="Input Types">
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 400 }}>
        <TextInput label="Text" type="text" placeholder="Plain text" />
        <TextInput label="Email" type="email" placeholder="email@example.com" />
        <TextInput label="Password" type="password" placeholder="Enter password" />
        <TextInput label="Number" type="number" placeholder="0" />
      </div>
    </SubSection>
  </Section>
);

const DropdownMenuItemPage = () => (
  <Section title="DropdownMenuItem" description="A menu item for dropdown menus with icons, badges, and various states.">
    <SubSection title="Default Variant">
      <DemoBox>
        <div style={{ width: 280, display: "flex", flexDirection: "column" }}>
          <DropdownMenuItem label="Profile" iconName="User" />
          <DropdownMenuItem label="Settings" iconName="Cog6Tooth" />
          <DropdownMenuItem label="Help" iconName="QuestionMarkCircle" shortcut="?" />
          <DropdownMenuItem label="Notifications" iconName="Bell" badge="3" />
        </div>
      </DemoBox>
    </SubSection>

    <SubSection title="States">
      <DemoBox>
        <div style={{ width: 280, display: "flex", flexDirection: "column" }}>
          <DropdownMenuItem label="Default" iconName="Home" />
          <DropdownMenuItem label="Active" iconName="Star" active />
          <DropdownMenuItem label="Disabled" iconName="LockClosed" isDisabled />
        </div>
      </DemoBox>
    </SubSection>

    <SubSection title="Destructive Variant">
      <DemoBox>
        <div style={{ width: 280, display: "flex", flexDirection: "column" }}>
          <DropdownMenuItem label="Delete" iconName="Trash" variant="destructive" />
          <DropdownMenuItem label="Remove" iconName="XMark" variant="destructive" />
          <DropdownMenuItem label="Disabled Delete" iconName="Trash" variant="destructive" isDisabled />
        </div>
      </DemoBox>
    </SubSection>

    <SubSection title="With Description">
      <DemoBox>
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
      </DemoBox>
    </SubSection>

    <SubSection title="With Trailing Icon (Submenu)">
      <DemoBox>
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
      </DemoBox>
    </SubSection>

    <SubSection title="Dividers and Labels">
      <DemoBox>
        <div style={{ width: 280, display: "flex", flexDirection: "column" }}>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem label="Profile" iconName="User" />
          <DropdownMenuItem label="Settings" iconName="Cog6Tooth" />
          <DropdownMenuDivider />
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem label="Sign Out" iconName="ArrowRightOnRectangle" />
        </div>
      </DemoBox>
    </SubSection>

    <SubSection title="Sizes">
      <DemoBox>
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
      </DemoBox>
    </SubSection>
  </Section>
);

const StepperPage = () => (
  <Section title="Stepper" description="A progress stepper showing multiple steps with status indicators.">
    <SubSection title="Basic Stepper">
      <DemoBox>
        <Stepper
          currentStep={1}
          steps={[
            { title: "Draft", subtitle: "Jan 1, 2024" },
            { title: "Review", subtitle: "Jan 15, 2024" },
            { title: "Approved" },
            { title: "Published" },
          ]}
        />
      </DemoBox>
    </SubSection>

    <SubSection title="Vertical Stepper">
      <DemoBox>
        <div style={{ height: 300 }}>
          <Stepper
            orientation="vertical"
            currentStep={2}
            steps={[
              { title: "Step 1", subtitle: "Completed" },
              { title: "Step 2", subtitle: "Completed" },
              { title: "Step 3", subtitle: "Current" },
              { title: "Step 4", subtitle: "Pending" },
            ]}
          />
        </div>
      </DemoBox>
    </SubSection>

    <SubSection title="Without Background">
      <DemoBox>
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
      </DemoBox>
    </SubSection>
  </Section>
);

const TextareaPage = () => (
  <Section title="Textarea" description="A complete textarea with label, textarea field, and helper/error text.">
    <SubSection title="States">
      <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 400 }}>
        <Textarea label="Default" placeholder="Enter your message..." />
        <Textarea label="With Helper" placeholder="Enter your message..." helper="Max 500 characters" />
        <Textarea label="Error State" placeholder="Enter your message..." error="This field is required" />
        <Textarea label="Success State" placeholder="Enter your message..." success="Message saved!" />
        <Textarea label="Disabled" placeholder="Enter your message..." isDisabled />
        <Textarea label="Read Only" value="This is read-only content" isReadOnly />
      </div>
    </SubSection>

    <SubSection title="Required Field">
      <div style={{ maxWidth: 400 }}>
        <Textarea label="Description" placeholder="Enter description..." isRequired rows={4} />
      </div>
    </SubSection>
  </Section>
);

const RadioCardPage = () => {
  const [selected, setSelected] = useState("basic");

  return (
    <Section title="RadioCard" description="A selectable card with a radio button, label, and optional info items.">
      <SubSection title="Basic Usage">
        <DemoBox>
          <RadioCardGroup value={selected} onChange={setSelected}>
            <RadioCard value="basic" label="Basic Plan" info="$9/month,5 users,10GB storage" />
            <RadioCard value="pro" label="Pro Plan" info="$29/month,25 users,100GB storage" />
            <RadioCard value="enterprise" label="Enterprise Plan" info="Custom pricing,Unlimited users,Unlimited storage" />
          </RadioCardGroup>
        </DemoBox>
      </SubSection>

      <SubSection title="With Icons">
        <DemoBox>
          <RadioCardGroup value={selected} onChange={setSelected}>
            <RadioCard value="basic" label="Credit Card" icon={<Icon name="CreditCard" size="md" />} info="Visa, Mastercard, Amex" />
            <RadioCard value="pro" label="PayPal" icon={<Icon name="Wallet" size="md" />} info="Pay with your PayPal account" />
          </RadioCardGroup>
        </DemoBox>
      </SubSection>

      <SubSection title="Disabled State">
        <DemoBox>
          <RadioCardGroup value="basic">
            <RadioCard value="basic" label="Available Option" info="This option is available" />
            <RadioCard value="pro" label="Unavailable Option" info="This option is not available" isDisabled />
          </RadioCardGroup>
        </DemoBox>
      </SubSection>
    </Section>
  );
};

const PaginationPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  return (
    <Section title="Pagination" description="A pagination control with page numbers, navigation buttons, and per-page selector.">
      <SubSection title="Full Pagination">
        <DemoBox>
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
        </DemoBox>
      </SubSection>

      <SubSection title="Simple Pagination">
        <DemoBox>
          <SimplePagination
            currentPage={page}
            totalPages={10}
            onPageChange={setPage}
          />
        </DemoBox>
      </SubSection>

      <SubSection title="With First/Last Buttons">
        <DemoBox>
          <Pagination
            currentPage={page}
            totalPages={20}
            onPageChange={setPage}
            showFirstLast
            showPerPage={false}
          />
        </DemoBox>
      </SubSection>
    </Section>
  );
};

const InfoboxPage = () => (
  <Section title="Infobox" description="A contextual message box with variants for success, warning, error, info, and neutral states.">
    <SubSection title="Variants">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Infobox variant="info" title="Information" description="This is an informational message." />
        <Infobox variant="success" title="Success" description="Your changes have been saved successfully." />
        <Infobox variant="warning" title="Warning" description="Please review your changes before proceeding." />
        <Infobox variant="error" title="Error" description="An error occurred while processing your request." />
        <Infobox variant="neutral" title="Note" description="This is a neutral informational message." />
      </div>
    </SubSection>

    <SubSection title="With Action">
      <DemoBox>
        <Infobox
          variant="warning"
          title="Unsaved Changes"
          description="You have unsaved changes that will be lost."
          actionLabel="Save Now"
          onAction={() => alert("Save clicked")}
        />
      </DemoBox>
    </SubSection>
  </Section>
);

const ButtonGroupPage = () => {
  const [view, setView] = useState("list");

  return (
    <Section title="ButtonGroup" description="A horizontal group of connected buttons using ButtonBadge atoms.">
      <SubSection title="Basic Usage">
        <DemoBox>
          <ButtonGroup value={view} onChange={setView}>
            <ButtonGroupItem value="list" iconName="QueueList">List</ButtonGroupItem>
            <ButtonGroupItem value="grid" iconName="Squares2X2">Grid</ButtonGroupItem>
            <ButtonGroupItem value="kanban" iconName="ViewColumns">Kanban</ButtonGroupItem>
          </ButtonGroup>
          <p style={{ marginTop: 16, color: "var(--color-content-secondary)", fontSize: 14 }}>
            Selected: {view}
          </p>
        </DemoBox>
      </SubSection>

      <SubSection title="Icon Only">
        <DemoBox>
          <ButtonGroup value="left">
            <ButtonGroupItem value="left" iconName="Bars3BottomLeft" />
            <ButtonGroupItem value="center" iconName="Bars3" />
            <ButtonGroupItem value="right" iconName="Bars3BottomRight" />
          </ButtonGroup>
        </DemoBox>
      </SubSection>

      <SubSection title="Sizes">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Row label="Medium">
            <ButtonGroup size="md" value="a">
              <ButtonGroupItem value="a">Option A</ButtonGroupItem>
              <ButtonGroupItem value="b">Option B</ButtonGroupItem>
            </ButtonGroup>
          </Row>
          <Row label="Large">
            <ButtonGroup size="lg" value="a">
              <ButtonGroupItem value="a">Option A</ButtonGroupItem>
              <ButtonGroupItem value="b">Option B</ButtonGroupItem>
            </ButtonGroup>
          </Row>
        </div>
      </SubSection>
    </Section>
  );
};

const AvatarGroupPage = () => (
  <Section title="AvatarGroup" description="A stacked group of avatars with overflow indicator.">
    <SubSection title="Basic Usage">
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Row label="3 Avatars">
          <AvatarGroup
            avatars={[
              { name: "John Doe" },
              { name: "Jane Smith" },
              { name: "Bob Wilson" },
            ]}
          />
        </Row>
        <Row label="With Overflow">
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
        </Row>
      </div>
    </SubSection>

    <SubSection title="Sizes">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Row label="Small">
          <AvatarGroup size="sm" avatars={[{ name: "A" }, { name: "B" }, { name: "C" }]} />
        </Row>
        <Row label="Medium">
          <AvatarGroup size="md" avatars={[{ name: "A" }, { name: "B" }, { name: "C" }]} />
        </Row>
        <Row label="Large">
          <AvatarGroup size="lg" avatars={[{ name: "A" }, { name: "B" }, { name: "C" }]} />
        </Row>
        <Row label="XL">
          <AvatarGroup size="xl" avatars={[{ name: "A" }, { name: "B" }, { name: "C" }]} />
        </Row>
      </div>
    </SubSection>
  </Section>
);

const ChipInputPage = () => {
  const [chips, setChips] = useState([
    { id: "1", label: "React", color: "#7DBEFF" },
    { id: "2", label: "TypeScript", color: "#73E5AC" },
  ]);

  return (
    <Section title="ChipInput" description="A tag/chip input field with label, search functionality, and chip management.">
      <SubSection title="Basic Usage">
        <DemoBox>
          <div style={{ maxWidth: 400 }}>
            <ChipInput
              label="Tags"
              placeholder="Add tags..."
              chips={chips}
              onChange={setChips}
            />
          </div>
        </DemoBox>
      </SubSection>

      <SubSection title="With Required">
        <DemoBox>
          <div style={{ maxWidth: 400 }}>
            <ChipInput
              label="Skills"
              required
              placeholder="Add skills..."
              chips={[{ id: "1", label: "JavaScript" }]}
            />
          </div>
        </DemoBox>
      </SubSection>

      <SubSection title="Error State">
        <DemoBox>
          <div style={{ maxWidth: 400 }}>
            <ChipInput
              label="Categories"
              placeholder="Select categories..."
              chips={[]}
              error
              helperText="Please select at least one category"
            />
          </div>
        </DemoBox>
      </SubSection>

      <SubSection title="Disabled">
        <DemoBox>
          <div style={{ maxWidth: 400 }}>
            <ChipInput
              label="Disabled Input"
              placeholder="Cannot edit..."
              chips={[{ id: "1", label: "Fixed Tag" }]}
              isDisabled
            />
          </div>
        </DemoBox>
      </SubSection>
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
      <SubSection title="Variants">
        <DemoBox>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button onClick={() => setIsInfoOpen(true)}>Info Dialog</Button>
            <Button variant="positive" onClick={() => setIsConfirmOpen(true)}>Confirm Dialog</Button>
            <Button variant="secondary" onClick={() => setIsAlertOpen(true)}>Alert Dialog</Button>
            <Button variant="negative" onClick={() => setIsErrorOpen(true)}>Error Dialog</Button>
          </div>
        </DemoBox>
      </SubSection>

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

      <AlertDialog
        isOpen={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        variant="warning"
        title="Warning"
        buttonLabel="Acknowledge"
      >
        Please be aware that this action cannot be undone.
      </AlertDialog>

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
    </Section>
  );
};

const DropdownMenuPage = () => (
  <Section title="DropdownMenu" description="A dropdown menu container with sections, items, and optional footer.">
    <SubSection title="Basic Dropdown">
      <DemoBox>
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
      </DemoBox>
    </SubSection>

    <SubSection title="Simple Dropdown">
      <DemoBox>
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
      </DemoBox>
    </SubSection>
  </Section>
);

const DropdownListPage = () => {
  const [selected, setSelected] = useState(["pd"]);

  const handleChange = ({ value, checked }) => {
    if (checked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter(v => v !== value));
    }
  };

  return (
    <Section title="DropdownList" description="A searchable, sectioned list with optional 'Add' action.">
      <SubSection title="Basic Usage">
        <DemoBox>
          <div style={{ maxWidth: 320 }}>
            <DropdownList>
              <DropdownSection title="Neurology">
                <DropdownListItem value="ad" checked={selected.includes("ad")} onChange={handleChange}>
                  Alzheimer's disease
                </DropdownListItem>
                <DropdownListItem value="pd" checked={selected.includes("pd")} onChange={handleChange}>
                  Parkinson's disease
                </DropdownListItem>
              </DropdownSection>
              <DropdownSection title="Oncology">
                <DropdownListItem value="bc" checked={selected.includes("bc")} onChange={handleChange} subinfo="Phase 2">
                  Breast cancer
                </DropdownListItem>
                <DropdownListItem value="lc" checked={selected.includes("lc")} onChange={handleChange} subinfo="Phase 1">
                  Lung cancer
                </DropdownListItem>
                
              </DropdownSection>
            </DropdownList>
          </div>
        </DemoBox>
      </SubSection>

      <SubSection title="Without Search">
        <DemoBox>
          <div style={{ maxWidth: 320 }}>
            <DropdownList noSearch noAdd>
              <DropdownSection>
                <DropdownListItem value="a">Option A</DropdownListItem>
                <DropdownListItem value="b">Option B</DropdownListItem>
                <DropdownListItem value="c">Option C</DropdownListItem>
              </DropdownSection>
            </DropdownList>
          </div>
        </DemoBox>
      </SubSection>
    </Section>
  );
};

const SubinfoPage = () => (
  <Section title="Subinfo" description="A flexible info display component for showing various types of data.">
    <SubSection title="Value Variant">
      <DemoBox>
        <div style={{ display: "flex", gap: 24 }}>
          <Subinfo label="Owner">John Doe</Subinfo>
          <Subinfo label="Status" iconName="Clock">In Progress</Subinfo>
          <Subinfo label="Priority" href="#">High</Subinfo>
        </div>
      </DemoBox>
    </SubSection>

    <SubSection title="Avatar Variant">
      <DemoBox>
        <div style={{ display: "flex", gap: 24 }}>
          <Subinfo variant="avatar" initials="JD" href="#">John Doe</Subinfo>
          <Subinfo variant="avatar" initials="AS">Alice Smith</Subinfo>
        </div>
      </DemoBox>
    </SubSection>

    <SubSection title="List Variant">
      <DemoBox>
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
      </DemoBox>
    </SubSection>
  </Section>
);

const InfofieldPage = () => (
  <Section title="Infofield" description="A read-only field displaying a label with various value types.">
    <SubSection title="Text Values">
      <DemoBox>
        <InfofieldGroup>
          <Infofield label="Name" value="John Doe" />
          <Infofield label="Email" value="john@example.com" iconName="Envelope" />
          <Infofield label="Empty Field" />
        </InfofieldGroup>
      </DemoBox>
    </SubSection>

    <SubSection title="Badges">
      <DemoBox>
        <Infofield
          label="Status"
          variant="badges"
          values={["Active", "Verified", "Premium"]}
        />
      </DemoBox>
    </SubSection>

    <SubSection title="Chips">
      <DemoBox>
        <Infofield
          label="Tags"
          variant="chips"
          values={[
            { label: "React", color: "#7DBEFF" },
            { label: "TypeScript", color: "#cx   jnkj,ytèçàà))gftdefr73E5AC" },
            { label: "Node.js", color: "#FFAE70" },
          ]}
        />
      </DemoBox>
    </SubSection>

    <SubSection title="With Overflow">
      <DemoBox>
        <Infofield
          label="Categories"
          variant="badges"
          values={["Cat 1", "Cat 2", "Cat 3", "Cat 4", "Cat 5", "Cat 6"]}
          maxItems={4}
        />
      </DemoBox>
    </SubSection>
  </Section>
);

const MiniInfoboxPage = () => (
  <Section title="MiniInfobox" description="A compact inline message with an icon and text.">
    <SubSection title="Variants">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <MiniInfobox variant="info" message="This is an info message" />
        <MiniInfobox variant="success" message="Operation completed successfully" />
        <MiniInfobox variant="warning" message="Please review your changes" />
        <MiniInfobox variant="error" message="An error occurred" />
        <MiniInfobox variant="neutral" message="This is a neutral message" />
        <MiniInfobox variant="ai" message="AI-generated content" />
      </div>
    </SubSection>
  </Section>
);

// ─────────────────────────────────────────────
// ORGANISM PAGES
// ─────────────────────────────────────────────

const SideMenuPage = () => (
  <Section title="SideMenu" description="A complete sidebar navigation with logo, search, menu sections, and user profile.">
    <SubSection title="Preview">
      <p style={{ color: "var(--color-content-secondary)", marginBottom: 16 }}>
        The SideMenu component is being used as the main navigation for this page.
        Hover over the left sidebar to see it expand.
      </p>
      <DemoBox>
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
      </DemoBox>
    </SubSection>
  </Section>
);

const ModalPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeOpen, setIsLargeOpen] = useState(false);

  return (
    <Section title="Modal" description="A full-featured modal dialog with header, content area, and footer actions.">
      <SubSection title="Basic Modal">
        <DemoBox>
          <div style={{ display: "flex", gap: 12 }}>
            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
            <Button variant="secondary" onClick={() => setIsLargeOpen(true)}>Large Modal</Button>
          </div>
        </DemoBox>
      </SubSection>

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
    <SubSection title="Column API (Recommended)">
      <p style={{ marginBottom: 16, color: "var(--color-content-secondary)", fontSize: 14 }}>
        Define columns once with a variant, then all cells in that column stay consistent.
      </p>
      <DemoBox>
        <Table
          columns={[
            { key: "title", header: "Title", variant: "short-text", width: "220px" },
            { key: "company", header: "Company", variant: "linked-object", width: "240px" },
            { key: "status", header: "Status", variant: "badge", width: "180px" },
            { key: "action", header: "Action", variant: "button" },
          ]}
          rows={[
            {
              id: "row-1",
              title: "SNE-101",
              company: <Link size="lg" iconLeading={<Icon name="BuildingOffice" />}>S&E Bio</Link>,
              status: <Badge color="positive">Active</Badge>,
              action: { iconName: "EllipsisVertical", label: "", buttonVariant: "secondary" },
            },
            {
              id: "row-2",
              title: "test SPRT",
              company: <Link size="lg" iconLeading={<Icon name="BuildingOffice" />}>testing SPRT</Link>,
              status: <Badge color="warning">Pending</Badge>,
              action: { label: "Open", buttonVariant: "secondary" },
            },
            {
              id: "row-3",
              title: "whatever",
              company: <Link size="lg" iconLeading={<Icon name="BuildingOffice" />}>test SPRT</Link>,
              status: <Badge color="neutral">Archived</Badge>,
              action: { iconName: "EllipsisVertical", label: "", buttonVariant: "secondary" },
            },
          ]}
        />
      </DemoBox>
    </SubSection>

    <SubSection title="All Cell Variants">
      <p style={{ marginBottom: 16, color: "var(--color-content-secondary)", fontSize: 14 }}>
        Demonstration of all table cell column types from the design system.
      </p>
      <DemoBox>
        <Table
          columns={[
            { key: "shortText", header: "short-text", variant: "short-text", width: "300px" },
            { key: "longText", header: "long-text", variant: "long-text", width: "300px" },
            { key: "twoLevel", header: "two-level", variant: "two-level", width: "300px" },
            { key: "twoLevelObjects", header: "two-level-objects", variant: "two-level-objects", width: "300px" },
            { key: "badge", header: "badge", variant: "badge", width: "300px" },
            { key: "tags", header: "tags (chips)", variant: "tags", width: "300px" },
            { key: "tag1line", header: "tag-1line", variant: "tag-1line", width: "300px" },
            { key: "checkbox", header: "checkbox", variant: "checkbox", width: "300px" },
            { key: "linkedValue", header: "linked-value", variant: "linked-value", width: "300px" },
            { key: "linkedObject", header: "linked-object", variant: "linked-object", width: "300px" },
            { key: "actions", header: "actions", variant: "button", sticky: true, width: "56px" },
          ]}
          rows={[
            {
              id: "row-1",
              shortText: "Short text",
              longText: "This is a longer text that might wrap to multiple lines and get truncated with ellipsis after three lines.",
              twoLevel: (
                <>
                  <div style={{ color: "var(--color-content-secondary)", fontSize: 12 }}>Title</div>
                  <div style={{ color: "var(--color-content-primary)", fontSize: 12 }}>Content value</div>
                </>
              ),
              twoLevelObjects: (
                <>
                  <TableCellLinkRow size="lg" icon={<Icon name="Beaker" size="md" />}>Primary Link</TableCellLinkRow>
                  <TableCellLinkRow size="md" icon={<Icon name="Tag" size="sm" />}>Secondary Link</TableCellLinkRow>
                </>
              ),
              badge: <Badge color="positive">Active</Badge>,
              tags: (
                <>
                  <Chip color="var(--color-accent-blue)">Tag 1</Chip>
                  <Chip color="var(--color-accent-cyan)">Tag 2</Chip>
                  <Chip color="var(--color-accent-yellow)">Tag 3</Chip>
                </>
              ),
              tag1line: (
                <>
                  <Chip color="var(--color-accent-blue)">Label</Chip>
                  <Chip color="var(--color-accent-cyan)">Label</Chip>
                  <Badge>+3</Badge>
                </>
              ),
              checkbox: <Checkbox size="sm" />,
              linkedValue: (
                <>
                  <Icon name="Beaker" />
                  <TableCellLinkedName>Item Name</TableCellLinkedName>
                  <Badge>+1</Badge>
                </>
              ),
              linkedObject: (
                <>
                  <Link size="lg" iconLeading={<Icon name="Beaker" />} iconTrailing={<Icon name="ChevronRight" />}>View Item</Link>
                  <Badge>+1</Badge>
                </>
              ),
              actions: { iconName: "EllipsisVertical", label: "", buttonVariant: "secondary" },
            },
            {
              id: "row-2",
              shortText: (
                <>
                  <Icon name="Tag" />
                  With icon
                </>
              ),
              longText: "Long text cell with leading icon that aligns to the top of the content block.",
              twoLevel: (
                <>
                  <div style={{ color: "var(--color-content-secondary)", fontSize: 12 }}>Phase</div>
                  <div style={{ color: "var(--color-content-primary)", fontSize: 12 }}>Phase 2 / Completed</div>
                </>
              ),
              twoLevelObjects: (
                <>
                  <TableCellLinkRow size="lg" icon={<Icon name="Building" size="md" />}>Company Name</TableCellLinkRow>
                  <TableCellLinkRow size="md" icon={<Icon name="MapPin" size="sm" />}>Location Info</TableCellLinkRow>
                </>
              ),
              badge: <Badge color="warning">Pending</Badge>,
              tags: (
                <>
                  <Chip color="var(--color-accent-red)">Urgent</Chip>
                  <Chip color="var(--color-accent-orange)">Review</Chip>
                </>
              ),
              tag1line: (
                <>
                  <Chip color="var(--color-accent-purple)">AI</Chip>
                  <Chip color="var(--color-accent-green)">ML</Chip>
                  <Chip color="var(--color-accent-pink)">Data</Chip>
                  <Badge>+2</Badge>
                </>
              ),
              checkbox: <Checkbox size="sm" isSelected />,
              linkedValue: (
                <>
                  <Icon name="User" />
                  <TableCellLinkedName>John Doe</TableCellLinkedName>
                </>
              ),
              linkedObject: <Link size="lg" iconLeading={<Icon name="Document" />}>Document.pdf</Link>,
              actions: { iconName: "EllipsisVertical", label: "", buttonVariant: "secondary" },
            },
            {
              id: "row-3",
              shortText: "Plain text",
              longText: "Another example of multi-line content that demonstrates how the cell handles text overflow gracefully.",
              twoLevel: (
                <>
                  <div style={{ color: "var(--color-content-secondary)", fontSize: 12 }}>Status</div>
                  <div style={{ color: "var(--color-content-primary)", fontSize: 12 }}>In Progress</div>
                </>
              ),
              twoLevelObjects: (
                <>
                  <TableCellLinkRow size="lg" icon={<Icon name="Cube" size="md" />}>Product Name</TableCellLinkRow>
                  <TableCellLinkRow size="md" icon={<Icon name="Tag" size="sm" />}>SKU-12345</TableCellLinkRow>
                </>
              ),
              badge: <Badge color="negative">Error</Badge>,
              tags: <Chip color="var(--color-accent-brown)">Archive</Chip>,
              tag1line: <Chip color="var(--color-accent-blue)">Only One</Chip>,
              checkbox: <Checkbox size="sm" isDisabled />,
              linkedValue: (
                <>
                  <Icon name="Building" />
                  <TableCellLinkedName>Acme Corp</TableCellLinkedName>
                  <Badge>+5</Badge>
                </>
              ),
              linkedObject: (
                <>
                  <Link size="lg" iconLeading={<Icon name="Link" />} iconTrailing={<Icon name="ArrowTopRightOnSquare" />}>External</Link>
                  <Badge>New</Badge>
                </>
              ),
              actions: { iconName: "EllipsisVertical", label: "", buttonVariant: "secondary" },
            },
          ]}
        />
      </DemoBox>
    </SubSection>

    <SubSection title="tag-2lines Variant">
      <p style={{ marginBottom: 16, color: "var(--color-content-secondary)", fontSize: 14 }}>
        Tags that wrap to 2 lines with overflow count.
      </p>
      <DemoBox>
        <Table
          columns={[
            { key: "name", header: "Name", variant: "short-text", width: "300px" },
            { key: "tags", header: "Tags (2 lines)", variant: "tag-2lines", width: "300px" },
            { key: "status", header: "Status", variant: "badge", width: "300px" },
          ]}
          rows={[
            {
              id: "row-1",
              name: "Item One",
              tags: (
                <>
                  <Chip color="var(--color-accent-blue)">Label</Chip>
                  <Chip color="var(--color-accent-cyan)">Label</Chip>
                  <Chip color="var(--color-accent-yellow)">Label</Chip>
                  <Chip color="var(--color-accent-red)">Label</Chip>
                  <Chip color="var(--color-accent-orange)">Label</Chip>
                  <Badge>+1</Badge>
                </>
              ),
              status: <Badge color="positive">Done</Badge>,
            },
            {
              id: "row-2",
              name: "Item Two",
              tags: (
                <>
                  <Chip color="var(--color-accent-purple)">Category A</Chip>
                  <Chip color="var(--color-accent-green)">Category B</Chip>
                  <Chip color="var(--color-accent-pink)">Category C</Chip>
                </>
              ),
              status: <Badge color="warning">Review</Badge>,
            },
          ]}
        />
      </DemoBox>
    </SubSection>

    <SubSection title="Input Variant">
      <p style={{ marginBottom: 16, color: "var(--color-content-secondary)", fontSize: 14 }}>
        Cells containing form inputs or dropdowns.
      </p>
      <DemoBox>
        <Table
          columns={[
            { key: "field", header: "Field Name", variant: "short-text", width: "300px" },
            { key: "input", header: "Input", variant: "input", width: "300px" },
            { key: "icon", header: "Icon", variant: "checkbox", width: "300px" },
          ]}
          rows={[
            {
              id: "row-1",
              field: "Assignee",
              input: (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 4 }}>
                  <Icon name="User" size="md" />
                  <span style={{ color: "var(--color-content-primary)", fontSize: 14 }}>Select user...</span>
                </div>
              ),
              icon: <Icon name="Beaker" size="md" />,
            },
            {
              id: "row-2",
              field: "Category",
              input: (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 4 }}>
                  <Icon name="Tag" size="md" />
                  <span style={{ color: "var(--color-content-primary)", fontSize: 14 }}>Choose category...</span>
                </div>
              ),
              icon: <Icon name="Cube" size="md" />,
            },
          ]}
        />
      </DemoBox>
    </SubSection>

    <SubSection title="Basic Table">
      <DemoBox>
        <Table
          columns={[
            { key: "company", header: "Company", variant: "short-text", sortable: true, width: "300px" },
            { key: "revenue", header: "Revenue", variant: "short-text", sortable: true, width: "300px" },
            { key: "status", header: "Status", variant: "badge", width: "300px" },
            { key: "actions", header: "Actions", variant: "button", width: "56px" },
          ]}
          rows={[
            {
              id: "row-1",
              company: "Acme Corp",
              revenue: "$1,234,567",
              status: <Badge color="positive">Active</Badge>,
              actions: { label: "View", buttonVariant: "tertiary" },
            },
            {
              id: "row-2",
              company: "Tech Inc",
              revenue: "$987,654",
              status: <Badge color="warning">Pending</Badge>,
              actions: { label: "View", buttonVariant: "tertiary" },
            },
            {
              id: "row-3",
              company: "Global Ltd",
              revenue: "$2,345,678",
              status: <Badge color="neutral">Inactive</Badge>,
              actions: { label: "View", buttonVariant: "tertiary" },
            },
          ]}
        />
      </DemoBox>
    </SubSection>

    <SubSection title="With Selection">
      <DemoBox>
        <Table
          columns={[
            { key: "select", header: <Checkbox />, variant: "checkbox", width: "80px" },
            { key: "name", header: "Name", variant: "short-text", width: "300px" },
            { key: "email", header: "Email", variant: "short-text", width: "300px" },
            { key: "role", header: "Role", variant: "short-text", width: "300px" },
          ]}
          rows={[
            {
              id: "row-1",
              select: <Checkbox isSelected />,
              name: "John Doe",
              email: "john@example.com",
              role: "Admin",
            },
            {
              id: "row-2",
              select: <Checkbox />,
              name: "Jane Smith",
              email: "jane@example.com",
              role: "Editor",
            },
          ]}
        />
      </DemoBox>
    </SubSection>
  </Section>
);

const ObjectHeaderPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Section title="ObjectHeader" description="A comprehensive header for object detail pages.">
      <SubSection title="Complete Example">
        <DemoBox>
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
                  { title: "Identification", subtitle: "Jul 15, 2024" },
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
        </DemoBox>
      </SubSection>

      <SubSection title="Simple Header (No Stepper or Tabs)">
        <DemoBox>
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
        </DemoBox>
      </SubSection>
    </Section>
  );
};

const HubHeaderPage = () => (
  <Section title="HubHeader" description="A flexible page-section header for list and detail views.">
    <SubSection title="List Variant (Default)">
      <DemoBox>
        <HubHeader
          title="Companies"
          badge="124"
          rightContent={
            <HubHeaderActions>
              <Button variant="secondary" size="md" iconLeading={<Icon name="ArrowDownTray" size="sm" />}>Export</Button>
              <Button variant="primary" size="md" iconLeading={<Icon name="Plus" size="sm" />}>Add Company</Button>
            </HubHeaderActions>
          }
        />
      </DemoBox>
    </SubSection>

    <SubSection title="With Controls">
      <DemoBox>
        <HubHeader
          title="Portfolio"
          badge="12"
          leftContent={
            <HubHeaderControls>
              <Search size="md" placeholder="Search..." />
              <Button variant="secondary" size="md" iconLeading={<Icon name="Funnel" size="sm" />}>Filter</Button>
            </HubHeaderControls>
          }
          rightContent={
            <HubHeaderActions>
              <Button variant="secondary" size="md" iconLeading={<Icon name="ArrowDownTray" size="sm" />}>Export</Button>
              <Button variant="primary" size="md" iconLeading={<Icon name="Plus" size="sm" />}>Create</Button>
            </HubHeaderActions>
          }
        />
      </DemoBox>
    </SubSection>

    <SubSection title="Detail Variant with Back Button">
      <DemoBox>
        <HubHeader
          variant="detail"
          title="Company Name"
          titleSize="lg"
          badge="Active"
          onBack={() => alert("Back clicked")}
          rightContent={
            <HubHeaderActions>
              <Button variant="primary" size="md">Save</Button>
              <Button variant="secondary" size="md" iconLeading={<Icon name="EllipsisVertical" size="sm" />} />
            </HubHeaderActions>
          }
          secondaryContent={
            <ButtonGroup value="overview">
              <ButtonGroupItem value="overview">Overview</ButtonGroupItem>
              <ButtonGroupItem value="details">Details</ButtonGroupItem>
              <ButtonGroupItem value="history">History</ButtonGroupItem>
            </ButtonGroup>
          }
        />
      </DemoBox>
    </SubSection>

    <SubSection title="Composition Mode">
      <DemoBox>
        <HubHeader showBorder={false}>
          <HubHeaderRow>
            <HubHeaderLeft>
              <HubHeaderTitle size="md" badge="New">Dashboard</HubHeaderTitle>
            </HubHeaderLeft>
            <HubHeaderRight>
              <HubHeaderActions>
                <Button variant="primary" size="md">Action</Button>
              </HubHeaderActions>
            </HubHeaderRight>
          </HubHeaderRow>
          <HubHeaderSecondary>
            <Tabs defaultSelectedKey="all">
              <Tab id="all">All</Tab>
              <Tab id="active">Active</Tab>
              <Tab id="archived">Archived</Tab>
            </Tabs>
          </HubHeaderSecondary>
        </HubHeader>
      </DemoBox>
    </SubSection>

    <SubSection title="Title Sizes">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <DemoBox>
          <HubHeader title="Small Title" titleSize="sm" showBorder={false} />
        </DemoBox>
        <DemoBox>
          <HubHeader title="Medium Title" titleSize="md" showBorder={false} />
        </DemoBox>
        <DemoBox>
          <HubHeader title="Large Title" titleSize="lg" showBorder={false} />
        </DemoBox>
      </div>
    </SubSection>
  </Section>
);

const PaginationOrganismPage = () => {
  const [page, setPage] = useState(4);
  const [pageSize, setPageSize] = useState(10);

  return (
    <Section title="Pagination (Organism)" description="A complete pagination control with page size selector, page navigation, and optional action button.">
      <SubSection title="Full Pagination">
        <DemoBox>
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
        </DemoBox>
      </SubSection>

      <SubSection title="Without Page Numbers">
        <DemoBox>
          <PaginationOrganism
            currentPage={page}
            totalPages={8}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            showPageNumbers={false}
            showInfo
          />
        </DemoBox>
      </SubSection>

      <SubSection title="With Custom Action">
        <DemoBox>
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
        </DemoBox>
      </SubSection>

      <SubSection title="Minimal (No Per Page)">
        <DemoBox>
          <PaginationOrganism
            currentPage={page}
            totalPages={8}
            onPageChange={setPage}
            showPerPage={false}
          />
        </DemoBox>
      </SubSection>
    </Section>
  );
};

// ─────────────────────────────────────────────
// TEMPLATE PAGES
// ─────────────────────────────────────────────

const HubTemplatePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

  const sampleData = [
    { id: 1, name: "Acme Corp", status: "Active", revenue: "$1.2M", employees: 150 },
    { id: 2, name: "Tech Inc", status: "Pending", revenue: "$800K", employees: 85 },
    { id: 3, name: "Global Ltd", status: "Active", revenue: "$2.5M", employees: 320 },
  ];

  const columns = [
    { key: "name", label: "Company Name", sortable: true },
    { key: "status", label: "Status", render: (val) => <Badge color={val === "Active" ? "positive" : "warning"}>{val}</Badge> },
    { key: "revenue", label: "Revenue", sortable: true },
    { key: "employees", label: "Employees", sortable: true },
  ];

  return (
    <Section title="Hub Template" description="A complete page layout template for list/hub pages.">
      <SubSection title="Preview">
        <p style={{ marginBottom: 16, color: "var(--color-content-secondary)", fontSize: 14 }}>
          The Hub template combines SideMenu, HubHeader, Table, and Pagination into a complete page layout.
          Below is a scaled-down preview.
        </p>
        <DemoBox>
          <div style={{ height: 500, border: "1px solid var(--color-neutral-200)", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ display: "flex", height: "100%", background: "var(--color-general-neutral-light)" }}>
              {/* Mini Sidebar Preview */}
              <div style={{ width: 200, background: "var(--color-general-white)", borderRight: "1px solid var(--color-action-outline-secondary-enabled)", padding: 16 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--color-content-brand)", marginBottom: 24 }}>Eureka</div>
                <div style={{ fontSize: 12, color: "var(--color-content-secondary)" }}>Side Menu Preview</div>
              </div>

              {/* Main Content Preview */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
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
                    rows={sampleData.map((row) => ({
                      id: row.id,
                      name: row.name,
                      status: <Badge color={row.status === "Active" ? "positive" : "warning"}>{row.status}</Badge>,
                      revenue: row.revenue,
                      employees: row.employees,
                    }))}
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
        </DemoBox>
      </SubSection>

      <SubSection title="Props">
        <DemoBox>
          <ul style={{ fontSize: 14, color: "var(--color-content-secondary)", paddingLeft: 20, lineHeight: 1.8 }}>
            <li><strong>title:</strong> Page title for the header</li>
            <li><strong>badge:</strong> Badge text (e.g., item count)</li>
            <li><strong>headerActions:</strong> Action buttons for the header</li>
            <li><strong>menuSections:</strong> Sections for the side menu</li>
            <li><strong>columns:</strong> Table column definitions</li>
            <li><strong>data:</strong> Table row data</li>
            <li><strong>showCheckbox:</strong> Enable row selection</li>
            <li><strong>currentPage, totalPages, pageSize:</strong> Pagination props</li>
          </ul>
        </DemoBox>
      </SubSection>
    </Section>
  );
};

const ObjectPageTemplatePage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Section title="ObjectPage Template" description="A complete detail page layout with header, stepper, and two-column content.">
      <SubSection title="Preview">
        <p style={{ marginBottom: 16, color: "var(--color-content-secondary)", fontSize: 14 }}>
          The ObjectPage template combines SideMenu, ObjectHeader with stepper/tabs, and a two-column accordion layout.
        </p>
        <DemoBox>
          <div style={{ height: 600, border: "1px solid var(--color-neutral-200)", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ display: "flex", height: "100%", background: "var(--color-general-neutral-light)" }}>
              {/* Mini Sidebar Preview */}
              <div style={{ width: 200, background: "var(--color-general-white)", borderRight: "1px solid var(--color-action-outline-secondary-enabled)", padding: 16 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--color-content-brand)", marginBottom: 24 }}>Eureka</div>
                <div style={{ fontSize: 12, color: "var(--color-content-secondary)" }}>Side Menu Preview</div>
              </div>

              {/* Main Content Preview */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                {/* Header */}
                <div style={{ padding: 16, background: "var(--color-general-white)", borderBottom: "1px solid var(--color-action-outline-secondary-enabled)" }}>
                  <ObjectHeader>
                    <ObjectHeaderTopBar>
                      <ObjectHeaderTopBarLeft>
                        <Button variant="secondary" size="sm" iconLeading={<Icon name="ArrowLeft" size="sm" />}>Back</Button>
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
        </DemoBox>
      </SubSection>

      <SubSection title="Props">
        <DemoBox>
          <ul style={{ fontSize: 14, color: "var(--color-content-secondary)", paddingLeft: 20, lineHeight: 1.8 }}>
            <li><strong>title:</strong> Page/object title</li>
            <li><strong>titleIconName:</strong> Icon for the title</li>
            <li><strong>meta:</strong> Metadata object (label, date, time, author)</li>
            <li><strong>subinfoItems:</strong> Array of subinfo items</li>
            <li><strong>steps:</strong> Stepper steps array</li>
            <li><strong>currentStep:</strong> Current step index</li>
            <li><strong>tabs:</strong> Tabs component</li>
            <li><strong>onBack:</strong> Back button handler</li>
            <li><strong>leftColumnSections / rightColumnSections:</strong> Accordion sections</li>
            <li><strong>singleColumn:</strong> Use single column layout</li>
          </ul>
        </DemoBox>
      </SubSection>
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
  chip: { title: "Chip", component: ChipPage, category: "atoms" },
  radioButton: { title: "RadioButton", component: RadioButtonPage, category: "atoms" },
  link: { title: "Link", component: LinkPage, category: "atoms" },
  step: { title: "Step", component: StepPage, category: "atoms" },
  buttonBadge: { title: "ButtonBadge", component: ButtonBadgePage, category: "atoms" },
  // Molecules
  search: { title: "Search", component: SearchPage, category: "molecules" },
  tabs: { title: "Tabs", component: TabsPage, category: "molecules" },
  accordion: { title: "Accordion", component: AccordionPage, category: "molecules" },
  textInput: { title: "TextInput", component: TextInputPage, category: "molecules" },
  textarea: { title: "Textarea", component: TextareaPage, category: "molecules" },
  dropdownMenuItem: { title: "DropdownMenuItem", component: DropdownMenuItemPage, category: "molecules" },
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
  // Organisms
  sideMenu: { title: "SideMenu", component: SideMenuPage, category: "organisms" },
  modal: { title: "Modal", component: ModalPage, category: "organisms" },
  table: { title: "Table", component: TablePage, category: "organisms" },
  objectHeader: { title: "ObjectHeader", component: ObjectHeaderPage, category: "organisms" },
  hubHeader: { title: "HubHeader", component: HubHeaderPage, category: "organisms" },
  paginationOrganism: { title: "Pagination (Organism)", component: PaginationOrganismPage, category: "organisms" },
  // Templates
  hubTemplate: { title: "Hub", component: HubTemplatePage, category: "templates" },
  objectPageTemplate: { title: "ObjectPage", component: ObjectPageTemplatePage, category: "templates" },
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

export const ComponentLibraryDemo = () => {
  const [activePage, setActivePage] = useState("button");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter pages based on search query
  const filterPages = (pages) => {
    if (!searchQuery.trim()) return pages;
    const query = searchQuery.toLowerCase();
    return Object.entries(pages)
      .filter(([key, page]) =>
        page.title.toLowerCase().includes(query) ||
        page.category.toLowerCase().includes(query) ||
        key.toLowerCase().includes(query)
      )
      .reduce((acc, [key, page]) => {
        acc[key] = page;
        return acc;
      }, {});
  };

  const filteredPages = filterPages(PAGES);

  const sections = [
    {
      title: "Atoms",
      items: Object.entries(filteredPages)
        .filter(([, page]) => page.category === "atoms")
        .map(([key, page]) => ({
          label: page.title,
          iconName: getIconForPage(key),
          state: activePage === key ? "active" : "enabled",
          onClick: () => setActivePage(key),
        })),
    },
    {
      title: "Molecules",
      dividerBefore: true,
      items: Object.entries(filteredPages)
        .filter(([, page]) => page.category === "molecules")
        .map(([key, page]) => ({
          label: page.title,
          iconName: getIconForPage(key),
          state: activePage === key ? "active" : "enabled",
          onClick: () => setActivePage(key),
        })),
    },
    {
      title: "Organisms",
      dividerBefore: true,
      items: Object.entries(filteredPages)
        .filter(([, page]) => page.category === "organisms")
        .map(([key, page]) => ({
          label: page.title,
          iconName: getIconForPage(key),
          state: activePage === key ? "active" : "enabled",
          onClick: () => setActivePage(key),
        })),
    },
    {
      title: "Templates",
      dividerBefore: true,
      items: Object.entries(filteredPages)
        .filter(([, page]) => page.category === "templates")
        .map(([key, page]) => ({
          label: page.title,
          iconName: getIconForPage(key),
          state: activePage === key ? "active" : "enabled",
          onClick: () => setActivePage(key),
        })),
    },
  ].filter(section => section.items.length > 0);

  const CurrentPage = PAGES[activePage]?.component || ButtonPage;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-general-neutral-light)" }}>
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
        user={{
          name: "Developer",
          email: "dev@eureka.design",
          avatarInitials: "EU",
        }}
      />

      {/* Main Content */}
      <main style={{ flex: 1, padding: 48, marginLeft: 80, overflow: "auto" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          {/* Page Content */}
          <CurrentPage />
        </div>
      </main>
    </div>
  );
};

// Helper function to get icons for pages
function getIconForPage(pageKey) {
  const iconMap = {
    button: "CursorArrowRays",
    badge: "Tag",
    avatar: "UserCircle",
    checkbox: "CheckCircle",
    toggle: "AdjustmentsHorizontal",
    icon: "Sparkles",
    chip: "RectangleStack",
    radioButton: "ListBullet",
    link: "Link",
    step: "ArrowTrendingUp",
    buttonBadge: "RectangleGroup",
    search: "MagnifyingGlass",
    tabs: "Squares2X2",
    accordion: "Bars3BottomLeft",
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
    sideMenu: "Bars3",
    modal: "Square2Stack",
    table: "TableCells",
    objectHeader: "DocumentText",
    hubHeader: "RectangleGroup",
    paginationOrganism: "ChevronDoubleRight",
    hubTemplate: "ViewColumns",
    objectPageTemplate: "Document",
  };
  return iconMap[pageKey] || "DocumentText";
}

export default ComponentLibraryDemo;
