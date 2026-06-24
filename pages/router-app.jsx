import React from "react";
import { ComponentLibraryDemo } from "../eureka.jsx";

import { OntologyRouterPrototypePage } from "./Nexus/ontology-router-prototype.jsx";
import AdvancedFiltersPage from "./Nexus/advanced-filters.jsx";
import AdvancedFiltersResultsPage from "./Nexus/advanced-filters-results.jsx";
import AdvancedFiltersResults2Page from "./Nexus/advanced-filters-results2.jsx";
import AdvancedFilters2Page from "./Nexus/advanced-filters2.jsx";
import AccessControlPage from "./access-control/access-control-page.jsx";
import AiHomepagePage from "./opportunity-extraction/ai-homepage-page.jsx";
import AiHomepage from "./opportunity-extraction/ai-homepage.jsx";
import AiOpportunityExtractionPage from "./opportunity-extraction/ai-opportunity-extraction-page.jsx";
import OpportunityExtractionViewerPage from "./opportunity-extraction/opportunity-extraction-viewer-page.jsx";
import ObligationForm from "./obligation-extraction/form.jsx";
import ObligationFormsCompare from "./obligation-extraction/forms-compare.jsx";
import AddToDeal from "./Nexus/add-to-deal.jsx";
import ValidityDatesPage from "./clause/validity-dates.jsx";

const LIBRARY_PATH = "/library";

const ADD_TO_DEAL_PATH = "/nexus/add-to-deal";
const CLAUSE_VALIDITY_PATH = "/clause/validity-dates";
const ONTOLOGY_ROUTER_PROTOTYPE_PATH = "/nexus/ontology";
const SEARCH_PATH = "/nexus/search";
const SEARCH2_PATH = "/nexus/search2";
const RESULTS_PATH = "/nexus/results";
const RESULTS2_PATH = "/nexus/results2";

const ACCESS_CONTROL_PATH = "/access-control";

const AI_HOMEPAGE_PATH = "/opportunity-extraction/ai-homepage";
const AI_HOMEPAGE_DEMO_PATH = "/opportunity-extraction/ai-homepage-demo";
const AI_OPPORTUNITY_EXTRACTION_PATH = "/opportunity-extraction/extraction";
const OPPORTUNITY_EXTRACTION_VIEWER_PATH = "/opportunity-extraction/viewer";
const OBLIGATION_FORM_PATH = "/obligation-extraction/form";
const OBLIGATION_FORMS_COMPARE_PATH = "/obligation-extraction/compare";

const PAGE_TITLES = {
  [LIBRARY_PATH]: "Component Library â€” Eureka",
  [ACCESS_CONTROL_PATH]: "Access Control â€” Eureka",
  [AI_HOMEPAGE_PATH]: "AI Homepage â€” Eureka",
  [AI_HOMEPAGE_DEMO_PATH]: "AI Homepage Demo â€” Eureka",
  [AI_OPPORTUNITY_EXTRACTION_PATH]: "Opportunity Extraction â€” Eureka",
  [OPPORTUNITY_EXTRACTION_VIEWER_PATH]: "Extraction Viewer â€” Eureka",
  [OBLIGATION_FORM_PATH]: "Obligation Form â€” Eureka",
  [OBLIGATION_FORMS_COMPARE_PATH]: "Obligation Forms Compare â€” Eureka",
  [SEARCH_PATH]: "Advanced Filters â€” Eureka",
  [RESULTS_PATH]: "Search Results â€” Eureka",
  [SEARCH2_PATH]: "Advanced Filters 2 â€” Eureka",
  [RESULTS2_PATH]: "Search Results 2 â€” Eureka",
  [ONTOLOGY_ROUTER_PROTOTYPE_PATH]: "Ontology Router â€” Eureka",
  [ADD_TO_DEAL_PATH]: "Add to Deal â€” Eureka",
  [CLAUSE_VALIDITY_PATH]: "Validity Date Scenarios â€” Eureka",
};

const ROUTE_COMPONENTS = {
  [ADD_TO_DEAL_PATH]: <AddToDeal open onClose={() => window.history.back()} />,
  [CLAUSE_VALIDITY_PATH]: <ValidityDatesPage />,

  [ACCESS_CONTROL_PATH]: <AccessControlPage />,
  [AI_HOMEPAGE_PATH]: <AiHomepagePage />,
  [AI_HOMEPAGE_DEMO_PATH]: <AiHomepage />,
  [AI_OPPORTUNITY_EXTRACTION_PATH]: <AiOpportunityExtractionPage />,
  [OPPORTUNITY_EXTRACTION_VIEWER_PATH]: <OpportunityExtractionViewerPage />,
  [OBLIGATION_FORM_PATH]: <ObligationFormsCompare />,
  [OBLIGATION_FORMS_COMPARE_PATH]: <ObligationFormsCompare />,
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
    document.title = PAGE_TITLES[path] || "Eureka";
  }, [path]);

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
