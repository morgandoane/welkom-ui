import { TinyProfileFragment } from './../Profile/Profile';
import { DesignFilter } from '../../inputsTypes';
import { Pagination } from '../../../utils/types/Pagination';
import { getFilterQueryHook } from '../../types';
import { TinyDesign, TinyDesignFragment } from './Design';
import { gql } from '@apollo/client';

export const DesignsQuery = gql`
    ${TinyDesignFragment._document}
    ${TinyProfileFragment._document}
    query DesignsQuery($filter: DesignFilter!) {
        designs(filter: $filter) {
            count
            items {
                ...TinyDesignFragment
            }
        }
    }
`;

export const useDesigns = getFilterQueryHook<
    { designs: Pagination<TinyDesign> },
    { filter: DesignFilter }
>(DesignsQuery);
