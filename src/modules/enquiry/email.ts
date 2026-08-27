"use server";

import { headers } from "next/headers";

import { resolveTrustedMarketContext } from "@/modules/markets/server";
import type { MarketCode } from "@/modules/markets/types";
import { publicMediaUrl } from "@/modules/storage/asset-url";

import type { EnquiryDraft } from "./draft";
import { cleanText, formatCompanyName, formatEnquiryType, formatJobTitle, formatMarket, formatPersonName, trimOnly } from "./display-format";
import { enquirySystemLabel } from "./types";

/**
 * Contact enquiry email layer, invoked by submitEnquiry() after persistence.
 * Next.js excludes this whole module from the client bundle, so RESEND_API_KEY
 * and SUPABASE_SECRET_KEY never reach the browser.
 *
 * Attachment state is read fresh from the database (via the
 * list_enquiry_attachments_for_email RPC), not trusted from the caller —
 * that's what makes the "clean-only download" rule enforceable: no
 * download URL is ever minted without first re-confirming scan_status =
 * 'clean' AND enquiry ownership via get_clean_attachment_for_download
 * (see supabase/migrations/20260823120000_enquiry_attachment_scan_state.sql).
 * pending/infected/scan_failed attachments are listed with a status
 * message but never a signed link — there is no code path in this file
 * that signs anything but a clean attachment.
 *
 * Uses the Resend HTTP API directly (no SDK dependency, matching this
 * codebase's existing pattern for external services — see
 * src/modules/storage/asset-url.ts). Inert by design when
 * RESEND_API_KEY / EMAIL_FROM_UK/UA and EMAIL_REPLY_TO_UK/UA aren't
 * configured. Missing configuration is logged server-side and sending stays
 * best-effort, so a saved enquiry never becomes a failed form submission.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

// B2B/engineering palette for the internal notification email.
const NAVY = "#0b2545";
const BORDER = "#dde1e7";
const MUTED = "#667085";
const TEXT = "#1f2937";
const PANEL_BG = "#f8f9fb";

type MarketEmailConfig = Readonly<{ from: string; replyTo: string }>;

function marketEmailConfig(market: MarketCode): MarketEmailConfig | undefined {
  const from = (market === "uk" ? process.env.EMAIL_FROM_UK : process.env.EMAIL_FROM_UA)?.trim();
  const replyTo = (market === "uk" ? process.env.EMAIL_REPLY_TO_UK : process.env.EMAIL_REPLY_TO_UA)?.trim();
  if (!from || !replyTo) return undefined;
  return { from, replyTo };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendViaResend(
  apiKey: string,
  payload: Readonly<{ from: string; to: string; replyTo?: string; subject: string; html: string; text?: string }>,
): Promise<boolean> {
  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: payload.from,
        to: [payload.to],
        reply_to: payload.replyTo,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error("sendEnquiryEmails: Resend request failed", response.status, body.slice(0, 500));
      return false;
    }

    return true;
  } catch (error) {
    console.error("sendEnquiryEmails: Resend request threw", error);
    return false;
  }
}

const ATTACHMENT_BUCKET = "private-enquiry-attachments";
const ATTACHMENT_LINK_EXPIRY_SECONDS = 7 * 24 * 60 * 60; // 7 days

type ScanStatus = "pending" | "clean" | "infected" | "scan_failed";

function isScanStatus(value: unknown): value is ScanStatus {
  return value === "pending" || value === "clean" || value === "infected" || value === "scan_failed";
}

type AttachmentEmailRow = Readonly<{
  fileName: string;
  contentType: string;
  sizeBytes: number;
  scanStatus: ScanStatus;
  /** Only ever set for scanStatus === "clean" — see mintCleanAttachmentDownloadUrl. */
  downloadUrl?: string;
}>;

function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * The single centralized authorization gate for attachment downloads. Two
 * independent checks must both pass before any signed URL is ever minted:
 * (1) the get_clean_attachment_for_download RPC — a SECURITY DEFINER
 * query that returns a row ONLY if the object belongs to this enquiry
 * reference and scan_status = 'clean' in the database right now (never
 * trusts a status the caller believes is current); (2) the Storage sign
 * request itself. There is no other function in this codebase that signs
 * a download URL for an enquiry attachment — do not add one that bypasses
 * this check.
 */
