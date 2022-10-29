export interface PaginationMetaInterface {
  page: number;
  itemsPerPage: number;
  total: number;
}

export interface PaginationInterface<T> {
  data: T[];
  meta: PaginationMetaInterface;
}
