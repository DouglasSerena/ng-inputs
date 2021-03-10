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
import { NgInputMasksService } from '../../ng-input-masks.service';
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
    | 'currency' = 'text';
  typesMask = [
    'tel',
    'cpf',
    'cnpj',
    'cpf_cnpj',
    'rg',
    'rg_estadual',
    'currency',
  ];

  isFieldPassword: boolean = false;
  isFieldCurrency: boolean = false;
  instance: null | { unmaskedValue?: string; formatToNumber(): void } = null;

  constructor(
    private controlContainer: ControlContainer,
    private masksService: NgInputMasksService
  ) {
    super(controlContainer);
  }

  ngOnInit() {
    this.ngOnInitSuper();

    this.isFieldPassword = this.type === 'password';
    if (this.typesMask.includes(this.type)) {
      this.instance = this.masksService.set(
        this.input.nativeElement,
        this.type as 'currency'
      );
      if (this.type === 'currency') this.isFieldCurrency = true;

      this.type = 'text';
    }

    this.input.nativeElement.addEventListener('input', ({ target }) => {
      let { value } = target as HTMLInputElement;

      if (this.instance) {
        value = (this.isFieldCurrency
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
      instance.value = this.isFieldCurrency
        ? this.masksService.format(`${value}`, 'currency')
        : `${value}`;
  }

  togglePassword() {
    if (this.isFieldPassword)
      this.type = this.type === 'password' ? 'text' : 'password';
  }
}
