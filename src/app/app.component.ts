import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { StoreDispatchService } from '@/app/store/store-dispatch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'shoply';

  constructor(
    private router: Router,
    private storeDispatch: StoreDispatchService
  ) {}

  ngOnInit(): void {
    this.loaderSubscriber();
  }

  loaderSubscriber(): void {
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationStart) {
        this.storeDispatch.loading.start();
      }

      if (
        events instanceof NavigationEnd ||
        events instanceof NavigationError ||
        events instanceof NavigationCancel
      ) {
        this.storeDispatch.loading.finish();
      }
    });
  }

  ngOnDestroy(): void {
    this.router.events.subscribe();
  }
}
