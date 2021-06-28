export interface Palettes {
  dark?: Colors;
  light?: Colors;
  [key: string]: Colors;
}
export interface Colors {
  primary?: Color;
  secondary?: Color;
  background?: Color;
  text?: Color;
  [key: string]: Color;
}
export interface Color {
  default: string;
  dark?: string;
  light?: string;
}
