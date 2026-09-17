"use client";

import React, {
  isValidElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as pdfjsLib from "pdfjs-dist";
import { ChatBubbleLeftRightIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button } from "../../atoms/button.jsx";
import { Icon } from "../../atoms/icon.jsx";
import { CommentPopover, DEFAULT_COMMENT_THREAD } from "../../molecules/comment-popover.jsx";
import { Tooltip } from "../../atoms/tooltip.jsx";
import { createStyleInjector, joinStyles } from "../../utils/styles.js";
import {
  RichTextEditToolbars,
  RICH_TEXT_EDIT_TOOLBAR_ACTIONS,
} from "../../molecules/rich-text-edit-toolbars.jsx";
// Set up PDF.js worker - set globally before any PDF operations
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
}

const styles = {
  base: `
    .document-viewer {
      --document-viewer-height: calc(var(--spacing-12) * 12.5);
      --document-viewer-scrollbar-size: var(--spacing-1);
      --document-viewer-outline-width: calc(var(--spacing-1) / 4);
      --document-viewer-page-outline-color: var(--color-action-outline-secondary-enabled);
      --document-viewer-page-text-font-family: var(--font-family-primary);
      --document-viewer-page-text-font-size: var(--text-body-md);
      --document-viewer-page-text-line-height: var(--line-height-body-lg);
      --document-viewer-counter-size: var(--size-button-xs);
      --document-viewer-print-spacing: var(--spacing-6);
      --document-viewer-spinner-size: var(--size-icon-sm);
      --document-viewer-spinner-border-width: calc(var(--spacing-1) / 2);
      --document-viewer-spinner-animation: var(--transition-slow);
      width: 100%;
      height: var(--document-viewer-height);
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--color-general-neutral-light);
      border-radius: var(--radius-sm);
      outline: var(--document-viewer-outline-width) solid var(--color-action-outline-secondary-enabled);
      outline-offset: calc(var(--document-viewer-outline-width) * -1);
    }

    .document-viewer__viewport {
      position: relative;
      flex: 1 1 auto;
      overflow-y: auto;
      overflow-x: hidden;
      padding: var(--spacing-4);
      scroll-behavior: smooth;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-md);
      background: var(--color-general-neutral-light);
      outline: var(--document-viewer-outline-width) solid var(--color-action-outline-secondary-enabled);
      outline-offset: calc(var(--document-viewer-outline-width) * -1);
    }

    .document-viewer__viewport::-webkit-scrollbar {
      width: var(--document-viewer-scrollbar-size);
    }

    .document-viewer__viewport::-webkit-scrollbar-track {
      background: var(--color-action-fill-tertiary-enabled);
    }

    .document-viewer__viewport::-webkit-scrollbar-thumb {
      background: var(--color-content-tertiary);
      border-radius: var(--radius-full);
    }

    .document-viewer__page-shell {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 0 0 auto;
    }

    .document-viewer__page {
      background: var(--color-general-white);
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-button-light);
      outline: var(--document-viewer-outline-width) solid var(--document-viewer-page-outline-color);
      outline-offset: calc(var(--document-viewer-outline-width) * -1);
      overflow: hidden;
    }

    .document-viewer__page-body {
      width: 100%;
      height: 100%;
      padding: var(--spacing-6);
      box-sizing: border-box;
    }

    .document-viewer__page-canvas {
      display: block;
      max-width: 100%;
      height: auto;
    }

    .document-viewer__page-text {
      width: 100%;
      height: 100%;
      white-space: pre-wrap;
      word-break: break-word;
      font-family: var(--document-viewer-page-text-font-family);
      font-size: var(--document-viewer-page-text-font-size);
      line-height: var(--document-viewer-page-text-line-height);
      color: var(--color-content-primary);
      box-sizing: border-box;
    }

    .document-viewer__page-text--editable {
      outline: none;
      height: 100%;
      overflow: hidden;
    }

    .document-viewer__paragraph--title {
      display: block;
      text-align: center;
      font-weight: 700;
      font-size: 1.6em;
    }

    .document-viewer__paragraph--heading1 {
      font-weight: 700;
      font-size: 1.3em;
      color: var(--color-content-brand);
    }

    .document-viewer__paragraph--heading2 {
      font-weight: 700;
      font-size: 1.1em;
      color: var(--color-content-brand);
    }

    .document-viewer__paragraph--italic {
      font-style: italic;
    }

    .document-viewer--show-live-changes ins,
    .document-viewer--show-live-changes del {
      text-decoration: none;
    }

    .document-viewer--show-live-changes ins {
      color: var(--color-content-redline-add);
      background: transparent;
    }

    .document-viewer--show-live-changes del {
      color: var(--color-content-redline-delete);
      background: transparent;
      text-decoration: line-through;
    }

    .document-viewer--hide-live-changes ins {
      color: inherit;
      background: transparent;
    }

    .document-viewer--hide-live-changes del {
      display: none;
    }

    .document-viewer__highlight {
      color: inherit;
      border-radius: var(--radius-xs);
    }

    .document-viewer__highlight--high {
      background: var(--color-redline-highlight-high);
    }

    .document-viewer__highlight--medium {
      background: var(--color-redline-highlight-medium);
    }

    .document-viewer__highlight--low {
      background: var(--color-redline-highlight-low);
    }

    .document-viewer__page-comments {
      width: min(100%, calc(var(--spacing-12) * 14));
      display: flex;
      flex-direction: column;
      gap: var(--spacing-1);
      margin-top: var(--spacing-2);
    }

    .document-viewer__page-comment-label {
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      line-height: var(--line-height-body-md);
      color: var(--color-content-secondary);
    }

    .document-viewer__page-comment-input {
      width: 100%;
      min-height: calc(var(--spacing-12) * 2.5);
      resize: vertical;
      border-radius: var(--radius-sm);
      border: var(--document-viewer-outline-width) solid var(--color-action-outline-secondary-enabled);
      background: var(--color-general-white);
      color: var(--color-content-primary);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
      line-height: var(--line-height-body-md);
      padding: var(--spacing-2);
      box-sizing: border-box;
    }

    .document-viewer__empty {
      color: var(--color-content-secondary);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-lg);
      line-height: var(--line-height-body-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: var(--spacing-6);
    }

    .document-viewer__toolbar {
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-4);
      padding: var(--spacing-2) var(--spacing-1);
      background: var(--color-general-neutral-light);
      border-top: var(--document-viewer-outline-width) solid var(--color-action-outline-secondary-enabled);
    }

    .document-viewer__edit-toolbar {
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-1);
      padding: var(--spacing-1) var(--spacing-2);
      background: var(--color-general-neutral-light);
      border-bottom: var(--document-viewer-outline-width) solid var(--color-action-outline-secondary-enabled);
      overflow-x: auto;
    }

    .document-viewer__edit-toolbar-group {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-1);
    }

    .document-viewer__edit-toolbar-divider {
      width: var(--document-viewer-outline-width);
      align-self: stretch;
      background: var(--color-content-tertiary);
      opacity: 0.6;
      margin: 0 var(--spacing-1);
    }

    .document-viewer__edit-toolbar-button {
      width: calc(var(--size-button-xs) + var(--spacing-2));
      height: calc(var(--size-button-xs) + var(--spacing-2));
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: var(--radius-xs);
      background: transparent;
      color: var(--color-content-brand);
      cursor: pointer;
      transition: background var(--transition-fast), color var(--transition-fast);
      flex: 0 0 auto;
    }

    .document-viewer__edit-toolbar-button:hover {
      background: var(--color-action-fill-tertiary-hover);
    }

    .document-viewer__edit-toolbar-button:focus-visible {
      outline: var(--document-viewer-outline-width) solid var(--color-interaction-outline-active);
      outline-offset: 0;
    }

    .document-viewer__edit-toolbar-button--active {
      background: var(--color-action-fill-tertiary-active);
      color: var(--color-action-content-tertiary-active);
    }

    .document-viewer__edit-toolbar-button:disabled {
      color: var(--color-content-tertiary);
      cursor: not-allowed;
    }

    .document-viewer__toolbar-group {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-2);
    }

    .document-viewer__toolbar-divider {
      width: var(--document-viewer-outline-width);
      align-self: stretch;
      background: var(--color-content-tertiary);
      opacity: 0.6;
    }

    .document-viewer__counter {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-2);
      color: var(--color-content-secondary);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-lg);
      line-height: var(--line-height-body-lg);
    }

    .document-viewer__counter-current {
      min-width: var(--document-viewer-counter-size);
      height: var(--document-viewer-counter-size);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0 var(--spacing-1);
      background: var(--color-general-white);
      border-radius: var(--radius-xs);
      outline: var(--document-viewer-outline-width) solid var(--color-action-outline-secondary-enabled);
      outline-offset: calc(var(--document-viewer-outline-width) * -1);
      box-shadow: var(--shadow-button-light);
      color: var(--color-content-secondary);
      font-size: var(--text-body-md);
      line-height: var(--line-height-body-md);
    }

    .document-viewer__loading {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-2);
      color: var(--color-content-secondary);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-lg);
      line-height: var(--line-height-body-lg);
    }
  `,
};

