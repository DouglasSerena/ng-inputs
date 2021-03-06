import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputCustomControlValueAccessor } from '../input-custom-control-value-accessor.domain';

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
  extends InputCustomControlValueAccessor
  implements OnInit {
  @Input() type:
    | 'text'
    | 'password'
    | 'email'
    | 'date'
    | 'month'
    | 'datetime-local'
    | 'currency' = 'text';

  isFieldPassword: boolean = false;
  isFieldCurrency: boolean = false;

  constructor(private controlContainer: ControlContainer) {
    super(controlContainer);
  }

  ngOnInit() {
    this.ngOnInitSuper();

    this.isFieldPassword = this.type === 'password';
    this.isFieldCurrency = this.type === 'currency';

    this.type = this.type === 'currency' ? 'text' : this.type;
  }

  togglePassword() {
    if (this.isFieldPassword)
      this.type = this.type === 'password' ? 'text' : 'password';
  }
}
