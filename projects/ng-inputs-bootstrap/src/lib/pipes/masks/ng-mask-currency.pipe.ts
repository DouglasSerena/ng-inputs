import { Pipe, PipeTransform } from '@angular/core';
import { NgMaskConfig } from '../../interfaces/ng-mask-config.interface';
import { NgMaskCurrencyService } from '../../services/masks/ng-mask-currency.service';

@Pipe({
  name: 'ngMaskCurrency',
})
export class NgMaskCurrencyPipe implements PipeTransform {
  constructor(private ngMaskCurrencyService: NgMaskCurrencyService) {}

  transform(value: any, config?: NgMaskConfig): any {
    return this.ngMaskCurrencyService.format(value, config);
  }
}
