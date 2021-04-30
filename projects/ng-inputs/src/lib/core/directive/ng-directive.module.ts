import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SelectDirective } from './select.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [SelectDirective],
  exports: [SelectDirective],
})
export class NgDirectiveModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NgDirectiveModule,
      providers: [],
    };
  }
}
