export interface PaginateArg {
  skip: number;
  take: number;
}

export interface Pgaination<T> {
  items: T[];
  count: number;
}
