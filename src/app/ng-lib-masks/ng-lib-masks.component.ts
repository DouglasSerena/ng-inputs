import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'ng-lib-masks',
  templateUrl: './ng-lib-masks.component.html',
  styleUrls: ['./ng-lib-masks.component.scss'],
})
export class NgLibMasksComponent implements OnInit {
  form?: FormGroup;
  get controls() {
    return this.form?.controls;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formBuild();
  }

  formBuild() {
    this.form = this.formBuilder.group({
      currency: [10.5],
      percent: [1.2],
      amount: [2.5],
      mask: ['23212575425'],
    });
  }

  exempleCurrencyPipe = `
    {{
      '10.23' | ngMaskCurrency: {
        allowNegative: true,
        negativeSignAfter: false,
        prefix: "R$",
        suffix: '',
        fixed: true,
        fractionDigits: 2,
        decimalSeparator: ',',
        thousandsSeparator: '.',
        align: 'right',
        cursor: 'end',
        validator: true,
        focusSelectText: true,
      }
    }}
  `;
  exemplePercentPipe = `
    {{
      '10.23' | ngMaskCurrency: {
        allowNegative: true,
        negativeSignAfter: false,
        prefix: '',
        suffix: '%',
        fixed: true,
        fractionDigits: 2,
        decimalSeparator: ',',
        thousandsSeparator: '.',
        align: 'right',
        cursor: 'end',
        validator: true,
        focusSelectText: true,
      }
    }}
  `;
  exempleAmountPipe = `
    {{
      '10.23' | ngMaskAmount: {
        allowNegative: true,
        fractionDigits: 3,
        decimalSeparator: ',',
        align: 'right',
        validator: true,
        focusSelectText: true,
      }
    }}
  `;
  exempleMaskPipe = `
    {{ '10.23' | ngMask: "CPF_CNPJ" }} // OR
    {{ '10.23' | ngMask: {mask: [{mask: "000.000"},{mask: "000.000.00"}]} }}
  `;

  exempleCurrency = `<input
    class="form-control"
    formControlName="currency"
    type="currency"
    [ngMaskCurrency]="{
      allowNegative: true,
      negativeSignAfter: false,
      prefix: this._locale,
      suffix: '',
      fixed: true,
      fractionDigits: 2,
      decimalSeparator: ',',
      thousandsSeparator: '.',
      align: 'right',
      cursor: 'end',
      validator: true,
      focusSelectText: true,
    }"
  />
  `;
  exemplePercent = `<input
    class="form-control"
    formControlName="percent"
    type="percent"
    [ngMaskPercent]="{
      allowNegative: true,
      negativeSignAfter: false,
      prefix: '',
      suffix: '%',
      fixed: true,
      fractionDigits: 2,
      decimalSeparator: ',',
      thousandsSeparator: '.',
      align: 'right',
      cursor: 'end',
      validator: true,
      focusSelectText: true,
    }"
  />
  `;
  exempleAmount = `<input
    class="form-control"
    formControlName="amount"
    type="amount"
    [ngMaskAmount]="{
      allowNegative: true,
      fractionDigits: 3,
      decimalSeparator: ',',
      align: 'right',
      validator: true,
      focusSelectText: true,
    }"
  />
  `;
  exempleMask = `<input
    class="form-control"
    formControlName="mask"
    type="CPF_CNPJ"
    // user lib IMask
    ngMask // {mask: '00.00'} || '0000.000|0000.0000.000'
  />
  `;
}
