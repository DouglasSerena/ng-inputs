import {
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnDestroy,
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
import { contains } from '@douglas-serena/ng-utils';
import { Subscription } from 'rxjs';
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
export class NgUploadComponent implements OnInit, OnDestroy {
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective: FormControlDirective;
  @ViewChild('rootRef') rootRef: ElementRef<HTMLInputElement>;

  @Input() icon = '';
  @Input() file: File;
  @Input() color = 'primary';
  @Input() multiple = false;
  @Input() saveFiles = false;
  @Input() files: File[] = [];
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
  $valueChange: Subscription;

  get control(): FormControl | null {
    if (this.formControlName) {
      return this._controlContainer?.control?.get(
        this.formControlName
      ) as FormControl;
    }
    if (!this.formControl) {
      this.formControl = new FormControl();
    }
    return this.formControl;
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

    this.$valueChange = this.control.valueChanges.subscribe((files: File[]) => {
      let isError = this.control.errors !== null;
      for (let file of Array.from(files)) {
        if (isError) {
          this.control.errors.filesInvalid.forEach((_file) => {
            if (contains(file.name, _file.filename)) {
              if (this.saveFiles) {
                this.files.push(file);
                this.handleChange(this.files);
              } else {
                this.file = file;
                this.handleChange(this.file);
              }
            }
          });
        } else {
          if (this.saveFiles) {
            this.files.push(file);
            this.handleChange(this.files);
          } else {
            this.file = file;
            this.handleChange(this.file);
          }
        }
      }
    });
  }

  ngOnDestroy() {
    this.$valueChange.unsubscribe();
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
