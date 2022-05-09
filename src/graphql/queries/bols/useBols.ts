import { VerificationFragment } from './../../schema/Verification/Verification';
import { AppFileFragment } from './../../schema/AppFile/AppFile';
import { BaseFragment } from './../../fragments/BaseFragment';
import { BolFragment } from './../../schema/Bol/Bol';
import { getQueryHook } from './../../types';
import { gql } from '@apollo/client';
import { Bol } from '../../schema/Bol/Bol';
import { FulfillmentFragment } from '../../schema/Fulfillment/Fulfillment';
import { BolFilter } from '../../schema/Bol/inputs/BolFilter';
import { PaginationResult } from '../../schema/Pagination/Pagination';

export const BolsQuery = gql`
    ${BolFragment}
    ${BaseFragment}
    ${FulfillmentFragment}
    ${AppFileFragment}
    ${VerificationFragment}
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
