import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgInputConfigService } from '../../core/ng-input-config.service';
import { NgInputMasksService } from '../../core/ng-input-masks.service';
import { InputCustomControlValueAccessor } from '../input-custom-control-value-accessor.domain';

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
  @Input() type:
    | 'text'
    | 'password'
    | 'email'
    | 'date'
    | 'month'
    | 'datetime-local'
    | 'tel'
    | 'cpf'
    | 'cnpj'
    | 'cpf_cnpj'
    | 'rg'
    | 'rg_estadual'
    | 'percent'
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
  ];

  isFieldPassword: boolean = false;
  isFieldCurrency: boolean = false;
  isFieldPercent: boolean = false;
  instance: null | { unmaskedValue?: string; formatToNumber(): void } = null;

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
      this.input.nativeElement.setAttribute('placeholder', '  ');
    }

    this.isFieldPassword = this.type === 'password';
    if (this.typesMask.includes(this.type)) {
      this.instance = this.masksService.set(
        this.input.nativeElement,
        this.type as 'currency',
        this.allowNegative
      );

      if (this.type === 'currency') this.isFieldCurrency = true;
      if (this.type === 'percent') this.isFieldPercent = true;

      this.type = 'text';
    }

    this.input.nativeElement.addEventListener('input', ({ target }) => {
      let { value } = target as HTMLInputElement;

      if (this.instance) {
        value = (this.isFieldCurrency || this.isFieldPercent
          ? this.instance?.formatToNumber()
          : this.instance?.unmaskedValue) as string;
      }

      this.onWrite(value);
    });
  }

  ngAfterViewInit() {
    let value = this.control.value;

    const instance = this.instance as any;

    if (instance)
      instance.value =
        this.isFieldCurrency || this.isFieldPercent
          ? this.masksService.format(
              `${value}`,
              this.isFieldCurrency ? 'currency' : 'percent',
              this.allowNegative
            )
          : `${value}`;
  }

  togglePassword() {
    if (this.isFieldPassword)
      this.type = this.type === 'password' ? 'text' : 'password';
  }

  get className() {
    const bootstrap = this.theme === 'bootstrap';
    const validField = this.control.valid && this.control.touched;
    const invalidField = this.control.invalid && this.control.touched;
    const align =
      (this.isFieldCurrency && this.configService.currency.align === 'right') ||
      (this.isFieldPercent && this.configService.percent.align === 'right');
    return {
      'form-control': bootstrap,
      floating: this.field === 'floating',
      readonly: this.readonly,
      'is-invalid': bootstrap && !this.readonly && invalidField,
      'is-valid': bootstrap && validField,
      invalid: !bootstrap && !this.readonly && invalidField,
      valid: !bootstrap && validField,
      password: this.isFieldPassword,
      'align-right': align,
    };
  }
}
