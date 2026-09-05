import type { JsonLdNode } from "@/modules/seo/structured-data";

/** Escapes "<" so a "</script>" sequence can never appear literally inside
 * the serialised JSON, which would otherwise let embedded content break out
 * of the <script> tag early. JSON.stringify already handles quoting/control
 * characters correctly; "<" is the one character it does not need to
 * escape for valid JSON but that is unsafe to emit verbatim inside HTML. */
export function escapeJsonLd(json: string): string {
  return json.replace(/</g, "\\u003c");
}

/** Server-only JSON-LD <script> renderer. No user-supplied HTML ever
 * reaches this component — every caller passes a plain-data node built by
 * modules/seo/structured-data.ts. */
export function JsonLd({ data }: Readonly<{ data: JsonLdNode }>) {
  const json = escapeJsonLd(JSON.stringify(data));

  return (
    <script
      dangerouslySetInnerHTML={{ __html: json }}
      type="application/ld+json"
    />
  );
}
