# Component Page Structure Guide

This guide explains how to structure component pages in the Eureka Design System test file for consistency and maintainability.

## Overview

Each component page should follow a standardized structure with:
1. **Preview and Code** - Every variant uses `PreviewComponent` to show both visual preview and code
2. **All Variants First** - Start with a comprehensive example showing all variants
3. **Individual Variants** - Follow with detailed examples of each variant
4. **No Duplicate Headings** - Avoid using SubSection wrappers when PreviewComponent already has a title

## Standard Structure

### Page Template

```jsx
const ComponentNamePage = () => (
  <Section 
    title="ComponentName" 
    description="Brief description of the component and its purpose."
  >
    {/* 1. All Variants Overview */}
    <PreviewComponent
      title="All ComponentName Variants"
      code={`import { ComponentName } from "@/library/path/to/component";

<ComponentName variant="variant1">Label</ComponentName>
<ComponentName variant="variant2">Label</ComponentName>
<ComponentName variant="variant3">Label</ComponentName>`}
    >
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <ComponentName variant="variant1">Label</ComponentName>
        <ComponentName variant="variant2">Label</ComponentName>
        <ComponentName variant="variant3">Label</ComponentName>
      </div>
    </PreviewComponent>

    {/* 2. Sizes (if applicable) */}
    <PreviewComponent
      title="ComponentName Sizes"
      code={`import { ComponentName } from "@/library/path/to/component";

<ComponentName size="xs">Extra Small</ComponentName>
<ComponentName size="sm">Small</ComponentName>
<ComponentName size="md">Medium</ComponentName>
<ComponentName size="lg">Large</ComponentName>
<ComponentName size="xl">Extra Large</ComponentName>`}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
        <ComponentName size="xs">Extra Small</ComponentName>
        <ComponentName size="sm">Small</ComponentName>
        <ComponentName size="md">Medium</ComponentName>
        <ComponentName size="lg">Large</ComponentName>
        <ComponentName size="xl">Extra Large</ComponentName>
      </div>
    </PreviewComponent>

    {/* 3. Individual Variants */}
    <PreviewComponent
      title="Primary Variant"
      code={`import { ComponentName } from "@/library/path/to/component";

<ComponentName variant="primary">Primary</ComponentName>
<ComponentName variant="primary" isDisabled>Disabled</ComponentName>
<ComponentName variant="primary" loading>Loading</ComponentName>`}
    >
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <ComponentName variant="primary">Primary</ComponentName>
        <ComponentName variant="primary" isDisabled>Disabled</ComponentName>
        <ComponentName variant="primary" loading>Loading</ComponentName>
      </div>
    </PreviewComponent>

    <PreviewComponent
      title="Secondary Variant"
      code={`import { ComponentName } from "@/library/path/to/component";

<ComponentName variant="secondary">Secondary</ComponentName>
<ComponentName variant="secondary" isDisabled>Disabled</ComponentName>`}
    >
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <ComponentName variant="secondary">Secondary</ComponentName>
        <ComponentName variant="secondary" isDisabled>Disabled</ComponentName>
      </div>
    </PreviewComponent>

    {/* 4. Additional Features */}
    <PreviewComponent
      title="With Icons"
      code={`import { ComponentName } from "@/library/path/to/component";
import { Icon } from "@/library/atoms/icon";

<ComponentName iconLeading={<Icon name="Check" size="sm" />}>
  With Icon
</ComponentName>`}
    >
      <ComponentName iconLeading={<Icon name="Check" size="sm" />}>
        With Icon
      </ComponentName>
    </PreviewComponent>
  </Section>
);
```

## Key Principles

### 1. Use PreviewComponent for Everything

**✅ DO:**
```jsx
<PreviewComponent
  title="Button Sizes"
  code={`<Button size="md">Medium</Button>`}
>
  <Button size="md">Medium</Button>
</PreviewComponent>
```

**❌ DON'T:**
```jsx
<SubSection title="Sizes">
  <PreviewComponent
    title="Button Sizes"
    code={`<Button size="md">Medium</Button>`}
  >
    <Button size="md">Medium</Button>
  </PreviewComponent>
</SubSection>
```

This creates duplicate headings: "Sizes" from SubSection and "Button Sizes" from PreviewComponent.

### 2. Start with All Variants

The first variant should always be a comprehensive example showing all available variants together.

