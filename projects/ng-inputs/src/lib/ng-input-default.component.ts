import { Component, Input, ViewChild } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
} from '@angular/forms';

export interface IObject {
  [key: string]: string;
}

@Component({
  selector: 'dss-input-default',
  template: '',
})
export class NgInputDefaultComponent implements ControlValueAccessor {
  @ViewChild(FormControlDirective, { static: true })
  public formControlDirective: FormControlDirective;

  public controlContainer: ControlContainer;

  @Input() public errors: IObject[] = [
    { required: `Preencha o campo a cima.` },
    { email: 'Email esta errado.' },
  ];
  @Input() public formControl: FormControl;
  @Input() public formControlName: string;
  @Input() public readonly: boolean;
  @Input() public required: boolean = false;

  get control() {
    return (
      this.formControl ||
      this.controlContainer?.control?.get(this.formControlName)
    );
  }

  constructor(controlContainer: ControlContainer) {
    this.controlContainer = controlContainer;

    this.readonly = false;
  }

  public registerOnTouched(fn: any): void {
    this.formControlDirective.valueAccessor?.registerOnTouched(fn);
  }

  public registerOnChange(fn: any): void {
    this.formControlDirective.valueAccessor?.registerOnChange(fn);
  }

  public writeValue(obj: any): void {
    this.formControlDirective.valueAccessor?.writeValue(obj);
  }

  public setDisabledState(isDisabled: boolean): void {
    const disabled = this.formControlDirective.valueAccessor?.setDisabledState;
    disabled && disabled(isDisabled);
  }
}
