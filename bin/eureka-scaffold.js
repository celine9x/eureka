#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const cwd = process.cwd();
const packageName = "qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n";
const packageVersion = "latest";
const args = process.argv.slice(2);
const command = args[0] || "hub-page";

const fileExists = (target) => fs.existsSync(target);
const ensureDir = (targetDir) => fs.mkdirSync(targetDir, { recursive: true });
const writeIfMissing = (targetPath, content) => {
  if (fileExists(targetPath)) {
    console.log(`Skipped existing file: ${targetPath}`);
    return false;
  }
  ensureDir(path.dirname(targetPath));
  fs.writeFileSync(targetPath, content, "utf8");
  console.log(`Created: ${targetPath}`);
  return true;
};

const readFileSafe = (targetPath) => {
  try {
    return fs.readFileSync(targetPath, "utf8");
  } catch {
    return null;
  }
};

const injectIfMissing = (targetPath, marker, insertion) => {
  const content = readFileSafe(targetPath);
  if (!content || content.includes(insertion.trim())) return false;
  const next = `${insertion}\n${content}`;
  fs.writeFileSync(targetPath, next, "utf8");
  console.log(`Updated: ${targetPath}`);
  return true;
};

const runCommand = (cmd, cmdArgs, options = {}) => {
  const result = spawnSync(cmd, cmdArgs, {
    stdio: "inherit",
    shell: false,
    ...options,
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
};

const toPascalCase = (value) =>
  value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");

const toKebabCase = (value) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

const componentUsageMarkup = (componentName) => {
  const withChildren = new Set(["Badge", "Button", "ButtonBadge", "Chip", "Link"]);
  if (withChildren.has(componentName)) {
    return `<${componentName}>${componentName}</${componentName}>`;
  }
  return `<${componentName} />`;
};

const scaffoldComponentFile = (targetDir, componentInput) => {
  if (!componentInput) {
    console.error(`Usage: npx ${packageName}@latest add <component-name>`);
    process.exit(1);
  }

  const componentName = toPascalCase(componentInput);
  if (!componentName) {
    console.error("Component name is invalid.");
    process.exit(1);
  }

  const componentFileName = `${toKebabCase(componentName)}.jsx`;
  const appDir = path.join(targetDir, "app");
  const srcDir = path.join(targetDir, "src");
  const componentsDir = fileExists(srcDir)
    ? path.join(srcDir, "components")
    : fileExists(appDir)
      ? path.join(targetDir, "components")
      : path.join(targetDir, "components");

  const targetPath = path.join(componentsDir, componentFileName);
  const componentMarkup = componentUsageMarkup(componentName);
  const content = `import { ${componentName} } from "${packageName}";

export default function ${componentName}Example() {
  return (
    <div style={{ padding: 24 }}>
      ${componentMarkup}
    </div>
  );
}
`;

  writeIfMissing(targetPath, content);
  console.log(`Component scaffold ready: ${targetPath}`);
};

const starterPageTsx = `export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(2.5rem, 8vw, 6rem)",
          lineHeight: 1,
          margin: 0,
          textAlign: "center",
        }}
      >
        Eureka Library
      </h1>
    </main>
  );
}
`;

const appJsx = `import "qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n/style.css";

export default function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(2.5rem, 8vw, 6rem)",
          lineHeight: 1,
          margin: 0,
          textAlign: "center",
        }}
      >
        Eureka Library
      </h1>
    </main>
  );
}
`;

const nextLayoutImport = 'import "qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n/style.css";';

const scaffoldStarterPage = (targetDir) => {
  const appDir = path.join(targetDir, "app");
  const srcDir = path.join(targetDir, "src");

  if (fileExists(appDir)) {
    const pagePath = path.join(appDir, "page.tsx");
    writeIfMissing(pagePath, starterPageTsx);

    const layoutTsx = path.join(appDir, "layout.tsx");
    const layoutJsx = path.join(appDir, "layout.jsx");
    if (fileExists(layoutTsx)) injectIfMissing(layoutTsx, "import", nextLayoutImport);
    else if (fileExists(layoutJsx)) injectIfMissing(layoutJsx, "import", nextLayoutImport);
    else {
      writeIfMissing(
        layoutTsx,
        `${nextLayoutImport}\n\nexport default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (\n    <html lang=\"en\">\n      <body>{children}</body>\n    </html>\n  );\n}\n`
      );
    }

    console.log("Starter page scaffolded for Next.js app router.");
    return;
  }

  if (fileExists(srcDir)) {
    const appPath = path.join(srcDir, "App.jsx");
    fs.writeFileSync(appPath, appJsx, "utf8");
    console.log(`Updated: ${appPath}`);
    console.log("Starter page scaffolded for Vite/React app.");
    return;
  }

  console.error("No supported app structure found. Expected ./app or ./src in current folder.");
  process.exit(1);
};

if (command === "init") {
  const projectName = args[1];
  const useNextjs = args.includes("--nextjs");

  if (!projectName) {
    console.error("Usage: npx qjsmkdfjqklsmdjfkqsdjfqksdjfkn-n-n init <project-name> [--nextjs]");
    process.exit(1);
  }

  const targetDir = path.join(cwd, projectName);
  if (fileExists(targetDir)) {
    console.error(`Target folder already exists: ${targetDir}`);
    process.exit(1);
  }

  if (useNextjs) {
    runCommand("npx", [
      "create-next-app@latest",
      projectName,
      "--yes",
      "--js",
      "--app",
      "--use-npm",
      "--no-tailwind",
      "--eslint",
    ], { cwd });
  } else {
    runCommand("npm", ["create", "vite@latest", projectName, "--", "--template", "react"], { cwd });
    runCommand("npm", ["install"], { cwd: targetDir });
  }

  runCommand("npm", ["install", `${packageName}@${packageVersion}`], { cwd: targetDir });
  scaffoldStarterPage(targetDir);

  console.log(`\nDone. Next steps:\n  cd ${projectName}\n  npm run dev`);
  process.exit(0);
}

if (command === "hub-page") {
  scaffoldStarterPage(cwd);
  process.exit(0);
}

if (command === "add") {
  const componentName = args[1];
  scaffoldComponentFile(cwd, componentName);
  process.exit(0);
}

console.error(`Unknown command: ${command}`);
console.error(`Usage:\n  npx ${packageName}@latest init <project-name> [--nextjs]\n  npx ${packageName}@latest hub-page\n  npx ${packageName}@latest add <component-name>`);
process.exit(1);
