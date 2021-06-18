import { NgIMaskConfig } from '../../interfaces/ng-imask-config.interface';
import { Injectable, Renderer2 } from '@angular/core';
import IMask from 'imask';

@Injectable({
  providedIn: 'root',
})
export class NgMaskService {
  createMask(
    inputRef: HTMLInputElement,
    mask?: NgIMaskConfig,
    renderer2?: Renderer2
  ) {
    let validator = true;

    mask = this.formatTypeMask(mask, validator);

    const instanceMoneyRef = IMask(inputRef, mask as any);

    const focus = ({ target }) => {
      const length = target.value.length;
      target.setSelectionRange(0, length);
    };

    if (validator) {
      if (renderer2) {
        renderer2.listen(inputRef, 'focus', focus);
      } else {
        inputRef.addEventListener('focus', focus);
      }
    }

    return {
      _instanceRef: instanceMoneyRef,
      _inputRef: inputRef,
      _validator: validator,
      _mask: mask,
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
      unmaskedValue() {
        return this._validRequired(this._instanceRef.unmaskedValue);
      },
      update(value) {
        setTimeout(() => {
          this._inputRef.value = NgMaskService.prototype.format(
            value,
            this._mask
          );
        });
      },
    } as any;
  }

  format(value: string | number, mask?: NgIMaskConfig) {
    mask = this.formatTypeMask(mask);
    return IMask.pipe(value.toString(), mask as any);
  }

  formatTypeMask(mask, validator = false) {
    if (!(typeof mask === 'string')) {
      mask = mask as any;
      if ((mask as any)?.validator) {
        validator = (mask as any)?.validator;
      }
    } else if (!!mask) {
      mask = {
        mask: mask.split('|').map((mask) => ({
          mask,
        })),
      };
    }
    return mask;
  }
}
