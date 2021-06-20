import { INgOption } from '../interfaces/ng-option.interface';
import { getProp } from './get-prop';

export function compareObject(objectOne: Object, ObjectTwo: Object) {
  return JSON.stringify(objectOne) === JSON.stringify(ObjectTwo);
}
export function compareOptions(options: INgOption[], keys: string, _with: any) {
  return options.find((item) => {
    return compareObject(getProp(item._root, keys), _with);
  });
}
