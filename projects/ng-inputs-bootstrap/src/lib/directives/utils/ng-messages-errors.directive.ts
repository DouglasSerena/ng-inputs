import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[ng-messages-errors]',
})
export class NgMessagesErrorsDirectives implements OnInit {
  @Input() set control(control: AbstractControl | null | undefined) {
    if (control) {
      this._control = control;
    }
    this._control.statusChanges.subscribe((status) => {
      if (status === 'INVALID') {
        this.validField();
      }
    });
    this.validField();
  }
  _control: AbstractControl;

  @Input() set 'ng-messages-errors'(errors: { [key: string]: string } | null) {
    if (errors) {
      this._errors = errors;
      this._errorsKeys = Object.keys(errors);
    }
  }
  private _errors: { [key: string]: string };
  private _errorsKeys: string[];

  private _elementRef: HTMLElement;

  constructor(elementRef: ElementRef) {
    this._elementRef = elementRef.nativeElement;
  }

  ngOnInit() {}

  validField() {
    this._errorsKeys?.forEach((key) => {
      if (!!this._control.hasError(key)) {
        let text = this._errors[key];

        if (key === 'minlength' || key === 'maxlength') {
          text = text.replace(
            key === 'maxlength' ? '{max}' : '{min}',
            this._control.errors?.[key].requiredLength
          );
        }
        this._elementRef.textContent = text;
        return;
      }
    });
  }
}
