import IMask from 'imask';

export type INgIMaskConfig =
  | IMask.AnyMaskedOptions
  | { validator: boolean }
  | string;
