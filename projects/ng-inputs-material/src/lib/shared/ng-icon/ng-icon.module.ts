import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent } from './ng-icon.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule],
  declarations: [NgIconComponent],
  exports: [NgIconComponent],
})
export class NgIconModule {}
