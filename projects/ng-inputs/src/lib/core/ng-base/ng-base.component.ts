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
  @Input() control: FormControl | null = null;
  @Input() errors: IObject = {};
  @Input() activeLabel: boolean = false;
  @Input() enableTheme = true;

  get theme() {
    return this.configService.theme;
  }

  constructor(private configService: NgInputConfigService) {}

  ngOnInit() {}

  getKeys(errors: IObject) {
    return Object.keys(errors);
  }
  getError(key: string) {
    return this.control?.errors?.[key] && this.control?.touched;
  }
}
