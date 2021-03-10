export const Debounce = (delay: number = 300) => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  let timeout: any = null;

  const original = descriptor.value;

  descriptor.value = function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => original.apply(this, args), delay);
  };

  return descriptor;
};
