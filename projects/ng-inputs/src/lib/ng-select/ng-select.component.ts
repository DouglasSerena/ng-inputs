import {
  Component,
  forwardRef,
  Input,
  OnInit,
  SimpleChange,
} from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  IObject,
  NgInputDefaultComponent,
} from '../ng-input-default.component';

@Component({
  selector: 'dss-select',
  templateUrl: './ng-select.component.html',
  styleUrls: ['./ng-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgSelectComponent),
    },
  ],
})
export class NgSelectComponent
  extends NgInputDefaultComponent
  implements OnInit {
  @Input() label: string = 'Sem label: ';

  @Input() options?: { label: string; value: string }[] = [];
  @Input() path?: { [key: string]: string };
  @Input() labelDefault?: string = 'Selecione uma opção';

  constructor(controlContainer: ControlContainer) {
    super(controlContainer);
  }

  ngOnInit() {
    this.required = this.control.errors?.required;
    if (!this.required)
      this.required =
        this.errors.find((errors) => errors.type === 'required') != undefined;

    this.verifyObject();
  }

  ngOnChanges(params: { objects: SimpleChange }) {
    if (!!params.objects && !!params.objects.currentValue) this.verifyObject();
  }

  verifyObject() {
    // if (this.options?.length === 0 && this.objects?.length > 0) {
    //   const getMultiLabels = (labels: any, label: string[]) => {
    //     const lastLabel = label.concat([]);
    //     const rest = label.splice(1, label.length - 1);
    //     return lastLabel.length === 1
    //       ? labels[lastLabel[0]]
    //       : getMultiLabels(labels[lastLabel[0]], rest);
    //   };
    //   this.options?.forEach((object) => {
    //     this.options.push({
    //       label: getMultiLabels(object, this.path?.label.split('.')),
    //       value: getMultiLabels(object, this.path?.value.split('.')),
    //     });
    //   });
    //   this.options.unshift({ label: this.labelDefault, value: '' });
    // }
  }

  getError(error: IObject, value: 'key' | 'value') {
    const key = Object.keys(error)[0];

    return value === 'key'
      ? this.control.errors && this.control.errors[key]
      : error[key];
  }
}
