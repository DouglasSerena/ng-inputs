import { ChangeDetectorRef } from '@angular/core';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormControlDirective,
  SelectControlValueAccessor,
} from '@angular/forms';
import { NgInputConfigService } from '../core/ng-input-config.service';

interface IObject {
  [key: string]: string;
}

interface IOnWrite {
  (value: any): void;
}

@Component({ selector: '', template: '' })
export class SelectCustomControlValueAccessor
  extends SelectControlValueAccessor
  implements OnInit
{
  @ViewChild(FormControlDirective, { static: true })
  formControlDirective: FormControlDirective;
  @Input() formControl: FormControl;
  @Input() formControlName: string = '';
  @Input() name?: string;
  @Input() disabled = false;
  @Input() help?: string;

  @Output() public change = new EventEmitter();
  @Output() public blur = new EventEmitter();
  @Output() public focus = new EventEmitter();

  get _placeholder() {
    return this.field === 'floating' &&
      !!this.label &&
      this.placeholder.length === 0
      ? false
      : this.placeholder;
  }
  @Input() placeholder: string = '';
  @Input() label: string = '';
  _cols: { default: number; lg?: number; md?: number; sm?: number } = {
    default: 12,
    sm: 12,
  };
  @Input() set cols(cols: {
    default?: number;
    lg?: number;
    md?: number;
    sm?: number;
  }) {
    this._cols = { ...this._cols, ...cols };
  }

  _field: null | 'group' | 'floating' = null;
  @Input() set field(value: 'group' | 'floating') {
    this._field = value;
  }
  get field() {
    return this._field
      ? this._field
      : (this._configService.field.type as 'group' | 'floating');
  }

  @Input() readonly: boolean = false;
  @Input() required?: boolean;

  @Input() errors: IObject = {};

  get control(): FormControl {
    return (this.formControl ||
      this._controlContainer?.control?.get(
        this.formControlName
      )) as FormControl;
  }

  @HostBinding('class') get classCols() {
    let className =
      this._configService.theme === 'bootstrap'
        ? `col-${this._cols.default}`
        : `col`;
    if (this._cols.lg)
      className +=
        this._configService.theme === 'bootstrap'
          ? ` col-lg-${this._cols.lg}`
          : ` l${this._cols.lg}`;
    if (this._cols.md)
      className +=
        this._configService.theme === 'bootstrap'
          ? ` col-md-${this._cols.md}`
          : ` m${this._cols.md}`;
    if (this._cols.sm)
      className +=
        this._configService.theme === 'bootstrap'
          ? ` col-sm-${this._cols.sm}`
          : ` s${this._cols.sm}`;
    return className;
  }

  constructor(
    protected _controlContainer: ControlContainer,
    protected elementRef: ElementRef,
    protected renderer: Renderer2,
    private _configService: NgInputConfigService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    super(renderer, elementRef);
    this.readonly = false;
  }

  ngOnInit() {
    this.ngOnInitSuper();

    if (this.disabled) this.control.disable();
    else this.control.enable();
  }

  ngOnInitSuper() {
    if (this.name === undefined) this.name = this.formControlName;

    this.validRequired();
  }

  getMultiLabels(labels: any, label: string[]): any {
    const lastLabel = label.concat([]);
    const rest = label.splice(1, label.length - 1);

    return lastLabel.length === 1
      ? labels?.[lastLabel[0]]
      : this.getMultiLabels(labels?.[lastLabel[0]], rest);
  }

  getKeys(errors: IObject) {
    return Object.keys(errors);
  }

  getError(key: string) {
    return this.control?.errors?.[key] && this.control?.touched;
  }

  validRequired() {
    const value = this.control.value;
    this?.onWrite?.(null);
    this._changeDetectorRef.detectChanges();
    if (this.required === undefined) {
      this.required = this.control.errors?.required;
    }
    this?.onWrite?.(value);
    this._changeDetectorRef.detectChanges();
  }

  registerOnTouched(fn: any): void {
    this.formControlDirective.valueAccessor?.registerOnTouched(fn);
  }

  onWrite: IOnWrite;
  registerOnChange(fn: IOnWrite): void {
    this.onWrite = fn;
  }

  time: any = 0;
  writeValue(obj: any): void {
    clearTimeout(this.time);
    this.time = setTimeout(() => {
      this.onWrite(obj);
    });
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
