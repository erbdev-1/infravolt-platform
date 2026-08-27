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
    /** Omitted entirely (not rendered as an empty panel) when no approved contact detail exists for the market. */
    contactDetails?: Readonly<{
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
    emptyText: string;
    contextLabel: string;
    contextSystemLabel: string;
    contextIndustryLabel: string;
    contextApplicationLabel: string;
  }>;
  fields: Readonly<{
    requiredMarker: string;
    optionalMarker: string;
    sectionContactHeading: string;
    firstName: string;
    lastName: string;
    company: string;
    jobTitle: string;
    jobTitlePlaceholder: string;
    workEmail: string;
    workEmailInvalid: string;
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
    informationRequiredError: string;
    documentRequired: string;
    documentRequiredError: string;
    additionalInformation: string;
    projectTypeOptions: readonly string[];
    projectStageOptions: readonly string[];
    informationRequiredOptions: readonly string[];
    documentRequiredOptions: readonly string[];
    otherOptionLabel: string;
    sectionAttachmentsHeading: string;
    /**
     * Website attachment upload is disabled until the private malware-scanning
     * layer is operational (backend stays intact and dormant — see
     * src/modules/enquiry/attachments.ts). Shown near the message/details
     * area instead of the upload field it replaced.
     */
    attachmentsUnavailableNote: string;
    uploadLabel: string;
    uploadHelper: string;
    uploadButtonLabel: string;
    uploadDropHint: string;
    removeFileLabel: string;
    uploadTooManyFiles: string;
    uploadFileTooLarge: string;
    uploadFileTypeRejected: string;
    uploadDuplicateFile: string;
    selectPlaceholder: string;
  }>;
  privacy: Readonly<{
    notice: string;
    linkLabel: string;
    /** Undefined until a real Privacy Notice route exists — never point this at a placeholder/dead link. */
    href?: string;
  }>;
  submit: Readonly<{
    sendLabel: string;
    sendingLabel: string;
    resetLabel: string;
    errorTitle: string;
    errorBody: string;
    successTitle: string;
    successBody: string;
    successReferenceLabel: string;
    successTypeLabel: string;
    /** Contains the literal token "{referenceNo}", replaced at render time. */
    successAttachmentNoteTemplate: string;
    submitAnotherAction: string;
    returnToProductsAction: string;
  }>;
}>;

