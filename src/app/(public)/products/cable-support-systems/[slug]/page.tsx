import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound, permanentRedirect } from "next/navigation";

import { CableFamilyDetailPage } from "@/components/public/products/cable-management/cable-family-detail-page";
import {
  cableLatderCProfileRugContentForMarket,
  gcmcConcaveConvexLadderContentForMarket,
  gmieCableLaddersContentForMarket,
  heavyDutyCableLaddersContentForMarket,
} from "@/data/products/cable-management/cable-ladders-detail-content";
import {
  cProfileSupportSystemsContentForMarket,
  npi80SupportSystemContentForMarket,
  threadedRodsAnchorsFixingsContentForMarket,
  threadedRodTrayCarriersContentForMarket,
  uzlwProfileHangingSystemsContentForMarket,
} from "@/data/products/cable-management/support-hanging-detail-content";
import {
  emtImcRscConduitSystemsContentForMarket,
  pipeClampsContentForMarket,
  socketFuseFixingUnitContentForMarket,
} from "@/data/products/cable-management/conduit-pipe-detail-content";
import {
  aluminiumCableCleatsContentForMarket,
  cableCrochetsContentForMarket,
  cableDrumSupportEquipmentContentForMarket,
  coverCableTrayCoverClampsContentForMarket,
  graniteMountingElementsContentForMarket,
  mechanicalDilatationElementContentForMarket,
  reducersContentForMarket,
  screwSetsThreadedRodsAnchorsContentForMarket,
  separatorEndCapLevelDirectionChangerContentForMarket,
  shaftAccessCoverContentForMarket,
} from "@/data/products/cable-management/accessories-fixings-detail-content";
import { heavyDutyCableTraysH60ContentForMarket } from "@/data/products/cable-management/content";
import type { CableManagementFamilyContent } from "@/data/products/cable-management/types";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import type { MarketCode } from "@/modules/markets/types";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

// Only families with a real, fully-populated content entry are routable —
// see src/data/products/cable-management/content.ts and variants/index.ts.
// Adding a new family: extract its product-data.csv the same way as H60,
// add a market-parameterized *ContentForMarket entry here, and it renders
// through the same template.
const CABLE_MANAGEMENT_FAMILIES: Readonly<Record<string, (market: MarketCode) => CableManagementFamilyContent>> = {
  "heavy-duty-cable-trays-h60": heavyDutyCableTraysH60ContentForMarket,
  "cable-ladder-c-profile-rung": cableLatderCProfileRugContentForMarket,
  "heavy-duty-cable-ladders": heavyDutyCableLaddersContentForMarket,
  "gcmc-concave-convex-ladder": gcmcConcaveConvexLadderContentForMarket,
  "gmie-cable-ladders": gmieCableLaddersContentForMarket,
  "npi-80-support-system": npi80SupportSystemContentForMarket,
  "u-z-l-w-profile-hanging-systems": uzlwProfileHangingSystemsContentForMarket,
  "threaded-rod-tray-carriers": threadedRodTrayCarriersContentForMarket,
  "c-profile-support-systems": cProfileSupportSystemsContentForMarket,
  "threaded-rods-anchors-fixings": threadedRodsAnchorsFixingsContentForMarket,
  "emt-imc-rsc-conduit-systems": emtImcRscConduitSystemsContentForMarket,
  "socket-fuse-fixing-unit": socketFuseFixingUnitContentForMarket,
  "pipe-clamps": pipeClampsContentForMarket,
  "screw-sets-threaded-rods-anchors": screwSetsThreadedRodsAnchorsContentForMarket,
  "cover-cable-tray-cover-clamps": coverCableTrayCoverClampsContentForMarket,
  "reducers": reducersContentForMarket,
  "separator-end-cap-level-direction-changer": separatorEndCapLevelDirectionChangerContentForMarket,
  "aluminium-cable-cleats": aluminiumCableCleatsContentForMarket,
  "cable-crochets": cableCrochetsContentForMarket,
  "granite-mounting-elements": graniteMountingElementsContentForMarket,
  "cable-drum-support-equipment": cableDrumSupportEquipmentContentForMarket,
  "mechanical-dilatation-element": mechanicalDilatationElementContentForMarket,
  "shaft-access-cover": shaftAccessCoverContentForMarket,
};

