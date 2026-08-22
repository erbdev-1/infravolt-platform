import Image from "next/image";
import Link from "next/link";

type InfraVoltLogoProps = Readonly<{
  href: string;
  accessibleLabel: string;
  placement?: "header" | "mobile" | "footer";
  variant?: "primary" | "transparent";
}>;

const LOGO_SOURCES = {
  primary: "/assets/brand/infravolt-wordmark-primary.webp",
  transparent: "/assets/brand/infravolt-wordmark-transparent.webp",
} as const;

export function InfraVoltLogo({
  href,
  accessibleLabel,
  placement = "header",
  variant = "primary",
}: InfraVoltLogoProps) {
  return (
    <Link
      aria-label={accessibleLabel}
      className={`infravolt-logo infravolt-logo--${placement}`}
      href={href}
    >
      <Image
        src={LOGO_SOURCES[variant]}
        alt=""
        aria-hidden="true"
        width={1040}
        height={235}
        priority={placement === "header"}
        unoptimized
      />
    </Link>
  );
}
