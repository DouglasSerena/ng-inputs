import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgInputsModule } from 'projects/ng-inputs/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgInputsModule.forRoot({
      field: {
        type: 'group',
        icons: {
          currency: { icon: 'fas fa-money-bill-wave' },
        },
      },
      environments: {
        url: 'http://api-sandbox2.construtoramontebello.net.br/api/financeiro',
      },
      currency: { prefix: 'R$' },
      theme: 'materialize',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
