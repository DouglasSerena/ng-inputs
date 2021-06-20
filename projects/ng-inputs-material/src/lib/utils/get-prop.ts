export const getProp = (object: any, keys: string[] | string): string => {
  if (typeof keys === 'string') {
    keys = keys.split('.');
  }
  keys = keys.filter((key) => key);

  if (keys.length === 0) {
    return object;
  }

  let key = keys[0];
  keys.shift();

  if (keys.length === 0) {
    return object[key];
  } else {
    return getProp(object[key], keys);
  }
};
