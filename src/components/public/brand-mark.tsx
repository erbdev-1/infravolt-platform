type BrandMarkProps = Readonly<{
  descriptor: string;
  inverse?: boolean;
}>;

export function BrandMark({
  descriptor,
  inverse = false,
}: BrandMarkProps) {
  return (
    <a
      aria-label="InfraVolt"
      className={`brand-mark${inverse ? " brand-mark--inverse" : ""}`}
      href="#top"
    >
      <span aria-hidden="true" className="brand-mark__symbol">
        <span />
        <span />
        <span />
      </span>
      <span className="brand-mark__copy">
        <strong>InfraVolt</strong>
        <small>{descriptor}</small>
      </span>
    </a>
  );
}
