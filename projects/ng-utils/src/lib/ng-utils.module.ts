import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { NavigatorService } from './navigator.service';

@NgModule({
  imports: [],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (eventRouter: NavigatorService) => () => eventRouter.load(),
      deps: [NavigatorService],
      multi: true,
    },
  ],
})
export class NgUtilsModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: NgUtilsModule,
      providers: [NavigatorService],
    };
  }
}
