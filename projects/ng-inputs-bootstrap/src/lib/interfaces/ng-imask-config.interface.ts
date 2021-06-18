import IMask from 'imask';

export type NgIMaskConfig =
  | IMask.AnyMaskedOptions
  | { validator: boolean }
  | string;
