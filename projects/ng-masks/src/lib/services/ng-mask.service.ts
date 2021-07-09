import { Injectable, Renderer2 } from '@angular/core';
import IMask from 'imask';
import {
  IMaskServiceReturn,
  INgIMaskConfig,
  INgMaskConfig,
  INgMaskService,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class NgMaskService implements INgMaskService {
  _config: INgIMaskConfig = { validator: true };

  createMask(
    inputRef: HTMLInputElement,
    mask?: INgIMaskConfig | INgMaskConfig,
    renderer2?: Renderer2
  ) {
    mask = this.formatTypeMask(mask);

    this._config = Object.assign({}, this._config, mask) as INgIMaskConfig;

    const instanceMoneyRef = IMask(inputRef, this._config as any);

    return {
      _instanceRef: instanceMoneyRef,
      _inputRef: inputRef,
      _validator: (this._config as any).validator,
      _config: this._config,
      _renderer2: renderer2,
      _validRequired(value): any {
        if (this._validator) {
          if (typeof value === 'string') {
            return value.length === 0 ? null : value;
          } else if (typeof value === 'number') {
            return value === 0 ? null : value;
          }
        }
        return value;
      },
      type: 'custom',
      unmaskedValue() {
        return this._validRequired(this._instanceRef.unmaskedValue);
      },
      update(value) {
        setTimeout(() => {
          this._inputRef.value = NgMaskService.prototype.format(
            value,
            this._config
          );
        });
      },
    } as IMaskServiceReturn;
  }

  format(value: string | number, mask?: INgIMaskConfig | INgMaskConfig) {
    mask = this.formatTypeMask(mask);
    return IMask.pipe(value ? value.toString() : '', mask as any) as string;
  }

  formatTypeMask(mask: INgIMaskConfig | INgMaskConfig) {
    let newMask = mask;
    if (typeof mask === 'string') {
      newMask = {
        mask: mask.split('|').map((mask) => ({
          mask,
        })),
      } as INgIMaskConfig;
    }
    return newMask;
  }
}
