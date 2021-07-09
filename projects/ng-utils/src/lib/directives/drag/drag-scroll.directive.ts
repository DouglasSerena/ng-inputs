import { Overlay } from '@angular/cdk/overlay';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[dragScroll]',
})
export class DragScrollDirective {
  @Input() disabledClickInScroll = true;
  positions = { top: 0, left: 0, x: 0, y: 0 };
  element: HTMLElement;
  mousePress = false;
  mouseMove = false;

  constructor(private elementRef: ElementRef) {
    this.element = elementRef.nativeElement;
  }

  @HostListener('click', ['$event']) handleClick(event: MouseEvent) {
    if (this.disabledClickInScroll && this.mouseMove) {
      event.preventDefault();
      this.mouseMove = false;
    }
  }

  @HostListener('mousedown', ['$event']) handleMouseDown(event: MouseEvent) {
    this.mousePress = true;
    this.positions = {
      left: this.element.scrollLeft,
      top: this.element.scrollTop,
      x: event.clientX,
      y: event.clientY,
    };
    this.element.style.cursor = 'grabbing';
    this.element.style.userSelect = 'none';
  }
  @HostListener('window:mousemove', ['$event']) handleMouseMove(
    event: MouseEvent
  ) {
    if (this.mousePress) {
      const dx = event.clientX - this.positions.x;
      const dy = event.clientY - this.positions.y;

      this.element.scrollTop = this.positions.top - dy;
      this.element.scrollLeft = this.positions.left - dx;
      this.mouseMove = true;
    }
  }
  @HostListener('window:mouseup', ['$event']) handleMouseUp(event: MouseEvent) {
    this.disabledScroll();
  }

  private disabledScroll() {
    this.mousePress = false;
    this.element.style.cursor = 'default';
    this.element.style.removeProperty('user-select');
  }
}
