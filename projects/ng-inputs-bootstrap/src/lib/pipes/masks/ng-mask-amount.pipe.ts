import { Pipe, PipeTransform } from '@angular/core';
import { NgMaskConfig } from '../../interfaces/ng-mask-config.interface';
import { NgMaskAmountService } from '../../services/masks/ng-mask-amount.service';

@Pipe({
  name: 'ngMaskAmount',
})
export class NgMaskAmountPipe implements PipeTransform {
  constructor(private ngMaskAmountService: NgMaskAmountService) {}

  transform(value: any, config?: NgMaskConfig): any {
    return this.ngMaskAmountService.format(value, config);
  }
}
