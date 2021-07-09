import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  Provider,
  Renderer2,
  SkipSelf,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { MatTimepickerDirective } from 'mat-timepicker';
import { NgConfigService } from '../../config/ng-config.service';
import { INgIconConfig } from '../../interfaces/config/ng-icon-config.interface';
import { ControlBase } from '../../shared/base/control-base.template';

const PROVIDER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgTimeComponent),
  multi: true,
};

@Component({
  selector: 'ng-time',
  templateUrl: './ng-time.component.html',
  providers: [PROVIDER_VALUE_ACCESSOR],
})
export class NgTimeComponent
  extends ControlBase
  implements OnInit, ControlValueAccessor, AfterViewInit
{
  @ViewChild('timepickerRef') timepickerRef: MatTimepickerDirective;
  @Input() readonly = true;
  @Input() fill = true;

  _minDate: Date;
  @Input() set minTime(value: Date | string | Dayjs) {
    if (!!value) {
      if (typeof value === 'string') {
        value = dayjs(dayjs().format('YYYY-MM-DDT') + value);
      }
      this._minDate = dayjs(value).toDate();
    }
  }
  _maxDate: Date;
  @Input() set maxTime(value: Date | string | Dayjs) {
    if (!!value) {
      if (typeof value === 'string') {
        value = dayjs(dayjs().format('YYYY-MM-DDT') + value);
      }
      this._maxDate = dayjs(value).toDate();
    }
  }
  @Input() okLabel = 'Ok';
  @Input() cancelLabel = 'Cancel';
  @Input() mode: '12h' | '24h' = '24h';
  @Input() anteMeridiemAbbreviation = 'am';
  @Input() postMeridiemAbbreviation = 'pm';

  constructor(
    private renderer2: Renderer2,
    private ngConfig: NgConfigService,
    @SkipSelf() private changeDetectorRef: ChangeDetectorRef,
    controlContainer: ControlContainer
  ) {
    super(controlContainer, renderer2, ngConfig);
  }
  ngOnInit() {
    this.superOnInit('time');
  }

  ngAfterViewInit() {
    if (this.fill) {
      this.handleSave(new Date());
    }

    this.timepickerRef.timeChange.subscribe((value) => this.handleSave(value));
    this.changeDetectorRef.detectChanges();
  }

  handleClickIconRight(
    prop: { event: Event; icon: INgIconConfig | undefined },
    input: any,
    position: 'left' | 'right' | 'loading'
  ) {
    this.timepickerRef.showDialog();
    this.handleClickIcon(prop, input, position);
  }

  handleSave(date: Date | Dayjs) {
    this.timepickerRef.writeValue(dayjs(date).toDate());
    this.handleChange(dayjs(date).format());
    this.changeDetectorRef.detectChanges();
  }

  writeValue = (value: any) => {
    if (this.rootRef) {
      if (!!value) {
        switch (value?.toString()?.length) {
          case 2:
            value = dayjs(`${dayjs().format('YYYY-MM-DDT')}${value}:00:00`);
            break;
          case 5:
            value = dayjs(`${dayjs().format('YYYY-MM-DDT')}${value}:00`);
            break;
          case 8:
            value = dayjs(`${dayjs().format('YYYY-MM-DDT')}${value}`);
            break;
        }
        this.handleSave(value);
      }
    } else {
      setTimeout(() => {
        this.writeValue(value);
      }, 10);
    }
  };
}
