import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  forwardRef,
  Provider,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { __values } from 'tslib';
import { INgMaskConfig } from '../interfaces/ng-mask-config.interface';
import { IMaskServiceReturn } from '../interfaces/ng-mask-service-return.interface';
import { NgMaskAmountService } from '../services/ng-mask-amount.service';

const PROVIDER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgMaskAmountDirective),
  multi: true,
};

@Directive({
  selector: '[ngMaskAmount]',
  providers: [PROVIDER_VALUE_ACCESSOR],
})
export class NgMaskAmountDirective implements OnInit, ControlValueAccessor {
  private _inputRef: HTMLInputElement;
  private _maskRef: IMaskServiceReturn;
  private _config: INgMaskConfig = {
    allowNegative: true,
    fractionDigits: 3,
    decimalSeparator: ',',
    align: 'right',
    validator: true,
    focusSelectText: true,
  };

  @Input() set ngMaskAmount(config: INgMaskConfig | string) {
    if (!(typeof config === 'string')) {
      Object.assign(this._config, config);
    }
  }

  @Input() type: string = 'text';
  @Output() value = new EventEmitter();

  constructor(
    private elementRef: ElementRef<HTMLInputElement>,
    private ngMaskAmountService: NgMaskAmountService,
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this._inputRef = this.elementRef.nativeElement;
  }

  ngOnInit() {
    if (this.type === 'amount') {
      this.renderer2.setAttribute(this._inputRef, 'type', 'text');
      this._maskRef = this.ngMaskAmountService.createMask(
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
