import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';
import { validBirthDate } from '../functions/validations';
import { AnyValidation } from './any.validation';

dayjs.extend(isBetween);

export class DateValidation {
  /***
   * @description EN: Validate if it is a valid date.
   * @description PT: Valida se é uma data valida.
   * @returns Invalid: `{ isDate: true }`
   * @returns Valid: `null`
   */
  public static isDate(control: AbstractControl): ValidationErrors | null {
    return !control.value || !dayjs(control.value).isValid()
      ? null
      : { isDate: true };
  }

  /***
   * @description EN: Validates if the date entered is after the control date.
   * @description PT: Valida se a data informada é depois da data do controle.
   * @returns Invalid: `{ isAfter: true }`
   * @returns Valid: `null`
   */
  public static isAfter(date: AnyValidation): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || dayjs(date).isAfter(dayjs(control.value))
        ? null
        : { isAfter: true };
  }

  /***
   * @description EN: Validates if the date entered is before the control date.
   * @description PT: Valida se a data informada é antes da data do controle.
   * @returns Invalid: `{ isBefore: true }`
   * @returns Valid: `null`
   */
  public static isBefore(date: AnyValidation): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || dayjs(date).isAfter(dayjs(control.value))
        ? null
        : { isBefore: true };
  }

  /***
   * @description EN: Validates if the date entered is the same as the control date.
   * @description PT: Valida se a data informada é igual a data do controle.
   * @returns Invalid: `{ isEqual: true }`
   * @returns Valid: `null`
   */
  public static isEqual(date: AnyValidation): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || dayjs(date).isSame(dayjs(control.value))
        ? null
        : { isEqual: true };
  }

  /***
   * @description EN: Validates if the control date is within the informed range.
   * @description PT: Valida se a data do controle esta dentro do range informado.
   * @returns Invalid: `{ isBetween: true }`
   * @returns Valid: `null`
   */
  public static isBetween(range: {
    start?: AnyValidation;
    end?: AnyValidation;
  }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value ||
      dayjs(control.value).isBetween(
        dayjs(range?.start || new Date()),
        dayjs(range?.end || new Date())
      )
        ? null
        : { isBetween: true };
  }

  /***
   * @description EN: Valida se a data informada é deferente a data do control.
   * @description PT: Validates if the date entered is different from the controle date.
   * @returns Invalid: `{ isBetween: true }`
   * @returns Valid: `null`
   */
  public static isDifferent(date: AnyValidation): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || !dayjs(date).isSame(dayjs(control.value))
        ? null
        : { isDifferent: true };
  }

  /***
   * @description EN: Validates if the control's birth date is within the range of informed ages.
   * @description PT: Valida se a data de nascimento do controle esta dentro do range das idades informadas.
   * @returns Invalid: `{ isBirchDay: true }`
   * @returns Valid: `null`
   */
  public static isBirchDay(year?: {
    min?: string | number;
    max?: string | number;
  }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || validBirthDate(control.value, year)
        ? null
        : { isBirchDay: true };
  }
}
