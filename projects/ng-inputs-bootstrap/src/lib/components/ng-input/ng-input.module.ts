import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgInputComponent } from './ng-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgConfigModule } from '../../config/ng-config.module';
import { NgUtilsServiceModule } from '../../services/utils/ng-utils.module';
import { NgIconModule } from '../../shared/ng-icon/ng-icon.module';
import { BaseModule } from '../../shared/base/base.module';
import { NgMasksServicesModule } from '@douglas-serena/ng-masks';
import { NgUtilsDirectiveModule } from '../../directives/utils/ng-utils.module';

@NgModule({
  imports: [
    CommonModule,
    NgConfigModule,
    NgMasksServicesModule,
    ReactiveFormsModule,
    NgUtilsDirectiveModule,
    NgUtilsServiceModule,
    NgIconModule,
    BaseModule,
  ],
  declarations: [NgInputComponent],
  exports: [NgInputComponent],
})
export class NgInputModule {}
