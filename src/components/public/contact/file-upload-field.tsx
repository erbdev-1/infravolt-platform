"use client";

import { useId, useRef, useState } from "react";
import type { DragEvent } from "react";

import type { ContactPageContent } from "@/modules/public-site/contact-content";

import styles from "./contact-page.module.css";

const MAX_FILES = 10;
// Combined total across all selected files, not per file — e.g. 5 files x
// 5 MB = 25 MB is allowed; 2 files totaling 30 MB is not. Larger individual
// files are meant to be shared as a download link in the message instead.
const MAX_TOTAL_SIZE_BYTES = 25 * 1024 * 1024;
// Business/engineering document and image formats relevant to a BOQ,
// specification, drawing, schedule or tender attachment — not every file
// type a browser can pick. Checked by extension (not MIME sniffing, which
// browsers report unreliably for CAD formats like DWG/DXF).
const ACCEPTED_EXTENSIONS = [
  ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".csv", ".txt",
  ".jpg", ".jpeg", ".png", ".webp", ".dwg", ".dxf", ".zip",
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileExtension(name: string): string {
  const dotIndex = name.lastIndexOf(".");
  return dotIndex >= 0 ? name.slice(dotIndex).toLowerCase() : "";
}

export function FileUploadField({
  content,
  files,
  onFilesChange,
}: Readonly<{
  content: ContactPageContent;
  files: readonly File[];
  onFilesChange: (files: readonly File[]) => void;
}>) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [rejections, setRejections] = useState<readonly string[]>([]);

  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list);
    const existingKeys = new Set(files.map((file) => `${file.name}:${file.size}`));
    const nextRejections: string[] = [];
    const accepted: File[] = [];
    let runningTotalBytes = files.reduce((total, file) => total + file.size, 0);

    for (const file of incoming) {
      const key = `${file.name}:${file.size}`;
      if (existingKeys.has(key)) {
        nextRejections.push(`${file.name} ${content.fields.uploadDuplicateFile}`);
        continue;
      }
      if (!ACCEPTED_EXTENSIONS.includes(fileExtension(file.name))) {
        nextRejections.push(`${file.name} ${content.fields.uploadFileTypeRejected}`);
        continue;
      }
      if (runningTotalBytes + file.size > MAX_TOTAL_SIZE_BYTES) {
        nextRejections.push(`${file.name} ${content.fields.uploadFileTooLarge}`);
        continue;
      }
      if (files.length + accepted.length >= MAX_FILES) {
        nextRejections.push(content.fields.uploadTooManyFiles);
        break;
      }
      existingKeys.add(key);
      runningTotalBytes += file.size;
      accepted.push(file);
    }

    setRejections(nextRejections);
    if (accepted.length > 0) onFilesChange([...files, ...accepted]);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    addFiles(event.dataTransfer.files);
  }

  function removeFile(index: number) {
    onFilesChange(files.filter((_, fileIndex) => fileIndex !== index));
  }

  return (
    <div className={styles.uploadField}>
      <label className={styles.fieldLabel} htmlFor={inputId}>
        {content.fields.uploadLabel}
      </label>
      <p className={styles.fieldHelper}>{content.fields.uploadHelper}</p>
      <div
        className={styles.uploadDropzone}
        data-dragging={isDragging ? "true" : "false"}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDrop={handleDrop}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M12 3v12m-5-5 5-5 5 5M5 21h14" />
        </svg>
        <p>
          {content.fields.uploadDropHint}{" "}
          <button onClick={() => inputRef.current?.click()} type="button">
            {content.fields.uploadButtonLabel}
          </button>
        </p>
        <input
          accept={ACCEPTED_EXTENSIONS.join(",")}
          hidden
          id={inputId}
          multiple
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
          ref={inputRef}
          type="file"
        />
      </div>
      {rejections.length > 0 ? (
        <ul className={styles.uploadRejections} role="alert">
          {rejections.map((rejection) => (
            <li key={rejection}>{rejection}</li>
          ))}
        </ul>
      ) : null}
      {files.length > 0 ? (
        <ul className={styles.uploadList}>
          {files.map((file, index) => (
            <li key={`${file.name}-${file.size}-${index}`}>
              <span className={styles.uploadFileName}>{file.name}</span>
              <span className={styles.uploadFileSize}>{formatFileSize(file.size)}</span>
              <button
                aria-label={`${content.fields.removeFileLabel}: ${file.name}`}
                onClick={() => removeFile(index)}
                type="button"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
