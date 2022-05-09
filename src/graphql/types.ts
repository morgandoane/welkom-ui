import {
    DocumentNode,
    MutationHookOptions,
    MutationTuple,
    QueryHookOptions,
    QueryResult,
    QueryTuple,
    Resolver,
    useLazyQuery,
    useMutation,
    useQuery,
} from '@apollo/client';

export type OperationResult<T> =
    | {
          success: true;
          data: T;
      }
    | {
          success: false;
          error: Error;
      };

export const getQueryHook =
    <Res = any, Args = any>(doc: DocumentNode) =>
    (options?: QueryHookOptions<Res, Args>): QueryResult<Res, Args> =>
        useQuery(doc, options);

export const getLazyQueryHook =
    <Res, Args>(doc: DocumentNode) =>
    (options?: QueryHookOptions<Res, Args>): QueryTuple<Res, Args> =>
        useLazyQuery(doc, options);

export const getMutationHook =
    <Res = any, Args = any>(doc: DocumentNode) =>
    (options?: MutationHookOptions<Res, Args>): MutationTuple<Res, Args> =>
        useMutation(doc, options);

export type Ref<T> = string;
