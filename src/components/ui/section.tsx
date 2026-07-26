import type { ComponentPropsWithoutRef } from "react";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: "white" | "muted" | "navy";
};

export function Section({
  className,
  tone = "white",
  ...props
}: SectionProps) {
  const classes = ["section", `section--${tone}`, className]
    .filter(Boolean)
    .join(" ");

  return <section className={classes} {...props} />;
}
