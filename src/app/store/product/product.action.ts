import { PaginationMetaInterface } from '@/ts/interfaces';

export class FetchProducts {
  static readonly type = '[Product] Set';
}

export class UpdatePagination {
  static readonly type = '[Product] UpdatePagination';

  constructor(public payload: Partial<PaginationMetaInterface>) {}
}

export class SetFilters {
  static readonly type = '[Product] SetFilters';

  constructor(public payload: Record<string, any>) {}
}

export class SetProductCategoryFilter {
  static readonly type = '[Product] SetProductCategoryFilter';

  constructor(public payload: number) {}
}
