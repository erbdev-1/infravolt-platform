import { publicMediaUrl } from "@/modules/storage/asset-url";
import { buildEnquiryHref } from "@/modules/enquiry/routing";
import type { MarketCode } from "@/modules/markets/types";

import {
  CABLE_SUPPORT_CATALOGUE_PDF_HREF,
  heavyDutyCableTraysGktCeContentForMarket,
  heavyDutyCableTraysH40ContentForMarket,
  heavyDutyCableTraysH50ContentForMarket,
  heavyDutyCableTraysH60ContentForMarket,
  heavyDutyCableTraysH100ContentForMarket,
} from "./content";
import { cableTraysTrunkingSiblingFamilies } from "./cable-trays-trunking-content";
import type { CableVariantFamilyTemplateContent } from "./variant-family-template-types";

const IMAGE_BASE = publicMediaUrl("products/cable-management");
const REQUEST_HREF = buildEnquiryHref("technical-document", {
  system: "cable-management",
  family: "cable-management-heavy-duty-cable-trays",
  source: "/products/cable-support-systems",
});

function t(market: MarketCode, uk: string, ua: string): string {
  return market === "ua" ? ua : uk;
}

// H=100mm and GKT-CE render through the same schedule/accessories layout as
// the rest — see variants/index.ts for the extraction source now backing
// their order-code dataset.
export function heavyDutyCableTraysTemplateContentForMarket(market: MarketCode): CableVariantFamilyTemplateContent {
  return {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: t(market, "Cable Management Systems", "Кабеленесучі системи"), href: "/products/cable-support-systems" },
      {
        label: t(market, "Cable Trays & Trunking", "Кабельні лотки та короби"),
        href: "/products/cable-support-systems/cable-trays-trunking",
      },
      { label: t(market, "Heavy Duty Cable Trays", "Кабельні лотки важкого типу") },
    ],
    eyebrow: t(market, "Cable Management Systems", "Кабеленесучі системи"),
    title: t(market, "Heavy Duty Cable Trays", "Кабельні лотки важкого типу"),
    // Variant-independent by design — the edge height is chosen via the
    // selector below, not implied by the hero copy or image.
    heroDescription: t(
      market,
      "High-load-capacity cable trays engineered for power and control cable installations in industrial, commercial and infrastructure projects. Available in H=40 to H=100 mm edge heights, with a full range of bends, tees, crossings and reducers in the same system.",
      "Кабельні лотки високої несучої здатності, розроблені для монтажу силових та контрольних кабелів на промислових, комерційних та інфраструктурних об'єктах. Доступні у висотах борту H=40 до H=100 мм з повним асортиментом поворотів, трійників, хрестовин та редукцій в одній системі.",
    ),
    heroImage: `${IMAGE_BASE}/cable-trays-trunking/card/heavy-duty-cable-trays-transparent-card.png`,
    heroImageAlt: t(
      market,
      "Gersan heavy duty cable trays in four widths, product photograph",
      "Кабельні лотки Gersan важкого типу чотирьох ширин, фото продукту",
    ),
    heroVisualMode: "frameless",
    requestPackAction: t(market, "Request Technical Pack", "Запросити технічний пакет"),
    requestPackHref: REQUEST_HREF,
    catalogueDocument: {
      label: t(market, "Download PDF Catalogue", "Завантажити PDF-каталог"),
      meta: t(market, "PDF Catalogue", "PDF-каталог"),
      href: CABLE_SUPPORT_CATALOGUE_PDF_HREF,
      accessibleName: t(
        market,
        "Download the Gersan Cable Support Systems PDF catalogue",
        "Завантажити PDF-каталог систем кабельної підтримки Gersan",
      ),
    },
    technicalSnapshot: [
      {
        icon: "shield",
        label: t(market, "Applicable Standards", "Застосовні стандарти"),
        value: ["BS EN 61537", "IEC 61537"],
      },
      {
        icon: "layers",
        label: t(market, "Material & Finish", "Матеріал та покриття"),
        value: [
          t(market, "Hot-Dip Galvanized", "Гаряче цинкування"),
          t(market, "Pregalvanized", "Прегальванізація"),
          "Corten-A",
          t(market, "Aluminium", "Алюміній"),
          t(market, "Stainless Steel", "Нержавіюча сталь"),
        ],
      },
      {
        icon: "system",
        label: t(market, "Key Features", "Основні характеристики"),
        value: [
          t(market, "Perforated & Covered Options", "Перфоровані та закриті варіанти"),
          t(market, "50–600 mm Width Range", "Діапазон ширини 50–600 мм"),
          t(market, "H=40–100 mm Edge Heights", "Висота борту H=40–100 мм"),
          t(market, "Full Accessory Range", "Повний асортимент аксесуарів"),
        ],
      },
      {
        icon: "support",
        label: t(market, "Engineering Support", "Інженерна підтримка"),
        value: [
          t(market, "Load & Support Data", "Дані навантаження та опор"),
          t(market, "Technical Drawings", "Технічні креслення"),
          t(market, "Custom Dimensions", "Індивідуальні розміри"),
          t(market, "Installation Guidance", "Настанови з монтажу"),
        ],
      },
    ],
    tabsHeading: t(market, "Select Product Variant", "Оберіть варіант продукту"),
    tabs: [
      {
        id: "h40",
        tabLabel: "H = 40",
        content: heavyDutyCableTraysH40ContentForMarket(market),
        verifiedData: true,
      },
      {
        id: "h50",
        tabLabel: "H = 50",
        content: heavyDutyCableTraysH50ContentForMarket(market),
        verifiedData: true,
      },
      {
        id: "h60",
        tabLabel: "H = 60",
        content: heavyDutyCableTraysH60ContentForMarket(market),
        verifiedData: true,
      },
      {
        id: "h100",
        tabLabel: "H = 100",
        content: heavyDutyCableTraysH100ContentForMarket(market),
        verifiedData: true,
      },
      {
        id: "gktce",
        tabLabel: "GKT-CE",
        content: heavyDutyCableTraysGktCeContentForMarket(market),
        verifiedData: false,
      },
    ],
    siblingFamiliesHeading: t(market, "Other Cable Tray & Trunking Families", "Інші родини кабельних лотків та коробів"),
    siblingFamilies: cableTraysTrunkingSiblingFamilies(market),
    siblingCardVariant: "icon",
    currentFamilySlug: "heavy-duty-cable-trays",
    supportHeading: t(
      market,
      "Need help selecting the right cable management solution?",
      "Потрібна допомога з підбором кабеленесучого рішення?",
    ),
    supportDescription: t(
      market,
      "Our technical team can support product selection, load requirements, installation coordination and project-specific configurations.",
      "Наша технічна команда допоможе з підбором продукції, вимогами до навантаження, координацією монтажу та індивідуальними конфігураціями проєкту.",
    ),
    supportAction: t(market, "Request Technical Support", "Запросити технічну підтримку"),
    supportHref: REQUEST_HREF,
  };
}
