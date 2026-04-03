/**
 * Button Component Demo
 *
 * Showcases all button variants, sizes, and states.
 */

import React from "react";
import { Button, BUTTON_SIZES } from "./button.jsx";
import { BUTTON_VARIANTS } from "../utils/props.js";

// Sample icon for demonstration
const PlusIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
      clipRule="evenodd"
    />
  </svg>
);

// Section component for organizing demo
const Section = ({ title, children }) => (
  <section className="mb-12">
    <h2 className="text-xl font-semibold text-content-primary mb-6 pb-2 border-b border-neutral-200">
      {title}
    </h2>
    {children}
  </section>
);

// Row component for displaying buttons
const Row = ({ label, children }) => (
  <div className="flex items-center gap-4 mb-4">
    <span className="w-24 text-sm text-content-secondary shrink-0">{label}</span>
    <div className="flex items-center gap-3 flex-wrap">{children}</div>
  </div>
);

export const ButtonDemo = () => {
  const variants = Object.values(BUTTON_VARIANTS);
  const sizes = Object.values(BUTTON_SIZES);

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-content-primary mb-2">
            Button Component
          </h1>
          <p className="text-content-secondary">
            A flexible button with variants, sizes, and loading states.
          </p>
        </header>

        {/* Variants */}
        <Section title="Variants">
          {variants.map((variant) => (
            <Row key={variant} label={variant}>
              <Button variant={variant}>Button</Button>
              <Button variant={variant} iconLeading={<PlusIcon />}>
                With Icon
              </Button>
              <Button variant={variant} iconTrailing={<ArrowRightIcon />}>
                Trailing
              </Button>
            </Row>
          ))}
        </Section>

        {/* Sizes */}
        <Section title="Sizes">
          {sizes.map((size) => (
            <Row key={size} label={size}>
              <Button size={size}>Button {size.toUpperCase()}</Button>
              <Button size={size} variant="secondary">
                Secondary
              </Button>
              <Button size={size} iconLeading={<PlusIcon />}>
                With Icon
              </Button>
            </Row>
          ))}
        </Section>

        {/* States */}
        <Section title="States">
          <Row label="Default">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
          </Row>
          <Row label="Disabled">
            <Button isDisabled>Disabled</Button>
            <Button variant="secondary" isDisabled>
              Secondary
            </Button>
            <Button variant="tertiary" isDisabled>
              Tertiary
            </Button>
            <Button variant="negative" isDisabled>
              Negative
            </Button>
            <Button variant="positive" isDisabled>
              Positive
            </Button>
          </Row>
          <Row label="Loading">
            <Button loading>Loading</Button>
            <Button variant="secondary" loading>
              Secondary
            </Button>
            <Button variant="tertiary" loading>
              Tertiary
            </Button>
            <Button variant="negative" loading>
              Negative
            </Button>
          </Row>
        </Section>

        {/* Block */}
        <Section title="Block (Full Width)">
          <div className="space-y-3 max-w-md">
            <Button block>Primary Block</Button>
            <Button block variant="secondary">
              Secondary Block
            </Button>
            <Button block variant="tertiary">
              Tertiary Block
            </Button>
          </div>
        </Section>

        {/* With Icons */}
        <Section title="With Icons">
          <Row label="Leading">
            {variants.slice(0, 4).map((variant) => (
              <Button key={variant} variant={variant} iconLeading={<PlusIcon />}>
                Add Item
              </Button>
            ))}
          </Row>
          <Row label="Trailing">
            {variants.slice(0, 4).map((variant) => (
              <Button
                key={variant}
                variant={variant}
                iconTrailing={<ArrowRightIcon />}
              >
                Continue
              </Button>
            ))}
          </Row>
          <Row label="Both">
            {variants.slice(0, 4).map((variant) => (
              <Button
                key={variant}
                variant={variant}
                iconLeading={<PlusIcon />}
                iconTrailing={<ArrowRightIcon />}
              >
                Action
              </Button>
            ))}
          </Row>
        </Section>

        {/* Link Variant */}
        <Section title="Link Variant">
          <div className="space-y-4">
            <p className="text-content-secondary">
              Link buttons have no padding and appear inline with text.
            </p>
            <div className="flex items-center gap-2 text-content-primary">
              <span>Click</span>
              <Button variant="link">this link</Button>
              <span>to learn more about our</span>
              <Button variant="link">documentation</Button>.
            </div>
            <div className="flex gap-4">
              <Button variant="link">Default Link</Button>
              <Button variant="link" isDisabled>
                Disabled Link
              </Button>
            </div>
          </div>
        </Section>

        {/* Interactive Demo */}
        <Section title="Interactive Demo">
          <p className="text-content-secondary mb-4">
            Click the buttons to test interactions.
          </p>
          <div className="flex gap-3">
            <Button onPress={() => alert("Primary clicked!")}>
              Click Me
            </Button>
            <Button
              variant="secondary"
              onPress={() => alert("Secondary clicked!")}
            >
              Or Me
            </Button>
            <Button
              variant="negative"
              onPress={() => alert("Danger zone!")}
            >
              Delete
            </Button>
          </div>
        </Section>

        {/* All Combinations Grid */}
        <Section title="Variant x Size Matrix">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-3 text-left text-sm text-content-secondary font-medium">
                    Variant / Size
                  </th>
                  {sizes.map((size) => (
                    <th
                      key={size}
                      className="p-3 text-center text-sm text-content-secondary font-medium"
                    >
                      {size.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {variants
                  .filter((v) => v !== "link")
                  .map((variant) => (
                    <tr key={variant} className="border-t border-neutral-200">
                      <td className="p-3 text-sm text-content-secondary capitalize">
                        {variant}
                      </td>
                      {sizes.map((size) => (
                        <td key={size} className="p-3 text-center">
                          <Button variant={variant} size={size}>
                            Button
                          </Button>
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default ButtonDemo;
