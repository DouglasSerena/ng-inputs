import { Injectable, Renderer2 } from '@angular/core';
import { NgMaskConfig } from '../../interfaces/ng-mask-config.interface';
import { IMaskCurrencyServiceReturn } from '../../interfaces/ng-mask-service-return.interface';
import { NgConfigService } from '../../config/ng-config.service';

@Injectable({
  providedIn: 'root',
})
export class NgMaskAmountService {
  private _config: NgMaskConfig = {
    allowNegative: true,
    fractionDigits: 3,
    decimalSeparator: ',',
    align: 'right',
    validator: true,
    focusSelectText: true,
  };

  constructor(ngInputConfig: NgConfigService) {
    Object.assign(this._config, ngInputConfig.config.global?.input?.amount);
  }

  createMask(
    inputRef: HTMLInputElement,
    config?: NgMaskConfig,
    renderer2?: Renderer2
  ) {
    config = Object.assign({}, this._config, config);

    const input = (event: Event) => {
      const input = event.target as HTMLInputElement;

      input.value = NgMaskAmountService.prototype._formatAmount(
        input.value,
        config as NgMaskConfig,
        (event as any).data
      ).valueFormat;
    };

    const focus = ({ target }) => {
      const length = target.value.length;
      target.setSelectionRange(0, length);
    };

    if (renderer2) {
      renderer2.listen(inputRef, 'input', input);
      if (config.validator) {
        renderer2.listen(inputRef, 'focus', focus);
      }
    } else {
      inputRef.addEventListener('input', input);
      if (config.validator) {
        inputRef.addEventListener('focus', focus);
      }
    }

    return {
      _instanceRef: null,
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
        return this._validRequired(
          NgMaskAmountService.prototype._formatAmount(
            this._inputRef.value,
            this._config
          ).value
        );
      },
      update(value) {
        setTimeout(() => {
          this._inputRef.value = NgMaskAmountService.prototype._formatAmount(
            value,
            this._config
          ).valueFormat;
        });
      },
    } as IMaskCurrencyServiceReturn;
  }

  format(value: string | number, config?: NgMaskConfig) {
    config = Object.assign({}, this._config, config);
    return this._formatAmount(value, config).valueFormat;
  }

  _formatAmount(
    value: string | number,
    config: NgMaskConfig,
    data?: string | null
  ) {
    let negative = data === '-';
    value = value.toString();

    if (/^0/g.test(value)) {
      value = value.replace(/0+/, '');
    }

    if (new RegExp(config.decimalSeparator as string, 'g').test(value)) {
      value = value.replace(config.decimalSeparator as string, '.');
    }

    if (value.match('-')) {
      negative = true;
    }

    if (data === undefined) {
      value = Number.parseFloat(value)
        .toFixed(config.fractionDigits)
        .toString();
    }

    value = value.replace(/\D/g, '');

    value =
      Number.parseFloat(value) / Math.pow(10, config.fractionDigits as number);

    if (Number.isNaN(value)) {
      value = 0;
    }

    if (negative && config.allowNegative) {
      value = -value;
    }

    value = value.toFixed(config.fractionDigits);

    let valueFormat = value.toString();

    value = Number.parseFloat(value);

    valueFormat = valueFormat.replace('.', config.decimalSeparator as string);

    return { valueFormat, value };
  }
}
