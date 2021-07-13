import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMapsComponent } from './ng-maps.component';
import { MapboxService } from './mapbox.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgConfigModule } from '../../config/ng-config.module';

@NgModule({
  imports: [
    CommonModule,
    NgConfigModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  declarations: [NgMapsComponent],
  exports: [NgMapsComponent],
  providers: [MapboxService],
})
export class NgMapsModule {}
