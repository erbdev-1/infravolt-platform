import type { MarketCode } from "@/modules/markets/types";

import type { LedCategoryDetailContent } from "./types";

/** Smart Lighting & Automation category page.
 *
 * Hero background/foreground and the hub-page card image are the
 * pre-generated assets already prepared for this category under
 * category/smart-lighting&automation/{hero,card} — a smart-building
 * control-room atmosphere shot (background/card) and a real GERSAN
 * product composite (foreground): the GSL3 C70W smart street luminaire
 * with its integrated 360° camera module and control/receiver unit. */
export const SMART_LIGHTING_HERO_BACKGROUND =
  "/assets/products/led-lighting/category/smart-lighting&automation/hero/smart-lighting-automation-hero-background.webp";
export const SMART_LIGHTING_HERO_BACKGROUND_ALT = "Smart building control room with lighting-automation dashboards and touch panels";
export const SMART_LIGHTING_HERO_FOREGROUND =
  "/assets/products/led-lighting/category/smart-lighting&automation/hero/smart-lighting-automation-hero-foreground-products.webp";
export const SMART_LIGHTING_HERO_FOREGROUND_ALT =
  "GER-LED smart street luminaire with an integrated 360° camera module and control/receiver unit";
export const SMART_LIGHTING_SUPPORT_CTA_IMAGE = SMART_LIGHTING_HERO_BACKGROUND;
export const SMART_LIGHTING_SUPPORT_CTA_IMAGE_ALT = SMART_LIGHTING_HERO_BACKGROUND_ALT;

/** Real GERSAN product photography: a plain-background studio cutaway of
 * the G-BUS busbar receiver module (already used on the standalone
 * /products/g-bus page) for the G-BUS PLC Automation series card, and a
 * dedicated clean studio product shot for the GER-LED Smart Street
 * Lighting series card. */
const SERIES_IMAGE_BASE = "/assets/products/led-lighting/category/smart-lighting&automation/series";
const CARD_IMAGE_BASE = "/assets/products/led-lighting/category/smart-lighting&automation/card";
const APPLICATION_IMAGE_BASE = "/assets/products/led-lighting/category/smart-lighting&automation/applications";

