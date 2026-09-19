import React from "react";
import { ComponentLibraryDemo } from "../../eureka.jsx";

import ContractReviewAssistantGuidancePage from "./guidance.jsx";
import ContractReviewAssistantLoadingPage from "./loading.jsx";
import ContractReviewAssistantReviewPage from "./review.jsx";
import OpportunityPage from "../test/opportunity-page.jsx";

const LIBRARY_PATH = "/library";
const TEST_OPPORTUNITY_PAGE_PATH = "/test/opportunity-page";

const CONTRACT_REVIEW_ASSISTANT_GUIDANCE_PATH = "/contract-review-assistant/guidance";
const CONTRACT_REVIEW_ASSISTANT_LOADING_PATH = "/contract-review-assistant/loading";
const CONTRACT_REVIEW_ASSISTANT_REVIEW_PATH = "/contract-review-assistant/review";

const PAGE_TITLES = {
  [CONTRACT_REVIEW_ASSISTANT_GUIDANCE_PATH]: "Inpart",
  [CONTRACT_REVIEW_ASSISTANT_LOADING_PATH]: "Inpart",
  [CONTRACT_REVIEW_ASSISTANT_REVIEW_PATH]: "Inpart",
  [TEST_OPPORTUNITY_PAGE_PATH]: "Opportunity page",
  [LIBRARY_PATH]: "Eureka library",
};

const ROUTE_COMPONENTS = {
  [CONTRACT_REVIEW_ASSISTANT_GUIDANCE_PATH]: <ContractReviewAssistantGuidancePage />,
  [CONTRACT_REVIEW_ASSISTANT_LOADING_PATH]: <ContractReviewAssistantLoadingPage />,
  [CONTRACT_REVIEW_ASSISTANT_REVIEW_PATH]: <ContractReviewAssistantReviewPage />,
  [TEST_OPPORTUNITY_PAGE_PATH]: <OpportunityPage />,
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
