import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {BehaviorSubject, fromEvent} from 'rxjs';
import {CategoryInterface} from '@/ts/interfaces';

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

  @Input() filters: FilterParamsInterface = {};
  @Output() filtersChange: EventEmitter<FilterParamsInterface> =
    new EventEmitter<FilterParamsInterface>();

  @Input() categories!: BehaviorSubject<CategoryInterface[]>;
  @Output() filter: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  async ngAfterViewInit(): Promise<void> {
    await this.subscribeMinPrice()
    await this.subscribeMaxPrice()
  }

  isChecked(categoryId: number): boolean {
    if (!this.filters.categories) {
      return false;
    }

    return this.filters.categories.some((item) => Number(item) === categoryId);
  }

  async toggleCategory(categoryId: number): Promise<void> {
    if (!this.filters.hasOwnProperty('categories')) {
      this.filters = {categories: []};
    }

    if (this.filters.categories) {
      const categoryIndex = this.filters.categories.findIndex(
        (item) => item === categoryId
      );
      if (categoryIndex === -1) {
        this.filters.categories.push(categoryId);
      } else {
        this.filters.categories.splice(categoryIndex, 1);
      }

      await this.emitFilter();
    }
  }

  async emitFilter(): Promise<void> {
    this.filter.emit(this.filters);
  }

  async subscribeMaxPrice(): Promise<void> {
    fromEvent(this.maxPriceRef.nativeElement, 'input').subscribe(
      ({target: {value}}: any) => {
        if (Number.isInteger(value)) {
          this.filters.maxPrice = Number(value);
          this.emitFilter();
        }
      }
    );
  }

  async subscribeMinPrice(): Promise<void> {
    fromEvent(this.minPriceRef.nativeElement, 'input').subscribe(
      ({target: {value}}: any) => {
        if (Number.isInteger(value)) {
          this.filters.minPrice = Number(value);
          this.emitFilter();
        }
      }
    );
  }
}
