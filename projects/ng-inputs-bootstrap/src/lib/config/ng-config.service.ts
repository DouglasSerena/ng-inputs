import { Injectable } from '@angular/core';
import {
  NgConfig,
  NgConfigInput,
  NgConfigSelect,
  TypeFields,
} from '../interfaces/ng-config.interface';

@Injectable({
  providedIn: 'root',
})
export class NgConfigService {
  private _config: NgConfig = {
    global: {
      select: {},
      textArea: {},
      autocomplete: {
        icon: {
          loading: {
            class: 'fas fa-spinner ng-loading',
          },
          left: {
            class: 'fas fa-search',
          },
        },
      },
      input: {
        types: {
          password: {
            icon: {
              right: {
                class: 'fas fa-eye',
                click: (_, input, icon) => {
                  if (input.type === 'password') {
                    icon.class = 'fas fa-eye-slash';
                    (input as HTMLInputElement).type = 'text';
                  } else {
                    icon.class = 'fas fa-eye';
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

  types(field: TypeFields): NgConfigSelect | NgConfigInput {
    return this.global?.[field]?.types as NgConfigSelect | NgConfigInput;
  }
  
  get typesSelect(): NgConfigSelect {
    return this.types('select') as NgConfigSelect;
  }

  get typesInput(): NgConfigInput {
    return this.types('input') as NgConfigInput;
  }

  get typesTextArea(): NgConfigSelect {
    return this.types('textArea') as NgConfigSelect;
  }

  get typesAutocomplete(): NgConfigInput {
    return this.types('autocomplete') as NgConfigInput;
  }
}
