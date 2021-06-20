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
import { getProp } from '../../utils/get-prop';
import { ControlBase } from '../../shared/base/control-base.template';
import { handleTry } from '../../utils/handle-try';
import {
  IMaskServiceReturn,
  INgIMaskConfig,
  MASKS,
  NgMaskService,
} from '@douglas-serena/ng-masks';
import { Observable } from 'rxjs';

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
      let result = { _label: getProp(current, this.keyLabel) } as any;
      if (this.keyValue) {
        result._value = getProp(current, this.keyValue);
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

    const keys = Object.keys(MASKS);
    const type = this.type.toUpperCase();
    if (keys.includes(type) && this.mask === undefined) {
      this.mask = MASKS[type];
    }

    if (typeConfig?.mask) {
      this.mask = Object.assign({}, typeConfig?.mask, this.mask);
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

  writeValue = (value: number | string) => {
    if (this.rootRef && this.keyLabel.length > 0) {
      if (typeof value === 'string') {
        this.handleSaveValue(value);
      } else {
        this.rootRef.nativeElement.value = getProp(value, this.keyLabel);
        this.handleSaveValue(value, false);
      }
    } else {
      setTimeout(() => {
        this.writeValue(value);
      }, 10);
    }
  };

  // NOT SHARED
  _indexSelect: number;
  _indexFocus: number;
  _dropdownIsOpen = false;
  debounceTimeBlur: any = 0;

  @Output() selected = new EventEmitter();
  handleSelect(index: number) {
    this.rootRef.nativeElement.focus();
    this._indexSelect = index;

    this.handleCloseMenu();
    this.handleSaveValue(this._options[index]._value);
    this.rootRef.nativeElement.value = this._options[index]._label;
  }

  debounceTimeMenuClose: any = 0;
  handleBlur(event: FocusEvent, index?: number) {
    super.handleBlur(event);
    clearTimeout(this.debounceTimeBlur);
    this.debounceTimeBlur = setTimeout(() => {
      this.handleCloseMenu();
    }, this.debounceTimeMenuClose);
  }

  handleFocus(event: FocusEvent) {
    super.handleFocus(event);
    clearTimeout(this.debounceTimeBlur);
  }
  @HostListener('keyup', ['$event'])
  handleInput(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;

    if (!!event.key?.match('Arrow')) {
      event.preventDefault();
      if (!this._dropdownIsOpen) {
        this.handleOpenMenu();
      }
      const dropdown =
        this.rootRef.nativeElement.parentElement?.querySelector(
          '.dropdown-menu'
        );
      const items = dropdown?.querySelectorAll<HTMLElement>(
        '.ng-bt-dropdown-item'
      );

      if (event.key === 'ArrowDown') {
        if (typeof this._indexFocus === 'number') {
          this._indexFocus += 1;
        } else {
          this._indexFocus = 0;
        }
        let element = items?.item(this._indexFocus);

        if (!element) {
          this._indexFocus = null;
          this.rootRef.nativeElement.focus();
        } else {
          element.focus();
        }
      } else if (event.key === 'ArrowUp') {
        if (typeof this._indexFocus === 'number') {
          this._indexFocus -= 1;
        } else {
          this._indexFocus = this._options.length - 1;
        }
        let element = items?.item(this._indexFocus);

        if (!element) {
          this._indexFocus = null;
          this.rootRef.nativeElement.focus();
        } else {
          element.focus();
        }
      }
    } else {
      if (event.key !== 'Enter') {
        this.handleInputDebounce(value);
        if (this.required) {
          this.handleSaveValue('');
          this.control.markAsUntouched();
        } else {
          this.handleSaveValue(value);
        }
      }
    }
  }

  handleOpenMenu(event?: Event) {
    this._dropdownIsOpen = true;
  }

  handleCloseMenu(event?: Event) {
    this._dropdownIsOpen = false;
  }
}
