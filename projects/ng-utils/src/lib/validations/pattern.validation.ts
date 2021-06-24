import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CommonValidation } from './common.validation';
import { REGEX_EMAIL, REGEX_PHONE_BR, REGEX_URL } from './regex';

export class PatternValidation {
  /***
   * @description EN: Validates if it is an email using regex
   * @description PT: Valida se é um email usando regex
   * @returns Invalid: `{ isEmail: true }`
   * @returns Valid: `null`
   * ```javascript
   *  "REGEX": /^[-\w.%+]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
   * ```
   */
  public static isEmail(control: AbstractControl): ValidationErrors | null {
    return !control.value || REGEX_EMAIL.test(control.value)
      ? null
      : { isEmail: true };
  }

  /***
   * @description EN: Validates if it is an phone using regex
   * @description PT: Valida se é um phone usando regex
   * @returns Invalid: `{ isPhoneBr: true }`
   * @returns Valid: `null`
   * ```javascript
   *  "REGEX": /^((\()?(\d{2})?(\))?( )?(9)?( )?\d{4}(-)?\d{4})$/
   * ```
   */
  public static isPhoneBr(control: AbstractControl): ValidationErrors | null {
    return !control.value || REGEX_PHONE_BR.test(control.value)
      ? null
      : { isPhoneBr: true };
  }

  /***
   * @description EN: Validates if it is an url using regex
   * @description PT: Valida se é um url usando regex
   * @returns Invalid: `{ isUrl: true }`
   * @returns Valid: `null`
   * ```javascript
   *  "REGEX": /^((((http[s]?):\/{2})?)+(([0-9a-z_-]+\.)+([a-z]{2,3}))(:[0-9]+)?((\/([~0-9a-zA-Z\#\+\%@\.\/_-]+))?(\?[0-9a-zA-Z\+\%@\/&\[\];=_-]+)?)?)/
   * ```
   */
  public static isUrl(control: AbstractControl): ValidationErrors | null {
    return !control.value || REGEX_URL.test(control.value)
      ? null
      : { isUrl: true };
  }
}
