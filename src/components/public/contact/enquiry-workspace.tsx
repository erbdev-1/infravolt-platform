"use client";

import { useId, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import type { MarketCode } from "@/modules/markets/types";
import { submitEnquiry, type EnquiryDraft } from "@/modules/enquiry/draft";
import { useEnquiryItems } from "@/modules/enquiry/store";
import { enquirySystemLabelsForMarket, type EnquirySourceContext, type EnquiryType } from "@/modules/enquiry/types";
import type { ContactPageContent } from "@/modules/public-site/contact-content";

import { EnquiryTypeSelector } from "./enquiry-type-selector";
import { FileUploadField } from "./file-upload-field";
import { SelectedProductsPanel } from "./selected-products-panel";
import styles from "./contact-page.module.css";

type FieldErrors = Partial<Record<string, string>>;
type Status = "idle" | "submitting" | "error";

function TextField({
  id,
  label,
  value,
  onChange,
  required,
  error,
  type = "text",
  placeholder,
}: Readonly<{
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  type?: string;
  placeholder?: string;
}>) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel} htmlFor={id}>
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        aria-describedby={error ? `${id}-error` : undefined}
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
  placeholder,
}: Readonly<{
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
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
        placeholder={placeholder}
        rows={5}
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
}: Readonly<{
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
  placeholder: string;
}>) {
  return (
    <div className={styles.field}>
      <label className={styles.fieldLabel} htmlFor={id}>
        {label}
      </label>
      <div className={styles.selectShell}>
        <select
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
    </div>
  );
}

