export interface INgMaskConfig {
  allowNegative?: boolean;
  negativeSignAfter?: boolean;
  prefix?: string;
  suffix?: string;
  fixed?: boolean;
  fractionDigits?: number;
  decimalSeparator?: string;
  thousandsSeparator?: string;
  cursor?: 'end' | 'move' | 'start';
  align?: 'left' | 'center' | 'right';
  validator?: boolean;
  focusSelectText?: boolean;
}
