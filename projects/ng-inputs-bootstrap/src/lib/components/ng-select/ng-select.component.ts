import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  Provider,
  Renderer2,
  SkipSelf,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR,
  SelectControlValueAccessor,
} from '@angular/forms';
import { NgConfigService } from '../../config/ng-config.service';
import {
  NgIconConfig,
  NgIconPositionsConfig,
} from '../../interfaces/ng-icon-config.interface';
import { getProp } from '../../utils/get-prop';

export const PROVIDER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgSelectComponent),
  multi: true,
};

export interface NgSelectOptions {
  position?: 'start' | 'end';
  propLabel?: string | string[];
  propValue?: string | string[];
  propCompare?: string | string[];
  options: NgSelectOptionItem[];
}

export interface NgSelectOptionItem {
  label?: string;
  value?: any;
  [key: string]: any;
}

@Component({
  selector: 'ng-select',
  templateUrl: './ng-select.component.html',
  providers: [PROVIDER_VALUE_ACCESSOR],
})
export class NgSelectComponent
  extends SelectControlValueAccessor
  implements OnInit
{
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective: FormControlDirective;
  @ViewChild('selectRef') selectRef: ElementRef<HTMLSelectElement>;

  @Input() formControl: FormControl;
  @Input() formControlName: string;

  @Input() id: string;
  @Input() label = '';
  @Input() type = 'select';
  @Input() readonly = false;
  disabled: boolean = false;

  @Input() help: string;
  @Input() required: boolean;
  @Input() icon: NgIconPositionsConfig;

  @Input() propLabel: string;
  @Input() propValue: string;
  @Input() propCompare: string = '';

  @Input() size: 'lg' | 'md' | 'sm' = 'md';
  @Input() position: 'start' | 'end' = 'start';
  @Input() set options(options: NgSelectOptionItem[]) {
    this._options = options.map((option) => {
      let label: string = '';
      let value: string = '';

      if (!option?.label) {
        label = getProp(option, this.propLabel);
      }
      if (!(typeof option.value === 'string')) {
        if (this.propValue) {
          value = getProp(option, this.propValue);
        } else {
          value = option.value || option;
        }
      }

      option = {
        label: label,
        value: value,
      };
      return option;
    });
  }
  _options: NgSelectOptionItem[] = [];

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
    private renderer2: Renderer2,
    private ngInputConfig: NgConfigService,
    elementRef: ElementRef<any>,
    @SkipSelf() private changeDetectorRef: ChangeDetectorRef
  ) {
    super(renderer2, elementRef);
  }

  ngOnInit() {
    if (this.id === undefined) {
      this.id = this.formControlName;
    }

    const value = this.control.value;
    this.control.reset();
    this.required = !!this.control.getError('required');
    this.control.setValue(value);

    const typeConfig = this.ngInputConfig.typesSelect?.[this.type];

    this.icon = Object.assign(
      {},
      this.ngInputConfig.select?.icon,
      typeConfig?.icon,
      this.icon
    );
  }

  handleCompareWith(itemOne, itemTwo) {
    return itemOne && itemTwo
      ? getProp(itemOne, this.propCompare) ===
          getProp(itemTwo, this.propCompare)
      : itemOne === itemTwo;
  }

  handleClickIcon(
    event: Event,
    select: HTMLSelectElement,
    icon: NgIconConfig | undefined,
    position: 'left' | 'right'
  ) {
    event.stopPropagation();
    if (icon?.click) {
      icon.click(event, select, icon, position);
    } else {
      select.focus();
    }
  }

  @Output() focus = new EventEmitter();
  handleFocus(event: FocusEvent) {
    this.focus.emit(event);
  }

  handleInput(value?: HTMLElement | string | number) {
    this.handleChange(value);
  }

  handleChange = (_: any) => {};
  setDisabledState = (isDisabled: boolean) => (this.disabled = isDisabled);
  registerOnChange = (fn: (_: any) => void) => (this.handleChange = fn);
  writeValue = (value: number | string) => {};
}