function CheckboxGroup({
  legend,
  options,
  values,
  onToggle,
}: Readonly<{
  legend: string;
  options: readonly string[];
  values: readonly string[];
  onToggle: (option: string) => void;
}>) {
  return (
    <fieldset className={styles.checkboxGroup}>
      <legend className={styles.fieldLabel}>{legend}</legend>
      <div className={styles.checkboxGrid}>
        {options.map((option) => {
          const checked = values.includes(option);
          return (
            <label className={checked ? styles.checkboxOptionActive : styles.checkboxOption} key={option}>
              <input checked={checked} onChange={() => onToggle(option)} type="checkbox" />
              {option}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function toggleValue(values: readonly string[], value: string): readonly string[] {
  return values.includes(value) ? values.filter((existing) => existing !== value) : [...values, value];
}

export function EnquiryWorkspace({
  content,
  market,
  initialType,
  initialContext,
}: Readonly<{
  content: ContactPageContent;
  market: MarketCode;
  initialType: EnquiryType;
  initialContext: EnquirySourceContext;
}>) {
  const idPrefix = useId();
  const enquiryItems = useEnquiryItems();
  const systemOptions = enquirySystemLabelsForMarket(market).map((system) => ({ value: system.key, label: system.label }));

  const [type, setType] = useState<EnquiryType>(initialType);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [productSystem, setProductSystem] = useState(initialContext.system ?? "");
  const [productSeries, setProductSeries] = useState(initialContext.label ?? "");
  const [modelCode, setModelCode] = useState(initialContext.model ?? "");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectStage, setProjectStage] = useState("");
  const [estimatedQuantity, setEstimatedQuantity] = useState("");
  const [requiredDate, setRequiredDate] = useState("");
  const [interestedSystems, setInterestedSystems] = useState<readonly string[]>([]);
  const [informationRequired, setInformationRequired] = useState<readonly string[]>([]);
  const [documentRequired, setDocumentRequired] = useState<readonly string[]>([]);
  const [files, setFiles] = useState<readonly File[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  const hasApplicationMapContext = Boolean(
    initialContext.industry || initialContext.zone || initialContext.hotspot,
  );
  const showContext =
    Boolean(
      initialContext.system ||
        initialContext.label ||
        initialContext.industryLabel ||
        initialContext.zoneLabel,
    ) &&
    (hasApplicationMapContext || enquiryItems.length === 0);
  const activeTypeLabel = content.typeOptions.find((option) => option.id === type)?.label ?? content.typeOptions[0].label;
  const showAttachments = type === "product" || type === "quote" || type === "technical" || type === "project";
  const usesProductContext = type === "product" || type === "quote" || type === "technical" || type === "technical-document";
  const hasSelectedProductContext = usesProductContext && enquiryItems.length > 0;

  function resetForm() {
    setFirstName("");
    setLastName("");
    setCompany("");
    setJobTitle("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
    setProjectName("");
    setProjectLocation("");
    setProjectType("");
    setProjectStage("");
    setEstimatedQuantity("");
    setRequiredDate("");
    setInterestedSystems([]);
    setInformationRequired([]);
    setDocumentRequired([]);
    setFiles([]);
    setErrors({});
    setStatus("idle");
  }

  function validate(): FieldErrors {
    const nextErrors: FieldErrors = {};
    if (!firstName.trim()) nextErrors.firstName = content.fields.firstName;
    if (!lastName.trim()) nextErrors.lastName = content.fields.lastName;
    if (!company.trim()) nextErrors.company = content.fields.company;
    if (!jobTitle.trim()) nextErrors.jobTitle = content.fields.jobTitle;
    if (!email.trim()) nextErrors.email = content.fields.workEmail;
    if (type === "general" && !subject.trim()) nextErrors.subject = content.fields.subject;
    if (type === "product" && enquiryItems.length === 0) {
      nextErrors.selectedProducts = market === "ua" ? "Додайте принаймні один продукт до запиту." : "Add at least one product to your enquiry.";
    }
    if (!message.trim() && (type === "general" || type === "product" || type === "quote" || type === "project")) {
      nextErrors.message = content.fields.message;
    }
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");

    const draft: EnquiryDraft = {
      type,
      market,
      contact: { firstName, lastName, company, jobTitle, email, phone },
      project: {
        projectName,
        projectLocation,
        projectType,
        projectStage,
        estimatedQuantity: hasSelectedProductContext ? "" : estimatedQuantity,
        requiredDate,
        interestedSystems,
      },
      technical: {
        productSystem: hasSelectedProductContext ? "" : productSystem,
        productSeries: hasSelectedProductContext ? "" : productSeries,
        modelCode: hasSelectedProductContext ? "" : modelCode,
        informationRequired,
        documentsRequired: documentRequired,
      },
      selectedItems: enquiryItems,
      attachmentNames: files.map((file) => file.name),
      message,
      sourceContext: initialContext,
    };

    const result = await submitEnquiry(draft);
    if (!result.ok) {
      setStatus("error");
      return;
    }
    setStatus("idle");
  }

  return (
    <div className={styles.workspace}>
      <section aria-labelledby={`${idPrefix}-type-heading`}>
        <h2 className={styles.typeSectionHeading} id={`${idPrefix}-type-heading`}>
          {content.typeSectionHeading}
        </h2>
        <EnquiryTypeSelector active={type} onSelect={setType} options={content.typeOptions} />
      </section>

      {showContext ? (
        <div className={styles.contextSummary}>
          <p className={styles.contextSummaryHeading}>{activeTypeLabel}</p>
          <dl>
            {initialContext.system ? (
              <div>
                <dt>{content.selectedProducts.contextSystemLabel}</dt>
                <dd>{systemOptions.find((option) => option.value === initialContext.system)?.label}</dd>
              </div>
            ) : null}
            {initialContext.industryLabel ? (
              <div>
                <dt>{content.selectedProducts.contextIndustryLabel}</dt>
                <dd>{initialContext.industryLabel}</dd>
              </div>
            ) : null}
            {initialContext.zoneLabel ? (
              <div>
                <dt>{content.selectedProducts.contextApplicationLabel}</dt>
                <dd>{initialContext.zoneLabel}</dd>
              </div>
            ) : null}
            {initialContext.label ? (
              <div>
                <dt>{content.selectedProducts.contextLabel}</dt>
                <dd>{initialContext.label}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      ) : null}

      {usesProductContext ? <SelectedProductsPanel content={content} market={market} /> : null}
      {usesProductContext && enquiryItems.length === 0 && errors.selectedProducts ? (
        <p className={styles.selectedProductsValidation} role="alert">{errors.selectedProducts}</p>
      ) : null}

      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <h3 className={styles.formGroupHeading}>
            <span className={styles.formGroupNumber}>01</span>
            {content.fields.sectionContactHeading}
          </h3>
          <div className={styles.fieldRow}>
            <TextField
              error={errors.firstName}
              id={`${idPrefix}-first-name`}
              label={content.fields.firstName}
              onChange={setFirstName}
              required
              value={firstName}
            />
            <TextField
              error={errors.lastName}
              id={`${idPrefix}-last-name`}
              label={content.fields.lastName}
              onChange={setLastName}
              required
              value={lastName}
            />
          </div>
          <div className={styles.fieldRow}>
            <TextField
              error={errors.company}
              id={`${idPrefix}-company`}
              label={content.fields.company}
              onChange={setCompany}
              required
              value={company}
            />
            <TextField
              error={errors.jobTitle}
              id={`${idPrefix}-job-title`}
              label={content.fields.jobTitle}
              onChange={setJobTitle}
              placeholder={content.fields.jobTitlePlaceholder}
              required
              value={jobTitle}
            />
          </div>
          <div className={styles.fieldRow}>
            <TextField
              error={errors.email}
              id={`${idPrefix}-email`}
              label={content.fields.workEmail}
              onChange={setEmail}
              required
              type="email"
              value={email}
            />
            <TextField
              id={`${idPrefix}-phone`}
              label={content.fields.phone}
              onChange={setPhone}
              type="tel"
              value={phone}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <h3 className={styles.formGroupHeading}>
            <span className={styles.formGroupNumber}>02</span>
            {content.fields.sectionEnquiryHeading}
          </h3>

          {usesProductContext && type !== "product" && !hasSelectedProductContext && (
            <div className={styles.fieldRow}>
              <SelectField
                id={`${idPrefix}-product-system`}
                label={content.fields.productSystem}
                onChange={setProductSystem}
                options={systemOptions}
                placeholder={content.fields.selectPlaceholder}
                value={productSystem}
              />
              <TextField
                id={`${idPrefix}-product-series`}
                label={content.fields.productSeries}
                onChange={setProductSeries}
                value={productSeries}
              />
            </div>
          )}

          {type === "technical" && !hasSelectedProductContext && (
            <TextField id={`${idPrefix}-model-code`} label={content.fields.modelCode} onChange={setModelCode} value={modelCode} />
          )}

          {type === "product" && (
            <>
              <div className={styles.fieldRow}>
                <TextField
                  id={`${idPrefix}-product-project-name`}
                  label={content.fields.projectName}
                  onChange={setProjectName}
                  value={projectName}
                />
                <TextField
                  id={`${idPrefix}-product-project-location`}
                  label={content.fields.projectLocation}
                  onChange={setProjectLocation}
                  value={projectLocation}
                />
              </div>
              <TextAreaField
                error={errors.message}
                id={`${idPrefix}-requirement`}
                label={content.fields.requirement}
                onChange={setMessage}
                required
                value={message}
              />
            </>
          )}

          {type === "quote" && (
            <>
              <div className={styles.fieldRow}>
                <TextField
                  id={`${idPrefix}-project-name`}
                  label={content.fields.projectName}
                  onChange={setProjectName}
                  value={projectName}
                />
                <TextField
                  id={`${idPrefix}-project-location`}
                  label={content.fields.projectLocation}
                  onChange={setProjectLocation}
                  value={projectLocation}
                />
              </div>
              <div className={styles.fieldRow}>
                {!hasSelectedProductContext ? (
                  <TextField
                    id={`${idPrefix}-quantity`}
                    label={content.fields.estimatedQuantity}
                    onChange={setEstimatedQuantity}
                    value={estimatedQuantity}
                  />
                ) : null}
                <TextField
                  id={`${idPrefix}-required-date`}
                  label={content.fields.requiredDate}
                  onChange={setRequiredDate}
                  type="date"
                  value={requiredDate}
                />
              </div>
              <TextAreaField
                error={errors.message}
                id={`${idPrefix}-quote-requirement`}
                label={content.fields.requirement}
                onChange={setMessage}
                required
                value={message}
              />
            </>
          )}

          {type === "technical" && (
            <>
              <CheckboxGroup
                legend={content.fields.informationRequired}
                onToggle={(option) => setInformationRequired((current) => toggleValue(current, option))}
                options={content.fields.informationRequiredOptions}
                values={informationRequired}
              />
              <TextAreaField id={`${idPrefix}-technical-message`} label={content.fields.message} onChange={setMessage} value={message} />
            </>
          )}

          {type === "technical-document" && (
            <>
              <CheckboxGroup
                legend={content.fields.documentRequired}
                onToggle={(option) => setDocumentRequired((current) => toggleValue(current, option))}
                options={content.fields.documentRequiredOptions}
                values={documentRequired}
              />
              <TextAreaField
                id={`${idPrefix}-document-message`}
                label={content.fields.additionalInformation}
                onChange={setMessage}
                value={message}
              />
            </>
          )}

          {type === "project" && (
            <>
              <div className={styles.fieldRow}>
                <TextField
                  id={`${idPrefix}-project-name-2`}
                  label={content.fields.projectName}
                  onChange={setProjectName}
                  value={projectName}
                />
                <TextField
                  id={`${idPrefix}-project-location-2`}
                  label={content.fields.projectLocation}
                  onChange={setProjectLocation}
                  value={projectLocation}
                />
              </div>
              <div className={styles.fieldRow}>
                <SelectField
                  id={`${idPrefix}-project-type`}
                  label={content.fields.projectType}
                  onChange={setProjectType}
                  options={content.fields.projectTypeOptions.map((option) => ({ value: option, label: option }))}
                  placeholder={content.fields.selectPlaceholder}
                  value={projectType}
                />
                <SelectField
                  id={`${idPrefix}-project-stage`}
                  label={content.fields.projectStage}
                  onChange={setProjectStage}
                  options={content.fields.projectStageOptions.map((option) => ({ value: option, label: option }))}
                  placeholder={content.fields.selectPlaceholder}
                  value={projectStage}
                />
              </div>
              <CheckboxGroup
                legend={content.fields.interestedSystems}
                onToggle={(option) => setInterestedSystems((current) => toggleValue(current, option))}
                options={systemOptions.map((option) => option.label)}
                values={interestedSystems}
              />
              <TextAreaField
                error={errors.message}
                id={`${idPrefix}-project-requirement`}
                label={content.fields.requirement}
                onChange={setMessage}
                required
                value={message}
              />
            </>
          )}

          {type === "general" && (
            <>
              <TextField error={errors.subject} id={`${idPrefix}-subject`} label={content.fields.subject} onChange={setSubject} required value={subject} />
              <TextAreaField
                error={errors.message}
                id={`${idPrefix}-general-message`}
                label={content.fields.message}
                onChange={setMessage}
                required
                value={message}
              />
            </>
          )}
        </div>

        {showAttachments ? (
          <div className={styles.formGroup}>
            <h3 className={styles.formGroupHeading}>
              <span className={styles.formGroupNumber}>03</span>
              {content.fields.sectionAttachmentsHeading}
            </h3>
            <FileUploadField content={content} files={files} onFilesChange={setFiles} />
          </div>
        ) : null}

        {status === "error" ? (
          <div className={styles.formError} role="alert">
            <p className={styles.formErrorTitle}>{content.submit.errorTitle}</p>
            <p>{content.submit.errorBody}</p>
          </div>
        ) : null}

        <div className={styles.submitRow}>
          <button className={styles.submitButton} disabled={status === "submitting"} type="submit">
            {status === "submitting" ? content.submit.sendingLabel : content.submit.sendLabel}
          </button>
          <button className={styles.resetButton} onClick={resetForm} type="button">
            {content.submit.resetLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
