import { FormControl, FormControlDirective } from '@angular/forms';

export interface IObject {
  [key: string]: string;
}

export interface IInputDefaultComponent {
  formControlDirective: FormControlDirective;

  errors: IObject[];
  formControl: FormControl;
  formControlName: string;
  readonly: boolean;
  required: boolean;

  getError(error: IObject, value: 'key' | 'value'): void;
}
