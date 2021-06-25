import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [DomSanitizerPipe],
  exports: [DomSanitizerPipe],
})
export class NgPipesModule {}
