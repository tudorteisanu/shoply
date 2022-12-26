export interface PaginationMetaInterface {
  page: number;
  pageSize: number;
  total: number;
}

export interface PaginationInterface<T> {
  data: T[];
  meta: PaginationMetaInterface;
}
