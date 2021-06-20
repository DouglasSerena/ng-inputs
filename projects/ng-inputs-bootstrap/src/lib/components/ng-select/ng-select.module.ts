import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectComponent } from './ng-select.component';
import { NgConfigModule } from '../../config/ng-config.module';
import { NgIconModule } from '../../shared/ng-icon/ng-icon.module';
import { NgUtilsDirectiveModule } from '../../directives/utils/ng-utils.module';

@NgModule({
  imports: [
    CommonModule,
    NgConfigModule,
    NgUtilsDirectiveModule,
    NgIconModule,
    ReactiveFormsModule,
  ],
  declarations: [NgSelectComponent],
  exports: [NgSelectComponent],
})
export class NgSelectModule {}
