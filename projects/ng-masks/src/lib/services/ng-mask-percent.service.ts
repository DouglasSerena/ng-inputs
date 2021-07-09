import { Injectable, Renderer2 } from '@angular/core';
import SimpleMaskMoney from 'simple-mask-money';
import calcJs from '@douglas-serena/calc.js';
import {
  IMaskServiceReturn,
  INgIMaskConfig,
  INgMaskConfig,
  INgMaskService,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class NgMaskPercentService implements INgMaskService {
  _config: INgMaskConfig = {
    allowNegative: true,
    negativeSignAfter: false,
    prefix: '',
    suffix: '%',
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: ',',
    thousandsSeparator: '.',
    align: 'right',
    cursor: 'end',
    validator: true,
    focusSelectText: true,
  };

  createMask(
    inputRef: HTMLInputElement,
    config?: INgMaskConfig | INgIMaskConfig,
    renderer2?: Renderer2
  ): IMaskServiceReturn {
    config = Object.assign({}, this._config, config) as INgMaskConfig;

    const instanceSimpleMaskMoneyRef = SimpleMaskMoney.setMask(
      inputRef,
      config
    );

    const focus = ({ target }) => {
      if ((config as INgMaskConfig).focusSelectText) {
        const length = target.value.length;
        target.setSelectionRange(0, length);
      }
    };

    if (renderer2) {
      renderer2.listen(inputRef, 'focus', focus);
      renderer2.setStyle(inputRef, 'text-align', config.align);
    } else {
      inputRef.addEventListener('focus', focus);
      inputRef.style.textAlign = config.align as string;
    }

    return {
      _instanceRef: instanceSimpleMaskMoneyRef,
      _inputRef: inputRef,
      _config: config,
      _renderer2: renderer2,
      _validRequired(value: string | number): any {
        if (this._config.validator) {
          if (typeof value === 'string') {
            return value.length === 0 ? null : value;
          } else if (typeof value === 'number') {
            return value === 0 ? null : value;
          }
        }
        return value;
      },
      type: 'percent',
      unmaskedValue() {
        return this._validRequired(this._instanceRef.formatToNumber());
      },
      update(value) {
        setTimeout(() => {
          this._inputRef.value = NgMaskPercentService.prototype.format(
            value,
            this._config
          );
        });
      },
    } as IMaskServiceReturn;
  }

  format(value: string | number, config?: INgMaskConfig | INgIMaskConfig) {
    config = Object.assign({}, this._config, config) as INgMaskConfig;
    value = value?.toString();
    value = value?.replace(',', '.');
    value = calcJs(value).value.toString();
    value = value.replace('.', config.decimalSeparator as string);

    return SimpleMaskMoney.formatToCurrency(value, {
      ...config,
      allowNegative: false,
    } as INgMaskConfig);
  }
}
