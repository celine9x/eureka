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
import { Button, BUTTON_SIZES } from "./library/atoms/button.jsx";
import { Badge, BADGE_COLORS, BADGE_SIZES } from "./library/atoms/badge.jsx";
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
import { Table, TableRow, TableCell, TableCellHeader } from "./library/organisms/table/table.jsx";

// ─────────────────────────────────────────────
// SHARED PROPS
// ─────────────────────────────────────────────
import { BUTTON_VARIANTS } from "./library/utils/props.js";

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
    <SubSection title="Variants">
      <Row label="Primary">
        <Button variant="primary">Primary</Button>
        <Button variant="primary" isDisabled>Disabled</Button>
        <Button variant="primary" loading>Loading</Button>
      </Row>
      <Row label="Secondary">
        <Button variant="secondary">Secondary</Button>
        <Button variant="secondary" isDisabled>Disabled</Button>
        <Button variant="secondary" loading>Loading</Button>
      </Row>
      <Row label="Tertiary">
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="tertiary" isDisabled>Disabled</Button>
      </Row>
      <Row label="Negative">
        <Button variant="negative">Negative</Button>
        <Button variant="negative" isDisabled>Disabled</Button>
      </Row>
      <Row label="Positive">
        <Button variant="positive">Positive</Button>
        <Button variant="positive" isDisabled>Disabled</Button>
      </Row>
      <Row label="Link">
        <Button variant="link">Link Button</Button>
        <Button variant="link" isDisabled>Disabled</Button>
      </Row>
    </SubSection>

    <SubSection title="Sizes">
      <div style={{ display: "flex", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
      </div>
    </SubSection>

    <SubSection title="With Icons">
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <Button iconLeading={<Icon name="Plus" variant="solid" size="sm" />}>Add Item</Button>
        <Button variant="secondary" iconTrailing={<Icon name="ArrowRight" size="sm" />}>Continue</Button>
        <Button variant="negative" iconLeading={<Icon name="Trash" size="sm" />}>Delete</Button>
      </div>
    </SubSection>
  </Section>
);

const BadgePage = () => (
  <Section title="Badge" description="A compact label element with colors, sizes, and shapes.">
    <SubSection title="Colors">
      {Object.keys(BADGE_COLORS).map((color) => (
        <Row key={color} label={color}>
          <Badge color={color} size="md">{color}</Badge>
          <Badge color={color} size="md" icon>{color}</Badge>
        </Row>
      ))}
    </SubSection>

    <SubSection title="Sizes">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Badge color="brand" size="xs">XS</Badge>
        <Badge color="brand" size="sm">SM</Badge>
        <Badge color="brand" size="md">MD</Badge>
        <Badge color="brand" size="lg">LG</Badge>
      </div>
    </SubSection>

    <SubSection title="Shapes">
      <Row label="Rounded">
        <Badge color="brand" size="md" shape="rounded">Rounded</Badge>
        <Badge color="neutral" size="lg" shape="rounded" icon>With Icon</Badge>
      </Row>
      <Row label="Pill">
        <Badge color="brand" size="md" shape="pill">Pill</Badge>
        <Badge color="neutral" size="lg" shape="pill" icon>With Icon</Badge>
      </Row>
    </SubSection>

    <SubSection title="AI Variant">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Badge color="ai" size="lg" icon>AI Generated</Badge>
        <Badge color="ai" size="md" shape="pill" icon>Sparkles</Badge>
      </div>
    </SubSection>
  </Section>
);

const AvatarPage = () => (
  <Section title="Avatar" description="A circular avatar displaying initials or an image.">
    <SubSection title="Sizes with Initials">
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Avatar size="xs" name="John Doe" />
        <Avatar size="sm" name="Jane Smith" />
        <Avatar size="md" name="Bob Wilson" />
        <Avatar size="lg" name="Alice Brown" />
        <Avatar size="xl" name="Charlie Davis" />
      </div>
    </SubSection>

    <SubSection title="Custom Initials">
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Avatar size="lg" initials="AB" />
        <Avatar size="lg" initials="CD" />
        <Avatar size="lg" initials="EF" />
      </div>
    </SubSection>
  </Section>
);

const CheckboxPage = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);

  return (
    <Section title="Checkbox" description="A reusable checkbox with sizes and states.">
      <SubSection title="States">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Checkbox isSelected={checked1} onChange={setChecked1}>Unchecked option</Checkbox>
          <Checkbox isSelected={checked2} onChange={setChecked2}>Checked option</Checkbox>
          <Checkbox isDisabled>Disabled option</Checkbox>
          <Checkbox isDisabled defaultSelected>Disabled checked</Checkbox>
        </div>
      </SubSection>

      <SubSection title="Sizes">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Checkbox size="sm">Small checkbox</Checkbox>
          <Checkbox size="md">Medium checkbox</Checkbox>
        </div>
      </SubSection>
    </Section>
  );
};

