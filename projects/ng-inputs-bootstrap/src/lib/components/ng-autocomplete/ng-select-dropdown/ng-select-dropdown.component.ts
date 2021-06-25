import { CdkOverlayOrigin, Overlay } from '@angular/cdk/overlay';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { contains } from '@douglas-serena/ng-utils';

@Component({
  selector: 'ng-select-dropdown',
  templateUrl: './ng-select-dropdown.component.html',
})
export class NgSelectDropdownComponent implements OnInit {
  @ViewChild('listRef') listRef: ElementRef<HTMLUListElement>;
  @Output() selectEmpty = new EventEmitter();
  @Output() select = new EventEmitter();
  @Input() trigger: CdkOverlayOrigin;
  @Input() set options(
    options: {
      _label: string;
      _value: any;
      _root: any;
    }[]
  ) {
    this._indexSelect = null;
    this._options = options;
  }
  _options: {
    _label: string;
    _value: any;
    _root: any;
  }[];
  _indexSelect: number = null;
  _triggerRect: ClientRect;
  _isOpen = false;

  keyMaps = {
    Enter: () => this.handleSelect(),
    ArrowDown: () => this.handleArrowDown(),
    ArrowUp: () => this.handleArrowUp(),
  };

  constructor(private overlay: Overlay) {}

  debouceBlur: any = 0;
  ngOnInit() {
    const element = this.trigger.elementRef.nativeElement as HTMLDivElement;
    element
      .querySelector('input')
      .addEventListener('focus', () => this.handleOpen());
    element
      .querySelector('input')
      .addEventListener('click', () => this.handleOpen());
    element.querySelector('input').addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        this.handleOpen();
      }
      if (event.key === 'Tab' || (event.key === 'Tab' && event.shiftKey)) {
        this.handleClose();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  handleResize() {
    this.overlayUpdate();
  }

  handleKey(event: KeyboardEvent) {
    if (contains(event.key, 'Arrow')) {
      if (this._indexSelect === null) {
        this._indexSelect = 0;
        return;
      }
    }

    const eventKey = this.keyMaps[event.key];
    if (eventKey) {
      eventKey();
    }
  }

  handleArrowUp() {
    if (this._options.length > 0) {
      if (this._indexSelect === 0) {
        this._indexSelect = this._options.length - 1;
        this.handleScrollInto('end');
      } else {
        this._indexSelect--;
        this.handleScrollInto('start');
      }
    }
  }

  handleArrowDown() {
    if (this._options.length > 0) {
      if (this._indexSelect === this._options.length - 1) {
        this._indexSelect = 0;
        this.handleScrollInto('start');
      } else {
        this._indexSelect++;
        this.handleScrollInto('end');
      }
    }
  }

  handleSelect(index = this._indexSelect) {
    if (this._options.length === 0) {
      this.selectEmpty.emit();
    } else {
      this.select.emit(this._options[index]);
    }
    this.handleClose();
  }

  handleScrollInto(block: ScrollLogicalPosition = 'nearest') {
    const button = this.listRef.nativeElement.querySelector(
      `button:nth-child(${this._indexSelect + 1})`
    );
    setTimeout(() => {
      button.scrollIntoView({ block, behavior: 'smooth' });
    });
  }

  handleOpen() {
    this.overlayUpdate();
    this._isOpen = true;
  }

  handleClose() {
    this.overlayUpdate();
    this._isOpen = false;
  }

  overlayUpdate(event?: any) {
    this._triggerRect =
      this.trigger.elementRef.nativeElement.getBoundingClientRect();
  }
}
