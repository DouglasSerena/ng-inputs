import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgLibMasksComponent } from './ng-lib-masks.component';

import { ReactiveFormsModule } from '@angular/forms';
import {
  NgMasksDirectivesModule,
  NgMasksPipesModule,
} from 'projects/ng-masks/src/public-api';
import { HighlightModule } from 'ngx-highlightjs';
import { StructureDirectivesModule } from 'projects/ng-utils/src/public-api';

@NgModule({
  imports: [
    CommonModule,
    HighlightModule,
    ReactiveFormsModule,
    NgMasksPipesModule,
    NgMasksDirectivesModule,
    StructureDirectivesModule,
  ],
  declarations: [NgLibMasksComponent],
  exports: [NgLibMasksComponent],
})
export class NgLibMasksModule {}
