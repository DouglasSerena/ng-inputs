import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ElsePipe } from './else.pipe';
import { RelativeTimePipe } from './relative-time.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [DomSanitizerPipe, ElsePipe, RelativeTimePipe],
  exports: [DomSanitizerPipe, ElsePipe, RelativeTimePipe],
})
export class PipesModule {}
