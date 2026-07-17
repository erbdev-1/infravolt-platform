declare const correlationIdBrand: unique symbol;

export type CorrelationId = string & {
  readonly [correlationIdBrand]: true;
};
