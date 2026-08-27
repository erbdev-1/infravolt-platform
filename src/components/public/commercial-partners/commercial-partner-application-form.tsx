"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import {
  submitCommercialPartnerApplication,
  type CommercialPartnerApplicationDraft,
} from "@/modules/enquiry/commercial-partner-application";
import { sendCommercialPartnerApplicationEmails } from "@/modules/enquiry/commercial-partner-email";
import type { MarketCode } from "@/modules/markets/types";
import type { CommercialPartnersContent } from "@/modules/public-site/commercial-partners-content";

import styles from "./commercial-partners-page.module.css";

type Option = Readonly<{ value: string; label: string }>;
type FieldErrors = Partial<Record<string, string>>;
type Status = "idle" | "submitting" | "success" | "error";
type SuccessSnapshot = Readonly<{ referenceNo: string; companyName: string }>;

// InfraVolt is the distributor / market partner for its own markets — an
// applicant is never offered that role back. This table is the single
// source of truth for which Partnership Interest options a given Business
// Type may see; the content module only carries the full translated
// catalogue (partnershipInterestOptions), never a per-business-type subset,
// so the business rule lives in exactly one place regardless of market.
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
        <p className={styles.fieldError} id={`${id}-error`} role="alert">
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
  helper,
}: Readonly<{
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  helper?: string;
}>) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel} htmlFor={id}>
        {label}
      </label>
      {helper ? (
        <p className={styles.fieldHelper} id={`${id}-helper`}>
          {helper}
        </p>
      ) : null}
      <textarea
        aria-describedby={helper ? `${id}-helper` : undefined}
        className={styles.fieldTextarea}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
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
        <p className={styles.fieldError} id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function TileGroup({
  legend,
  helper,
  options,
  values,
  onToggle,
  error,
  required,
}: Readonly<{
  legend: string;
  helper?: string;
  options: readonly string[];
  values: readonly string[];
  onToggle: (option: string) => void;
  error?: string;
  required?: boolean;
}>) {
  return (
    <fieldset className={styles.checkboxGroup}>
      <legend className={styles.fieldLabel}>
        {legend}
        {required ? <span aria-hidden="true"> *</span> : null}
      </legend>
      {helper ? <p className={styles.fieldHelper}>{helper}</p> : null}
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

function toggle(list: readonly string[], value: string, setter: (next: readonly string[]) => void) {
  setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
}

export function CommercialPartnerApplicationForm({
  content,
  market,
}: Readonly<{
  content: CommercialPartnersContent;
  market: MarketCode;
}>) {
  const idPrefix = useId();
  const s = content.sections;
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");
  const [yearsTrading, setYearsTrading] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [partnershipInterest, setPartnershipInterest] = useState("");
  const [coverageRegions, setCoverageRegions] = useState<readonly string[]>([]);
  const [territoryType, setTerritoryType] = useState("");
  const [requestedRegions, setRequestedRegions] = useState<readonly string[]>([]);
  const [requestedCities, setRequestedCities] = useState("");
  const [industryInterests, setIndustryInterests] = useState<readonly string[]>([]);
  const [productSystemInterests, setProductSystemInterests] = useState<readonly string[]>([]);
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [commercialRequirements, setCommercialRequirements] = useState("");
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [successSnapshot, setSuccessSnapshot] = useState<SuccessSnapshot | null>(null);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  // Partnership Interest is dynamic per Business Type (see
  // PARTNERSHIP_INTEREST_GROUPS) — if the newly chosen Business Type no
  // longer allows the currently selected Partnership Interest, it is
  // cleared rather than silently retained as a hidden invalid value.
  function handleBusinessTypeChange(value: string) {
    setBusinessType(value);
    const allowed = new Set(PARTNERSHIP_INTEREST_GROUPS[value] ?? []);
    setPartnershipInterest((current) => (allowed.has(current) ? current : ""));
  }

  const partnershipInterestOptions = partnershipInterestOptionsFor(
    businessType,
    s.businessProfile.partnershipInterestOptions,
  );

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    const required = content.submit.requiredFieldError;
    if (!companyName.trim()) next.companyName = required;
    if (!businessType) next.businessType = required;
    if (!partnershipInterest) next.partnershipInterest = required;
    if (coverageRegions.length === 0) next.coverageRegions = required;
    if (!territoryType) next.territoryType = required;
    if (productSystemInterests.length === 0) next.productSystemInterests = required;
    if (!fullName.trim()) next.fullName = required;
    if (!jobTitle.trim()) next.jobTitle = required;
    if (!workEmail.trim()) next.workEmail = required;
    if (!phone.trim()) next.phone = required;
    if (!declarationAccepted) next.declaration = content.submit.declarationError;
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");

    const draft: CommercialPartnerApplicationDraft = {
      type: "commercial-partner",
      market,
      companyName,
      website,
      companyLocation,
      yearsTrading,
      businessType,
      partnershipInterest,
      contactName: fullName,
      jobTitle,
      email: workEmail,
      phone,
      currentSalesServiceCoverage: coverageRegions,
      requestedDealershipTerritory: {
        scale: territoryType,
        regions: requestedRegions,
        cities: requestedCities,
      },
      productSystemInterests,
      industryInterests,
      commercialRequirements,
      declarationAccepted,
      sourcePath: "/commercial-partners",
    };

    const result = await submitCommercialPartnerApplication(draft);
    if (!result.ok) {
      setStatus("error");
      return;
    }

    // Best-effort: never blocks the success screen below. The application
    // is already saved and pending review regardless of whether either
    // email sends.
    try {
      await sendCommercialPartnerApplicationEmails(draft, result.referenceNo);
    } catch {
      // Application is already saved; a failed email send is not reported to the user.
    }

    setSuccessSnapshot({ referenceNo: result.referenceNo, companyName });
    setStatus("success");
  }

  if (status === "success" && successSnapshot) {
    return (
      <section className={styles.formSection} id="apply">
        <div className={styles.successShell}>
          <div aria-live="polite" className={styles.successPanel} role="status">
            <h3 ref={successHeadingRef} tabIndex={-1}>
              {content.submit.successTitle}
            </h3>
            <p>{content.submit.successMessage}</p>
            <dl className={styles.successSummary}>
              <div>
                <dt>{content.submit.successReferenceLabel}</dt>
                <dd>{successSnapshot.referenceNo}</dd>
              </div>
              <div>
                <dt>{s.company.companyNameLabel}</dt>
                <dd>{successSnapshot.companyName}</dd>
              </div>
            </dl>
            <p className={styles.fieldHelper}>{content.submit.successAppointmentNotice}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.formSection} id="apply">
      <div className={styles.formShell}>
        <aside className={styles.formGuide}>
          <p className={styles.formGuideHeading}>{content.guide.heading}</p>
          <ol className={styles.formGuideSteps}>
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

        <form className={styles.form} noValidate onSubmit={handleSubmit}>
          {/* 01 — Company */}
          <div className={styles.formGroup}>
            <h2 className={styles.formGroupHeading}>
              <span className={styles.formGroupNumber}>{s.company.number}</span>
              {s.company.title}
            </h2>
            <p className={styles.formGroupDescription}>{s.company.description}</p>

            <div className={styles.fieldRow}>
              <TextField
                error={errors.companyName}
                id={`${idPrefix}-company-name`}
                label={s.company.companyNameLabel}
                onChange={setCompanyName}
                required
                value={companyName}
              />
              <TextField
                id={`${idPrefix}-website`}
                label={s.company.websiteLabel}
                onChange={setWebsite}
                type="url"
                value={website}
              />
            </div>
            <div className={styles.fieldRow}>
              <TextField
                id={`${idPrefix}-company-location`}
                label={s.company.companyLocationLabel}
                onChange={setCompanyLocation}
                placeholder={s.company.companyLocationPlaceholder}
                value={companyLocation}
              />
              <TextField
                helper={s.company.yearsTradingHelper}
                id={`${idPrefix}-years-trading`}
                label={s.company.yearsTradingLabel}
                onChange={setYearsTrading}
                value={yearsTrading}
              />
            </div>
          </div>

          {/* 02 — Business profile */}
          <div className={styles.formGroup}>
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
                onChange={setPartnershipInterest}
                options={partnershipInterestOptions}
                placeholder={content.selectPlaceholder}
                required
                value={partnershipInterest}
              />
            </div>

            <TileGroup
              error={errors.coverageRegions}
              helper={s.businessProfile.coverageHelper}
              legend={s.businessProfile.coverageLabel}
              onToggle={(option) => toggle(coverageRegions, option, setCoverageRegions)}
              options={s.businessProfile.coverageOptions}
              required
              values={coverageRegions}
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
              <TileGroup
                legend={s.businessProfile.requestedRegionsLabel}
                onToggle={(option) => toggle(requestedRegions, option, setRequestedRegions)}
                options={s.businessProfile.requestedRegionsOptions}
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

            <TileGroup
              legend={s.businessProfile.industriesLabel}
              onToggle={(option) => toggle(industryInterests, option, setIndustryInterests)}
              options={s.businessProfile.industriesOptions}
              values={industryInterests}
            />
          </div>

          {/* Product systems */}
          <div className={styles.formGroup}>
            <h2 className={styles.formGroupHeading}>
              <span className={styles.formGroupNumber}>{s.productSystems.number}</span>
              {s.productSystems.title}
            </h2>
            <p className={styles.formGroupDescription}>{s.productSystems.description}</p>
            <TileGroup
              error={errors.productSystemInterests}
              legend={s.productSystems.title}
              onToggle={(option) => toggle(productSystemInterests, option, setProductSystemInterests)}
              options={s.productSystems.options}
              required
              values={productSystemInterests}
            />
          </div>

          {/* 03 — Contact */}
          <div className={styles.formGroup}>
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
                onChange={setFullName}
                required
                value={fullName}
              />
              <TextField
                error={errors.jobTitle}
                id={`${idPrefix}-job-title`}
                label={s.contact.jobTitle}
                onChange={setJobTitle}
                required
                value={jobTitle}
              />
            </div>
            <div className={styles.fieldRow}>
              <TextField
                error={errors.workEmail}
                id={`${idPrefix}-work-email`}
                label={s.contact.workEmail}
                onChange={setWorkEmail}
                required
                type="email"
                value={workEmail}
              />
              <TextField
                error={errors.phone}
                id={`${idPrefix}-phone`}
                label={s.contact.phone}
                onChange={setPhone}
                required
                type="tel"
                value={phone}
              />
            </div>
          </div>

          {/* 04 — Commercial requirements */}
          <div className={styles.formGroup}>
            <h2 className={styles.formGroupHeading}>
              <span className={styles.formGroupNumber}>{s.commercial.number}</span>
              {s.commercial.title}
            </h2>
            <p className={styles.formGroupDescription}>{s.commercial.description}</p>
            <TextAreaField
              helper={s.commercial.requirementsHelper}
              id={`${idPrefix}-commercial-requirements`}
              label={s.commercial.requirementsLabel}
              onChange={setCommercialRequirements}
              value={commercialRequirements}
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

          <div className={styles.submitRow}>
            <button className={styles.submitButton} disabled={status === "submitting"} type="submit">
              {status === "submitting" ? content.submit.sendingLabel : content.submit.sendLabel}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
