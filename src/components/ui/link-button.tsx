import type { ComponentPropsWithoutRef } from "react";

type LinkButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: "primary" | "secondary" | "accent";
};

export function LinkButton({
  className,
  variant = "primary",
  ...props
}: LinkButtonProps) {
  const classes = ["button-link", `button-link--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return <a className={classes} {...props} />;
}
