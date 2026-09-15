"use client";

/**
 * FileUploader Component (Molecule)
 *
 * Dropzone-like file uploader with optional folder illustration.
 * Uses Button and Icon atoms with token-based styles.
 */

import React, { useRef, useState } from "react";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";
import { FileUploaded } from "./file-uploaded.jsx";
import folderIllustration from "../../illustration/Folder.svg";

export const FILE_UPLOADER_STATES = {
  enabled: "enabled",
  hover: "hover",
  active: "active",
};

const styles = {
  root: {
    width: "100%",
    borderRadius: 6,
    boxSizing: "border-box",
    padding: 24,
    display: "inline-flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    transition: "all var(--transition-fast)",
  },

  enabled: {
    background: "var(--color-general-neutral-lighter)",
    outline: "1px solid var(--color-action-outline-secondary-enabled)",
    outlineOffset: "-1px",
  },

  hover: {
    background: "var(--color-general-neutral-lighter)",
    outline: "1px solid var(--color-content-tertiary)",
    outlineOffset: "-1px",
  },

  active: {
    background: "var(--color-general-informative)",
    outline: "1px solid var(--color-content-brand-bold)",
    outlineOffset: "-1px",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 4,
  },

  illustration: {
    width: 80,
    height: 80,
    objectFit: "contain",
    flexShrink: 0,
  },

  title: {
    margin: 0,
    textAlign: "center",
    color: "var(--color-content-primary)",
    fontSize: "var(--text-body-lg)",
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-lg)",
  },

  subtitleRow: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    alignSelf: "stretch",
  },

  subtitle: {
    margin: 0,
    textAlign: "center",
    color: "var(--color-content-secondary)",
    fontSize: "var(--text-body-md)",
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-regular)",
    lineHeight: "var(--line-height-body-md)",
  },

  hiddenInput: {
    display: "none",
  },

  fileList: {
    width: "100%",
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-2)",
  },
};

export const FileUploader = ({
  title = "Drop your file(s) here",
  subtitle = "Min 1Kb, Max 25Mb",
  browseLabel = "Browse files",
  state = FILE_UPLOADER_STATES.enabled,
  showIllustration = true,
  multiple = true,
  accept,
  isDisabled = false,
  files: controlledFiles,
  defaultFiles = [],
  showFileList = true,
  onBrowse,
  onFilesSelected,
  onFilesChange,
  onFileRemoved,
  style,
  ...props
}) => {
  const inputRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [internalFiles, setInternalFiles] = useState(defaultFiles);

  const isFilesControlled = controlledFiles !== undefined;
  const files = isFilesControlled ? controlledFiles : internalFiles;

  const updateFiles = (nextFiles) => {
    if (!isFilesControlled) setInternalFiles(nextFiles);
    onFilesChange?.(nextFiles);
  };

  const addFiles = (newFiles) => {
    const nextFiles = multiple ? [...files, ...newFiles] : newFiles.slice(0, 1);
    updateFiles(nextFiles);
    onFilesSelected?.(newFiles);
  };

  const removeFile = (index) => {
    const removed = files[index];
    updateFiles(files.filter((_, fileIndex) => fileIndex !== index));
    onFileRemoved?.(removed, index);
  };

  const resolvedState = isDragActive
    ? FILE_UPLOADER_STATES.active
    : isHovered
      ? FILE_UPLOADER_STATES.hover
      : state;

  const rootStyle = {
    ...styles.root,
    ...styles[resolvedState],
    ...(isDisabled ? { opacity: 0.65, pointerEvents: "none" } : null),
    ...style,
  };

  const openFileDialog = () => {
    if (isDisabled) return;
    inputRef.current?.click();
    onBrowse?.();
  };

  const handleInputChange = (event) => {
    const selectedFiles = Array.from(event.target?.files || []);
    if (selectedFiles.length > 0) {
      addFiles(selectedFiles);
    }
    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (isDisabled) return;

    setIsDragActive(false);
    const droppedFiles = Array.from(event.dataTransfer?.files || []);
    if (droppedFiles.length > 0) {
      addFiles(droppedFiles);
    }
  };

  return (
    <div
      style={rootStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragActive(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setIsDragActive(false);
      }}
      onDrop={handleDrop}
      {...props}
    >
      <div style={styles.content}>
        {showIllustration ? <img src={folderIllustration} alt="Folder illustration" style={styles.illustration} /> : null}

        <p style={styles.title}>{title}</p>

        <div style={styles.subtitleRow}>
          <p style={styles.subtitle}>{subtitle}</p>
          <Icon name="InformationCircle" size="sm" />
        </div>
      </div>

      <Button variant="secondary" size="md" onClick={openFileDialog} isDisabled={isDisabled}>
        {browseLabel}
      </Button>

      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleInputChange}
        style={styles.hiddenInput}
      />

      {showFileList && files.length > 0 ? (
        <div style={styles.fileList}>
          {files.map((file, index) => (
            <FileUploaded
              key={`${file.name}-${index}`}
              fileName={file.name}
              onRemove={() => removeFile(index)}
              removeAriaLabel={`Remove ${file.name}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

FileUploader.displayName = "FileUploader";
FileUploader.states = FILE_UPLOADER_STATES;

export default FileUploader;