const TogglePage = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Section title="Toggle" description="A switch/toggle control with multiple sizes and states.">
      <SubSection title="States">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Toggle label="Toggle off" isSelected={enabled} onChange={setEnabled} />
          <Toggle label="Toggle on" isSelected={!enabled} onChange={(v) => setEnabled(!v)} />
          <Toggle label="Disabled off" isDisabled />
          <Toggle label="Disabled on" isDisabled isSelected />
        </div>
      </SubSection>

      <SubSection title="Sizes">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Toggle size="sm" label="Small toggle" />
          <Toggle size="md" label="Medium toggle" />
        </div>
      </SubSection>

      <SubSection title="Label Position">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Toggle label="Label on right" labelPosition="right" />
          <Toggle label="Label on left" labelPosition="left" />
        </div>
      </SubSection>
    </Section>
  );
};

const IconPage = () => (
  <Section title="Icon" description="A unified icon library wrapping Heroicons and Phosphor Icons.">
    <SubSection title="Heroicons (Default)">
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
    </SubSection>

    <SubSection title="Variants">
      <Row label="Outline">
        <Icon name="Heart" variant="outline" size="xl" />
        <Icon name="Star" variant="outline" size="xl" />
        <Icon name="Folder" variant="outline" size="xl" />
      </Row>
      <Row label="Solid">
        <Icon name="Heart" variant="solid" size="xl" />
        <Icon name="Star" variant="solid" size="xl" />
        <Icon name="Folder" variant="solid" size="xl" />
      </Row>
    </SubSection>

    <SubSection title="Sizes">
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Icon name="Home" size="xs" />
        <Icon name="Home" size="sm" />
        <Icon name="Home" size="md" />
        <Icon name="Home" size="lg" />
        <Icon name="Home" size="xl" />
      </div>
    </SubSection>
  </Section>
);

const ChipPage = () => (
  <Section title="Chip" description="A compact label element with optional color accent, icons, and actions.">
    <SubSection title="Variants">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <Chip variant="neutral">Neutral</Chip>
        <Chip variant="primary">Primary</Chip>
        <Chip variant="positive">Positive</Chip>
        <Chip variant="negative">Negative</Chip>
        <Chip variant="warning">Warning</Chip>
      </div>
    </SubSection>

    <SubSection title="With Features">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        <Chip icon={<Icon name="Star" size="sm" />}>With Icon</Chip>
        <Chip chevron>With Chevron</Chip>
        <Chip removable onRemove={() => alert("Remove clicked")}>Removable</Chip>
        <Chip color="#4649FF">With Color</Chip>
        <Chip color="#FF6B6B" icon={<Icon name="Heart" variant="solid" size="sm" />} removable>Full Featured</Chip>
      </div>
    </SubSection>

    <SubSection title="Sizes">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Chip size="sm">Small</Chip>
        <Chip size="md">Medium</Chip>
      </div>
    </SubSection>
  </Section>
);

