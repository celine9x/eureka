// ai-homepage.jsx
// Template for the AI homepage using SideMenu, AiChatInput, and a list of tasks with RadioCard

import React, { useState } from "react";
import { SideMenu } from "../organisms/side-menu/side-menu.jsx";
import { AiChatInput } from "../molecules/ai-chat-input.jsx";
import { RadioCardGroup, RadioCard } from "../molecules/radio-card.jsx";

// Example data for side menu and tasks
const sideMenuSections = [
  {
    items: [
      { label: "Home", iconName: "Home", state: "active" },
      { label: "Deals", iconName: "DocumentText" },
      { label: "Tasks", iconName: "ClipboardDocumentList" },
      { label: "Settings", iconName: "Cog6Tooth" },
    ],
  },
];

const tasks = [
  {
    value: "obligation-extraction",
    label: "Obligation extraction",
    info: "14 mar, 2026, Contract name",
    reviewed: "4/17 reviewed",
    warning: true,
  },
  {
    value: "opportunity-preview",
    label: "Opportunity preview",
    info: "10 mar, 2026, 3 documents",
    reviewed: "2/4 reviewed",
    warning: false,
  },
];

export function AiHomepage() {
  const [selectedTask, setSelectedTask] = useState(tasks[0].value);
  const [inputValue, setInputValue] = useState("");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f7f8fa" }}>
      {/* Side Menu */}
      <SideMenu
        variant="expanded"
        sections={sideMenuSections}
        user={{ name: "Jane", email: "jane@example.com" }}
        style={{ minHeight: "100vh" }}
      />

      {/* Main Content */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: 0, background: "none" }}>
        {/* Centered Box */}
        <div style={{ width: "100%", maxWidth: 700, margin: "0 auto", marginTop: 80, display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Logo */}
          <div style={{ marginBottom: 32, marginTop: 16 }}>
            <img src="/logo.png" alt="Logo" style={{ width: 64, height: 64, opacity: 0.7 }} />
          </div>
          {/* Greeting */}
          <h2 style={{ fontWeight: 700, fontSize: 28, textAlign: "center", marginBottom: 24, color: "#1a1a1a" }}>
            Hello Jane, what are you looking for today?
          </h2>
          {/* AI Chat Input */}
          <div style={{ width: "100%", marginBottom: 32 }}>
            <AiChatInput
              value={inputValue}
              onChange={setInputValue}
              placeholder="Ask anything"
              submitLabel="Submit"
              showLeadingButton={true}
              style={{ boxShadow: "0 2px 12px 0 rgba(80, 120, 255, 0.08)", border: "1px solid #e0e7ef" }}
            />
          </div>
          {/* Tasks in Progress */}
          <div style={{ width: "100%", marginBottom: 16 }}>
            <div style={{ color: "#7c8da6", fontWeight: 600, fontSize: 13, marginBottom: 8, letterSpacing: 1 }}>TASKS IN PROGRESS <span style={{ background: "#e0e7ef", color: "#4a5a6a", borderRadius: 8, padding: "2px 8px", fontSize: 12, marginLeft: 6 }}>{tasks.length}</span></div>
            <RadioCardGroup value={selectedTask} onChange={setSelectedTask}>
              {tasks.map((task) => (
                <RadioCard
                  key={task.value}
                  value={task.value}
                  label={task.label}
                  info={task.info}
                  style={{ marginBottom: 12, boxShadow: "0 1px 6px 0 rgba(80, 120, 255, 0.04)", border: "1px solid #e0e7ef" }}
                  action={
                    <span style={{ fontSize: 12, color: task.warning ? "#e24d4d" : "#7c8da6", fontWeight: 600 }}>{task.reviewed}</span>
                  }
                />
              ))}
            </RadioCardGroup>
          </div>
        </div>
      </main>
    </div>
  );
}
