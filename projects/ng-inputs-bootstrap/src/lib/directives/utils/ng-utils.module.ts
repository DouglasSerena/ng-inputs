import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgMessagesErrorsDirectives } from './ng-messages-errors.directive';

@NgModule({
  declarations: [NgMessagesErrorsDirectives],
  exports: [NgMessagesErrorsDirectives],
})
export class NgUtilsDirectiveModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NgUtilsDirectiveModule,
      providers: [],
    };
  }
}
