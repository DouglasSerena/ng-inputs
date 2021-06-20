import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgMaskAmountDirective } from './ng-mask-amount.directive';
import { NgMaskCurrencyDirective } from './ng-mask-currency.directive';
import { NgMaskPercentDirective } from './ng-mask-percent.directive';
import { NgMaskDirective } from './ng-mask.directive';

@NgModule({
  declarations: [
    NgMaskDirective,
    NgMaskAmountDirective,
    NgMaskPercentDirective,
    NgMaskCurrencyDirective,
  ],
  exports: [
    NgMaskDirective,
    NgMaskAmountDirective,
    NgMaskPercentDirective,
    NgMaskCurrencyDirective,
  ],
})
export class NgMasksDirectivesModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NgMasksDirectivesModule,
      providers: [],
    };
  }
}
