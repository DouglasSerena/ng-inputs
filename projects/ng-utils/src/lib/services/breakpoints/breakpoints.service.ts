import { ApplicationRef, Injectable } from '@angular/core';
import { Breakpoints, MediaMatcher } from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root',
})
export class BreakpointsService {
  changeListener = () => {};

  desktop: MediaQueryList;
  get isDesktop() {
    return !!this.desktop.matches;
  }

  tablet: MediaQueryList;
  get isTablet() {
    return !!this.tablet.matches;
  }

  mobile: MediaQueryList;
  get isMobile() {
    return !!this.mobile.matches;
  }

  constructor(
    private applicationRef: ApplicationRef,
    private media: MediaMatcher
  ) {
    this.breakPoint('desktop');
    this.breakPoint('tablet');
    this.breakPoint('mobile');

    this.changeListener = () => this.applicationRef.tick();
  }

  breakPoint(type: 'desktop' | 'mobile' | 'tablet', pointer?: string) {
    const devices = {
      desktop: this.media.matchMedia(
        `(${pointer ? pointer : 'max-width: 576px'})`
      ),
      tablet: this.media.matchMedia(
        `(${pointer ? pointer : 'max-width: 768px'})`
      ),
      mobile: this.media.matchMedia(
        `(${pointer ? pointer : 'max-width: 992px'})`
      ),
    };

    if (this[type]) {
      this[type].removeListener(this.changeListener);
    }

    this[type] = devices[type];
    this[type].addListener(this.changeListener);
  }
}
