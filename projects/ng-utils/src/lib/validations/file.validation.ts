import {
  ValidatorFn,
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

type Sizes = 'B' | 'KB' | 'MB' | 'GB' | 'TB';

export class FileValidation {
  public static resolution_width = {
    HD: 1280,
    HD_MORE: 1366,
    FULL_HD: 1920,
    QUAD_HD: 2560,
    UHD: 3840,
  };
  public static resolution_height = {
    HD: 720,
    HD_MORE: 768,
    FULL_HD: 1080,
    QUAD_HD: 1440,
    UHD: 2160,
  };
  public static sizes = {
    B: 1,
    KB: 1024,
    MB: 1048576,
    GB: 1073741824,
    TB: 1099511627776,
  };

  /***
   * @description EN: Validates if any file was passed
   * @description PT: Válida se foi passado algum arquivo
   * @returns Invalid: `{ isRequiredFile: true }`
   * @returns Valid: `null`
   */
  public static isRequiredFile(
    control: AbstractControl
  ): ValidationErrors | null {
    return control.value && control.value.length
      ? null
      : { isRequiredFile: true };
  }

  /***
   * @description EN: Validates if any file was passed
   * @description PT: Válida se foi passado algum arquivo
   * @returns Invalid: `{ allowExtensions: { allowedExtensions: [''], filesInvalid: { filename: "", mimeType: "", extension: "" }[] } }`
   * @returns Invalid: `{ isNotFile: true }`
   * @returns Valid: `null`
   */
  public static isAllowExtensions(extensions: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files: File[] = control.value || [];
      let filesInvalid: {
        filename: string;
        mimeType: string;
        extension: string;
      }[] = [];
      let isValid = false;

      for (let file of Array.from(files)) {
        isValid = false;
        let type = [];

        if (!(file instanceof File)) {
          return { isNotFile: true };
        }

        for (let extension of extensions) {
          type = file.name.split('.');

          if (type.length < 2) {
            return { hasNoExtension: true };
          }

          if (extension === type[type.length - 1]) {
            isValid = true;
            break;
          }
        }

        if (!isValid) {
          filesInvalid.push({
            filename: file.name,
            mimeType: file.type,
            extension: type[type.length - 1],
          });
        }
      }

      if (filesInvalid.length > 0) {
        return {
          allowedExtensions: extensions,
          filesInvalid,
        };
      }

      return null;
    };
  }

  /***
   * @description EN: Check if the file size is within the stated limit
   * @description PT: Verifica se o tamanho do arquivo está no limite informado
   * @returns Invalid: `{ minSize: {minSize: number, typeDefined: string, filesInvalid: { filename: string; type: string; fileSizeInBytes: string | number; }[] }`
   * @returns Invalid: `{ isNotFile: true }`
   * @returns Valid: `null`
   */
  public static minSize(min: number, type: Sizes = 'KB'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files: File[] = control.value || [];
      let size = this.sizes[type] || this.sizes.B;
      let filesInvalid: {
        filename: string;
        type: string;
        fileSizeInBytes: string | number;
      }[] = [];
      size = size * min;

      for (let file of Array.from(files)) {
        if (!(file instanceof File)) {
          return { isNotFile: true };
        }

        if (file.size < size)
          filesInvalid.push({
            filename: file.name,
            fileSizeInBytes: file.size,
            type: file.type,
          });
      }

      if (filesInvalid.length) {
        return {
          minSize: size,
          typeDefined: type,
          filesInvalid,
        };
      }

      return null;
    };
  }

  /***
   * @description EN: Check if the file size is within the stated limit
   * @description PT: Verifica se o tamanho do arquivo está no limite informado
   * @returns Invalid: `{ maxSize: {maxSize: number, typeDefined: string, filesInvalid: { filename: string; type: string; fileSizeInBytes: string | number; }[] }`
   * @returns Invalid: `{ isNotFile: true }`
   * @returns Valid: `null`
   */
  public static maxSize(max: number, type: string = 'KB'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files: File[] = control.value || [];
      let size = this.sizes[type] || this.sizes.B;
      let filesInvalid: {
        filename: string;
        type: string;
        fileSizeInBytes: string | number;
      }[] = [];
      size = size * max;

      for (let file of Array.from(files)) {
        if (!(file instanceof File)) {
          return { isNotFile: true };
        }

        if (file.size > size)
          filesInvalid.push({
            filename: file.name,
            fileSizeInBytes: file.size,
            type: file.type,
          });
      }

      if (filesInvalid.length) {
        return {
          maxSize: size,
          typeDefined: type,
          filesInvalid,
        };
      }

      return null;
    };
  }

  /***
   * @description EN: Check the amount of files accepted
   * @description PT: Verifica a quantidade de arquivos aceitos
   * @returns Invalid: `{ maxFiles: true }`
   * @returns Valid: `null`
   */
  public static maxFiles(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control.value instanceof FileList)) {
        return null;
      }
      const files: File[] | FileList = control.value || [];
      return files.length > max ? { maxFiles: true } : null;
    };
  }

  /***
   * @description EN: Check the amount of files accepted
   * @description PT: Verifica a quantidade de arquivos aceitos
   * @returns Invalid: `{ minFiles: true }`
   * @returns Valid: `null`
   */
  public static minFiles(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control.value instanceof FileList)) {
        return null;
      }
      const files: File[] | FileList = control.value || [];
      return files.length < min ? { minFiles: true } : null;
    };
  }

  /***
   * @description EN: Check the accepted width of the image
   * @description PT: Verificar a largura aceita da imagem
   * @returns Invalid: `{ min_width_image: { filename: "", min_width_allow: 0, width_file: 0 } }`
   * @returns Invalid: `{ min_width_image: { isNotLoadImage: true} }`
   * @returns Invalid: `{  min_width_image: { isNotImage: true } }`
   * @returns Valid: `null`
   */
  public static asyncMinWidthImage(
    min: number = this.resolution_width.HD
  ): AsyncValidatorFn | any {
    return (control: AbstractControl) => {
      return this._checkImage(control, min, 'min', 'width');
    };
  }

  /***
   * @description EN: Check the accepted width of the image
   * @description PT: Verificar a largura aceita da imagem
   * @returns Invalid: `{ max_width_image: { filename: "", max_width_allow: 0, width_file: 0 } }`
   * @returns Invalid: `{ max_width_image: { isNotLoadImage: true} }`
   * @returns Invalid: `{  max_width_image: { isNotImage: true } }`
   * @returns Valid: `null`
   */
  public static asyncMaxWidthImage(
    max: number = this.resolution_width.HD
  ): AsyncValidatorFn | any {
    return (control: AbstractControl) => {
      return this._checkImage(control, max, 'max', 'width');
    };
  }

  /***
   * @description EN: Check the accepted height of the image
   * @description PT: Verificar a altura aceita da imagem
   * @returns Invalid: `{ min_height_image: { filename: "", min_height_allow: 0, height_file: 0 } }`
   * @returns Invalid: `{ min_height_image: { isNotLoadImage: true} }`
   * @returns Invalid: `{  min_height_image: { isNotImage: true } }`
   * @returns Valid: `null`
   */
  public static asyncMinHeightImage(
    min: number = this.resolution_height.HD
  ): AsyncValidatorFn | any {
    return (control: AbstractControl) => {
      return this._checkImage(control, min, 'min', 'height');
    };
  }

  /***
   * @description EN: Check the accepted height of the image
   * @description PT: Verificar a altura aceita da imagem
   * @returns Invalid: `{ max_height_image: { filename: "", max_height_allow: 0, height_file: 0 } }`
   * @returns Invalid: `{ max_height_image: { isNotLoadImage: true} }`
   * @returns Invalid: `{  max_height_image: { isNotImage: true } }`
   * @returns Valid: `null`
   */
  public static asyncMaxHeightImage(
    max: number = this.resolution_height.HD
  ): AsyncValidatorFn | any {
    return (control: AbstractControl) => {
      return this._checkImage(control, max, 'max', 'height');
    };
  }

  private static _checkImage(
    control: AbstractControl,
    size: number,
    compare: string,
    widthOrHeight: 'height' | 'width'
  ) {
    let prop = `${compare}_${widthOrHeight}_image`;

    return new Promise((resolve, reject) => {
      const files: File[] = control.value || [];

      let counterFileVerify = 0;

      for (let file of Array.from(files)) {
        if (!(file instanceof File)) {
          return { isNotFile: true };
        }

        let type = file.type.split('/');

        if (type[0] !== 'image')
          return resolve({ [prop]: { isNotImage: true } });

        let image = new Image();

        image.onload = () => {
          let isValid = false;
          counterFileVerify++;

          if (compare == 'max') {
            isValid = image[widthOrHeight] > size;
          } else {
            isValid = image[widthOrHeight] < size;
          }

          if (isValid)
            return resolve({
              [prop]: {
                filename: file.name,
                [`${compare}_${widthOrHeight}_allow`]: size,
                [`${widthOrHeight}_file`]: image[widthOrHeight],
              },
            });

          if (counterFileVerify >= files.length) {
            return resolve(null);
          }
        };

        image.onerror = () => {
          return resolve({ [prop]: { isNotLoadImage: true } });
        };

        image.src = URL.createObjectURL(file);
      }
    });
  }
}
