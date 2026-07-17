import type { CorrelationId } from "./correlation-id";

export type Success<T> = Readonly<{
  ok: true;
  data: T;
}>;

export type FieldErrors = Readonly<Record<string, readonly string[]>>;

export type ResultError = Readonly<{
  code: string;
  message: string;
  fieldErrors?: FieldErrors;
  correlationId?: CorrelationId;
}>;

export type Failure = Readonly<{
  ok: false;
  error: ResultError;
}>;

export type Result<T> = Success<T> | Failure;
