import { clearFormation } from './clear-formation';

export function contains(work: string, compare: string | RegExp, clear = true) {
  if (clear) {
    work = clearFormation(work);
  }

  return work?.match(compare) !== null;
}
