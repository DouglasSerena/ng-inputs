import { Observable } from 'rxjs';

export interface INgServiceAutocomplete {
  search(value: string): Promise<any[]> | Observable<any[]>;
}
