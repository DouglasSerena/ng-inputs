import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgTimeComponent } from './ng-time.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTimepickerModule } from 'mat-timepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconModule } from '../../shared/ng-icon/ng-icon.module';

@NgModule({
  imports: [
    CommonModule,
    NgIconModule,
    MatIconModule,
    MatInputModule,
    MatTimepickerModule,
    ReactiveFormsModule,
  ],
  declarations: [NgTimeComponent],
  exports: [NgTimeComponent],
})
export class NgTimeModule {}
