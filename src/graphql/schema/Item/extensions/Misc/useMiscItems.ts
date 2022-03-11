import { TinyProfileFragment } from '../../../Profile/Profile';
import { ItemFragment } from '../../Item';
import { TinyMiscItem, TinyMiscItemFragment } from './MiscItem';
import { gql } from '@apollo/client';
import { MiscItemFilter } from '../../../../inputsTypes';
import { getFilterQueryHook } from '../../../../types';
import { Pagination } from '../../../../../utils/types/Pagination';

export const MiscItemsQuery = gql`
    ${TinyMiscItemFragment._document}
    ${ItemFragment._document}
    ${TinyProfileFragment._document}
    query MiscItemsQuery($filter: MiscItemFilter!) {
        miscItems(filter: $filter) {
            count
            items {
                ...TinyMiscItemFragment
            }
        }
    }
`;

export const useMiscItems = getFilterQueryHook<
    { miscItems: Pagination<TinyMiscItem> },
    { filter: MiscItemFilter }
>(MiscItemsQuery);
