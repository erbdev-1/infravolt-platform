"use server";

import { isScannerConfigured, scanAttachment } from "./malware-scan";

/**
 * Only ever imported by src/components/public/contact/enquiry-workspace.tsx
 * (client) and src/modules/enquiry/draft.ts. This file is a "use server"
 * Server Action module — Next.js excludes it from the client bundle and
 * only ever crosses the RPC boundary, so SUPABASE_SECRET_KEY never reaches
 * the browser.
 *
 * File bytes never travel through a Server Action / Vercel function here.
 * The browser uploads directly to Supabase Storage using a short-lived
 * signed upload URL: createAttachmentUploadUrl() (small JSON payload) mints
 * that URL server-side, the browser PUTs the file bytes straight to
 * Supabase, then finalizeAttachmentUpload() (also a small JSON payload)
 * records the metadata via the record_enquiry_attachment RPC — private.*
 * isn't directly reachable, see that migration. Metadata is only recorded
 * after the browser confirms the PUT succeeded, and a failed metadata
 * write deletes the just-uploaded object (compensating cleanup) rather
 * than leaving an orphaned object with no DB record — same guarantees as
 * before, just re-ordered around who performs the actual byte transfer.
 *
 * Every object is written under a quarantine/ prefix and stays there
 * indefinitely — the object's location is never treated as an
 * authorization signal. scan_status (private.enquiry_attachments) is the
 * only gate: it defaults to "pending" on insert, and only
 * src/modules/enquiry/email.ts's centralized clean-only signer may ever
 * mint a staff download URL, and only once scan_status = "clean". After
 * recording metadata, finalizeAttachmentUpload() makes a best-effort
 * attempt to scan the file immediately (see malware-scan.ts); if no
 * private scanner is configured, the attempt is a no-op and the
 * attachment simply stays "pending" — it is never marked clean without a
 * real scan result.
 *
 * Limits mirror src/components/public/contact/file-upload-field.tsx
 * exactly (MAX_FILES, MAX_TOTAL_SIZE_BYTES combined across all files,
 * ACCEPTED_EXTENSIONS) — do not let these drift from that file. Server-side
 * enforcement here is defence in depth (the browser already enforces the
 * same values), not a different or stricter policy.
 */
const MAX_FILES = 10;
const MAX_TOTAL_SIZE_BYTES = 25 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [
  ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".csv", ".txt",
  ".jpg", ".jpeg", ".png", ".webp", ".dwg", ".dxf", ".zip",
];

const BUCKET = "private-enquiry-attachments";

function fileExtension(name: string): string {
  const dotIndex = name.lastIndexOf(".");
  return dotIndex >= 0 ? name.slice(dotIndex).toLowerCase() : "";
}

/** Strips to a safe charset, collapses whitespace, bounds length, keeps the extension. */
function sanitizeFileName(originalName: string): string {
  const ext = fileExtension(originalName);
  const stem = ext ? originalName.slice(0, -ext.length) : originalName;
  const safeStem = stem
    .normalize("NFKD")
    .replace(/[^\w\- ]+/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 100);
  return `${safeStem || "file"}${ext}`;
}

export type CreateAttachmentUploadUrlResult =
  | Readonly<{ ok: true; objectPath: string; uploadUrl: string }>
  | Readonly<{ ok: false; error: "not-configured" | "rejected" | "failed" }>;

/**
 * Mints a short-lived signed upload URL for one file. `fileIndex` is used
 * only to enforce MAX_FILES server-side (defence in depth against a
 * tampered client call, not a session/state tracker). `fileSize` is
 * checked against the single-request total budget as a hard ceiling — the
 * real "sum across the whole selection" check happens client-side, where
 * the whole selection is actually known.
 */
