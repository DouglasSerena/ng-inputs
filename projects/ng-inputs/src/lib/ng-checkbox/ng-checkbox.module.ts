import { NgModule } from '@angular/core';

import { NgCheckboxComponent } from './ng-checkbox.component';
import { NgCoreModule } from '../core/ng-core.module';

@NgModule({
  declarations: [NgCheckboxComponent],
  imports: [NgCoreModule],
  exports: [NgCheckboxComponent, NgCoreModule],
})
export class NgCheckboxModule {}
