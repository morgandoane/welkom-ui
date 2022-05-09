import { TinyItem, TinyItemFragment } from '../../schema/Item/Item';
import { gql, QueryHookOptions, QueryResult, useQuery } from '@apollo/client';
import { ItemFilter } from '../../schema/Item/inputs/ItemFilter';
import { PaginationResult } from '../../schema/Pagination/Pagination';
import { TinyBaseFragment } from '../../schema/Base/Base';

export const TinyItems = gql`
    ${TinyItemFragment}
    ${TinyBaseFragment}
    query TinyItems($filter: ItemFilter!) {
        items(filter: $filter) {
            count
            items {
                ...TinyItemFragment
            }
        }
    }
`;

export const useTinyItems = (
    options?: QueryHookOptions<
        { items: PaginationResult<TinyItem> },
        { filter: ItemFilter }
    >
): QueryResult<{ items: PaginationResult<TinyItem> }, { filter: ItemFilter }> =>
    useQuery(TinyItems, options);
