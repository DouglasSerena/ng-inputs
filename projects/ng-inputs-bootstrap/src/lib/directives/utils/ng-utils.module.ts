import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgColumnsDirective } from './ng-columns.directive';

@NgModule({
  declarations: [NgColumnsDirective],
  exports: [NgColumnsDirective],
})
export class NgUtilsDirectiveModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NgUtilsDirectiveModule,
      providers: [],
    };
  }
}
