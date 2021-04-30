import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SelectCustomControlValueAccessor } from './select-custom-control-value-accessor.domain';
import { NgSearchComponent } from './ng-search/ng-search.component';
import { NgSelectComponent } from './ng-select/ng-select.component';

import { NgCoreModule } from '../core/ng-core.module';
import { NgDirectiveModule } from '../core/directive/ng-directive.module';

@NgModule({
  declarations: [
    NgSearchComponent,
    NgSelectComponent,
    SelectCustomControlValueAccessor,
  ],
  imports: [CommonModule, NgCoreModule, NgDirectiveModule],
  exports: [NgSearchComponent, NgSelectComponent, NgCoreModule],
})
export class NgSelectModule {}
