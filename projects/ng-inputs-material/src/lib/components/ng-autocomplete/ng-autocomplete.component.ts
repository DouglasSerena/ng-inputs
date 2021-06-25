import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  Output,
  Provider,
  Renderer2,
  SkipSelf,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NgConfigService } from '../../config/ng-config.service';
import { ControlBase } from '../../shared/base/control-base.template';
import {
  IMaskServiceReturn,
  INgIMaskConfig,
  MASKS,
  NgMaskService,
} from '@douglas-serena/ng-masks';
import { compareOptions } from '../../utils/compare-options';
import { getNode, handleTry } from '@douglas-serena/ng-utils';

const PROVIDER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgAutocompleteComponent),
  multi: true,
};

@Component({
  selector: 'ng-autocomplete',
  templateUrl: './ng-autocomplete.component.html',
  providers: [PROVIDER_VALUE_ACCESSOR],
})
export class NgAutocompleteComponent
  extends ControlBase
  implements OnInit, AfterViewInit, ControlValueAccessor
{
  @Input() loading = false;
  @Input() keyLabel: string = '';
  @Input() keyValue: string = '';
  @Input() showIsEmpty: boolean = true;
  @Input() secondaryControlName: string = '';
  @Input() secondaryKeyValueControl: string = '';
  @Input() positionMenu: 'auto' | 'above' | 'below' = 'auto';

  @Input() service: any;
  @Input() methodService: string;
  @Input() debounceTimeEventInput: number = 350;

  @Input() set options(value: any[]) {
    this._options = value.reduce((prev, current) => {
      let result = { _label: getNode(current, this.keyLabel) } as any;
      if (this.keyValue) {
        result._value = getNode(current, this.keyValue);
      } else {
        result._value = current;
      }
      result._root = current;
      return prev.concat(result);
    }, []);
  }
  _options: { _label: string; _value: any; _root: any }[] = [];

  @Input() mask: INgIMaskConfig | string;

  _maskRef: IMaskServiceReturn;

  constructor(
    private renderer2: Renderer2,
    private ngMaskService: NgMaskService,
    private ngConfig: NgConfigService,
    controlContainer: ControlContainer,
    @SkipSelf() private changeDetectorRef: ChangeDetectorRef
  ) {
    super(controlContainer, renderer2, ngConfig);
  }

  ngOnInit() {
    this.superOnInit('autocomplete');
  }

  ngAfterViewInit() {
    this.superAfterViewInit();

    const typeConfig = this.ngConfig.typesInput?.[this.type.toLowerCase()];
    const configGlobal = this.ngConfig.global.autocomplete;

    const type = this.type.toUpperCase();

    if (MASKS.typesCustom.includes(type) && this.mask === undefined) {
      this.mask = MASKS[type];
    }

    if (!(typeof this.mask === 'string') && this.mask !== undefined) {
      if (configGlobal?.mask) {
        this.mask = Object.assign({}, configGlobal?.mask, this.mask);
      }

      if (typeConfig?.mask) {
        this.mask = Object.assign({}, typeConfig?.mask, this.mask);
      }

      if ((this.mask as any)?.validator === undefined) {
        this.mask = Object.assign({}, this.mask, {
          validator: this.required,
        });
      }
    }

    if (this.mask !== undefined) {
      this._maskRef = this.ngMaskService.createMask(
        this.rootRef.nativeElement,
        this.mask,
        this.renderer2
      );

      if (MASKS.typesCustom.includes(type)) {
        this.type = 'text';
      }
    }

    this.rootRef.nativeElement.blur();
    this.control.markAsUntouched();
    this.changeDetectorRef.detectChanges();
  }

  handleSaveValue(value?: HTMLElement | string | number, unmask = true) {
    if (this._maskRef) {
      this.handleChange(unmask ? this._maskRef.unmaskedValue() : value);
    } else {
      this.handleChange(value);
    }
  }

  debounceTimeInput: any = 0;
  @Output() inputDebounce = new EventEmitter();
  handleInputDebounce(value?: any) {
    clearTimeout(this.debounceTimeInput);
    this.debounceTimeInput = setTimeout(() => {
      this.handleSearch(value);
      this.inputDebounce.emit(value);
    }, this.debounceTimeEventInput);
  }

  async handleSearch(value: string) {
    if (this.service && value.length > 0) {
      this.loading = true;
      const [data] = await handleTry(this.service[this.methodService](value));
      if (data) {
        this.options = data;
      }
      this.loading = false;
    }
  }
  @Output() selected = new EventEmitter();
  @Output() selectedEmpty = new EventEmitter();
  handleSelect(option?: any) {
    if (option.option) {
      if (typeof option.option.value?._default === 'string') {
        this.handleEmpty(option.option.value._default);
      } else {
        const optionRoot = compareOptions(
          this._options,
          this.keyValue,
          option.option.value
        )?._root;

        this.rootRef.nativeElement.value = getNode(optionRoot, this.keyLabel);

        if (this.secondaryControlName) {
          const value = getNode(
            optionRoot,
            this.secondaryKeyValueControl.split('.')
          );
          this.control.root.get(this.secondaryControlName)?.setValue(value);
        }
        this.selected.emit(option.option.value);
      }
    } else {
      this.rootRef.nativeElement.value = option._label;
      this.handleSaveValue(option._value);

      if (this.secondaryControlName) {
        this.control.root
          .get(this.secondaryControlName)
          ?.setValue(getNode(option._root, this.secondaryKeyValueControl));
      }
      this.selected.emit(option._value);
    }
  }

  handleEmpty(valueElement: string = this.rootRef.nativeElement.value) {
    this.rootRef.nativeElement.value = valueElement;
    this.handleSaveValue(valueElement);
    this.selectedEmpty.emit(valueElement);
  }

  handleBlur(event: FocusEvent, index?: number) {
    super.handleBlur(event);
  }

  handleFocus(event: FocusEvent) {
    super.handleFocus(event);
  }

  @HostListener('keyup', ['$event'])
  handleInput(event: KeyboardEvent) {
    if (event?.key !== 'Enter' && !event.key?.match('Arrow')) {
      const value = (event.target as HTMLInputElement).value;
      this.handleInputDebounce(value);
    }
  }

  writeValue = (value: number | string) => {
    if (this.rootRef && this.keyLabel.length > 0) {
      if (typeof value === 'string') {
        this.handleSaveValue(value);
      } else {
        this.rootRef.nativeElement.value = getNode(value, this.keyLabel);
        this.handleSaveValue(value, false);
      }
    } else {
      setTimeout(() => {
        this.writeValue(value);
      }, 10);
    }
  };
}
