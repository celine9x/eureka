/**
 * Eureka Design System - Component Library Demo
 *
 * A comprehensive test page with side menu navigation
 * to browse all components from atoms to organisms.
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

// ─────────────────────────────────────────────
// ORGANISMS
// ─────────────────────────────────────────────
import { SideMenu } from "./library/organisms/side-menu/side-menu.jsx";

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
// PAGE COMPONENTS
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
  dropdownMenuItem: { title: "DropdownMenuItem", component: DropdownMenuItemPage, category: "molecules" },
  // Organisms
  sideMenu: { title: "SideMenu", component: SideMenuPage, category: "organisms" },
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
      <main style={{ flex: 1, padding: 48, overflow: "auto" }}>
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
    dropdownMenuItem: "QueueList",
    sideMenu: "Bars3",
  };
  return iconMap[pageKey] || "DocumentText";
}

export default ComponentLibraryDemo;
