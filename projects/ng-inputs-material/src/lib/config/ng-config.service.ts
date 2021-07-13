import { Injectable } from '@angular/core';
import {
  NgConfig,
  INgConfigInput,
  TypeFields,
  INgConfigSelect,
} from '../interfaces/config/ng-config.interface';

@Injectable({
  providedIn: 'root',
})
export class NgConfigService {
  private _config: NgConfig = {
    global: {
      upload: {
        icon: 'file_upload',
        label: 'ou arraste um arquivo até aqui',
      },
      time: {
        icon: {
          right: {
            icon: 'access_time',
            click: () => {},
          },
        },
      },
      select: {},
      textArea: {},
      autocomplete: {
        icon: {
          loading: {
            icon: 'refresh',
            className: 'ng-mat-loading',
          },
          left: {
            icon: 'search',
          },
        },
      },
      input: {
        types: {
          password: {
            icon: {
              right: {
                icon: 'visibility_off',
                click: (_, input, icon) => {
                  if (input.type === 'password') {
                    icon.icon = 'visibility';
                    (input as HTMLInputElement).type = 'text';
                  } else {
                    icon.icon = 'visibility_off';
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
  get time() {
    return this.global?.time;
  }
  get maps() {
    return this.global?.maps;
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

  get typesSelect(): INgConfigSelect {
    return this.types('select') as INgConfigSelect;
  }

  get typesTime(): INgConfigSelect {
    return this.types('time') as INgConfigSelect;
  }

  get typesMaps(): INgConfigSelect {
    return this.types('maps') as INgConfigSelect;
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

  types(field: TypeFields): {
    [key: string]: INgConfigSelect | INgConfigInput;
  } {
    return this.global?.[field]?.types as {
      [key: string]: INgConfigSelect | INgConfigInput;
    };
  }
}
