"use client";

import { useId, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import type { MarketCode } from "@/modules/markets/types";
import { submitTradeApplication, type TradeApplicationDraft } from "@/modules/enquiry/trade-application";
import type { CommercialPartnersContent } from "@/modules/public-site/trade-account-content";

import styles from "./trade-account-page.module.css";

type Option = Readonly<{ value: string; label: string }>;
type FieldErrors = Partial<Record<string, string>>;
type Status = "idle" | "submitting" | "success" | "error";

// InfraVolt is the distributor / market partner for its own markets — an
// applicant is never offered that role back (see hard rule in the form
// spec). This table is the single source of truth for which Partnership
// Interest options a given Business Type may see; the content module only
// carries the full translated catalogue (partnershipInterestOptions), never
// a per-business-type subset, so the business rule lives in exactly one
// place regardless of market/locale.
const PARTNERSHIP_INTEREST_GROUPS: Readonly<Record<string, readonly string[]>> = {
  "electrical-wholesaler": ["authorised-dealer", "reseller-partner", "stockist-trade-partner", "project-supply-partner", "other"],
  "dealer-reseller": ["authorised-dealer", "reseller-partner", "stockist-trade-partner", "project-supply-partner", "other"],
  "electrical-contractor": ["contractor-partner", "project-supply-partner", "regular-trade-purchasing", "commercial-project-partner", "other"],
  "me-contractor": ["contractor-partner", "project-supply-partner", "regular-trade-purchasing", "commercial-project-partner", "other"],
  "main-epc-contractor": ["contractor-partner", "project-supply-partner", "regular-trade-purchasing", "commercial-project-partner", "other"],
  "consultant-specifier": ["specification-technical-partner", "commercial-project-collaboration", "product-specification-support", "other"],
  developer: ["commercial-project-partner", "project-supply-partner", "regular-trade-purchasing", "technical-specification-support", "other"],
  "facilities-maintenance": ["commercial-project-partner", "project-supply-partner", "regular-trade-purchasing", "technical-specification-support", "other"],
  other: ["commercial-project-partner", "project-supply-partner", "reseller-partner", "technical-specification-partner", "other"],
};

const DEALER_BUSINESS_TYPES = new Set(["electrical-wholesaler", "dealer-reseller"]);
const CONTRACTOR_BUSINESS_TYPES = new Set([
  "electrical-contractor",
  "me-contractor",
  "main-epc-contractor",
  "developer",
  "facilities-maintenance",
]);
const DEALER_PARTNERSHIP_VALUES = new Set(["authorised-dealer", "reseller-partner", "stockist-trade-partner"]);
const CONTRACTOR_PARTNERSHIP_VALUES = new Set(["contractor-partner", "project-supply-partner", "commercial-project-partner"]);

function partnershipInterestOptionsFor(businessType: string, allOptions: readonly Option[]): readonly Option[] {
  const allowedValues = PARTNERSHIP_INTEREST_GROUPS[businessType];
  if (!allowedValues) return [];
  const byValue = new Map(allOptions.map((option) => [option.value, option] as const));
  return allowedValues
    .map((value) => byValue.get(value))
    .filter((option): option is Option => option !== undefined);
}

function TextField({
  id,
  label,
  value,
  onChange,
  required,
  error,
  type = "text",
  helper,
  placeholder,
}: Readonly<{
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  type?: string;
  helper?: string;
  placeholder?: string;
}>) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel} htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {helper ? (
        <p className={styles.fieldHelper} id={`${id}-helper`}>
          {helper}
        </p>
      ) : null}
      <input
        aria-describedby={[helper ? `${id}-helper` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined}
        aria-invalid={error ? true : undefined}
        aria-required={required}
        className={styles.fieldInput}
        id={id}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error ? (
        <p className={styles.fieldError} id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function TextAreaField({
  id,
  label,
  value,
  onChange,
  required,
  error,
}: Readonly<{
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
}>) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel} htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <textarea
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
        aria-required={required}
        className={styles.fieldTextarea}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
      {error ? (
        <p className={styles.fieldError} id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  required,
  error,
  helper,
}: Readonly<{
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly Option[];
  placeholder: string;
  required?: boolean;
  error?: string;
  helper?: string;
}>) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel} htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {helper ? (
        <p className={styles.fieldHelper} id={`${id}-helper`}>
          {helper}
        </p>
      ) : null}
      <div className={styles.selectShell}>
        <select
          aria-describedby={[helper ? `${id}-helper` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined}
          aria-invalid={error ? true : undefined}
          aria-required={required}
          className={styles.fieldSelect}
          id={id}
          onChange={(event) => onChange(event.target.value)}
          value={value}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg aria-hidden="true" className={styles.selectChevron} viewBox="0 0 16 16">
          <path d="m3 6 5 5 5-5" />
        </svg>
      </div>
      {error ? (
        <p className={styles.fieldError} id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function CheckboxGroup({
  legend,
  helper,
  options,
  values,
  onToggle,
  error,
  required,
  tiles,
}: Readonly<{
  legend: string;
  helper?: string;
  options: readonly string[];
  values: readonly string[];
  onToggle: (option: string) => void;
  error?: string;
  required?: boolean;
  tiles?: boolean;
}>) {
  return (
    <fieldset className={styles.checkboxGroup}>
      <legend className={styles.fieldLabel}>
        {legend}
        {required ? <span aria-hidden="true"> *</span> : null}
      </legend>
      {helper ? <p className={styles.fieldHelper}>{helper}</p> : null}
      <div className={tiles ? styles.tileGrid : styles.checkboxGrid}>
        {options.map((option) => {
          const checked = values.includes(option);
          return (
            <label
              className={
                tiles
                  ? checked
                    ? styles.tileOptionActive
                    : styles.tileOption
                  : checked
                    ? styles.checkboxOptionActive
                    : styles.checkboxOption
              }
              key={option}
            >
              <input checked={checked} onChange={() => onToggle(option)} type="checkbox" />
              {tiles ? <span aria-hidden="true" className={styles.tileCheck} /> : null}
              {option}
            </label>
          );
        })}
      </div>
      {error ? (
        <p className={styles.fieldError} role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

function ProductSystemsGroup({
  legend,
  options,
  values,
  onToggle,
  error,
}: Readonly<{
  legend: string;
  options: readonly string[];
  values: readonly string[];
  onToggle: (option: string) => void;
  error?: string;
}>) {
  return (
    <fieldset className={styles.checkboxGroup}>
      <legend className={styles.fieldLabel}>
        {legend}
        <span aria-hidden="true"> *</span>
      </legend>
      <div className={styles.tileGrid}>
        {options.map((option) => {
          const checked = values.includes(option);
          return (
            <label className={checked ? styles.tileOptionActive : styles.tileOption} key={option}>
              <input checked={checked} onChange={() => onToggle(option)} type="checkbox" />
              <span aria-hidden="true" className={styles.tileCheck} />
              {option}
            </label>
          );
        })}
      </div>
      {error ? (
        <p className={styles.fieldError} role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function TradeApplicationForm({
  content,
  market,
}: Readonly<{
  content: CommercialPartnersContent;
  market: MarketCode;
}>) {
  const idPrefix = useId();
  const s = content.sections;

  const [company, setCompany] = useState({
    legalName: "",
    tradingName: "",
    registrationNumber: "",
    vatNumber: "",
    registeredAddress: "",
    tradingAddress: "",
    website: "",
    yearEstablished: "",
    turnoverBand: "",
    employeeBand: "",
    branchCount: "",
    warehouseCapability: "",
    salesTeamSize: "",
    technicalTeamCapability: "",
  });
  const [businessType, setBusinessType] = useState("");
  const [partnershipInterest, setPartnershipInterest] = useState("");
  const [coverageRegions, setCoverageRegions] = useState<readonly string[]>([]);
  const [mainAreasServed, setMainAreasServed] = useState("");
  const [territoryType, setTerritoryType] = useState("");
  const [requestedRegions, setRequestedRegions] = useState<readonly string[]>([]);
  const [requestedCities, setRequestedCities] = useState("");
  const [primaryIndustries, setPrimaryIndustries] = useState<readonly string[]>([]);
  const [productSystems, setProductSystems] = useState<readonly string[]>([]);
  const [contact, setContact] = useState({ fullName: "", jobTitle: "", workEmail: "", phone: "", accountsEmail: "" });
  const [expectedAnnualPurchasing, setExpectedAnnualPurchasing] = useState("");
  const [expectedStart, setExpectedStart] = useState("");
  const [purchasingPattern, setPurchasingPattern] = useState("");
  // Dealer / wholesaler / reseller branch.
  const [holdsStock, setHoldsStock] = useState("");
  const [existingBrands, setExistingBrands] = useState("");
  const [salesChannels, setSalesChannels] = useState<readonly string[]>([]);
  const [customerBase, setCustomerBase] = useState<readonly string[]>([]);
  // Contractor/project-partner and consultant/specifier branches share this
  // project shape — neither requires naming a confidential project.
  const [hasCurrentProject, setHasCurrentProject] = useState("");
  const [project, setProject] = useState({ name: "", location: "", stage: "", requiredDate: "", requirement: "" });
  // Consultant / specifier branch only.
  const [commercialProjectRole, setCommercialProjectRole] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [activeStep, setActiveStep] = useState(1);

  const showDealerQuestions =
    DEALER_BUSINESS_TYPES.has(businessType) || DEALER_PARTNERSHIP_VALUES.has(partnershipInterest);
  const showContractorQuestions =
    CONTRACTOR_BUSINESS_TYPES.has(businessType) || CONTRACTOR_PARTNERSHIP_VALUES.has(partnershipInterest);
  const showConsultantQuestions = businessType === "consultant-specifier";
  const showProjectDetails =
    (showContractorQuestions || showConsultantQuestions) &&
    (hasCurrentProject === "yes" || hasCurrentProject === "multiple");

  const partnershipInterestOptions = partnershipInterestOptionsFor(
    businessType,
    s.businessProfile.partnershipInterestOptions,
  );
  const purchasingPatternOptions = showConsultantQuestions
    ? s.commercial.consultantPatternOptions
    : showDealerQuestions
      ? s.commercial.dealerPatternOptions
      : showContractorQuestions
        ? s.commercial.contractorPatternOptions
        : s.commercial.patternOptions;
  const annualPurchasingOptions = showConsultantQuestions
    ? s.commercial.spendOptions
    : s.commercial.spendOptions.filter((option) => option.value !== "not-applicable-specification");

  function toggle(list: readonly string[], value: string, setter: (next: readonly string[]) => void) {
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  }

  // Partnership Interest is dynamic per Business Type (see
  // PARTNERSHIP_INTEREST_GROUPS) — if the newly chosen Business Type no
  // longer allows the currently selected Partnership Interest, it is
  // cleared rather than silently retained as a hidden invalid value.
  function handleBusinessTypeChange(value: string) {
    setBusinessType(value);
    const allowed = new Set(PARTNERSHIP_INTEREST_GROUPS[value] ?? []);
    setPartnershipInterest((current) => (allowed.has(current) ? current : ""));
    setExpectedAnnualPurchasing("");
    setPurchasingPattern("");
    setExistingBrands("");
    setHoldsStock("");
    setSalesChannels([]);
    setCustomerBase([]);
    setHasCurrentProject("");
    setCommercialProjectRole("");
    setProject({ name: "", location: "", stage: "", requiredDate: "", requirement: "" });
  }

  function handlePartnershipInterestChange(value: string) {
    setPartnershipInterest(value);
    setPurchasingPattern("");
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    const required = content.submit.requiredFieldError;
    if (!company.legalName.trim()) next.legalName = required;
    if (!company.registrationNumber.trim()) next.registrationNumber = required;
    if (!company.vatNumber.trim()) next.vatNumber = required;
    if (!company.registeredAddress.trim()) next.registeredAddress = required;
    if (!company.yearEstablished.trim()) next.yearEstablished = required;
    if (!company.turnoverBand) next.turnoverBand = required;
    if (!company.employeeBand.trim()) next.employeeBand = required;
    if (!businessType) next.businessType = required;
    if (!partnershipInterest) next.partnershipInterest = required;
    if (coverageRegions.length === 0) next.coverageRegions = required;
    if (!territoryType) next.territoryType = required;
    if (productSystems.length === 0) next.productSystems = required;
    if (!contact.fullName.trim()) next.fullName = required;
    if (!contact.jobTitle.trim()) next.jobTitle = required;
    if (!contact.workEmail.trim()) next.workEmail = required;
    if (!contact.phone.trim()) next.phone = required;
    if (!expectedAnnualPurchasing) next.expectedAnnualPurchasing = required;
    if (!expectedStart) next.expectedStart = required;
    if (!purchasingPattern) next.purchasingPattern = required;
    if (showDealerQuestions && !company.warehouseCapability) next.warehouseCapability = required;
    if (showDealerQuestions && !holdsStock) next.holdsStock = required;
    if (!declarationAccepted) next.declaration = content.submit.declarationError;
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");

    const draft: TradeApplicationDraft = {
      type: "trade",
      market,
      companyLegalName: company.legalName,
      tradingName: company.tradingName,
      companyRegistrationNumber: company.registrationNumber,
      vatTaxNumber: company.vatNumber,
      registeredAddress: company.registeredAddress,
      tradingAddress: company.tradingAddress,
      website: company.website,
      yearEstablished: company.yearEstablished,
      annualTurnoverBand: company.turnoverBand,
      employeeBand: company.employeeBand,
      companyBranchCount: company.branchCount,
      companyWarehouseCapability: company.warehouseCapability,
      salesTeamSize: company.salesTeamSize,
      technicalTeamCapability: company.technicalTeamCapability,
      businessType,
      partnershipInterest,
      coverageRegions,
      mainAreasServed,
      territoryType,
      requestedRegions,
      requestedCities,
      primaryIndustries,
      productSystems,
      contactName: contact.fullName,
      jobTitle: contact.jobTitle,
      workEmail: contact.workEmail,
      phone: contact.phone,
      accountsEmail: contact.accountsEmail,
      expectedAnnualPurchasing,
      expectedStart,
      purchasingPattern,
      existingBrands: showDealerQuestions ? existingBrands : "",
      holdsStock: showDealerQuestions ? holdsStock : "",
      salesChannels: showDealerQuestions ? salesChannels : [],
      customerBase: showDealerQuestions ? customerBase : [],
      hasCurrentProject: showContractorQuestions || showConsultantQuestions ? hasCurrentProject : "",
      projectName: showProjectDetails ? project.name : "",
      projectLocation: showProjectDetails ? project.location : "",
      projectStage: showProjectDetails ? project.stage : "",
      requiredDate: showProjectDetails ? project.requiredDate : "",
      projectRequirement: showProjectDetails ? project.requirement : "",
      commercialProjectRole: showConsultantQuestions ? commercialProjectRole : "",
      additionalInformation,
      attachmentNames: [],
      sourcePage: "/commercial-partners",
    };

    const result = await submitTradeApplication(draft);
    if (!result.ok) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }

  return (
    <section className={styles.formSection} id="apply">
      <div className={styles.formShell}>
        <aside className={styles.formGuide}>
          <p className={styles.formGuideHeading}>{content.guide.heading}</p>
          <div className={styles.mobileGuideProgress}>
            <p>
              {content.guide.stepLabel} {activeStep} / {content.guide.steps.length}
            </p>
            <strong>{content.guide.steps[activeStep - 1]?.title}</strong>
            <span>{Math.round((activeStep / content.guide.steps.length) * 100)}%</span>
            <div aria-hidden="true" className={styles.mobileGuideBar}>
              <span style={{ width: `${(activeStep / content.guide.steps.length) * 100}%` }} />
            </div>
            <details className={styles.mobileGuideDetails}>
              <summary>{content.guide.viewStepsLabel} +</summary>
              <ol className={styles.formGuideSteps}>
                {content.guide.steps.map((step) => (
                  <li key={step.number}>
                    <span aria-hidden="true" className={styles.formGuideNumber}>{step.number}</span>
                    {step.title}
                  </li>
                ))}
              </ol>
            </details>
          </div>
          <ol className={`${styles.formGuideSteps} ${styles.formGuideStepsDesktop}`}>
            {content.guide.steps.map((step) => (
              <li key={step.number}>
                <span aria-hidden="true" className={styles.formGuideNumber}>
                  {step.number}
                </span>
                {step.title}
              </li>
            ))}
          </ol>
          <div className={styles.formGuideReassurance}>
            <p className={styles.formGuideReassuranceTitle}>{content.guide.reassuranceTitle}</p>
            <p>{content.guide.reassuranceBody}</p>
          </div>
        </aside>

        <form
          className={styles.form}
          noValidate
          onFocusCapture={(event) => {
            const section = (event.target as HTMLElement).closest<HTMLElement>("[data-step]");
            const step = Number(section?.dataset.step);
            if (step >= 1 && step <= content.guide.steps.length) setActiveStep(step);
          }}
          onSubmit={handleSubmit}
        >
          {/* 01 — Company */}
          <div className={styles.formGroup} data-step="1">
            <h2 className={styles.formGroupHeading}>
              <span className={styles.formGroupNumber}>{s.company.number}</span>
              {s.company.title}
            </h2>
            <p className={styles.formGroupDescription}>{s.company.description}</p>
            <h3 className={styles.formSubheading}>{s.company.legalDetailsHeading}</h3>

            <div className={styles.fieldRow}>
              <TextField
                error={errors.legalName}
                id={`${idPrefix}-legal-name`}
                label={s.company.legalName}
                onChange={(value) => setCompany((c) => ({ ...c, legalName: value }))}
                required
                value={company.legalName}
              />
              <TextField
                id={`${idPrefix}-trading-name`}
                label={s.company.tradingName}
                onChange={(value) => setCompany((c) => ({ ...c, tradingName: value }))}
                value={company.tradingName}
              />
            </div>
            <div className={styles.fieldRow}>
              <TextField
                error={errors.registrationNumber}
                helper={s.company.registrationHelper}
                id={`${idPrefix}-registration-number`}
                label={s.company.registrationNumber}
                onChange={(value) => setCompany((c) => ({ ...c, registrationNumber: value }))}
                required
                value={company.registrationNumber}
              />
              <TextField
                error={errors.vatNumber}
                helper={s.company.vatHelper}
                id={`${idPrefix}-vat-number`}
                label={s.company.vatNumber}
                onChange={(value) => setCompany((c) => ({ ...c, vatNumber: value }))}
                required
                value={company.vatNumber}
              />
            </div>
            <h3 className={styles.formSubheading}>{s.company.addressHeading}</h3>
            <div className={styles.fieldRow}>
              <TextField
                error={errors.registeredAddress}
                id={`${idPrefix}-registered-address`}
                label={s.company.registeredAddress}
                onChange={(value) => setCompany((c) => ({ ...c, registeredAddress: value }))}
                required
                value={company.registeredAddress}
              />
              <TextField
                id={`${idPrefix}-trading-address`}
                label={s.company.tradingAddress}
                onChange={(value) => setCompany((c) => ({ ...c, tradingAddress: value }))}
                value={company.tradingAddress}
              />
            </div>
            <div className={styles.fieldRow}>
              <TextField
                id={`${idPrefix}-website`}
                label={s.company.website}
                onChange={(value) => setCompany((c) => ({ ...c, website: value }))}
                type="url"
                value={company.website}
              />
              <TextField
                error={errors.yearEstablished}
                id={`${idPrefix}-year-established`}
                label={s.company.yearEstablished}
                onChange={(value) => setCompany((c) => ({ ...c, yearEstablished: value }))}
                required
                value={company.yearEstablished}
              />
            </div>
            <h3 className={styles.formSubheading}>{s.company.operationalHeading}</h3>
            <div className={styles.fieldRow}>
              <SelectField
                error={errors.turnoverBand}
                id={`${idPrefix}-turnover`}
                label={s.company.turnoverLabel}
                onChange={(value) => setCompany((c) => ({ ...c, turnoverBand: value }))}
                options={s.company.turnoverOptions}
                placeholder={content.selectPlaceholder}
                required
                value={company.turnoverBand}
              />
              <TextField
                error={errors.employeeBand}
                id={`${idPrefix}-employees`}
                label={s.company.employeeLabel}
                onChange={(value) => setCompany((c) => ({ ...c, employeeBand: value }))}
                required
                value={company.employeeBand}
              />
            </div>
            <div className={styles.fieldRow}>
              <TextField
                id={`${idPrefix}-company-branches`}
                label={s.company.branchCountLabel}
                onChange={(value) => setCompany((c) => ({ ...c, branchCount: value }))}
                value={company.branchCount}
              />
              <SelectField
                error={errors.warehouseCapability}
                id={`${idPrefix}-company-warehouse`}
                label={s.company.warehouseCapabilityLabel}
                onChange={(value) => setCompany((c) => ({ ...c, warehouseCapability: value }))}
                options={s.company.warehouseCapabilityOptions}
                placeholder={content.selectPlaceholder}
                required={showDealerQuestions}
                value={company.warehouseCapability}
              />
            </div>
            <div className={styles.fieldRow}>
              <TextField
                id={`${idPrefix}-sales-team-size`}
                label={s.company.salesTeamSizeLabel}
                onChange={(value) => setCompany((c) => ({ ...c, salesTeamSize: value }))}
                value={company.salesTeamSize}
              />
              <SelectField
                id={`${idPrefix}-technical-capability`}
                label={s.company.technicalTeamCapabilityLabel}
                onChange={(value) => setCompany((c) => ({ ...c, technicalTeamCapability: value }))}
                options={s.company.technicalTeamCapabilityOptions}
                placeholder={content.selectPlaceholder}
                value={company.technicalTeamCapability}
              />
            </div>
          </div>

          {/* 02 — Business profile */}
          <div className={styles.formGroup} data-step="2">
            <h2 className={styles.formGroupHeading}>
              <span className={styles.formGroupNumber}>{s.businessProfile.number}</span>
              {s.businessProfile.title}
            </h2>
            <p className={styles.formGroupDescription}>{s.businessProfile.description}</p>

            <div className={styles.fieldRow}>
              <SelectField
                error={errors.businessType}
                helper={s.businessProfile.businessTypeHelper}
                id={`${idPrefix}-business-type`}
                label={s.businessProfile.businessTypeLabel}
                onChange={handleBusinessTypeChange}
                options={s.businessProfile.businessTypeOptions}
                placeholder={content.selectPlaceholder}
                required
                value={businessType}
              />
              <SelectField
                error={errors.partnershipInterest}
                helper={s.businessProfile.partnershipInterestHelper}
                id={`${idPrefix}-partnership-interest`}
                label={s.businessProfile.partnershipInterestLabel}
                onChange={handlePartnershipInterestChange}
                options={partnershipInterestOptions}
                placeholder={content.selectPlaceholder}
                required
                value={partnershipInterest}
              />
            </div>

            <CheckboxGroup
              error={errors.coverageRegions}
              helper={s.businessProfile.coverageHelper}
              legend={s.businessProfile.coverageLabel}
              onToggle={(option) => toggle(coverageRegions, option, setCoverageRegions)}
              options={s.businessProfile.coverageOptions}
              required
              tiles
              values={coverageRegions}
            />
            <TextField
              id={`${idPrefix}-main-areas`}
              label={s.businessProfile.mainAreasLabel}
              onChange={setMainAreasServed}
              placeholder={s.businessProfile.mainAreasPlaceholder}
              value={mainAreasServed}
            />
            <div className={styles.formSubsection}>
              <h3>{s.businessProfile.territoryHeading}</h3>
              <p>{s.businessProfile.territoryHelper}</p>
              <SelectField
                error={errors.territoryType}
                id={`${idPrefix}-territory-type`}
                label={s.businessProfile.territoryTypeLabel}
                onChange={setTerritoryType}
                options={s.businessProfile.territoryTypeOptions}
                placeholder={content.selectPlaceholder}
                required
                value={territoryType}
              />
              <CheckboxGroup
                legend={s.businessProfile.requestedRegionsLabel}
                onToggle={(option) => toggle(requestedRegions, option, setRequestedRegions)}
                options={s.businessProfile.requestedRegionsOptions}
                tiles
                values={requestedRegions}
              />
              <TextField
                id={`${idPrefix}-requested-cities`}
                label={s.businessProfile.requestedCitiesLabel}
                onChange={setRequestedCities}
                placeholder={s.businessProfile.requestedCitiesPlaceholder}
                value={requestedCities}
              />
            </div>
            <CheckboxGroup
              legend={s.businessProfile.industriesLabel}
              onToggle={(option) => toggle(primaryIndustries, option, setPrimaryIndustries)}
              options={s.businessProfile.industriesOptions}
              tiles
              values={primaryIndustries}
            />
          </div>

          {/* Product systems */}
          <div className={styles.formGroup} data-step="2">
            <h2 className={styles.formGroupHeading}>
              <span className={styles.formGroupNumber}>{s.productSystems.number}</span>
              {s.productSystems.title}
            </h2>
            <p className={styles.formGroupDescription}>{s.productSystems.description}</p>
            <ProductSystemsGroup
              error={errors.productSystems}
              legend={s.productSystems.title}
              onToggle={(option) => toggle(productSystems, option, setProductSystems)}
              options={s.productSystems.options}
              values={productSystems}
            />
          </div>

          {/* 03 — Contact */}
          <div className={styles.formGroup} data-step="3">
            <h2 className={styles.formGroupHeading}>
              <span className={styles.formGroupNumber}>{s.contact.number}</span>
              {s.contact.title}
            </h2>
            <p className={styles.formGroupDescription}>{s.contact.description}</p>

            <div className={styles.fieldRow}>
              <TextField
                error={errors.fullName}
                id={`${idPrefix}-full-name`}
                label={s.contact.fullName}
                onChange={(value) => setContact((c) => ({ ...c, fullName: value }))}
                required
                value={contact.fullName}
              />
              <TextField
                error={errors.jobTitle}
                id={`${idPrefix}-job-title`}
                label={s.contact.jobTitle}
                onChange={(value) => setContact((c) => ({ ...c, jobTitle: value }))}
                required
                value={contact.jobTitle}
              />
            </div>
            <div className={styles.fieldRow}>
              <TextField
                error={errors.workEmail}
                id={`${idPrefix}-work-email`}
                label={s.contact.workEmail}
                onChange={(value) => setContact((c) => ({ ...c, workEmail: value }))}
                required
                type="email"
                value={contact.workEmail}
              />
              <TextField
                error={errors.phone}
                id={`${idPrefix}-phone`}
                label={s.contact.phone}
                onChange={(value) => setContact((c) => ({ ...c, phone: value }))}
                required
                type="tel"
                value={contact.phone}
              />
            </div>
            <TextField
              id={`${idPrefix}-accounts-email`}
              label={s.contact.accountsEmail}
              onChange={(value) => setContact((c) => ({ ...c, accountsEmail: value }))}
              type="email"
              value={contact.accountsEmail}
            />
          </div>

          {/* 04 — Commercial requirements */}
          <div className={styles.formGroup} data-step="4">
            <h2 className={styles.formGroupHeading}>
              <span className={styles.formGroupNumber}>{s.commercial.number}</span>
              {s.commercial.title}
            </h2>
            <p className={styles.formGroupDescription}>{s.commercial.description}</p>

            <div className={styles.fieldRow}>
              <SelectField
                error={errors.expectedAnnualPurchasing}
                helper={s.commercial.spendHelper}
                id={`${idPrefix}-spend`}
                label={s.commercial.spendLabel}
                onChange={setExpectedAnnualPurchasing}
                options={annualPurchasingOptions}
                placeholder={content.selectPlaceholder}
                required
                value={expectedAnnualPurchasing}
              />
              <SelectField
                error={errors.expectedStart}
                helper={s.commercial.startHelper}
                id={`${idPrefix}-start`}
                label={s.commercial.startLabel}
                onChange={setExpectedStart}
                options={s.commercial.startOptions}
                placeholder={content.selectPlaceholder}
                required
                value={expectedStart}
              />
            </div>

            <SelectField
              error={errors.purchasingPattern}
              helper={s.commercial.patternHelper}
              id={`${idPrefix}-pattern`}
              label={s.commercial.patternLabel}
              onChange={setPurchasingPattern}
              options={purchasingPatternOptions}
              placeholder={content.selectPlaceholder}
              required
              value={purchasingPattern}
            />

            {/* Dealer / wholesaler / reseller branch — no active-project
                question: these applicants purchase across many projects or
                hold stock, not one named project. */}
            {showDealerQuestions ? (
              <div className={styles.conditionalReveal}>
                <p className={styles.fieldLabel}>{s.commercial.dealerHeading}</p>
                <p className={styles.fieldHelper}>{s.commercial.dealerDescription}</p>

                <TextField
                  helper={s.commercial.existingBrandsHelper}
                  id={`${idPrefix}-existing-brands`}
                  label={s.commercial.existingBrandsLabel}
                  onChange={setExistingBrands}
                  value={existingBrands}
                />
                <SelectField
                  error={errors.holdsStock}
                  id={`${idPrefix}-holds-stock`}
                  label={s.commercial.holdsStockLabel}
                  onChange={setHoldsStock}
                  options={s.commercial.holdsStockOptions}
                  placeholder={content.selectPlaceholder}
                  required
                  value={holdsStock}
                />
                <CheckboxGroup
                  legend={s.commercial.salesChannelsLabel}
                  onToggle={(option) => toggle(salesChannels, option, setSalesChannels)}
                  options={s.commercial.salesChannelsOptions}
                  tiles
                  values={salesChannels}
                />
                <CheckboxGroup
                  legend={s.commercial.customerBaseLabel}
                  onToggle={(option) => toggle(customerBase, option, setCustomerBase)}
                  options={s.commercial.customerBaseOptions}
                  tiles
                  values={customerBase}
                />
              </div>
            ) : null}

            {/* Contractor / project-partner branch — the project question is
                now relevant because it only appears for applicants whose
                relationship with InfraVolt is genuinely project-shaped. */}
            {showContractorQuestions ? (
              <div className={styles.conditionalReveal}>
                <SelectField
                  id={`${idPrefix}-has-project`}
                  label={s.commercial.contractorProjectLabel}
                  onChange={setHasCurrentProject}
                  options={s.commercial.projectStatusOptions}
                  placeholder={content.selectPlaceholder}
                  value={hasCurrentProject}
                />
              </div>
            ) : null}

            {/* Consultant / specifier branch — never asked for a purchasing
                volume that assumes they are the buyer. */}
            {showConsultantQuestions ? (
              <div className={styles.conditionalReveal}>
                <SelectField
                  id={`${idPrefix}-consultant-role`}
                  label={s.commercial.consultantRoleLabel}
                  onChange={setCommercialProjectRole}
                  options={s.commercial.consultantRoleOptions}
                  placeholder={content.selectPlaceholder}
                  value={commercialProjectRole}
                />
                <SelectField
                  id={`${idPrefix}-has-spec-project`}
                  label={s.commercial.consultantProjectLabel}
                  onChange={setHasCurrentProject}
                  options={s.commercial.projectStatusOptions}
                  placeholder={content.selectPlaceholder}
                  value={hasCurrentProject}
                />
              </div>
            ) : null}

            {/* Shared by the contractor and consultant branches — the
                applicant is never required to name a confidential project. */}
            {showProjectDetails ? (
              <div className={styles.conditionalReveal}>
                <div className={styles.fieldRow}>
                  <TextField
                    id={`${idPrefix}-project-name`}
                    label={s.commercial.projectName}
                    onChange={(value) => setProject((p) => ({ ...p, name: value }))}
                    value={project.name}
                  />
                  <TextField
                    id={`${idPrefix}-project-location`}
                    label={s.commercial.projectLocation}
                    onChange={(value) => setProject((p) => ({ ...p, location: value }))}
                    value={project.location}
                  />
                </div>
                <div className={styles.fieldRow}>
                  <SelectField
                    id={`${idPrefix}-project-stage`}
                    label={s.commercial.projectStageLabel}
                    onChange={(value) => setProject((p) => ({ ...p, stage: value }))}
                    options={s.commercial.projectStageOptions}
                    placeholder={content.selectPlaceholder}
                    value={project.stage}
                  />
                  <TextField
                    id={`${idPrefix}-required-date`}
                    label={s.commercial.requiredDate}
                    onChange={(value) => setProject((p) => ({ ...p, requiredDate: value }))}
                    type="date"
                    value={project.requiredDate}
                  />
                </div>
                <TextAreaField
                  id={`${idPrefix}-project-requirement`}
                  label={s.commercial.projectRequirement}
                  onChange={(value) => setProject((p) => ({ ...p, requirement: value }))}
                  value={project.requirement}
                />
              </div>
            ) : null}
          </div>

          {/* 05 — Supporting information */}
          <div className={styles.formGroup} data-step="5">
            <h2 className={styles.formGroupHeading}>
              <span className={styles.formGroupNumber}>{s.supporting.number}</span>
              {s.supporting.title}
            </h2>
            <p className={styles.formGroupDescription}>{s.supporting.description}</p>

            <ul className={styles.supportingTypes}>
              {s.supporting.documentTypes.map((documentType) => (
                <li key={documentType}>
                  <span aria-hidden="true">✓</span>
                  {documentType}
                </li>
              ))}
            </ul>
            <TextAreaField
              id={`${idPrefix}-additional-information`}
              label={s.supporting.additionalInformation}
              onChange={setAdditionalInformation}
              value={additionalInformation}
            />
          </div>

          {/* Declaration + submit */}
          <div className={styles.declarationRow}>
            <label className={styles.declarationLabel}>
              <input
                aria-describedby={errors.declaration ? `${idPrefix}-declaration-error` : undefined}
                checked={declarationAccepted}
                onChange={(event) => setDeclarationAccepted(event.target.checked)}
                type="checkbox"
              />
              {content.declaration.statement}
            </label>
            {errors.declaration ? (
              <p className={styles.fieldError} id={`${idPrefix}-declaration-error`} role="alert">
                {errors.declaration}
              </p>
            ) : null}
          </div>

          {status === "error" ? (
            <div className={styles.formError} role="alert">
              <p className={styles.formErrorTitle}>{content.submit.errorTitle}</p>
              <p>{content.submit.errorBody}</p>
            </div>
          ) : null}

          {status === "success" ? (
            <div className={styles.formSuccess} role="status">
              <span aria-hidden="true">✓</span>
              <p>{content.submit.successMessage}</p>
            </div>
          ) : null}

          <div className={styles.submitRow}>
            <button
              className={styles.submitButton}
              disabled={status === "submitting" || status === "success"}
              type="submit"
            >
              {status === "submitting" ? content.submit.sendingLabel : content.submit.sendLabel}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
