import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective,
  NgModel,
} from '@angular/forms';
import { NgConfigService } from '../../config/ng-config.service';
import { TypeFields } from '../../interfaces/config/ng-config.interface';
import {
  INgIconConfig,
  NgIconPositionsConfig,
} from '../../interfaces/config/ng-icon-config.interface';
import { NgControlBase } from './control-base.interface';

@Component({
  template: '',
})
export class ControlBase implements ControlValueAccessor, NgControlBase {
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective?: FormControlDirective;
  @ViewChild('rootRef') rootRef?: ElementRef<HTMLInputElement>;

  @Input() formControl?: FormControl;
  @Input() formControlName?: string;

  @Input() id?: string;
  @Input() label = '';
  @Input() type = 'text';
  @Input() suffix?: string;
  @Input() prefix?: string;
  @Input() readonly = false;
  disabled: boolean = false;
  @Input() required: boolean = null;
  @Input() labelFixed: boolean = false;
  @Input() set placeholder(text: string | null) {
    this._placeholder = text;
    if (!!text && this.rootRef?.nativeElement) {
      this._renderer2.setAttribute(
        this.rootRef.nativeElement,
        'placeholder',
        text
      );
    }
  }

  _placeholder?: string | null;

  @Input() help?: string;
  @Input() color: string = 'primary';
  @Input() icon?: NgIconPositionsConfig;
  @Input() size: 'lg' | 'md' | 'sm' = 'md';
  @Input() theme: 'outline' | 'fill' | 'standard' | 'legacy' = 'outline';

  @Input() set errors(errors: { [key: string]: string } | null) {
    if (errors) {
      this._errors = errors;
      this._errorsKeys = Object.keys(errors);
    }
  }
  _errors?: { [key: string]: string };
  _errorsKeys?: string[];

  get control(): FormControl | null {
    if (this.formControlName) {
      return this._controlContainer?.control?.get(
        this.formControlName
      ) as FormControl;
    }
    if (!this.formControl) {
      this.formControl = new FormControl();
    }
    return this.formControl;
  }

  constructor(
    private _controlContainer: ControlContainer,
    private _renderer2: Renderer2,
    private _ngConfig: NgConfigService
  ) {}

  superOnInit(typeField: TypeFields) {
    if (this.id === undefined) {
      this.id = this.formControlName;
    }

    if (this.required === null) {
      const value = this.control?.value;
      this.control?.reset();
      this.required = !!this.control?.getError('required');
      this.control?.setValue(value);
    }

    const iconType =
      this._ngConfig.types(typeField)?.[this.type.toLowerCase()]?.icon;
    const iconGlobal = this._ngConfig[typeField as 'select']?.icon;

    this.icon = Object.assign({}, iconGlobal, iconType, this.icon);
  }

  superAfterViewInit() {
    if (!!this._placeholder) {
      this.placeholder = this._placeholder;
    }
  }

  handleClickIcon(
    prop: { event: Event; icon: INgIconConfig | undefined },
    input: any,
    position: 'left' | 'right' | 'loading'
  ) {
    prop.event.stopPropagation();
    if (prop.icon?.click) {
      prop.icon.click(prop.event, input, prop.icon, position);
    } else {
      input.focus();
    }
  }

  @Output() blur = new EventEmitter();
  handleBlur(event: FocusEvent) {
    this.handleTouched();
    this.blur.emit(event);
  }

  @Output() focus = new EventEmitter();
  handleFocus(event: FocusEvent) {
    this.focus.emit(event);
  }
  handleChange = (_: any) => {};
  handleTouched = () => {};
  registerOnTouched = (fn: () => void) => (this.handleTouched = fn);
  setDisabledState = (isDisabled: boolean) => (this.disabled = isDisabled);
  registerOnChange = (fn: (_: any) => void) => (this.handleChange = fn);
  writeValue = (value: number | string) => {};
}
