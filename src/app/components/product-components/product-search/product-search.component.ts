import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, tap } from 'rxjs';
import { Store } from '@ngxs/store';
import { FetchProducts, SetFilters } from '@/app/store/product/product.action';

@Component({
  selector: 'ProductSearch',
  templateUrl: './product-search.component.html',
})
export class ProductSearchComponent implements AfterViewInit {
  @ViewChild('productSearch') productSearchRef: ElementRef;

  constructor(private store: Store) {}

  ngAfterViewInit(): void {
    this.subscribeSearchEvent();
    this.setInitialValue();
  }

  subscribeSearchEvent(): void {
    fromEvent(this.productSearchRef.nativeElement, 'input')
      .pipe(
        debounceTime(600),
        tap((event: any) => {
          this.updateFilter(event.target.value);
        })
      )
      .subscribe();
  }

  updateFilter(name: string): void {
    this.store.dispatch(new SetFilters({ name }));
    this.store.dispatch(FetchProducts);
  }

  setInitialValue(): void {
    const filters = this.store.selectSnapshot((state) => state.product.filters);

    if (filters.hasOwnProperty('name')) {
      this.productSearchRef.nativeElement.value = filters.name;
    }
  }
}
