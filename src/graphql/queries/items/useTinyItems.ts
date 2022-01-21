import { TinyItem } from '../../schema/Item/Item';
import { gql, QueryHookOptions, QueryResult, useQuery } from '@apollo/client';
import { ItemFilter } from '../../schema/Item/ItemFilter';
import { Pagination } from '../../schema/Pagination/Pagination';

export const TinyItemFragment = gql`
    fragment TinyItemFragment on Item {
        _id
        english
        spanish
        unit_class
        order_queue_qty
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
        created_by {
            user_id
            name
            email
            picture
            given_name
            family_name
        }
        modified_by {
            user_id
            name
            email
        }
        date_modified
        date_created
        to_base_unit
    }
`;

export const TinyItems = gql`
    ${TinyItemFragment}
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
        { items: Pagination<TinyItem> },
        { filter: ItemFilter }
    >
): QueryResult<{ items: Pagination<TinyItem> }, { filter: ItemFilter }> =>
    useQuery(TinyItems, options);
