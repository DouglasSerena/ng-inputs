import { Pipe, PipeTransform } from '@angular/core';
import { NgMaskConfig } from '../../interfaces/ng-mask-config.interface';
import { NgMaskPercentService } from '../../services/masks/ng-mask-percent.service';

@Pipe({
  name: 'ngMaskPercent',
})
export class NgMaskPercentPipe implements PipeTransform {
  constructor(private ngMaskPercentService: NgMaskPercentService) {}

  transform(value: any, config?: NgMaskConfig): any {
    return this.ngMaskPercentService.format(value, config);
  }
}
