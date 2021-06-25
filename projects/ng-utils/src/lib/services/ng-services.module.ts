import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { BodyService } from './body.service';
import { NavigatorService } from './navigator.service';

@NgModule({
  imports: [],
  providers: [
    BodyService,
    {
      provide: APP_INITIALIZER,
      useFactory: (eventRouter: NavigatorService) => () => eventRouter.load(),
      deps: [NavigatorService],
      multi: true,
    },
  ],
})
export class NgServicesModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NgServicesModule,
      providers: [NavigatorService, BodyService],
    };
  }
}
