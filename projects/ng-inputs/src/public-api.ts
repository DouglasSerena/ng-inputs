/*
 * Public API Surface of ng-inputs
 */

import { NgInputsModule } from './lib/ng-inputs.module';

// SERVICES
import { NgCoreModule } from './lib/core/ng-core.module';
import { NgInputMasksService } from './lib/core/ng-input-masks.service';
import { NgPipeModule } from './lib/core/pipe/ng-pipe.module';

import { NgCheckboxModule } from './lib/ng-checkbox/ng-checkbox.module';
import { NgInputModule } from './lib/ng-input/ng-input.module';
import { NgSelectModule } from './lib/ng-select/ng-select.module';
import { INgInputConfig } from './lib/core/ng-input-config.service';

export {
  NgCoreModule,
  NgInputsModule,
  NgInputModule,
  NgCheckboxModule,
  NgSelectModule,
  NgInputMasksService,
  NgPipeModule,
  INgInputConfig,
};
