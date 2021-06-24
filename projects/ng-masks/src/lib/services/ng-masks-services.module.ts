import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgMaskAmountService } from './ng-mask-amount.service';
import { NgMaskCurrencyService } from './ng-mask-currency.service';
import { NgMaskPercentService } from './ng-mask-percent.service';
import { NgMaskService } from './ng-mask.service';

@NgModule({
  providers: [
    NgMaskAmountService,
    NgMaskCurrencyService,
    NgMaskPercentService,
    NgMaskService,
  ],
})
export class NgMasksServicesModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NgMasksServicesModule,
      providers: [
        NgMaskAmountService,
        NgMaskCurrencyService,
        NgMaskPercentService,
        NgMaskService,
      ],
    };
  }
}
