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
import IMask from 'imask';
import { NgIMaskConfig } from '../../interfaces/ng-imask-config.interface';
import * as MASKS from '../../config/MASKS';

export const PROVIDER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgMaskDirective),
  multi: true,
};

@Directive({
  selector: '[ngMask]',
  providers: [PROVIDER_VALUE_ACCESSOR],
})
export class NgMaskDirective implements OnInit, ControlValueAccessor {
  private _inputRef: HTMLInputElement;
  private _validator: boolean = true;
  private _mask: NgIMaskConfig;
  private _isMask = false;
  private _instanceIMaskMoneyRef: IMask.InputMask<IMask.AnyMaskedOptions>;

  @Input() set ngMask(value: NgIMaskConfig) {
    if (!(typeof value === 'string')) {
      this._mask = value as any;
      if ((value as any)?.validator) {
        this._validator = (value as any)?.validator;
      }
    } else if (!!value) {
      this._mask = {
        mask: value.split('|').map((mask) => ({
          mask,
        })),
      };
    }

    if (this._instanceIMaskMoneyRef !== undefined) {
      this.createMask(this._mask);
    }
  }

  @Input() type: string = '';
  @Output() value = new EventEmitter();

  constructor(
    private elementRef: ElementRef<HTMLInputElement>,
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this._inputRef = this.elementRef.nativeElement;
  }

  ngOnInit() {
    const keys = Object.keys(MASKS);
    const type = this.type.toUpperCase();
    if (keys.includes(type) && this._mask === undefined) {
      this._mask = MASKS[type];
    }

    if (this._mask !== undefined) {
      this._isMask = true;
      this.createMask();

      this.renderer2.listen(this._inputRef, 'input', (event) =>
        this.onInput(event)
      );
    }
  }

  createMask(mask: NgIMaskConfig = this._mask) {
    if (MASKS.typesCustom.includes(this.type)) {
      this.renderer2.setAttribute(this._inputRef, 'type', 'text');
    }

    if (this._instanceIMaskMoneyRef === undefined) {
      this._instanceIMaskMoneyRef = IMask(this._inputRef, mask as any);
    } else {
      this._instanceIMaskMoneyRef.updateOptions(this._mask as any);
    }
    this.changeDetectorRef.detectChanges();
  }

  @HostListener('blur', ['$event.target'])
  onTouched = () => {};

  eventTime: any = 0;
  onInput(event?: KeyboardEvent) {
    if (this._instanceIMaskMoneyRef) {
      let value = this.validRequired(this._instanceIMaskMoneyRef.unmaskedValue);

      this.onChange(value);
      this.changeDetectorRef.detectChanges();

      clearTimeout(this.eventTime);
      this.eventTime = setTimeout(() => {
        this.value.emit(value);
      });
    }
  }

  validRequired(value: string | number): any {
    if (this._validator) {
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
    if (this._isMask) {
      this.onInput();
    }
  };
  writeValue(value: number | string): void {
    if (this._isMask) {
      this._inputRef.value = IMask.pipe(value.toString(), this._mask as any);
      this.onInput();
    } else {
      this._inputRef.value = value.toString();
    }
  }
}
