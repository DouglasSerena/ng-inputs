export type colorScheme = 'dark' | 'light' | 'no-preference';

export interface Palettes {
  dark?: Colors;
  light?: Colors;
  [key: string]: Colors;
}
export interface Colors {
  colorScheme?: colorScheme;
  primary?: Color | string;
  secondary?: Color | string;
  background?: Color | string;
  text?: Color | string;
  danger?: Color | string;
  warning?: Color | string;
  success?: Color | string;
  [key: string]: Color | string;
}
export interface Color {
  default: string;
  dark?: string;
  light?: string;
  [key: string]: Color | string;
}
