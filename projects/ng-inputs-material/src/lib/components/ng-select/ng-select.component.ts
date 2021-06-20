import {
  AfterViewInit,
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
import { MatSelectChange } from '@angular/material/select';
import { NgConfigService } from '../../config/ng-config.service';
import {
  INgIconConfig,
  NgIconPositionsConfig,
} from '../../interfaces/config/ng-icon-config.interface';
import { INgOption } from '../../interfaces/ng-option.interface';
import { NgControlBase } from '../../shared/base/control-base.interface';
import { compareObject, compareOptions } from '../../utils/compare-options';
import { getProp } from '../../utils/get-prop';

const PROVIDER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgSelectComponent),
  multi: true,
};

export interface NgSelectOptions {
  position?: 'start' | 'end';
  keyLabel?: string | string[];
  keyValue?: string | string[];
  keyCompare?: string | string[];
  options: INgOption[];
}

@Component({
  selector: 'ng-select',
  templateUrl: './ng-select.component.html',
  providers: [PROVIDER_VALUE_ACCESSOR],
})
export class NgSelectComponent
  extends SelectControlValueAccessor
  implements OnInit, NgControlBase, AfterViewInit
{
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective: FormControlDirective;
  @ViewChild('rootRef') rootRef: ElementRef<HTMLInputElement>;

  @Input() formControl: FormControl;
  @Input() formControlName: string;

  @Input() id: string;
  @Input() label = '';
  @Input() type = 'select';
  @Input() prefix: string;
  @Input() suffix: string;
  @Input() readonly = false;
  @Input() multiple = false;
  disabled: boolean = false;
  @Input() labelFixed: boolean = false;
  @Input() theme: 'outline' | 'fill' | 'standard' | 'legacy' = 'outline';

  @Input() help: string;
  @Input() color: string = 'primary';
  @Input() required: boolean | null = null;
  @Input() icon: NgIconPositionsConfig;

  @Input() keyLabel: string;
  @Input() keyValue: string = '';
  @Input() keyCompare: string = '';

  @Input() firstOptionLabel: string;
  @Input() firstOptionValue: any = '';

  @Input() size: 'lg' | 'md' | 'sm' = 'md';
  @Input() position: 'start' | 'end' = 'start';
  @Input() set options(options: INgOption[]) {
    this._options = options.map((option) => {
      let label: string = '';
      let value: string = '';

      if (!option?._label) {
        label = getProp(option, this.keyLabel);
      }
      if (!(typeof option._value === 'string')) {
        if (this.keyValue) {
          value = getProp(option, this.keyValue);
        } else {
          value = option._value || option;
        }
      }

      option = {
        _label: label,
        _value: value,
        _root: option,
      };
      return option;
    });
  }
  _options: INgOption[] = [];

  @Input() set placeholder(text: string | null) {
    this._placeholder = text;
    if (!!text && this.rootRef?.nativeElement) {
      this.renderer2.setAttribute(
        this.rootRef.nativeElement,
        'placeholder',
        text
      );
    }
  }
  _placeholder?: string | null;

  @Input() errors: { [key: string]: string };

  get control(): FormControl {
    return (this.formControl ||
      this.controlContainer?.control?.get(this.formControlName)) as FormControl;
  }

  constructor(
    private controlContainer: ControlContainer,
    private renderer2: Renderer2,
    private ngInputConfig: NgConfigService,
    elementRef: ElementRef<any>,
    @SkipSelf() changeDetectorRef: ChangeDetectorRef
  ) {
    super(renderer2, elementRef);
  }

  ngOnInit() {
    if (this.id === undefined) {
      this.id = this.formControlName;
    }

    if (this.required === null) {
      const value = this.control.value;
      this.control.reset();
      this.required = !!this.control.getError('required');
      this.control.setValue(value);
    }

    const typeConfig = this.ngInputConfig.typesSelect?.[this.type];

    this.icon = Object.assign(
      {},
      this.ngInputConfig.select?.icon,
      typeConfig?.icon,
      this.icon
    );
  }

  ngAfterViewInit() {
    if (!!this._placeholder) {
      this.placeholder = this._placeholder;
    }
  }

  handleCompareWith(itemOne, itemTwo) {
    if (!!this.keyValue) {
      itemOne = compareOptions(this._options, this.keyValue, itemOne)._root;
    }
    if (!!this.keyValue) {
      itemTwo = compareOptions(this._options, this.keyValue, itemTwo)._root;
    }

    return itemOne && itemTwo
      ? compareObject(
          getProp(itemOne, this.keyCompare),
          getProp(itemTwo, this.keyCompare)
        )
      : itemOne === itemTwo;
  }
  handleCompareWithBind = this.handleCompareWith.bind(this);

  handleClickIcon(
    event: Event,
    select: any,
    icon: INgIconConfig | undefined,
    position: 'left' | 'right'
  ) {
    event.stopPropagation();
    if (icon?.click) {
      icon.click(event, select, icon, position);
    } else {
      select.focus();
    }
  }

  blur: EventEmitter<any>;
  handleBlur(event: FocusEvent): void {
    throw new Error('Method not implemented.');
  }

  @Output() focus = new EventEmitter();
  handleFocus(event: any) {
    this.focus.emit(event);
  }

  @Output() selected = new EventEmitter();
  handleSelect(option: MatSelectChange) {
    this.selected.emit(option.value);
  }

  handleInput(value?: HTMLElement | string | number) {
    this.handleChange(value);
  }

  handleChange = (_: any) => {};
  setDisabledState = (isDisabled: boolean) => (this.disabled = isDisabled);
  registerOnChange = (fn: (_: any) => void) => (this.handleChange = fn);
  writeValue = (value: number | string) => {};
}
