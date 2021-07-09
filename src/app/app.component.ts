import { Component } from '@angular/core';
import { ThemeService } from 'projects/ng-utils/src/lib/services/theme/theme.service';
import {
  BreakpointsService,
  NavigatorService,
} from 'projects/ng-utils/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-inputs';

  constructor(
    NavigatorService: NavigatorService,
    ThemeService: ThemeService,
    breakPointService: BreakpointsService
  ) {
    ThemeService.load();

    setTimeout(() => {
      ThemeService.change('light');
    }, 5000);
  }

  print() {
    window.print();
  }
}
