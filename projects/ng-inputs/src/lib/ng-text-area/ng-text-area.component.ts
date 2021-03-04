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
  selector: 'dss-text-area',
  templateUrl: './ng-text-area.component.html',
  styleUrls: ['./ng-text-area.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgTextAreaComponent),
    },
  ],
})
export class NgTextAreaComponent
  implements OnInit, ControlValueAccessor, IInputDefaultComponent {
  @Input() label: string = 'Sem label: ';
  @Input() placeholder?: string;

  @Input() field: 'group' | 'floating' = 'floating';

  @Input() readonly: boolean;
  @Input() required: boolean = false;

  @Input() length: number | string = 300;
  @Input() cols: number | string = 0;
  @Input() rows: number = 1;

  @Input() errors: IObject[] = [
    { required: `Preencha o campo a cima.` },
    { email: 'Email esta errado.' },
    { maxlength: 'Limite máximo de 100 caracteres' },
  ];

  constructor(private controlContainer: ControlContainer) {
    this.readonly = false;
  }

  ngOnInit() {
    this.required = this.control.errors?.required;
    if (!this.required)
      this.required =
        this.errors.find((errors) => {
          errors.type === 'required';
          console.log(errors);
        }) != undefined;
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
