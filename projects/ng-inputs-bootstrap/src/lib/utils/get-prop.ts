export const getProp = (object: any, prop: string[] | string): string => {
  if (typeof prop === 'string') {
    prop = prop.split('.');
  }
  prop = [...prop];
  const lastLabel = [...prop];
  const rest = prop.splice(1, prop.length - 1);

  return lastLabel.length === 1
    ? object[lastLabel[0]]
    : getProp(object[lastLabel[0]], rest);
};
