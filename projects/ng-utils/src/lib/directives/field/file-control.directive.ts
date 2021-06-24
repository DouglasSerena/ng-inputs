import { HostListener } from '@angular/core';
import { Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: 'input[type=file]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileControlAccessor,
      multi: true,
    },
  ],
})
export class FileControlAccessor implements ControlValueAccessor {
  @HostListener('change', ['$event.target.files'])
  onChange = (_) => {};
  @HostListener('blur')
  onTouched = () => {};

  writeValue(_) {}
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
