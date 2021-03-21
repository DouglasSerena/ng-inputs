import { Pipe, PipeTransform } from '@angular/core';
import { NgInputMasksService } from '../ng-input-masks.service';

@Pipe({
  name: 'dssMask',
})
export class NgMaskPipe implements PipeTransform {
  constructor(private maskService: NgInputMasksService) {}

  typesMasks = [
    'tel',
    'cpf',
    'cnpj',
    'cpf_cnpj',
    'rg',
    'rg_estadual',
    'currency',
    'percent',
    'date',
  ];

  transform(
    value: any,
    type?:
      | 'tel'
      | 'cpf'
      | 'cnpj'
      | 'cpf_cnpj'
      | 'rg'
      | 'rg_estadual'
      | 'currency'
      | 'percent'
      | 'date'
      | string,
    mask?: string
  ): any {
    if (value) {
      if (type === undefined) return value;
      if (!this.typesMasks.includes(type)) {
        mask = type;
        type = undefined;
      }
      return this.maskService.format(value, type as 'currency', { mask });
    }
    return '-';
  }
}
