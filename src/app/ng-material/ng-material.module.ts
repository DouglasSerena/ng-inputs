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
  NgUtilsDirectiveModule,
} from 'projects/ng-inputs-material/src/public-api';

import { ReactiveFormsModule } from '@angular/forms';
import { HighlightModule } from 'ngx-highlightjs';
import { TestService } from '../test.service';

@NgModule({
  imports: [
    CommonModule,
    HighlightModule,
    ReactiveFormsModule,
    NgInputsMaterial.forRoot({
      global: {
        select: {
          types: {
            'select-2': {
              icon: {
                left: {
                  icon: 'add',
                  click: () => {
                    console.log('opio');
                  },
                },
              },
            },
          },
        },
      },
    }),
    NgUtilsDirectiveModule,
    NgInputModule,
    NgSelectModule,
    NgTextAreaModule,
    NgAutocompleteModule,
    NgCheckboxModule,
    NgSwitchModule,
  ],
  declarations: [NgMaterialComponent],
  providers: [TestService],
  exports: [NgMaterialComponent],
})
export class NgMaterialModule {}