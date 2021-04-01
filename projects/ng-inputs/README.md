# NgInputs

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.3.

## Installing

```bash
npm install --save @douglas-serena/ng-inputs

// Or with yarn

yarn add @douglas-serena/ng-inputs
```

## Quickstart

Import **ng-inputs** module in Angular app.

##### With default mask config options

```typescript
import { NgModule } from '@angular/core';

import { NgInputsModule } from '@douglas-serena/ng-inputs';

@NgModule({
  imports: [
    NgInputsModule,
  ],
})
```

##### Passing in your own mask config

```typescript
import { NgModule } from '@angular/core';

import { NgInputsModule, INgInputConfig } from '@douglas-serena/ng-inputs';

const config: INgInputConfig = {
  currency: { prefix: '$' },
  percent: { suffix: '%' },
  environments: {
    debug: false,
    url: 'localhost:5000/search' // Variable used in components like search
  },
  field: {
    alignIcons: 'left', // Align is set to defautl for all icons if it doesn't get past
    /**
     * os icones são definidos com o tipo que é passado no
     * input podendo fazer tipos customizados,
     * caso não chega * nativo do html sera alterado
     * para text
     */
    icons: {
      currency: {
        align: 'left',
        clickable: true,
        icon: 'fas fa-dollar-sign'
      }
    },
    type: 'group' // fields: 'group' | 'floating'/ options used only in the bootstrap
  },
  theme: 'bootstrap' // Themes: 'bootstrap' | 'materialize'
}

@NgModule({
  imports: [
    NgInputsModule.forRoot(config),
  ],
})
```

##### Currency and percentage settings

```typescript
const configCurrencyAndPercent = {
  prefix: "$",
  align: "left",
  allowNegative: false,
  cursor: "end",
  decimalSeparator: ".",
  suffix: "  ",
  thousandsSeparator: ",",
};
```

## Use

All inputs are used with Reactive Form and already offer it, without needing to import **ReactiveFormsModule** and **FormsModule**

#### NgInput

```html
<dss-input
  type="password"
  label="password: "
  placeholder="password"
  alignIcon="left"
  alignText="right"
  [disabled]="true"
  [readonly]="true"
  field="floating"
  [hideEye]="true"
  [icon]="fas fa-dollar-sign"
  [iconClickable]="true"
  [iconImage]="https://malcoded.com/static/8c48d4c4bb8b1f2793fa9c6536dae7c6/ba299/angular-reactive-forms-tutorial.png"
  [alignIcon]="left"
  [mask]="0000000/00000|0000000000/0000000"
  [name]="password-id-custom"
  formControlName="password"
  [errors]="{ required: 'Errro' }"
></dss-input>
```

##### types with mask or custom:

- **currency:** the currency type has predefined settings that can be customized in the import settings in the app
- **percent:** the percent type has predefined settings that can be customized in the import settings in the app
- **password:** Password already has an eye icon with the option to show password

- masks:
  - **zipCode: "00000-000"**
  - **cpf: "000.000.000-00"**
  - **cnpj: "00.000.000/0000-00"**
  - **cpf_cnpj: "000.000.000-00" | "00.000.000/0000-00"**
  - **rg: "00.000.000-0"**
  - **estadual: "00.0.000.0000000-0"**
  - **rg_estadual: "00.000.000-0" | "00.0.000.0000000-0"**
  - **tel: "(00) 0000-0000" | "(00) 0 0000-0000"**
