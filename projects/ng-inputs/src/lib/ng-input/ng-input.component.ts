import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  IObject,
  NgInputDefaultComponent,
} from '../ng-input-default.component';

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
  extends NgInputDefaultComponent
  implements OnInit {
  @Input() label: string = 'Sem label: ';
  @Input() type: 'date' | 'text' | 'password' | 'email' | 'currency' = 'text';

  isFieldPassword: boolean = false;
  isFieldCurrency: boolean = false;

  constructor(controlContainer: ControlContainer) {
    super(controlContainer);
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
}
