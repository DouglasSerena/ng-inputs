import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgFormatDateByTypeService } from './ng-format-date-by-type.service';

@NgModule({
  providers: [NgFormatDateByTypeService],
})
export class NgUtilsServiceModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NgUtilsServiceModule,
      providers: [NgFormatDateByTypeService],
    };
  }
}
