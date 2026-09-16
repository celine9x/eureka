"use client";

import React, {
  isValidElement,
  useCallback,
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
      font-family: var(--font-family-primary);
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

    [data-document-highlight="active"] {
      scroll-margin-top: var(--spacing-6);
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

const placeCaretAtEnd = (node) => {
  if (typeof window === "undefined" || typeof document === "undefined" || !node) return;
  const range = document.createRange();
  range.selectNodeContents(node);
  range.collapse(false);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
};

// Resolves a viewport point (captured on mousedown, while the page is still
// showing decorated markup — redline <del>/<ins> or <mark> highlights) into
// an offset within the *plain* text that the page's editable content is
// keyed on. Clicking into a page swaps its decorated markup for plain
// editable text (see the `onMouseDown` handler below), and <del> segments
// disappear in that swap, so a pixel/DOM-node position captured beforehand
// no longer lines up afterward — a text offset that skips <del> content
// does, since it matches how `content` (and `toEditableHtml(content)`)
// don't include deleted text either.
const getPlainTextOffsetAtPoint = (container, x, y) => {
  if (typeof document === "undefined" || !container) return null;

  let range = null;
  if (typeof document.caretRangeFromPoint === "function") {
    range = document.caretRangeFromPoint(x, y);
  } else if (typeof document.caretPositionFromPoint === "function") {
    const position = document.caretPositionFromPoint(x, y);
    if (position) {
      range = document.createRange();
      range.setStart(position.offsetNode, position.offset);
    }
  }

  if (!range || !container.contains(range.startContainer)) return null;

  const isInsideDeletion = (node) => {
    let current = node.nodeType === Node.TEXT_NODE ? node.parentNode : node;
    while (current && current !== container) {
      if (current.nodeName === "DEL") return true;
      current = current.parentNode;
    }
    return false;
  };

  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ALL);
  let plainOffset = 0;
  let node = walker.currentNode;

  while (node) {
    if (node === range.startContainer) {
      if (node.nodeType === Node.TEXT_NODE && !isInsideDeletion(node)) {
        plainOffset += range.startOffset;
      }
      return plainOffset;
    }

    if (node.nodeType === Node.TEXT_NODE && !isInsideDeletion(node)) {
      plainOffset += node.textContent.length;
    } else if (node.nodeName === "BR") {
      plainOffset += 1;
    }

    node = walker.nextNode();
  }

  return plainOffset;
};

// Places the caret `plainOffset` characters into `node`'s plain text,
// treating each <br> as one character — matching how `toEditableHtml` turns
// `\n` into <br>. Falls back to the end of the text when the offset can't be
// resolved (e.g. it's stale after the content changed shape).
const placeCaretAtPlainOffset = (node, plainOffset) => {
  if (typeof document === "undefined" || !node || plainOffset == null) {
    placeCaretAtEnd(node);
    return;
  }

  const walker = document.createTreeWalker(node, NodeFilter.SHOW_ALL);
  let remaining = plainOffset;
  let current = walker.currentNode;
  let target = null;
  let targetOffset = 0;

  while (current) {
    if (current.nodeType === Node.TEXT_NODE) {
      if (remaining <= current.textContent.length) {
        target = current;
        targetOffset = remaining;
        break;
      }
      remaining -= current.textContent.length;
    } else if (current.nodeName === "BR") {
      if (remaining <= 0) {
        target = current;
        targetOffset = 0;
        break;
      }
      remaining -= 1;
    }
    current = walker.nextNode();
  }

  if (!target) {
    placeCaretAtEnd(node);
    return;
  }

  const range = document.createRange();
  if (target.nodeType === Node.TEXT_NODE) {
    range.setStart(target, targetOffset);
  } else {
    range.setStartBefore(target);
  }
  range.collapse(true);

  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
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

const tokenizeForRedline = (value = "") => String(value).match(/\s+|[^\s]+/g) ?? [];

// Matches the whitespace normalization `paginateTextToPages`/
// `paginateTextByMeasurement` apply while splitting into pages (trim each
// paragraph, rejoin on a plain "\n\n"). Diffing raw prop text against
// content that came back out of pagination — which drops "\f" separators
// and collapses "\r\n"/stray whitespace — would otherwise make every page
// look changed from the very first paragraph break, even with zero edits.
const normalizeDocumentWhitespace = (value = "") =>
  String(value)
    .trim()
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .join("\n\n");

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

// Diffs the *whole* document's original text against its whole current text
// (not page-by-page — see `sliceChangeSegmentsByPageLengths` below for why)
// into an ordered list of { type: "equal" | "del" | "ins", text, commentId? }
// segments. Known applied suggestions (`changes`) get their own precise
// del/ins pair (tagged with `commentId` for the comment popover anchor); the
// gaps around them — which cover any freeform typing, whether or not it's
// near an applied suggestion — are diffed the same way a plain edit would
// be. This is the single source of truth for what counts as "changed" for
// the show/hide-changes toggle, regardless of where the change came from.
// Token-level diff of one span of text against another, trimming the common
// prefix/suffix so only the actual differing middle renders as a del/ins
// pair — e.g. a fixed clause number ("4.1 ") that both the original and the
// applied suggestion restate verbatim comes back as a leading "equal"
// segment instead of being redlined away and reinserted.
const diffTextToSegments = (originalText, currentText) => {
  const originalTokens = tokenizeForRedline(originalText);
  const currentTokens = tokenizeForRedline(currentText);
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

  const result = [];
  if (unchangedStart) result.push({ type: "equal", text: unchangedStart });
  if (removed) result.push({ type: "del", text: removed });
  if (added) result.push({ type: "ins", text: added });
  if (unchangedEnd) result.push({ type: "equal", text: unchangedEnd });
  return result;
};

const computeChangeSegments = (originalValue = "", currentValue = "", changes = []) => {
  const originalText = String(originalValue);
  const segments = [];

  // Only anchor on changes whose original clause is still present in the
  // original text, ordered by where they occur, so multiple applied
  // suggestions each get their own precise del/ins pair instead of being
  // swallowed into one wide diff.
  const orderedChanges = changes
    .map((change) => ({ ...change, index: change?.originalText ? originalText.indexOf(change.originalText) : -1 }))
    .filter((change) => change.index >= 0)
    .sort((a, b) => a.index - b.index);

  let originalCursor = 0;
  let remainingCurrent = String(currentValue);

  orderedChanges.forEach((change) => {
    if (change.index < originalCursor) return;

    const proposedText = change.proposedText ?? "";
    const changeIndexInCurrent = proposedText ? remainingCurrent.indexOf(proposedText) : -1;
    if (changeIndexInCurrent < 0) return;

    segments.push(...diffTextToSegments(
      originalText.slice(originalCursor, change.index),
      remainingCurrent.slice(0, changeIndexInCurrent)
    ));

    diffTextToSegments(change.originalText, proposedText).forEach((segment) => {
      segments.push(segment.type === "equal" ? segment : { ...segment, commentId: change.commentId });
    });

    originalCursor = change.index + change.originalText.length;
    remainingCurrent = remainingCurrent.slice(changeIndexInCurrent + proposedText.length);
  });

  segments.push(...diffTextToSegments(originalText.slice(originalCursor), remainingCurrent));

  return segments;
};

const renderChangeSegmentToHtml = (segment, isActive) => {
  const html = escapeHtml(segment.text).replace(/\n/g, "<br>");
  const activeAttr = isActive ? ' data-document-highlight="active"' : "";
  if (segment.type === "del") return `<del${activeAttr}>${html}</del>`;
  if (segment.type === "ins") return `<ins${activeAttr}>${html}</ins>`;
  return html;
};

// Renders a page's change segments (diff + applied-suggestion decoration)
// and finding highlights in one pass, so a page that has both at once — an
// applied change plus another finding still waiting for review — shows
// both instead of one clobbering the other: "equal" text (the only text a
// finding's highlight target can still match) gets highlight-scanned, while
// del/ins segments render as redline decoration. `activeChangeText` marks
// an already-applied change as the active scroll target (mirroring how a
// highlight target becomes "active") since its original clause no longer
// exists as plain text to highlight-scan once it's been redlined away.
const renderChangeSegmentsToHtml = (segments, highlightTargets = [], highlightFallbackLevel, activeChangeText) => {
  let html = "";
  let index = 0;

  while (index < segments.length) {
    const segment = segments[index];
    const next = segments[index + 1];
    const isActiveChange = (segment.type === "del" || segment.type === "ins") && !!activeChangeText && segment.text === activeChangeText;

    // Group an adjacent del+ins pair from the same applied change into one
    // wrapping span whenever they're adjacent (the diff always emits them
    // back to back for a single change, with an "equal" segment separating
    // any two different changes) — not just when a comment was left. The
    // comment-anchor attribute is only added when there's a real shared
    // commentId, but the active scroll marker must go on this wrapper
    // regardless, so scroll-to-highlight anchors at the top of the whole
    // deletion+insertion block instead of just the insertion — otherwise a
    // long struck-through original clause scrolls mostly out of view above
    // a short inserted replacement. (Applying a finding without leaving a
    // comment sets commentId to null, which previously skipped this
    // grouping entirely and silently reintroduced that bug.)
    if (segment.type === "del" && next?.type === "ins") {
      const nextIsActive = !!activeChangeText && next.text === activeChangeText;
      const hasSharedComment = Boolean(segment.commentId) && segment.commentId === next.commentId;
      const anchorAttr = hasSharedComment ? ` data-document-comment-anchor="${segment.commentId}"` : "";
      const pairActiveAttr = (isActiveChange || nextIsActive) ? ' data-document-highlight="active"' : "";
      html += `<span${anchorAttr}${pairActiveAttr}>${renderChangeSegmentToHtml(segment, false)}${renderChangeSegmentToHtml(next, false)}</span>`;
      index += 2;
      continue;
    }

    html += segment.type === "equal" && highlightTargets.length > 0
      ? createHighlightedHtml(segment.text, highlightTargets, highlightFallbackLevel)
      : renderChangeSegmentToHtml(segment, isActiveChange);
    index += 1;
  }

  return html;
};

// Splits one whole-document segment list back out per page, cutting exactly
// at each page's current-text length (with `gapLength` characters discarded
// between pages, matching the separator used to join page contents into the
// single string `computeChangeSegments` diffed against). This is what lets
// the diff be computed once, correctly, against the *whole* document instead
// of comparing each page's content against an independently-paginated slice
// of the original — two pagination passes (one character-count based, one
// real-height-measurement based) rarely land on the same page boundaries,
// which is what used to make a single small edit look like it deleted most
// of a page: the "original" and "current" slices being compared for that
// page simply weren't the same span of the document.
const sliceChangeSegmentsByPageLengths = (segments, pageLengths, gapLength = 1) => {
  const pages = pageLengths.map(() => []);
  const plan = [];
  pageLengths.forEach((length, index) => {
    plan.push({ type: "page", index, length });
    if (index < pageLengths.length - 1) plan.push({ type: "gap", length: gapLength });
  });

  let planIndex = 0;
  let consumedInRegion = 0;

  const currentPageIndex = () => {
    for (let i = planIndex; i >= 0; i -= 1) {
      if (plan[i]?.type === "page") return plan[i].index;
    }
    return 0;
  };

  segments.forEach((segment) => {
    if (segment.type === "del") {
      // Zero-width in the current text — attach it wherever the cursor
      // currently sits so it renders right where the removed text used to
      // be, without advancing past any current-text region.
      pages[currentPageIndex()]?.push(segment);
      return;
    }

    let remainingText = segment.text;
    while (remainingText.length > 0) {
      if (planIndex >= plan.length) {
        pages[pages.length - 1]?.push({ ...segment, text: remainingText });
        break;
      }

      const region = plan[planIndex];
      const spaceLeft = region.length - consumedInRegion;
      const takeLength = Math.min(Math.max(spaceLeft, 0), remainingText.length);
      const takenText = remainingText.slice(0, takeLength);

      if (region.type === "page" && takenText) {
        pages[region.index].push({ ...segment, text: takenText });
      }

      consumedInRegion += takeLength;
      remainingText = remainingText.slice(takeLength);

      if (consumedInRegion >= region.length) {
        planIndex += 1;
        consumedInRegion = 0;
      }
    }
  });

  return pages;
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

// Word-boundary-safe chunking of a single paragraph that is taller than one
// page, using the real rendered height (via `measurementNode`) rather than a
// character-count proxy, so a chunk never gets clipped when it is displayed.
const splitParagraphByMeasurement = (paragraph, measurementNode, maxHeight) => {
  const words = String(paragraph).split(/\s+/).filter(Boolean);
  const chunks = [];
  let currentChunk = "";

  words.forEach((word) => {
    const candidate = currentChunk ? `${currentChunk} ${word}` : word;
    measurementNode.innerHTML = toEditableHtml(candidate);
    if (!currentChunk || measurementNode.scrollHeight <= maxHeight) {
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

// Paragraph-level pagination that measures the real rendered height of each
// candidate page against `maxHeight` (via a hidden clone of the editable
// page, `measurementNode`) instead of estimating from character counts. This
// is what keeps in-progress edits from overflowing/clipping a page: once a
// paragraph no longer fits, it is pushed whole onto the next page, exactly
// like a word processor reflowing text past a page break.
const paginateTextByMeasurement = (text, measurementNode, maxHeight) => {
  const normalizedText = String(text ?? "").trim();

  if (!normalizedText) {
    return [{ id: "page-1", content: "" }];
  }

  const paragraphs = normalizedText
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .flatMap((paragraph) => {
      measurementNode.innerHTML = toEditableHtml(paragraph);
      return measurementNode.scrollHeight > maxHeight
        ? splitParagraphByMeasurement(paragraph, measurementNode, maxHeight)
        : [paragraph];
    });

  const pages = [];
  let currentPage = "";

  paragraphs.forEach((paragraph) => {
    const candidate = currentPage ? `${currentPage}\n\n${paragraph}` : paragraph;
    measurementNode.innerHTML = toEditableHtml(candidate);
    if (!currentPage || measurementNode.scrollHeight <= maxHeight) {
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
  showExportButton = true,
  exportFileName = "document-preview",
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

  // Diff the *whole* document once against its original text, then slice the
  // result back out per page — see `sliceChangeSegmentsByPageLengths` for why
  // this has to happen at the whole-document level rather than by diffing
  // each page against an independently-paginated slice of the original.
  const pageChangeSegmentsByIndex = useMemo(() => {
    if (!editable || pdfDoc) return [];

    const fullOriginalText = normalizeDocumentWhitespace(originalText ?? text);
    // Matches the "\n\n" pagination itself rejoins paragraphs with, so a
    // page break that falls on a natural paragraph boundary (the common
    // case) doesn't introduce its own spurious whitespace diff.
    const pageGap = "\n\n";
    const fullCurrentText = displayedPages.map((page) => String(page?.content ?? "")).join(pageGap);
    const segments = computeChangeSegments(fullOriginalText, fullCurrentText, appliedRedlines);
    const pageLengths = displayedPages.map((page) => String(page?.content ?? "").length);

    return sliceChangeSegmentsByPageLengths(segments, pageLengths, pageGap.length);
  }, [editable, pdfDoc, originalText, text, displayedPages, appliedRedlines]);

  const totalPages = pdfDoc ? pdfDoc.numPages : displayedPages.length || 1;
  const [currentPage, setCurrentPage] = useState(clamp(defaultPage, 1, totalPages));
  const [zoom, setZoom] = useState(clamp(defaultZoom, minZoom, maxZoom));

  const viewportRef = useRef(null);
  const viewerRef = useRef(null);
  const pageRefs = useRef([]);
  const editableRefs = useRef([]);
  const isProgrammaticScrollRef = useRef(false);
  const measurementNodeRef = useRef(null);
  const pendingCaretIndexRef = useRef(null);
  const pendingCaretPointRef = useRef(null);

  const registerEditableRef = useCallback((index, node) => {
    editableRefs.current[index] = node;
  }, []);

  const getMeasurementNode = (referenceNode) => {
    if (typeof document === "undefined" || !referenceNode) return null;

    if (!measurementNodeRef.current) {
      const node = document.createElement("div");
      node.setAttribute("aria-hidden", "true");
      node.style.position = "absolute";
      node.style.top = "0";
      node.style.left = "-99999px";
      node.style.height = "auto";
      node.style.visibility = "hidden";
      node.style.pointerEvents = "none";
      node.style.whiteSpace = "pre-wrap";
      node.style.wordBreak = "break-word";
      node.style.boxSizing = "border-box";
      document.body.appendChild(node);
      measurementNodeRef.current = node;
    }

    const node = measurementNodeRef.current;
    const computedStyle = window.getComputedStyle(referenceNode);
    node.style.width = `${referenceNode.clientWidth}px`;
    node.style.fontFamily = computedStyle.fontFamily;
    node.style.fontSize = computedStyle.fontSize;
    node.style.fontWeight = computedStyle.fontWeight;
    node.style.lineHeight = computedStyle.lineHeight;
    node.style.letterSpacing = computedStyle.letterSpacing;
    return node;
  };

  useEffect(() => {
    return () => {
      measurementNodeRef.current?.remove();
      measurementNodeRef.current = null;
    };
  }, []);

  useEffect(() => {
    editablePageHtmlRef.current = displayedPages.map((page) => toEditableHtml(page.content ?? ""));
  }, [displayedPages]);

  // A blur-triggered reflow (see `onBlur` below) can snapshot the page's
  // *pre*-change content into `editablePages` in the same batch that a
  // controlled `text` update (e.g. applying a redline) lands in — since
  // `displayedPages` prefers a non-null `editablePages` over fresh
  // `normalizedPages`, that stale snapshot would otherwise briefly hide the
  // just-applied change (and the scroll-to-highlight effect below would find
  // no active mark to scroll to). Running this as a layout effect clears the
  // stale snapshot synchronously, before paint, instead of one tick later.
  useLayoutEffect(() => {
    setEditablePages(null);
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

    let frameId;
    let attemptsRemaining = 5;

    const scrollToHighlight = () => {
      const viewport = viewportRef.current;
      const highlight = viewport?.querySelector('[data-document-highlight="active"]');
      // The active mark can briefly be absent for a render or two right
      // after an applied change updates `text` (its decorated markup lands
      // one paint after the underlying pages re-derive) — retry a few
      // frames instead of silently giving up on that transient miss.
      if (viewport && !highlight && attemptsRemaining > 0) {
        attemptsRemaining -= 1;
        frameId = window.requestAnimationFrame(scrollToHighlight);
        return;
      }
      if (!viewport || !highlight) return;

      // scrollIntoView measures the element's actual box at scroll time (via
      // scroll-margin-top for the offset below), so it stays correct
      // regardless of how tall the target block is — unlike a manual
      // getBoundingClientRect + fixed-offset calc, which drifts whenever an
      // applied change's del+ins block is a different height than what was
      // previously on screen.
      highlight.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    frameId = window.requestAnimationFrame(scrollToHighlight);
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

  const handleExportPdf = () => {
    if (typeof document === "undefined" || typeof window === "undefined") return;

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";

    document.body.appendChild(iframe);

    const printWindow = iframe.contentWindow;
    const printDocument = printWindow?.document;

    if (!printWindow || !printDocument) {
      document.body.removeChild(iframe);
      return;
    }

    printDocument.open();
    printDocument.write(`<!doctype html><html><head><title>${exportFileName}</title></head><body></body></html>`);
    printDocument.close();

    const printStyle = printDocument.createElement("style");
    printStyle.textContent = `
      @page {
        margin: 0;
        size: auto;
      }
      body {
        margin: 0;
        padding: var(--spacing-6);
        background: #d9e0ed;
      }
      .document-viewer__page-shell {
        margin: 0 auto var(--spacing-6);
        break-after: page;
      }
      .document-viewer__page-shell:last-child {
        break-after: auto;
      }
    `;
    printDocument.head.appendChild(printStyle);

    pageRefs.current.forEach((pageNode) => {
      if (!pageNode) return;
      printDocument.body.appendChild(pageNode.cloneNode(true));
    });

    printWindow.focus();
    printWindow.print();

    window.setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
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

  const reflowEditablePages = (editedEditor, editedIndex) => {
    if (!editable || pdfDoc) return;

    // Join with blank lines (not `pageSeparator`) so the whole document is
    // re-measured and re-paginated from scratch on every reflow — joining on
    // `pageSeparator` here would make `paginateTextToPages` just split back
    // on the markers this same join re-inserts, which is why overflowing
    // text used to stay stuck/clipped on its original page instead of
    // flowing onto the next one.
    const text = editableRefs.current
      .map((editor, index) => editor?.innerText ?? displayedPages[index]?.content ?? "")
      .join("\n\n");

    const referenceNode = editedEditor || editableRefs.current.find(Boolean);
    const measurementNode = getMeasurementNode(referenceNode);

    const nextPages = measurementNode
      ? paginateTextByMeasurement(text, measurementNode, referenceNode.clientHeight)
      : paginateTextToPages({ text, maxCharactersPerPage: editablePageCapacityRef.current, pageSeparator });

    editablePageHtmlRef.current = nextPages.map((page) => toEditableHtml(page.content ?? ""));

    // If the page being typed into was the last one and it just overflowed
    // into a brand-new page, follow the caret onto that new page — the
    // common case of typing continuously past the bottom of the document.
    const wasLastPage = editedIndex === displayedPages.length - 1;
    if (wasLastPage && nextPages.length > displayedPages.length) {
      pendingCaretIndexRef.current = nextPages.length - 1;
    }

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
    // Diff decoration (from an applied suggestion or freeform typing) and
    // finding highlights render together in one pass — see
    // `renderChangeSegmentsToHtml` — so a page with both an applied change
    // and another finding still awaiting review shows both at once, and the
    // `--show-live-changes`/`--hide-live-changes` root classes are what
    // toggle the del/ins decoration's visibility.
    const editableHtml = editingPageIndex !== index
      ? renderChangeSegmentsToHtml(
        pageChangeSegmentsByIndex[index] ?? [{ type: "equal", text: content }],
        [
          ...highlights.map((highlight) => ({ ...highlight, active: highlight.text === highlightText })),
          ...(highlightText && !highlights.some((highlight) => highlight.text === highlightText)
            ? [{ text: highlightText, level: highlightLevel, active: true }]
            : []),
        ],
        highlightLevel,
        highlightText
      )
      : editablePageHtmlRef.current[index] ?? toEditableHtml(content ?? "");

    if (!rawTextContent && !editableHtml) {
      return <div className="document-viewer__empty">{emptyState}</div>;
    }

    if (!editable || pdfDoc) {
      return <div className="document-viewer__page-text">{rawTextContent}</div>;
    }

    return (
      <EditablePageEditor
        index={index}
        html={editableHtml}
        onRegisterRef={registerEditableRef}
        pendingCaretIndexRef={pendingCaretIndexRef}
        pendingCaretPointRef={pendingCaretPointRef}
        onMouseDown={(event) => {
          // Entering edit mode swaps this page's markup (redline/highlight
          // decoration -> plain editable text), which would otherwise reset
          // the caret to the start. Remember where the click landed (as a
          // plain-text offset, since <del> segments drop out of the swap) so
          // it can be re-resolved against the swapped-in DOM below.
          if (editingPageIndex !== index) {
            pendingCaretPointRef.current = {
              index,
              offset: getPlainTextOffsetAtPoint(event.currentTarget, event.clientX, event.clientY),
            };
          }
        }}
        onFocus={() => setEditingPageIndex(index)}
        onInput={(event) => {
          editablePageHtmlRef.current[index] = event.currentTarget.innerHTML;
          if (event.currentTarget.scrollHeight > event.currentTarget.clientHeight) {
            reflowEditablePages(event.currentTarget, index);
          }
        }}
        onBlur={(event) => {
          reflowEditablePages(event.currentTarget, index);
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
              iconOnly
              iconLeading={<Icon name="ChevronLeft" size="sm" />}
              onClick={() => scrollToPage(currentPage - 1)}
              disabled={currentPage <= 1}
              aria-label="Go to previous page"
            />
            <div className="document-viewer__counter" aria-live="polite">
              <span className="document-viewer__counter-current">{currentPage}</span>
              <span>/</span>
              <span>{totalPages}</span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              iconOnly
              iconLeading={<Icon name="ChevronRight" size="sm" />}
              onClick={() => scrollToPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              aria-label="Go to next page"
            />
          </div>

          <div className="document-viewer__toolbar-divider" />

          <div className="document-viewer__toolbar-group">
            <Button
              variant="secondary"
              size="sm"
              iconOnly
              iconLeading={<Icon name="Minus" size="sm" />}
              onClick={() => updateZoom(-1)}
              disabled={zoom <= minZoom}
              aria-label="Zoom out"
            />
            <Button
              variant="secondary"
              size="sm"
              iconOnly
              iconLeading={<Icon name="Plus" size="sm" />}
              onClick={() => updateZoom(1)}
              disabled={zoom >= maxZoom}
              aria-label="Zoom in"
            />
          </div>
        </div>
      )}

    </div>
  );
};

DocumentViewer.displayName = "DocumentViewer";
DocumentViewer.paginateTextToPages = paginateTextToPages;

// A single editable page's contentEditable surface. Pulled out into its own
// component (rather than an inline ref callback on the div) so the node's
// identity is stable across re-renders and the HTML-sync/caret-restore work
// runs as an effect keyed on the actual `html` value, instead of re-running
// on every parent re-render regardless of whether this page's content
// changed.
const EditablePageEditor = ({
  index,
  html,
  onRegisterRef,
  pendingCaretIndexRef,
  pendingCaretPointRef,
  onMouseDown,
  onFocus,
  onInput,
  onBlur,
}) => {
  const nodeRef = useRef(null);
  const appliedHtmlRef = useRef(null);

  useEffect(() => {
    onRegisterRef(index, nodeRef.current);
    return () => onRegisterRef(index, null);
  }, [index, onRegisterRef]);

  useLayoutEffect(() => {
    const node = nodeRef.current;
    if (!node || html === appliedHtmlRef.current || node.innerHTML === html) {
      appliedHtmlRef.current = html;
      return;
    }
    appliedHtmlRef.current = html;

    const caretPoint = pendingCaretPointRef.current?.index === index ? pendingCaretPointRef.current : null;
    node.innerHTML = html;

    if (pendingCaretIndexRef.current === index) {
      pendingCaretIndexRef.current = null;
      node.focus();
      placeCaretAtEnd(node);
    } else if (caretPoint) {
      pendingCaretPointRef.current = null;
      node.focus();
      placeCaretAtPlainOffset(node, caretPoint.offset);
    }
  }, [html, index, pendingCaretIndexRef, pendingCaretPointRef]);

  return (
    <div
      ref={nodeRef}
      className="document-viewer__page-text document-viewer__page-text--editable"
      contentEditable
      suppressContentEditableWarning
      onMouseDown={onMouseDown}
      onFocus={onFocus}
      onInput={onInput}
      onBlur={onBlur}
    />
  );
};

EditablePageEditor.displayName = "EditablePageEditor";

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
