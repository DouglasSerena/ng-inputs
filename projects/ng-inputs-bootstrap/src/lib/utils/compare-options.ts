import { getNode } from '@douglas-serena/ng-utils';
import { INgOption } from '../interfaces/ng-option.interface';

export function compareObject(objectOne: Object, ObjectTwo: Object) {
  return JSON.stringify(objectOne) === JSON.stringify(ObjectTwo);
}
export function compareOptions(options: INgOption[], keys: string, _with: any) {
  return options.find((item) => {
    return compareObject(getNode(item._root, keys), _with);
  });
}
