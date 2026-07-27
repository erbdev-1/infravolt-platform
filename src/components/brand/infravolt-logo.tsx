import Image from "next/image";
import Link from "next/link";

type InfraVoltLogoProps = Readonly<{
  href: string;
  accessibleLabel: string;
  placement?: "header" | "mobile" | "footer";
}>;

export function InfraVoltLogo({
  href,
  accessibleLabel,
  placement = "header",
}: InfraVoltLogoProps) {
  return (
    <Link
      aria-label={accessibleLabel}
      className={`infravolt-logo infravolt-logo--${placement}`}
      href={href}
    >
      <Image
        src="/assets/brand/infravolt-wordmark-primary.webp"
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
