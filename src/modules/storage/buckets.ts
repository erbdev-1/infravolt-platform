/**
 * Canonical Supabase Storage bucket names. Naming/path conventions and
 * access policy live in the storage architecture design (see
 * docs/asset-migration-plan.csv and the storage-architecture report) — this
 * file is the single place those bucket names are typed, so nothing else in
 * the codebase hardcodes a bucket string literal.
 */
export const STORAGE_BUCKETS = {
  publicMedia: "public-media",
  publicDocuments: "public-documents",
  privateEnquiryAttachments: "private-enquiry-attachments",
  privateCommercialPartnerDocuments: "private-commercial-partner-documents",
} as const;

export type StorageBucket = (typeof STORAGE_BUCKETS)[keyof typeof STORAGE_BUCKETS];
