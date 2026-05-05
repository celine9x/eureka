import React from "react";
import { ComponentLibraryDemo } from "../eureka.jsx";
import {
  AiOpportunityExtractionPage,
  AiOpportunityExtractionPageV2,
  AiOpportunityExtractionReviewPage,
} from "./ai-opportunity-extraction-page.jsx";
import { OpportunityExtractionViewerPage } from "./opportunity-extraction-viewer-page.jsx";
import AiHomepage from "./ai-homepage.jsx";
import AddAgreementModalPage from "./add-agreement-modal.jsx";
import {
  HubTemplatePage,
  ObjectPageTemplatePage,
  SidePanelTemplatePage,
  DocumentViewerTemplatePage,
  AiHomepageTemplatePage,
} from "./templates-preview.jsx";
import { OntologyRouterPrototypePage } from "./Nexus/ontology-router-prototype.jsx";
import AdvancedFiltersPage from "./Nexus/advanced-filters.jsx";

const LIBRARY_PATH = "/library";
const EXTRACTION_PATH = "/ai-opportunity-extraction";
const EXTRACTION_V2_PATH = "/ai-opportunity-extraction-v2";
const EXTRACTION_REVIEW_PATH = "/ai-opportunity-extraction/review";
const EXTRACTION_VIEWER_PATH = "/opportunity-extraction-viewer";
const ONTOLOGY_ROUTER_PROTOTYPE_PATH = "/nexus/ontology";
const ADVANCED_FILTERS_PATH = "/nexus/advanced-filters";
const AI_HOMEPAGE_PATH = "/ai-homepage";
const ADD_AGREEMENT_PATH = "/add-agreement";
const ADD_AGREEMENT_PRIVATE_OPPORTUNITY_PATH = "/add-agreement/private-opportunity";
const TEMPLATE_HUB_PATH = "/template/hub";
const TEMPLATE_OBJECT_PAGE_PATH = "/template/object-page";
const TEMPLATE_SIDE_PANEL_PATH = "/template/side-panel";
const TEMPLATE_DOCUMENT_VIEWER_PATH = "/template/document-viewer";
const TEMPLATE_AI_HOMEPAGE_PATH = "/template/ai-homepage";

const isAllowedPath = (currentPath) => {
  return (
    currentPath === LIBRARY_PATH ||
    currentPath === EXTRACTION_PATH ||
    currentPath === EXTRACTION_V2_PATH ||
    currentPath === EXTRACTION_REVIEW_PATH ||
    currentPath === EXTRACTION_VIEWER_PATH ||
    currentPath === ONTOLOGY_ROUTER_PROTOTYPE_PATH ||
    currentPath === ADVANCED_FILTERS_PATH ||
    currentPath === AI_HOMEPAGE_PATH ||
    currentPath === ADD_AGREEMENT_PATH ||
    currentPath === ADD_AGREEMENT_PRIVATE_OPPORTUNITY_PATH ||
    currentPath === TEMPLATE_HUB_PATH ||
    currentPath === TEMPLATE_OBJECT_PAGE_PATH ||
    currentPath === TEMPLATE_SIDE_PANEL_PATH ||
    currentPath === TEMPLATE_DOCUMENT_VIEWER_PATH ||
    currentPath === TEMPLATE_AI_HOMEPAGE_PATH
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

  if (path === ONTOLOGY_ROUTER_PROTOTYPE_PATH) {
    return <OntologyRouterPrototypePage />;
  }

  if (path === ADVANCED_FILTERS_PATH) {
    return <AdvancedFiltersPage />;
  }

  if (path === AI_HOMEPAGE_PATH) {
    return <AiHomepage />;
  }

  if (path === ADD_AGREEMENT_PATH) {
    return <AddAgreementModalPage />;
  }

  if (path === ADD_AGREEMENT_PRIVATE_OPPORTUNITY_PATH) {
    return (
      <AddAgreementModalPage
        hideAlliance
        opportunityUnderPartners
        lockAccess
        accessTooltip="Access is inherited from the linked opportunity. If removed, it follows the default for the selected type."
        defaultOpportunities={[{ id: "op1", label: "Private opportunity" }]}
        defaultAccessControl="private"
        defaultAccessSelected={[
          { id: "alexandra", label: "Alexandra Johnson", type: "user" },
          { id: "alice", label: "Alice Johnson", type: "user" },
        ]}
      />
    );
  }

  if (path === TEMPLATE_HUB_PATH) return <HubTemplatePage />;
  if (path === TEMPLATE_OBJECT_PAGE_PATH) return <ObjectPageTemplatePage />;
  if (path === TEMPLATE_SIDE_PANEL_PATH) return <SidePanelTemplatePage />;
  if (path === TEMPLATE_DOCUMENT_VIEWER_PATH) return <DocumentViewerTemplatePage />;
  if (path === TEMPLATE_AI_HOMEPAGE_PATH) return <AiHomepageTemplatePage />;

  return <ComponentLibraryDemo />;
};

export default RouterApp;