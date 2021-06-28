import { ModuleWithProviders, NgModule } from '@angular/core';
import { BodyService } from './body.service';

@NgModule({
  imports: [],
  providers: [BodyService],
})
export class NgServicesModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NgServicesModule,
      providers: [BodyService],
    };
  }
}
