import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPrintDirective } from './ng-print.directive';
import { NgPrintRemoveDirective } from './ng-print-remove.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [NgPrintDirective, NgPrintRemoveDirective],
  exports: [NgPrintDirective, NgPrintRemoveDirective],
})
export class NgPrintDirectivesModule {}
