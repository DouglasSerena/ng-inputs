import { Pipe, PipeTransform } from '@angular/core';
import { NgInputMasksService } from '../ng-input-masks.service';

@Pipe({
  name: 'dssMask',
})
export class NgMaskPipe implements PipeTransform {
  constructor(private maskService: NgInputMasksService) {}

  transform(
    value: any,
    type?:
      | 'TEL'
      | 'CPF'
      | 'CNPJ'
      | 'CPF_CNPJ'
      | 'RG'
      | 'RG_ESTADUAL'
      | 'CURRENCY'
      | 'PERCENT'
      | 'DATE'
      | 'AMOUNT'
      | string
  ): any {
    if (value) {
      if (type === undefined) {
        return value;
      }
      return this.maskService.format(value, type as 'currency');
    }
    return '-';
  }
}
