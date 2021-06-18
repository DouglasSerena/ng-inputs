import IMask from 'imask';

export const TEL = {
  mask: [{ mask: '(00) 0000-0000' }, { mask: '(00) 0 0000-0000' }],
} as IMask.AnyMaskedOptions;

export const CPF = {
  mask: '000.000.000-00',
} as IMask.AnyMaskedOptions;

export const CNPJ = {
  mask: '00.000.000/0000-00',
} as IMask.AnyMaskedOptions;

export const CPF_CNPJ = {
  mask: [CPF, CNPJ],
} as IMask.AnyMaskedOptions;

export const RG = {
  mask: '00.000.000-0',
} as IMask.AnyMaskedOptions;

export const ESTADUAL = {
  mask: '00.0.000.0000000-0',
} as IMask.AnyMaskedOptions;

export const RG_ESTADUAL = {
  mask: [RG, ESTADUAL],
} as IMask.AnyMaskedOptions;

export const ZIP_CODE = {
  mask: '00000-000',
} as IMask.AnyMaskedOptions;

export const typesCustom = [
  ...['ZIP_CODE', 'RG', 'RG_ESTADUAL', 'CPF_CNPJ', 'CNPJ', 'CPF', 'ESTADUAL'],
];
