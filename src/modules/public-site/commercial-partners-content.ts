import type { MarketCode } from "@/modules/markets/types";

type Option = Readonly<{ value: string; label: string }>;

export type CommercialPartnersContent = Readonly<{
  metadata: Readonly<{ title: string; description: string }>;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  hero: Readonly<{
    logoLabel: string;
    eyebrow: string;
    title: string;
    description: string;
    supportingLine: string;
    reviewNote: string;
    benefits: readonly string[];
  }>;
  audience: Readonly<{
    heading: string;
    items: readonly Readonly<{ title: string; description: string }>[];
  }>;
  guide: Readonly<{
    heading: string;
    stepLabel: string;
    viewStepsLabel: string;
    steps: readonly Readonly<{ number: string; title: string }>[];
    reassuranceTitle: string;
    reassuranceBody: string;
  }>;
  sections: Readonly<{
    company: Readonly<{
      number: string;
      title: string;
      description: string;
      companyNameLabel: string;
      websiteLabel: string;
      companyLocationLabel: string;
      companyLocationPlaceholder: string;
      yearsTradingLabel: string;
      yearsTradingHelper: string;
    }>;
    businessProfile: Readonly<{
      number: string;
      title: string;
      description: string;
      businessTypeLabel: string;
      businessTypeHelper: string;
      businessTypeOptions: readonly Option[];
      partnershipInterestLabel: string;
      partnershipInterestHelper: string;
      // Master catalogue — the actual per-applicant subset shown is
      // derived in the form component from businessType (see
      // PARTNERSHIP_INTEREST_GROUPS), never a separate translated list.
      // Never includes InfraVolt's own UK/Ukraine distributor role.
      partnershipInterestOptions: readonly Option[];
      coverageLabel: string;
      coverageHelper: string;
      // Regional, not country-level — market itself comes from the
      // trusted hostname/domain resolver, never asked here.
      coverageOptions: readonly string[];
      industriesLabel: string;
      industriesOptions: readonly string[];
      territoryHeading: string;
      territoryHelper: string;
      territoryTypeLabel: string;
      territoryTypeOptions: readonly Option[];
      requestedRegionsLabel: string;
      requestedRegionsOptions: readonly string[];
      requestedCitiesLabel: string;
      requestedCitiesPlaceholder: string;
    }>;
    productSystems: Readonly<{
      number: string;
      title: string;
      description: string;
      options: readonly string[];
    }>;
    contact: Readonly<{
      number: string;
      title: string;
      description: string;
      fullName: string;
      jobTitle: string;
      workEmail: string;
      phone: string;
    }>;
    commercial: Readonly<{
      number: string;
      title: string;
      description: string;
      requirementsLabel: string;
      requirementsHelper: string;
    }>;
  }>;
  declaration: Readonly<{
    statement: string;
  }>;
  submit: Readonly<{
    sendLabel: string;
    sendingLabel: string;
    errorTitle: string;
    errorBody: string;
    requiredFieldError: string;
    declarationError: string;
    successTitle: string;
    successMessage: string;
    successReferenceLabel: string;
    /** Explicit "submission is not appointment" statement shown on the success screen — see the commercial rule in the declaration. */
    successAppointmentNotice: string;
  }>;
  review: Readonly<{
    eyebrow: string;
    heading: string;
    steps: readonly Readonly<{ number: string; title: string; description: string }>[];
  }>;
  supportStrip: Readonly<{
    title: string;
    description: string;
    action: string;
  }>;
  selectPlaceholder: string;
}>;

