import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgInputsLegacyComponent } from './ng-inputs-legacy.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgInputsModule,
  NgSelectModule,
} from 'projects/ng-inputs/src/public-api';
import { HighlightModule } from 'ngx-highlightjs';
import { environment } from 'src/environments/environment';
import { StructureDirectivesModule } from 'projects/ng-utils/src/public-api';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StructureDirectivesModule,
    NgInputsModule.forRoot({
      environments: {
        url: environment.urlApi,
      },
    }),
    NgSelectModule,
    HighlightModule,
  ],
  declarations: [NgInputsLegacyComponent],
  exports: [NgInputsLegacyComponent],
})
export class NgInputsLegacyModule {}
