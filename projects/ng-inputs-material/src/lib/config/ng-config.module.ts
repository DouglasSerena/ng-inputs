import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgConfigService } from './ng-config.service';

@NgModule({
  declarations: [],
  exports: [],
  providers: [NgConfigService],
})
export class NgConfigModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NgConfigModule,
      providers: [NgConfigService],
    };
  }
}
