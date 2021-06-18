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
import SimpleMaskMoney from 'simple-mask-money';
import currencyToSymbolMap from 'currency-symbol-map/map';
import calcJs from '@douglas-serena/calc.js';
import { NgMaskConfig } from '../../interfaces/ng-mask-config.interface';

export const PROVIDER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgMaskCurrencyDirective),
  multi: true,
};

@Directive({
  selector: '[ngMaskCurrency]',
  providers: [PROVIDER_VALUE_ACCESSOR],
})
export class NgMaskCurrencyDirective implements OnInit, ControlValueAccessor {
  private _inputRef: HTMLInputElement;
  private _instanceSimpleMaskMoneyRef: { formatToNumber(): number };
  private _locale = currencyToSymbolMap.BRL;
  private _isCurrency = false;
  private _config: NgMaskConfig = {
    allowNegative: true,
    negativeSignAfter: false,
    prefix: this._locale,
    suffix: '',
    fixed: true,
    fractionDigits: 2,
    decimalSeparator: ',',
    thousandsSeparator: '.',
    align: 'right',
    cursor: 'end',
    validator: true,
    focusSelectText: true,
  };

  @Input() set locale(symbolOrLocale: { currency: string } | string) {
    if (typeof symbolOrLocale === 'string') {
      if (currencyToSymbolMap[symbolOrLocale] !== undefined) {
        this._config.prefix = currencyToSymbolMap[symbolOrLocale];
      } else {
        console.warn('[NG-FIELD] We were unable to locate this currency');
      }
    } else {
      this._config.prefix = currencyToSymbolMap[symbolOrLocale.currency];
    }

    if (this._instanceSimpleMaskMoneyRef === undefined) {
      this.createMask();
    }
  }

  @Input() set ngMaskCurrency(config: NgMaskConfig | string) {
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
    if (this.type === 'currency') {
      this.renderer2.setAttribute(this._inputRef, 'type', 'text');
      this.renderer2.setStyle(this._inputRef, 'text-align', this._config.align);
      this._isCurrency = true;

      this.createMask();
      this.renderer2.listen(this._inputRef, 'input', (event) =>
        this.onInput(event)
      );
    }
  }

  createMask() {
    this._instanceSimpleMaskMoneyRef = SimpleMaskMoney.setMask(
      this._inputRef,
      this._config
    );
    this.changeDetectorRef.detectChanges();
  }

  @HostListener('blur', ['$event.target'])
  onTouched = () => {};

  @HostListener('focus', ['$event.target'])
  onFocus = () => {
    if (this._config.focusSelectText && this._isCurrency) {
      const length = this._inputRef.value.length;
      this._inputRef.setSelectionRange(0, length);
    }
  };

  eventTime: any = 0;
  onInput(event?: KeyboardEvent) {
    if (this._instanceSimpleMaskMoneyRef) {
      let value = this.validRequired(
        this._instanceSimpleMaskMoneyRef.formatToNumber()
      );

      this.onChange(value);
      this.changeDetectorRef.detectChanges();

      clearTimeout(this.eventTime);
      this.eventTime = setTimeout(() => {
        this.value.emit(value);
      });
    }
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

    if (this._isCurrency) {
      this.onInput();
    }
  };
  writeValue(value: number | string): void {
    if (this._isCurrency) {
      value = value.toString();
      value = value.replace(',', '.');
      value = calcJs(value).value.toString();
      value = value.replace('.', this._config.decimalSeparator as string);

      this._inputRef.value = SimpleMaskMoney.formatToCurrency(value, {
        ...this._config,
        allowNegative: false,
      } as NgMaskConfig);

      this.onInput();
    } else {
      this._inputRef.value = value.toString();
    }
  }
}