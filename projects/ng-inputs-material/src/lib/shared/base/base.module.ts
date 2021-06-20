import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlBase } from './control-base.template';

@NgModule({
  imports: [CommonModule],
  declarations: [ControlBase],
  exports: [ControlBase],
})
export class BaseModule {}
