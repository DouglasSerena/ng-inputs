import { forwardRef } from '@angular/core';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Provider,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  CheckboxControlValueAccessor,
  ControlContainer,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

const PROVIDER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgSwitchComponent),
  multi: true,
};

@Component({
  selector: 'ng-switch',
  templateUrl: './ng-switch.component.html',
  providers: [PROVIDER_VALUE_ACCESSOR],
})
export class NgSwitchComponent
  extends CheckboxControlValueAccessor
  implements OnInit
{
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective: FormControlDirective;
  @ViewChild('checkboxRef') checkboxRef: ElementRef<HTMLInputElement>;

  @Input() formControl: FormControl;
  @Input() formControlName: string;

  get control(): FormControl {
    return (this.formControl ||
      this.controlContainer?.control?.get(this.formControlName)) as FormControl;
  }

  @Input() id: string;
  @Input() readonly: boolean;
  @Input() type: any = 'checkbox';
  @Input() color: string = 'primary';
  @Input() required: boolean = false;
  @Input() labelPosition: 'before' | 'after' = 'after';

  constructor(
    private controlContainer: ControlContainer,
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) {
    super(renderer2, elementRef);
  }

  ngOnInit() {
    if (this.id === undefined) {
      this.id = this.formControlName;
    }
  }
}
