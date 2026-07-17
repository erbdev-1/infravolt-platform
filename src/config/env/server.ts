import { z } from "zod";

import {
  EnvironmentValidationError,
  environmentVariableNames,
  omitUndefinedEnvironmentValues,
} from "./validation";

export const SERVER_ENVIRONMENT_VARIABLES = [
  "SUPABASE_SECRET_KEY",
  "RESEND_API_KEY",
  "RESEND_WEBHOOK_SECRET",
  "TURNSTILE_SECRET_KEY",
  "CRON_SECRET",
  "EMAIL_FROM_UK",
  "EMAIL_REPLY_TO_UK",
  "EMAIL_FROM_UA",
  "EMAIL_REPLY_TO_UA",
  "LOG_LEVEL",
] as const;

type EnvironmentInput = Record<string, string | undefined>;

const emptyStringToUndefined = (value: unknown): unknown =>
  typeof value === "string" && value.trim() === "" ? undefined : value;
const optionalServerValueSchema = z.preprocess(
  emptyStringToUndefined,
  z.string().trim().min(1).optional(),
);

function normalizeEmailMailbox(input: string): string {
  const candidate = input.trim();

  if (/[\r\n]/u.test(candidate)) {
    throw new Error("Invalid email mailbox");
  }

  if (z.email().safeParse(candidate).success) {
    return candidate;
  }

  const displayMailbox = candidate.match(/^([^<>]+?)\s*<([^<>]+)>$/u);

  if (!displayMailbox) {
    throw new Error("Invalid email mailbox");
  }

  const displayName = displayMailbox[1].trim();
  const address = displayMailbox[2].trim();

  if (!displayName || !z.email().safeParse(address).success) {
    throw new Error("Invalid email mailbox");
  }

  return `${displayName} <${address}>`;
}

const emailMailboxSchema = z
  .string()
  .trim()
  .min(1)
  .superRefine((value, context) => {
    try {
      normalizeEmailMailbox(value);
    } catch {
      context.addIssue({
        code: "custom",
        message: "Invalid email mailbox",
      });
    }
  })
  .transform((value) => normalizeEmailMailbox(value));
const optionalEmailMailboxSchema = z.preprocess(
  emptyStringToUndefined,
  emailMailboxSchema.optional(),
);

const serverEnvironmentSchema = z.object({
  SUPABASE_SECRET_KEY: optionalServerValueSchema,
  RESEND_API_KEY: optionalServerValueSchema,
  RESEND_WEBHOOK_SECRET: optionalServerValueSchema,
  TURNSTILE_SECRET_KEY: optionalServerValueSchema,
  CRON_SECRET: optionalServerValueSchema,
  EMAIL_FROM_UK: optionalEmailMailboxSchema,
  EMAIL_REPLY_TO_UK: optionalEmailMailboxSchema,
  EMAIL_FROM_UA: optionalEmailMailboxSchema,
  EMAIL_REPLY_TO_UA: optionalEmailMailboxSchema,
  LOG_LEVEL: z.preprocess(
    emptyStringToUndefined,
    z.enum(["debug", "info", "warn", "error"]).optional(),
  ),
});

export type ServerEnvironment = z.output<typeof serverEnvironmentSchema>;

function pickServerEnvironment(input: EnvironmentInput): EnvironmentInput {
  return Object.fromEntries(
    SERVER_ENVIRONMENT_VARIABLES.map((variable) => [
      variable,
      input[variable],
    ]).filter((entry): entry is [(typeof SERVER_ENVIRONMENT_VARIABLES)[number], string] =>
      entry[1] !== undefined,
    ),
  );
}

export function parseServerEnvironment(
  input: EnvironmentInput,
): ServerEnvironment {
  const result = serverEnvironmentSchema.safeParse(pickServerEnvironment(input));

  if (!result.success) {
    throw new EnvironmentValidationError(environmentVariableNames(result.error));
  }

  return omitUndefinedEnvironmentValues(result.data);
}

export function readServerEnvironment(): ServerEnvironment {
  return parseServerEnvironment({
    SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_WEBHOOK_SECRET: process.env.RESEND_WEBHOOK_SECRET,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
    CRON_SECRET: process.env.CRON_SECRET,
    EMAIL_FROM_UK: process.env.EMAIL_FROM_UK,
    EMAIL_REPLY_TO_UK: process.env.EMAIL_REPLY_TO_UK,
    EMAIL_FROM_UA: process.env.EMAIL_FROM_UA,
    EMAIL_REPLY_TO_UA: process.env.EMAIL_REPLY_TO_UA,
    LOG_LEVEL: process.env.LOG_LEVEL,
  });
}
