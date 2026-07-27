import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: "standard" | "wide" | "reading";
};

export function Container({
  className,
  size = "standard",
  ...props
}: ContainerProps) {
  const classes = ["container", `container--${size}`, className]
    .filter(Boolean)
    .join(" ");

  return <div className={classes} {...props} />;
}
