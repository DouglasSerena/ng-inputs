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
import { typesCustom } from '../../config/MASKS';
import { NgIMaskConfig } from '../../interfaces/ng-imask-config.interface';
import { IMaskCurrencyServiceReturn } from '../../interfaces/ng-mask-service-return.interface';
import { NgMaskService } from '../../services/masks/ng-mask.service';
import * as MASKS from '../../config/MASKS';
import { NgConfigService } from '../../config/ng-config.service';
import { getProp } from '../../utils/get-prop';
import { Observable } from 'rxjs';
import { ControlBase } from '../../shared/base/control-base.template';

export const PROVIDER_VALUE_ACCESSOR: Provider = {
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
  @Input() funcSearch: (value: any) => Promise<any> | Observable<any>;
  @Input() debounceTimeMenuClose: number = 250;
  @Input() debounceTimeEventInput: number = 350;
  @Input() propLabel: string = '';
  @Input() propReturn: null | string = null;
  @Input() showContentIsEmpty: boolean = true;
  _dropdownIsOpen: boolean = false;
  _indexSelect: number | null = null;
  _indexFocus: number | null = null;

  @Input() set options(value: any[]) {
    this._options = value.reduce((prev, current) => {
      let result = { _label: getProp(current, this.propLabel) } as any;
      if (this.propReturn) {
        result._value = getProp(current, this.propReturn);
      } else {
        result._value = current;
      }
      return prev.concat(result);
    }, []);
  }
  _options: any = [];

  @Input() mask: NgIMaskConfig | string;

  _maskRef: IMaskCurrencyServiceReturn;

  constructor(
    private renderer2: Renderer2,
    private ngMaskService: NgMaskService,
    private ngConfig: NgConfigService,
    @SkipSelf() private changeDetectorRef: ChangeDetectorRef,
    controlContainer: ControlContainer
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

      if (typesCustom.includes(type)) {
        this.type = 'text';
      }
    }

    this.rootRef.nativeElement.blur();
    this.control.markAsUntouched();
    this.changeDetectorRef.detectChanges();
  }

  debounceTimeBlur: any = 0;
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
    if (!!event.key.match('Arrow')) {
      event.preventDefault();
      if (!this._dropdownIsOpen) {
        this.handleOpenMenu();
      }
      const dropdown =
        this.rootRef.nativeElement.parentElement?.querySelector(
          '.dropdown-menu'
        );
      const items =
        dropdown?.querySelectorAll<HTMLElement>('.ng-dropdown-item');

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
        this.handleSaveValue(value);
        this.handleInputDebounce(value);
      }
    }
  }

  handleSaveValue(value?: HTMLElement | string | number) {
    if (this._maskRef) {
      this.handleChange(this._maskRef.unmaskedValue());
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

  handleOpenMenu(event?: Event) {
    this._dropdownIsOpen = true;
  }

  handleCloseMenu(event?: Event) {
    this._dropdownIsOpen = false;
  }

  async handleSearch(value: any) {
    this.loading = true;
    this.options = await this.funcSearch(value);
    this.loading = false;
  }

  handleSelect(index: number) {
    this.rootRef.nativeElement.focus();
    this._indexSelect = index;

    this.handleCloseMenu();
    this.handleSaveValue(this._options[index]._value);
    this.rootRef.nativeElement.value = this._options[index]._label;
  }

  writeValue = (value: number | string) => {
    if (this.rootRef) {
      if (this._maskRef) {
        this._maskRef.update(value);
      } else {
        this.rootRef.nativeElement.value = value.toString();
      }
      this.handleSaveValue(value);
    } else {
      setTimeout(() => {
        this.writeValue(value);
      }, 10);
    }
  };
}
