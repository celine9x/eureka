# NPM Install Guide

This guide shows the fastest way to start a brand new project with the package already installed and a simple starter page scaffolded for you.

## 1. Create a new Next.js project

From any terminal location:

```bash
npx qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n@latest init name-project --nextjs
```

This will:

- Create a new Next.js app
- Install `qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n@latest`
- Add the package stylesheet import
- Scaffold a simple page with a large "Eureka Library" title

## 2. Start the app

```bash
cd name-project
npm run dev
```

## 3. Create a new Vite React project instead

If you want Vite React instead of Next.js, omit `--nextjs`:

```bash
npx qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n@latest init name-project
cd name-project
npm run dev
```

## 4. Add the starter page to an existing project

If you already have a React project and only want to scaffold the starter page into it:

```bash
npx qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n@latest hub-page
```

## 5. Add A Component File At Any Time

Use the new `add` command to scaffold a component example file into your project:

```bash
npx qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n@latest add button
```

You can do the same for any other component name:

```bash
npx qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n@latest add badge
npx qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n@latest add text-input
npx qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n@latest add modal
```

Scaffold location:

- Vite React projects: `src/components/<component-name>.jsx`
- Next.js projects: `components/<component-name>.jsx`

## 6. Manual Usage

If you do not want to use the scaffold command, add this to `src/App.jsx`:

```jsx
import "qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n/style.css";
import { Button } from "qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n";

export default function App() {
  return (
    <main style={{ padding: 24 }}>
      <Button variant="primary">Test Button</Button>
    </main>
  );
}
```

## Pin to a specific version (optional)

```bash
npm install qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n@0.0.33
```

Use `@latest` if you always want the newest published release.

## Quick command reference

```bash
npx qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n@latest init my-app --nextjs
npx qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n@latest init my-app
npx qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n@latest hub-page
npx qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n@latest add button
```