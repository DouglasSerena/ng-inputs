import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputMask } from 'imask';
import { NgInputConfigService } from '../../core/ng-input-config.service';
import { NgInputMasksService } from '../../core/ng-input-masks.service';
import { InputCustomControlValueAccessor } from '../input-custom-control-value-accessor.domain';
import {
  ITypeInputProps,
  typeInputsProps,
  ITypeInputsPropsCustom,
  typeInputsPropsCustom,
} from './typesInput';

interface IIconProps {
  icon?: string | undefined;
  align?: 'right' | 'left' | undefined;
  clickable?: boolean | undefined;
  hide?: boolean;
  class: string;
}

@Component({
  selector: 'dss-input',
  templateUrl: './ng-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgInputComponent),
    },
  ],
})
export class NgInputComponent
  extends InputCustomControlValueAccessor
  implements OnInit {
  @ViewChild('input', { static: true }) input: ElementRef<HTMLInputElement>;
  @Input() align: 'right' | 'left' | 'center' | null = 'left';
  @Input() autocomplete = 'work';
  @Input() mask?: string;
  @Input() allowNegative?: boolean;
  @Input() type: ITypeInputsPropsCustom | ITypeInputProps = 'text';
  typesMask = typeInputsPropsCustom;
  typeInit: string = 'text';

  @Output() clickIcon = new EventEmitter();

  _icon: IIconProps = {
    clickable: false,
    align: this.configService.field.alignIcons,
    hide: false,
    class: '',
  };
  @Input() set icon(icon: IIconProps | any) {
    this._icon = Object.assign(this._icon, icon);

    if (icon) {
      this._icon.class = `form-icon-floating ${icon.icon} ${this._icon.align} ${
        this._icon.clickable && 'clickable'
      }`;
    }
  }

  isFieldPassword: boolean = false;
  isFieldCurrency: boolean = false;
  isFieldPercent: boolean = false;

  instance: null | { unmaskedValue?: string; formatToNumber(): number } = null;

  get activeField() {
    const typesActive = [
      'date',
      'month',
      'currency',
      'percent',
      'time',
      'week',
      'datetime-local',
      'color',
    ];
    return (
      this.control.value?.length > 0 || typesActive.includes(this.typeInit)
    );
  }

  constructor(
    private controlContainer: ControlContainer,
    private masksService: NgInputMasksService,
    public configService: NgInputConfigService
  ) {
    super(controlContainer, configService);
  }

  ngOnInit() {
    this.ngOnInitSuper();
    this.typeInit = this.type;

    this.isFieldPassword = this.type === 'password';
    if (this.typesMask.includes(this.type) || this.mask) {
      this.instance = this.masksService.set(
        this.input.nativeElement,
        this.type as 'currency',
        { allowNegative: this.allowNegative, mask: this.mask }
      );

      if (this.type === 'currency') {
        this.isFieldCurrency = true;
        if (this.configService.currency.align)
          this.align = this.configService.currency.align;
      }
      if (this.type === 'percent') {
        this.isFieldPercent = true;
        if (this.configService.percent.align)
          this.align = this.configService.percent.align;
      }
    }

    if (this._icon.icon === undefined && this.configService.field.icons) {
      if (this.configService.field.icons[this.type]) {
        this.icon = this.configService.field.icons[this.type] as any;
      }
    }

    if (!typeInputsProps.includes(this.type)) this.type = 'text';

    this.input.nativeElement.addEventListener('input', ({ target }) => {
      let { value } = target as HTMLInputElement;

      if (this.instance) {
        if (this.isFieldCurrency || this.isFieldPercent) {
          const currencyOrPercent = this.instance?.formatToNumber() as any;
          if (this.required) {
            value = currencyOrPercent === 0 ? null : currencyOrPercent;
          } else value = currencyOrPercent;
        } else {
          value = this.instance?.unmaskedValue as string;
        }
      }

      this.onWrite(value);
    });
  }

  onClickIcon(event: Event) {
    if (this._icon.clickable) {
      if (this.isFieldPassword)
        this.type = this.type === 'password' ? 'text' : 'password';

      this.clickIcon.emit(event);
    }
  }

  onFocus(event: Event) {
    if (this.isFieldCurrency || this.isFieldPercent) {
      const length = this.input.nativeElement.value.length;
      this.input.nativeElement.setSelectionRange(0, length);
    }
    this.focus.emit(event);
  }

  time: any = 0;
  writeValue(obj: any): void {
    clearTimeout(this.time);
    this.time = setTimeout(() => {
      if (this.typesMask.includes(this.typeInit)) {
        if (this.isFieldCurrency || this.isFieldPercent) {
          obj = parseFloat(Number(`${obj}`).toFixed(2));
          this.input.nativeElement.value = this.masksService.format(
            `${obj}`,
            this.isFieldCurrency ? 'currency' : 'percent',
            { allowNegative: this.allowNegative, mask: this.mask }
          );
        } else {
          this.input.nativeElement.value = this.masksService.format(
            `${obj}`,
            this.typeInit as 'currency',
            { allowNegative: this.allowNegative, mask: this.mask }
          );
          ((this.instance as unknown) as InputMask<any>)?.updateValue();
        }
        this.input.nativeElement.blur();
        this.control.markAsUntouched();
      }
    }, 250);
  }

  get className() {
    const validField = this.control.valid && this.control.touched;
    const invalidField = this.control.invalid && this.control.touched;
    return {
      readonly: this.readonly,
      'is-invalid': !this.readonly && invalidField,
      'is-valid': validField,
    };
  }
}
