/*
 * Public API Surface of ng-inputs
 */

import { NgInputsModule } from './lib/ng-inputs.module';

// INPUTS
import { NgInputComponent } from './lib/input/ng-input/ng-input.component';
import { NgTextAreaComponent } from './lib/input/ng-text-area/ng-text-area.component';

// BUTTONS
import { NgCheckboxComponent } from './lib/ng-checkbox/ng-checkbox.component';

// SELECTS
import { NgSelectComponent } from './lib/select/ng-select/ng-select.component';
import { NgSearchComponent } from './lib/select/ng-search/ng-search.component';

export {
  NgInputsModule,
  NgInputComponent,
  NgSelectComponent,
  NgCheckboxComponent,
  NgTextAreaComponent,
  NgSearchComponent,
};
