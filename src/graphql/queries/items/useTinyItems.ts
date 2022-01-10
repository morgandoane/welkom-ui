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
                default_unit {
                    _id
                    class
                    english
                    spanish
                    english_plural
                    spanish_plural
                    base_per_unit
                }
                default_vendor {
                    _id
                    name
                }
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
