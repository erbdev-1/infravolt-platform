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
      legalDetailsHeading: string;
      addressHeading: string;
      operationalHeading: string;
      legalName: string;
      tradingName: string;
      registrationNumber: string;
      registrationHelper: string;
      vatNumber: string;
      vatHelper: string;
      registeredAddress: string;
      tradingAddress: string;
      website: string;
      yearEstablished: string;
      turnoverLabel: string;
      turnoverOptions: readonly Option[];
      employeeLabel: string;
      branchCountLabel: string;
      warehouseCapabilityLabel: string;
      warehouseCapabilityOptions: readonly Option[];
      salesTeamSizeLabel: string;
      technicalTeamCapabilityLabel: string;
      technicalTeamCapabilityOptions: readonly Option[];
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
      partnershipInterestOptions: readonly Option[];
      coverageLabel: string;
      coverageHelper: string;
      // Regional, not country-level — market itself comes from the
      // trusted hostname/domain resolver, never asked here.
      coverageOptions: readonly string[];
      mainAreasLabel: string;
      mainAreasPlaceholder: string;
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
      accountsEmail: string;
    }>;
    commercial: Readonly<{
      number: string;
      title: string;
      description: string;
      spendLabel: string;
      spendHelper: string;
      spendOptions: readonly Option[];
      startLabel: string;
      startHelper: string;
      startOptions: readonly Option[];
      patternLabel: string;
      patternHelper: string;
      patternOptions: readonly Option[];
      dealerPatternOptions: readonly Option[];
      contractorPatternOptions: readonly Option[];
      consultantPatternOptions: readonly Option[];
      // Dealer / wholesaler / reseller branch
      dealerHeading: string;
      dealerDescription: string;
      existingBrandsLabel: string;
      existingBrandsHelper: string;
      holdsStockLabel: string;
      holdsStockOptions: readonly Option[];
      salesChannelsLabel: string;
      salesChannelsOptions: readonly string[];
      customerBaseLabel: string;
      customerBaseOptions: readonly string[];
      // Contractor / project partner branch
      contractorProjectLabel: string;
      projectStatusOptions: readonly Option[];
      projectName: string;
      projectLocation: string;
      projectStageLabel: string;
      projectStageOptions: readonly Option[];
      requiredDate: string;
      projectRequirement: string;
      // Consultant / specifier branch
      consultantRoleLabel: string;
      consultantRoleOptions: readonly Option[];
      consultantProjectLabel: string;
    }>;
    supporting: Readonly<{
      number: string;
      title: string;
      description: string;
      documentTypes: readonly string[];
      additionalInformation: string;
    }>;
  }>;
  declaration: Readonly<{
    statement: string;
  }>;
  submit: Readonly<{
    sendLabel: string;
    sendingLabel: string;
    resetLabel: string;
    errorTitle: string;
    errorBody: string;
    requiredFieldError: string;
    declarationError: string;
    successMessage: string;
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
  yes: string;
  no: string;
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
        "InfraVolt coordinates market-level commercial and technical support. Applications are reviewed based on business profile, regional coverage, product requirements and expected activity.",
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
        { number: "05", title: "Supporting Information" },
      ],
      reassuranceTitle: "Commercial review",
      reassuranceBody:
        "Applications are reviewed manually by the InfraVolt team. Submission does not automatically approve a commercial relationship, pricing agreement or credit facility.",
    },
    sections: {
      company: {
        number: "01",
        title: "Company Information",
        description: "Tell us about the legal entity applying to work with InfraVolt.",
        legalDetailsHeading: "Legal Details",
        addressHeading: "Address & Trading Locations",
        operationalHeading: "Operational Scale",
        legalName: "Company Legal Name",
        tradingName: "Trading Name",
        registrationNumber: "Company Registration Number",
        registrationHelper: "Companies House registration number",
        vatNumber: "VAT / Tax Registration Number",
        vatHelper: "VAT Registration Number",
        registeredAddress: "Registered Address",
        tradingAddress: "Trading / Delivery Address",
        website: "Company Website",
        yearEstablished: "Year Established",
        turnoverLabel: "Annual Electrical / Infrastructure Turnover",
        turnoverOptions: [
          { value: "under-500k", label: "Under £500k" },
          { value: "500k-1m", label: "£500k–£1m" },
          { value: "1m-5m", label: "£1m–£5m" },
          { value: "5m-10m", label: "£5m–£10m" },
          { value: "10m-plus", label: "£10m+" },
          { value: "discuss", label: "Prefer to discuss" },
        ],
        employeeLabel: "Number of Employees",
        branchCountLabel: "Number of Branches / Sales Locations",
        warehouseCapabilityLabel: "Warehouse / Stockholding Capability",
        warehouseCapabilityOptions: [
          { value: "own", label: "Own Warehouse" },
          { value: "third-party", label: "Shared / Third-Party Warehouse" },
          { value: "none", label: "No Current Stockholding" },
          { value: "discuss", label: "To Be Discussed" },
        ],
        salesTeamSizeLabel: "Sales Team Size",
        technicalTeamCapabilityLabel: "Technical Team Capability",
        technicalTeamCapabilityOptions: [
          { value: "in-house", label: "In-house technical team" },
          { value: "external", label: "External technical support" },
          { value: "sales-focused", label: "Sales-focused operation" },
          { value: "mixed", label: "Mixed technical & sales team" },
        ],
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
        mainAreasLabel: "Main Cities / Areas Served",
        mainAreasPlaceholder: "London, Cambridge, Birmingham...",
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
          "Which region, city or sales territory would you like to represent or develop with InfraVolt?",
        territoryTypeLabel: "Territory Type",
        territoryTypeOptions: [
          { value: "regional", label: "Regional" },
          { value: "city-local", label: "City / Local Area" },
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
        phone: "Direct Phone",
        accountsEmail: "Purchasing / Accounts Email",
      },
      commercial: {
        number: "04",
        title: "Commercial Requirements",
        description: "Help us understand the scale and timing of your requirement.",
        spendLabel: "Expected Annual Purchasing with InfraVolt",
        spendHelper: "Your estimated annual purchasing potential with InfraVolt.",
        spendOptions: [
          { value: "under-25k", label: "Under £25k" },
          { value: "25k-100k", label: "£25k–£100k" },
          { value: "100k-250k", label: "£100k–£250k" },
          { value: "250k-500k", label: "£250k–£500k" },
          { value: "500k-plus", label: "£500k+" },
          { value: "project-dependent", label: "Project dependent" },
          { value: "not-yet-known", label: "Not yet known" },
          { value: "not-applicable-specification", label: "Not applicable / specification role" },
        ],
        startLabel: "Expected Start / First Purchase",
        startHelper: "When do you expect to begin purchasing or working with InfraVolt?",
        startOptions: [
          { value: "immediately", label: "Immediately" },
          { value: "within-1-month", label: "Within 1 month" },
          { value: "1-3-months", label: "1–3 months" },
          { value: "3-6-months", label: "3–6 months" },
          { value: "6-12-months", label: "6–12 months" },
          { value: "exploring", label: "Exploring future opportunities" },
        ],
        patternLabel: "Purchasing Pattern",
        patternHelper: "How do you expect to purchase or work with InfraVolt?",
        patternOptions: [
          { value: "regular-stock", label: "Regular stock / replenishment" },
          { value: "project-based", label: "Project-based purchasing" },
          { value: "monthly", label: "Monthly purchasing" },
          { value: "quarterly", label: "Quarterly purchasing" },
          { value: "framework", label: "Framework / ongoing supply" },
          { value: "mixed", label: "Mixed stock and project purchasing" },
          { value: "specification-collaboration", label: "Specification / project collaboration" },
          { value: "not-yet-known", label: "Not yet known" },
        ],
        dealerPatternOptions: [
          { value: "regular-stock", label: "Regular Stock / Replenishment" },
          { value: "monthly", label: "Monthly Purchasing" },
          { value: "quarterly", label: "Quarterly Purchasing" },
          { value: "framework", label: "Framework / Ongoing Supply" },
          { value: "mixed", label: "Mixed Stock & Project Purchasing" },
          { value: "project-based", label: "Project-Based Purchasing" },
        ],
        contractorPatternOptions: [
          { value: "project-based", label: "Project-Based Purchasing" },
          { value: "multiple-projects", label: "Multiple / Ongoing Projects" },
          { value: "framework", label: "Framework / Ongoing Supply" },
          { value: "regular-trade", label: "Regular Trade Purchasing" },
          { value: "not-yet-known", label: "Not Yet Known" },
        ],
        consultantPatternOptions: [
          { value: "specification-collaboration", label: "Specification / Project Collaboration" },
          { value: "technical-evaluation", label: "Technical Product Evaluation" },
          { value: "ongoing-specification", label: "Ongoing Specification Support" },
          { value: "not-applicable", label: "Not Applicable" },
        ],
        dealerHeading: "Stock & Trade Profile",
        dealerDescription: "A few additional questions for dealer, reseller and wholesaler applicants.",
        existingBrandsLabel: "Existing Brands Represented",
        existingBrandsHelper: "Which electrical manufacturers or brands do you currently represent?",
        holdsStockLabel: "Do you plan to hold InfraVolt / GERSAN stock?",
        holdsStockOptions: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "initially-project-based", label: "Initially project-based" },
          { value: "to-be-discussed", label: "To be discussed" },
        ],
        salesChannelsLabel: "Sales Channels",
        salesChannelsOptions: [
          "Trade Counter / Branch",
          "Direct Project Sales",
          "Online / Ecommerce",
          "Contractor Network",
          "Specifier / Consultant Network",
        ],
        customerBaseLabel: "Existing Customer Base",
        customerBaseOptions: [
          "Electrical Contractors",
          "M&E Contractors",
          "Developers",
          "Industrial End Users",
          "Electrical Wholesalers",
          "Consultants / Specifiers",
          "Facilities / Maintenance",
        ],
        contractorProjectLabel: "Do you have a current or upcoming project?",
        projectStatusOptions: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          { value: "multiple", label: "Multiple / ongoing projects" },
        ],
        projectName: "Project Name",
        projectLocation: "Project Location",
        projectStageLabel: "Project Stage",
        projectStageOptions: [
          { value: "design", label: "Design" },
          { value: "tender", label: "Tender" },
          { value: "procurement", label: "Procurement" },
          { value: "construction", label: "Construction" },
        ],
        requiredDate: "Expected Requirement / Order Date",
        projectRequirement: "Short Project Requirement",
        consultantRoleLabel: "Commercial / Project Role",
        consultantRoleOptions: [
          { value: "active-specification", label: "Active specification project" },
          { value: "ongoing-support", label: "Ongoing specification support" },
          { value: "technical-evaluation", label: "Technical product evaluation" },
          { value: "future-collaboration", label: "Future project collaboration" },
        ],
        consultantProjectLabel: "Do you have a current specification / design project?",
      },
      supporting: {
        number: "05",
        title: "Supporting Information",
        description: "Tell us what supporting information is available; our team can request documents securely during review.",
        documentTypes: [
          "Company Profile",
          "Trade References",
          "Certifications",
          "Branch / Warehouse Information",
          "Other Supporting Document",
        ],
        additionalInformation: "Additional Information",
      },
    },
    declaration: {
      statement:
        "I confirm that the information provided is accurate and understand that submission of this application does not constitute appointment as an authorised dealer or commercial partner.",
    },
    submit: {
      sendLabel: "Submit Commercial Partner Application",
      sendingLabel: "Submitting…",
      resetLabel: "Reset Form",
      errorTitle: "We couldn't submit your application.",
      errorBody: "Please try again in a moment, or contact our team directly.",
      requiredFieldError: "This field is required.",
      declarationError: "Please confirm the declaration before submitting.",
      successMessage: "Your application has been received and will be reviewed by our commercial team.",
    },
    review: {
      eyebrow: "Application Review",
      heading: "What Happens Next?",
      steps: [
        { number: "01", title: "Application Review", description: "Our commercial team reviews your company profile and requirements." },
        { number: "02", title: "Follow-Up", description: "We may contact you for additional commercial or project information." },
        { number: "03", title: "Next Steps", description: "Your application has been received and will be reviewed by our commercial team." },
      ],
    },
    supportStrip: {
      title: "Have a specific project requirement?",
      description: "Use the existing Contact & Enquiry system for project or product questions.",
      action: "Contact Our Team",
    },
    selectPlaceholder: "Select an option",
    yes: "Yes",
    no: "No",
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
        "InfraVolt координує комерційну та технічну підтримку на рівні ринку. Заявки розглядаються з урахуванням профілю компанії, регіонального покриття, продуктових потреб та очікуваної активності.",
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
        { number: "05", title: "Додаткова інформація" },
      ],
      reassuranceTitle: "Комерційний розгляд",
      reassuranceBody:
        "Заявки розглядаються вручну командою InfraVolt. Подання заявки не означає автоматичного схвалення комерційних відносин, цінової угоди чи кредитної лінії.",
    },
    sections: {
      company: {
        number: "01",
        title: "Інформація про компанію",
        description: "Розкажіть нам про юридичну особу, що подає заявку на співпрацю з InfraVolt.",
        legalDetailsHeading: "Юридичні дані",
        addressHeading: "Адреси та місця діяльності",
        operationalHeading: "Операційний масштаб",
        legalName: "Юридична назва компанії",
        tradingName: "Торгова назва",
        registrationNumber: "Реєстраційний номер компанії",
        registrationHelper: "Код ЄДРПОУ / реєстраційний ідентифікатор компанії",
        vatNumber: "Податковий номер / номер платника ПДВ",
        vatHelper: "Номер платника ПДВ",
        registeredAddress: "Юридична адреса",
        tradingAddress: "Адреса діяльності / доставки",
        website: "Веб-сайт компанії",
        yearEstablished: "Рік заснування",
        turnoverLabel: "Річний оборот у сфері електротехніки / інфраструктури",
        turnoverOptions: [
          { value: "under-20m-uah", label: "До ₴20 млн" },
          { value: "20m-50m-uah", label: "₴20–50 млн" },
          { value: "50m-200m-uah", label: "₴50–200 млн" },
          { value: "200m-400m-uah", label: "₴200–400 млн" },
          { value: "400m-plus-uah", label: "₴400 млн+" },
          { value: "discuss", label: "Обговорити окремо" },
        ],
        employeeLabel: "Кількість співробітників",
        branchCountLabel: "Кількість філій / точок продажу",
        warehouseCapabilityLabel: "Складські можливості",
        warehouseCapabilityOptions: [
          { value: "own", label: "Власний склад" },
          { value: "third-party", label: "Спільний / сторонній склад" },
          { value: "none", label: "Наразі без складу" },
          { value: "discuss", label: "Потребує обговорення" },
        ],
        salesTeamSizeLabel: "Розмір команди продажів",
        technicalTeamCapabilityLabel: "Можливості технічної команди",
        technicalTeamCapabilityOptions: [
          { value: "in-house", label: "Власна технічна команда" },
          { value: "external", label: "Зовнішня технічна підтримка" },
          { value: "sales-focused", label: "Фокус на продажах" },
          { value: "mixed", label: "Змішана технічна та комерційна команда" },
        ],
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
        partnershipInterestLabel: "Формат партнерства",
        partnershipInterestHelper: "Як ви хотіли б співпрацювати з InfraVolt?",
        partnershipInterestOptions: [
          { value: "authorised-dealer", label: "Авторизований дилер" },
          { value: "reseller-partner", label: "Партнер-реселер" },
          { value: "stockist-trade-partner", label: "Складський / торговий партнер" },
          { value: "project-supply-partner", label: "Партнер з постачання для проєктів" },
          { value: "contractor-partner", label: "Партнер-підрядник" },
          { value: "regular-trade-purchasing", label: "Регулярні торгові закупівлі" },
          { value: "commercial-project-partner", label: "Комерційний проєктний партнер" },
          { value: "specification-technical-partner", label: "Партнер із проєктування та технічної підтримки" },
          { value: "commercial-project-collaboration", label: "Комерційна проєктна співпраця" },
          { value: "product-specification-support", label: "Підтримка підбору продукції / систем" },
          { value: "technical-specification-support", label: "Технічна / проєктна підтримка" },
          { value: "technical-specification-partner", label: "Технічний / проєктний партнер" },
          { value: "other", label: "Інше" },
        ],
        coverageLabel: "Поточне покриття продажів / обслуговування",
        coverageHelper: "Де ви зараз продаєте, постачаєте або підтримуєте проєкти?",
        coverageOptions: [
          "По всій Україні",
          "Київ та Київська область",
          "Західна Україна",
          "Центральна Україна",
          "Південна Україна",
          "Східна Україна",
          "Інший регіон",
        ],
        mainAreasLabel: "Основні міста / області обслуговування",
        mainAreasPlaceholder: "Київ, Львів, Одеса...",
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
        territoryHelper:
          "Яку область, місто або територію продажів ви хотіли б представляти чи розвивати разом з InfraVolt?",
        territoryTypeLabel: "Тип території",
        territoryTypeOptions: [
          { value: "oblast", label: "Область" },
          { value: "city", label: "Місто" },
          { value: "multi-oblast", label: "Кілька областей" },
          { value: "nationwide-trade", label: "Національний торговий партнер" },
        ],
        requestedRegionsLabel: "Бажані області",
        requestedRegionsOptions: [
          "Київ та Київська область",
          "Західна Україна",
          "Центральна Україна",
          "Південна Україна",
          "Східна Україна",
          "Інша область",
        ],
        requestedCitiesLabel: "Бажане місто / міста",
        requestedCitiesPlaceholder: "Київ, Львів, Одеса...",
      },
      productSystems: {
        number: "02Б",
        title: "Продуктові системи, що цікавлять",
        description: "Оберіть системи, найбільш релевантні для вашого бізнесу.",
        options: [
          "Шинопровідні системи",
          "Системи кабельних трас",
          "Підпідлогові системи",
          "Заземлення та блискавкозахист",
          "LED-системи",
          "Зарядка електромобілів",
        ],
      },
      contact: {
        number: "03",
        title: "Основний контакт",
        description: "З ким комерційна команда InfraVolt повинна зв'язатися щодо цієї заявки?",
        fullName: "Повне ім'я",
        jobTitle: "Посада",
        workEmail: "Робоча електронна пошта",
        phone: "Прямий телефон",
        accountsEmail: "Email для закупівель / бухгалтерії",
      },
      commercial: {
        number: "04",
        title: "Комерційні вимоги",
        description: "Допоможіть нам зрозуміти масштаб і терміни вашої потреби.",
        spendLabel: "Очікувані річні закупівлі в InfraVolt",
        spendHelper: "Ваш орієнтовний річний обсяг закупівель в InfraVolt.",
        spendOptions: [
          { value: "under-1m-uah", label: "До ₴1 млн" },
          { value: "1m-4m-uah", label: "₴1–4 млн" },
          { value: "4m-10m-uah", label: "₴4–10 млн" },
          { value: "10m-20m-uah", label: "₴10–20 млн" },
          { value: "20m-plus-uah", label: "₴20 млн+" },
          { value: "project-dependent", label: "Залежить від проєкту" },
          { value: "not-yet-known", label: "Поки що невідомо" },
          { value: "not-applicable-specification", label: "Не застосовується / проєктна роль" },
        ],
        startLabel: "Очікуваний початок / перша закупівля",
        startHelper: "Коли ви плануєте почати закупівлі або співпрацю з InfraVolt?",
        startOptions: [
          { value: "immediately", label: "Негайно" },
          { value: "within-1-month", label: "Протягом 1 місяця" },
          { value: "1-3-months", label: "1–3 місяці" },
          { value: "3-6-months", label: "3–6 місяців" },
          { value: "6-12-months", label: "6–12 місяців" },
          { value: "exploring", label: "Розглядаємо майбутні можливості" },
        ],
        patternLabel: "Модель закупівель",
        patternHelper: "Як ви плануєте закуповувати або співпрацювати з InfraVolt?",
        patternOptions: [
          { value: "regular-stock", label: "Регулярне поповнення складу" },
          { value: "project-based", label: "Закупівлі під проєкт" },
          { value: "monthly", label: "Щомісячні закупівлі" },
          { value: "quarterly", label: "Щоквартальні закупівлі" },
          { value: "framework", label: "Рамкова / постійна угода" },
          { value: "mixed", label: "Змішані складські та проєктні закупівлі" },
          { value: "specification-collaboration", label: "Проєктування / проєктна співпраця" },
          { value: "not-yet-known", label: "Поки що невідомо" },
        ],
        dealerPatternOptions: [
          { value: "regular-stock", label: "Регулярне поповнення складу" },
          { value: "monthly", label: "Щомісячні закупівлі" },
          { value: "quarterly", label: "Щоквартальні закупівлі" },
          { value: "framework", label: "Рамкове / постійне постачання" },
          { value: "mixed", label: "Змішані складські та проєктні закупівлі" },
          { value: "project-based", label: "Закупівлі під проєкт" },
        ],
        contractorPatternOptions: [
          { value: "project-based", label: "Закупівлі під проєкт" },
          { value: "multiple-projects", label: "Декілька / постійні проєкти" },
          { value: "framework", label: "Рамкове / постійне постачання" },
          { value: "regular-trade", label: "Регулярні торгові закупівлі" },
          { value: "not-yet-known", label: "Поки що невідомо" },
        ],
        consultantPatternOptions: [
          { value: "specification-collaboration", label: "Проєктування / проєктна співпраця" },
          { value: "technical-evaluation", label: "Технічна оцінка продукції" },
          { value: "ongoing-specification", label: "Постійна проєктна підтримка" },
          { value: "not-applicable", label: "Не застосовується" },
        ],
        dealerHeading: "Складський і торговий профіль",
        dealerDescription: "Кілька додаткових питань для дилерів, реселерів та оптовиків.",
        existingBrandsLabel: "Представлені бренди",
        existingBrandsHelper: "Яких виробників або електротехнічні бренди ви зараз представляєте?",
        holdsStockLabel: "Чи плануєте ви тримати склад продукції InfraVolt / GERSAN?",
        holdsStockOptions: [
          { value: "yes", label: "Так" },
          { value: "no", label: "Ні" },
          { value: "initially-project-based", label: "Спочатку під проєкт" },
          { value: "to-be-discussed", label: "Потребує обговорення" },
        ],
        salesChannelsLabel: "Канали продажів",
        salesChannelsOptions: [
          "Торгова точка / філія",
          "Прямі проєктні продажі",
          "Онлайн / електронна комерція",
          "Мережа підрядників",
          "Мережа проєктувальників / консультантів",
        ],
        customerBaseLabel: "Наявна клієнтська база",
        customerBaseOptions: [
          "Електротехнічні підрядники",
          "Підрядники M&E",
          "Забудовники",
          "Промислові кінцеві споживачі",
          "Оптові постачальники електротехніки",
          "Консультанти / проєктувальники",
          "Експлуатація / обслуговування",
        ],
        contractorProjectLabel: "Чи маєте ви поточний або майбутній проєкт?",
        projectStatusOptions: [
          { value: "yes", label: "Так" },
          { value: "no", label: "Ні" },
          { value: "multiple", label: "Декілька / постійні проєкти" },
        ],
        projectName: "Назва проєкту",
        projectLocation: "Розташування проєкту",
        projectStageLabel: "Стадія проєкту",
        projectStageOptions: [
          { value: "design", label: "Проєктування" },
          { value: "tender", label: "Тендер" },
          { value: "procurement", label: "Закупівля" },
          { value: "construction", label: "Будівництво" },
        ],
        requiredDate: "Очікувана дата потреби / замовлення",
        projectRequirement: "Короткий опис потреби проєкту",
        consultantRoleLabel: "Комерційна / проєктна роль",
        consultantRoleOptions: [
          { value: "active-specification", label: "Активний проєкт проєктування" },
          { value: "ongoing-support", label: "Постійна проєктна підтримка" },
          { value: "technical-evaluation", label: "Технічна оцінка продукції" },
          { value: "future-collaboration", label: "Майбутня проєктна співпраця" },
        ],
        consultantProjectLabel: "Чи маєте ви поточний проєкт проєктування / дизайну?",
      },
      supporting: {
        number: "05",
        title: "Додаткова інформація",
        description: "Повідомте, які матеріали доступні; наша команда зможе безпечно запросити документи під час розгляду.",
        documentTypes: [
          "Профіль компанії",
          "Торгові рекомендації",
          "Сертифікати",
          "Інформація про філії / склад",
          "Інший супровідний документ",
        ],
        additionalInformation: "Додаткова інформація",
      },
    },
    declaration: {
      statement:
        "Я підтверджую точність наданої інформації та розумію, що подання цієї заявки не означає призначення авторизованим дилером або комерційним партнером.",
    },
    submit: {
      sendLabel: "Подати заявку комерційного партнера",
      sendingLabel: "Надсилання…",
      resetLabel: "Скинути форму",
      errorTitle: "Не вдалося подати вашу заявку.",
      errorBody: "Спробуйте ще раз через хвилину або зв'яжіться з нашою командою напряму.",
      requiredFieldError: "Це поле є обов'язковим.",
      declarationError: "Будь ласка, підтвердіть декларацію перед поданням.",
      successMessage: "Вашу заявку отримано, і її розгляне наша комерційна команда.",
    },
    review: {
      eyebrow: "Розгляд заявки",
      heading: "Що далі?",
      steps: [
        { number: "01", title: "Розгляд заявки", description: "Наша комерційна команда розглядає профіль вашої компанії та вимоги." },
        { number: "02", title: "Зворотний зв'язок", description: "Ми можемо звернутися до вас за додатковою комерційною чи проєктною інформацією." },
        { number: "03", title: "Наступні кроки", description: "Вашу заявку отримано, і її розгляне наша комерційна команда." },
      ],
    },
    supportStrip: {
      title: "Маєте конкретну потребу проєкту?",
      description: "Скористайтеся наявною системою контактів і запитів для питань щодо проєкту чи продукції.",
      action: "Зв'язатися з командою",
    },
    selectPlaceholder: "Оберіть варіант",
    yes: "Так",
    no: "Ні",
  },
};

export function commercialPartnersContentForMarket(market: MarketCode): CommercialPartnersContent {
  return content[market];
}
