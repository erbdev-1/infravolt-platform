import type { z } from "zod";

export type EnvironmentMode = "development" | "production" | "test";

export class EnvironmentValidationError extends Error {
  readonly variables: readonly string[];

  constructor(variables: Iterable<string>) {
    const uniqueVariables = [...new Set(variables)].sort();

    super(`Invalid environment variable(s): ${uniqueVariables.join(", ")}`);
    this.name = "EnvironmentValidationError";
    this.variables = uniqueVariables;
  }
}

export function environmentVariableNames(
  error: z.ZodError,
): readonly string[] {
  return error.issues.map((issue) => {
    const variable = issue.path[0];

    return typeof variable === "string" ? variable : "UNKNOWN_ENVIRONMENT_VARIABLE";
  });
}

export function omitUndefinedEnvironmentValues<
  Environment extends Record<string, unknown>,
>(environment: Environment): Environment {
  return Object.fromEntries(
    Object.entries(environment).filter(([, value]) => value !== undefined),
  ) as Environment;
}
