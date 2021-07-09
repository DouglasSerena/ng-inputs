import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgBootstrapComponent } from './ng-bootstrap.component';
import {
  NgAutocompleteModule,
  NgCheckboxModule,
  NgInputModule,
  NgInputsBootstrap,
  NgSelectModule,
  NgSwitchModule,
  NgTextAreaModule,
  NgUploadModule,
} from 'projects/ng-inputs-bootstrap/src/public-api';
import { ReactiveFormsModule } from '@angular/forms';
import { HighlightModule } from 'ngx-highlightjs';
import { TestService } from '../test.service';
import { StructureDirectivesModule } from 'projects/ng-utils/src/public-api';

@NgModule({
  imports: [
    CommonModule,
    HighlightModule,
    ReactiveFormsModule,
    StructureDirectivesModule,
    NgInputsBootstrap.forRoot({
      global: {
        select: {
          types: {
            'select-2': {
              icon: {
                left: {
                  icon: 'fas fa-text-width',
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
    NgInputModule,
    NgSelectModule,
    NgTextAreaModule,
    NgAutocompleteModule,
    NgCheckboxModule,
    NgSwitchModule,
    NgUploadModule,
  ],
  providers: [TestService],
  declarations: [NgBootstrapComponent],
  exports: [NgBootstrapComponent],
})
export class NgBootstrapModule {}