const content: Record<MarketCode, CommercialPartnersContent> = {
  uk: {
    metadata: {
      title: "Commercial Partner Application | InfraVolt",
      description:
        "Apply to work with InfraVolt as a dealer, reseller, project partner or commercial partner for electrical infrastructure systems in the United Kingdom.",
    },
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Commercial Partner Application",
    hero: {
      logoLabel: "InfraVolt home",
      eyebrow: "Commercial Partner Application",
      title: "Become an InfraVolt Commercial Partner",
      description:
        "Apply to become a regional or city-level commercial partner for GERSAN electrical infrastructure systems in the United Kingdom.",
      supportingLine:
        "InfraVolt coordinates market-level commercial and technical support. Applications are reviewed based on business profile, regional coverage and product requirements.",
      reviewNote: "Applications are reviewed by our commercial team.",
      benefits: [
        "Regional dealership opportunities",
        "Technical & commercial support",
        "Access to the GERSAN product portfolio",
      ],
    },
    audience: {
      heading: "Who Should Apply",
      items: [
        { title: "Electrical & M&E Contractors", description: "Installers and contractors purchasing for live projects." },
        { title: "Dealers, Resellers & Electrical Wholesalers", description: "Businesses stocking or reselling electrical infrastructure systems." },
        { title: "Consultants & Specifiers", description: "Engineers and specifiers evaluating systems for a project." },
        { title: "Project Buyers / Developers / Facilities", description: "Buyers purchasing on behalf of a development, facility or project." },
      ],
    },
    guide: {
      heading: "Your Application",
      stepLabel: "Step",
      viewStepsLabel: "View application steps",
      steps: [
        { number: "01", title: "Company" },
        { number: "02", title: "Business Profile" },
        { number: "03", title: "Contact" },
        { number: "04", title: "Commercial Requirements" },
      ],
      reassuranceTitle: "Commercial review",
      reassuranceBody:
        "Applications are reviewed manually by the InfraVolt team. Submission does not automatically approve a commercial relationship, pricing agreement or credit facility.",
    },
    sections: {
      company: {
        number: "01",
        title: "Company Information",
        description: "Tell us about the company applying to work with InfraVolt.",
        companyNameLabel: "Company Name",
        websiteLabel: "Company Website",
        companyLocationLabel: "Company Location",
        companyLocationPlaceholder: "City, country",
        yearsTradingLabel: "Years Trading",
        yearsTradingHelper: "Optional — how long has the company been operating?",
      },
      businessProfile: {
        number: "02",
        title: "Business Profile",
        description: "Tell us how your business operates and how you would like to work with InfraVolt.",
        businessTypeLabel: "Business Type",
        businessTypeHelper: "What kind of company are you?",
        businessTypeOptions: [
          { value: "electrical-contractor", label: "Electrical Contractor" },
          { value: "me-contractor", label: "M&E Contractor" },
          { value: "main-epc-contractor", label: "Main / EPC Contractor" },
          { value: "electrical-wholesaler", label: "Electrical Wholesaler" },
          { value: "dealer-reseller", label: "Dealer / Reseller" },
          { value: "consultant-specifier", label: "Consultant / Specifier" },
          { value: "developer", label: "Developer" },
          { value: "facilities-maintenance", label: "Facilities / Maintenance" },
          { value: "other", label: "Other" },
        ],
        partnershipInterestLabel: "Partnership Interest",
        partnershipInterestHelper: "How would you like to work with InfraVolt?",
        partnershipInterestOptions: [
          { value: "authorised-dealer", label: "Authorised Dealer" },
          { value: "reseller-partner", label: "Reseller Partner" },
          { value: "stockist-trade-partner", label: "Stockist / Trade Partner" },
          { value: "project-supply-partner", label: "Project Supply Partner" },
          { value: "contractor-partner", label: "Contractor Partner" },
          { value: "regular-trade-purchasing", label: "Regular Trade Purchasing" },
          { value: "commercial-project-partner", label: "Commercial Project Partner" },
          { value: "specification-technical-partner", label: "Specification & Technical Partner" },
          { value: "commercial-project-collaboration", label: "Commercial Project Collaboration" },
          { value: "product-specification-support", label: "Product / System Specification Support" },
          { value: "technical-specification-support", label: "Technical / Specification Support" },
          { value: "technical-specification-partner", label: "Technical / Specification Partner" },
          { value: "other", label: "Other" },
        ],
        coverageLabel: "Current Sales / Service Coverage",
        coverageHelper: "Where do you currently sell, supply or support projects?",
        coverageOptions: [
          "Nationwide UK",
          "London & South East",
          "East of England",
          "Midlands",
          "North West",
          "North East & Yorkshire",
          "South West",
          "Scotland",
          "Wales",
          "Northern Ireland",
        ],
        industriesLabel: "Primary Industries",
        industriesOptions: [
          "Commercial Buildings",
          "Industrial & Manufacturing",
          "Data Centres",
          "Renewable Energy",
          "Transport & Infrastructure",
          "Other",
        ],
        territoryHeading: "Requested Dealership Territory",
        territoryHelper:
          "Which city, region or sales territory would you like to represent or develop with InfraVolt?",
        territoryTypeLabel: "Territory Scale",
        territoryTypeOptions: [
          { value: "city", label: "City / Local Area" },
          { value: "region", label: "Region" },
          { value: "multi-region", label: "Multi-Region" },
          { value: "nationwide-trade", label: "Nationwide Trade Partner" },
        ],
        requestedRegionsLabel: "Requested Regions",
        requestedRegionsOptions: [
          "London & South East",
          "East of England",
          "Midlands",
          "North West",
          "North East & Yorkshire",
          "South West",
          "Scotland",
          "Wales",
          "Northern Ireland",
        ],
        requestedCitiesLabel: "Requested Cities / Postcode Areas",
        requestedCitiesPlaceholder: "Cambridge, Peterborough, CB, PE...",
      },
      productSystems: {
        number: "02B",
        title: "Product Systems of Interest",
        description: "Select the systems most relevant to your business.",
        options: [
          "Busbar Systems",
          "Cable Management Systems",
          "Underfloor Systems",
          "Earthing & Lightning Protection",
          "LED Systems",
          "EV Charging",
        ],
      },
      contact: {
        number: "03",
        title: "Primary Contact",
        description: "Who should InfraVolt's commercial team contact about this application?",
        fullName: "Full Name",
        jobTitle: "Job Title",
        workEmail: "Work Email",
        phone: "Phone",
      },
      commercial: {
        number: "04",
        title: "Commercial Requirements",
        description: "Tell us anything else relevant to your application.",
        requirementsLabel: "Commercial Requirements / Notes",
        requirementsHelper: "Purchasing scale, timing, existing brands represented, current projects — anything useful for our review.",
      },
    },
    declaration: {
      statement:
        "I confirm that the information provided is accurate. I understand that submitting this application does not constitute appointment as an authorised dealer or commercial partner — any partnership requires review by InfraVolt and written confirmation.",
    },
    submit: {
      sendLabel: "Submit Commercial Partner Application",
      sendingLabel: "Submitting…",
      errorTitle: "We couldn't submit your application.",
      errorBody: "Please try again in a moment, or contact our team directly.",
      requiredFieldError: "This field is required.",
      declarationError: "Please confirm the declaration before submitting.",
      successTitle: "Application Received",
      successMessage: "Your application has been received and will be reviewed by our commercial team.",
      successReferenceLabel: "Reference",
      successAppointmentNotice:
        "This application does not constitute appointment as an authorised dealer, distributor or commercial partner. Any partnership only takes effect after review and written confirmation from InfraVolt.",
    },
    review: {
      eyebrow: "Application Review",
      heading: "What Happens Next?",
      steps: [
        { number: "01", title: "Application Review", description: "Our commercial team reviews your company profile and requirements." },
        { number: "02", title: "Follow-Up", description: "We may contact you for additional commercial or project information." },
        { number: "03", title: "Written Confirmation", description: "Any partnership is confirmed in writing — submission alone is not an appointment." },
      ],
    },
    supportStrip: {
      title: "Have a specific project requirement?",
      description: "Use the existing Contact & Enquiry system for project or product questions.",
      action: "Contact Our Team",
    },
    selectPlaceholder: "Select an option",
  },
  ua: {
    metadata: {
      title: "Заявка комерційного партнера | InfraVolt",
      description:
        "Подайте заявку на співпрацю з InfraVolt як дилер, реселер, проєктний або комерційний партнер для систем електротехнічної інфраструктури в Україні.",
    },
    breadcrumbHome: "Головна",
    breadcrumbCurrent: "Заявка комерційного партнера",
    hero: {
      logoLabel: "Головна сторінка InfraVolt",
      eyebrow: "Заявка комерційного партнера",
      title: "Станьте комерційним партнером InfraVolt",
      description:
        "Подайте заявку, щоб стати регіональним, обласним або міським комерційним партнером систем електротехнічної інфраструктури GERSAN в Україні.",
      supportingLine:
        "InfraVolt координує комерційну та технічну підтримку на рівні ринку. Заявки розглядаються з урахуванням профілю компанії, регіонального покриття та продуктових потреб.",
      reviewNote: "Заявки розглядає наша комерційна команда.",
      benefits: [
        "Можливості регіонального дилерства",
        "Технічна та комерційна підтримка",
        "Доступ до продуктового портфеля GERSAN",
      ],
    },
    audience: {
      heading: "Хто може подати заявку",
      items: [
        { title: "Електротехнічні підрядники та підрядники M&E", description: "Монтажні та підрядні організації, що закуповують для проєктів." },
        { title: "Дилери, реселери та електротехнічні оптовики", description: "Компанії, що зберігають на складі або перепродають системи." },
        { title: "Консультанти та проєктувальники", description: "Інженери та проєктувальники, що оцінюють системи для проєкту." },
        { title: "Проєктні закупівельники / Забудовники / Експлуатація", description: "Покупці, що закуповують для проєкту, об'єкта чи забудови." },
      ],
    },
    guide: {
      heading: "Ваша заявка",
      stepLabel: "Крок",
      viewStepsLabel: "Переглянути етапи заявки",
      steps: [
        { number: "01", title: "Компанія" },
        { number: "02", title: "Профіль бізнесу" },
        { number: "03", title: "Контакти" },
        { number: "04", title: "Комерційні вимоги" },
      ],
      reassuranceTitle: "Комерційний розгляд",
      reassuranceBody:
        "Заявки розглядаються вручну командою InfraVolt. Подання заявки не означає автоматичного схвалення комерційних відносин, цінової угоди чи кредитної лінії.",
    },
    sections: {
      company: {
        number: "01",
        title: "Інформація про компанію",
        description: "Розкажіть нам про компанію, що подає заявку на співпрацю з InfraVolt.",
        companyNameLabel: "Назва компанії",
        websiteLabel: "Веб-сайт компанії",
        companyLocationLabel: "Розташування компанії",
        companyLocationPlaceholder: "Місто, країна",
        yearsTradingLabel: "Років діяльності",
        yearsTradingHelper: "Необов'язково — як довго компанія працює на ринку?",
      },
      businessProfile: {
        number: "02",
        title: "Профіль бізнесу",
        description: "Розкажіть, як працює ваш бізнес і як ви хотіли б співпрацювати з InfraVolt.",
        businessTypeLabel: "Тип бізнесу",
        businessTypeHelper: "Яка у вас компанія?",
        businessTypeOptions: [
          { value: "electrical-contractor", label: "Електротехнічний підрядник" },
          { value: "me-contractor", label: "Підрядник з інженерних систем (M&E)" },
          { value: "main-epc-contractor", label: "Генеральний / EPC підрядник" },
          { value: "electrical-wholesaler", label: "Оптовий постачальник електротехніки" },
          { value: "dealer-reseller", label: "Дилер / Реселер" },
          { value: "consultant-specifier", label: "Консультант / Проєктувальник" },
          { value: "developer", label: "Забудовник" },
          { value: "facilities-maintenance", label: "Експлуатація / Обслуговування" },
          { value: "other", label: "Інше" },
        ],
        partnershipInterestLabel: "Інтерес до партнерства",
        partnershipInterestHelper: "Як би ви хотіли співпрацювати з InfraVolt?",
        partnershipInterestOptions: [
          { value: "authorised-dealer", label: "Авторизований дилер" },
          { value: "reseller-partner", label: "Партнер-реселер" },
          { value: "stockist-trade-partner", label: "Складський / торговий партнер" },
          { value: "project-supply-partner", label: "Партнер з постачання для проєктів" },
          { value: "contractor-partner", label: "Партнер-підрядник" },
          { value: "regular-trade-purchasing", label: "Регулярні торгові закупівлі" },
          { value: "commercial-project-partner", label: "Комерційний проєктний партнер" },
          { value: "specification-technical-partner", label: "Партнер зі специфікації та техпідтримки" },
          { value: "commercial-project-collaboration", label: "Комерційна проєктна співпраця" },
          { value: "product-specification-support", label: "Підтримка підбору продукції / систем" },
          { value: "technical-specification-support", label: "Технічна / проєктувальна підтримка" },
          { value: "technical-specification-partner", label: "Технічний / проєктувальний партнер" },
          { value: "other", label: "Інше" },
        ],
        coverageLabel: "Поточне покриття продажів / сервісу",
        coverageHelper: "Де ви наразі продаєте, постачаєте чи підтримуєте проєкти?",
        coverageOptions: [
          "По всій Україні",
          "Київ та Київська область",
          "Західна Україна",
          "Центральна Україна",
          "Південна Україна",
          "Східна Україна",
        ],
        industriesLabel: "Основні галузі",
        industriesOptions: [
          "Комерційні будівлі",
          "Промисловість і виробництво",
          "Дата-центри",
          "Відновлювана енергетика",
          "Транспорт та інфраструктура",
          "Інше",
        ],
        territoryHeading: "Бажана дилерська територія",
        territoryHelper: "Яке місто, область чи торгову територію ви хотіли б представляти або розвивати з InfraVolt?",
        territoryTypeLabel: "Масштаб території",
        territoryTypeOptions: [
          { value: "city", label: "Місто" },
          { value: "oblast", label: "Область" },
          { value: "multi-oblast", label: "Кілька областей" },
          { value: "nationwide-trade", label: "Національний торговий партнер" },
        ],
        requestedRegionsLabel: "Бажані області",
        requestedRegionsOptions: [
          "Київ та область",
          "Західна Україна",
          "Центральна Україна",
          "Південна Україна",
          "Східна Україна",
        ],
        requestedCitiesLabel: "Бажані міста",
        requestedCitiesPlaceholder: "Львів, Одеса, Харків...",
      },
      productSystems: {
        number: "02B",
        title: "Продуктові системи, що цікавлять",
        description: "Оберіть системи, найбільш релевантні для вашого бізнесу.",
        options: [
          "Шинопровідні системи",
          "Кабельні системи",
          "Підпідлогові системи",
          "Заземлення та блискавкозахист",
          "LED-системи",
          "Заряджання електромобілів",
        ],
      },
      contact: {
        number: "03",
        title: "Основний контакт",
        description: "З ким комерційній команді InfraVolt варто зв'язатися щодо цієї заявки?",
        fullName: "Повне ім'я",
        jobTitle: "Посада",
        workEmail: "Робоча електронна пошта",
        phone: "Телефон",
      },
      commercial: {
        number: "04",
        title: "Комерційні вимоги",
        description: "Розкажіть все інше, що стосується вашої заявки.",
        requirementsLabel: "Комерційні вимоги / Примітки",
        requirementsHelper: "Обсяг закупівель, терміни, наявні представлені бренди, поточні проєкти — усе корисне для розгляду.",
      },
    },
    declaration: {
      statement:
        "Я підтверджую точність наданої інформації. Я розумію, що подання цієї заявки не означає призначення авторизованим дилером або комерційним партнером — будь-яке партнерство вимагає розгляду InfraVolt та письмового підтвердження.",
    },
    submit: {
      sendLabel: "Подати заявку комерційного партнера",
      sendingLabel: "Надсилання…",
      errorTitle: "Не вдалося надіслати вашу заявку.",
      errorBody: "Будь ласка, спробуйте ще раз за хвилину або зв'яжіться з нашою командою напряму.",
      requiredFieldError: "Це поле є обов'язковим.",
      declarationError: "Будь ласка, підтвердіть декларацію перед надсиланням.",
      successTitle: "Заявку отримано",
      successMessage: "Вашу заявку отримано, її розгляне наша комерційна команда.",
      successReferenceLabel: "Номер заявки",
      successAppointmentNotice:
        "Ця заявка не означає призначення авторизованим дилером, дистриб'ютором чи комерційним партнером. Будь-яке партнерство набуває чинності лише після розгляду та письмового підтвердження від InfraVolt.",
    },
    review: {
      eyebrow: "Розгляд заявки",
      heading: "Що далі?",
      steps: [
        { number: "01", title: "Розгляд заявки", description: "Наша комерційна команда розглядає профіль вашої компанії та вимоги." },
        { number: "02", title: "Зворотний зв'язок", description: "Ми можемо звернутися до вас за додатковою комерційною або проєктною інформацією." },
        { number: "03", title: "Письмове підтвердження", description: "Будь-яке партнерство підтверджується письмово — саме подання заявки не є призначенням." },
      ],
    },
    supportStrip: {
      title: "Маєте конкретну потребу проєкту?",
      description: "Скористайтеся системою Контакти та Запити для проєктних чи продуктових питань.",
      action: "Зв'язатися з командою",
    },
    selectPlaceholder: "Оберіть варіант",
  },
};

export function commercialPartnersContentForMarket(market: MarketCode): CommercialPartnersContent {
  return content[market];
}
