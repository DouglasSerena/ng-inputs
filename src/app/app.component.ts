import { Component } from '@angular/core';
import { NgThemeService } from 'projects/ng-utils/src/lib/services/theme/ng-theme.service';
import { NgNavigatorService } from 'projects/ng-utils/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-inputs';

  constructor(
    ngNavigatorService: NgNavigatorService,
    ngThemeService: NgThemeService
  ) {
    ngThemeService.load();

    setTimeout(() => {
      ngThemeService.change('light');
    }, 5000);
  }

  print() {
    window.print();
  }
}
