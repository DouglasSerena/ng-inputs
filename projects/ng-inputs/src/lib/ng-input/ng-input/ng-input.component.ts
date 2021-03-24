import {
  AfterViewInit,
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
import { NgInputConfigService } from '../../core/ng-input-config.service';
import { NgInputMasksService } from '../../core/ng-input-masks.service';
import { InputCustomControlValueAccessor } from '../input-custom-control-value-accessor.domain';
import { ITypeInputProps, typeInputsProps } from './typesInput';

@Component({
  selector: 'dss-input',
  templateUrl: './ng-input.component.html',
  styleUrls: ['./ng-input.component.scss'],
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
  implements OnInit, AfterViewInit {
  @ViewChild('input', { static: true }) input: ElementRef<HTMLInputElement>;
  @Input() alignText: 'right' | 'left' | null = null;
  @Input() allowNegative?: boolean;
  @Input() autocomplete = 'work';
  @Input() mask?: string;
  @Input() type:
    | ITypeInputProps
    | 'cpf'
    | 'cnpj'
    | 'cpf_cnpj'
    | 'rg'
    | 'rg_estadual'
    | 'percent'
    | 'cep'
    | 'currency' = 'text';
  typesMask = [
    'tel',
    'cpf',
    'cnpj',
    'cpf_cnpj',
    'rg',
    'rg_estadual',
    'percent',
    'currency',
    'cep',
  ];

  _alignIcon: 'align-icon-right' | 'align-icon-left' = this.configService.field
    .alignIcons
    ? (`align-icon-${this.configService.field.alignIcons}` as any)
    : 'align-icon-left';

  @Output() onClickIcon = new EventEmitter();

  private _icon: string | null = null;
  @Input() set icon(icon: string | null) {
    this._icon = `form-control-feedback ${icon}`;
  }
  get icon(): string | null {
    return this._icon;
  }

  private _iconImage: string | null = null;
  @Input() set iconImage(value: any) {
    this._iconImage = value;
  }
  get iconImage(): any {
    return this._iconImage
      ? { 'background-image': `url(${this._iconImage})` }
      : null;
  }

  @Input() set alignIcon(align: 'right' | 'left') {
    this._alignIcon = `align-icon-${align}` as any;
  }

  @Input() hideEye: boolean = false;
  isFieldPassword: boolean = false;

  isFieldCurrency: boolean = false;

  isFieldPercent: boolean = false;

  instance: null | { unmaskedValue?: string; formatToNumber(): number } = null;

  constructor(
    private controlContainer: ControlContainer,
    private masksService: NgInputMasksService,
    public configService: NgInputConfigService
  ) {
    super(controlContainer, configService);
  }

  ngOnInit() {
    this.ngOnInitSuper();

    if (this.placeholder.length > 0) {
      this.input.nativeElement.setAttribute('placeholder', this.placeholder);
    } else {
      if (this.configService.theme === 'bootstrap')
        this.input.nativeElement.setAttribute('placeholder', '  ');
    }

    this.isFieldPassword = this.type === 'password';
    if (this.typesMask.includes(this.type) || this.mask) {
      this.instance = this.masksService.set(
        this.input.nativeElement,
        this.type as 'currency',
        { allowNegative: this.allowNegative, mask: this.mask }
      );

      if (this.type === 'currency') this.isFieldCurrency = true;
      if (this.type === 'percent') this.isFieldPercent = true;
    }

    if (this.icon === null && this.configService.field.icons) {
      if (this.configService.field.icons[this.type]) {
        if (this.configService.field.icons[this.type].icon)
          this.icon = this.configService.field.icons[this.type].icon as any;
        if (this.configService.field.icons[this.type].align)
          this.alignIcon = this.configService.field.icons[this.type].align as
            | 'left'
            | 'right';
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

  ngAfterViewInit() {
    let value = this.control.value;

    const instance = this.instance as any;

    if (instance) {
      instance.value =
        this.isFieldCurrency || this.isFieldPercent
          ? this.masksService.format(
              `${value}`,
              this.isFieldCurrency ? 'currency' : 'percent',
              { allowNegative: this.allowNegative }
            )
          : `${value}`;
      setTimeout(() => {
        this.input.nativeElement.blur();
        this.control.markAsUntouched();
      }, 1);
    }
  }

  togglePassword() {
    if (this.isFieldPassword)
      this.type = this.type === 'password' ? 'text' : 'password';
  }

  writeValue(obj: any): void {
    this.input.nativeElement.focus();

    setTimeout(() => {
      if (this.isFieldCurrency || this.isFieldPercent) {
        this.input.nativeElement.value = this.masksService.format(
          `${obj}`,
          this.isFieldCurrency ? 'currency' : 'percent',
          { allowNegative: this.allowNegative }
        );
      }

      this.input.nativeElement.blur();
      this.control.markAsUntouched();
    }, 1);
  }

  get className() {
    const bootstrap = this.configService.theme === 'bootstrap';
    const validField = this.control.valid && this.control.touched;
    const invalidField = this.control.invalid && this.control.touched;
    const align =
      (this.isFieldCurrency && this.configService.currency.align === 'right') ||
      (this.isFieldPercent && this.configService.percent.align === 'right');
    return {
      'form-control': bootstrap,
      'form-materialize': !bootstrap,
      floating: this.field === 'floating',
      readonly: this.readonly,
      'is-invalid': bootstrap && !this.readonly && invalidField,
      'is-valid': bootstrap && validField,
      invalid: !bootstrap && !this.readonly && invalidField,
      valid: !bootstrap && validField,
      [this._alignIcon]:
        (this.isFieldPassword && this.hideEye === false) ||
        this.icon ||
        this.iconImage,
      'align-right': align,
    };
  }
}
