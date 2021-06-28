import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgUploadComponent } from './ng-upload.component';
import { NgFileDirectivesModule } from '@douglas-serena/ng-utils';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NgFileDirectivesModule],
  declarations: [NgUploadComponent],
  exports: [NgUploadComponent],
})
export class NgUploadModule {}
