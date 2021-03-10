import { Injectable } from '@angular/core';

import IMask from 'imask';
import SimpleMaskMoney from 'simple-mask-money';
import { NgInputConfigService } from './ng-input-config.service';

@Injectable({
  providedIn: 'root',
})
export class NgInputMasksService {
  constructor(private configService: NgInputConfigService) {
    SimpleMaskMoney.args = configService.currency;
  }

  format(
    value: string | number,
    masks:
      | 'tel'
      | 'cpf'
      | 'cnpj'
      | 'cpf_cnpj'
      | 'rg'
      | 'rg_estadual'
      | 'currency'
  ) {
    return masks === 'currency'
      ? SimpleMaskMoney.formatToCurrency(`${value}`.replace('.', ','))
      : IMask.pipe(value, this[masks as any]);
  }

  set(
    element: HTMLInputElement,
    masks:
      | 'tel'
      | 'cpf'
      | 'cnpj'
      | 'cpf_cnpj'
      | 'rg'
      | 'rg_estadual'
      | 'currency'
  ) {
    return masks === 'currency'
      ? SimpleMaskMoney.setMask(element, this.configService.currency)
      : IMask(element, this[masks]);
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
  get cep() {
    return {
      mask: '00000-000',
    } as IMask.AnyMaskedOptions;
  }
}
