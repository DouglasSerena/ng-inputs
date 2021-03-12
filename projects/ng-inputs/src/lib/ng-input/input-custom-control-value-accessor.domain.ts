import {
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
} from '@angular/forms';
import { NgInputConfigService } from '../core/ng-input-config.service';

interface IObject {
  [key: string]: string;
}

interface IOnWrite {
  (value: string): void;
}

@Component({ selector: '', template: '' })
export class InputCustomControlValueAccessor
  implements ControlValueAccessor, OnInit {
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective: FormControlDirective;
  @Input() formControl: FormControl;
  @Input() formControlName: string;
  get theme() {
    return this._configService.theme;
  }

  private _placeholder: string = '';
  get placeholder(): string {
    return this._placeholder;
  }
  @Input() set placeholder(value: string) {
    this._placeholder = value;
  }

  @Input() label: string = '';
  _cols: { default: number; lg?: number; md?: number; sm?: number } = {
    default: 12,
  };
  @Input() set cols(cols: {
    default?: number;
    lg?: number;
    md?: number;
    sm?: number;
  }) {
    this._cols = { ...this._cols, ...cols };
  }

  _field: null | 'group' | 'floating' = null;
  @Input() set field(value: 'group' | 'floating') {
    this._field = value;
  }
  get field() {
    return this._field ? this._field : this._configService.field;
  }

  @Input() readonly: boolean = false;
  @Input() required: boolean = false;

  @Input() errors: IObject[] = [];

  get control() {
    return (
      this.formControl ||
      this._controlContainer?.control?.get(this.formControlName)
    );
  }

  @HostBinding('class') get classCols() {
    let className = `col-${this._cols.default}`;
    if (this._cols.lg) className = `col-lg-${this._cols.lg}`;
    if (this._cols.md) className = `col-md-${this._cols.md}`;
    if (this._cols.sm) className = `col-sm-${this._cols.sm}`;
    return className;
  }

  constructor(
    private _controlContainer: ControlContainer,
    private _configService: NgInputConfigService
  ) {}

  ngOnInit() {
    this.ngOnInitSuper();
  }

  protected ngOnInitSuper() {
    this.required = this.control.errors?.required;
    if (!this.required)
      this.required =
        this.errors.find((error) => !!error['required']) != undefined;
  }

  getError(error: IObject, value: 'key' | 'value') {
    const key = Object.keys(error)[0];

    return value === 'key'
      ? this.control.errors && this.control.errors[key]
      : error[key];
  }

  registerOnTouched(fn: any): void {
    this.formControlDirective.valueAccessor?.registerOnTouched(fn);
  }

  onWrite: IOnWrite;
  registerOnChange(fn: IOnWrite): void {
    this.onWrite = fn;
  }

  writeValue(obj: any): void {
    this.formControlDirective.valueAccessor?.writeValue(obj);
  }

  setDisabledState(isDisabled: boolean): void {
    const disabled = this.formControlDirective.valueAccessor?.setDisabledState;
    disabled && disabled(isDisabled);
  }
}
