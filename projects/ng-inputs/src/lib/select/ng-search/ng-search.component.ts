import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputCustomControlValueAccessor } from '../../input/input-custom-control-value-accessor.domain';
import { SelectCustomControlValueAccessor } from '../select-custom-control-value-accessor.domain';

@Component({
  selector: 'dss-search',
  templateUrl: './ng-search.component.html',
  styleUrls: ['./ng-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NgSearchComponent),
    },
  ],
})
export class NgSearchComponent
  extends SelectCustomControlValueAccessor
  implements OnInit {
  @Input() notFound: string = 'Sem resultado.';
  @Input() options: any[] = [
    { label: 'Douglas Serena', id: 1, age: 3 },
    { label: 'Ana Carlos', id: 2, age: 65 },
    { label: 'carlos', id: 3, age: 543 },
    { label: 'lucas', id: 4, age: 21 },
    { label: 'amanda', id: 5, age: 52 },
    { label: 'rafaela', id: 6, age: 12 },
    { label: 'jieli', id: 7, age: 66 },
  ];

  constructor(
    protected controlContainer: ControlContainer,
    protected elementRef: ElementRef,
    protected renderer: Renderer2
  ) {
    super(controlContainer, elementRef, renderer);
    this.readonly = false;
  }

  ngOnInit() {
    this.required = this.control.errors?.required;

    if (!this.required)
      this.required =
        this.errors.find((errors) => {
          return errors.type === 'required';
        }) != undefined;
  }

  selected(option: any) {
    console.log(option);
  }

  reset() {
    this.control.setValue('');
  }
}
