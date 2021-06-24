export function isEmpty<T = any>(item: Object | Array<T>) {
  if (item instanceof Array) {
    return item.length === 0;
  } else {
    return Object.keys(item).length === 0;
  }
}
