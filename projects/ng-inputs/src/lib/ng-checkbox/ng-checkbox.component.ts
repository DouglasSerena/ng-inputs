import {
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  CheckboxControlValueAccessor,
  ControlContainer,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NgInputConfigService } from './../core/ng-input-config.service';

interface IObject {
  [key: string]: string;
}
@Component({
  selector: 'dss-checkbox',
  templateUrl: './ng-checkbox.component.html',
  styleUrls: ['./ng-checkbox.component.scss'],
  host: {
    '(change)': 'onChange($event.target.checked)',
    '(blur)': 'onTouched()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgCheckboxComponent),
    },
  ],
})
export class NgCheckboxComponent extends CheckboxControlValueAccessor {
  @Input() label: string = 'Sem label: ';
  @Input() type: 'checkbox' | 'switch' | 'button-checkbox' | 'button-switch' =
    'checkbox';
  @Input() line: boolean = false;

  @Input() readonly: boolean;
  @Input() required: boolean = false;
  @Input() help?: string;

  @Input() errors: IObject = {};

  @Input() suffix: string = '';
  @Input() prefix: string = '';

  _cols: { default: number; lg?: number; md?: number; sm?: number } = {
    default: 12,
  };
  @Input() set cols(cols: {
    default?: number;
    lg?: number;
    md?: number;
    sm?: number;
  }) {
    this._cols = { ...this._cols, ...cols };
  }
  @HostBinding('class') get classCols() {
    let className =
      this.configService.theme === 'bootstrap'
        ? `col-${this._cols.default}`
        : `col`;
    if (this._cols.lg)
      className +=
        this.configService.theme === 'bootstrap'
          ? ` col-lg-${this._cols.lg}`
          : ` l${this._cols.lg}`;
    if (this._cols.md)
      className +=
        this.configService.theme === 'bootstrap'
          ? ` col-md-${this._cols.md}`
          : ` m${this._cols.md}`;
    if (this._cols.sm)
      className +=
        this.configService.theme === 'bootstrap'
          ? ` col-sm-${this._cols.sm}`
          : ` s${this._cols.sm}`;
    return className;
  }

  constructor(
    private controlContainer: ControlContainer,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public configService: NgInputConfigService
  ) {
    super(renderer, elementRef);
    this.readonly = false;
  }

  ngOnInit() {}

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

  getKeys(errors: IObject) {
    return Object.keys(errors);
  }
  getError(key: string) {
    return this.control?.errors?.[key] && this.control?.touched;
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
