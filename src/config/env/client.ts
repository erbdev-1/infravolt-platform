import { z } from "zod";

import { configuredUrlSchema } from "./url";
import {
  EnvironmentValidationError,
  environmentVariableNames,
  omitUndefinedEnvironmentValues,
  type EnvironmentMode,
} from "./validation";

export const CLIENT_ENVIRONMENT_VARIABLES = [
  "NEXT_PUBLIC_SITE_URL_UK",
  "NEXT_PUBLIC_SITE_URL_UA",
  "NEXT_PUBLIC_PROTECTED_APP_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
] as const;

type ClientEnvironmentVariable = (typeof CLIENT_ENVIRONMENT_VARIABLES)[number];
type EnvironmentInput = Record<string, string | undefined>;

const emptyStringToUndefined = (value: unknown): unknown =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

const optionalUrlSchema = z.preprocess(
  emptyStringToUndefined,
  configuredUrlSchema.optional(),
);
const optionalPublicValueSchema = z.preprocess(
  emptyStringToUndefined,
  z.string().trim().min(1).optional(),
);

const clientEnvironmentSchema = z.object({
  NEXT_PUBLIC_SITE_URL_UK: optionalUrlSchema,
  NEXT_PUBLIC_SITE_URL_UA: optionalUrlSchema,
  NEXT_PUBLIC_PROTECTED_APP_URL: optionalUrlSchema,
  NEXT_PUBLIC_SUPABASE_URL: optionalUrlSchema,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: optionalPublicValueSchema,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: optionalPublicValueSchema,
});

const productionRequiredVariables = [
  "NEXT_PUBLIC_SITE_URL_UK",
  "NEXT_PUBLIC_SITE_URL_UA",
] as const satisfies readonly ClientEnvironmentVariable[];

export type ClientEnvironment = z.output<typeof clientEnvironmentSchema>;

function pickClientEnvironment(input: EnvironmentInput): EnvironmentInput {
  return Object.fromEntries(
    CLIENT_ENVIRONMENT_VARIABLES.map((variable) => [
      variable,
      input[variable],
    ]).filter((entry): entry is [ClientEnvironmentVariable, string] =>
      entry[1] !== undefined,
    ),
  );
}

export function parseClientEnvironment(
  input: EnvironmentInput,
  mode: EnvironmentMode,
): ClientEnvironment {
  const result = clientEnvironmentSchema.safeParse(pickClientEnvironment(input));

  if (!result.success) {
    throw new EnvironmentValidationError(environmentVariableNames(result.error));
  }

  if (mode === "production") {
    const missingVariables = productionRequiredVariables.filter(
      (variable) => result.data[variable] === undefined,
    );

    if (missingVariables.length > 0) {
      throw new EnvironmentValidationError(missingVariables);
    }
  }

  return omitUndefinedEnvironmentValues(result.data);
}

export function readClientEnvironment(
  mode: EnvironmentMode,
): ClientEnvironment {
  return parseClientEnvironment(
    {
      NEXT_PUBLIC_SITE_URL_UK: process.env.NEXT_PUBLIC_SITE_URL_UK,
      NEXT_PUBLIC_SITE_URL_UA: process.env.NEXT_PUBLIC_SITE_URL_UA,
      NEXT_PUBLIC_PROTECTED_APP_URL:
        process.env.NEXT_PUBLIC_PROTECTED_APP_URL,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      NEXT_PUBLIC_TURNSTILE_SITE_KEY:
        process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    },
    mode,
  );
}
