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
import ValidityDatesPage from "./clause/validity-dates.jsx";
import InlineEditPage from "./inline-edit/inline-edit-page.jsx";
import InlineEditTablePage from "./inline-edit/inline-edit-table.jsx";
import HubPage from "./hub/hub-page.jsx";
import OutlookAddinPage from "./outlook-addin/outlook-addin-page.jsx";
import OutlookAddInSearchPage from "./outlook-add-in/search.jsx";
import ContractReviewAssistantGuidancePage from "./contract-review-assistant/guidance.jsx";
import ContractReviewAssistantLoadingPage from "./contract-review-assistant/loading.jsx";
import ContractReviewAssistantReviewPage from "./contract-review-assistant/review.jsx";
import FileUploaderDemoPage from "./file-uploader/demo.jsx";

const LIBRARY_PATH = "/library";

const CLAUSE_VALIDITY_PATH = "/clause/validity-dates";
const INLINE_EDIT_PATH = "/inline-edit";
const INLINE_EDIT_TABLE_PATH = "/inline-edit/table";
const HUB_PATH = "/hub";
const OUTLOOK_ADDIN_PATH = "/outlook-addin";
const ONTOLOGY_ROUTER_PROTOTYPE_PATH = "/nexus/ontology";
const SEARCH_PATH = "/nexus/search";
const SEARCH2_PATH = "/nexus/search2";
const RESULTS_PATH = "/nexus/results";
const RESULTS2_PATH = "/nexus/results2";

const ACCESS_CONTROL_PATH = "/access-control";
const OUTLOOK_ADD_IN_SEARCH_PATH = "/outlook-add-in/search";
const CONTRACT_REVIEW_ASSISTANT_GUIDANCE_PATH = "/contract-review-assistant/guidance";
const CONTRACT_REVIEW_ASSISTANT_LOADING_PATH = "/contract-review-assistant/loading";
const CONTRACT_REVIEW_ASSISTANT_REVIEW_PATH = "/contract-review-assistant/review";
const FILE_UPLOADER_DEMO_PATH = "/file-uploader/demo";

const AI_HOMEPAGE_PATH = "/opportunity-extraction/ai-homepage";
const AI_HOMEPAGE_DEMO_PATH = "/opportunity-extraction/ai-homepage-demo";
const AI_OPPORTUNITY_EXTRACTION_PATH = "/opportunity-extraction/extraction";
const OPPORTUNITY_EXTRACTION_VIEWER_PATH = "/opportunity-extraction/viewer";
const OBLIGATION_FORM_PATH = "/obligation-extraction/form";
const OBLIGATION_FORMS_COMPARE_PATH = "/obligation-extraction/compare";

const PAGE_TITLES = {
  [INLINE_EDIT_PATH]: "Inline Edit — Eureka",
  [INLINE_EDIT_TABLE_PATH]: "Inline Edit Table — Eureka",
  [HUB_PATH]: "Hub — Eureka",
  [OUTLOOK_ADDIN_PATH]: "Outlook Add-in — Eureka",
  [LIBRARY_PATH]: "Component Library — Eureka",
  [ACCESS_CONTROL_PATH]: "Access Control â€” Eureka",
  [OUTLOOK_ADD_IN_SEARCH_PATH]: "Outlook Add-in Search â€” Eureka",
  [CONTRACT_REVIEW_ASSISTANT_GUIDANCE_PATH]: "Contract Review Assistant Guidance â€” Eureka",
  [CONTRACT_REVIEW_ASSISTANT_LOADING_PATH]: "Contract Review Assistant Loading â€” Eureka",
  [CONTRACT_REVIEW_ASSISTANT_REVIEW_PATH]: "Contract Review Assistant Review â€” Eureka",
  [FILE_UPLOADER_DEMO_PATH]: "File Uploader Demo â€” Eureka",

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
  [CLAUSE_VALIDITY_PATH]: "Validity Date Scenarios â€” Eureka",
};

const ROUTE_COMPONENTS = {
  [CLAUSE_VALIDITY_PATH]: <ValidityDatesPage />,
  [INLINE_EDIT_PATH]: <InlineEditPage />,
  [INLINE_EDIT_TABLE_PATH]: <InlineEditTablePage />,
  [HUB_PATH]: <HubPage />,
  [OUTLOOK_ADDIN_PATH]: <OutlookAddinPage />,

  [OUTLOOK_ADD_IN_SEARCH_PATH]: <OutlookAddInSearchPage />,
  [CONTRACT_REVIEW_ASSISTANT_GUIDANCE_PATH]: <ContractReviewAssistantGuidancePage />,
  [CONTRACT_REVIEW_ASSISTANT_LOADING_PATH]: <ContractReviewAssistantLoadingPage />,
  [CONTRACT_REVIEW_ASSISTANT_REVIEW_PATH]: <ContractReviewAssistantReviewPage />,
  [FILE_UPLOADER_DEMO_PATH]: <FileUploaderDemoPage />,

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

const isLibraryPath = (currentPath) => currentPath === LIBRARY_PATH || currentPath.startsWith(`${LIBRARY_PATH}/`);

const isAllowedPath = (currentPath) => {
  return ALLOWED_PATHS.has(currentPath) || isLibraryPath(currentPath);
};

export const RouterApp = () => {
  const [path, setPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    document.title = PAGE_TITLES[path] || (isLibraryPath(path) ? PAGE_TITLES[LIBRARY_PATH] : "Eureka");
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

  if (isLibraryPath(path)) {
    return <ComponentLibraryDemo />;
  }

  return ROUTE_COMPONENTS[path] || <ComponentLibraryDemo />;
};

export default RouterApp;
