import { AfterViewInit, forwardRef } from '@angular/core';
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

export const PROVIDER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgCheckboxComponent),
  multi: true,
};

@Component({
  selector: 'ng-checkbox',
  templateUrl: './ng-checkbox.component.html',
  providers: [PROVIDER_VALUE_ACCESSOR],
})
export class NgCheckboxComponent
  extends CheckboxControlValueAccessor
  implements OnInit, AfterViewInit
{
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective: FormControlDirective;
  @ViewChild('checkboxRef') checkboxRef: ElementRef<HTMLInputElement>;

  @Input() formControl: FormControl;
  @Input() formControlName: string;

  get control() {
    return (
      this.formControl ||
      this.controlContainer?.control?.get(this.formControlName)
    );
  }

  @Input() id: string;
  @Input() readonly: boolean;
  @Input() indeterminate = false;
  @Input() required: boolean = false;
  @Input() type: 'checkbox' | 'button' = 'checkbox';

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

  ngAfterViewInit() {
    this.checkboxRef.nativeElement.indeterminate = this.indeterminate;
  }
}
