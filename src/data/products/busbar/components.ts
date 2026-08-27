import { publicMediaUrl } from "@/modules/storage/asset-url";

import { buildEnquiryHref } from "@/modules/enquiry/routing";

import type { BusbarComponentGroup } from "./types";

const SOURCE_ROUTE = "/products/busbar-systems";

function componentEnquiryHref(family: string): string {
  return buildEnquiryHref("technical", { system: "busbar", family, source: SOURCE_ROUTE });
}

export const BUSBAR_COMPONENT_GROUPS: readonly BusbarComponentGroup[] = [
  {
    slug: "tap-off-units",
    name: "Tap-off Units",
    description: "Power take-off options for compatible Gersan busbar systems.",
    image:
      publicMediaUrl("products/busbar/components/gs-plug-in-tap-off-box-mccb.webp"),
    imageAlt: "Gersan plug-in tap-off unit",
    href: componentEnquiryHref("tap-off-units"),
  },
  {
    slug: "feed-units",
    name: "Feed Units",
    description:
      "Feed and centre-feed arrangements for compatible system layouts.",
    image: publicMediaUrl("products/busbar/components/gs-feed-unit-right.webp"),
    imageAlt: "Gersan busbar feed unit",
    href: componentEnquiryHref("feed-units"),
  },
  {
    slug: "elbows-offsets",
    name: "Elbows & Offsets",
    description:
      "Horizontal and vertical components for changing the busbar route.",
    image: publicMediaUrl("products/busbar/components/gs-horizontal-elbow-right.webp"),
    imageAlt: "Gersan horizontal busbar elbow",
    href: componentEnquiryHref("elbows-offsets"),
  },
  {
    slug: "expansion-units",
    name: "Expansion Units",
    description: "Mechanical, horizontal and vertical expansion components.",
    image:
      publicMediaUrl("products/busbar/components/gs-horizontal-expansion-element.webp"),
    imageAlt: "Gersan horizontal busbar expansion unit",
    href: componentEnquiryHref("expansion-units"),
  },
  {
    slug: "transformer-panel-connections",
    name: "Transformer & Panel Connections",
    description:
      "Connection components for transformer and switchboard interfaces.",
    image:
      publicMediaUrl("products/busbar/components/gs-panel-transformer-horizontal-elbow-rr.webp"),
    imageAlt: "Gersan transformer and panel connection component",
    href: componentEnquiryHref("transformer-panel-connections"),
  },
  {
    slug: "supports-installation-accessories",
    name: "Supports & Installation Accessories",
    description:
      "Fixing hangers, vertical supports and installation accessories.",
    image: publicMediaUrl("products/busbar/components/gs-vertical-support-frame.webp"),
    imageAlt: "Gersan vertical busbar support frame",
    href: componentEnquiryHref("supports-installation-accessories"),
  },
];
