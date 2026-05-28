import React from "react";
import { ComponentLibraryDemo } from "../eureka.jsx";

import { OntologyRouterPrototypePage } from "./Nexus/ontology-router-prototype.jsx";
import AdvancedFiltersPage from "./Nexus/advanced-filters.jsx";
import AdvancedFiltersResultsPage from "./Nexus/advanced-filters-results.jsx";
import AdvancedFiltersResults2Page from "./Nexus/advanced-filters-results2.jsx";
import AdvancedFilters2Page from "./Nexus/advanced-filters2.jsx";
import AccessControlPage from "./access-control/access-control-page.jsx";

const LIBRARY_PATH = "/library";

const ONTOLOGY_ROUTER_PROTOTYPE_PATH = "/nexus/ontology";
const SEARCH_PATH = "/nexus/search";
const SEARCH2_PATH = "/nexus/search2";
const RESULTS_PATH = "/nexus/results";
const RESULTS2_PATH = "/nexus/results2";

const ACCESS_CONTROL_PATH = "/access-control";

const ROUTE_COMPONENTS = {
 
  
  [ACCESS_CONTROL_PATH]: <AccessControlPage />,
  [SEARCH_PATH]: <AdvancedFiltersPage />,
  [RESULTS_PATH]: <AdvancedFiltersResultsPage />,
  [SEARCH2_PATH]: <AdvancedFilters2Page />,
  [RESULTS2_PATH]: <AdvancedFiltersResults2Page />,


  

  [LIBRARY_PATH]: <ComponentLibraryDemo />,
};

const ALLOWED_PATHS = new Set(Object.keys(ROUTE_COMPONENTS));

const isAllowedPath = (currentPath) => {
  return ALLOWED_PATHS.has(currentPath);
};

export const RouterApp = () => {
  const [path, setPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const currentPath = window.location.pathname;

    if (currentPath === "/" || !isAllowedPath(currentPath)) {
      window.history.replaceState({}, "", LIBRARY_PATH);
      setPath(LIBRARY_PATH);
      return;
    }

    const handlePopState = () => {
      const nextPath = window.location.pathname;
      if (!isAllowedPath(nextPath)) {
        window.history.replaceState({}, "", LIBRARY_PATH);
        setPath(LIBRARY_PATH);
        return;
      }
      setPath(nextPath);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return ROUTE_COMPONENTS[path] || <ComponentLibraryDemo />;
};

export default RouterApp;