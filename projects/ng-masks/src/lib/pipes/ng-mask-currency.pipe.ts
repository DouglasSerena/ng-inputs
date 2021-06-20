import { Pipe, PipeTransform } from '@angular/core';
import { INgMaskConfig } from '../interfaces/ng-mask-config.interface';
import { NgMaskCurrencyService } from '../services/ng-mask-currency.service';

@Pipe({
  name: 'ngMaskCurrency',
})
export class NgMaskCurrencyPipe implements PipeTransform {
  constructor(private ngMaskCurrencyService: NgMaskCurrencyService) {}

  transform(value: any, config?: INgMaskConfig): any {
    return this.ngMaskCurrencyService.format(value, config);
  }
}
