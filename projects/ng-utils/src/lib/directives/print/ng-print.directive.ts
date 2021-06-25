import { Directive, ElementRef, Input } from '@angular/core';
import { BodyService } from '../../services/body.service';

@Directive({
  selector: '[ngPrint]',
})
export class NgPrintDirective {
  @Input() printDisabled = false;
  @Input() set printTestStyle(value: boolean) {
    if (value) {
      this.handleBeforePrint();
    }
  }
  frame: HTMLElement;
  clone: Node;

  constructor(elementRef: ElementRef, private bodyService: BodyService) {
    this.frame = elementRef.nativeElement;

    window.addEventListener('beforeprint', () => {
      if (!this.printDisabled) {
        this.handleBeforePrint();
      }
    });
    window.addEventListener('afterprint', () => {
      if (!this.printDisabled) {
        this.handleAfterprint();
      }
    });
  }

  handleBeforePrint() {
    this.clone = this.frame.cloneNode(true);

    this.bodyService.appRoot.classList.add('print-remove');
    this.bodyService.insertNode(this.clone);
  }

  handleAfterprint() {
    this.bodyService.appRoot.classList.remove('print-remove');
    this.bodyService.removeNode(this.clone);
  }
}
