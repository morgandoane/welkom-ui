import { BolFragment } from './../../schema/Bol/Bol';
import { getQueryHook } from './../../types';
import { gql } from '@apollo/client';
import { Bol } from '../../schema/Bol/Bol';
import { BolFilter } from '../../schema/Bol/inputs/BolFilter';
import { PaginationResult } from '../../schema/Pagination/Pagination';
import { BaseFragment } from '../../schema/Base/Base';

export const BolsQuery = gql`
    ${BolFragment}
    ${BaseFragment}
    query Bols($filter: BolFilter!) {
        bols(filter: $filter) {
            count
            items {
                ...BolFragment
            }
        }
    }
`;

export interface BolsArgs {
    filter: BolFilter;
}

export interface BolsRes {
    bols: PaginationResult<Bol>;
}

export const useBols = getQueryHook<BolsRes, BolsArgs>(BolsQuery);
