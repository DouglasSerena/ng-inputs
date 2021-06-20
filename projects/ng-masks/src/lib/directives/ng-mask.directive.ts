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
import * as MASKS from '../utils/MASKS';
import { IMaskServiceReturn } from '../interfaces/ng-mask-service-return.interface';
import { NgMaskService } from '../services/ng-mask.service';
import { INgIMaskConfig } from '../interfaces/ng-imask-config.interface';

const PROVIDER_VALUE_ACCESSOR: Provider = {
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
  private _maskRef: IMaskServiceReturn;
  private _config: INgIMaskConfig;

  @Input() set ngMask(config: INgIMaskConfig | string) {
    if (!(typeof config === 'string')) {
      Object.assign(this._config, config);
    } else {
      this._config = config;
    }
  }

  @Input() type: string = 'text';
  @Output() value = new EventEmitter();

  constructor(
    private elementRef: ElementRef<HTMLInputElement>,
    private renderer2: Renderer2,
    private ngMaskService: NgMaskService,
    changeDetectorRef: ChangeDetectorRef
  ) {
    this._inputRef = this.elementRef.nativeElement;
  }

  ngOnInit() {
    const type = this.type.toUpperCase();
    if (MASKS.typesCustom.includes(type) && !this._config) {
      this._config = MASKS[type];
    }

    if (!!this._config) {
      this._maskRef = this.ngMaskService.createMask(
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
