import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { Palettes } from '../../interfaces/colors.interface';
import { NgColorsService } from './ng-colors.service';
import { NgThemeService } from './ng-theme.service';

@NgModule({
  imports: [],
  providers: [NgThemeService, NgColorsService],
})
export class NgThemeModule {
  static forRoot(palettes?: Palettes): ModuleWithProviders<any> {
    return {
      ngModule: NgThemeModule,
      providers: [
        NgThemeService,
        NgColorsService,
        {
          provide: FOR_ROOT_OPTIONS_TOKEN,
          useValue: palettes,
        },
        {
          provide: NgColorsService,
          useFactory: provideMyServiceOptions,
          deps: [FOR_ROOT_OPTIONS_TOKEN],
        },
      ],
    };
  }
}

export var FOR_ROOT_OPTIONS_TOKEN = new InjectionToken<NgColorsService>(
  'forRoot() NgColorsService() configuration.'
);

export function provideMyServiceOptions(palettes?: Palettes): NgColorsService {
  const service = new NgColorsService();

  if (palettes) {
    service.palettes = palettes;
  }

  return service;
}
