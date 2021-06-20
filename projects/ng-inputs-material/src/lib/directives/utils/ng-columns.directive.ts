import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

export interface NgColumnsConfig {
  addParent?: boolean;
  default?: number;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
}

@Directive({
  selector: '[columns]',
})
export class NgColumnsDirective implements OnInit {
  _element: HTMLElement;
  _columns: NgColumnsConfig = {
    addParent: false,
    default: 12,
    sm: 12,
  };

  @Input() columnType: 'bootstrap' | 'materialize' = 'bootstrap';
  @Input() set columns(columns: NgColumnsConfig) {
    if (!(typeof columns === 'string')) {
      Object.assign(this._columns, columns);
      if (this._element) {
        this.updateColumns();
      }
    }
  }

  constructor(
    private elementRef: ElementRef<HTMLInputElement>,
    private renderer2: Renderer2
  ) {}

  ngOnInit() {
    this._element = this.elementRef.nativeElement;

    this.updateColumns();
  }

  updateColumns() {
    let element = this._element;
    if (this._columns.addParent) {
      if (element.parentElement) {
        element = element.parentElement;
      }
    }
    if (this.columnType === 'materialize') {
      this.renderer2.addClass(element, 'col');
      this.renderer2.addClass(element, `s${this._columns.sm}`);
      if (this._columns.md) {
        this.renderer2.addClass(element, `m${this._columns.md}`);
      }
      if (this._columns.lg) {
        this.renderer2.addClass(element, `l${this._columns.lg}`);
      }
      if (this._columns.xl) {
        this.renderer2.addClass(element, `xl${this._columns.xl}`);
      }
    } else if (this.columnType === 'bootstrap') {
      this.renderer2.addClass(element, `col-${this._columns.default}`);
      this.renderer2.addClass(element, `col-sm-${this._columns.sm}`);
      if (this._columns.md) {
        this.renderer2.addClass(element, `col-md-${this._columns.md}`);
      }
      if (this._columns.lg) {
        this.renderer2.addClass(element, `col-lg-${this._columns.lg}`);
      }
      if (this._columns.xl) {
        this.renderer2.addClass(element, `col-xl-${this._columns.xl}`);
      }
    }
  }
}