async function mintCleanAttachmentDownloadUrl(
  supabaseUrl: string,
  secretKey: string,
  referenceNo: string,
  objectPath: string,
): Promise<string | undefined> {
  try {
    const authResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/get_clean_attachment_for_download`, {
      method: "POST",
      headers: {
        apikey: secretKey,
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ p_reference_no: referenceNo, p_storage_object_path: objectPath }),
    });

    if (!authResponse.ok) {
      const body = await authResponse.text().catch(() => "");
      console.error("mintCleanAttachmentDownloadUrl: authorization check failed", authResponse.status, body.slice(0, 300));
      return undefined;
    }

    const authRows: unknown = await authResponse.json();
    if (!Array.isArray(authRows) || authRows.length === 0) {
      return undefined;
    }
  } catch (error) {
    console.error("mintCleanAttachmentDownloadUrl: authorization check threw", error);
    return undefined;
  }

  try {
    const response = await fetch(`${supabaseUrl}/storage/v1/object/sign/${ATTACHMENT_BUCKET}/${objectPath}`, {
      method: "POST",
      headers: {
        apikey: secretKey,
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expiresIn: ATTACHMENT_LINK_EXPIRY_SECONDS }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error("mintCleanAttachmentDownloadUrl: sign request failed", response.status, body.slice(0, 300));
      return undefined;
    }

    const parsed: unknown = await response.json();
    const relativeUrl =
      parsed && typeof parsed === "object" && "signedURL" in parsed && typeof parsed.signedURL === "string"
        ? parsed.signedURL
        : undefined;
    if (!relativeUrl) {
      console.error("mintCleanAttachmentDownloadUrl: unexpected sign response shape");
      return undefined;
    }

    return `${supabaseUrl}/storage/v1${relativeUrl}`;
  } catch (error) {
    console.error("mintCleanAttachmentDownloadUrl: threw", error);
    return undefined;
  }
}

type ListedAttachmentRow = Readonly<{
  file_name: string;
  storage_object_path: string;
  content_type: string | null;
  size_bytes: number | null;
  scan_status: string;
}>;

/**
 * Reads every attachment for this enquiry straight from the database (the
 * real stored scan result, not client-supplied state), then mints a
 * download URL only for the ones scan_status = 'clean' right now.
 * pending/infected/scan_failed attachments are still listed — the
 * internal email needs to show their status — just never with a link.
 */
async function resolveAttachmentRows(
  supabaseUrl: string,
  secretKey: string,
  referenceNo: string,
): Promise<readonly AttachmentEmailRow[]> {
  let listed: readonly ListedAttachmentRow[] = [];

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/list_enquiry_attachments_for_email`, {
      method: "POST",
      headers: {
        apikey: secretKey,
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ p_reference_no: referenceNo }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error("resolveAttachmentRows: list request failed", response.status, body.slice(0, 300));
      return [];
    }

    const parsed: unknown = await response.json();
    if (!Array.isArray(parsed)) {
      console.error("resolveAttachmentRows: unexpected list response shape");
      return [];
    }
    listed = parsed as ListedAttachmentRow[];
  } catch (error) {
    console.error("resolveAttachmentRows: threw", error);
    return [];
  }

  return Promise.all(
    listed.map(async (row): Promise<AttachmentEmailRow> => {
      const scanStatus = isScanStatus(row.scan_status) ? row.scan_status : "pending";
      const downloadUrl =
        scanStatus === "clean"
          ? await mintCleanAttachmentDownloadUrl(supabaseUrl, secretKey, referenceNo, row.storage_object_path)
          : undefined;
      return {
        fileName: cleanText(row.file_name),
        contentType: row.content_type ?? "",
        sizeBytes: row.size_bytes ?? 0,
        scanStatus,
        downloadUrl,
      };
    }),
  );
}

/** e.g. "our UK team" / "нашій команді в Україні" — matches the market the enquiry was submitted through. */
function marketTeamPhrase(market: MarketCode, ua: boolean): string {
  if (ua) return market === "ua" ? "команді InfraVolt в Україні" : "команді InfraVolt у Великій Британії";
  return market === "ua" ? "our Ukraine team" : "our UK team";
}

/** Absolute site origin (no trailing slash) for the logo and footer domain — undefined if unset. */
function siteOrigin(market: MarketCode): string | undefined {
  const raw = market === "uk" ? process.env.NEXT_PUBLIC_SITE_URL_UK : process.env.NEXT_PUBLIC_SITE_URL_UA;
  return raw ? raw.replace(/\/+$/, "") : undefined;
}

function siteHostname(market: MarketCode): string | undefined {
  const origin = siteOrigin(market);
  if (!origin) return undefined;
  try {
    return new URL(origin).hostname;
  } catch {
    return undefined;
  }
}

