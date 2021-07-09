import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'else',
})
export class ElsePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return !!value ? value : args;
  }
}
