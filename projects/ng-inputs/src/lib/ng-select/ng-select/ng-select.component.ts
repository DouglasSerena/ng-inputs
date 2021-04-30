import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChange,
  ViewChild,
} from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IMSelect } from '../../core/directive/select.directive';
import { NgInputConfigService } from '../../core/ng-input-config.service';
import { SelectCustomControlValueAccessor } from '../select-custom-control-value-accessor.domain';

interface IOption {
  label: string;
  value: string;
  hide?: boolean;
  icon?: string;
}

@Component({
  selector: 'dss-select',
  templateUrl: './ng-select.component.html',
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
  @ViewChild('select', { static: true })
  elementSelect: ElementRef<HTMLSelectElement>;

  @Input() MSelectSettings?: IMSelect;
  @Input() optionDefault: IOption = {
    label: 'Selecione uma opção',
    value: '',
    hide: true,
  };
  @Input() options?: any | IOption[] = [];
  @Input() path?: { [key: string]: string };

  constructor(
    protected controlContainer: ControlContainer,
    protected elementRef: ElementRef,
    protected renderer: Renderer2,
    public configService: NgInputConfigService
  ) {
    super(controlContainer, elementRef, renderer, configService);
    this.formatOptions();
  }

  ngOnInit() {
    this.ngOnInitSuper();
  }

  ngOnChanges(params: { options: SimpleChange }) {
    if (!!params.options && !!params.options.currentValue) {
      this.formatOptions();
    }
  }
  formatOptions() {
    if (this.options.length > 0) {
      const option: IOption[] = [];
      option.push(this.optionDefault);

      const optionRef = this.options[0];
      if (
        typeof optionRef?.label === 'string' &&
        typeof optionRef?.value === 'string'
      ) {
        this.options?.forEach((opt: any) => option?.push(opt));
      } else {
        if (this.path) {
          const key = Object.keys(this.path)[0];
          const value = this.path[key];

          this.options?.forEach((opt: any) =>
            option?.push({
              label: this.getMultiLabels(opt, key.split('.')),
              value: this.getMultiLabels(opt, value.split('.')),
              hide: false,
            })
          );
        }
      }

      this.options = option;
    }
  }

  get className() {
    const validField = this.control.valid && this.control.touched;
    const invalidField = this.control.invalid && this.control.touched;
    return {
      readonly: this.readonly,
      'is-invalid': !this.readonly && invalidField,
      'is-valid': validField,
    };
  }
}
