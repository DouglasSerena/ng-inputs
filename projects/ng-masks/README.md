## Ng Masks

#### Directives

###### Module
```typescript
@NgModule({
  imports: [NgMasksDirectivesModule]
})
```
###### Use NgMask
```typescript
/** ngMask */
// USE WITH STRING
const template = `
  <input
    type="text"
    formControlName="cpfCnpj"
    mask="000.000.000-00|00.000.000/0000-00"
  />`

// USE WITH PREDEFINED MASKS 
const template = `
  <input
    type="CPF_CNPJ"
    formControlName="cpfCnpj"
  />`

// USE WITH CONFIG
const template = `
  <input
    type="text"
    formControlName="cpf"
    [mask]="{
      mask: [
        {mask: ''000.000.000-00''},
        {mask: '00.000.000/0000-00'}
      ]
    }"
  />`

// PREDEFINED MASKS 
types = 'ZIP_CODE' | 'TEL' | 'RG' | 'RG_ESTADUAL' | 'CPF_CNPJ' | 'CNPJ' | 'CPF' | 'ESTADUAL'

// CONFIG
type INgIMaskConfig =
  | IMask.AnyMaskedOptions
  | { validator: boolean }
  | string;
```
###### Use NgMaskCurrency
```typescript
/** ngMaskCurrency */
// USE DEFAULT
const template = `
  <input
    ngMaskCurrency
    type="currency"
    formControlName="currency"
  />`

// USE WITH CONFIG
const template = `
  <input
    type="currency"
    formControlName="currency"
    [ngMaskCurrency]="{
      decimalSeparator: ','
    }"
  />`

// CONFIG
interface INgMaskConfig {
  allowNegative?: boolean;
  negativeSignAfter?: boolean;
  prefix?: string;
  suffix?: string;
  fixed?: boolean;
  fractionDigits?: number;
  decimalSeparator?: string;
  thousandsSeparator?: string;
  cursor?: 'end' | 'move' | 'start';
  align?: 'left' | 'center' | 'right';
  validator?: boolean;
  focusSelectText?: boolean;
}
```

###### Use NgMaskPercent
```typescript
/** ngMaskPercent */
// USE DEFAULT
const template = `
  <input
    ngMaskPercent
    type="percent"
    formControlName="percent"
  />`

// USE WITH CONFIG
const template = `
  <input
    type="percent"
    formControlName="percent"
    [ngMaskPercent]="{
      decimalSeparator: '.'
    }"
  />`

// CONFIG
interface INgMaskConfig {
  allowNegative?: boolean;
  negativeSignAfter?: boolean;
  prefix?: string;
  suffix?: string;
  fixed?: boolean;
  fractionDigits?: number;
  decimalSeparator?: string;
  thousandsSeparator?: string;
  cursor?: 'end' | 'move' | 'start';
  align?: 'left' | 'center' | 'right';
  validator?: boolean;
  focusSelectText?: boolean;
}

```

###### Use NgMaskAmount
```typescript
/** ngMaskAmount */
// USE DEFAULT
const template = `
  <input
    ngMaskAmount
    type="amount"
    formControlName="amount"
  />`

// USE WITH CONFIG
const template = `
  <input
    type="amount"
    formControlName="amount"
    [ngMaskAmount]="{
      decimalSeparator: '.'
    }"
  />`

// CONFIG
const config = {
  allowNegative: true,
  fractionDigits: 3,
  decimalSeparator: ',',
  align: 'right',
  validator: true,
  focusSelectText: true,
};
```

----

#### Services
###### Module
```typescript
@NgModule({
  imports: [NgMasksDirectivesModule]
})
```
###### Use
```typescript
  private _maskRef: IMaskServiceReturn;

  constructor(
    private ngMaskService: NgMaskService,
    private ngMaskAmountService: NgMaskAmountService,
    private ngMaskPercentService: NgMaskPercentService,
    private ngMaskCurrencyService: NgMaskCurrencyService,
  ) {}

  ngOnInit() {
    // MASKS
    this._maskRef = this.NgMaskService.createMask(
      this._inputRef,
      this._config
    );
    // AMOUNT
    this._maskRef = this.NgMaskAmountService.createMask(
      this._inputRef,
      this._config
    );
    // PERCENT
    this._maskRef = this.NgMaskPercentService.createMask(
      this._inputRef,
      this._config
    );
    // CURRENCY
    this._maskRef = this.ngMaskCurrencyService.createMask(
      this._inputRef,
      this._config // use 'string' or 'config'
    );

    this._maskRef.update();
    this._maskRef.unmaskedValue();
  }
```

#### Pipes
###### Module
```typescript
@NgModule({
  imports: [NgMasksPipesModule]
})
```
###### Use
```html
  <p id="mask predefined">{{ 00000000000 | ngMask: "CPF_CNPJ" }}</p>
  <p id="mask config">{{ 00000000000 | ngMask: { mask: [ {mask: ''000.000.000-00''}, {mask: '00.000.000/0000-00'} ] } }}</p>
  <p id="mask string">{{ 00000000000 | ngMask: "000.000.000-00|00.000.000/0000-00" }}</p>
  <p id="amount">{{ 100 | ngMaskAmount: { decimalSeparator: '.' } }}</p>
  <p id="percet">{{ 100 | ngMaskPercent: { decimalSeparator: '.' } }}</p>
  <p id="currency">{{ 100 | ngMaskCurrency: { decimalSeparator: '.' } }}</p>
```

#### Utils
```typescript
type INgIMaskConfig =
  | IMask.AnyMaskedOptions
  | { validator: boolean }
  | string;

interface INgMaskConfig {
  allowNegative?: boolean;
  negativeSignAfter?: boolean;
  prefix?: string;
  suffix?: string;
  fixed?: boolean;
  fractionDigits?: number;
  decimalSeparator?: string;
  thousandsSeparator?: string;
  cursor?: 'end' | 'move' | 'start';
  align?: 'left' | 'center' | 'right';
  validator?: boolean;
  focusSelectText?: boolean;
}

interface IMaskServiceReturn {
  _instanceRef: any;
  _config: any;
  _inputRef: HTMLInputElement;
  _validator?: boolean;
  _renderer2?: Renderer2;
  _validRequired(value: string | number): null | string | number;
  type: 'percent' | 'currency' | 'amount' | 'custom';
  update(value: string | number): void;
  unmaskedValue(): number;
}
interface INgMaskService {
  _config: INgMaskConfig | INgIMaskConfig;
  config?: (config: INgMaskConfig | INgIMaskConfig) => void
  createMask: (
    inputRef: HTMLInputElement,
    config?: INgMaskConfig | INgIMaskConfig | undefined,
    renderer2?: Renderer2 | undefined
  ) => IMaskServiceReturn;
  format: (
    value: string | number,
    config?: INgMaskConfig | INgIMaskConfig | undefined
  ) => string;
}

const CONSTANT = MASKS, INPUT_TYPE, INPUT_TYPE_OTHER, INPUT_TYPE_DATE, INPUT_TYPE_TEXT
```