**Example:**
```jsx
<PreviewComponent
  title="All Button Variants"
  code={`<Button variant="primary">Primary</Button>
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
```

### 3. Sizes Come Second (if applicable)

If the component supports multiple sizes, show them after the all-variants example.

```jsx
<PreviewComponent
  title="Button Sizes"
  code={`<Button size="xs">Extra Small</Button>
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
```

### 4. Individual Variants Follow

After the overview and sizes, show each variant individually with its states (disabled, loading, etc.).

```jsx
<PreviewComponent
  title="Primary Button"
  code={`<Button variant="primary">Primary</Button>
<Button variant="primary" isDisabled>Disabled</Button>
<Button variant="primary" loading>Loading</Button>`}
>
  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
    <Button variant="primary">Primary</Button>
    <Button variant="primary" isDisabled>Disabled</Button>
    <Button variant="primary" loading>Loading</Button>
  </div>
</PreviewComponent>
```

### 5. Special Features Last

End with special features like icons, interactions, or advanced use cases.

```jsx
<PreviewComponent
  title="Button with Icon"
  code={`import { Icon } from "@/library/atoms/icon";

<Button variant="primary" iconLeading={<Icon name="Check" size="sm" />}>
  Publish now
</Button>`}
>
  <Button variant="primary" iconLeading={<Icon name="Check" size="sm" />}>
    Publish now
  </Button>
</PreviewComponent>
```

## Standard Section Order

1. **All Variants** - Comprehensive overview
2. **Sizes** - Size variations (xs, sm, md, lg, xl)
3. **Primary Variant** - Primary state and variations
4. **Secondary Variant** - Secondary state and variations
5. **Tertiary Variant** - Tertiary state and variations (if applicable)
6. **Negative Variant** - Negative/destructive state
7. **Positive Variant** - Positive/success state
8. **Special Variants** - Any unique variants
9. **With Icons** - Icon combinations
10. **States** - Disabled, loading, error states
11. **Advanced** - Complex examples or edge cases

## Layout Best Practices

### Horizontal Layout
Use for components that fit well side-by-side:
```jsx
<div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
  {/* Components here */}
</div>
```

### Vertical Layout
Use for components that need vertical stacking:
```jsx
<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  {/* Components here */}
</div>
```

### Aligned Layout
Use when showing different sizes together:
```jsx
<div style={{ display: "flex", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
  {/* Components here */}
</div>
```

### Grid Layout
Use for multiple items that need equal spacing:
```jsx
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
  {/* Components here */}
</div>
```

## Code Examples Best Practices

### Import Statements
Always include necessary imports in the code prop:
```jsx
code={`import { Button } from "@/components/base/buttons/button";
import { Icon } from "@/library/atoms/icon";

<Button iconLeading={<Icon name="Check" />}>Save</Button>`}
```

### Keep It Simple
Show the minimal code needed to reproduce the example:
```jsx
// ✅ Good
code={`<Button variant="primary">Primary</Button>`}

// ❌ Too complex
code={`<div>
  <Button 
    variant="primary" 
    onClick={() => console.log('clicked')}
    style={{ margin: 10 }}
  >
    Primary
  </Button>
</div>`}
```

### Match Preview and Code
Ensure the code matches exactly what's shown in the preview:
```jsx
<PreviewComponent
  title="Example"
  code={`<Button size="lg">Large Button</Button>`}
>
  {/* This should match the code exactly */}
  <Button size="lg">Large Button</Button>
</PreviewComponent>
```

## Complete Example: Table Page

The Table page follows this structure perfectly:

```jsx
const TablePage = () => (
  <Section title="Table" description="A complete table system with header, body rows, and various cell types.">
    {/* 1. Recommended API */}
    <SubSection title="Column API (Recommended)">
      <p style={{ marginBottom: 16, color: "var(--color-content-secondary)", fontSize: 14 }}>
        Define columns once with a variant, then all cells in that column stay consistent.
      </p>
      <DemoBox>
        <Table columns={[...]} rows={[...]} />
      </DemoBox>
    </SubSection>

    {/* 2. All Cell Variants */}
    <SubSection title="All Cell Variants">
      <p style={{ marginBottom: 16, color: "var(--color-content-secondary)", fontSize: 14 }}>
        Demonstration of all table cell column types from the design system.
      </p>
      <DemoBox>
        <Table columns={[...]} rows={[...]} />
      </DemoBox>
    </SubSection>

    {/* 3. Individual Variants */}
    <SubSection title="tag-2lines Variant">
      <p style={{ marginBottom: 16, color: "var(--color-content-secondary)", fontSize: 14 }}>
        Tags that wrap to 2 lines with overflow count.
      </p>
      <DemoBox>
        <Table columns={[...]} rows={[...]} />
      </DemoBox>
    </SubSection>

    {/* More specific variants... */}
  </Section>
);
```

## When to Use SubSection vs PreviewComponent

### Use PreviewComponent (Preferred)
- For simple components with clear variants
- When you want preview and code together
- To avoid duplicate headings
- For atomic components (buttons, badges, inputs, etc.)

### Use SubSection
- For complex components that need explanatory text
- When grouping multiple related examples
- For organizational purposes in large component pages
- When using DemoBox instead of PreviewComponent

## Migration Checklist

When updating an existing component page:

- [ ] Remove SubSection wrappers around PreviewComponent
- [ ] Add "All Variants" example as the first section
- [ ] Add "Sizes" example as the second section (if applicable)
- [ ] Ensure each variant has both preview and code
- [ ] Use consistent layout styles
- [ ] Include all necessary imports in code examples
- [ ] Match code exactly to preview
- [ ] Order sections logically (variants → sizes → features → states)

## Summary

The ideal component page structure:
1. ✅ Uses `PreviewComponent` for preview + code
2. ✅ Starts with "All Variants" overview
3. ✅ Shows "Sizes" second (if applicable)
4. ✅ Breaks down individual variants
5. ✅ Ends with special features
6. ✅ Avoids duplicate headings
7. ✅ Maintains consistent code examples
8. ✅ Uses appropriate layouts

This creates a consistent, maintainable, and user-friendly component documentation system.
