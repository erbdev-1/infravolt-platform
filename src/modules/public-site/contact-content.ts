import type { MarketCode } from "@/modules/markets/types";
import type { EnquiryType } from "@/modules/enquiry/types";

export type EnquiryTypeOption = Readonly<{
  id: EnquiryType;
  label: string;
  helper: string;
}>;

export type ContactPageContent = Readonly<{
  metadata: Readonly<{ title: string; description: string }>;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  hero: Readonly<{
    eyebrow: string;
    heading: string;
    description: string;
    market: string;
    contactDetails: Readonly<{
      heading: string;
      email?: string;
    }>;
  }>;
  typeSectionHeading: string;
  typeOptions: readonly EnquiryTypeOption[];
  selectedProducts: Readonly<{
    heading: string;
    removeLabel: string;
    addMoreLabel: string;
    addProductsLabel: string;
    addMoreHref: string;
    emptyText: string;
    contextLabel: string;
    contextSystemLabel: string;
    contextCategoryLabel: string;
    contextIndustryLabel: string;
    contextApplicationLabel: string;
  }>;
  fields: Readonly<{
    requiredMarker: string;
    sectionContactHeading: string;
    firstName: string;
    lastName: string;
    company: string;
    jobTitle: string;
    jobTitlePlaceholder: string;
    workEmail: string;
    phone: string;
    sectionEnquiryHeading: string;
    productSystem: string;
    productSeries: string;
    modelCode: string;
    requirement: string;
    message: string;
    subject: string;
    projectName: string;
    projectLocation: string;
    projectType: string;
    projectStage: string;
    estimatedQuantity: string;
    requiredDate: string;
    interestedSystems: string;
    informationRequired: string;
    documentRequired: string;
    additionalInformation: string;
    projectTypeOptions: readonly string[];
    projectStageOptions: readonly string[];
    informationRequiredOptions: readonly string[];
    documentRequiredOptions: readonly string[];
    otherOptionLabel: string;
    sectionAttachmentsHeading: string;
    uploadLabel: string;
    uploadHelper: string;
    uploadButtonLabel: string;
    uploadDropHint: string;
    removeFileLabel: string;
    selectPlaceholder: string;
  }>;
  submit: Readonly<{
    sendLabel: string;
    sendingLabel: string;
    resetLabel: string;
    errorTitle: string;
    errorBody: string;
  }>;
}>;

