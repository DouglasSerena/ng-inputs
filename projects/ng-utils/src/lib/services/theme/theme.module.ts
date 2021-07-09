import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { Palettes } from '../../interfaces/colors.interface';
import { ColorsService } from './colors.service';
import { ThemeService } from './theme.service';

@NgModule({
  imports: [],
  providers: [ThemeService, ColorsService],
})
export class ThemeModule {
  static forRoot(palettes?: Palettes): ModuleWithProviders<any> {
    return {
      ngModule: ThemeModule,
      providers: [
        ThemeService,
        ColorsService,
        {
          provide: FOR_ROOT_OPTIONS_TOKEN,
          useValue: palettes,
        },
        {
          provide: ColorsService,
          useFactory: provideMyServiceOptions,
          deps: [FOR_ROOT_OPTIONS_TOKEN],
        },
      ],
    };
  }
}

export var FOR_ROOT_OPTIONS_TOKEN = new InjectionToken<ColorsService>(
  'forRoot() ColorsService() configuration.'
);

export function provideMyServiceOptions(palettes?: Palettes): ColorsService {
  const service = new ColorsService();

  if (palettes) {
    service.palettes = palettes;
  }

  return service;
}
