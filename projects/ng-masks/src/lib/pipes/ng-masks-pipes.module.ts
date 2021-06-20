import { NgModule } from '@angular/core';

import { NgMaskPipe } from './ng-mask.pipe';
import { NgMaskAmountPipe } from './ng-mask-amount.pipe';
import { NgMaskCurrencyPipe } from './ng-mask-currency.pipe';
import { NgMaskPercentPipe } from './ng-mask-percent.pipe';
import { NgMasksServicesModule } from '../services/ng-masks-services.module';

@NgModule({
  imports: [NgMasksServicesModule],
  declarations: [
    NgMaskPipe,
    NgMaskAmountPipe,
    NgMaskPercentPipe,
    NgMaskCurrencyPipe,
  ],
  exports: [
    NgMaskPipe,
    NgMaskAmountPipe,
    NgMaskPercentPipe,
    NgMaskCurrencyPipe,
  ],
})
export class NgMasksPipesModule {}
