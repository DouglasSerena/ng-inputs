import { NgModule } from '@angular/core';
import { NgMasksServicesModule } from '../../services/masks/ng-masks.module';

import { NgMaskPipe } from './ng-mask.pipe';
import { NgMaskAmountPipe } from './ng-mask-amount.pipe';
import { NgMaskCurrencyPipe } from './ng-mask-currency.pipe';
import { NgMaskPercentPipe } from './ng-mask-percent.pipe';

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
export class NgMaskPipeModule {}
