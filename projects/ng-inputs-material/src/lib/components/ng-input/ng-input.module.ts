import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgInputComponent } from './ng-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgConfigModule } from '../../config/ng-config.module';
import { NgUtilsServiceModule } from '../../services/utils/ng-utils.module';
import { NgIconModule } from '../../shared/ng-icon/ng-icon.module';
import { BaseModule } from '../../shared/base/base.module';
import { MatInputModule } from '@angular/material/input';
import { NgMasksServicesModule } from '@douglas-serena/ng-masks';

@NgModule({
  imports: [
    CommonModule,
    NgConfigModule,
    NgMasksServicesModule,
    ReactiveFormsModule,
    NgUtilsServiceModule,
    NgIconModule,
    BaseModule,
    MatInputModule,
  ],
  declarations: [NgInputComponent],
  exports: [NgInputComponent],
})
export class NgInputModule {}
