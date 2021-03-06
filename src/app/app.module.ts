import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgInputsModule } from 'projects/ng-inputs/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgInputsModule.forRoot({
      field: 'group',
      environments: {
        url: 'http://api-sandbox2.construtoramontebello.net.br/api/compras',
      },
      currency: { prefix: 'R$' },
    }),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
