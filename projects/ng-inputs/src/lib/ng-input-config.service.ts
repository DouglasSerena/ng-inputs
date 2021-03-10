import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NgInputConfigService {
  _theme: 'bootstrap' | 'materialize' = 'bootstrap';
  get theme() {
    return this._theme;
  }
  set theme(value: 'bootstrap' | 'materialize') {
    this._theme = value;
  }
  _currency: ISimplesMaskMoney = {
    allowNegative: true,
    negativeSignAfter: false,
    prefix: '',
    suffix: '',
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: ',',
    thousandsSeparator: '.',
    cursor: 'end',
  };
  get currency() {
    return this._currency;
  }
  set currency(value: ISimplesMaskMoney) {
    this._currency = { ...this._currency, ...value };
  }
}

export interface INgInputConfig {
  theme?: 'bootstrap' | 'materialize';
  currency?: ISimplesMaskMoney;
}
interface ISimplesMaskMoney {
  allowNegative?: boolean;
  negativeSignAfter?: boolean;
  prefix?: string;
  suffix?: string;
  fixed?: boolean;
  fractionDigits?: number;
  decimalSeparator?: string;
  thousandsSeparator?: string;
  cursor?: 'end' | 'move' | 'start';
}
