import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';

type TypeDate = 'date' | 'datetime-local' | 'month' | 'time';

@Injectable({
  providedIn: 'root',
})
export class NgFormatDateByTypeService {
  typeDate: string[] = ['date', 'datetime-local', 'month', 'time'];

  constructor() {}

  format(value: string, typeDate: TypeDate) {
    const formulation = {
      'datetime-local': dayjs(value).format('YYYY-MM-DDTHH:mm:ss'),
      date: dayjs(value).format('YYYY-MM-DD'),
      month: dayjs(value).format('YYYY-MM'),
      time: dayjs(value).format('HH:mm'),
    };
    return formulation[typeDate];
  }
}
