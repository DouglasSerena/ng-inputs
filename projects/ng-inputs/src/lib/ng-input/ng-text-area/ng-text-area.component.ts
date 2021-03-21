import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgInputConfigService } from '../../core/ng-input-config.service';
import { InputCustomControlValueAccessor } from '../input-custom-control-value-accessor.domain';

@Component({
  selector: 'dss-text-area',
  templateUrl: './ng-text-area.component.html',
  styleUrls: ['./ng-text-area.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgTextAreaComponent),
    },
  ],
})
export class NgTextAreaComponent extends InputCustomControlValueAccessor {
  @ViewChild('textarea', { static: true })
  textarea: ElementRef<HTMLTextAreaElement>;
  @Input() length: number | string = 300;
  @Input() rows: number = 1;

  constructor(
    protected controlContainer: ControlContainer,
    public configService: NgInputConfigService
  ) {
    super(controlContainer, configService);
  }

  ngOnInit() {
    this.ngOnInitSuper();

    if (this.placeholder.length > 0) {
      this.textarea.nativeElement.setAttribute('placeholder', this.placeholder);
    } else {
      if (this.configService.theme === 'bootstrap')
        this.textarea.nativeElement.setAttribute('placeholder', '  ');
    }
  }

  get className() {
    const bootstrap = this.configService.theme === 'bootstrap';
    const validField = this.control.valid && this.control.touched;
    const invalidField = this.control.invalid && this.control.touched;
    return {
      'form-control': bootstrap,
      floating: this.field === 'floating',
      readonly: this.readonly,
      'is-invalid': bootstrap && !this.readonly && invalidField,
      'is-valid': bootstrap && validField,
      invalid: !bootstrap && !this.readonly && invalidField,
      valid: !bootstrap && validField,
      'materialize-textarea': !bootstrap,
    };
  }
}
