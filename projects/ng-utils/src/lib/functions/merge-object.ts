export function mergeObject(objectMerge: object, object: object) {
  return Object.keys(object).reduce((prev, key) => {
    if (object[key].constructor === Object) {
      prev[key] = mergeObject(objectMerge[key], object[key]);
    } else {
      prev[key] = object[key];
    }
    return prev;
  }, objectMerge);
}
