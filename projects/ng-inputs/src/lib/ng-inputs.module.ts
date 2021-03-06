import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputCustomControlValueAccessor } from './input/input-custom-control-value-accessor.domain';

// INPUT
import { NgInputComponent } from './input/ng-input/ng-input.component';
import { NgTextAreaComponent } from './input/ng-text-area/ng-text-area.component';

// BUTTON
import { NgCheckboxComponent } from './ng-checkbox/ng-checkbox.component';

// SELECTS
import { NgSearchComponent } from './select/ng-search/ng-search.component';
import { NgSelectComponent } from './select/ng-select/ng-select.component';

// DOMAIN

@NgModule({
  declarations: [
    NgInputComponent,
    NgSelectComponent,
    NgCheckboxComponent,
    NgTextAreaComponent,
    NgSearchComponent,
    InputCustomControlValueAccessor,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [
    NgInputComponent,
    NgSelectComponent,
    NgCheckboxComponent,
    NgTextAreaComponent,
    NgSearchComponent,
  ],
})
export class NgInputsModule {}
