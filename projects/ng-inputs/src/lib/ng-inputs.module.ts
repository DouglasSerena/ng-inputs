import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputCustomControlValueAccessor } from './input/input-custom-control-value-accessor.domain';

// INPUT
import { NgInputComponent } from './input/ng-input/ng-input.component';
import { NgTextAreaComponent } from './input/ng-text-area/ng-text-area.component';

// BUTTON
import { NgCheckboxComponent } from './ng-checkbox/ng-checkbox.component';

// SELECTS
import { NgSearchComponent } from './select/ng-search/ng-search.component';
import { NgSelectComponent } from './select/ng-select/ng-select.component';
import { NgInputMasksService } from './ng-input-masks.service';
import {
  NgInputConfigService,
  INgInputConfig,
} from './ng-input-config.service';

// DOMAIN

@NgModule({
  declarations: [
    NgInputComponent,
    NgSelectComponent,
    NgCheckboxComponent,
    NgTextAreaComponent,
    NgSearchComponent,
    InputCustomControlValueAccessor,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  providers: [NgInputConfigService, NgInputMasksService],
  exports: [
    NgInputComponent,
    NgSelectComponent,
    NgCheckboxComponent,
    NgTextAreaComponent,
    NgSearchComponent,
  ],
})
export class NgInputsModule {
  static forRoot(options?: INgInputConfig): ModuleWithProviders<any> {
    return {
      ngModule: NgInputsModule,
      providers: [
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

  if (options?.theme) service.theme = options.theme;
  if (options?.currency) service.currency = options.currency;

  return service;
}
