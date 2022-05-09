import { getQueryHook } from './../../types';
import { gql } from '@apollo/client';
import { BolFilter } from '../../schema/Bol/inputs/BolFilter';
import { PaginationResult } from '../../schema/Pagination/Pagination';
import { TinyBol, TinyBolFragment } from '../../schema/Bol/Bol';
import { TinyBaseFragment } from '../../schema/Base/Base';

export const TinyBolsQuery = gql`
    ${TinyBaseFragment}
    ${TinyBolFragment}
    query Bols($filter: BolFilter!) {
        bols(filter: $filter) {
            count
            items {
                ...TinyBolFragment
            }
        }
    }
`;

export interface TinyBolsArgs {
    filter: BolFilter;
}

export interface TinyBolsRes {
    bols: PaginationResult<TinyBol>;
}

export const useTinyBols = getQueryHook<TinyBolsRes, TinyBolsArgs>(
    TinyBolsQuery
);
