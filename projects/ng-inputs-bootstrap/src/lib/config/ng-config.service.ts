import { Injectable } from '@angular/core';
import {
  INgConfigInput,
  INgConfigSelect,
  NgConfig,
  TypeFields,
} from '../interfaces/config/ng-config.interface';

@Injectable({
  providedIn: 'root',
})
export class NgConfigService {
  private _config: NgConfig = {
    global: {
      upload: {
        icon: 'fas fa-upload',
        label: 'ou arraste um arquivo até aqui',
      },
      select: {},
      textArea: {},
      autocomplete: {
        icon: {
          loading: {
            icon: 'fas fa-spinner ng-bt-loading',
          },
          left: {
            icon: 'fas fa-search',
          },
        },
      },
      input: {
        types: {
          password: {
            icon: {
              right: {
                icon: 'fas fa-eye',
                click: (_, input, icon) => {
                  if (input.type === 'password') {
                    icon.icon = 'fas fa-eye-slash';
                    (input as HTMLInputElement).type = 'text';
                  } else {
                    icon.icon = 'fas fa-eye';
                    (input as HTMLInputElement).type = 'password';
                  }
                },
              },
            },
          },
        },
      },
    },
  };

  get global() {
    return this.config.global;
  }
  get upload() {
    return this.global?.upload;
  }
  get input() {
    return this.global?.input;
  }
  get select() {
    return this.global?.select;
  }
  get textarea() {
    return this.global?.textArea;
  }
  get autocomplete() {
    return this.global?.autocomplete;
  }
  get config() {
    return this._config;
  }
  set config(value: NgConfig) {
    this._config.global = { ...this._config.global, ...value.global } as any;
  }

  types(field: TypeFields): INgConfigSelect | INgConfigInput {
    return this.global?.[field]?.types as INgConfigSelect | INgConfigInput;
  }

  get typesSelect(): INgConfigSelect {
    return this.types('select') as INgConfigSelect;
  }

  get typesInput(): INgConfigInput {
    return this.types('input') as INgConfigInput;
  }

  get typesTextArea(): INgConfigSelect {
    return this.types('textArea') as INgConfigSelect;
  }

  get typesAutocomplete(): INgConfigInput {
    return this.types('autocomplete') as INgConfigInput;
  }
}
