"use client";

import { useId, useRef, useState } from "react";
import type { DragEvent } from "react";

import type { ContactPageContent } from "@/modules/public-site/contact-content";

import styles from "./contact-page.module.css";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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

  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list);
    const existingKeys = new Set(files.map((file) => `${file.name}:${file.size}`));
    const merged = [...files, ...incoming.filter((file) => !existingKeys.has(`${file.name}:${file.size}`))];
    onFilesChange(merged);
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
          hidden
          id={inputId}
          multiple
          onChange={(event) => addFiles(event.target.files)}
          ref={inputRef}
          type="file"
        />
      </div>
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
