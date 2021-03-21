import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';

import {
  NgInputConfigService,
  INgInputConfig,
} from './core/ng-input-config.service';
import { NgInputMasksService } from './core/ng-input-masks.service';

import { NgSelectModule } from './ng-select/ng-select.module';
import { NgInputModule } from './ng-input/ng-input.module';
import { NgCheckboxModule } from './ng-checkbox/ng-checkbox.module';
import { NgCoreModule } from './core/ng-core.module';
@NgModule({
  imports: [NgSelectModule, NgInputModule, NgCheckboxModule, NgCoreModule],
  providers: [NgInputConfigService, NgInputMasksService],
  exports: [NgSelectModule, NgInputModule, NgCheckboxModule, NgCoreModule],
})
export class NgInputsModule {
  static forRoot(options?: INgInputConfig): ModuleWithProviders<any> {
    return {
      ngModule: NgInputsModule,
      providers: [
        NgInputMasksService,
        {
          provide: FOR_ROOT_OPTIONS_TOKEN,
          useValue: options,
        },
        {
          provide: NgInputConfigService,
          useFactory: provideMyServiceOptions,
          deps: [FOR_ROOT_OPTIONS_TOKEN],
        },
      ],
    };
  }
}

export var FOR_ROOT_OPTIONS_TOKEN = new InjectionToken<NgInputConfigService>(
  'forRoot() NgInputConfigService() configuration.'
);

export function provideMyServiceOptions(
  options?: INgInputConfig
): NgInputConfigService {
  const service = new NgInputConfigService();

  if (options?.field) service.field = options.field;
  if (options?.theme) service.theme = options.theme;
  if (options?.currency) service.currency = options.currency;
  if (options?.percent) service.percent = options.percent;
  if (options?.environments) service.environments = options.environments;

  return service;
}
