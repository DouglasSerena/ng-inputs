import { EventEmitter, Injectable } from '@angular/core';
import {
  GuardsCheckEnd,
  GuardsCheckStart,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterEvent,
  RoutesRecognized,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CommonValidation } from '../../validations/common.validation';

@Injectable({ providedIn: 'root' })
export class NavigatorService {
  navigationStart = new EventEmitter<NavigationStart>();
  routesRecognized = new EventEmitter<RoutesRecognized>();
  guardsCheckStart = new EventEmitter<GuardsCheckStart>();
  guardsCheckEnd = new EventEmitter<GuardsCheckEnd>();
  navigationEnd = new EventEmitter<NavigationEnd>();

  constructor(private router: Router) {}

  public async load() {
    (this.router.events as Observable<RouterEvent>)
      .pipe(filter((event) => event instanceof RouterEvent))
      .subscribe((event: object) => {
        if (event instanceof NavigationStart) {
          this.navigationStart.emit(event);
        }
        if (event instanceof RoutesRecognized) {
          this.routesRecognized.emit(event);
        }
        if (event instanceof GuardsCheckStart) {
          this.guardsCheckStart.emit(event);
        }
        if (event instanceof GuardsCheckEnd) {
          this.guardsCheckEnd.emit(event);
        }
        if (event instanceof NavigationEnd) {
          this.navigationEnd.emit(event);
        }
      });

    CommonValidation.eventDestroyListener = this.navigationEnd;
  }
}
