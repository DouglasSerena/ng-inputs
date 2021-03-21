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
import { NgInputConfigService } from '../../core/ng-input-config.service';
import { SelectCustomControlValueAccessor } from '../select-custom-control-value-accessor.domain';
import { FormSelect } from 'materialize-css';

interface IOption {
  label: string;
  value: string;
  hide?: boolean;
}

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
  @ViewChild('select', { static: true })
  elementSelect: ElementRef<HTMLSelectElement>;
  selectMaterialize: FormSelect | null;

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

      if (this.configService.theme === 'materialize') {
        this.updateSelect();
      }
    }
  }

  updateSelect() {
    if (this.selectMaterialize) this.selectMaterialize.destroy();
    this.initSelect();
  }

  initSelect() {
    setTimeout(() => {
      this.selectMaterialize = FormSelect.init(
        this.elementSelect?.nativeElement
      );
    }, 200);
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
    const bootstrap = this.configService.theme === 'bootstrap';
    const validField = this.control.valid && this.control.touched;
    const invalidField = this.control.invalid && this.control.touched;
    return {
      floating: !bootstrap && this.field === 'floating',
      readonly: this.readonly,
      'is-invalid': bootstrap && !this.readonly && invalidField,
      'is-valid': bootstrap && validField,
      invalid: !bootstrap && !this.readonly && invalidField,
      valid: !bootstrap && validField,
    };
  }
}
