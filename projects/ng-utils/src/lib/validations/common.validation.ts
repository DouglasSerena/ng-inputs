import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { contains } from '../functions';
import { AnyValidation } from './any.validation';
import { DateValidation } from './date.validation';
import { DocsValidation } from './docs.validation';
import { FileValidation } from './file.validation';
import { NumberValidation } from './number.validation';
import { ObjectValidation } from './object.validation';
import { PatternValidation } from './pattern.validation';
import { REGEX_CHAR_SPECIAL, REGEX_NUMBER, REGEX_UPPER_CASE } from './regex';
import { StringValidation } from './string.validation';

export class CommonValidation {
  public static date = DateValidation;
  public static number = NumberValidation;
  public static string = StringValidation;
  public static pattern = PatternValidation;
  public static docs = DocsValidation;
  public static files = FileValidation;
  public static object = ObjectValidation;

  /***
   * @description EN: validates if the value passed in the control value exists.
   * @description PT: valida se existe o valor passado no valor do controle.
   * @returns Invalid: `{ contains: true }`
   * @returns Valid: `null`
   */
  public static contains(work: AnyValidation): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || contains(work?.toString(), control.value?.toString())
        ? null
        : { contains: true };
  }

  /***
   * @description EN: validate if the value passed is different from the control value.
   * @description PT: validar se o valor passado é diferente do valor do controle.
   * @returns Invalid: `{ isDifferent: true }`
   * @returns Valid: `null`
   */
  public static isDifferent(work: AnyValidation): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || work?.toString() !== control.value?.toString()
        ? null
        : { isDifferent: true };
  }

  /***
   * @description EN: validate if the value passed is equal to the control value.
   * @description PT: validar se o valor passado é igual do valor do controle.
   * @returns Invalid: `{ isEqual: true }`
   * @returns Valid: `null`
   */
  public static isEqual(work: AnyValidation): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      work?.toString() === control.value?.toString() ? null : { isEqual: true };
  }

  /**
   * @description EN: Validates if the control data type is the same as the one entered
   * @description PT: Valida se o tipo do dado do controle é igual o informado
   * @returns Invalid: `{ isTypeof: true }`
   * @returns Valid: `null`
   */
  public static isTypeof(type: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>
      !control.value || typeof control.value === type
        ? null
        : { isTypeof: true };
  }

  /***
   * @description EN: Password validator, validates if the password has an uppercase or special character like '@,$,-,\' and if it has a number, all these validations can be disabled.
   * @description PT: Validador de senha, valida se a senha possui um carácter maiúsculo outro especial como '@,$,-,\' e se tem um numero, todas essa validações podem ser desabilitados.
   * @returns Invalid: `{ isPassword: true }`
   * @returns Valid: `null`
   */
  public static isPassword(disabled?: {
    charUpperCase?: boolean;
    charSpecial?: boolean;
    number?: boolean;
  }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const upperCase =
        disabled?.charUpperCase || contains(control.value, REGEX_UPPER_CASE);
      const charSpecial =
        disabled?.charSpecial || contains(control.value, REGEX_CHAR_SPECIAL);
      const number = disabled?.number || contains(control.value, REGEX_NUMBER);

      return !control.value || (upperCase && charSpecial && number)
        ? null
        : { isPassword: true };
    };
  }

  /**
   * @description  EN: Used to link a secondary control with this one and can use validators like isEqual to validate that the two controls have the same value
   * @description  PT: Usado para vincular um controle secundário com este podendo usar validadores como o isEqual para validar se os dois controles possui o mesmo valor
   */
  public static control(
    controlKey: string,
    validation: (control: any) => ValidatorFn,
    listenerKey: string = ''
  ) {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (parent === null) {
        return null;
      }

      const sibling = parent.get(controlKey);
      if (sibling === null) {
        return null;
      }

      if (!listenerKey) {
        listenerKey = this.getControlKey(control, parent);
      }

      this._updateValidator(sibling, listenerKey, () => {
        control.updateValueAndValidity();
      });

      const fn = validation(sibling.value);

      return fn(control);
    };
  }

  // CONTROL EVENTS UPDATE FIELD

  private static _listeners: any = {};

  private static _eventDestroyListener: Subscription;

  /**
   * @description  EN: this Observable is used to remove the listeners, if this is not done there will be an increasing memory usage in each navigation
   * @description  PT: Este Observable é usado para remover os ouvintes, se isso não for feito haverá um uso crescente de memória em cada navegação
   */
  public static set eventDestroyListener(value: Observable<any>) {
    if (this._eventDestroyListener) {
      this._eventDestroyListener.unsubscribe();
    }
    this._eventDestroyListener = value.subscribe(() =>
      this._destroyListeners()
    );
  }

  public static getControlKey(
    control: AbstractControl,
    parent: FormGroup | FormArray
  ) {
    return Object.keys(parent).find((key) => {
      let childControl = parent.get(key);
      return childControl === control;
    });
  }

  public static _updateValidator(
    control: AbstractControl,
    listenerName: string,
    callback: (value: any) => void
  ): void {
    if (
      !this._listeners[listenerName] ||
      this._listeners[listenerName].closed
    ) {
      this._listeners[listenerName] = control.valueChanges.subscribe(callback);
    }
  }

  public static _destroyListeners() {
    for (let keyListener in this._listeners) {
      this._listeners[keyListener].unsubscribe();
    }
    this._listeners = {};
  }
}
