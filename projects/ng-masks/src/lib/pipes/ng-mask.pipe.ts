import { Pipe, PipeTransform } from '@angular/core';
import { INgIMaskConfig } from '../interfaces/ng-imask-config.interface';
import { NgMaskService } from '../services/ng-mask.service';
import * as MASKS from './../utils/MASKS';

@Pipe({
  name: 'ngMask',
})
export class NgMaskPipe implements PipeTransform {
  constructor(private ngMaskService: NgMaskService) {}

  transform(value: any, mask?: INgIMaskConfig | string): any {
    if (typeof mask === 'string') {
      if (MASKS.typesCustom.includes(mask.toUpperCase())) {
        mask = MASKS[mask];
      }
    }
    return this.ngMaskService.format(value, mask);
  }
}
