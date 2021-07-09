import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { NavigatorService } from './navigator.service';

@NgModule({
  imports: [],
  providers: [NavigatorService],
})
export class NavigatorModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NavigatorModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: (eventRouter: NavigatorService) => () =>
            eventRouter.load(),
          deps: [NavigatorService],
          multi: true,
        },
      ],
    };
  }
}
