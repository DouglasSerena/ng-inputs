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
import { MatSelect } from '@angular/material/select';
import { getNode } from '@douglas-serena/ng-utils';
import { NgConfigService } from '../../config/ng-config.service';
import {
  INgIconConfig,
  NgIconPositionsConfig,
} from '../../interfaces/config/ng-icon-config.interface';
import { INgOption } from '../../interfaces/ng-option.interface';
import { NgControlBase } from '../../shared/base/control-base.interface';
import { compareObject, compareOptions } from '../../utils/compare-options';

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
  @ViewChild('rootRef') rootRef: MatSelect;

  @Input() formControl: FormControl;
  @Input() formControlName: string;

  @Output() selectChange = new EventEmitter();
  @Input() set select(value: any) {
    if (!!value && this.rootRef) {
      this.rootRef.writeValue(value);
    } else {
      setTimeout(() => {
        this.select = value;
      }, 10);
    }
  }

  @Input() id: string;
  @Input() label = '';
  @Input() type = 'select';
  @Input() prefix: string;
  @Input() suffix: string;
  @Input() readonly = false;
  @Input() multiple = false;
  disabled: boolean = false;
  @Input() labelFixed: boolean = false;
  @Input() optionsFormat: 'CUSTOM' | 'NATIVE' = 'CUSTOM';
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
  @Input() set options(options: any[]) {
    this._options = options.map((option) => {
      let label: string = '';
      let value: string = '';
      let disabled: boolean = false;

      if (option.disabled !== undefined) {
        disabled = option.disabled;
      }

      if (option.value !== undefined && option.label !== undefined) {
        label = option.label;
        value = option.value;
        this.optionsFormat = 'NATIVE';
      } else {
        if (!option?._label) {
          label = getNode(option, this.keyLabel);
        }
        if (!(typeof option._value === 'string')) {
          if (this.keyValue) {
            value = getNode(option, this.keyValue);
          } else {
            value = option._value || option;
          }
        }
      }

      option = {
        _label: label,
        _value: value,
        _root: option,
        _disabled: disabled,
      };
      return option;
    });
  }
  _options: INgOption[] = [];

  @Input() set placeholder(text: string | null) {
    this._placeholder = text;
    if (!!text && this.rootRef?._elementRef?.nativeElement) {
      this.renderer2.setAttribute(
        this.rootRef._elementRef.nativeElement,
        'placeholder',
        text
      );
    }
  }
  _placeholder?: string | null;

  @Input() set errors(errors: { [key: string]: string } | null) {
    if (errors) {
      this._errors = errors;
      this._errorsKeys = Object.keys(errors);
    }
  }
  _errors: { [key: string]: string };
  _errorsKeys: string[];

  get control(): FormControl | null {
    if (this.formControlName) {
      return this.controlContainer?.control?.get(
        this.formControlName
      ) as FormControl;
    }
    if (!this.formControl) {
      this.formControl = new FormControl();
    }
    return this.formControl;
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

    if (this.required === null && this.control) {
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
    if (this.optionsFormat === 'NATIVE') {
      return compareObject(itemOne, itemTwo);
    }

    if (!!this.keyValue) {
      itemOne = compareOptions(this._options, this.keyValue, itemOne)?._root;
    }
    if (!!this.keyValue) {
      itemTwo = compareOptions(this._options, this.keyValue, itemTwo)?._root;
    }

    return itemOne && itemTwo
      ? compareObject(
          getNode(itemOne, this.keyCompare),
          getNode(itemTwo, this.keyCompare)
        )
      : itemOne === itemTwo;
  }
  handleCompareWithBind = this.handleCompareWith.bind(this);

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

  blur: EventEmitter<any>;
  handleBlur(event: FocusEvent): void {
    throw new Error('Method not implemented.');
  }

  @Output() focus = new EventEmitter();
  handleFocus(event: any) {
    this.focus.emit(event);
  }

  handleSelect(option: any) {
    this.selectChange.emit(option.value);
  }

  handleInput(value?: HTMLElement | string | number) {
    this.handleChange(value);
  }

  handleChange = (_: any) => {};
  setDisabledState = (isDisabled: boolean) => (this.disabled = isDisabled);
  registerOnChange = (fn: (_: any) => void) => (this.handleChange = fn);
  writeValue = (value: number | string) => {};
}
