import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Store } from '@ngxs/store';
import {
  LoadingFinish,
  LoadingStart,
} from '@/app/store/loading/loading.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'shoply';

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.loaderSubscriber();
  }

  loaderSubscriber(): void {
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationStart) {
        this.store.dispatch(LoadingStart);
      }

      if (
        events instanceof NavigationEnd ||
        events instanceof NavigationError ||
        events instanceof NavigationCancel
      ) {
        this.store.dispatch(LoadingFinish);
      }
    });
  }

  ngOnDestroy(): void {
    this.router.events.subscribe();
  }
}
