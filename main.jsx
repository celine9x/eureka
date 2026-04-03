import React from "react";
import { createRoot } from "react-dom/client";
import { ComponentLibraryDemo } from "./test.jsx";
import "./library/tokens/tokens.css";
import "./src/index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ComponentLibraryDemo />
  </React.StrictMode>
);
