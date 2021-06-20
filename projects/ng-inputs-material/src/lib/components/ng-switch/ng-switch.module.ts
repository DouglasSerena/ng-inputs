import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSwitchComponent } from './ng-switch.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatSlideToggleModule],
  declarations: [NgSwitchComponent],
  exports: [NgSwitchComponent],
})
export class NgSwitchModule {}
