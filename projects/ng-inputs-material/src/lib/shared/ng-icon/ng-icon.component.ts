import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { INgIconConfig } from '../../interfaces/config/ng-icon-config.interface';

@Component({
  selector: 'ng-icon',
  templateUrl: './ng-icon.component.html',
})
export class NgIconComponent implements OnInit {
  @Input() set icon(icon: INgIconConfig | undefined) {
    if (icon) {
      this._icon = Object.assign({}, icon);
    }
  }
  @Input() className: string;
  @Input() type: 'button' | 'submit' = 'button';
  _icon: INgIconConfig;

  @Output() iconClick = new EventEmitter<{
    event: Event;
    icon: INgIconConfig;
  }>();

  constructor() {}

  ngOnInit() {}

  handleClick(event: Event) {
    this.iconClick.emit({ event: event, icon: this._icon });
  }
}