export async function createAttachmentUploadUrl(
  referenceNo: string,
  fileName: string,
  fileSize: number,
  fileIndex: number,
): Promise<CreateAttachmentUploadUrlResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !secretKey) {
    return { ok: false, error: "not-configured" };
  }

  if (
    !referenceNo ||
    fileIndex < 0 ||
    fileIndex >= MAX_FILES ||
    !ACCEPTED_EXTENSIONS.includes(fileExtension(fileName)) ||
    fileSize <= 0 ||
    fileSize > MAX_TOTAL_SIZE_BYTES
  ) {
    return { ok: false, error: "rejected" };
  }

  const base = supabaseUrl.replace(/\/+$/, "");
  const objectPath = `quarantine/${referenceNo}/${crypto.randomUUID()}-${sanitizeFileName(fileName)}`;

  try {
    const response = await fetch(`${base}/storage/v1/object/upload/sign/${BUCKET}/${objectPath}`, {
      method: "POST",
      headers: {
        apikey: secretKey,
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: "{}",
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error("createAttachmentUploadUrl: sign request failed", response.status, body.slice(0, 300));
      return { ok: false, error: "failed" };
    }

    const parsed: unknown = await response.json();
    const relativeUrl =
      parsed && typeof parsed === "object" && "url" in parsed && typeof parsed.url === "string"
        ? parsed.url
        : undefined;
    if (!relativeUrl) {
      console.error("createAttachmentUploadUrl: unexpected sign response shape");
      return { ok: false, error: "failed" };
    }

    return { ok: true, objectPath, uploadUrl: `${base}/storage/v1${relativeUrl}` };
  } catch (error) {
    console.error("createAttachmentUploadUrl: threw", error);
    return { ok: false, error: "failed" };
  }
}

export type FinalizeAttachmentUploadResult = Readonly<{ ok: boolean }>;

/** Call only after the browser confirms its PUT to uploadUrl succeeded. */
export async function finalizeAttachmentUpload(
  referenceNo: string,
  fileName: string,
  objectPath: string,
  contentType: string,
  sizeBytes: number,
): Promise<FinalizeAttachmentUploadResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !secretKey) {
    return { ok: false };
  }

  const base = supabaseUrl.replace(/\/+$/, "");

  try {
    const response = await fetch(`${base}/rest/v1/rpc/record_enquiry_attachment`, {
      method: "POST",
      headers: {
        apikey: secretKey,
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_reference_no: referenceNo,
        p_file_name: fileName,
        p_storage_object_path: objectPath,
        p_content_type: contentType || null,
        p_size_bytes: sizeBytes,
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error("finalizeAttachmentUpload: metadata record failed", response.status, body.slice(0, 300));
      await fetch(`${base}/storage/v1/object/${BUCKET}/${objectPath}`, {
        method: "DELETE",
        headers: { apikey: secretKey, Authorization: `Bearer ${secretKey}` },
      }).catch((cleanupError: unknown) => {
        console.error("finalizeAttachmentUpload: compensating delete also failed", cleanupError);
      });
      return { ok: false };
    }

    await attemptScan(base, secretKey, objectPath);

    return { ok: true };
  } catch (error) {
    console.error("finalizeAttachmentUpload: threw", error);
    return { ok: false };
  }
}

/**
 * Best-effort: attempts one scan immediately after upload so the internal
 * notification email (sent right after this) can reflect a real result
 * when possible. If no scanner is configured, or the scan attempt itself
 * fails, the attachment is simply left "pending" (the DB default) — never
 * marked clean without a genuine "clean" result, and this function never
 * throws (a scan failure must not fail the enquiry submission).
 */
async function attemptScan(base: string, secretKey: string, objectPath: string): Promise<void> {
  if (!isScannerConfigured()) {
    return;
  }

  try {
    const signResponse = await fetch(`${base}/storage/v1/object/sign/${BUCKET}/${objectPath}`, {
      method: "POST",
      headers: {
        apikey: secretKey,
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expiresIn: 600 }),
    });

    if (!signResponse.ok) {
      console.error("attemptScan: could not sign object for scanning", signResponse.status);
      return;
    }

    const parsed: unknown = await signResponse.json();
    const signedURL =
      parsed && typeof parsed === "object" && "signedURL" in parsed && typeof parsed.signedURL === "string"
        ? parsed.signedURL
        : undefined;
    if (!signedURL) {
      console.error("attemptScan: unexpected sign response shape");
      return;
    }

    const outcome = await scanAttachment(`${base}/storage/v1${signedURL}`);
    if (outcome.status === "not-configured") {
      return;
    }

    await fetch(`${base}/rest/v1/rpc/update_attachment_scan_result`, {
      method: "POST",
      headers: {
        apikey: secretKey,
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_storage_object_path: objectPath,
        p_scan_status: outcome.status,
        p_scanner_provider: "provider" in outcome ? outcome.provider : null,
        p_sha256: "sha256" in outcome ? (outcome.sha256 ?? null) : null,
        p_scan_notes: "notes" in outcome ? (outcome.notes ?? null) : null,
      }),
    });

    if (outcome.status === "infected") {
      await fetch(`${base}/storage/v1/object/${BUCKET}/${objectPath}`, {
        method: "DELETE",
        headers: { apikey: secretKey, Authorization: `Bearer ${secretKey}` },
      }).catch((cleanupError: unknown) => {
        console.error("attemptScan: failed to delete infected object", cleanupError);
      });
    }
  } catch (error) {
    console.error("attemptScan: threw", error);
  }
}
