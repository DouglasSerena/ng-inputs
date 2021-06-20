import { ElementRef, EventEmitter } from '@angular/core';
import { FormControl, FormControlDirective } from '@angular/forms';
import {
  INgIconConfig,
  NgIconPositionsConfig,
} from '../../interfaces/config/ng-icon-config.interface';

export interface NgControlBase {
  formControlDirective: FormControlDirective;
  rootRef: ElementRef<HTMLInputElement>;

  formControl: FormControl;
  formControlName: string;

  id: string;
  label: string;
  type: string;
  prefix: string;
  suffix: string;
  readonly: boolean;
  disabled: boolean;
  labelFixed: boolean;
  required: boolean | null;
  _placeholder?: string | null;

  help: string;
  color: string;
  icon: NgIconPositionsConfig;
  size: 'lg' | 'md' | 'sm';
  theme: 'outline' | 'fill' | 'standard' | 'legacy';

  errors: { [key: string]: string };

  handleClickIcon: (
    event: Event,
    input: HTMLElement,
    icon: INgIconConfig | undefined,
    position: 'left' | 'right'
  ) => void;

  blur: EventEmitter<any>;
  handleBlur: (event: FocusEvent) => void;

  focus: EventEmitter<any>;
  handleFocus: (event: FocusEvent) => void;
}