const LinkPage = () => (
  <Section title="Link" description="A styled anchor link with optional leading/trailing icons.">
    <SubSection title="Sizes">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Link href="#" size="sm">Small Link</Link>
        <Link href="#" size="md">Medium Link</Link>
        <Link href="#" size="lg">Large Link</Link>
      </div>
    </SubSection>

    <SubSection title="With Icons">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Link href="#" iconLeading={<Icon name="ArrowLeft" size="sm" />}>Back</Link>
        <Link href="#" iconTrailing={<Icon name="ArrowRight" size="sm" />}>Continue</Link>
        <Link href="#" iconLeading={<Icon name="ExternalLink" size="sm" />} target="_blank">Open External</Link>
      </div>
    </SubSection>

    <SubSection title="States">
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Link href="#">Default Link</Link>
        <Link href="#" isDisabled>Disabled Link</Link>
      </div>
    </SubSection>
  </Section>
);

const StepPage = () => (
  <Section title="Step" description="A step indicator for use in steppers/progress indicators.">
    <SubSection title="Horizontal Stepper">
      <DemoBox>
        <div style={{ display: "flex", gap: 0 }}>
          <Step status="completed" title="Step 1" subtitle="Completed" />
          <Step status="completed" title="Step 2" subtitle="Completed" />
          <Step status="current" title="Step 3" subtitle="In Progress" />
          <Step status="next" title="Step 4" subtitle="Pending" />
          <Step status="next" title="Step 5" subtitle="Pending" showLine={false} />
        </div>
      </DemoBox>
    </SubSection>

    <SubSection title="Status Variants">
      <DemoBox>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Row label="Completed">
            <Step status="completed" title="Completed Step" showLine={false} />
          </Row>
          <Row label="Current">
            <Step status="current" title="Current Step" showLine={false} />
          </Row>
          <Row label="Next">
            <Step status="next" title="Next Step" showLine={false} />
          </Row>
          <Row label="Pending">
            <Step status="pending" title="Pending Step" showLine={false} />
          </Row>
          <Row label="Disabled">
            <Step status="disabled" title="Disabled Step" showLine={false} />
          </Row>
        </div>
      </DemoBox>
    </SubSection>

    <SubSection title="Vertical Stepper">
      <DemoBox>
        <div style={{ display: "flex", flexDirection: "column", height: 300 }}>
          <Step status="completed" title="Account Created" subtitle="Jan 1, 2024" orientation="vertical" />
          <Step status="completed" title="Profile Setup" subtitle="Jan 5, 2024" orientation="vertical" />
          <Step status="current" title="Verification" subtitle="In Progress" orientation="vertical" />
          <Step status="next" title="Complete" subtitle="" orientation="vertical" showLine={false} />
        </div>
      </DemoBox>
    </SubSection>
  </Section>
);

