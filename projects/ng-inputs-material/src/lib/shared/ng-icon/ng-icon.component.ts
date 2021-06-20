import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INgIconConfig } from '../../interfaces/config/ng-icon-config.interface';

@Component({
  selector: 'ng-icon',
  templateUrl: './ng-icon.component.html',
})
export class NgIconComponent implements OnInit {
  @Input() icon?: INgIconConfig;
  @Input() className: string;
  @Input() type: 'button' | 'submit' = 'button';

  @Output() iconClick = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}
