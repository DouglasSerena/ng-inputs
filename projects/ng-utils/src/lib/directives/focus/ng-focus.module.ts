import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFocusBackDirective } from './ng-focus-back.directive';
import { NgFocusTrapDirective } from './ng-focus-trap.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [NgFocusBackDirective, NgFocusTrapDirective],
  exports: [NgFocusBackDirective, NgFocusTrapDirective],
})
export class NgFocusDirectivesModule {}
