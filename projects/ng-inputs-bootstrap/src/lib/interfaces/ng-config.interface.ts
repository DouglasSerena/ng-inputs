import { NgIconPositionsConfig } from './ng-icon-config.interface';
import { NgIMaskConfig } from './ng-imask-config.interface';
import { NgMaskConfig } from './ng-mask-config.interface';
import { NgTheme } from './ng-theme.interface';

export interface NgConfigInput {
  theme?: NgTheme;
  currency?: NgMaskConfig;
  percent?: NgMaskConfig;
  amount?: NgMaskConfig;
  mask?: NgIMaskConfig;
  icon?: NgIconPositionsConfig;
}
export interface NgConfigSelect {
  theme?: NgTheme;
  icon?: NgIconPositionsConfig;
}

export type TypeFields = 'select' | 'input' | 'textArea' | 'autocomplete'

export interface NgConfig {
  global?: {
    select?: {
      icon?: NgIconPositionsConfig;
      types?: {
        [key: string]: NgConfigSelect;
      };
    };
    textArea?: {
      icon?: NgIconPositionsConfig;
      types?: {
        [key: string]: NgConfigSelect;
      };
    };
    autocomplete?: {
      icon?: NgIconPositionsConfig;
      types?: {
        [key: string]: NgConfigSelect;
      };
    };
    input?: {
      icon?: NgIconPositionsConfig;
      currency?: NgMaskConfig;
      percent?: NgMaskConfig;
      amount?: NgMaskConfig;
      types?: {
        [key: string]: NgConfigInput;
      };
    };
  };
}
