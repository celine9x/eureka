# Component Guide

This guide defines how to build and maintain components in this design system.

## 1) Architecture

- **Atoms** live in `library/atoms/` and should be the smallest reusable UI pieces.
- **Molecules** live in `library/molecules/` and should compose atoms into richer controls.
- **Organisms/Templates** should compose molecules; do not duplicate atom behavior there.
- Keep files focused: one main component per file, with optional small helpers in the same file.

## 2) Import and Export Conventions

### Preferred imports for app usage

Use alias wrappers for clean imports when available:

```jsx
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badge";
```

### Internal library imports

Inside `library/*`, import directly from relative atom/molecule paths:

```jsx
import { Button } from "../atoms/button.jsx";
```

### Exports

- Use **named exports** for components, constants, and variants.
- Keep `default export` only when already used in existing files.
- Attach useful static maps to components when it improves usage clarity:
  - `Button.colors`, `Button.sizes`
  - `Badge.colors`, `Badge.sizes`, `Badge.types`

## 3) Styling Rules (Token-First)

All styles must come from design tokens in `library/tokens/tokens.css`.

### Do

- Use CSS variables: `var(--...)`
- Prefer semantic tokens (`--color-content-primary`) over raw palette tokens when possible.
- Use spacing/weight tokens consistently:
  - `var(--spacing-xs|sm|md|lg|...)`
  - `var(--font-weight-regular|semibold|bold)`
- Keep inline style objects predictable and centralized in `const styles = { ... }`.

### Don’t

- Don’t hardcode hex colors like `#B794F6`.
- Don’t leave numeric font weights like `400`, `600`, `700`.
- Don’t introduce new colors, shadows, or typography primitives outside tokens.
- Don’t mix many one-off style literals when a token exists.

## 4) API Design Guidelines

### Keep component APIs clean

- Prefer clear prop names: `color`, `size`, `variant`, `isDisabled`, `isLoading`.
- Support legacy props only when needed for backward compatibility.
- If legacy props exist, resolve them once at the top:
  - Example: `const isButtonDisabled = isDisabled || disabled;`

### Composition over duplication

- Build molecules from atoms instead of re-implementing atom behavior.
- Reuse existing helper components (labels, helper text, icons) when possible.

### Naming

- Constants: `COMPONENT_VARIANTS`, `COMPONENT_SIZES`, etc.
- Style blocks: `styles.base`, `styles.variants`, `styles.sizes`.
- Booleans: `isX` / `hasX`.

## 5) Accessibility Requirements

- Use semantic elements (`button`, `label`, `input`, etc.) where possible.
- Always provide keyboard support for interactive elements.
- Use ARIA labels/roles only when semantic HTML is insufficient.
- Ensure disabled/read-only states are reflected in both behavior and styling.

## 6) Documentation Style in Components

- Keep top-of-file comments concise.
- Avoid verbose JSDoc `@param` blocks unless truly necessary.
- Include short usage examples only if they add value.

## 7) Quality Checklist Before Merging

Run this checklist for each component change:

1. **Token check**
   - No hardcoded colors.
   - No numeric font weights.
   - Spacing uses token variables where applicable.

2. **Composition check**
   - Molecules use atoms rather than custom duplicate UI primitives.

3. **API check**
   - Props are consistent with existing naming patterns.
   - Backward compatibility preserved if required.

4. **Error/build check**
   - No editor errors.
   - Build passes:

```bash
npm run build
```

5. **Behavior check**
   - Hover, focus, disabled, error/success states still behave correctly.

## 8) Refactor Strategy for Existing Components

When cleaning older components:

1. Replace raw values with token equivalents.
2. Normalize prop names and compatibility shims.
3. Move repeated UI pieces into atoms/helpers.
4. Remove dead code and unused imports.
5. Validate with build and quick manual smoke test.

## 9) Example Component Skeleton

```jsx
import { useState } from "react";

export const COMPONENT_VARIANTS = {
  default: "default",
  success: "success",
};

const styles = {
  base: {
    display: "flex",
    gap: "var(--spacing-sm)",
    fontWeight: "var(--font-weight-regular)",
    color: "var(--color-content-primary)",
  },
  variants: {
    default: {},
    success: { color: "var(--color-content-positive)" },
  },
};

export const ExampleComponent = ({ variant = COMPONENT_VARIANTS.default, style, children, ...props }) => {
  const componentStyle = {
    ...styles.base,
    ...styles.variants[variant],
    ...style,
  };

  return (
    <div style={componentStyle} {...props}>
      {children}
    </div>
  );
};

ExampleComponent.variants = COMPONENT_VARIANTS;
```

---

If a new requirement conflicts with this guide, prefer the **existing design tokens and established component patterns** over introducing new ad-hoc styling or APIs.
