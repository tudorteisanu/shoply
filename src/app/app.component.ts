import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { StoreService } from '@/app/store2/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'shoply';

  constructor(private router: Router, private store: StoreService) {
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationStart) {
        this.store.loading.start();
      }

      if (
        events instanceof NavigationEnd ||
        events instanceof NavigationError ||
        events instanceof NavigationCancel
      ) {
        this.store.loading.finish();
      }
    });
  }
}
