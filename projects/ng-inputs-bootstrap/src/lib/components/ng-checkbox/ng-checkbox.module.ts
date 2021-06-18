import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCheckboxComponent } from './ng-checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [NgCheckboxComponent],
  exports: [NgCheckboxComponent],
})
export class NgCheckboxModule {}
