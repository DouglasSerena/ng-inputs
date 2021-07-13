import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMaterialComponent } from './ng-material.component';

import {
  NgAutocompleteModule,
  NgCheckboxModule,
  NgInputModule,
  NgInputsMaterial,
  NgSelectModule,
  NgSwitchModule,
  NgTextAreaModule,
  NgUploadModule,
} from 'projects/ng-inputs-material/src/public-api';

import { ReactiveFormsModule } from '@angular/forms';
import { HighlightModule } from 'ngx-highlightjs';
import { TestService } from '../test.service';
import {
  FileDirectivesModule,
  StructureDirectivesModule,
} from 'projects/ng-utils/src/public-api';
import { NgTimeModule } from 'projects/ng-inputs-material/src/lib/components/ng-time/ng-time.module';
import { NgMapsModule } from 'projects/ng-inputs-material/src/lib/components/ng-maps/ng-maps.module';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    CommonModule,
    NgTimeModule,
    NgMapsModule,
    HighlightModule,
    ReactiveFormsModule,
    FileDirectivesModule,
    StructureDirectivesModule,
    NgInputsMaterial.forRoot({
      global: {
        maps: {
          token: environment.MAP_BOX_TOKEN,
        },
      },
    }),
    NgInputModule,
    NgSelectModule,
    NgTextAreaModule,
    NgAutocompleteModule,
    NgCheckboxModule,
    NgSwitchModule,
    NgUploadModule,
  ],
  declarations: [NgMaterialComponent],
  providers: [TestService],
  exports: [NgMaterialComponent],
})
export class NgMaterialModule {}
