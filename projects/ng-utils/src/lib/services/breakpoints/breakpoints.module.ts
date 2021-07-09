import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointsService } from './breakpoints.service';

@NgModule({
  imports: [CommonModule],
  providers: [BreakpointsService],
})
export class BreakpointsModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: BreakpointsService,
      providers: [BreakpointsService],
    };
  }
}
