import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgAutocompleteComponent } from './ng-autocomplete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconModule } from '../../shared/ng-icon/ng-icon.module';
import { BaseModule } from '../../shared/base/base.module';
import { NgMaskService } from '@douglas-serena/ng-masks';
import { NgSelectDropdownComponent } from './ng-select-dropdown/ng-select-dropdown.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BaseModule,
    NgIconModule,
    OverlayModule,
  ],
  declarations: [NgAutocompleteComponent, NgSelectDropdownComponent],
  providers: [NgMaskService],
  exports: [NgAutocompleteComponent, NgSelectDropdownComponent],
})
export class NgAutocompleteModule {}
