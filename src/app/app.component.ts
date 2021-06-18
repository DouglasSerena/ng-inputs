import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIconConfig } from 'projects/ng-inputs-bootstrap/src/lib/interfaces/ng-icon-config.interface';

@Component({
  selector: 'dss-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form: FormGroup;
  title = 'tmp';
  option: any = [];
  valueStart: any = { pessoa: null };

  state = ['DA', 'BRT', 'QW', 'AS'];

  constructor(private formBuilder: FormBuilder) {}

  async ngOnInit() {
    const debounce = (time = 2000) =>
      new Promise((resolve) => setTimeout(resolve, time));

    this.form = this.formBuilder.group({
      currency: [12, [Validators.requiredTrue]],
      percent: ['1.2', [Validators.required]],
      cpf_cnpj: ['123123123', [Validators.required]],
      amount: [232, [Validators.required]],

      name: [{ value: '', disabled: true }, [Validators.required]],
      email: [
        { value: '2', disabled: false },
        [Validators.required, Validators.email],
      ],
      password: ['', [Validators.required]],
      date: ['2021-01', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['1', [Validators.required]],
      accept: ['', [Validators.required]],
      dark: [{ value: false, disabled: false }, [Validators.required]],
      description: ['', [Validators.required]],
      rg_estadual: [''],
      client: [''],
    });

    await debounce(5000);

    this.form.controls.name.setValue(12213.1212312312);

    const value = 15000.0123 + 0.0 + 0.0 - 0.0;

    this.form.controls.currency.setValue(value.toFixed(2));
    this.form.controls.percent.setValue(value.toFixed(2));
    this.form.controls.cpf_cnpj.setValue(21312312312);
    this.form.controls.amount.setValue(-12);
    this.form.controls.state.setValue({
      name: 'aline',
      pessoa: { id: 4 },
      age: 19,
    });

    this.state = ['AA', 'BB', 'CC', 'DD'];
  }

  handleClickIcon(event: Event, input: any, icon: NgIconConfig) {}

  async handleSearch(value: string) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const result = [
      { name: 'aline', pessoa: { id: 4 }, age: 19 },
      { name: 'jonh', pessoa: { id: 5 }, age: 30 },
      { name: 'clair', pessoa: { id: 6 }, age: 53 },
      { name: 'douglas', pessoa: { id: 6 }, age: 53 },
      { name: 'jose', pessoa: { id: 6 }, age: 53 },
      { name: 'a,amda', pessoa: { id: 6 }, age: 53 },
      { name: 'amanda', pessoa: { id: 6 }, age: 53 },
    ].filter((item) => !!item.name.match(value));
    console.log(result);
    return result;
  }

  testEvent(event: any) {
    console.log(event);
  }
}
