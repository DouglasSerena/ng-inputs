import { Injectable, Renderer2 } from '@angular/core';
import SimpleMaskMoney from 'simple-mask-money';
import { NgMaskConfig } from '../../interfaces/ng-mask-config.interface';
import currencyToSymbolMap from 'currency-symbol-map/map';
import calcJs from '@douglas-serena/calc.js';
import { IMaskCurrencyServiceReturn } from '../../interfaces/ng-mask-service-return.interface';
import { NgConfigService } from '../../config/ng-config.service';

@Injectable({
  providedIn: 'root',
})
export class NgMaskCurrencyService {
  private _locale = currencyToSymbolMap.BRL;
  private _config: NgMaskConfig = {
    allowNegative: true,
    negativeSignAfter: false,
    prefix: this._locale,
    suffix: '',
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: ',',
    thousandsSeparator: '.',
    align: 'right',
    cursor: 'end',
    validator: true,
    focusSelectText: true,
  };

  constructor(ngInputConfig: NgConfigService) {
    Object.assign(this._config, ngInputConfig.config.global?.input?.currency);
  }

  createMask(
    inputRef: HTMLInputElement,
    config?: NgMaskConfig,
    renderer2?: Renderer2
  ) {
    config = Object.assign({}, this._config, config);
    const instanceSimpleMaskMoneyRef = SimpleMaskMoney.setMask(
      inputRef,
      config
    );

    const focus = ({ target }) => {
      const length = target.value.length;
      target.setSelectionRange(0, length);
    };

    if (config.validator) {
      if (renderer2) {
        renderer2.listen(inputRef, 'focus', focus);
      } else {
        inputRef.addEventListener('focus', focus);
      }
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
      unmaskedValue() {
        return this._validRequired(this._instanceRef.formatToNumber());
      },
      update(value) {
        setTimeout(() => {
          this._inputRef.value = NgMaskCurrencyService.prototype.format(
            value,
            this._config
          );
        });
      },
    } as IMaskCurrencyServiceReturn;
  }

  format(value: string | number, config?: NgMaskConfig) {
    config = Object.assign({}, this._config, config);
    value = value.toString();
    value = value.replace(',', '.');
    value = calcJs(value).value.toString();
    value = value.replace('.', config.decimalSeparator as string);

    return SimpleMaskMoney.formatToCurrency(value, {
      ...config,
      allowNegative: false,
    } as NgMaskConfig);
  }
}
