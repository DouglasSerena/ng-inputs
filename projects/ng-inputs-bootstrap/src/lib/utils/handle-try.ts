import { Observable } from 'rxjs';

export async function handleTry<T = any>(
  promise: Promise<T> | Observable<T>,
): Promise<[T | null, any | null]> {
  try {
    if (promise instanceof Observable) {
      promise = promise.toPromise();
    }
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}
