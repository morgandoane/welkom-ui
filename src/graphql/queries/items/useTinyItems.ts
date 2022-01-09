import { TinyItem } from '../../schema/Item/Item';
import { gql, QueryHookOptions, QueryResult, useQuery } from '@apollo/client';
import { ItemFilter } from '../../schema/Item/ItemFilter';
import { Pagination } from '../../schema/Pagination/Pagination';

export const TinyItems = gql`
    query TinyItems($filter: ItemFilter!) {
        items(filter: $filter) {
            count
            items {
                _id
                english
                spanish
                unit_class
            }
        }
    }
`;

export const useTinyItems = (
    options?: QueryHookOptions<
        { items: Pagination<TinyItem> },
        { filter: ItemFilter }
    >
): QueryResult<{ items: Pagination<TinyItem> }, { filter: ItemFilter }> =>
    useQuery(TinyItems, options);
