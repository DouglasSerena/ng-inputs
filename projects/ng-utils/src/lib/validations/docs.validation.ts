import { AbstractControl, ValidationErrors } from '@angular/forms';
import { validCpf, validCnpj, validRgSp } from '../functions/validations';

export class DocsValidation {
  /**
   * @description EN: Validates "CPF" it uses a calculation to validate that the check digits are correct
   * @description PT: Valida o "CPF"  ele usa um calculo para validar se os dígitos verificadores estão corretos
   * @returns Invalid: `{ isCpf: true }`
   * @returns Valid: `null`
   */
  public static isCpf(control: AbstractControl): ValidationErrors | null {
    let value = control.value;
    if (value === null) {
      return null;
    }

    return validCpf(value) ? null : { isCpf: true };
  }

  /**
   * @description EN: Validates "CNPJ" it uses a calculation to validate that the check digits are correct
   * @description PT: Valida o "CNPJ"  ele usa um calculo para validar se os dígitos verificadores estão corretos
   * @returns Invalid: `{ isCnpj: true }`
   * @returns Valid: `null`
   */
  public static isCnpj(control: AbstractControl): ValidationErrors | null {
    let value = control.value;
    if (value === null) {
      return null;
    }

    return validCnpj(value) ? null : { isCnpj: true };
  }

  /**
   * @description EN: Validates the "CPF" and "CNPJ" it uses a calculation to validate that the check digits are correct
   * @description PT: Valida o "CPF" e "CNPJ"  ele usa um calculo para validar se os dígitos verificadores estão corretos
   * @returns Invalid: `{ isCpfOrCnpj: true }`
   * @returns Valid: `null`
   */
  public static isCpfOrCnpj(control: AbstractControl): ValidationErrors | null {
    let value = control.value as string;
    if (value === null) {
      return null;
    }
    value = value.replace(/\D/g, '');

    if (value.length <= 11) {
      return validCpf(value) ? null : { isCpfOrCnpj: true };
    } else {
      return validCnpj(value) ? null : { isCpfOrCnpj: true };
    }
  }

  /***
   * @description EN: Validate "RG" it uses a calculation to validate that the check digits are correct. obs: Only for rgs from são paulo
   * @description PT: Valida o "RG" ele usa um calculo para validar se os dígitos verificadores estão corretos. obs: Somente para os rgs de são paulo
   * @returns Invalid: `{ isRg: true }`
   * @returns Valid: `null`
   */
  public static isRgSp(control: AbstractControl): ValidationErrors | null {
    let value = control.value;
    if (value === null) {
      return null;
    }

    return validRgSp(value) ? null : { isRg: true };
  }
}
