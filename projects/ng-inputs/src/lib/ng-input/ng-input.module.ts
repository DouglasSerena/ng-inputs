import { NgModule } from '@angular/core';
import { NgInputComponent } from './ng-input/ng-input.component';
import { NgTextAreaComponent } from './ng-text-area/ng-text-area.component';
import { NgCoreModule } from '../core/ng-core.module';
import { InputCustomControlValueAccessor } from './input-custom-control-value-accessor.domain';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NgInputComponent,
    NgTextAreaComponent,
    InputCustomControlValueAccessor,
  ],
  imports: [CommonModule, NgCoreModule],
  exports: [NgInputComponent, NgTextAreaComponent, NgCoreModule],
})
export class NgInputModule {}
