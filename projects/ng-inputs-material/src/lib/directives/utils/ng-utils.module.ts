import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgColumnsDirective } from './ng-columns.directive';
import { NgMessagesErrorsDirectives } from './ng-messages-errors.directive';

@NgModule({
  declarations: [NgColumnsDirective, NgMessagesErrorsDirectives],
  exports: [NgColumnsDirective, NgMessagesErrorsDirectives],
})
export class NgUtilsDirectiveModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NgUtilsDirectiveModule,
      providers: [],
    };
  }
}
