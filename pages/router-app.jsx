import React from "react";
import { ComponentLibraryDemo } from "../eureka.jsx";
import {
  AiOpportunityExtractionPage,
  AiOpportunityExtractionPageV2,
  AiOpportunityExtractionReviewPage,
} from "./ai-opportunity-extraction-page.jsx";

const LIBRARY_PATH = "/library";
const EXTRACTION_PATH = "/ai-opportunity-extraction";
const EXTRACTION_V2_PATH = "/ai-opportunity-extraction-v2";
const EXTRACTION_REVIEW_PATH = "/ai-opportunity-extraction/review";

const isAllowedPath = (currentPath) => {
  return (
    currentPath === LIBRARY_PATH ||
    currentPath === EXTRACTION_PATH ||
    currentPath === EXTRACTION_V2_PATH ||
    currentPath === EXTRACTION_REVIEW_PATH
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

  return <ComponentLibraryDemo />;
};

export default RouterApp;
