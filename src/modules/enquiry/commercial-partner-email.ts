"use server";

import type { MarketCode } from "@/modules/markets/types";
import { commercialPartnersContentForMarket } from "@/modules/public-site/commercial-partners-content";

import type { CommercialPartnerApplicationDraft } from "./commercial-partner-application";
import { cleanText, formatCompanyName, formatJobTitle, formatMarket, formatPersonName, trimOnly } from "./display-format";

/**
 * Commercial Partner Application email layer. A "use server" Server Action
 * module in its own right (called from
 * commercial-partner-application-form.tsx, after submitCommercialPartnerApplication()
 * resolves successfully — not from that function itself), mirroring the
 * /contact submission pattern (src/modules/enquiry/email.ts) but
 * deliberately independent of it: the two features already model
 * themselves as separate systems (see commercial-partner-application.ts's
 * own header comment), so this file duplicates the small set of generic
 * Resend/HTML helpers rather than importing Contact's module.
 *
 * Reuses the same Resend env vars Contact already uses
 * (RESEND_API_KEY, EMAIL_FROM_UK/UA, EMAIL_REPLY_TO_UK/UA) — "the
 * configured InfraVolt market mailbox" is the same mailbox either way.
 * Inert by design when those aren't configured for a market: sends
 * nothing, throws nothing.
 *
 * Never sends anything that implies appointment/authorisation — an
 * application is an expression of interest only until InfraVolt confirms
 * in writing (declarationAccepted on the draft records the applicant's own
 * acknowledgement of this).
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const NAVY = "#0b2545";
const BORDER = "#dde1e7";
const MUTED = "#667085";
const TEXT = "#1f2937";

type MarketEmailConfig = Readonly<{ from: string; replyTo: string }>;

function marketEmailConfig(market: MarketCode): MarketEmailConfig | undefined {
  const from = market === "uk" ? process.env.EMAIL_FROM_UK : process.env.EMAIL_FROM_UA;
  const replyTo = market === "uk" ? process.env.EMAIL_REPLY_TO_UK : process.env.EMAIL_REPLY_TO_UA;
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
      console.error("sendCommercialPartnerApplicationEmails: Resend request failed", response.status, body.slice(0, 500));
      return false;
    }

    return true;
  } catch (error) {
    console.error("sendCommercialPartnerApplicationEmails: Resend request threw", error);
    return false;
  }
}

function businessTypeLabel(market: MarketCode, value: string): string {
  const options = commercialPartnersContentForMarket(market).sections.businessProfile.businessTypeOptions;
  return options.find((option) => option.value === value)?.label ?? value;
}

function partnershipInterestLabel(market: MarketCode, value: string): string {
  const options = commercialPartnersContentForMarket(market).sections.businessProfile.partnershipInterestOptions;
  return options.find((option) => option.value === value)?.label ?? value;
}

function territoryScaleLabel(market: MarketCode, value: string): string {
  const options = commercialPartnersContentForMarket(market).sections.businessProfile.territoryTypeOptions;
  return options.find((option) => option.value === value)?.label ?? value;
}

function formatSubmittedAt(submittedAt: Date): string {
  return (
    new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC",
    }).format(submittedAt) + " UTC"
  );
}

function card(heading: string, bodyHtml: string): string {
  return `
    <tr>
      <td style="padding:0 32px 20px;">
        <p style="margin:0 0 10px;color:${NAVY};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">${escapeHtml(heading)}</p>
        ${bodyHtml}
      </td>
    </tr>`;
}

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

function listOrDash(values: readonly string[]): string {
  return values.length > 0 ? escapeHtml(values.map(cleanText).join(", ")) : "&mdash;";
}

function textOrDash(value: string): string {
  const cleaned = cleanText(value);
  return cleaned.length > 0 ? escapeHtml(cleaned) : "&mdash;";
}

// ---------------------------------------------------------------------------
// Internal InfraVolt notification
// ---------------------------------------------------------------------------

function internalSubject(referenceNo: string, companyName: string): string {
  return `New Commercial Partner Application ${referenceNo} — ${cleanText(companyName)}`;
}

function internalHtml(draft: CommercialPartnerApplicationDraft, referenceNo: string, submittedAt: Date): string {
  const summaryRows: readonly (readonly [string, string])[] = [
    ["Reference", `<strong>${escapeHtml(referenceNo)}</strong>`],
    ["Market", escapeHtml(formatMarket(draft.market))],
    ["Date/Time", escapeHtml(formatSubmittedAt(submittedAt))],
  ];

  const companyRows: readonly (readonly [string, string])[] = [
    ["Company Name", escapeHtml(formatCompanyName(draft.companyName))],
    ["Business Type", escapeHtml(businessTypeLabel(draft.market, draft.businessType))],
    ["Partnership Interest", escapeHtml(partnershipInterestLabel(draft.market, draft.partnershipInterest))],
    ["Company Location", textOrDash(draft.companyLocation)],
    ["Website", textOrDash(draft.website)],
    ["Years Trading", textOrDash(draft.yearsTrading)],
  ];

  const contactRows: readonly (readonly [string, string])[] = [
    ["Contact Name", escapeHtml(formatPersonName(draft.contactName, ""))],
    ["Job Title", textOrDash(formatJobTitle(draft.jobTitle))],
    ["Email", `<a href="mailto:${escapeHtml(trimOnly(draft.email))}" style="color:${NAVY};">${escapeHtml(trimOnly(draft.email))}</a>`],
    ["Phone", `<a href="tel:${escapeHtml(trimOnly(draft.phone).replace(/\s+/g, ""))}" style="color:${NAVY};">${escapeHtml(trimOnly(draft.phone))}</a>`],
  ];

  const territoryRows: readonly (readonly [string, string])[] = [
    ["Current Sales / Service Coverage", listOrDash(draft.currentSalesServiceCoverage)],
    ["Requested Territory Scale", escapeHtml(territoryScaleLabel(draft.market, draft.requestedDealershipTerritory.scale))],
    ["Requested Regions", listOrDash(draft.requestedDealershipTerritory.regions)],
    ["Requested Cities / Detail", textOrDash(draft.requestedDealershipTerritory.cities)],
    ["Product System Interests", listOrDash(draft.productSystemInterests)],
    ["Industry Interests", listOrDash(draft.industryInterests)],
  ];

  const sections = [
    card("Application Summary", keyValueTable(summaryRows)),
    card("Company", keyValueTable(companyRows)),
    card("Primary Contact", keyValueTable(contactRows)),
    card("Territory & Product Interest", keyValueTable(territoryRows)),
    draft.commercialRequirements.trim()
      ? card(
          "Commercial Requirements / Notes",
          `<div style="padding:12px 14px;border:1px solid ${BORDER};font-size:13px;color:${TEXT};white-space:pre-wrap;word-break:break-word;">${escapeHtml(draft.commercialRequirements)}</div>`,
        )
      : "",
    card(
      "Declaration",
      `<p style="margin:0;font-size:13px;color:${TEXT};">${draft.declarationAccepted ? "Accepted — applicant confirmed submission does not constitute appointment." : "Not accepted"}</p>`,
    ),
  ]
    .filter(Boolean)
    .join("");

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(internalSubject(referenceNo, draft.companyName))}</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f4f7;font-family:Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f4f7;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="700" cellpadding="0" cellspacing="0" style="width:700px;max-width:700px;background-color:#ffffff;border:1px solid ${BORDER};">
          <tr>
            <td style="background-color:${NAVY};padding:22px 32px;">
              <p style="margin:0;color:#ffffff;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;opacity:0.75;">New Commercial Partner Application</p>
              <p style="margin:6px 0 0;color:#ffffff;font-size:22px;font-weight:700;">${escapeHtml(referenceNo)}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 4px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${sections}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px;border-top:1px solid ${BORDER};">
              <p style="margin:0;color:${MUTED};font-size:12px;">Submission does not constitute appointment. Any partnership requires review and written confirmation.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function internalText(draft: CommercialPartnerApplicationDraft, referenceNo: string, submittedAt: Date): string {
  const lines: string[] = [];
  lines.push("NEW COMMERCIAL PARTNER APPLICATION");
  lines.push(referenceNo);
  lines.push("");
  lines.push("APPLICATION SUMMARY");
  lines.push(`Reference: ${referenceNo}`);
  lines.push(`Market: ${formatMarket(draft.market)}`);
  lines.push(`Date/Time: ${formatSubmittedAt(submittedAt)}`);
  lines.push("");
  lines.push("COMPANY");
  lines.push(`Company Name: ${formatCompanyName(draft.companyName)}`);
  lines.push(`Business Type: ${businessTypeLabel(draft.market, draft.businessType)}`);
  lines.push(`Partnership Interest: ${partnershipInterestLabel(draft.market, draft.partnershipInterest)}`);
  if (draft.companyLocation.trim()) lines.push(`Company Location: ${cleanText(draft.companyLocation)}`);
  if (draft.website.trim()) lines.push(`Website: ${cleanText(draft.website)}`);
  if (draft.yearsTrading.trim()) lines.push(`Years Trading: ${cleanText(draft.yearsTrading)}`);
  lines.push("");
  lines.push("PRIMARY CONTACT");
  lines.push(`Contact Name: ${formatPersonName(draft.contactName, "")}`);
  const textJobTitle = formatJobTitle(draft.jobTitle);
  if (textJobTitle) lines.push(`Job Title: ${textJobTitle}`);
  lines.push(`Email: ${trimOnly(draft.email)}`);
  lines.push(`Phone: ${trimOnly(draft.phone)}`);
  lines.push("");
  lines.push("TERRITORY & PRODUCT INTEREST");
  lines.push(`Current Sales / Service Coverage: ${draft.currentSalesServiceCoverage.map(cleanText).join(", ") || "—"}`);
  lines.push(`Requested Territory Scale: ${territoryScaleLabel(draft.market, draft.requestedDealershipTerritory.scale)}`);
  lines.push(`Requested Regions: ${draft.requestedDealershipTerritory.regions.map(cleanText).join(", ") || "—"}`);
  if (draft.requestedDealershipTerritory.cities.trim()) {
    lines.push(`Requested Cities / Detail: ${cleanText(draft.requestedDealershipTerritory.cities)}`);
  }
  lines.push(`Product System Interests: ${draft.productSystemInterests.map(cleanText).join(", ") || "—"}`);
  lines.push(`Industry Interests: ${draft.industryInterests.map(cleanText).join(", ") || "—"}`);

  if (draft.commercialRequirements.trim()) {
    lines.push("");
    lines.push("COMMERCIAL REQUIREMENTS / NOTES");
    lines.push(draft.commercialRequirements);
  }

  lines.push("");
  lines.push("DECLARATION");
  lines.push(
    draft.declarationAccepted
      ? "Accepted — applicant confirmed submission does not constitute appointment."
      : "Not accepted",
  );
  lines.push("");
  lines.push("Submission does not constitute appointment. Any partnership requires review and written confirmation.");

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Applicant acknowledgement
// ---------------------------------------------------------------------------

function acknowledgementSubject(market: MarketCode, referenceNo: string): string {
  return market === "ua" ? `Заявку отримано — ${referenceNo}` : `Application Received — ${referenceNo}`;
}

function acknowledgementHtml(draft: CommercialPartnerApplicationDraft, referenceNo: string): string {
  const ua = draft.market === "ua";
  const name = escapeHtml(formatPersonName(draft.contactName, ""));
  const companyName = escapeHtml(formatCompanyName(draft.companyName));
  const marketLabel = escapeHtml(formatMarket(draft.market));

  const summaryRows = [
    [ua ? "Номер заявки" : "Reference", `<strong>${escapeHtml(referenceNo)}</strong>`],
    [ua ? "Компанія" : "Company", companyName],
    [ua ? "Тип заявки" : "Application Type", ua ? "Заявка комерційного партнера" : "Commercial Partner Application"],
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
  const thanks = ua
    ? "Дякуємо за подання заявки комерційного партнера InfraVolt."
    : "Thank you for submitting a Commercial Partner Application to InfraVolt.";
  const received = ua
    ? "Вашу заявку отримано та зареєстровано в нашій системі."
    : "Your application has been received and logged in our system.";
  const reviewHeading = ua ? "Що далі?" : "What happens next?";
  const reviewBody = ua
    ? "Заявку розглядатиме наша комерційна команда з урахуванням профілю компанії, регіонального покриття та продуктових потреб."
    : "Your application will be reviewed by our commercial team, based on your company profile, regional coverage and product requirements.";
  const notAppointment = ua
    ? "Подання цієї заявки не означає призначення авторизованим дилером, дистриб'ютором чи комерційним партнером. Будь-яке партнерство набуває чинності лише після розгляду та письмового підтвердження від InfraVolt."
    : "Submitting this application does not constitute appointment as an authorised dealer, distributor or commercial partner. Any partnership only takes effect after review and written confirmation from InfraVolt.";
  const contactNext = ua
    ? "Наша команда зв'яжеться з вами після завершення розгляду заявки."
    : "Our team will contact you once the review of your application is complete.";
  const closingRegards = ua ? "З повагою," : "Kind regards,";
  const closingTeam = ua ? "Команда InfraVolt" : "InfraVolt Team";
  const closingTagline = ua ? "Системи електричної інфраструктури" : "Electrical Infrastructure Systems";
  const footerLine = ua
    ? "Це автоматичне підтвердження отримання вашої заявки."
    : "This is an automated acknowledgement confirming that your application has been received.";

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(acknowledgementSubject(draft.market, referenceNo))}</title>
</head>
<body style="margin:0;padding:0;background-color:#f2f4f7;font-family:Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f4f7;padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="680" cellpadding="0" cellspacing="0" style="width:680px;max-width:680px;background-color:#ffffff;border:1px solid ${BORDER};">
          <tr>
            <td style="background-color:${NAVY};padding:24px 32px;">
              <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:0.02em;">InfraVolt</span>
              <p style="margin:14px 0 0;color:#ffffff;font-size:20px;font-weight:700;">${ua ? "Заявку отримано" : "Application Received"}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px;">
              <p style="margin:0 0 14px;color:${TEXT};font-size:14px;line-height:1.6;">${greeting}</p>
              <p style="margin:0 0 14px;color:${TEXT};font-size:14px;line-height:1.6;">${thanks}</p>
              <p style="margin:0 0 20px;color:${TEXT};font-size:14px;line-height:1.6;">${received}</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid ${BORDER};margin-bottom:22px;">
                ${summaryRows}
              </table>
              <p style="margin:0 0 8px;color:${NAVY};font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;">${reviewHeading}</p>
              <p style="margin:0 0 16px;color:${TEXT};font-size:14px;line-height:1.6;">${reviewBody}</p>
              <p style="margin:0 0 16px;padding:12px 14px;border:1px solid ${BORDER};background-color:#f8f9fb;color:${TEXT};font-size:13px;line-height:1.6;">${notAppointment}</p>
              <p style="margin:0 0 24px;color:${TEXT};font-size:14px;line-height:1.6;">${contactNext}</p>
              <p style="margin:0;color:${TEXT};font-size:14px;line-height:1.6;">${closingRegards}<br/>${closingTeam}<br/>${closingTagline}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px;border-top:1px solid ${BORDER};">
              <p style="margin:0;color:${MUTED};font-size:12px;">${footerLine}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function acknowledgementText(draft: CommercialPartnerApplicationDraft, referenceNo: string): string {
  const ua = draft.market === "ua";
  const name = formatPersonName(draft.contactName, "");
  const companyName = formatCompanyName(draft.companyName);
  const marketLabel = formatMarket(draft.market);

  const lines: string[] = [];
  lines.push(ua ? "ЗАЯВКУ ОТРИМАНО" : "APPLICATION RECEIVED");
  lines.push("");
  lines.push(ua ? `Вітаємо, ${name},` : `Hello ${name},`);
  lines.push("");
  lines.push(
    ua
      ? "Дякуємо за подання заявки комерційного партнера InfraVolt."
      : "Thank you for submitting a Commercial Partner Application to InfraVolt.",
  );
  lines.push(ua ? "Вашу заявку отримано та зареєстровано в нашій системі." : "Your application has been received and logged in our system.");
  lines.push("");
  lines.push(`${ua ? "Номер заявки" : "Reference"}: ${referenceNo}`);
  lines.push(`${ua ? "Компанія" : "Company"}: ${companyName}`);
  lines.push(`${ua ? "Тип заявки" : "Application Type"}: ${ua ? "Заявка комерційного партнера" : "Commercial Partner Application"}`);
  lines.push(`${ua ? "Ринок" : "Market"}: ${marketLabel}`);
  lines.push("");
  lines.push(
    ua
      ? "Заявку розглядатиме наша комерційна команда з урахуванням профілю компанії, регіонального покриття та продуктових потреб."
      : "Your application will be reviewed by our commercial team, based on your company profile, regional coverage and product requirements.",
  );
  lines.push("");
  lines.push(
    ua
      ? "Подання цієї заявки не означає призначення авторизованим дилером, дистриб'ютором чи комерційним партнером. Будь-яке партнерство набуває чинності лише після розгляду та письмового підтвердження від InfraVolt."
      : "Submitting this application does not constitute appointment as an authorised dealer, distributor or commercial partner. Any partnership only takes effect after review and written confirmation from InfraVolt.",
  );
  lines.push("");
  lines.push(ua ? "Наша команда зв'яжеться з вами після завершення розгляду заявки." : "Our team will contact you once the review of your application is complete.");
  lines.push("");
  lines.push(ua ? "З повагою," : "Kind regards,");
  lines.push(ua ? "Команда InfraVolt" : "InfraVolt Team");
  lines.push(ua ? "Системи електричної інфраструктури" : "Electrical Infrastructure Systems");
  lines.push("");
  lines.push(
    ua
      ? "Це автоматичне підтвердження отримання вашої заявки."
      : "This is an automated acknowledgement confirming that your application has been received.",
  );

  return lines.join("\n");
}

/**
 * Sends the applicant acknowledgement and the internal InfraVolt
 * notification. Best-effort: called only after the application is already
 * persisted (see commercial-partner-application-form.tsx), and its result
 * never affects whether the form reports success — a saved application
 * with a failed email is still a saved application, under review.
 *
 * No-ops (returns immediately, logs nothing) when RESEND_API_KEY or the
 * market's EMAIL_FROM_UK/UA and EMAIL_REPLY_TO_UK/UA aren't configured —
 * same as /contact today.
 */
export async function sendCommercialPartnerApplicationEmails(
  draft: CommercialPartnerApplicationDraft,
  referenceNo: string,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const config = marketEmailConfig(draft.market);
  if (!config) return;

  const submittedAt = new Date();

  const [ackSent, internalSent] = await Promise.all([
    sendViaResend(apiKey, {
      from: config.from,
      to: draft.email,
      replyTo: config.replyTo,
      subject: acknowledgementSubject(draft.market, referenceNo),
      html: acknowledgementHtml(draft, referenceNo),
      text: acknowledgementText(draft, referenceNo),
    }),
    sendViaResend(apiKey, {
      from: config.from,
      to: config.replyTo,
      subject: internalSubject(referenceNo, draft.companyName),
      html: internalHtml(draft, referenceNo, submittedAt),
      text: internalText(draft, referenceNo, submittedAt),
    }),
  ]);

  if (!ackSent || !internalSent) {
    console.error("sendCommercialPartnerApplicationEmails: one or more application emails failed to send", {
      referenceNo,
      acknowledgementSent: ackSent,
      internalNotificationSent: internalSent,
    });
  }
}
