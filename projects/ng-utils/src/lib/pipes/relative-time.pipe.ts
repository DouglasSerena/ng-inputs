import { Pipe, PipeTransform } from '@angular/core';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as dayjs from 'dayjs';

dayjs.extend(relativeTime);

@Pipe({
  name: 'relativeTime',
})
export class RelativeTimePipe implements PipeTransform {
  transform(value: any, time: 'last' | 'future' = 'future'): any {
    if (time === 'future') {
      return dayjs(Date.now()).to(value);
    }
    return dayjs(value).to(Date.now());
  }
}
