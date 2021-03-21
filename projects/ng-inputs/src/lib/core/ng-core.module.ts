import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgBaseComponent } from '../core/ng-base/ng-base.component';
import { NgInputConfigService } from './ng-input-config.service';
import { NgInputMasksService } from './ng-input-masks.service';
import { NgPipeModule } from './pipe/ng-pipe.module';

@NgModule({
  declarations: [NgBaseComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgPipeModule],
  exports: [ReactiveFormsModule, FormsModule, NgBaseComponent, NgPipeModule],
})
export class NgCoreModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NgCoreModule,
      providers: [NgInputConfigService, NgInputMasksService, NgPipeModule],
    };
  }
}
