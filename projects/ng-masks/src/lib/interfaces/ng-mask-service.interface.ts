import { Renderer2 } from '@angular/core';
import { INgIMaskConfig } from './ng-imask-config.interface';
import { INgMaskConfig } from './ng-mask-config.interface';
import { IMaskServiceReturn } from './ng-mask-service-return.interface';

export interface INgMaskService {
  _config: INgMaskConfig | INgIMaskConfig;
  config?: (config: INgMaskConfig | INgIMaskConfig) => void
  createMask: (
    inputRef: HTMLInputElement,
    config?: INgMaskConfig | INgIMaskConfig | undefined,
    renderer2?: Renderer2 | undefined
  ) => IMaskServiceReturn;
  format: (
    value: string | number,
    config?: INgMaskConfig | INgIMaskConfig | undefined
  ) => string;
}
