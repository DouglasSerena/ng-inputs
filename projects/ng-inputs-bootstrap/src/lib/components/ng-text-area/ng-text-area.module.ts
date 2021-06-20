import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgTextAreaComponent } from './ng-text-area.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconModule } from '../../shared/ng-icon/ng-icon.module';
import { BaseModule } from '../../shared/base/base.module';
import { NgUtilsDirectiveModule } from '../../directives/utils/ng-utils.module';

@NgModule({
  imports: [
    CommonModule,
    BaseModule,
    NgUtilsDirectiveModule,
    ReactiveFormsModule,
    NgIconModule,
  ],
  declarations: [NgTextAreaComponent],
  exports: [NgTextAreaComponent],
})
export class NgTextAreaModule {}
