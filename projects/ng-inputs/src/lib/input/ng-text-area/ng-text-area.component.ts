import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputCustomControlValueAccessor } from '../input-custom-control-value-accessor.domain';

@Component({
  selector: 'dss-text-area',
  templateUrl: './ng-text-area.component.html',
  styleUrls: ['./ng-text-area.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgTextAreaComponent),
    },
  ],
})
export class NgTextAreaComponent extends InputCustomControlValueAccessor {
  @Input() length: number | string = 300;
  @Input() rows: number = 1;

  constructor(protected controlContainer: ControlContainer) {
    super(controlContainer);
  }
}
