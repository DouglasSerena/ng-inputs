import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { NgIconConfig } from '../../interfaces/ng-icon-config.interface';

@Component({
  selector: 'ng-icon',
  templateUrl: './ng-icon.component.html',
})
export class NgIconComponent implements OnInit {
  @Input() icon?: NgIconConfig;
  @Input() className: string;
  @Input() control: AbstractControl;
  @Input() type: 'button' | 'submit' = 'button';

  @Output() iconClick = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
