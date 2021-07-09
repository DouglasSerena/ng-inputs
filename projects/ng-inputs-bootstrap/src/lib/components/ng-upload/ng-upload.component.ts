import {
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  Provider,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { startWith } from 'rxjs/operators';
import { NgConfigService } from '../../config/ng-config.service';

const PROVIDER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgUploadComponent),
  multi: true,
};

@Component({
  selector: 'ng-upload',
  templateUrl: './ng-upload.component.html',
  styleUrls: ['./ng-upload.component.scss'],
  providers: [PROVIDER_VALUE_ACCESSOR],
})
export class NgUploadComponent implements OnInit {
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective: FormControlDirective;
  @ViewChild('rootRef') rootRef: ElementRef<HTMLInputElement>;

  @Input() icon = '';
  @Input() multiple = false;
  @Input() accept: string = '';
  @Input() formControl: FormControl;
  @Input() formControlName: string;
  @Input() label: string;

  disabled: boolean = false;

  @Input() set errors(errors: { [key: string]: string } | null) {
    if (errors) {
      this._errors = errors;
      this._errorsKeys = Object.keys(errors);
    }
  }
  _errors: { [key: string]: string };
  _errorsKeys: string[];

  stateDragDrop: 'DRAGOVER' | 'DRAGLEAVE' | 'DROP' = 'DRAGLEAVE';

  get control(): FormControl {
    return (this.formControl ||
      this._controlContainer?.control?.get(
        this.formControlName
      )) as FormControl;
  }

  constructor(
    private _controlContainer: ControlContainer,
    private ngConfigService: NgConfigService
  ) {}

  //Dragover listener
  @HostListener('dragover', ['$event']) handleDragOver(event: DragEvent) {
    this.stateDragDrop = 'DRAGOVER';
  }

  ngOnInit() {
    if (!this.label) {
      this.label = this.ngConfigService.upload?.label;
    }
    if (!this.icon) {
      this.icon = this.ngConfigService.upload?.icon;
    }
  }

  handleDrop() {
    this.stateDragDrop = 'DROP';
  }

  handleOpenUpload() {
    this.rootRef.nativeElement.click();
  }

  handleChange = (_: any) => {};
  handleTouched = () => {};
  registerOnTouched = (fn: () => void) => (this.handleTouched = fn);
  setDisabledState = (isDisabled: boolean) => (this.disabled = isDisabled);
  registerOnChange = (fn: (_: any) => void) => (this.handleChange = fn);
  writeValue = (value: number | string) => {};
}
