type SectionHeadingProps = Readonly<{
  eyebrow: string;
  title: string;
  introduction?: string;
  align?: "start" | "center";
}>;

export function SectionHeading({
  eyebrow,
  title,
  introduction,
  align = "start",
}: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {introduction ? (
        <p className="section-heading__introduction">{introduction}</p>
      ) : null}
    </div>
  );
}
