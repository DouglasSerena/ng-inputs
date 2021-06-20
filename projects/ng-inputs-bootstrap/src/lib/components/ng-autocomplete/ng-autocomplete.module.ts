import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgAutocompleteComponent } from './ng-autocomplete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconModule } from '../../shared/ng-icon/ng-icon.module';
import { BaseModule } from '../../shared/base/base.module';
import { NgMaskService } from '@douglas-serena/ng-masks';
import { NgUtilsDirectiveModule } from '../../directives/utils/ng-utils.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgUtilsDirectiveModule,
    BaseModule,
    NgIconModule,
  ],
  declarations: [NgAutocompleteComponent],
  providers: [NgMaskService],
  exports: [NgAutocompleteComponent],
})
export class NgAutocompleteModule {}
