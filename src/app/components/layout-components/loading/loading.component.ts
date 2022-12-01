import { Component } from '@angular/core';
import { StoreService } from '@/app/store2/store.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styles: [],
})
export class LoadingComponent {
  constructor(private store: StoreService) {}

  get show(): boolean {
    return this.store.loading.show;
  }
}
