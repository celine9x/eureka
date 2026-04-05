# Install Options

This package can be used in 3 ways:

1. From npm (recommended when published)
2. From GitHub (private/internal access)
3. From a local tarball (offline/internal handoff)

Package name:

`qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n`

## Option 1 — Install from npm

```bash
npm install qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n@latest
```

Use CLI commands directly with npx:

```bash
npx qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n@latest init my-app --nextjs
npx qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n@latest hub-page
npx qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n@latest add button
```

## Option 2 — Install from GitHub repo

### A) SSH

In the consuming project `package.json`:

```json
{
  "dependencies": {
    "qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n": "git+ssh://git@github.com/lumia12/eureka.git#main"
  }
}
```

Then run:

```bash
npm install
```

### B) HTTPS + PAT

If SSH is not available, use a GitHub PAT with repo read access.

In the consuming project, add `.npmrc` (or user-level `~/.npmrc`):

```ini
//github.com/:_authToken=${GITHUB_TOKEN}
```

Then install:

```bash
export GITHUB_TOKEN=your_github_pat
npm install git+https://github.com/lumia12/eureka.git#main
```

## Option 3 — Local tarball install

In this library repo:

```bash
npm run pack:local
```

This creates a tarball such as:

`qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n-0.0.33.tgz`

In another project:

```bash
npm install /absolute/path/to/qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n-0.0.33.tgz
```

## Usage in consuming app

```js
import { Button, Table, ObjectPage } from "qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n";
import "qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n/style.css";
```

If needed, tokens can be imported directly:

```js
import "qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n/tokens.css";
```
