import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChange,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormControlDirective,
  SelectControlValueAccessor,
} from '@angular/forms';

interface IObject {
  [key: string]: string;
}

@Component({ selector: '', template: '' })
export class SelectCustomControlValueAccessor
  extends SelectControlValueAccessor
  implements OnInit {
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective: FormControlDirective;
  @Input() formControl: FormControl;
  @Input() formControlName: string;

  @Output() public change = new EventEmitter();
  @Output() public blur = new EventEmitter();
  @Output() public focus = new EventEmitter();

  get _placeholder() {
    return this.field === 'floating' &&
      !!this.label &&
      this.placeholder.length === 0
      ? false
      : this.placeholder;
  }
  @Input() placeholder: string = '';
  @Input() label: string = '';
  _cols: { default: number; lg: number; md: number; sm: number } = {
    default: 12,
    lg: 12,
    md: 12,
    sm: 12,
  };
  @Input() set cols(cols: {
    default?: number;
    lg?: number;
    md?: number;
    sm?: number;
  }) {
    this._cols = { ...this._cols, ...cols };
  }

  @Input() field: 'group' | 'floating' = 'floating';

  @Input() readonly: boolean;
  @Input() required: boolean = false;

  @Input() errors: IObject[] = [
    { required: `Preencha o campo a cima.` },
    { email: 'Email esta errado.' },
    { maxlength: 'Limite máximo de 100 caracteres' },
  ];

  get control() {
    return (
      this.formControl ||
      this._controlContainer?.control?.get(this.formControlName)
    );
  }

  @HostBinding('class') get classCols() {
    return `col-${this._cols.default} col-lg-${this._cols.lg} col-md-${this._cols.md} col-sm-${this._cols.sm}`;
  }

  constructor(
    protected _controlContainer: ControlContainer,
    protected elementRef: ElementRef,
    protected renderer: Renderer2
  ) {
    super(renderer, elementRef);
    this.readonly = false;
  }

  ngOnInit() {
    this.required = this.control.errors?.required;
    if (!this.required)
      this.required =
        this.errors.find((errors) => errors.type === 'required') != undefined;
  }

  getMultiLabels(labels: any, label: string[]): any {
    const lastLabel = label.concat([]);
    const rest = label.splice(1, label.length - 1);

    return lastLabel.length === 1
      ? labels[lastLabel[0]]
      : this.getMultiLabels(labels[lastLabel[0]], rest);
  }

  getError(error: IObject, value: 'key' | 'value') {
    const key = Object.keys(error)[0];

    return value === 'key'
      ? this.control.errors && this.control.errors[key]
      : error[key];
  }

  registerOnTouched(fn: any): void {
    this.formControlDirective.valueAccessor?.registerOnTouched(fn);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(obj: any): void {
    this.formControlDirective.valueAccessor?.writeValue(obj);
  }

  setDisabledState(isDisabled: boolean): void {
    const disabled = this.formControlDirective.valueAccessor?.setDisabledState;
    disabled && disabled(isDisabled);
  }
}
