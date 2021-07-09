import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  Output,
  Provider,
  Renderer2,
  SkipSelf,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NgConfigService } from '../../config/ng-config.service';
import { ControlBase } from '../../shared/base/control-base.template';

const PROVIDER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgTextAreaComponent),
  multi: true,
};

@Component({
  selector: 'ng-text-area',
  templateUrl: './ng-text-area.component.html',
  providers: [PROVIDER_VALUE_ACCESSOR],
})
export class NgTextAreaComponent
  extends ControlBase
  implements OnInit, ControlValueAccessor
{
  @Input() set value(value: any) {
    if (!!value) {
      this.writeValue(value);
    }
  }
  @Output() valueChange = new EventEmitter();

  @Input() rows: number | string = 3;
  @Input() cols: number | string = 3;
  @Input() length: string | number;

  constructor(
    @SkipSelf() private changeDetectorRef: ChangeDetectorRef,
    ngConfig: NgConfigService,
    renderer2: Renderer2,
    controlContainer: ControlContainer
  ) {
    super(controlContainer, renderer2, ngConfig);
  }

  ngOnInit() {
    this.superOnInit('textArea');
  }

  ngAfterViewInit() {
    this.superAfterViewInit();
    this.rootRef.nativeElement.blur();
    this.control?.markAsUntouched();
    this.changeDetectorRef.detectChanges();
  }

  @HostListener('input', ['$event.target.value'])
  handleInput(value?: HTMLElement | string | number, delay = false) {
    this.handleChange(value);
    this.valueChange.emit(value);
  }

  writeValue = (value: number | string) => {
    if (this.rootRef) {
      this.rootRef.nativeElement.value = `${value?.toString()}`;
      this.handleInput(value);
    } else {
      setTimeout(() => {
        this.writeValue(value);
      }, 10);
    }
  };
}
