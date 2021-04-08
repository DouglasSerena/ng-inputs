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

      value = calcJs(`${value}`.replace(/[,.]/g, '.')).toString();

      return SimpleMaskMoney.formatToCurrency(
        value.replace(
          /[,.]/g,
          this.configService[masksType].decimalSeparator as string
        ),
        config
      );
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
    if (masksType) mask = this[masksType as any];
    if (options?.mask) {
      mask = {
        mask: options?.mask.split('|').map((mask) => ({
          mask,
        })),
      } as IMask.AnyMaskedOptions;
    }

    return IMask(element, mask);
  }

  get tel() {
    return {
      mask: [{ mask: '(00) 0000-0000' }, { mask: '(00) 0 0000-0000' }],
    } as IMask.AnyMaskedOptions;
  }
  get cpf() {
    return {
      mask: '000.000.000-00',
    } as IMask.AnyMaskedOptions;
  }
  get cnpj() {
    return {
      mask: '00.000.000/0000-00',
    } as IMask.AnyMaskedOptions;
  }
  get cpf_cnpj() {
    return {
      mask: [this.cpf, this.cnpj],
    } as IMask.AnyMaskedOptions;
  }
  get rg() {
    return {
      mask: '00.000.000-0',
    } as IMask.AnyMaskedOptions;
  }
  get estadual() {
    return {
      mask: '00.0.000.0000000-0',
    } as IMask.AnyMaskedOptions;
  }
  get rg_estadual() {
    return {
      mask: [this.rg, this.estadual],
    } as IMask.AnyMaskedOptions;
  }
  get zipCode() {
    return {
      mask: '00000-000',
    } as IMask.AnyMaskedOptions;
  }
}

interface IOptions {
  allowNegative?: boolean;
  mask?: string;
}
