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
import { NgConfigService } from '../../config/ng-config.service';
import { NgFormatDateByTypeService } from '../../services/utils/ng-format-date-by-type.service';
import { ControlBase } from '../../shared/base/control-base.template';
import {
  IMaskServiceReturn,
  INgIMaskConfig,
  INgMaskConfig,
  MASKS,
  NgMaskAmountService,
  NgMaskCurrencyService,
  NgMaskPercentService,
  NgMaskService,
} from '@douglas-serena/ng-masks'; //'./../../../../../ng-masks/src/public-api'; // '@douglas-serena/ng-masks'//

const PROVIDER_VALUE_ACCESSOR: Provider = {
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
  @Input() amount: INgMaskConfig;
  @Input() percent: INgMaskConfig;
  @Input() currency: INgMaskConfig;
  @Input() length: string | number;
  @Input() mask: INgIMaskConfig | string;

  @Input() date: Date | string = new Date();
  @Input() autoFillDate: boolean = false;

  _maskRef: IMaskServiceReturn;

  constructor(
    private renderer2: Renderer2,
    private ngMaskCurrencyService: NgMaskCurrencyService,
    private ngMaskPercentService: NgMaskPercentService,
    private ngMaskAmountService: NgMaskAmountService,
    private ngFormatDateByTypeService: NgFormatDateByTypeService,
    private ngMaskService: NgMaskService,
    private ngConfig: NgConfigService,
    @SkipSelf() private changeDetectorRef: ChangeDetectorRef,
    controlContainer: ControlContainer
  ) {
    super(controlContainer, renderer2, ngConfig);
  }

  ngOnInit() {
    this.superOnInit('input');
  }

  ngAfterViewInit() {
    this.superAfterViewInit();

    const typeConfig = this.ngConfig.typesInput?.[this.type.toLowerCase()];

    if (this.type === 'currency') {
      if (this.currency?.validator === undefined) {
        this.currency = Object.assign({}, this.currency, {
          validator: this.required,
        });
      }
      this.currency = Object.assign({}, typeConfig?.currency, this.currency);
      this.ngMaskCurrencyService.config(this.ngConfig.input.currency);
      this._maskRef = this.ngMaskCurrencyService.createMask(
        this.rootRef.nativeElement,
        this.currency,
        this.renderer2
      );
      this.type = 'text';
    } else if (this.type === 'percent') {
      if (this.percent?.validator === undefined) {
        this.percent = Object.assign({}, this.percent, {
          validator: this.required,
        });
      }
      this.percent = Object.assign({}, typeConfig?.percent, this.percent);
      this.ngMaskPercentService.config(this.ngConfig.input.percent);
      this._maskRef = this.ngMaskPercentService.createMask(
        this.rootRef.nativeElement,
        this.percent,
        this.renderer2
      );
      this.type = 'text';
    } else if (this.type === 'amount') {
      if (this.amount?.validator === undefined) {
        this.amount = Object.assign({}, this.amount, {
          validator: this.required,
        });
      }
      this.amount = Object.assign({}, typeConfig?.amount, this.amount);
      this.ngMaskAmountService.config(this.ngConfig.input.amount);
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
        if ((this.mask as any)?.validator === undefined) {
          this.mask = Object.assign({}, this.mask, {
            validator: this.required,
          });
        }

        this.ngMaskCurrencyService.config(this.ngConfig.input.mask);
        this._maskRef = this.ngMaskService.createMask(
          this.rootRef.nativeElement,
          this.mask,
          this.renderer2
        );

        if (MASKS.typesCustom.includes(type)) {
          this.type = 'text';
        }
      }
    }

    if (
      this.autoFillDate &&
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
  handleInput(value?: HTMLElement | string | number, delay = false) {
    if (this._maskRef) {
      if (delay) {
        setTimeout(() => {
          this.handleChange(this._maskRef.unmaskedValue());
        });
      } else {
        this.handleChange(this._maskRef.unmaskedValue());
      }
    } else {
      this.handleChange(value);
    }
  }

  time;
  writeValue = (value: number | string) => {
    if (this.rootRef) {
      if (this._maskRef) {
        this._maskRef.update(value?.toString());
      } else {
        if (this.ngFormatDateByTypeService.typeDate.includes(this.type)) {
          if (!!value) {
            this.rootRef.nativeElement.value = this.formatDate(value);
          }
        } else {
          this.rootRef.nativeElement.value = value?.toString();
        }
      }
      this.handleInput(value, true);
    } else {
      setTimeout(() => {
        this.writeValue(value);
      }, 10);
    }
  };
}
