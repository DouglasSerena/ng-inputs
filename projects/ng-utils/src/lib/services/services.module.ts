import { ModuleWithProviders, NgModule } from '@angular/core';
import { BodyService } from './body.service';

@NgModule({
  imports: [],
  providers: [BodyService],
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: ServicesModule,
      providers: [BodyService],
    };
  }
}
