import React from "react";
import { ComponentLibraryDemo } from "../eureka.jsx";
import {
  AiOpportunityExtractionPage,
  AiOpportunityExtractionPageV2,
  AiOpportunityExtractionReviewPage,
} from "./ai-opportunity-extraction-page.jsx";
import { OpportunityExtractionViewerPage } from "./opportunity-extraction-viewer-page.jsx";
import AiHomepage from "./ai-homepage.jsx";

const LIBRARY_PATH = "/library";
const EXTRACTION_PATH = "/ai-opportunity-extraction";
const EXTRACTION_V2_PATH = "/ai-opportunity-extraction-v2";
const EXTRACTION_REVIEW_PATH = "/ai-opportunity-extraction/review";
const EXTRACTION_VIEWER_PATH = "/opportunity-extraction-viewer";
const AI_HOMEPAGE_PATH = "/ai-homepage";

const isAllowedPath = (currentPath) => {
  return (
    currentPath === LIBRARY_PATH ||
    currentPath === EXTRACTION_PATH ||
    currentPath === EXTRACTION_V2_PATH ||
    currentPath === EXTRACTION_REVIEW_PATH ||
    currentPath === EXTRACTION_VIEWER_PATH ||
    currentPath === AI_HOMEPAGE_PATH
  );
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

  if (path === EXTRACTION_REVIEW_PATH) {
    return <AiOpportunityExtractionReviewPage />;
  }

  if (path === EXTRACTION_PATH) {
    return <AiOpportunityExtractionPage />;
  }

  if (path === EXTRACTION_V2_PATH) {
    return <AiOpportunityExtractionPageV2 />;
  }

  if (path === EXTRACTION_VIEWER_PATH) {
    return <OpportunityExtractionViewerPage />;
  }

  if (path === AI_HOMEPAGE_PATH) {
    return <AiHomepage />;
  }

  return <ComponentLibraryDemo />;
};

export default RouterApp;