import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, fromEvent, map } from 'rxjs';
import { CategoryInterface } from '@/ts/interfaces';
import {
  FetchProducts,
  SetFilters,
  SetProductCategoryFilter,
} from '@/app/store/product/product.action';
import { Select, Store } from '@ngxs/store';
import { CategoryState } from '@/app/store/category/category.state';
import { ProductState } from '@/app/store/product/product.state';

interface FilterParamsInterface {
  categories?: number[];
  minPrice?: number;
  maxPrice?: number;
}

@Component({
  selector: 'ProductFilter',
  templateUrl: './product-filter.component.html',
})
export class ProductFilterComponent implements AfterViewInit {
  @ViewChild('minPrice') minPriceRef!: ElementRef;
  @ViewChild('maxPrice') maxPriceRef!: ElementRef;

  @Output() filtersChange: EventEmitter<FilterParamsInterface> =
    new EventEmitter<FilterParamsInterface>();

  @Select(CategoryState.getCategories)
  categories!: BehaviorSubject<CategoryInterface[]>;

  @Select(ProductState.getFilters)
  filters: BehaviorSubject<CategoryInterface[]>;

  constructor(private store: Store) {}

  async ngAfterViewInit(): Promise<void> {
    await this.subscribeMinPrice();
    await this.subscribeMaxPrice();
  }

  async toggleCategory(categoryId: number): Promise<void> {
    this.store.dispatch(new SetProductCategoryFilter(categoryId));
    this.store.dispatch(FetchProducts);
  }

  async subscribeMaxPrice(): Promise<void> {
    fromEvent(this.maxPriceRef.nativeElement, 'input').subscribe(
      ({ target: { value } }: any) => {
        if (!Number.isNaN(value)) {
          this.store.dispatch(
            new SetFilters({
              maxPrice: Number(value),
            })
          );
        }
      }
    );
  }

  async subscribeMinPrice(): Promise<void> {
    fromEvent(this.minPriceRef.nativeElement, 'input').subscribe(
      ({ target: { value } }: any) => {
        if (Number.isNaN(value)) {
          this.store.dispatch(
            new SetFilters({
              maxPrice: Number(value),
            })
          );
        }
      }
    );
  }

  isChecked(categoryId: number) {
    return this.store
      .select(ProductState.isCategoryInFilters)
      .pipe(map((mapById) => mapById(categoryId)));
  }
}
