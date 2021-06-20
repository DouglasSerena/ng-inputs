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
  formControlDirective: FormControlDirective;
  @ViewChild('rootRef') rootRef: ElementRef<HTMLInputElement>;

  @Input() formControl: FormControl;
  @Input() formControlName: string;

  @Input() id: string;
  @Input() label = '';
  @Input() type = 'text';
  @Input() prefix: string;
  @Input() suffix: string;
  @Input() readonly = false;
  disabled: boolean = false;
  @Input() required: boolean | null = null;
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

  @Input() help: string;
  @Input() color: string = 'primary';
  @Input() icon: NgIconPositionsConfig;
  @Input() size: 'lg' | 'md' | 'sm' = 'md';
  @Input() theme: 'outline' | 'fill' | 'standard' | 'legacy' = 'outline';

  @Input() errors: { [key: string]: string };

  get control(): FormControl {
    return (this.formControl ||
      this._controlContainer?.control?.get(
        this.formControlName
      )) as FormControl;
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
      const value = this.control.value;
      this.control.reset();
      this.required = !!this.control.getError('required');
      this.control.setValue(value);
    }

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
    icon: INgIconConfig | undefined,
    position: 'left' | 'right' | 'loading'
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
