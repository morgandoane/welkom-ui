import { BaseFilter } from './inputsTypes';
import {
    DocumentNode,
    gql,
    MutationHookOptions,
    MutationTuple,
    QueryHookOptions,
    QueryResult,
    QueryTuple,
    useLazyQuery,
    useMutation,
    useQuery,
} from '@apollo/client';

export const getQueryHook =
    <Res = any, Args = any>(doc: DocumentNode) =>
    (options?: QueryHookOptions<Res, Args>): QueryResult<Res, Args> =>
        useQuery(doc, options);

export const getAtomicQueryHook =
    <Res = any>(doc: DocumentNode) =>
    (
        options?: QueryHookOptions<Res, { id: string }>
    ): QueryResult<Res, { id: string }> =>
        useQuery(doc, options);

export const getFilterQueryHook =
    <
        Res = any,
        Args extends { filter: BaseFilter } = { filter: { skip: 0; take: 50 } }
    >(
        doc: DocumentNode
    ) =>
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

export class AppFragment {
    _document: DocumentNode;
    _dependencies: AppFragment[];

    constructor(document: DocumentNode, dependencies: AppFragment[]) {
        this._document = document;
        this._dependencies = dependencies;
    }
}
