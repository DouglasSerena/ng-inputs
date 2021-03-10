import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChange,
} from '@angular/core';
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
export class NgSelectComponent
  extends SelectCustomControlValueAccessor
  implements OnChanges {
  @Input() labelDefault: string = 'Selecione uma opção';
  @Input() options?: any | { label: string; value: string }[] = [];
  @Input() path?: { [key: string]: string };

  constructor(
    protected controlContainer: ControlContainer,
    protected elementRef: ElementRef,
    protected renderer: Renderer2
  ) {
    super(controlContainer, elementRef, renderer);
    this.formatOptions();
  }

  ngOnChanges(params: { options: SimpleChange }) {
    if (!!params.options && !!params.options.currentValue) {
      this.formatOptions();
    }
  }

  formatOptions() {
    const option: any[] = [];
    option.push({ label: this.labelDefault, value: '' });

    const isValid =
      this.options.length > 0 &&
      (typeof this.options[0].label !== 'string' ||
        typeof this.options[0].value !== 'string');

    if (!!this.path && this.options.length > 0 && isValid) {
      const key = Object.keys(this.path)[0];
      const value = this.path[key];

      this.options?.forEach((opt: any) =>
        option?.push({
          label: this.getMultiLabels(opt, key.split('.')),
          value: this.getMultiLabels(opt, value.split('.')),
        })
      );
    }

    this.options = option;
  }
}
