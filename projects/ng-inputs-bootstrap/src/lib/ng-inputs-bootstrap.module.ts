import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { NgConfigModule } from './config/ng-config.module';
import { NgConfigService } from './config/ng-config.service';
import { NgConfig } from './interfaces/config/ng-config.interface';

@NgModule({
  imports: [NgConfigModule],
})
export class NgInputsBootstrap {
  static forRoot(options?: NgConfig): ModuleWithProviders<any> {
    return {
      ngModule: NgInputsBootstrap,
      providers: [
        NgConfigService,
        {
          provide: FOR_ROOT_OPTIONS_TOKEN,
          useValue: options,
        },
        {
          provide: NgConfigService,
          useFactory: provideMyServiceOptions,
          deps: [FOR_ROOT_OPTIONS_TOKEN],
        },
      ],
    };
  }
}

export var FOR_ROOT_OPTIONS_TOKEN = new InjectionToken<NgConfigService>(
  'forRoot() NgConfigService() configuration.'
);

export function provideMyServiceOptions(configs?: NgConfig): NgConfigService {
  const service = new NgConfigService();

  if (configs) {
    service.config = configs;
  }

  return service;
}
