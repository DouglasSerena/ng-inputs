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
import { NgMaskConfig } from '../../interfaces/ng-mask-config.interface';

export const PROVIDER_VALUE_ACCESSOR: Provider = {
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
  private _isAmount = false;
  private _config: NgMaskConfig = {
    allowNegative: true,
    fractionDigits: 3,
    decimalSeparator: ',',
    align: 'right',
    validator: true,
    focusSelectText: true,
  };

  @Input() set ngMaskAmount(config: NgMaskConfig | string) {
    if (!(typeof config === 'string')) {
      Object.assign(this._config, config);
    }
  }

  @Input() type: string = 'text';
  @Output() value = new EventEmitter();

  constructor(
    private elementRef: ElementRef<HTMLInputElement>,
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this._inputRef = this.elementRef.nativeElement;
  }

  ngOnInit() {
    if (this.type === 'amount') {
      this.renderer2.setAttribute(this._inputRef, 'type', 'text');
      this.renderer2.setStyle(this._inputRef, 'text-align', this._config.align);
      this._isAmount = true;

      this.createMask();
      this.renderer2.listen(this._inputRef, 'input', (event) =>
        this.onInput(event)
      );
    }
  }

  createMask() {
    this.onInput();
  }

  formatAmount(value: string | number, data?: string | null) {
    let negative = data === '-';
    value = value.toString();

    if (/^0/g.test(value)) {
      value = value.replace(/0+/, '');
    }

    if (new RegExp(this._config.decimalSeparator as string, 'g').test(value)) {
      value = value.replace(this._config.decimalSeparator as string, '.');
    }

    if (value.match('-')) {
      negative = true;
    }

    if (data === undefined) {
      value = Number.parseFloat(value)
        .toFixed(this._config.fractionDigits)
        .toString();
    }

    value = value.replace(/\D/g, '');

    value =
      Number.parseFloat(value) /
      Math.pow(10, this._config.fractionDigits as number);

    if (Number.isNaN(value)) {
      value = 0;
    }

    if (negative && this._config.allowNegative) {
      value = -value;
    }

    value = value.toFixed(this._config.fractionDigits);

    let valueFormat = value.toString();

    value = Number.parseFloat(value);

    valueFormat = valueFormat.replace(
      '.',
      this._config.decimalSeparator as string
    );

    return { valueFormat, value };
  }

  @HostListener('blur', ['$event.target'])
  onTouched = () => {};

  @HostListener('focus', ['$event.target'])
  onFocus = () => {
    if (this._config?.focusSelectText && this._isAmount) {
      const length = this._inputRef.value.length;
      this._inputRef.setSelectionRange(0, length);
    }
  };

  eventTime: any = 0;
  onInput(value: InputEvent | string | number = this._inputRef.value) {
    let valueAmount;
    if (value instanceof InputEvent) {
      let event = value;
      value = (event.target as HTMLInputElement).value;
      valueAmount = this.formatAmount(value, event.data);
    } else {
      valueAmount = this.formatAmount(value as string);
    }

    this._inputRef.value = valueAmount.valueFormat;
    const length = this._inputRef.value.length;
    this._inputRef.setSelectionRange(length, length);

    value = this.validRequired(valueAmount.value);

    this.onChange(value);
    this.changeDetectorRef.detectChanges();

    clearTimeout(this.eventTime);
    this.eventTime = setTimeout(() => {
      this.value.emit(value);
    });
  }

  validRequired(value: string | number): any {
    if (this._config.validator) {
      if (typeof value === 'string') {
        return value.length === 0 ? null : value;
      } else if (typeof value === 'number') {
        return value === 0 ? null : value;
      }
    }
    return value;
  }

  onChange = (_: any) => {};
  registerOnTouched = (fn: () => void) => (this.onTouched = fn);
  setDisabledState = (isDisabled: boolean) => {};
  registerOnChange = (fn: (_: any) => void) => {
    this.onChange = fn;
    if (this._isAmount) {
      this.onInput();
    }
  };
  writeValue(value: number | string): void {
    if (this._isAmount) {
      this.onInput(value);
    } else {
      this._inputRef.value = value.toString();
    }
  }
}
