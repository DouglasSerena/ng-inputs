import { Injectable, Renderer2 } from '@angular/core';
import {
  IMaskServiceReturn,
  INgIMaskConfig,
  INgMaskConfig,
  INgMaskService,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class NgMaskAmountService implements INgMaskService {
  _config: INgMaskConfig = {
    allowNegative: true,
    fractionDigits: 3,
    decimalSeparator: ',',
    align: 'right',
    validator: true,
    focusSelectText: true,
  };

  createMask(
    inputRef: HTMLInputElement,
    config?: INgMaskConfig | INgIMaskConfig,
    renderer2?: Renderer2
  ) {
    config = Object.assign({}, this._config, config) as INgMaskConfig;

    const input = (event: Event) => {
      const input = event.target as HTMLInputElement;

      input.value = NgMaskAmountService.prototype._formatAmount(
        input.value,
        config as INgMaskConfig,
        (event as any).data
      ).valueFormat;
    };

    const focus = ({ target }) => {
      if ((config as INgMaskConfig).focusSelectText) {
        const length = target.value.length;
        target.setSelectionRange(0, length);
      }
    };

    if (renderer2) {
      renderer2.listen(inputRef, 'focus', focus);
      renderer2.listen(inputRef, 'input', input);
      renderer2.setStyle(inputRef, 'text-align', config.align);
    } else {
      inputRef.addEventListener('input', input);
      inputRef.addEventListener('focus', focus);
      inputRef.style.textAlign = config.align as string;
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
      type: 'amount',
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
    } as IMaskServiceReturn;
  }

  format(
    value: string | number,
    config?: INgMaskConfig | INgIMaskConfig
  ): string {
    config = Object.assign({}, this._config, config) as INgMaskConfig;
    return this._formatAmount(value, config).valueFormat;
  }

  _formatAmount(
    value: string | number,
    config: INgMaskConfig,
    data?: string | null
  ) {
    let negative = data === '-';
    value = value?.toString();

    if (/^0/g.test(value)) {
      value = value?.replace(/0+/, '');
    }

    if (new RegExp(config.decimalSeparator as string, 'g').test(value)) {
      value = value?.replace(config.decimalSeparator as string, '.');
    }

    if (value?.match('-')) {
      negative = true;
    }

    if (data === undefined) {
      value = Number.parseFloat(value)
        .toFixed(config.fractionDigits)
        .toString();
    }

    value = value?.replace(/\D/g, '');

    value =
      Number.parseFloat(value) / Math.pow(10, config.fractionDigits as number);

    if (Number.isNaN(value)) {
      value = 0;
    }

    if (negative && config.allowNegative) {
      value = -value;
    }

    value = value?.toFixed(config.fractionDigits);

    let valueFormat = value?.toString();

    value = Number.parseFloat(value);

    valueFormat = valueFormat.replace('.', config.decimalSeparator as string);

    return { valueFormat, value };
  }
}