const CONTENT: Record<MarketCode, ContactPageContent> = {
  uk: {
    metadata: {
      title: "Contact InfraVolt | Enquiries & Project Support",
      description:
        "Contact InfraVolt for product enquiries, quotations, technical information and project support in the United Kingdom.",
    },
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Contact",
    hero: {
      eyebrow: "Contact InfraVolt",
      heading: "How Can We Help?",
      description:
        "Contact the InfraVolt team for product enquiries, quotations, technical information and project support in the United Kingdom.",
      market: "United Kingdom",
      contactDetails: {
        heading: "Contact Details",
        email: "info@infravolt.co.uk",
      },
    },
    typeSectionHeading: "What can we help you with?",
    typeOptions: [
      { id: "product", label: "Product Enquiry", helper: "Ask about a system, series or model." },
      { id: "quote", label: "Request a Quote", helper: "Get pricing for a project or product list." },
      { id: "technical", label: "Technical Information", helper: "Dimensions, ratings or configuration." },
      { id: "technical-document", label: "Technical Documents", helper: "Datasheets, drawings or certificates." },
      { id: "project", label: "Project Enquiry", helper: "Discuss a project's scope and stage." },
      { id: "general", label: "General Enquiry", helper: "Anything else for the InfraVolt team." },
    ],
    selectedProducts: {
      heading: "Your Enquiry",
      removeLabel: "Remove",
      addMoreLabel: "Add More Products",
      addProductsLabel: "Add Products",
      addMoreHref: "/#product-systems",
      emptyText: "No products added yet.",
      contextLabel: "Product",
      contextSystemLabel: "System",
      contextCategoryLabel: "Category",
      contextIndustryLabel: "Industry",
      contextApplicationLabel: "Application",
    },
    fields: {
      requiredMarker: "*",
      sectionContactHeading: "Contact Details",
      firstName: "First Name",
      lastName: "Last Name",
      company: "Company",
      jobTitle: "Job Title / Position",
      jobTitlePlaceholder: "e.g. Project Manager",
      workEmail: "Work Email",
      phone: "Phone",
      sectionEnquiryHeading: "Enquiry Details",
      productSystem: "Product System",
      productSeries: "Product / Series",
      modelCode: "Model / Code",
      requirement: "Requirement / Question",
      message: "Message",
      subject: "Subject",
      projectName: "Project Name",
      projectLocation: "Project Location",
      projectType: "Project Type",
      projectStage: "Project Stage",
      estimatedQuantity: "Estimated Quantity",
      requiredDate: "Required Date",
      interestedSystems: "Interested Systems",
      informationRequired: "Information Required",
      documentRequired: "Document Required",
      additionalInformation: "Additional Information",
      projectTypeOptions: ["Commercial", "Industrial", "Data Centre", "Infrastructure", "Transport", "Energy", "Other"],
      projectStageOptions: ["Early Design", "Specification", "Tender", "Procurement", "Construction", "Other"],
      informationRequiredOptions: [
        "Dimensions",
        "Installation",
        "Electrical Data",
        "Configuration",
        "Product Selection",
        "Compliance",
        "Other",
      ],
      documentRequiredOptions: [
        "Datasheet",
        "Technical Drawing",
        "Certificate",
        "Test Report",
        "Installation Document",
        "CAD / DWG",
        "BIM / Revit",
        "IES / LDT",
        "Other",
      ],
      otherOptionLabel: "Other",
      sectionAttachmentsHeading: "Attachments",
      uploadLabel: "Attach Project Files",
      uploadHelper: "Upload BOQs, specifications, drawings or other relevant project documentation.",
      uploadButtonLabel: "Upload Files",
      uploadDropHint: "Drag files here or",
      removeFileLabel: "Remove file",
      selectPlaceholder: "Select an option",
    },
    submit: {
      sendLabel: "Send Enquiry",
      sendingLabel: "Sending…",
      resetLabel: "Clear Form",
      errorTitle: "We couldn't send your enquiry.",
      errorBody: "Please try again in a moment.",
    },
  },
  ua: {
    metadata: {
      title: "Зв’язатися з InfraVolt | Запити та підтримка проєктів",
      description:
        "Зв’яжіться з командою InfraVolt щодо запитів на продукцію, цінових пропозицій, технічної інформації та підтримки проєктів в Україні.",
    },
    breadcrumbHome: "Головна",
    breadcrumbCurrent: "Контакти",
    hero: {
      eyebrow: "Зв’язатися з InfraVolt",
      heading: "Як ми можемо допомогти?",
      description:
        "Зв’яжіться з командою InfraVolt щодо запитів на продукцію, цінових пропозицій, технічної інформації та підтримки проєктів в Україні.",
      market: "Україна",
      contactDetails: {
        heading: "Контактні дані",
      },
    },
    typeSectionHeading: "Чим ми можемо вам допомогти?",
    typeOptions: [
      { id: "product", label: "Запит щодо продукції", helper: "Запитайте про систему, серію або модель." },
      { id: "quote", label: "Запит цінової пропозиції", helper: "Отримайте вартість для проєкту чи переліку продукції." },
      { id: "technical", label: "Технічна інформація", helper: "Розміри, характеристики чи конфігурація." },
      { id: "technical-document", label: "Технічні документи", helper: "Паспорти, креслення чи сертифікати." },
      { id: "project", label: "Запит щодо проєкту", helper: "Обговоріть обсяг і етап проєкту." },
      { id: "general", label: "Загальний запит", helper: "Будь-яке інше питання до команди InfraVolt." },
    ],
    selectedProducts: {
      heading: "Ваш запит",
      removeLabel: "Видалити",
      addMoreLabel: "Додати інші продукти",
      addProductsLabel: "Додати продукти",
      addMoreHref: "/#product-systems",
      emptyText: "Продукти ще не додані.",
      contextLabel: "Продукт",
      contextSystemLabel: "Система",
      contextCategoryLabel: "Категорія",
      contextIndustryLabel: "Галузь",
      contextApplicationLabel: "Застосування",
    },
    fields: {
      requiredMarker: "*",
      sectionContactHeading: "Контактні дані",
      firstName: "Ім’я",
      lastName: "Прізвище",
      company: "Компанія",
      jobTitle: "Посада",
      jobTitlePlaceholder: "Напр. керівник проєкту",
      workEmail: "Робоча електронна пошта",
      phone: "Телефон",
      sectionEnquiryHeading: "Деталі запиту",
      productSystem: "Система продукції",
      productSeries: "Продукт / Серія",
      modelCode: "Модель / Код",
      requirement: "Вимоги / Запитання",
      message: "Повідомлення",
      subject: "Тема",
      projectName: "Назва проєкту",
      projectLocation: "Місце реалізації проєкту",
      projectType: "Тип проєкту",
      projectStage: "Етап проєкту",
      estimatedQuantity: "Орієнтовна кількість",
      requiredDate: "Необхідна дата",
      interestedSystems: "Системи, що цікавлять",
      informationRequired: "Необхідна інформація",
      documentRequired: "Необхідний документ",
      additionalInformation: "Додаткова інформація",
      projectTypeOptions: ["Комерційний", "Промисловий", "Дата-центр", "Інфраструктура", "Транспорт", "Енергетика", "Інше"],
      projectStageOptions: ["Ранній дизайн", "Специфікація", "Тендер", "Закупівля", "Будівництво", "Інше"],
      informationRequiredOptions: [
        "Розміри",
        "Монтаж",
        "Електричні характеристики",
        "Конфігурація",
        "Підбір продукції",
        "Відповідність стандартам",
        "Інше",
      ],
      documentRequiredOptions: [
        "Паспорт виробу",
        "Технічне креслення",
        "Сертифікат",
        "Протокол випробувань",
        "Монтажний документ",
        "CAD / DWG",
        "BIM / Revit",
        "IES / LDT",
        "Інше",
      ],
      otherOptionLabel: "Інше",
      sectionAttachmentsHeading: "Вкладення",
      uploadLabel: "Додати файли проєкту",
      uploadHelper: "Завантажте BOQ, специфікації, креслення чи іншу відповідну проєктну документацію.",
      uploadButtonLabel: "Завантажити файли",
      uploadDropHint: "Перетягніть файли сюди або",
      removeFileLabel: "Видалити файл",
      selectPlaceholder: "Оберіть варіант",
    },
    submit: {
      sendLabel: "Надіслати запит",
      sendingLabel: "Надсилання…",
      resetLabel: "Очистити форму",
      errorTitle: "Не вдалося надіслати ваш запит.",
      errorBody: "Будь ласка, спробуйте ще раз за хвилину.",
    },
  },
};

export function contactPageContentForMarket(market: MarketCode): ContactPageContent {
  return CONTENT[market];
}
