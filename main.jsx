import React from "react";
import { createRoot } from "react-dom/client";
import { ToastProvider } from "./library/molecules/toast.jsx";
import { RouterApp } from "./pages/contract-review-assistant/router-app.jsx";
import "./library/tokens/tokens.css";
import "./src/index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider position="bottom-right">
      <RouterApp />
    </ToastProvider>
  </React.StrictMode>
);
