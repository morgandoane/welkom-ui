import { gql, QueryHookOptions, QueryResult, useQuery } from '@apollo/client';
import { Item, ItemFragment } from '../../schema/Item/Item';
import { BaseFragment } from '../../schema/Base/Base';

export const ItemQuery = gql`
    ${BaseFragment}
    ${ItemFragment}
    query ItemQuery($id: ObjectId!) {
        item(id: $id) {
            ...ItemFragment
        }
    }
`;

export const useItem = (
    options: QueryHookOptions<{ item: Item }, { id: string }>
): QueryResult<{ item: Item }, { id: string }> => useQuery(ItemQuery, options);
