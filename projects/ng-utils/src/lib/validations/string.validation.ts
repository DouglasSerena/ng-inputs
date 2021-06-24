import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AnyValidation } from './any.validation';

export class StringValidation {
  /***
   * @description EN: Validates if it is a string
   * @description PT: Valida se é  uma string
   * @returns Invalid: `{ isString: true }`
   * @returns Valid: `null`
   */
  public static isString(work: AnyValidation): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || isNaN(Number(control.value))
        ? null
        : { isString: true };
  }
}
