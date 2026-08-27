import styles from "./led-cta-label.module.css";

// Fixed, known-phrase map — every long CTA string that actually appears
// across the LED hub/category/detail hero+support buttons (verified
// against src/data/products/led-lighting/**), not a generic truncation.
// A label not listed here (already short, e.g. "Talk to an Engineer" /
// "Request Technical Pack") renders identically on every breakpoint.
// Destinations/hrefs/enquiry actions are untouched — this only swaps
// which text node is visible at mobile width.
const SHORT_LABELS: Readonly<Record<string, string>> = {
  "Explore LED Product Categories": "Explore Products",
  "Request Technical Documents": "Technical Documents",
  "Request Technical Data": "Technical Data",
  "Request RFQ / Enquiry": "Request RFQ",
  "Переглянути категорії LED-продукції": "Переглянути категорії",
  "Запросити технічні документи": "Технічні документи",
  "Запросити технічні дані": "Технічні дані",
  "Запросити пропозицію": "Пропозиція",
};

export function LedCtaLabel({ label }: Readonly<{ label: string }>) {
  const short = SHORT_LABELS[label];

  if (!short) {
    return <>{label}</>;
  }

  return (
    <>
      <span className={styles.ctaLabelFull}>{label}</span>
      <span className={styles.ctaLabelShort}>{short}</span>
    </>
  );
}