const content = {
  uk: {
    metadata: {
      title: "Smart Lighting & Automation | LED Systems | LEDBUS by Gersan | InfraVolt",
      description:
        "Smart Lighting & Automation — G-BUS PLC automation and GER-LED camera-equipped smart street lighting for intelligent, energy-efficient lighting control.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      ledSystems: "LED Systems",
      current: "Smart Lighting & Automation",
    },
    backToLedSystemsLabel: "Back to LED Systems",
    hero: {
      eyebrow: "LED SYSTEMS",
      title: "Smart Lighting & Automation",
      description:
        "Automation-ready LED lighting and control systems — from powerline-networked busbar automation to camera-equipped smart street luminaires — for intelligent, energy-efficient lighting control.",
      primaryAction: "Request Technical Pack",
      secondaryAction: "Download PDF Catalogue",
    },
    technicalSnapshotHeading: "Technical Information",
    technicalSnapshot: [
      { icon: "power", label: "Power Range", value: "35 – 250 W" },
      { icon: "output", label: "Luminous Output", value: "5,000 – 29,500 lm" },
      { icon: "protection", label: "Protection", value: "IP66" },
      { icon: "control", label: "Control & Comms", value: "PLC Powerline · DALI · Camera" },
    ],
    seriesHeading: "Product Series in This System",
    seriesIntroduction: "Two real catalogue product families covering the Smart Lighting & Automation range.",
    viewSeriesLabel: "View Series",
    seriesComingSoonLabel: "Coming soon",
    series: [
      {
        slug: "g-bus-plc-automation",
        number: "01",
        name: "G-BUS PLC Automation",
        description:
          "Automation and monitoring layer for compatible busbar systems, communicating over the busbar's own power line for switching, dimming and remote monitoring — no separate data cable required.",
        features: [
          { icon: "powerline-comms", label: "Powerline Communication" },
          { icon: "mounting-options", label: "DIN-Rail Modules" },
          { icon: "applications", label: "Switching · Dimming · Monitoring" },
        ],
        image: `${SERIES_IMAGE_BASE}/g-bus-plc-automation-series-product.webp`,
        imageAlt: "G-BUS busbar receiver module, open cutaway view showing the internal control PCB",
        href: "/products/led-systems/smart-lighting-automation/g-bus-plc-automation",
      },
      {
        slug: "ger-led-smart-street-lighting",
        number: "02",
        name: "GER-LED Smart Street Lighting",
        description:
          "GSL street lighting range with an integrated 360° camera under glass, 35–250 W across nine catalogue models (GSL1 C35W to GSL9 C250W), for smart-city and infrastructure lighting networks.",
        features: [
          { icon: "camera", label: "360° Camera Under Glass" },
          { icon: "control", label: "DALI / 1–10 V / SwitchDIM" },
          { icon: "protection", label: "IP66" },
        ],
        image: `${CARD_IMAGE_BASE}/smart-street-lighting-integrated-360-camera-category-card.webp`,
        imageAlt: "GER-LED smart street luminaire with an integrated 360° camera under glass, studio product shot",
        href: "/products/led-systems/smart-lighting-automation/ger-led-smart-street-lighting",
      },
    ],
    applicationsHeading: "Typical Smart Lighting Applications",
    applications: [
      {
        title: "Industrial Facilities",
        description: "Automation-ready lighting and monitoring for production halls, assembly lines and industrial interiors.",
        image: `${APPLICATION_IMAGE_BASE}/industrial-facilities-application.webp`,
        imageAlt: "G-BUS automation deployed above an automotive production line",
      },
      {
        title: "Automated Busbar Distribution",
        description: "Smart lighting and control integration for busbar-based power and lighting distribution systems.",
        image: `${APPLICATION_IMAGE_BASE}/automated-busbar-distribution-application.webp`,
        imageAlt: "Industrial ceiling busbar power distribution track with integrated linear LED lighting",
      },
      {
        title: "Central Lighting Control",
        description: "Centralised lighting management for grouped control, automation and scheduled operation.",
        image: `${APPLICATION_IMAGE_BASE}/central-lighting-control-application.webp`,
        imageAlt: "Wall-mounted central lighting control panel in an office corridor",
      },
      {
        title: "Electrical & Environmental Monitoring",
        description: "Real-time monitoring of electrical values, status and environmental conditions in connected facilities.",
        image: `${APPLICATION_IMAGE_BASE}/smart-lighting-automation-electrical-environmental-monitoring-application.webp`,
        imageAlt: "Industrial plant electrical panel with a monitoring dashboard showing voltage, energy, temperature and humidity",
      },
    ],
    supportCta: {
      eyebrow: "Technical Support",
      title: "Need help selecting the right smart lighting or automation system?",
      description: "Our technical team can help with system selection, network design, controls and project specification.",
      action: "Talk to Our Technical Team",
    },
  },
  ua: {
    metadata: {
      title: "Розумне освітлення та автоматизація | Системи LED-освітлення | LEDBUS від Gersan | InfraVolt",
      description:
        "Розумне освітлення та автоматизація — автоматизація G-BUS PLC та розумне вуличне освітлення GER-LED з камерою для інтелектуального, енергоефективного керування освітленням.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      ledSystems: "Системи LED-освітлення",
      current: "Розумне освітлення та автоматизація",
    },
    backToLedSystemsLabel: "Назад до систем LED-освітлення",
    hero: {
      eyebrow: "СИСТЕМИ LED",
      title: "Розумне освітлення та автоматизація",
      description:
        "Готові до автоматизації системи LED-освітлення та керування — від автоматизації шинопроводу через силову лінію до розумних вуличних світильників із камерою — для інтелектуального, енергоефективного керування освітленням.",
      primaryAction: "Запросити технічний пакет",
      secondaryAction: "Завантажити PDF-каталог",
    },
    technicalSnapshotHeading: "Технічна інформація",
    technicalSnapshot: [
      { icon: "power", label: "Діапазон потужності", value: "35 – 250 Вт" },
      { icon: "output", label: "Світловий потік", value: "5 000 – 29 500 лм" },
      { icon: "protection", label: "Захист", value: "IP66" },
      { icon: "control", label: "Керування та зв'язок", value: "PLC по силовій лінії · DALI · Камера" },
    ],
    seriesHeading: "Продуктові серії в цій системі",
    seriesIntroduction: "Дві реальні каталожні продуктові серії, що охоплюють діапазон розумного освітлення та автоматизації.",
    viewSeriesLabel: "Переглянути серію",
    seriesComingSoonLabel: "Незабаром",
    series: [
      {
        slug: "g-bus-plc-automation",
        number: "01",
        name: "G-BUS PLC Automation",
        description:
          "Рівень автоматизації та моніторингу для сумісних систем шинопроводу, що передає сигнали керування силовою лінією самого шинопроводу для перемикання, димування та віддаленого моніторингу — без окремого кабелю передачі даних.",
        features: [
          { icon: "powerline-comms", label: "Зв'язок по силовій лінії" },
          { icon: "mounting-options", label: "Модулі на DIN-рейку" },
          { icon: "applications", label: "Перемикання · Димування · Моніторинг" },
        ],
        image: `${SERIES_IMAGE_BASE}/g-bus-plc-automation-series-product.webp`,
        imageAlt: "Приймальний модуль шинопроводу G-BUS, розкритий вигляд із внутрішньою платою керування",
        href: "/products/led-systems/smart-lighting-automation/g-bus-plc-automation",
      },
      {
        slug: "ger-led-smart-street-lighting",
        number: "02",
        name: "GER-LED Smart Street Lighting",
        description:
          "Серія вуличного освітлення GSL з інтегрованою камерою 360° під склом, 35–250 Вт у дев'яти каталожних моделях (від GSL1 C35W до GSL9 C250W), для мереж розумного міста та інфраструктурного освітлення.",
        features: [
          { icon: "camera", label: "Камера 360° під склом" },
          { icon: "control", label: "DALI / 1–10 В / SwitchDIM" },
          { icon: "protection", label: "IP66" },
        ],
        image: `${CARD_IMAGE_BASE}/smart-street-lighting-integrated-360-camera-category-card.webp`,
        imageAlt: "Розумний вуличний світильник GER-LED з інтегрованою камерою 360° під склом, студійне фото продукту",
        href: "/products/led-systems/smart-lighting-automation/ger-led-smart-street-lighting",
      },
    ],
    applicationsHeading: "Типові застосування розумного освітлення",
    applications: [
      {
        title: "Промислові об'єкти",
        description: "Готове до автоматизації освітлення та моніторинг для виробничих цехів, складальних ліній і промислових приміщень.",
        image: `${APPLICATION_IMAGE_BASE}/industrial-facilities-application.webp`,
        imageAlt: "Автоматизація G-BUS над виробничою лінією автомобільного заводу",
      },
      {
        title: "Автоматизований розподіл через шинопровід",
        description: "Інтеграція розумного освітлення та керування для систем розподілу живлення й освітлення на базі шинопроводу.",
        image: `${APPLICATION_IMAGE_BASE}/automated-busbar-distribution-application.webp`,
        imageAlt: "Промислова стельова шина розподілу живлення з інтегрованим лінійним LED-освітленням",
      },
      {
        title: "Централізоване керування освітленням",
        description: "Централізоване управління освітленням для групового керування, автоматизації та роботи за розкладом.",
        image: `${APPLICATION_IMAGE_BASE}/central-lighting-control-application.webp`,
        imageAlt: "Настінна панель централізованого керування освітленням в офісному коридорі",
      },
      {
        title: "Електричний та екологічний моніторинг",
        description: "Моніторинг електричних показників, стану та умов довкілля на підключених об'єктах у реальному часі.",
        image: `${APPLICATION_IMAGE_BASE}/smart-lighting-automation-electrical-environmental-monitoring-application.webp`,
        imageAlt: "Електрична панель промислового об'єкта з панеллю моніторингу напруги, енергії, температури та вологості",
      },
    ],
    supportCta: {
      eyebrow: "Технічна підтримка",
      title: "Потрібна допомога з підбором системи розумного освітлення чи автоматизації?",
      description: "Наша технічна команда допоможе з вибором системи, проєктуванням мережі, керуванням та специфікацією проєкту.",
      action: "Звернутися до технічної команди",
    },
  },
} as const satisfies Readonly<Record<MarketCode, LedCategoryDetailContent>>;

export function smartLightingAutomationContentForMarket(market: MarketCode): LedCategoryDetailContent {
  return content[market];
}
