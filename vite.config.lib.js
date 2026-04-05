import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

const externalPackages = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "react-aria-components",
];

const externalMatchers = [
  /^@heroicons\/react(\/.*)?$/,
  /^@phosphor-icons\/react(\/.*)?$/,
];

const isExternal = (id) => {
  if (externalPackages.includes(id)) return true;
  return externalMatchers.some((matcher) => matcher.test(id));
};

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: fileURLToPath(new URL("./library/index.js", import.meta.url)),
      name: "Eureka",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
      cssFileName: "style",
    },
    rollupOptions: {
      external: isExternal,
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
