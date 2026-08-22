"use client";

import { useEffect, useRef } from "react";

import styles from "./application-map-viewer.module.css";

export type ApplicationProductChoice = Readonly<{
  id: string;
  name: string;
  usedHereFor: string;
}>;

type ApplicationProductChooserProps = Readonly<{
  number: number;
  familyName: string;
  chooseProductHeading: string;
  choices: readonly ApplicationProductChoice[];
  closeLabel: string;
  restoreFocusId: string;
  onChoose: (id: string) => void;
  onClose: () => void;
}>;

// Bir zone'da aynı ürün ailesine ait (ör. "Busbar Systems") birden fazla
// somut ürün varsa (GGD + GNL gibi), sol seçiciden tıklanınca doğrudan
// bir ürün paneli açılmaz — önce hangi somut ürünün kastedildiğini
// soran bu hafif seçim listesi açılır. Aynı panel çerçevesini (numara,
// aile adı, kapat düğmesi) ApplicationProductPanel ile paylaşır ki görsel
// dil tutarlı kalsın; yalnız gövdesi ürün detayı yerine seçim listesi
// gösterir.
export function ApplicationProductChooser({
  number,
  familyName,
  chooseProductHeading,
  choices,
  closeLabel,
  restoreFocusId,
  onChoose,
  onClose,
}: ApplicationProductChooserProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus({ preventScroll: true });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (panelRef.current?.contains(target)) {
        return;
      }

      if (target instanceof Element && target.closest("[data-app-map-controls]")) {
        return;
      }

      onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.getElementById(restoreFocusId)?.focus({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number]);

  return (
    <aside
      aria-label={familyName}
      className={styles.panel}
      ref={panelRef}
      role="dialog"
    >
      <div className={styles.panelHeader}>
        <span aria-hidden="true" className={styles.panelNumber}>
          {number}
        </span>
        <h2>{familyName}</h2>

        <button
          aria-label={closeLabel}
          className={styles.panelClose}
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className={styles.panelBody}>
        <div className={styles.panelSection}>
          <h3>{chooseProductHeading}</h3>

          <div className={styles.panelChoiceList}>
            {choices.map((choice) => (
              <button
                className={styles.panelChoiceButton}
                key={choice.id}
                onClick={() => onChoose(choice.id)}
                type="button"
              >
                <span className={styles.panelChoiceName}>{choice.name}</span>
                <span className={styles.panelChoiceDescription}>
                  {choice.usedHereFor}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
