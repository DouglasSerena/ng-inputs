import { Component, ElementRef, forwardRef, Renderer2 } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectCustomControlValueAccessor } from '../select-custom-control-value-accessor.domain';

@Component({
  selector: 'dss-select',
  templateUrl: './ng-select.component.html',
  styleUrls: ['./ng-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgSelectComponent),
    },
  ],
})
export class NgSelectComponent extends SelectCustomControlValueAccessor {
  constructor(
    protected controlContainer: ControlContainer,
    protected elementRef: ElementRef,
    protected renderer: Renderer2
  ) {
    super(controlContainer, elementRef, renderer);
    this.readonly = false;
  }
}
