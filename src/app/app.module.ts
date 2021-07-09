import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgBootstrapModule } from './ng-bootstrap/ng-bootstrap.module';
import { NgMaterialModule } from './ng-material/ng-material.module';

import { MatExpansionModule } from '@angular/material/expansion';
import { NgLibMasksModule } from './ng-lib-masks/ng-lib-masks.module';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { NgInputsLegacyModule } from './ng-inputs-legacy/ng-inputs-legacy.module';
import { HttpClientModule } from '@angular/common/http';
import {
  BreakpointsModule,
  DragDirectivesModule,
  NgPrintDirectivesModule,
  ServicesModule,
  StructureDirectivesModule,
} from 'projects/ng-utils/src/public-api';
import { ThemeModule } from 'projects/ng-utils/src/lib/services/theme/theme.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServicesModule,
    DragDirectivesModule,
    BreakpointsModule,
    NgBootstrapModule,
    NgMaterialModule,
    NgLibMasksModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    NgInputsLegacyModule,
    HttpClientModule,
    StructureDirectivesModule,
    NgPrintDirectivesModule,
    ThemeModule.forRoot({
      dark: {
        background: '#333',
        success: '#435',
        primary: {
          default: '#155',
          test: '#432',
        },
      },
    }),
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          json: () => import('highlight.js/lib/languages/json'),
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
