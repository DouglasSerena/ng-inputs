import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { NgMaskPipe } from './ng-mask.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [NgMaskPipe],
  exports: [NgMaskPipe],
  providers: [NgMaskPipe, DatePipe],
})
export class NgPipeModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NgPipeModule,
      providers: [NgMaskPipe, DatePipe],
    };
  }
}
