import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgAutocompleteComponent } from './ng-autocomplete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconModule } from '../../shared/ng-icon/ng-icon.module';
import { BaseModule } from '../../shared/base/base.module';

import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgMaskService } from '@douglas-serena/ng-masks';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    BaseModule,
    NgIconModule,
  ],
  declarations: [NgAutocompleteComponent],
  providers: [NgMaskService],
  exports: [NgAutocompleteComponent],
})
export class NgAutocompleteModule {}
