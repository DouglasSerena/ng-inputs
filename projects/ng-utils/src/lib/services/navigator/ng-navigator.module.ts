import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { NgNavigatorService } from './ng-navigator.service';

@NgModule({
  imports: [],
  providers: [NgNavigatorService],
})
export class NgNavigatorModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NgNavigatorModule,
      providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: (eventRouter: NgNavigatorService) => () =>
            eventRouter.load(),
          deps: [NgNavigatorService],
          multi: true,
        },
      ],
    };
  }
}
