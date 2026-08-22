import { permanentRedirect } from "next/navigation";

const MCRH_CANONICAL_ROUTE =
  "/products/led-systems/track-downlight/mcrh-downlights";

export default function LegacyMcrhMcrksDownlightsPage() {
  permanentRedirect(MCRH_CANONICAL_ROUTE);
}
