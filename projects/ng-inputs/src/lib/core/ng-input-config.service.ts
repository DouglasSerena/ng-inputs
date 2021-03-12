import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NgInputConfigService {
  private _field: 'floating' | 'group' = 'floating';
  get field() {
    return this._field;
  }
  set field(value: 'floating' | 'group') {
    this._field = value;
  }

  private _theme: 'bootstrap' | 'materialize' = 'bootstrap';
  get theme() {
    return this._theme;
  }
  set theme(value: 'bootstrap' | 'materialize') {
    this._theme = value;
  }
  private _currency: ISimplesMaskMoney = {
    allowNegative: true,
    negativeSignAfter: false,
    prefix: '',
    suffix: '',
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: ',',
    thousandsSeparator: '.',
    align: 'right',
    cursor: 'end',
  };
  get currency() {
    return this._currency;
  }
  set currency(value: ISimplesMaskMoney) {
    this._currency = {
      ...this._currency,
      ...value,
      suffix: value.suffix?.trim(),
      prefix: value.prefix?.trim(),
    };
  }
  private _percent: ISimplesMaskMoney = {
    allowNegative: true,
    negativeSignAfter: false,
    prefix: '',
    suffix: '%',
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: '.',
    thousandsSeparator: '',
    align: 'right',
    cursor: 'end',
  };
  get percent() {
    return this._percent;
  }
  set percent(value: ISimplesMaskMoney) {
    this._percent = {
      ...this._percent,
      ...value,
      suffix: value.suffix?.trim(),
      prefix: value.prefix?.trim(),
    };
  }
  private _environments = {
    debug: false,
    url: 'http://localhost:4200',
  };
  get environments() {
    return this._environments;
  }
  set environments(value: IEnvironments) {
    this._environments = { ...this._environments, ...value };
  }
}

export interface INgInputConfig {
  theme?: 'bootstrap' | 'materialize';
  field?: 'floating' | 'group';
  currency?: ISimplesMaskMoney;
  percent?: ISimplesMaskMoney;
  environments?: IEnvironments;
}

interface IEnvironments {
  debug?: boolean;
  url?: string;
  [key: string]: any;
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
  align?: 'left' | 'right';
}