const injectStyles = createStyleInjector("document-viewer");

// Width reserved for the comment marker button so it clamps to stay inside
// the document viewer's viewport instead of spilling past its edge.
const COMMENT_MARKER_SIZE = 40;

const DEFAULT_EDITABLE_ACTIONS = [
  RICH_TEXT_EDIT_TOOLBAR_ACTIONS.bold,
  RICH_TEXT_EDIT_TOOLBAR_ACTIONS.italic,
  RICH_TEXT_EDIT_TOOLBAR_ACTIONS.underline,
  RICH_TEXT_EDIT_TOOLBAR_ACTIONS.bulletList,
  RICH_TEXT_EDIT_TOOLBAR_ACTIONS.numberList,
  RICH_TEXT_EDIT_TOOLBAR_ACTIONS.alignLeft,
  RICH_TEXT_EDIT_TOOLBAR_ACTIONS.alignCenter,
  RICH_TEXT_EDIT_TOOLBAR_ACTIONS.alignRight,
  RICH_TEXT_EDIT_TOOLBAR_ACTIONS.link,
  RICH_TEXT_EDIT_TOOLBAR_ACTIONS.undo,
  RICH_TEXT_EDIT_TOOLBAR_ACTIONS.redo,
];

const EDIT_COMMANDS = {
  [RICH_TEXT_EDIT_TOOLBAR_ACTIONS.bold]: { command: "bold" },
  [RICH_TEXT_EDIT_TOOLBAR_ACTIONS.italic]: { command: "italic" },
  [RICH_TEXT_EDIT_TOOLBAR_ACTIONS.underline]: { command: "underline" },
  [RICH_TEXT_EDIT_TOOLBAR_ACTIONS.bulletList]: { command: "insertUnorderedList" },
  [RICH_TEXT_EDIT_TOOLBAR_ACTIONS.numberList]: { command: "insertOrderedList" },
  [RICH_TEXT_EDIT_TOOLBAR_ACTIONS.alignLeft]: { command: "justifyLeft" },
  [RICH_TEXT_EDIT_TOOLBAR_ACTIONS.alignCenter]: { command: "justifyCenter" },
  [RICH_TEXT_EDIT_TOOLBAR_ACTIONS.alignRight]: { command: "justifyRight" },
  [RICH_TEXT_EDIT_TOOLBAR_ACTIONS.undo]: { command: "undo" },
  [RICH_TEXT_EDIT_TOOLBAR_ACTIONS.redo]: { command: "redo" },
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const toEditableHtml = (value = "") => escapeHtml(String(value)).replace(/\n/g, "<br>");

// Wraps specific known paragraphs (a title, section headings, an italic
// notice, ...) in a styling span. Runs after the page's HTML has already
// been built (highlights/redlines/escaping). Paragraphs are joined with a
// blank line (rendered as "<br><br>"), so splitting on that and requiring a
// whole-segment match means a heading's own text is styled without also
// matching that same text where it's merely quoted inside another
// paragraph (e.g. "LICENSE AGREEMENT" the title vs. "THIS LICENSE
// AGREEMENT (...) is made effective..." later in the same page).
const PARAGRAPH_BREAK_HTML = "<br><br>";
const applyParagraphStyles = (html, paragraphStyles = []) => {
  const classByParagraphHtml = new Map();
  paragraphStyles.forEach(({ text, className } = {}) => {
    if (!text || !className) return;
    classByParagraphHtml.set(toEditableHtml(text), className);
  });
  if (classByParagraphHtml.size === 0) return html;

  return html
    .split(PARAGRAPH_BREAK_HTML)
    .map((segment) => {
      const className = classByParagraphHtml.get(segment);
      return className ? `<span class="${className}">${segment}</span>` : segment;
    })
    .join(PARAGRAPH_BREAK_HTML);
};

// Replaces a whole paragraph (e.g. a placeholder marker standing in for a
// table) with arbitrary trusted HTML supplied by the caller — same
// whole-segment-match approach as applyParagraphStyles, but substitutes the
// segment instead of wrapping it, so a table can flow inline with the
// surrounding prose on the same page instead of needing its own page.
const applyBlockHtmlOverrides = (html, blockHtmlOverrides = []) => {
  const htmlByParagraphHtml = new Map();
  blockHtmlOverrides.forEach(({ text, html: overrideHtml } = {}) => {
    if (!text || !overrideHtml) return;
    htmlByParagraphHtml.set(toEditableHtml(text), overrideHtml);
  });
  if (htmlByParagraphHtml.size === 0) return html;

  return html
    .split(PARAGRAPH_BREAK_HTML)
    .map((segment) => htmlByParagraphHtml.get(segment) ?? segment)
    .join(PARAGRAPH_BREAK_HTML);
};

const createHighlightedHtml = (value = "", targets = [], fallbackLevel = "high") => {
  const text = String(value);
  const normalizedTargets = (Array.isArray(targets) ? targets : [{ text: targets, level: fallbackLevel }])
    .filter((target) => target?.text)
    .map((target) => ({ ...target, index: text.indexOf(target.text) }))
    .filter((target) => target.index >= 0)
    .sort((first, second) => first.index - second.index);
  let cursor = 0;
  let html = "";

  normalizedTargets.forEach((target) => {
    if (target.index < cursor) return;
    html += toEditableHtml(text.slice(cursor, target.index));
    html += `<mark data-document-highlight="${target.active ? "active" : ""}" class="document-viewer__highlight document-viewer__highlight--${target.level || fallbackLevel}">${toEditableHtml(target.text)}</mark>`;
    cursor = target.index + target.text.length;
  });

  return html + toEditableHtml(text.slice(cursor));
};

// Splits into whitespace runs, word runs (letters/digits, with internal
// apostrophes kept so "Party's" stays one token), and individual punctuation
// characters. Punctuation is NOT glued to the adjacent word — otherwise
// adding a comma after "Efforts" makes the whole "Efforts,"/"Efforts" pair
// fail to match as tokens, and the diff shows the entire word as deleted
// and re-added right next to itself instead of just inserting the comma.
const tokenizeForRedline = (value = "") =>
  String(value).match(/\s+|[A-Za-z0-9]+(?:'[A-Za-z0-9]+)*|[^\sA-Za-z0-9]/g) ?? [];

const createRedlineHtml = (originalValue = "", currentValue = "") => {
  const originalTokens = tokenizeForRedline(originalValue);
  const currentTokens = tokenizeForRedline(currentValue);
  let prefixLength = 0;
  let suffixLength = 0;

  while (
    prefixLength < originalTokens.length &&
    prefixLength < currentTokens.length &&
    originalTokens[prefixLength] === currentTokens[prefixLength]
  ) {
    prefixLength += 1;
  }

  while (
    suffixLength < originalTokens.length - prefixLength &&
    suffixLength < currentTokens.length - prefixLength &&
    originalTokens[originalTokens.length - 1 - suffixLength] === currentTokens[currentTokens.length - 1 - suffixLength]
  ) {
    suffixLength += 1;
  }

  const unchangedStart = originalTokens.slice(0, prefixLength).join("");
  const removed = originalTokens.slice(prefixLength, originalTokens.length - suffixLength).join("");
  const added = currentTokens.slice(prefixLength, currentTokens.length - suffixLength).join("");
  const unchangedEnd = suffixLength ? originalTokens.slice(originalTokens.length - suffixLength).join("") : "";

  return [
    escapeHtml(unchangedStart),
    removed ? `<del>${escapeHtml(removed)}</del>` : "",
    added ? `<ins>${escapeHtml(added)}</ins>` : "",
    escapeHtml(unchangedEnd),
  ].join("").replace(/\n/g, "<br>");
};

// Marks an applied suggestion with the same word-level diff shown in the
// Suggestion panel before it was applied (see textarea.jsx's
// renderRedlinePreview) — unchanged words stay plain/primary-colored, and
// only the words that actually differ between the original clause and the
// applied suggestion are shown as removed/added, instead of treating the
// whole clause as one big delete-and-replace.
// activeProposedText marks the currently-selected finding's applied change
// with data-document-highlight="active" (matching the attribute
// createHighlightedHtml uses before a finding is applied), so the existing
// scroll-to-highlight effect below can find it and scroll straight to the
// top of that block right after Apply — otherwise, once a finding is
// applied, this function's output has no "active" marker at all and that
// effect finds nothing to scroll to.
const createAppliedRedlineHtml = (value = "", changes = [], activeProposedText) => {
  let remainingText = String(value);
  let result = "";
  let hasAppliedChange = false;

  changes.forEach(({ originalText = "", proposedText = "", commentId }) => {
    const changeIndex = proposedText ? remainingText.indexOf(proposedText) : -1;
    if (changeIndex < 0) return;

    hasAppliedChange = true;
    result += escapeHtml(remainingText.slice(0, changeIndex)).replace(/\n/g, "<br>");
    const redline = createRedlineHtml(originalText, proposedText);
    const isActive = Boolean(proposedText) && proposedText === activeProposedText;
    const redlineBlock = isActive ? `<span data-document-highlight="active">${redline}</span>` : redline;
    result += commentId ? `<span data-document-comment-anchor="${commentId}">${redlineBlock}</span>` : redlineBlock;
    remainingText = remainingText.slice(changeIndex + proposedText.length);
  });

  return hasAppliedChange ? `${result}${escapeHtml(remainingText).replace(/\n/g, "<br>")}` : "";
};

const normalizePageRecord = (page, index) => {
  if (page && typeof page === "object" && !isValidElement(page)) {
    return {
      id: page.id ?? `page-${index + 1}`,
      title: page.title,
      content: page.content ?? "",
    };
  }

  return {
    id: `page-${index + 1}`,
    content: page ?? "",
  };
};

const splitLongParagraph = (paragraph, maxCharactersPerPage) => {
  const words = String(paragraph).split(/\s+/).filter(Boolean);
  const chunks = [];
  let currentChunk = "";

  words.forEach((word) => {
    const candidate = currentChunk ? `${currentChunk} ${word}` : word;
    if (candidate.length <= maxCharactersPerPage || !currentChunk) {
      currentChunk = candidate;
      return;
    }

    chunks.push(currentChunk);
    currentChunk = word;
  });

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
};

export const paginateTextToPages = ({
  text = "",
  maxCharactersPerPage = 1800,
  pageSeparator = "\f",
}) => {
  const normalizedText = String(text ?? "").trim();

  if (!normalizedText) {
    return [{ id: "page-1", content: "" }];
  }

  if (normalizedText.includes(pageSeparator)) {
    return normalizedText
      .split(pageSeparator)
      .map((page) => page.trim())
      .filter((page) => page.length > 0)
      .map((page, index) => ({ id: `page-${index + 1}`, content: page }));
  }

  const paragraphs = normalizedText
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .flatMap((paragraph) =>
      paragraph.length > maxCharactersPerPage
        ? splitLongParagraph(paragraph, maxCharactersPerPage)
        : [paragraph]
    );

  const pages = [];
  let currentPage = "";

  paragraphs.forEach((paragraph) => {
    const candidate = currentPage ? `${currentPage}\n\n${paragraph}` : paragraph;
    if (candidate.length <= maxCharactersPerPage || !currentPage) {
      currentPage = candidate;
      return;
    }

    pages.push({ id: `page-${pages.length + 1}`, content: currentPage });
    currentPage = paragraph;
  });

  if (currentPage) {
    pages.push({ id: `page-${pages.length + 1}`, content: currentPage });
  }

  return pages.length > 0 ? pages : [{ id: "page-1", content: normalizedText }];
};

export const DocumentViewer = ({
  pdfFile,
  pages,
  text = "",
  originalText,
  appliedRedlines = [],
  highlights = [],
  highlightText,
  highlightLevel = "high",
  paragraphStyles = [],
  blockHtmlOverrides = [],
  pageSeparator = "\f",
  maxCharactersPerPage = 1800,
  defaultPage = 1,
  defaultZoom = 1,
  minZoom = 0.75,
  maxZoom = 1.5,
  zoomStep = 0.1,
  pageWidth = 595,
  pageHeight = 842,
  pagePadding = 40,
  showEditToolbar = true,
  editable = false,
  liveChanges,
  defaultLiveChanges = true,
  onLiveChangesChange,
  showCommentPopover = true,
  commentThread = DEFAULT_COMMENT_THREAD,
  onCommentSubmit,
  showPageComments = false,
  pageComments,
  onPageCommentChange,
  onEditablePagesChange,
  editToolbarActions,
  activeEditActions = [],
  onEditAction,
  disableEditToolbar = false,
  showToolbar = true,
  renderPage,
  emptyState = "No document content available.",
  onPageChange,
  onZoomChange,
  onError,
  className = "",
  style,
  ...props
}) => {
  injectStyles(joinStyles(styles));

  const normalizedPages = useMemo(() => {
    if (Array.isArray(pages) && pages.length > 0) {
      return pages.map(normalizePageRecord);
    }

    return paginateTextToPages({
      text,
      maxCharactersPerPage,
      pageSeparator,
    });
  }, [maxCharactersPerPage, pageSeparator, pages, text]);

  const [pdfDoc, setPdfDoc] = useState(null);
  const [loading, setLoading] = useState(!!pdfFile);
  const [error, setError] = useState(null);
  const [activeFormats, setActiveFormats] = useState({});
  const editablePageHtmlRef = useRef([]);
  const [editablePages, setEditablePages] = useState(null);
  const editablePageCapacityRef = useRef(maxCharactersPerPage);
  const originalPageTextRef = useRef(null);
  const [redlineHtmlByPage, setRedlineHtmlByPage] = useState({});
  const [editingPageIndex, setEditingPageIndex] = useState(null);
  const [internalComments, setInternalComments] = useState({});
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [commentAnchorPositions, setCommentAnchorPositions] = useState([]);
  const [internalLiveChanges, setInternalLiveChanges] = useState(defaultLiveChanges);
  const activeToolbarActions = useMemo(() => new Set(activeEditActions), [activeEditActions]);
  const isLiveChangesControlled = liveChanges !== undefined;
  const resolvedLiveChanges = isLiveChangesControlled ? liveChanges : internalLiveChanges;
  const setShowLiveChanges = (nextValue) => {
    if (!isLiveChangesControlled) {
      setInternalLiveChanges(nextValue);
    }
    onLiveChangesChange?.(nextValue);
  };

  const resolvedToolbarActions = useMemo(() => {
    if (!editable) return [];
    if (!Array.isArray(editToolbarActions) || editToolbarActions.length === 0) {
      return DEFAULT_EDITABLE_ACTIONS;
    }
    return editToolbarActions;
  }, [editable, editToolbarActions]);

  const displayedPages = editable && !pdfDoc && editablePages ? editablePages : normalizedPages;
  const totalPages = pdfDoc ? pdfDoc.numPages : displayedPages.length || 1;
  const [currentPage, setCurrentPage] = useState(clamp(defaultPage, 1, totalPages));
  const [zoom, setZoom] = useState(clamp(defaultZoom, minZoom, maxZoom));

  const viewportRef = useRef(null);
  const viewerRef = useRef(null);
  const pageRefs = useRef([]);
  const editableRefs = useRef([]);
  const isProgrammaticScrollRef = useRef(false);

  useEffect(() => {
    editablePageHtmlRef.current = displayedPages.map((page) => toEditableHtml(page.content ?? ""));
  }, [displayedPages]);

  useEffect(() => {
    originalPageTextRef.current = paginateTextToPages({
      text: originalText ?? text,
      maxCharactersPerPage,
      pageSeparator,
    }).map((page) => String(page.content ?? ""));
    setEditablePages(null);
    setRedlineHtmlByPage({});
    setEditingPageIndex(null);
  }, [maxCharactersPerPage, originalText, pageSeparator, text]);

  useEffect(() => {
    editablePageCapacityRef.current = maxCharactersPerPage;
  }, [maxCharactersPerPage]);

  const updateCommentAnchorPositions = () => {
    const viewer = viewerRef.current;
    const viewport = viewportRef.current;
    if (!viewer || !viewport) return;

    const viewportRect = viewport.getBoundingClientRect();

    const positions = commentThread.flatMap((comment) => {
      const anchor = viewer.querySelector(`[data-document-comment-anchor="${comment.id}"]`);
      if (!anchor) return [];
      const anchorRect = anchor.getBoundingClientRect();
      const pageRect = anchor.closest(".document-viewer__page")?.getBoundingClientRect();
      if (!pageRect) return [];

      // Coordinates are relative to the scrollable viewport's own content box
      // (not the browser viewport), so the marker stays put inside the
      // document-viewer while scrolling instead of needing to be recomputed.
      const top = anchorRect.top - viewportRect.top + viewport.scrollTop;
      const maxLeft = Math.max(viewportRect.width - COMMENT_MARKER_SIZE - 8, 0);
      const left = Math.min(Math.max(pageRect.right - viewportRect.left + 24, 0), maxLeft);

      return [{ id: comment.id, top, left }];
    });
    setCommentAnchorPositions((previousPositions) => {
      const hasSamePositions = previousPositions.length === positions.length && previousPositions.every(
        (position, index) =>
          position.id === positions[index].id &&
          Math.round(position.top) === Math.round(positions[index].top) &&
          Math.round(position.left) === Math.round(positions[index].left)
      );
      return hasSamePositions ? previousPositions : positions;
    });
  };

  useLayoutEffect(() => {
    updateCommentAnchorPositions();
  }, [appliedRedlines, commentThread, displayedPages, resolvedLiveChanges, zoom]);

  useEffect(() => {
    if (!activeCommentId) return;

    const handlePointerDown = (event) => {
      if (event.target.closest?.("[data-comment-popover-root]")) return;
      setActiveCommentId(null);
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [activeCommentId]);

  useLayoutEffect(() => {
    if (!highlightText) return;

    const scrollToHighlight = () => {
      const viewport = viewportRef.current;
      const highlight = viewport?.querySelector('[data-document-highlight="active"]');
      if (!viewport || !highlight) return;

      const topOffset = 24;
      const highlightTop = highlight.getBoundingClientRect().top - viewport.getBoundingClientRect().top;
      viewport.scrollTo({
        top: viewport.scrollTop + highlightTop - topOffset,
        behavior: "smooth",
      });
    };
    const frameId = window.requestAnimationFrame(scrollToHighlight);
    return () => window.cancelAnimationFrame(frameId);
  }, [highlightLevel, highlightText, displayedPages]);

  // Load PDF if provided
  useEffect(() => {
    if (!pdfFile) return;

    const loadPdf = async () => {
      try {
        setLoading(true);
        setError(null);

        let url = pdfFile;
        if (pdfFile instanceof File || pdfFile instanceof Blob) {
          url = URL.createObjectURL(pdfFile);
        }

        const doc = await pdfjsLib.getDocument(url).promise;
        setPdfDoc(doc);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Failed to load PDF";
        setError(errorMsg);
        onError?.(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    loadPdf();
  }, [pdfFile, onError]);

  useEffect(() => {
    pageRefs.current = pageRefs.current.slice(0, totalPages);
    setCurrentPage((page) => clamp(page, 1, totalPages));
  }, [totalPages]);

  useEffect(() => {
    onPageChange?.(currentPage);
  }, [currentPage, onPageChange]);

  useEffect(() => {
    onZoomChange?.(zoom);
  }, [onZoomChange, zoom]);

  useEffect(() => {
    if (!editable || typeof document === "undefined") return;

    const syncActiveFormats = () => {
      const getState = (command) => {
        try {
          return Boolean(document.queryCommandState(command));
        } catch {
          return false;
        }
      };

      setActiveFormats({
        [RICH_TEXT_EDIT_TOOLBAR_ACTIONS.bold]: getState("bold"),
        [RICH_TEXT_EDIT_TOOLBAR_ACTIONS.italic]: getState("italic"),
        [RICH_TEXT_EDIT_TOOLBAR_ACTIONS.underline]: getState("underline"),
        [RICH_TEXT_EDIT_TOOLBAR_ACTIONS.bulletList]: getState("insertUnorderedList"),
        [RICH_TEXT_EDIT_TOOLBAR_ACTIONS.numberList]: getState("insertOrderedList"),
      });
    };

    document.addEventListener("selectionchange", syncActiveFormats);
    return () => {
      document.removeEventListener("selectionchange", syncActiveFormats);
    };
  }, [editable]);

  const scrollToPage = (pageNumber) => {
    const nextPage = clamp(pageNumber, 1, totalPages);
    const pageNode = pageRefs.current[nextPage - 1];

    if (!pageNode) return;

    isProgrammaticScrollRef.current = true;
    pageNode.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrentPage(nextPage);

    window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 300);
  };

  const handleScroll = () => {
    if (isProgrammaticScrollRef.current) return;

    const viewport = viewportRef.current;
    if (!viewport || pageRefs.current.length === 0) return;

    const viewportCenter = viewport.scrollTop + viewport.clientHeight / 2;
    let nearestPage = 1;
    let nearestDistance = Number.POSITIVE_INFINITY;

    pageRefs.current.forEach((pageNode, index) => {
      if (!pageNode) return;

      const pageCenter = pageNode.offsetTop + pageNode.offsetHeight / 2;
      const distance = Math.abs(pageCenter - viewportCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestPage = index + 1;
      }
    });

    if (nearestPage !== currentPage) {
      setCurrentPage(nearestPage);
    }
  };

  const updateZoom = (direction) => {
    setZoom((currentZoom) => {
      const nextZoom = clamp(
        Number((currentZoom + direction * zoomStep).toFixed(2)),
        minZoom,
        maxZoom
      );
      return nextZoom;
    });
  };

  const getPageCommentValue = (pageKey) => {
    if (pageComments && typeof pageComments === "object") {
      return pageComments[pageKey] ?? "";
    }
    return internalComments[pageKey] ?? "";
  };

  const updatePageComment = (pageKey, value) => {
    if (!(pageComments && typeof pageComments === "object")) {
      setInternalComments((prev) => ({ ...prev, [pageKey]: value }));
    }
    onPageCommentChange?.(pageKey, value);
  };

  const executeToolbarAction = (action) => {
    if (!editable || disableEditToolbar || typeof document === "undefined") return;

    const activeEditor = editableRefs.current[currentPage - 1];
    if (!activeEditor) {
      onEditAction?.(action);
      return;
    }

    activeEditor.focus();

    if (action === RICH_TEXT_EDIT_TOOLBAR_ACTIONS.link) {
      const link = window.prompt("Enter link URL");
      if (link) {
        document.execCommand("createLink", false, link);
      }
      onEditAction?.(action);
      return;
    }

    const command = EDIT_COMMANDS[action];
    if (command) {
      document.execCommand(command.command, false, command.value ?? null);
    }
    onEditAction?.(action);
  };

  const reflowEditablePages = (editedEditor) => {
    if (!editable || pdfDoc) return;
    // When the caller supplies its own `pages` (e.g. paginated by measuring
    // real rendered height, with tables placed inline), this component must
    // not repaginate them with its own generic character-count method —
    // that discards the caller's pagination and, since originalPageTextRef
    // below is computed from `text`/`originalText` rather than those custom
    // pages, diffs two mismatched page boundaries into a nonsensical
    // full-page redline. The caller owns pagination in that case.
    if (Array.isArray(pages) && pages.length > 0) return;

    const text = editableRefs.current
      .map((editor, index) => editor?.innerText ?? displayedPages[index]?.content ?? "")
      .join(pageSeparator);
    if (editedEditor?.scrollHeight > editedEditor.clientHeight) {
      const currentLength = Math.max(1, editedEditor.innerText.length);
      const measuredCapacity = Math.floor(
        currentLength * (editedEditor.clientHeight / editedEditor.scrollHeight)
      );
      editablePageCapacityRef.current = Math.max(1, measuredCapacity);
    }

    const nextPages = paginateTextToPages({
      text,
      maxCharactersPerPage: editablePageCapacityRef.current,
      pageSeparator,
    });

    editablePageHtmlRef.current = nextPages.map((page) => toEditableHtml(page.content ?? ""));
    setRedlineHtmlByPage(
      Object.fromEntries(
        nextPages.map((page, index) => [
          index,
          createRedlineHtml(originalPageTextRef.current?.[index] ?? "", page.content),
        ])
      )
    );
    setEditablePages(nextPages);
    onEditablePagesChange?.(nextPages);
  };

  const renderPageBody = (page, index) => {
    if (renderPage) {
      return renderPage(page, index);
    }

    const content = page?.content ?? "";

    if (isValidElement(content)) {
      return content;
    }

    const rawTextContent = String(content ?? "").trim();
    const appliedRedlineHtml = editingPageIndex !== index && appliedRedlines.length > 0
      ? createAppliedRedlineHtml(content, appliedRedlines, highlightText)
      : "";
    const baseEditableHtml = appliedRedlineHtml || (editingPageIndex !== index && resolvedLiveChanges && redlineHtmlByPage[index]
      ? redlineHtmlByPage[index]
      : (highlightText || highlights.length > 0) && editingPageIndex !== index
      ? createHighlightedHtml(
        content,
        [
          ...highlights.map((highlight) => ({ ...highlight, active: highlight.text === highlightText })),
          ...(highlightText && !highlights.some((highlight) => highlight.text === highlightText)
            ? [{ text: highlightText, level: highlightLevel, active: true }]
            : []),
        ],
        highlightLevel
      )
      : editablePageHtmlRef.current[index] ?? toEditableHtml(content ?? ""));
    // Skipped while this page is actively being typed into, same as the
    // highlight/redline overlays above — reassigning innerHTML mid-edit
    // would otherwise fight the user's cursor position.
    const editableHtml = editingPageIndex !== index
      ? applyBlockHtmlOverrides(applyParagraphStyles(baseEditableHtml, paragraphStyles), blockHtmlOverrides)
      : baseEditableHtml;

    if (!rawTextContent && !editableHtml) {
      return <div className="document-viewer__empty">{emptyState}</div>;
    }

    if (!editable || pdfDoc) {
      return <div className="document-viewer__page-text">{rawTextContent}</div>;
    }

    return (
      <div
        ref={(node) => {
          editableRefs.current[index] = node;
          if (node && node.innerHTML !== editableHtml) {
            node.innerHTML = editableHtml;
          }
        }}
        className="document-viewer__page-text document-viewer__page-text--editable"
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setEditingPageIndex(index)}
        onInput={(event) => {
          editablePageHtmlRef.current[index] = event.currentTarget.innerHTML;
          if (event.currentTarget.scrollHeight > event.currentTarget.clientHeight) {
            reflowEditablePages(event.currentTarget);
          }
        }}
        onBlur={(event) => {
          reflowEditablePages(event.currentTarget);
          setEditingPageIndex(null);
        }}
      />
    );
  };

  const renderPdfPage = (pageNumber) => {
    return (
      <PdfPageRenderer
        key={`pdf-page-${pageNumber}`}
        pdfDoc={pdfDoc}
        pageNumber={pageNumber}
        zoom={zoom}
        pageWidth={pageWidth}
        pageHeight={pageHeight}
      />
    );
  };

  const classes = [
    "document-viewer",
    resolvedLiveChanges ? "document-viewer--show-live-changes" : "document-viewer--hide-live-changes",
    className,
  ].filter(Boolean).join(" ");

  if (error) {
    return (
      <div className={classes} style={style}>
        <div
          className="document-viewer__empty"
          style={{
            flex: 1,
            color: "var(--color-content-negative)",
          }}
        >
          Error: {error}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={classes} style={style}>
        <div className="document-viewer__loading">
          <div
            style={{
              width: "var(--document-viewer-spinner-size)",
              height: "var(--document-viewer-spinner-size)",
              borderRadius: "var(--radius-full)",
              border: "var(--document-viewer-spinner-border-width) solid var(--color-content-tertiary)",
              borderTopColor: "var(--color-content-secondary)",
              animation: "spin var(--document-viewer-spinner-animation) infinite",
            }}
          />
          <span>Loading PDF...</span>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  const pagesToRender = pdfDoc
    ? Array.from({ length: totalPages }, (_, i) => i + 1)
    : displayedPages;
  const activePageKey = pdfDoc
    ? `pdf-page-${currentPage}`
    : displayedPages[currentPage - 1]?.id ?? `page-${currentPage}`;

  return (
    <div ref={viewerRef} className={classes} style={style} {...props}>
      {editable && showEditToolbar && (
        <RichTextEditToolbars
          visibleActions={resolvedToolbarActions}
          activeFormats={{ ...activeFormats, ...Object.fromEntries([...activeToolbarActions].map((key) => [key, true])) }}
          disabled={disableEditToolbar}
          onAction={executeToolbarAction}
          rightActions={
            <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-2)" }}>
              <Tooltip content={resolvedLiveChanges ? "Hide changes" : "Show changes"}>
                <Button
                  variant="tertiary"
                  size="md"
                  iconOnly
                  aria-label={resolvedLiveChanges ? "Hide changes" : "Show changes"}
                  aria-pressed={resolvedLiveChanges}
                  isDisabled={disableEditToolbar}
                  iconLeading={resolvedLiveChanges ? <EyeIcon /> : <EyeSlashIcon />}
                  onClick={() => setShowLiveChanges(!resolvedLiveChanges)}
                />
              </Tooltip>
            </div>
          }
          style={{ padding: "var(--spacing-1) var(--spacing-2)" }}
        />
      )}

      <div
        ref={viewportRef}
        className="document-viewer__viewport"
        onScroll={handleScroll}
      >
        {pdfDoc
          ? pagesToRender.map((pageNumber) => {
              const pageKey = `pdf-page-${pageNumber}`;
              return (
                <div
                  key={`page-${pageNumber}`}
                  ref={(node) => {
                    pageRefs.current[pageNumber - 1] = node;
                  }}
                  className="document-viewer__page-shell"
                >
                  <div className="document-viewer__page">
                    {renderPdfPage(pageNumber)}
                  </div>
                  {showPageComments && (
                    <div className="document-viewer__page-comments">
                      <label className="document-viewer__page-comment-label" htmlFor={`document-viewer-comment-${pageNumber}`}>
                        Comment for page {pageNumber}
                      </label>
                      <textarea
                        id={`document-viewer-comment-${pageNumber}`}
                        className="document-viewer__page-comment-input"
                        placeholder="Add comment for this page"
                        value={getPageCommentValue(pageKey)}
                        onChange={(event) => updatePageComment(pageKey, event.target.value)}
                      />
                    </div>
                  )}
                </div>
              );
            })
          : displayedPages.map((page, index) => {
              const pageNumber = index + 1;
              const pageKey = page.id ?? `page-${pageNumber}`;

              return (
                <div
                  key={pageKey}
                  ref={(node) => {
                    pageRefs.current[index] = node;
                  }}
                  className="document-viewer__page-shell"
                >
                  <div
                    className="document-viewer__page"
                    style={{
                      width: pageWidth * zoom,
                      height: pageHeight * zoom,
                    }}
                  >
                    <div
                      className="document-viewer__page-body"
                      style={{
                        padding: pagePadding,
                        height: "100%",
                      }}
                    >
                      {renderPageBody(page, index)}
                    </div>
                  </div>
                  {showPageComments && (
                    <div className="document-viewer__page-comments">
                      <label className="document-viewer__page-comment-label" htmlFor={`document-viewer-comment-${pageNumber}`}>
                        Comment for page {pageNumber}
                      </label>
                      <textarea
                        id={`document-viewer-comment-${pageNumber}`}
                        className="document-viewer__page-comment-input"
                        placeholder="Add comment for this page"
                        value={getPageCommentValue(pageKey)}
                        onChange={(event) => updatePageComment(pageKey, event.target.value)}
                      />
                    </div>
                  )}
                </div>
              );
            })}

        {editable && showCommentPopover && commentAnchorPositions.map((position) => {
          const comment = commentThread.find((item) => item.id === position.id);
          if (!comment) return null;
          return (
            <div
              key={comment.id}
              data-comment-popover-root
              style={{ position: "absolute", top: position.top, left: position.left, zIndex: 3 }}
            >
              <Button variant="tertiary" size="md" iconOnly aria-label="Open comment" iconLeading={<ChatBubbleLeftRightIcon />} onClick={() => setActiveCommentId(comment.id)} />
              <CommentPopover open={activeCommentId === comment.id} onClose={() => setActiveCommentId(null)} comments={commentThread.filter((item) => item.targetText === comment.targetText)} onSubmit={(value) => onCommentSubmit?.(value, comment.targetText)} />
            </div>
          );
        })}
      </div>

      {showToolbar && (
        <div className="document-viewer__toolbar">
          <div className="document-viewer__toolbar-group">
            <Button
              variant="secondary"
              size="sm"
              iconLeading={<Icon name="ChevronLeft" size="sm" />}
              onClick={() => scrollToPage(currentPage - 1)}
              disabled={currentPage <= 1}
              aria-label="Go to previous page"
              style={{ width: 24, padding: 0, justifyContent: "center" }}
            />
            <div className="document-viewer__counter" aria-live="polite">
              <span className="document-viewer__counter-current">{currentPage}</span>
              <span>/</span>
              <span>{totalPages}</span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              iconLeading={<Icon name="ChevronRight" size="sm" />}
              onClick={() => scrollToPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              aria-label="Go to next page"
              style={{ width: 24, padding: 0, justifyContent: "center" }}
            />
          </div>

          <div className="document-viewer__toolbar-divider" />

          <div className="document-viewer__toolbar-group">
            <Button
              variant="secondary"
              size="sm"
              iconLeading={<Icon name="MagnifyingGlassMinus" size="sm" />}
              onClick={() => updateZoom(-1)}
              disabled={zoom <= minZoom}
              aria-label="Zoom out"
              style={{ width: 24, padding: 0, justifyContent: "center" }}
            />
            <Button
              variant="secondary"
              size="sm"
              iconLeading={<Icon name="MagnifyingGlassPlus" size="sm" />}
              onClick={() => updateZoom(1)}
              disabled={zoom >= maxZoom}
              aria-label="Zoom in"
              style={{ width: 24, padding: 0, justifyContent: "center" }}
            />
          </div>
        </div>
      )}

    </div>
  );
};

DocumentViewer.displayName = "DocumentViewer";
DocumentViewer.paginateTextToPages = paginateTextToPages;

// PDF Page Renderer Component
const PdfPageRenderer = React.memo(({ pdfDoc, pageNumber, zoom, pageWidth, pageHeight }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let renderTask = null;
    let cancelled = false;

    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(pageNumber);
        if (cancelled) return;

        const viewport = page.getViewport({ scale: zoom });

        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        renderTask = page.render({
          canvasContext: context,
          viewport,
        });

        await renderTask.promise;
      } catch (err) {
        if (!cancelled) {
          console.error(`Error rendering PDF page ${pageNumber}:`, err);
        }
      }
    };

    renderPage();

    return () => {
      cancelled = true;
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [pdfDoc, pageNumber, zoom]);

  return <canvas ref={canvasRef} className="document-viewer__page-canvas" />;
});

PdfPageRenderer.displayName = "PdfPageRenderer";

export default DocumentViewer;