const ButtonBadgePage = () => {
  const [activeFilter, setActiveFilter] = useState(null);

  return (
    <Section title="ButtonBadge" description="A button element with an optional icon, label, and integrated Badge.">
      <SubSection title="Basic Usage">
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonBadge badgeLabel="5">Notifications</ButtonBadge>
          <ButtonBadge badgeLabel="12">Messages</ButtonBadge>
          <ButtonBadge badgeLabel="New">Updates</ButtonBadge>
        </div>
      </SubSection>

      <SubSection title="With Icons">
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonBadge iconName="Bell" badgeLabel="3">Alerts</ButtonBadge>
          <ButtonBadge iconName="Envelope" badgeLabel="99+">Inbox</ButtonBadge>
          <ButtonBadge iconName="ShoppingCart" badgeLabel="2">Cart</ButtonBadge>
        </div>
      </SubSection>

      <SubSection title="States">
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonBadge state="enabled" badgeLabel="5">Enabled</ButtonBadge>
          <ButtonBadge state="active" badgeLabel="5">Active</ButtonBadge>
          <ButtonBadge state="disabled" badgeLabel="5" isDisabled>Disabled</ButtonBadge>
        </div>
      </SubSection>

      <SubSection title="Without Badge">
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <ButtonBadge variant="without-badge" iconName="Funnel">Filter</ButtonBadge>
          <ButtonBadge variant="without-badge" iconName="ArrowsUpDown">Sort</ButtonBadge>
          <ButtonBadge variant="without-badge" iconRightName="ChevronDown">Dropdown</ButtonBadge>
        </div>
      </SubSection>

      <SubSection title="Sizes">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ButtonBadge size="md" badgeLabel="5">Medium</ButtonBadge>
          <ButtonBadge size="lg" badgeLabel="5">Large</ButtonBadge>
        </div>
      </SubSection>

      <SubSection title="Interactive Filter Example">
        <DemoBox>
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
        </DemoBox>
      </SubSection>
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
            { label: "TypeScript", color: "#73E5AC" },
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
    <SubSection title="Basic Table">
      <DemoBox>
        <Table>
          <TableRow variant="header">
            <TableCellHeader sortable>Company</TableCellHeader>
            <TableCellHeader sortable>Revenue</TableCellHeader>
            <TableCellHeader>Status</TableCellHeader>
            <TableCellHeader>Actions</TableCellHeader>
          </TableRow>
          <TableRow>
            <TableCell>Acme Corp</TableCell>
            <TableCell>$1,234,567</TableCell>
            <TableCell><Badge color="positive">Active</Badge></TableCell>
            <TableCell><Button variant="tertiary" size="sm">View</Button></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tech Inc</TableCell>
            <TableCell>$987,654</TableCell>
            <TableCell><Badge color="warning">Pending</Badge></TableCell>
            <TableCell><Button variant="tertiary" size="sm">View</Button></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Global Ltd</TableCell>
            <TableCell>$2,345,678</TableCell>
            <TableCell><Badge color="neutral">Inactive</Badge></TableCell>
            <TableCell><Button variant="tertiary" size="sm">View</Button></TableCell>
          </TableRow>
        </Table>
      </DemoBox>
    </SubSection>

    <SubSection title="With Selection">
      <DemoBox>
        <Table>
          <TableRow variant="header">
            <TableCellHeader style={{ width: 48 }}>
              <Checkbox />
            </TableCellHeader>
            <TableCellHeader>Name</TableCellHeader>
            <TableCellHeader>Email</TableCellHeader>
            <TableCellHeader>Role</TableCellHeader>
          </TableRow>
          <TableRow selected>
            <TableCell style={{ width: 48 }}><Checkbox isSelected /></TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>Admin</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ width: 48 }}><Checkbox /></TableCell>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>Editor</TableCell>
          </TableRow>
        </Table>
      </DemoBox>
    </SubSection>
  </Section>
);

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
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

export const ComponentLibraryDemo = () => {
  const [activePage, setActivePage] = useState("button");

  const sections = [
    {
      title: "Atoms",
      items: Object.entries(PAGES)
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
      items: Object.entries(PAGES)
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
      items: Object.entries(PAGES)
        .filter(([, page]) => page.category === "organisms")
        .map(([key, page]) => ({
          label: page.title,
          iconName: getIconForPage(key),
          state: activePage === key ? "active" : "enabled",
          onClick: () => setActivePage(key),
        })),
    },
  ];

  const CurrentPage = PAGES[activePage]?.component || ButtonPage;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-background-neutral-lighter)" }}>
      {/* Side Menu */}
      <SideMenu
        variant="collapsed"
        expandOnHover={true}
        logo={
          <div style={{ fontSize: 20, fontWeight: 700, color: "var(--color-content-brand)" }}>
            Eureka
          </div>
        }
        showSearch={false}
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
          {/* Header */}
          <header style={{ marginBottom: 48 }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, color: "var(--color-content-primary)", marginBottom: 8 }}>
              Eureka Design System
            </h1>
            <p style={{ color: "var(--color-content-secondary)", fontSize: 16 }}>
              Component Library - {PAGES[activePage]?.category?.toUpperCase()} / {PAGES[activePage]?.title}
            </p>
          </header>

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
  };
  return iconMap[pageKey] || "DocumentText";
}

export default ComponentLibraryDemo;
