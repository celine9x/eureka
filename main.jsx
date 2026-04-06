import React from "react";
import { createRoot } from "react-dom/client";
import { ComponentLibraryDemo } from "./eureka.jsx";
import { Hub } from "./library/templates/hub.jsx";
import { Badge } from "./library/atoms/badge.jsx";
import { Button } from "./library/atoms/button.jsx";
import "./library/tokens/tokens.css";
import "./src/index.css";

const HUB_TEST_COLUMNS = [
  { key: "name", label: "Name", sortable: true },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <Badge color={value === "Active" ? "positive" : "warning"}>{value}</Badge>
    ),
  },
  { key: "revenue", label: "Revenue", sortable: true },
];

const HUB_TEST_DATA = [
  { id: 1, name: "Acme Corp", status: "Active", revenue: "$1.2M" },
  { id: 2, name: "Blue Sky", status: "Pending", revenue: "$480K" },
  { id: 3, name: "North Star", status: "Active", revenue: "$2.1M" },
];

const HubTemplateTestPage = () => {
  return (
    <Hub
      title="Hub Template Test"
      badge={String(HUB_TEST_DATA.length)}
      showSideMenu={false}
      columns={HUB_TEST_COLUMNS}
      data={HUB_TEST_DATA}
      showPagination={false}
      headerActions={<Button variant="primary" size="md">Create</Button>}
      emptyMessage="No records"
    />
  );
};

const RouterApp = () => {
  const [path, setPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    if (window.location.pathname === "/") {
      window.history.replaceState({}, "", "/library");
      setPath("/library");
      return;
    }

    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (path === "/test") {
    return <HubTemplateTestPage />;
  }

  return <ComponentLibraryDemo />;
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterApp />
  </React.StrictMode>
);
