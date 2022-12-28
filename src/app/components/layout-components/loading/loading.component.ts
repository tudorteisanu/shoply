import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'Loading',
  templateUrl: './loading.component.html',
  styles: [],
})
export class LoadingComponent {
  constructor(private store: Store) {}

  get show(): Observable<boolean> {
    return this.store.select((state) => state.loading.state);
  }
}
