import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  FetchProducts,
  SetFilters,
  SetProductCategoryFilter,
  UpdatePagination,
} from './product.action';
import {
  PaginationInterface,
  PaginationMetaInterface,
  ProductInterface,
} from '@/ts/interfaces';
import { ProductsService } from '@/services/products.service';
import { Observable, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

export class ProductStateModel {
  items!: ProductInterface[];
  meta: PaginationMetaInterface;
  filters: any;
}

@State<ProductStateModel>({
  name: 'product',
  defaults: {
    items: [],
    meta: {
      pageSize: 10,
      page: 1,
      total: 0,
    },
    filters: {},
  },
})
@Injectable()
export class ProductState {
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  @Selector()
  static getProducts(state: ProductStateModel): ProductInterface[] {
    return state.items;
  }

  @Selector()
  static getFilters(state: ProductStateModel): ProductInterface[] {
    return state.items;
  }

  @Selector()
  static isCategoryInFilters(state: ProductStateModel): Function {
    return (payload: number) => {
      if (state.filters.categories && Array.isArray(state.filters.categories)) {
        return state.filters?.categories.some((item: number) => {
          return item === payload;
        });
      }

      return false;
    };
  }

  @Selector()
  static getMeta(state: ProductStateModel): PaginationMetaInterface {
    return state.meta;
  }

  @Action(FetchProducts)
  set({
    patchState,
    getState,
  }: StateContext<ProductStateModel>): Observable<
    PaginationInterface<ProductInterface>
  > {
    const { meta, filters } = getState();

    return this.productsService.fetch({ ...filters, ...meta }).pipe(
      tap(
        async ({
          data: items,
          meta,
        }: PaginationInterface<ProductInterface>) => {
          await this.setFiltersToQuery(filters);
          patchState({
            meta,
            items: items.map((item) => ({
              ...item,
              imageUrl: 'assets/images/product-1.png',
              thumbs: [
                {
                  url: 'assets/images/product-thumb-5.png',
                },
                {
                  url: 'assets/images/product-thumb-2.png',
                },
                {
                  url: 'assets/images/product-thumb-3.png',
                },
                {
                  url: 'assets/images/product-thumb-4.png',
                },
              ],
            })),
          });
        }
      )
    );
  }

  @Action(UpdatePagination)
  updatePagination(
    { patchState, getState }: StateContext<ProductStateModel>,
    { payload }: UpdatePagination
  ): void {
    const state = getState();
    patchState({
      meta: {
        ...state.meta,
        ...payload,
      },
    });
  }

  @Action(SetFilters)
  setFilters(
    { patchState, getState }: StateContext<ProductStateModel>,
    { payload }: SetFilters
  ): void {
    const state = getState();
    patchState({
      filters: {
        ...state.filters,
        ...payload,
      },
    });
  }

  @Action(SetProductCategoryFilter)
  setCategoryFilter(
    { patchState, getState }: StateContext<ProductStateModel>,
    { payload }: SetProductCategoryFilter
  ): void {
    let { filters } = getState();

    if (!filters.hasOwnProperty('categories')) {
      filters = { ...filters, categories: [] };
    }

    if (filters.categories) {
      const categoryIndex = filters.categories.findIndex(
        (item: any) => item === payload
      );
      if (categoryIndex === -1) {
        filters.categories.push(payload);
      } else {
        filters.categories.splice(categoryIndex, 1);
      }
    }

    patchState({
      filters: {
        ...filters,
      },
    });
  }

  private async setFiltersToQuery(queryParams: any): Promise<void> {
    await this.router.navigate([], {
      queryParams,
      relativeTo: this.activatedRoute,
    });
  }
}
