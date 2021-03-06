import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'dss-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form: FormGroup;
  title = 'tmp';
  option: any = [];

  constructor(private formBuilder: FormBuilder) {}

  async ngOnInit() {
    const debounce = (time = 2000) =>
      new Promise((resolve) => setTimeout(resolve, time));

    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['dwadwa', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      currency: [23212, [Validators.required]],
      percent: [23212, [Validators.required]],
      date: ['', [Validators.required]],
      cpf_cnpj: ['00000000000'],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      accept: ['', [Validators.required]],
      dark: ['', [Validators.required]],
      description: ['', [Validators.required]],
      client: [''],
    });

    await debounce(2000);

    this.option = [
      { label: { value: 'Rio grande do sul' }, value: { id: 1 } },
      { label: { value: 'Rio de janeira' }, value: { id: 2 } },
      { label: { value: 'São paulo' }, value: { id: 3 } },
    ];
  }
}
