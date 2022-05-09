export interface PaginateArg {
    skip: number;
    take: number;
}

export interface PaginationResult<T> {
    items: T[];
    count: number;
}
