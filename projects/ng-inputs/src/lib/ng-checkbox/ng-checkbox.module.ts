import { NgModule } from '@angular/core';

import { NgCheckboxComponent } from './ng-checkbox.component';
import { NgCoreModule } from '../core/ng-core.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NgCheckboxComponent],
  imports: [CommonModule, NgCoreModule],
  exports: [NgCheckboxComponent, NgCoreModule],
})
export class NgCheckboxModule {}