// Every [slug] family-detail page below replaces the large "Product
// families in this category" grid and the "Technical Resources" section
// with a compact "Other <macro-group> Families" section instead (see
// CableFamilyDetailPage / CableFamilyBody) — keyed by macro group so each
// gets its own heading and only ever lists its own siblings. The legacy
// "heavy-duty-cable-trays-h60" slug (superseded by the variant-tab
// heavy-duty-cable-trays route, see that route's own comment) is
// intentionally absent — it's no longer linked from anywhere, so it keeps
// the original default section set rather than being folded into a
// macro group it doesn't actually navigate within.
const MACRO_GROUP_SIBLING_HEADINGS: Readonly<Record<string, Readonly<{ uk: string; ua: string }>>> = {
  "npi-80-support-system": { uk: "Other Support & Hanging Families", ua: "Інші родини систем опор та підвісу" },
  "u-z-l-w-profile-hanging-systems": { uk: "Other Support & Hanging Families", ua: "Інші родини систем опор та підвісу" },
  "threaded-rod-tray-carriers": { uk: "Other Support & Hanging Families", ua: "Інші родини систем опор та підвісу" },
  "c-profile-support-systems": { uk: "Other Support & Hanging Families", ua: "Інші родини систем опор та підвісу" },
  "threaded-rods-anchors-fixings": { uk: "Other Support & Hanging Families", ua: "Інші родини систем опор та підвісу" },
  "cable-ladder-c-profile-rung": { uk: "Other Cable Ladder Families", ua: "Інші родини кабельних драбин" },
  "heavy-duty-cable-ladders": { uk: "Other Cable Ladder Families", ua: "Інші родини кабельних драбин" },
  "gcmc-concave-convex-ladder": { uk: "Other Cable Ladder Families", ua: "Інші родини кабельних драбин" },
  "gmie-cable-ladders": { uk: "Other Cable Ladder Families", ua: "Інші родини кабельних драбин" },
  "emt-imc-rsc-conduit-systems": { uk: "Other Conduit & Pipe Families", ua: "Інші родини трубних та кабелепровідних систем" },
  "socket-fuse-fixing-unit": { uk: "Other Conduit & Pipe Families", ua: "Інші родини трубних та кабелепровідних систем" },
  "pipe-clamps": { uk: "Other Conduit & Pipe Families", ua: "Інші родини трубних та кабелепровідних систем" },
  "screw-sets-threaded-rods-anchors": { uk: "Other Accessories & Fixings Families", ua: "Інші родини аксесуарів та кріплення" },
  "cover-cable-tray-cover-clamps": { uk: "Other Accessories & Fixings Families", ua: "Інші родини аксесуарів та кріплення" },
  "reducers": { uk: "Other Accessories & Fixings Families", ua: "Інші родини аксесуарів та кріплення" },
  "separator-end-cap-level-direction-changer": { uk: "Other Accessories & Fixings Families", ua: "Інші родини аксесуарів та кріплення" },
  "aluminium-cable-cleats": { uk: "Other Accessories & Fixings Families", ua: "Інші родини аксесуарів та кріплення" },
  "cable-crochets": { uk: "Other Accessories & Fixings Families", ua: "Інші родини аксесуарів та кріплення" },
  "granite-mounting-elements": { uk: "Other Accessories & Fixings Families", ua: "Інші родини аксесуарів та кріплення" },
  "cable-drum-support-equipment": { uk: "Other Accessories & Fixings Families", ua: "Інші родини аксесуарів та кріплення" },
  "mechanical-dilatation-element": { uk: "Other Accessories & Fixings Families", ua: "Інші родини аксесуарів та кріплення" },
  "shaft-access-cover": { uk: "Other Accessories & Fixings Families", ua: "Інші родини аксесуарів та кріплення" },
};

