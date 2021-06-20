import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCheckboxComponent } from './ng-checkbox.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule],
  declarations: [NgCheckboxComponent],
  exports: [NgCheckboxComponent],
})
export class NgCheckboxModule {}
