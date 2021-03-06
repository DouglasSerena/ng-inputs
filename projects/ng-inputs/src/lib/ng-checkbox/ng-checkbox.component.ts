import {
  Component,
  ElementRef,
  forwardRef,
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
  @Input() type: 'checkbox' | 'switch' = 'checkbox';
  @Input() line: boolean = false;

  @Input() readonly: boolean;
  @Input() required: boolean = false;

  @Input() errors: IObject[] = [];

  constructor(
    private controlContainer: ControlContainer,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    super(renderer, elementRef);
    this.readonly = false;
  }

  ngOnInit() {}

  getError(error: IObject, value: 'key' | 'value') {
    const key = Object.keys(error)[0];

    return value === 'key'
      ? this.control.errors && this.control.errors[key]
      : error[key];
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
