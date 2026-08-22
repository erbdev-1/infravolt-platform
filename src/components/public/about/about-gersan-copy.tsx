"use client";

import { useId, useState } from "react";

import styles from "./about-page.module.css";

type AboutGersanCopyProps = Readonly<{
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
  readMoreLabel: string;
  readLessLabel: string;
}>;

export function AboutGersanCopy({
  eyebrow,
  title,
  paragraphs,
  readMoreLabel,
  readLessLabel,
}: AboutGersanCopyProps) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const [lead, second, ...remaining] = paragraphs;

  return (
    <div className={styles.aboutGersanCopy}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {lead ? <p className={styles.aboutGersanLead}>{lead}</p> : null}
      {second ? <p className={styles.aboutGersanText}>{second}</p> : null}

      {remaining.length > 0 ? (
        <>
          <div
            className={
              expanded
                ? `${styles.aboutGersanExtra} ${styles.aboutGersanExtraOpen}`
                : styles.aboutGersanExtra
            }
            id={panelId}
          >
            <div className={styles.aboutGersanExtraInner}>
              {remaining.map((paragraph) => (
                <p className={styles.aboutGersanText} key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <button
            aria-controls={panelId}
            aria-expanded={expanded}
            className={styles.aboutGersanReadMore}
            onClick={() => setExpanded((value) => !value)}
            type="button"
          >
            {expanded ? readLessLabel : readMoreLabel}
            <span aria-hidden="true">{expanded ? "−" : "+"}</span>
          </button>
        </>
      ) : null}
    </div>
  );
}
