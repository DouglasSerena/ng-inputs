import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

import IMask from 'imask';
import SimpleMaskMoney from 'simple-mask-money';
import { NgInputConfigService } from './ng-input-config.service';

import calcJs from '@douglas-serena/calc.js';

@Injectable({
  providedIn: 'root',
})
export class NgInputMasksService {
  constructor(
    private configService: NgInputConfigService,
    private datePipe: DatePipe
  ) {}

  format(
    value: string | number,
    masksType?:
      | 'tel'
      | 'cpf'
      | 'cnpj'
      | 'cpf_cnpj'
      | 'rg'
      | 'rg_estadual'
      | 'currency'
      | 'percent'
      | 'date'
      | 'zipCode',
    options?: IOptions
  ) {
    if (masksType === 'date') {
      return this.datePipe.transform(
        value,
        options?.mask === undefined ? 'dd/MM/yyyy' : options.mask
      );
    }
    if (masksType === 'currency' || masksType === 'percent') {
      const config = this.configService[masksType];
      if (options?.allowNegative !== undefined)
        config.allowNegative = options.allowNegative;

      value = calcJs(`${value}`.replace(/[,.]/g, '.'))
        .toString()
        .replace('.', config.decimalSeparator as string)
        .replace((config.decimalSeparator as string) + '00', '');

      return SimpleMaskMoney.formatToCurrency(value, config);
    }

    let mask: any = null;
    if (masksType) mask = this[masksType as any];
    if (options?.mask) {
      mask = {
        mask: options?.mask.split('|').map((mask) => ({
          mask,
        })),
      } as IMask.AnyMaskedOptions;
    }

    return IMask.pipe(value, mask);
  }

  set(
    element: HTMLInputElement,
    masksType:
      | 'tel'
      | 'cpf'
      | 'cnpj'
      | 'cpf_cnpj'
      | 'rg'
      | 'rg_estadual'
      | 'currency'
      | 'zipCode'
      | 'percent',
    options?: IOptions
  ) {
    if (masksType === 'currency' || masksType === 'percent') {
      const config = this.configService[masksType];
      if (options?.allowNegative !== undefined)
        config.allowNegative = options.allowNegative;
      return SimpleMaskMoney.setMask(element, config);
    }

    let mask: any = null;
    if (masksType) {
      mask = this[masksType as any];
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
