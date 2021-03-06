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

interface IObject {
  [key: string]: string;
}

@Component({ selector: '', template: '' })
export class InputCustomControlValueAccessor
  implements ControlValueAccessor, OnInit {
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective: FormControlDirective;
  @Input() formControl: FormControl;
  @Input() formControlName: string;

  get _placeholder() {
    return this.field === 'floating' && this.placeholder.length === 0
      ? false
      : this.placeholder;
  }
  @Input() placeholder: string = '';
  @Input() label: string = '';
  _cols: { default: number; lg: number; md: number; sm: number } = {
    default: 12,
    lg: 12,
    md: 12,
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

  @Input() field: 'group' | 'floating' = 'floating';

  @Input() readonly: boolean;
  @Input() required: boolean = false;

  @Input() errors: IObject[] = [
    { required: `Preencha o campo a cima.` },
    { email: 'Email esta errado.' },
    { maxlength: 'Limite máximo de 100 caracteres' },
  ];

  get control() {
    return (
      this.formControl ||
      this._controlContainer?.control?.get(this.formControlName)
    );
  }

  @HostBinding('class') get classCols() {
    return `col-${this._cols.default} col-lg-${this._cols.lg} col-md-${this._cols.md} col-sm-${this._cols.sm}`;
  }

  constructor(private _controlContainer: ControlContainer) {
    this.readonly = false;
  }

  ngOnInit() {
    this.ngOnInitSuper();
  }

  protected ngOnInitSuper() {
    this.required = this.control.errors?.required;
    if (!this.required)
      this.required =
        this.errors.find((errors) => {
          errors.type === 'required';
        }) != undefined;
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

  registerOnChange(fn: any): void {
    this.formControlDirective.valueAccessor?.registerOnChange(fn);
  }

  writeValue(obj: any): void {
    this.formControlDirective.valueAccessor?.writeValue(obj);
  }

  setDisabledState(isDisabled: boolean): void {
    const disabled = this.formControlDirective.valueAccessor?.setDisabledState;
    disabled && disabled(isDisabled);
  }
}
