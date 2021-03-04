import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { IInputDefaultComponent, IObject } from '../input-default.interface';

@Component({
  selector: 'dss-input',
  templateUrl: './ng-input.component.html',
  styleUrls: ['./ng-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgInputComponent),
    },
  ],
})
export class NgInputComponent
  implements OnInit, ControlValueAccessor, IInputDefaultComponent {
  @Input() label: string = 'Sem label: ';
  @Input() placeholder?: string;

  @Input() type: 'date' | 'text' | 'password' | 'email' | 'currency' = 'text';
  @Input() field: 'group' | 'floating' = 'floating';

  @Input() readonly: boolean;
  @Input() required: boolean = false;

  @Input() errors: IObject[] = [
    { required: `Preencha o campo a cima.` },
    { email: 'Email esta errado.' },
  ];

  isFieldPassword: boolean = false;
  isFieldCurrency: boolean = false;

  constructor(private controlContainer: ControlContainer) {
    this.readonly = false;
  }

  ngOnInit() {
    this.required = this.control.errors?.required;
    if (!this.required)
      this.required =
        this.errors.find((errors) => errors.type === 'required') != undefined;

    this.isFieldPassword = this.type === 'password';
    this.isFieldCurrency = this.type === 'currency';

    this.type = this.type === 'currency' ? 'text' : this.type;
  }

  togglePassword() {
    if (this.isFieldPassword)
      this.type = this.type === 'password' ? 'text' : 'password';
  }

  getError(error: IObject, value: 'key' | 'value') {
    const key = Object.keys(error)[0];

    return value === 'key'
      ? this.control.errors && this.control.errors[key]
      : error[key];
  }

  // #############################

  // ATTRIBUTE AND METHODS CONTROL

  // #############################

  @ViewChild(FormControlDirective, { static: true })
  formControlDirective: FormControlDirective;
  @Input() formControl: FormControl;
  @Input() formControlName: string;

  get control() {
    return (
      this.formControl ||
      this.controlContainer?.control?.get(this.formControlName)
    );
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
