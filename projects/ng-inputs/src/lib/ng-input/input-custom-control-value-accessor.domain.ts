import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
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
  @Input() name: string;
  @Input() disabled: boolean = false;

  @Output() blur = new EventEmitter();
  @Output() focus = new EventEmitter();

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
    sm: 12,
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
    return this._field
      ? this._field
      : (this._configService.field.type as 'group' | 'floating');
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
    let className =
      this._configService.theme === 'bootstrap'
        ? `col-${this._cols.default}`
        : `col`;
    if (this._cols.lg)
      className +=
        this._configService.theme === 'bootstrap'
          ? ` col-lg-${this._cols.lg}`
          : ` lg${this._cols.lg}`;
    if (this._cols.md)
      className +=
        this._configService.theme === 'bootstrap'
          ? ` col-md-${this._cols.md}`
          : ` m${this._cols.md}`;
    if (this._cols.sm)
      className +=
        this._configService.theme === 'bootstrap'
          ? ` col-sm-${this._cols.sm}`
          : ` s${this._cols.sm}`;
    return className;
  }

  constructor(
    private _controlContainer: ControlContainer,
    private _configService: NgInputConfigService
  ) {}

  ngOnInit() {
    this.ngOnInitSuper();
    if (this.disabled) this.control.disable();
    else this.control.enable();
  }

  protected ngOnInitSuper() {
    if (!this.name) this.name = this.name = this.formControlName;
    if (!this.required) {
      this.required = this.control.errors?.required;
      if (!this.required)
        this.required =
          this.errors.find((error) => !!error['required']) != undefined;
    }
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
    this.disabled = isDisabled;
  }
}
