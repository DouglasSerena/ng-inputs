import { ElementRef, EventEmitter } from '@angular/core';
import { FormControl, FormControlDirective } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import {
  INgIconConfig,
  NgIconPositionsConfig,
} from '../../interfaces/config/ng-icon-config.interface';

export interface NgControlBase {
  formControlDirective?: FormControlDirective;
  rootRef?: ElementRef<HTMLInputElement> | MatSelect;

  formControl?: FormControl;
  formControlName?: string;

  id?: string;
  label: string;
  type: string;
  prefix?: string;
  suffix?: string;
  readonly: boolean;
  disabled: boolean;
  labelFixed: boolean;
  required: boolean | null;
  _placeholder?: string | null;

  help?: string;
  color: string;
  icon?: NgIconPositionsConfig;
  size: 'lg' | 'md' | 'sm';
  theme: 'outline' | 'fill' | 'standard' | 'legacy';

  _errors?: { [key: string]: string };
  _errorsKeys?: string[];

  handleClickIcon: (
    prop: { event: Event; icon: INgIconConfig | undefined },
    input: HTMLElement,
    position: 'left' | 'right'
  ) => void;

  blur: EventEmitter<any>;
  handleBlur: (event: FocusEvent) => void;

  focus: EventEmitter<any>;
  handleFocus: (event: FocusEvent) => void;
}
