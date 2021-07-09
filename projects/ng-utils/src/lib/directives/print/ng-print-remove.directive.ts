import { OnInit } from '@angular/core';
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[ngPrintRemove]',
})
export class NgPrintRemoveDirective implements OnInit {
  element: HTMLElement;

  constructor(elementRef: ElementRef) {
    this.element = elementRef.nativeElement;
  }

  ngOnInit() {
    this.element.classList.add('print-remove');
  }
}