function absolutePublicMediaUrl(path: string): string | undefined {
  const resolved = publicMediaUrl(path);

  try {
    const url = new URL(resolved);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

function acknowledgementSubject(market: MarketCode, referenceNo: string): string {
  return market === "ua" ? `Запит отримано — ${referenceNo}` : `Enquiry Received — ${referenceNo}`;
}

function acknowledgementHtml(draft: EnquiryDraft, referenceNo: string): string {
  const ua = draft.market === "ua";
  const name = escapeHtml(formatPersonName(draft.contact.firstName, draft.contact.lastName));
  const enquiryTypeLabel = escapeHtml(formatEnquiryType(draft.type, draft.market));
  const marketLabel = escapeHtml(formatMarket(draft.market));
  const teamPhrase = marketTeamPhrase(draft.market, ua);
  const logoUrl = absolutePublicMediaUrl("brand/infravolt-wordmark-primary.webp");
  const hostname = siteHostname(draft.market);

  const logoHtml = logoUrl
    ? `<img src="${escapeHtml(logoUrl)}" alt="InfraVolt" width="160" style="display:block;height:auto;max-width:160px;border:0;outline:none;text-decoration:none;" />`
    : `<span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:0.02em;">InfraVolt</span>`;

  const summaryRows = [
    [ua ? "Номер запиту" : "Reference", `<strong>${escapeHtml(referenceNo)}</strong>`],
    [ua ? "Тип запиту" : "Enquiry Type", enquiryTypeLabel],
    [ua ? "Ринок" : "Market", marketLabel],
  ]
    .map(
      ([label, value]) => `<tr>
        <td style="padding:8px 12px;font-size:13px;color:${MUTED};width:38%;border:1px solid ${BORDER};vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:8px 12px;font-size:13px;color:${TEXT};border:1px solid ${BORDER};vertical-align:top;">${value}</td>
      </tr>`,
    )
    .join("");

  const greeting = ua ? `Вітаємо, ${name},` : `Hello ${name},`;
  const thanks = ua ? "Дякуємо за звернення до InfraVolt." : "Thank you for contacting InfraVolt.";
  const forwarded = ua
    ? `Ми отримали ваш запит, і його передано ${teamPhrase} для розгляду.`
    : `We have received your enquiry and it has been forwarded to ${teamPhrase} for review.`;
  const whatNextHeading = ua ? "Що далі?" : "What happens next?";
  const responseExpectation = ua
    ? "Наша команда розгляне ваш запит і прагне відповісти протягом 24–48 робочих годин."
    : "Our team will review your enquiry and aims to respond within 24–48 business hours.";
  const additionalInfoNote = ua
    ? "Якщо нам знадобиться додаткова технічна, комерційна чи проєктна інформація, представник нашої команди зв'яжеться з вами напряму."
    : "If we require any additional technical, commercial or project information, a member of our team will contact you directly.";
  const keepReference = ua
    ? `Будь ласка, збережіть номер запиту <strong>${escapeHtml(referenceNo)}</strong> для подальшого зв'язку щодо цього запиту.`
    : `Please keep your reference number <strong>${escapeHtml(referenceNo)}</strong> for any follow-up regarding this enquiry.`;
  const closingRegards = ua ? "З повагою," : "Kind regards,";
  const closingTeam = ua ? "Команда InfraVolt" : "InfraVolt Team";
  const closingTagline = ua ? "Системи електричної інфраструктури" : "Electrical Infrastructure Systems";
  const footerLine = ua
    ? "Це автоматичне підтвердження отримання вашого запиту."
    : "This is an automated acknowledgement confirming that your enquiry has been received.";

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(acknowledgementSubject(draft.market, referenceNo))}</title>
<style>
  @media only screen and (max-width: 640px) {
    .iv-ack-container { width: 100% !important; }
    .iv-ack-section { padding-left: 20px !important; padding-right: 20px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:#f2f4f7;font-family:Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f4f7;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" class="iv-ack-container" width="680" cellpadding="0" cellspacing="0" style="width:680px;max-width:680px;background-color:#ffffff;border:1px solid ${BORDER};">
          <tr>
            <td style="background-color:${NAVY};padding:24px 32px;">
              ${logoHtml}
              <p style="margin:14px 0 0;color:#ffffff;font-size:20px;font-weight:700;">${ua ? "Запит отримано" : "Enquiry Received"}</p>
            </td>
          </tr>
          <tr>
            <td class="iv-ack-section" style="padding:28px 32px 8px;">
              <p style="margin:0 0 14px;color:${TEXT};font-size:14px;line-height:1.6;">${greeting}</p>
              <p style="margin:0 0 14px;color:${TEXT};font-size:14px;line-height:1.6;">${thanks}</p>
              <p style="margin:0 0 20px;color:${TEXT};font-size:14px;line-height:1.6;">${forwarded}</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid ${BORDER};margin-bottom:22px;">
                ${summaryRows}
              </table>
              <p style="margin:0 0 8px;color:${NAVY};font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;">${whatNextHeading}</p>
              <p style="margin:0 0 12px;color:${TEXT};font-size:14px;line-height:1.6;">${responseExpectation}</p>
              <p style="margin:0 0 20px;color:${TEXT};font-size:14px;line-height:1.6;">${additionalInfoNote}</p>
              <p style="margin:0 0 24px;color:${TEXT};font-size:14px;line-height:1.6;">${keepReference}</p>
              <p style="margin:0;color:${TEXT};font-size:14px;line-height:1.6;">${closingRegards}<br/>${closingTeam}<br/>${closingTagline}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px;border-top:1px solid ${BORDER};">
              <p style="margin:0;color:${MUTED};font-size:12px;">${footerLine}</p>
              ${hostname ? `<p style="margin:4px 0 0;color:${MUTED};font-size:12px;">${escapeHtml(hostname)}</p>` : ""}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function acknowledgementText(draft: EnquiryDraft, referenceNo: string): string {
  const ua = draft.market === "ua";
  const name = formatPersonName(draft.contact.firstName, draft.contact.lastName);
  const enquiryTypeLabel = formatEnquiryType(draft.type, draft.market);
  const marketLabel = formatMarket(draft.market);
  const teamPhrase = marketTeamPhrase(draft.market, ua);

  const lines: string[] = [];
  lines.push(ua ? "ЗАПИТ ОТРИМАНО" : "ENQUIRY RECEIVED");
  lines.push("");
  lines.push(ua ? `Вітаємо, ${name},` : `Hello ${name},`);
  lines.push("");
  lines.push(ua ? "Дякуємо за звернення до InfraVolt." : "Thank you for contacting InfraVolt.");
  lines.push(
    ua
      ? `Ми отримали ваш запит, і його передано ${teamPhrase} для розгляду.`
      : `We have received your enquiry and it has been forwarded to ${teamPhrase} for review.`,
  );
  lines.push("");
  lines.push(`${ua ? "Номер запиту" : "Reference"}: ${referenceNo}`);
  lines.push(`${ua ? "Тип запиту" : "Enquiry Type"}: ${enquiryTypeLabel}`);
  lines.push(`${ua ? "Ринок" : "Market"}: ${marketLabel}`);
  lines.push("");
  lines.push(
    ua
      ? "Наша команда розгляне ваш запит і прагне відповісти протягом 24–48 робочих годин."
      : "Our team will review your enquiry and aims to respond within 24–48 business hours.",
  );
  lines.push(
    ua
      ? "Якщо нам знадобиться додаткова технічна, комерційна чи проєктна інформація, представник нашої команди зв'яжеться з вами напряму."
      : "If we require any additional technical, commercial or project information, a member of our team will contact you directly.",
  );
  lines.push(
    ua
      ? `Будь ласка, збережіть номер запиту ${referenceNo} для подальшого зв'язку щодо цього запиту.`
      : `Please keep your reference number ${referenceNo} for any follow-up regarding this enquiry.`,
  );
  lines.push("");
  lines.push(ua ? "З повагою," : "Kind regards,");
  lines.push(ua ? "Команда InfraVolt" : "InfraVolt Team");
  lines.push(ua ? "Системи електричної інфраструктури" : "Electrical Infrastructure Systems");
  lines.push("");
  lines.push(
    ua
      ? "Це автоматичне підтвердження отримання вашого запиту."
      : "This is an automated acknowledgement confirming that your enquiry has been received.",
  );

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Internal InfraVolt notification — HTML
// ---------------------------------------------------------------------------

function internalNotificationSubject(referenceNo: string, itemCount: number): string {
  return `New enquiry ${referenceNo}${itemCount > 0 ? ` (${itemCount} item${itemCount === 1 ? "" : "s"})` : ""}`;
}

function formatSubmittedAt(submittedAt: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(submittedAt) + " UTC";
}

/** A bordered card with a small navy uppercase heading — the internal email's basic building block. */
function card(heading: string, bodyHtml: string): string {
  return `
    <tr>
      <td style="padding:0 32px 20px;">
        <p style="margin:0 0 10px;color:${NAVY};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">${escapeHtml(heading)}</p>
        ${bodyHtml}
      </td>
    </tr>`;
}

/** Two-column label/value grid, fully bordered — used for the summary, contact, and project/product sections. */
function keyValueTable(rows: readonly (readonly [string, string])[]): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid ${BORDER};">
    ${rows
      .map(
        ([label, valueHtml]) => `<tr>
          <td style="padding:8px 12px;font-size:13px;color:${MUTED};width:38%;border:1px solid ${BORDER};vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;font-size:13px;color:${TEXT};border:1px solid ${BORDER};vertical-align:top;word-break:break-word;">${valueHtml}</td>
        </tr>`,
      )
      .join("")}
  </table>`;
}

/**
 * Only fields that actually have a value are included — never an empty
 * label/value row. Whitespace is normalised (trim + collapse) but casing
 * is left exactly as entered: these can hold technical identifiers
 * (model codes, standards) that must never be blindly title-cased.
 */
function projectProductDetailRows(draft: EnquiryDraft): readonly (readonly [string, string])[] {
  const rows: [string, string][] = [];
  const addIfPresent = (label: string, value: string) => {
    const cleaned = cleanText(value);
    if (cleaned.length > 0) rows.push([label, escapeHtml(cleaned)]);
  };
  const addListIfPresent = (label: string, values: readonly string[]) => {
    if (values.length > 0) rows.push([label, escapeHtml(values.map(cleanText).join(", "))]);
  };

  addIfPresent("Project Name", draft.project.projectName);
  addIfPresent("Project Location", draft.project.projectLocation);
  addIfPresent("Project Type", draft.project.projectType);
  addIfPresent("Project Stage", draft.project.projectStage);
  addIfPresent("Required Date", draft.project.requiredDate);
  addIfPresent("Estimated Quantity", draft.project.estimatedQuantity);
  addIfPresent("Product System", draft.technical.productSystem);
  addIfPresent("Product Series", draft.technical.productSeries);
  addIfPresent("Model Code", draft.technical.modelCode);
  addListIfPresent("Information Required", draft.technical.informationRequired);
  addListIfPresent("Documents Required", draft.technical.documentsRequired);

  return rows;
}

function basketTableHtml(draft: EnquiryDraft): string {
  if (draft.selectedItems.length === 0) {
    return `<p style="margin:0;color:${MUTED};font-size:13px;font-style:italic;">No products were added to this enquiry.</p>`;
  }

  const headerCell = (label: string) =>
    `<th align="left" style="padding:8px 10px;font-size:11px;color:${NAVY};text-transform:uppercase;letter-spacing:0.03em;background-color:${PANEL_BG};border:1px solid ${BORDER};">${escapeHtml(label)}</th>`;
  const dataCell = (value: string) =>
    `<td style="padding:8px 10px;font-size:13px;color:${TEXT};border:1px solid ${BORDER};word-break:break-word;">${value}</td>`;

  const rowsHtml = draft.selectedItems
    .map((item) => {
      const system = escapeHtml(enquirySystemLabel(item.system, draft.market));
      const model = item.model ? escapeHtml(item.model) : "&mdash;";
      const category = item.categoryLabel ? escapeHtml(item.categoryLabel) : "&mdash;";
      const quantity = item.quantity ? escapeHtml(item.quantity) : "&mdash;";
      return `<tr>${dataCell(escapeHtml(item.title))}${dataCell(system)}${dataCell(model)}${dataCell(category)}${dataCell(quantity)}</tr>`;
    })
    .join("");

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid ${BORDER};">
    <tr>${headerCell("Product")}${headerCell("System")}${headerCell("Model")}${headerCell("Category")}${headerCell("Qty")}</tr>
    ${rowsHtml}
  </table>`;
}

/**
 * The per-status line shown under each attachment's filename. Only a
 * "clean" row with a resolved downloadUrl ever renders a link — every
 * other status (pending/infected/scan_failed, or a clean row whose signed
 * URL could not be minted) renders a plain status message instead.
 */
function attachmentStatusHtml(row: AttachmentEmailRow): string {
  if (row.scanStatus === "clean" && row.downloadUrl) {
    return `<a href="${escapeHtml(row.downloadUrl)}" style="display:inline-block;font-size:12px;font-weight:700;color:${NAVY};text-decoration:underline;">Download attachment</a>
          <p style="margin:6px 0 0;font-size:11px;color:${MUTED};">This secure link expires in 7 days.</p>`;
  }
  if (row.scanStatus === "infected") {
    return `<p style="margin:0;font-size:12px;font-weight:700;color:#b42318;">Blocked by security scan</p>`;
  }
  if (row.scanStatus === "scan_failed") {
    return `<p style="margin:0;font-size:12px;font-weight:700;color:${MUTED};">Security scan could not be completed</p>`;
  }
  return `<p style="margin:0;font-size:12px;font-weight:700;color:${MUTED};">Security scan pending</p>`;
}

/**
 * Each attachment as a filename row plus its current status: a
 * "Download attachment" link only when scan_status = 'clean' (valid 7
 * days), otherwise a plain status message. No raw storage object path or
 * internal ID is ever rendered — only the link's href carries that, never
 * visible text.
 */
function attachmentsListHtml(rows: readonly AttachmentEmailRow[]): string {
  const rowsHtml = rows
    .map((row) => {
      // Escape each piece individually, then join with the entity — never
      // escape a string that already contains an HTML entity (escapeHtml
      // would turn "&middot;" into the literal text "&amp;middot;").
      const meta = [row.contentType, formatFileSize(row.sizeBytes)].filter(Boolean).map(escapeHtml).join(" &middot; ");
      return `<tr>
        <td style="padding:10px 0;border-bottom:1px solid ${BORDER};">
          <p style="margin:0 0 4px;font-size:13px;color:${TEXT};font-weight:600;word-break:break-word;">${escapeHtml(row.fileName)}</p>
          ${meta ? `<p style="margin:0 0 6px;font-size:12px;color:${MUTED};">${meta}</p>` : ""}
          ${attachmentStatusHtml(row)}
        </td>
      </tr>`;
    })
    .join("");

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rowsHtml}</table>`;
}

function internalNotificationHtml(
  draft: EnquiryDraft,
  referenceNo: string,
  submittedAt: Date,
  attachmentRows: readonly AttachmentEmailRow[],
): string {
  const fullName = escapeHtml(formatPersonName(draft.contact.firstName, draft.contact.lastName));
  const trimmedEmail = trimOnly(draft.contact.email);
  const trimmedPhone = trimOnly(draft.contact.phone);
  const jobTitle = formatJobTitle(draft.contact.jobTitle);
  const mailto = `<a href="mailto:${escapeHtml(trimmedEmail)}" style="color:${NAVY};">${escapeHtml(trimmedEmail)}</a>`;
  const tel = trimmedPhone
    ? `<a href="tel:${escapeHtml(trimmedPhone.replace(/\s+/g, ""))}" style="color:${NAVY};">${escapeHtml(trimmedPhone)}</a>`
    : "&mdash;";

  const summaryRows: readonly (readonly [string, string])[] = [
    ["Reference", `<strong>${escapeHtml(referenceNo)}</strong>`],
    ["Enquiry Type", escapeHtml(formatEnquiryType(draft.type, draft.market))],
    ["Market", escapeHtml(formatMarket(draft.market))],
    ["Date/Time", escapeHtml(formatSubmittedAt(submittedAt))],
  ];

  const contactRows: readonly (readonly [string, string])[] = [
    ["Name", fullName],
    ["Job Title", jobTitle ? escapeHtml(jobTitle) : "&mdash;"],
    ["Company", escapeHtml(formatCompanyName(draft.contact.company))],
    ["Email", mailto],
    ["Phone", tel],
  ];

  const projectRows = projectProductDetailRows(draft);

  const sections = [
    card("Enquiry Summary", keyValueTable(summaryRows)),
    card("Contact Details", keyValueTable(contactRows)),
    projectRows.length > 0 ? card("Project / Product Details", keyValueTable(projectRows)) : "",
    draft.subject.trim()
      ? card(
          "Subject",
          `<div style="padding:10px 12px;border:1px solid ${BORDER};font-size:13px;color:${TEXT};">${escapeHtml(cleanText(draft.subject))}</div>`,
        )
      : "",
    draft.message.trim()
      ? card(
          "Message",
          `<div style="padding:12px 14px;border:1px solid ${BORDER};font-size:13px;color:${TEXT};white-space:pre-wrap;word-break:break-word;">${escapeHtml(draft.message)}</div>`,
        )
      : "",
    card("Basket", basketTableHtml(draft)),
    attachmentRows.length > 0 ? card("Attachments", attachmentsListHtml(attachmentRows)) : "",
  ]
    .filter(Boolean)
    .join("");

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(internalNotificationSubject(referenceNo, draft.selectedItems.length))}</title>
<style>
  @media only screen and (max-width: 640px) {
    .iv-container { width: 100% !important; }
    .iv-section { padding-left: 16px !important; padding-right: 16px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:#f2f4f7;font-family:Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f4f7;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" class="iv-container" width="700" cellpadding="0" cellspacing="0" style="width:700px;max-width:700px;background-color:#ffffff;border:1px solid ${BORDER};">
          <tr>
            <td style="background-color:${NAVY};padding:22px 32px;">
              <p style="margin:0;color:#ffffff;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;opacity:0.75;">New InfraVolt Enquiry</p>
              <p style="margin:6px 0 0;color:#ffffff;font-size:22px;font-weight:700;">${escapeHtml(referenceNo)}</p>
            </td>
          </tr>
          <tr>
            <td class="iv-section" style="padding:24px 32px 4px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${sections}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px;border-top:1px solid ${BORDER};">
              <p style="margin:0;color:${MUTED};font-size:12px;">This enquiry was submitted through the InfraVolt website.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Internal InfraVolt notification — plain-text fallback
// ---------------------------------------------------------------------------

function internalNotificationText(
  draft: EnquiryDraft,
  referenceNo: string,
  submittedAt: Date,
  attachmentRows: readonly AttachmentEmailRow[],
): string {
  const lines: string[] = [];
  lines.push("NEW INFRAVOLT ENQUIRY");
  lines.push(referenceNo);
  lines.push("");
  lines.push("ENQUIRY SUMMARY");
  lines.push(`Reference: ${referenceNo}`);
  lines.push(`Enquiry Type: ${formatEnquiryType(draft.type, draft.market)}`);
  lines.push(`Market: ${formatMarket(draft.market)}`);
  lines.push(`Date/Time: ${formatSubmittedAt(submittedAt)}`);
  lines.push("");
  lines.push("CONTACT DETAILS");
  lines.push(`Name: ${formatPersonName(draft.contact.firstName, draft.contact.lastName)}`);
  const textJobTitle = formatJobTitle(draft.contact.jobTitle);
  if (textJobTitle) lines.push(`Job Title: ${textJobTitle}`);
  lines.push(`Company: ${formatCompanyName(draft.contact.company)}`);
  lines.push(`Email: ${trimOnly(draft.contact.email)}`);
  const textPhone = trimOnly(draft.contact.phone);
  if (textPhone) lines.push(`Phone: ${textPhone}`);

  const projectRows = projectProductDetailRows(draft).map(([label]) => label);
  const projectValues: Record<string, string> = {
    "Project Name": cleanText(draft.project.projectName),
    "Project Location": cleanText(draft.project.projectLocation),
    "Project Type": cleanText(draft.project.projectType),
    "Project Stage": cleanText(draft.project.projectStage),
    "Required Date": cleanText(draft.project.requiredDate),
    "Estimated Quantity": cleanText(draft.project.estimatedQuantity),
    "Product System": cleanText(draft.technical.productSystem),
    "Product Series": cleanText(draft.technical.productSeries),
    "Model Code": cleanText(draft.technical.modelCode),
    "Information Required": draft.technical.informationRequired.map(cleanText).join(", "),
    "Documents Required": draft.technical.documentsRequired.map(cleanText).join(", "),
  };
  if (projectRows.length > 0) {
    lines.push("");
    lines.push("PROJECT / PRODUCT DETAILS");
    for (const label of projectRows) lines.push(`${label}: ${projectValues[label]}`);
  }

  if (draft.subject.trim()) {
    lines.push("");
    lines.push("SUBJECT");
    lines.push(cleanText(draft.subject));
  }

  if (draft.message.trim()) {
    lines.push("");
    lines.push("MESSAGE");
    lines.push(draft.message);
  }

  lines.push("");
  lines.push("BASKET");
  if (draft.selectedItems.length === 0) {
    lines.push("No products were added to this enquiry.");
  } else {
    for (const item of draft.selectedItems) {
      const system = enquirySystemLabel(item.system, draft.market);
      const parts = [item.title, `System: ${system}`];
      if (item.model) parts.push(`Model: ${item.model}`);
      if (item.categoryLabel) parts.push(`Category: ${item.categoryLabel}`);
      if (item.quantity) parts.push(`Qty: ${item.quantity}`);
      lines.push(`- ${parts.join(" | ")}`);
    }
  }

  if (attachmentRows.length > 0) {
    lines.push("");
    lines.push("ATTACHMENTS");
    for (const row of attachmentRows) {
      const meta = [row.contentType, formatFileSize(row.sizeBytes)].filter(Boolean).join(" | ");
      lines.push(`- ${row.fileName}${meta ? ` (${meta})` : ""}`);
      if (row.scanStatus === "clean" && row.downloadUrl) {
        lines.push(`  Download (expires in 7 days): ${row.downloadUrl}`);
      } else if (row.scanStatus === "infected") {
        lines.push("  Blocked by security scan");
      } else if (row.scanStatus === "scan_failed") {
        lines.push("  Security scan could not be completed");
      } else {
        lines.push("  Security scan pending");
      }
    }
  }

  lines.push("");
  lines.push("This enquiry was submitted through the InfraVolt website.");

  return lines.join("\n");
}

/**
 * Sends the submitter acknowledgement and the internal InfraVolt
 * notification. Best-effort: called only after the enquiry is already
 * persisted, and its result never affects whether the Contact form
 * reports success — a saved enquiry with a failed email is still a saved
 * enquiry.
 *
 * Attachment state is read directly from private.enquiry_attachments (via
 * list_enquiry_attachments_for_email) rather than trusted from the
 * caller, so the internal notification always reflects each attachment's
 * real, current scan_status — a signed, 7-day download link is minted
 * only for attachments that are 'clean' right now (re-verified by
 * get_clean_attachment_for_download at mint time); pending/infected/
 * scan_failed attachments are listed with a status message and never a
 * link. The customer acknowledgement never receives attachment links or
 * any scan-status information.
 *
 * No-ops with a server-side diagnostic when RESEND_API_KEY or the market's
 * EMAIL_FROM_UK/UA and EMAIL_REPLY_TO_UK/UA aren't configured.
 *
 * SECURITY: `draft.market` is client-supplied (this is a Server Action
 * argument) and is never trusted for recipient selection — a client could
 * otherwise force a UA enquiry's internal notification to the UK mailbox
 * (or vice versa) simply by submitting a mismatched value. The market used
 * for both the recipient config lookup and the email content/language is
 * always re-derived here from the current request's trusted host headers
 * (see resolveTrustedMarketContext), never from the draft as received.
 */
export async function sendEnquiryEmails(draft: EnquiryDraft, referenceNo: string): Promise<void> {
  const trustedMarket = resolveTrustedMarketContext(await headers()).market;
  const apiKeyVariable = trustedMarket === "ua" ? "RESEND_API_KEY_UA" : "RESEND_API_KEY";
  const apiKey = (
    trustedMarket === "ua" ? process.env.RESEND_API_KEY_UA : process.env.RESEND_API_KEY
  )?.trim();
  if (!apiKey) {
    console.error(`sendEnquiryEmails: ${apiKeyVariable} is not configured`, {
      referenceNo,
      market: trustedMarket,
    });
    return;
  }

  const trustedDraft: EnquiryDraft = trustedMarket === draft.market ? draft : { ...draft, market: trustedMarket };

  const config = marketEmailConfig(trustedMarket);
  if (!config) {
    console.error("sendEnquiryEmails: market email configuration is incomplete", {
      referenceNo,
      market: trustedMarket,
    });
    return;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  const attachmentRows =
    supabaseUrl && secretKey ? await resolveAttachmentRows(supabaseUrl.replace(/\/+$/, ""), secretKey, referenceNo) : [];

  const submittedAt = new Date();

  const [ackSent, internalSent] = await Promise.all([
    sendViaResend(apiKey, {
      from: config.from,
      to: trustedDraft.contact.email,
      replyTo: config.replyTo,
      subject: acknowledgementSubject(trustedMarket, referenceNo),
      html: acknowledgementHtml(trustedDraft, referenceNo),
      text: acknowledgementText(trustedDraft, referenceNo),
    }),
    sendViaResend(apiKey, {
      from: config.from,
      to: config.replyTo,
      subject: internalNotificationSubject(referenceNo, trustedDraft.selectedItems.length),
      html: internalNotificationHtml(trustedDraft, referenceNo, submittedAt, attachmentRows),
      text: internalNotificationText(trustedDraft, referenceNo, submittedAt, attachmentRows),
    }),
  ]);

  if (!ackSent || !internalSent) {
    console.error("sendEnquiryEmails: one or more enquiry emails failed to send", {
      referenceNo,
      acknowledgementSent: ackSent,
      internalNotificationSent: internalSent,
    });
  }
}
