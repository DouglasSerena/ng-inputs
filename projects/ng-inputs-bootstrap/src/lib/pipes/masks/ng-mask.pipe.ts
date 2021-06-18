import { Pipe, PipeTransform } from '@angular/core';
import * as MASKS from '../../config/MASKS';
import { NgIMaskConfig } from '../../interfaces/ng-imask-config.interface';
import { NgMaskService } from '../../services/masks/ng-mask.service';

@Pipe({
  name: 'ngMask',
})
export class NgMaskPipe implements PipeTransform {
  constructor(private ngMaskService: NgMaskService) {}

  transform(value: any, mask?: NgIMaskConfig | string): any {
    if (typeof mask === 'string') {
      mask = mask.toUpperCase();
      if (MASKS.typesCustom.includes(mask)) {
        mask = MASKS[mask];
      }
    }
    return this.ngMaskService.format(value, mask);
  }
}
