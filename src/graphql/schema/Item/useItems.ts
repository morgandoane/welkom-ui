import { Pagination } from '../../../utils/types/Pagination';
import { getFilterQueryHook } from '../../types';
import { TinyItem, TinyItemFragment } from './Item';
import { gql } from '@apollo/client';
import { ItemFilter } from '../../inputsTypes';

export const ItemsQuery = gql`
    ${TinyItemFragment._document}
    query ItemsQuery($filter: ItemFilter!) {
        items(filter: $filter) {
            count
            items {
                ...TinyItemFragment
            }
        }
    }
`;

export const useItems = getFilterQueryHook<
    { items: Pagination<TinyItem> },
    { filter: ItemFilter }
>(ItemsQuery);
