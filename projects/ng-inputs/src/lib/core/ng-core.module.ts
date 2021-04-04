import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgInputConfigService } from './ng-input-config.service';
import { NgInputMasksService } from './ng-input-masks.service';
import { NgPipeModule } from './pipe/ng-pipe.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgPipeModule],
  exports: [ReactiveFormsModule, FormsModule, NgPipeModule],
})
export class NgCoreModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NgCoreModule,
      providers: [NgInputConfigService, NgInputMasksService, NgPipeModule],
    };
  }
}
