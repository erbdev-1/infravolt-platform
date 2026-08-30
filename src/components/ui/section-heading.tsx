type SectionHeadingProps = Readonly<{
  eyebrow: string;
  title: string;
  introduction?: string;
  align?: "start" | "center";
  headingLevel?: "h1" | "h2";
}>;

export function SectionHeading({
  eyebrow,
  title,
  introduction,
  align = "start",
  headingLevel = "h2",
}: SectionHeadingProps) {
  const Heading = headingLevel;

  return (
    <div className={`section-heading section-heading--${align}`}>
      <p className="eyebrow">{eyebrow}</p>
      <Heading>{title}</Heading>
      {introduction ? (
        <p className="section-heading__introduction">{introduction}</p>
      ) : null}
    </div>
  );
}
