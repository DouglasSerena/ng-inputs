import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgUploadComponent } from './ng-upload.component';
import { FileDirectivesModule } from '@douglas-serena/ng-utils';
import { ReactiveFormsModule } from '@angular/forms';
import { NgUploadListComponent } from './ng-upload-list/ng-upload-list.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FileDirectivesModule],
  declarations: [NgUploadComponent, NgUploadListComponent],
  exports: [NgUploadComponent, NgUploadListComponent],
})
export class NgUploadModule {}
