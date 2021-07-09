import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FocusBackDirective } from './focus-back.directive';
import { FocusTrapDirective } from './focus-trap.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [FocusBackDirective, FocusTrapDirective],
  exports: [FocusBackDirective, FocusTrapDirective],
})
export class FocusDirectivesModule {}
