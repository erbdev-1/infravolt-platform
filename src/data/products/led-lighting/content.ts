import type { MarketCode } from "@/modules/markets/types";

import type { LedHubContent } from "./types";

/** Real extracted catalogue photos — see public/assets/products/led-lighting.
 * Shared across markets; only copy is localized. */
export const LED_HERO_IMAGE = "/assets/products/led-lighting/hero/led-systems-hero.webp";
export const LED_HERO_IMAGE_ALT = "LEDBUS linear lighting installed in a modern interior space";
export const LED_SUPPORT_CTA_IMAGE = "/assets/products/led-lighting/hero/led-systems-support-cta.webp";
export const LED_SUPPORT_CTA_IMAGE_ALT = "LEDBUS track and pendant lighting in a project application";

const content = {
  uk: {
    metadata: {
      title: "LED Systems | LEDBUS by Gersan | InfraVolt",
      description:
        "LEDBUS LED lighting systems from Gersan — smart, industrial, outdoor and project-based LED product families with full technical data and order codes.",
    },
    breadcrumbs: {
      home: "Home",
      products: "Products",
      current: "LED Systems",
    },
    backToHomeLabel: "Back to home",
    hero: {
      eyebrow: "LEDBUS",
      title: "LED Systems",
      subtitle: "Engineered LED lighting for demanding commercial and industrial projects.",
      description:
        "Ten product categories, from smart automation to hazardous-area lighting — each backed by full technical data and order codes.",
      primaryAction: "Explore LED Product Categories",
      secondaryAction: "Talk to an Engineer",
    },
    valueStrip: {
      heading: "Why LEDBUS LED Systems?",
      items: [
        {
          icon: "portfolio",
          title: "Wide Product Portfolio",
          description: "Ten dedicated product categories covering interior, exterior, industrial and hazardous-area lighting.",
        },
        {
          icon: "data",
          title: "Technical Data & Order Codes",
          description: "Every product family is backed by complete technical documentation and order codes for accurate specification.",
        },
        {
          icon: "applications",
          title: "Project Applications",
          description: "Selected for commercial, industrial and infrastructure projects across the UK and Ukraine.",
        },
        {
          icon: "automation",
          title: "Smart Control & Automation",
          description: "Automation-ready fixtures for modern building management and energy-efficient lighting control.",
        },
      ],
    },
    categoriesHeading: "Explore LED Product Categories",
    categoriesIntroduction:
      "Ten LEDBUS product categories, organised by application. Category and series pages are being brought online — get in touch for current product data.",
    categoryComingSoonLabel: "Coming soon",
    viewCategoryLabel: "View Category",
    categories: [
      {
        slug: "smart-lighting-automation",
        number: "01",
        name: "Smart Lighting & Automation",
        description: "Automation-ready LED fixtures for intelligent, energy-efficient building lighting control.",
        image: "/assets/products/led-lighting/category/smart-lighting&automation/card/smart-lighting-automation-category-card.webp",
        imageAlt: "Smart building control room with lighting-automation dashboards and touch panels",
        href: "/products/led-systems/smart-lighting-automation",
      },
      {
        slug: "industrial-high-bay-lighting",
        number: "02",
        name: "Industrial & High-Bay Lighting",
        description: "High-output LED fixtures engineered for warehouses, production halls and high-ceiling industrial spaces.",
        image: "/assets/products/led-lighting/category/industrial&high-bay/card/industrial-high-bay-lighting-category-card.webp",
        imageAlt: "Warehouse aisle lit by LEDBUS high-bay fixtures, with pallet racking and a forklift",
        href: "/products/led-systems/industrial-high-bay-lighting",
      },
      {
        slug: "parking-waterproof-lighting",
        number: "03",
        name: "Parking & Waterproof Lighting",
        description: "IP-rated LED fixtures built for car parks, stairwells and other exposed or damp environments.",
        image: "/assets/products/led-lighting/category/parking&waterproof/hero/parking-waterproof-lighting-hero-background.webp",
        imageAlt: "Underground car park interior lit by linear LED luminaires along the ceiling",
        href: "/products/led-systems/parking-waterproof-lighting",
      },
      {
        slug: "special-hazardous-environment-lighting",
        number: "04",
        name: "Special & Hazardous Environment Lighting",
        description: "Application-specific LED lighting for hazardous areas, greenhouses, textile inspection and automotive paint control.",
        image: "/assets/products/led-lighting/category/special&hazardous/card/special-hazardous-environment-lighting-category-card.webp",
        imageAlt: "Specialised industrial environment illuminated by protected technical luminaires",
        href: "/products/led-systems/special-hazardous-environment-lighting",
      },
      {
        slug: "outdoor-infrastructure-lighting",
        number: "05",
        name: "Outdoor & Infrastructure Lighting",
        description: "Weatherproof LED fixtures for street, facade, yard and general infrastructure lighting.",
        image: "/assets/products/led-lighting/series/gsl-tunnel-lighting-systems/gsl-tunnel-lighting-systems-hero-background.webp",
        imageAlt: "Floodlit night-time port and heavy-industry infrastructure scene",
        href: "/products/led-systems/outdoor-infrastructure-lighting",
      },
      {
        slug: "linear-trunking-lighting",
        number: "06",
        name: "Linear & Trunking Lighting",
        description: "Continuous-run linear and trunking LED fixtures for offices, retail and architectural interiors.",
        image: "/assets/products/led-lighting/category/linear&trunking/hero/linear-trunking-lighting-hero-background.webp",
        imageAlt: "Contemporary commercial interior illuminated by continuous linear lighting",
        href: "/products/led-systems/linear-trunking-lighting",
      },
      {
        slug: "panel-lighting",
        number: "07",
        name: "Panel Lighting",
        description: "Recessed and surface LED panels for uniform, glare-controlled ceiling illumination.",
        image: "/assets/products/led-lighting/category/panel/hero/panel-lighting-hero-background.webp",
        imageAlt: "Contemporary office and public interior illuminated by recessed LED panels",
        href: "/products/led-systems/panel-lighting",
      },
      {
        slug: "track-downlight",
        number: "08",
        name: "Track & Downlight",
        description: "Adjustable track spotlights and downlights for accent, retail and display lighting.",
        image: "/assets/products/led-lighting/category/track&downlight/hero/track-downlight-hero-background.webp",
        imageAlt: "Premium retail interior illuminated by track spotlights and recessed downlights",
        href: "/products/led-systems/track-downlight",
      },
      {
        slug: "decorative-lighting",
        number: "09",
        name: "Decorative Lighting",
        description: "Design-led LED fixtures for hospitality, retail and feature-lighting applications.",
        image: "/assets/products/led-lighting/category/decorative/card/decorative-lighting-category-card.webp",
        imageAlt: "Decorative ring luminaires in an architectural hospitality interior",
        href: "/products/led-systems/decorative-lighting",
      },
      {
        slug: "emergency-guidance-lighting",
        number: "10",
        name: "Emergency & Guidance Lighting",
        description: "Emergency and guidance LED fixtures for compliant escape-route and safety lighting.",
        image: "/assets/products/led-lighting/category/emergency&guidance/card/emergency-guidance-lighting-category-card.webp",
        imageAlt: "Emergency exit guidance and route lighting in a public-building corridor",
        href: "/products/led-systems/emergency-guidance-lighting",
      },
    ],
    howItWorksHeading: "How the System Works",
    howItWorksIntroduction: "A consistent path from product category to full technical specification, across every LEDBUS family.",
    steps: [
      {
        number: "01",
        title: "Product Categories",
        description: "Start from the application — ten categories covering every project type.",
      },
      {
        number: "02",
        title: "Product Series",
        description: "Each category groups related product series by form factor and output.",
      },
      {
        number: "03",
        title: "Series Detail",
        description: "Series pages present full specifications, variants and finishes.",
      },
      {
        number: "04",
        title: "Order Codes & Technical Data",
        description: "Every variant carries a complete order code and technical datasheet.",
      },
    ],
    bottomCta: {
      eyebrow: "Technical Support",
      title: "Need help selecting the right lighting family?",
      description: "Our engineers can help you specify the correct LEDBUS product family and variant for your project.",
      action: "Talk to an Engineer",
    },
    trustHeading: "Why specifiers choose LEDBUS",
    trustItems: [
      {
        icon: "support",
        title: "Technical Support",
        description: "Direct access to engineers for product selection and specification.",
      },
      {
        icon: "applications",
        title: "Project Applications",
        description: "Proven across commercial, industrial and infrastructure projects.",
      },
      {
        icon: "automation",
        title: "Smart Integration",
        description: "Automation-ready fixtures for modern building management systems.",
      },
      {
        icon: "certified",
        title: "Certified Quality",
        description: "Manufactured to recognised industrial and safety standards.",
      },
    ],
  },
  ua: {
    metadata: {
      title: "Системи LED-освітлення | LEDBUS від Gersan | InfraVolt",
      description:
        "Системи LED-освітлення LEDBUS від Gersan — розумні, промислові, зовнішні та проєктні продуктові категорії з повними технічними даними та кодами замовлення.",
    },
    breadcrumbs: {
      home: "Головна",
      products: "Продукція",
      current: "Системи LED-освітлення",
    },
    backToHomeLabel: "На головну",
    hero: {
      eyebrow: "LEDBUS",
      title: "Системи LED-освітлення",
      subtitle: "Інженерне LED-освітлення для складних комерційних та промислових проєктів.",
      description:
        "Десять продуктових категорій — від розумної автоматизації до освітлення вибухонебезпечних зон, кожна з повними технічними даними та кодами замовлення.",
      primaryAction: "Переглянути категорії LED-продукції",
      secondaryAction: "Звернутися до інженера",
    },
    valueStrip: {
      heading: "Чому LEDBUS?",
      items: [
        {
          icon: "portfolio",
          title: "Широкий продуктовий портфель",
          description: "Десять окремих продуктових категорій для внутрішнього, зовнішнього, промислового та вибухонебезпечного освітлення.",
        },
        {
          icon: "data",
          title: "Технічні дані та коди замовлення",
          description: "Кожна продуктова категорія супроводжується повною технічною документацією та кодами замовлення для точного підбору.",
        },
        {
          icon: "applications",
          title: "Проєктні застосування",
          description: "Обирається для комерційних, промислових та інфраструктурних проєктів у Великій Британії та Україні.",
        },
        {
          icon: "automation",
          title: "Розумне керування та автоматизація",
          description: "Світильники, готові до автоматизації, для сучасних систем керування будівлею та енергоефективного освітлення.",
        },
      ],
    },
    categoriesHeading: "Категорії LED-продукції",
    categoriesIntroduction:
      "Десять продуктових категорій LEDBUS, організованих за застосуванням. Сторінки категорій і серій наразі готуються — зв'яжіться з нами для отримання актуальних даних про продукцію.",
    categoryComingSoonLabel: "Незабаром",
    viewCategoryLabel: "Переглянути категорію",
    categories: [
      {
        slug: "smart-lighting-automation",
        number: "01",
        name: "Розумне освітлення та автоматизація",
        description: "Світильники LED, готові до автоматизації, для інтелектуального та енергоефективного керування освітленням будівлі.",
        image: "/assets/products/led-lighting/category/smart-lighting&automation/card/smart-lighting-automation-category-card.webp",
        imageAlt: "Диспетчерська розумної будівлі з панелями керування та сенсорними панелями автоматизації освітлення",
        href: "/products/led-systems/smart-lighting-automation",
      },
      {
        slug: "industrial-high-bay-lighting",
        number: "02",
        name: "Промислове освітлення та освітлення високих прольотів",
        description: "Потужні світильники LED для складів, виробничих цехів та приміщень з високими стелями.",
        image: "/assets/products/led-lighting/category/industrial&high-bay/card/industrial-high-bay-lighting-category-card.webp",
        imageAlt: "Прохід складу зі стелажами та навантажувачем, освітлений світильниками LEDBUS високих прольотів",
        href: "/products/led-systems/industrial-high-bay-lighting",
      },
      {
        slug: "parking-waterproof-lighting",
        number: "03",
        name: "Освітлення паркінгів та вологозахищене освітлення",
        description: "Світильники LED з захистом IP для паркінгів, сходових клітин та інших відкритих чи вологих зон.",
        image: "/assets/products/led-lighting/category/parking&waterproof/hero/parking-waterproof-lighting-hero-background.webp",
        imageAlt: "Інтер'єр підземного паркінгу, освітлений лінійними LED-світильниками уздовж стелі",
        href: "/products/led-systems/parking-waterproof-lighting",
      },
      {
        slug: "special-hazardous-environment-lighting",
        number: "04",
        name: "Спеціальне освітлення та освітлення вибухонебезпечних зон",
        description: "Спеціалізоване LED-освітлення для небезпечних зон, теплиць, текстильного контролю та контролю автомобільної фарби.",
        image: "/assets/products/led-lighting/category/special&hazardous/card/special-hazardous-environment-lighting-category-card.webp",
        imageAlt: "Спеціалізоване промислове середовище із захищеними технічними світильниками",
        href: "/products/led-systems/special-hazardous-environment-lighting",
      },
      {
        slug: "outdoor-infrastructure-lighting",
        number: "05",
        name: "Зовнішнє та інфраструктурне освітлення",
        description: "Атмосферостійкі світильники LED для вуличного, фасадного, дворового та загального інфраструктурного освітлення.",
        image: "/assets/products/led-lighting/series/gsl-tunnel-lighting-systems/gsl-tunnel-lighting-systems-hero-background.webp",
        imageAlt: "Освітлена вночі сцена порту та об'єктів важкої промислової інфраструктури",
        href: "/products/led-systems/outdoor-infrastructure-lighting",
      },
      {
        slug: "linear-trunking-lighting",
        number: "06",
        name: "Лінійне та шинопровідне освітлення",
        description: "Безперервні лінійні та шинопровідні світильники LED для офісів, торгових приміщень та архітектурних інтер'єрів.",
        image: "/assets/products/led-lighting/category/linear&trunking/hero/linear-trunking-lighting-hero-background.webp",
        imageAlt: "Сучасний комерційний інтер'єр із безперервним лінійним освітленням",
        href: "/products/led-systems/linear-trunking-lighting",
      },
      {
        slug: "panel-lighting",
        number: "07",
        name: "Панельне освітлення",
        description: "Вбудовані та накладні LED-панелі для рівномірного освітлення стелі з контролем засліплення.",
        image: "/assets/products/led-lighting/category/panel/hero/panel-lighting-hero-background.webp",
        imageAlt: "Сучасний офісний і громадський інтер'єр із вбудованими LED-панелями",
        href: "/products/led-systems/panel-lighting",
      },
      {
        slug: "track-downlight",
        number: "08",
        name: "Трекове освітлення та даунлайти",
        description: "Регульовані трекові прожектори та даунлайти для акцентного, торгового та вітринного освітлення.",
        image: "/assets/products/led-lighting/category/track&downlight/hero/track-downlight-hero-background.webp",
        imageAlt: "Преміальний торговий інтер'єр із трековими прожекторами й вбудованими даунлайтами",
        href: "/products/led-systems/track-downlight",
      },
      {
        slug: "decorative-lighting",
        number: "09",
        name: "Декоративне освітлення",
        description: "Дизайнерські світильники LED для готельно-ресторанного бізнесу, торгівлі та акцентного освітлення.",
        image: "/assets/products/led-lighting/category/decorative/card/decorative-lighting-category-card.webp",
        imageAlt: "Декоративні кільцеві світильники в архітектурному готельному інтер’єрі",
        href: "/products/led-systems/decorative-lighting",
      },
      {
        slug: "emergency-guidance-lighting",
        number: "10",
        name: "Аварійне та евакуаційне освітлення",
        description: "Аварійні та евакуаційні світильники LED для нормативного освітлення шляхів евакуації та безпеки.",
        image: "/assets/products/led-lighting/category/emergency&guidance/card/emergency-guidance-lighting-category-card.webp",
        imageAlt: "Аварійне орієнтування й освітлення маршруту в коридорі громадської будівлі",
        href: "/products/led-systems/emergency-guidance-lighting",
      },
    ],
    howItWorksHeading: "Як працює система",
    howItWorksIntroduction: "Послідовний шлях від продуктової категорії до повної технічної специфікації для кожної категорії LEDBUS.",
    steps: [
      {
        number: "01",
        title: "Продуктові категорії",
        description: "Почніть із застосування — десять категорій, що охоплюють кожен тип проєкту.",
      },
      {
        number: "02",
        title: "Продуктові серії",
        description: "Кожна категорія об'єднує споріднені серії продукції за форм-фактором та потужністю.",
      },
      {
        number: "03",
        title: "Деталі серії",
        description: "Сторінки серій містять повні специфікації, варіанти та оздоблення.",
      },
      {
        number: "04",
        title: "Коди замовлення та технічні дані",
        description: "Кожен варіант має повний код замовлення та технічний паспорт.",
      },
    ],
    bottomCta: {
      eyebrow: "Технічна підтримка",
      title: "Потрібна допомога з підбором освітлення?",
      description: "Наші інженери допоможуть підібрати правильну продуктову категорію та варіант LEDBUS для вашого проєкту.",
      action: "Звернутися до інженера",
    },
    trustHeading: "Чому проєктувальники обирають LEDBUS",
    trustItems: [
      {
        icon: "support",
        title: "Технічна підтримка",
        description: "Прямий доступ до інженерів для підбору та специфікації продукції.",
      },
      {
        icon: "applications",
        title: "Проєктні застосування",
        description: "Перевірено на комерційних, промислових та інфраструктурних проєктах.",
      },
      {
        icon: "automation",
        title: "Розумна інтеграція",
        description: "Світильники, готові до автоматизації, для сучасних систем керування будівлею.",
      },
      {
        icon: "certified",
        title: "Сертифікована якість",
        description: "Виготовляється відповідно до визнаних промислових стандартів і стандартів безпеки.",
      },
    ],
  },
} as const satisfies Readonly<Record<MarketCode, LedHubContent>>;

export function ledLightingHubContentForMarket(market: MarketCode): LedHubContent {
  return content[market];
}
