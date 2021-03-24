import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  Output,
  Renderer2,
  SimpleChange,
  ViewChild,
} from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Debounce } from '../../decorators/debounce.decorator';
import { NgInputConfigService } from '../../core/ng-input-config.service';
import { SelectCustomControlValueAccessor } from '../select-custom-control-value-accessor.domain';

interface IOnWrite {
  (value: string): void;
}

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
  @ViewChild('elementList', { static: true })
  elementList: ElementRef<HTMLDivElement>;
  get list() {
    return this.elementList.nativeElement;
  }

  @Input() notFound: string = 'Sem resultado.';
  @Input() pathLabel = 'label';
  @Input() value: any = null;
  @Input() options: any[] = [];
  @Input() uri: string | null = null;
  @Input() responseData: string | null = null;
  @Input() return: string | null = null;

  loading = false;
  focused = false;

  constructor(
    protected controlContainer: ControlContainer,
    protected elementRef: ElementRef,
    protected renderer: Renderer2,
    private httpClient: HttpClient,
    private configService: NgInputConfigService
  ) {
    super(controlContainer, elementRef, renderer, configService);
  }

  @Debounce(300)
  @HostListener('input', ['$event'])
  async onInput({ target }: KeyboardEvent) {
    const { value } = target as HTMLInputElement;

    if (value.length === 0) return;
    if (!this.focused) this.focused = true;

    if (this.uri) {
      let uri = this.createUrl(this.uri);
      uri = uri?.replace('{value}', value) as string;

      this.loading = true;
      try {
        const response = await this.httpClient.get(uri).toPromise();
        this.options = this.responseData
          ? this.getMultiLabels(response, this.responseData.split('.'))
          : response;
        this.format();
      } catch (error) {
        if (!this.configService.environments.debug) {
          console.log(error);
        }
      }
      this.loading = false;
    }
  }

  createUrl(uri: string) {
    const variables = uri.match(/(\{[\w\_]+\})+/g);
    variables?.forEach((variable) => {
      const key = variable.replace(/([\{\}])+/g, '');
      const env = this.configService.environments[key];
      if (env) uri = uri?.replace(variable, env) as string;
    });
    return uri;
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const { key } = event;

    const keys = {
      ArrowUp: () => {
        event.preventDefault();

        if (!this.focused) {
          this.focused = true;
          return;
        }

        const index = this.options.findIndex((option) => option.dssSelect);

        const calcScroll = 41 * (this.options.length - 4);

        if (index === -1) {
          this.options[this.options.length - 1].dssSelect = true;
          this.list.scroll(0, calcScroll);
          return;
        }

        this.options[index].dssSelect = false;

        if (index === 0) {
          this.options[this.options.length - 1].dssSelect = true;
          this.list.scroll(0, calcScroll);
          return;
        }

        this.options[index - 1].dssSelect = true;

        const button = this.list.querySelector(
          `button:nth-child(${index})`
        ) as HTMLButtonElement;

        const offset = button.offsetTop - this.list.scrollTop;

        if (offset < 0) this.list.scroll(0, this.list.scrollTop - 41);
      },
      ArrowDown: () => {
        event.preventDefault();

        if (!this.focused) {
          this.focused = true;
          return;
        }

        const index = this.options.findIndex((option) => option.dssSelect);

        if (index === -1) {
          this.options[0].dssSelect = true;
        }

        this.options[index].dssSelect = false;

        if (index === this.options.length - 1) {
          this.list.scroll(0, 0);
          this.options[0].dssSelect = true;
          return;
        }

        this.options[index + 1].dssSelect = true;

        const bottom = this.list.getClientRects().item(0)?.bottom as number;
        const button = this.list.querySelector(
          `button:nth-child(${index})`
        ) as HTMLButtonElement;

        const offset = bottom - (button.offsetTop - this.list.scrollTop);

        if (offset < 360) this.list.scroll(0, this.list.scrollTop + 41);
      },
      Enter: () => {
        event.preventDefault();

        if (!this.focused) {
          this.focused = true;
          return;
        }

        const index = this.options.findIndex((option) => option.dssSelect);
        if (index !== -1) {
          this.focused = false;
          this.inputChange(this.options[index]);
        }
      },
    };
    try {
      keys[key as 'ArrowUp']();
    } catch {}
  }

  ngOnInit() {
    this.required = this.control.errors?.required;

    if (!this.required)
      this.required =
        this.errors.find((errors) => {
          return errors.type === 'required';
        }) != undefined;
    this.format();
  }

  @Output() blur = new EventEmitter();
  @Debounce(250)
  onBlur(event: Event) {
    this.focused = false;
    this.blur.emit(event);
  }

  @Output() focus = new EventEmitter();
  @Debounce(250)
  onFocus(event: Event) {
    this.focused = true;
    this.focus.emit(event);
  }

  ngOnChanges({
    options,
    value,
  }: {
    options: SimpleChange;
    value: SimpleChange;
  }) {
    if (!!options && !!options.currentValue) {
      this.format();
    }
    if (!!value && !!value.currentValue) {
      this.inputChange(this.value);
    }
  }

  inputChange(value: any) {
    this.control.setValue(
      value instanceof Object
        ? this.getMultiLabels(value, this.pathLabel.split('.'))
        : value
    );

    if (typeof value === 'string') {
      this.onChange(value);
    } else {
      const newValue = { ...value };
      delete newValue.dssLabel;
      delete newValue.dssSelect;

      setTimeout(() => {
        this.onChange(
          this.return
            ? this.getMultiLabels(newValue, this.return.split('.'))
            : newValue
        );
      }, 250);
    }
  }

  format() {
    this.options.map((option) => {
      option.dssLabel = this.getMultiLabels(option, this.pathLabel.split('.'));
      option.dssSelect = false;
    });
  }
}
