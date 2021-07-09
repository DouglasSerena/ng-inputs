import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMapsComponent } from './ng-maps.component';
import { MapboxService } from './mapbox.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule],
  declarations: [NgMapsComponent],
  exports: [NgMapsComponent],
  providers: [MapboxService],
})
export class NgMapsModule {}
