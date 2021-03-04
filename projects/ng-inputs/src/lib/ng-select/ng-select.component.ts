import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Renderer2,
  SimpleChange,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR,
  SelectControlValueAccessor,
} from '@angular/forms';
import { IInputDefaultComponent, IObject } from '../input-default.interface';

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
  extends SelectControlValueAccessor
  implements OnInit, IInputDefaultComponent {
  @Input() label: string = 'Sem label: ';

  @Input() field: 'group' | 'floating' = 'floating';

  @Input() options?: any | { label: string; value: string }[] = [];
  @Input() path?: { [key: string]: string };
  @Input() labelDefault: string = 'Selecione uma opção';

  @Input() readonly: boolean;
  @Input() required: boolean = false;

  @Input() errors: IObject[] = [
    { required: `Preencha o campo a cima.` },
    { email: 'Email esta errado.' },
  ];

  constructor(
    private controlContainer: ControlContainer,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    super(renderer, elementRef);
    this.readonly = false;
  }

  ngOnInit() {
    this.required = this.control.errors?.required;
    if (!this.required)
      this.required =
        this.errors.find((errors) => errors.type === 'required') != undefined;

    this.formatOptions();
  }

  ngOnChanges(params: { options: SimpleChange }) {
    if (!!params.options && !!params.options.currentValue) {
      this.formatOptions();
    }
  }

  getError(error: IObject, value: 'key' | 'value') {
    const key = Object.keys(error)[0];

    return value === 'key'
      ? this.control.errors && this.control.errors[key]
      : error[key];
  }

  formatOptions() {
    const option: any[] = [];
    option.push({ label: this.labelDefault, value: '' });

    const isValid =
      this.options.length > 0 &&
      (typeof this.options[0].label !== 'string' ||
        typeof this.options[0].value !== 'string');

    if (!!this.path && this.options.length > 0 && isValid) {
      const getMultiLabels = (labels: any, label: string[]): string => {
        const lastLabel = label.concat([]);
        const rest = label.splice(1, label.length - 1);

        return lastLabel.length === 1
          ? labels[lastLabel[0]]
          : getMultiLabels(labels[lastLabel[0]], rest);
      };

      const key = Object.keys(this.path)[0];
      const value = this.path[key];

      this.options?.forEach((opt: any) =>
        option?.push({
          label: getMultiLabels(opt, key.split('.')),
          value: getMultiLabels(opt, value.split('.')),
        })
      );
    }

    this.options = option;
  }

  // #############################

  // ATTRIBUTE AND METHODS CONTROL

  // #############################

  @ViewChild(FormControlDirective, { static: true })
  formControlDirective: FormControlDirective;
  @Input() formControl: FormControl;
  @Input() formControlName: string;

  get control() {
    return (
      this.formControl ||
      this.controlContainer?.control?.get(this.formControlName)
    );
  }

  writeValue(value: any): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'checked', value);
  }

  onChange: (_: any) => {};
  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  onTouched: () => {};
  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'disabled',
      isDisabled
    );
  }
}
