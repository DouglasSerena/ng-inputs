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
} from '@angular/forms';
import { NgConfigService } from '../../config/ng-config.service';
import { TypeFields } from '../../interfaces/ng-config.interface';
import {
  NgIconConfig,
  NgIconPositionsConfig,
} from '../../interfaces/ng-icon-config.interface';

@Component({
  template: '',
})
export class ControlBase implements ControlValueAccessor {
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective: FormControlDirective;
  @ViewChild('rootRef') rootRef: ElementRef<HTMLInputElement>;

  @Input() formControl: FormControl;
  @Input() formControlName: string;

  @Input() id: string;
  @Input() label = '';
  @Input() type = 'text';
  @Input() readonly = false;
  disabled: boolean = false;
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

  @Input() help: string;
  @Input() required: boolean;
  @Input() size: 'lg' | 'md' | 'sm' = 'md';
  @Input() icon: NgIconPositionsConfig;

  @Input() set errors(errors: { [key: string]: string }) {
    this._errors = errors;
    this._errorsKeys = Object.keys(errors);
  }
  _errors: { [key: string]: string };
  _errorsKeys: string[];

  get control() {
    return (
      this.formControl ||
      this._controlContainer?.control?.get(this.formControlName)
    );
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

    const value = this.control.value;
    this.control.reset();
    this.required = !!this.control.getError('required');
    this.control.setValue(value);

    const iconType = this._ngConfig.types(typeField)?.[this.type.toLowerCase()];

    this.icon = Object.assign(
      {},
      this._ngConfig[typeField]?.icon,
      iconType?.icon,
      this.icon
    );
  }

  superAfterViewInit() {
    if (!!this._placeholder) {
      this.placeholder = this._placeholder;
    }
  }

  handleClickIcon(
    event: Event,
    input: HTMLElement,
    icon: NgIconConfig | undefined,
    position: 'left' | 'right'
  ) {
    event.stopPropagation();
    if (icon?.click) {
      icon.click(event, input, icon, position);
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