// Superseded by the variant-tab heavy-duty-cable-trays route (see the
// CABLE_MANAGEMENT_FAMILIES comment above) — the slug stays in the map so
// the URL still resolves, but every request now permanently redirects to
// the canonical route instead of rendering the legacy content page.
const LEGACY_HEAVY_DUTY_H60_SLUG = "heavy-duty-cable-trays-h60";
const HEAVY_DUTY_H60_REDIRECT_TARGET = "/products/cable-support-systems/heavy-duty-cable-trays";

type RouteParams = Readonly<{ slug: string }>;
type RouteSearchParams = Readonly<{ group?: string }>;

export function generateStaticParams(): RouteParams[] {
  // Excluded from static prerendering: a permanentRedirect() thrown during
  // static generation bakes a client-side meta-refresh into the prebuilt
  // HTML instead of a real HTTP redirect. Leaving this one slug dynamic
  // (dynamicParams defaults to true) lets the redirect below fire at
  // request time as a genuine 308.
  return Object.keys(CABLE_MANAGEMENT_FAMILIES)
    .filter((slug) => slug !== LEGACY_HEAVY_DUTY_H60_SLUG)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<RouteParams>;
}>): Promise<Metadata> {
  const { slug } = await params;
  const contentForMarket = CABLE_MANAGEMENT_FAMILIES[slug];

  if (!contentForMarket) {
    return {};
  }

  const marketContext = resolveTrustedMarketContext(await headers());
  const content = contentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: `/products/cable-support-systems/${slug}`,
    title: `${content.title} ${titleQualifierForTitleTag(content.titleQualifier)} | InfraVolt`,
    description: content.description,
  });
}

// Most `titleQualifier` values are bare (e.g. "H = 70–200 mm") and need
// wrapping here, but the "(N Items)" / "(Made to Order)"-style qualifiers
// used by several accessory/component families already carry their own
// parentheses — wrapping those unconditionally produced a visible
// "((220 Items))" double-wrap in the rendered title. This keeps a
// pre-wrapped qualifier as-is and only adds parentheses when they're
// genuinely missing, so every existing qualifier (including the empty
// string used by GMIE Type Cable Ladders) renders exactly as before.
export function titleQualifierForTitleTag(titleQualifier: string): string {
  const trimmed = titleQualifier.trim();
  return trimmed.startsWith("(") && trimmed.endsWith(")") ? trimmed : `(${trimmed})`;
}

export default async function CableManagementFamilyPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<RouteParams>;
  searchParams: Promise<RouteSearchParams>;
}>) {
  const { slug } = await params;

  if (slug === LEGACY_HEAVY_DUTY_H60_SLUG) {
    permanentRedirect(HEAVY_DUTY_H60_REDIRECT_TARGET);
  }

  const contentForMarket = CABLE_MANAGEMENT_FAMILIES[slug];

  if (!contentForMarket) {
    notFound();
  }

  const { group } = await searchParams;
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = contentForMarket(marketContext.market);

  const siblingHeading = MACRO_GROUP_SIBLING_HEADINGS[slug];
  const hasSiblingSection = Boolean(siblingHeading);
  // The "icon" sibling-card style (see CableFamilyBody's siblingCardVariant)
  // is the standard across Cable Management — every macro group's sibling
  // section uses it, with the full family list (current family included and
  // highlighted, not filtered out).
  const siblingFamilies = hasSiblingSection ? content.relatedFamilies : undefined;
  const siblingFamiliesHeading = siblingHeading
    ? marketContext.market === "ua"
      ? siblingHeading.ua
      : siblingHeading.uk
    : undefined;
  const siblingCardVariant = hasSiblingSection ? "icon" : undefined;

  // Every family in this route now has a verified transparent hero render,
  // so the hero always renders frameless (transparent PNG directly on the
  // gradient background) instead of the boxed white card, which would
  // otherwise just reproduce a white background behind the transparency.
  const heroVisualMode = "frameless";

  return (
    <CableFamilyDetailPage
      content={content}
      heroVisualMode={heroVisualMode}
      hideRelatedFamilies={hasSiblingSection}
      hideResources={hasSiblingSection}
      initialAccessoryGroupSlug={group}
      market={marketContext.market}
      siblingCardVariant={siblingCardVariant}
      siblingFamilies={siblingFamilies}
      siblingFamiliesHeading={siblingFamiliesHeading}
    />
  );
}
