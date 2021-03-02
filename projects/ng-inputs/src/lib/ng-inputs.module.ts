import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgInputComponent } from './ng-input/ng-input.component';
import { NgSelectComponent } from './ng-select/ng-select.component';

@NgModule({
  declarations: [NgInputComponent, NgSelectComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, 
    MDBBootstrapModule.forRoot()],
  exports: [NgInputComponent, NgSelectComponent],
})
export class NgInputsModule {}
