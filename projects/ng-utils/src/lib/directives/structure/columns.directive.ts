import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ColumnsConfig } from '../../interfaces/columns.interface';

@Directive({
  selector: '[columns]',
})
export class ColumnsDirective implements OnInit {
  _element: HTMLElement;
  _columns: ColumnsConfig = {
    addColumnHost: false,
    addRowHost: true,
    default: 12,
  };

  @Input() columnType: 'bootstrap' | 'materialize' = 'bootstrap';
  @Input() set columns(columns: ColumnsConfig | string) {
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
    let elementRoot = this._element;
    let elementAddColumns = elementRoot;
    let elementHost = elementRoot.parentElement;

    // ADD COLUMNS ELEMENT HOST
    if (this._columns.addColumnHost) {
      if (elementHost) {
        elementAddColumns = elementHost;
      }
    }

    if (elementHost.isEqualNode(elementAddColumns)) {
      elementHost = elementAddColumns.parentElement;
    }

    // ADD ROW ELEMENT HOST
    if (this._columns.addRowHost) {
      if (elementHost && !elementHost.classList.contains('row')) {
        elementHost.classList.add('row');
      }
    }

    if (elementHost.classList.contains('row')) {
      if (this.columnType === 'materialize') {
        this.renderer2.addClass(elementAddColumns, 'col');
        // WIDTH Mobile Devices <= 600px
        if (this._columns.sm) {
          this.renderer2.addClass(elementAddColumns, `s${this._columns.sm}`);
        } else {
          this.renderer2.addClass(
            elementAddColumns,
            `s${this._columns.default}`
          );
        }

        // WIDTH Tablet Devices > 600px
        if (this._columns.md) {
          this.renderer2.addClass(elementAddColumns, `m${this._columns.md}`);
        }

        // WIDTH Desktop Devices > 992px
        if (this._columns.lg) {
          this.renderer2.addClass(elementAddColumns, `l${this._columns.lg}`);
        }

        // WIDTH Large Desktop Devices > 1200px
        if (this._columns.xl) {
          this.renderer2.addClass(elementAddColumns, `xl${this._columns.xl}`);
        }
      } else if (this.columnType === 'bootstrap') {
        // WIDTH Extra small < 576px
        if (this._columns.default) {
          this.renderer2.addClass(
            elementAddColumns,
            `col-${this._columns.default}`
          );
        }

        // WIDTH Small ≥ 576px
        if (this._columns.sm) {
          this.renderer2.addClass(
            elementAddColumns,
            `col-sm-${this._columns.sm}`
          );
        }

        // WIDTH Medium ≥ 768px
        if (this._columns.md) {
          this.renderer2.addClass(
            elementAddColumns,
            `col-md-${this._columns.md}`
          );
        }

        // WIDTH Large ≥ 992px
        if (this._columns.lg) {
          this.renderer2.addClass(
            elementAddColumns,
            `col-lg-${this._columns.lg}`
          );
        }

        // WIDTH Extra large ≥ 1200px
        if (this._columns.xl) {
          this.renderer2.addClass(
            elementAddColumns,
            `col-xl-${this._columns.xl}`
          );
        }
      }
    }
  }
}
