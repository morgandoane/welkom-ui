export type OperationResult<T> =
    | { data: T; success: true }
    | { error: Error; success: false; data?: T | null };
