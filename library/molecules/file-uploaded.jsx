"use client";

/**
 * FileUploaded Molecule
 *
 * A compact row representing a single uploaded file: a file-type icon,
 * the file name, and a tertiary remove action. Rendered inside
 * FileUploader once files have been selected.
 */

import { Button } from "../atoms/button.jsx";
import { XMarkIcon } from "@heroicons/react/16/solid";
import fileDocIcon from "../atoms/custom-icons/file-doc.svg";
import fileImgIcon from "../atoms/custom-icons/file-img.svg";
import filePdfIcon from "../atoms/custom-icons/file-pdf.svg";
import filePptIcon from "../atoms/custom-icons/file-ppt.svg";
import fileXlsIcon from "../atoms/custom-icons/file-xls.svg";

// ─────────────────────────────────────────────
// FILE TYPE ICON MAPPING
// ─────────────────────────────────────────────

const FILE_TYPE_ICONS = {
  doc: fileDocIcon,
  docx: fileDocIcon,
  txt: fileDocIcon,
  rtf: fileDocIcon,
  png: fileImgIcon,
  jpg: fileImgIcon,
  jpeg: fileImgIcon,
  gif: fileImgIcon,
  svg: fileImgIcon,
  webp: fileImgIcon,
  pdf: filePdfIcon,
  ppt: filePptIcon,
  pptx: filePptIcon,
  xls: fileXlsIcon,
  xlsx: fileXlsIcon,
  csv: fileXlsIcon,
};

const getExtension = (value = "") => {
  const parts = String(value).split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
};

const getFileTypeIcon = (fileName, fileType) => {
  const key = String(fileType || getExtension(fileName)).toLowerCase();
  return FILE_TYPE_ICONS[key] || fileDocIcon;
};

// ─────────────────────────────────────────────
// STYLES (Token-mapped inline styles)
// ─────────────────────────────────────────────

const styles = {
  root: {
    width: "100%",
    boxSizing: "border-box",
    padding: "var(--spacing-4)",
    background: "var(--color-general-white)",
    boxShadow: "var(--shadow-light-down)",
    borderRadius: "var(--radius-sm)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "var(--spacing-4)",
  },

  left: {
    minWidth: 0,
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-2)",
  },

  fileIcon: {
    width: 20,
    height: 20,
    flexShrink: 0,
    objectFit: "contain",
  },

  fileName: {
    margin: 0,
    minWidth: 0,
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
    fontSize: "var(--text-body-lg)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-lg)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  right: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-4)",
  },
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export const FileUploaded = ({
  fileName = "File_name.extension",
  fileType,
  actions,
  showRemove = true,
  onRemove,
  removeAriaLabel = "Remove file",
  style,
  ...props
}) => {
  const icon = getFileTypeIcon(fileName, fileType);

  return (
    <div style={{ ...styles.root, ...style }} {...props}>
      <div style={styles.left}>
        <img src={icon} alt="" style={styles.fileIcon} />
        <p style={styles.fileName}>{fileName}</p>
      </div>

      <div style={styles.right}>
        {actions}
        {showRemove ? (
          <Button
            variant="tertiary"
            size="sm"
            iconOnly
            aria-label={removeAriaLabel}
            iconLeading={<XMarkIcon />}
            onClick={onRemove}
          />
        ) : null}
      </div>
    </div>
  );
};

FileUploaded.displayName = "FileUploaded";

export default FileUploaded;
