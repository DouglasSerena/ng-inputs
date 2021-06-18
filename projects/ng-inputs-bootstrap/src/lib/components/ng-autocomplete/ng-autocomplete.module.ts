import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgAutocompleteComponent } from './ng-autocomplete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMaskService } from '../../services/masks/ng-mask.service';
import { NgIconModule } from '../../shared/ng-icon/ng-icon.module';
import { BaseModule } from '../../shared/base/base.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, BaseModule, NgIconModule],
  declarations: [NgAutocompleteComponent],
  providers: [NgMaskService],
  exports: [NgAutocompleteComponent],
})
export class NgAutocompleteModule {}
