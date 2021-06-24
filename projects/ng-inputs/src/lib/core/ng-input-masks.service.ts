import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

import IMask from 'imask';
import SimpleMaskMoney from 'simple-mask-money';
import { NgInputConfigService } from './ng-input-config.service';

import calcJs from '@douglas-serena/calc.js';
import { MASKS } from './MASKS';

@Injectable({
  providedIn: 'root',
})
export class NgInputMasksService {
  constructor(
    private configService: NgInputConfigService,
    private datePipe: DatePipe
  ) {}

  format(value: string | number, masksType?: string, options?: IOptions) {
    masksType = masksType.toUpperCase();
    if (masksType === 'DATE') {
      return this.datePipe.transform(
        value,
        options?.mask === undefined ? 'dd/MM/yyyy' : options.mask
      );
    }
    if (masksType === 'CURRENCY' || masksType === 'PERCENT') {
      const config = this.configService[masksType.toLowerCase()];
      if (options?.allowNegative !== undefined)
        config.allowNegative = options.allowNegative;

      value = calcJs(`${value}`.replace(/[,.]/g, '.'))
        .toString()
        .replace('.', config.decimalSeparator as string)
        .replace((config.decimalSeparator as string) + '00', '');

      return SimpleMaskMoney.formatToCurrency(value, config);
    }
    if (masksType === 'AMOUNT') {
      value = `${value}`;

      if (/^0/g.test(value)) {
        value = value.replace(/0+/, '');
      }

      let result = Number(value);

      if (Number.isNaN(result)) {
        result = 0;
      }

      return result.toFixed(3);
    }

    let mask: any = null;
    if (masksType) mask = MASKS[masksType as any];
    if (options?.mask) {
      mask = {
        mask: options?.mask.split('|').map((mask) => ({
          mask,
        })),
      } as IMask.AnyMaskedOptions;
    }

    return IMask.pipe(value, mask);
  }

  set(element: HTMLInputElement, masksType: string, options?: IOptions) {
    masksType = masksType.toUpperCase();
    if (masksType === 'CURRENCY' || masksType === 'PERCENT') {
      const config = this.configService[masksType.toLowerCase()];
      if (options?.allowNegative !== undefined)
        config.allowNegative = options.allowNegative;
      return SimpleMaskMoney.setMask(element, config);
    }

    let mask: any = null;
    if (masksType) {
      mask = MASKS[masksType as any];
    }
    if (options?.mask) {
      mask = {
        mask: options?.mask.split('|').map((mask) => ({
          mask,
        })),
      } as IMask.AnyMaskedOptions;
    }

    return IMask(element, mask);
  }
}

interface IOptions {
  allowNegative?: boolean;
  mask?: string;
}
