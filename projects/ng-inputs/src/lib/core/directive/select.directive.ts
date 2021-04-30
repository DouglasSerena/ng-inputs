import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
} from '@angular/core'
import { NgInputConfigService } from '../ng-input-config.service';

export interface IMSelect {
  default?: boolean;
}

declare const M;

@Directive({
  selector: '[MSelect]',
})
export class SelectDirective implements OnChanges, OnDestroy, AfterViewInit {
  @Input() MSelect?: IMSelect = {
    default: false,
  };
  @Input() options?: any;
  ref?: any;

  constructor(
    private elementRef: ElementRef<HTMLSelectElement>,
    private ngInputConfigService: NgInputConfigService
  ) {}

  ngAfterViewInit() {
    const element = this.elementRef.nativeElement;
    if (
      !this.MSelect?.default &&
      this.ngInputConfigService.theme === 'materialize'
    ) {
      this.initSelect();
    } else {
      element.classList.add('browser-default');
    }
  }

  ngOnChanges() {
    if (
      !this.MSelect?.default &&
      this.ngInputConfigService.theme === 'materialize'
    ) {
      this.initSelect();
    }
  }

  initSelect() {
    setTimeout(() => {
      if (this.ref) {
        this.ref?.destroy();
      }
      this.ref = M?.FormSelect.init(this.elementRef.nativeElement);
    }, 250);
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref?.destroy();
    }
  }
}
