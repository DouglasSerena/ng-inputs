import { getNode } from './get-node';

export const sortAsc = (object: any[], filter: string) => {
  const arrayFilterLabel = filter?.split('|');
  const pipe = arrayFilterLabel[1];

  filter = arrayFilterLabel[0];

  return object.sort((a: any, b: any) => {
    let node_a = getNode(a, filter?.split('.'));
    let node_b = getNode(b, filter?.split('.'));

    if (typeof node_a === 'number' && typeof node_b === 'number') {
      return node_a - node_b;
    } else if (typeof node_a === 'string') {
      if (node_a.toLocaleUpperCase() < node_b.toLocaleUpperCase()) {
        return -1;
      }
      if (node_b.toLocaleUpperCase() < node_a.toLocaleUpperCase()) {
        return 1;
      }
    }
    return 0;
  });
};
