import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent, MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgCheckboxComponent } from './ng-checkbox/ng-checkbox.component';
import { NgInputComponent } from './ng-input/ng-input.component';
import { NgSelectComponent } from './ng-select/ng-select.component';
import { NgTextAreaComponent } from './ng-text-area/ng-text-area.component';

@NgModule({
  declarations: [
    NgInputComponent,
    NgSelectComponent,
    NgCheckboxComponent,
    NgTextAreaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
  ],
  providers: [CheckboxComponent],
  exports: [
    NgInputComponent,
    NgSelectComponent,
    NgCheckboxComponent,
    NgTextAreaComponent,
  ],
})
export class NgInputsModule {}
