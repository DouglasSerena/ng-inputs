import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgInputConfigService } from '../ng-input-config.service';

interface IObject {
  [key: string]: string;
}

@Component({
  selector: 'dss-ng-base',
  templateUrl: './ng-base.component.html',
  styleUrls: ['./ng-base.component.scss'],
})
export class NgBaseComponent implements OnInit {
  @Input() field: 'group' | 'floating' = 'floating';
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() label: string = '';
  @Input() htmlFor: string = '';
  @Input() control: null | FormControl = null;
  @Input() errors: IObject[] = [];

  get theme() {
    return this.configService.theme;
  }

  constructor(private configService: NgInputConfigService) {}

  ngOnInit() {}

  getError(error: IObject, value: 'key' | 'value') {
    const key = Object.keys(error)[0];

    return value === 'key'
      ? this.control?.errors && this.control?.errors[key]
      : error[key];
  }
}
