import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragScrollDirective } from './drag-scroll.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [DragScrollDirective],
  exports: [DragScrollDirective],
})
export class DragDirectivesModule {}
