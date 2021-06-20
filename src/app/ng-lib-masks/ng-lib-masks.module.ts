import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgLibMasksComponent } from './ng-lib-masks.component';

import { NgUtilsDirectiveModule } from 'projects/ng-inputs-material/src/public-api';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgMasksDirectivesModule,
  NgMasksPipesModule,
} from 'projects/ng-masks/src/public-api';
import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
  imports: [
    CommonModule,
    HighlightModule,
    ReactiveFormsModule,
    NgUtilsDirectiveModule,
    NgMasksPipesModule,
    NgMasksDirectivesModule,
  ],
  declarations: [NgLibMasksComponent],
  exports: [NgLibMasksComponent],
})
export class NgLibMasksModule {}
