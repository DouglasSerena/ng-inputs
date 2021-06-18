import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostListener,
  Input,
  OnInit,
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
import { NgMaskConfig } from '../../interfaces/ng-mask-config.interface';
import { IMaskCurrencyServiceReturn } from '../../interfaces/ng-mask-service-return.interface';
import { NgMaskAmountService } from '../../services/masks/ng-mask-amount.service';
import { NgMaskCurrencyService } from '../../services/masks/ng-mask-currency.service';
import { NgMaskPercentService } from '../../services/masks/ng-mask-percent.service';
import { NgMaskService } from '../../services/masks/ng-mask.service';
import * as MASKS from '../../config/MASKS';
import { NgConfigService } from '../../config/ng-config.service';
import { NgFormatDateByTypeService } from '../../services/utils/ng-format-date-by-type.service';
import { ControlBase } from '../../shared/base/control-base.template';

export const PROVIDER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgInputComponent),
  multi: true,
};

@Component({
  selector: 'ng-input',
  templateUrl: './ng-input.component.html',
  providers: [PROVIDER_VALUE_ACCESSOR],
})
export class NgInputComponent
  extends ControlBase
  implements OnInit, AfterViewInit, ControlValueAccessor
{
  @Input() amount: NgMaskConfig;
  @Input() percent: NgMaskConfig;
  @Input() currency: NgMaskConfig;
  @Input() length: string | number;
  @Input() mask: NgIMaskConfig | string;

  @Input() date: Date | string = new Date();
  @Input() fill: boolean = false;

  _maskRef: IMaskCurrencyServiceReturn;

  constructor(
    private renderer2: Renderer2,
    private ngMaskCurrencyService: NgMaskCurrencyService,
    private ngMaskPercentService: NgMaskPercentService,
    private ngMaskAmountService: NgMaskAmountService,
    private ngFormatDateByTypeService: NgFormatDateByTypeService,
    private ngMaskService: NgMaskService,
    private ngInputConfig: NgConfigService,
    @SkipSelf() private changeDetectorRef: ChangeDetectorRef,
    controlContainer: ControlContainer
  ) {
    super(controlContainer, renderer2, ngInputConfig);
  }

  ngOnInit() {
    this.superOnInit('input');
  }

  ngAfterViewInit() {
    this.superAfterViewInit();

    const typeConfig = this.ngInputConfig.typesInput?.[this.type.toLowerCase()];

    if (this.type === 'currency') {
      this.currency = Object.assign({}, typeConfig?.currency, this.currency);
      this._maskRef = this.ngMaskCurrencyService.createMask(
        this.rootRef.nativeElement,
        this.currency,
        this.renderer2
      );
      this.type = 'text';
    } else if (this.type === 'percent') {
      this.percent = Object.assign({}, typeConfig?.percent, this.percent);
      this._maskRef = this.ngMaskPercentService.createMask(
        this.rootRef.nativeElement,
        this.percent,
        this.renderer2
      );
      this.type = 'text';
    } else if (this.type === 'amount') {
      this.amount = Object.assign({}, typeConfig?.amount, this.amount);
      this._maskRef = this.ngMaskAmountService.createMask(
        this.rootRef.nativeElement,
        this.amount,
        this.renderer2
      );
      this.type = 'text';
    } else {
      const type = this.type.toUpperCase();
      if (MASKS.typesCustom.includes(type) && this.mask === undefined) {
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
    }

    if (
      this.fill &&
      this.ngFormatDateByTypeService.typeDate.includes(this.type)
    ) {
      this.rootRef.nativeElement.value = this.formatDate(this.date);
    }
    this.rootRef.nativeElement.blur();
    this.control.markAsUntouched();
    this.changeDetectorRef.detectChanges();
  }

  formatDate(value: any) {
    return this.ngFormatDateByTypeService.format(
      value.toString(),
      this.type as 'date'
    );
  }

  @HostListener('input', ['$event.target.value'])
  handleInput(value?: HTMLElement | string | number) {
    if (this._maskRef) {
      this.handleChange(this._maskRef.unmaskedValue());
    } else {
      this.handleChange(value);
    }
  }

  writeValue = (value: number | string) => {
    if (this.rootRef) {
      if (this._maskRef) {
        this._maskRef.update(value);
      } else {
        if (this.ngFormatDateByTypeService.typeDate.includes(this.type)) {
          if (!!value) {
            this.rootRef.nativeElement.value = this.formatDate(value);
          }
        } else {
          this.rootRef.nativeElement.value = value.toString();
        }
      }
      this.handleInput(value);
    } else {
      setTimeout(() => {
        this.writeValue(value);
      }, 10);
    }
  };
}
