import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { contains } from '@douglas-serena/ng-utils';
import { CommonValidation } from 'projects/ng-utils/src/public-api';
import { Observable, of } from 'rxjs';
import { TestService } from '../test.service';

@Component({
  selector: 'ng-material',
  templateUrl: './ng-material.component.html',
  styleUrls: ['./ng-material.component.scss'],
})
export class NgMaterialComponent implements OnInit {
  default: string = 'RAFA_';
  form?: FormGroup;

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
      file: ['', [CommonValidation.files.isAllowExtensions(['png'])]],
      default: [
        '',
        [Validators.required],
        [
          CommonValidation.async(
            () => new Promise((resolve) => resolve('Douglas')),
            (result, valueControl) =>
              result === valueControl ? null : { error: true }
          ),
        ],
      ],
      disabled: [{ value: 'field disabled', disabled: true }],
      readonly: ['filed readonly'],
      currency: ['', []],
      percent: [250.55],
      amount: [2.5],
      mask: ['54.546.018/0001-12', [CommonValidation.docs.isCpfOrCnpj]],
      date: ['', [CommonValidation.date.isBirchDay()]],
      select: [{ value: 'RAFA_' }],
      autocomplete: ['', [Validators.required]],
      autocompleteId: [''],
      password: [''],
      time: ['2021-06-25'],
      tel: [
        '',
        [CommonValidation.control('default', CommonValidation.isEqual)],
      ],
      zipCode: ['90000000'],
      textArea: ['daw'],
      switch: [true],
      checkbox: [false],
      indeterminate: [true],
      fill: ['', [Validators.required]],
      outline: ['', [Validators.required]],
      standard: ['', [Validators.required]],
      legacy: ['', [Validators.required]],
    });

    await debounce(1000);
    this.form.controls.currency.setValue('213123');
    this.form.controls.amount.setValue('213123');
    this.form.controls.percent.setValue('213123');
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
