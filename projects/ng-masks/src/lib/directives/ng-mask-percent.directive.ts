import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  forwardRef,
  Provider,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { INgMaskConfig } from '../interfaces/ng-mask-config.interface';
import { IMaskServiceReturn } from '../interfaces/ng-mask-service-return.interface';
import { NgMaskPercentService } from '../services/ng-mask-percent.service';

const PROVIDER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgMaskPercentDirective),
  multi: true,
};

@Directive({
  selector: '[ngMaskPercent]',
  providers: [PROVIDER_VALUE_ACCESSOR],
})
export class NgMaskPercentDirective implements OnInit, ControlValueAccessor {
  private _inputRef: HTMLInputElement;
  private _maskRef: IMaskServiceReturn;
  private _config: INgMaskConfig = {
    allowNegative: false,
    negativeSignAfter: false,
    prefix: '',
    suffix: '%',
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: ',',
    thousandsSeparator: '',
    align: 'right',
    cursor: 'end',
    validator: true,
    focusSelectText: true,
  };

  @Input() set ngMaskPercent(config: INgMaskConfig | string) {
    if (!(typeof config === 'string')) {
      Object.assign(this._config, config);
    }
  }

  @Input() type: string = 'text';
  @Output() value = new EventEmitter();

  constructor(
    private elementRef: ElementRef<HTMLInputElement>,
    private renderer2: Renderer2,
    private ngMaskPercentService: NgMaskPercentService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this._inputRef = this.elementRef.nativeElement;
  }

  ngOnInit() {
    if (this.type === 'percent') {
      this.renderer2.setAttribute(this._inputRef, 'type', 'text');
      this._maskRef = this.ngMaskPercentService.createMask(
        this._inputRef,
        this._config,
        this.renderer2
      );
    }
  }

  @HostListener('keyup', ['$event.target.value'])
  handleInput(value?: HTMLElement | string | number) {
    if (this._maskRef) {
      this.handleChange(this._maskRef.unmaskedValue());
    } else {
      this.handleChange(value);
    }
  }

  handleTouched = () => {};
  handleChange = (_: any) => {};
  registerOnTouched = (fn: () => void) => (this.handleTouched = fn);
  setDisabledState = (isDisabled: boolean) => {};
  registerOnChange = (fn: (_: any) => void) => {
    this.handleChange = fn;
  };
  writeValue(value: number | string): void {
    if (this._inputRef) {
      if (this._maskRef) {
        this._maskRef.update(value as string);
      }
      this.handleInput(value);
    } else {
      setTimeout(() => {
        this.writeValue(value);
      }, 10);
    }
  }
}
