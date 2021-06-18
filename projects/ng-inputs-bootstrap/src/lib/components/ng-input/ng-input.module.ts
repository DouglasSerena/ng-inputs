import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgInputComponent } from './ng-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgConfigModule } from '../../config/ng-config.module';
import { NgMasksServicesModule } from '../../services/masks/ng-masks.module';
import { NgUtilsServiceModule } from '../../services/utils/ng-utils.module';
import { NgIconModule } from '../../shared/ng-icon/ng-icon.module';
import { BaseModule } from '../../shared/base/base.module';

@NgModule({
  imports: [
    CommonModule,
    NgConfigModule,
    NgMasksServicesModule,
    ReactiveFormsModule,
    NgUtilsServiceModule,
    NgIconModule,
    BaseModule,
  ],
  declarations: [NgInputComponent],
  exports: [NgInputComponent],
})
export class NgInputModule {}
