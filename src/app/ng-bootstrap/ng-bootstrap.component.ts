import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonValidation } from '@douglas-serena/ng-utils';
import { TestService } from '../test.service';

@Component({
  selector: 'ng-bootstrap',
  templateUrl: './ng-bootstrap.component.html',
  styleUrls: ['./ng-bootstrap.component.scss'],
})
export class NgBootstrapComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public testService: TestService
  ) {}

  testIcon() {
    console.log('oi');
  }

  async ngOnInit() {
    const debounce = (time = 2000) =>
      new Promise((resolve) => setTimeout(resolve, time));

    const selected = {
      id: 5,
      name: 'rafa',
      company: {
        people: {
          corporateName: 'rafa serena',
        },
      },
    };

    this.form = this.formBuilder.group({
      default: ['', [Validators.required]],
      disabled: [{ value: 'field disabled', disabled: true }],
      readonly: ['filed readonly'],
      currency: [10.5],
      percent: [1112.5],
      amount: [2.5],
      mask: ['21321312312312'],
      date: [''],
      select: ['rafa'],
      autocomplete: ['', [Validators.required]],
      autocompleteId: [''],
      password: [''],
      tel: ['(12) 3 1231-2312'],
      zipCode: ['90000000'],
      textArea: [''],
      file: ['', [CommonValidation.files.isAllowExtensions(['png'])]],
      switch: [true],
      checkbox: [false],
      indeterminate: [true],
      fill: [''],
      outline: [''],
      standard: [''],
      legacy: [''],
    });
    await debounce(5000);
  }

  option: any = [
    {
      id: 1,
      name: 'douglas',
      company: {
        people: {
          corporateName: 'douglas serena',
        },
      },
    },
    {
      id: 2,
      name: 'amanada',
      company: {
        people: {
          corporateName: 'amanada serena',
        },
      },
    },
    {
      id: 3,
      name: 'jose',
      company: {
        people: {
          corporateName: 'jose serena',
        },
      },
    },
    {
      id: 4,
      name: 'clair',
      company: {
        people: {
          corporateName: 'clair serena',
        },
      },
    },
    {
      id: 5,
      name: 'rafa',
      company: {
        people: {
          corporateName: 'rafa serena',
        },
      },
    },
    {
      id: 6,
      name: 'joão',
      company: {
        people: {
          corporateName: 'joão serena',
        },
      },
    },
    {
      id: 7,
      name: 'carlos',
      company: {
        people: {
          corporateName: 'carlos serena',
        },
      },
    },
  ];
}
