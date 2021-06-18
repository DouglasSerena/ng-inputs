import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  NgAutocompleteModule,
  NgCheckboxModule,
  NgInputModule,
  NgInputsBootstrap,
  NgMaskPipeModule,
  NgSelectModule,
  NgSwitchModule,
  NgTextAreaModule,
  NgUtilsDirectiveModule,
} from 'projects/ng-inputs-bootstrap/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    NgInputsBootstrap.forRoot({
      global: {
        select: {
          types: {
            'select-2': {
              icon: {
                left: {
                  class: 'fas fa-text-width',
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
    NgMaskPipeModule,
    NgUtilsDirectiveModule,
    NgInputModule,
    NgSelectModule,
    NgTextAreaModule,
    NgAutocompleteModule,
    NgCheckboxModule,
    NgSwitchModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
