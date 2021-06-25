import { Directive, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[ngFocusBack]'
})
export class NgFocusBackDirective implements OnInit, OnDestroy {
  private lastFocusedElement: Element;

  public ngOnInit(): void {
    this.lastFocusedElement = document.activeElement;
  }

  public ngOnDestroy(): void {
    if (this.lastFocusedElement) {
      (this.lastFocusedElement as HTMLElement).focus();
    }
  }
}
