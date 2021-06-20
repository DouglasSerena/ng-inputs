import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgMaskAmountService } from './ng-mask-amount.service';
import { NgMaskCurrencyService } from './ng-mask-currency.service';
import { NgMaskPercentService } from './ng-mask-percent.service';

@NgModule({
  providers: [NgMaskAmountService, NgMaskCurrencyService, NgMaskPercentService],
})
export class NgMasksServicesModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NgMasksServicesModule,
      providers: [
        NgMaskAmountService,
        NgMaskCurrencyService,
        NgMaskPercentService,
      ],
    };
  }
}
