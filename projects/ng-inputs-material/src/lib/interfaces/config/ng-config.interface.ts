import { INgIMaskConfig, INgMaskConfig } from '@douglas-serena/ng-masks';
import { NgIconPositionsConfig } from '../config/ng-icon-config.interface';
import { INgTheme } from '../ng-theme.interface';

export interface INgConfigInput {
  theme?: INgTheme;
  currency?: INgMaskConfig;
  percent?: INgMaskConfig;
  amount?: INgMaskConfig;
  mask?: INgIMaskConfig;
  icon?: NgIconPositionsConfig;
}

export interface INgConfigSelect {
  theme?: INgTheme;
  icon?: NgIconPositionsConfig;
}

export type TypeFields =
  | 'select'
  | 'input'
  | 'textArea'
  | 'autocomplete'
  | 'time';

export interface NgConfig {
  global?: {
    theme?: INgTheme;
    maps?: {
      token: string;
    };
    upload?: {
      icon?: string;
      label?: string;
    };
    time?: {
      theme?: INgTheme;
      icon?: NgIconPositionsConfig;
      types?: {
        [key: string]: INgConfigSelect;
      };
    };
    select?: {
      theme?: INgTheme;
      icon?: NgIconPositionsConfig;
      types?: {
        [key: string]: INgConfigSelect;
      };
    };
    textArea?: {
      theme?: INgTheme;
      icon?: NgIconPositionsConfig;
      types?: {
        [key: string]: INgConfigSelect;
      };
    };
    autocomplete?: {
      theme?: INgTheme;
      icon?: NgIconPositionsConfig;
      mask?: INgIMaskConfig;
      types?: {
        [key: string]: INgConfigSelect;
      };
    };
    input?: {
      theme?: INgTheme;
      icon?: NgIconPositionsConfig;
      currency?: INgMaskConfig;
      percent?: INgMaskConfig;
      amount?: INgMaskConfig;
      mask?: INgIMaskConfig;
      types?: {
        [key: string]: INgConfigInput;
      };
    };
  };
}
