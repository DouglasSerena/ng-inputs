import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileControlAccessor } from './file-control.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [FileControlAccessor],
  exports: [FileControlAccessor],
})
export class FileDirectivesModule {}
