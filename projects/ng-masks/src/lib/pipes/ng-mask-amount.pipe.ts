import { Pipe, PipeTransform } from '@angular/core';
import { INgMaskConfig } from '../interfaces/ng-mask-config.interface';
import { NgMaskAmountService } from '../services/ng-mask-amount.service';

@Pipe({
  name: 'ngMaskAmount',
})
export class NgMaskAmountPipe implements PipeTransform {
  constructor(private ngMaskAmountService: NgMaskAmountService) {}

  transform(value: any, config?: INgMaskConfig): any {
    return this.ngMaskAmountService.format(value, config);
  }
}
