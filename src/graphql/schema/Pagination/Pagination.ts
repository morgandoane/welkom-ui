export interface Pagination<T> {
    count: number;
    items: T[];
}

export interface PaginateArg {
    skip: number;
    take: number;
}
