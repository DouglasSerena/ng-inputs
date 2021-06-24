import { clearFormation } from './clear-formation';

export function contains(work: string, compare: string | RegExp) {
  if (typeof compare === 'string') {
    compare = clearFormation(compare);
  }

  return clearFormation(work).match(compare) !== null;
}
