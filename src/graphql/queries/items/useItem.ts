import { AppFileFragment } from '../../schema/AppFile/AppFile';
import { BaseFragment } from '../../fragments/BaseFragment';
import { gql, QueryHookOptions, QueryResult, useQuery } from '@apollo/client';
import { Item } from '../../schema/Item/Item';

export const ItemQuery = gql`
    ${BaseFragment}
    ${AppFileFragment}
    query ItemQuery($id: ObjectId!) {
        item(id: $id) {
            ...BaseFragment
            english
            spanish
            unit_class
            order_queue_qty
            upc
            to_base_unit
            type
            files {
                ...AppFileFragment
            }
            conversions {
                ...BaseFragment
                from
                to
                from_per_to
            }
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
            category {
                _id
                label
            }
        }
    }
`;

export const useItem = (
    options: QueryHookOptions<{ item: Item }, { id: string }>
): QueryResult<{ item: Item }, { id: string }> => useQuery(ItemQuery, options);
