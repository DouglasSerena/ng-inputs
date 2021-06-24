import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnsDirective } from './columns.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ColumnsDirective],
  exports: [ColumnsDirective],
})
export class NgStructureDirectivesModule {}
