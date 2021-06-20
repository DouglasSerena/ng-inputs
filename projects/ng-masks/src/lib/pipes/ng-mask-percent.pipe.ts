import { Pipe, PipeTransform } from '@angular/core';
import { INgMaskConfig } from '../interfaces/ng-mask-config.interface';
import { NgMaskPercentService } from '../services/ng-mask-percent.service';

@Pipe({
  name: 'ngMaskPercent',
})
export class NgMaskPercentPipe implements PipeTransform {
  constructor(private ngMaskPercentService: NgMaskPercentService) {}

  transform(value: any, config?: INgMaskConfig): any {
    return this.ngMaskPercentService.format(value, config);
  }
}