const CONTENT: Record<MarketCode, ContactPageContent> = {
  uk: {
    metadata: {
      title: "Contact InfraVolt | Product, Technical & Project Enquiries",
      description:
        "Contact InfraVolt for product enquiries, quotations, technical documentation and project support in the United Kingdom.",
    },
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Contact",
    hero: {
      eyebrow: "Contact InfraVolt",
      heading: "Product, Technical & Project Enquiries",
      description:
        "Tell us what you are working on. Our team can support product selection, quotations, technical documentation and project requirements across the United Kingdom.",
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
      {
        id: "project",
        label: "Project Support",
        helper: "Discuss project requirements, system selection, specifications and project stage.",
      },
      { id: "general", label: "General Enquiry", helper: "Anything else for the InfraVolt team." },
    ],
    selectedProducts: {
      heading: "Your Enquiry",
      removeLabel: "Remove",
      addMoreLabel: "Add More Products",
      addProductsLabel: "Add Products",
      emptyText: "No products added yet.",
      contextLabel: "Product",
      contextSystemLabel: "System",
      contextIndustryLabel: "Industry",
      contextApplicationLabel: "Application",
    },
    fields: {
      requiredMarker: "*",
      optionalMarker: "(optional)",
      sectionContactHeading: "Contact Details",
      firstName: "First Name",
      lastName: "Last Name",
      company: "Company",
      jobTitle: "Job Title / Position",
      jobTitlePlaceholder: "e.g. Project Manager",
      workEmail: "Business Email",
      workEmailInvalid: "Enter a valid email address.",
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
      projectType: "Project Type / Industry",
      projectStage: "Project Stage",
      estimatedQuantity: "Estimated Quantity",
      requiredDate: "Required Date",
      interestedSystems: "Interested Systems",
      informationRequired: "Information Required",
      informationRequiredError: "Select at least one information type, or describe your question below.",
      documentRequired: "Document Required",
      documentRequiredError: "Select at least one document type, or add more detail below.",
      additionalInformation: "Additional Information",
      projectTypeOptions: [
        "Commercial Buildings",
        "Industrial & Manufacturing",
        "Data Centres",
        "Renewable Energy",
        "Transport & Infrastructure",
        "Other",
      ],
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
      attachmentsUnavailableNote:
        "Need to send drawings or supporting documents? Please email them to info@infravolt.co.uk and include your enquiry reference where available.",
      uploadLabel: "Attach Project Files",
      uploadHelper: "Up to 10 files, 25 MB total. For larger files, please include a download link in your message.",
      uploadButtonLabel: "Upload Files",
      uploadDropHint: "Drag files here or",
      removeFileLabel: "Remove file",
      uploadTooManyFiles: "You can attach up to 10 files.",
      uploadFileTooLarge: "would take the total over 25 MB and was not added.",
      uploadFileTypeRejected: "is not an accepted file type and was not added.",
      uploadDuplicateFile: "is already attached.",
      selectPlaceholder: "Select an option",
    },
    privacy: {
      notice:
        "By submitting this enquiry, you agree that InfraVolt may use the information provided to respond to your request.",
      linkLabel: "Privacy Notice",
    },
    submit: {
      sendLabel: "Send Enquiry",
      sendingLabel: "Sending…",
      resetLabel: "Clear Form",
      errorTitle: "We couldn't send your enquiry.",
      errorBody: "Please try again in a moment.",
      successTitle: "Enquiry Received",
      successBody:
        "Thank you. Your enquiry has been sent to the InfraVolt UK team for review. Our team aims to respond within 24–48 business hours. Please keep your reference number for any follow-up.",
      successReferenceLabel: "Reference",
      successTypeLabel: "Enquiry type",
      successAttachmentNoteTemplate: "You can send supporting documents by email to info@infravolt.co.uk and quote reference {referenceNo}.",
      submitAnotherAction: "Submit Another Enquiry",
      returnToProductsAction: "Return to Product Systems",
    },
  },
  ua: {
    metadata: {
      title: "Зв’язатися з InfraVolt | Запити щодо продукції, техніки та проєктів",
      description:
        "Зв’яжіться з командою InfraVolt щодо запитів на продукцію, цінових пропозицій, технічної документації та підтримки проєктів в Україні.",
    },
    breadcrumbHome: "Головна",
    breadcrumbCurrent: "Контакти",
    hero: {
      eyebrow: "Контакти InfraVolt",
      heading: "Запити щодо продукції, технічної підтримки та проєктів",
      description:
        "Розкажіть, над яким проєктом ви працюєте. Наша команда допоможе з підбором продукції, ціновими пропозиціями, технічною документацією та вимогами проєкту в Україні.",
      market: "Україна",
      contactDetails: {
        heading: "Контактні дані",
        email: "info@infravolt.com.ua",
      },
    },
    typeSectionHeading: "Чим ми можемо вам допомогти?",
    typeOptions: [
      { id: "product", label: "Запит щодо продукції", helper: "Запитайте про систему, серію або модель." },
      { id: "quote", label: "Запит цінової пропозиції", helper: "Отримайте вартість для проєкту чи переліку продукції." },
      { id: "technical", label: "Технічна інформація", helper: "Розміри, характеристики чи конфігурація." },
      { id: "technical-document", label: "Технічні документи", helper: "Паспорти, креслення чи сертифікати." },
      {
        id: "project",
        label: "Підтримка проєкту",
        helper: "Обговоріть вимоги проєкту, підбір систем, специфікації та етап реалізації.",
      },
      { id: "general", label: "Загальний запит", helper: "Будь-яке інше питання до команди InfraVolt." },
    ],
    selectedProducts: {
      heading: "Ваш запит",
      removeLabel: "Видалити",
      addMoreLabel: "Додати інші продукти",
      addProductsLabel: "Додати продукти",
      emptyText: "Продукти ще не додані.",
      contextLabel: "Продукт",
      contextSystemLabel: "Система",
      contextIndustryLabel: "Галузь",
      contextApplicationLabel: "Застосування",
    },
    fields: {
      requiredMarker: "*",
      optionalMarker: "(необов’язково)",
      sectionContactHeading: "Контактні дані",
      firstName: "Ім’я",
      lastName: "Прізвище",
      company: "Компанія",
      jobTitle: "Посада",
      jobTitlePlaceholder: "Напр. керівник проєкту",
      workEmail: "Робоча електронна пошта",
      workEmailInvalid: "Введіть дійсну електронну адресу.",
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
      projectType: "Тип проєкту / Галузь",
      projectStage: "Етап проєкту",
      estimatedQuantity: "Орієнтовна кількість",
      requiredDate: "Необхідна дата",
      interestedSystems: "Системи, що цікавлять",
      informationRequired: "Необхідна інформація",
      informationRequiredError: "Оберіть принаймні один тип інформації або опишіть питання нижче.",
      documentRequired: "Необхідний документ",
      documentRequiredError: "Оберіть принаймні один тип документа або додайте деталі нижче.",
      additionalInformation: "Додаткова інформація",
      projectTypeOptions: [
        "Комерційні будівлі",
        "Промисловість і виробництво",
        "Дата-центри",
        "Відновлювана енергетика",
        "Транспорт та інфраструктура",
        "Інше",
      ],
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
      attachmentsUnavailableNote:
        "Потрібно надіслати креслення або супровідні документи? Будь ласка, надішліть їх на info@infravolt.com.ua, вказавши номер вашого запиту, якщо він уже є.",
      uploadLabel: "Додати файли проєкту",
      uploadHelper: "До 10 файлів, загалом 25 МБ. Для більших файлів, будь ласка, додайте посилання для завантаження у своєму повідомленні.",
      uploadButtonLabel: "Завантажити файли",
      uploadDropHint: "Перетягніть файли сюди або",
      removeFileLabel: "Видалити файл",
      uploadTooManyFiles: "Можна додати не більше 10 файлів.",
      uploadFileTooLarge: "перевищить загальний ліміт 25 МБ і не було додано.",
      uploadFileTypeRejected: "має непідтримуваний формат і не було додано.",
      uploadDuplicateFile: "вже додано.",
      selectPlaceholder: "Оберіть варіант",
    },
    privacy: {
      notice:
        "Надсилаючи цей запит, ви погоджуєтесь, що InfraVolt може використати надану інформацію для відповіді на ваш запит.",
      linkLabel: "Політика конфіденційності",
    },
    submit: {
      sendLabel: "Надіслати запит",
      sendingLabel: "Надсилання…",
      resetLabel: "Очистити форму",
      errorTitle: "Не вдалося надіслати ваш запит.",
      errorBody: "Будь ласка, спробуйте ще раз за хвилину.",
      successTitle: "Запит отримано",
      successBody:
        "Дякуємо. Ваш запит надіслано команді InfraVolt в Україні для розгляду. Наша команда прагне відповісти протягом 24–48 робочих годин. Будь ласка, збережіть номер запиту для подальшого зв'язку.",
      successReferenceLabel: "Номер запиту",
      successTypeLabel: "Тип запиту",
      successAttachmentNoteTemplate: "Ви можете надіслати супровідні документи на info@infravolt.com.ua, вказавши номер запиту {referenceNo}.",
      submitAnotherAction: "Надіслати ще один запит",
      returnToProductsAction: "Повернутися до продуктових систем",
    },
  },
};

export function contactPageContentForMarket(market: MarketCode): ContactPageContent {
  return CONTENT[market];
}
