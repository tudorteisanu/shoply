import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { LoadingService } from '@/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'shoply';

  constructor(private router: Router, private loading: LoadingService) {
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationStart) {
        this.loading.start();
      }

      if (
        events instanceof NavigationEnd ||
        events instanceof NavigationError ||
        events instanceof NavigationCancel
      ) {
        this.loading.finish();
      }
    });
  }
}
