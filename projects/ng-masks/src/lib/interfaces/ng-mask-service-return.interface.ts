import { Renderer2 } from '@angular/core';

export interface IMaskServiceReturn {
  _instanceRef: any;
  _config: any;
  _inputRef: HTMLInputElement;
  _validator?: boolean;
  _renderer2?: Renderer2;
  _validRequired(value: string | number): null | string | number;
  update(value: string | number): void;
  unmaskedValue(): number;
}