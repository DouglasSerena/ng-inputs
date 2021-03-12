import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectCustomControlValueAccessor } from './select-custom-control-value-accessor.domain';
import { NgSearchComponent } from './ng-search/ng-search.component';
import { NgSelectComponent } from './ng-select/ng-select.component';

import { NgCoreModule } from '../core/ng-core.module';

@NgModule({
  declarations: [
    NgSearchComponent,
    NgSelectComponent,
    SelectCustomControlValueAccessor,
  ],
  imports: [NgCoreModule, HttpClientModule],
  exports: [
    NgSearchComponent,
    NgSelectComponent,
    SelectCustomControlValueAccessor,
    NgCoreModule,
  ],
})
export class NgSelectModule {}
