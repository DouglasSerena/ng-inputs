import { AbstractControl, FormControl } from '@angular/forms';
import * as dayjs from 'dayjs';

export type AnyValidation =
  | Date
  | string
  | dayjs.Dayjs
  | number
